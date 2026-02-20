# TASK_BOARD.md

## Inbox
### TASK-20260220-001
- Title: Personal website pipeline with Stitch design (Ronin style)
- Priority: P1
- Owner: nguoitaoweb
- Status: Done
- Model tier: A/B
- Scope:
  - Run nguoitaoweb intake with selected style option #3 (Ronin Premium Dark)
  - Generate Stitch UI package and builder handoff artifacts
  - Prepare for Opencode build handoff
- Acceptance criteria:
  - Stitch project + screens generated
  - Handoff file includes section mapping and implementation constraints
- Artifacts:
  - `team-agents/shared/specs/TASK-20260220-001.md`
  - `team-agents/shared/artifacts/TASK-20260220-001/stitch/`
- Verify:
  - `screens.json` contains generated screen IDs and URLs
- Notes/Transitions:
  - [2026-02-20 05:xx UTC] Triggered by user via nguoitaoweb
  - [2026-02-20 05:xx UTC] Style option #3 selected
  - [2026-02-20 05:xx UTC] Stitch project generated with 4 core screens
  - [2026-02-20 06:36 UTC] Builder implemented Next.js + Tailwind + TS site bundle under `artifacts/TASK-20260220-001/site/`
  - [2026-02-20 06:37 UTC] Build/lint passed; task moved to Done
  - [2026-02-20 06:59 UTC] QA PASS (responsive/nav/CTA/form/SEO/build checks)
  - [2026-02-20 07:00 UTC] Deploy prepared to `docs/task010/` with Next static export + basePath fix
  - [2026-02-20 07:00 UTC] Waiting for push + Pages publish verification (HTTP 200) before final Done confirmation
  - [2026-02-20 07:02 UTC] Pushed `main`; public URL verified live (HTTP 200): `https://tkttv001.github.io/testopenclaw/task010/`

### TASK-20260218-009
- Title: Chef task rebuilt with explicit design handoff + protocol gates
- Priority: P1
- Owner: nguoitaoweb
- Status: Done
- Model tier: A/B
- Scope:
  - Rebuild chef basic package with mandatory design handoff artifact
  - Enforce motion + token + image strategy gates
  - Deploy public URL
- Acceptance criteria:
  - Includes design handoff file before build artifacts
  - 3 pages only (Basic package)
  - Live URL returns 200
- Artifacts:
  - `team-agents/shared/specs/TASK-20260218-009.md`
  - `team-agents/shared/artifacts/TASK-20260218-009/`
  - `team-agents/shared/reviews/TASK-20260218-009.md`
- Verify:
  - URL `/task009/` accessible
- Notes/Transitions:
  - [2026-02-18 18:15 UTC] Triggered by user via nguoitaoweb command intent
  - [2026-02-18 18:16 UTC] Design handoff created and validated before build
  - [2026-02-18 18:17 UTC] QA PASS and deploy complete

### TASK-20260218-008
- Title: Chef theme v4 with advanced design-skill stack
- Priority: P1
- Owner: nguoitaoweb
- Status: Done
- Model tier: A/B
- Scope:
  - Rebuild chef theme using newly installed design libraries
  - Improve UX/UI distinctiveness and motion quality
  - Deploy and share comparison URL
- Acceptance criteria:
  - Basic package scope (3 pages)
  - Stronger visual system + signature animation
  - Live URL returns 200
- Artifacts:
  - `team-agents/shared/specs/TASK-20260218-008.md`
  - `team-agents/shared/artifacts/TASK-20260218-008/`
  - `team-agents/shared/reviews/TASK-20260218-008.md`
- Verify:
  - URL `/task008/` accessible
- Notes/Transitions:
  - [2026-02-18 18:05 UTC] Triggered by user command "run task008"
  - [2026-02-18 18:06 UTC] Built and deployed with new design stack

### TASK-20260218-007
- Title: Chef theme rebuild with Basic package (3 pages)
- Priority: P1
- Owner: nguoitaoweb
- Status: Done
- Model tier: A/B
- Scope:
  - Build chef site using Basic package only (3 pages)
  - Keep premium style and lightweight animation
  - Deploy and provide temporary URL
- Acceptance criteria:
  - Exactly 3 pages: Home/About/Projects
  - SEO baseline on each page
  - Live URL returns 200
- Artifacts:
  - `team-agents/shared/specs/TASK-20260218-007.md`
  - `team-agents/shared/artifacts/TASK-20260218-007/`
  - `team-agents/shared/reviews/TASK-20260218-007.md`
- Verify:
  - URL `/task007/` accessible
- Notes/Transitions:
  - [2026-02-18 17:48 UTC] Created by request using Basic 3-page package
  - [2026-02-18 17:49 UTC] Built and deployed

