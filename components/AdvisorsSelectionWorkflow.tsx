"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { GalleryOsSidebar, PageHeader } from "@/components/showcase/PillarMocks";

const works = [
  {
    title: "Dawn Study No. 7",
    artist: "Sacha Elron",
    year: "2023",
    price: "6 000 €",
    image: "/artworks/painting-03.jpg",
  },
  {
    title: "Untitled (Horizon)",
    artist: "Sacha Elron",
    year: "2024",
    price: "8 000 €",
    image: "/artworks/painting-09.png",
  },
  {
    title: "Solstice",
    artist: "Clémence Rivière",
    year: "2024",
    price: "14 000 €",
    image: "/artworks/painting-07.jpg",
  },
] as const;

function Workspace({
  active,
  title,
  sub,
  action,
  children,
}: {
  active: "artworks" | "selection" | "inquiries";
  title: string;
  sub: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full w-full overflow-hidden bg-white font-sans text-zinc-900">
      <GalleryOsSidebar active={active} />
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <PageHeader title={title} sub={sub} action={action} />
        <div className="min-h-0 flex-1 overflow-hidden px-4 pb-4 md:px-5">{children}</div>
      </div>
    </div>
  );
}

function DarkAction({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex rounded-md bg-zinc-900 px-2.5 py-1.5 text-[9px] font-medium text-white">
      {children}
    </span>
  );
}

function ArtworkImage({ work, className = "" }: { work: { image: string }; className?: string }) {
  return (
    <div className={`overflow-hidden bg-zinc-100 ${className}`}>
      <img src={work.image} alt="" aria-hidden="true" className="h-full w-full object-cover" />
    </div>
  );
}

