# ORCHESTRATION_RUNBOOK.md

## Cách chạy 1 order end-to-end

1. Tạo TASK_ID: `WEB-YYYYMMDD-###`
2. Tạo entry ở `team-agents/shared/tasks/TASK_BOARD.md`
3. Spawn Advisor -> tạo spec
4. Spawn Estimator -> tạo quote
5. Khi approved -> Spawn Builder (Builder only instructs `opencode-controller`, no direct coding)
6. Spawn QA (QA can request patch via `opencode-controller`)
7. Nếu QA PASS -> Spawn DeployOps
8. Gửi kết quả cho khách + chốt DONE

## Handoff chuẩn
Mỗi agent khi hoàn tất phải trả về:
- Done
- Artifacts (path cụ thể)
- Verify steps
- Known issues
- Next action

## Escalation
- Fail 2 vòng liên tiếp: nâng model 1 tier.
- Blocked > 30 phút: escalte về Orchestrator.
- Release critical: bắt buộc QA PASS trước deploy.
