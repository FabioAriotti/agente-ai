---
name: wp-publish
description: Publish reviewed articles to WordPress as drafts, using the deterministic publish script (not by calling the REST API by hand). Use as the final stage of the wp-blog-agent pipeline when running interactively.
---

# Publish to WordPress (drafts)

Publishing is deterministic — do NOT craft REST API calls yourself. Run the script:

```
npm run publish -- <client-name>
```

It reads every `workspace/ready/*.md`, converts Markdown to HTML, resolves the
category and tags (creating them if missing), and creates each post as a **draft**
(`status` from the client config, default `draft`). On success it moves the source
file to `workspace/published/` and prints the wp-admin edit URL.

## Before running
- Confirm the connection works: `npm run test:wp -- <client-name>`.
- Confirm `workspace/ready/` contains the intended, reviewed articles.

## Rules
- Always publish as **draft** unless the client explicitly asked for auto-publish. Drafts
  let the client review before anything goes live — this is the safety net.
- Never bypass the script to POST to WordPress directly.
- After it runs, report the edit URLs so the client can review and hit Publish themselves.
