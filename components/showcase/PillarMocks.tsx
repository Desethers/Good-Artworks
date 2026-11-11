"use client";

import React, { useState } from "react";

/* ──────────────────────────────────────────────────────────────────────
 * Mockups statiques du dashboard Gallery OS — 4 piliers Good Artworks.
 * Visuels calqués sur le vrai produit (palette zinc, lucide-style icons,
 * typo/density identiques à app.galleryos / dashboard).
 * ────────────────────────────────────────────────────────────────────── */

const STROKE = 1.75;

const Icon = {
  Stack: (p: { size?: number; className?: string }) => (
    <svg
      width={p.size ?? 12}
      height={p.size ?? 12}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={p.className}
    >
      <path d="M12 2 2 7l10 5 10-5-10-5z" />
      <path d="m2 17 10 5 10-5" />
      <path d="m2 12 10 5 10-5" />
    </svg>
  ),
  Grid: (p: { size?: number; className?: string }) => (
    <svg
      width={p.size ?? 13}
      height={p.size ?? 13}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={STROKE}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={p.className}
    >
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
    </svg>
  ),
  Image: (p: { size?: number; className?: string }) => (
    <svg
      width={p.size ?? 13}
      height={p.size ?? 13}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={STROKE}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={p.className}
    >
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="9" cy="9" r="2" />
      <path d="m21 15-5-5L5 21" />
    </svg>
  ),
  Users: (p: { size?: number; className?: string }) => (
    <svg
      width={p.size ?? 13}
      height={p.size ?? 13}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={STROKE}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={p.className}
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  Calendar: (p: { size?: number; className?: string }) => (
    <svg
      width={p.size ?? 13}
      height={p.size ?? 13}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={STROKE}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={p.className}
    >
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  ),
  Message: (p: { size?: number; className?: string }) => (
    <svg
      width={p.size ?? 13}
      height={p.size ?? 13}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={STROKE}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={p.className}
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
  Mail: (p: { size?: number; className?: string }) => (
    <svg
      width={p.size ?? 13}
      height={p.size ?? 13}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={STROKE}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={p.className}
    >
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <path d="m2 7 10 6 10-6" />
    </svg>
  ),
  Folder: (p: { size?: number; className?: string }) => (
    <svg
      width={p.size ?? 13}
      height={p.size ?? 13}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={STROKE}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={p.className}
    >
      <path d="M20 19a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2z" />
    </svg>
  ),
  UserSquare: (p: { size?: number; className?: string }) => (
    <svg
      width={p.size ?? 13}
      height={p.size ?? 13}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={STROKE}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={p.className}
    >
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="12" cy="10" r="3" />
      <path d="M7 21v-2a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v2" />
    </svg>
  ),
  Wrench: (p: { size?: number; className?: string }) => (
    <svg
      width={p.size ?? 13}
      height={p.size ?? 13}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={STROKE}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={p.className}
    >
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  ),
  Search: (p: { size?: number; className?: string }) => (
    <svg
      width={p.size ?? 14}
      height={p.size ?? 14}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={STROKE}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={p.className}
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  ),
  Bell: (p: { size?: number; className?: string }) => (
    <svg
      width={p.size ?? 14}
      height={p.size ?? 14}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={STROKE}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={p.className}
    >
      <path d="M10.3 21a2 2 0 0 0 3.4 0" />
      <path d="M4 17h16" />
      <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
    </svg>
  ),
  Plus: (p: { size?: number; className?: string }) => (
    <svg
      width={p.size ?? 12}
      height={p.size ?? 12}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={p.className}
    >
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  ),
  List: (p: { size?: number; className?: string }) => (
    <svg
      width={p.size ?? 13}
      height={p.size ?? 13}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={STROKE}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={p.className}
    >
      <line x1="8" y1="6" x2="21" y2="6" />
      <line x1="8" y1="12" x2="21" y2="12" />
      <line x1="8" y1="18" x2="21" y2="18" />
      <line x1="3" y1="6" x2="3.01" y2="6" />
      <line x1="3" y1="12" x2="3.01" y2="12" />
      <line x1="3" y1="18" x2="3.01" y2="18" />
    </svg>
  ),
  ArrowUp: (p: { size?: number; className?: string }) => (
    <svg
      width={p.size ?? 14}
      height={p.size ?? 14}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={p.className}
    >
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  ),
  Eye: (p: { size?: number; className?: string }) => (
    <svg
      width={p.size ?? 12}
      height={p.size ?? 12}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={STROKE}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={p.className}
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  Pencil: (p: { size?: number; className?: string }) => (
    <svg
      width={p.size ?? 12}
      height={p.size ?? 12}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={STROKE}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={p.className}
    >
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  ),
  Copy: (p: { size?: number; className?: string }) => (
    <svg
      width={p.size ?? 12}
      height={p.size ?? 12}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={STROKE}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={p.className}
    >
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  ),
  Bot: (p: { size?: number; className?: string }) => (
    <svg
      width={p.size ?? 22}
      height={p.size ?? 22}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={STROKE}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={p.className}
    >
      <rect x="3" y="8" width="18" height="12" rx="2" />
      <path d="M12 4v4" />
      <circle cx="9" cy="14" r="1" />
      <circle cx="15" cy="14" r="1" />
      <path d="M9 19h6" />
    </svg>
  ),
  Whatsapp: (p: { size?: number; className?: string }) => (
    <svg
      width={p.size ?? 22}
      height={p.size ?? 22}
      viewBox="0 0 32 32"
      fill="currentColor"
      className={p.className}
      aria-hidden
    >
      <path d="M16.003 3C8.82 3 3 8.82 3 16c0 2.293.602 4.534 1.745 6.508L3 29l6.66-1.74A12.94 12.94 0 0 0 16.003 29C23.18 29 29 23.18 29 16S23.18 3 16.003 3Zm0 23.69c-1.96 0-3.882-.526-5.563-1.523l-.398-.236-3.95 1.032 1.053-3.85-.26-.41A10.66 10.66 0 0 1 5.31 16c0-5.89 4.79-10.685 10.693-10.685S26.696 10.11 26.696 16s-4.79 10.69-10.693 10.69Zm6.142-7.99c-.337-.17-1.99-.98-2.298-1.09-.308-.113-.532-.17-.755.168-.224.337-.866 1.09-1.062 1.314-.196.225-.39.252-.726.084-.337-.168-1.422-.524-2.708-1.67-1-.892-1.677-1.99-1.872-2.328-.196-.337-.02-.519.148-.687.152-.151.337-.39.504-.589.169-.196.224-.337.337-.561.112-.225.056-.421-.028-.59-.084-.168-.756-1.823-1.036-2.494-.273-.654-.55-.566-.756-.576l-.645-.012c-.224 0-.59.084-.9.421-.309.337-1.18 1.153-1.18 2.812 0 1.66 1.209 3.265 1.378 3.49.169.225 2.38 3.633 5.766 5.092.805.348 1.434.555 1.924.71.808.257 1.543.22 2.124.134.648-.097 1.99-.812 2.272-1.598.28-.785.28-1.458.196-1.598-.084-.14-.308-.224-.645-.392Z" />
    </svg>
  ),
  Gmail: (p: { size?: number; className?: string }) => (
    <svg
      width={p.size ?? 22}
      height={p.size ?? 22}
      viewBox="0 0 32 32"
      fill="currentColor"
      className={p.className}
      aria-hidden
    >
      <path d="M4 8.5C4 7.12 5.12 6 6.5 6h1L16 13.2 24.5 6h1A2.5 2.5 0 0 1 28 8.5V24a2 2 0 0 1-2 2h-3V13.6L16 19.5 9 13.6V26H6a2 2 0 0 1-2-2V8.5Z" />
    </svg>
  ),
  Outlook: (p: { size?: number; className?: string }) => (
    <svg
      width={p.size ?? 22}
      height={p.size ?? 22}
      viewBox="0 0 32 32"
      fill="currentColor"
      className={p.className}
      aria-hidden
    >
      <path d="M11 6.5C11 5.67 11.67 5 12.5 5h14C27.33 5 28 5.67 28 6.5V25.5c0 .83-.67 1.5-1.5 1.5h-14a1.5 1.5 0 0 1-1.5-1.5V24H17v-2h-6V10h6V8h-6V6.5ZM4 8.5l13-2v19l-13-2v-15Zm6.5 11.5c1.66 0 3-1.79 3-4s-1.34-4-3-4-3 1.79-3 4 1.34 4 3 4Zm0-1.6c-.83 0-1.5-1.07-1.5-2.4s.67-2.4 1.5-2.4S12 14.67 12 16s-.67 2.4-1.5 2.4Z" />
    </svg>
  ),
  Globe: (p: { size?: number; className?: string }) => (
    <svg
      width={p.size ?? 22}
      height={p.size ?? 22}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={STROKE}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={p.className}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20" />
    </svg>
  ),
};

/* ─── Sidebar Gallery OS (reproduit fidèlement) ─────────────────────── */

type NavId =
  | "overview"
  | "artworks"
  | "artists"
  | "exhibitions"
  | "website"
  | "inquiries"
  | "salesDrafts"
  | "selection"
  | "collectors"
  | "tools";

const NAV: {
  id: NavId;
  label: string;
  icon: (p: { size?: number; className?: string }) => React.JSX.Element;
  badge?: number;
}[] = [
  { id: "overview", label: "Overview", icon: Icon.Grid },
  { id: "artworks", label: "Artworks", icon: Icon.Image },
  { id: "artists", label: "Artists", icon: Icon.Users },
  { id: "exhibitions", label: "Exhibitions", icon: Icon.Calendar },
  { id: "website", label: "Website", icon: Icon.Globe },
  { id: "inquiries", label: "Inquiries", icon: Icon.Message },
  { id: "salesDrafts", label: "Sales drafts", icon: Icon.Mail, badge: 2 },
  { id: "selection", label: "Private Selection", icon: Icon.Folder },
  { id: "collectors", label: "Collectors", icon: Icon.UserSquare },
  { id: "tools", label: "Tools", icon: Icon.Wrench },
];

export function GalleryOsSidebar({
  active,
  onSelect,
}: {
  active: NavId;
  onSelect?: (id: NavId) => void;
}) {
  return (
    <aside
      className="hidden shrink-0 flex-col border-r border-zinc-200 bg-white md:flex"
      style={{ width: "22%" }}
    >
      {/* Logo */}
      <div className="px-3 py-4">
        <div className="flex items-center gap-1.5">
          <div className="flex h-4 w-4 items-center justify-center rounded bg-zinc-900 text-white">
            <Icon.Stack size={8} />
          </div>
          <span className="flex-1 text-[10px] font-semibold tracking-tight text-zinc-900">
            Good Artworks
          </span>
          <Icon.Search size={9} className="text-zinc-500" />
          <Icon.Bell size={9} className="text-zinc-500" />
        </div>
      </div>
      {/* Nav */}
      <nav className="flex-1 px-1.5 py-2 flex flex-col gap-[1px] overflow-hidden">
        {NAV.map((it) => {
          const isActive = it.id === active;
          const I = it.icon;
          return (
            <div
              key={it.id}
              onClick={() => onSelect?.(it.id)}
              className={`flex items-center gap-1.5 px-1.5 py-[5px] rounded-[5px] text-[9px] transition-colors ${
                isActive
                  ? "bg-zinc-100 text-zinc-900 font-medium"
                  : onSelect
                    ? "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 cursor-pointer"
                    : "text-zinc-700"
              }`}
            >
              <I size={10} className={isActive ? "text-zinc-900" : "text-zinc-500"} />
              <span className="flex-1 truncate">{it.label}</span>
              {it.badge != null && (
                <span className="min-w-[12px] h-[12px] px-1 rounded-full bg-emerald-600 text-white text-[7px] font-semibold flex items-center justify-center">
                  {it.badge}
                </span>
              )}
            </div>
          );
        })}
      </nav>
      {/* Footer */}
      <div className="flex items-center justify-between px-3 py-3">
        <p className="text-[7.5px] text-zinc-400">Sign out</p>
        <p className="text-[7.5px] text-zinc-300">© Good Artworks</p>
      </div>
    </aside>
  );
}

export function PageHeader({
  title,
  sub,
  action,
}: {
  title: string;
  sub: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-3 px-4 md:px-5 pt-4 pb-3">
      <div className="min-w-0">
        <div className="text-[13px] md:text-[14px] font-medium text-zinc-900 tracking-tight truncate">
          {title}
        </div>
        <p className="text-[9.5px] text-zinc-700 mt-0.5">{sub}</p>
      </div>
      {action}
    </div>
  );
}

function PrimaryButton({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-md bg-zinc-900 text-white text-[9px] font-medium px-2 py-1">
      {children}
    </span>
  );
}

/* ──────────────────────────────────────────────────────────────────────
 * Pilier 1 — Artworks & Archives  →  Page /dashboard/artworks (vue liste)
 * ────────────────────────────────────────────────────────────────────── */

const ARTWORK_ROWS: {
  title: string;
  year: string;
  artist: string;
  price: string;
  status: "available" | "reserved" | "sold";
  bg: string;
  image?: string;
}[] = [
  {
    title: "Evening field",
    year: "2023",
    artist: "Sacha Elron",
    price: "8 000 €",
    status: "available",
    bg: "linear-gradient(135deg,#1B2A4A 0%,#0F1A33 100%)",
    image: "/artworks/painting-01.png",
  },
  {
    title: "Dawn Study No. 7",
    year: "2023",
    artist: "Sacha Elron",
    price: "6 000 €",
    status: "available",
    bg: "linear-gradient(135deg,#C8D2EE 0%,#9FAEDB 100%)",
    image: "/artworks/painting-03.jpg",
  },
  {
    title: "Untitled (Horizon)",
    year: "2024",
    artist: "Sacha Elron",
    price: "8 000 €",
    status: "available",
    bg: "linear-gradient(135deg,#E8D34A 0%,#B49E2D 100%)",
    image: "/artworks/painting-09.png",
  },
  {
    title: "Sun Dog",
    year: "2024",
    artist: "Sacha Elron",
    price: "12 000 €",
    status: "reserved",
    bg: "linear-gradient(135deg,#7A1F18 0%,#4B100B 100%)",
    image: "/artworks/painting-05.jpg",
  },
  {
    title: "Solstice",
    year: "2024",
    artist: "Clémence Rivière",
    price: "14 000 €",
    status: "available",
    bg: "linear-gradient(135deg,#D4A574 0%,#A07A4A 100%)",
    image: "/artworks/painting-07.jpg",
  },
  {
    title: "Sage Interval",
    year: "2022",
    artist: "Sacha Elron",
    price: "6 500 €",
    status: "available",
    bg: "linear-gradient(135deg,#7E9A74 0%,#4F6B47 100%)",
    image: "/artworks/painting-08.jpg",
  },
  {
    title: "Amber Nocturne",
    year: "2025",
    artist: "Sacha Elron",
    price: "14 000 €",
    status: "sold",
    bg: "linear-gradient(135deg,#C98A2E 0%,#7A4A12 100%)",
    image: "/artworks/painting-04.jpg",
  },
  {
    title: "Blue hour",
    year: "2022",
    artist: "Sacha Elron",
    price: "9 500 €",
    status: "sold",
    bg: "linear-gradient(135deg,#1B2A4A 0%,#0F1A33 100%)",
    image: "/artworks/painting-02.png",
  },
  {
    title: "Low tide",
    year: "2021",
    artist: "Mara Velt",
    price: "6 200 €",
    status: "available",
    bg: "linear-gradient(135deg,#C8D2EE 0%,#9FAEDB 100%)",
    image: "/artworks/painting-06.png",
  },
  {
    title: "Study in ochre",
    year: "2024",
    artist: "Lina Ores",
    price: "3 900 €",
    status: "available",
    bg: "linear-gradient(135deg,#D4A574 0%,#A07A4A 100%)",
    image: "/artworks/painting-10.jpg",
  },
];

const STATUS_PILLS = [
  "Available",
  "Reserved",
  "Sold",
  "Consignment",
  "On loan",
  "Not for sale",
  "Withdrawn",
];

function StatusBadge({ s }: { s: "available" | "reserved" | "sold" }) {
  if (s === "available")
    return (
      <span className="inline-flex items-center rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 px-1.5 py-[1px] text-[7.5px] font-medium">
        Available
      </span>
    );
  if (s === "reserved")
    return (
      <span className="inline-flex items-center rounded-full bg-amber-50 text-amber-700 border border-amber-100 px-1.5 py-[1px] text-[7.5px] font-medium">
        Reserved
      </span>
    );
  return (
    <span className="inline-flex items-center rounded-full bg-zinc-100 text-zinc-600 border border-zinc-200 px-1.5 py-[1px] text-[7.5px] font-medium">
      Sold
    </span>
  );
}

/** The inventory's own navigation, as in the current Gallery OS: four sections, no app sidebar. */
const INVENTORY_NAV: {
  label: string;
  icon: (p: { size?: number; className?: string }) => React.JSX.Element;
}[] = [
  { label: "Artworks", icon: Icon.Image },
  { label: "Artists", icon: Icon.Users },
  { label: "Collectors", icon: Icon.UserSquare },
  { label: "Exhibitions", icon: Icon.Calendar },
];

function UploadIcon({ size = 12 }: { size?: number }) {
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
      <path d="M12 16V4" />
      <path d="m7 9 5-5 5 5" />
      <path d="M5 20h14" />
    </svg>
  );
}

/** Status pill sized for the inventory screen (the shared StatusBadge is for the smaller mocks). */
function ArtworkStatusBadge({ s }: { s: "available" | "reserved" | "sold" }) {
  const tone =
    s === "available"
      ? "border-emerald-100 bg-emerald-50 text-emerald-700"
      : s === "reserved"
        ? "border-amber-100 bg-amber-50 text-amber-700"
        : "border-zinc-200 bg-zinc-100 text-zinc-600";
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-[1px] text-[10px] font-medium ${tone}`}
    >
      {s === "available" ? "Available" : s === "reserved" ? "Reserved" : "Sold"}
    </span>
  );
}

/** The Artworks screen of the Gallery OS inventory, shown small: header card, filters, then the list. */
export function ArchiveMock({
  interactive = false,
  headerActions,
}: {
  interactive?: boolean;
  headerActions?: React.ReactNode;
}) {
  const [activeFilter, setActiveFilter] = useState("");
  const [query, setQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [selected, setSelected] = useState<string | null>(null);

  const filterToStatus: Record<string, "available" | "reserved" | "sold" | null> = {
    Available: "available",
    Reserved: "reserved",
    Sold: "sold",
  };

  const visibleArtworks = interactive
    ? ARTWORK_ROWS.filter((a) => {
        const statusMatch = filterToStatus[activeFilter];
        const matchesStatus = statusMatch == null || a.status === statusMatch;
        const matchesQuery =
          !query ||
          a.title.toLowerCase().includes(query.toLowerCase()) ||
          a.artist.toLowerCase().includes(query.toLowerCase());
        return matchesStatus && matchesQuery;
      })
    : ARTWORK_ROWS;

  const total = ARTWORK_ROWS.length;
  const available = ARTWORK_ROWS.filter((a) => a.status === "available").length;
  const sold = ARTWORK_ROWS.filter((a) => a.status === "sold").length;
  const resultLabel = `${visibleArtworks.length} result${visibleArtworks.length !== 1 ? "s" : ""}`;

  return (
    <div
      className={`flex h-full w-full overflow-hidden bg-white font-sans ${!interactive ? "pointer-events-none" : ""}`}
    >
      {/* Local navigation of the inventory */}
      <aside className="hidden w-[18%] shrink-0 px-2 pt-5 md:block">
        <nav className="flex flex-col gap-[2px]">
          {INVENTORY_NAV.map((it, i) => {
            const I = it.icon;
            const isActive = i === 0;
            return (
              <div
                key={it.label}
                className={`flex items-center gap-1.5 rounded-md px-2 py-[6px] text-[12px] ${
                  isActive ? "bg-zinc-100 font-semibold text-zinc-900" : "text-zinc-600"
                }`}
              >
                <I size={13} className={isActive ? "text-zinc-900" : "text-zinc-400"} />
                {it.label}
              </div>
            );
          })}
        </nav>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden px-3 pt-4 md:px-4">
        {/* Header card */}
        <div className="shrink-0 rounded-t-xl bg-zinc-50/80 px-3 pb-3 pt-3 md:px-4">
          <div className="flex flex-wrap items-start justify-between gap-x-3 gap-y-2">
            <div className="min-w-0 basis-40 flex-1">
              <h3 className="text-[22px] font-medium tracking-tight text-zinc-950">Artworks</h3>
              <p className="mt-1 text-[11px] text-zinc-500">
                The works behind your conversations and selections.
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-1.5">
              {headerActions ?? (
                <>
                  <span
                    className={`inline-flex items-center gap-1 rounded-md bg-zinc-900 px-2 py-1 text-[11px] font-medium text-white ${interactive ? "cursor-pointer transition-colors hover:bg-zinc-700" : ""}`}
                  >
                    <Icon.Plus size={11} />
                    Add artwork
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-md border border-zinc-200 bg-white px-2 py-1 text-[11px] font-medium text-zinc-800">
                    <UploadIcon size={11} />
                    Import a CSV
                  </span>
                </>
              )}
            </div>
          </div>
          <p className="mt-3 text-[10px] text-zinc-500">
            {total} total · {available} available · {sold} sold
          </p>

          <div className="relative mt-2.5 max-w-[78%]">
            <Icon.Search
              size={12}
              className="absolute left-2 top-1/2 -translate-y-1/2 text-zinc-400"
            />
            {interactive ? (
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Filter artworks in this view…"
                className="w-full rounded-lg border border-zinc-200 bg-white py-1.5 pl-6 pr-2 text-[11px] text-zinc-900 placeholder-zinc-400 outline-none focus:border-zinc-400"
              />
            ) : (
              <div className="w-full rounded-lg border border-zinc-200 bg-white py-1.5 pl-6 pr-2 text-[11px] text-zinc-400">
                Filter artworks in this view…
              </div>
            )}
          </div>

          <div className="mt-2 flex flex-wrap items-center gap-1">
            {STATUS_PILLS.map((p) => {
              const isActive = interactive ? p === activeFilter : false;
              return (
                <span
                  key={p}
                  onClick={() => interactive && setActiveFilter(p)}
                  className={`rounded-full border px-1.5 py-[1px] text-[10px] transition-colors ${
                    isActive
                      ? "border-zinc-900 bg-zinc-900 text-white"
                      : interactive
                        ? "cursor-pointer border-zinc-200 bg-white text-zinc-700 hover:border-zinc-400"
                        : "border-zinc-200 bg-white text-zinc-700"
                  }`}
                >
                  {p}
                </span>
              );
            })}
            <span className="rounded-full border border-zinc-200 bg-white px-1.5 py-[1px] text-[10px] text-zinc-700">
              Artists <span className="ml-0.5 text-zinc-400">⌄</span>
            </span>
          </div>

          <div className="mt-2 flex items-center justify-between">
            <p className="text-[10px] text-zinc-400">{resultLabel}</p>
            <div className="inline-flex overflow-hidden rounded-md border border-zinc-200">
              <span
                onClick={() => interactive && setViewMode("grid")}
                className={`px-1.5 py-[2px] transition-colors ${
                  viewMode === "grid"
                    ? "bg-zinc-900 text-white"
                    : interactive
                      ? "cursor-pointer bg-white text-zinc-500 hover:bg-zinc-50"
                      : "bg-white text-zinc-500"
                }`}
              >
                <Icon.Grid size={12} />
              </span>
              <span
                onClick={() => interactive && setViewMode("list")}
                className={`border-l border-zinc-200 px-1.5 py-[2px] transition-colors ${
                  viewMode === "list"
                    ? "bg-zinc-900 text-white"
                    : interactive
                      ? "cursor-pointer bg-white text-zinc-500 hover:bg-zinc-50"
                      : "bg-white text-zinc-500"
                }`}
              >
                <Icon.List size={12} />
              </span>
            </div>
          </div>
        </div>

        {/* Works */}
        <div className={`min-h-0 flex-1 ${interactive ? "overflow-y-auto" : "overflow-hidden"}`}>
          {visibleArtworks.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-1.5 text-center">
              <p className="text-[12px] text-zinc-400">No artwork matches the filters.</p>
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-4 gap-2 pt-3">
              {visibleArtworks.map((a) => {
                const isSelected = selected === a.title;
                return (
                  <div
                    key={a.title}
                    onClick={() => interactive && setSelected(isSelected ? null : a.title)}
                    className={`overflow-hidden rounded-md border bg-white transition-all ${
                      interactive ? "cursor-pointer" : ""
                    } ${isSelected ? "border-zinc-900 ring-1 ring-zinc-900" : "border-zinc-200 hover:border-zinc-400"}`}
                  >
                    <div
                      className="aspect-square w-full overflow-hidden"
                      style={{ background: a.bg }}
                    >
                      {a.image ? (
                        <img
                          src={a.image}
                          alt=""
                          aria-hidden="true"
                          className="h-full w-full object-cover"
                        />
                      ) : null}
                    </div>
                    <div className="p-1.5 leading-tight">
                      <p className="truncate text-[10px] text-zinc-400">{a.artist}</p>
                      <p className="truncate text-[11.5px] font-medium text-zinc-900">
                        {a.title}
                        <span className="font-normal text-zinc-400">, {a.year}</span>
                      </p>
                      <div className="mt-1 flex items-center justify-between gap-1">
                        <span className="truncate text-[10px] tabular-nums text-zinc-700">
                          {a.price}
                        </span>
                        <ArtworkStatusBadge s={a.status} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div>
              <div className="grid grid-cols-[2fr_0.9fr_0.9fr] md:grid-cols-[2fr_1.3fr_0.6fr_0.9fr_0.9fr] items-center gap-2 border-b border-zinc-200 px-2 py-2 text-left text-[10px] font-medium text-zinc-800">
                <span>Title</span>
                <span className="hidden md:block">Artist</span>
                <span className="hidden text-right md:block">Year</span>
                <span className="text-right">Price</span>
                <span>Status</span>
              </div>
              {visibleArtworks.map((a) => {
                const isSelected = selected === a.title;
                return (
                  <div
                    key={a.title}
                    onClick={() => interactive && setSelected(isSelected ? null : a.title)}
                    className={`grid grid-cols-[2fr_0.9fr_0.9fr] md:grid-cols-[2fr_1.3fr_0.6fr_0.9fr_0.9fr] items-center gap-2 border-b border-zinc-100 px-2 py-1.5 transition-colors ${
                      interactive ? "cursor-pointer" : ""
                    } ${isSelected ? "bg-zinc-50" : "hover:bg-zinc-50/60"}`}
                  >
                    <div className="flex min-w-0 items-center gap-2">
                      <div
                        className="h-7 w-7 shrink-0 overflow-hidden rounded"
                        style={{ background: a.bg }}
                      >
                        {a.image ? (
                          <img
                            src={a.image}
                            alt=""
                            aria-hidden="true"
                            className="h-full w-full object-cover"
                          />
                        ) : null}
                      </div>
                      <span className="truncate text-[11px] font-medium text-zinc-900">
                        {a.title}
                      </span>
                    </div>
                    <span className="hidden truncate text-[11px] text-zinc-600 md:block">
                      {a.artist}
                    </span>
                    <span className="hidden text-right text-[11px] tabular-nums text-zinc-500 md:block">
                      {a.year}
                    </span>
                    <span className="text-right text-[11px] tabular-nums text-zinc-800">
                      {a.price}
                    </span>
                    <span>
                      <ArtworkStatusBadge s={a.status} />
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────
 * Pilier 2 — Public & Private Publishing  →  Page /dashboard/viewing-rooms
 * ────────────────────────────────────────────────────────────────────── */

const ROOMS: {
  title: string;
  recipient: string;
  expires: string;
  views: number;
  works: number;
  inquiries: number;
  status: "active" | "expired" | "draft";
}[] = [
  {
    title: "Sélection Printemps 2026",
    recipient: "Marc Durand",
    expires: "12 avr. 26",
    views: 14,
    works: 4,
    inquiries: 2,
    status: "active",
  },
  {
    title: "Frieze NY — preview",
    recipient: "Sophie Veil",
    expires: "28 mar. 26",
    views: 7,
    works: 9,
    inquiries: 1,
    status: "active",
  },
  {
    title: "Castellanos · works on paper",
    recipient: "James Howell",
    expires: "3 mar. 26",
    views: 22,
    works: 6,
    inquiries: 0,
    status: "expired",
  },
  {
    title: "Mehler — studio visit",
    recipient: "Inès Moreau",
    expires: "30 avr. 26",
    views: 3,
    works: 5,
    inquiries: 0,
    status: "active",
  },
  {
    title: "Élron — full set",
    recipient: "Carlos Bento",
    expires: "—",
    views: 0,
    works: 12,
    inquiries: 0,
    status: "draft",
  },
];

function RoomBadge({ s }: { s: "active" | "expired" | "draft" }) {
  if (s === "active")
    return (
      <span className="inline-flex items-center rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 px-1.5 py-[1px] text-[7px] font-medium">
        Active
      </span>
    );
  if (s === "expired")
    return (
      <span className="inline-flex items-center rounded-full bg-zinc-100 text-zinc-500 border border-zinc-200 px-1.5 py-[1px] text-[7px] font-medium">
        Expirée
      </span>
    );
  return (
    <span className="inline-flex items-center rounded-full bg-amber-50 text-amber-700 border border-amber-100 px-1.5 py-[1px] text-[7px] font-medium">
      Brouillon
    </span>
  );
}

export function PublishingMock() {
  return (
    <div className="w-full h-full bg-white font-sans flex overflow-hidden pointer-events-none">
      <GalleryOsSidebar active="selection" />

      <div className="flex-1 flex flex-col overflow-hidden">
        <PageHeader
          title="Private Selection"
          sub="38 au total · 24 actives · 6 expirées"
          action={
            <PrimaryButton>
              <Icon.Plus size={9} />
              Nouvelle sélection
            </PrimaryButton>
          }
        />

        <div className="flex-1 overflow-hidden px-4 md:px-5 pb-4">
          <div className="rounded-md border border-zinc-200 overflow-hidden">
            {/* Head */}
            <div className="grid grid-cols-[1.6fr_70px_44px_44px_50px_50px] gap-2 px-2.5 py-1.5 border-b border-zinc-100 bg-zinc-50/60">
              {["Titre / Destinataire", "Expire", "Vues", "Œuvres", "Inquiries", ""].map((h) => (
                <p
                  key={h}
                  className="text-[7.5px] font-medium text-zinc-700 uppercase tracking-wider"
                >
                  {h}
                </p>
              ))}
            </div>
            {/* Rows */}
            <div className="divide-y divide-zinc-100">
              {ROOMS.map((r) => (
                <div
                  key={r.title}
                  className="grid grid-cols-[1.6fr_70px_44px_44px_50px_50px] gap-2 items-center px-2.5 py-2"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <p className="text-[9px] font-medium text-zinc-900 truncate">{r.title}</p>
                      <RoomBadge s={r.status} />
                    </div>
                    <p className="text-[7.5px] text-zinc-400 mt-0.5 truncate">→ {r.recipient}</p>
                  </div>
                  <p
                    className={`text-[8.5px] ${r.status === "expired" ? "text-red-400" : "text-zinc-700"}`}
                  >
                    {r.expires}
                  </p>
                  <div className="flex items-center gap-1">
                    <Icon.Eye size={8} className="text-zinc-300" />
                    <span className="text-[8.5px] tabular-nums text-zinc-700">{r.views}</span>
                  </div>
                  <p className="text-[8.5px] tabular-nums text-zinc-700">{r.works}</p>
                  <p
                    className={`text-[8.5px] tabular-nums font-medium ${r.inquiries > 0 ? "text-zinc-900" : "text-zinc-300"}`}
                  >
                    {r.inquiries}
                  </p>
                  <div className="flex items-center gap-1 justify-end text-zinc-500">
                    <Icon.Copy size={9} />
                    <Icon.Pencil size={9} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────
 * Pilier 3 — Collector Relationships  →  Page /dashboard/collectors
 * ────────────────────────────────────────────────────────────────────── */

const COLLECTORS = [
  {
    firstName: "Marc",
    lastName: "Durand",
    email: "marc.durand@collection.fr",
    inquiries: 7,
    vip: true,
  },
  { firstName: "Sophie", lastName: "Veil", email: "sophie@veil-art.com", inquiries: 4, vip: true },
  {
    firstName: "James",
    lastName: "Howell",
    email: "j.howell@howellcollection.co.uk",
    inquiries: 12,
    vip: false,
  },
  { firstName: "Inès", lastName: "Moreau", email: "ines.moreau@me.com", inquiries: 1, vip: false },
  {
    firstName: "Carlos",
    lastName: "Bento",
    email: "carlos@bentostudio.pt",
    inquiries: 3,
    vip: false,
  },
  {
    firstName: "Hélène",
    lastName: "Vasseur",
    email: "helene.vasseur@galerie-x.fr",
    inquiries: 9,
    vip: true,
  },
  {
    firstName: "Tomas",
    lastName: "Berg",
    email: "tomas.berg@bergart.dk",
    inquiries: 0,
    vip: false,
  },
];

export function CollectorsMock() {
  return (
    <div className="w-full h-full bg-white font-sans flex overflow-hidden pointer-events-none">
      <GalleryOsSidebar active="collectors" />

      <div className="flex-1 flex flex-col overflow-hidden">
        <PageHeader title="Collectionneurs" sub="214 contacts · 38 actifs · 12 VIP" />

        <div className="flex-1 overflow-hidden px-4 md:px-5 pb-4">
          <div className="rounded-md border border-zinc-200 overflow-hidden">
            <div className="grid grid-cols-[1.2fr_1.4fr_60px_60px] gap-3 px-3 py-1.5 border-b border-zinc-100 bg-zinc-50/40">
              <p className="text-[7.5px] font-medium text-zinc-700 uppercase tracking-wider">Nom</p>
              <p className="text-[7.5px] font-medium text-zinc-700 uppercase tracking-wider">
                Email
              </p>
              <p className="text-[7.5px] font-medium text-zinc-700 uppercase tracking-wider text-right">
                Inquiries
              </p>
              <p className="text-[7.5px] font-medium text-zinc-700 uppercase tracking-wider text-right">
                VIP
              </p>
            </div>
            <div className="divide-y divide-zinc-100">
              {COLLECTORS.map((c) => {
                const name = `${c.firstName} ${c.lastName}`;
                const initials = `${c.firstName[0]}${c.lastName[0]}`.toUpperCase();
                return (
                  <div
                    key={c.email}
                    className="grid grid-cols-[1.2fr_1.4fr_60px_60px] gap-3 px-3 py-2 items-center"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-5 h-5 rounded-full bg-zinc-100 flex items-center justify-center shrink-0">
                        <span className="text-[7.5px] font-semibold text-zinc-700">{initials}</span>
                      </div>
                      <span className="text-[9px] font-medium text-zinc-900 truncate">{name}</span>
                    </div>
                    <p className="text-[8.5px] text-zinc-700 truncate">{c.email}</p>
                    <p className="text-[8.5px] tabular-nums text-right">
                      {c.inquiries > 0 ? (
                        <span className="font-medium text-zinc-900">{c.inquiries}</span>
                      ) : (
                        <span className="text-zinc-300">0</span>
                      )}
                    </p>
                    <p className="text-right">
                      {c.vip ? (
                        <span className="inline-flex items-center px-1 py-0 rounded text-[7px] font-medium bg-amber-50 text-amber-700">
                          VIP
                        </span>
                      ) : (
                        <span className="text-zinc-300 text-[8.5px]">—</span>
                      )}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────
 * Pilier 4 — Gallery Assistants  →  Page /dashboard/tools (Agents IA)
 * ────────────────────────────────────────────────────────────────────── */

const TOOLS: {
  name: string;
  meta: string;
  pill?: string;
  Icon: (p: { size?: number; className?: string }) => React.JSX.Element;
  iconBg?: string;
  iconColor?: string;
}[] = [
  {
    name: "Sales Agent",
    meta: "Brouillon IA pour chaque réponse client",
    Icon: Icon.Bot,
    iconColor: "#18181B",
  },
  {
    name: "WhatsApp",
    meta: "Sélection · Cloud API · ··· 4831",
    Icon: Icon.Whatsapp,
    iconColor: "#25D366",
  },
  { name: "Gmail", meta: "Sidebar · Workspace Add-on", Icon: Icon.Gmail, iconColor: "#EA4335" },
  {
    name: "Outlook",
    meta: "Sidebar · En préparation",
    pill: "Bientôt",
    Icon: Icon.Outlook,
    iconColor: "#0078D4",
  },
  {
    name: "Présentations publiques",
    meta: "galerie-fontaine.com",
    Icon: Icon.Globe,
    iconColor: "#18181B",
  },
  {
    name: "Email transactionnel",
    meta: "Resend · galerie-fontaine.com",
    Icon: Icon.Mail,
    iconColor: "#18181B",
  },
];

export function AssistantMock() {
  return (
    <div className="w-full h-full bg-white font-sans flex overflow-hidden pointer-events-none">
      <GalleryOsSidebar active="tools" />

      <div className="flex-1 flex flex-col overflow-hidden">
        <PageHeader
          title="Outils"
          sub="Vos extensions et intégrations — l'infrastructure qui vit hors du dashboard."
        />

        <div className="flex-1 overflow-hidden px-4 md:px-5 pb-4 space-y-3">
          {/* Section: Agents IA */}
          <div>
            <h2 className="text-[8px] font-semibold uppercase tracking-wider text-zinc-700">
              Agents IA
            </h2>
            <p className="text-[8px] text-zinc-400 mt-0.5">
              Assistants qui pré-rédigent et vous laissent valider
            </p>
            <div className="mt-1.5">
              <ToolCard t={TOOLS[0]} large />
            </div>
          </div>

          {/* Section: Canaux de vente */}
          <div>
            <h2 className="text-[8px] font-semibold uppercase tracking-wider text-zinc-700">
              Canaux de vente
            </h2>
            <p className="text-[8px] text-zinc-400 mt-0.5">
              Outils qui plug dans vos conversations clients
            </p>
            <div className="mt-1.5 grid grid-cols-3 gap-1.5">
              <ToolCard t={TOOLS[1]} />
              <ToolCard t={TOOLS[2]} />
              <ToolCard t={TOOLS[3]} />
            </div>
          </div>

          {/* Section: Publication / Communication */}
          <div className="grid grid-cols-2 gap-1.5">
            <div>
              <h2 className="text-[8px] font-semibold uppercase tracking-wider text-zinc-700">
                Publication
              </h2>
              <div className="mt-1.5">
                <ToolCard t={TOOLS[4]} />
              </div>
            </div>
            <div>
              <h2 className="text-[8px] font-semibold uppercase tracking-wider text-zinc-700">
                Communication
              </h2>
              <div className="mt-1.5">
                <ToolCard t={TOOLS[5]} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ToolCard({ t, large = false }: { t: (typeof TOOLS)[number]; large?: boolean }) {
  const I = t.Icon;
  return (
    <div
      className={`flex items-center justify-between gap-2 rounded-[10px] border border-zinc-200 bg-white ${large ? "px-3 py-2.5" : "px-2 py-2"}`}
    >
      <div className="min-w-0 flex-1">
        <h3
          className={`flex items-center gap-1.5 text-zinc-900 ${large ? "text-[12px] font-semibold" : "text-[10px] font-semibold"} tracking-tight truncate`}
        >
          <I size={large ? 14 : 11} className="shrink-0" />
          <span className="truncate" style={{ color: t.iconColor }}>
            {t.name}
          </span>
        </h3>
        <div className="mt-1 flex items-center gap-1">
          <p className={`truncate text-zinc-700 ${large ? "text-[9px]" : "text-[8px]"}`}>
            {t.meta}
          </p>
          {t.pill && (
            <span className="inline-flex shrink-0 items-center rounded-full bg-zinc-900 px-1.5 py-[1px] text-[7px] font-medium text-white">
              {t.pill}
            </span>
          )}
        </div>
      </div>
      <span
        className={`flex shrink-0 items-center justify-center rounded-full bg-zinc-900 text-white ${large ? "h-6 w-6" : "h-4 w-4"}`}
      >
        <Icon.ArrowUp size={large ? 11 : 8} />
      </span>
    </div>
  );
}
