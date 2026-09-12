// Wheel isolation pipeline — step 2 of 3.
//
// Runs local, model-based background removal (@imgly/background-removal-node,
// ONNX runtime, fully offline) on each precropped photo to produce a real
// alpha-transparent cutout of the wheel.
//
// IMPORTANT: this must run as its own `node` process, separate from any
// script that also calls `sharp`. Interleaving sharp (libvips) and
// onnxruntime-node's native bindings in the same process caused a hard
// segfault in this environment — splitting steps 1/2/3 into separate
// `node` invocations avoids it entirely.
//
// Run: node scripts/wheels-2-bgremove.mjs
import { removeBackground } from "@imgly/background-removal-node";
import { pathToFileURL } from "node:url";
import { writeFile } from "node:fs/promises";
import { jobs } from "./wheels-1-precrop.mjs";

const STAGE = "C:/Users/perju/AppData/Local/Temp/claude/c--Users-perju-Desktop-link-academy/62258acb-8699-498d-9cf3-e50f3c5306ab/scratchpad/isolate";

for (const job of jobs) {
  const src = `${STAGE}/${job.id}-precrop.jpg`;
  const t0 = Date.now();
  const blob = await removeBackground(pathToFileURL(src).href);
  const buf = Buffer.from(await blob.arrayBuffer());
  await writeFile(`${STAGE}/${job.id}-raw.png`, buf);
  console.log(job.id, "done in", Date.now() - t0, "ms");
}
