# wp-blog-agent — project instructions for Claude Code

This repository is an autonomous SEO blog pipeline that researches, writes, reviews and
publishes **draft** articles to WordPress. It is text-first (no image generation) and
multi-client.

## Read first
1. This file.
2. `README.md` (how it installs and runs).
3. The config of the client you are working on: `clients/<name>.json`.

## The pipeline (stages)
1. **Research** — skill `wp-keyword-research` → `workspace/briefs/brief-<slug>.md`
2. **Write** — skill `wp-article-write` → `workspace/ready/<slug>.md`
3. **Review** — skill `wp-article-review` → edits `workspace/ready/*.md` in place
4. **Publish** — run `npm run publish -- <name>` → creates WordPress **drafts**

When invoked to "run the pipeline for <client>", either drive these skills in order
yourself, or tell the user to run `node orchestrate.mjs <client> --publish`.

## Inviolable rules
- **Content language is per-client** (`clients/<name>.json` → `language`). Do not assume English.
- **Publish only as draft** unless the client config `publish.status` says otherwise. A human
  reviews in WordPress before anything goes live.
- **Never call the WordPress REST API by hand.** Publishing goes through `scripts/publish.mjs`.
- **Never invent statistics, studies, sources or client offerings.** Only reference services
  listed in the client config.
- Obey every entry in the client's `content.forbidden` (no em dashes, no AI filler, etc.).
- **Never touch git.** Do not commit or push.
- One brief per article; one ready file per brief; do not duplicate existing slugs.

## Secrets
WordPress Application Passwords live in `.env` (never committed), keyed by the env var named
in each client's `wp.appPasswordEnv`. If a credential is missing, stop and tell the user which
`.env` line to fill — do not guess.

## What is intentionally NOT here (roadmap)
- Image generation (articles are text-only by design).
- Cross-article interlinking automation.
- Google Keyword Planner volume integration (autocomplete + Search Console cover research for now).
