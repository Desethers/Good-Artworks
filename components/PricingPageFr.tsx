"use client";

import LandingNavFr from "@/components/landing/LandingNavFr";
import LandingCtaFr from "@/components/landing/LandingCtaFr";
import { Offers } from "@/components/landing/Offers";
import { PricingFaqItem } from "@/components/landing/PricingFaqItem";
import { CONTAINER, EYEBROW, H2, H2_SUB } from "@/components/landing/styles";

const FAQ = [
  {
    q: "À qui appartiennent mes données ?",
    a: "À vous. Un export complet est possible à tout moment.",
  },
  {
    q: "Qu’est-ce que l’offre de lancement ?",
    a: "Les trois premières galeries sur Good Artworks paient 49 €/mois et gardent ce tarif tant que leur abonnement reste actif. Ensuite, le prix est de 99 €/mois.",
  },
  {
    q: "Y a-t-il un engagement ?",
    a: "Non. Good Artworks se paie au mois, et vous pouvez résilier à tout moment.",
  },
  {
    q: "Que se passe-t-il si j’arrête ?",
    a: "Vous gardez vos données. Un export complet est possible à tout moment.",
  },
  {
    q: "Combien de temps dure l’installation ?",
    a: "Une semaine environ : nous importons votre inventaire, connectons Gmail et WhatsApp, et accompagnons la prise en main de votre équipe.",
  },
  {
    q: "Qui fait fonctionner le système au quotidien ?",
    a: "Votre équipe, en autonomie avec Good Artworks. Les galeries de l’offre de lancement ont aussi une ligne directe avec le fondateur.",
  },
];

export default function PricingPageFr() {
  return (
    <main className="relative bg-white">
      <LandingNavFr />

      <section className="px-4 pt-32 md:px-6 md:pt-40">
        <div className={CONTAINER}>
          <div className="mx-auto max-w-2xl text-center">
            <p className={EYEBROW}>Tarifs</p>
            <h1 className={`${H2} mt-4`}>Un prix clair, aucune surprise.</h1>
            <p className={H2_SUB}>Un seul prix simple. Sans engagement.</p>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 pt-16 md:px-6 md:pt-20">
        <div className={CONTAINER}>
          <Offers lang="fr" />
        </div>
      </section>

      <section className="bg-white px-4 pt-24 pb-8 md:px-6 md:pt-28">
        <div className="mx-auto w-full max-w-4xl">
          <h2 className={`${H2} max-w-2xl`}>Questions sur l’offre</h2>
          <div className="mt-8">
            {FAQ.map((item) => (
              <PricingFaqItem key={item.q} question={item.q} answer={item.a} />
            ))}
          </div>
        </div>
      </section>

      <LandingCtaFr />
    </main>
  );
}
