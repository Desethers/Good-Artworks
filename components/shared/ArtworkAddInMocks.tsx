"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function FileSpreadsheetIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" />
      <path d="M14 2v5a1 1 0 0 0 1 1h5" />
      <path d="M8 13h2" />
      <path d="M14 13h2" />
      <path d="M8 17h2" />
      <path d="M14 17h2" />
    </svg>
  );
}

function ChevronRightIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

function DatabaseIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <ellipse cx="12" cy="5" rx="8" ry="3" />
      <path d="M4 5v6c0 1.66 3.58 3 8 3s8-1.34 8-3V5" />
      <path d="M4 11v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" />
    </svg>
  );
}

function PencilIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
      <path d="m15 5 4 4" />
    </svg>
  );
}

const CONNECT_OPTIONS = [
  {
    icon: FileSpreadsheetIcon,
    title: "Import a file",
    badge: { label: "Recommended", bg: "bg-[#ECFDF5]", text: "text-[#047857]" },
    text: "CSV or Excel — bring your whole inventory at once",
  },
  {
    icon: DatabaseIcon,
    title: "Connect Artlogic",
    badge: { label: "Beta", bg: "bg-[#F5F3FF]", text: "text-[#6D28D9]" },
    text: "Sync automatically from your Artlogic database",
  },
  {
    icon: PencilIcon,
    title: "Add manually",
    badge: null,
    text: "Create your first work one field at a time",
  },
] as const;

export function ConnectInventoryMockup({
  activeTitle = null,
  pressed = false,
}: {
  /** Title of the option row to render as hovered (black border). */
  activeTitle?: string | null;
  /** Applies a brief press/tap scale to the active row. */
  pressed?: boolean;
}) {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-[16px] border border-[#E4E4E7] bg-white p-6">
      <h3 className="text-[14px] font-semibold text-[#18181B]">Connect your inventory</h3>
      <p className="mt-1 text-[11px] text-[#3F3F46]">
        Choose how to bring your works into Good Artworks
      </p>

      <div className="mt-4 flex flex-1 flex-col justify-between gap-2.5">
        {CONNECT_OPTIONS.map((option) => {
          const isActive = option.title === activeTitle;
          return (
            <div
              key={option.title}
              className={`flex items-center gap-3 rounded-[10px] border px-3.5 py-3 transition-[border-color,transform] duration-300 ease-out ${
                isActive ? "border-[#111110]" : "border-[#E4E4E7]"
              } ${isActive && pressed ? "scale-[0.97]" : "scale-100"}`}
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#FAFAFA] text-[#71717A]">
                <option.icon size={16} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex flex-wrap items-center gap-2">
                  <span className="whitespace-nowrap text-[13px] font-semibold text-[#18181B]">
                    {option.title}
                  </span>
                  {option.badge && (
                    <span
                      className={`rounded ${option.badge.bg} px-1.5 py-0.5 text-[9px] font-medium ${option.badge.text}`}
                    >
                      {option.badge.label}
                    </span>
                  )}
                </span>
                <span className="mt-0.5 block text-[11px] text-[#71717A]">{option.text}</span>
              </span>
              <span className="shrink-0 text-[#D4D4D8]">
                <ChevronRightIcon size={16} />
              </span>
            </div>
          );
        })}
      </div>

      <p className="mt-4 text-center text-[11px] text-[#A1A1AA]">I&rsquo;ll do this later</p>
    </div>
  );
}

