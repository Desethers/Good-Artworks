"use client";

import { Fragment, useState, type ReactNode } from "react";
import { BODY, BODY_SM, CONTAINER, EYEBROW, H2, SECTION } from "@/components/landing/styles";
import {
  ProductArtworkConversations,
  ProductCollectorTimeline,
  ZoomScreen,
  type ArtworkConversationsCopy,
  type CollectorTimelineCopy,
} from "@/components/landing/product/ProductScreens";

export type RelationshipsCopy = {
  eyebrow: string;
  title: string;
  /** Short explanation shown in the right column, level with the title lines. */
  intro: string;
  link: { name: string; body: string; mock: ArtworkConversationsCopy };
  memory: { name: string; body: string; mock: CollectorTimelineCopy };
  assistant: { name: string; body: string };
};

const EN_COPY: RelationshipsCopy = {
  eyebrow: "Remember",
  title: "Every collector, remembered.",
  intro:
    "Good Artworks keeps a memory of every {gmail}Gmail and {whatsapp}WhatsApp conversation, linked to the artworks discussed.",
  link: {
    name: "Who received what",
    body: "Attaches every request and every work you send to the collector and to the work: who asked, who received it, whether they opened it.",
    mock: {
      works: {
        title: "Works discussed",
        inventory: "Inventory",
        items: [
          {
            image: "/artworks/painting-05.jpg",
            artist: "Sacha Elron",
            title: "Evening field",
            meta: "Available · €10,000",
          },
          {
            image: "/artworks/painting-03.jpg",
            artist: "Sacha Elron",
            title: "Crimson Field",
            meta: "Sold · €9,500",
          },
          {
            image: "/artworks/painting-04.jpg",
            artist: "Sacha Elron",
            title: "Sage Interval",
            meta: "Available · €6,500",
          },
          {
            image: "/artworks/painting-10.jpg",
            artist: "Sacha Elron",
            title: "Amber Nocturne",
            meta: "Sold · €14,000",
          },
        ],
      },
      usage: {
        title: "Usage & activity",
        tabs: [
          { label: "Private selections", count: 1 },
          { label: "Exhibitions", count: 0 },
          { label: "Sharing history", count: 3 },
        ],
        summary: "2 viewed · 1 not opened",
        sends: [
          {
            name: "Anna Roche",
            pill: "Opened",
            tone: "blue",
            meta: "Email card · Opened 30 Sept 2026",
          },
          {
            name: "Marie Beaumont",
            pill: "PDF viewed",
            tone: "emerald",
            meta: "PDF · PDF viewed 10 Sept 2026",
          },
          {
            name: "Thomas Baur",
            pill: "Prepared",
            tone: "zinc",
            meta: "WhatsApp · Prepared 15 Sept 2026",
          },
        ],
      },
      conversations: {
        title: "Conversations",
        rows: [
          { name: "Anna Roche", channel: "Gmail", state: "Opened the page", when: "6 days ago" },
          {
            name: "Marie Beaumont",
            channel: "WhatsApp",
            state: "Wrote about this work",
            when: "27 days ago",
          },
        ],
      },
    },
  },
  memory: {
    name: "A CRM you don’t have to fill in",
    body: "Keeps a collector’s requests and the works you sent them, from Gmail and WhatsApp, on one record.",
    mock: {
      person: {
        id: "beaumont-marie",
        name: "Marie Beaumont",
        groups: "established collection · Paris · high priority",
        email: "beaumont.marie@gmail.com",
        phone: "+33 6 12 34 56 78",
      },
      channels: { whatsapp: "WhatsApp", gmail: "Gmail" },
      timeline: "Timeline",
      count: "16 moments",
      filters: [
        { label: "All", count: 16 },
        { label: "WhatsApp", count: 4 },
        { label: "Gmail", count: 2 },
        { label: "Meetings", count: 3 },
        { label: "Notes", count: 5 },
        { label: "Selections", count: 2 },
      ],

      today: "Today",
      todayDate: "6 October 2026",
      period: "September",
      toPickUp: "To pick up",

      exchange: {
        label: "Exchange spotted",
        date: "9 Sept",
        text: "Wrote to you about “Evening field”",
        quote:
          "Good evening, is Evening field still available? And could you remind me of its dimensions?",
        work: { image: "/artworks/painting-05.jpg", artist: "Sacha Elron", title: "Evening field" },
        channel: "WhatsApp",
        action: "Open in WhatsApp",
      },
    },
  },
  assistant: {
    name: "Your morning brief",
    body: "Tells you each morning who is waiting for a reply and who to get back to, from your records only.",
  },
};

const LOGOS = {
  "{gmail}": "/logos/icon-gmail-96.png",
  "{whatsapp}": "/logos/whatsapp.svg",
} as const;

/** A round logo badge set inline in the copy, right before the app's name. */
function LogoBadge({ src }: { src: string }) {
  return (
    <span
      className="mr-1.5 inline-flex h-6 w-6 items-center justify-center rounded-full border-[0.5px] border-[#E8E8E6] bg-white align-middle"
      aria-hidden="true"
    >
      <img src={src} alt="" className="h-[18px] w-[18px] object-contain" />
    </span>
  );
}

/**
 * Renders the copy, swapping `{gmail}` / `{whatsapp}` for their logo badge. The
 * badge is kept on the same line as the name that follows it.
 */
