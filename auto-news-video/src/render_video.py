import datetime as dt
import re
import shutil
import subprocess
from pathlib import Path
from typing import List

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


def _write_subtitles(lines: List[str], total_duration: float, out_srt: Path) -> None:
    if not lines:
        lines = ["Bản tin hôm nay"]
    weights = [max(1, len(x)) for x in lines]
    total_w = sum(weights)
    cur = 0.0
    parts = []
    for i, line in enumerate(lines, start=1):
        dur = max(1.3, total_duration * (weights[i - 1] / total_w))
        start = cur
        end = min(total_duration, cur + dur)
        parts.append(f"{i}\n{_to_srt_time(start)} --> {_to_srt_time(end)}\n{line}\n")
        cur = end
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

    vf = (
        "subtitles='" + str(srt_path).replace("'", "\\'") +
        "':force_style='FontName=Arial,FontSize=14,PrimaryColour=&H00FFFFFF,OutlineColour=&H00000000,"
        "BackColour=&H64000000,BorderStyle=3,Outline=1,Shadow=0,MarginV=110,Alignment=2'"
    )

    cmd = [
        ffmpeg,
        "-y",
        "-f", "lavfi",
        "-i", f"color=c=#101418:s=1080x1920:d={duration}",
        "-i", str(audio_path),
        "-vf", vf,
        "-c:v", "libx264",
        "-preset", "veryfast",
        "-crf", "22",
        "-c:a", "aac",
        "-b:a", "192k",
        "-shortest",
        str(video_path),
    ]
    subprocess.run(cmd, check=True)
    return video_path
