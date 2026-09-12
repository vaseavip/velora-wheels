# Image credits & licensing

All photography on this site is real (no AI-generated imagery) and sourced from
[Unsplash](https://unsplash.com) and [Pexels](https://www.pexels.com), both of which
publish images under free-to-use licenses (Unsplash License / Pexels License) that
permit commercial and non-commercial use without attribution. Photographer credit
is listed below anyway, as good practice.

## Wheel product cutouts (`public/images/wheels/`)

The five collection wheels are presented as isolated, transparent product shots —
not photos on a rectangular background. Every source photo available under a free
license is a real wheel mounted on a real car (no stock site offers a studio
"isolated wheel on transparent background" shot for free), so each image went
through a disclosed three-step pipeline — see `scripts/wheels-1-precrop.mjs`,
`scripts/wheels-2-bgremove.mjs`, `scripts/wheels-3-finalize.mjs` (run in that order
via `npm run wheels:isolate`):

1. **Precrop** (sharp) — crop tightly to the wheel + tire, excluding as much of the
   car body as possible before segmentation.
2. **Background removal** (`@imgly/background-removal-node`, a local/offline ONNX
   model — no image is uploaded anywhere) — produces a real RGBA alpha cutout of
   the wheel.
3. **Trim + badge anonymization + export** (sharp) — trims the transparent margin,
   then covers the one visible badge on each hub (a real manufacturer emblem,
   since the source is a real BMW/Audi/Porsche/etc. wheel) with a small
   color-matched patch sampled from the wheel's own metal, feathered at the edge.
   This is disclosed here as a deliberate, minimal touch-up — not a claim that the
   cutout is unaltered documentary photography, and not a fabricated logo in its
   place. Exports to WebP with alpha.

| File | Source photo | Photographer | Real vehicle in source (not implied by VELORA) |
|---|---|---|---|
| `axis.webp` | [Unsplash photo-1591117728047](https://unsplash.com/photos/gray-multi-spoke-wheel-with-tire-h82zfDTFUP0) | Mathias Reding | BMW (roundel anonymized) |
| `forge.webp` | [Unsplash photo-1555428691](https://unsplash.com/photos/black-multi-spoke-vehicle-wheel-6xwX1JsNnME) | Vlad Kutepov | Audi (four-rings badge anonymized) |
| `vector.webp` | [Unsplash photo-1623564493214](https://unsplash.com/photos/silver-and-black-car-wheel-60ZSTXNgXgM) | Luca Nicoletti | Porsche (crest anonymized; "PORSCHE" caliper text left as-is — a brake component, not the wheel's own branding) |
| `arc.webp` | [Unsplash photo-1623878405985](https://unsplash.com/photos/black-car-with-chrome-wheel-IVv6CCQL0QM) | Zieben VH | Unbranded aftermarket-style wheel (small hub emblem anonymized) |
| `monarch.webp` | [Pexels photo 244553](https://www.pexels.com/photo/close-up-photograph-of-chrome-vehicle-wheel-244553/) | Mike Bird | Brabus (B badge anonymized) |

## Detail / craftsmanship shots (`public/images/details/`)

| File | Source | Photographer |
|---|---|---|
| `spokes.webp` | [Pexels photo 34369684](https://www.pexels.com/photo/close-up-of-a-stylish-chrome-car-rim-34369684/) | FBO Media |
| `machining.webp` | [Pexels photo 31413496](https://www.pexels.com/photo/close-up-of-metal-tread-plate-texture-31413496/) | David Underland |
| `bolts.webp` | [Pexels photo 28119521](https://www.pexels.com/photo/nuts-and-bolts-28119521/) | Nic Wood |
| `tread.webp` | [Pexels photo 116676](https://www.pexels.com/photo/car-tire-closeup-photo-116676/) | Mike Bird |

## Car photography (`public/images/cars/`)

| File | Source | Photographer | Notes |
|---|---|---|---|
| `bmw.webp` | [Unsplash photo-1587376865569](https://unsplash.com/photos/white-bmw-m-3-on-road-during-night-time-_o9eOHZkLO0) | Konrad Bednarek | Used in full for the Brand Experience section. |
| `mercedes.webp` | [Pexels photo 19664724](https://www.pexels.com/photo/mercedes-amg-gt-r-on-street-19664724/) | Jagjeet Dhuna | Cropped to remove a visible third-party storefront sign in the background. |
| `audi.webp` | [Unsplash photo-1549979097](https://unsplash.com/photos/black-audi-car-NLE9LEI16r4) | Bruno van der Kraan | Used in full. |
| `finalcta.webp` | [Pexels photo 17888840](https://www.pexels.com/photo/a-blue-bmw-m5-parked-on-a-street-at-night-17888840/) | Nikola Kolev | Used near-full for the closing cinematic section. |

## Fictional brand disclosure

VELORA WHEELS is not a real company. The "Designed to complement iconic German
performance" section names BMW, Mercedes-Benz, and Audi as marques VELORA's
fictional products are styled to fit, with an explicit on-page statement that
VELORA is not affiliated with or endorsed by them. No manufacturer logo appears as
VELORA product branding anywhere on the site — every visible badge in a wheel
cutout has been anonymized as described above, and the About section states this
is a portfolio concept project, not a commercial store.

## Reproducibility note

`scripts/wheels-1-precrop.mjs` and `scripts/process-images.mjs` read from a local
scratch folder of downloaded source photos that isn't part of this repository
(only the final processed `public/images/**/*.webp` outputs are committed). The
scripts document the exact crop rectangles and badge-anonymization coordinates
used, but re-running them requires re-downloading the same source photos first.
