# WA Studio — Design lock (v1)

## Sources of truth

1. `specs/vitreen-design-spec.json` is the canonical structured Figma extraction for dimensions, coordinates, style and text, **including its absolute/relative positioning semantics**.
2. `references/master.png` is the canonical visual reference for optical QA and cropping.
3. Original art images in `references/` are the only approved art assets; don't recreate the artworks or generate replacements unless explicitly instructed.
4. `data/*.json` is content, not design. Content updates must not affect visual tokens.

## What must remain unchanged

- Source canvas 405 × 838 px and aspect ratio; the master must render exactly at that resolution.
- Typography follows actual values in the JSON, including mixed SF Pro and SF Pro Text where applicable. Don't impose global 16px typography or replace with Inter silently.
- Incoming/outgoing message bubble backgrounds, corner geometry (including tails), shadow, widths, internal padding, timestamp positions and ticks.
- Per-artwork forward label, photograph placement, caption, margins and colors.
- No 3-artwork grid. One forwarded artwork = one independent photo message with caption.
- French/English text varies only through data, with measured wrapping and automatic vertical reflow; do not stretch or scale fonts to fit.

## Reflow rule

The original design uses some absolute positioning. For variations, preserve each component's geometry and spacing relationship. Recalculate subsequent message y positions from their actual rendered heights, while preserving the reference gap. No overflow or overlap allowed. The output may be taller than the master if needed; by default use a configurable viewport and cropping/pagination to avoid forcing content into 838px.

## Image behavior

Use actual supplied artworks; the gallery room and artwork are embedded in these photos. Reproduce the crop/fit shown in the master. Don't add fake artwork mattes, gallery walls, captions, or decorative backgrounds.

## Quality assurance before batch mode

1. First render exactly the master using supplied content.
2. Compare against `references/master.png` with an overlay/diff. Log alignment, wrapping, color and spacing discrepancies.
3. Do not generate variants before approval of the master. Fix code, not source reference or token values.
4. Create 10–20 variants with different conversational contexts (up to two lines per text message) once approved; use real art references only, or explicit placeholders for missing work.
5. Export one deterministic PNG per scenario, with descriptive file names, and a manifest linking outputs to source data.

## Data integrity caveat

The collector requests paintings **under €10,000**, but the supplied blue artwork is **exactly €10,000**. This mismatch comes from the provided reference. Reproduce the master literally for pixel comparison; for new commercial scenarios, exclude that artwork from a strict under-€10,000 result or change the request to `€10,000 or less` with explicit approval.

## Design asset completeness

The Figma JSON includes image hashes but no image binaries, and may omit exact editable vector path geometry for some shapes. Use the PNG to visually audit such geometry; never claim perfect source reconstruction solely from JSON.
