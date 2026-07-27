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
3. Pool the returned queries. Cluster them by **search intent**:
   - informational ("what is…", "how to…"), commercial ("best…", "… vs …"),
     transactional ("… near me", "hire…", "pricing").
4. Drop off-topic, duplicate, and anything unrelated to the client's business.
5. For each vertical pick ONE winnable article: a specific question or long-tail
   phrase with clear intent that a small site can realistically rank for. Avoid
   head terms the client cannot win yet.

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

## Notes
Anything the writer must know (what NOT to claim, the CTA target, tone reminders).
```

## Rules
- Never invent search volume. Autocomplete proves a query EXISTS, nothing about its size.
- One brief file per article. Do not write article bodies here.
- Do not duplicate a slug that already exists in `workspace/briefs/` or `workspace/published/`.
- Do not touch git. Do not call WordPress.
