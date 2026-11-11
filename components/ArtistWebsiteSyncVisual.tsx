"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

const ease = [0.16, 1, 0.3, 1] as const;
const STEP_DURATION = 650;
const LAST_PHASE = 8;

const works = [
  {
    image: "/artist page/ChatGPT Image 26 mars 2026, 19_42_09.png",
    title: "Untitled (Horizon)",
    year: "2024",
    medium: "Oil on canvas",
    dimensions: "152 × 122 cm",
  },
  {
    image: "/artist page/ChatGPT Image 26 mars 2026, 19_45_19.png",
    title: "Evening Field",
    year: "2023",
    medium: "Oil on canvas",
    dimensions: "122 × 91 cm",
  },
  {
    image: "/artist page/ChatGPT Image 26 mars 2026, 19_43_32.png",
    title: "Dawn Study No. 7",
    year: "2023",
    medium: "Oil on canvas",
    dimensions: "183 × 152 cm",
  },
] as const;

function EyeOffIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m2 2 20 20" />
      <path d="M10.6 10.7a2 2 0 0 0 2.8 2.8" />
      <path d="M9.9 4.2A10.4 10.4 0 0 1 22 12a10.8 10.8 0 0 1-2 3.2" />
      <path d="M6.6 6.7A10.7 10.7 0 0 0 2 12a10.5 10.5 0 0 0 12.1 7.8" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  );
}

function SpinnerIcon() {
  return (
    <motion.svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
      animate={{ rotate: 360 }}
      transition={{ duration: 0.8, ease: "linear", repeat: Infinity }}
    >
      <path d="M21 12a9 9 0 1 1-6.2-8.6" />
    </motion.svg>
  );
}

function ChevronIcon({ direction }: { direction: "up" | "down" }) {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={direction === "up" ? "m18 15-6-6-6 6" : "m6 9 6 6 6-6"} />
    </svg>
  );
}

