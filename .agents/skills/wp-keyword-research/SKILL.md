---
name: wp-keyword-research
description: Turn a client vertical into ready-to-write article briefs grounded in real observed queries. Use as stage 1 of the wp-blog-agent pipeline. Mines Google Autocomplete for real questions, clusters by intent, and writes one brief-<slug>.md per article into workspace/briefs/.
---

# Keyword research → briefs

Turn a client's topic cluster into winnable article briefs, grounded in the queries
people actually type — not invented volumes.

## Inputs
- `clients/<client>.json` → `content.verticals[]` (each has `name`, `seeds[]`, `moneyPage`).
- `scripts/autocomplete.mjs` → free Google Autocomplete miner (real questions, no volume).

## Method
1. Read the client config. Pick the verticals you were told to cover this run.
2. For each seed in the chosen verticals, run:
   `node scripts/autocomplete.mjs "<seed>" --lang <language> --gl <country> --json`
   Use the client's `language` and an appropriate country code.
   **If the script exits with an error (network blocked), or every seed returns
   `"count": 0`, STOP.** Write no brief and tell the user the network is blocked.
   Never fill the questions list from memory: that is exactly how fake "real
   questions" end up in articles.
3. Pool the returned queries. Cluster them by **search intent**:
   - informational ("what is…", "how to…"), commercial ("best…", "… vs …"),
     transactional ("… near me", "hire…", "pricing").
4. Drop off-topic, duplicate, and anything unrelated to the client's business.
5. For each vertical pick ONE winnable article: a specific question or long-tail
   phrase with clear intent that a small site can realistically rank for. Avoid
   head terms the client cannot win yet.
6. **Collect sources, if you can browse.** Use web search to find level 1-3
   sources (`.claude/rules/01-principi-fondamentali.md`) for the facts the
   article will need. **Open each page** and copy, verbatim, the sentence that
   contains the fact. A search snippet is not an opened page; a URL you did not
   open does not go in the brief. If you cannot browse, or find nothing of level
   1-3, write `Nessuna.` in the section: the article will stay qualitative.

## Output — one brief per article
Write `workspace/briefs/brief-<slug>.md` (slug = kebab-case of the title):

```markdown
---
title: "Working H1 / article title (a real question or phrase)"
slug: "kebab-case-slug"
vertical: "<vertical name from config>"
targetKeyword: "the main query this article targets"
intent: "informational | commercial | transactional"
moneyPage: "<that vertical's moneyPage>"
category: "<WordPress category to file it under>"
---

## Angle
One paragraph: what this article answers and why it is winnable.

## Real questions to cover (from autocomplete)
- question 1
- question 2
- question 3
- ... (the H2 / FAQ skeleton)

## Fonti verificate
- url: https://www.example.gov/report-2026
  editore: Name of the publisher
  data: 2026-03
  livello: 1
  citazione: "The exact sentence copied from the page, containing the number or fact."

## Notes
Anything the writer must know (what NOT to claim, the CTA target, tone reminders).
```

The source above shows the format only: never copy it. `url:` is the bare URL, not a
Markdown link. Write `Nessuna.` under `## Fonti verificate` when there are no opened,
level 1-3 sources.

## Rules
- Never invent search volume. Autocomplete proves a query EXISTS, nothing about its size.
- Never write a URL from memory. Every URL in `## Fonti verificate` was opened in this
  session and its `citazione` is copied from that page, not paraphrased.
- One brief file per article. Do not write article bodies here.
- Do not duplicate a slug that already exists in `workspace/briefs/` or `workspace/published/`.
- Do not touch git. Do not call WordPress.
