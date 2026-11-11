import type { Metadata } from "next";
import PageStructuredData from "@/components/PageStructuredData";
import PricingPageFr from "@/components/PricingPageFr";
import { pageMetadata } from "@/lib/seo";

const seo = {
  lang: "fr",
  path: "/pricing",
  title: "Tarifs",
  description:
    "Un prix d’installation clair et un partenariat mensuel pour un système Good Artworks construit autour de votre galerie.",
} as const;

export const metadata: Metadata = pageMetadata(seo);

export default function Page() {
  return (
    <>
      <PageStructuredData {...seo} />
      <PricingPageFr />
    </>
  );
}
