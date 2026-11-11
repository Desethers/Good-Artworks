"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import LandingNav from "@/components/landing/LandingNav";
import LandingNavFr from "@/components/landing/LandingNavFr";
import Footer from "@/components/Footer";
import { useLang } from "@/lib/lang";
import CtaBand from "@/components/CtaBand";
import { Button } from "@/components/ui/Button";
import { PublishingMock } from "@/components/showcase/PillarMocks";
import ScrollStory from "@/components/ScrollStory";
import HeroCurtainMock from "@/components/HeroCurtainMock";

const ease = [0.16, 1, 0.3, 1] as const;
type WebsitePreview = "exhibition" | "artist" | "news";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, ease, delay },
});

const STEPS = [
  {
    title: "Custom Website",
    subtitle: "A website designed for your gallery, not a template.",
    bullets: ["Gallery identity", "Artists", "Exhibitions"],
  },
  {
    title: "Connected Sections",
    subtitle: "Artists, exhibitions and news on your website are updated from your inventory.",
    bullets: ["Artist profiles", "Exhibition pages", "News posts"],
  },
  {
    title: "No CMS",
    subtitle: "Update key website content without using a separate website admin.",
    bullets: ["One dashboard", "No second tool", "No duplicate edits"],
  },
  {
    title: "Live Publishing",
    subtitle: "Make updates in Good Artworks and keep your website current.",
    bullets: ["No code", "No separate CMS", "No back-and-forth for small edits"],
  },
];

function BrowserBar({ path }: { path: string }) {
  return (
    <div className="flex items-center gap-2 border-b border-[#E8E8E6] px-5 py-3 md:px-7">
      {[0, 1, 2].map((dot) => (
        <span key={dot} className="h-2.5 w-2.5 rounded-full bg-[#E8E8E6]" />
      ))}
      <span className="ml-3 truncate rounded-full bg-[#F5F5F3] px-3 py-1 text-[11px] text-[#6B6A67]">
        {path}
      </span>
    </div>
  );
}

function GallerySiteHeader() {
  return (
    <header className="flex h-12 shrink-0 items-center justify-between px-7">
      <span className="text-[9px] font-medium uppercase tracking-[0.2em] text-[#111110]">
        Galerie
      </span>
      <nav className="flex items-center gap-4 text-[8px] text-[#111110]">
        <span>Exhibitions</span>
        <span>Artists</span>
        <span>Fairs</span>
        <span>News</span>
        <span>About</span>
        <span className="flex h-5 w-5 items-center justify-center rounded-full border border-[#A8A8A5]">
          <span className="h-1.5 w-1.5 rounded-full border border-[#111110]" />
        </span>
      </nav>
    </header>
  );
}

