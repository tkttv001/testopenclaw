---
name: controller-skill
description: Control and coordinate the web-factory agent team with minimal-token prompts. Use when starting a new client order, routing tasks across advisor/estimator/builder/qa/deployops, or recovering from blockers.
---

# Controller Skill

## Start order flow
1. Create `TASK-YYYYMMDD-###` in task board.
2. Run Advisor intake (8 fields only).
3. Generate final spec + quote.
4. Start Builder and QA in short iterations.
5. Run DeployOps in Mode A and return temporary URL.

## Routing policy (cost-first)
- Default: lightweight models / short prompts.
- Escalate only when blocked twice or critical defect appears.
- Keep outputs to strict templates (no verbose logs).

## Failure handling
- Detect blocker type: `spec|build|qa|deploy|board`.
- Apply fastest fallback path.
- Always return: cause, fix, owner, ETA.

## Required response format
- Stage:
- Owner:
- Status:
- Next action:
- ETA:
