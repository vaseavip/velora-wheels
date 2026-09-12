// Exports the user-supplied transparent wheel PNGs (in ../velora-wheels/) to
// WebP with alpha in public/images/wheels/. Logos are left untouched per
// explicit instruction — no masking/blurring of any kind.
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.join(__dirname, "..", "..", "velora-wheels");
const OUT = path.join(__dirname, "..", "public", "images", "wheels");
await mkdir(OUT, { recursive: true });

const jobs = [
  { src: "21132504e2d2f32591fa90003ab1beec.png", out: "axis.webp", maxW: 1200 },
  { src: "2b17901952a22cb23fc1307a85b520c3.png", out: "monarch.webp", maxW: 2000 },
  { src: "a71653288bdaf628ac0955b6505816b5.png", out: "vector.webp", maxW: 1200 },
  { src: "b4547c2150e4aa1fc34dc69c322da39d.png", out: "forge.webp", maxW: 1200 },
  { src: "b81046712075d36500175988de084cc1.png", out: "arc.webp", maxW: 1200 },
  { src: "f2237ce2ced7a0d3ee10bf5a858cb872.png", out: "nova.webp", maxW: 1400 },
];

for (const job of jobs) {
  await sharp(path.join(SRC, job.src))
    .resize({ width: job.maxW, withoutEnlargement: true })
    .webp({ quality: 90, alphaQuality: 100 })
    .toFile(path.join(OUT, job.out));
  console.log("exported", job.out);
}

console.log("done");
