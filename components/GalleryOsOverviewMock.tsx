"use client";

import Image from "next/image";
import {
  Bell,
  BellRing,
  Calendar,
  ChevronRight,
  Flame,
  FolderClosed,
  Globe2,
  Image as ImageIcon,
  Inbox,
  LayoutGrid,
  Mail,
  MessageSquare,
  Search,
  Users,
  UserSquare,
  Wrench,
  type LucideIcon,
} from "lucide-react";

type SidebarItem = {
  label: string;
  icon: LucideIcon;
  badge?: number;
};

const SIDEBAR_ITEMS: SidebarItem[] = [
  { label: "Overview", icon: LayoutGrid },
  { label: "Artworks", icon: ImageIcon },
  { label: "Artists", icon: Users },
  { label: "Exhibitions", icon: Calendar },
  { label: "Website", icon: Globe2 },
  { label: "Inquiries", icon: MessageSquare },
  { label: "Sales drafts", icon: Mail, badge: 2 },
  { label: "Private Selection", icon: FolderClosed },
  { label: "Collectors", icon: UserSquare },
  { label: "Tools", icon: Wrench },
];

const PULSE_STATS = [
  {
    icon: Inbox,
    value: 3,
    label: "inquiries awaiting your reply",
    action: "Reply",
  },
  {
    icon: Mail,
    value: 2,
    label: "sales replies to approve",
    action: "Review",
  },
  {
    icon: BellRing,
    value: 1,
    label: "collector follow-up due",
    action: "Follow up",
  },
] as const;

const TODO_GROUPS = [
  {
    icon: Mail,
    label: "Sales drafts to review",
    count: 2,
    rows: [
      {
        image: "/artworks/painting-02.png",
        name: "Marie Chen",
        detail: "Availability — Night Garden IV",
        date: "Today",
      },
    ],
  },
  {
    icon: Inbox,
    label: "Inquiries waiting",
    count: 3,
    rows: [
      {
        image: "/artworks/painting-04.jpg",
        name: "Thomas Baur",
        detail: "Soft Power I",
        date: "1h",
      },
      {
        image: "/artworks/painting-07.jpg",
        name: "Léa Morin",
        detail: "Horizon Study",
        date: "Yesterday",
      },
    ],
  },
] as const;

const DEMAND_ROWS = [
  {
    image: "/artworks/painting-02.png",
    title: "Night Garden IV",
    year: "2024",
    signals: "3 inquiries · in 2 active selections",
    time: "today",
  },
  {
    image: "/artworks/painting-04.jpg",
    title: "Soft Power I",
    year: "2025",
    signals: "2 inquiries · in 1 active selection",
    time: "1d ago",
  },
] as const;

const ACTIVITIES = [
  {
    icon: "💬",
    title: "Nouvelle inquiry — Night Garden IV",
    body: "Marie Chen · Sacha Elron",
    time: "2m",
  },
  {
    icon: "✉️",
    title: "Sales draft ready",
    body: "Thomas Baur · Soft Power I",
    time: "18m",
  },
  {
    icon: "👁",
    title: "Viewing room opened",
    body: "Summer Selection 2025",
    time: "1h",
  },
  {
    icon: "📱",
    title: "WhatsApp message",
    body: "Artwork selection shared",
    time: "3h",
  },
] as const;

function GalleryOsMark() {
  return (
    <div className="flex h-6 w-6 items-center justify-center rounded bg-zinc-900">
      <svg
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth="2"
        aria-hidden="true"
      >
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    </div>
  );
}

function OverviewCard({
  children,
  className = "",
  glass = false,
}: {
  children: React.ReactNode;
  className?: string;
  glass?: boolean;
}) {
  return (
    <div
      className={`overflow-hidden rounded-lg border ${
        glass ? "border-white/45 bg-transparent" : "border-zinc-200 bg-white"
      } ${className}`}
    >
      {children}
    </div>
  );
}

