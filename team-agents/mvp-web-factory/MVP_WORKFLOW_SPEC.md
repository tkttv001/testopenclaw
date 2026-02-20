# MVP_WORKFLOW_SPEC.md

## Mục tiêu
Pipeline OpenClaw-only cho dịch vụ làm website cá nhân:
`Lead -> 2-Step Intake -> Spec/Quote -> Stitch UI Design -> Opencode Build -> QA -> Deploy -> Handover`

## Pricing packages (fixed)
- Basic Package: 3 trang (Home, About, Portfolio/Projects) — **50k VND**
- Advanced Package: 5 trang (Home, About, Portfolio/Projects, Blog, Contact) — **99k VND**

## Vai trò agents
1. **Advisor**: intake 3Q + chốt scope.
2. **Estimator**: báo giá + timeline + gói dịch vụ.
3. **Design (Stitch)**: tạo UI bằng Google Stitch từ prompt chuẩn.
4. **Builder**: dùng `opencode-controller` code theo design Stitch (source of truth).
5. **QA**: test UI/UX + hiệu năng cơ bản.
6. **DeployOps**: deploy + domain + gửi link.

## Trạng thái task
`INBOX -> ASSIGNED -> IN_PROGRESS -> REVIEW -> DONE | FAILED`

## Artifact chuẩn
- `team-agents/shared/specs/<TASK_ID>.md`
- `team-agents/shared/artifacts/<TASK_ID>/`
- `team-agents/shared/reviews/<TASK_ID>.md`
- `team-agents/shared/decisions/<TASK_ID>.md`

## Artifact bổ sung cho Stitch
Trong `team-agents/shared/artifacts/<TASK_ID>/stitch/` bắt buộc có:
- `prompt.txt` (prompt đã gửi Stitch)
- `project.json` (kết quả create/list/get project)
- `screens.json` (list screens)
- `screen-*.json` (chi tiết screen)
- `handoff.md` (mapping section + notes implement cho Builder)

## Luồng chạy chuẩn
1. Advisor chạy 2-step intake (mô tả khách hàng + 3–5 gợi ý style) và tạo spec ngay.
2. Estimator tạo quote từ spec (không hỏi thêm trừ blocker critical).
3. Nếu khách xác nhận:
   - Design agent tạo prompt từ spec -> gọi Stitch (`create_project` + `generate_screen_from_text`).
   - Lưu toàn bộ output Stitch vào thư mục artifact.
4. Builder scaffold + implement bằng Opencode, bám sát design Stitch.
5. QA chạy checklist + screenshot.
6. DeployOps deploy staging/live.
7. Orchestrator gửi handover cho khách.

## Hosting policy (Mode A mặc định)
- `hosting_owner = studio`
- Deploy bằng account của studio, khách không cần GitHub/Vercel.
- Nếu chưa có domain: cấp URL tạm (Pages/Vercel subdomain).
- Luôn bàn giao kèm source code `.zip` + hướng dẫn chuyển giao sau này.

## SLA MVP
- Báo giá: <= 30 phút
- Stitch design v1: <= 60 phút sau khi quote được duyệt
- Bản staging đầu: <= 24h
- Bugfix P1: <= 4h

## Rule tiết kiệm token (OpenCode-first)
- Default model (build/ops): `opencode/kimi-k2.5` (hoặc `opencode/kimi-k2.5-free`)
- Task cơ học: `opencode/kimi-k2.5-free`
- Escalate nặng: `openai-codex/gpt-5.2-codex`
- Critical: `openai-codex/gpt-5.1-codex-max`
- Fallback khi OpenCode unavailable: `nvidia/moonshotai/kimi-k2.5`

Activation note: cần cấu hình `OPENCODE_API_KEY` để dùng model `opencode/...`.

## Stitch integration requirements
- Dùng MCP endpoint: `https://stitch.googleapis.com/mcp`
- Env bắt buộc: `GOOGLE_STITCH_API_KEY`
- Luôn gọi `tools-list` trước để lấy tên tool hiện hành.
- Nếu lỗi rate-limit hoặc timeout: không spam retry; chờ backoff rồi `get_screen`/`list_screens` để kiểm tra trạng thái trước khi gọi lại.
