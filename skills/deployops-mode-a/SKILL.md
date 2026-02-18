---
name: deployops-mode-a
description: Deploy client projects in studio-managed mode (Mode A) when client has no GitHub/Vercel account. Use for fast temporary public URL delivery and handover readiness.
---

# DeployOps Mode A

## Mode A policy
- Studio owns deploy account.
- Client receives temporary public URL.
- Include source handover package.

## Deploy sequence
1. Verify build artifact exists.
2. Publish to studio-managed host.
3. Verify URL returns 200.
4. Write deploy note with rollback path.
5. Send final link.

If primary host fails, switch to fallback static host immediately.

## Cost control
- Keep deploy messages concise (no long logs unless failure).
- Prefer static hosting path for MVP to reduce build/deploy iterations.