export function GalleryOsSearchWidget({
  insertLabel = "Insert an artwork",
  searchLabel = "Search Good Artworks",
  searchCta = "Search",
  galleryViewCta = "Gallery view",
}: {
  insertLabel?: string;
  searchLabel?: string;
  searchCta?: string;
  galleryViewCta?: string;
}) {
  return (
    <div className="mx-auto w-full max-w-[266px] overflow-hidden rounded-[8px] border border-[#E8E8E6] bg-white">
      <div className="bg-[#424242] px-4 py-3 text-[12px] font-semibold text-white">
        Good Artworks
      </div>
      <div className="space-y-1 px-4 pt-4">
        <p className="text-[12px] text-[#111110]">{insertLabel}</p>
        <p className="text-[12px] text-[#6B6A67]">{searchLabel}</p>
      </div>
      <div className="mt-4 border-t border-[#E8E8E6] px-4 py-4">
        <div className="rounded-[4px] border border-[#6B6A67] px-4 py-2.5 text-[12px] text-[#111110]">
          Sacha Elron
        </div>
        <div className="mt-4 flex gap-2">
          <span className="rounded-full bg-[#0059D8] px-5 py-1.5 text-[11px] text-white">
            {searchCta}
          </span>
          <span className="rounded-full border border-[#6B6A67] px-5 py-1.5 text-[11px] text-[#0059D8]">
            {galleryViewCta}
          </span>
        </div>
      </div>
    </div>
  );
}

export function WhatsAppPdfMockup({
  incomingLabel = "Building your selection...",
  readyLabel = "Selection ready · 1 page",
}: {
  incomingLabel?: string;
  readyLabel?: string;
}) {
  return (
    <div
      className="relative mx-auto h-[230px] w-[262px]"
      style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif' }}
    >
      <div className="absolute right-0 top-2 h-[30px] w-[103px]">
        <img
          src="/mockups/whatsapp-figma/outgoing-shape.svg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full"
        />
        <div className="relative z-10 flex h-full items-center gap-2 px-3">
          <span className="text-[14px] text-black">/pdf</span>
          <span className="ml-auto text-[9px] text-black/30">11:43</span>
        </div>
      </div>

      <div className="absolute left-[5px] top-[53px] h-[44px] w-[250px]">
        <img
          src="/mockups/whatsapp-figma/incoming-shape.svg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full -scale-x-100"
        />
        <p className="absolute left-2 top-[7px] z-10 text-[14px] text-black">{incomingLabel}</p>
        <p className="absolute bottom-1 right-2 z-10 text-[9px] text-black/30">11:45</p>
      </div>

      <div className="absolute left-[-8px] top-[102px] h-[107px] w-[263px]">
        <img
          src="/mockups/whatsapp-figma/pdf-shape.svg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full -scale-x-100"
        />
        <div className="absolute left-[17px] top-[3px] z-10 flex h-[74px] w-[242px] gap-3 rounded-[7px] bg-[#F3F0F0] px-3 py-3">
          <span className="flex h-6 w-5 shrink-0 items-center justify-center bg-[#D90B2B] text-[6px] font-bold text-white">
            PDF
          </span>
          <div>
            <p className="text-[14px] leading-4 text-black">
              spring_selection_2026_
              <br />
              Marie_Beaumont.pdf
            </p>
            <p className="mt-1 text-[10px] text-black/40">2.8 MB · PDF</p>
          </div>
        </div>
        <p className="absolute bottom-[7px] left-[17px] z-10 text-[11px] text-black">
          {readyLabel}
        </p>
      </div>
    </div>
  );
}

const ease = [0.16, 1, 0.3, 1] as const;