### TASK-20260218-006
- Title: Chef scenario reboot (clean slate, old scenarios removed)
- Priority: P1
- Owner: nguoitaoweb
- Status: Done
- Model tier: A/B
- Scope:
  - Rebuild chef website from scratch after clearing old chef scenarios
  - Keep premium visual direction + animation-ready structure
  - Deploy temporary URL for fresh review
- Acceptance criteria:
  - Old chef scenario files removed from active workflow paths
  - New spec/artifacts/review/deploy files generated
  - Live URL returns 200
- Artifacts:
  - `team-agents/shared/specs/TASK-20260218-006.md`
  - `team-agents/shared/artifacts/TASK-20260218-006/`
  - `team-agents/shared/reviews/TASK-20260218-006.md`
- Verify:
  - URL `/task006/` accessible
- Notes/Transitions:
  - [2026-02-18 17:35 UTC] Old chef scenarios archived to `.trash/chef-old/`
  - [2026-02-18 17:36 UTC] Fresh chef scenario generated and deployed

### TASK-20260218-002
- Title: Sample run - 3Q personal website pipeline
- Priority: P2
- Owner: Orchestrator
- Status: Done
- Model tier: A/B
- Scope:
  - Run full 3Q workflow sample (spec -> quote -> build -> QA -> deploy)
  - Publish temporary URL
- Acceptance criteria:
  - Has spec + quote + artifact + QA + deploy note
  - Public URL returns 200
- Artifacts:
  - `team-agents/shared/specs/TASK-20260218-002.md`
  - `team-agents/shared/artifacts/TASK-20260218-002/`
  - `team-agents/shared/reviews/TASK-20260218-002.md`
- Verify:
  - URL `/task002/` accessible
- Notes/Transitions:
  - [2026-02-18 12:20 UTC] Sample task created and executed end-to-end

### TASK-20260218-001
- Title: Personal website MVP for creator profile
- Priority: P1
- Owner: DeployOps
- Status: Review
- Model tier: B
- Scope:
  - Thu thập brief khách hàng theo template chuẩn
  - Chốt mục tiêu website + CTA chính + deadline
  - Tạo spec đầu vào cho Estimator và Builder
- Acceptance criteria:
  - Có file spec đầy đủ trong `team-agents/shared/specs/TASK-20260218-001.md`
  - Có đủ 8 mục intake từ `ORDER_INTAKE_TEMPLATE.md`
  - Có phần "Out of scope" để tránh tràn phạm vi
- Artifacts:
  - `team-agents/shared/specs/TASK-20260218-001.md`
  - `team-agents/shared/artifacts/TASK-20260218-001/quote.md`
  - `team-agents/shared/artifacts/TASK-20260218-001/`
  - `team-agents/shared/reviews/TASK-20260218-001.md`
- Verify:
  - Kiểm tra spec có đầy đủ section: objective, audience, pages, CTA, timeline, budget, assets, technical requirements
- Notes/Transitions:
  - [2026-02-18 06:49 UTC] Created in Inbox by Orchestrator
  - [2026-02-18 06:50 UTC] Inbox -> In Progress by Orchestrator (Advisor started intake)
  - [2026-02-18 06:52 UTC] Intake completed by Advisor, spec finalized
  - [2026-02-18 06:52 UTC] Quote generated by Estimator
  - [2026-02-18 06:52 UTC] In Progress -> Review by Orchestrator
  - [2026-02-18 06:54 UTC] Review -> In Progress by Orchestrator (Builder started implementation)
  - [2026-02-18 06:56 UTC] Builder completed artifact bundle
  - [2026-02-18 06:56 UTC] In Progress -> Review by Orchestrator (handoff to QA)
  - [2026-02-18 06:58 UTC] QA verdict PASS
  - [2026-02-18 06:58 UTC] Review -> In Progress by Orchestrator (handoff to DeployOps)
  - [2026-02-18 07:00 UTC] Deploy blocked (Vercel CLI unavailable) -> marked Failed pending deploy tooling
  - [2026-02-18 07:03 UTC] Applied fix: switched to GitHub Pages pipeline (docs/task001 + deploy workflow)
  - [2026-02-18 07:03 UTC] Failed -> Review by Orchestrator (await first Pages deploy verification)

## Assigned
- (trống)

## In Progress
- (trống)

## Review
- (trống)

## Done
- (trống)

## Failed
- (trống)

---

## Task template

```md
### TASK-YYYYMMDD-001
- Title:
- Priority: P1 | P2 | P3
- Owner: Builder | Reviewer | Ops
- Status: Inbox | Assigned | In Progress | Review | Done | Failed
- Model tier: A | B | C | D | Fallback
- Scope:
- Acceptance criteria:
- Artifacts:
- Verify:
- Notes/Transitions:
  - [time] Assigned -> In Progress by ...
  - [time] In Progress -> Review by ...
```
