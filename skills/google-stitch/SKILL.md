---
name: google-stitch
description: Generate UI concepts/code via a Stitch-compatible API endpoint. Use when user asks to design UI from prompts/images using Google Stitch, Google Labs Stitch, or Stitch API and wants structured request/response handling.
---

# Google Stitch

Use this skill to call a Stitch-compatible API safely and reproducibly.

## Inputs

- `prompt` (required): UI brief
- `mode` (optional): `experimental` | `standard` (default: `experimental`)
- `device` (optional): `web` | `mobile` (default: `web`)
- `endpoint` (optional): default from env `GOOGLE_STITCH_ENDPOINT`

## Required Environment

- `GOOGLE_STITCH_API_KEY`
- `GOOGLE_STITCH_ENDPOINT` (example placeholder: `https://api.stitch.google.com/v1/generate`)

Do **not** hardcode API keys in skill files.

## Execution

Run:

```bash
skills/google-stitch/scripts/stitch_generate.sh \
  --prompt "<your prompt>" \
  --mode experimental \
  --device web
```

Optional override:

```bash
skills/google-stitch/scripts/stitch_generate.sh \
  --endpoint "https://<actual-endpoint>" \
  --prompt "Landing page for AI course"
```

## Output Contract

The script writes raw API JSON to stdout.

If endpoint resolution fails, script exits non-zero with a clear diagnostic.

## Notes

- Google Labs products often change hostnames and auth flows. Verify endpoint from official docs before production use.
- Keep response handling defensive (fields may differ across versions).
