"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { BODY, CONTAINER, H2, SECTION } from "@/components/landing/styles";
import { CardCaption, DatabaseAssistantMockup } from "@/components/landing/LandingOutputs";
import { IntegrationsFrame } from "@/components/SalesAssistantProductPage";
import { WhatsAppShareWorksMock } from "@/components/shared/ArtworkAddInMocks";

/** Sell: the Gmail screen, then the WhatsApp one, taking turns, each with its small label. */
function SellVisual({ labels, action }: { labels: readonly string[]; action: string }) {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (reduceMotion) return;
    const timer = window.setInterval(() => setIndex((i) => (i + 1) % 2), 7000);
    return () => window.clearInterval(timer);
  }, [reduceMotion]);
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={index}
        className="h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {index === 0 ? <IntegrationsFrame /> : <WhatsAppShareWorksMock />}
        <CardCaption title={labels[index]} action={action} />
      </motion.div>
    </AnimatePresence>
  );
}

export type PillarsCopy = {
  title: string;
  /** "Explore" at the right of each screen's small label. */
  action: string;
  pillars: {
    verb: string;
    title: string;
    body: string;
    /** Link text, with its arrow. */
    link: string;
    href: string;
    /** Small label(s) under the animation: one per screen shown. */
    labels: readonly string[];
  }[];
};

export const PILLARS_EN: PillarsCopy = {
  title: "Two things, one product.",
  action: "Explore",
  pillars: [
    {
      verb: "Sell",
      title: "Your artworks, ready in Gmail and WhatsApp.",
      body: "Find a work, its price and availability, and send it where the collector wrote.",
      link: "See the sales tools →",
      href: "/product/sales-conversations",
      labels: ["Gmail", "WhatsApp"],
    },
    {
      verb: "Remember",
      title: "Every collector, remembered.",
      body: "Who asked, what you sent, who is waiting. The CRM fills in as you work.",
      link: "See the memory ↓",
      href: "#remember",
      labels: ["Inventory"],
    },
  ],
};

/** The page's map: the two halves of Good Artworks, each linking to its section below. */
export function PillarsSection({ copy }: { copy: PillarsCopy }) {
  return (
    <section className={`${SECTION} bg-white`}>
      <div className={CONTAINER}>
        <h2 className={H2}>{copy.title}</h2>
        <div className="mt-10 grid gap-4 md:mt-12 md:grid-cols-2 md:gap-6">
          {copy.pillars.map((pillar) => (
            <a
              key={pillar.verb}
              href={pillar.href}
              className="group flex flex-col overflow-hidden rounded-[12px] bg-[#F5F5F3] transition-colors duration-200 hover:bg-[#EFEFEC]"
            >
              <span className="flex flex-col p-7 pb-0 md:p-9 md:pb-0">
                <span className="font-display text-[20px] font-medium leading-[1.1] tracking-[-0.03em] text-[#111110] md:text-[22px]">
                  {pillar.verb}
                </span>
                <span className="mt-2 font-display text-[15px] font-medium leading-[1.3] tracking-[-0.02em] text-[#111110] md:text-[16px]">
                  {pillar.title}
                </span>
                <span className={`${BODY} mt-2 max-w-md`}>{pillar.body}</span>
                <span className="mt-6 text-[14px] text-[#6B6A67] transition-colors group-hover:text-[#111110]">
                  {pillar.link}
                </span>
              </span>
              <span
                aria-hidden="true"
                className="pointer-events-none relative mx-7 mb-7 mt-8 block h-[300px] overflow-hidden rounded-[12px] border border-[#E8E8E6] bg-white md:mx-9 md:mb-9 md:h-[360px] [&_.bg-\[\#F5F5F3\]]:bg-white [&_.bg-\[\#F8F8F6\]]:bg-white"
              >
                {pillar.verb === copy.pillars[0].verb ? (
                  <SellVisual labels={pillar.labels} action={copy.action} />
                ) : (
                  <>
                    <DatabaseAssistantMockup />
                    <CardCaption title={pillar.labels[0]} action={copy.action} />
                  </>
                )}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function LandingPillars() {
  return <PillarsSection copy={PILLARS_EN} />;
}
