import datetime as dt
import json
import re
import shutil
import subprocess
from pathlib import Path
from typing import List, Tuple

from gtts import gTTS

ROOT = Path(__file__).resolve().parents[1]
OUTPUTS = ROOT / "outputs"
ASSETS = ROOT / "assets"
BROLL_DIR = ASSETS / "broll"
BGM_FILE = ASSETS / "bgm.mp3"
STYLE_FILE = ROOT / "config" / "style.json"


def _clean_lines(script_text: str) -> List[str]:
    lines = []
    for raw in script_text.splitlines():
        x = raw.strip()
        if not x:
            continue
        x = re.sub(r"^(Hook:|CTA:|Nội dung chính:|[-•]\s*)", "", x, flags=re.IGNORECASE).strip()
        if x:
            lines.append(x)
    return lines


def _to_srt_time(seconds: float) -> str:
    ms = int(seconds * 1000)
    h = ms // 3600000
    ms %= 3600000
    m = ms // 60000
    ms %= 60000
    s = ms // 1000
    ms %= 1000
    return f"{h:02d}:{m:02d}:{s:02d},{ms:03d}"


def _chunk_for_pacing(lines: List[str], max_words: int = 8) -> List[str]:
    chunks: List[str] = []
    for line in lines:
        words = line.split()
        if len(words) <= max_words:
            chunks.append(line)
            continue
        for i in range(0, len(words), max_words):
            chunks.append(" ".join(words[i : i + max_words]))
    return chunks


def _build_timed_subtitles(chunks: List[str], total_duration: float) -> List[Tuple[float, float, str]]:
    if not chunks:
        chunks = ["Bản tin hôm nay"]

    # weighted pacing: subtitle càng dài hiển thị càng lâu
    weights = [max(1, len(c.split())) for c in chunks]
    total_w = sum(weights)

    entries = []
    cur = 0.0
    min_dur = 1.0
    max_dur = 3.0
    for idx, c in enumerate(chunks):
        ratio = weights[idx] / total_w
        dur = total_duration * ratio
        dur = max(min_dur, min(max_dur, dur))

        # đảm bảo còn thời lượng cho câu sau
        remaining = len(chunks) - idx - 1
        must_keep = remaining * min_dur
        if cur + dur > total_duration - must_keep:
            dur = max(min_dur, (total_duration - must_keep) - cur)

        start = cur
        end = min(total_duration, cur + dur)
        entries.append((start, end, c))
        cur = end

    # kéo subtitle cuối chạm cuối audio
    if entries:
        s, _, t = entries[-1]
        entries[-1] = (s, total_duration, t)
    return entries


def _write_subtitles(lines: List[str], total_duration: float, out_srt: Path) -> None:
    chunks = _chunk_for_pacing(lines)
    timed = _build_timed_subtitles(chunks, total_duration)

    parts = []
    for i, (start, end, text) in enumerate(timed, start=1):
        parts.append(f"{i}\n{_to_srt_time(start)} --> {_to_srt_time(end)}\n{text}\n")
    out_srt.write_text("\n".join(parts), encoding="utf-8")


def _ffmpeg_has_filter(ffmpeg_bin: str, filter_name: str) -> bool:
    try:
        out = subprocess.run([ffmpeg_bin, "-hide_banner", "-filters"], capture_output=True, text=True, check=False)
        text = (out.stdout or "") + "\n" + (out.stderr or "")
        return filter_name in text
    except Exception:
        return False


def _audio_duration_sec(path: Path) -> float:
    ffprobe = shutil.which("ffprobe")
    if not ffprobe:
        return 45.0
    result = subprocess.run(
        [ffprobe, "-v", "error", "-show_entries", "format=duration", "-of", "default=noprint_wrappers=1:nokey=1", str(path)],
        capture_output=True,
        text=True,
        check=False,
    )
    try:
        return max(1.0, float(result.stdout.strip()))
    except Exception:
        return 45.0


