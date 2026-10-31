import { tokens, textStyle } from "../tokens.js";
import { BubbleShadow, ReadTicks } from "./parts.jsx";

const t = tokens.outgoing;
const { radius } = tokens.bubble;

export function OutgoingMessage({ text, time, read, style }) {
  // Time (and ticks, when read) end on the text right edge.
  const timeOffset = read ? t.ticks.gap + tokens.ticks.width : 0;
  return (
    <div style={{ position: "relative", alignSelf: "flex-end", ...style }}>
      <BubbleShadow inset={t.shadowInset} />
      <div
        style={{
          position: "relative",
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
        <div style={{ position: "relative", marginTop: -t.time.overlap }}>
          <div
            style={{
              ...textStyle(t.time),
              marginRight: timeOffset,
              textAlign: "right",
              whiteSpace: "nowrap",
            }}
          >
            {time}
          </div>
          {read && (
            <ReadTicks
              style={{
                top: t.ticks.top,
                right: 0,
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
