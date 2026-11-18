// Provenance sidecars (*.png.json, *.webp.json, ...) live next to the images in
// public/ for the repo's records, but must not be served. Remove them from dist.
import { readdirSync, statSync, unlinkSync } from "node:fs";
import { join } from "node:path";

const walk = (dir) =>
  readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });

const removed = walk("dist").filter((p) => /\.(png|jpe?g|webp|avif|gif)\.json$/i.test(p));
removed.forEach((p) => unlinkSync(p));
console.log(`strip-sidecars: removed ${removed.length} provenance sidecar(s) from dist`);
