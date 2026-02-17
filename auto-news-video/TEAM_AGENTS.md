# Team Agents Blueprint (OpenClaw + OpenCode)

## Mục tiêu
Chạy pipeline tin tức/video tự động mỗi ngày bằng mô hình nhiều agent, có giao tiếp và có khả năng resume sau khi restart máy/OpenClaw.

## Agent team đề xuất

1. **agent-collector**
   - Thu thập tin (RSS/web/API)
   - Ghi `data/news_raw_YYYY-MM-DD.json`

2. **agent-editor**
   - Lọc, chấm điểm, viết script video ngắn
   - Ghi `outputs/script_YYYY-MM-DD.txt`

3. **agent-producer**
   - TTS + subtitle + render ffmpeg
   - Ghi `outputs/video_YYYY-MM-DD.mp4`

4. **agent-publisher**
   - Upload YouTube/TikTok (sau khi duyệt preview)
   - Ghi `outputs/publish_YYYY-MM-DD.json`

5. **agent-monitor**
   - Gửi báo cáo Telegram + health checks
   - Cảnh báo lỗi, retry trạng thái fail

## Giao tiếp giữa các agent
Không chat tay nhau; dùng **event bus file + state DB**:

- Event log: `data/events.jsonl`
- Job state: `data/state.db`
- Checkpoint run: `data/checkpoint.json`

Mỗi agent ghi event mẫu:
```json
{"ts":"2026-02-17T09:00:00Z","run_id":"2026-02-17","agent":"agent-editor","status":"done","artifact":"outputs/script_2026-02-17.txt"}
```

Agent sau chỉ chạy khi thấy event `done` của bước trước.

## Resume sau restart
- Khi start lại, agent-monitor đọc `checkpoint.json` + `state.db`
- Nếu run hôm nay dừng ở bước nào, chỉ chạy tiếp bước kế tiếp
- Tất cả output theo `run_id` (ngày), không overwrite ngẫu nhiên

## OpenClaw cron orchestration
- 06:55 UTC: trigger `agent-collector`
- 07:00 UTC: trigger `agent-editor`
- 07:05 UTC: trigger `agent-producer`
- 07:10 UTC: mở preview video cho bạn xem trước, `agent-publisher` chỉ chạy khi bạn duyệt
- 07:15 UTC: `agent-monitor` gửi báo cáo

## Vai trò OpenCode
Dùng OpenCode để:
- chỉnh/sinh code nhanh trong repo
- test local từng module
- fix lỗi script theo log

Dùng OpenClaw để:
- điều phối, nhắc lịch, thông báo
- điều khiển nhiều agent/session
- giữ continuity ở mức workflow
