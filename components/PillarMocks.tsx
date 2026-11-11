"use client";

import { motion } from "framer-motion";
import { FileIcon } from "@/components/icons/FileIcon";
import { AppIcon } from "@/components/icons/AppIcon";
import {
  SAMPLE_COLLECTOR,
  SAMPLE_INVENTORY,
  SAMPLE_REFERENCE_ARTWORK,
} from "@/lib/mocks/sampleData";

const ease = [0.16, 1, 0.3, 1] as const;

/* Local thin aliases — keep call-sites short. */
const FilePdf = () => <FileIcon kind="pdf" />;
const FileXlsx = () => <FileIcon kind="xlsx" />;
const FileDoc = () => <FileIcon kind="doc" />;

function CheckDot() {
  return (
    <div className="flex h-[14px] w-[14px] flex-shrink-0 items-center justify-center rounded-full bg-[#111110]">
      <svg
        width="8"
        height="8"
        viewBox="0 0 12 12"
        fill="none"
        stroke="white"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 6.5 5 8.5 9 4" />
      </svg>
    </div>
  );
}
function PendingDot() {
  return (
    <div className="flex h-[14px] w-[14px] flex-shrink-0 items-center justify-center rounded-full border border-[#E8E8E6] bg-white">
      <span className="block h-[3px] w-[3px] rounded-full bg-[#ADADAA]" />
    </div>
  );
}

function ChevronDown({ muted = false }: { muted?: boolean }) {
  return (
    <svg
      width="7"
      height="7"
      viewBox="0 0 12 12"
      fill="none"
      stroke={muted ? "#ADADAA" : "#6B6A67"}
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 5 L6 8 L9 5" />
    </svg>
  );
}
function FolderClosed() {
  return (
    <svg
      width="11"
      height="8"
      viewBox="0 0 16 12"
      fill="#C8C7C2"
      stroke="#A8A7A2"
      strokeWidth="0.4"
    >
      <path d="M1 3.5 V10 a1 1 0 0 0 1 1 h12 a1 1 0 0 0 1-1 V5 a1 1 0 0 0-1-1 H7 L5.5 2.5 a1 1 0 0 0-.7-.3 H2 a1 1 0 0 0-1 1 Z" />
    </svg>
  );
}

