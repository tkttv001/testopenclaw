---
name: google-stitch
description: Use Google Stitch via its MCP endpoint to generate UI concepts/code from prompts. Use when user asks to design UI with Google Stitch / stitch.withgoogle.com and wants reproducible MCP calls (initialize, tools/list, tools/call).
---

# Google Stitch (MCP)

Use Stitch through MCP endpoint (not legacy REST guesswork).

## Endpoint + Auth

- MCP endpoint: `https://stitch.googleapis.com/mcp`
- API key header: `X-Goog-Api-Key: <key>`
- Optional OAuth flow: `Authorization: Bearer <token>` and `X-Goog-User-Project: <project-id>`

## Required Environment

- `GOOGLE_STITCH_API_KEY`
- Optional `GOOGLE_STITCH_MCP_ENDPOINT` (default is the official endpoint above)

Do **not** hardcode keys in files.

## Commands

Initialize + list Stitch tools:

```bash
skills/google-stitch/scripts/stitch_mcp.sh tools-list
```

Call a Stitch MCP tool:

```bash
skills/google-stitch/scripts/stitch_mcp.sh tool-call \
  --tool "<tool_name_from_tools_list>" \
  --args '{"prompt":"Design a SaaS dashboard homepage"}'
```

## Output Contract

- Script prints raw JSON-RPC responses to stdout.
- Non-zero exit for missing auth/env, invalid JSON args, or HTTP failures.

## Notes

- Always discover actual tool names first via `tools-list` (tool names may change).
- If the API key was exposed, rotate/revoke it immediately.
