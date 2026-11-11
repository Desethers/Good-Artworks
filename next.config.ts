import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  turbopack: {
    root: __dirname,
  },
  images: {
    // Ajouté pour que les composants qui utilisent `quality={92}` puissent vraiment
    // produire du q=92 au lieu de retomber sur la valeur par défaut (75).
    qualities: [75, 92],
    // Photos Unsplash (licence libre) servies depuis leur CDN.
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
  async redirects() {
    /* L'ordre compte : Next applique la première règle qui matche et renvoie
     * un 308 au client. Les règles les plus spécifiques doivent donc précéder
     * les génériques, sinon /products/archive part sur /tools/archive et se
     * fait rediriger une seconde fois — une chaîne que Google suit mais qui
     * dilue le signal. */
    return [
      /* Studio a quitté Good Artworks : le site vit désormais sur son propre domaine.
       * La redirection préserve la structure de chemin, donc /studio/fr arrive
       * sur forart.world/fr et les anciennes URL d'images retombent sur leurs
       * équivalentes — un seul saut dans tous les cas. */
      { source: "/studio", destination: "https://forart.world", permanent: true },
      {
        source: "/studio/:path*",
        destination: "https://forart.world/:path*",
        permanent: true,
      },
      /* Pages renommées pour des URL lisibles (2026-10) : /tools/* devient
       * /product/*, les solutions prennent un slug explicite, Viewing Rooms et
       * Artistes ne sont plus publiées. Chaque ancienne URL — y compris les
       * plus anciennes (/products/*, /tools/archive, custom-operations) — va
       * directement à sa destination finale, sans chaîne. */
      ...[
        ["/tools/artwork-inventory", "/product/artwork-inventory"],
        ["/tools/archive", "/product/artwork-inventory"],
        ["/products/archive", "/product/artwork-inventory"],
        ["/products/artwork-inventory", "/product/artwork-inventory"],
        ["/tools/sales-assistant", "/product/sales-conversations"],
        ["/tools/custom-operations", "/product/sales-conversations"],
        ["/products/custom-operations", "/product/sales-conversations"],
        ["/products/sales-assistant", "/product/sales-conversations"],
        ["/solutions/galleries", "/solutions/art-galleries"],
        ["/solutions/advisors", "/solutions/art-advisors-dealers"],
        ["/tools/viewing-rooms", "/"],
        ["/products/viewing-rooms", "/"],
        ["/solutions/artists", "/"],
      ].flatMap(([source, destination]) => [
        { source, destination, permanent: true },
        {
          source: `/fr${source}`,
          destination: destination === "/" ? "/fr" : `/fr${destination}`,
          permanent: true,
        },
      ]),
    ];
  },
};

export default nextConfig;
