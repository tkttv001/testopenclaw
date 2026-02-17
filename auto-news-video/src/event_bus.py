import json
from pathlib import Path
from datetime import datetime, timezone

ROOT = Path(__file__).resolve().parents[1]
EVENTS = ROOT / "data" / "events.jsonl"


def emit(run_id: str, agent: str, status: str, artifact: str | None = None, detail: str | None = None):
    EVENTS.parent.mkdir(parents=True, exist_ok=True)
    payload = {
        "ts": datetime.now(timezone.utc).isoformat(),
        "run_id": run_id,
        "agent": agent,
        "status": status,
    }
    if artifact:
        payload["artifact"] = artifact
    if detail:
        payload["detail"] = detail
    with EVENTS.open("a", encoding="utf-8") as f:
        f.write(json.dumps(payload, ensure_ascii=False) + "\n")


def has_done(run_id: str, agent: str) -> bool:
    if not EVENTS.exists():
        return False
    with EVENTS.open("r", encoding="utf-8") as f:
        for line in f:
            try:
                x = json.loads(line)
            except Exception:
                continue
            if x.get("run_id") == run_id and x.get("agent") == agent and x.get("status") == "done":
                return True
    return False
