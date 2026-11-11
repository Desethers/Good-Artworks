"use client";

import { Button } from "@/components/ui/Button";
import { openContact } from "@/components/landing/LandingNav";
import LandingLanguageSwitch from "@/components/landing/LandingLanguageSwitch";
import EmailCta from "@/components/landing/EmailCta";
import {
  CONVERSATION_SECTIONS_FR,
  Heading,
  StatementSection,
} from "@/components/landing/conversations/ConversationSections";

const FOOTER_COLUMNS = [
  {
    title: "Produit",
    links: [
      { label: "Inventaire des œuvres", href: "/fr/product/artwork-inventory" },
      { label: "Conversations de vente", href: "/fr/product/sales-conversations" },
      { label: "Mémoire des collectionneurs", href: "/fr/product/collectors-memory" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "Galeries d’art", href: "/fr/solutions/art-galleries" },
      { label: "Galeries de design", href: "/fr/solutions/design-galleries" },
      { label: "Conseillers et marchands", href: "/fr/solutions/art-advisors-dealers" },
      { label: "Antiquaires", href: "/fr/solutions/antique-dealers" },
    ],
  },
  {
    title: "Good Artworks",
    links: [
      { label: "À propos", href: "/fr/about" },
      { label: "Tarifs", href: "/fr/pricing" },
      { label: "Contact", href: "#contact", opensContact: true },
    ],
  },
] as const;

/** The closing statement above the footer is hidden for now; set to true to bring it back. */
const SHOW_STATEMENT = false;

export default function LandingCtaFr() {
  return (
    <div className={`flex flex-col bg-[#111110] ${SHOW_STATEMENT ? "min-h-[100svh]" : ""}`}>
      {/* The closing statement opens the footer, with the final action under it. */}
      {/* Closing call to action: the home's own heading over the hero's email field. */}
      <section className="bg-white px-4 py-24 md:px-6 md:py-32">
        <Heading
          eyebrow="Démo"
          title="Voyez-le sur votre propre inventaire."
          sub="Trente minutes, sur une vraie demande de collectionneur."
        />
        <div className="mt-10 flex flex-col items-center gap-4 md:mt-12">
          <EmailCta lang="fr" />
          <p className="text-[13px] text-[#ADADAA]">Rien à préparer. Gratuit et sans engagement.</p>
        </div>
      </section>

      {SHOW_STATEMENT ? (
        <StatementSection
          c={CONVERSATION_SECTIONS_FR.statement}
          action={
            <Button size="lg" variant="inverse" onClick={openContact}>
              Réserver une démo
            </Button>
          }
        />
      ) : null}

      <footer id="contact" className="border-t border-white/10 bg-[#111110] text-white">
        <div className="px-4 md:px-6">
          <div className="mx-auto max-w-7xl py-12 md:py-8">
            <div className="grid gap-14 md:grid-cols-[minmax(240px,1fr)_minmax(0,1.5fr)] md:gap-20 lg:gap-28">
              <div>
                <a href="/fr" className="font-display text-[18px] tracking-[-0.025em] text-white">
                  Good Artworks
                </a>
                <p className="mt-5 max-w-[23rem] text-[14px] leading-[1.65] text-[#ADADAA]">
                  L’intelligence relationnelle pour vendre l’art et le design.
                </p>
              </div>

              <nav aria-label="Pied de page" className="grid gap-10 sm:grid-cols-3 lg:gap-8">
                {FOOTER_COLUMNS.map((column) => (
                  <div key={column.title}>
                    <h3 className="text-[12px] font-medium text-[#6B6A67]">{column.title}</h3>
                    <ul className="mt-5 space-y-3">
                      {column.links.map((link) => {
                        const isExternal = link.href.startsWith("https://forart.world");
                        return (
                          <li key={link.label}>
                            <a
                              href={link.href}
                              onClick={"opensContact" in link ? openContact : undefined}
                              className="text-[14px] leading-snug text-[#D5D5D2] transition-colors duration-200 hover:text-white"
                            >
                              {link.label}
                              {isExternal ? (
                                <span aria-hidden="true" className="ml-1">
                                  ↗
                                </span>
                              ) : null}
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </nav>
            </div>

            <div className="mt-16 grid gap-3 pt-6 text-[12px] text-[#6B6A67] sm:grid-cols-[1fr_auto_1fr] sm:items-center md:mt-20">
              <p>© 2026 Good Artworks</p>
              <div className="flex items-center gap-4">
                <LandingLanguageSwitch lang="fr" />
                <p>Paris, France</p>
              </div>
              <p className="sm:justify-self-end">
                Site web réalisé par{" "}
                <a
                  href="https://www.rrstudio.online/"
                  className="underline underline-offset-4 transition-colors duration-200 hover:text-white"
                >
                  R.R Studio
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