function GalleryOsEditor({ status }: { status: "published" | "changes" | "publishing" }) {
  const published = status === "published";

  return (
    <section className="h-full min-w-0 overflow-hidden rounded-[12px] border border-zinc-200 bg-white">
      <div className="flex min-h-11 items-center justify-end border-b border-zinc-100 px-3 py-2">
        <div className="flex shrink-0 items-center gap-2">
          <span className="inline-flex items-center gap-1 text-[8px] text-zinc-500">
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                published ? "bg-emerald-500" : "bg-amber-500"
              }`}
            />
            {published ? "On the site" : "Changes not on the site yet"}
          </span>
          <span
            className={`inline-flex h-6 items-center justify-center gap-1 rounded-md px-2 text-[9px] font-medium ${
              published ? "text-zinc-700" : "bg-zinc-900 text-white"
            }`}
          >
            {status === "publishing" ? (
              <SpinnerIcon />
            ) : status === "changes" ? (
              <SendIcon />
            ) : (
              <EyeOffIcon />
            )}
            {published ? "Unpublish" : "Publish changes"}
          </span>
        </div>
      </div>

      <div className="bg-zinc-50/60 p-2.5 sm:p-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[10px] font-medium text-zinc-900 sm:text-[11px]">
              Selected artworks
            </p>
            <p className="mt-0.5 text-[8px] text-zinc-400 sm:text-[9px]">
              Works displayed on this page.
            </p>
          </div>
          <span className="inline-flex h-6 items-center rounded-md border border-zinc-200 px-2 text-[8px] font-medium text-zinc-700">
            +&nbsp; Add from database
          </span>
        </div>

        <div className="mt-2.5 overflow-hidden rounded-lg border border-zinc-200 bg-white">
          {works.map((work, index) => (
            <div
              key={work.title}
              className="flex min-h-12 items-center gap-2 border-b border-zinc-100 px-2 last:border-b-0"
            >
              <span className="w-3 shrink-0 text-center text-[8px] tabular-nums text-zinc-400">
                {index + 1}
              </span>
              <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-md bg-zinc-100">
                <Image src={work.image} alt="" fill sizes="32px" className="object-cover" />
              </div>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[9px] font-medium text-zinc-900 sm:text-[10px]">
                  {work.title}
                </span>
                <span className="block truncate text-[8px] text-zinc-400 sm:text-[9px]">
                  Sacha Elron · {work.year}
                </span>
              </span>
              <span className="hidden shrink-0 text-[8px] text-emerald-700 sm:inline">
                Available
              </span>
              <span className="flex shrink-0 items-center text-zinc-400">
                <span
                  className={`flex h-6 w-4 items-center justify-center ${
                    index === 0 ? "opacity-20" : ""
                  }`}
                >
                  <ChevronIcon direction="up" />
                </span>
                <span
                  className={`flex h-6 w-4 items-center justify-center ${
                    index === works.length - 1 ? "opacity-20" : ""
                  }`}
                >
                  <ChevronIcon direction="down" />
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PublicPreview({ showNewWork }: { showNewWork: boolean }) {
  return (
    <section className="h-full min-w-0 overflow-hidden rounded-[12px] border border-zinc-200 bg-white">
      <div className="flex h-9 items-center gap-1.5 border-b border-zinc-200 px-3">
        <span className="h-2 w-2 shrink-0 rounded-full bg-zinc-200" />
        <span className="h-2 w-2 shrink-0 rounded-full bg-zinc-200" />
        <span className="h-2 w-2 shrink-0 rounded-full bg-zinc-200" />
        <span className="ml-1 min-w-0 truncate rounded-full bg-zinc-100 px-3 py-1 text-[8px] text-zinc-500 sm:text-[9px]">
          sachaelron.com
        </span>
      </div>

      <div className="px-3 pb-3 pt-3 sm:px-4 sm:pb-4">
        <div className="flex items-center justify-between gap-2">
          <p className="text-[8px] font-normal uppercase tracking-[0.22em] text-[#111110] sm:text-[9px]">
            Selected Works
          </p>
          <div className="hidden gap-1 sm:flex">
            <span className="rounded-full bg-[#111110] px-2 py-1 text-[7px] text-white">
              Selected Works
            </span>
            <span className="rounded-full border border-[#D8D4CF] px-2 py-1 text-[7px] text-[#555]">
              Exhibitions
            </span>
          </div>
        </div>

        <motion.div layout className="mt-3 grid grid-cols-3 gap-1.5 sm:gap-2">
          <AnimatePresence initial={false}>
            {works.map((work, index) =>
              index === 2 && !showNewWork ? null : (
                <motion.div
                  layout
                  key={work.title}
                  initial={index === 2 ? { opacity: 0, y: 8, scale: 0.96 } : false}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.46, ease }}
                  className="min-w-0 rounded-[7px] p-1"
                >
                  <div className="relative aspect-square overflow-hidden rounded-[5px] bg-transparent p-px">
                    <Image
                      src={work.image}
                      alt=""
                      fill
                      sizes="(min-width: 640px) 130px, 80px"
                      className="rounded-[4px] object-cover"
                    />
                  </div>
                  <div className="mt-1.5">
                    <p className="truncate text-[7px] tracking-[0.04em] text-[#111110] sm:text-[8px]">
                      Sacha Elron
                    </p>
                    <p className="mt-0.5 truncate text-[8px] leading-[1.35] text-[#111110] sm:text-[9px]">
                      {work.title}, <span className="text-[#777]">{work.year}</span>
                    </p>
                    <p className="mt-0.5 hidden text-[7px] italic leading-tight text-[#888] sm:block">
                      {work.medium}
                    </p>
                    <p className="hidden text-[7px] leading-tight text-[#888] sm:block">
                      {work.dimensions}
                    </p>
                  </div>
                </motion.div>
              )
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

export default function ArtistWebsiteSyncVisual() {
  const reduceMotion = useReducedMotion();
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;

    const interval = window.setInterval(() => {
      setPhase((current) => (current >= LAST_PHASE ? 0 : current + 1));
    }, STEP_DURATION);

    return () => window.clearInterval(interval);
  }, [reduceMotion]);

  const currentPhase = reduceMotion ? 6 : phase;
  const status =
    currentPhase === 2
      ? "publishing"
      : currentPhase >= 3 && currentPhase < LAST_PHASE
        ? "published"
        : "changes";
  const showNewWork = currentPhase >= 4 && currentPhase < LAST_PHASE;

  return (
    <motion.div
      role="img"
      aria-label="Three artworks selected in the real Good Artworks editor are published to the Selected Works grid of the gallery website."
      animate={{ opacity: currentPhase === LAST_PHASE ? 0 : 1 }}
      transition={{ duration: 0.38, ease }}
      className="flex h-full w-full items-center justify-center"
    >
      <div className="grid h-[122%] w-[122%] origin-center scale-[0.82] grid-rows-[1.2fr_0.8fr] gap-2 sm:h-full sm:w-full sm:scale-100 sm:grid-cols-[0.92fr_1.08fr] sm:grid-rows-1 sm:items-stretch">
        <GalleryOsEditor status={status} />
        <PublicPreview showNewWork={showNewWork} />
      </div>
    </motion.div>
  );
}