const chatMessage = (delay: number, duration = 0.5) => ({
  initial: { opacity: 0, y: 12, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  transition: { duration, ease, delay },
});

const pdfMessageDelay = 4.4;
const pdfTypingDuration = 2;
const buildingMessageDelay = 5.0;
const pdfCardDelay = buildingMessageDelay + 2;
const scrollDuration = 8.0;
/** Pause held on the finished PDF card before the whole sequence remounts and replays. */
const loopPauseSeconds = 1.4;
const loopCycleSeconds = scrollDuration + loopPauseSeconds;

const captionRevealDelay = 0.3;
const captionRevealDuration = 0.55;
/** Kept in sync so message 2 arrives right after the caption sweeps into view. */
const captionSentDelay = captionRevealDelay + captionRevealDuration + 0.2;

/** Reveals the artwork caption with a left-to-right wipe, like a mask sliding off. */
function TypedCaption() {
  return (
    <p className="absolute left-[11px] right-[20px] top-[138px] overflow-hidden text-[12.5px] leading-[1.32] tracking-[-0.3px] text-black">
      <motion.span
        initial={{ clipPath: "inset(0 100% 0 0)" }}
        animate={{ clipPath: "inset(0 0% 0 0)" }}
        transition={{ duration: captionRevealDuration, delay: captionRevealDelay, ease }}
        className="block"
      >
        Sacha Elron - Evening Field - 2026 -
        <br />
        Acrylic on canvas - 180 × 180 cm -
        <br />
        $10,000
      </motion.span>
    </p>
  );
}

/*
 * Réplique du node Figma 526:2471 (WhatsApp Chat) — mêmes bulles (queues
 * incluses), photo d'œuvre, double-check bleu et carte PDF, exportés du
 * fichier Good Artworks vers /mockups/whatsapp-figma-v2. La barre de saisie garde
 * le contexte mobile et anime la commande juste avant son envoi.
 */
const WA = "/mockups/whatsapp-figma-v2";

function WhatsAppReadCheck({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 16 10" fill="none" className={className} aria-hidden="true">
      <path
        d="m.6 5.1 2.6 2.6L8 1.1M5.1 6.4l1.4 1.3 4.8-6.6"
        stroke="#3497F9"
        strokeWidth="1.35"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function WhatsAppShareWorksMock() {
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => setCycle((c) => c + 1), loopCycleSeconds * 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="flex h-full w-full items-center justify-center overflow-hidden bg-[#F5F5F3] px-4 md:px-6"
    >
      <div key={cycle} className="flex h-full w-full max-w-[420px] flex-col pb-6 md:pb-8">
        <div className="flex min-h-0 flex-1 items-center justify-center overflow-hidden py-2">
          <div className="w-[340px] origin-center scale-[0.8] md:w-[400px] md:scale-[0.92]">
            <motion.div
              initial={{ y: 120 }}
              animate={{ y: [120, 120, 120, -95, -95] }}
              transition={{
                duration: scrollDuration,
                times: [0, 0.2, 0.36, 0.69, 1],
                ease,
              }}
              className="flex flex-col gap-[6px]"
            >
              {/* 1 — Outgoing: artwork photo, already on screen — the caption types itself in. */}
              <div className="relative h-[208px] w-[280px] self-end">
                <img
                  src={`${WA}/shape-incoming1b.svg`}
                  alt=""
                  className="absolute inset-0 h-full w-full"
                />
                <img
                  src={`${WA}/artwork-photo.png`}
                  alt=""
                  className="absolute left-[4px] top-[3px] h-[128px] w-[260px] rounded-[6px] object-cover"
                />
                <TypedCaption />
                <p className="absolute bottom-[9px] right-[27px] text-[9px] tracking-[0.5px] text-black/25">
                  10:15
                </p>
                <WhatsAppReadCheck className="absolute bottom-[10px] right-[9px] h-[8px] w-[14px]" />
              </div>

              {/* 2 — Incoming: added to selection */}
              <motion.div
                {...chatMessage(captionSentDelay)}
                className="relative h-[50px] w-[276px] self-start"
              >
                <img
                  src={`${WA}/shape-incoming2b.svg`}
                  alt=""
                  className="absolute inset-0 h-full w-full -scale-x-100"
                />
                <p className="absolute left-[16px] top-[7px] text-[12.5px] leading-[1.3] tracking-[-0.3px] text-black">
                  Received. &ldquo;Evening Field&rdquo; added
                  <br />
                  to your selection
                </p>
                <p className="absolute bottom-[5px] right-[13px] text-[9px] tracking-[0.5px] text-black/25">
                  11:40
                </p>
              </motion.div>

              {/* 3 — Outgoing: /pdf command */}
              <motion.div
                {...chatMessage(pdfMessageDelay, 0.25)}
                className="relative h-[30px] w-[102px] self-end"
              >
                <img
                  src={`${WA}/shape-outgoing2.svg`}
                  alt=""
                  className="absolute inset-0 h-full w-full"
                />
                <p className="absolute left-[10px] top-[7px] text-[12.5px] leading-none tracking-[-0.3px] text-black">
                  /pdf
                </p>
                <p className="absolute bottom-[8px] right-[26px] text-[8px] tracking-[0.5px] text-black/25">
                  11:43
                </p>
                <WhatsAppReadCheck className="absolute bottom-[8px] right-[10px] h-[7px] w-[12px]" />
              </motion.div>

              {/* 4 — Incoming: building the selection */}
              <motion.div
                {...chatMessage(buildingMessageDelay)}
                className="relative h-[41px] w-[255px] self-start"
              >
                <img
                  src={`${WA}/shape-incoming3.svg`}
                  alt=""
                  className="absolute inset-0 h-full w-full -scale-x-100"
                />
                <p className="absolute left-[16px] top-[9px] text-[12.5px] leading-none tracking-[-0.3px] text-black">
                  Building your selection…
                </p>
                <p className="absolute bottom-[6px] right-[13px] text-[9px] tracking-[0.5px] text-black/25">
                  11:45
                </p>
              </motion.div>

              {/* 5 — Incoming: PDF ready */}
              <motion.div
                {...chatMessage(pdfCardDelay)}
                className="relative h-[107px] w-[262px] self-start"
              >
                <img
                  src={`${WA}/add-plus.svg`}
                  alt=""
                  className="absolute inset-0 h-full w-full -scale-x-100"
                />
                <div className="absolute left-[17px] top-[3px] h-[74px] w-[242px] rounded-[7px] bg-[#F3F0F0]">
                  <img
                    src={`${WA}/pdf-thumb.png`}
                    alt=""
                    className="absolute left-[14px] top-[13px] h-[24px] w-[20px] object-cover"
                  />
                  <p className="absolute left-[42px] top-[9px] text-[12.5px] leading-[1.3] tracking-[-0.3px] text-black">
                    spring_selection_2026_
                    <br />
                    Marie_Beaumont.pdf
                  </p>
                  <p className="absolute bottom-[8px] left-[42px] text-[9px] tracking-[0.1px] text-black/40">
                    2.8 MB · PDF
                  </p>
                </div>
                <p className="absolute bottom-[9px] left-[17px] text-[10px] tracking-[-0.3px] text-black">
                  Selection ready · 1 page
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>

        <div className="shrink-0 bg-transparent py-2 md:py-2.5">
          <div className="mx-auto flex w-[300px] items-center md:w-[340px]">
            <div className="flex h-8 min-w-0 flex-1 items-center rounded-full border border-[#D8D8DE] bg-white px-3 md:h-9">
              <span className="relative block h-[1.25em] overflow-hidden whitespace-nowrap text-[10px] text-[#8E8E93] md:text-[11px]">
                <motion.span
                  initial={{ opacity: 1 }}
                  animate={{ opacity: [1, 1, 0, 0, 1] }}
                  transition={{
                    duration: pdfTypingDuration,
                    delay: pdfMessageDelay - pdfTypingDuration,
                    times: [0, 0.08, 0.16, 0.84, 1],
                    ease: "easeInOut",
                  }}
                >
                  Message
                </motion.span>
                <motion.span
                  initial={{ width: "0ch", opacity: 0 }}
                  animate={{
                    width: ["0ch", "0ch", "4ch", "4ch", "0ch"],
                    opacity: [0, 0, 1, 1, 0],
                  }}
                  transition={{
                    duration: pdfTypingDuration,
                    delay: pdfMessageDelay - pdfTypingDuration,
                    times: [0, 0.08, 0.54, 0.76, 1],
                    ease: "easeInOut",
                  }}
                  className="absolute left-0 top-0 overflow-hidden whitespace-nowrap bg-white font-medium text-[#111110]"
                >
                  /pdf
                </motion.span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
