// Compare a render with the Figma master: pixel diff + side-by-side sheet.
// npm run compare [-- --render output/master-render.png]
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { PNG } from "pngjs";
import pixelmatch from "pixelmatch";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const i = process.argv.indexOf("--render");
const renderPath = path.resolve(root, i > -1 ? process.argv[i + 1] : "output/master-render.png");
const out = path.join(root, "output/qa");
fs.mkdirSync(out, { recursive: true });

const read = (p) => PNG.sync.read(fs.readFileSync(p));
const ref = read(path.join(root, "references/master.png"));
const ren = read(renderPath);
if (ref.width !== ren.width || ref.height !== ren.height)
  throw new Error(
    `Size mismatch: master ${ref.width}×${ref.height}, render ${ren.width}×${ren.height}`
  );
const { width: w, height: h } = ref;

const diff = new PNG({ width: w, height: h });
const changed = pixelmatch(ref.data, ren.data, diff.data, w, h, { threshold: 0.1 });
fs.writeFileSync(path.join(out, "diff.png"), PNG.sync.write(diff));

// Side by side: master | render | diff
const sheet = new PNG({ width: w * 3 + 20, height: h });
sheet.data.fill(255);
[ref, ren, diff].forEach((img, k) => PNG.bitblt(img, sheet, 0, 0, w, h, k * (w + 10), 0));
fs.writeFileSync(path.join(out, "side-by-side.png"), PNG.sync.write(sheet));

// Rows with differences, grouped into bands, to locate discrepancies.
const rowDiff = [];
for (let y = 0; y < h; y++) {
  let n = 0;
  for (let x = 0; x < w; x++) {
    const o = (y * w + x) * 4;
    if (
      Math.abs(ref.data[o] - ren.data[o]) +
        Math.abs(ref.data[o + 1] - ren.data[o + 1]) +
        Math.abs(ref.data[o + 2] - ren.data[o + 2]) >
      30
    )
      n++;
  }
  rowDiff.push(n);
}
const bands = [];
rowDiff.forEach((n, y) => {
  if (!n) return;
  const last = bands.at(-1);
  if (last && y - last.to <= 2) ((last.to = y), (last.px += n));
  else bands.push({ from: y, to: y, px: n });
});

const pct = ((changed / (w * h)) * 100).toFixed(2);
console.log(`Different pixels (pixelmatch 0.1): ${changed} / ${w * h} (${pct} %)`);
console.log("Bands (y range: pixels off by > 30 RGB):");
bands.forEach((b) => console.log(`  ${b.from}–${b.to}: ${b.px}`));
console.log(`→ ${path.relative(root, out)}/side-by-side.png, diff.png`);
