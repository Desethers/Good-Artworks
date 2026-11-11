import type { Metadata } from "next";
import type { Lang } from "@/lib/lang";
import { pageMetadata } from "@/lib/seo";

/*
 * Content of the secondary pages (product, solutions, about), one entry per
 * page and per language. Every page uses the same template (SeoPage): a hero
 * that carries the page's search phrase, one product visual, three or four
 * blocks, then the shared CTA and footer. Only what Good Artworks does today.
 */

export type SeoPageId =
  | "inventory"
  | "conversations"
  | "collectors-memory"
  | "art-galleries"
  | "design-galleries"
  | "advisors"
  | "antique-dealers"
  | "about";

/** Product visuals reused from the existing pages, or a photo for the audiences that have none yet. */
export type SeoVisual =
  | { kind: "artworkList" }
  | { kind: "artworkForm" }
  | { kind: "inquiryDraft" }
  | { kind: "video"; src: string; poster: string; label: string }
  | { kind: "advisorSelection" }
  | { kind: "memoryFeed" }
  | { kind: "photo"; src: string; alt: string };

/** Visuals of the step-by-step section, reused from the home and the add-in mocks. */
export type SeoStepVisual =
  | "migration"
  | "artworkForm"
  | "dataSafety"
  | "gmail"
  | "whatsappPdf"
  | "memory"
  | "collectorRecord"
  | "followUpKinds";

export type SeoPageCopy = {
  /** <title> and meta description. */
  meta: { title: string; description: string };
  eyebrow: string;
  title: string;
  /** Line under the title; leave out for a page without one (About). */
  sub?: string;
  /** Hero button label; leave out for a page without one (About). */
  cta?: string;
  visual?: SeoVisual;
  /** How it works, in order: one visual and one short text per step, sides alternating. */
  steps?: {
    title: string;
    body: string;
    visual: SeoStepVisual;
    /** Words of the body that link to another page of the site. */
    links?: { text: string; href: string }[];
  }[];
  /** Centred heading above the steps. */
  stepsTitle?: string;
  blocks?: { title: string; items: string[] }[];
  /** Running text instead of blocks (about page). The last line is the signature. */
  prose?: string[];
  /** One plain sentence that says what the product is, under the visual; written to be quoted. */
  definition?: string;
  /** What the product does, for the SoftwareApplication structured data of a product page. */
  featureList?: string[];
  /** A few questions specific to the page, answered in one or two sentences. */
  faq?: { title: string; items: { q: string; a: string }[] };
  /** Last word before the footer, with the demo button. */
  closing?: { title: string; cta: string };
};

