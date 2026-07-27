// scripts/publish.mjs — publish every ready article as a WordPress DRAFT.
// Usage: npm run publish -- <client-name> [--status draft|publish] [--file path.md]
//
// Reads workspace/ready/*.md (or a single --file), converts Markdown to HTML,
// resolves category + tags, creates the post as a draft, and moves the source
// file to workspace/published/ on success.
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { marked } from 'marked';
import { loadClient, paths } from '../lib/config.mjs';
import { ensureCategory, ensureTags, createPost, editUrl } from '../lib/wp.mjs';

function arg(flag) {
  const i = process.argv.indexOf(flag);
  return i !== -1 ? process.argv[i + 1] : undefined;
}

const name = process.argv[2];
const statusOverride = arg('--status');
const singleFile = arg('--file');

function readyFiles() {
  if (singleFile) return [path.resolve(singleFile)];
  if (!fs.existsSync(paths.ready)) return [];
  return fs
    .readdirSync(paths.ready)
    .filter((f) => f.endsWith('.md'))
    .map((f) => path.join(paths.ready, f));
}

try {
  const client = loadClient(name);
  const status = statusOverride || client.publish?.status || 'draft';
  const files = readyFiles();

  if (files.length === 0) {
    console.log('Nothing to publish — workspace/ready/ has no .md files.');
    process.exit(0);
  }

  fs.mkdirSync(paths.published, { recursive: true });
  console.log(`Publishing ${files.length} article(s) to ${client.wpAuth.root} as "${status}"\n`);

  let ok = 0;
  for (const file of files) {
    const raw = fs.readFileSync(file, 'utf8');
    const { data, content } = matter(raw);

    const title = data.title;
    if (!title) {
      console.error(`  SKIP ${path.basename(file)} — missing "title" in frontmatter.`);
      continue;
    }

    const html = marked.parse(content);
    const categoryName = data.category || client.publish?.defaultCategory || 'Blog';

    try {
      const categoryId = await ensureCategory(client.wpAuth, categoryName);
      const tagIds = await ensureTags(client.wpAuth, data.tags || []);

      const post = await createPost(client.wpAuth, {
        title,
        content: html,
        status,
        slug: data.slug || undefined,
        excerpt: data.excerpt || data.metaDescription || '',
        categories: [categoryId],
        tags: tagIds,
      });

      console.log(`  OK  "${title}"`);
      console.log(`      -> ${editUrl(client.wpAuth, post.id)}`);

      // Move the source out of ready/ so it is not published twice.
      const dest = path.join(paths.published, path.basename(file));
      if (!singleFile) fs.renameSync(file, dest);
      ok++;
    } catch (e) {
      console.error(`  FAIL "${title}" — ${e.message}`);
    }
  }

  console.log(`\nDone: ${ok}/${files.length} published as drafts.`);
  console.log('Review them in the WordPress dashboard before going live.');
} catch (e) {
  console.error(`\nFAILED: ${e.message}`);
  process.exit(1);
}
