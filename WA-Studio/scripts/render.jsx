// Render conversations to PNG with Playwright.
// npm run render -- --conversation master-01 --output output/master-render.png [--height 838]
// npm run render -- --all            (every conversation → output/<id>.png)
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { renderToStaticMarkup } from "react-dom/server";
import { chromium } from "playwright";
import { Conversation } from "../src/components/Conversation.jsx";
import { loadConversation } from "../src/content.js";
import { tokens, fontFiles } from "../src/tokens.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const ORIGIN = "https://wa-studio.local";

function arg(name, fallback) {
  const i = process.argv.indexOf(`--${name}`);
  return i > -1 ? process.argv[i + 1] : fallback;
}

const height = Number(arg("height", tokens.canvas.height));
const all = process.argv.includes("--all");
const ids = all
  ? JSON.parse(fs.readFileSync(path.join(root, "data/conversations.json"), "utf8")).map((c) => c.id)
  : [arg("conversation", "master-01")];

const fontFaces = fontFiles
  .map((f, i) => `@font-face{font-family:'${f.family}';src:url('/__font/${i}');}`)
  .join("");

function pageHtml(conversation) {
  const body = renderToStaticMarkup(
    <Conversation messages={conversation.messages} height={height} />
  );
  return `<!doctype html><html lang="${conversation.language}"><head><meta charset="utf-8"><style>${fontFaces}
*{margin:0;padding:0;box-sizing:border-box}
html,body{background:${tokens.canvas.background};-webkit-font-smoothing:antialiased;text-rendering:geometricPrecision}
</style></head><body>${body}</body></html>`;
}

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: tokens.canvas.width, height },
  deviceScaleFactor: 1,
});
let html = "";
await page.route(`${ORIGIN}/**`, (route) => {
  const p = decodeURIComponent(new URL(route.request().url()).pathname);
  if (p === "/") return route.fulfill({ contentType: "text/html", body: html });
  if (p.startsWith("/__font/")) {
    const f = fontFiles[Number(p.split("/").pop())];
    if (!fs.existsSync(f.file)) throw new Error(`Missing font ${f.file}`);
    return route.fulfill({ body: fs.readFileSync(f.file), contentType: "font/ttf" });
  }
  const file = path.join(root, p);
  if (!file.startsWith(root) || !fs.existsSync(file)) return route.fulfill({ status: 404 });
  return route.fulfill({ body: fs.readFileSync(file) });
});

for (const id of ids) {
  const conversation = loadConversation(root, id);
  const output = path.resolve(root, all ? `output/${id}.png` : arg("output", `output/${id}.png`));
  html = pageHtml(conversation);
  await page.goto(`${ORIGIN}/`);
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all([...document.images].map((img) => img.decode()));
  });
  const fontsOk = await page.evaluate(() =>
    [...document.fonts].every((f) => f.status === "loaded")
  );
  if (!fontsOk) throw new Error("A font failed to load");
  // CSS sizes a wrapped paragraph to its max width, not to its longest line:
  // narrow each [data-shrink] box to its longest line, keeping the same breaks.
  // (Passed as a string: tsx would inject helpers the page does not have.)
  await page.evaluate(`
    for (const el of document.querySelectorAll("[data-shrink]")) {
      const range = document.createRange();
      range.selectNodeContents(el);
      const tops = () => new Set([...range.getClientRects()].map((r) => Math.round(r.top))).size;
      const before = tops();
      const left = el.getBoundingClientRect().left;
      const longest = Math.max(...[...range.getClientRects()].map((r) => r.right - left));
      el.style.width = Math.ceil(longest * 100) / 100 + "px";
      if (tops() !== before) el.style.width = "";
    }
  `);
  // A caption line must fit on one line (9 px line height in the Figma).
  const wrapped = await page.evaluate(`
    [...document.querySelectorAll("[data-caption-line]")]
      .filter((el) => {
        const range = document.createRange();
        range.selectNodeContents(el);
        return new Set([...range.getClientRects()].map((r) => Math.round(r.top))).size > 1;
      })
      .map((el) => el.textContent)
  `);
  if (wrapped.length) throw new Error(`${id}: caption line too long: ${wrapped.join(" | ")}`);
  // The conversation never gets squeezed: if it does not fit, fail loudly.
  const contentBottom = await page.evaluate(() => {
    const conv = document.querySelector("body > div");
    const last = conv.lastElementChild;
    return Math.ceil(last.getBoundingClientRect().bottom);
  });
  if (contentBottom > height)
    throw new Error(`${id} needs ${contentBottom}px, canvas is ${height}px (use --height)`);
  fs.mkdirSync(path.dirname(output), { recursive: true });
  await page.screenshot({ path: output, clip: { x: 0, y: 0, width: tokens.canvas.width, height } });
  console.log(`Rendered ${id} → ${path.relative(root, output)} (${tokens.canvas.width}×${height})`);
}
await browser.close();