export const SEO_PAGES: Record<SeoPageId, Record<Lang, SeoPageCopy>> = {
  inventory: {
    en: {
      meta: {
        title: "Artwork inventory software for galleries",
        description:
          "Every artwork in one record: images, documents, price and availability, imported from your spreadsheet and ready to use in Gmail and WhatsApp.",
      },
      eyebrow: "Artwork inventory",
      title: "All your artworks, in one place.",
      sub: "Images, prices, availability and documents in one clear record, ready to use in Gmail and WhatsApp.",
      cta: "Book a demo",
      visual: { kind: "artworkList" },
      stepsTitle: "From your spreadsheet to a clear inventory.",
      steps: [
        {
          title: "We move your spreadsheet in",
          body: "Excel, Google Sheets or an Artlogic export, as it is. We bring over artists, works, prices and images during setup. Nothing to retype.",
          visual: "migration",
        },
        {
          title: "Every work gets its record",
          body: "Images, documents, price and availability in one place. Find any work by artist, title or availability.",
          visual: "artworkForm",
        },
        {
          title: "Your data stays yours",
          body: "A database of your own, encrypted in transit and at rest, never used to train an AI.",
          visual: "dataSafety",
        },
      ],
    },
    fr: {
      meta: {
        title: "Inventaire des œuvres pour galeries",
        description:
          "Chaque œuvre dans une fiche : images, documents, prix et disponibilité, repris de votre tableur et prêts à servir dans Gmail et WhatsApp.",
      },
      eyebrow: "Inventaire des œuvres",
      title: "Toutes vos œuvres, au même endroit.",
      sub: "Images, prix, disponibilité et documents dans une fiche claire, prête à servir dans Gmail et WhatsApp.",
      cta: "Réserver une démo",
      visual: { kind: "artworkList" },
      stepsTitle: "De votre tableur à un inventaire clair.",
      steps: [
        {
          title: "On migre votre tableur",
          body: "Excel, Google Sheets ou export Artlogic, tel quel. On reprend artistes, œuvres, prix et images pendant l’installation. Rien à ressaisir.",
          visual: "migration",
        },
        {
          title: "Chaque œuvre a sa fiche",
          body: "Images, documents, prix et disponibilité au même endroit. Retrouvez n’importe quelle œuvre par artiste, titre ou disponibilité.",
          visual: "artworkForm",
        },
        {
          title: "Vos données restent les vôtres",
          body: "Une base propre à votre galerie, chiffrée en transit et au repos, jamais utilisée pour entraîner une IA.",
          visual: "dataSafety",
        },
      ],
    },
  },

  conversations: {
    en: {
      meta: {
        title: "Answer collector inquiries in Gmail and WhatsApp",
        description:
          "Your artwork records inside Gmail and WhatsApp: collector replies prepared from your own inventory, reviewed before anything is sent.",
      },
      eyebrow: "Sales conversations",
      title: "Answer collector inquiries in Gmail and WhatsApp.",
      sub: "Answer a collector with the right work, its image and its price, without leaving the conversation.",
      cta: "Book a demo",
      visual: {
        kind: "video",
        src: "/videos/gmail-card-click.mp4",
        poster: "/videos/gmail-card-click.jpg",
        label:
          "A collector asks about a work in Gmail; the gallery finds it in Good Artworks and inserts its card into the reply.",
      },
      definition:
        "Good Artworks puts your artwork records inside Gmail and WhatsApp. It prepares replies to collectors from your own inventory, your team reviews and sends them, and Good Artworks remembers who received what.",
      featureList: [
        "Artwork records in Gmail",
        "Artwork PDFs on WhatsApp",
        "Collector replies prepared from your inventory, reviewed before sending",
        "Collector history of what was sent",
      ],
      stepsTitle: "From the question to the reply.",
      steps: [
        {
          title: "Reply from Gmail",
          body: "Marie writes by email. Search Evening field while you reply: its image, caption and price go straight into your message.",
          visual: "gmail",
          links: [{ text: "Evening field", href: "/product/artwork-inventory" }],
        },
        {
          title: "Answer on WhatsApp",
          body: "She would rather browse on her phone. Pick the works and send her a clean PDF, with only the details you choose.",
          visual: "whatsappPdf",
        },
        {
          title: "Every exchange remembered",
          body: "What Marie received joins her history, with the next follow-up. Her next message starts from there.",
          visual: "memory",
          links: [{ text: "her history", href: "/product/collectors-memory" }],
        },
      ],
      faq: {
        title: "Questions.",
        items: [
          {
            q: "Do we have to leave Gmail or WhatsApp?",
            a: "No. Good Artworks works inside them: a side panel in Gmail, a number you message on WhatsApp. Your conversations stay where they are.",
          },
          {
            q: "What does Good Artworks keep from our conversations?",
            a: "The Gmail threads you open with the side panel and the replies that follow, and what you prepare with the WhatsApp assistant. Your own WhatsApp chats with collectors are not captured yet.",
          },
          {
            q: "Who sends the reply?",
            a: "Always someone from your team. Good Artworks prepares it from your artwork records; nothing leaves without your click.",
          },
          {
            q: "How do galleries answer collector inquiries faster?",
            a: "By answering from the artwork record instead of looking for it. In Gmail or on WhatsApp, Good Artworks finds the work, its image, its price and its availability, and prepares the reply. Your team reviews it and sends it.",
          },
          {
            q: "Does it work with Artlogic?",
            a: "Yes, alongside it. Good Artworks is set up from your Artlogic exports, or from spreadsheets and folders, and puts that information into your conversations.",
          },
          {
            q: "Can I send a PDF of artworks on WhatsApp?",
            a: "Yes. Pick works from your phone and choose which details to show. Good Artworks builds a clean PDF that you forward to the collector yourself.",
          },
          {
            q: "How much does it cost?",
            a: "€249 per month per gallery, or €199 per month paid yearly, with unlimited users and setup included. Setup takes about a week.",
          },
        ],
      },
      closing: { title: "See it with your own inventory.", cta: "Book a demo" },
    },
    fr: {
      meta: {
        title: "Répondez aux demandes des collectionneurs dans Gmail et WhatsApp",
        description:
          "Vos fiches d’œuvres dans Gmail et WhatsApp : réponses collectionneurs préparées depuis votre inventaire, relues avant tout envoi.",
      },
      eyebrow: "Conversations de vente",
      title: "Répondez aux demandes des collectionneurs dans Gmail et WhatsApp.",
      sub: "Répondez à un collectionneur avec la bonne œuvre, son image et son prix, sans quitter la conversation.",
      cta: "Réserver une démo",
      visual: {
        kind: "video",
        src: "/videos/gmail-card-click.mp4",
        poster: "/videos/gmail-card-click.jpg",
        label:
          "Un collectionneur demande une œuvre dans Gmail ; la galerie la retrouve dans Good Artworks et insère sa fiche dans la réponse.",
      },
      definition:
        "Good Artworks met vos fiches d’œuvres dans Gmail et WhatsApp. Il prépare les réponses aux collectionneurs depuis votre propre inventaire, votre équipe les relit et les envoie, et Good Artworks se souvient de qui a reçu quoi.",
      featureList: [
        "Fiches d’œuvres dans Gmail",
        "PDF d’œuvres sur WhatsApp",
        "Réponses aux collectionneurs préparées depuis votre inventaire, relues avant l’envoi",
        "Historique de ce que chaque collectionneur a reçu",
      ],
      stepsTitle: "De la question à la réponse.",
      steps: [
        {
          title: "Répondez depuis Gmail",
          body: "Marie écrit par e-mail. Cherchez Evening field pendant que vous répondez : son image, sa légende et son prix arrivent dans votre message.",
          visual: "gmail",
          links: [{ text: "Evening field", href: "/fr/product/artwork-inventory" }],
        },
        {
          title: "Répondez sur WhatsApp",
          body: "Elle préfère regarder sur son téléphone. Choisissez les œuvres et envoyez-lui un PDF propre, avec seulement les détails que vous voulez.",
          visual: "whatsappPdf",
        },
        {
          title: "Chaque échange en mémoire",
          body: "Ce que Marie a reçu rejoint son historique, avec la prochaine relance. Son prochain message repart de là.",
          visual: "memory",
          links: [{ text: "son historique", href: "/fr/product/collectors-memory" }],
        },
      ],
      faq: {
        title: "Questions.",
        items: [
          {
            q: "Faut-il quitter Gmail ou WhatsApp ?",
            a: "Non. Good Artworks travaille à l’intérieur : un panneau latéral dans Gmail, un numéro auquel vous écrivez sur WhatsApp. Vos conversations restent où elles sont.",
          },
          {
            q: "Que garde Good Artworks de nos conversations ?",
            a: "Les fils Gmail ouverts avec le panneau latéral et les réponses qui suivent, et ce que vous préparez avec l’assistant WhatsApp. Vos propres échanges WhatsApp avec les collectionneurs ne sont pas encore captés.",
          },
          {
            q: "Qui envoie la réponse ?",
            a: "Toujours quelqu’un de votre équipe. Good Artworks la prépare depuis vos fiches d’œuvres ; rien ne part sans votre clic.",
          },
          {
            q: "Comment les galeries répondent-elles plus vite aux collectionneurs ?",
            a: "En répondant depuis la fiche de l’œuvre au lieu de la chercher. Dans Gmail ou sur WhatsApp, Good Artworks retrouve l’œuvre, son image, son prix et sa disponibilité, et prépare la réponse. Votre équipe la relit et l’envoie.",
          },
          {
            q: "Est-ce que ça fonctionne avec Artlogic ?",
            a: "Oui, à côté. Good Artworks s’installe à partir de vos exports Artlogic, ou de tableurs et de dossiers, et met ces informations dans vos conversations.",
          },
          {
            q: "Peut-on envoyer un PDF d’œuvres sur WhatsApp ?",
            a: "Oui. Choisissez des œuvres depuis votre téléphone et les détails à montrer. Good Artworks prépare un PDF propre, que vous transférez vous-même au collectionneur.",
          },
          {
            q: "Combien ça coûte ?",
            a: "249 € par mois et par galerie, ou 199 € par mois payé à l’année, utilisateurs illimités et installation incluse. L’installation prend une semaine environ.",
          },
        ],
      },
      closing: { title: "Voyez-le avec votre propre inventaire.", cta: "Réserver une démo" },
    },
  },

  "collectors-memory": {
    en: {
      meta: {
        title: "Collector memory for galleries",
        description:
          "Every exchange with a collector in one history: what they asked, what they received, and when to follow up.",
      },
      eyebrow: "Collectors memory",
      title: "Every collector, remembered.",
      sub: "What each collector asked, saw and received, in one history, with the next follow-up.",
      cta: "Book a demo",
      visual: { kind: "memoryFeed" },
      stepsTitle: "From every exchange to the next follow-up.",
      steps: [
        {
          title: "One record per collector",
          body: "Every work you send, by email or on WhatsApp, lands on the collector’s record, in order.",
          visual: "collectorRecord",
        },
        {
          title: "Know who to follow up",
          body: "Inquiries still waiting, reminders you set, collectors too long without news: Good Artworks brings them back to you.",
          visual: "followUpKinds",
        },
        {
          title: "Your data stays yours",
          body: "A database of your own, encrypted in transit and at rest, never used to train an AI.",
          visual: "dataSafety",
        },
      ],
    },
    fr: {
      meta: {
        title: "Mémoire des collectionneurs pour galeries",
        description:
          "Chaque échange avec un collectionneur dans un même historique : ce qu’il a demandé, ce qu’il a reçu, et quand le relancer.",
      },
      eyebrow: "Mémoire des collectionneurs",
      title: "Chaque collectionneur, en mémoire.",
      sub: "Ce que chaque collectionneur a demandé, vu et reçu, dans un même historique, avec la prochaine relance.",
      cta: "Réserver une démo",
      visual: { kind: "memoryFeed" },
      stepsTitle: "De chaque échange à la prochaine relance.",
      steps: [
        {
          title: "Une fiche par collectionneur",
          body: "Chaque œuvre envoyée, par e-mail ou sur WhatsApp, rejoint la fiche du collectionneur, dans l’ordre.",
          visual: "collectorRecord",
        },
        {
          title: "Sachez qui relancer",
          body: "Demandes sans réponse, rappels que vous avez fixés, collectionneurs sans nouvelles : Good Artworks vous les remonte.",
          visual: "followUpKinds",
        },
        {
          title: "Vos données restent les vôtres",
          body: "Une base propre à votre galerie, chiffrée en transit et au repos, jamais utilisée pour entraîner une IA.",
          visual: "dataSafety",
        },
      ],
    },
  },

  "art-galleries": {
    en: {
      meta: {
        title: "Sales software for art galleries",
        description:
          "Your inventory connected to Gmail and WhatsApp, and every collector relationship kept in memory. Set up in about a week.",
      },
      eyebrow: "For art galleries",
      title: "Sell more simply, with what you already have.",
      sub: "Your inventory connected to Gmail and WhatsApp, and every collector relationship kept in memory.",
      cta: "Book a demo",
      visual: { kind: "photo", src: "/gallery-screen2.png", alt: "An art gallery" },
      blocks: [
        {
          title: "Your works, organised",
          items: [
            "Images, prices and availability",
            "Documents attached to each work",
            "Taken from your spreadsheet",
          ],
        },
        {
          title: "Reply where collectors write",
          items: [
            "In Gmail, with the work and its price",
            "On WhatsApp, with a PDF",
            "Reviewed and sent by your team",
          ],
        },
        {
          title: "Every exchange remembered",
          items: ["Who saw what, and when", "The follow-ups to make", "Context for the whole team"],
        },
        {
          title: "Set up in about a week",
          items: [
            "We take over your spreadsheet",
            "We connect Gmail and WhatsApp",
            "Nothing to retype on your side",
          ],
        },
      ],
    },
    fr: {
      meta: {
        title: "Logiciel de vente pour galeries d’art",
        description:
          "Votre inventaire relié à Gmail et WhatsApp, et chaque relation collectionneur gardée en mémoire. Installé en une semaine environ.",
      },
      eyebrow: "Pour les galeries d’art",
      title: "Vendez plus simplement, avec ce que vous avez déjà.",
      sub: "Votre inventaire relié à Gmail et WhatsApp, et chaque relation avec vos collectionneurs gardée en mémoire.",
      cta: "Réserver une démo",
      visual: { kind: "photo", src: "/gallery-screen2.png", alt: "Une galerie d’art" },
      blocks: [
        {
          title: "Vos œuvres, organisées",
          items: [
            "Images, prix et disponibilité",
            "Documents attachés à chaque œuvre",
            "Repris depuis votre tableur",
          ],
        },
        {
          title: "Répondre là où on vous écrit",
          items: [
            "Dans Gmail, avec l’œuvre et son prix",
            "Sur WhatsApp, avec un PDF",
            "Relu et envoyé par votre équipe",
          ],
        },
        {
          title: "Chaque échange en mémoire",
          items: [
            "Qui a vu quoi, et quand",
            "Les relances à faire",
            "Le contexte pour toute l’équipe",
          ],
        },
        {
          title: "Installé en une semaine environ",
          items: [
            "On reprend votre tableur",
            "On branche Gmail et WhatsApp",
            "Rien à ressaisir de votre côté",
          ],
        },
      ],
    },
  },

  "design-galleries": {
    en: {
      meta: {
        title: "Sales software for design galleries",
        description:
          "Pieces, editions, dimensions and availability in one place, ready to share in Gmail and WhatsApp when a client writes.",
      },
      eyebrow: "For design galleries",
      title: "Every piece, ready to present.",
      sub: "Editions, dimensions and availability in one place, at hand when a client writes.",
      cta: "Book a demo",
      visual: { kind: "photo", src: "/Design-gallery.png", alt: "A design gallery" },
      blocks: [
        {
          title: "Pieces and editions",
          items: ["Designer, year, edition", "Dimensions and materials", "Images and documents"],
        },
        {
          title: "Clear availability",
          items: ["Available, reserved, sold", "On consignment or on loan", "Found in seconds"],
        },
        {
          title: "Client presentations",
          items: [
            "One selection per client",
            "As a private link or a PDF",
            "Price shown or hidden",
          ],
        },
        {
          title: "Reply in Gmail and WhatsApp",
          items: [
            "The piece and its price in your reply",
            "Reviewed and sent by you",
            "The exchange kept in memory",
          ],
        },
      ],
    },
    fr: {
      meta: {
        title: "Logiciel de vente pour galeries de design",
        description:
          "Pièces, éditions, dimensions et disponibilité au même endroit, prêtes à partager dans Gmail et WhatsApp quand un client écrit.",
      },
      eyebrow: "Pour les galeries de design",
      title: "Chaque pièce, prête à être présentée.",
      sub: "Éditions, dimensions et disponibilité au même endroit, à portée de main quand un client écrit.",
      cta: "Réserver une démo",
      visual: { kind: "photo", src: "/Design-gallery.png", alt: "Une galerie de design" },
      blocks: [
        {
          title: "Pièces et éditions",
          items: ["Designer, année, édition", "Dimensions et matériaux", "Images et documents"],
        },
        {
          title: "Disponibilité claire",
          items: [
            "Disponible, réservée, vendue",
            "En dépôt ou en prêt",
            "Retrouvée en quelques secondes",
          ],
        },
        {
          title: "Présentations clients",
          items: ["Une sélection par client", "En lien privé ou en PDF", "Prix affiché ou non"],
        },
        {
          title: "Répondre dans Gmail et WhatsApp",
          items: [
            "La pièce et son prix dans la réponse",
            "Relu et envoyé par vous",
            "L’échange gardé en mémoire",
          ],
        },
      ],
    },
  },

  advisors: {
    en: {
      meta: {
        title: "Software for art advisors and dealers",
        description:
          "Find, curate and share artworks from one inventory, and keep track of what each client received.",
      },
      eyebrow: "For art advisors and dealers",
      title: "Answer your clients faster.",
      sub: "Find, curate and share artworks from one inventory.",
      cta: "Book a demo",
      visual: { kind: "photo", src: "/artadvisor.png", alt: "An art advisor with a client" },
      blocks: [
        {
          title: "Find the right works",
          items: [
            "Search by artist or title",
            "Filter by availability",
            "All your sources in one place",
          ],
        },
        {
          title: "Build the selection",
          items: [
            "Straight from your inventory",
            "In the order you want",
            "With a note for the client",
          ],
        },
        {
          title: "Share it privately",
          items: ["A private link or a PDF", "Price shown or hidden", "From Gmail or WhatsApp"],
        },
        {
          title: "Keep the thread",
          items: ["What each client received", "What they asked for", "The next follow-up"],
        },
      ],
    },
    fr: {
      meta: {
        title: "Outil pour conseillers en art et marchands",
        description:
          "Trouvez, composez et partagez des œuvres depuis un seul inventaire, et gardez la trace de ce que chaque client a reçu.",
      },
      eyebrow: "Pour les conseillers et marchands",
      title: "Répondez à vos clients plus vite.",
      sub: "Trouvez, composez et partagez des œuvres depuis un seul inventaire.",
      cta: "Réserver une démo",
      visual: {
        kind: "photo",
        src: "/artadvisor.png",
        alt: "Une conseillère en art avec un client",
      },
      blocks: [
        {
          title: "Trouvez les bonnes œuvres",
          items: [
            "Recherche par artiste ou titre",
            "Filtre par disponibilité",
            "Toutes vos sources au même endroit",
          ],
        },
        {
          title: "Composez la sélection",
          items: [
            "Directement depuis l’inventaire",
            "Dans l’ordre que vous voulez",
            "Avec une note pour le client",
          ],
        },
        {
          title: "Partagez-la en privé",
          items: ["Lien privé ou PDF", "Prix affiché ou non", "Depuis Gmail ou WhatsApp"],
        },
        {
          title: "Gardez le fil",
          items: ["Ce que chaque client a reçu", "Ce qu’il a demandé", "La prochaine relance"],
        },
      ],
    },
  },

  "antique-dealers": {
    en: {
      meta: {
        title: "Software for antique and collectibles dealers",
        description:
          "Photos, condition, documents and prices in one place, and a memory of which client showed interest in which piece.",
      },
      eyebrow: "For antique dealers",
      title: "Unique pieces, and the memory of every client.",
      sub: "Photos, condition, documents and prices in one place, and who showed interest in which piece.",
      cta: "Book a demo",
      visual: {
        kind: "photo",
        src: "https://images.unsplash.com/photo-1667916468910-d310ec444154?w=1600&q=80",
        alt: "An antique dealer’s shop",
      },
      blocks: [
        {
          title: "Every piece documented",
          items: [
            "Photos from every angle",
            "Provenance documents and condition report",
            "Price and location",
          ],
        },
        {
          title: "Find a piece in an instant",
          items: [
            "Search by period, maker or title",
            "Available, reserved, sold",
            "On consignment or on loan",
          ],
        },
        {
          title: "Reply on WhatsApp",
          items: ["Photos, dimensions and price", "A clean PDF in a few taps", "Sent by you"],
        },
        {
          title: "Who saw what",
          items: [
            "Every exchange kept in memory",
            "The clients interested in a piece",
            "The right moment to follow up",
          ],
        },
      ],
    },
    fr: {
      meta: {
        title: "Logiciel pour antiquaires et marchands d’objets de collection",
        description:
          "Photos, état, documents et prix au même endroit, et la mémoire de quel client s’est intéressé à quelle pièce.",
      },
      eyebrow: "Pour les antiquaires",
      title: "Des pièces uniques, et la mémoire de chaque client.",
      sub: "Photos, état, documents et prix au même endroit, et qui s’est intéressé à quelle pièce.",
      cta: "Réserver une démo",
      visual: {
        kind: "photo",
        src: "https://images.unsplash.com/photo-1667916468910-d310ec444154?w=1600&q=80",
        alt: "La boutique d’un antiquaire",
      },
      blocks: [
        {
          title: "Chaque pièce documentée",
          items: [
            "Photos sous tous les angles",
            "Documents de provenance et constat d’état",
            "Prix et emplacement",
          ],
        },
        {
          title: "Retrouvez une pièce en un instant",
          items: [
            "Recherche par époque, auteur ou titre",
            "Disponible, réservée, vendue",
            "En dépôt ou en prêt",
          ],
        },
        {
          title: "Répondre sur WhatsApp",
          items: [
            "Photos, dimensions et prix",
            "Un PDF propre en quelques gestes",
            "Envoyé par vous",
          ],
        },
        {
          title: "Qui a vu quoi",
          items: [
            "Chaque échange en mémoire",
            "Les clients intéressés par une pièce",
            "Le bon moment pour relancer",
          ],
        },
      ],
    },
  },

  about: {
    en: {
      meta: {
        title: "About Good Artworks",
        description:
          "Good Artworks keeps artwork information moving and collector conversations in memory, because in art and design, the relationship is the business.",
      },
      eyebrow: "About",
      title: "In art and design, the relationship is the business.",
      prose: [
        "Galleries have always been built on artists, judgment and relationships. That should not change.",
        "But the work behind a gallery has become heavier. Even a small team now has to track its works, prepare selections and answer collectors across several channels.",
        "Good Artworks started from a simple idea: an artwork’s information is entered once, then used everywhere, in Gmail, on WhatsApp, in a PDF. And every exchange with a collector is remembered.",
        "Technology replaces neither judgment nor relationships. It supports them: Good Artworks prepares, your team reviews and sends.",
        "Raphaël, founder of Good Artworks",
      ],
    },
    fr: {
      meta: {
        title: "À propos de Good Artworks",
        description:
          "Good Artworks garde l’information des œuvres en mouvement et les conversations avec les collectionneurs en mémoire, parce que dans l’art et le design, la relation est le business.",
      },
      eyebrow: "À propos",
      title: "Dans l’art et le design, la relation est le business.",
      prose: [
        "Les galeries se sont toujours construites sur des artistes, un regard et des relations. Ça ne doit pas changer.",
        "Mais le travail derrière une galerie est devenu plus lourd. Même une petite équipe doit suivre ses œuvres, préparer des sélections et répondre aux collectionneurs sur plusieurs canaux.",
        "Good Artworks est né d’une idée simple : l’information d’une œuvre se saisit une fois, puis sert partout, dans Gmail, sur WhatsApp, dans un PDF. Et chaque échange avec un collectionneur reste en mémoire.",
        "La technologie ne remplace ni le regard ni la relation. Elle les soutient : Good Artworks prépare, votre équipe relit et envoie.",
        "Raphaël, fondateur de Good Artworks",
      ],
    },
  },
};

/** Metadata and structured-data props for one page in one language. */
export function seoPageProps(id: SeoPageId, lang: Lang, path: string) {
  const { title, description } = SEO_PAGES[id][lang].meta;
  const seo = { lang, path, title, description };
  return { seo, metadata: pageMetadata(seo) as Metadata };
}
