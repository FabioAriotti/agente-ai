# wp-blog-agent

An autonomous SEO blog agent for WordPress. It researches keywords, writes full articles,
does an editorial QA pass, and publishes them to a WordPress site **as drafts** for human
review. Text-first (no image generation), and it supports **multiple client sites** from one
install.

Pipeline: **Research → Write → Review → Publish (draft)**.

---

## 1. What you need

- **Node.js 18 or newer** — check with `node --version`.
- **A WordPress site** with the REST API reachable (open `https://SITE/wp-json/` in a
  browser — it must return JSON, not an error page).
- **A WordPress user** with the **Editor** or **Administrator** role, and one
  **Application Password** for that user (steps below).
- **Claude Code CLI** installed and signed in — only needed for the *writing* stages
  (research/write/review). Publishing to WordPress does **not** need Claude. Install:
  `npm i -g @anthropic-ai/claude-code`, then run `claude` once to sign in.

---

## 2. Install

```bash
cd wp-blog-agent
npm install
cp .env.example .env
```

> Do not run this from a cloud-synced folder (iCloud/Dropbox/OneDrive) — it can corrupt
> `node_modules`. Move the folder somewhere local first (e.g. `~/wp-blog-agent`).

---

## 3. Get a WordPress Application Password

1. Log into WordPress as an Editor or Administrator.
2. Go to **Users → Profile** (or **Users → All Users → your user → Edit**).
3. Scroll to **Application Passwords**.
4. Type a name (e.g. `blog-agent`) and click **Add New Application Password**.
5. Copy the password WordPress shows you — it looks like `abcd EFGH 1234 wxyz 5678 ijkl`.
   **Keep the spaces.** You only see it once.
6. Paste it into `.env` next to the right variable name.

**If you don't see "Application Passwords":** it is disabled (often by a security plugin like
Wordfence/iThemes, or on plain HTTP). Enable Application Passwords, or serve the site over
HTTPS. On **WordPress.com**, Application Passwords need a **Business plan or higher**.

---

## 4. Configure a client

Each client site is one JSON file in `clients/`. Copy the example and edit it:

```bash
cp clients/example-client.json clients/acme.json
```

Edit `clients/acme.json`:
- `wp.url` — the site, e.g. `https://acme.com`
- `wp.user` — the WordPress username
- `wp.appPasswordEnv` — the name of the `.env` variable holding this client's password
- `language` — `en`, `it`, `es`, … (the language articles are written in)
- `content.verticals[]` — the topic clusters, their seed keywords, and each cluster's
  money page (the page an article should link to)
- `content.moneyPage`, `tone`, `audience`, `forbidden` — brand context and hard rules

Then add the password to `.env`:
```
WP_APP_PASSWORD_ACME="abcd EFGH 1234 wxyz 5678 ijkl"
```
(The variable name must match `wp.appPasswordEnv` in the client JSON.)

---

## 5. Test the connection

```bash
npm run test:wp -- acme
```
You should see `Connected.` and the authenticated user. If it fails, the output lists exactly
what to check.

---

## 6. Run it

### Automated (the agent does everything)
```bash
node orchestrate.mjs acme --publish
```
Research → write → review → create WordPress drafts. Drop `--publish` to stop before
publishing and review the files in `workspace/ready/` first. Add `--dry` to see the stages
without calling Claude.

### Manual / interactive (more control)
1. Mine keyword ideas (free, no key):
   ```bash
   npm run keywords -- "your seed keyword" --lang en --gl us
   ```
2. Open Claude Code in this folder and ask it to "run the pipeline for acme" — it uses the
   skills in `.claude/skills/` (research → write → review), writing files into `workspace/`.
3. Publish the reviewed drafts:
   ```bash
   npm run publish -- acme
   ```
   Each draft's edit link is printed. Review in WordPress, then hit Publish yourself.

---

## 7. Schedule it (optional)

Run it automatically, e.g. nightly. The command to schedule is:
```bash
cd /path/to/wp-blog-agent && node orchestrate.mjs acme --publish >> run.log 2>&1
```
- **macOS/Linux:** add it to `crontab -e`, e.g. `0 2 * * * ` + the command (runs 02:00 daily).
- **Windows:** use Task Scheduler with the same command.

Because articles publish as **drafts**, unattended runs never put unreviewed content live.

---

## 8. How it's organized

```
wp-blog-agent/
  clients/<name>.json        one file per client site (config, no secrets)
  .env                       secrets: one Application Password per client (never commit)
  scripts/
    wp-test.mjs              test the WordPress connection
    autocomplete.mjs         free keyword miner (Google Autocomplete)
    publish.mjs              markdown -> HTML -> WordPress draft
  .claude/skills/            the agent's instructions per stage (research/write/review/publish)
  orchestrate.mjs            run all stages for one client, unattended
  workspace/
    briefs/                  research output (one brief per article)
    ready/                   finished articles, before publish
    published/              articles already sent to WordPress
```

---

## 9. Notes & limits

- **Drafts, not live posts.** By design. Change `publish.status` to `"publish"` per client
  only if you truly want auto-publish.
- **Text only.** No images are generated. WordPress uses its default/featured-image behavior;
  add a featured image in the dashboard if you want one.
- **SEO meta (Yoast/RankMath):** the article's `excerpt` is sent as the post excerpt, which
  those plugins use as a meta-description fallback. Setting their dedicated title/meta fields
  via the API needs extra plugin configuration — ask your developer if you need it.
- **Keyword volumes:** this version uses free real-question mining (Autocomplete) plus your
  Search Console data for prioritization. Exact search volumes (Google Keyword Planner) can be
  added later.
