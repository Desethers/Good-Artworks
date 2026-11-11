"use client";

import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import ContactModal from "@/components/ContactModal";
import LandingMobileMenu from "@/components/landing/LandingMobileMenu";

const ease = [0.16, 1, 0.3, 1] as const;

const LINKS = [
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
];

/** What the product does, under "Product": the /product/* pages and the collectors section of the home. */
const TOOLS_ITEMS = [
  {
    title: "Artwork inventory",
    desc: "Your artworks and artists, imported from CSV or Excel.",
    href: "/product/artwork-inventory",
  },
  {
    title: "Sales conversations",
    desc: "Your artwork records inside Gmail and WhatsApp, where you sell.",
    href: "/product/sales-conversations",
  },
  {
    title: "Collectors memory",
    desc: "Who received what, and when to follow up.",
    href: "/product/collectors-memory",
  },
];

const TOOLS_FEATURED = {
  eyebrow: "Gmail & WhatsApp",
  title: "Your inventory in every conversation",
  desc: "Your artwork records inside the conversations where you sell.",
  cta: "See more",
  image: "/product/conversations-today.webp",
  href: "/product/sales-conversations",
};

/** Same four personas as WhoVitreenIsFor on the home page. */
const SOLUTIONS_ITEMS = [
  {
    title: "Art Galleries",
    desc: "Artwork inventory, collector replies and private selections.",
    href: "/solutions/art-galleries",
  },
  {
    title: "Design Galleries",
    desc: "Pieces, availability and client presentations.",
    href: "/solutions/design-galleries",
  },
  {
    title: "Art Advisors",
    desc: "Private selections and client-ready artwork information.",
    href: "/solutions/art-advisors-dealers",
  },
  {
    title: "Antique & Collectibles Dealers",
    desc: "Unique pieces, provenance and condition, ready for every client.",
    href: "/solutions/antique-dealers",
  },
];

const SOLUTIONS_FEATURED = {
  eyebrow: "Who it's for",
  title: "Art Galleries",
  desc: "Artwork inventory, collector replies and private selections, built around your gallery.",
  cta: "See more",
  image: "/gallery-screen2.png",
  href: "/solutions/art-galleries",
};

export type DemoCaseCopy = {
  channel: string;
  who: string;
  question: string;
  prepared: string;
  reply: string;
  work: { title: string; meta: string; image: string };
  edit: string;
  send: string;
  more: string;
};

/** The demo case in one card: Marie asks, Good Artworks prepares the reply, a person reviews and sends. */
export const DEMO_CASE_EN: DemoCaseCopy = {
  channel: "WhatsApp",
  who: "Marie Beaumont",
  question: "Anything new from Sacha Elron?",
  prepared: "Prepared by Good Artworks",
  reply:
    "Hello Marie, a new Elron just arrived, the large format you liked in March. Shall I send you more images?",
  work: {
    title: "Sacha Elron — Evening Field",
    meta: "120 × 150 cm · €12,000 · Available",
    image: "/artworks/painting-03.jpg",
  },
  edit: "Edit",
  send: "Review and send",
  more: "See more",
};

export function DemoCasePreview({ c }: { c: DemoCaseCopy }) {
  return (
    <div className="flex h-full flex-col justify-between gap-3 p-4">
      <div className="flex flex-col gap-2.5">
        <div className="flex items-center gap-2 text-[11px] text-[#6B6A67]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#25D366]" aria-hidden="true" />
          {c.channel} · {c.who}
        </div>
        <p className="w-fit max-w-[85%] rounded-[12px] rounded-tl-[4px] bg-white px-3 py-2 text-[13px] text-[#111110] shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
          {c.question}
        </p>
        <div className="rounded-[10px] border border-[#E8E8E6] bg-white p-2.5">
          <p className="text-[11px] text-[#ADADAA]">{c.prepared}</p>
          <p className="mt-1 text-[12px] leading-snug text-[#111110]">{c.reply}</p>
          <div className="mt-2 flex items-center gap-2.5 rounded-[8px] bg-[#F5F5F3] p-1.5">
            <img
              src={c.work.image}
              alt=""
              className="h-10 w-10 shrink-0 rounded-[6px] object-cover"
            />
            <div className="min-w-0">
              <p className="truncate text-[12px] font-medium text-[#111110]">{c.work.title}</p>
              <p className="truncate text-[11px] text-[#6B6A67]">{c.work.meta}</p>
            </div>
          </div>
          <div className="mt-2 flex justify-end gap-2">
            <span className="rounded-full border border-[#E8E8E6] px-3 py-1 text-[11px] text-[#6B6A67]">
              {c.edit}
            </span>
            <span className="rounded-full bg-[#111110] px-3 py-1 text-[11px] font-medium text-white">
              {c.send}
            </span>
          </div>
        </div>
      </div>
      <p className="flex items-center gap-1 text-[12px] font-medium text-[#111110]">
        {c.more}
        <span
          aria-hidden="true"
          className="inline-block transition-transform duration-200 ease-out group-hover:translate-x-1"
        >
          →
        </span>
      </p>
    </div>
  );
}