function SearchSelection() {
  const artworkCards = [
    {
      title: "Amber Nocturne",
      year: "2025",
      price: "14 000 €",
      status: "Sold",
      image: "/artworks/painting-05.jpg",
    },
    {
      title: "Crimson Field",
      year: "2024",
      price: "9 500 €",
      status: "Sold",
      image: "/artworks/painting-03.jpg",
    },
    {
      title: "Sage Interval",
      year: "2022",
      price: "6 500 €",
      status: "Available",
      image: "/artworks/painting-04.jpg",
    },
    {
      title: "Evening field",
      year: "2023",
      price: "10 000 €",
      status: "Available",
      image: "/artworks/painting-05.jpg",
    },
    {
      title: "Dawn Study No. 7",
      year: "2023",
      price: "6 000 €",
      status: "Available",
      image: "/artworks/painting-07.jpg",
    },
  ];

  return (
    <div className="h-full w-full overflow-hidden bg-white font-sans text-zinc-900">
      <div className="flex h-14 items-center justify-between px-5">
        <div className="flex h-8 w-[48%] items-center rounded-md border border-zinc-200 px-3 text-[9.5px] text-zinc-400">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
            <path d="m16 16 4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
          <span className="ml-2">Find anything in your gallery...</span>
          <span className="ml-auto rounded border border-zinc-200 px-1.5 py-0.5 text-[7px]">
            ⌘K
          </span>
        </div>
        <div className="relative text-zinc-400">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9ZM10 21h4"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
          <span className="absolute -right-2.5 -top-2.5 rounded-full bg-emerald-600 px-1 text-[6.5px] font-semibold text-white">
            9+
          </span>
        </div>
      </div>

      <div className="px-5 pb-4">
        <div className="flex items-start justify-between gap-4 pt-1">
          <div>
            <h3 className="text-[15px] font-medium">Artworks</h3>
            <p className="mt-1 text-[10px] text-zinc-600">6 total · 4 available · 2 sold</p>
          </div>
          <div className="flex gap-1.5">
            <span className="inline-flex h-6 items-center justify-center gap-1 whitespace-nowrap rounded-md bg-zinc-900 px-2 text-[7.5px] font-medium text-white">
              <span className="text-[10px] font-light">+</span> Add artwork
            </span>
            <span className="inline-flex h-6 items-center justify-center gap-1 whitespace-nowrap rounded-md border border-zinc-200 bg-white px-2 text-[7.5px] font-medium text-zinc-700">
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M12 16V4m0 0 4 4m-4-4L8 8M5 14v5h14v-5"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Import a CSV
            </span>
          </div>
        </div>

        <div className="relative mt-5 max-w-[56%]">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
            <path d="m16 16 4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
          <div className="flex h-8 items-center rounded-md border border-zinc-200 pl-9 text-[9.5px] text-zinc-400">
            Filter artworks in this view...
          </div>
        </div>

        <div className="mt-2.5 flex items-center gap-1.5 overflow-hidden">
          {[
            "Available",
            "Reserved",
            "Sold",
            "Consignment",
            "On loan",
            "Not for sale",
            "Withdrawn",
          ].map((filter) => (
            <span
              key={filter}
              className="shrink-0 rounded-full border border-zinc-200 bg-white px-2 py-1 text-[8px] text-zinc-700"
            >
              {filter}
            </span>
          ))}
          <span className="mx-0.5 h-4 w-px shrink-0 bg-zinc-200" />
          <span className="shrink-0 rounded-full border border-zinc-200 bg-white px-2 py-1 text-[8px] text-zinc-700">
            Sacha Elron
          </span>
        </div>

        <div className="mt-2.5 flex items-center justify-between">
          <span className="text-[8px] text-zinc-400">6 results</span>
          <span className="inline-flex overflow-hidden rounded-md border border-zinc-200">
            <span className="flex h-6 w-7 items-center justify-center bg-zinc-900 text-white">
              <svg width="11" height="11" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <rect x="1.5" y="1.5" width="5" height="5" rx=".5" stroke="currentColor" />
                <rect x="9.5" y="1.5" width="5" height="5" rx=".5" stroke="currentColor" />
                <rect x="1.5" y="9.5" width="5" height="5" rx=".5" stroke="currentColor" />
                <rect x="9.5" y="9.5" width="5" height="5" rx=".5" stroke="currentColor" />
              </svg>
            </span>
            <span className="flex h-6 w-7 items-center justify-center border-l border-zinc-200 text-zinc-400">
              <svg width="11" height="11" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M5 3h9M5 8h9M5 13h9" stroke="currentColor" strokeLinecap="round" />
                <circle cx="2" cy="3" r=".8" fill="currentColor" />
                <circle cx="2" cy="8" r=".8" fill="currentColor" />
                <circle cx="2" cy="13" r=".8" fill="currentColor" />
              </svg>
            </span>
          </span>
        </div>

        <div className="mt-2.5 grid grid-cols-5 gap-2.5">
          {artworkCards.map((artwork) => (
            <article
              key={artwork.title}
              className="overflow-hidden rounded-[7px] border border-zinc-200 bg-white"
            >
              <img
                src={artwork.image}
                alt=""
                aria-hidden="true"
                className="aspect-square w-full object-cover"
              />
              <div className="p-2">
                <p className="truncate text-[7.5px] text-zinc-400">Sacha Elron</p>
                <p className="mt-0.5 truncate text-[9px] font-medium text-zinc-900">
                  {artwork.title}
                  <span className="font-normal text-zinc-400">, {artwork.year}</span>
                </p>
                <div className="mt-2 flex items-center justify-between gap-1">
                  <span className="truncate text-[8px] tabular-nums text-zinc-700">
                    {artwork.price}
                  </span>
                  <span
                    className={`shrink-0 rounded-full border px-1.5 py-0.5 text-[7px] ${
                      artwork.status === "Available"
                        ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                        : "border-zinc-200 bg-zinc-50 text-zinc-500"
                    }`}
                  >
                    {artwork.status}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

function GripDots() {
  return (
    <span className="grid h-8 w-7 shrink-0 grid-cols-2 place-content-center gap-[2px] text-zinc-300">
      {Array.from({ length: 6 }).map((_, index) => (
        <span key={index} className="h-[2px] w-[2px] rounded-full bg-current" />
      ))}
    </span>
  );
}

function Chevron({ expanded = false }: { expanded?: boolean }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      className={`shrink-0 text-zinc-400 ${expanded ? "rotate-180" : ""}`}
      aria-hidden="true"
    >
      <path
        d="m3.5 5.25 3.5 3.5 3.5-3.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function AddMenu({ artworkActive }: { artworkActive: boolean }) {
  const items = ["Artwork", "Full-page image", "Video", "Short text"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 6, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 4, scale: 0.98 }}
      transition={{ duration: 0.24 }}
      className="absolute bottom-full left-4 z-20 mb-2 w-44 overflow-hidden rounded-[8px] border border-zinc-200 bg-white py-1 shadow-xl"
    >
      {items.map((item, index) => (
        <motion.div
          key={item}
          animate={
            artworkActive && index === 0
              ? { backgroundColor: "#F4F4F5", color: "#18181B" }
              : { backgroundColor: "#FFFFFF", color: "#3F3F46" }
          }
          className="flex items-center gap-2 px-3 py-2 text-[11px]"
        >
          <span className="flex h-4 w-4 items-center justify-center text-[12px] text-zinc-400">
            {index === 0 ? "▧" : index === 1 ? "▣" : index === 2 ? "▤" : "T"}
          </span>
          {item}
        </motion.div>
      ))}
    </motion.div>
  );
}

function ArtworkPicker({ dawnSelected }: { dawnSelected: boolean }) {
  const choices = [
    { title: "Amber Nocturne", image: "/artworks/painting-10.jpg" },
    { title: "Crimson Field", image: "/artworks/painting-08.jpg" },
    { title: "Evening field", image: "/artworks/painting-01.png" },
    { title: "Sage Interval", image: "/artworks/painting-04.jpg" },
    { title: "Dawn Study No. 7", image: "/artworks/painting-03.jpg" },
    { title: "Untitled (Horizon)", image: "/artworks/painting-09.png" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="absolute inset-0 z-30 flex items-center justify-center bg-zinc-900/35 p-5"
    >
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 8, scale: 0.99 }}
        transition={{ duration: 0.3 }}
        className="flex h-full w-full flex-col overflow-hidden rounded-[8px] bg-white shadow-xl"
      >
        <div className="flex items-center gap-2 border-b border-zinc-100 p-3">
          <div className="flex h-9 min-w-0 flex-1 items-center rounded-[6px] border border-zinc-300 px-3 text-[11px] text-zinc-400">
            <span className="mr-2 text-[14px]">⌕</span>
            Search artworks…
          </div>
          <span className="flex h-8 w-8 items-center justify-center text-[18px] text-zinc-400">
            ×
          </span>
        </div>

        <div className="grid min-h-0 flex-1 grid-cols-3 gap-2.5 overflow-hidden p-3">
          {choices.map((choice) => {
            const selected = dawnSelected && choice.title === "Dawn Study No. 7";
            return (
              <motion.article
                key={choice.title}
                animate={
                  selected
                    ? { borderColor: "#18181B", boxShadow: "0 0 0 1px #18181B" }
                    : { borderColor: "#E4E4E7", boxShadow: "0 0 0 0px transparent" }
                }
                className="relative overflow-hidden rounded-[6px] border bg-white"
              >
                <img
                  src={choice.image}
                  alt=""
                  aria-hidden="true"
                  className="h-[78px] w-full object-cover"
                />
                <div className="p-2">
                  <p className="truncate text-[9.5px] font-medium text-zinc-900">{choice.title}</p>
                  <p className="mt-0.5 text-[8px] text-zinc-400">Sacha Elron</p>
                </div>
                <AnimatePresence>
                  {selected ? (
                    <motion.span
                      initial={{ opacity: 0, scale: 0.6 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute right-2 top-2 flex h-4 w-4 items-center justify-center rounded-full bg-zinc-900 text-[8px] text-white"
                    >
                      ✓
                    </motion.span>
                  ) : null}
                </AnimatePresence>
              </motion.article>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
}

export function BuildSelection({ fullBleed = false }: { fullBleed?: boolean } = {}) {
  const reduceMotion = useReducedMotion();
  const [stage, setStage] = useState(reduceMotion ? 5 : 0);

  useEffect(() => {
    if (reduceMotion) {
      setStage(5);
      return;
    }

    let timers: ReturnType<typeof setTimeout>[] = [];
    let loopTimer: ReturnType<typeof setInterval>;

    const play = () => {
      setStage(0);
      timers = [
        setTimeout(() => setStage(1), 800),
        setTimeout(() => setStage(2), 1700),
        setTimeout(() => setStage(3), 2450),
        setTimeout(() => setStage(4), 3900),
        setTimeout(() => setStage(5), 4900),
      ];
    };

    play();
    loopTimer = setInterval(play, 7600);

    return () => {
      timers.forEach(clearTimeout);
      clearInterval(loopTimer);
    };
  }, [reduceMotion]);

  return (
    <div className={`relative h-full ${fullBleed ? "" : "bg-zinc-50/60 p-4"}`}>
      <section className="flex h-full flex-col overflow-hidden rounded-[8px] border border-zinc-200 bg-white">
        <div className="shrink-0 border-b border-zinc-100 px-4 py-2.5">
          <h3 className="text-[12px] font-medium text-zinc-900">Selection blocks</h3>
          <p className="mt-0.5 text-[10px] text-zinc-400">
            Add only what is useful, then drag blocks to reorder them.
          </p>
        </div>

        <div className="min-h-0 flex-1 space-y-1.5 overflow-hidden bg-zinc-50/60 p-2.5">
          <section className="overflow-hidden rounded-[8px] border border-zinc-200 bg-white">
            <div className="flex min-h-10 items-center gap-2 px-3">
              <GripDots />
              <div className="min-w-0 flex-1">
                <p className="truncate text-[12px] font-medium text-zinc-900">Amber Nocturne</p>
                <p className="mt-0.5 truncate text-[10px] text-zinc-400">Artwork · full width</p>
              </div>
              <Chevron expanded={stage !== 5} />
            </div>

            <AnimatePresence initial={false}>
              {stage !== 5 ? (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden border-t border-zinc-100"
                >
                  <div className="px-4 py-2">
                    <div className="flex items-center gap-3 rounded-md bg-zinc-50 p-2">
                      <ArtworkImage
                        work={{
                          image: "/artworks/painting-10.jpg",
                        }}
                        className="h-10 w-10 shrink-0 rounded-sm"
                      />
                      <div className="min-w-0">
                        <p className="truncate text-[12px] font-medium text-zinc-900">
                          Amber Nocturne, 2025
                        </p>
                        <p className="truncate text-[11px] text-zinc-400">Sacha Elron</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-3 py-2">
                      <span className="text-[11px] text-zinc-600">Show price</span>
                      <span className="relative h-[14px] w-[26px] rounded-full bg-zinc-900">
                        <span className="absolute left-px top-px h-3 w-3 translate-x-3 rounded-full bg-white shadow-sm" />
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1.5 border-t border-zinc-100 pt-2">
                      {[
                        { label: "Full width", active: true },
                        { label: "Two artworks", active: false },
                        { label: "Artwork + text", active: false },
                      ].map((layout) => (
                        <span
                          key={layout.label}
                          className={`rounded-full border px-2.5 py-1 text-[10px] ${
                            layout.active
                              ? "border-zinc-900 bg-zinc-900 text-white"
                              : "border-zinc-200 bg-white text-zinc-500"
                          }`}
                        >
                          {layout.label}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </section>

          {["Sage Interval", "Crimson Field", "Evening field"].map((title) => (
            <section
              key={title}
              className="flex min-h-10 items-center gap-2 rounded-[8px] border border-zinc-200 bg-white px-3"
            >
              <GripDots />
              <div className="min-w-0 flex-1">
                <p className="truncate text-[12px] font-medium text-zinc-900">{title}</p>
                <p className="mt-0.5 truncate text-[10px] text-zinc-400">Artwork · full width</p>
              </div>
              <Chevron />
            </section>
          ))}

          <AnimatePresence>
            {stage === 5 ? (
              <motion.section
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.35 }}
                className="flex min-h-10 items-center gap-2 rounded-[8px] border border-zinc-900 bg-white px-3"
              >
                <GripDots />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[12px] font-medium text-zinc-900">Dawn Study No. 7</p>
                  <p className="mt-0.5 truncate text-[10px] text-zinc-400">Artwork · full width</p>
                </div>
                <span className="text-[9px] font-medium text-emerald-700">Added</span>
              </motion.section>
            ) : null}
          </AnimatePresence>
        </div>

        <div className="relative shrink-0 border-t border-zinc-100 px-4 py-2.5">
          <AnimatePresence>
            {stage === 1 || stage === 2 ? <AddMenu artworkActive={stage === 2} /> : null}
          </AnimatePresence>
          <motion.span
            animate={
              stage === 1
                ? { boxShadow: "0 0 0 3px rgba(24,24,27,0.16)" }
                : { boxShadow: "0 0 0 0 rgba(24,24,27,0)" }
            }
            className="inline-flex items-center gap-1.5 rounded-full bg-zinc-900 px-3 py-1.5 text-[11px] font-medium text-white"
          >
            <span className="text-[14px] leading-none">+</span>
            Add
            <span className="text-[10px]">{stage === 1 || stage === 2 ? "⌃" : "⌄"}</span>
          </motion.span>
        </div>
      </section>

      <AnimatePresence>
        {stage === 3 || stage === 4 ? <ArtworkPicker dawnSelected={stage === 4} /> : null}
      </AnimatePresence>
    </div>
  );
}

function ShareSelection() {
  const reduceMotion = useReducedMotion();
  const [stage, setStage] = useState(reduceMotion ? 0 : 0);

  useEffect(() => {
    if (reduceMotion) {
      setStage(0);
      return;
    }

    let timers: ReturnType<typeof setTimeout>[] = [];
    let loopTimer: ReturnType<typeof setInterval>;

    const play = () => {
      setStage(0);
      timers = [
        setTimeout(() => setStage(1), 900),
        setTimeout(() => setStage(2), 1550),
        setTimeout(() => setStage(3), 2050),
        setTimeout(() => setStage(0), 3700),
      ];
    };

    play();
    loopTimer = setInterval(play, 5200);

    return () => {
      timers.forEach(clearTimeout);
      clearInterval(loopTimer);
    };
  }, [reduceMotion]);

  return (
    <div className="flex h-full w-full items-center justify-center overflow-hidden bg-white">
      <div className="flex w-full items-center justify-center gap-3 px-8 py-10 sm:gap-6">
        <div className="inline-flex h-12 min-w-[128px] items-center justify-center gap-2 rounded-md px-4 text-[16px] font-medium text-zinc-700 sm:h-14 sm:min-w-[160px] sm:text-[18px]">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="18" cy="5" r="3" stroke="currentColor" strokeWidth="1.8" />
            <circle cx="6" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
            <circle cx="18" cy="19" r="3" stroke="currentColor" strokeWidth="1.8" />
            <path d="m8.7 10.7 6.6-4.3M8.7 13.3l6.6 4.3" stroke="currentColor" strokeWidth="1.8" />
          </svg>
          Share
        </div>

        <motion.div
          animate={
            stage >= 1
              ? { scale: stage === 2 ? 0.96 : 1, backgroundColor: "#F4F4F5", color: "#18181B" }
              : { scale: 1, backgroundColor: "#FFFFFF", color: "#3F3F46" }
          }
          transition={{ duration: 0.18 }}
          className="inline-flex h-12 min-w-[168px] items-center justify-center gap-2 rounded-md px-4 text-[16px] font-medium sm:h-14 sm:min-w-[218px] sm:text-[18px]"
        >
          {stage === 3 ? (
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 0.8, ease: "linear", repeat: Infinity }}
              className="h-4 w-4 rounded-full border-2 border-zinc-300 border-t-zinc-700"
              aria-hidden="true"
            />
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M12 3v12m0 0 4-4m-4 4-4-4"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M5 17v3h14v-3"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={stage === 3 ? "generating" : "download"}
              initial={{ opacity: 0, y: 3 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -3 }}
              transition={{ duration: 0.18 }}
            >
              {stage === 3 ? "Generating PDF…" : "Download PDF"}
            </motion.span>
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}

const CALM_EASE = [0.16, 1, 0.3, 1] as const;

function TypingDots() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      transition={{ duration: 0.3, ease: CALM_EASE }}
      className="absolute left-0 top-0 inline-flex items-center gap-1 rounded-[8px] border border-zinc-200 bg-white px-3 py-2.5 shadow-[0_1px_2px_rgba(0,0,0,0.03)] lg:rounded-[10px] lg:px-4 lg:py-3"
    >
      {[0, 1, 2].map((dot) => (
        <motion.span
          key={dot}
          className="h-1 w-1 rounded-full bg-zinc-400 lg:h-[5px] lg:w-[5px]"
          animate={{ opacity: [0.25, 1, 0.25] }}
          transition={{ duration: 1, repeat: Infinity, delay: dot * 0.16, ease: "easeInOut" }}
        />
      ))}
    </motion.div>
  );
}

/*
 * Vignette du step « Keep the conversation connected », rejouant la séquence
 * réelle de Gallery OS : le client répond depuis une sélection privée (frappe →
 * bulle), et l’inquiry arrive déjà rattachée à son contexte — vignette œuvre,
 * disponibilité/prix, et sélection d’origine en sous-titre, comme dans la liste
 * d’inquiries du dashboard (CompactInquiryRow : artwork + ovrTitle).
 */
function ConnectedInquiry() {
  const reduceMotion = useReducedMotion();
  const [stage, setStage] = useState(reduceMotion ? 4 : 0);

  useEffect(() => {
    if (reduceMotion) {
      setStage(4);
      return;
    }

    let timers: ReturnType<typeof setTimeout>[] = [];
    let loopTimer: ReturnType<typeof setInterval>;

    const play = () => {
      setStage(0);
      timers = [
        setTimeout(() => setStage(1), 700), // frappe
        setTimeout(() => setStage(2), 1600), // le message arrive
        setTimeout(() => setStage(3), 2500), // le contexte est déjà rattaché
        setTimeout(() => setStage(4), 3300), // record connecté
        setTimeout(() => setStage(0), 6500),
      ];
    };

    play();
    loopTimer = setInterval(play, 7400);

    return () => {
      timers.forEach(clearTimeout);
      clearInterval(loopTimer);
    };
  }, [reduceMotion]);

  const reveal = (shown: boolean, delay = 0) => ({
    initial: false as const,
    animate: shown ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 },
    transition: { duration: 0.36, ease: CALM_EASE, delay: shown ? delay : 0 },
  });

  return (
    <div className="flex h-full w-full flex-col overflow-hidden bg-white font-sans text-zinc-900">
      {/* header d’écran, comme les autres visuels Gallery OS (cf. SearchSelection) */}
      <div className="flex h-14 shrink-0 items-center justify-between border-b border-zinc-100 px-5 lg:h-[62px] lg:px-7">
        <div>
          <h3 className="text-[13px] font-medium text-zinc-900 lg:text-[15px]">Inquiries</h3>
          <p className="mt-0.5 text-[9px] text-zinc-400 lg:text-[10px]">
            Good Artworks · Collector inbox
          </p>
        </div>
        <span className="rounded-full border border-zinc-200 px-2.5 py-1 text-[9px] text-zinc-500 lg:px-3 lg:py-1.5 lg:text-[10px]">
          1 new
        </span>
      </div>

      <div className="flex min-h-0 flex-1 items-center justify-center px-6 lg:px-10">
        <div className="w-full max-w-[340px] lg:max-w-[460px]">
          {/* 1 — le client écrit, puis le message arrive */}
          <div className="relative">
            <AnimatePresence>{stage === 1 ? <TypingDots /> : null}</AnimatePresence>
            <motion.div
              {...reveal(stage >= 2)}
              className="rounded-[8px] border border-zinc-200 bg-white p-3 shadow-[0_1px_2px_rgba(0,0,0,0.03)] lg:rounded-[10px] lg:p-4"
            >
              <div className="flex items-center justify-between gap-3">
                <p className="text-[10px] font-medium lg:text-[13px]">Sophie Veil</p>
                <span className="text-[8px] text-zinc-400 lg:text-[10px]">Today · 10:42</span>
              </div>
              <p className="mt-1.5 text-[10px] leading-[1.5] text-zinc-700 lg:mt-2 lg:text-[13px]">
                Is Dawn Study No. 7 still available?
              </p>
            </motion.div>
          </div>

          {/* 2 — context attaches under the reply, linked by a thread line */}
          <div className="relative mt-2 pl-4 lg:mt-3 lg:pl-5">
            <motion.span
              initial={false}
              animate={stage >= 3 ? { scaleY: 1, opacity: 1 } : { scaleY: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: CALM_EASE }}
              className="absolute bottom-1 left-[6px] top-1 w-px origin-top bg-zinc-200 lg:left-[7px]"
              aria-hidden="true"
            />

            <motion.div
              {...reveal(stage >= 3, 0.1)}
              className="flex items-center gap-2.5 rounded-[7px] border border-zinc-200 bg-white p-2 lg:gap-3 lg:rounded-[9px] lg:p-2.5"
            >
              <ArtworkImage
                work={works[0]}
                className="h-10 w-11 shrink-0 rounded-[5px] lg:h-[52px] lg:w-14 lg:rounded-[6px]"
              />
              <div className="min-w-0">
                <p className="truncate text-[9.5px] font-medium text-zinc-900 lg:text-[12px]">
                  {works[0].title}
                </p>
                <p className="mt-0.5 text-[8px] lg:text-[10.5px]">
                  <span className="font-medium text-emerald-700">Available</span>
                  <span className="text-zinc-400"> · {works[0].price}</span>
                </p>
                <p className="mt-0.5 truncate text-[8px] text-zinc-400 lg:text-[10.5px]">
                  Shared in Landscape selection — Sophie Veil
                </p>
              </div>
            </motion.div>
          </div>

          {/* 3 — signature status line */}
          <motion.div
            {...reveal(stage >= 4, 0.1)}
            className="mt-3 flex items-center gap-1.5 text-[8.5px] font-medium text-emerald-700 lg:mt-4 lg:gap-2 lg:text-[11px]"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 lg:h-2 lg:w-2" />
            Artwork record connected
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default function AdvisorsSelectionWorkflowVisual({ step }: { step: number }) {
  if (step === 1) return <BuildSelection />;
  if (step === 2) return <ShareSelection />;
  if (step === 3) return <ConnectedInquiry />;
  return <SearchSelection />;
}
