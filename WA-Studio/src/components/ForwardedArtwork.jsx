// One forwarded artwork = one WhatsApp photo message with its own caption.
import { tokens, textStyle } from "../tokens.js";
import { Tail, BubbleShadow, ReadTicks, ForwardIcon } from "./parts.jsx";

const t = tokens.forwarded;
const { radius, tail } = tokens.bubble;

export function ForwardedArtwork({ label, image, captionLines, time, read, style }) {
  const l = t.label;
  return (
    <div
      style={{
        position: "relative",
        alignSelf: "flex-end",
        width: t.width + tail.width,
        ...style,
      }}
    >
      <BubbleShadow inset={t.ombre.inset} color={t.ombre.color} blur={0} />
      <Tail side="right" color={t.background} />
      <div
        style={{
          position: "relative",
          width: t.width,
          background: t.background,
          borderRadius: radius,
          paddingBottom: t.caption.bottom,
        }}
      >
        <div style={{ position: "relative", height: t.image.top }}>
          <ForwardIcon
            width={l.iconWidth}
            height={l.iconHeight}
            color={l.iconColor}
            style={{ left: l.iconLeft, top: l.iconTop }}
          />
          <div
            style={{
              ...textStyle({ ...l, height: 12.27, letterSpacing: 0 }),
              position: "absolute",
              left: l.textLeft,
              top: l.textTop,
              whiteSpace: "nowrap",
            }}
          >
            {label}
          </div>
        </div>
        <img
          src={image}
          alt=""
          style={{
            display: "block",
            width: t.width,
            height: "auto",
            maxHeight: t.width * t.image.maxRatio,
            objectFit: "cover",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: t.caption.itemSpacing,
            marginTop: t.caption.top,
            marginLeft: t.caption.left,
            width: t.caption.width,
          }}
        >
          {captionLines.map((line, i) => (
            <div
              key={i}
              data-caption-line
              style={{ ...textStyle(t.caption), position: "relative", top: t.caption.glyphShift }}
            >
              {line}
            </div>
          ))}
        </div>
        <div
          style={{
            ...textStyle(t.time),
            position: "absolute",
            right: t.time.right,
            bottom: t.time.bottom,
            whiteSpace: "nowrap",
          }}
        >
          {time}
        </div>
        {read && <ReadTicks style={{ left: t.ticks.left, bottom: t.ticks.bottom }} />}
      </div>
    </div>
  );
}
