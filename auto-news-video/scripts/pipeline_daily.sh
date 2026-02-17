#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

if python3 -m venv .venv >/dev/null 2>&1; then
  source .venv/bin/activate
  pip -q install -r requirements.txt
else
  echo "[warn] python3-venv unavailable, using user-site packages"
  python3 -m pip -q install --user -r requirements.txt
fi

python3 src/run_daily.py
