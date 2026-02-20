# Stitch Artifacts — TASK-20260220-002

## Status
- Google Stitch API key not available in runtime (`GOOGLE_STITCH_API_KEY` missing).
- Proceeded with robust fallback design package so pipeline remains unblocked.

## Included
- `desktop-prompt.txt` — full desktop generation prompt
- `mobile-prompt.txt` — dedicated mobile generation prompt
- `screen-plan.json` — target screen structure + components map
- `handoff.md` — implementation mapping and constraints

## How to run later (when key exists)
1. Use `desktop-prompt.txt` to generate desktop screens
2. Use `mobile-prompt.txt` to generate mobile screens
3. Update `screens.json` with returned Stitch project/screen IDs
4. Keep `handoff.md` as source of truth for builder mapping
