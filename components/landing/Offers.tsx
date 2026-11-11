"use client";

import { Button } from "@/components/ui/Button";
import { openContact } from "@/components/landing/LandingNav";

/*
 * The single Early Access card, used by the home (LandingOffers /
 * LandingOffersFr) and /pricing (PricingPage / PricingPageFr).
 * Any pricing change happens here, in both languages.
 */

type Copy = {
  label: string;
  price: string;
  per: string;
  description: string;
  features: { title: string; detail: string }[];
  terms: string;
  cta: string;
  footer: string;
};

const COPY: Record<"en" | "fr", Copy> = {
  en: {
    label: "Early Access",
    price: "€49",
    per: "/month",
    description: "Your artwork inventory, connected to Gmail and WhatsApp.",
    features: [
      {
        title: "Artwork inventory",
        detail: "Keep artworks, prices and availability organised.",
      },
      {
        title: "Gmail & WhatsApp",
        detail: "Find and share artwork information directly from your conversations.",
      },
      {
        title: "Artwork activity",
        detail: "Keep track of which works you’ve shared and with whom.",
      },
    ],
    terms: "No commitment. Cancel anytime.",
    cta: "Get early access",
    footer:
      "Only 3 galleries at this price. Keep your rate for as long as you stay. €99/month thereafter.",
  },
  fr: {
    label: "Offre de lancement",
    price: "49 €",
    per: "/mois",
    description: "Votre inventaire d’œuvres, connecté à Gmail et WhatsApp.",
    features: [
      {
        title: "Inventaire des œuvres",
        detail: "Centralisez vos œuvres, leurs prix et leurs disponibilités.",
      },
      {
        title: "Gmail & WhatsApp",
        detail:
          "Retrouvez et partagez les informations de vos œuvres directement depuis vos conversations.",
      },
      {
        title: "Suivi des œuvres",
        detail: "Retrouvez quelles œuvres ont été partagées et avec quels contacts.",
      },
    ],
    terms: "Sans engagement. Résiliable à tout moment.",
    cta: "Rejoindre Good Artworks",
    footer:
      "Offre réservée aux 3 premières galeries. Conservez votre tarif tant que votre abonnement reste actif. Puis 99 €/mois pour les nouveaux clients.",
  },
};

function CheckIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#ADADAA"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="mt-[3px] shrink-0"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export function Offers({ lang }: { lang: "en" | "fr" }) {
  const copy = COPY[lang];
  return (
    <article className="mx-auto flex max-w-xl flex-col rounded-[12px] bg-[#F5F5F3] p-6 md:p-10">
      <span className="w-fit rounded-full border border-[#DCDCD8] px-3 py-1 text-[12px] text-[#6B6A67]">
        {copy.label}
      </span>

      <p className="mt-8 flex items-baseline gap-1.5">
        <span className="font-display text-[56px] leading-none tracking-[-0.04em] text-[#111110] md:text-[72px]">
          {copy.price}
        </span>
        <span className="text-[16px] text-[#6B6A67]">{copy.per}</span>
      </p>

      <p className="mt-5 text-[15px] leading-[1.5] tracking-[-0.01em] text-[#111110] md:text-[17px]">
        {copy.description}
      </p>

      <ul className="mt-8 flex list-none flex-col gap-4 border-t border-[#E1E1DE] pl-0 pt-8">
        {copy.features.map((f) => (
          <li key={f.title} className="flex items-start gap-3">
            <CheckIcon />
            <p className="text-[14px] leading-[1.5] md:text-[15px]">
              <span className="text-[#111110]">{f.title}</span>
              <span className="text-[#6B6A67]"> — {f.detail}</span>
            </p>
          </li>
        ))}
      </ul>

      <p className="mt-8 text-[13px] text-[#6B6A67]">{copy.terms}</p>

      <Button size="lg" onClick={openContact} className="mt-3 w-full">
        {copy.cta}
      </Button>

      <p className="mt-5 text-[12px] leading-[1.55] text-[#ADADAA]">{copy.footer}</p>
    </article>
  );
}
