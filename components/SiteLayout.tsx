import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { LangProvider } from "@/components/LangProvider";
import type { Lang } from "@/lib/lang";
import { HTML_LANG, SITE, SITE_NAME, SITE_URL } from "@/lib/seo";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

/* Shared shell for both root layouts. English lives at "/", French at "/fr",
 * and each group renders its own <html lang> so the language is correct in the
 * served HTML rather than only after hydration. */
export default function SiteLayout({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  const site = SITE[lang];

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/icon.png`,
    description: site.description,
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: HTML_LANG[lang],
    publisher: { "@id": `${SITE_URL}/#organization` },
  };

  const softwareJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Good Artworks",
    url: SITE_URL,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description: site.description,
    audience: {
      "@type": "Audience",
      audienceType:
        lang === "fr"
          ? "Galeries d’art, artistes, conseillers en art et marchands"
          : "Art galleries, artists, art advisors and dealers",
    },
    provider: { "@id": `${SITE_URL}/#organization` },
  };

  return (
    <html lang={HTML_LANG[lang]} className={inter.variable}>
      <head>
        <link rel="preload" as="image" href="/allen14.jpg-preview3.jpg" fetchPriority="high" />
        {/* Marque le document quand le site est embarqué dans une iframe
            (portfolio) : la scrollbar est masquée via globals.css. Exécuté
            avant le premier rendu pour éviter tout flash de scrollbar. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(window.self!==window.top)document.documentElement.classList.add('is-embedded')}catch(e){document.documentElement.classList.add('is-embedded')}",
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }}
        />
      </head>
      <body className="antialiased bg-white font-sans">
        <LangProvider lang={lang}>{children}</LangProvider>
        <Analytics />
      </body>
    </html>
  );
}
