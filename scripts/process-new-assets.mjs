// Processes the new asset batch supplied in velora-wheels/ into public/images.
// Wheel PNGs (already transparent, except axis which was background-removed
// separately — see axis-bgremove.mjs) are just resized/re-encoded to WebP.
// Hero's own wheel image is intentionally untouched (public/images/wheels/
// axis-hero.webp, a byte-identical copy of the pre-existing axis.webp made
// before this asset swap) and is not part of this script.
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.join(__dirname, "..", "velora-wheels");
const SCRATCH =
  "C:/Users/perju/AppData/Local/Temp/claude/c--Users-perju-Desktop-link-academy/62258acb-8699-498d-9cf3-e50f3c5306ab/scratchpad";
const PUB = path.join(__dirname, "..", "public", "images");

const jobs = [
  // Collection wheel: background-removed cutout (see axis-bgremove.mjs)
  { src: `${SCRATCH}/axis-cutout-trimmed.png`, out: "wheels/axis.webp", maxW: 1400, quality: 90, alphaQuality: 100 },
  { src: `${SRC}/velora-forge.png`, out: "wheels/forge.webp", maxW: 1400, quality: 90, alphaQuality: 100 },
  { src: `${SRC}/velora-vector.png`, out: "wheels/vector.webp", maxW: 1400, quality: 90, alphaQuality: 100 },
  { src: `${SRC}/velora-arc.png`, out: "wheels/arc.webp", maxW: 1400, quality: 90, alphaQuality: 100 },
  { src: `${SRC}/velora-monarch.png`, out: "wheels/monarch.webp", maxW: 1400, quality: 90, alphaQuality: 100 },
  { src: `${SRC}/velora-nova.png`, out: "wheels/nova.webp", maxW: 1400, quality: 90, alphaQuality: 100 },
  // Brand car photography — transparent cutouts, shown on a dark card
  // background (BrandExperience.module.css sets `background: var(--color-black)`
  // on each frame), so alpha is kept as-is.
  { src: `${SRC}/bmw.png`, out: "cars/bmw.webp", maxW: 1800, quality: 82 },
  { src: `${SRC}/mercedes.png`, out: "cars/mercedes.webp", maxW: 1800, quality: 82 },
  { src: `${SRC}/audi.png`, out: "cars/audi.webp", maxW: 1800, quality: 82 },
  // Built to Move closing section: a transparent, angular cutout graphic —
  // but About.module.css's .ctaImage is a full-bleed `object-fit: cover`
  // background with no card behind it, so it's flattened onto the section's
  // own background color (--color-charcoal) rather than left transparent,
  // which would otherwise show a patchy see-through crop under the scrim.
  { src: `${SRC}/build-to-move.png`, out: "cars/build-to-move.webp", maxW: 2000, quality: 82, flatten: "#141417" },
];

for (const job of jobs) {
  const outputPath = path.join(PUB, job.out);
  await mkdir(path.dirname(outputPath), { recursive: true });
  let pipeline = sharp(job.src);
  if (job.flatten) pipeline = pipeline.flatten({ background: job.flatten });
  await pipeline
    .resize({ width: job.maxW, withoutEnlargement: true })
    .webp({ quality: job.quality, alphaQuality: job.alphaQuality })
    .toFile(outputPath);
  const meta = await sharp(outputPath).metadata();
  console.log(job.out, "->", meta.width, "x", meta.height);
}

console.log("done");
