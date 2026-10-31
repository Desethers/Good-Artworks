// WA-Studio — design tokens (locked template v1).
// Every value comes from specs/vitreen-design-spec.json (Figma node
// "Conversation WA_dispo_prix", 881:5803). Where the master had two
// diverging instances of the same component, the first instance is the
// reference; decisions are listed in DESIGN_DECISIONS.md.
// Values marked "PNG" are absent from the JSON (vector paths) and were
// measured on references/master.png.

const ink = {
  text: "#000000",
  caption: "#111b21",
  meta: "#667781",
  forwardIcon: "#8696a0",
  tick: "#3497f9",
  tickBack: "#3a9dff",
};

const fonts = {
  // SF Pro variable, Figma variationSettings { wdth 100, opsz 28, wght 400 }
  sfPro: {
    family: "WA SF Pro",
    variation: "'wdth' 100, 'opsz' 12, 'wght' 400",
  },
  // SF Pro italic variable, { opsz 28, YAXS 400, wght 400 }
  sfProItalic: {
    family: "WA SF Pro Italic",
    variation: "'opsz' 28, 'YAXS' 400, 'wght' 400",
  },
  // SF Pro Text Regular (static)
  sfProText: { family: "WA SF Pro Text", variation: "normal" },
};

export const tokens = {
  canvas: { width: 405, height: 838, background: "#ffffff" },

  conversation: {
    paddingTop: 59, // Incoming Message 01 y
    incomingLeft: 29, // Incoming Message 01 x (tail tip)
    outgoingRight: 50, // 405 − 355 (bubble body right edge)
    gap: {
      sameSender: 3, // 173 → 176, 453 → 456
      incomingToOutgoing: 10.73, // 109.27 → 120
      outgoingToIncoming: 15.73, // 732.27 → 748
    },
  },

  bubble: {
    radius: 8, // Shape cornerRadius
    tail: { width: 6, height: 12 }, // PNG
    shadow: {
      color: "rgba(0, 0, 0, 0.4)",
      blur: 1.63, // LAYER_BLUR radius (Figma); CSS blur = radius / 2
      radius: 8,
    },
  },

  incoming: {
    background: "#fafafa",
    shadowInset: { top: 1, left: 6, right: 0, bottom: 0 },
    padding: { top: 8, left: 10, right: 17 }, // from body edge (tail excluded)
    textMaxWidth: 240,
    text: {
      font: fonts.sfProText,
      size: 12,
      lineHeight: 16,
      letterSpacing: -0.3,
      color: ink.text,
    },
    time: {
      font: fonts.sfProText,
      size: 10,
      height: 12,
      letterSpacing: 0,
      color: ink.meta,
      overlap: 4, // time top = text bottom − 4
      right: 17, // aligned with the text right edge (decided 2026-10-31; Figma: 11.27)
      bottom: 2.27, // bubble bottom − time bottom
    },
  },

  outgoing: {
    background: "#d9fdd3",
    shadowInset: { top: 1, left: 1, right: 0, bottom: 0 },
    padding: { top: 8, left: 12, right: 11 },
    textMaxWidth: 232,
    text: {
      font: fonts.sfPro,
      size: 12,
      lineHeight: 16,
      letterSpacing: -0.3,
      color: ink.text,
    },
    time: {
      font: fonts.sfProText,
      size: 10,
      height: 12,
      letterSpacing: 0.5,
      color: ink.meta,
      overlap: 2, // time top = text bottom − 2
      // time + ticks end on the text right edge (decided 2026-10-31; Figma:
      // time box at 26 px from the bubble edge, ticks at 14)
      bottom: 3, // 173 − 170
    },
    ticks: { gap: 1.03, top: 2 }, // relative to time box
  },

  forwarded: {
    background: "#d9fdd3",
    width: 255, // body, tail excluded
    ombre: {
      color: "rgba(11, 20, 26, 0.13)",
      inset: { top: 1, left: 1, right: 7, bottom: 0 },
    },
    label: {
      iconLeft: 7.56,
      iconTop: 5.82,
      iconWidth: 9.44,
      iconHeight: 9.32,
      iconColor: ink.forwardIcon,
      textLeft: 18.71,
      textTop: 4.62,
      font: fonts.sfProItalic,
      size: 9,
      color: ink.meta,
    },
    // Full bubble width; height follows the artwork's own ratio (decided
    // 2026-10-31; Figma: 168 px, cover crop), capped like WhatsApp iOS: a 3:4
    // portrait shows uncropped (measured on a real screenshot: 472 × 630 px),
    // taller images are center-cropped to 3:4.
    image: { top: 22, maxRatio: 4 / 3 },
    caption: {
      left: 8.02,
      width: 168.51,
      top: 11.5, // below image (201.5 − 190)
      bottom: 10.5, // above bubble bottom (277 − 266.5)
      lineHeight: 9,
      itemSpacing: 5,
      font: fonts.sfPro,
      size: 12,
      letterSpacing: 0,
      color: ink.caption,
      // Figma places 12px glyphs in a 9px line box 1.75px lower than CSS
      // half-leading does (measured against master.png).
      glyphShift: 1.75,
    },
    time: {
      font: fonts.sfPro,
      size: 10,
      height: 12,
      letterSpacing: "-0.04em",
      color: ink.meta,
      right: 24, // 255 − 231 (time box right edge)
      bottom: 8, // 277 − 269
    },
    ticks: { left: 233.03, bottom: 10.71 }, // 277 − 266.29
  },

  ticks: { width: 10.96, height: 8.29, color: ink.tick, back: ink.tickBack },
};

// Local system fonts (Apple SF Pro, installed in /Library/Fonts).
export const fontFiles = [
  { family: fonts.sfPro.family, file: "/Library/Fonts/SF-Pro.ttf" },
  { family: fonts.sfProItalic.family, file: "/Library/Fonts/SF-Pro-Italic.ttf" },
  { family: fonts.sfProText.family, file: "/Library/Fonts/SF-Pro-Text-Regular.otf" },
];

export function textStyle(t) {
  return {
    fontFamily: `'${t.font.family}'`,
    fontVariationSettings: t.font.variation,
    fontSize: t.size,
    lineHeight: t.lineHeight ? `${t.lineHeight}px` : `${t.height}px`,
    letterSpacing: t.letterSpacing,
    color: t.color,
  };
}
