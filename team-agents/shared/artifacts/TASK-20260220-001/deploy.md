# Deploy Note — TASK-20260220-001

Mode: A (docs/GitHub Pages)
Publish path: `docs/task010/`
Public URL: `https://tkttv001.github.io/testopenclaw/task010/`

## Deployment actions
1. Added safe static-export config in Next.js:
   - `output: "export"`
   - `trailingSlash: true`
   - conditional `basePath` + `assetPrefix` via `NEXT_PUBLIC_BASE_PATH`
2. Set SEO/robots/sitemap URLs to deployed path (`/testopenclaw/task010`).
3. Built with:
   - `NEXT_PUBLIC_BASE_PATH=/testopenclaw/task010 npm run build`
4. Published export artifacts from `site/out/` to `docs/task010/`.

## Assumptions
- GitHub Pages is configured for repository `tkttv001/testopenclaw` and serves from the default publishing branch.
- Deployed preview path for this task index is `/task010/`.

## Verification
- Pre-push URL check returned 404 (expected before publish).
- Post-push URL verification must return HTTP 200 to mark Done.
