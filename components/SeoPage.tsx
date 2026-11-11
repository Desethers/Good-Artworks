"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import type { Lang } from "@/lib/lang";
import {
  SEO_PAGES,
  type SeoPageCopy,
  type SeoPageId,
  type SeoStepVisual,
  type SeoVisual,
} from "@/lib/seoPages";
import LandingNav, { openContact } from "@/components/landing/LandingNav";
import LandingNavFr from "@/components/landing/LandingNavFr";
import LandingCta from "@/components/landing/LandingCta";
import LandingCtaFr from "@/components/landing/LandingCtaFr";
import { Button } from "@/components/ui/Button";
import { FaqItem } from "@/components/landing/LandingFaq";
import { ArchiveMock } from "@/components/showcase/PillarMocks";
import { ArtworkFormMock } from "@/components/showcase/ArtworkFormMock";
import {
  FollowUpMemoryFrame,
  InquiryDraftsFrame,
  IntegrationsFrame,
} from "@/components/SalesAssistantProductPage";
import AdvisorsSelectionWorkflowVisual from "@/components/AdvisorsSelectionWorkflow";
import { BotOff, Database, LockKeyhole } from "lucide-react";
import { WhatsAppShareWorksMock } from "@/components/shared/ArtworkAddInMocks";
import {
  CONVERSATION_SECTIONS_EN,
  CONVERSATION_SECTIONS_FR,
  MemoryFeed,
  MigrationScreen,
} from "@/components/landing/conversations/ConversationSections";
import { BODY, CONTAINER, EYEBROW, H2, H3, SECTION } from "@/components/landing/styles";

/**
 * The artwork form is drawn for a window about 640px wide. Here it sits on a
 * card, scaled down to the card's width and cropped at the bottom with a soft
 * fade, so it never spills out of its frame.
 */
function ArtworkFormCard({ bare = false }: { bare?: boolean }) {
  const NATURAL_WIDTH = 640;
  const NATURAL_HEIGHT = 780;
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.8);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fit = () => setScale(Math.min(1, el.clientWidth / NATURAL_WIDTH));
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`relative h-full w-full overflow-hidden bg-white ${
        bare ? "" : "max-w-[640px] rounded-[12px] border border-[#E8E8E6]"
      }`}
    >
      <div
        style={{
          width: NATURAL_WIDTH,
          height: NATURAL_HEIGHT,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      >
        <ArtworkFormMock />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent"
      />
    </div>
  );
}

