// Render a conversation as an MP4: messages appear one by one.
// npm run animate -- --conversation en-anything-new [--output output/video/x.mp4]
// npm run animate -- --all
// Frames are captured one by one (animations paused and seeked), so the
// video is identical on every run, whatever the machine speed.
import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";
import { loadConversation } from "../src/content.js";
import { tokens } from "../src/tokens.js";
import { root, arg, openStage } from "./stage.jsx";

const m = tokens.motion;
const height = Number(arg("height", tokens.canvas.height));
const all = process.argv.includes("--all");
const ids = all
  ? JSON.parse(fs.readFileSync(path.join(root, "data/conversations.json"), "utf8")).map((c) => c.id)
  : [arg("conversation", "master-01")];

const sender = (msg) => (msg.type === "incoming_text" ? "them" : "me");

// Start time (s) of each message.
function schedule(messages) {
  let t = m.start;
  return messages.map((msg, i) => {
    if (i > 0)
      t += sender(messages[i - 1]) === sender(msg) ? m.pause.sameSender : m.pause.senderChange;
    return t;
  });
}

function encode(file, frames) {
  const ff = spawn(
    "ffmpeg",
    ["-y", "-loglevel", "error", "-f", "image2pipe", "-framerate", String(m.fps), "-i", "-"]
      .concat(["-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "16", "-movflags", "+faststart"])
      .concat([file]),
    { stdio: ["pipe", "inherit", "inherit"] }
  );
  const done = new Promise((resolve, reject) =>
    ff.on("close", (code) => (code ? reject(new Error(`ffmpeg exited ${code}`)) : resolve()))
  );
  return {
    write: (buf) => new Promise((r) => (ff.stdin.write(buf) ? r() : ff.stdin.once("drain", r))),
    end: () => (ff.stdin.end(), done),
  };
}

const stage = await openStage({ height, scale: m.scale });
for (const id of ids) {
  const conversation = loadConversation(root, id);
  const output = path.resolve(
    root,
    all ? `output/video/${id}.mp4` : arg("output", `output/video/${id}.mp4`)
  );
  await stage.load(conversation);
  const starts = schedule(conversation.messages);
  const a = m.appear;
  // One paused Web Animation per message; transform origin on the tail side.
  await stage.page.evaluate(`
    const starts = ${JSON.stringify(starts)};
    const items = [...document.querySelector("body > div").children];
    items.forEach((el, i) => {
      const left = getComputedStyle(el).alignSelf === "flex-start";
      el.style.transformOrigin = left ? "0% 100%" : "100% 100%";
      el.animate(
        [
          { opacity: 0, transform: "translateY(${a.fromY}px) scale(${a.fromScale})" },
          { opacity: 1, transform: "none" },
        ],
        { duration: ${a.duration * 1000}, delay: starts[i] * 1000, easing: "${a.easing}", fill: "both" }
      ).pause();
    });
  `);
  const duration = starts.at(-1) + a.duration + m.hold;
  const frameCount = Math.round(duration * m.fps);
  fs.mkdirSync(path.dirname(output), { recursive: true });
  const video = encode(output, frameCount);
  for (let f = 0; f < frameCount; f++) {
    await stage.page.evaluate(
      `document.getAnimations().forEach((x) => (x.currentTime = ${(f * 1000) / m.fps}))`
    );
    await video.write(await stage.page.screenshot({ clip: stage.clip, type: "png" }));
  }
  await video.end();
  console.log(
    `Animated ${id} → ${path.relative(root, output)} (${duration.toFixed(1)} s, ${frameCount} frames)`
  );
}
await stage.close();
