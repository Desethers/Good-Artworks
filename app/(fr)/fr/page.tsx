import type { Metadata } from "next";
import LandingNavFr from "@/components/landing/LandingNavFr";
import { GlideHero } from "@/components/landing/glide/GlideHome";
import ConversationSections, {
  CONVERSATION_SECTIONS_FR,
} from "@/components/landing/conversations/ConversationSections";
import LandingOffersFr from "@/components/landing/LandingOffersFr";
import LandingFaqFr from "@/components/landing/LandingFaqFr";
import LandingCtaFr from "@/components/landing/LandingCtaFr";

import { alternates } from "@/lib/seo";

export const metadata: Metadata = {
  title: {
    absolute: "Vitreen — Votre inventaire dans Gmail et WhatsApp",
  },
  description:
    "Retrouvez n’importe quelle œuvre de votre inventaire et envoyez sa fiche depuis Gmail ou WhatsApp. Pour les galeries d’art, marchands de design et antiquaires.",
  alternates: alternates("fr", "/"),
  openGraph: {
    url: "/fr",
    title: "Vitreen — Votre inventaire dans Gmail et WhatsApp",
    description:
      "Retrouvez n’importe quelle œuvre de votre inventaire et envoyez sa fiche depuis Gmail ou WhatsApp. Pour les galeries d’art, marchands de design et antiquaires.",
  },
};

export default function Home() {
  return (
    <main className="relative bg-white">
      <LandingNavFr />
      <GlideHero showConnectionScene={false} lang="fr" />
      <ConversationSections copy={CONVERSATION_SECTIONS_FR} />
      <LandingOffersFr />
      <LandingFaqFr />
      <LandingCtaFr />
    </main>
  );
}
