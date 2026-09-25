// Removes light-colored halo/fringe pixels left around wheel cutouts by
// imperfect background removal — zeroes alpha on any semi-transparent pixel
// whose RGB is still close to the original studio background (light/white),
// while leaving legitimate dark anti-aliased wheel-edge pixels untouched.
import sharp from "sharp";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUB = path.join(__dirname, "..", "public", "images", "wheels");
const fs = await import("node:fs/promises");

const files = ["axis", "forge", "vector", "arc", "monarch", "nova"];
const LIGHT_THRESHOLD = 165;

for (const f of files) {
  const filePath = path.join(PUB, `${f}.webp`);
  const img = sharp(filePath);
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  let cleaned = 0;

  for (let i = 0; i < width * height; i++) {
    const idx = i * channels;
    const a = data[idx + 3];
    if (a > 0 && a < 250) {
      const r = data[idx], g = data[idx + 1], b = data[idx + 2];
      if (r > LIGHT_THRESHOLD && g > LIGHT_THRESHOLD && b > LIGHT_THRESHOLD) {
        data[idx + 3] = 0;
        cleaned++;
      }
    }
  }

  const out = await sharp(data, { raw: { width, height, channels } })
    .webp({ quality: 90, alphaQuality: 100 })
    .toBuffer();

  // Windows sometimes locks the destination file briefly (AV/indexer); retry
  // a couple of times before giving up.
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      await fs.writeFile(filePath, out);
      break;
    } catch (err) {
      if (attempt === 3) throw err;
      await new Promise((r) => setTimeout(r, 300));
    }
  }

  console.log(f, "cleaned", cleaned, "halo pixels");
}
