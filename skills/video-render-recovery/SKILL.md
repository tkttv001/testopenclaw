---
name: video-render-recovery
description: Recover and harden local short-video rendering pipelines when ffmpeg/pip/sudo are unavailable or filters fail. Use when TTS/render jobs break with missing dependencies, missing filters (drawtext/subtitles/xfade), permission limits, or environment drift; installs local static ffmpeg fallback and applies compatibility-first rendering.
---

# Video Render Recovery

1. Run `scripts/ensure-local-ffmpeg.sh` from the project root.
2. Prefer project-local binaries: `auto-news-video/.local/bin/ffmpeg` and `ffprobe`.
3. Detect filter support before constructing filter graphs:
   - `ffmpeg -filters | grep drawtext`
   - `ffmpeg -filters | grep subtitles`
   - `ffmpeg -filters | grep xfade`
4. Degrade gracefully:
   - no `drawtext` → keep drawbox only
   - no `subtitles` → skip hard subtitles
   - no `xfade` → single b-roll stream
5. If Python packages cannot be installed system-wide, use tool-level TTS fallback and render with available audio file.
6. Always output a playable MP4 even if advanced overlays are disabled.
7. Log failures into `outputs/render_error.log` with exact ffmpeg command.
