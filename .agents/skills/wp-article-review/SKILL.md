---
name: wp-article-review
description: Final editorial QA of a finished article before it becomes a WordPress draft. Use as stage 3 of the wp-blog-agent pipeline. Reads workspace/ready/<slug>.md, corrects and improves it in place, and verifies it is safe to publish.
---

# Article review (last gate before draft)

Read each `workspace/ready/*.md` and improve/correct it in place. This is the last
quality gate before it becomes a WordPress draft.

## Check and fix
1. **Frontmatter valid**: `title`, `slug`, `category`, `tags` (array), `excerpt`
   (150-160 chars) all present and well-formed. The file must parse as YAML frontmatter
   plus Markdown.
2. **Factual sanity**: open the brief (`workspace/briefs/brief-<slug>.md`). Every
   external link must be a URL listed under its `## Fonti verificate`, and every number,
   study or "according to" must match the `citazione` of that source. Anything else is
   **removed**, not softened: rewrite the sentence without the claim. Never add a new
   source during review. Never state the client offers something not in its config.
3. **Intent match**: the article actually answers the title's question, answer-first.
4. **Structure**: H2s read as real questions; an FAQ section exists; sections are scannable.
5. **Money page**: exactly one natural link to the vertical's money page with descriptive
   anchor text. Add it if missing; do not over-link.
6. **Brand voice**: matches the client's `tone` and `audience`.
7. **Inviolable rules** (`content.forbidden`): correct language, no em dashes, no AI filler,
   no fabricated sources.
8. **Markdown safety**: valid Markdown that converts cleanly to HTML (no broken tables,
   stray HTML, or unclosed formatting).

Edit the file in place. Print one line per article: `PASS <slug>` or `FIX <slug> — what you changed`.
After review the pipeline runs `npm run check -- <client>`, which opens every cited page and
looks for the cited numbers in it: a number that is not on its source blocks the article.
Do not touch git. Do not call WordPress. The deterministic publish step turns these into drafts.
