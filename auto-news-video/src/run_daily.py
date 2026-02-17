import datetime as dt
from pathlib import Path

from pipeline import run as run_pipeline
from event_bus import emit

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "outputs"


def main():
    run_id = dt.datetime.utcnow().strftime("%Y-%m-%d")

    try:
        emit(run_id, "agent-collector", "start")
        script_path = run_pipeline()
        emit(run_id, "agent-collector", "done", artifact=str(script_path))

        emit(run_id, "agent-editor", "done", artifact=str(script_path), detail="MVP uses single merged collector+editor step")

        # placeholders for next phase
        emit(run_id, "agent-producer", "todo", detail="Implement TTS/subtitle/render")
        emit(run_id, "agent-publisher", "todo", detail="Implement YouTube/TikTok uploader")

        print(f"OK: {script_path}")
    except Exception as e:
        emit(run_id, "agent-monitor", "error", detail=str(e))
        raise


if __name__ == "__main__":
    main()
