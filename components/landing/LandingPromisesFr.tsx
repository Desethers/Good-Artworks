"use client";

import { PromisesSection, type PromisesCopy } from "@/components/landing/LandingPromises";

const COPY: PromisesCopy = {
  title: "Ce que Good Artworks ne fera jamais.",
  items: [
    {
      title: "Rien ne part sans vous.",
      body: "Good Artworks prépare, vous relisez, vous envoyez. Il n’écrit jamais seul à un collectionneur et n’invente jamais un prix.",
    },
    {
      title: "Aucun nouveau logiciel à apprendre.",
      body: "Il vit dans WhatsApp et ne voit que les messages que vous lui envoyez. Votre inventaire vient de vos tableurs ou de vos exports Artlogic.",
    },
  ],
};

export default function LandingPromisesFr() {
  return <PromisesSection copy={COPY} />;
}
