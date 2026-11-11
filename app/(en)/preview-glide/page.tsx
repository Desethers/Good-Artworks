import type { Metadata } from "next";
import LandingNav from "@/components/landing/LandingNav";
import GlideHome from "@/components/landing/glide/GlideHome";
import LandingOffers from "@/components/landing/LandingOffers";
import LandingFaq from "@/components/landing/LandingFaq";
import LandingCta from "@/components/landing/LandingCta";

export const metadata: Metadata = {
  title: { absolute: "Good Artworks — preview (Glide layout)" },
  robots: { index: false, follow: false },
};

/** Proposal: the home in the layout of glideapps.com. */
export default function Page() {
  return (
    <main className="relative bg-white">
      <LandingNav />
      <GlideHome />
      <LandingOffers />
      <LandingFaq />
      <LandingCta />
    </main>
  );
}
