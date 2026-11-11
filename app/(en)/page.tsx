import type { Metadata } from "next";
import LandingNav from "@/components/landing/LandingNav";
import { GlideHero } from "@/components/landing/glide/GlideHome";
import ConversationSections, {
  CONVERSATION_SECTIONS_EN,
} from "@/components/landing/conversations/ConversationSections";
import LandingOffers from "@/components/landing/LandingOffers";
import LandingFaq from "@/components/landing/LandingFaq";
import LandingCta from "@/components/landing/LandingCta";

import { alternates } from "@/lib/seo";

export const metadata: Metadata = {
  title: { absolute: "Good Artworks — Your inventory in Gmail and WhatsApp" },
  description:
    "Find any work in your inventory and send its details from Gmail or WhatsApp. For art galleries, design and antique dealers.",
  alternates: alternates("en", "/"),
  openGraph: {
    url: "/",
    title: "Good Artworks — Your inventory in Gmail and WhatsApp",
    description:
      "Find any work in your inventory and send its details from Gmail or WhatsApp. For art galleries, design and antique dealers.",
  },
};

export default function Home() {
  return (
    <main className="relative bg-white">
      <LandingNav />
      <GlideHero showConnectionScene={false} />
      <ConversationSections copy={CONVERSATION_SECTIONS_EN} />
      <LandingOffers />
      <LandingFaq />
      <LandingCta />
    </main>
  );
}
