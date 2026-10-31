// Shared building blocks. Vector shapes (tail, ticks, forward icon) are not
// exported in the Figma JSON: they are redrawn from references/master.png.
import { tokens } from "../tokens.js";

const { bubble, ticks } = tokens;

// Bubble tail, drawn for the left side; `side="right"` mirrors it.
export function Tail({ side, color }) {
  // The tail overlaps the body's rounded corner: tip, then a small notch.
  const width = bubble.tail.width + bubble.radius / 2;
  const { height } = bubble.tail;
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      style={{
        position: "absolute",
        bottom: 0,
        [side]: 0,
        transform: side === "right" ? "scaleX(-1)" : undefined,
        display: "block",
      }}
    >
      <path d="M6 0 C6 5.5 4.6 10 0 12 C2.8 12.1 5.6 11.4 7.8 10.2 L6 4 Z" fill={color} />
    </svg>
  );
}

// Figma "Shadow" layer: a blurred copy of the bubble, under it.
export function BubbleShadow({
  inset,
  left = 0,
  color = bubble.shadow.color,
  blur = bubble.shadow.blur,
}) {
  return (
    <div
      style={{
        position: "absolute",
        top: inset.top,
        left: left + inset.left,
        right: inset.right,
        bottom: inset.bottom,
        borderRadius: bubble.shadow.radius,
        background: color,
        filter: blur ? `blur(${blur / 2}px)` : undefined,
      }}
    />
  );
}

export function ReadTicks({ style }) {
  return (
    <svg
      width={ticks.width}
      height={ticks.height}
      viewBox={`0 0 ${ticks.width} ${ticks.height}`}
      style={{ position: "absolute", display: "block", ...style }}
      fill="none"
      strokeWidth="1.1"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="0.55,5.3 2.55,7.55 7.2,0.65" stroke={ticks.back} />
      <polyline points="4.4,6.55 5.05,7.3 10.45,0.6" stroke={ticks.color} />
    </svg>
  );
}

export function ForwardIcon({ width, height, color, style }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 9.44 9.32"
      style={{ position: "absolute", display: "block", ...style }}
    >
      <path
        d="M5.2 0 L9.44 4.05 L5.2 8 L5.2 5.75 C2.9 5.75 1.25 6.6 0 9.32 C0.35 5.7 2.2 3 5.2 2.55 Z"
        fill={color}
      />
    </svg>
  );
}
