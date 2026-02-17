import datetime as dt
import re
import shutil
import subprocess
from pathlib import Path
from typing import List, Tuple

from gtts import gTTS

ROOT = Path(__file__).resolve().parents[1]
OUTPUTS = ROOT / "outputs"


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

    headline = _safe_drawtext_text(_extract_headline(script_text)[:90])
    srt_escaped = str(srt_path).replace("\\", "/").replace("'", "\\'")

    # Dynamic background + typography layers
    vf = (
        "drawbox=x='mod(t*120,1080)':y=80:w=360:h=220:color=0x2563eb@0.15:t=fill,"
        "drawbox=x='1080-mod(t*90,1400)':y=1460:w=520:h=320:color=0x7c3aed@0.14:t=fill,"
        "drawbox=x=0:y=0:w=1080:h=180:color=black@0.32:t=fill,"
        f"drawtext=text='{headline}':fontcolor=white:fontsize=56:x=(w-text_w)/2:y=50,"
        f"subtitles='{srt_escaped}':force_style='FontName=Arial,FontSize=18,PrimaryColour=&H00FFFFFF,"
        "OutlineColour=&H00000000,BackColour=&H50000000,BorderStyle=3,Outline=1.2,Shadow=0,MarginV=120,Alignment=2'"
    )

    cmd = [
        ffmpeg,
        "-y",
        "-f", "lavfi",
        "-i", f"color=c=#0b1020:s=1080x1920:d={duration},format=yuv420p",
        "-i", str(audio_path),
        "-vf", vf,
        "-c:v", "libx264",
        "-preset", "medium",
        "-crf", "20",
        "-c:a", "aac",
        "-b:a", "192k",
        "-movflags", "+faststart",
        "-shortest",
        str(video_path),
    ]
    subprocess.run(cmd, check=True)
    return video_path