/**
 * The floating card of a navbar menu: links on the left, a preview on the
 * right. It rises in from under the nav, the links follow one after the
 * other and the preview settles last; leaving is quick. Reduced motion
 * keeps only a fade.
 */
export function MenuCard({
  label,
  items,
  activeIndex,
  onActive,
  onClose,
  onEnter,
  onLeave,
  href,
  preview,
}: {
  label: string;
  items: readonly { title: string; desc: string; href: string }[];
  activeIndex: number;
  onActive: (index: number) => void;
  onClose: () => void;
  onEnter: () => void;
  onLeave: () => void;
  href: string;
  preview: ReactNode;
}) {
  const reduce = useReducedMotion();
  const rise = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 6 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.3, ease, delay },
        };
  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={
        reduce
          ? { opacity: 0 }
          : { opacity: 0, y: -4, scale: 0.99, transition: { duration: 0.12, ease: "easeIn" } }
      }
      transition={{ duration: 0.28, ease }}
      style={{ transformOrigin: "50% 0%" }}
      className="pointer-events-none fixed inset-x-0 top-[56px] z-40 hidden justify-center px-6 md:flex"
    >
      {/* The padding bridges the gap under the nav, so the card stays open on the way down. */}
      <div
        className="pointer-events-auto w-full max-w-[760px] pt-3"
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
      >
        <div className="grid grid-cols-[minmax(0,320px)_minmax(0,1fr)] gap-10 rounded-[12px] border border-[#E8E8E6] bg-white p-3 shadow-[0_12px_32px_rgba(0,0,0,0.05)]">
          <div className="flex flex-col py-2">
            <span className="px-4 text-[12px] text-[#ADADAA]">{label}</span>
            <div className="mt-2 flex flex-col gap-1">
              {items.map((item, index) => (
                <motion.a
                  key={item.title}
                  href={item.href}
                  onClick={onClose}
                  onMouseEnter={() => onActive(index)}
                  onFocus={() => onActive(index)}
                  className={`block rounded-[8px] px-4 py-3 transition-colors duration-200 ${
                    activeIndex === index ? "bg-[#F5F5F3]" : "hover:bg-[#F8F8F6]"
                  }`}
                  {...rise(0.05 + index * 0.045)}
                >
                  <span className="font-display text-[15px] font-medium text-[#111110]">
                    {item.title}
                  </span>
                  <p className="mt-0.5 text-[12px] leading-snug text-[#6B6A67]">{item.desc}</p>
                </motion.a>
              ))}
            </div>
          </div>
          <motion.a
            href={href}
            onClick={onClose}
            className="group relative block overflow-hidden rounded-[8px] bg-[#F5F5F3]"
            {...(reduce
              ? {}
              : {
                  initial: { opacity: 0, scale: 0.98 },
                  animate: { opacity: 1, scale: 1 },
                  transition: { duration: 0.4, ease, delay: 0.1 },
                })}
          >
            {preview}
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
}

