---
name: orchestrator-error-handler
description: Handle multi-agent pipeline failures and unblock delivery fast. Use when tasks stall, handoffs are inconsistent, deploy/test fails, SLA risk appears, or board status diverges from actual state.
---

# Orchestrator Error Handler

## Runbook (token-lean)
1. Detect failure type: `spec|quote|build|qa|deploy|board`.
2. Log one-line root cause and current blocker.
3. Pick fastest recovery path:
   - build issue -> simplify scope + rebuild
   - qa issue -> patch minimal fix + retest
   - deploy issue -> switch to Mode A fallback (studio-hosted)
   - board mismatch -> correct lane/status immediately
4. Reassign owner + next action with deadline.
5. Post concise status: `cause -> fix -> ETA -> risk`.

## Output format
- Failure type:
- Root cause:
- Immediate fix:
- Owner:
- ETA:
- Risk:

## Cost policy
- Default analysis on spark/mini.
- Escalate to stronger model only for critical blocker that impacts delivery.