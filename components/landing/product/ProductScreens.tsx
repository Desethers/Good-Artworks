"use client";

/*
 * Real Good Artworks screens, ported from the dashboard (gallery-OS,
 * `dashboard/src/components/workspace/…`): the same markup and the same Tailwind
 * classes, with the data passed in as props instead of read from Sanity, and the
 * links/buttons made static. Nothing here is a new design.
 *
 *   ProductArtworkConversations ← workspace/ArtworkConversations.tsx
 *   ProductCollectorTimeline    ← workspace/dex/RelationProfile.tsx + RelationTimeline.tsx
 *   ProductMorningHome          ← workspace/dex/ConversationsHome.tsx + HomeAsk.tsx + AssistantChat.tsx
 */

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  CornerDownLeft,
  Image as ImageIcon,
  MessageSquare,
  PenLine,
  RotateCcw,
  Star,
  Sun,
  Users,
} from "lucide-react";

/* ---------------------------------------------------------------- shared */

type Tone = "blue" | "emerald" | "rose" | "zinc";

/** workspace/dex/tones.tsx — the colours a moment takes from where it came from. */
const TONE: Record<Tone, { pill: string; row: string; text: string; dot: string }> = {
  blue: {
    pill: "bg-blue-50 text-blue-700",
    row: "bg-blue-50/60",
    text: "text-blue-700",
    dot: "bg-blue-500",
  },
  emerald: {
    pill: "bg-emerald-50 text-emerald-700",
    row: "bg-emerald-50/60",
    text: "text-emerald-700",
    dot: "bg-emerald-500",
  },
  rose: {
    pill: "bg-rose-50 text-rose-700",
    row: "bg-rose-50/60",
    text: "text-rose-700",
    dot: "bg-rose-500",
  },
  zinc: {
    pill: "bg-zinc-100 text-zinc-600",
    row: "bg-zinc-50",
    text: "text-zinc-500",
    dot: "bg-zinc-400",
  },
};

const LOGO = { gmail: "/logos/icon-gmail-96.png", whatsapp: "/logos/whatsapp.svg" } as const;

/** workspace/dex/RelationshipTools.tsx — Avatar: initials on a tone picked from the id. */
const AVATAR_TONES = [
  "bg-orange-100 text-orange-800",
  "bg-lime-100 text-lime-800",
  "bg-teal-100 text-teal-800",
  "bg-cyan-100 text-cyan-800",
  "bg-fuchsia-100 text-fuchsia-800",
  "bg-yellow-100 text-yellow-800",
  "bg-stone-200 text-stone-700",
];
const AVATAR_SIZE = { md: "h-8 w-8 text-[11px]", lg: "h-11 w-11 text-sm" } as const;

function Avatar({
  id,
  name,
  size = "md",
}: {
  id: string;
  name: string;
  size?: keyof typeof AVATAR_SIZE;
}) {
  const initials = name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
  let hash = 0;
  for (const char of id) hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  return (
    <span
      className={`relative flex shrink-0 items-center justify-center overflow-hidden rounded-full font-medium ${AVATAR_TONES[hash % AVATAR_TONES.length]} ${AVATAR_SIZE[size]}`}
    >
      {initials}
    </span>
  );
}

/** workspace/ConversationArtworkImage.tsx — the complete work stays visible, on a soft tile. */
function ArtworkImage({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <span className={`relative block shrink-0 overflow-hidden rounded-md bg-zinc-50 ${className}`}>
      <img src={src} alt={alt} className="absolute inset-0 h-full w-full object-contain p-2" />
    </span>
  );
}

/**
 * The part of a screen to show, in the screen's own pixels: left, top (or
 * `"center"` to centre the screen vertically) and width. The view is square.
 */
export type ScreenView = { x: number; y: number | "center"; width: number; ratio?: number };

/**
 * A square window on a real screen. The screen is drawn at the width the
 * dashboard uses, then scaled and offset so only `view` shows: zoomed in
 * where the screen needs it, and always square.
 */
