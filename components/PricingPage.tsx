"use client";

import LandingNav from "@/components/landing/LandingNav";
import LandingCta from "@/components/landing/LandingCta";
import { Offers } from "@/components/landing/Offers";
import { PricingFaqItem } from "@/components/landing/PricingFaqItem";
import { CONTAINER, EYEBROW, H2, H2_SUB } from "@/components/landing/styles";

const FAQ = [
  {
    q: "Who owns my data?",
    a: "You do. A complete export is available at any time.",
  },
  {
    q: "What is Early Access?",
    a: "The first three galleries on Good Artworks pay €49/month and keep that rate for as long as their subscription stays active. After that, the price is €99/month.",
  },
  {
    q: "Is there a commitment?",
    a: "No. Good Artworks is month to month, and you can cancel anytime.",
  },
  {
    q: "What happens if I stop?",
    a: "You keep your data. A complete export is available at any time.",
  },
  {
    q: "How long does setup take?",
    a: "About a week: we import your inventory, connect Gmail and WhatsApp, and walk your team through it.",
  },
  {
    q: "Who keeps the system running day to day?",
    a: "Your team, using Good Artworks independently. Early Access galleries also have a direct line to the founder.",
  },
];

export default function PricingPage() {
  return (
    <main className="relative bg-white">
      <LandingNav />

      <section className="px-4 pt-32 md:px-6 md:pt-40">
        <div className={CONTAINER}>
          <div className="mx-auto max-w-2xl text-center">
            <p className={EYEBROW}>Pricing</p>
            <h1 className={`${H2} mt-4`}>Clear costs, no surprise.</h1>
            <p className={H2_SUB}>One simple price. No commitment.</p>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 pt-16 md:px-6 md:pt-20">
        <div className={CONTAINER}>
          <Offers lang="en" />
        </div>
      </section>

      <section className="bg-white px-4 pt-24 pb-8 md:px-6 md:pt-28">
        <div className="mx-auto w-full max-w-4xl">
          <h2 className={`${H2} max-w-2xl`}>Questions about the offer</h2>
          <div className="mt-8">
            {FAQ.map((item) => (
              <PricingFaqItem key={item.q} question={item.q} answer={item.a} />
            ))}
          </div>
        </div>
      </section>

      <LandingCta />
    </main>
  );
}
