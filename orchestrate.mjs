// orchestrate.mjs — run the full pipeline for one client, unattended.
// Usage: node orchestrate.mjs <client-name> [--publish] [--dry]
//
// Stages (each finishes before the next starts):
//   1. RESEARCH   (claude, sonnet) -> workspace/briefs/*.md
//   2. WRITE      (claude, opus)   -> workspace/ready/*.md  (English/other per client.language)
//   3. REVIEW     (claude, opus)   -> edits workspace/ready/*.md in place
//   4. PUBLISH    (node script)    -> creates WordPress DRAFTS  (only with --publish)
//
// Requirements: Claude Code CLI installed and authenticated (`claude` on PATH).
// This spawns `claude -p` headless. See README "Automated mode".
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { loadClient, paths } from './lib/config.mjs';

const name = process.argv[2];
const doPublish = process.argv.includes('--publish');
const dry = process.argv.includes('--dry');

if (!name || name.startsWith('--')) {
  console.error('Usage: node orchestrate.mjs <client-name> [--publish] [--dry]');
  process.exit(1);
}

const client = loadClient(name); // validates config + creds early
const N = client.articlesPerRun || 2;

for (const d of [paths.briefs, paths.ready, paths.published]) fs.mkdirSync(d, { recursive: true });

// Run one Claude stage headless. Returns a promise that rejects on non-zero exit.
function claude(model, prompt) {
  return new Promise((resolve, reject) => {
    const args = ['-p', prompt, '--model', model];
    // Headless runs need permissions pre-granted. Remove this flag to run
    // interactively/safer, but then the run will pause for approvals.
    args.push('--dangerously-skip-permissions');
    console.log(`\n>>> claude (${model}) ...`);
    if (dry) {
      console.log(`[dry] would run: claude -p "<prompt ${prompt.length} chars>" --model ${model}`);
      return resolve();
    }
    const child = spawn('claude', args, { stdio: 'inherit' });
    child.on('error', (e) =>
      reject(new Error(`Could not launch "claude". Is Claude Code installed and on PATH? ${e.message}`))
    );
    child.on('close', (code) =>
      code === 0 ? resolve() : reject(new Error(`claude stage exited ${code}`))
    );
  });
}

const CONTEXT =
  `You are running the wp-blog-agent pipeline for client "${client.name}". ` +
  `Read CLAUDE.md and clients/${client.name}.json first. ` +
  `Content language: ${client.language || 'en'}. ` +
  `Obey every rule in content.forbidden. Never touch git. Never call WordPress directly.`;

try {
  // 1. RESEARCH
  await claude(
    'sonnet',
    `${CONTEXT}\nRun STAGE 1 (RESEARCH) using the wp-keyword-research skill. ` +
      `Pick the ${N} least-covered verticals in clients/${client.name}.json. For each, mine real ` +
      `questions with scripts/autocomplete.mjs, cluster by intent, and write exactly ONE ` +
      `brief-<slug>.md into workspace/briefs/ (winnable keyword, clear intent, points at that ` +
      `vertical's moneyPage). Target ${N} briefs. Do NOT write full articles. List the brief paths.`
  );

  // 2. WRITE
  await claude(
    'opus',
    `${CONTEXT}\nRun STAGE 2 (WRITE) using the wp-article-write skill. For every ` +
      `workspace/briefs/brief-<slug>.md with no matching workspace/ready/<slug>.md, write the full ` +
      `article as Markdown with YAML frontmatter (title, slug, category, tags, excerpt) into ` +
      `workspace/ready/<slug>.md. Answer-first intro, H2s as real questions, an FAQ section, one ` +
      `natural link to the vertical money page. Write in ${client.language || 'en'}. List files written.`
  );

  // 3. REVIEW
  await claude(
    'opus',
    `${CONTEXT}\nRun STAGE 3 (REVIEW) using the wp-article-review skill. For each ` +
      `workspace/ready/*.md, do a final editorial pass: factual sanity, brand voice, obey ` +
      `content.forbidden, confirm the money-page link and valid frontmatter. Edit in place. ` +
      `Print one PASS/FIX line per article.`
  );

  // 4. PUBLISH (deterministic — no Claude)
  if (doPublish) {
    console.log('\n>>> publish (drafts) ...');
    await new Promise((resolve, reject) => {
      const child = spawn(process.execPath, [path.join(paths.root, 'scripts', 'publish.mjs'), name], {
        stdio: 'inherit',
      });
      child.on('close', (code) => (code === 0 ? resolve() : reject(new Error(`publish exited ${code}`))));
    });
  } else {
    console.log(
      '\nSkipping publish (no --publish flag). Review workspace/ready/*.md, then run:\n' +
        `  npm run publish -- ${name}`
    );
  }

  console.log('\nPipeline finished.');
} catch (e) {
  console.error(`\nPipeline FAILED: ${e.message}`);
  process.exit(1);
}