/** One product visual, framed the same way on every page. */
function Visual({ visual, lang }: { visual: SeoVisual; lang: Lang }) {
  if (visual.kind === "photo") {
    return (
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[12px] border border-[#E8E8E6] bg-[#F5F5F3]">
        <Image
          src={visual.src}
          alt={visual.alt}
          fill
          sizes="(min-width: 1152px) 1152px, 100vw"
          className="object-cover"
          priority
        />
      </div>
    );
  }
  if (visual.kind === "memoryFeed") {
    return (
      <div className="relative h-[420px] w-full overflow-hidden rounded-[12px] border border-[#E8E8E6] bg-white px-4 pt-6 md:h-[540px] md:px-10 md:pt-8">
        <div className="mx-auto max-w-3xl">
          <MemoryFeed
            c={(lang === "fr" ? CONVERSATION_SECTIONS_FR : CONVERSATION_SECTIONS_EN).feed}
          />
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white to-transparent"
        />
      </div>
    );
  }
  if (visual.kind === "video") {
    // Muted and looping so it plays on its own; the source is cut before the closing logo.
    return (
      <div className="relative mx-auto aspect-[4/3] w-full max-w-[1080px] overflow-hidden rounded-[12px] border border-[#E8E8E6] bg-[#F5F5F3]">
        <video
          src={visual.src}
          poster={visual.poster}
          aria-label={visual.label}
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
      </div>
    );
  }
  return (
    <div
      className={`relative w-full overflow-hidden rounded-[12px] border border-[#E8E8E6] bg-[#F5F5F3] ${
        visual.kind === "artworkList" ? "h-[480px] md:h-[600px]" : "h-[420px] md:h-[540px]"
      }`}
    >
      {visual.kind === "artworkList" && <ArchiveMock interactive={false} />}
      {visual.kind === "artworkForm" && (
        <div className="flex h-full w-full justify-center p-6 md:p-10">
          <ArtworkFormCard />
        </div>
      )}
      {/* No entrance animation: the draft must be readable as soon as the page loads. */}
      {visual.kind === "inquiryDraft" && <InquiryDraftsFrame />}
      {visual.kind === "advisorSelection" && <AdvisorsSelectionWorkflowVisual step={1} />}
    </div>
  );
}

/** The three data promises of the home, as a small card. */
function DataSafetyCard({ lang }: { lang: Lang }) {
  const rows =
    lang === "fr"
      ? [
          { Icon: Database, k: "Votre espace", v: "Une base propre à votre galerie" },
          { Icon: LockKeyhole, k: "Chiffrées", v: "En transit et au repos" },
          { Icon: BotOff, k: "Pas d’entraînement", v: "Aucun modèle d’IA n’apprend dessus" },
        ]
      : [
          { Icon: Database, k: "Your own space", v: "A database for your gallery only" },
          { Icon: LockKeyhole, k: "Encrypted", v: "In transit and at rest" },
          { Icon: BotOff, k: "No AI training", v: "No AI model learns from it" },
        ];
  return (
    <ul className="w-full max-w-[380px] divide-y divide-[#E8E8E6] rounded-[12px] border border-[#E8E8E6] bg-white">
      {rows.map(({ Icon, k, v }) => (
        <li key={k} className="flex items-center gap-3 px-5 py-4">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F5F5F3] text-[#111110]">
            <Icon size={16} strokeWidth={1.75} aria-hidden="true" />
          </span>
          <span className="min-w-0">
            <span className="block text-[14px] font-medium text-[#111110]">{k}</span>
            <span className="block text-[13px] text-[#6B6A67]">{v}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}

/** The four reasons Good Artworks brings a collector back to you, from the home's feed. */
function FollowUpKindsCard({ lang }: { lang: Lang }) {
  const kinds = (lang === "fr" ? CONVERSATION_SECTIONS_FR : CONVERSATION_SECTIONS_EN).feed.kinds;
  const tones = [
    "bg-rose-50 text-rose-700",
    "bg-blue-50 text-blue-700",
    "bg-amber-50 text-amber-700",
    "bg-violet-50 text-violet-700",
  ];
  return (
    <ul className="w-full max-w-[380px] divide-y divide-[#E8E8E6] rounded-[12px] border border-[#E8E8E6] bg-white">
      {kinds.map((k, i) => (
        <li key={k.label} className="flex flex-col items-start gap-1.5 px-5 py-3.5">
          <span
            className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${tones[i % tones.length]}`}
          >
            {k.label}
          </span>
          <span className="text-[13px] text-[#6B6A67]">{k.body}</span>
        </li>
      ))}
    </ul>
  );
}

/** The visual of one step, on the soft panel shared by every step. */
function StepVisual({ visual, lang }: { visual: SeoStepVisual; lang: Lang }) {
  // Small mocks sit centred on the soft panel; product screens fill their frame.
  if (visual === "collectorRecord") {
    return (
      <div className="h-[360px] w-full overflow-hidden rounded-[12px] border border-[#E8E8E6] bg-[#F5F5F3] p-6 md:h-[460px] md:p-10">
        <FollowUpMemoryFrame />
      </div>
    );
  }
  if (visual === "followUpKinds") {
    return (
      <div className="flex h-[360px] w-full items-center justify-center overflow-hidden rounded-[12px] border border-[#E8E8E6] bg-[#F5F5F3] p-6 md:h-[460px] md:p-10">
        <FollowUpKindsCard lang={lang} />
      </div>
    );
  }
  if (visual === "whatsappPdf") {
    // The animated WhatsApp chat used on the home and solution pages: the work, then /pdf, then the PDF.
    return (
      <div className="h-[360px] w-full overflow-hidden rounded-[12px] border border-[#E8E8E6] bg-[#F5F5F3] md:h-[460px]">
        <WhatsAppShareWorksMock />
      </div>
    );
  }
  if (visual === "dataSafety") {
    return (
      <div className="flex h-[360px] w-full items-center justify-center overflow-hidden rounded-[12px] border border-[#E8E8E6] bg-[#F5F5F3] p-6 md:h-[460px] md:p-10">
        <DataSafetyCard lang={lang} />
      </div>
    );
  }
  return (
    <div className="relative h-[360px] w-full overflow-hidden rounded-[12px] border border-[#E8E8E6] bg-white md:h-[460px]">
      {visual === "artworkForm" && <ArtworkFormCard bare />}
      {visual === "migration" && (
        <MigrationScreen
          c={(lang === "fr" ? CONVERSATION_SECTIONS_FR : CONVERSATION_SECTIONS_EN).migration}
          className="h-full w-full"
          artworksOnly
        />
      )}
      {visual === "gmail" && (
        <div className="pointer-events-none h-full w-full">
          <IntegrationsFrame lang={lang} />
        </div>
      )}
      {visual === "memory" && (
        <div className="h-full overflow-hidden px-4 pt-5 md:px-8 md:pt-6">
          <MemoryFeed
            c={(lang === "fr" ? CONVERSATION_SECTIONS_FR : CONVERSATION_SECTIONS_EN).feed}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent"
          />
        </div>
      )}
    </div>
  );
}

/** A step's text, with the words that lead to another page turned into links. */
function StepBody({ body, links }: { body: string; links?: { text: string; href: string }[] }) {
  if (!links?.length) return <>{body}</>;
  const parts: ReactNode[] = [];
  let rest = body;
  for (const link of links) {
    const at = rest.indexOf(link.text);
    if (at < 0) continue;
    parts.push(rest.slice(0, at));
    parts.push(
      <a
        key={link.href}
        href={link.href}
        className="text-[#111110] underline decoration-[#DCDCD8] underline-offset-4 transition-colors hover:decoration-[#111110]"
      >
        {link.text}
      </a>
    );
    rest = rest.slice(at + link.text.length);
  }
  parts.push(rest);
  return <>{parts}</>;
}

/**
 * Structured data read by search engines and AI assistants: the questions of
 * the page as a FAQ, and the product itself with its public price.
 */
function PageSchema({ c, lang }: { c: SeoPageCopy; lang: Lang }) {
  const graph: object[] = [];
  if (c.faq) {
    graph.push({
      "@type": "FAQPage",
      mainEntity: c.faq.items.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    });
  }
  if (c.featureList) {
    graph.push({
      "@type": "SoftwareApplication",
      name: "Good Artworks",
      description: c.meta.description,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      inLanguage: lang === "fr" ? "fr-FR" : "en",
      featureList: c.featureList,
      offers: {
        "@type": "Offer",
        price: "249",
        priceCurrency: "EUR",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: "249",
          priceCurrency: "EUR",
          unitText: "MONTH",
        },
      },
    });
  }
  if (!graph.length) return null;
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }),
      }}
    />
  );
}

/**
 * The template of every secondary page: hero with the page's search phrase,
 * one visual, three or four blocks (or running text for About), then the
 * shared CTA and footer of the home.
 */
export default function SeoPage({ id, lang }: { id: SeoPageId; lang: Lang }) {
  const c = SEO_PAGES[id][lang];
  const Nav = lang === "fr" ? LandingNavFr : LandingNav;
  const Cta = lang === "fr" ? LandingCtaFr : LandingCta;

  return (
    <>
      <PageSchema c={c} lang={lang} />
      <Nav />
      <main className="bg-white">
        <section
          className={`px-4 pt-32 text-center md:px-6 md:pt-40 ${c.visual ? "pb-16 md:pb-24" : "pb-12 md:pb-16"}`}
        >
          <div className="mx-auto max-w-3xl">
            <p className={EYEBROW}>{c.eyebrow}</p>
            {/* Without a line under it, the title keeps the same room before the next section. */}
            <h1
              className={`mt-5 text-balance font-display text-[34px] font-medium leading-[1.1] tracking-[-0.035em] text-[#111110] md:text-[52px] ${c.sub ? "" : "mb-12"}`}
            >
              {c.title}
            </h1>
            {c.sub ? (
              <p className={`mx-auto mt-5 max-w-2xl text-balance ${BODY}`}>{c.sub}</p>
            ) : null}
            {c.cta ? (
              <div className="mt-8">
                <Button size="lg" onClick={openContact}>
                  {c.cta}
                </Button>
              </div>
            ) : null}
          </div>
        </section>

        {c.visual ? (
          <section className="px-4 pb-16 md:px-6 md:pb-20">
            <div className="mx-auto max-w-6xl">
              <Visual visual={c.visual} lang={lang} />
            </div>
          </section>
        ) : null}

        {c.steps ? (
          <section className={SECTION}>
            {c.stepsTitle ? (
              <h2 className={`mx-auto mb-12 max-w-2xl text-balance text-center md:mb-20 ${H2}`}>
                {c.stepsTitle}
              </h2>
            ) : null}
            <ol className={`${CONTAINER} flex flex-col gap-24 md:gap-40`}>
              {c.steps.map((step, i) => (
                <li
                  key={step.title}
                  className="grid grid-cols-[minmax(0,1fr)] items-center gap-8 md:grid-cols-2 md:gap-16"
                >
                  {/* Sides alternate: visual left on steps 1 and 3, right on step 2. */}
                  <div className={`min-w-0 ${i % 2 === 1 ? "md:order-2" : ""}`}>
                    <StepVisual visual={step.visual} lang={lang} />
                  </div>
                  {/* Same width on every step, centred in its column, so the gap to the visual matches on both sides. */}
                  <div className="min-w-0 md:w-full md:max-w-md md:justify-self-center">
                    {/* Scales with the viewport so a step title stays on one line when the column allows it. */}
                    <h3 className="font-display text-[clamp(22px,2.6vw,32px)] font-medium leading-[1.1] tracking-[-0.03em] text-[#111110]">
                      {step.title}
                    </h3>
                    <p className={`mt-4 max-w-md ${BODY}`}>
                      <StepBody body={step.body} links={step.links} />
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        ) : null}

        {c.blocks ? (
          <section className={`${SECTION} border-t border-[#E8E8E6] bg-[#F5F5F3]`}>
            <div className={`${CONTAINER} grid gap-x-12 gap-y-10 md:grid-cols-2`}>
              {c.blocks.map((block) => (
                <div key={block.title} className="min-w-0">
                  <h2 className={H3}>{block.title}</h2>
                  <ul className="mt-4 flex flex-col gap-2">
                    {block.items.map((item) => (
                      <li
                        key={item}
                        className="flex gap-3 text-[15px] leading-[1.5] tracking-[-0.01em] text-[#6B6A67]"
                      >
                        <span aria-hidden="true" className="text-[#111110]">
                          ✓
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {c.prose ? (
          <section className="px-4 pb-16 md:px-6 md:pb-20">
            <div className="mx-auto flex max-w-2xl flex-col gap-5">
              {c.prose.map((line, i) =>
                i === c.prose!.length - 1 ? (
                  <p key={line} className="mt-4 text-[15px] text-[#111110]">
                    {line}
                  </p>
                ) : (
                  <p key={line} className={BODY}>
                    {line}
                  </p>
                )
              )}
            </div>
          </section>
        ) : null}
        {c.definition ? (
          <section className="px-4 py-16 md:px-6 md:py-24">
            <p className="mx-auto max-w-2xl text-pretty text-[19px] leading-[1.5] tracking-[-0.015em] text-[#111110] md:text-[24px]">
              {c.definition}
            </p>
          </section>
        ) : null}

        {c.faq ? (
          <section className={`${SECTION} bg-white`}>
            <div className={CONTAINER}>
              <p className={EYEBROW}>FAQ</p>
              <h2 className={`${H2} mt-5 max-w-2xl`}>{c.faq.title}</h2>
              <div className="mt-8 md:mt-10">
                {c.faq.items.map((item) => (
                  <FaqItem key={item.q} q={item.q} a={item.a} />
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {c.closing ? (
          <section className={`${SECTION} text-center`}>
            <h2 className={`mx-auto max-w-2xl text-balance ${H2}`}>{c.closing.title}</h2>
            <div className="mt-8">
              <Button size="lg" onClick={openContact}>
                {c.closing.cta}
              </Button>
            </div>
          </section>
        ) : null}
      </main>
      <Cta />
    </>
  );
}