function QueueHeader({
  icon: Icon,
  label,
  count,
  glass = false,
}: {
  icon: LucideIcon;
  label: string;
  count: number;
  glass?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-between border-y px-4 py-2 first:border-t-0 ${
        glass ? "border-white/35 bg-transparent" : "border-zinc-100 bg-zinc-50/60"
      }`}
    >
      <span className="flex items-center gap-2 text-[10px] font-semibold text-zinc-600">
        <Icon size={12} strokeWidth={1.75} className="text-zinc-400" />
        {label}
        <span className="font-medium text-zinc-400">{count}</span>
      </span>
      <span className="inline-flex items-center gap-0.5 text-[9px] text-zinc-500">
        See all
        <ChevronRight size={11} strokeWidth={2} />
      </span>
    </div>
  );
}

export function GalleryOsOverviewMock({ glass = false }: { glass?: boolean }) {
  return (
    <div
      className={`h-full w-full overflow-hidden rounded-[12px] border shadow-[0_28px_70px_rgba(0,0,0,0.14)] ${
        glass ? "border-white/55 bg-white/72 backdrop-blur-md" : "border-zinc-200 bg-white"
      }`}
    >
      <div className="flex h-full min-w-[980px]">
        <aside
          className={`flex h-full w-[190px] shrink-0 flex-col border-r ${
            glass ? "border-white/45 bg-white/38" : "border-zinc-200 bg-white"
          }`}
        >
          <div className="px-5 py-6">
            <div className="flex items-center gap-2.5">
              <GalleryOsMark />
              <span className="text-[13px] font-semibold tracking-tight text-zinc-900">
                Good Artworks
              </span>
            </div>
          </div>

          <nav
            className="flex flex-1 flex-col gap-0.5 px-3 py-3"
            aria-label="Good Artworks preview"
          >
            {SIDEBAR_ITEMS.map(({ label, icon: Icon, badge }) => (
              <div
                key={label}
                className={`flex items-center gap-2.5 rounded-md px-2.5 py-[7px] text-[11px] ${
                  label === "Overview" ? "bg-zinc-100 font-medium text-zinc-900" : "text-zinc-700"
                }`}
              >
                <Icon
                  size={14}
                  strokeWidth={1.75}
                  className={label === "Overview" ? "text-zinc-900" : "text-zinc-500"}
                />
                <span className="flex-1">{label}</span>
                {badge ? (
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-emerald-600 px-1.5 text-[9px] font-semibold text-white">
                    {badge}
                  </span>
                ) : null}
              </div>
            ))}
          </nav>

          <div className="flex items-baseline justify-between px-4 py-4 text-[9px]">
            <span className="text-zinc-400">Sign out</span>
            <span className="text-zinc-300">© Good Artworks</span>
          </div>
        </aside>

        <div className={`min-w-0 flex-1 overflow-hidden ${glass ? "bg-white/28" : "bg-white"}`}>
          <header className="flex h-[72px] items-center gap-3 px-7">
            <div
              className={`relative flex max-w-[460px] flex-1 items-center gap-2 rounded-md border py-2 pl-9 pr-3 text-[11px] text-zinc-400 ${
                glass ? "border-white/45 bg-transparent" : "border-zinc-200 bg-white"
              }`}
            >
              <Search
                size={14}
                strokeWidth={1.75}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
              />
              <span className="flex-1 truncate">Find anything in your gallery...</span>
              <kbd
                className={`inline-flex items-center rounded border px-1.5 py-0.5 text-[9px] text-zinc-400 ${
                  glass ? "border-white/45 bg-white/15" : "border-zinc-200 bg-zinc-50"
                }`}
              >
                ⌘K
              </kbd>
            </div>
            <div className="relative ml-auto p-1.5 text-zinc-500">
              <Bell size={16} strokeWidth={1.75} />
              <span className="absolute -right-0.5 -top-0.5 flex h-[14px] min-w-[14px] items-center justify-center rounded-full bg-emerald-600 px-0.5 text-[8px] font-bold leading-none text-white">
                4
              </span>
            </div>
          </header>

          <div className="h-[calc(100%-72px)] overflow-hidden px-7 pb-7 pt-1">
            <div className="mb-5">
              <h2 className="text-[14px] font-medium text-zinc-900">Overview</h2>
              <div className="mt-3 grid grid-cols-3 gap-3">
                {PULSE_STATS.map(({ icon: Icon, value, label, action }) => (
                  <OverviewCard key={label} className="p-3.5" glass={glass}>
                    <div className="mb-3 flex items-center justify-between">
                      <span className="flex h-6 w-6 items-center justify-center rounded-md bg-zinc-50 text-zinc-400">
                        <Icon size={13} strokeWidth={1.75} />
                      </span>
                      <span className="inline-flex items-center gap-0.5 text-[9px] font-medium text-zinc-400">
                        {action}
                        <ChevronRight size={11} strokeWidth={2} />
                      </span>
                    </div>
                    <p className="text-[19px] font-semibold leading-none tabular-nums text-zinc-900">
                      {value}
                    </p>
                    <p className="mt-1.5 text-[10px] leading-snug text-zinc-500">{label}</p>
                  </OverviewCard>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-5 items-start gap-5">
              <div className="col-span-3 min-w-0 space-y-5">
                <section>
                  <h3 className="mb-2.5 text-[11px] font-semibold text-zinc-900">To do</h3>
                  <OverviewCard glass={glass}>
                    {TODO_GROUPS.map(({ icon, label, count, rows }) => (
                      <div key={label}>
                        <QueueHeader icon={icon} label={label} count={count} glass={glass} />
                        <div className="divide-y divide-zinc-50">
                          {rows.map((row) => (
                            <div key={row.name} className="flex items-center gap-3 px-4 py-2.5">
                              <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded bg-zinc-100">
                                <Image
                                  src={row.image}
                                  alt=""
                                  fill
                                  sizes="32px"
                                  className="object-cover"
                                />
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="truncate text-[11px] text-zinc-900">{row.name}</p>
                                <p className="truncate text-[9px] text-zinc-400">{row.detail}</p>
                              </div>
                              <span className="shrink-0 text-[9px] text-zinc-400">{row.date}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </OverviewCard>
                </section>

                <section>
                  <h3 className="mb-2.5 text-[11px] font-semibold text-zinc-900">In demand</h3>
                  <OverviewCard glass={glass}>
                    <QueueHeader
                      icon={Flame}
                      label="Collector interest right now"
                      count={5}
                      glass={glass}
                    />
                    <div className="divide-y divide-zinc-50">
                      {DEMAND_ROWS.map((row) => (
                        <div key={row.title} className="flex items-center gap-3 px-4 py-2.5">
                          <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded bg-zinc-100">
                            <Image
                              src={row.image}
                              alt=""
                              fill
                              sizes="36px"
                              className="object-cover"
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-[11px] font-medium text-zinc-900">
                              {row.title}
                              <span className="font-normal text-zinc-400">, {row.year}</span>
                              <span className="font-normal text-zinc-400"> — Sacha Elron</span>
                            </p>
                            <p className="truncate text-[9px] text-zinc-500">{row.signals}</p>
                          </div>
                          <span className="text-[8px] text-zinc-400">{row.time}</span>
                          <span className="rounded-full border border-emerald-600/30 bg-emerald-50 px-1.5 py-0.5 text-[8px] text-emerald-700">
                            Available
                          </span>
                        </div>
                      ))}
                    </div>
                  </OverviewCard>
                </section>
              </div>

              <section className="col-span-2 min-w-0">
                <h3 className="mb-2.5 text-[11px] font-semibold text-zinc-900">Recent activity</h3>
                <OverviewCard glass={glass}>
                  <ul className="divide-y divide-zinc-50">
                    {ACTIVITIES.map((activity) => (
                      <li key={activity.title} className="flex items-start gap-3 px-4 py-3">
                        <span className="mt-0.5 shrink-0 text-[13px] leading-none">
                          {activity.icon}
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <p className="text-[10px] font-medium leading-snug text-zinc-700">
                              {activity.title}
                            </p>
                            <span className="shrink-0 text-[8px] tabular-nums text-zinc-400">
                              {activity.time}
                            </span>
                          </div>
                          <p className="mt-0.5 truncate text-[9px] text-zinc-500">
                            {activity.body}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </OverviewCard>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
