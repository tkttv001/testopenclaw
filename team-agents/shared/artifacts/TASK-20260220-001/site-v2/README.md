# TASK-20260220-001 Site v2

Multi-page Next.js App Router implementation for Ronin Premium Dark.

## Routes
- `/`
- `/about/`
- `/projects/`
- `/blog/`
- `/contact/`

## Run
```bash
npm ci
NEXT_PUBLIC_BASE_PATH=/testopenclaw/task011 npm run build
```

Static output is generated to `out/` for GitHub Pages deploy.

## Responsive targets
- Mobile baseline: 390px
- Tablet: 768+
- Desktop: 1280+

## SEO baseline
- Global metadata + OG in `src/app/layout.tsx`
- Route metadata in each page
- `robots.ts` and `sitemap.ts` include all routes
