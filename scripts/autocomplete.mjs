// scripts/autocomplete.mjs — free keyword miner via Google Autocomplete (Suggest).
// No API key, no cost. Expands a seed with A-Z and question/modifier prefixes to
// surface the real queries people type. Gives QUESTIONS/ideas, NOT search volume.
//
// Usage:
//   npm run keywords -- "ai influencer"
//   npm run keywords -- "ai influencer" --lang it --gl it
//   npm run keywords -- "ai influencer" --json > ideas.json
import fs from 'node:fs';

function arg(flag, def) {
  const i = process.argv.indexOf(flag);
  return i !== -1 ? process.argv[i + 1] : def;
}

const seed = process.argv[2];
if (!seed || seed.startsWith('--')) {
  console.error('Usage: npm run keywords -- "<seed keyword>" [--lang en] [--gl us] [--json]');
  process.exit(1);
}

const lang = arg('--lang', 'en');
const gl = arg('--gl', 'us');
const asJson = process.argv.includes('--json');

const ALPHA = 'abcdefghijklmnopqrstuvwxyz'.split('');
const QUESTIONS = ['how', 'what', 'why', 'when', 'where', 'which', 'who', 'can', 'is', 'are', 'do', 'does', 'will'];
const MODIFIERS = ['best', 'vs', 'for', 'without', 'free', 'cheap', 'alternative', 'near me', 'examples', 'tips'];

async function suggest(query) {
  const url =
    `https://suggestqueries.google.com/complete/search?client=firefox` +
    `&hl=${encodeURIComponent(lang)}&gl=${encodeURIComponent(gl)}&q=${encodeURIComponent(query)}`;
  try {
    const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    if (!res.ok) return [];
    const data = await res.json(); // [ query, [suggestions...] ]
    return Array.isArray(data?.[1]) ? data[1] : [];
  } catch {
    return [];
  }
}

// Build the expansion set: seed, seed+letter, prefix+seed, seed+modifier.
const queries = new Set([seed]);
for (const c of ALPHA) queries.add(`${seed} ${c}`);
for (const q of QUESTIONS) queries.add(`${q} ${seed}`);
for (const m of MODIFIERS) queries.add(`${seed} ${m}`);

const results = new Set();

// Small concurrency to stay polite to Google.
const pool = [...queries];
const CONCURRENCY = 5;
async function worker() {
  while (pool.length) {
    const q = pool.shift();
    const sugs = await suggest(q);
    for (const s of sugs) results.add(s.toLowerCase());
  }
}
await Promise.all(Array.from({ length: CONCURRENCY }, worker));

const sorted = [...results].filter((s) => s.includes(seed.split(' ')[0])).sort();

if (asJson) {
  process.stdout.write(JSON.stringify({ seed, lang, gl, count: sorted.length, keywords: sorted }, null, 2));
} else {
  console.error(`\n${sorted.length} real queries for "${seed}" (lang=${lang}, gl=${gl}):\n`);
  for (const s of sorted) console.log(s);
  console.error(
    '\nThese are REAL queries (what people type), not search volumes. ' +
      'Use them for H2s/FAQ and topic ideas; confirm priority with Search Console / Keyword Planner.'
  );
}
