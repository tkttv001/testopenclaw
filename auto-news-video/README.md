# Auto News Video MVP

MVP thu thập tin -> tạo script video mỗi ngày, có checkpoint để resume sau restart.
Mặc định hiện tại: **skip auto upload**, ưu tiên mở video preview để bạn duyệt.

## Chạy manual để review chất lượng video
```bash
cd auto-news-video
sudo apt install -y ffmpeg
./scripts/run_manual_preview.sh
```

Kết quả:
- `outputs/trends_YYYY-MM-DD.json` (trend keywords gần đây)
- `outputs/script_YYYY-MM-DD.txt`
- `outputs/voice_YYYY-MM-DD.mp3`
- `outputs/sub_YYYY-MM-DD.srt` (pacing theo cụm từ ngắn, đọc dễ hơn)
- `outputs/video_YYYY-MM-DD.mp4` (background động + typography cải tiến, sẽ tự mở preview)

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
