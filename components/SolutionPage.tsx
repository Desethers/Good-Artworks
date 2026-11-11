"use client";

import { motion } from "framer-motion";
import LandingNav from "@/components/landing/LandingNav";
import LandingNavFr from "@/components/landing/LandingNavFr";
import Footer from "@/components/Footer";
import CtaBand from "@/components/CtaBand";
import { Button } from "@/components/ui/Button";
import { useLang } from "@/lib/lang";
import { type RoleSlug } from "@/lib/solutions";
import { ArchiveMock } from "@/components/showcase/PillarMocks";
import {
  ArtistWebsitePage,
  GalleryWebsitePublishVisual,
} from "@/components/WebsitePublisherProductPage";
import { SyncVisual } from "@/components/ViewingRoomsScrollStory";
import { ExhibitionPageMock } from "@/components/showcase/ExhibitionPageMock";
import ScrollStory, { type ScrollStoryStep } from "@/components/ScrollStory";
import { ArtworkFormMock } from "@/components/showcase/ArtworkFormMock";
import { InquiryDraftsFrame } from "@/components/SalesAssistantProductPage";
import AdvisorsSelectionWorkflowVisual from "@/components/AdvisorsSelectionWorkflow";
import ArtistWebsiteSyncVisual from "@/components/ArtistWebsiteSyncVisual";
import ArtistSelectionActionVisual from "@/components/ArtistSelectionActionVisual";

const ease = [0.16, 1, 0.3, 1] as const;

/* One visual per identity — but never the generic admin. Each shows the
 * surface that identity actually sees or touches, so no screen repeats
 * across a solutions → product browsing path. */
function CollectorRoomVisual() {
  return (
    <img
      src="/screenshot-viewingroom.jpg"
      alt=""
      aria-hidden="true"
      className="h-full w-full object-cover object-top"
    />
  );
}

function AdvisorSelectionVisual() {
  return (
    <div className="flex h-full items-center justify-center bg-[#F7F7F5]">
      <SyncVisual />
    </div>
  );
}

const ROLE_VISUAL: Record<RoleSlug, React.ComponentType> = {
  galleries: ArchiveMock,
  advisors: AdvisorSelectionVisual,
  artists: ArtistWebsitePage,
};

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, ease, delay },
});

