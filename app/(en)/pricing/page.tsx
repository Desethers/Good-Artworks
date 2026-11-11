import type { Metadata } from "next";
import PageStructuredData from "@/components/PageStructuredData";
import PricingPage from "@/components/PricingPage";
import { pageMetadata } from "@/lib/seo";

const seo = {
  lang: "en",
  path: "/pricing",
  title: "Pricing",
  description:
    "A clear setup price and monthly partnership for a Good Artworks system built around your gallery.",
} as const;

export const metadata: Metadata = pageMetadata(seo);

export default function Page() {
  return (
    <>
      <PageStructuredData {...seo} />
      <PricingPage />
    </>
  );
}
