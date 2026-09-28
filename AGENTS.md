# wp-blog-agent — project instructions (Codex, Claude Code and any agent)

This repository is an autonomous SEO blog pipeline that researches, writes, reviews and
publishes **draft** articles to WordPress. It is text-first (no image generation) and
multi-client.

This is the only instruction file. Codex reads it as `AGENTS.md`; Claude Code reads
`CLAUDE.md`, which imports this file. Do not duplicate rules elsewhere.

## Read first
1. This file.
2. `README.md` (how it installs and runs).
3. The config of the client you are working on: `clients/<name>.json`.

## The pipeline (stages)
1. **Research** — skill `wp-keyword-research` → `workspace/briefs/brief-<slug>.md`
2. **Write** — skill `wp-article-write` → `workspace/ready/<slug>.md`
3. **Review** — skill `wp-article-review` → edits `workspace/ready/*.md` in place
4. **Check** — run `npm run check -- <name>` → deterministic source and link check
5. **Publish** — run `npm run publish -- <name>` → creates WordPress **drafts**

The skills live in `.agents/skills/<name>/SKILL.md` (`.claude/skills` is a link to the
same folder). If your agent does not load skills by itself, open the `SKILL.md` of the
stage you are in and follow it.

When invoked to "run the pipeline for <client>", either drive these stages in order
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

## Evidence: what the agent may state as fact

Hallucinations come from being asked for evidence without having it. These rules close
that gap and win over anything in `.claude/rules/`.

- **Real questions come only from `scripts/autocomplete.mjs`.** If it exits with an error
  or returns `"count": 0` for every seed, **stop the run** and tell the user the network is
  blocked (see README, section "Codex"). Never write "real questions" from memory.
- **A source exists only if you opened the page in this session.** In the research stage,
  every source goes into the brief's `## Fonti verificate` section with the URL, the
  publisher, the date and **a sentence copied verbatim from the page** that contains the
  fact. A search result snippet is not an opened page.
- **The writer may cite only the sources listed in the brief**, and only the facts contained
  in their verbatim sentence. No other external link, no other number presented as data.
- **Zero sources is a valid outcome.** If you cannot browse, or find nothing of level 1-3,
  the article stays qualitative: explanations, steps, criteria, no statistics. Leaving a
  number out is always acceptable; a number without its source never is.
- **Never write a URL from memory.** Not even of well-known sites: deep links are the most
  common thing models invent, and they return 404.
- `npm run check` fetches every cited page and looks for the cited numbers in it. An article
  that fails is not published. Fix the article (remove the claim or the link); never edit
  the brief to make the check pass.

## Regole editoriali (`.claude/rules/`)

Le regole di scrittura, SEO e controllo qualità stanno in `.claude/rules/`,
scritte da Fabio Ariotti. Sono documenti di regole, non skill: non si caricano
tutte, si carica quella della fase in cui si sta lavorando. Valgono per
qualunque agente, anche se la cartella si chiama `.claude`.

- Leggi **sempre** `.claude/rules/01-principi-fondamentali.md`.
- `.claude/rules/00-INDICE.md` mappa i 34 file per fase.
- Aggancio agli stadi della pipeline:
  - Research → regole 20 (disciplina di ricerca), 21 (brief), 22 (outline), 23-25.
  - Write → regola 30. Elementi: 43 (schema).
  - Review → regole 50 (punteggio 100), 51 (SEO on-page), 52 (citabilità AI), 53 (verifica fonti).
  - Publish → regola 44 per tag e categorie (sempre tramite `scripts/publish.mjs`).

Precedenza in caso di conflitto: `clients/<nome>.json` → questo file →
`.claude/rules/01` → gli altri file di regole.

### Deroghe della pipeline alle regole

Le regole sono scritte per un lavoro editoriale completo; questa pipeline è
testuale e gira senza una persona accanto. Quindi, per `wp-blog-agent`:

- **Niente immagini, grafici, video, audio.** Le parti delle regole 01, 30, 40,
  41 e 42 che li chiedono (copertina, 3-5 immagini inline, 2-4 grafici, video
  YouTube, testo alternativo, varietà dei grafici) **non si applicano** e non
  tolgono punti nella regola 50.
- **Le "8-12 statistiche" della regola 30 sono un tetto, non una quota.** Si usano
  solo quelle presenti in `## Fonti verificate` del brief. Se sono zero, l'articolo
  resta qualitativo e non perde punti per questo.
- **La scaletta non si presenta al cliente per approvazione** (regola 30, fase 3):
  il controllo umano è la bozza in WordPress.

## Secrets
WordPress Application Passwords live in `.env` (never committed), keyed by the env var named
in each client's `wp.appPasswordEnv`. If a credential is missing, stop and tell the user which
`.env` line to fill — do not guess.

## What is intentionally NOT here (roadmap)
- Image generation (articles are text-only by design).
- Cross-article interlinking automation.
- Google Keyword Planner volume integration (autocomplete + Search Console cover research for now).
