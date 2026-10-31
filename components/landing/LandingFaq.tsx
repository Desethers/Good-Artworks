"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CONTAINER, EYEBROW, H2, SECTION } from "@/components/landing/styles";

const ease = [0.16, 1, 0.3, 1] as const;

const ITEMS = [
  {
    q: "Does Vitreen replace Artlogic?",
    a: "No. Vitreen works alongside it, from your Artlogic exports — or from spreadsheets and folders — and makes that information usable in your WhatsApp conversations.",
  },
  {
    q: "Do I need to migrate my database first?",
    a: "No. We connect what you already have. If your artwork information isn't structured yet, Vitreen can build that part for you.",
  },
  {
    q: "Does Vitreen send messages to collectors automatically?",
    a: "No. Vitreen prepares the card and notes who it is for. A person on your team always forwards it, from their own WhatsApp.",
  },
  {
    q: "What happens if I stop?",
    a: "You keep your data: it belongs to your gallery. Your inventory is handed back to you on request.",
  },
] as const;

/** One question that opens on click; reused by the secondary pages. */
export function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[#E8E8E6]">
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
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
      {/* The answer stays in the page while closed, so search engines and AI assistants read it. */}
      <motion.div
        initial={false}
        animate={open ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: 0.3, ease }}
        className="overflow-hidden"
      >
        <p className="max-w-2xl pb-6 text-[14px] leading-relaxed text-[#6B6A67] md:text-[15px]">
          {a}
        </p>
      </motion.div>
    </div>
  );
}

export default function LandingFaq() {
  return (
    <section id="faq" className={`${SECTION} bg-white`}>
      <div className={CONTAINER}>
        <p className={EYEBROW}>FAQ</p>
        <h2 className={`${H2} mt-5 max-w-2xl`}>Questions.</h2>
        <div className="mt-8 md:mt-10">
          {ITEMS.map((item) => (
            <FaqItem key={item.q} q={item.q} a={item.a} />
          ))}
        </div>
      </div>
    </section>
  );
}
