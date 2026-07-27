---
name: wp-article-write
description: Write a full SEO blog article from a brief, as Markdown with YAML frontmatter, ready for WordPress. Use as stage 2 of the wp-blog-agent pipeline. Output goes to workspace/ready/<slug>.md in the client's configured language.
---

# Write article (brief → ready Markdown)

Turn one `workspace/briefs/brief-<slug>.md` into a finished article at
`workspace/ready/<slug>.md`.

## Output format (must parse as frontmatter + Markdown)
```markdown
---
title: "The article H1 / title"
slug: "kebab-case-slug"
category: "WordPress category"
tags: ["tag-one", "tag-two", "tag-three"]
excerpt: "150-160 char meta description used by WordPress/Yoast as the summary."
---

Answer-first opening paragraph that directly answers the title's question in 2-3
sentences, so a reader (and an AI answer engine) gets the payoff immediately.

## First H2 written as a real question

Body...

## Second H2 as a question

Body...

## Frequently asked questions

### Question 1?
Answer.

### Question 2?
Answer.
```

## Requirements
- **Language**: write in the client's `language` (from `clients/<client>.json`). Default English.
- **Structure**: answer-first intro; H2s phrased as the real questions from the brief;
  a FAQ section near the end; one natural in-context link to the brief's `moneyPage`
  using descriptive anchor text (not "click here").
- **On-page SEO/AEO**: use the target keyword in the title, the first paragraph, and one
  H2, naturally. Cover the brief's listed questions. Prefer clear, scannable sections.
- **Length**: enough to fully answer the intent, typically 900-1500 words. Depth over padding.
- **Voice**: match the client's `tone` and `audience`.
- **Links**: only the money page and, if genuinely useful, other articles already in
  `workspace/published/`. Do not invent external sources or statistics.

## Inviolable rules (from clients/<client>.json content.forbidden)
- No invented statistics, studies, or quotes.
- No em dashes; use commas, colons, or separate sentences.
- No generic AI filler ("in today's fast-paced world", "unlock the power of", "delve into").
- Never claim the client sells a product/service not present in the config.

After writing, apply the `humanizer` skill if available (strip AI-writing tells), then
save. One file per brief. Do not touch git. Do not call WordPress.
