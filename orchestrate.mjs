// orchestrate.mjs — run the full pipeline for one client, unattended.
// Usage: node orchestrate.mjs <client-name> [--publish] [--dry] [--engine claude|codex]
//
// Stages (each finishes before the next starts):
//   1. RESEARCH   (agent)       -> workspace/briefs/*.md  (real questions + opened sources)
//   2. WRITE      (agent)       -> workspace/ready/*.md   (in client.language)
//   3. REVIEW     (agent)       -> edits workspace/ready/*.md in place
//   4. CHECK      (node script) -> opens every cited page; one agent FIX pass if it fails
//   5. PUBLISH    (node script) -> WordPress DRAFTS, only articles that pass (with --publish)
//
// Engine: Claude Code (`claude -p`) or Codex (`codex exec`). Picked with --engine, or the
// AGENT_ENGINE env var, otherwise whichever is installed (Claude first).
// Codex model: CODEX_MODEL env var, otherwise the default in ~/.codex/config.toml.
// Codex reasoning effort: per stage (CODEX_EFFORT below), or CODEX_EFFORT env var for all.
import { spawn, spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { loadClient, paths } from './lib/config.mjs';

function arg(flag) {
  const i = process.argv.indexOf(flag);
  return i !== -1 ? process.argv[i + 1] : undefined;
}

const name = process.argv[2];
const doPublish = process.argv.includes('--publish');
const dry = process.argv.includes('--dry');

if (!name || name.startsWith('--')) {
  console.error('Usage: node orchestrate.mjs <client-name> [--publish] [--dry] [--engine claude|codex]');
  process.exit(1);
}

const installed = (cmd) =>
  spawnSync(cmd, ['--version'], { stdio: 'ignore', shell: process.platform === 'win32' }).status === 0;
const engine =
  arg('--engine') || process.env.AGENT_ENGINE || (installed('claude') ? 'claude' : installed('codex') ? 'codex' : null);
if (!['claude', 'codex'].includes(engine)) {
  console.error(
    engine
      ? `Unknown engine "${engine}". Use --engine claude or --engine codex.`
      : 'Neither Claude Code (`claude`) nor Codex (`codex`) is installed. See README, section 1.'
  );
  process.exit(1);
}

const client = loadClient(name); // validates config + creds early
const N = client.articlesPerRun || 2;

for (const d of [paths.briefs, paths.ready, paths.published]) fs.mkdirSync(d, { recursive: true });

// Model per stage for Claude; Codex uses one model (CODEX_MODEL or its config default) with
// a reasoning effort per stage: a config left at "none" or "low" writes from memory more.
const CLAUDE_MODEL = { research: 'sonnet', write: 'opus', review: 'opus', fix: 'opus' };
const CODEX_EFFORT = { research: 'medium', write: 'high', review: 'high', fix: 'medium' };

function commandFor(stage, prompt) {
  if (engine === 'claude') {
    // Headless runs need permissions pre-granted (shell for the scripts, WebSearch/WebFetch
    // for the sources). Remove the flag to run interactively; the run will pause for approvals.
    return ['claude', ['-p', prompt, '--model', CLAUDE_MODEL[stage], '--dangerously-skip-permissions']];
  }
  // Codex's default sandbox has no network: autocomplete.mjs would get nothing and web
  // search would not open pages. Network on, live search on, writes limited to this folder.
  const args = [
    'exec',
    '--sandbox', 'workspace-write',
    '-c', 'sandbox_workspace_write.network_access=true',
    '-c', 'web_search="live"',
    '-c', `model_reasoning_effort="${process.env.CODEX_EFFORT || CODEX_EFFORT[stage]}"`,
    '--skip-git-repo-check',
    '-C', paths.root,
  ];
  if (process.env.CODEX_MODEL) args.push('--model', process.env.CODEX_MODEL);
  args.push(prompt);
  return ['codex', args];
}

// Run one agent stage headless. Returns a promise that rejects on non-zero exit.
function agent(stage, prompt) {
  return new Promise((resolve, reject) => {
    const [cmd, args] = commandFor(stage, prompt);
    console.log(`\n>>> ${engine} ${stage} ...`);
    if (dry) {
      console.log(`[dry] would run: ${cmd} ${args.map((a) => (a === prompt ? `"<prompt ${prompt.length} chars>"` : a)).join(' ')}`);
      return resolve();
    }
    const child = spawn(cmd, args, { stdio: 'inherit', shell: process.platform === 'win32' });
    child.on('error', (e) => reject(new Error(`Could not launch "${cmd}". Is it installed and on PATH? ${e.message}`)));
    child.on('close', (code) => (code === 0 ? resolve() : reject(new Error(`${cmd} ${stage} exited ${code}`))));
  });
}

// Run a node script of this repo, echoing and returning its output.
function script(file, args) {
  return new Promise((resolve) => {
    const child = spawn(process.execPath, [path.join(paths.root, 'scripts', file), ...args], {
      stdio: ['ignore', 'pipe', 'pipe'],
    });
    let out = '';
    child.stdout.on('data', (d) => (process.stdout.write(d), (out += d)));
    child.stderr.on('data', (d) => (process.stderr.write(d), (out += d)));
    child.on('close', (code) => resolve({ code, out }));
  });
}

const mdIn = (dir) => (fs.existsSync(dir) ? fs.readdirSync(dir).filter((f) => f.endsWith('.md')) : []);

const CONTEXT =
  `You are running the wp-blog-agent pipeline for client "${client.name}". ` +
  `Read AGENTS.md and clients/${client.name}.json first. ` +
  `The skills are in .agents/skills/<name>/SKILL.md: open the one named for your stage and follow it. ` +
  `Content language: ${client.language || 'en'}. ` +
  `Obey every rule in content.forbidden. Never touch git. Never call WordPress directly.`;

try {
  // 1. RESEARCH
  const briefsBefore = mdIn(paths.briefs).length;
  await agent(
    'research',
    `${CONTEXT}\nRun STAGE 1 (RESEARCH) using the wp-keyword-research skill. ` +
      `Pick the ${N} least-covered verticals in clients/${client.name}.json. For each, mine real ` +
      `questions with scripts/autocomplete.mjs (if it fails or returns nothing, STOP and say the ` +
      `network is blocked), cluster by intent, then use web search to find level 1-3 sources and ` +
      `OPEN each page before listing it under "## Fonti verificate" with a sentence copied verbatim. ` +
      `Write exactly ONE brief-<slug>.md per article into workspace/briefs/ (winnable keyword, clear ` +
      `intent, points at that vertical's moneyPage). Target ${N} briefs. Do NOT write full articles. ` +
      `List the brief paths and, for each, how many sources you opened.`
  );
  if (!dry && mdIn(paths.briefs).length === briefsBefore) {
    throw new Error('the research stage wrote no brief (network blocked, or nothing winnable). Nothing to write.');
  }

  // 2. WRITE
  await agent(
    'write',
    `${CONTEXT}\nRun STAGE 2 (WRITE) using the wp-article-write skill. For every ` +
      `workspace/briefs/brief-<slug>.md with no matching workspace/ready/<slug>.md or ` +
      `workspace/published/<slug>.md, write the full article as Markdown with YAML frontmatter ` +
      `(title, slug, category, tags, excerpt) into workspace/ready/<slug>.md. Answer-first intro, ` +
      `H2s as real questions, an FAQ section, one natural link to the vertical money page. ` +
      `Numbers, studies and external links ONLY from the brief's "## Fonti verificate"; if it says ` +
      `"Nessuna.", no statistics at all. Write in ${client.language || 'en'}. List files written.`
  );

  // 3. REVIEW
  await agent(
    'review',
    `${CONTEXT}\nRun STAGE 3 (REVIEW) using the wp-article-review skill. For each ` +
      `workspace/ready/*.md, do a final editorial pass: every number and external link must come ` +
      `from the brief's "## Fonti verificate" (remove anything else, never add sources), brand ` +
      `voice, obey content.forbidden, confirm the money-page link and valid frontmatter. Edit in ` +
      `place. Print one PASS/FIX line per article.`
  );

  // 4. CHECK (deterministic) + one FIX pass
  if (!dry) {
    console.log('\n>>> check (evidence) ...');
    let check = await script('check.mjs', [name]);
    if (check.code === 2) throw new Error('the evidence check had no network; nothing was verified.');
    if (check.code === 1) {
      await agent(
        'fix',
        `${CONTEXT}\nThe deterministic evidence check (scripts/check.mjs) failed on some articles in ` +
          `workspace/ready/. Its report:\n\n${check.out}\n\nFor every ERROR line, edit the article in ` +
          `place: remove the claim, the number or the link it names, and rewrite the sentence so it ` +
          `still reads well without it. Do NOT add new sources, do NOT edit the briefs, do NOT touch ` +
          `articles marked PASS. Print one line per article you changed.`
      );
      console.log('\n>>> check (after fix) ...');
      check = await script('check.mjs', [name]);
      if (check.code === 1) console.log('\nSome articles still fail: they stay in workspace/ready/ and are not published.');
    }
  }

  // 5. PUBLISH (deterministic — publish.mjs checks again and skips failing articles)
  if (doPublish) {
    console.log('\n>>> publish (drafts) ...');
    const pub = dry ? { code: 0 } : await script('publish.mjs', [name]);
    if (pub.code !== 0) throw new Error(`publish exited ${pub.code}`);
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
