import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

/** Minimal seed — full defaults are created on first API read if this is missing. */
const seed = {
  note: "Run the site once (npm run dev) to auto-generate full cms.json from src/lib/cms/seed.ts",
};

await mkdir(path.join(root, "data"), { recursive: true });
await writeFile(path.join(root, "data", "cms.json"), JSON.stringify(seed, null, 2));
console.log("Created data/cms.json placeholder. Start npm run dev to populate full CMS data.");
