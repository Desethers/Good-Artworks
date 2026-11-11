import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import { SITE, SITE_NAME, SITE_URL, alternates } from "@/lib/seo";

import "../globals.css";

const site = SITE.fr;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: site.title, template: "%s — Good Artworks" },
  description: site.description,
  applicationName: SITE_NAME,
  authors: [{ name: "Good Artworks" }],
  creator: "Good Artworks",
  publisher: "Good Artworks",
  formatDetection: { email: false, address: false, telephone: false },
  alternates: alternates("fr", "/"),
  openGraph: {
    type: "website",
    locale: site.ogLocale,
    url: "/fr",
    siteName: SITE_NAME,
    title: site.title,
    description: site.description,
    images: [
      {
        url: "/paula-cooper-background.jpg",
        width: 1600,
        height: 1000,
        alt: site.title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    images: ["/paula-cooper-background.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/icon.png",
    shortcut: "/favicon.png",
    apple: "/icon.png",
  },
  category: "technology",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <SiteLayout lang="fr">{children}</SiteLayout>;
}
