# VELORA WHEELS

**Precision in motion.**

A concept premium automotive wheel brand, presented as a dark, cinematic digital
showroom rather than an e-commerce storefront. Built as a front-end development
portfolio piece to showcase scroll storytelling, restrained motion design, and an
editorial (non-templated) product layout.

> Concept project created for portfolio purposes. VELORA WHEELS is a fictional
> brand and is not affiliated with or endorsed by BMW, Mercedes-Benz, or Audi.

## Description

VELORA WHEELS shows a 6-model wheel collection as isolated, transparent product
cutouts — no cards, no rectangular photo backgrounds, no drop-shadowed boxes — each
wheel floats directly in the page's own dark space. A pinned scroll-driven hero
sequence carries one wheel through several narrative states, a "Built for the Road"
section presents BMW / Mercedes-Benz / Audi in three different compositions, a
"Find Your Fit" switcher lets you preview a brand-specific wheel, and a
craftsmanship section is built from macro detail photography revealed on scroll.
There is no cart, checkout, account system, or backend — every interaction is
presentation-only.

## Technologies

- **React 19 + TypeScript + Vite** — component architecture, strict typing
- **CSS Modules** — scoped, hand-written CSS (no Tailwind/Bootstrap), with a shared
  design-token stylesheet (`src/styles/tokens.css`)
- **GSAP + ScrollTrigger** — the only motion library, used for both the pinned
  scroll-storytelling sequence in the hero and simple scroll reveals elsewhere;
  cursor-follow parallax is done with `gsap.quickTo` for damped, clamped motion
- **sharp** (build-time only) — resizes/converts sourced photography to WebP

## Features

- Every wheel is a real alpha-transparent product PNG, not a rectangular photo —
  the page's dark background shows through the spoke gaps, so each wheel genuinely
  floats in the layout instead of sitting in a card or frame
- Pinned, scroll-scrubbed hero sequence (desktop): title → "Precision." →
  "Engineered for motion." → macro crossfade detail → transition into the collection,
  all on one continuous scroll-jacked wheel image — skipped entirely on mobile and
  for `prefers-reduced-motion` users, who get the full message as a static hero
- An editorial collection layout where each of the 6 models has its own distinct
  composition (minimal/centered, aggressive/bleeding off-frame, technical spec-sheet
  framing, airy, grand-centered, oversized closing statement) rather than repeating
  one card template
- Each wheel has a clamped, damped cursor-parallax drift and a cursor-follow light
  sheen on hover — small, slow, "heavy metal object" motion, not a snappy
  mouse-follow
- "Built for the Road": three brand features (BMW/Mercedes/Audi) laid out as three
  different compositions — one large with a secondary detail inset, one offset/
  staggered, one wide banner — not three identical cards
- "Find Your Fit": a simple frontend-only brand switcher (click/hover BMW,
  Mercedes-Benz, or Audi) that crossfades to a wheel fitted to that brand; the
  interactive tabs are never gated behind a scroll-reveal animation, so they're
  always clickable regardless of scroll history
- Clip-path "unmask" reveal + release-zoom on the craftsmanship macro shots
- Fully keyboard-accessible mobile menu (focus trap, `Escape` to close, focus
  restored on close) and a working skip-to-content link
- `prefers-reduced-motion` is respected everywhere motion is used — GSAP scroll
  timelines and pointer-parallax are skipped outright rather than just shortened

## Project structure

```
src/
  components/   Navbar, Footer, Button, Reveal, WheelStage, DetailReveal
  sections/     Hero, Collection, BrandExperience, FindYourFit, Craftsmanship, About
  data/         wheels.ts, brands.ts, fit.ts, details.ts
  hooks/        useReducedMotion, usePointerParallax, useScrollAnimation
  styles/       tokens.css (design tokens), global.css
scripts/
  process-images.mjs      crops/resizes/converts detail-texture photos to WebP
  wheels-export-new.mjs   converts the supplied transparent wheel PNGs to WebP
  process-new-photos.mjs  converts the supplied car & brand-fit photos to WebP
public/images/  wheels/ details/ cars/ fit/   (final WebP assets served to the app)
```

## The collection

| Model | Size | Finish |
|---|---|---|
| VELORA AXIS | 20" | Gloss Black / Polished Lip |
| VELORA FORGE | 22" | Black / Gold Accent |
| VELORA VECTOR | 20" | Hyper Silver |
| VELORA ARC | 19" | Satin Black |
| VELORA MONARCH | 21" | Gunmetal Grey |
| VELORA NOVA | 24" | Chrome |

## Images

All photography and product renders were supplied directly by the project owner
(none downloaded from the web for this pass) and are used as provided — no logos
or brand marks are removed, blurred, or altered on any wheel or photo. Full
source-file mapping is in [`IMAGE_CREDITS.md`](./IMAGE_CREDITS.md).

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
