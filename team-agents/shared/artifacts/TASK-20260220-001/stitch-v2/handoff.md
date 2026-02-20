# Stitch v2 Handoff — TASK-20260220-001

## IA and Route Map
- `/` Home
- `/about` About
- `/projects` Projects
- `/blog` Blog
- `/contact` Contact

## Mobile coverage delivered
- Home mobile variant: hero + menu behavior
- Blog mobile variant: content-heavy readability
- Contact mobile variant: conversion-safe form flow

## Responsive behavior rules
1. Baseline mobile width: **390px**.
2. Breakpoints: mobile `<768`, tablet `768–1279`, desktop `>=1280`.
3. Navigation:
   - Mobile: menu toggle button + vertical list panel.
   - Desktop/tablet: inline nav links.
4. Grid behavior:
   - Cards stack 1-column on mobile.
   - 2-column on tablet, 3-column desktop for project cards.
5. Spacing rhythm: 8px scale; section padding compresses on mobile.
6. Touch and accessibility:
   - Interactive targets >=44px.
   - Focus ring visible on keyboard navigation.
7. Contrast:
   - Maintain high text contrast on dark backgrounds.
   - Gold accents reserved for CTA/focus markers.

## Implementation notes
- Preserve reusable card/button/nav components.
- Ensure metadata, robots, and sitemap include all five routes.
- Keep static export compatibility for GitHub Pages basePath.

## Stitch runtime note
Attempt to call Stitch MCP was blocked by missing `GOOGLE_STITCH_API_KEY` in environment. Prompt pack and screen specification JSON are included to execute immediately when key is restored.