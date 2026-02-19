#!/usr/bin/env bash
set -euo pipefail

PROMPT=""
MODE="experimental"
DEVICE="web"
ENDPOINT="${GOOGLE_STITCH_ENDPOINT:-}"

while [[ $# -gt 0 ]]; do
  case "$1" in
    --prompt) PROMPT="${2:-}"; shift 2 ;;
    --mode) MODE="${2:-experimental}"; shift 2 ;;
    --device) DEVICE="${2:-web}"; shift 2 ;;
    --endpoint) ENDPOINT="${2:-}"; shift 2 ;;
    *) echo "Unknown arg: $1" >&2; exit 2 ;;
  esac
done

if [[ -z "$PROMPT" ]]; then
  echo "Missing --prompt" >&2
  exit 2
fi

if [[ -z "${GOOGLE_STITCH_API_KEY:-}" ]]; then
  echo "Missing env GOOGLE_STITCH_API_KEY" >&2
  exit 2
fi

if [[ -z "$ENDPOINT" ]]; then
  echo "Missing endpoint: pass --endpoint or set GOOGLE_STITCH_ENDPOINT" >&2
  exit 2
fi

if ! command -v curl >/dev/null 2>&1; then
  echo "curl is required" >&2
  exit 2
fi

payload=$(cat <<JSON
{
  "prompt": "$PROMPT",
  "mode": "$MODE",
  "device": "$DEVICE"
}
JSON
)

curl -sS -X POST "$ENDPOINT" \
  -H "X-Goog-Api-Key: ${GOOGLE_STITCH_API_KEY}" \
  -H "Content-Type: application/json" \
  --data "$payload"
