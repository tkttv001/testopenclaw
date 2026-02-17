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
- `outputs/video_YYYY-MM-DD.mp4` (pro visual pack: b-roll + icon + transition + ducking, sẽ tự mở preview)

## Pro visual pack assets
- B-roll: bỏ file `.mp4` vào `assets/broll/` (hệ thống sẽ loop clip để phủ hết thời lượng)
- Nhạc nền: đặt `assets/bgm.mp3` (render sẽ tự ducking khi voice đọc)
- Nếu không có b-roll/bgm, pipeline vẫn chạy với fallback visual mặc định.

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
