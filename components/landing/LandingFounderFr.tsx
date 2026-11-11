"use client";

import { FounderSection, type FounderCopy } from "@/components/landing/LandingFounder";

const COPY: FounderCopy = {
  title: "Construit par un seul fondateur à Paris. En public.",
  body: "Pas d’équipe commerciale, pas de chargé de compte. Les galeries fondatrices parlent directement à la personne qui construit Good Artworks, et ce qu’elles demandent est construit en premier.",
  cta: "Parler au fondateur",
};

export default function LandingFounderFr() {
  return <FounderSection copy={COPY} />;
}