export function ArtistWebsitePage() {
  const works = [
    { src: "/mockups/website-publisher/painting-02.png", title: "Untitled (Horizon)" },
    { src: "/mockups/website-publisher/painting-01.png", title: "Dawn Study No. 7" },
    { src: "/mockups/website-publisher/painting-09.png", title: "Evening Field" },
  ];

  return (
    <div className="h-full overflow-hidden bg-white">
      <GallerySiteHeader />
      <div className="px-7 pb-7 pt-3">
        <p className="text-[8px] text-[#858581]">Artists&nbsp;&nbsp; / &nbsp;&nbsp;Sacha Elron</p>
        <div className="mt-5 grid grid-cols-[31%_1fr] gap-10">
          <img
            src="/mockups/website-publisher/sacha-elron.png"
            alt="Portrait of Sacha Elron"
            className="h-[205px] w-full rounded-[3px] object-cover"
          />
          <div className="pt-2">
            <h3 className="text-[24px] font-normal leading-none tracking-[-0.035em] text-[#111110]">
              Sacha Elron
            </h3>
            <p className="mt-2 text-[8px] text-[#858581]">
              Born 1960, Oklahoma, USA — Lives and works in New York
            </p>
            <div className="mt-5 max-w-[390px] space-y-3 text-[9px] leading-[1.55] text-[#242422]">
              <p>
                Sacha Elron explores the boundaries of landscape and abstraction through a deeply
                personal visual vocabulary. His paintings evoke a contemplative stillness between
                representation and pure sensation.
              </p>
              <p>
                Working primarily with oil on canvas, his practice distills nature into its most
                essential forms.
              </p>
            </div>
            <span className="mt-5 inline-flex rounded-full border border-[#111110] px-5 py-2 text-[8px]">
              read full biography
            </span>
          </div>
        </div>
        <div className="mt-7 flex items-center justify-between">
          <p className="text-[8px] font-medium uppercase tracking-[0.2em]">Selected Works</p>
          <div className="flex gap-1.5 text-[7px]">
            <span className="rounded-full bg-[#111110] px-3 py-1.5 text-white">Selected Works</span>
            {["Exhibitions", "News", "Press", "Biography"].map((label) => (
              <span key={label} className="rounded-full border border-[#E8E8E6] px-3 py-1.5">
                {label}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-4">
          {works.map((work) => (
            <div key={work.title}>
              <img src={work.src} alt="" className="h-[92px] w-full rounded-[2px] object-cover" />
              <p className="mt-1.5 text-[7px] text-[#6B6A67]">Sacha Elron</p>
              <p className="text-[8px] text-[#111110]">{work.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ExhibitionWebsitePage() {
  return (
    <div className="h-full overflow-hidden bg-white">
      <GallerySiteHeader />
      <div className="px-7 pb-7 pt-3">
        <p className="text-[8px] text-[#858581]">
          <span className="text-[#111110] underline underline-offset-2">Exhibitions</span>
          &nbsp;—&nbsp; Your friends
        </p>
        <div className="mt-6 grid grid-cols-[27%_1fr] gap-9">
          <aside className="space-y-4 text-[8px] leading-[1.45] text-[#111110]">
            <div>
              <p className="mb-1 text-[7px] uppercase tracking-[0.18em] text-[#858581]">Artist</p>
              <p className="underline underline-offset-2">Sacha Elron</p>
            </div>
            <div>
              <p className="mb-1 text-[7px] uppercase tracking-[0.18em] text-[#858581]">Dates</p>
              <p>Feb 12 — Mar 22, 2026</p>
            </div>
            <div>
              <p className="mb-1 text-[7px] uppercase tracking-[0.18em] text-[#858581]">Location</p>
              <p>Galerie, Paris — Turenne</p>
            </div>
            <span className="flex w-full justify-center rounded-full bg-[#111110] px-4 py-2 text-white">
              Artwork Inquiry
            </span>
          </aside>
          <div>
            <h3 className="text-[23px] font-normal leading-none tracking-[-0.035em] text-[#111110]">
              Sacha Elron — <em>Your friends</em>
            </h3>
            <p className="mt-4 max-w-[430px] text-[9px] leading-[1.55] text-[#242422]">
              A presentation of recent paintings and works on paper exploring friendship, memory,
              and shared light. The exhibition brings together a focused selection of pieces
              conceived as a single environment.
            </p>
            <p className="mt-3 max-w-[430px] text-[9px] leading-[1.55] text-[#242422]">
              Arranged as a sequence of rooms, the works invite a slow reading: color fields, soft
              gradients, and restrained surfaces echo the quiet of the gallery itself.
            </p>
          </div>
        </div>
        <figure className="mt-7">
          <img
            src="/mockups/website-publisher/your-friends.png"
            alt="Installation view of Your friends"
            className="h-[205px] w-full object-cover object-center"
          />
          <figcaption className="mt-1 text-[7px] text-[#858581]">
            Installation view, Sacha Elron: <em>Your friends</em>, Galerie, Paris, 2026
          </figcaption>
        </figure>
      </div>
    </div>
  );
}

function NewsWebsitePage() {
  return (
    <div className="h-full overflow-hidden bg-white">
      <GallerySiteHeader />
      <div className="px-7 pb-7 pt-3">
        <p className="text-[8px] text-[#858581]">
          <span className="text-[#111110] underline underline-offset-2">News</span>
          &nbsp;—&nbsp; Studio visit
        </p>
        <div className="mt-6 grid grid-cols-[1.08fr_0.92fr] gap-9">
          <img
            src="/mockups/website-publisher/studio-visit.png"
            alt="Sacha Elron studio visit"
            className="h-[285px] w-full rounded-[3px] object-cover"
          />
          <div className="pt-2">
            <p className="text-[7px] uppercase tracking-[0.18em] text-[#858581]">
              Studio · January 2026
            </p>
            <h3 className="mt-3 text-[23px] font-normal leading-[1.08] tracking-[-0.035em] text-[#111110]">
              Studio visit: new canvases ahead of <em>Recent Studies</em>
            </h3>
            <div className="mt-5 space-y-3 text-[9px] leading-[1.55] text-[#242422]">
              <p>
                Inside Sacha Elron&apos;s Brooklyn studio, recent paintings gather around color,
                horizon and changing light.
              </p>
              <p>
                The new works will be presented in Paris as part of the gallery&apos;s forthcoming
                exhibition.
              </p>
            </div>
            <span className="mt-5 inline-flex rounded-full border border-[#111110] px-5 py-2 text-[8px]">
              Read article
            </span>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-3 gap-4 border-t border-[#E8E8E6] pt-4">
          {[
            "In conversation with the gallery",
            "Recent Studies opens in Paris",
            "From the studio",
          ].map((headline, index) => (
            <div key={headline}>
              <p className="text-[7px] text-[#858581]">
                {index === 0 ? "Interview" : "News"} · 2026
              </p>
              <p className="mt-1 text-[8px] leading-[1.35] text-[#111110]">{headline}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PagesFrame({ page, reduceMotion }: { page: WebsitePreview; reduceMotion: boolean }) {
  const paths: Record<WebsitePreview, string> = {
    exhibition: "galerie.com/exhibitions/your-friends",
    artist: "galerie.com/artists/sacha-elron",
    news: "galerie.com/news/studio-visit",
  };

  return (
    <div className="flex h-full flex-col bg-white">
      <BrowserBar path={paths[page]} />
      <div className="relative min-h-0 flex-1 overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={page}
            className="absolute inset-0"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease }}
          >
            {page === "artist" ? (
              <ArtistWebsitePage />
            ) : page === "exhibition" ? (
              <ExhibitionWebsitePage />
            ) : (
              <NewsWebsitePage />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* Standalone visual: the gallery website going live, cycling through its
 * exhibition, artist and news pages. Reuses the product page's PagesFrame
 * and the same auto-cycle used by WebsitePublisherProductPage. */
export function GalleryWebsitePublishVisual() {
  const reduceMotion = useReducedMotion() ?? false;
  const [websitePage, setWebsitePage] = useState<WebsitePreview>("exhibition");

  useEffect(() => {
    if (reduceMotion) return;

    const order: WebsitePreview[] = ["exhibition", "artist", "news"];
    const interval = window.setInterval(() => {
      setWebsitePage((current) => order[(order.indexOf(current) + 1) % order.length]);
    }, 4200);

    return () => window.clearInterval(interval);
  }, [reduceMotion]);

  return <PagesFrame page={websitePage} reduceMotion={reduceMotion} />;
}

const CONNECTED_SECTIONS = [
  {
    label: "Artists",
    detail: "Artist profiles",
    websiteDetail: "Sacha Elron",
    image: "/mockups/website-publisher/sacha-elron.png",
  },
  {
    label: "Exhibitions",
    detail: "Exhibition pages",
    websiteDetail: "Your friends",
    image: "/mockups/website-publisher/your-friends.png",
  },
  {
    label: "News",
    detail: "Latest editorial content",
    websiteDetail: "Studio visit",
    image: "/mockups/website-publisher/studio-visit.png",
  },
] as const;

function ConnectedSectionsFrame({ reduceMotion }: { reduceMotion: boolean }) {
  const [activeSection, setActiveSection] = useState(reduceMotion ? 2 : 0);

  useEffect(() => {
    if (reduceMotion) {
      setActiveSection(2);
      return;
    }

    const interval = window.setInterval(() => {
      setActiveSection((current) => (current + 1) % CONNECTED_SECTIONS.length);
    }, 1800);

    return () => window.clearInterval(interval);
  }, [reduceMotion]);

  return (
    <div className="absolute inset-0">
      <div className="grid h-full w-full grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-[5px]">
        <section className="flex h-full min-h-0 min-w-0 flex-col overflow-hidden rounded-[18px] border border-[#E2E2DF] bg-white">
          <div className="flex h-10 shrink-0 items-center gap-2 border-b border-[#ECECEA] px-3 sm:h-14 sm:gap-3 sm:px-5">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[#181818] text-[8px] text-white sm:h-7 sm:w-7 sm:text-[9px]">
              ◫
            </span>
            <div>
              <h3 className="text-[14px] font-medium text-[#181818]">Good Artworks</h3>
              <p className="text-[9px] text-[#9A9A96]">Connected sections</p>
            </div>
          </div>
          <div className="flex flex-1 flex-col justify-center px-2 py-2 sm:px-4 sm:py-5">
            {CONNECTED_SECTIONS.map((section, index) => {
              const active = activeSection === index;
              return (
                <motion.div
                  key={section.label}
                  animate={{
                    opacity: active ? 1 : 0.48,
                    backgroundColor: active ? "#F4F4F2" : "#FFFFFF",
                  }}
                  transition={{ duration: 0.35, ease }}
                  className="flex min-h-[48px] items-center gap-2 rounded-lg px-3 sm:min-h-[82px] sm:gap-3 sm:px-4"
                >
                  <img
                    src={section.image}
                    alt=""
                    className={`h-7 w-7 shrink-0 rounded-md border object-cover transition-colors duration-300 sm:h-9 sm:w-9 ${
                      active ? "border-[#D6D6D2]" : "border-[#ECECEA]"
                    }`}
                  />
                  <div className="min-w-0">
                    <p className="text-[13px] font-medium text-[#181818]">{section.label}</p>
                    <p className="mt-0.5 truncate text-[10px] text-[#8A8A86]">{section.detail}</p>
                  </div>
                  <span
                    className={`ml-auto h-1.5 w-1.5 rounded-full transition-colors duration-300 ${
                      active ? "bg-[#15945A]" : "bg-[#D8D8D4]"
                    }`}
                  />
                </motion.div>
              );
            })}
          </div>
        </section>

        <section className="flex h-full min-h-0 min-w-0 flex-col overflow-hidden rounded-[18px] border border-[#E2E2DF] bg-white">
          <div className="flex h-10 shrink-0 items-center justify-between border-b border-[#ECECEA] px-3 sm:h-14 sm:px-5">
            <div>
              <h3 className="text-[14px] font-medium uppercase tracking-[0.16em] text-[#181818]">
                Galerie
              </h3>
              <p className="mt-0.5 text-[9px] text-[#9A9A96]">Website</p>
            </div>
            <div className="hidden gap-2 text-[8px] text-[#777773] sm:flex">
              <span>Artists</span>
              <span>Exhibitions</span>
              <span>News</span>
            </div>
          </div>
          <div className="flex flex-1 flex-col justify-center px-2 py-2 sm:px-4 sm:py-5">
            {CONNECTED_SECTIONS.map((section, index) => {
              const active = activeSection === index;
              return (
                <motion.div
                  key={section.label}
                  animate={{
                    opacity: active ? 1 : 0.42,
                    backgroundColor: active ? "#F7F7F5" : "#FFFFFF",
                  }}
                  transition={{ duration: 0.35, ease }}
                  className="flex min-h-[48px] items-center gap-2 rounded-lg px-3 sm:min-h-[82px] sm:gap-3"
                >
                  <img
                    src={section.image}
                    alt=""
                    className="h-8 w-10 shrink-0 rounded-[3px] object-cover sm:h-12 sm:w-14"
                  />
                  <div className="min-w-0">
                    <p className="text-[9px] uppercase tracking-[0.16em] text-[#9A9A96]">
                      {section.label}
                    </p>
                    <p className="mt-1 truncate text-[12px] font-medium text-[#181818]">
                      {section.websiteDetail}
                    </p>
                  </div>
                  <span
                    className={`ml-auto text-[12px] transition-colors duration-300 ${
                      active ? "text-[#181818]" : "text-[#C9C9C5]"
                    }`}
                  >
                    →
                  </span>
                </motion.div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}

function NoCmsFrame({ reduceMotion }: { reduceMotion: boolean }) {
  const [phase, setPhase] = useState(reduceMotion ? 4 : 0);

  useEffect(() => {
    if (reduceMotion) {
      setPhase(4);
      return;
    }

    const durations = [1100, 900, 900, 900, 2200];
    const timer = window.setTimeout(() => {
      setPhase((current) => (current >= 4 ? 0 : current + 1));
    }, durations[phase]);

    return () => window.clearTimeout(timer);
  }, [phase, reduceMotion]);

  const updated = phase >= 2;
  const status = phase < 3 ? "Editing" : phase === 3 ? "Saving…" : "Live on website";

  const rows = [
    { section: "Artists", page: "Artist index", status: "Live" },
    { section: "Exhibitions", page: "Winter Light", status },
    { section: "News", page: "Gallery announcement", status: "Live" },
  ];

  return (
    <div className="relative h-full overflow-hidden bg-white">
      <div className="flex h-[62px] items-center justify-between border-b border-[#E8E8E6] px-7">
        <div>
          <h3 className="text-[15px] font-medium text-[#181818]">Website content</h3>
          <p className="mt-0.5 text-[10px] text-[#8A8A86]">Good Artworks · Website Publisher</p>
        </div>
        <span className="rounded-full border border-[#E1E1DE] px-3 py-1.5 text-[10px] text-[#6B6A67]">
          3 connected sections
        </span>
      </div>

      <div className="p-6">
        <div className="overflow-hidden rounded-[10px] border border-[#E4E4E1]">
          <div className="grid grid-cols-[1fr_1.5fr_112px] bg-[#FAFAF9] px-5 py-3 text-[10px] font-medium text-[#777773]">
            <span>Section</span>
            <span>Page</span>
            <span>Status</span>
          </div>
          {rows.map((row, index) => {
            const selected = index === 1;
            const live = row.status === "Live" || row.status === "Live on website";
            return (
              <motion.div
                key={row.section}
                animate={{ backgroundColor: selected ? "#F7F7F5" : "#FFFFFF" }}
                className="grid h-[48px] grid-cols-[1fr_1.5fr_112px] items-center border-t border-[#EFEFED] px-5 text-[12px]"
              >
                <span className={selected ? "font-medium text-[#181818]" : "text-[#6B6A67]"}>
                  {row.section}
                </span>
                <span className="text-[#181818]">{row.page}</span>
                <motion.span
                  key={row.status}
                  initial={reduceMotion ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`w-fit rounded-full px-2.5 py-1 text-[9px] ${
                    live
                      ? "bg-[#EAF8F0] text-[#168044]"
                      : row.status === "Saving…"
                        ? "bg-[#F1F1EF] text-[#777773]"
                        : "bg-[#FFF4DD] text-[#9A6500]"
                  }`}
                >
                  {row.status}
                </motion.span>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-5 grid grid-cols-[1fr_180px] items-end gap-5 rounded-[10px] border border-[#E4E4E1] bg-white p-5">
          <div>
            <div className="flex items-center justify-between">
              <label className="text-[10px] font-medium text-[#6B6A67]">Title</label>
              <AnimatePresence>
                {phase === 2 ? (
                  <motion.span
                    initial={{ opacity: 0, y: 3 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-[9px] text-[#168044]"
                  >
                    Saved
                  </motion.span>
                ) : null}
              </AnimatePresence>
            </div>
            <motion.div
              animate={{
                borderColor: phase === 1 ? "#181818" : "#D9D9D6",
                backgroundColor: phase === 1 ? "#FAFAF9" : "#FFFFFF",
              }}
              transition={{ duration: 0.3 }}
              className="mt-2 h-[42px] rounded-lg border px-3.5 py-3 text-[12px] text-[#181818]"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={updated ? "updated" : "original"}
                  initial={reduceMotion ? false : { opacity: 0, y: 3 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -3 }}
                  transition={{ duration: 0.25 }}
                >
                  {updated ? "Winter Light — New Works" : "Winter Light"}
                </motion.span>
              </AnimatePresence>
            </motion.div>
          </div>
          <div>
            <p className="text-[10px] font-medium text-[#6B6A67]">Publishing</p>
            <div className="mt-2 flex h-[42px] items-center rounded-lg bg-[#F7F7F5] px-3.5">
              <span
                className={`mr-2 h-1.5 w-1.5 rounded-full ${
                  phase >= 4 ? "bg-[#15945A]" : phase === 3 ? "bg-[#A6A6A2]" : "bg-[#D59A24]"
                }`}
              />
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={status}
                  initial={reduceMotion ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-[10px] text-[#181818]"
                >
                  {status}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {phase >= 4 ? (
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            className="absolute bottom-5 right-5 flex items-center gap-2 rounded-lg border border-[#DCE9E1] bg-white px-4 py-3 shadow-[0_12px_32px_rgba(17,17,16,0.08)]"
          >
            <span className="h-2 w-2 rounded-full bg-[#15945A]" />
            <span className="text-[11px] font-medium text-[#181818]">Website updated</span>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function EmailFrame() {
  return (
    <div className="flex h-full items-center justify-center bg-[#F7F7F5] p-6">
      <div className="w-full max-w-[380px] overflow-hidden rounded-lg border border-[#E1E3E6] bg-white shadow-[0_18px_48px_rgba(17,17,16,0.08)]">
        <div className="flex items-center justify-between bg-[#F1F4FA] px-4 py-3">
          <span className="text-[12px] font-medium text-[#111110]">New Message</span>
        </div>
        <div className="border-b border-[#E8E8E6] px-4 py-2.5 text-[12px] text-[#ADADAA]">
          To: collector@email.com
        </div>
        <div className="p-4">
          <div className="flex items-center gap-3 rounded-md border border-[#AFC6FA] bg-[#EEF4FF] p-3">
            <div className="h-9 w-8 shrink-0 rounded-[3px] bg-[#1B2A4A]" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-[12px] font-medium text-[#111110]">Evening Field</p>
              <p className="text-[10px] text-[#6B6A67]">Sacha Elron · €8,000</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PublishingVisual({
  index,
  websitePage,
  reduceMotion,
}: {
  index: number;
  websitePage: WebsitePreview;
  reduceMotion: boolean;
}) {
  if (index === 0) {
    return (
      <div className="h-[166.667%] w-[166.667%] origin-top-left scale-[0.6] sm:h-full sm:w-full sm:scale-100">
        <PagesFrame page={websitePage} reduceMotion={reduceMotion} />
      </div>
    );
  }

  if (index === 1) {
    return <ConnectedSectionsFrame reduceMotion={reduceMotion} />;
  }

  if (index === 2) {
    return (
      <div className="h-[166.667%] w-[166.667%] origin-top-left scale-[0.6] sm:h-full sm:w-full sm:scale-100">
        <NoCmsFrame reduceMotion={reduceMotion} />
      </div>
    );
  }

  const Frame = EmailFrame;
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={index}
        className="h-full w-full"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.3, ease }}
      >
        <Frame />
      </motion.div>
    </AnimatePresence>
  );
}

function WebsitePreviewTabs({
  value,
  onChange,
}: {
  value: WebsitePreview;
  onChange: (value: WebsitePreview) => void;
}) {
  const tabs: Array<{ label: string; value: WebsitePreview }> = [
    { label: "Exhibition Page", value: "exhibition" },
    { label: "Artist Page", value: "artist" },
    { label: "News", value: "news" },
  ];

  return (
    <div className="mt-3 flex justify-start">
      <div className="inline-flex rounded-full border border-[#DFDFDC] bg-white">
        {tabs.map((tab) => {
          const active = value === tab.value;
          return (
            <button
              key={tab.value}
              type="button"
              onClick={() => onChange(tab.value)}
              className={`min-w-[76px] rounded-full px-3 py-1 text-[10px] transition-colors duration-300 ${
                active ? "bg-[#111110] text-white" : "text-[#8A8A86] hover:text-[#111110]"
              }`}
              aria-pressed={active}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function WebsitePublisherProductPage() {
  const reduceMotion = useReducedMotion();
  const [websitePage, setWebsitePage] = useState<WebsitePreview>("exhibition");

  useEffect(() => {
    if (reduceMotion) return;

    const order: WebsitePreview[] = ["exhibition", "artist", "news"];
    const interval = window.setInterval(() => {
      setWebsitePage((current) => order[(order.indexOf(current) + 1) % order.length]);
    }, 4200);

    return () => window.clearInterval(interval);
  }, [reduceMotion]);

  const { lang } = useLang();

  const openContact = () => {
    window.dispatchEvent(new CustomEvent("open-contact-modal"));
  };

  return (
    <main className="relative bg-white">
      {lang === "fr" ? <LandingNavFr /> : <LandingNav />}

      <section className="overflow-hidden px-4 pb-12 pt-32 md:px-6 md:pb-[72px] md:pt-40">
        <div className="mx-auto max-w-7xl">
          <motion.div {...fadeUp(0)}>
            <h1 className="font-display text-[28px] font-normal leading-[1.3] tracking-[-0.04em] text-[#111110] md:text-[40px]">
              Website Publisher
            </h1>
            <p className="mt-1 max-w-4xl text-[26px] leading-[1.35] tracking-[-0.02em] text-[#6B6A67] md:text-[36px]">
              Update artworks once. Your website follows.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button size="lg" onClick={openContact}>
                Set up publishing
              </Button>
            </div>
            <div className="border-t border-[#E8E8E6] mt-16 md:mt-[96px] -mx-4 md:-mx-6" />
          </motion.div>

          <motion.div
            {...fadeUp(0.08)}
            className="relative -mr-4 mt-14 h-[620px] overflow-hidden rounded-[5px] bg-[#D8D2C8] md:mr-0 md:mt-20 md:h-[720px] md:rounded-xl"
            style={{ isolation: "isolate", willChange: "transform" }}
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: "url('/paula-cooper-background.jpg')" }}
            />

            <HeroCurtainMock cropFromBottomOnMobile>
              <div className="h-full w-[74.1%] origin-top-left scale-[1.35] md:w-full md:scale-100">
                <PublishingMock />
              </div>
            </HeroCurtainMock>
          </motion.div>
        </div>
      </section>

      <div className="-mt-10 md:-mt-16">
        <ScrollStory
          title="Publish once, everywhere it needs to be."
          subtitle="Website, archive, PDF and email — all from one record."
          steps={STEPS}
          compactMobileVisual
          renderVisual={(index) => (
            <PublishingVisual
              index={index}
              websitePage={websitePage}
              reduceMotion={Boolean(reduceMotion)}
            />
          )}
          renderVisualFooter={(index) =>
            index === 0 ? (
              <WebsitePreviewTabs value={websitePage} onChange={setWebsitePage} />
            ) : null
          }
          isVisualBare={(index) => index === 1}
        />
      </div>

      <CtaBand />
      <Footer />
    </main>
  );
}