def _extract_headline(script_text: str) -> str:
    for line in script_text.splitlines():
        if line.strip().lower().startswith("hook:"):
            return line.split(":", 1)[1].strip()
    for line in script_text.splitlines():
        if line.strip():
            return line.strip()
    return "Bản tin nhanh hôm nay"


def _safe_drawtext_text(s: str) -> str:
    return s.replace("\\", "\\\\").replace(":", "\\:").replace("'", "\\'")


def _load_style() -> dict:
    defaults = {
        "channel_name": "News Flash VN",
        "watermark": "@newsflashvn",
        "headline_color": "white",
        "accent_label": "TREND NOW",
        "accent_color_hex": "0xf59e0b",
        "lower_third_bg_hex": "0x000000",
        "lower_third_bg_alpha": 0.38,
        "subtitle_fontsize": 18,
        "headline_fontsize": 56,
    }
    if not STYLE_FILE.exists():
        return defaults
    try:
        custom = json.loads(STYLE_FILE.read_text(encoding="utf-8"))
        defaults.update({k: v for k, v in custom.items() if k in defaults})
    except Exception:
        pass
    return defaults


def render_from_script(script_path: Path) -> Path:
    if not script_path.exists():
        raise FileNotFoundError(f"Missing script file: {script_path}")

    ffmpeg = shutil.which("ffmpeg")
    if not ffmpeg:
        raise RuntimeError("ffmpeg chưa cài. Cài trước: sudo apt install ffmpeg")

    run_id = dt.datetime.utcnow().strftime("%Y-%m-%d")
    audio_path = OUTPUTS / f"voice_{run_id}.mp3"
    srt_path = OUTPUTS / f"sub_{run_id}.srt"
    video_path = OUTPUTS / f"video_{run_id}.mp4"

    script_text = script_path.read_text(encoding="utf-8")
    lines = _clean_lines(script_text)
    narration = " ".join(lines) if lines else "Bản tin hôm nay chưa có dữ liệu phù hợp."

    tts = gTTS(text=narration, lang="vi")
    tts.save(str(audio_path))

    duration = _audio_duration_sec(audio_path)
    _write_subtitles(lines, duration, srt_path)

    style = _load_style()
    headline = _safe_drawtext_text(_extract_headline(script_text)[:90])
    watermark = _safe_drawtext_text(str(style["watermark"]))
    accent_label = _safe_drawtext_text(str(style["accent_label"]))
    srt_escaped = str(srt_path).replace("\\", "/").replace("'", "\\'")

    broll_candidates = sorted([p for p in BROLL_DIR.glob("*.mp4") if p.is_file()]) if BROLL_DIR.exists() else []
    broll_candidates = broll_candidates[:4]
    use_broll = len(broll_candidates) > 0
    use_bgm = BGM_FILE.exists()

    subtitle_fontsize = int(style["subtitle_fontsize"])
    headline_fontsize = int(style["headline_fontsize"])
    accent_color = str(style["accent_color_hex"])
    lower_bg = str(style["lower_third_bg_hex"])
    lower_alpha = float(style["lower_third_bg_alpha"])
    headline_color = str(style["headline_color"])

    has_drawtext = _ffmpeg_has_filter(ffmpeg, " drawtext ")
    has_subtitles = _ffmpeg_has_filter(ffmpeg, " subtitles ")
    has_xfade = _ffmpeg_has_filter(ffmpeg, " xfade ")

    overlays = [
        "drawbox=x='mod(t*120,1080)':y=80:w=360:h=220:color=0x2563eb@0.15:t=fill",
        "drawbox=x='1080-mod(t*90,1400)':y=1460:w=520:h=320:color=0x7c3aed@0.14:t=fill",
        "drawbox=x=0:y=0:w=1080:h=180:color=black@0.35:t=fill",
        f"drawbox=x=0:y=1740:w=1080:h=180:color={lower_bg}@{lower_alpha}:t=fill",
        f"drawbox=x=32:y=200:w=300:h=64:color={accent_color}@0.28:t=fill",
    ]
    if has_drawtext:
        overlays += [
            f"drawtext=text='{accent_label}':fontcolor=white:fontsize=28:x=52:y=218",
            f"drawtext=text='{headline}':fontcolor={headline_color}:fontsize={headline_fontsize}:x=(w-text_w)/2:y=50",
            f"drawtext=text='{watermark}':fontcolor=white@0.82:fontsize=30:x=40:y=1798",
        ]
    if has_subtitles:
        overlays += [
            f"subtitles='{srt_escaped}':force_style='FontName=Arial,FontSize={subtitle_fontsize},PrimaryColour=&H00FFFFFF,"
            "OutlineColour=&H00000000,BackColour=&H50000000,BorderStyle=3,Outline=1.2,Shadow=0,MarginV=120,Alignment=2'"
        ]

    visual_overlay = ",".join(overlays)

    if use_broll:
        cmd = [ffmpeg, "-y"]
        for p in broll_candidates:
            cmd += ["-stream_loop", "-1", "-i", str(p)]
        cmd += ["-i", str(audio_path)]

        clip_count = len(broll_candidates)
        transition = 0.35
        seg = max(2.4, duration / clip_count)

        chains = []
        for i in range(clip_count):
            chains.append(
                f"[{i}:v]trim=duration={seg + transition:.3f},setpts=PTS-STARTPTS,"
                "scale=1080:1920:force_original_aspect_ratio=increase,"
                "crop=1080:1920,eq=saturation=1.08:contrast=1.06:brightness=0.01,fps=30"
                f"[v{i}]"
            )

        if clip_count == 1 or not has_xfade:
            base_label = "v0"
        else:
            chains.append(f"[v0][v1]xfade=transition=fade:duration={transition}:offset={max(0.1, seg - transition):.3f}[x1]")
            current = "x1"
            for i in range(2, clip_count):
                offset = max(0.1, i * (seg - transition))
                next_label = f"x{i}"
                chains.append(f"[{current}][v{i}]xfade=transition=fade:duration={transition}:offset={offset:.3f}[{next_label}]")
                current = next_label
            base_label = current

        video_filter = ";".join(chains) + f";[{base_label}]{visual_overlay}[vout]"
        narration_idx = clip_count
        bgm_idx = clip_count + 1
    else:
        video_filter = (
            f"[0:v]fade=t=in:st=0:d=0.45,fade=t=out:st={max(0.0, duration - 0.45):.2f}:d=0.45,"
            f"{visual_overlay}[vout]"
        )
        cmd = [
            ffmpeg,
            "-y",
            "-f",
            "lavfi",
            "-i",
            f"color=c=#0b1020:s=1080x1920:d={duration},format=yuv420p",
            "-i",
            str(audio_path),
        ]
        narration_idx = 1
        bgm_idx = 2

    if use_bgm:
        cmd += ["-stream_loop", "-1", "-i", str(BGM_FILE)]
        audio_filter = (
            f"[{bgm_idx}:a]atrim=0:{duration:.3f},asetpts=N/SR/TB,volume=0.22[bgm];"
            f"[bgm][{narration_idx}:a]sidechaincompress=threshold=0.03:ratio=12:attack=20:release=300[ducked];"
            f"[{narration_idx}:a][ducked]amix=inputs=2:weights='1 0.7':normalize=0[aout]"
        )
    else:
        audio_filter = f"[{narration_idx}:a]anull[aout]"

    filter_complex = video_filter + ";" + audio_filter

    cmd += [
        "-filter_complex",
        filter_complex,
        "-map",
        "[vout]",
        "-map",
        "[aout]",
        "-c:v",
        "libx264",
        "-preset",
        "medium",
        "-crf",
        "20",
        "-c:a",
        "aac",
        "-b:a",
        "192k",
        "-movflags",
        "+faststart",
        "-shortest",
        str(video_path),
    ]
    subprocess.run(cmd, check=True)
    return video_path
