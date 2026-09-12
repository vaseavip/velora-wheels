# VELORA WHEELS

**Precision in motion.**

A concept premium automotive wheel brand, presented as a dark, cinematic digital
showroom rather than an e-commerce storefront. Built as a front-end development
portfolio piece to showcase scroll storytelling, restrained motion design, and an
editorial (non-templated) product layout.

> Concept project created for portfolio purposes. VELORA WHEELS is a fictional
> brand and is not affiliated with or endorsed by BMW, Mercedes-Benz, or Audi.

## Description

VELORA WHEELS shows a 5-model wheel collection as isolated, transparent product
cutouts — no cards, no rectangular photo backgrounds, no drop-shadowed boxes — each
wheel floats directly in the page's own dark space. A pinned scroll-driven hero
sequence carries one wheel through several narrative states, a brand-fit section
covers BMW / Mercedes-Benz / Audi, and a craftsmanship section is built from macro
detail photography revealed on scroll. There is no cart, checkout, account system,
or backend — every interaction is presentation-only.

## Technologies

- **React 19 + TypeScript + Vite** — component architecture, strict typing
- **CSS Modules** — scoped, hand-written CSS (no Tailwind/Bootstrap), with a shared
  design-token stylesheet (`src/styles/tokens.css`)
- **GSAP + ScrollTrigger** — the only motion library, used for both the pinned
  scroll-storytelling sequence in the hero and simple scroll reveals elsewhere;
  cursor-follow parallax is done with `gsap.quickTo` for damped, clamped motion
- **sharp** (build-time only) — crops/resizes/converts sourced photography to WebP
- **@imgly/background-removal-node** (build-time only) — local/offline background
  removal used once to produce the five transparent wheel cutouts; not part of the
  shipped app bundle

## Features

- Every wheel is a real alpha-transparent cutout, not a rectangular photo — the
  page's dark background shows through the spoke gaps, so each wheel genuinely
  floats in the layout instead of sitting in a card or frame
- Pinned, scroll-scrubbed hero sequence (desktop): title → "Precision." →
  "Engineered for motion." → macro crossfade detail → transition into the collection,
  all on one continuous scroll-jacked wheel image — skipped entirely on mobile and
  for `prefers-reduced-motion` users, who get the full message as a static hero
- An editorial collection layout where each of the 5 models has its own distinct
  composition (minimal/centered, aggressive/bleeding off-frame, technical spec-sheet
  framing, airy, grand-finale-centered) rather than repeating one card template
- Each wheel has a clamped, damped cursor-parallax drift and a cursor-follow light
  sheen on hover — small, slow, "heavy metal object" motion, not a snappy
  mouse-follow
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
  process-images.mjs    crops/resizes/converts car & detail photos to public/images/*.webp
  wheels-1-precrop.mjs  wheel isolation pipeline, step 1: crop to just the wheel
  wheels-2-bgremove.mjs wheel isolation pipeline, step 2: local background removal
  wheels-3-finalize.mjs wheel isolation pipeline, step 3: trim, anonymize badge, export
public/images/  wheels/ details/ cars/ textures/   (final WebP assets served to the app)
```

## The collection

| Model | Size | Finish |
|---|---|---|
| VELORA AXIS | 21" | Brushed Titanium |
| VELORA FORGE | 20" | Gloss Black |
| VELORA VECTOR | 22" | Satin Graphite |
| VELORA ARC | 19" | Polished Chrome |
| VELORA MONARCH | 21" | Brushed Silver |

## Images

All photography is real, sourced from Unsplash and Pexels under their free
licenses — no AI-generated imagery anywhere on the site. The five collection wheels
are isolated, transparent cutouts (see Features above) produced by a disclosed
three-step pipeline — precrop → local background removal → trim + badge
anonymization + export — runnable end-to-end with `npm run wheels:isolate`. Car and
detail photography goes through a simpler crop/resize/WebP pipeline via
`npm run images:process`. Full attribution, source links, and the reasoning behind
every crop and badge touch-up are in [`IMAGE_CREDITS.md`](./IMAGE_CREDITS.md).

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
