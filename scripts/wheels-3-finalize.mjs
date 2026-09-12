// Wheel isolation pipeline — step 3 of 3.
//
// For each background-removed cutout from step 2: trims the transparent
// margin down to the wheel's actual bounds, then anonymizes the one visible
// third-party badge on the hub (a real car-brand emblem, since every source
// photo was a wheel mounted on an actual BMW/Audi/Porsche/etc.) by sampling a
// clean patch of nearby metal and feathering it over the badge — a small,
// disclosed touch-up, not a fabricated logo. Finally exports to WebP with
// alpha into public/images/wheels/.
//
// Run: node scripts/wheels-3-finalize.mjs
import sharp from "sharp";
import { mkdir, rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const STAGE = "C:/Users/perju/AppData/Local/Temp/claude/c--Users-perju-Desktop-link-academy/62258acb-8699-498d-9cf3-e50f3c5306ab/scratchpad/isolate";
const OUT = path.join(__dirname, "..", "public", "images", "wheels");
await mkdir(OUT, { recursive: true });

// badge: null skips anonymization. Otherwise {targetX, targetY, size, sampleX, sampleY, stop?}
// coordinates are in the TRIMMED image's own pixel space (see console output).
const jobs = [
  {
    id: "axis-bmw",
    out: "axis.webp",
    badge: { targetX: 1143, targetY: 1403, size: 420, sampleX: 1143, sampleY: 1780, stop: 55 },
    maxW: 1400,
  },
  {
    id: "forge-audi",
    out: "forge.webp",
    badge: { targetX: 440, targetY: 488, size: 220, sampleX: 300, sampleY: 450, stop: 55 },
    maxW: 1400,
  },
  {
    id: "vector-porsche",
    out: "vector.webp",
    badge: { targetX: 1104, targetY: 826, size: 280, sampleX: 1104, sampleY: 700, stop: 60 },
    maxW: 1400,
  },
  {
    id: "arc-bbs",
    out: "arc.webp",
    badge: { targetX: 461, targetY: 732, size: 190, sampleX: 461, sampleY: 630, stop: 60 },
    maxW: 1200,
  },
  {
    id: "monarch-brabus",
    out: "monarch.webp",
    badge: { targetX: 980, targetY: 700, size: 190, sampleX: 830, sampleY: 900, stop: 50 },
    maxW: 1400,
  },
];

for (const job of jobs) {
  const rawPath = `${STAGE}/${job.id}-raw.png`;
  const trimmedPath = `${STAGE}/${job.id}-trimmed.png`;
  await sharp(rawPath).trim({ threshold: 10 }).toFile(trimmedPath);
  const meta = await sharp(trimmedPath).metadata();
  console.log(job.id, "trimmed to", meta.width, "x", meta.height);

  // Composite and resize are done as two separate sharp pipelines with a
  // real file in between. Chaining .composite().resize() in one pipeline is
  // unreliable here: sharp/libvips can hoist the resize ahead of the
  // composite internally, which silently shifts the mask off-target (found
  // by comparing output against a manual two-step reproduction).
  let maskedPath = trimmedPath;

  if (job.badge) {
    const { targetX, targetY, size, sampleX, sampleY, stop = 55 } = job.badge;
    const swatch = await sharp(trimmedPath)
      .extract({ left: sampleX - 12, top: sampleY - 12, width: 24, height: 24 })
      .resize(1, 1)
      .raw()
      .toBuffer({ resolveWithObject: true });
    const [r, g, b] = swatch.data;

    const svg = Buffer.from(
      `<svg width="${size}" height="${size}">
         <defs>
           <radialGradient id="g" cx="50%" cy="50%" r="50%">
             <stop offset="${stop}%" stop-color="rgb(${r},${g},${b})" stop-opacity="1"/>
             <stop offset="100%" stop-color="rgb(${r},${g},${b})" stop-opacity="0"/>
           </radialGradient>
         </defs>
         <rect width="100%" height="100%" fill="url(#g)"/>
       </svg>`,
    );

    maskedPath = `${STAGE}/${job.id}-masked.png`;
    await sharp(trimmedPath)
      .composite([{ input: svg, left: Math.round(targetX - size / 2), top: Math.round(targetY - size / 2) }])
      .toFile(maskedPath);
  }

  await sharp(maskedPath)
    .resize({ width: job.maxW, withoutEnlargement: true })
    .webp({ quality: 80, alphaQuality: 90 })
    .toFile(path.join(OUT, job.out));
  console.log("exported", job.out);
}

await rm(path.join(OUT, "nova.webp"), { force: true });
console.log("done");
