# Instructions for Codex / Claude Code

You are working inside the existing Vitreen repository, in `/WA-Studio` only. Do not edit the website or any parent-directory files without permission.

Goal: build a deterministic **static PNG generator**, not an animation, from the shipped Figma spec and visual master. The generator must create numerous new WhatsApp conversations by changing only structured content and supplied artwork images, with all visual styles locked.

Read `instructions/DESIGN_LOCK.md` fully. Inspect `specs/vitreen-design-spec.json`, `references/master.png`, and `data/*.json`. Determine the canvas geometry and individual Figma node properties from the spec; do not guess sizes from screenshots when exact values exist.

## Phase 1 — faithful master

Implement React components (or HTML/CSS with component-like units) for incoming text, outgoing text, forwarded artwork image with text caption, timestamp and ticks. Use a headless browser for deterministic PNG output (e.g. Playwright). Keep the rendered scene at exactly 405×838 for the master. No UI chrome, phone frame, gradient or decorative wallpaper unless visible in the master.

Build a CLI such as `npm run render -- --conversation master-01 --output output/master-render.png`. Install dependencies locally as needed in this subdirectory, but do not affect the site's package-lock or package manifests.

Generate a comparison overlay/difference image (and a brief discrepancy report) against `references/master.png`. Check all line breaks and image clipping. Request review after master QA, before proceeding.

## Phase 2 — variations

Read content from `data/conversations.json` and `data/artworks.json`. Support both French and English, 1–N individual forwarded artwork photo messages, dynamic vertical flow, optional different viewport/output heights, and output PNG batch rendering via a CLI. Add sample scenarios once the master is validated.

All variations must use **the same component code and locked CSS tokens**. Do not build separate hard-coded screenshots. Never invent a WhatsApp multi-product grid. Never produce static images using a generative image model.

For each artwork, load the exact supplied local image path. Missing art assets should yield a loud error or a clearly marked placeholder, not an invented image.

End with exact local run commands, file locations and QA results. Preserve original data and assets unchanged.
