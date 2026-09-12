// Converts the user-supplied car & brand-wheel JPEGs (in ../velora-wheels/)
// to WebP for public/images/. No cropping or retouching — used exactly as
// provided, only resized/re-encoded for web performance.
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.join(__dirname, "..", "..", "velora-wheels");
const PUB = path.join(__dirname, "..", "public", "images");

const jobs = [
  { src: "bmw.jpg", out: "cars/bmw.webp", maxW: 1800 },
  { src: "audi.jpg", out: "cars/audi.webp", maxW: 1800 },
  { src: "mercedes.jpg", out: "cars/mercedes.webp", maxW: 1800 },
  { src: "janta-bmw.jpg", out: "fit/bmw.webp", maxW: 1400 },
  { src: "janta-audi.jpg", out: "fit/audi.webp", maxW: 1400 },
  { src: "janta-mercedes.jpg", out: "fit/mercedes.webp", maxW: 1400 },
  { src: "Brixton Forged TR20 (Wheel Gallery).jpg", out: "details/wheel-gallery.webp", maxW: 1400 },
  { src: "Wheel Whisper_ G80's Frontal Forge.jpg", out: "cars/bmw-detail.webp", maxW: 1400 },
];

for (const job of jobs) {
  const outputPath = path.join(PUB, job.out);
  await mkdir(path.dirname(outputPath), { recursive: true });
  await sharp(path.join(SRC, job.src))
    .resize({ width: job.maxW, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(outputPath);
  console.log("exported", job.out);
}

console.log("done");
