"use client";

import { motion } from "framer-motion";
import LandingNav from "@/components/landing/LandingNav";
import LandingCta from "@/components/landing/LandingCta";
import { BODY, CONTAINER, EYEBROW, H2, SECTION } from "@/components/landing/styles";

const ease = [0.16, 1, 0.3, 1] as const;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, ease, delay },
});

const LETTER = {
  title: "The next generation of galleries will be built differently",
  paragraphs: [
    "Galleries have always been built on artists, judgment and relationships.",
    "That should not change.",
    "But the work behind a gallery has become more demanding. Even small teams must now manage artwork records, keep a website current, prepare private material and follow collector conversations across multiple channels.",
    "The cultural work remains visible. Behind it, the operational burden keeps growing.",
    "Good Artworks was created around a simple idea: galleries should be able to operate professionally without becoming larger, heavier or more technical.",
    "Artwork information should be entered once and reused across the website, private selections, emails and PDFs.",
    "Technology should not replace judgment or relationships. It should support them.",
    "A stronger operational system helps galleries respond faster, follow up more consistently and spend more time with artists, exhibitions and collectors.",
    "For established galleries, this means more control and less dependency.",
    "For younger gallerists, it means starting with professional foundations before building a larger team.",
    "Good Artworks is being built for both.",
  ],
  signature: { name: "Raphaël", role: "Founder, Good Artworks" },
};

const AUDIENCES = [
  {
    title: "For established galleries",
    text: "Good Artworks strengthens existing operations.",
  },
  {
    title: "For new gallerists",
    text: "It provides the infrastructure to start professionally without building a large team from day one.",
  },
];

export default function AboutPage() {
  return (
    <main className="relative bg-white">
      <LandingNav />

      <section className={`${SECTION} pt-32 md:pt-40`}>
        <div className={CONTAINER}>
          <p className={EYEBROW}>About Good Artworks</p>
          <h1 className={`${H2} mt-4 max-w-2xl`}>Build the gallery you want to run.</h1>
          <p className={`${BODY} mt-5 max-w-2xl`}>
            Better systems for your artists, collectors and daily work.
          </p>
        </div>
      </section>

      <section className="bg-white px-4 pb-14 md:px-6 md:pb-[72px]">
        <div className={CONTAINER}>
          <motion.div {...fadeUp(0)} className="max-w-[36rem]">
            <h2 className="font-display text-[18px] font-normal leading-[1.3] tracking-[-0.02em] text-[#111110] md:text-[20px]">
              {LETTER.title}
            </h2>

            <div className="mt-7 space-y-3">
              {LETTER.paragraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-[15px] leading-[1.7] tracking-[-0.01em] text-[#6B6A67] md:text-[16px]"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-10 border-t border-[#E8E8E6] pt-6">
              <p className="text-[14px] leading-[1.5] tracking-[-0.01em] text-[#111110] md:text-[15px]">
                {LETTER.signature.name}
              </p>
              <p className="mt-0.5 text-[13px] leading-[1.5] tracking-[-0.01em] text-[#6B6A67] md:text-[14px]">
                {LETTER.signature.role}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-white px-4 pb-14 md:px-6 md:pb-[72px]">
        <div className={CONTAINER}>
          <div className="grid gap-3 md:grid-cols-2 md:gap-4">
            {AUDIENCES.map((audience, index) => (
              <motion.div
                key={audience.title}
                {...fadeUp(index * 0.06)}
                className="rounded-[12px] bg-[#F5F5F3] px-6 py-7 md:px-7 md:py-8"
              >
                <h2 className="font-display text-[18px] font-normal leading-[1.3] tracking-[-0.02em] text-[#111110] md:text-[20px]">
                  {audience.title}
                </h2>
                <p className="mt-3 max-w-sm text-[14px] leading-[1.6] tracking-[-0.01em] text-[#6B6A67] md:text-[15px]">
                  {audience.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <LandingCta />
    </main>
  );
}
