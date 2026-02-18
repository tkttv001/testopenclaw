# DeployOps — TASK-20260218-001

## Deploy status
- **Blocked** (temporary): Vercel CLI chưa có trên môi trường hiện tại (`vercel: command not found`).

## What is ready
- Static portfolio artifact đã sẵn sàng tại:
  - `team-agents/shared/artifacts/TASK-20260218-001/index.html`
  - `team-agents/shared/artifacts/TASK-20260218-001/styles.css`
  - `team-agents/shared/artifacts/TASK-20260218-001/script.js`

## Fastest deploy options
1. **Vercel (khuyến nghị cho MVP)**
   - Cài CLI + login
   - Deploy thư mục artifact như static site
2. **GitHub Pages fallback**
   - Publish từ nhánh `main` và folder artifact

## Rollback
- Vì là static MVP, rollback = trỏ lại commit trước đó của artifact.

## Handover checklist
- [x] Build PASS
- [x] QA PASS
- [ ] Public staging URL
- [ ] Live URL