function AuditMock() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease }}
      className="relative h-full w-full overflow-hidden rounded-lg bg-white"
    >
      {/* ── Blurred color orb (gives the glass something to frost) ── */}
      <div className="pointer-events-none absolute -left-10 top-6 h-40 w-40 rounded-full bg-[#9DB4D8] opacity-40 blur-3xl" />
      {/* ── Background: folder tree (gallery's real file system) — glass card ── */}
      <div className="absolute inset-0 px-6 pt-5 pb-6">
        <div className="rounded-xl border border-white/60 bg-white/55 px-5 py-4 backdrop-blur-md">
          <div className="flex flex-col gap-[11px]">
            {/* Document header */}
            <div className="flex items-center gap-2.5 border-b border-[#E8E8E6] pb-3">
              <span className="block h-[9px] w-[9px] rounded-[3px] border border-[#ADADAA]" />
              <span className="text-[13px] font-medium text-[#111110]">Document</span>
              <svg
                width="9"
                height="9"
                viewBox="0 0 12 12"
                fill="none"
                stroke="#6B6A67"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 3 v6 m-3 -3 3 3 3 -3" />
              </svg>
            </div>
            {/* Folder 1 */}
            <div className="flex items-center gap-2.5">
              <svg
                width="9"
                height="9"
                viewBox="0 0 12 12"
                fill="none"
                stroke="#6B6A67"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 5 L6 8 L9 5" />
              </svg>
              <svg
                width="15"
                height="11"
                viewBox="0 0 16 12"
                fill="#C8C7C2"
                stroke="#A8A7A2"
                strokeWidth="0.4"
              >
                <path d="M1 3.5 V10 a1 1 0 0 0 1 1 h12 a1 1 0 0 0 1-1 V5 a1 1 0 0 0-1-1 H7 L5.5 2.5 a1 1 0 0 0-.7-.3 H2 a1 1 0 0 0-1 1 Z" />
              </svg>
              <span className="text-[13px] font-medium text-[#111110]">
                {SAMPLE_INVENTORY.rootFolder}
              </span>
              <span className="text-[13px] text-[#ADADAA]">· 42 files</span>
            </div>
            {/* Subfolder */}
            <div className="flex items-center gap-2.5 pl-7">
              <svg
                width="9"
                height="9"
                viewBox="0 0 12 12"
                fill="none"
                stroke="#6B6A67"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 5 L6 8 L9 5" />
              </svg>
              <svg
                width="15"
                height="11"
                viewBox="0 0 16 12"
                fill="#C8C7C2"
                stroke="#A8A7A2"
                strokeWidth="0.4"
              >
                <path d="M1 3.5 V10 a1 1 0 0 0 1 1 h12 a1 1 0 0 0 1-1 V5 a1 1 0 0 0-1-1 H7 L5.5 2.5 a1 1 0 0 0-.7-.3 H2 a1 1 0 0 0-1 1 Z" />
              </svg>
              <span className="text-[13px] font-medium text-[#111110]">
                {SAMPLE_INVENTORY.artistFolder}
              </span>
              <span className="text-[13px] text-[#ADADAA]">· 6 files</span>
            </div>
            {/* Files inside */}
            <div className="flex items-center gap-2.5 pl-16">
              <FilePdf />
              <span className="text-[12.5px] text-[#111110]">
                {SAMPLE_INVENTORY.filenames.provenance}
              </span>
            </div>
            <div className="flex items-center gap-2.5 pl-16">
              <FileXlsx />
              <span className="text-[12.5px] text-[#111110]">
                {SAMPLE_INVENTORY.filenames.inventory}
              </span>
            </div>
            <div className="flex items-center gap-2.5 pl-16">
              <FileDoc />
              <span className="text-[12.5px] text-[#111110]">
                {SAMPLE_INVENTORY.filenames.collectorNotes}
              </span>
            </div>
            <div className="flex items-center gap-2.5 pl-16">
              <FilePdf />
              <span className="text-[12.5px] text-[#111110]">
                {SAMPLE_INVENTORY.filenames.exhibition}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Foreground: macOS Finder window — gallery's artwork .jpeg files ── */}
      <div className="absolute" style={{ top: 168, right: 28, width: 320 }}>
        <div className="overflow-hidden rounded-[10px] border border-[#E2E2DF] bg-white">
          {/* Title bar — traffic lights + folder name */}
          <div className="relative flex items-center border-b border-[#EFEFEC] bg-[#FBFBFA] px-3.5 py-2.5">
            <div className="flex items-center gap-[6px]">
              <span className="h-[11px] w-[11px] rounded-full bg-[#FF5F57]" />
              <span className="h-[11px] w-[11px] rounded-full bg-[#FEBC2E]" />
              <span className="h-[11px] w-[11px] rounded-full bg-[#28C840]" />
            </div>
            <span className="absolute left-1/2 -translate-x-1/2 text-[11.5px] font-medium text-[#6B6A67]">
              {SAMPLE_INVENTORY.artistFolder}
            </span>
          </div>

          {/* Thumbnail grid */}
          <div className="grid grid-cols-3 gap-3 px-3.5 py-3.5">
            {[
              "/artworks/painting-03.jpg",
              "/artworks/painting-04.jpg",
              "/artworks/painting-05.jpg",
              "/artworks/painting-07.jpg",
              "/artworks/painting-08.jpg",
              "/artworks/painting-10.jpg",
            ].map((src, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <div className="aspect-square w-full overflow-hidden rounded-[5px] bg-[#F0F0EE]">
                  <img src={src} alt="" aria-hidden="true" className="h-full w-full object-cover" />
                </div>
                <span className="w-full truncate text-center text-[8.5px] text-[#ADADAA]">
                  IMG_{8841 + i}.jpeg
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Step 02 — Connect & build ─── */
// Scale 2× : pre-scale width = 50%, post-scale fills 100% of container
/* ─── Step 02 — Connect & build (orbit of existing gallery tools) ─── */

const stepTwoLogos = [
  { src: "/logos/icon-gmail-96.png", alt: "Gmail" },
  { src: "/logos/Microsoft_Office_Outlook_Logo.svg", alt: "Outlook" },
  { src: "/logos/pdf-svgrepo-com.svg", alt: "PDF" },
  { src: "/logos/Microsoft_Office_Excel_Logo.svg", alt: "Excel" },
  { src: "/logos/Digital_Stacked_Green_RGB_2026.svg", alt: "WhatsApp" },
];

function StepTwoSharingFlow() {
  const [gmail, outlook, pdf, excel, whatsApp] = stepTwoLogos;
  const green = { src: "/logos/Microsoft_Office_Word_Logo.svg", alt: "Word" };
  const notion = { src: "/logos/Symbol.svg", alt: "Notion" };

  // A ring of the gallery's existing tools — each icon in its own rounded
  // square, evenly spaced around a circle.
  const W = 200,
    H = 200;
  const cx = W / 2,
    cy = H / 2;
  const R = 78; // orbit radius

  const orbit = [gmail, outlook, excel, green, notion, whatsApp, pdf];
  const n = orbit.length;
  const nodes = orbit.map((ic, i) => {
    const a = (-90 + (360 / n) * i) * (Math.PI / 180); // start at top, clockwise
    return {
      ...ic,
      x: cx + R * Math.cos(a),
      y: cy + R * Math.sin(a),
    };
  });

  return (
    <div className="relative" style={{ width: W, height: H }}>
      {/* Icon nodes — each in a rounded square */}
      {nodes.map((nde, i) => (
        <div
          key={`node-${i}`}
          className="absolute flex h-[34px] w-[34px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[9px] bg-white shadow-[0_3px_8px_rgba(17,17,16,0.07)]"
          style={{
            left: `${(nde.x / W) * 100}%`,
            top: `${(nde.y / H) * 100}%`,
            border: "0.5px solid #EFEFEC",
          }}
        >
          <img
            src={nde.src}
            alt={nde.alt}
            className="h-[18px] w-[18px] object-contain"
            loading="lazy"
          />
        </div>
      ))}
    </div>
  );
}

function ConnectMock() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.38, ease }}
      className="flex h-full w-full items-start justify-center overflow-hidden rounded-lg bg-white"
    >
      <div
        style={{
          transform: "scale(1.95)",
          transformOrigin: "top center",
        }}
      >
        <StepTwoSharingFlow />
      </div>
    </motion.div>
  );
}

