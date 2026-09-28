// lib/check.mjs — deterministic evidence check on a ready article (rule 53, the mechanical part).
//
// A model reviewing a model does not catch invented sources: both "remember" the same
// plausible URL. This check does not ask anyone: it opens every cited page and looks for
// the cited numbers in it. Errors block publishing; warnings are for a human to look at.
//
//   - every external link must be listed under "## Fonti verificate" in the brief;
//   - every external link must exist (404 / unknown domain = invented);
//   - every percentage, "N volte", "secondo uno studio" needs a link in the same paragraph,
//     and its number must appear on the linked page;
//   - the brief's verbatim sentence must appear on the page it claims to come from;
//   - no em dash if the client forbids it.
import fs from 'node:fs';
import path from 'node:path';
import dns from 'node:dns/promises';
import net from 'node:net';
import matter from 'gray-matter';
import { paths } from './config.mjs';

const TIMEOUT_MS = 15000;
const MAX_BYTES = 3 * 1024 * 1024;
const MAX_REDIRECTS = 5;

// Statistics that always need a source (rule 53: "statistiche senza fonte").
const PERCENT = /(?<![\d.,])(\d{1,3}(?:[.,]\d+)?)\s?(?:%|per ?cento\b|percent\b)/gi;
const TIMES = /(?<![\d.,])(\d+(?:[.,]\d+)?)\s?(?:volte|times|x)\s+(?:più|meno|more|less|fewer)\b/gi;
// Claims that announce a study without naming it (rule 53: "segnali deboli").
const WEAK =
  /\b(secondo (?:un|uno|una|il|lo|la|i|gli|le|alcun[ie]|recenti|diversi|vari)?\s*(?:studio|studi|ricerca|ricerche|report|rapporto|sondaggio|indagine|analisi|dati|esperti)|(?:gli|diversi|numerosi|recenti) studi (?:dimostrano|mostrano|indicano|confermano)|la ricerca (?:dimostra|mostra|indica)|i dati (?:mostrano|dicono|indicano)|according to (?:a |an |the |recent )?(?:study|survey|report|research|data)|studies (?:show|suggest|prove)|research (?:shows|suggests|proves)|a (?:recent )?survey (?:found|shows))/i;
const MONEY = /(?:€|\$|£)\s?\d[\d.,]*|\d[\d.,]*\s?(?:€|euro\b|dollari\b|milioni\b|miliardi\b|million\b|billion\b)/gi;

// ---------- brief ----------

