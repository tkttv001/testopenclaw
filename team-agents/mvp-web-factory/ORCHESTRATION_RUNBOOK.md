# ORCHESTRATION_RUNBOOK.md

## Cách chạy 1 order end-to-end

Trigger rule: chỉ bắt đầu khi user gọi đúng tên `nguoitaoweb`.

1. Tạo TASK_ID: `WEB-YYYYMMDD-###`
2. Tạo entry ở `team-agents/shared/tasks/TASK_BOARD.md`
3. Spawn Advisor -> tạo spec (2-step intake: mô tả khách hàng + gợi ý style)
4. Spawn Estimator -> tạo quote
5. Khi approved -> Preflight check `GOOGLE_STITCH_API_KEY`
6. Spawn Design (Google Stitch)
7. Design xuất artifact + handoff cho Builder
8. Spawn Builder (Builder only instructs `opencode-controller`, no direct coding)
8. Spawn QA (QA can request patch via `opencode-controller`)
9. Nếu QA PASS -> Spawn DeployOps
10. Gửi kết quả cho khách + chốt DONE

## Handoff chuẩn
Mỗi agent khi hoàn tất phải trả về:
- Done
- Artifacts (path cụ thể)
- Verify steps
- Known issues
- Next action

## Handoff riêng cho Design -> Builder
Design agent phải trả thêm:
- `stitch/project_id`
- Danh sách screen IDs chính
- Link/path screenshot + html/code files
- `stitch/handoff.md` mô tả mapping section (Hero/About/Projects/CTA...)
- Constraints để code (spacing, typography, component reuse, responsive behavior)

## Escalation
- Fail 2 vòng liên tiếp: nâng model 1 tier.
- Blocked > 30 phút: escalate về Orchestrator.
- Release critical: bắt buộc QA PASS trước deploy.

## Retry policy cho Stitch
- `generate_screen_from_text` có thể chạy lâu: không retry ngay.
- Nếu timeout/network fail: kiểm tra lại bằng `list_screens`/`get_screen` trước khi gọi lại.
- Dùng exponential backoff khi gặp `API rate limit reached`.
- Nếu thiếu key / auth fail: dừng pipeline và mark BLOCKED, không được tiếp tục build bằng fallback UI.
