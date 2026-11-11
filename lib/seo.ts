import type { Metadata } from "next";
import type { Lang } from "@/lib/lang";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://goodart.works";
export const SITE_NAME = "Good Artworks";

/* English is served at the root, French under /fr. Keeping the English URLs
 * unprefixed preserves whatever equity the live pages already have. */
export const SITE: Record<Lang, { title: string; description: string; ogLocale: string }> = {
  en: {
    title: "Good Artworks — Sales and inventory software for art galleries",
    description:
      "Sales and inventory tools for art galleries and dealers in design and collectible objects.",
    ogLocale: "en_GB",
  },
  fr: {
    title:
      "Good Artworks — Outils de vente et inventaire pour l’art, le design et les objets de collection",
    description:
      "Good Artworks propose des outils de vente et de gestion d’inventaire pour les galeries d’art, marchands de design et professionnels des objets de collection. Retrouvez œuvres, prix, disponibilités et relations clients depuis Gmail, WhatsApp et Gallery OS.",
    ogLocale: "fr_FR",
  },
};

export const HTML_LANG: Record<Lang, string> = { en: "en-GB", fr: "fr-FR" };

/** Absolute-path pair for a page, used for canonical + hreflang. */
export function localeUrls(path: string) {
  const clean = path === "/" ? "" : path;
  return { en: clean === "" ? "/" : clean, fr: `/fr${clean}` };
}

/**
 * Canonical + hreflang for one page in one language. Every page must declare
 * both languages so search engines can pair the two versions.
 */
export function alternates(lang: Lang, path: string): Metadata["alternates"] {
  const urls = localeUrls(path);
  return {
    canonical: urls[lang],
    languages: {
      "en-GB": urls.en,
      "fr-FR": urls.fr,
      "x-default": urls.en,
    },
  };
}

/* Short, distinct subjects per audience so the solutions pages never compete
 * with the product pages (which describe features) or with each other. */
export const SOLUTION_SEO: Record<Lang, Record<string, { title: string; description: string }>> = {
  en: {
    galleries: {
      title: "Software for art and design galleries",
      description:
        "A connected website and artwork dashboard built around how your gallery already works, from inventory to collector follow-up.",
    },
    artists: {
      title: "Artwork archive for artists",
      description:
        "Keep your studio inventory in order, publish your artist website and prepare private presentations from the same records.",
    },
    advisors: {
      title: "Software for art advisors and dealers",
      description:
        "Build private artwork selections for clients and keep each conversation attached to the works it concerns.",
    },
  },
  fr: {
    galleries: {
      title: "Logiciel pour galeries d’art et de design",
      description:
        "Un site connecté et un tableau de bord des œuvres construits autour du fonctionnement réel de votre galerie, de l’inventaire au suivi collectionneur.",
    },
    artists: {
      title: "Archive d’œuvres pour artistes",
      description:
        "Gardez l’inventaire de votre atelier en ordre, publiez votre site d’artiste et préparez vos présentations privées depuis les mêmes fiches.",
    },
    advisors: {
      title: "Logiciel pour conseillers en art et marchands",
      description:
        "Composez des sélections d’œuvres privées pour vos clients et gardez chaque échange relié aux œuvres concernées.",
    },
  },
};

/**
 * FAQPage schema built from the FAQ already rendered on the homepage, so the
 * markup can never drift from the visible answers.
 */
export function faqJsonLd(items: readonly { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

/** Page-level metadata shared by both languages. */
export function pageMetadata({
  lang,
  path,
  title,
  description,
}: {
  lang: Lang;
  path: string;
  title: string;
  description: string;
}): Metadata {
  const url = localeUrls(path)[lang];
  return {
    title,
    description,
    alternates: alternates(lang, path),
    openGraph: {
      url,
      title: `${title} — ${SITE_NAME}`,
      description,
      locale: SITE[lang].ogLocale,
    },
  };
}
