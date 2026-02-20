# Stitch Handoff — TASK-20260220-002

## Design-to-build mapping
- Home: Hero + social proof + signature sampler + conversion CTA
- About: biographical narrative, timeline, credibility assets
- Signature: premium menu/project-style catalog with tags and pairings
- Stories: blog/editorial storytelling grid
- Contact: premium inquiry funnel

## Responsive behavior
- Desktop: wide hero split layout, 3-column card grids
- Tablet: 2-column card grids
- Mobile (390 baseline): stacked flow, simplified nav, condensed spacing

## Token guidance
- Background: #111111
- Surface: #1A1A1A
- Text: #F8F5EF
- Muted text: #CFC8BB
- Accent gold: #C6A15B
- Accent wine: #5A2E2E

## Typography guidance
- Headings: editorial serif, tight line-height
- Body/UI: clean sans, high readability
- Hierarchy: strong contrast between H1/H2/body/caption

## Implementation constraints
- Prefer reusable section wrappers and card components
- Keep interaction subtle (hover lift, opacity transitions)
- Prioritize rhythm and spacing consistency over decorative effects
- Ensure all routes are real pages (no single-page anchor fallback)

## SEO + delivery constraints
- Metadata per route
- Global OG baseline
- robots.ts and sitemap.ts present
- Static export for GitHub Pages deployment