/* ─── Step 03 — Deploy ─── */
/* One continuous collector interaction across email + WhatsApp + calendar:
   request → PDF selection generated → follow-up scheduled. */

const hairline: React.CSSProperties = { border: "0.5px solid #EFEFEB" };

/* App icons (Outlook / WhatsApp / Calendar) come from @/components/icons/AppIcon */
const AppOutlook = () => <AppIcon brand="outlook" />;
const AppWhatsapp = () => <AppIcon brand="whatsapp" />;
const AppCalendar = () => <AppIcon brand="calendar" />;

const darkSurface: React.CSSProperties = {
  border: "0.5px solid rgba(255,255,255,0.08)",
  background: "#18181A",
};

function DeployPill({
  label,
  time,
  app,
  tone,
}: {
  label: string;
  time: string;
  app: "outlook" | "whatsapp" | "calendar";
  tone: "blue" | "green" | "amber";
}) {
  const dotColor = {
    blue: "#4EA3FF",
    green: "#36D37E",
    amber: "#F2C94C",
  }[tone];

  return (
    <div
      className="flex items-center justify-between rounded-[3px] py-[5px] pl-[5px] pr-1"
      style={darkSurface}
    >
      <span className="flex min-w-0 items-center gap-1 text-[5px] leading-none text-white">
        <span
          className="h-[3px] w-[3px] shrink-0 rounded-full"
          style={{ backgroundColor: dotColor, boxShadow: `0 0 0 1.5px ${dotColor}24` }}
          aria-hidden="true"
        />
        <span className="truncate">{label}</span>
      </span>
      <div className="flex items-center gap-1.5">
        <span className="text-[4px] leading-none tabular-nums text-white/45">{time}</span>
        {app === "outlook" && <AppOutlook />}
        {app === "whatsapp" && <AppWhatsapp />}
        {app === "calendar" && <AppCalendar />}
      </div>
    </div>
  );
}

