# STITCH_PROMPT_TEMPLATE.md

Use template này để generate prompt cho Google Stitch từ spec.

```text
Design a premium personal website for [ROLE/PROFESSION].

Goal:
- [Primary conversion goal: book a call / hire me / download CV]

Target audience:
- [Who they are]

Brand style:
- Vibe: [minimal / bold / elegant / modern]
- Tone: [confident / friendly / expert]
- Color direction: [primary, accent, neutral]
- Typography feel: [clean sans / editorial / geometric]

Layout requirements:
- Device: DESKTOP first, responsive for mobile
- One-page structure with these sections:
  1) Hero (clear value proposition + CTA)
  2) About (short bio + strengths)
  3) Services/Expertise (3–6 cards)
  4) Featured Projects/Case Studies
  5) Testimonials/Social proof
  6) Contact CTA + simple form
- Include sticky top navigation with anchors.

UI constraints:
- Strong visual hierarchy
- High readability and WCAG-friendly contrast
- 8px spacing system
- Reusable components (buttons, cards, section headers)
- Modern interactions, but subtle (not flashy)
- Keep design production-ready (easy to implement in React/Next.js)

Content guidance:
- Use realistic placeholder copy in English.
- Avoid lorem ipsum.
```

## Builder Handoff Note (append to handoff.md)
- Source of truth: stitch screens + generated html structure.
- If mismatch appears, prioritize visual hierarchy + spacing rhythm from Stitch.
- Document assumptions explicitly.
