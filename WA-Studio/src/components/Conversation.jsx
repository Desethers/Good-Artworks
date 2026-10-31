import { tokens } from "../tokens.js";
import { IncomingMessage } from "./IncomingMessage.jsx";
import { OutgoingMessage } from "./OutgoingMessage.jsx";
import { ForwardedArtwork } from "./ForwardedArtwork.jsx";

const c = tokens.conversation;
const sender = (m) => (m.type === "incoming_text" ? "them" : "me");

function gapBefore(prev, m) {
  if (!prev) return c.paddingTop;
  if (sender(prev) === sender(m)) return c.gap.sameSender;
  return sender(m) === "me" ? c.gap.incomingToOutgoing : c.gap.outgoingToIncoming;
}

// `messages` are already resolved by src/content.js (no raw ids here).
export function Conversation({ messages, height = tokens.canvas.height }) {
  return (
    <div
      style={{
        width: tokens.canvas.width,
        height,
        background: tokens.canvas.background,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {messages.map((m, i) => {
        const style = { marginTop: gapBefore(messages[i - 1], m) };
        if (m.type === "incoming_text")
          return (
            <IncomingMessage key={i} {...m} style={{ ...style, marginLeft: c.incomingLeft }} />
          );
        if (m.type === "outgoing_text")
          return (
            <OutgoingMessage key={i} {...m} style={{ ...style, marginRight: c.outgoingRight }} />
          );
        if (m.type === "forwarded_artwork")
          return (
            <ForwardedArtwork
              key={i}
              {...m}
              style={{ ...style, marginRight: c.outgoingRight - tokens.bubble.tail.width }}
            />
          );
        throw new Error(`Unknown message type: ${m.type}`);
      })}
    </div>
  );
}