function DeployJourney() {
  return (
    <div className="flex flex-col">
      {/* Main request card — Outlook-style layout (icon · sender · time / divider / body) */}
      <div
        className="flex min-h-[102px] w-[78%] flex-col rounded-[4px] bg-white px-1.5 py-1.5"
        style={hairline}
      >
        {/* Header row */}
        <div className="flex items-start gap-1.5 pb-0.5">
          {/* Outlook avatar */}
          <div className="flex h-[12px] w-[12px] flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-white">
            <AppOutlook />
          </div>
          <div className="flex flex-1 flex-col leading-tight">
            <div className="flex items-baseline justify-between">
              <span className="text-[5.5px] font-semibold text-[#111110]">
                {SAMPLE_COLLECTOR.name}
              </span>
              <span className="text-[4px] text-[#ADADAA]">
                {SAMPLE_COLLECTOR.contactDay} {SAMPLE_COLLECTOR.contactTime}
              </span>
            </div>
            <span className="text-[4.5px] text-[#ADADAA]">{SAMPLE_COLLECTOR.recipient}</span>
          </div>
        </div>

        {/* Divider */}
        <div className="my-1.5 h-px w-full bg-[#E8E8E6]" />

        {/* Body */}
        <div className="flex flex-1 flex-col justify-between">
          <div>
            <p className="text-[5px] leading-[1.55] text-[#111110]">
              Could we have the {SAMPLE_REFERENCE_ARTWORK.artist}{" "}
              <em className="italic">{SAMPLE_REFERENCE_ARTWORK.title}</em> selection ahead of
              Tuesday’s preview? Please include:
            </p>
            <ul className="mt-[4px] flex flex-col gap-[1.5px]">
              <li className="text-[5px] leading-[1.45] text-[#111110]">— 6 high-res images</li>
              <li className="text-[5px] leading-[1.45] text-[#111110]">— Provenance documents</li>
              <li className="text-[5px] leading-[1.45] text-[#111110]">
                — Auction comparables (2018–24)
              </li>
            </ul>
          </div>
          <div className="mt-2 flex items-center gap-1 border-t border-[#F1F1ED] pt-1.5">
            <span className="h-[4px] w-[28px] rounded-full bg-[#E8E8E6]" />
            <span className="h-[4px] w-[18px] rounded-full bg-[#F1F1ED]" />
          </div>
        </div>
      </div>

      {/* Reply-thread connector + indented dark pill stack */}
      <div className="relative -mt-4 pl-1">
        {/* Stacked pills */}
        <div className="relative" style={{ height: 23 + 2 * 18 }}>
          {[
            {
              label: "Selection requested",
              time: "14:32",
              app: "outlook" as const,
              tone: "blue" as const,
            },
            {
              label: "PDF selection generated",
              time: "14:38",
              app: "whatsapp" as const,
              tone: "green" as const,
            },
            {
              label: "Follow-up scheduled",
              time: "Mon · 09:00",
              app: "calendar" as const,
              tone: "amber" as const,
            },
          ].map((p, i, arr) => (
            <div
              key={p.label}
              className="absolute"
              style={{
                top: i * 18,
                left: i * 5,
                right: 40 + i * 8,
                zIndex: arr.length - i,
                transform: `scale(${1 - i * 0.025})`,
                transformOrigin: "top center",
              }}
            >
              <DeployPill label={p.label} time={p.time} app={p.app} tone={p.tone} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DeployMock() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.38, ease }}
      className="flex h-full w-full flex-col items-center justify-start overflow-hidden rounded-lg bg-white"
    >
      <div
        style={{
          width: "38%",
          transform: "scale(2.5)",
          transformOrigin: "top center",
        }}
      >
        <DeployJourney />
      </div>
    </motion.div>
  );
}

/* ─── Pillars config ─── */
export const PILLARS = [
  {
    number: "01",
    title: "Audit",
    desc: "We review how artworks and information already move across the gallery.",
    Mock: AuditMock,
  },
  {
    number: "02",
    title: "Connect & build",
    desc: "Good Artworks connects artwork files, selections and collector communication into one flow.",
    Mock: ConnectMock,
  },
  {
    number: "03",
    title: "Deploy",
    desc: "Operational infrastructure installed around your existing gallery environment.",
    Mock: DeployMock,
  },
];
