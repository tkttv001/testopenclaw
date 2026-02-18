# TEAM_PROTOCOL.md

Mục tiêu: vận hành team agent có hệ thống, tiết kiệm chi phí, chất lượng ổn định.

## Coding execution policy (mandatory)

- For any task related to coding/editing files, **must use skill `opencode-controller` first**.
- Follow Plan -> Build loop inside Opencode for implementation tasks.
- Do not bypass this policy unless user explicitly overrides.

## Team Roles

- **Orchestrator (bạn + agent chính)**
  - Nhận yêu cầu, chia task, theo dõi trạng thái, tổng hợp báo cáo.
- **Builder**
  - Thực thi: code/docs/config/script, tạo artifacts.
- **Reviewer**
  - Soát chất lượng, test checklist, phản biện rủi ro.
- **Ops**
  - Việc lặp lại: dọn backlog, chuẩn hoá format, tổng hợp định kỳ.

## Lifecycle

`Inbox -> Assigned -> In Progress -> Review -> Done | Failed`

Quy tắc:
1. Mỗi task phải có `task_id`.
2. Mỗi transition phải có ghi chú ngắn (ai, làm gì, vì sao).
3. Không skip bước `Review` trừ khi task cực nhỏ (<=10 phút) và low-risk.

## Routing model (cost-first, OpenCode-first)

- **Ops / việc cơ học:** `opencode/kimi-k2.5-free` (nếu available)
- **Builder mặc định:** `opencode/kimi-k2.5` hoặc `opencode/kimi-k2.5-free`
- **Builder task nặng:** `openai-codex/gpt-5.2-codex` hoặc `openai-codex/gpt-5.3-codex`
- **Reviewer / critical:** `openai-codex/gpt-5.1-codex-max`
- **Fallback khi OpenCode unavailable:** `nvidia/moonshotai/kimi-k2.5`

> Lưu ý: OpenCode chỉ chạy khi đã cấu hình `OPENCODE_API_KEY`.

## Handoff format (bắt buộc)

Mỗi lần bàn giao giữa agents phải có:
1. **Done:** đã làm gì
2. **Artifacts:** đường dẫn file cụ thể
3. **Verify:** cách kiểm tra nhanh
4. **Known issues:** điểm chưa xong/rủi ro
5. **Next action:** bước kế tiếp cho agent nhận

## Chất lượng tối thiểu

- Không bàn giao nếu thiếu artifact path
- Không chốt Done khi chưa có verify
- Reviewer có quyền reject nếu:
  - sai acceptance criteria
  - thiếu test/kiểm chứng
  - thay đổi vượt scope không báo trước
