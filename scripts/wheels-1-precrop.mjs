// Wheel isolation pipeline — step 1 of 3.
//
// Crops each sourced photo down to just the wheel (+ tire), excluding as much
// car body as possible, BEFORE background removal. Feeding the segmentation
// model a tighter crop keeps it from treating an attached fender/mudflap as
// part of the "foreground" — see wheels-2-bgremove.mjs.
//
// Run: node scripts/wheels-1-precrop.mjs
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import { pathToFileURL } from "node:url";

const SRC = "C:/Users/perju/AppData/Local/Temp/claude/c--Users-perju-Desktop-link-academy/62258acb-8699-498d-9cf3-e50f3c5306ab/scratchpad/img-src";
const STAGE = "C:/Users/perju/AppData/Local/Temp/claude/c--Users-perju-Desktop-link-academy/62258acb-8699-498d-9cf3-e50f3c5306ab/scratchpad/isolate";
await mkdir(STAGE, { recursive: true });

// crop: fractional {left, top, width, height} of the source, or null for the full frame.
export const jobs = [
  { id: "axis-bmw", src: "hi-w2.jpg", crop: { left: 0.0, top: 0.05, width: 1.0, height: 0.88 } },
  { id: "forge-audi", src: "src-forge.jpg", crop: { left: 0.38, top: 0.0, width: 0.6, height: 0.8 } },
  { id: "vector-porsche", src: "hi-w3.jpg", crop: null },
  { id: "arc-bbs", src: "hi-w5.jpg", crop: { left: 0.15, top: 0.38, width: 0.85, height: 0.6 } },
  { id: "monarch-brabus", src: "hi-w8.jpg", crop: null },
];

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  for (const job of jobs) {
    const inputPath = `${SRC}/${job.src}`;
    const outputPath = `${STAGE}/${job.id}-precrop.jpg`;
    const image = sharp(inputPath);
    const meta = await image.metadata();

    if (job.crop) {
      const left = Math.round(job.crop.left * meta.width);
      const top = Math.round(job.crop.top * meta.height);
      const width = Math.round(job.crop.width * meta.width);
      const height = Math.round(job.crop.height * meta.height);
      await sharp(inputPath).extract({ left, top, width, height }).toFile(outputPath);
    } else {
      await sharp(inputPath).toFile(outputPath);
    }
    console.log("precropped", job.id);
  }
}
