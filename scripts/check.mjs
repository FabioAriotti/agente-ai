// scripts/check.mjs — deterministic evidence check on the ready articles (see lib/check.mjs).
// Usage: npm run check -- <client-name> [--file path.md]
//
// Exit 0: every article passes. Exit 1: at least one article has errors (it will not be
// published). Exit 2: no network, nothing was checked.
import fs from 'node:fs';
import path from 'node:path';
import { loadClient, paths } from '../lib/config.mjs';
import { checkArticle, formatResult, networkAvailable } from '../lib/check.mjs';

function arg(flag) {
  const i = process.argv.indexOf(flag);
  return i !== -1 ? process.argv[i + 1] : undefined;
}

const name = process.argv[2];
const singleFile = arg('--file');

try {
  const client = loadClient(name, { requireCredentials: false });
  const files = singleFile
    ? [path.resolve(singleFile)]
    : fs.existsSync(paths.ready)
      ? fs.readdirSync(paths.ready).filter((f) => f.endsWith('.md')).map((f) => path.join(paths.ready, f))
      : [];

  if (files.length === 0) {
    console.log('Nothing to check — workspace/ready/ has no .md files.');
    process.exit(0);
  }
  if (!(await networkAvailable())) {
    console.error(
      'ERROR: no network, the sources cannot be opened, so nothing was checked.\n' +
        'Run this outside the Codex sandbox, or allow network access (README, section "Codex").'
    );
    process.exit(2);
  }

  let failed = 0;
  for (const file of files) {
    const r = await checkArticle(file, client);
    if (r.errors.length) failed++;
    console.log(formatResult(r));
  }
  console.log(`\n${files.length - failed}/${files.length} article(s) pass the evidence check.`);
  if (failed) {
    console.log('Articles with ERROR lines are not published. Fix them by removing the claim or the link, then run the check again.');
  }
  process.exit(failed ? 1 : 0);
} catch (e) {
  console.error(`\nFAILED: ${e.message}`);
  process.exit(1);
}
