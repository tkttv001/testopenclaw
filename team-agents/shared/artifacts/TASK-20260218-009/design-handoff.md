# Design Handoff — TASK-20260218-009

## Creative direction (3 words)
- Culinary
- Premium
- Cinematic

## Image strategy
- Hero image: chef-in-action, warm spotlight, 16:9
- About image: premium dining ambience, 16:9
- Projects cards: 3 food/service visuals, 4:3
- Alt-text policy: mô tả ngữ cảnh + mục đích hình ảnh, tránh generic labels

## UX structure
- Home: Hero + value + proof metrics + CTA
- About: story + capability + ambience visual
- Projects: 3 signature experiences + CTA

## UI tokens
- Color: bg #0f0c09, panel #1a130f, line #4a3622, accent #d9b45a, text #f4efe6, muted #cabfae
- Radius: 10/14/16
- Spacing scale: 8/12/16/24/32
- Typography: display bold + readable body

## Interaction & animation concept
- Hero entrance timeline: badge -> heading -> copy+CTA (stagger 120-180ms)
- Section reveal: translateY + opacity on first view
- Card hover: subtle lift + soft shadow depth
- Reduced motion: disable animation, keep structure readable

## Builder task list
1. Build 3 pages with shared tokenized stylesheet
2. Implement sticky header and consistent nav
3. Apply motion system with prefers-reduced-motion fallback
4. Ensure SEO meta/OG per page
5. Preserve image alt text quality
