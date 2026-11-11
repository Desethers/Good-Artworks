"use client";

import { Button } from "@/components/ui/Button";
import { openContact } from "@/components/landing/LandingNav";
import { BODY, CONTAINER, SECTION } from "@/components/landing/styles";

export type FounderCopy = { title: string; body: string; cta: string };

export const FOUNDER_EN: FounderCopy = {
  title: "Built by one founder in Paris. In public.",
  body: "No sales team, no account managers. Founding galleries talk directly to the person who builds Good Artworks, and what they ask for gets built first.",
  cta: "Talk to the founder",
};

/** The indie part: who builds it, and why that matters to a founding gallery. */
export function FounderSection({ copy }: { copy: FounderCopy }) {
  return (
    <section className={`${SECTION} bg-white`}>
      <div className={`${CONTAINER} rounded-[12px] bg-[#F5F5F3] px-7 py-10 md:px-12 md:py-14`}>
        <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-end md:gap-16">
          <div>
            <h2 className="font-display text-[24px] font-medium leading-[1.2] tracking-[-0.02em] text-[#111110] md:text-[32px]">
              {copy.title}
            </h2>
            <p className={`${BODY} mt-4 max-w-2xl`}>{copy.body}</p>
          </div>
          <Button size="lg" onClick={openContact} className="w-full sm:w-auto">
            {copy.cta}
          </Button>
        </div>
      </div>
    </section>
  );
}

export default function LandingFounder() {
  return <FounderSection copy={FOUNDER_EN} />;
}
