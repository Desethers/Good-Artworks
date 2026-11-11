"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArchiveMock } from "@/components/showcase/PillarMocks";
import ScrollStory from "@/components/ScrollStory";

type StoryStep = {
  title: string;
  subtitle: string;
  bullets: string[];
};

const STEPS: StoryStep[] = [
  {
    title: "Inventory",
    subtitle: "Bring your existing inventory into one place.",
    bullets: [
      "Import from Excel or CSV",
      "Continue from your current system",
      "No need to rebuild your archive",
    ],
  },
  {
    title: "Artwork",
    subtitle: "Keep every artwork complete and organised.",
    bullets: ["Images and documents", "Prices and availability", "Artists and exhibitions"],
  },
  {
    title: "Search",
    subtitle: "Find artworks, artists and exhibitions instantly.",
    bullets: [
      "Search by artist or title",
      "Filter by availability",
      "Browse your archive in seconds",
    ],
  },
  {
    title: "Availability",
    subtitle: "Track availability across your entire inventory.",
    bullets: ["Your website", "Collector emails", "Private selections"],
  },
];

function InventoryImportDemo({ phase }: { phase: number }) {
  const reduceMotion = useReducedMotion();

  const fileVisible = phase >= 1;
  const previewVisible = phase >= 3;
  const success = phase === 5;

  if (success) {
    return (
      <div className="flex h-full flex-col bg-white p-6">
        <div className="flex items-start justify-between">
          <ImportHeader title="Import artworks" subtitle="From a CSV file or existing system" />
          <span className="text-[22px] leading-none text-[#A1A1AA]">×</span>
        </div>
        <motion.div
          className="flex flex-1 flex-col justify-center"
          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.4 }}
        >
          <div className="flex items-center gap-4">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#ECFDF5] text-[18px] text-[#059669]">
              ✓
            </span>
            <p className="text-[18px] font-semibold text-[#18181B]">1 artwork imported</p>
          </div>
          <p className="mt-8 pl-2 text-[14px] text-[#71717A]">Import another file</p>
        </motion.div>
      </div>
    );
  }

  if (phase === 0) {
    return (
      <div className="flex h-full flex-col bg-white p-6">
        <div className="flex items-start justify-between">
          <ImportHeader title="Import artworks" subtitle="From a CSV file or existing system" />
          <span className="text-[22px] leading-none text-[#A1A1AA]">×</span>
        </div>
        <motion.div
          className="mt-6 flex h-[160px] shrink-0 flex-col items-center justify-center rounded-[14px] border-2 border-dashed border-[#E4E4E7] bg-[#FAFAFA]/40 text-center"
          initial={reduceMotion ? false : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.4 }}
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-[#A1A1AA]"
            aria-hidden="true"
          >
            <path d="M16 16l-4-4-4 4" />
            <path d="M12 12v9" />
            <path d="M20.4 17.5A5 5 0 0 0 18 8.2 7 7 0 0 0 4.3 10.6 4.5 4.5 0 0 0 5.5 19H7" />
          </svg>
          <p className="mt-4 text-[15px] font-medium text-[#18181B]">Drop your CSV file</p>
          <p className="mt-1 text-[13px] text-[#71717A]">or click to browse</p>
        </motion.div>
        <p className="mt-5 text-[12px] text-[#71717A] underline underline-offset-2">
          Download CSV template
        </p>
      </div>
    );
  }

  return (
    <div className="h-full overflow-hidden bg-white p-5 md:p-6">
      <div className="mx-auto flex h-full w-full max-w-[680px] flex-col justify-center">
        <div className="flex items-start justify-between">
          <ImportHeader title="Import artworks" subtitle="From a CSV file or existing system" />
          <span className="text-[22px] leading-none text-[#A1A1AA]">×</span>
        </div>

        <div className="mt-6 h-[38px]">
          <AnimatePresence initial={false}>
            {fileVisible ? (
              <motion.div
                key="file"
                className="flex h-full items-center justify-between text-[12px] text-[#52525B]"
                initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <span>▧ &nbsp; inventory-template.csv</span>
                <span className="text-[#A1A1AA]">×</span>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                className="flex h-full items-center rounded-lg border border-dashed border-[#D4D4D8] bg-[#FAFAFA]/60 px-3 text-[11px] text-[#A1A1AA]"
                initial={false}
                animate={{ opacity: 1 }}
              >
                Drop a CSV file here or click to browse
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-2 flex h-[20px] items-center">
          <AnimatePresence mode="wait" initial={false}>
            {phase === 2 ? (
              <motion.p
                key="checking"
                className="flex items-center gap-2 text-[12px] text-[#71717A]"
                initial={reduceMotion ? false : { opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#A1A1AA]" />
                Checking data…
              </motion.p>
            ) : previewVisible ? (
              <motion.p
                key={success ? "success" : "ready"}
                className="flex items-center gap-2 text-[12px] text-[#168044]"
                initial={reduceMotion ? false : { opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#168044] text-[9px] text-white">
                  ✓
                </span>
                {success ? "Artwork added to inventory" : "1 ready to import"}
              </motion.p>
            ) : null}
          </AnimatePresence>
        </div>

        <motion.div
          className="mt-3 min-h-[78px] overflow-hidden rounded-lg border border-[#E4E4E7]"
          initial={{ opacity: previewVisible ? 1 : 0 }}
          animate={{ opacity: previewVisible ? 1 : 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.4 }}
          aria-hidden={!previewVisible}
        >
          <div className="grid grid-cols-[1.3fr_1fr_.5fr_.8fr_.4fr] bg-[#FAFAFA] px-3 py-2.5 text-[9px] text-[#71717A]">
            <span>Title</span>
            <span>Artist</span>
            <span>Year</span>
            <span>Price</span>
            <span>Image</span>
          </div>
          <div className="grid grid-cols-[1.3fr_1fr_.5fr_.8fr_.4fr] px-3 py-3 text-[10px] text-[#18181B]">
            <span>Untitled (Horizon)</span>
            <span>Sacha Elron</span>
            <span>2024</span>
            <span>15 000 EUR</span>
            <span className="text-[#168044]">✓</span>
          </div>
        </motion.div>

        <div className="mt-4 flex h-[36px] items-center gap-4">
          <motion.span
            className="rounded-lg bg-[#18181B] px-4 py-2.5 text-[11px] font-medium text-white"
            initial={{ opacity: previewVisible ? 1 : 0 }}
            animate={{
              opacity: previewVisible ? 1 : 0,
              scale: phase === 4 ? 0.98 : 1,
            }}
            transition={{ duration: reduceMotion ? 0 : 0.16 }}
          >
            Import 1 artwork →
          </motion.span>
          <motion.span
            className="text-[11px] text-[#71717A]"
            initial={{ opacity: previewVisible ? 1 : 0 }}
            animate={{ opacity: previewVisible ? 1 : 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.3 }}
          >
            Cancel
          </motion.span>
        </div>
      </div>
    </div>
  );
}

function ImportHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div>
      <h3 className="text-[17px] font-semibold text-[#18181B]">{title}</h3>
      <p className="mt-1 text-[12px] text-[#71717A]">{subtitle}</p>
    </div>
  );
}

function ArtworkDetailVisual() {
  return (
    <div className="h-full bg-[#F8F8F6] p-5 md:p-8">
      <div className="mx-auto h-full max-w-[720px] overflow-hidden rounded-lg border border-[#E4E4E1] bg-white shadow-[0_10px_32px_rgba(17,17,16,0.06)]">
        <div className="flex items-center justify-between border-b border-[#E8E8E6] px-5 py-4">
          <div>
            <p className="text-[14px] font-medium text-[#111110]">Evening Field</p>
            <p className="mt-0.5 text-[9px] text-[#ADADAA]">Artwork · AR-0247</p>
          </div>
          <span className="rounded-md bg-[#111110] px-4 py-2 text-[10px] text-white">Save</span>
        </div>
        <div className="grid gap-5 p-5 md:grid-cols-[1.15fr_.85fr] md:p-7">
          <div className="grid grid-cols-2 gap-3">
            {[
              ["Title", "Evening Field", "col-span-2"],
              ["Artist", "Sacha Elron ✓ Linked", "col-span-2"],
              ["Year", "2023", ""],
              ["Medium", "Acrylic on canvas", ""],
            ].map(([label, value, span]) => (
              <div key={label} className={span}>
                <p className="text-[9px] text-[#6B6A67]">{label}</p>
                <div className="mt-1.5 rounded-md border border-[#D8D8D5] px-3 py-2.5 text-[10px] text-[#111110]">
                  {value}
                </div>
              </div>
            ))}
            <div className="col-span-2">
              <p className="text-[9px] text-[#6B6A67]">Dimensions</p>
              <div className="mt-1.5 grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-2 text-center text-[9px]">
                <span className="rounded-md border border-[#D8D8D5] py-2.5">120</span>
                <span className="text-[#ADADAA]">×</span>
                <span className="rounded-md border border-[#D8D8D5] py-2.5">120</span>
                <span className="text-[#ADADAA]">×</span>
                <span className="rounded-md border border-[#D8D8D5] py-2.5">4 cm</span>
              </div>
            </div>
            <div className="col-span-2 mt-2 grid grid-cols-2 gap-3 border-t border-[#EFEFED] pt-4">
              <div>
                <p className="text-[8px] uppercase tracking-[0.1em] text-[#ADADAA]">Documents</p>
                <p className="mt-2 text-[9px] text-[#111110]">Provenance.pdf</p>
              </div>
              <div>
                <p className="text-[8px] uppercase tracking-[0.1em] text-[#ADADAA]">Availability</p>
                <p className="mt-2 text-[9px] text-[#168044]">Available</p>
              </div>
            </div>
          </div>
          <div>
            <p className="text-[9px] text-[#6B6A67]">Main image</p>
            <div className="relative mt-1.5 aspect-[4/5] overflow-hidden rounded-md border border-[#D8D8D5]">
              <img
                src="/artworks/painting-01.png"
                alt=""
                aria-hidden="true"
                className="h-full w-full object-cover"
              />
              <span className="absolute bottom-3 left-3 rounded-full bg-white px-2.5 py-1 text-[8px] text-[#168044]">
                ✓ Current
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SearchVisual() {
  return (
    <div className="h-full bg-[#F8F8F6] p-4 md:p-7">
      <div className="h-full overflow-hidden rounded-lg border border-[#E4E4E1] bg-white shadow-[0_10px_32px_rgba(17,17,16,0.06)]">
        <ArchiveMock interactive={false} />
      </div>
    </div>
  );
}

function ConnectedProductsVisual() {
  const products = [
    {
      name: "Website Publisher",
      detail: "Artwork pages and exhibitions",
      preview: (
        <div className="h-12 rounded-sm bg-[#F1F1EE] p-2">
          <div className="h-full w-8 bg-[#1B2A4A]" />
        </div>
      ),
    },
    {
      name: "Sales Assistant",
      detail: "Content and daily operations",
      preview: (
        <div className="space-y-1.5">
          <div className="h-2 w-4/5 rounded-full bg-[#D8D8D5]" />
          <div className="h-2 w-3/5 rounded-full bg-[#E8E8E6]" />
          <div className="h-2 w-2/5 rounded-full bg-[#E8E8E6]" />
        </div>
      ),
    },
    {
      name: "Private Selections",
      detail: "Private collector selections",
      preview: (
        <img
          src="/screenshot-viewingroom.jpg"
          alt=""
          aria-hidden="true"
          className="h-12 w-full rounded-sm object-cover object-top"
        />
      ),
    },
  ];

  return (
    <div className="flex h-full items-center justify-center bg-[#F8F8F6] p-5 md:p-8">
      <div className="w-full max-w-[720px] overflow-hidden rounded-lg border border-[#E4E4E1] bg-white shadow-[0_10px_32px_rgba(17,17,16,0.06)]">
        <div className="flex items-center justify-between border-b border-[#E8E8E6] px-6 py-5">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-md bg-[#111110] text-[12px] text-white">
              ◫
            </span>
            <div>
              <p className="text-[14px] font-medium text-[#111110]">Good Artworks</p>
              <p className="text-[9px] text-[#ADADAA]">One artwork source</p>
            </div>
          </div>
          <span className="inline-flex items-center gap-2 text-[9px] text-[#168044]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#28A864]" />
            Connected
          </span>
        </div>
        <div className="grid gap-3 p-5 md:grid-cols-3 md:p-6">
          {products.map((product) => (
            <div key={product.name} className="rounded-md border border-[#E8E8E6] p-4">
              <div className="h-12">{product.preview}</div>
              <p className="mt-5 text-[11px] font-medium text-[#111110]">{product.name}</p>
              <p className="mt-1 text-[9px] leading-[1.4] text-[#6B6A67]">{product.detail}</p>
              <p className="mt-4 text-[8px] text-[#168044]">Uses current artwork data</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ArtworkPanel({ phase, availability = false }: { phase: number; availability?: boolean }) {
  const reserved = availability && phase >= 3;

  return (
    <motion.div
      className="absolute bottom-4 right-4 top-4 z-20 w-[54%] overflow-hidden rounded-xl border border-[#E4E4E7] bg-white shadow-[0_20px_60px_rgba(17,17,16,0.14)]"
      initial={{ opacity: 0, x: 14 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 10 }}
      transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="flex items-center justify-between border-b border-[#E8E8E6] px-5 py-4">
        <div>
          <p className="text-[13px] font-medium text-[#111110]">Evening Field</p>
          <p className="mt-0.5 text-[9px] text-[#ADADAA]">Artwork · AR-0247</p>
        </div>
        <span
          className={`rounded-full px-2.5 py-1 text-[9px] ${
            reserved ? "bg-[#FFF7E6] text-[#9A6700]" : "bg-[#EFF8F1] text-[#168044]"
          }`}
        >
          {reserved ? "Reserved" : "Available"}
        </span>
      </div>
      <div className="grid h-[calc(100%-61px)] grid-cols-[0.8fr_1.2fr] gap-5 p-5">
        <div className="overflow-hidden rounded-md border border-[#E8E8E6]">
          <img
            src="/artworks/painting-01.png"
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="space-y-4">
          {[
            ["Price", "8 000 €"],
            ["Dimensions", "120 × 120 × 4 cm"],
            ["Documents", "Provenance.pdf"],
            ["Availability", reserved ? "Reserved" : "Available"],
          ].map(([label, value], index) => (
            <motion.div
              key={label}
              className="border-b border-[#EFEFED] pb-3"
              animate={{ opacity: phase >= index + 1 ? 1 : 0.18, y: 0 }}
              transition={{ duration: 0.35 }}
            >
              <p className="text-[8px] uppercase tracking-[0.1em] text-[#ADADAA]">{label}</p>
              <p
                className={`mt-1.5 text-[11px] ${
                  label === "Availability"
                    ? reserved
                      ? "text-[#9A6700]"
                      : "text-[#168044]"
                    : "text-[#111110]"
                }`}
              >
                {value}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
      {availability && phase === 2 ? (
        <motion.div
          className="absolute right-5 top-[145px] w-[150px] rounded-lg border border-[#E4E4E7] bg-white p-2 shadow-[0_14px_36px_rgba(17,17,16,0.14)]"
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="rounded-md px-3 py-2 text-[10px] text-[#168044]">Available</p>
          <p className="rounded-md bg-[#F7F7F5] px-3 py-2 text-[10px] text-[#9A6700]">Reserved</p>
        </motion.div>
      ) : null}
    </motion.div>
  );
}

function CompletionField({
  label,
  value,
  active,
  linked,
  className = "",
}: {
  label: string;
  value: string;
  active: boolean;
  linked?: boolean;
  className?: string;
}) {
  return (
    <div className={`min-w-0 ${className}`}>
      <p className="mb-0.5 text-[7px] font-medium text-zinc-600 sm:text-[8px]">{label}</p>
      <motion.div
        className="flex h-5 min-w-0 items-center gap-1 rounded-md border bg-white px-2 text-[8px] sm:h-6 sm:px-2.5 sm:text-[10px]"
        animate={{
          borderColor: active ? "#d4d4d8" : "#e4e4e7",
          color: active ? "#18181b" : "#d4d4d8",
        }}
        transition={{ duration: 0.35 }}
      >
        <motion.span className="min-w-0 truncate" animate={{ opacity: active ? 1 : 0.22 }}>
          {value}
        </motion.span>
        {linked && active ? (
          <motion.span
            className="ml-auto shrink-0 text-[8px] text-emerald-600"
            initial={{ opacity: 0, y: 3 }}
            animate={{ opacity: 1, y: 0 }}
          >
            ✓ Linked
          </motion.span>
        ) : active ? (
          <motion.span
            className="ml-auto shrink-0 text-[8px] text-emerald-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            ✓
          </motion.span>
        ) : null}
      </motion.div>
    </div>
  );
}

function ArtworkCompletionDemo({ phase }: { phase: number }) {
  const imageReady = phase >= 1;
  const published = phase >= 9;
  const usage = [
    ["Sacha Elron", "Artist page", 10],
    ["Selection — Sacha Elron", "Private", 11],
    ["Selection — Sacha Elron", "Marie Beaumont", 12],
  ] as const;

  return (
    <motion.div
      className="absolute inset-0 z-20 overflow-hidden bg-white sm:left-[22%]"
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 8 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="px-3 py-2 sm:px-5 sm:py-3">
        <div>
          <p className="hidden text-[8px] text-zinc-400 sm:block">← Artworks</p>
          <div className="flex items-start justify-between sm:mt-1">
            <div>
              <h3 className="text-[13px] font-medium text-zinc-900 sm:text-[14px]">
                Evening Field
              </h3>
              <p className="mt-0.5 text-[9px] text-zinc-500">Sacha Elron, 2023</p>
            </div>
            <span className="rounded-md border border-zinc-200 px-2 py-1 text-[8px] text-zinc-600">
              Create post
            </span>
          </div>
        </div>

        <div className="mt-1 flex items-center justify-between border-y border-zinc-200 py-1 sm:mt-2 sm:py-1.5">
          <div className="flex items-start gap-2">
            <motion.span
              className="mt-1 h-1.5 w-1.5 rounded-full"
              animate={{ backgroundColor: published ? "#10b981" : "#d4d4d8" }}
            />
            <div>
              <motion.p
                className="text-[9px] font-medium"
                animate={{ color: published ? "#18181b" : "#71717a" }}
              >
                {published ? "Published" : "Draft only"}
              </motion.p>
              <p className="mt-0.5 text-[8px] text-zinc-400">
                {published
                  ? "The public website is up to date"
                  : "Not visible on the public website"}
              </p>
            </div>
          </div>
          <span className="text-[8px] text-zinc-400">Website ↗</span>
        </div>

        <div className="mt-2 grid grid-cols-[minmax(0,1fr)_minmax(112px,.68fr)] gap-2 sm:mt-3 sm:grid-cols-[1fr_172px] sm:gap-4">
          <div className="grid min-w-0 grid-cols-2 gap-x-2 gap-y-1 sm:gap-x-3 sm:gap-y-1.5">
            <CompletionField
              label="Title"
              value="Evening Field"
              active={phase >= 2}
              className="col-span-2"
            />
            <CompletionField
              label="Artist"
              value="Sacha Elron"
              active={phase >= 3}
              linked
              className="col-span-2"
            />
            <CompletionField label="Year" value="2023" active={phase >= 4} />
            <CompletionField
              label="Medium"
              value="Acrylic on canvas"
              active={phase >= 5}
              className="col-span-2 sm:col-span-1"
            />
            <CompletionField
              label="Dimensions"
              value="120 × 120 × 4 cm"
              active={phase >= 6}
              className="col-span-2"
            />
            <div className="col-span-2">
              <p className="mb-0.5 text-[7px] font-medium text-zinc-600 sm:text-[8px]">Status</p>
              <div className="flex flex-wrap gap-1">
                {["Available", "Reserved", "Sold", "NFS", "Consignment", "On loan"].map(
                  (status) => {
                    const selected = status === "Available" && phase >= 7;

                    return (
                      <motion.span
                        key={status}
                        className="inline-flex h-4 items-center rounded-full border px-1.5 text-[6px] sm:h-5 sm:px-2 sm:text-[7px]"
                        animate={{
                          opacity: 1,
                          borderColor: selected ? "#18181b" : "#e4e4e7",
                          backgroundColor: selected ? "#18181b" : "#ffffff",
                          color: selected ? "#ffffff" : "#52525b",
                        }}
                        transition={{ duration: 0.35 }}
                      >
                        {status}
                      </motion.span>
                    );
                  }
                )}
              </div>
            </div>
            <CompletionField label="Price" value="EUR 8 000" active={phase >= 8} />
          </div>

          <div>
            <p className="mb-0.5 text-[7px] font-medium text-zinc-600 sm:text-[8px]">Main image</p>
            <motion.div
              className="aspect-[4/3] overflow-hidden rounded-lg border border-zinc-200 bg-zinc-50 sm:aspect-square"
              initial={false}
              animate={{ opacity: imageReady ? 1 : 0.16, scale: imageReady ? 1 : 0.985 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <img
                src="/artworks/painting-01.png"
                alt=""
                aria-hidden="true"
                className="h-full w-full object-cover"
              />
            </motion.div>

            <div className="mt-1.5 overflow-hidden rounded-lg border border-zinc-200 bg-white sm:mt-2">
              <div className="flex items-center justify-between border-b border-zinc-100 px-2.5 py-1.5">
                <p className="text-[9px] font-medium text-zinc-700">Used in</p>
                <span className="text-[8px] text-zinc-400">
                  {usage.filter(([, , threshold]) => phase >= threshold).length}
                </span>
              </div>
              {usage.map(([title, detail, threshold]) => (
                <motion.div
                  key={`${title}-${detail}`}
                  className="border-b border-zinc-100 px-2 py-1 last:border-b-0 sm:px-2.5 sm:py-1.5"
                  animate={{ opacity: phase >= threshold ? 1 : 0 }}
                  transition={{ duration: 0.35 }}
                >
                  <p className="truncate text-[9px] text-zinc-700">{title}</p>
                  <p className="mt-0.5 truncate text-[7px] text-zinc-400">{detail}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function SearchSession({ phase }: { phase: number }) {
  const soldSelected = phase >= 1;
  const soldRows = phase >= 2;
  const rows = soldRows
    ? [
        ["Amber Nocturne", "Sacha Elron", "2025", "14 000 €", "Sold", "/artworks/painting-10.jpg"],
        ["Crimson Field", "Sacha Elron", "2024", "9 500 €", "Sold", "/artworks/painting-08.jpg"],
      ]
    : [
        [
          "Sage Interval",
          "Sacha Elron",
          "2022",
          "6 500 €",
          "Available",
          "/artworks/painting-04.jpg",
        ],
        [
          "Evening field",
          "Sacha Elron",
          "2023",
          "10 000 €",
          "Available",
          "/artworks/painting-01.png",
        ],
        [
          "Dawn Study No. 7",
          "Sacha Elron",
          "2023",
          "6 000 €",
          "Available",
          "/artworks/painting-03.jpg",
        ],
        [
          "Untitled (Horizon)",
          "Sacha Elron",
          "2024",
          "8 000 €",
          "Available",
          "/artworks/painting-09.png",
        ],
      ];

  return (
    <motion.div
      className="absolute inset-0 z-20 overflow-hidden bg-white sm:left-[22%]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="px-3 py-3 sm:px-5 sm:py-4">
        <div>
          <h3 className="text-[13px] font-medium text-[#111110]">Artworks</h3>
          <p className="mt-0.5 text-[9.5px] text-[#6B6A67]">6 total · 4 available · 2 sold</p>
        </div>

        <div className="mt-3 flex h-7 items-center rounded-md border border-[#D8D8D5] px-3 text-[9px] text-[#111110] sm:mt-4 sm:h-8 sm:text-[10px]">
          <span className="mr-2 text-[#ADADAA]">⌕</span>
          <span>sacha Elron</span>
          <span className="ml-auto rounded border border-[#E4E4E7] px-1.5 py-0.5 text-[7px] text-[#ADADAA]">
            ⌘K
          </span>
        </div>

        <div className="scrollbar-none mt-2 flex items-center gap-1 overflow-x-auto pb-1">
          {["Available", "Reserved", "Sold", "Consignment", "On loan", "Not for sale"].map(
            (filter) => {
              const selected =
                (!soldSelected && filter === "Available") || (soldSelected && filter === "Sold");

              return (
                <motion.span
                  key={filter}
                  className="inline-flex h-5 items-center rounded-full border px-2 text-[7px]"
                  animate={{
                    borderColor: selected ? "#18181b" : "#e4e4e7",
                    backgroundColor: selected ? "#18181b" : "#ffffff",
                    color: selected ? "#ffffff" : "#52525b",
                    scale: phase === 1 && filter === "Sold" ? 0.98 : 1,
                  }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  {filter}
                </motion.span>
              );
            }
          )}
        </div>

        <div className="mt-3 flex items-center justify-between">
          <motion.p
            key={soldRows ? "sold-count" : "available-count"}
            className="text-[8px] text-[#ADADAA]"
            initial={{ opacity: 0, y: 3 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {soldRows ? "2 results · 6 total" : "4 results · 6 total"}
          </motion.p>
          <span className="text-[8px] text-[#ADADAA]">List view</span>
        </div>

        <div className="mt-2 overflow-hidden border-y border-[#E4E4E7]">
          <div className="grid grid-cols-[minmax(0,1fr)_42px_64px_58px] gap-x-2 border-b border-[#E4E4E7] bg-white px-2 py-2 text-center text-[8px] font-medium text-[#18181B] sm:grid-cols-[minmax(0,1.45fr)_minmax(0,.85fr)_48px_78px_68px] sm:gap-x-3 sm:px-3">
            <span className="text-left sm:text-center">Title</span>
            <span className="hidden sm:block">Artist</span>
            <span>Year</span>
            <span>Price</span>
            <span>Status</span>
          </div>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={soldRows ? "sold-rows" : "available-rows"}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: phase === 1 ? 0 : 1, y: phase === 1 ? 4 : 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              {rows.map(([title, artist, year, price, status, image]) => (
                <div
                  key={title}
                  className="grid h-11 grid-cols-[minmax(0,1fr)_42px_64px_58px] items-center gap-x-2 border-t border-[#EFEFED] px-2 text-[8px] text-[#111110] first:border-t-0 sm:h-12 sm:grid-cols-[minmax(0,1.45fr)_minmax(0,.85fr)_48px_78px_68px] sm:gap-x-3 sm:px-3 sm:text-[9px]"
                >
                  <div className="flex min-w-0 items-center gap-2">
                    <span className="h-7 w-7 shrink-0 overflow-hidden rounded-sm border border-[#E4E4E7] bg-[#F7F7F5]">
                      <img
                        src={image}
                        alt=""
                        aria-hidden="true"
                        className="h-full w-full object-cover"
                      />
                    </span>
                    <span className="truncate font-medium">{title}</span>
                  </div>
                  <span className="hidden truncate text-[#6B6A67] sm:block">{artist}</span>
                  <span className="text-center text-[#6B6A67]">{year}</span>
                  <span className="text-center">{price}</span>
                  <span
                    className={`w-fit justify-self-center rounded-full border px-2 py-0.5 text-[7px] ${
                      status === "Sold"
                        ? "border-[#D8D8D5] text-[#6B6A67]"
                        : "border-[#B8E4C8] bg-[#F0FBF4] text-[#168044]"
                    }`}
                  >
                    {status}
                  </span>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

function AvailabilitySession({ phase }: { phase: number }) {
  const reserved = phase >= 2;
  const availableFilter = phase < 4;
  const reservedFilter = phase >= 4;
  const targetVisible = phase < 3 || phase >= 5;
  const works = [
    {
      title: "Evening field",
      artist: "Sacha Elron",
      year: "2023",
      price: "10 000 €",
      image: "/artworks/painting-01.png",
      target: true,
    },
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
      title: "Sage Interval",
      artist: "Sacha Elron",
      year: "2022",
      price: "6 500 €",
      image: "/artworks/painting-04.jpg",
    },
    {
      title: "Solstice",
      artist: "Clémence Rivière",
      year: "2024",
      price: "14 000 €",
      image: "/artworks/painting-07.jpg",
    },
    {
      title: "Sun Dog",
      artist: "Sacha Elron",
      year: "2024",
      price: "12 000 €",
      image: "/artworks/painting-05.jpg",
    },
    {
      title: "Crimson Field",
      artist: "Sacha Elron",
      year: "2024",
      price: "9 500 €",
      image: "/artworks/painting-08.jpg",
    },
  ];
  const visibleWorks = reservedFilter
    ? works.filter((work) => work.target && targetVisible)
    : works.filter((work) => !work.target || targetVisible);

  return (
    <motion.div
      className="absolute inset-0 z-20 overflow-hidden bg-white sm:left-[22%]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="px-3 py-3 sm:px-5 sm:py-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-[13px] font-medium text-[#111110]">Artworks</h3>
            <motion.p
              key={reserved ? "reserved-count" : "available-count"}
              className="mt-0.5 text-[9.5px] text-[#6B6A67]"
              initial={{ opacity: 0, y: 3 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {reserved
                ? "7 total · 6 available · 1 reserved · 0 sold"
                : "7 total · 7 available · 0 sold"}
            </motion.p>
          </div>
          <span className="inline-flex items-center gap-1 rounded-md bg-[#18181B] px-2 py-1 text-[8px] text-white">
            <span className="text-[10px]">+</span> Add
          </span>
        </div>

        <div className="mt-3 flex h-7 items-center rounded-md border border-[#D8D8D5] px-3 text-[8px] text-[#ADADAA] sm:mt-4 sm:h-8 sm:text-[9px]">
          <span className="mr-2">⌕</span>
          Search title, artist, year, medium…
          <span className="ml-auto rounded border border-[#E4E4E7] px-1.5 py-0.5 text-[7px]">
            ⌘K
          </span>
        </div>

        <div className="scrollbar-none mt-2 flex items-center gap-1 overflow-x-auto pb-1">
          {["Available", "Reserved", "Sold", "Consignment", "On loan", "Not for sale"].map(
            (filter) => {
              const selected =
                (filter === "Available" && availableFilter) ||
                (filter === "Reserved" && reservedFilter);

              return (
                <motion.span
                  key={filter}
                  className="inline-flex h-5 items-center rounded-full border px-2 text-[7px]"
                  animate={{
                    borderColor: selected ? "#18181b" : "#e4e4e7",
                    backgroundColor: selected ? "#18181b" : "#ffffff",
                    color: selected ? "#ffffff" : "#52525b",
                    scale: phase === 4 && filter === "Reserved" ? 0.98 : 1,
                  }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  {filter}
                </motion.span>
              );
            }
          )}
        </div>

        <motion.p
          key={`${availableFilter ? "available" : "reserved"}-${visibleWorks.length}`}
          className="mt-3 text-[8px] text-[#ADADAA]"
          initial={{ opacity: 0, y: 3 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {visibleWorks.length} {visibleWorks.length === 1 ? "result" : "results"} · 7 total
        </motion.p>

        <motion.div
          className="scrollbar-none mt-2 flex gap-2 overflow-x-auto pb-2 sm:mt-3 sm:grid sm:grid-cols-4 sm:overflow-visible sm:pb-0"
          layout
        >
          <AnimatePresence initial={false}>
            {visibleWorks.slice(0, 8).map((work) => {
              const workReserved = work.target && reserved;

              return (
                <motion.div
                  layout
                  key={work.title}
                  className="relative min-w-[126px] overflow-visible rounded-md border border-[#E4E4E7] bg-white sm:min-w-0"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="h-[64px] overflow-hidden rounded-t-md bg-[#F7F7F5] sm:h-[82px]">
                    <img
                      src={work.image}
                      alt=""
                      aria-hidden="true"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="p-2">
                    <p className="truncate text-[7px] text-[#ADADAA]">{work.artist}</p>
                    <p className="truncate text-[9px] font-medium text-[#111110]">
                      {work.title}, <span className="font-normal text-[#ADADAA]">{work.year}</span>
                    </p>
                    <div className="mt-2 flex items-center justify-between gap-1">
                      <span className="text-[8px] text-[#6B6A67]">{work.price}</span>
                      <motion.span
                        className={`rounded-full border px-1.5 py-0.5 text-[7px] ${
                          workReserved
                            ? "border-[#F2D39B] bg-[#FFF7E6] text-[#9A6700]"
                            : "border-[#B8E4C8] bg-[#F0FBF4] text-[#168044]"
                        }`}
                        animate={{ scale: phase === 2 && work.target ? [1, 0.97, 1] : 1 }}
                        transition={{ duration: 0.35 }}
                      >
                        {workReserved ? "Reserved" : "Available"}
                      </motion.span>
                    </div>
                  </div>

                  {work.target && phase === 1 ? (
                    <motion.div
                      className="absolute bottom-8 right-1 z-30 w-[88px] rounded-md border border-[#E4E4E7] bg-white p-1 shadow-[0_10px_28px_rgba(17,17,16,0.16)]"
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -3 }}
                    >
                      <p className="rounded px-2 py-1 text-[7px] text-[#168044]">Available</p>
                      <p className="rounded bg-[#FFF7E6] px-2 py-1 text-[7px] text-[#9A6700]">
                        Reserved
                      </p>
                    </motion.div>
                  ) : null}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
}

export function GalleryOSContinuousDemo({ step }: { step: number }) {
  const [phase, setPhase] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    setPhase(0);
  }, [step]);

  useEffect(() => {
    if (reduceMotion) {
      setPhase(step === 0 ? 6 : step === 1 ? 12 : step === 2 ? 2 : 5);
      return;
    }

    if ((step === 0 && phase === 6) || (step === 1 && phase === 12) || (step === 2 && phase === 2))
      return;

    const phaseCounts = [7, 13, 3, 6];
    const phaseDurations = [
      [1400, 1500, 1800, 900, 1400, 220],
      [650, 450, 450, 450, 400, 400, 450, 450, 450, 500, 400, 400],
      [3000, 600],
      [1300, 1000, 900, 900, 900, 1800],
    ];
    const duration = phaseDurations[step][phase] ?? 1100;
    const timeout = window.setTimeout(
      () => setPhase((current) => (current + 1) % phaseCounts[step]),
      duration
    );

    return () => window.clearTimeout(timeout);
  }, [phase, reduceMotion, step]);

  const importDialogVisible = step === 0 && phase > 0 && phase <= 6;
  const headerActions =
    step === 0 ? (
      <div className="flex items-center gap-1.5">
        <motion.span
          className="inline-flex items-center gap-1 rounded-md border border-zinc-200 bg-white px-2 py-1 text-[9px] font-medium text-zinc-700"
          animate={phase === 0 ? { scale: [1, 1, 0.98, 1] } : { scale: 1 }}
          transition={
            phase === 0
              ? { duration: 1.05, times: [0, 0.7, 0.86, 1], ease: "easeOut" }
              : { duration: 0 }
          }
        >
          <svg
            width="10"
            height="10"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M12 3v12" />
            <path d="m7 8 5-5 5 5" />
            <path d="M5 14v4a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4" />
          </svg>
          Import a CSV
        </motion.span>
        <span className="inline-flex items-center gap-1 rounded-md bg-zinc-900 px-2 py-1 text-[9px] font-medium text-white">
          <span className="text-[11px] leading-none">+</span>
          Add
        </span>
      </div>
    ) : undefined;

  return (
    <div className="relative h-full overflow-hidden bg-white">
      <div className="absolute inset-0">
        <ArchiveMock interactive={false} headerActions={headerActions} />
      </div>

      <AnimatePresence>
        {importDialogVisible ? (
          <>
            <motion.div
              key="import-backdrop"
              className="absolute inset-0 z-10 bg-[#111110]/30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
            <motion.div
              key="import-dialog"
              className="absolute inset-x-3 bottom-3 top-3 z-20 overflow-hidden rounded-[14px] border border-[#E4E4E7] bg-white shadow-[0_22px_70px_rgba(17,17,16,0.2)] sm:inset-x-[21%] sm:bottom-20 sm:top-20 sm:rounded-[16px]"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
            >
              <AnimatePresence initial={false}>
                <motion.div
                  key={phase === 1 ? "drop" : phase === 6 ? "success" : "progress"}
                  className="absolute inset-0"
                  initial={reduceMotion ? false : { opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -4 }}
                  transition={{ duration: reduceMotion ? 0 : 0.32, ease: [0.16, 1, 0.3, 1] }}
                >
                  <InventoryImportDemo phase={Math.min(phase - 1, 5)} />
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </>
        ) : null}

        {step === 1 && phase > 0 ? (
          <ArtworkCompletionDemo key="artwork-completion" phase={phase} />
        ) : null}
        {step === 2 ? <SearchSession key="search" phase={phase} /> : null}
        {step === 3 ? <AvailabilitySession key="availability" phase={phase} /> : null}
      </AnimatePresence>
    </div>
  );
}

export default function ArtworkScrollStory() {
  return (
    <div className="-mt-10 md:-mt-16">
      <ScrollStory
        title="Built for everyday gallery work"
        subtitle="Every artwork, ready when it matters."
        hideHeader
        steps={STEPS}
        renderVisual={(index) => <GalleryOSContinuousDemo step={index} />}
        compactMobileVisual
      />
    </div>
  );
}
