import type { MetadataRoute } from "next";
import { ROLE_PATH_SLUGS } from "@/lib/solutions";
import { SITE_URL, localeUrls } from "@/lib/seo";

/* Les canoniques rendues par `alternates()` n'ont pas de slash final ("/" est
 * résolu en https://goodart.works). Le sitemap doit déclarer exactement la même
 * chaîne, sinon la racine y apparaît sous une forme que la page elle-même ne
 * revendique pas. */
function abs(path: string) {
  return `${SITE_URL}${path === "/" ? "" : path}`;
}

/* Only the product pages we actually link to and want indexed. */
const productSlugs = ["artwork-inventory", "sales-conversations", "collectors-memory"] as const;

/** Every indexable path, unprefixed. English is served here, French under /fr. */
const paths: string[] = [
  "/",
  "/about",
  "/pricing",
  ...productSlugs.map((slug) => `/product/${slug}`),
  ...ROLE_PATH_SLUGS.map((role) => `/solutions/${role}`),
];

function priorityFor(path: string) {
  if (path === "/") return 1;
  return 0.7;
}

export default function sitemap(): MetadataRoute.Sitemap {
  /* Each entry declares both languages so the two versions are paired rather
   * than read as duplicates. */
  const entries: MetadataRoute.Sitemap = paths.flatMap((path) => {
    const urls = localeUrls(path);
    const languages = {
      "en-GB": abs(urls.en),
      "fr-FR": abs(urls.fr),
      "x-default": abs(urls.en),
    };

    return (["en", "fr"] as const).map((lang) => ({
      url: abs(urls[lang]),
      changeFrequency: path === "/" ? ("weekly" as const) : ("monthly" as const),
      priority: priorityFor(path),
      alternates: { languages },
    }));
  });

  return entries;
}
