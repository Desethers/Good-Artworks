"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EYEBROW, H2, SECTION } from "@/components/landing/styles";

const ease = [0.16, 1, 0.3, 1] as const;

const ITEMS = [
  {
    q: "Good Artworks remplace-t-il Artlogic ?",
    a: "Non. Good Artworks fonctionne à côté, à partir de vos exports Artlogic — ou de vos tableurs et dossiers — et rend ces informations utilisables dans vos conversations WhatsApp.",
  },
  {
    q: "Dois-je d’abord migrer ma base ?",
    a: "Non. Nous connectons ce que vous avez déjà. Si vos informations d’œuvres ne sont pas encore structurées, Good Artworks peut s’en charger.",
  },
  {
    q: "Good Artworks envoie-t-il des messages aux collectionneurs automatiquement ?",
    a: "Non. Good Artworks prépare la fiche et note pour qui elle est. Une personne de votre équipe la transfère toujours, depuis son propre WhatsApp.",
  },
  {
    q: "Que se passe-t-il si j’arrête ?",
    a: "Vous gardez vos données : elles appartiennent à votre galerie. Votre inventaire vous est rendu sur simple demande.",
  },
] as const;

function Item({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[#E8E8E6]">
      <button
        onClick={() => setOpen(!open)}
        className="group flex w-full items-center justify-between gap-8 py-6 text-left"
      >
        <span className="font-display text-[16px] tracking-[-0.01em] text-[#111110] transition-colors group-hover:text-[#3a3a38]">
          {q}
        </span>
        <span
          className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#E8E8E6] text-[#6B6A67] transition-transform duration-300"
          style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)" }}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          >
            <path d="M6 1v10M1 6h10" />
          </svg>
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease }}
            className="overflow-hidden"
          >
            <p className="max-w-2xl pb-6 text-[14px] leading-relaxed text-[#6B6A67] md:text-[15px]">
              {a}
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export default function LandingFaqFr() {
  return (
    <section id="faq" className={`${SECTION} bg-white`}>
      <div className="mx-auto w-full max-w-4xl">
        <p className={EYEBROW}>FAQ</p>
        <h2 className={`${H2} mt-5 max-w-2xl`}>Questions.</h2>
        <div className="mt-8 md:mt-10">
          {ITEMS.map((item) => (
            <Item key={item.q} q={item.q} a={item.a} />
          ))}
        </div>
      </div>
    </section>
  );
}
