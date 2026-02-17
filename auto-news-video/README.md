# Auto News Video MVP

MVP thu thập tin -> tạo script video mỗi ngày, có checkpoint để resume sau restart.

## Chạy local
```bash
cd auto-news-video
./scripts/pipeline_daily.sh
```

Output script:
- `outputs/script_YYYY-MM-DD.txt`

State bền vững:
- `data/state.db` (seen links)
- `data/checkpoint.json` (resume step)
- `data/events.jsonl` (event bus giữa agent)

## Tích hợp OpenClaw
Dùng cron OpenClaw để gọi script mỗi sáng:
- Payload kiểu `systemEvent` cho main session hoặc `agentTurn` ở isolated session
- Nội dung lệnh: chạy `bash /home/tkttv001/.openclaw/workspace/auto-news-video/scripts/pipeline_daily.sh`

## Mô hình team-agent
Xem `TEAM_AGENTS.md`.
