# Stitch → Builder Handoff (TASK-20260220-001)

## Stitch identifiers
- project_id: `18184545751789674580`
- session_id: `5992843300226563169`
- style: `Ronin Premium Dark`

## Core screens
1. `fa53923a95954d9293eecbc329f23a0e` — Hero & Navigation
2. `7f89a03527a546c89f5b328b621d938e` — About & Services
3. `de7c753355f14299b1d0249336ed5459` — Projects & Proof
4. `8dd001f4d27c49c28095b3572a288647` — Contact & Footer

## Section mapping → components
- Hero & Navigation
  - `TopNav`
  - `HeroSection`
  - `PrimaryCTAButton`
- About & Services
  - `AboutSection`
  - `ServiceCardGrid`
  - `ServiceCard`
- Projects & Proof
  - `FeaturedProjectsSection`
  - `ProjectCard`
  - `TestimonialsSection`
- Contact & Footer
  - `ContactSection`
  - `ContactForm`
  - `SiteFooter`

## Visual system constraints
- Color mode: dark
- Primary accent: `#eebd2b` (gold)
- Font: Inter
- Corner roundness: medium (`ROUND_EIGHT`)
- Strong contrast, restrained visual noise
- Keep ink/sumi-e accents subtle (not full textured overlays)

## Layout + spacing
- Use 8px spacing rhythm throughout
- Desktop-first composition, responsive breakpoints required
- Preserve clear section hierarchy and conversion-oriented CTA placement

## Motion guidance
- Subtle transitions only (opacity/translate/focus ring)
- No flashy animation
- Hover/focus accents can use gold tone sparingly

## Builder implementation notes
- Source of truth: `screens.json` + `screen-*.json` + screen `htmlCode.downloadUrl` references.
- Implement in Next.js App Router + Tailwind + TS.
- Keep structure production-ready and componentized.
- If ambiguity appears, prioritize hierarchy, spacing rhythm, and readability from Stitch output.

## Known assumptions
- Textual client bio/details were not provided yet; current copy is placeholder-level from Stitch.
- After build v1, replace copy/content with real profile data from client.
