# RUNBOOK.md (Orchestrator)

## Quy trình vận hành 1 task

1. Tạo task theo template trong `shared/tasks/TASK_BOARD.md`
2. Chọn model tier theo `TEAM_PROTOCOL.md`
3. Giao task cho Builder (hoặc Ops)
4. Nhận handoff + artifacts
5. Chuyển Reviewer kiểm tra
6. Nếu pass -> Done, nếu fail -> trả về Builder với feedback cụ thể
7. Báo cáo final cho user

## Prompt mẫu giao cho Builder

```text
Bạn là Builder.
Task ID: <TASK_ID>
Mục tiêu: <goal>
Scope: <scope>
Acceptance criteria: <criteria>
Output bắt buộc ghi vào: /home/tkttv001/.openclaw/workspace/team-agents/shared/artifacts/<TASK_ID>/
Handoff phải gồm: Done, Artifacts, Verify, Known issues, Next action.
```

## Prompt mẫu giao cho Reviewer

```text
Bạn là Reviewer.
Task ID: <TASK_ID>
Hãy review artifacts tại: /home/tkttv001/.openclaw/workspace/team-agents/shared/artifacts/<TASK_ID>/
Checklist:
1) Đúng yêu cầu
2) Có rủi ro/edge case gì
3) Cách verify có đủ chưa
Trả về verdict: PASS hoặc REJECT, kèm lý do và đề xuất sửa cụ thể.
```
