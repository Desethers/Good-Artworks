"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CONTAINER, EYEBROW, H2, H2_SUB, SECTION } from "@/components/landing/styles";

type Language = "en" | "fr";

/** One accent per card for the hover link (same order as the audiences). */
const LINK_COLORS = ["#4B5FC0", "#B5602B", "#2F8063", "#9B4F8B"] as const;

const content = {
  en: {
    eyebrow: "Who it's for",
    title: "Who is Good Artworks for?",
    subtitle: "Built for the people who present and sell art.",
    exploreLabel: "For",
    audiences: [
      {
        title: "Art Galleries",
        description: "Artwork inventory, collector replies and private selections.",
        href: "/solutions/art-galleries",
        image: "/gallery-screen2.png",
        objectPosition: "55% 50%",
        imageScale: "scale-110",
      },
      {
        title: "Design Galleries",
        description: "Pieces, availability and client presentations.",
        href: "/solutions/design-galleries",
        image: "/Design-gallery.png",
      },
      {
        title: "Art Advisors",
        description: "Private selections and client-ready artwork information.",
        href: "/solutions/art-advisors-dealers",
        image: "/artadvisor.png",
      },
      {
        title: "Antique & Collectibles Dealers",
        description: "Unique pieces, provenance and condition, ready for every client.",
        href: "/solutions/antique-dealers",
        image: "https://images.unsplash.com/photo-1667916468910-d310ec444154?w=1200&q=80",
        objectPosition: "50% 50%",
      },
    ],
  },
  fr: {
    eyebrow: "Pour qui",
    title: "À qui s’adresse Good Artworks ?",
    subtitle: "Pensé pour celles et ceux qui présentent et vendent l’art.",
    exploreLabel: "Pour",
    audiences: [
      {
        title: "Galeries d’art",
        description: "Inventaire d’œuvres, réponses collectionneurs et sélections privées.",
        href: "/fr/solutions/art-galleries",
        image: "/gallery-screen2.png",
        objectPosition: "55% 50%",
        imageScale: "scale-110",
      },
      {
        title: "Galeries de design",
        description: "Pièces, disponibilités et présentations clients.",
        href: "/fr/solutions/design-galleries",
        image: "/Design-gallery.png",
      },
      {
        title: "Art advisors",
        description: "Sélections privées et fiches d’œuvres prêtes pour vos clients.",
        href: "/fr/solutions/art-advisors-dealers",
        image: "/artadvisor.png",
      },
      {
        title: "Antiquaires",
        description: "Pièces uniques, provenance et état, prêts pour chaque client.",
        href: "/fr/solutions/antique-dealers",
        image: "https://images.unsplash.com/photo-1667916468910-d310ec444154?w=1200&q=80",
        objectPosition: "50% 50%",
      },
    ],
  },
} as const;

export default function WhoVitreenIsFor({ lang = "en" }: { lang?: Language }) {
  const section = content[lang];

  return (
    <section className={`${SECTION} bg-white`}>
      <div className={CONTAINER}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className={EYEBROW}>{section.eyebrow}</p>
          <h2 className={`${H2} mt-5 max-w-2xl`}>{section.title}</h2>
          <p className={H2_SUB}>{section.subtitle}</p>
        </motion.div>

        {/* Phones: a swipeable row of smaller cards that peeks at the next one. */}
        <div className="-mx-4 mt-10 flex snap-x snap-mandatory scroll-pl-4 items-start gap-3 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-4 sm:overflow-visible sm:px-0 sm:pb-0 md:mt-12 xl:grid-cols-4 xl:gap-6 [&::-webkit-scrollbar]:hidden">
          {section.audiences.map((audience, index) => (
            <motion.a
              key={audience.title}
              href={audience.href}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.18 }}
              transition={{ duration: 0.5, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
              className="group relative flex w-[78%] shrink-0 snap-start flex-col overflow-hidden rounded-[12px] bg-[#f5f5f3] p-6 sm:w-auto sm:p-7"
            >
              <h3 className="font-display text-[18px] font-normal leading-[1.25] tracking-[-0.02em] text-[#111110]">
                {audience.title}
              </h3>
              <p className="mt-3 max-w-[220px] text-[14px] leading-[1.48] tracking-[-0.025em] text-[#6B6A67]">
                {audience.description}
              </p>
              <div className="relative z-10 grid grid-rows-[0fr] opacity-0 transition-[grid-template-rows,opacity] duration-300 ease-out group-hover:grid-rows-[1fr] group-hover:opacity-100 group-focus-visible:grid-rows-[1fr] group-focus-visible:opacity-100 [@media(hover:none)]:grid-rows-[1fr] [@media(hover:none)]:opacity-100">
                <div className="overflow-hidden">
                  <p
                    className="pt-3 text-[13px] tracking-[-0.01em]"
                    style={{ color: LINK_COLORS[index] }}
                  >
                    {section.exploreLabel} {audience.title} ↗
                  </p>
                </div>
              </div>
              <div className="relative -mb-2 -mr-6 mt-7 aspect-[0.9] overflow-hidden rounded-l-[12px] sm:-mr-7 sm:mt-9">
                <Image
                  src={audience.image}
                  alt=""
                  fill
                  sizes="(min-width: 1280px) 23vw, (min-width: 640px) 45vw, 75vw"
                  className={`object-cover transition-transform duration-500 group-hover:scale-[1.025] ${"imageScale" in audience ? audience.imageScale : ""}`}
                  style={{
                    objectPosition:
                      "objectPosition" in audience ? audience.objectPosition : "72% 50%",
                  }}
                />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
