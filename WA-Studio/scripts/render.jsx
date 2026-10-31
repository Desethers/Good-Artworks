// Render conversations to PNG with Playwright.
// npm run render -- --conversation master-01 --output output/master-render.png [--height 838]
// npm run render -- --all            (every conversation → output/<id>.png)
import fs from "node:fs";
import path from "node:path";
import { loadConversation } from "../src/content.js";
import { tokens } from "../src/tokens.js";
import { root, arg, openStage } from "./stage.jsx";

const height = Number(arg("height", tokens.canvas.height));
const all = process.argv.includes("--all");
const ids = all
  ? JSON.parse(fs.readFileSync(path.join(root, "data/conversations.json"), "utf8")).map((c) => c.id)
  : [arg("conversation", "master-01")];

const stage = await openStage({ height });
for (const id of ids) {
  const conversation = loadConversation(root, id);
  const output = path.resolve(root, all ? `output/${id}.png` : arg("output", `output/${id}.png`));
  await stage.load(conversation);
  fs.mkdirSync(path.dirname(output), { recursive: true });
  await stage.page.screenshot({ path: output, clip: stage.clip });
  console.log(`Rendered ${id} → ${path.relative(root, output)} (${tokens.canvas.width}×${height})`);
}
await stage.close();
