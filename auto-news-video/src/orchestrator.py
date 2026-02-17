import datetime as dt
import json
from pathlib import Path
from typing import Dict

from event_bus import emit
from pipeline import run as run_pipeline
from render_video import render_from_script

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "data"
OUTPUTS = ROOT / "outputs"
TASKS_FILE = DATA / "tasks.json"


def _load_tasks() -> Dict:
    if TASKS_FILE.exists():
        return json.loads(TASKS_FILE.read_text(encoding="utf-8"))
    return {"tasks": []}


def _save_tasks(obj: Dict) -> None:
    DATA.mkdir(parents=True, exist_ok=True)
    TASKS_FILE.write_text(json.dumps(obj, ensure_ascii=False, indent=2), encoding="utf-8")


def _set_state(run_id: str, state: str, note: str) -> None:
    db = _load_tasks()
    tasks = db.setdefault("tasks", [])
    current = next((t for t in tasks if t.get("run_id") == run_id), None)
    item = {
        "ts": dt.datetime.utcnow().isoformat() + "Z",
        "state": state,
        "note": note,
    }
    if current is None:
        tasks.append({"run_id": run_id, "history": [item], "state": state})
    else:
        current.setdefault("history", []).append(item)
        current["state"] = state
    _save_tasks(db)


def run_orchestrated() -> Path:
    run_id = dt.datetime.utcnow().strftime("%Y-%m-%d")

    _set_state(run_id, "Inbox", "Daily run created")
    emit(run_id, "orchestrator", "state", detail="Inbox")

    _set_state(run_id, "Assigned", "Assigned to collector/editor producer path")
    emit(run_id, "orchestrator", "state", detail="Assigned")

    _set_state(run_id, "In Progress", "Running pipeline with trend enrich + script build")
    emit(run_id, "orchestrator", "state", detail="In Progress")

    script_path = run_pipeline()
    emit(run_id, "agent-builder", "done", artifact=str(script_path), detail="collector+editor done")

    video_path = render_from_script(script_path)
    emit(run_id, "agent-producer", "done", artifact=str(video_path), detail="render done")

    _set_state(run_id, "Review", "Await manual preview before publish")
    emit(run_id, "orchestrator", "state", detail="Review")

    _set_state(run_id, "Done", "Draft video ready for human review")
    emit(run_id, "orchestrator", "state", detail="Done")

    return video_path