export function briefFor(slug) {
  const file = path.join(paths.briefs, `brief-${slug}.md`);
  if (!fs.existsSync(file)) return null;
  const { data, content } = matter(fs.readFileSync(file, 'utf8'));
  const m = content.match(/^##\s+Fonti verificate\s*$([\s\S]*?)(?=^##\s|(?![\s\S]))/im);
  const sources = [];
  if (m) {
    let cur = null;
    for (const line of m[1].split('\n')) {
      // Bare URL or a Markdown link: agents write "url: [Title](https://…)" as often as not.
      const url = /^\s*-\s*url:/i.test(line) && line.match(/https?:\/\/[^\s)<>\]"]+/);
      if (url) {
        cur = { url: url[0], citazione: '' };
        sources.push(cur);
        continue;
      }
      const cit = line.match(/^\s*citazione:\s*(.+)$/i);
      if (cit && cur) cur.citazione = cit[1].trim().replace(/^["“«']|["”»']$/g, '');
    }
  }
  return { file, moneyPage: data.moneyPage, hasSection: !!m, sources };
}

// ---------- fetching (rule 53, points 1-3: validate before opening) ----------

function isPrivate(ip) {
  if (net.isIPv4(ip)) {
    const [a, b] = ip.split('.').map(Number);
    return (
      a === 0 || a === 10 || a === 127 || (a === 100 && b >= 64 && b <= 127) ||
      (a === 169 && b === 254) || (a === 172 && b >= 16 && b <= 31) ||
      (a === 192 && b === 168) || a >= 224
    );
  }
  const x = ip.toLowerCase();
  if (x.startsWith('::ffff:')) return isPrivate(x.slice(7));
  return x === '::' || x === '::1' || x.startsWith('fc') || x.startsWith('fd') || x.startsWith('fe8') || x.startsWith('fe9') || x.startsWith('fea') || x.startsWith('feb');
}

async function assertPublic(u) {
  if (!['http:', 'https:'].includes(u.protocol)) throw Object.assign(new Error(`scheme ${u.protocol} not allowed`), { kind: 'bad' });
  const host = u.hostname.replace(/^\[|\]$/g, '');
  let addrs;
  try {
    addrs = net.isIP(host) ? [{ address: host }] : await dns.lookup(host, { all: true });
  } catch (e) {
    throw Object.assign(new Error(`domain does not exist (${e.code || e.message})`), { kind: 'dead' });
  }
  if (addrs.some((a) => isPrivate(a.address))) throw Object.assign(new Error('private/local address'), { kind: 'bad' });
}

async function readCapped(res) {
  const reader = res.body?.getReader();
  if (!reader) return '';
  const chunks = [];
  let size = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.length;
    chunks.push(value);
    if (size > MAX_BYTES) {
      await reader.cancel();
      break;
    }
  }
  return Buffer.concat(chunks).toString('utf8');
}

const ENTITIES = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', rsquo: '’', lsquo: '‘', rdquo: '”', ldquo: '“', laquo: '«', raquo: '»', ndash: '–', mdash: '—', hellip: '…', egrave: 'è', eacute: 'é', agrave: 'à', igrave: 'ì', ograve: 'ò', ugrave: 'ù', Egrave: 'È', Agrave: 'À' };

function htmlToText(html) {
  return html
    .replace(/<(script|style|noscript|svg|template)[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/&([a-z]+);/gi, (m, n) => ENTITIES[n] ?? m);
}

const pageCache = new Map();

// Returns { ok, status, text, kind, reason }. kind: 'dead' (invented/removed), 'blocked'
// (exists but we cannot read it: 403, paywall, PDF, timeout), 'bad' (unsafe URL).
// lang sets Accept-Language; without it the server picks its default language.
export function fetchPage(url, lang) {
  const key = `${lang || ''}|${url}`;
  if (!pageCache.has(key)) pageCache.set(key, doFetch(url, lang));
  return pageCache.get(key);
}

// Sites like Google's docs translate the same URL by Accept-Language: the agent may have
// read the English page and we the Italian one. A fact counts as missing only if it is
// missing in every language we can ask for.
const LANGS = [undefined, 'en-US,en;q=0.9', 'it-IT,it;q=0.9'];
async function foundOnPage(url, test) {
  for (const lang of LANGS) {
    const page = await fetchPage(url, lang);
    if (page.ok && test(page.text)) return true;
  }
  return false;
}

async function doFetch(url, lang) {
  let u;
  try {
    u = new URL(url);
  } catch {
    return { ok: false, kind: 'bad', reason: 'not a valid URL' };
  }
  try {
    for (let hop = 0; hop <= MAX_REDIRECTS; hop++) {
      await assertPublic(u);
      const res = await fetch(u, {
        redirect: 'manual',
        signal: AbortSignal.timeout(TIMEOUT_MS),
        headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0 Safari/537.36',
          Accept: 'text/html,application/xhtml+xml,*/*;q=0.8',
          ...(lang ? { 'Accept-Language': lang } : {}),
        },
      });
      if (res.status >= 300 && res.status < 400 && res.headers.get('location')) {
        u = new URL(res.headers.get('location'), u);
        continue;
      }
      if (res.status === 404 || res.status === 410) return { ok: false, status: res.status, kind: 'dead', reason: `HTTP ${res.status}` };
      if (!res.ok) return { ok: false, status: res.status, kind: 'blocked', reason: `HTTP ${res.status}` };
      const type = res.headers.get('content-type') || '';
      if (type.includes('pdf')) return { ok: false, status: res.status, kind: 'blocked', reason: 'PDF (verify by hand)' };
      const body = await readCapped(res);
      const text = type.includes('html') || /<html|<body/i.test(body.slice(0, 2000)) ? htmlToText(body) : body;
      return { ok: true, status: res.status, text };
    }
    return { ok: false, kind: 'blocked', reason: 'too many redirects' };
  } catch (e) {
    if (e.kind) return { ok: false, kind: e.kind, reason: e.message };
    return { ok: false, kind: 'blocked', reason: e.name === 'TimeoutError' ? 'timeout' : e.cause?.code || e.message };
  }
}

// Without network every link looks dead: refuse to judge instead of blocking everything.
export async function networkAvailable() {
  try {
    await dns.lookup('www.google.com');
    const res = await fetch('https://www.google.com/generate_204', { signal: AbortSignal.timeout(8000) });
    return res.status < 500;
  } catch {
    return false;
  }
}

// ---------- text helpers ----------

function norm(s) {
  return s
    .normalize('NFKC')
    .toLowerCase()
    .replace(/[‘’`´]/g, "'")
    .replace(/[“”«»„]/g, '"')
    .replace(/[‐-―−]/g, '-')
    .replace(/\s+/g, ' ')
    .trim();
}

// "3,5" and "3.5" are the same number; "25.0" and "25" too. Percentages and multipliers
// never carry thousands separators, so a comma or a dot here is always the decimal one.
const canon = (s) => String(parseFloat(s.replace(',', '.')));

// What a statistic from the article must match on its source page: a percentage must be
// a percentage there too ("83%", "83 per cento"), not any "83" in a footnote number;
// a multiplier must be a number there. It proves the number was not made up, not that it
// is used in the right context: that stays the review's job.
function pageStats(text) {
  const percents = new Set();
  const numbers = new Set();
  for (const m of text.matchAll(PERCENT)) percents.add(canon(m[1]));
  for (const m of text.matchAll(/(?<![\d.,])\d+(?:[.,]\d+)?(?![\d])/g)) numbers.add(canon(m[0]));
  return { percents, numbers };
}

// The text a reader sees: link targets removed, so "%20" inside a URL is not a statistic.
const visible = (block) =>
  block
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/<https?:\/\/[^>]+>/g, ' ')
    .replace(/https?:\/\/[^\s)<>\]]+/g, ' ');

function stripMarkdownCode(md) {
  return md.replace(/```[\s\S]*?```/g, '').replace(/`[^`]*`/g, '');
}

// Paragraphs, list items and table rows: the unit a claim and its link must share.
function blocks(md) {
  const out = [];
  for (const para of stripMarkdownCode(md).split(/\n\s*\n/)) {
    const lines = para.split('\n');
    let cur = [];
    for (const line of lines) {
      if (/^\s*([-*+]|\d+[.)]|\|)\s/.test(line) && cur.length) {
        out.push(cur.join(' '));
        cur = [];
      }
      cur.push(line);
    }
    if (cur.length) out.push(cur.join(' '));
  }
  return out.map((b) => b.trim()).filter(Boolean);
}

function linksIn(text) {
  const links = [];
  for (const m of text.matchAll(/\[[^\]]*\]\(\s*<?([^)\s>]+)>?(?:\s+"[^"]*")?\s*\)/g)) links.push(m[1]);
  for (const m of text.matchAll(/<(https?:\/\/[^>\s]+)>/g)) links.push(m[1]);
  const withoutMd = text.replace(/\[[^\]]*\]\([^)]*\)/g, ' ').replace(/<https?:\/\/[^>]+>/g, ' ');
  for (const m of withoutMd.matchAll(/https?:\/\/[^\s)<>\]]+/g)) links.push(m[0].replace(/[.,;:!?]+$/, ''));
  return links;
}