/** A photo preview with a title, for menus whose right side is an image. */
export function PhotoPreview({
  image,
  title,
  desc,
  cta,
}: {
  image: string;
  title: string;
  desc: string;
  cta: string;
}) {
  return (
    <>
      <div
        className="absolute inset-0 bg-cover bg-[center_42%] transition-transform duration-500 ease-out group-hover:scale-[1.02]"
        style={{ backgroundImage: `url(${image})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-5 text-white">
        <h4 className="font-display text-[17px]">{title}</h4>
        <p className="mt-1 max-w-sm text-[12px] leading-snug text-white/75">{desc}</p>
        <p className="mt-3 flex items-center gap-1 text-[12px] font-medium text-white">
          {cta}
          <span
            aria-hidden="true"
            className="inline-block transition-transform duration-200 ease-out group-hover:translate-x-1"
          >
            →
          </span>
        </p>
      </div>
    </>
  );
}

export const openContact = () => window.dispatchEvent(new Event("open-contact-modal"));

/** Opens the same modal with the email already filled in (from an email field CTA). */
export const openContactWithEmail = (email: string) =>
  window.dispatchEvent(new CustomEvent("open-contact-modal", { detail: { email } }));

/**
 * Minimal header for the landing: logo, "Product" and "Solutions" dropdowns,
 * Pricing and About, and one CTA.
 */
export default function LandingNav() {
  const [scrolled, setScrolled] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [activeToolIndex, setActiveToolIndex] = useState(0);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const menu = toolsOpen ? "tools" : solutionsOpen ? "solutions" : null;
  const [activeSolutionIndex, setActiveSolutionIndex] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 2);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed left-0 right-0 top-0 z-50 border-b-[0.5px] bg-white px-4 pb-2 pt-3 transition-[border-color] duration-200 md:px-6 ${
          scrolled ? "border-[#E8E8E6]" : "border-transparent"
        }`}
      >
        <div className="relative mx-auto flex h-9 w-full max-w-7xl items-center justify-between">
          <a href="/" className="font-wordmark text-xl tracking-tight text-[#111110] md:text-2xl">
            <span className="font-semibold">Good Art</span>
            <span className="font-normal">works</span>
          </a>

          <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-7 md:flex">
            <div
              onMouseEnter={() => {
                setToolsOpen(true);
                setSolutionsOpen(false);
              }}
              onMouseLeave={() => setToolsOpen(false)}
            >
              <button
                type="button"
                onClick={() => {
                  setToolsOpen(true);
                  setSolutionsOpen(false);
                }}
                aria-expanded={toolsOpen}
                className="text-sm text-[#858581] transition-colors duration-200 hover:text-[#111110]"
              >
                Product
              </button>
            </div>
            <div
              onMouseEnter={() => {
                setSolutionsOpen(true);
                setToolsOpen(false);
              }}
              onMouseLeave={() => setSolutionsOpen(false)}
            >
              <button
                type="button"
                onClick={() => {
                  setSolutionsOpen(true);
                  setToolsOpen(false);
                }}
                aria-expanded={solutionsOpen}
                className="text-sm text-[#858581] transition-colors duration-200 hover:text-[#111110]"
              >
                Solutions
              </button>
            </div>
            {LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-[#858581] transition-colors duration-200 hover:text-[#111110]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <Button
            size="sm"
            onClick={openContact}
            className="shrink-0 !px-3 !py-[7px] !text-[12px] max-md:!hidden"
          >
            Book a demo
          </Button>
          <LandingMobileMenu
            groups={[
              { title: "Product", items: TOOLS_ITEMS },
              { title: "Solutions", items: SOLUTIONS_ITEMS },
            ]}
            links={LINKS}
            cta="Book a demo"
            label="Menu"
          />
        </div>

        <AnimatePresence mode="wait">
          {menu === "tools" && (
            <MenuCard
              key="tools"
              label="Product"
              items={TOOLS_ITEMS}
              activeIndex={activeToolIndex}
              onActive={setActiveToolIndex}
              onClose={() => setToolsOpen(false)}
              onEnter={() => setToolsOpen(true)}
              onLeave={() => setToolsOpen(false)}
              href={TOOLS_FEATURED.href}
              preview={<DemoCasePreview c={DEMO_CASE_EN} />}
            />
          )}
          {menu === "solutions" && (
            <MenuCard
              key="solutions"
              label="Solutions"
              items={SOLUTIONS_ITEMS}
              activeIndex={activeSolutionIndex}
              onActive={setActiveSolutionIndex}
              onClose={() => setSolutionsOpen(false)}
              onEnter={() => setSolutionsOpen(true)}
              onLeave={() => setSolutionsOpen(false)}
              href={SOLUTIONS_FEATURED.href}
              preview={
                <PhotoPreview
                  image={SOLUTIONS_FEATURED.image}
                  title={SOLUTIONS_FEATURED.title}
                  desc={SOLUTIONS_FEATURED.desc}
                  cta={SOLUTIONS_FEATURED.cta}
                />
              }
            />
          )}
        </AnimatePresence>
      </header>

      <ContactModal />
    </>
  );
}
