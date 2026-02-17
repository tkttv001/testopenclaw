import datetime as dt
import os
import subprocess
from pathlib import Path

from pipeline import run as run_pipeline
from render_video import render_from_script
from event_bus import emit

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "outputs"


def open_preview(video_path: Path) -> bool:
    try:
        if os.name == "nt":
            os.startfile(str(video_path))  # type: ignore[attr-defined]
            return True

        # WSL -> open on Windows host
        if "microsoft" in os.uname().release.lower() and subprocess.run(["which", "wslpath"], capture_output=True).returncode == 0:
            win_path = subprocess.check_output(["wslpath", "-w", str(video_path)], text=True).strip()
            subprocess.Popen(["explorer.exe", win_path])
            return True

        # Linux desktop fallback
        subprocess.Popen(["xdg-open", str(video_path)])
        return True
    except Exception:
        return False


def main():
    run_id = dt.datetime.utcnow().strftime("%Y-%m-%d")

    try:
        emit(run_id, "agent-collector", "start")
        script_path = run_pipeline()
        emit(run_id, "agent-collector", "done", artifact=str(script_path))

        emit(run_id, "agent-editor", "done", artifact=str(script_path), detail="MVP uses single merged collector+editor step")

        emit(run_id, "agent-producer", "start")
        video_path = render_from_script(script_path)
        emit(run_id, "agent-producer", "done", artifact=str(video_path))

        # Skip auto upload for now: always manual review first
        opened = open_preview(video_path)
        emit(run_id, "agent-monitor", "review", artifact=str(video_path), detail=f"preview_opened={opened}")
        emit(run_id, "agent-publisher", "waiting_approval", detail="Auto upload disabled. Waiting for manual approval.")

        print(f"OK: {script_path}")
    except Exception as e:
        emit(run_id, "agent-monitor", "error", detail=str(e))
        raise


if __name__ == "__main__":
    main()
