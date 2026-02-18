# MVP_WORKFLOW_SPEC.md

## Mục tiêu
Pipeline OpenClaw-only cho dịch vụ làm website cá nhân:
`Lead -> Brief -> Quote -> Build -> QA -> Deploy -> Handover`

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
1. Advisor tạo spec từ brief khách.
2. Estimator đọc spec, tạo quote.
3. Nếu khách xác nhận: Builder scaffold + implement.
4. QA chạy checklist + screenshot.
5. DeployOps deploy staging/live.
6. Orchestrator gửi handover cho khách.

## SLA MVP
- Báo giá: <= 30 phút
- Bản staging đầu: <= 24h
- Bugfix P1: <= 4h

## Rule tiết kiệm token
- Default model: `openai-codex/gpt-5.1-codex-mini`
- Task cơ học: `openai-codex/gpt-5.3-codex-spark`
- Escalate nặng: `openai-codex/gpt-5.2-codex`
- Critical: `openai-codex/gpt-5.1-codex-max`
- Fallback: `nvidia/moonshotai/kimi-k2.5`
