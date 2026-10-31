import { tokens, textStyle } from "../tokens.js";
import { Tail, BubbleShadow } from "./parts.jsx";

const t = tokens.incoming;
const { radius, tail } = tokens.bubble;

export function IncomingMessage({ text, time, style }) {
  return (
    <div style={{ position: "relative", alignSelf: "flex-start", ...style }}>
      <BubbleShadow inset={t.shadowInset} left={tail.width} />
      <Tail side="left" color={t.background} />
      <div
        style={{
          position: "relative",
          marginLeft: tail.width,
          background: t.background,
          borderRadius: radius,
          paddingTop: t.padding.top,
          paddingLeft: t.padding.left,
          paddingRight: t.padding.right,
          paddingBottom: t.time.bottom,
        }}
      >
        {/* data-shrink: the renderer narrows this box to its longest line */}
        <div data-shrink style={{ ...textStyle(t.text), maxWidth: t.textMaxWidth }}>
          {text}
        </div>
        <div
          style={{
            ...textStyle(t.time),
            marginTop: -t.time.overlap,
            marginRight: t.time.right - t.padding.right,
            textAlign: "right",
            whiteSpace: "nowrap",
          }}
        >
          {time}
        </div>
      </div>
    </div>
  );
}