const chatMessage = (delay: number, duration = 0.5) => ({
  initial: { opacity: 0, y: 12, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  transition: { duration, ease, delay },
});

const pdfMessageDelay = 2.8;
const pdfTypingDuration = 2;

type SolutionContent = {
  eyebrow: string;
  title: string;
  subtitle: string;
  body: string;
  features: readonly string[];
  cta: string;
};

function CheckIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      className="mt-0.5 shrink-0 text-[#ADADAA]"
      aria-hidden="true"
    >
      <path
        d="M3 8l3.5 3.5L13 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/*
 * Réplique du node Figma 526:2471 (WhatsApp Chat) — mêmes bulles (queues
 * incluses), photo d'œuvre, double-check bleu et carte PDF, exportés du
 * fichier Good Artworks vers /mockups/whatsapp-figma-v2. La barre de saisie garde
 * le contexte mobile et anime la commande juste avant son envoi.
 */
const WA = "/mockups/whatsapp-figma-v2";

function WhatsAppReadCheck({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 16 10" fill="none" className={className} aria-hidden="true">
      <path
        d="m.6 5.1 2.6 2.6L8 1.1M5.1 6.4l1.4 1.3 4.8-6.6"
        stroke="#3497F9"
        strokeWidth="1.35"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function WhatsAppShareWorksMock() {
  return (
    <div
      aria-hidden="true"
      className="flex h-full w-full items-center justify-center overflow-hidden bg-[#F5F5F3] px-4 md:px-6"
    >
      <div className="flex h-full w-full max-w-[420px] flex-col">
        <div className="flex min-h-0 flex-1 items-center justify-center overflow-hidden py-2">
          <div className="w-[340px] origin-center scale-[0.8] md:w-[400px] md:scale-[0.92]">
            <motion.div
              initial={{ y: 120 }}
              animate={{ y: [120, 120, 120, -40, -150] }}
              transition={{
                duration: 4.8,
                times: [0, 0.18, 0.58, 0.78, 1],
                ease,
              }}
              className="flex flex-col gap-[6px]"
            >
              {/* 1 — Outgoing: artwork photo + caption */}
              <motion.div {...chatMessage(0.1)} className="relative h-[208px] w-[280px] self-end">
                <img
                  src={`${WA}/shape-incoming1b.svg`}
                  alt=""
                  className="absolute inset-0 h-full w-full"
                />
                <img
                  src={`${WA}/artwork-photo.png`}
                  alt=""
                  className="absolute left-[4px] top-[3px] h-[128px] w-[260px] rounded-[6px] object-cover"
                />
                <p className="absolute left-[11px] right-[20px] top-[138px] text-[12.5px] leading-[1.32] tracking-[-0.3px] text-black">
                  Sacha Elron - Evening Field - 2026 -
                  <br />
                  Acrylic on canvas - 180 × 180 cm -
                  <br />
                  $10,000
                </p>
                <p className="absolute bottom-[9px] right-[27px] text-[9px] tracking-[0.5px] text-black/25">
                  10:15
                </p>
                <WhatsAppReadCheck className="absolute bottom-[10px] right-[9px] h-[8px] w-[14px]" />
              </motion.div>

              {/* 2 — Incoming: added to selection */}
              <motion.div {...chatMessage(0.75)} className="relative h-[50px] w-[276px] self-start">
                <img
                  src={`${WA}/shape-incoming2b.svg`}
                  alt=""
                  className="absolute inset-0 h-full w-full -scale-x-100"
                />
                <p className="absolute left-[16px] top-[7px] text-[12.5px] leading-[1.3] tracking-[-0.3px] text-black">
                  Received. “Evening Field” added
                  <br />
                  to your selection
                </p>
                <p className="absolute bottom-[5px] right-[13px] text-[9px] tracking-[0.5px] text-black/25">
                  11:40
                </p>
              </motion.div>

              {/* 3 — Outgoing: /pdf command */}
              <motion.div
                {...chatMessage(pdfMessageDelay, 0.25)}
                className="relative h-[30px] w-[102px] self-end"
              >
                <img
                  src={`${WA}/shape-outgoing2.svg`}
                  alt=""
                  className="absolute inset-0 h-full w-full"
                />
                <p className="absolute left-[10px] top-[7px] text-[12.5px] leading-none tracking-[-0.3px] text-black">
                  /pdf
                </p>
                <p className="absolute bottom-[8px] right-[26px] text-[8px] tracking-[0.5px] text-black/25">
                  11:43
                </p>
                <WhatsAppReadCheck className="absolute bottom-[8px] right-[10px] h-[7px] w-[12px]" />
              </motion.div>

              {/* 4 — Incoming: building the selection */}
              <motion.div {...chatMessage(3.4)} className="relative h-[41px] w-[255px] self-start">
                <img
                  src={`${WA}/shape-incoming3.svg`}
                  alt=""
                  className="absolute inset-0 h-full w-full -scale-x-100"
                />
                <p className="absolute left-[16px] top-[9px] text-[12.5px] leading-none tracking-[-0.3px] text-black">
                  Building your selection…
                </p>
                <p className="absolute bottom-[6px] right-[13px] text-[9px] tracking-[0.5px] text-black/25">
                  11:45
                </p>
              </motion.div>

              {/* 5 — Incoming: PDF ready */}
              <motion.div {...chatMessage(4)} className="relative h-[107px] w-[262px] self-start">
                <img
                  src={`${WA}/add-plus.svg`}
                  alt=""
                  className="absolute inset-0 h-full w-full -scale-x-100"
                />
                <div className="absolute left-[17px] top-[3px] h-[74px] w-[242px] rounded-[7px] bg-[#F3F0F0]">
                  <img
                    src={`${WA}/pdf-thumb.png`}
                    alt=""
                    className="absolute left-[14px] top-[13px] h-[24px] w-[20px] object-cover"
                  />
                  <p className="absolute left-[42px] top-[9px] text-[12.5px] leading-[1.3] tracking-[-0.3px] text-black">
                    spring_selection_2026_
                    <br />
                    Marie_Beaumont.pdf
                  </p>
                  <p className="absolute bottom-[8px] left-[42px] text-[9px] tracking-[0.1px] text-black/40">
                    2.8 MB · PDF
                  </p>
                </div>
                <p className="absolute bottom-[9px] left-[17px] text-[10px] tracking-[-0.3px] text-black">
                  Selection ready · 1 page
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>

        <div className="shrink-0 bg-transparent py-2 md:py-2.5">
          <div className="mx-auto flex w-[300px] items-center md:w-[340px]">
            <div className="flex h-8 min-w-0 flex-1 items-center rounded-full border border-[#D8D8DE] bg-white px-3 md:h-9">
              <span className="relative block h-[1.25em] overflow-hidden whitespace-nowrap text-[10px] text-[#8E8E93] md:text-[11px]">
                <motion.span
                  initial={{ opacity: 1 }}
                  animate={{ opacity: [1, 1, 0, 0, 1] }}
                  transition={{
                    duration: pdfTypingDuration,
                    delay: pdfMessageDelay - pdfTypingDuration,
                    times: [0, 0.08, 0.16, 0.84, 1],
                    ease: "easeInOut",
                  }}
                >
                  Message
                </motion.span>
                <motion.span
                  initial={{ width: "0ch", opacity: 0 }}
                  animate={{
                    width: ["0ch", "0ch", "4ch", "4ch", "0ch"],
                    opacity: [0, 0, 1, 1, 0],
                  }}
                  transition={{
                    duration: pdfTypingDuration,
                    delay: pdfMessageDelay - pdfTypingDuration,
                    times: [0, 0.08, 0.54, 0.76, 1],
                    ease: "easeInOut",
                  }}
                  className="absolute left-0 top-0 overflow-hidden whitespace-nowrap bg-white font-medium text-[#111110]"
                >
                  /pdf
                </motion.span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function GalleriesEditorialIntro({
  content,
  lang,
  onContact,
}: {
  content: SolutionContent;
  lang: "fr" | "en";
  onContact: () => void;
}) {
  const editorial =
    lang === "fr"
      ? {
          label: "Pour quelles galeries ?",
          titleLines: [
            "Toute galerie qui souhaite une présence en ligne",
            "sans dépendre d’un développeur.",
          ],
          body: "Good Artworks part de vos archives, de vos outils et de vos habitudes pour créer une infrastructure plus claire autour des œuvres.",
        }
      : {
          label: "Which galleries?",
          titleLines: [
            "Any gallery that wants an online presence",
            "without depending on a developer.",
          ],
          body: "Good Artworks starts from your archives, tools and habits, then builds a clearer operating layer around your artworks.",
        };

  const highlights =
    lang === "fr"
      ? [
          {
            title: "Une base d’œuvres connectée",
            description:
              "Migrez vos archives et inventaires dans un système dont partent tous vos autres outils.",
          },
          {
            title: "Des outils de vente dans Gmail et WhatsApp",
            description:
              "Brouillons IA, viewing rooms et PDF construits depuis les mêmes fiches œuvres.",
          },
          {
            title: "Un site qui se met à jour tout seul",
            description:
              "Publiez artistes, expositions et œuvres directement depuis votre base — sans développeur.",
          },
        ]
      : [
          {
            title: "A connected artwork database",
            description:
              "Migrate your archives and inventories into one system every other tool draws from.",
          },
          {
            title: "Sales tools in Gmail and WhatsApp",
            description:
              "AI-drafted replies, viewing rooms and PDFs built from the same artwork records.",
          },
          {
            title: "A website that updates itself",
            description:
              "Publish artists, exhibitions and artworks straight from your database — no developer needed.",
          },
        ];

  return (
    <section className="bg-white px-4 pb-8 pt-16 md:px-6 md:pb-12 md:pt-24">
      <div className="mx-auto max-w-7xl">
        <div className="-mx-3 border-t border-[#E8E8E6] px-3 pb-6 pt-10 md:-mx-4 md:px-4 md:pb-8 md:pt-14">
          <div className="grid gap-16 md:grid-cols-[1.08fr_0.92fr] md:gap-12 lg:gap-16">
            <motion.div {...fadeUp(0)}>
              <p className="text-[12px] font-medium tracking-[-0.01em] text-[#858581]">
                {editorial.label}
              </p>
              <h2 className="mt-6 font-display text-[20px] font-normal leading-[1.2] tracking-[-0.02em] text-[#111110] md:text-[26px]">
                {editorial.titleLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </h2>
              <p className="mt-6 max-w-xl text-[14px] leading-[1.65] tracking-[-0.01em] text-[#6B6A67] md:text-[15px]">
                {editorial.body}
              </p>
              <Button size="lg" onClick={onContact} className="mt-10">
                {content.cta} <span aria-hidden="true">→</span>
              </Button>
            </motion.div>

            <motion.div {...fadeUp(0.08)}>
              <ol className="flex list-none flex-col gap-4 p-0">
                {highlights.map((highlight) => (
                  <li
                    key={highlight.title}
                    className="grid min-h-[84px] grid-cols-[1rem_1fr] items-start gap-3 rounded-[8px] bg-[#F7F7F5] px-5 py-4"
                  >
                    <CheckIcon />
                    <div>
                      <h3 className="font-display text-[15px] font-normal leading-[1.35] tracking-[-0.02em] text-[#111110]">
                        {highlight.title}
                      </h3>
                      <p className="mt-1 text-[13px] leading-[1.45] tracking-[-0.01em] text-[#9A9A96]">
                        {highlight.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function GalleriesStickyWorkflow() {
  const steps: ScrollStoryStep[] = [
    {
      title: "Organise the works",
      subtitle: "Keep artwork information clear and ready to use.",
      bullets: [
        "Add images and details",
        "Record price and availability",
        "Keep documents with each work",
      ],
    },
    {
      title: "Put the gallery online",
      subtitle: "Publish artists, exhibitions and available works without rebuilding content.",
      bullets: [
        "Choose the works",
        "Prepare the exhibition page",
        "Publish when everything is ready",
      ],
    },
    {
      title: "Send artwork PDFs from your phone",
      subtitle: "Create a polished selection and share it directly in a WhatsApp conversation.",
      bullets: [
        "Build a PDF in minutes",
        "Share without leaving your phone",
        "Choose prices and details before sending",
      ],
    },
    {
      title: "A Sales Assistant for every collector inquiry.",
      subtitle:
        "AI-prepared replies for every collector inquiry, reviewed and sent by the gallery.",
      bullets: [
        "New inquiries become sales drafts",
        "Artwork details are added automatically",
        "Your team reviews before anything is sent",
      ],
    },
  ];

  return (
    <ScrollStory
      title="From inventory to collector follow-up."
      subtitle="The same artwork records keep each step connected."
      hideHeader
      steps={steps}
      compactMobileVisual
      isVisualBare={(index) => index === 3}
      renderVisual={(index) =>
        index === 0 ? (
          <ArtworkFormMock />
        ) : index === 1 ? (
          <GalleryWebsitePublishVisual />
        ) : index === 2 ? (
          <WhatsAppShareWorksMock />
        ) : index === 3 ? (
          <InquiryDraftsFrame animatePipeline />
        ) : (
          <div className="h-full w-full bg-[#F5F5F3]" />
        )
      }
    />
  );
}

function GalleriesBuiltAroundSection() {
  const columns = [
    {
      title: "Review your current setup",
      description:
        "We review how artworks, website updates and collector requests are currently handled.",
      points: [
        "Review your existing tools and records",
        "Identify repeated work and missing connections",
      ],
    },
    {
      title: "Connect and build",
      description:
        "We organise your artwork information and create the dashboard and website your gallery needs.",
      points: [
        "Configure the system around your workflow",
        "Connect artwork records to the website",
      ],
    },
    {
      title: "Launch and support",
      description:
        "Once the system is live, we stay involved to support the gallery and improve it as its needs evolve.",
      points: ["Ongoing updates and support", "Add new workflows when needed"],
    },
  ];

  return (
    <section className="mt-14 bg-white px-4 py-14 md:mt-[72px] md:px-6 md:py-[72px]">
      <div className="mx-auto max-w-7xl">
        <motion.h2
          {...fadeUp(0)}
          className="max-w-3xl font-display text-[20px] font-normal leading-[1.2] tracking-[-0.02em] text-[#111110] md:text-[26px]"
        >
          How we work with your gallery
        </motion.h2>

        <div className="mt-12 flex flex-col gap-4 md:mt-16 md:grid md:grid-cols-3 md:gap-6 lg:gap-8">
          {columns.map((column, columnIndex) => (
            <motion.article
              key={column.title}
              {...fadeUp(columnIndex * 0.06)}
              className="rounded-[12px] bg-[#F5F5F3] p-6 md:p-7"
            >
              <h3 className="font-display text-[18px] font-normal leading-[1.3] tracking-[-0.02em] text-[#111110] md:text-[20px]">
                {column.title}
              </h3>
              <p className="mt-3 min-h-[72px] max-w-sm text-[14px] leading-[1.6] tracking-[-0.01em] text-[#6B6A67] md:text-[15px]">
                {column.description}
              </p>

              <ul className="mt-3 flex list-none flex-col gap-3 p-0 md:mt-6">
                {column.points.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <CheckIcon />
                    <span className="text-[13px] leading-[1.5] tracking-[-0.01em] text-[#111110] md:text-[14px]">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function AdvisorsWorkflow({ lang }: { lang: "fr" | "en" }) {
  const copy =
    lang === "fr"
      ? {
          title: "Des œuvres disponibles à la présentation privée.",
          subtitle:
            "Choisissez les œuvres pertinentes une fois, puis préparez une sélection soignée à envoyer directement à votre client.",
          steps: [
            {
              title: "Retrouvez les bonnes œuvres",
              subtitle: "Recherchez dans vos fiches et filtrez par disponibilité.",
            },
            {
              title: "Composez la sélection",
              subtitle: "Réunissez les œuvres retenues directement depuis votre inventaire.",
            },
            {
              title: "Partagez-la en privé",
              subtitle: "Envoyez la présentation par lien privé ou exportez-la en PDF.",
            },
            {
              title: "Gardez l’échange relié aux œuvres",
              subtitle:
                "Lorsqu’un client répond, retrouvez la sélection et l’œuvre dans le même contexte.",
            },
          ],
        }
      : {
          title: "From available works to a private presentation.",
          subtitle:
            "Choose the relevant works once, then prepare a polished selection you can send directly to your client.",
          steps: [
            {
              title: "Find the right works",
              subtitle: "Search your artwork records and filter by availability.",
            },
            {
              title: "Build the selection",
              subtitle: "Bring the chosen works together directly from your inventory.",
            },
            {
              title: "Share it privately",
              subtitle: "Send the presentation by private link or export it as a PDF.",
            },
            {
              title: "Keep the conversation connected",
              subtitle:
                "When a client replies, keep the selection and artwork visible in the same context.",
            },
          ],
        };

  return (
    <ScrollStory
      title={copy.title}
      subtitle={copy.subtitle}
      hideHeader
      steps={copy.steps}
      compactMobileVisual
      renderVisual={(index) => <AdvisorsSelectionWorkflowVisual step={index} />}
    />
  );
}

/*
 * Structure sticky-cards pour la page Artists — même squelette qu'AdvisorsWorkflow.
 * Le texte des steps réutilise les `features` déjà traduites (fr/en).
 * Les mockups ne sont pas codés : chaque carte sticky reste volontairement VIDE,
 * à remplir plus tard (renderVisual renvoie un placeholder blanc).
 */
function ArtistsWorkflow({ content, lang }: { content: SolutionContent; lang: "fr" | "en" }) {
  // 3 checks par step, alignés sur les 4 features artists (ordre identique).
  const bulletsByStep =
    lang === "fr"
      ? [
          [
            "Une fiche claire pour chaque œuvre",
            "Statut, localisation et dimensions au même endroit",
            "Images et documents rattachés à chaque œuvre",
          ],
          [
            "Publiez depuis la même fiche que vous tenez déjà à jour",
            "Gardez une cohérence entre anciennes et nouvelles œuvres dans le temps",
            "Mettez à jour sans dépendre d’un développeur",
          ],
          [
            "Retrouvez les bonnes œuvres pour une demande précise",
            "Composez une présentation sur mesure sans repartir de zéro",
            "Envoyez-la par lien, PDF ou email",
          ],
          [
            "Rédigez des emails et des textes d’œuvres",
            "Préparez du matériel à partir de votre archive",
            "Facilitez vos réponses et vos relances",
          ],
        ]
      : [
          [
            "One clear record for every artwork",
            "Status, location and dimensions in one place",
            "Images and documents attached to each work",
          ],
          [
            "Publish from the same record you already maintain",
            "Keep old and new work coherent over time",
            "Update without depending on a developer",
          ],
          [
            "Choose the most relevant works",
            "Create a presentation for that contact",
            "Send it directly from your archive",
          ],
          [
            "Draft emails and artwork texts",
            "Prepare material from your archive",
            "Help you reply and follow up",
          ],
        ];

  const steps: ScrollStoryStep[] = content.features.map((feature, index) => ({
    title: feature,
    subtitle: "",
    bullets: bulletsByStep[index],
  }));

  const heading =
    lang === "fr"
      ? {
          title: "De votre atelier à vos collectionneurs.",
          subtitle:
            "Organisez votre travail, mettez à jour votre site et partagez des présentations privées.",
        }
      : {
          title: "From your studio to your collectors.",
          subtitle: "Organise your work, update your website and share private presentations.",
        };

  return (
    <ScrollStory
      title={heading.title}
      subtitle={heading.subtitle}
      hideHeader
      steps={steps}
      compactMobileVisual
      isVisualBare={(index) => index === 1 || index === 2 || index === 3}
      renderVisual={(index) =>
        index === 0 ? (
          <ArtworkFormMock />
        ) : index === 1 ? (
          <ArtistWebsiteSyncVisual />
        ) : index === 2 ? (
          <ArtistSelectionActionVisual />
        ) : index === 3 ? (
          <InquiryDraftsFrame animatePipeline />
        ) : (
          <div className="h-full w-full" aria-hidden="true" />
        )
      }
    />
  );
}

export default function SolutionPage({ slug }: { slug: RoleSlug }) {
  const { lang, t } = useLang();
  const solutions = t.solutions as unknown as Record<RoleSlug, SolutionContent> & {
    sectionLabel: string;
    backToHome: string;
  };
  const content = solutions[slug];
  const Visual = ROLE_VISUAL[slug];

  const openContact = () => {
    window.dispatchEvent(new CustomEvent("open-contact-modal"));
  };

  return (
    <main className="relative bg-white">
      {lang === "fr" ? <LandingNavFr /> : <LandingNav />}

      {/* Hero */}
      <section className="px-4 pt-32 pb-10 md:px-6 md:pt-40 md:pb-14">
        <div className="mx-auto max-w-7xl">
          <motion.div {...fadeUp(0)}>
            <p className="mb-4 text-[14px] font-medium tracking-[-0.01em] text-[#858581]">
              {content.eyebrow}
            </p>

            <h1 className="font-display text-[22px] font-normal leading-[1.3] tracking-[-0.04em] text-[#111110] md:text-[40px]">
              {content.title}
            </h1>
            <p className="mt-2 max-w-3xl font-display text-[22px] font-normal leading-[1.3] tracking-[-0.02em] text-[#6B6A67] md:text-[40px]">
              {content.subtitle}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button size="lg" onClick={openContact}>
                {content.cta}
              </Button>
            </div>
            <div className="border-t border-[#E8E8E6] mt-16 md:mt-[96px] -mx-4 md:-mx-6" />
          </motion.div>

          {["galleries", "advisors", "artists"].includes(slug) ? null : (
            <motion.div
              {...fadeUp(0.08)}
              className="relative mt-14 h-[620px] overflow-hidden rounded-xl bg-cover bg-center bg-[#F5F5F3] md:mt-20 md:h-[720px]"
            >
              <div className="absolute inset-6 overflow-hidden rounded-lg border border-[#E8E8E6] bg-white md:inset-10">
                <div className="relative h-full">
                  <Visual />
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {slug === "advisors" ? <AdvisorsWorkflow lang={lang} /> : null}

      {slug === "artists" ? <ArtistsWorkflow content={content} lang={lang} /> : null}

      {slug === "galleries" ? (
        <>
          <GalleriesStickyWorkflow />
          <GalleriesBuiltAroundSection />
          <GalleriesEditorialIntro content={content} lang={lang} onContact={openContact} />
        </>
      ) : null}

      {slug === "artists" ? (
        <CtaBand
          title={
            lang === "fr"
              ? "Construisez le système derrière votre pratique"
              : "Build the system behind your practice"
          }
          subtitle={
            lang === "fr"
              ? "Les outils pour faire avancer votre pratique."
              : "The tools to move your practice forward."
          }
        />
      ) : (
        <CtaBand />
      )}
      <Footer />
    </main>
  );
}
