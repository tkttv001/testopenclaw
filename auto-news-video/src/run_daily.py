import datetime as dt
import os
import subprocess
from pathlib import Path

from orchestrator import run_orchestrated
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
        video_path = run_orchestrated()

        # Skip auto upload for now: always manual review first
        opened = open_preview(video_path)
        emit(run_id, "agent-monitor", "review", artifact=str(video_path), detail=f"preview_opened={opened}")
        emit(run_id, "agent-publisher", "waiting_approval", detail="Auto upload disabled. Waiting for manual approval.")

        print(f"OK: {video_path}")
    except Exception as e:
        emit(run_id, "agent-monitor", "error", detail=str(e))
        raise


if __name__ == "__main__":
    main()
