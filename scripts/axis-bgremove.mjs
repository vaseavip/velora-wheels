import { removeBackground } from "@imgly/background-removal-node";
import { pathToFileURL } from "node:url";
import { writeFile } from "node:fs/promises";

const SRC = "C:/Users/perju/Desktop/link academy/velora-wheels-app/velora-wheels/velora-axis.png";
const OUT = "C:/Users/perju/AppData/Local/Temp/claude/c--Users-perju-Desktop-link-academy/62258acb-8699-498d-9cf3-e50f3c5306ab/scratchpad/axis-cutout-raw.png";

const t0 = Date.now();
const blob = await removeBackground(pathToFileURL(SRC).href);
const buf = Buffer.from(await blob.arrayBuffer());
await writeFile(OUT, buf);
console.log("done in", Date.now() - t0, "ms,", buf.length, "bytes ->", OUT);