export function ZoomScreen({
  width,
  view,
  children,
}: {
  width: number;
  view: ScreenView;
  children: ReactNode;
}) {
  const frame = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const [placement, setPlacement] = useState({ scale: 1, top: 0 });

  useEffect(() => {
    const frameEl = frame.current;
    const innerEl = inner.current;
    if (!frameEl || !innerEl) return;
    const update = () => {
      const scale = frameEl.clientWidth / view.width;
      const top =
        view.y === "center" ? (innerEl.offsetHeight - view.width * (view.ratio ?? 1)) / 2 : view.y;
      setPlacement({ scale, top });
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(frameEl);
    observer.observe(innerEl);
    return () => observer.disconnect();
  }, [view.width, view.y]);

  return (
    <div
      ref={frame}
      className="relative w-full overflow-hidden"
      style={{ aspectRatio: `1 / ${view.ratio ?? 1}` }}
      aria-hidden="true"
    >
      <div
        ref={inner}
        className="pointer-events-none absolute left-0 top-0"
        style={{
          width,
          transform: `translate(${-view.x * placement.scale}px, ${-placement.top * placement.scale}px) scale(${placement.scale})`,
          transformOrigin: "top left",
        }}
      >
        {children}
      </div>
    </div>
  );
}

/* ------------------------------------------- 1. the work → its conversations */

type PillTone = "blue" | "emerald" | "zinc";
const PILL: Record<PillTone, string> = {
  blue: "bg-blue-50 text-blue-700",
  emerald: "bg-emerald-50 text-emerald-700",
  zinc: "bg-zinc-100 text-zinc-500",
};

export type ArtworkConversationsCopy = {
  /** The collector's side: the works discussed with Marie, read from the inventory. */
  works: {
    title: string;
    inventory: string;
    items: readonly { image: string; artist: string; title: string; meta: string }[];
  };
  /** The work's side: who it was shared with, and whether they opened it. */
  usage: {
    title: string;
    tabs: readonly { label: string; count: number }[];
    summary: string;
    sends: readonly { name: string; pill: string; tone: PillTone; meta: string }[];
  };
  conversations: {
    title: string;
    rows: readonly { name: string; channel: string; state: string; when: string }[];
  };
};

/**
 * Both ends of the same ledger, as three real cards:
 * workspace/dex/ExchangeArtworks.tsx (compact) — the works on the collector's record;
 * dashboard/ArtworkUsageRail.tsx, "Sharing history" tab — who received the work;
 * workspace/ArtworkConversations.tsx — who it has been discussed with.
 */
export function ProductArtworkConversations({ copy }: { copy: ArtworkConversationsCopy }) {
  const { works, usage, conversations } = copy;
  return (
    <div className="flex min-h-[600px] flex-col gap-2">
      <div className="grid flex-1 grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] items-stretch gap-2">
        <section className="min-w-0 rounded-lg border-[0.5px] border-[#DCDCD8] bg-white p-3">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h2 className="text-[11px] font-medium text-zinc-500">{works.title}</h2>
            <span className="inline-flex items-center gap-1 text-[11px] text-zinc-400">
              {works.inventory} <ArrowUpRight size={11} />
            </span>
          </div>
          <div className="mt-3 grid gap-2">
            {works.items.map((work) => (
              <article
                key={work.title}
                className="flex min-w-0 items-center gap-2.5 rounded-lg bg-zinc-50 p-2"
              >
                <ArtworkImage src={work.image} alt={work.title} className="h-12 w-14 bg-white" />
                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-[12px] font-medium">{work.artist}</h3>
                  <p className="mt-0.5 truncate pr-1 text-[12px] italic text-zinc-600">
                    {work.title}
                  </p>
                  <p className="mt-1 text-[11px] text-zinc-500">{work.meta}</p>
                </div>
                <span className="shrink-0 rounded-md p-1 text-zinc-400">
                  <MessageSquare size={14} />
                </span>
              </article>
            ))}
          </div>
        </section>

        <section className="min-w-0 rounded-lg border-[0.5px] border-[#DCDCD8] bg-white">
          <div className="border-b border-zinc-100 px-4 py-2.5">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-700">
              {usage.title}
            </span>
          </div>
          <div className="flex items-center gap-1 overflow-hidden border-b border-zinc-200 px-2">
            {usage.tabs.map((tab, index) => {
              const active = index === usage.tabs.length - 1;
              return (
                <span
                  key={tab.label}
                  className={`-mb-px flex items-center gap-1.5 whitespace-nowrap border-b-2 px-1.5 py-2.5 text-[12px] ${
                    active
                      ? "border-zinc-900 font-medium text-zinc-900"
                      : "border-transparent text-zinc-500"
                  }`}
                >
                  {tab.label}
                  {tab.count > 0 && <span className="text-[11px] text-zinc-400">{tab.count}</span>}
                </span>
              );
            })}
          </div>
          <div className="p-4">
            <p className="mb-3 text-[12px] font-medium text-zinc-700">{usage.summary}</p>
            <ul className="space-y-3">
              {usage.sends.map((send) => (
                <li key={send.name}>
                  <div className="flex items-center justify-between gap-2">
                    <span className="min-w-0 truncate text-[13px] text-zinc-800">{send.name}</span>
                    <span
                      className={`shrink-0 rounded px-1.5 py-0.5 text-[10px] font-medium ${PILL[send.tone]}`}
                    >
                      {send.pill}
                    </span>
                  </div>
                  <p className="mt-0.5 truncate text-[11px] text-zinc-400">{send.meta}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>

      <section className="rounded-lg border-[0.5px] border-[#DCDCD8] bg-white">
        <div className="border-b border-zinc-100 px-4 py-2.5">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-700">
            {conversations.title}
          </span>
        </div>
        <ul className="divide-y divide-zinc-100">
          {conversations.rows.map((row) => (
            <li key={row.name} className="flex flex-wrap items-baseline gap-x-3 px-4 py-3">
              <p className="min-w-0 flex-1 truncate text-[13px] text-zinc-900">
                {row.name}
                <span className="text-zinc-300"> · </span>
                <span className="text-zinc-500">{row.channel}</span>
              </p>
              <p className="text-[12px] text-zinc-400">
                {row.state} · {row.when}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

/* ----------------------------------------------- 2. the collector's memory */

export type CollectorTimelineCopy = {
  person: { id: string; name: string; groups: string; email: string; phone: string };
  channels: { whatsapp: string; gmail: string };
  timeline: string;
  count: string;
  filters: readonly { label: string; count: number }[];
  today: string;
  todayDate: string;
  period: string;
  toPickUp: string;
  exchange: {
    label: string;
    date: string;
    text: string;
    quote: string;
    work: { image: string; artist: string; title: string };
    channel: string;
    action: string;
  };
};

/** workspace/dex/RelationProfile.tsx (the person) + RelationTimeline.tsx (the thread). */
export function ProductCollectorTimeline({ copy }: { copy: CollectorTimelineCopy }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-[44px_minmax(0,1fr)] items-start gap-x-3 gap-y-3 px-1">
        <Avatar id={copy.person.id} name={copy.person.name} size="lg" />
        <div className="min-w-0">
          <div className="flex items-start gap-1">
            <h1 className="min-w-0 flex-1 break-words text-xl font-medium leading-tight tracking-tight text-zinc-950">
              {copy.person.name}
            </h1>
            <span className="-mr-1 -mt-1 shrink-0 p-2 text-zinc-400">
              <Star size={16} className="fill-zinc-800 text-zinc-800" />
            </span>
          </div>
          <p className="mt-1 break-words text-[11px] leading-4 text-zinc-500">
            {copy.person.groups}
          </p>
          <div className="mt-1 space-y-0.5 text-[12px] leading-5 text-zinc-600">
            <p className="break-all">{copy.person.email}</p>
            <p>{copy.person.phone}</p>
          </div>
        </div>
        <div className="col-start-2 flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1 rounded-lg bg-emerald-50 px-2 py-2 text-[11px] font-medium text-emerald-700">
            <img
              src={LOGO.whatsapp}
              alt=""
              className="shrink-0 object-contain"
              width={14}
              height={14}
            />
            {copy.channels.whatsapp}
            <ArrowUpRight size={10} />
          </span>
          <span className="inline-flex items-center gap-1 rounded-lg bg-blue-50 px-2 py-2 text-[11px] font-medium text-blue-700">
            <img
              src={LOGO.gmail}
              alt=""
              className="shrink-0 object-contain"
              width={13}
              height={13}
            />
            {copy.channels.gmail}
            <ArrowUpRight size={10} />
          </span>
        </div>
      </div>

      <section className="min-w-0">
        <div className="flex items-baseline justify-between gap-3">
          <h2 className="text-[15px] font-medium tracking-tight text-zinc-950">{copy.timeline}</h2>
          <span className="text-[11px] text-zinc-400">{copy.count}</span>
        </div>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {copy.filters.map((filter, index) => (
            <span
              key={filter.label}
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[12px] ${
                index === 0 ? "bg-zinc-900 text-white" : "bg-zinc-100 text-zinc-600"
              }`}
            >
              {filter.label}
              <span className={index === 0 ? "text-white/55" : "text-zinc-400"}>
                {filter.count}
              </span>
            </span>
          ))}
        </div>

        <div className="mt-8 flex items-center gap-3">
          <span className="text-[11px] font-medium text-zinc-900">{copy.today}</span>
          <span className="h-px flex-1 bg-zinc-200" />
          <span className="text-[11px] text-zinc-400">{copy.todayDate}</span>
        </div>

        <section className="mt-6">
          <h3 className="mb-3 text-[11px] font-medium text-zinc-500">{copy.period}</h3>
          <ol className="relative space-y-6 before:absolute before:bottom-3 before:left-[13px] before:top-3 before:w-px before:bg-zinc-200">
            <li className="relative pl-10">
              <span className="absolute left-0 top-0">
                <span className="flex h-7 w-7 items-center justify-center rounded-full">
                  <img
                    src={LOGO.whatsapp}
                    alt=""
                    className="shrink-0 object-contain"
                    width={28}
                    height={28}
                  />
                </span>
              </span>
              <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                <p className="flex flex-wrap items-center gap-2 text-[13px] font-medium text-zinc-900">
                  {copy.exchange.label}
                  <span className="rounded-full bg-zinc-900 px-1.5 py-0.5 text-[10px] font-medium text-white">
                    {copy.toPickUp}
                  </span>
                </p>
                <time className="text-[11px] text-zinc-400">{copy.exchange.date}</time>
              </div>
              <p className="mt-1 whitespace-pre-wrap break-words text-[13px] leading-relaxed text-zinc-700">
                {copy.exchange.text}
              </p>
              <blockquote className="mt-2 whitespace-pre-wrap break-words border-l-2 border-zinc-200 pl-3 text-[13px] leading-relaxed text-zinc-600">
                {copy.exchange.quote}
              </blockquote>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="flex max-w-full items-center gap-2 rounded-lg bg-zinc-50 p-1.5 pr-3 text-left text-zinc-800">
                  <ArtworkImage
                    src={copy.exchange.work.image}
                    alt={copy.exchange.work.title}
                    className="h-12 w-14"
                  />
                  <span className="min-w-0">
                    <span className="block max-w-[10rem] truncate text-[10px] text-zinc-500">
                      {copy.exchange.work.artist}
                    </span>
                    <span className="block max-w-[10rem] truncate pr-1 text-[12px] italic">
                      {copy.exchange.work.title}
                    </span>
                  </span>
                </span>
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-zinc-500">
                <span>{copy.exchange.channel}</span>
                <span className="inline-flex items-center gap-1 text-zinc-700">
                  {copy.exchange.action}
                  <ArrowUpRight size={11} />
                </span>
              </div>
            </li>
          </ol>
        </section>
      </section>
    </div>
  );
}

/* ---------------------------------------- 3. the morning, and the question */

export type MorningHomeCopy = {
  greeting: string;
  placeholder: string;
  hint: string;
  frames: readonly [string, string, string, string];
  enter: string;
  question: string;
  answerIntro: string;
  answerItems: readonly { title: string; rest: string }[];
  tools: string;
  clear: string;
  now: string;
  waiting: {
    id: string;
    name: string;
    title: string;
    detail: string;
    channel: string;
    date: string;
    work: { image: string; artist: string; title: string; status: string };
  };
};

const FRAME_ICONS = [Users, ImageIcon, PenLine, Sun] as const;

/** ConversationsHome (greeting + Now) around HomeAsk / AssistantChat (the question, its answer). */
export function ProductMorningHome({
  copy,
  chatOnly = false,
  animated = false,
}: {
  copy: MorningHomeCopy;
  /** Greeting, question box and exchange only: no "Now" section. */
  chatOnly?: boolean;
  /** Types the question, sends it, then shows the answer; loops while on screen. */
  animated?: boolean;
}) {
  const waiting = copy.waiting;
  const root = useRef<HTMLDivElement>(null);
  const inView = useInView(root, { amount: 0.4 });
  const reduceMotion = useReducedMotion();
  const live = animated && !reduceMotion;
  const [typed, setTyped] = useState(live ? 0 : copy.question.length);
  const [sent, setSent] = useState(!live);

  useEffect(() => {
    if (!live) {
      setTyped(copy.question.length);
      setSent(true);
      return;
    }
    if (!inView) return;
    let cancelled = false;
    const timers: number[] = [];
    const at = (ms: number, fn: () => void) =>
      timers.push(window.setTimeout(() => !cancelled && fn(), ms));
    const run = () => {
      setTyped(0);
      setSent(false);
      const total = copy.question.length;
      for (let i = 1; i <= total; i++) at(700 + i * 55, () => setTyped(i));
      const sendAt = 700 + total * 55 + 600;
      at(sendAt, () => setSent(true));
      at(sendAt + 7000, run);
    };
    run();
    return () => {
      cancelled = true;
      timers.forEach(window.clearTimeout);
    };
  }, [live, inView, copy.question]);

  const boxText = sent ? "" : copy.question.slice(0, typed);
  const hasText = boxText.length > 0;

  return (
    <div ref={root}>
      <div
        className={`rounded-2xl bg-gradient-to-br from-amber-50 via-white to-white px-8 py-8 ${
          chatOnly ? "flex min-h-[600px] flex-col justify-center" : ""
        }`}
      >
        <h1 className="text-3xl font-medium tracking-tight text-zinc-950">{copy.greeting}</h1>

        <div className="mt-6">
          <div className="space-y-2">
            {/* AskBox */}
            <div className="flex min-h-[176px] flex-col rounded-2xl border-[0.5px] border-zinc-200/80 bg-white p-3 shadow-[0_1px_2px_rgba(0,0,0,0.025)]">
              <div
                className={`min-h-[120px] flex-1 px-3 py-2 text-[14px] leading-relaxed ${
                  hasText ? "text-zinc-900" : "text-zinc-400"
                }`}
              >
                {hasText ? boxText : copy.placeholder}
                {live && !sent && hasText ? (
                  <span className="ml-px inline-block h-[1em] w-px translate-y-[2px] bg-zinc-900" />
                ) : null}
              </div>
              <div className="flex items-center justify-between gap-3 px-1 pt-2">
                <p className="truncate text-[11px] text-zinc-400">{copy.hint}</p>
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-zinc-900 text-white transition-opacity duration-300 ${
                    hasText ? "opacity-100" : "opacity-40"
                  }`}
                >
                  <ArrowUp size={15} />
                </span>
              </div>
            </div>

            {/* AskFrames */}
            <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 px-1">
              <div className="flex flex-wrap items-center gap-1">
                {copy.frames.map((label, index) => {
                  const Icon = FRAME_ICONS[index];
                  return (
                    <span
                      key={label}
                      className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[12px] text-zinc-600"
                    >
                      <Icon size={14} aria-hidden="true" className="text-zinc-400" /> {label}
                    </span>
                  );
                })}
              </div>
              <p className="flex items-center gap-1 text-[11px] text-zinc-400">
                <CornerDownLeft size={11} aria-hidden="true" /> {copy.enter}
              </p>
            </div>

            {/* Exchange (compact) */}
            <div className="space-y-3 pt-2">
              <div className="space-y-3">
                <p
                  className={`ml-auto w-fit max-w-[85%] rounded-2xl bg-zinc-900 px-3.5 py-2 text-[12px] leading-relaxed text-white transition-all duration-500 ${
                    sent ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
                  }`}
                >
                  {copy.question}
                </p>
                <div
                  className={`max-w-[92%] transition-all duration-700 ${
                    sent ? "translate-y-0 opacity-100 delay-[900ms]" : "translate-y-2 opacity-0"
                  }`}
                >
                  <p className="whitespace-pre-wrap rounded-2xl border-[0.5px] border-zinc-200/80 bg-white px-4 py-3 text-[12px] leading-relaxed text-zinc-800">
                    {copy.answerIntro}
                    {"\n\n"}
                    {copy.answerItems.map((item, index) => (
                      <span key={item.title}>
                        {index > 0 ? "\n" : ""}- “
                        <span className="font-medium text-zinc-900 underline decoration-zinc-300 underline-offset-2">
                          {item.title}
                        </span>
                        ”{item.rest}
                      </span>
                    ))}
                  </p>
                  <p className="mt-1.5 px-1 text-[11px] text-zinc-400">{copy.tools}</p>
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3 px-1">
                <span className="inline-flex items-center gap-1.5 text-[11px] text-zinc-400">
                  <RotateCcw size={11} /> {copy.clear}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section "Now" + WaitingLine (Line, WorkCards) */}
      <section className="mt-10" hidden={chatOnly}>
        <div className="mb-2 flex items-baseline justify-between gap-3 px-3">
          <h2 className="flex items-baseline gap-2 text-[15px] font-medium text-zinc-950">
            {copy.now}
            <span
              className={`rounded-full px-1.5 text-[11px] font-medium leading-5 ${TONE.zinc.pill}`}
            >
              1
            </span>
          </h2>
        </div>
        <ul>
          <li className="flex h-full flex-col gap-1">
            <div className={`flex min-w-0 flex-1 flex-col rounded-xl ${TONE.blue.row}`}>
              <div className="flex min-w-0 items-start gap-1 px-3 py-3">
                <div className="group flex min-w-0 flex-1 items-start gap-3 rounded-lg">
                  <span className="relative shrink-0">
                    <Avatar id={waiting.id} name={waiting.name} />
                    <span
                      aria-hidden="true"
                      className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-white ring-2 ring-white"
                    >
                      <img
                        src={LOGO.gmail}
                        alt=""
                        className="shrink-0 object-contain"
                        width={13}
                        height={13}
                      />
                    </span>
                  </span>
                  <span className="min-w-0 max-w-2xl flex-1">
                    <span className="block text-[14px] leading-snug text-zinc-900">
                      <span className="font-medium">{waiting.title}</span>
                    </span>
                    <span className="mt-1 line-clamp-2 text-[13px] leading-relaxed text-zinc-500">
                      {waiting.detail}
                    </span>
                    <span className="mt-1.5 flex flex-wrap items-center gap-2 text-[11px] text-zinc-400">
                      <span className={`rounded-full px-2 py-0.5 font-medium ${TONE.blue.pill}`}>
                        {waiting.channel}
                      </span>
                      <span>{waiting.date}</span>
                    </span>
                    <span className="mt-3 flex flex-wrap gap-2">
                      <span className="flex min-w-0 max-w-full items-center gap-3.5 rounded-lg bg-white p-1.5 pr-4">
                        <ArtworkImage
                          src={waiting.work.image}
                          alt={waiting.work.title}
                          className="h-28 w-44"
                        />
                        <span className="min-w-0">
                          <span className="block truncate text-[12px] text-zinc-500">
                            {waiting.work.artist}
                          </span>
                          <span className="mt-0.5 block truncate text-[14px] italic text-zinc-900">
                            {waiting.work.title}
                          </span>
                          <span
                            className={`mt-1.5 flex items-center gap-1.5 text-[11px] font-medium ${TONE.emerald.text}`}
                          >
                            <span
                              aria-hidden="true"
                              className={`h-1.5 w-1.5 shrink-0 rounded-full ${TONE.emerald.dot}`}
                            />
                            {waiting.work.status}
                          </span>
                        </span>
                      </span>
                    </span>
                  </span>
                  <ArrowRight
                    size={14}
                    aria-hidden="true"
                    className="mt-1 shrink-0 text-zinc-300"
                  />
                </div>
              </div>
            </div>
          </li>
        </ul>
      </section>
    </div>
  );
}
