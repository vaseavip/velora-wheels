// One-off build helper: crops sourced stock photos to the framing decided
// during curation (excluding third-party badges / distracting elements),
// resizes, and converts to WebP for the public asset folders.
// Not part of the app runtime — run manually with `node scripts/process-images.mjs`.
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SRC = "C:/Users/perju/AppData/Local/Temp/claude/c--Users-perju-Desktop-link-academy/62258acb-8699-498d-9cf3-e50f3c5306ab/scratchpad/img-src";
const PUB = path.join(__dirname, "..", "public", "images");

// crop: fractional {left, top, width, height} of the source, or null for no crop.
const jobs = [
  { src: "src-axis.jpg", out: "wheels/axis.webp", crop: { left: 0.3, top: 0.0, width: 0.7, height: 0.5 }, maxW: 1400 },
  { src: "src-forge.jpg", out: "wheels/forge.webp", crop: { left: 0.65, top: 0.15, width: 0.2, height: 0.4 }, maxW: 1200 },
  { src: "src-vector.jpg", out: "wheels/vector.webp", crop: { left: 0.5, top: 0.0, width: 0.5, height: 1.0 }, maxW: 1200 },
  { src: "src-arc.jpg", out: "wheels/arc.webp", crop: { left: 0.47, top: 0.13, width: 0.3, height: 0.19 }, maxW: 1100 },
  { src: "src-monarch.jpg", out: "wheels/monarch.webp", crop: { left: 0.28, top: 0.13, width: 0.18, height: 0.32 }, maxW: 1200 },
  { src: "src-nova.jpg", out: "wheels/nova.webp", crop: { left: 0.04, top: 0.0, width: 0.92, height: 0.47 }, maxW: 1400 },
  { src: "src-spokes.jpg", out: "details/spokes.webp", crop: { left: 0.58, top: 0.13, width: 0.4, height: 0.74 }, maxW: 1200 },
  { src: "src-machining.jpg", out: "details/machining.webp", crop: null, maxW: 1200, quality: 74 },
  { src: "src-bolts.jpg", out: "details/bolts.webp", crop: { left: 0.58, top: 0.0, width: 0.42, height: 1.0 }, maxW: 1000 },
  { src: "src-tread.jpg", out: "details/tread.webp", crop: null, maxW: 1400 },
  { src: "src-bmw.jpg", out: "cars/bmw.webp", crop: null, maxW: 1800, quality: 74 },
  { src: "src-mercedes.jpg", out: "cars/mercedes.webp", crop: { left: 0.0, top: 0.3, width: 1.0, height: 0.45 }, maxW: 2000 },
  { src: "src-audi.jpg", out: "cars/audi.webp", crop: null, maxW: 2000 },
  { src: "src-finalcta2.jpg", out: "cars/finalcta.webp", crop: { left: 0.0, top: 0.08, width: 1.0, height: 0.82 }, maxW: 2200 },
  { src: "src-backdrop.jpg", out: "textures/backdrop.webp", crop: null, maxW: 1800 },
];

for (const job of jobs) {
  const inputPath = path.join(SRC, job.src);
  const outputPath = path.join(PUB, job.out);
  await mkdir(path.dirname(outputPath), { recursive: true });

  const image = sharp(inputPath);
  const meta = await image.metadata();

  let pipeline = image;
  if (job.crop) {
    const left = Math.round(job.crop.left * meta.width);
    const top = Math.round(job.crop.top * meta.height);
    const width = Math.round(job.crop.width * meta.width);
    const height = Math.round(job.crop.height * meta.height);
    pipeline = pipeline.extract({ left, top, width, height });
  }

  await pipeline
    .resize({ width: job.maxW, withoutEnlargement: true })
    .webp({ quality: job.quality ?? 82 })
    .toFile(outputPath);

  console.log(`${job.src} -> ${job.out}`);
}

console.log("Done.");
