"use client";

import { motion } from "framer-motion";
import LandingNavFr from "@/components/landing/LandingNavFr";
import LandingCtaFr from "@/components/landing/LandingCtaFr";
import { BODY, CONTAINER, EYEBROW, H2, SECTION } from "@/components/landing/styles";

const ease = [0.16, 1, 0.3, 1] as const;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, ease, delay },
});

const LETTER = {
  title: "Les galeries de demain se construiront autrement",
  paragraphs: [
    "Le marché de l’art repose encore sur les relations, le jugement et la confiance. Cela ne devrait pas changer.",
    "Mais le travail opérationnel derrière ces relations devient plus lourd.",
    "On attend des petites galeries qu’elles tiennent des fiches d’œuvres justes, un site à jour, une communication soignée avec leurs collectionneurs et du matériel privé irréprochable — souvent avec une équipe très réduite.",
    "Good Artworks a été créé pour leur donner une meilleure infrastructure.",
    "Nous relions l’information des œuvres aux endroits où la galerie travaille déjà : son site, ses emails, ses PDFs, ses sélections privées et ses conversations avec les collectionneurs.",
    "L’objectif n’est pas de remplacer la part humaine de la galerie. C’est de la soutenir.",
    "Quand l’information est organisée et prête à l’emploi, l’équipe répond plus vite, relance plus régulièrement et passe plus de temps à construire des relations.",
    "Pour les galeries établies, Good Artworks renforce les opérations existantes.",
    "Pour une nouvelle génération de galeristes, il offre un moyen de démarrer avec les capacités d’une structure plus grande, sans en porter les coûts.",
    "Nous pensons que les galeries qui resteront compétitives ne seront pas celles qui utilisent le plus de technologie. Ce seront celles qui l’utilisent avec le plus de clarté.",
  ],
  signature: { name: "Raphaël", role: "Fondateur, Good Artworks" },
};

const AUDIENCES = [
  {
    title: "Pour les galeries établies",
    text: "Good Artworks renforce les opérations existantes.",
  },
  {
    title: "Pour les galeristes qui débutent",
    text: "Il apporte l’infrastructure pour démarrer professionnellement sans constituer une grande équipe dès le premier jour.",
  },
];

export default function AboutPageFr() {
  return (
    <main className="relative bg-white">
      <LandingNavFr />

      <section className={`${SECTION} pt-32 md:pt-40`}>
        <div className={CONTAINER}>
          <p className={EYEBROW}>À propos de Good Artworks</p>
          <h1 className={`${H2} mt-4 max-w-2xl`}>
            Construisez la galerie que vous voulez diriger.
          </h1>
          <p className={`${BODY} mt-5 max-w-2xl`}>
            Des outils mieux pensés pour vos artistes, vos collectionneurs et votre quotidien.
          </p>
        </div>
      </section>

      <section className="border-t border-[#E8E8E6] bg-white px-4 pb-14 md:px-6 md:pb-[72px]">
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

      <section className="border-t border-[#E8E8E6] bg-white px-4 pb-14 md:px-6 md:pb-[72px]">
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

      <LandingCtaFr />
    </main>
  );
}
