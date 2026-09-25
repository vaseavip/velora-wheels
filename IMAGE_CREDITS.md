# Image credits

All photography and product renders on this site were supplied directly by the
project owner and placed in the (gitignored) `velora-wheels/` folder inside
the project directory — none were downloaded from the web for this pass. No
logos or brand marks have been removed, blurred, or altered on any wheel or
photo; images are used as provided, only resized/re-encoded to WebP for web
performance, with one exception noted below (Axis).

## Wheel product cutouts (`public/images/wheels/`)

Six real transparent PNG product shots:

| File | Source file | Wheel brand shown |
|---|---|---|
| `axis.webp` | `velora-axis.png` | BBS |
| `forge.webp` | `velora-forge.png` | (unbranded, gold accent) |
| `vector.webp` | `velora-vector.png` | (unbranded, gold finish) |
| `arc.webp` | `velora-arc.png` | Rotiform |
| `monarch.webp` | `velora-monarch.png` | Rotiform |
| `nova.webp` | `velora-nova.png` | AR (American Racing) |

`velora-axis.png` was supplied with a solid studio background (unlike the
other five, which were already transparent cutouts). Per the project owner's
explicit direction, its background was removed locally (`@imgly/background-removal-node`,
fully offline — see `scripts/axis-bgremove.mjs`, dependency removed again after
use) to match the site's floating-wheel treatment; the BBS center-cap logo was
left untouched.

**Hero vs. Collection split:** Hero's wheel image is intentionally a separate,
untouched file (`public/images/wheels/axis-hero.webp`, a byte-identical copy of
the pre-existing Axis asset made before this swap) and is not affected by the
Collection Axis card's new asset above — see `WheelModel.heroImage` in
`src/data/wheels.ts`.

Processed by `scripts/process-new-assets.mjs`.

## Car photography (`public/images/cars/`)

| File | Source file |
|---|---|
| `bmw.webp` | `bmw.png` |
| `audi.webp` | `audi.png` |
| `mercedes.webp` | `mercedes.png` |
| `build-to-move.webp` | `build-to-move.png` (flattened onto `--color-charcoal`, see script — it's a non-rectangular cutout used as a full-bleed CTA background in `About.tsx`) |
| `bmw-detail.webp` | `Wheel Whisper_ G80's Frontal Forge.jpg` (carried over from a previous pass; superseded by `bmw.webp` where BMW imagery is currently used) |

`bmw.webp`, `audi.webp`, and `mercedes.webp` above were replaced with new
supplied photography; processed by `scripts/process-new-assets.mjs`.

## Brand-fit wheel close-ups (`public/images/fit/`)

Used in the "Find Your Fit" section — each shows a wheel actually fitted to
the named brand's car, badge included, since that's the honest point of the
section (which wheel silhouette suits which car).

| File | Source file |
|---|---|
| `bmw.webp` | `janta-bmw.jpg` |
| `audi.webp` | `janta-audi.jpg` |
| `mercedes.webp` | `janta-mercedes.jpg` |

## Craftsmanship detail (`public/images/details/`)

| File | Source file |
|---|---|
| `wheel-gallery.webp` | `Brixton Forged TR20 (Wheel Gallery).jpg` |
| `machining.webp`, `bolts.webp`, `tread.webp` | carried over from the previous pass (generic material textures, not brand-specific) |

Car and brand-fit photos are exported by `scripts/process-new-photos.mjs`
(`npm run photos:process`).

## Fictional brand disclosure

VELORA WHEELS is not a real company. The site names BMW, Mercedes-Benz, and
Audi as marques its fictional products are styled to fit, with an explicit
on-page statement that VELORA is not affiliated with or endorsed by them.
