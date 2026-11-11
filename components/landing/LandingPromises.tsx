"use client";

import { BODY, CONTAINER, H2, SECTION } from "@/components/landing/styles";

export type PromisesCopy = { title: string; items: { title: string; body: string }[] };

export const PROMISES_EN: PromisesCopy = {
  title: "What Good Artworks will never do.",
  items: [
    {
      title: "Nothing leaves without you.",
      body: "Good Artworks prepares, you review, you send. It never writes to a collector on its own and never invents a price.",
    },
    {
      title: "No new software to learn.",
      body: "It lives in WhatsApp and only sees the messages you send it. Your inventory comes from your spreadsheets or Artlogic exports.",
    },
  ],
};

/** The two fears to lift before the offer: autonomy and yet another tool. */
export function PromisesSection({ copy }: { copy: PromisesCopy }) {
  return (
    <section className={`${SECTION} bg-white`}>
      <div className={CONTAINER}>
        <h2 className={H2}>{copy.title}</h2>
        <div className="mt-10 grid gap-4 md:mt-12 md:grid-cols-2 md:gap-6">
          {copy.items.map((item) => (
            <div key={item.title} className="rounded-[12px] bg-[#F5F5F3] p-7 md:p-9">
              <h3 className="font-display text-[22px] font-medium leading-[1.25] tracking-[-0.02em] text-[#111110]">
                {item.title}
              </h3>
              <p className={`${BODY} mt-3 max-w-md`}>{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function LandingPromises() {
  return <PromisesSection copy={PROMISES_EN} />;
}