function WithLogos({ text }: { text: string }) {
  const parts = text.split(/(\{gmail\}|\{whatsapp\})/);
  const nodes: ReactNode[] = [];

  for (let index = 0; index < parts.length; index += 1) {
    const part = parts[index];
    const src = LOGOS[part as keyof typeof LOGOS];
    if (!src) {
      nodes.push(<Fragment key={index}>{part}</Fragment>);
      continue;
    }

    const next = parts[index + 1] ?? "";
    const word = next.match(/^[^\s,.]+/)?.[0] ?? "";
    nodes.push(
      <span key={index} className="whitespace-nowrap">
        <LogoBadge src={src} />
        {word}
      </span>
    );
    parts[index + 1] = next.slice(word.length);
  }

  return <>{nodes}</>;
}

/** A white card with a fine stroke; the bento instead lays its three cards on grey. */
function MockFrame({ children, grey = false }: { children: ReactNode; grey?: boolean }) {
  return (
    <div
      className={`relative w-full overflow-hidden rounded-[12px] ${
        grey ? "bg-[#F5F5F3]" : "border-[0.5px] border-[#DCDCD8] bg-white"
      }`}
    >
      {children}
    </div>
  );
}

/** Where each real screen is cut for its square frame, in the screen's own pixels. */
const VIEWS = {
  // The work, the message about it and the list of who it was discussed with.
  link: { x: -8, y: -8, width: 616 },
  // The whole record, from the person to the second moment, with room on every side.
  memory: { x: -24, y: -24, width: 568 },
} as const;

type BeatKey = "assistant" | "link" | "memory";
const BEATS: readonly BeatKey[] = ["assistant", "link", "memory"];

/**
 * One beat's visual: the real screen on a soft 4:3 panel, set off its top-left
 * corner so it runs past the right and bottom edges, like a close-up.
 */
function BeatVisual({ beat, copy }: { beat: BeatKey; copy: RelationshipsCopy }) {
  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-[12px] bg-[#F5F5F3]">
      <div className="absolute left-[7%] top-[9%] w-full">
        <MockFrame>
          {beat === "assistant" ? (
            // A capture of the dashboard's "Now" list (main), on the demo gallery; the Gmail card
            // (Thomas Baur) is the WhatsApp card's real markup, restyled in the product's Gmail tone.
            <img
              src="/product/conversations-today.webp"
              alt=""
              width={980}
              height={690}
              className="block h-auto w-full"
            />
          ) : beat === "link" ? (
            <ZoomScreen width={600} view={VIEWS.link}>
              <ProductArtworkConversations copy={copy.link.mock} />
            </ZoomScreen>
          ) : (
            <ZoomScreen width={520} view={VIEWS.memory}>
              <ProductCollectorTimeline copy={copy.memory.mock} />
            </ZoomScreen>
          )}
        </MockFrame>
      </div>
    </div>
  );
}

/**
 * Built like an accordion: the three beats on the left, one open at a time
 * with its sentence; the open beat's real screen on the right. It changes on
 * click only. Phones list the three beats, each with its screen.
 */
export function RelationshipsSection({ copy }: { copy: RelationshipsCopy }) {
  const [active, setActive] = useState(0);

  return (
    <section id="remember" className={`${SECTION} scroll-mt-20 bg-white md:py-24`}>
      <div className={CONTAINER}>
        <div className="max-w-[540px]">
          <p className={EYEBROW}>{copy.eyebrow}</p>
          <h2 className={`${H2} mt-4`}>{copy.title}</h2>
          <p className={`${BODY} mt-5 max-w-lg`}>
            <WithLogos text={copy.intro} />
          </p>
        </div>

        {/* Desktop: accordion on the left, the open beat's screen on the right. */}
        <div className="mt-20 hidden grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)] gap-20 md:grid">
          <ol className="self-start border-b border-[#E8E8E6]">
            {BEATS.map((key, index) => {
              const on = index === active;
              return (
                <li
                  key={key}
                  className={`border-t transition-colors duration-300 ${
                    on ? "border-[#111110]" : "border-[#E8E8E6]"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setActive(index)}
                    aria-expanded={on}
                    className="w-full py-6 text-left"
                  >
                    <span
                      className={`block font-display text-[22px] font-medium leading-[1.25] tracking-[-0.02em] transition-colors duration-300 ${
                        on ? "text-[#111110]" : "text-[#ADADAA] hover:text-[#6B6A67]"
                      }`}
                    >
                      {copy[key].name}
                    </span>
                    <span
                      className="grid transition-[grid-template-rows,opacity] duration-300 ease-out"
                      style={{ gridTemplateRows: on ? "1fr" : "0fr", opacity: on ? 1 : 0 }}
                    >
                      <span className="overflow-hidden">
                        <span className={`${BODY} block max-w-md pt-2`}>{copy[key].body}</span>
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>

          <div className="relative">
            {BEATS.map((key, index) => (
              <div
                key={key}
                aria-hidden={index !== active}
                className={`transition-opacity duration-500 ${
                  index === 0 ? "relative" : "absolute inset-0"
                } ${index === active ? "opacity-100" : "pointer-events-none opacity-0"}`}
              >
                <BeatVisual beat={key} copy={copy} />
              </div>
            ))}
          </div>
        </div>

        {/* Phones: the three beats in a list, each with its screen. */}
        <ol className="mt-12 space-y-12 md:hidden">
          {BEATS.map((key) => (
            <li key={key} className="border-t border-[#111110] pt-5">
              <h3 className="font-display text-[20px] font-medium leading-[1.25] tracking-[-0.02em] text-[#111110]">
                {copy[key].name}
              </h3>
              <p className={`${BODY_SM} mt-2`}>{copy[key].body}</p>
              <div className="mt-6">
                <BeatVisual beat={key} copy={copy} />
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export default function LandingRelationships() {
  return <RelationshipsSection copy={EN_COPY} />;
}
