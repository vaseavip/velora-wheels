# VELORA WHEELS

**Precision in motion.**

A concept premium automotive wheel brand, presented as a dark, cinematic digital
showroom rather than an e-commerce storefront. Built as a front-end development
portfolio piece to showcase scroll storytelling, restrained motion design, and an
editorial (non-templated) product layout.

> Concept project created for portfolio purposes. VELORA WHEELS is a fictional
> brand and is not affiliated with or endorsed by BMW, Mercedes-Benz, or Audi.

## Description

VELORA WHEELS shows a 6-model wheel collection as floating product photography
(no cards, no drop-shadowed rectangles), a pinned scroll-driven hero sequence that
carries the product through several narrative states, a brand-fit section for
BMW / Mercedes-Benz / Audi, and a craftsmanship section built from macro detail
photography revealed on scroll. There is no cart, checkout, account system, or
backend — every interaction is presentation-only.

## Technologies

- **React 19 + TypeScript + Vite** — component architecture, strict typing
- **CSS Modules** — scoped, hand-written CSS (no Tailwind/Bootstrap), with a shared
  design-token stylesheet (`src/styles/tokens.css`)
- **GSAP + ScrollTrigger** — the only motion library, used for both the pinned
  scroll-storytelling sequence in the hero and simple scroll reveals elsewhere;
  cursor-follow parallax is done with `gsap.quickTo` for damped, clamped motion
- **sharp** (build-time only) — crops/resizes/converts sourced photography to WebP

## Features

- Pinned, scroll-scrubbed hero sequence (desktop): title → "Precision." →
  "Engineered for motion." → macro crossfade detail → transition into the collection,
  all on one continuous scroll-jacked wheel image — skipped entirely on mobile and
  for `prefers-reduced-motion` users, who get the full message as a static hero
- An editorial, intentionally non-uniform collection grid (one large feature, two
  stacked mid-size items, three small items — not "title + 3 identical cards")
- Every wheel is presented as a bare product photograph (no card, no frame) with a
  clamped, damped cursor-parallax drift and a cursor-follow light sheen on hover
- Clip-path "unmask" reveal + release-zoom on the four craftsmanship macro shots
- Fully keyboard-accessible mobile menu (focus trap, `Escape` to close, focus
  restored on close) and a working skip-to-content link
- `prefers-reduced-motion` is respected everywhere motion is used — GSAP scroll
  timelines and pointer-parallax are skipped outright rather than just shortened

## Project structure

```
src/
  components/   Navbar, Footer, Button, Reveal, WheelStage, DetailReveal
  sections/     Hero, Collection, BrandExperience, Craftsmanship, About
  data/         wheels.ts, brands.ts, details.ts
  hooks/        useReducedMotion, usePointerParallax, useScrollAnimation
  styles/       tokens.css (design tokens), global.css
scripts/
  process-images.mjs   crops/resizes/converts sourced photos to public/images/*.webp
public/images/  wheels/ details/ cars/ textures/   (final WebP assets served to the app)
```

## The collection

| Model | Size | Finish |
|---|---|---|
| VELORA AXIS | 21" | Satin Graphite |
| VELORA FORGE | 20" | Gloss Black |
| VELORA VECTOR | 22" | Brushed Titanium |
| VELORA ARC | 19" | Dark Bronze |
| VELORA MONARCH | 21" | Brushed Silver |
| VELORA NOVA | 20" | Gloss Black / Machined |

## Images

All photography is real, sourced from Unsplash and Pexels under their free
licenses — no AI-generated imagery anywhere on the site. Full attribution, source
links, and the reasoning behind each crop (mostly: keeping a real manufacturer's
badge out of frame, since these are presented as VELORA's own products) are in
[`IMAGE_CREDITS.md`](./IMAGE_CREDITS.md). The crop/convert pipeline is in
[`scripts/process-images.mjs`](./scripts/process-images.mjs) — re-run it with
`npm run images:process` if the source photos in the pipeline's `SRC` folder change.

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

## Build

```bash
npm run build
```

Type-checks with `tsc -b` and then builds a production bundle with Vite to `dist/`.

## Preview the production build

```bash
npm run preview
```
