"use client";

import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import ContactModal from "@/components/ContactModal";
import LandingMobileMenu from "@/components/landing/LandingMobileMenu";
import {
  DemoCasePreview,
  MenuCard,
  PhotoPreview,
  openContact,
  type DemoCaseCopy,
} from "@/components/landing/LandingNav";

const LINKS = [
  { label: "Tarifs", href: "/fr/pricing" },
  { label: "À propos", href: "/fr/about" },
];

/** Ce que fait le produit, sous « Produit » : les pages /fr/product/* et la section collectionneurs de la home. */
const TOOLS_ITEMS = [
  {
    title: "Inventaire des œuvres",
    desc: "Vos œuvres et artistes, importés depuis CSV ou Excel.",
    href: "/fr/product/artwork-inventory",
  },
  {
    title: "Conversations de vente",
    desc: "Vos fiches d’œuvres dans Gmail et WhatsApp, là où vous vendez.",
    href: "/fr/product/sales-conversations",
  },
  {
    title: "Mémoire des collectionneurs",
    desc: "Qui a reçu quoi, et quand relancer.",
    href: "/fr/product/collectors-memory",
  },
];

/** Le cas de démo : Marie demande, Good Artworks prépare, quelqu’un relit et envoie. */
const DEMO_CASE_FR: DemoCaseCopy = {
  channel: "WhatsApp",
  who: "Marie Beaumont",
  question: "Du nouveau chez Sacha Elron ?",
  prepared: "Préparé par Good Artworks",
  reply:
    "Bonjour Marie, un nouvel Elron vient d’arriver, le grand format que vous aimiez en mars. Je vous envoie plus d’images ?",
  work: {
    title: "Sacha Elron — Evening Field",
    meta: "120 × 150 cm · 12 000 € · Disponible",
    image: "/artworks/painting-03.jpg",
  },
  edit: "Modifier",
  send: "Relire et envoyer",
  more: "En savoir plus",
};

const TOOLS_FEATURED = {
  eyebrow: "Gmail et WhatsApp",
  title: "Votre inventaire dans chaque conversation",
  desc: "Vos fiches d’œuvres dans les conversations où vous vendez.",
  cta: "En savoir plus",
  image: "/product/conversations-today.webp",
  href: "/fr/product/sales-conversations",
};

/** Mêmes quatre profils que WhoVitreenIsFor sur la home. */
const SOLUTIONS_ITEMS = [
  {
    title: "Galeries d’art",
    desc: "Inventaire d’œuvres, réponses collectionneurs et sélections privées.",
    href: "/fr/solutions/art-galleries",
  },
  {
    title: "Galeries de design",
    desc: "Pièces, disponibilités et présentations clients.",
    href: "/fr/solutions/design-galleries",
  },
  {
    title: "Art advisors",
    desc: "Sélections privées et fiches d’œuvres prêtes pour vos clients.",
    href: "/fr/solutions/art-advisors-dealers",
  },
  {
    title: "Antiquaires et marchands",
    desc: "Pièces uniques, provenance et état, prêts pour chaque client.",
    href: "/fr/solutions/antique-dealers",
  },
];

const SOLUTIONS_FEATURED = {
  eyebrow: "Pour qui",
  title: "Galeries d’art",
  desc: "Inventaire d’œuvres, réponses collectionneurs et sélections privées, construits autour de votre galerie.",
  cta: "En savoir plus",
  image: "/gallery-screen2.png",
  href: "/fr/solutions/art-galleries",
};

/**
 * Version française de LandingNav — même structure, réutilise `openContact`
 * pour piloter le même ContactModal (déjà localisé via useLang).
 */
export default function LandingNavFr() {
  const [scrolled, setScrolled] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [activeToolIndex, setActiveToolIndex] = useState(0);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const menu = toolsOpen ? "tools" : solutionsOpen ? "solutions" : null;
  const [activeSolutionIndex, setActiveSolutionIndex] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 2);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed left-0 right-0 top-0 z-50 border-b-[0.5px] bg-white px-4 pb-2 pt-3 transition-[border-color] duration-200 md:px-6 ${
          scrolled ? "border-[#E8E8E6]" : "border-transparent"
        }`}
      >
        <div className="relative mx-auto flex h-9 w-full max-w-7xl items-center justify-between">
          <a
            href="/fr"
            className="font-wordmark text-lg tracking-tight text-[#111110] transition-opacity duration-200 hover:opacity-80 md:text-xl"
          >
            <span className="font-semibold">Good Art</span>
            <span className="font-normal">works</span>
          </a>

          <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-7 md:flex">
            <div
              onMouseEnter={() => {
                setToolsOpen(true);
                setSolutionsOpen(false);
              }}
              onMouseLeave={() => setToolsOpen(false)}
            >
              <button
                type="button"
                onClick={() => {
                  setToolsOpen(true);
                  setSolutionsOpen(false);
                }}
                aria-expanded={toolsOpen}
                className="text-sm text-[#858581] transition-colors duration-200 hover:text-[#111110]"
              >
                Produit
              </button>
            </div>
            <div
              onMouseEnter={() => {
                setSolutionsOpen(true);
                setToolsOpen(false);
              }}
              onMouseLeave={() => setSolutionsOpen(false)}
            >
              <button
                type="button"
                onClick={() => {
                  setSolutionsOpen(true);
                  setToolsOpen(false);
                }}
                aria-expanded={solutionsOpen}
                className="text-sm text-[#858581] transition-colors duration-200 hover:text-[#111110]"
              >
                Solutions
              </button>
            </div>
            {LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-[#858581] transition-colors duration-200 hover:text-[#111110]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <Button
            size="sm"
            onClick={openContact}
            className="shrink-0 !px-3 !py-[7px] !text-[12px] max-md:!hidden"
          >
            Réserver une démo
          </Button>
          <LandingMobileMenu
            groups={[
              { title: "Produit", items: TOOLS_ITEMS },
              { title: "Solutions", items: SOLUTIONS_ITEMS },
            ]}
            links={LINKS}
            cta="Réserver une démo"
            label="Menu"
          />
        </div>

        <AnimatePresence mode="wait">
          {menu === "tools" && (
            <MenuCard
              key="tools"
              label="Produit"
              items={TOOLS_ITEMS}
              activeIndex={activeToolIndex}
              onActive={setActiveToolIndex}
              onClose={() => setToolsOpen(false)}
              onEnter={() => setToolsOpen(true)}
              onLeave={() => setToolsOpen(false)}
              href={TOOLS_FEATURED.href}
              preview={<DemoCasePreview c={DEMO_CASE_FR} />}
            />
          )}
          {menu === "solutions" && (
            <MenuCard
              key="solutions"
              label="Solutions"
              items={SOLUTIONS_ITEMS}
              activeIndex={activeSolutionIndex}
              onActive={setActiveSolutionIndex}
              onClose={() => setSolutionsOpen(false)}
              onEnter={() => setSolutionsOpen(true)}
              onLeave={() => setSolutionsOpen(false)}
              href={SOLUTIONS_FEATURED.href}
              preview={
                <PhotoPreview
                  image={SOLUTIONS_FEATURED.image}
                  title={SOLUTIONS_FEATURED.title}
                  desc={SOLUTIONS_FEATURED.desc}
                  cta={SOLUTIONS_FEATURED.cta}
                />
              }
            />
          )}
        </AnimatePresence>
      </header>

      <ContactModal />
    </>
  );
}
