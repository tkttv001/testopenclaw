#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/../../.." && pwd)"
APP="$ROOT/auto-news-video"
BIN="$APP/.local/bin"
TMP="$APP/.local/tmp"
mkdir -p "$BIN" "$TMP"

if [[ -x "$BIN/ffmpeg" && -x "$BIN/ffprobe" ]]; then
  echo "ffmpeg already present: $BIN/ffmpeg"
  exit 0
fi

ARCHIVE="$TMP/ffmpeg.tar.xz"
URL="https://johnvansickle.com/ffmpeg/releases/ffmpeg-release-amd64-static.tar.xz"

curl -L "$URL" -o "$ARCHIVE"
tar -xf "$ARCHIVE" -C "$TMP"
DIR="$(find "$TMP" -maxdepth 1 -type d -name 'ffmpeg-*static' | head -n1)"
cp "$DIR/ffmpeg" "$BIN/ffmpeg"
cp "$DIR/ffprobe" "$BIN/ffprobe"
chmod +x "$BIN/ffmpeg" "$BIN/ffprobe"

echo "installed: $BIN/ffmpeg"
