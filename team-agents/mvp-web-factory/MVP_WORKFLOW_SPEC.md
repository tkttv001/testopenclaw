# MVP_WORKFLOW_SPEC.md

## Mục tiêu
Pipeline OpenClaw-only cho dịch vụ làm website cá nhân:
`Lead -> 3Q Intake -> Spec/Quote -> Build -> QA -> Deploy -> Handover`

## Vai trò agents
1. **Advisor**: intake brief + chốt scope.
2. **Estimator**: báo giá + timeline + gói dịch vụ.
3. **Builder**: code site từ template.
4. **QA**: test UI/UX + hiệu năng cơ bản.
5. **DeployOps**: deploy + domain + gửi link.

## Trạng thái task
`INBOX -> ASSIGNED -> IN_PROGRESS -> REVIEW -> DONE | FAILED`

## Artifact chuẩn
- `team-agents/shared/specs/<TASK_ID>.md`
- `team-agents/shared/artifacts/<TASK_ID>/`
- `team-agents/shared/reviews/<TASK_ID>.md`
- `team-agents/shared/decisions/<TASK_ID>.md`

## Luồng chạy chuẩn
1. Advisor chạy 3-question intake và tạo spec ngay.
2. Estimator tạo quote từ spec (không hỏi thêm trừ blocker critical).
3. Nếu khách xác nhận: Builder scaffold + implement.
4. QA chạy checklist + screenshot.
5. DeployOps deploy staging/live.
6. Orchestrator gửi handover cho khách.

## Hosting policy (Mode A mặc định)
- `hosting_owner = studio`
- Deploy bằng account của studio, khách không cần GitHub/Vercel.
- Nếu chưa có domain: cấp URL tạm (Pages/Vercel subdomain).
- Luôn bàn giao kèm source code `.zip` + hướng dẫn chuyển giao sau này.

## SLA MVP
- Báo giá: <= 30 phút
- Bản staging đầu: <= 24h
- Bugfix P1: <= 4h

## Rule tiết kiệm token (OpenCode-first)
- Default model (build/ops): `opencode/kimi-k2.5` (hoặc `opencode/kimi-k2.5-free`)
- Task cơ học: `opencode/kimi-k2.5-free`
- Escalate nặng: `openai-codex/gpt-5.2-codex`
- Critical: `openai-codex/gpt-5.1-codex-max`
- Fallback khi OpenCode unavailable: `nvidia/moonshotai/kimi-k2.5`

Activation note: cần cấu hình `OPENCODE_API_KEY` để dùng model `opencode/...`.