const sameUrl = (a, b) => {
  const k = (x) => {
    try {
      const u = new URL(x);
      return (u.host.replace(/^www\./, '') + u.pathname.replace(/\/+$/, '') + u.search).toLowerCase();
    } catch {
      return x;
    }
  };
  return k(a) === k(b);
};

// ---------- the check ----------

export async function checkArticle(file, client) {
  const errors = [];
  const warnings = [];
  const raw = fs.readFileSync(file, 'utf8');
  let parsed;
  try {
    parsed = matter(raw);
  } catch (e) {
    return { file, slug: path.basename(file, '.md'), errors: [`frontmatter does not parse: ${e.message}`], warnings };
  }
  const { data, content } = parsed;
  const slug = data.slug || path.basename(file, '.md');

  for (const k of ['title', 'slug', 'excerpt']) if (!data[k]) errors.push(`frontmatter: "${k}" missing`);
  if (!Array.isArray(data.tags)) warnings.push('frontmatter: "tags" is not an array');

  const siteHost = (() => {
    try {
      return new URL(client.wp.url).host.replace(/^www\./, '');
    } catch {
      return '';
    }
  })();
  const isExternal = (href) => {
    if (!/^https?:\/\//i.test(href)) return false; // relative links are internal
    try {
      return new URL(href).host.replace(/^www\./, '') !== siteHost;
    } catch {
      return true;
    }
  };

  const brief = briefFor(slug);
  if (!brief) warnings.push(`brief workspace/briefs/brief-${slug}.md not found: external links cannot be matched to verified sources`);
  else if (!brief.hasSection) warnings.push('brief has no "## Fonti verificate" section (old brief?): external links cannot be matched to verified sources');

  // Forbidden em dash.
  const forbidsEmDash = (client.content?.forbidden || []).some((f) => /em dash|trattin/i.test(f));
  const emDashes = (content.match(/—/g) || []).length + (String(data.title || '').match(/—/g) || []).length;
  if (forbidsEmDash && emDashes) errors.push(`${emDashes} em dash (—) in the text: forbidden by the client config`);

  // Money page.
  const moneyPage = brief?.moneyPage || client.content?.moneyPage;
  const allLinks = linksIn(content);
  if (moneyPage && !allLinks.some((l) => sameUrl(l, moneyPage))) warnings.push(`no link to the money page ${moneyPage}`);

  // Every external link: listed in the brief, and alive.
  const external = [...new Set(allLinks.filter(isExternal))];
  const inBrief = (url) => brief?.sources.some((s) => sameUrl(s.url, url));
  for (const url of external) {
    if (brief?.hasSection && !inBrief(url)) errors.push(`link not in the brief's "Fonti verificate": ${url} (a URL the research stage never opened)`);
    const page = await fetchPage(url);
    if (!page.ok && page.kind === 'dead') errors.push(`dead link, probably invented: ${url} (${page.reason})`);
    else if (!page.ok && page.kind === 'bad') errors.push(`unsafe or invalid URL: ${url} (${page.reason})`);
    else if (!page.ok) warnings.push(`cannot be read automatically, verify by hand: ${url} (${page.reason})`);
  }

  // The brief's verbatim sentence must be on the page, for every source the article uses.
  for (const s of brief?.sources || []) {
    if (!external.some((u) => sameUrl(u, s.url)) || !s.citazione) continue;
    const page = await fetchPage(s.url);
    if (!page.ok) continue;
    if (page.text.replace(/\s+/g, ' ').length < 500) {
      warnings.push(`page almost empty (JavaScript-rendered?), verify by hand: ${s.url}`);
      continue;
    }
    const quote = norm(s.citazione);
    if (!(await foundOnPage(s.url, (text) => norm(text).includes(quote)))) {
      errors.push(`the brief's citazione is not on the page it claims to come from: ${s.url} ("${s.citazione.slice(0, 90)}${s.citazione.length > 90 ? '…' : ''}")`);
    }
  }

  // Statistics: need a link in the same block, and their number on that page.
  for (const block of blocks(content)) {
    const text = visible(block);
    if (/^#{1,6}\s/.test(block)) {
      if ([...text.matchAll(PERCENT)].length) warnings.push(`statistic in a heading, keep numbers in the text with their source: "${text.slice(0, 80)}"`);
      continue;
    }
    const links = linksIn(block).filter(isExternal);
    const stats = [
      ...[...text.matchAll(PERCENT)].map((m) => ({ shown: m[0].trim(), num: m[1], percent: true })),
      ...[...text.matchAll(TIMES)].map((m) => ({ shown: m[0].trim(), num: m[1], percent: false })),
    ];
    const weak = text.match(WEAK);

    if (!links.length) {
      for (const s of stats) errors.push(`"${s.shown}" has no source in the same paragraph: "${excerpt(text, s.shown)}"`);
      if (weak) errors.push(`"${weak[0]}" without a linked source: "${excerpt(text, weak[0])}"`);
      for (const m of text.matchAll(MONEY)) warnings.push(`amount "${m[0].trim()}" without a source, check it is real: "${excerpt(text, m[0])}"`);
      continue;
    }

    const pages = await Promise.all(links.map((l) => fetchPage(l)));
    const readable = links.filter((_, i) => pages[i].ok);
    const allDead = pages.every((p) => p.kind === 'dead'); // already an error above
    for (const s of stats) {
      if (!readable.length) {
        if (!allDead) warnings.push(`"${s.shown}": source not readable automatically, verify by hand (${links.join(', ')})`);
        continue;
      }
      const want = canon(s.num);
      const has = (text) => {
        const p = pageStats(text);
        return (s.percent ? p.percents : p.numbers).has(want);
      };
      let found = false;
      for (const url of readable) if (!found) found = await foundOnPage(url, has);
      if (!found) errors.push(`"${s.shown}" does not appear on the cited page ${links.join(', ')} (rule 53: NON TROVATA)`);
    }
  }

  return { file, slug, errors: [...new Set(errors)], warnings: [...new Set(warnings)] };
}

function excerpt(text, needle) {
  const plain = text.replace(/\s+/g, ' ');
  const i = Math.max(0, plain.indexOf(needle) - 60);
  return (i > 0 ? '…' : '') + plain.slice(i, i + 140).trim() + (plain.length > i + 140 ? '…' : '');
}

export function formatResult(r) {
  const lines = [`${r.errors.length ? 'FAIL' : 'PASS'} ${r.slug}${r.warnings.length ? ` (${r.warnings.length} warning)` : ''}`];
  for (const e of r.errors) lines.push(`  ERROR ${e}`);
  for (const w of r.warnings) lines.push(`  WARN  ${w}`);
  return lines.join('\n');
}
