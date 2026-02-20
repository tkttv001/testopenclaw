#!/usr/bin/env bash
set -euo pipefail

ENDPOINT="${GOOGLE_STITCH_MCP_ENDPOINT:-https://stitch.googleapis.com/mcp}"
API_KEY="${GOOGLE_STITCH_API_KEY:-}"

cmd="${1:-}"
shift || true

if [[ -z "$cmd" ]]; then
  echo "Usage: $0 <tools-list|tool-call> [args]" >&2
  exit 2
fi

if [[ -z "$API_KEY" ]]; then
  echo "Missing env GOOGLE_STITCH_API_KEY" >&2
  exit 2
fi

if ! command -v curl >/dev/null 2>&1; then
  echo "curl is required" >&2
  exit 2
fi

if ! command -v python3 >/dev/null 2>&1; then
  echo "python3 is required" >&2
  exit 2
fi

rpc() {
  local body="$1"
  curl -sS -X POST "$ENDPOINT" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json, text/event-stream" \
    -H "X-Goog-Api-Key: ${API_KEY}" \
    --data "$body"
}

initialize() {
  rpc '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2024-11-05","capabilities":{},"clientInfo":{"name":"openclaw-stitch-probe","version":"1.0.0"}}}'
}

tools_list() {
  rpc '{"jsonrpc":"2.0","id":2,"method":"tools/list","params":{}}'
}

tool_call() {
  local tool_name=""
  local args_json='{}'

  while [[ $# -gt 0 ]]; do
    case "$1" in
      --tool) tool_name="${2:-}"; shift 2 ;;
      --args) args_json="${2:-{}}"; shift 2 ;;
      *) echo "Unknown arg: $1" >&2; exit 2 ;;
    esac
  done

  if [[ -z "$tool_name" ]]; then
    echo "Missing --tool" >&2
    exit 2
  fi

  python3 - "$tool_name" "$args_json" <<'PY'
import json,sys
name=sys.argv[1]
args_raw=sys.argv[2]
try:
    args=json.loads(args_raw)
except Exception as e:
    print(f"Invalid --args JSON: {e}", file=sys.stderr)
    raise SystemExit(2)
payload={
  "jsonrpc":"2.0",
  "id":3,
  "method":"tools/call",
  "params":{"name":name,"arguments":args}
}
print(json.dumps(payload,separators=(",",":")))
PY
}

case "$cmd" in
  tools-list)
    initialize
    echo
    tools_list
    ;;
  tool-call)
    initialize
    echo
    payload="$(tool_call "$@")"
    rpc "$payload"
    ;;
  *)
    echo "Unknown command: $cmd" >&2
    exit 2
    ;;
esac
