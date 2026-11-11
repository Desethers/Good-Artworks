"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { openContact } from "@/components/landing/LandingNav";
import HeroObjects from "@/components/landing/HeroObjects";
import EmailCta from "@/components/landing/EmailCta";
import { IntegrationsFrame } from "@/components/SalesAssistantProductPage";
import { WhatsAppShareWorksMock } from "@/components/shared/ArtworkAddInMocks";
import { WA, WaBubble, type WaMessage } from "@/components/whatsapp/WaChat";

/*
 * A home in the layout of glideapps.com, told with Good Artworks's product: a hero
 * with an ask box over the real product, the channels it works with, the loop
 * in tabs, three ways to sell, then trust on a dark band. Only what Good Artworks
 * does today; no client logos or testimonials until there are real ones.
 */

const ease = [0.16, 1, 0.3, 1] as const;
const ARTWORK = "/artworks/painting-05.jpg";
const CONVERSATIONS = "/product/conversations-today.webp";

const CONTAINER = "mx-auto w-full max-w-6xl px-4 md:px-6";
const H2 =
  "font-display text-[34px] font-medium leading-[1.08] tracking-[-0.035em] text-[#111110] md:text-[52px]";
const H2_GREY = "text-[#ADADAA]";
const EYEBROW = "text-[14px] font-medium text-[#111110]";
const BODY = "text-[16px] leading-[1.6] text-[#6B6A67] md:text-[17px]";

/* ─── Hero ──────────────────────────────────────────────────────────────── */

function GmailNotification({
  delay,
  name,
  children,
}: {
  delay: number;
  name: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      className="w-full rounded-[18px] border border-[#E8E8E6] bg-white p-4 shadow-[0_18px_45px_rgba(0,0,0,0.08)]"
      initial={{ opacity: 0, x: -18, y: 8 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.7, ease, delay }}
    >
      <div className="flex items-center gap-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logos/icon-gmail-96.png" alt="" className="h-5 w-5" />
        <p className="text-[13px] font-medium text-[#111110]">{name}</p>
        <span className="ml-auto text-[11px] text-[#ADADAA]">now</span>
      </div>
      <p className="mt-3 text-[13px] leading-[1.45] text-[#6B6A67]">{children}</p>
    </motion.div>
  );
}

function HeroArtworkCard() {
  return (
    <motion.div
      className="w-full overflow-hidden rounded-[20px] border border-[#E8E8E6] bg-white shadow-[0_22px_55px_rgba(0,0,0,0.08)]"
      initial={{ opacity: 0, y: 18, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.75, ease, delay: 0.35 }}
    >
      <div className="flex items-center justify-between border-b border-[#E8E8E6] px-4 py-3">
        <span className="text-[12px] font-medium text-[#111110]">Good Artworks inventory</span>
        <span className="flex items-center gap-1.5 text-[11px] text-emerald-700">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Available
        </span>
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={ARTWORK}
        alt="Evening field by Sacha Elron"
        className="aspect-[16/9] w-full object-cover"
      />
      <div className="grid grid-cols-[1fr_auto] gap-4 p-4">
        <div>
          <p className="text-[11px] text-[#6B6A67]">Sacha Elron · 2023</p>
          <p className="mt-1 text-[16px] italic text-[#111110]">Evening field</p>
          <p className="mt-2 text-[11px] text-[#6B6A67]">Acrylic · 120 × 120 cm</p>
        </div>
        <p className="text-[14px] font-medium text-[#111110]">€10,000</p>
      </div>
    </motion.div>
  );
}

function HeroConnectionScene() {
  return (
    <motion.div
      className="relative mx-auto mt-14 max-w-6xl overflow-hidden rounded-t-[28px] border border-b-0 border-[#E8E8E6] bg-[#F5F5F3] px-5 pb-16 pt-8 md:mt-20 md:px-10 md:pb-24 md:pt-12"
      initial={{ opacity: 0, y: 35 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease, delay: 0.3 }}
    >
      <div className="pointer-events-none absolute left-[24%] top-[44%] hidden h-px w-[52%] bg-[#D8D8D5] md:block" />
      <div className="relative grid items-center gap-6 md:grid-cols-[0.9fr_1fr_0.9fr] md:gap-8">
        <div className="space-y-4">
          <p className="px-1 text-[12px] font-medium text-[#ADADAA]">A collector writes in Gmail</p>
          <GmailNotification delay={0.55} name="Marie Beaumont">
            Is Evening field still available? Could you remind me of its dimensions?
          </GmailNotification>
          <GmailNotification delay={1.6} name="Good Artworks add-on">
            Evening field found in your inventory · ready to insert in the draft.
          </GmailNotification>
        </div>

        <div>
          <p className="mb-3 px-1 text-center text-[12px] font-medium text-[#ADADAA]">
            One inventory record
          </p>
          <HeroArtworkCard />
        </div>

        <div>
          <p className="mb-3 px-1 text-[12px] font-medium text-[#ADADAA]">
            You ask Good Artworks on WhatsApp
          </p>
          <div className="h-[360px] w-full">
            <MiniChat messages={ASK_THREAD} />
          </div>
        </div>
      </div>
      <div className="mt-7 flex flex-wrap items-center justify-center gap-2 text-[11px] text-[#6B6A67]">
        <span className="rounded-full border border-[#E0E0DD] bg-white px-3 py-1.5">
          Gmail · early access
        </span>
        <span className="rounded-full border border-[#E0E0DD] bg-white px-3 py-1.5">
          WhatsApp · available
        </span>
        <span className="rounded-full border border-[#E0E0DD] bg-white px-3 py-1.5">
          Outlook · early access
        </span>
      </div>
    </motion.div>
  );
}

/** True on phones (under the md breakpoint); false on the server and until measured. */
function useIsPhone() {
  const [phone, setPhone] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(max-width: 767px)");
    const update = () => setPhone(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  return phone;
}

type HeroLang = "en" | "fr";

/** What the hero animations say, per language. */
const HERO_COPY = {
  en: {
    gmail: [
      { name: "Marie Beaumont", text: "Is Van Gogh’s Self-Portrait available?", time: "09:41" },
      { name: "Thomas Baur", text: "Price and provenance for Breuer’s B64 chair?", time: "10:12" },
      {
        name: "Clara Fournier",
        text: "Could you send details for Campbell’s Soup Cans?",
        time: "now",
      },
    ],
    q1: (
      <>
        Could you remind me of <em>Evening Field</em>’s dimensions?
      </>
    ),
    a1: "Thank you for your question, here you can find the details.",
    q2: "Is Marcel Breuer’s B64 chair still available?",
    a2: "Of course! Here is the Breuer B64 chair, with its details.",
    typing: "The other person is typing",
  },
  fr: {
    gmail: [
      {
        name: "Marie Beaumont",
        text: "L’Autoportrait de Van Gogh est-il disponible ?",
        time: "09:41",
      },
      {
        name: "Thomas Baur",
        text: "Prix et provenance de la chaise B64 de Breuer ?",
        time: "10:12",
      },
      {
        name: "Clara Fournier",
        text: "Pourriez-vous m’envoyer les détails des Campbell’s Soup Cans ?",
        time: "à l’instant",
      },
    ],
    q1: (
      <>
        Pouvez-vous me rappeler les dimensions d’<em>Evening Field</em> ?
      </>
    ),
    a1: "Merci pour votre question, voici les détails.",
    q2: "La chaise B64 de Marcel Breuer est-elle toujours disponible ?",
    a2: "Bien sûr ! Voici la chaise B64 de Breuer, avec ses détails.",
    typing: "L’autre personne est en train d’écrire",
  },
} as const;

function HeroMicroSignals({ lang = "en" }: { lang?: HeroLang }) {
  const t = HERO_COPY[lang];
  const reduce = useReducedMotion();
  const phone = useIsPhone();
  const [gmailStep, setGmailStep] = useState(0);
  const [whatsAppStep, setWhatsAppStep] = useState(0);
  // On phones only one scene shows at a time: Gmail plays through, then WhatsApp, then again.
  const [turn, setTurn] = useState<"gmail" | "whatsapp">("gmail");

  useEffect(() => {
    if (phone && turn !== "gmail") return;
    const delays = [600, 750, 750, 2800];
    const timeout = window.setTimeout(() => {
      if (gmailStep === 3) {
        setGmailStep(0);
        if (phone) setTurn("whatsapp");
      } else setGmailStep(gmailStep + 1);
    }, delays[gmailStep]);

    return () => window.clearTimeout(timeout);
  }, [gmailStep, phone, turn]);

  // On larger screens WhatsApp starts a beat after Gmail, so the two never play in lockstep.
  const [whatsAppStarted, setWhatsAppStarted] = useState(false);
  useEffect(() => {
    const timeout = window.setTimeout(() => setWhatsAppStarted(true), 1800);
    return () => window.clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (phone ? turn !== "whatsapp" : !whatsAppStarted) return;
    // 0 idle · 1 question · 2 typing · 3 answer (held) · 4 pause · 5 question · 6 typing · 7 answer (held) · 8 pause
    const delays = [900, 700, 1300, 3600, 900, 700, 1300, 3600, 1100];
    const timeout = window.setTimeout(() => {
      if (whatsAppStep === 8) {
        setWhatsAppStep(0);
        if (phone) setTurn("gmail");
      } else setWhatsAppStep(whatsAppStep + 1);
    }, delays[whatsAppStep]);

    return () => window.clearTimeout(timeout);
  }, [whatsAppStep, whatsAppStarted, phone, turn]);

  const gmail = t.gmail;

  return (
    <div className="mx-auto mt-12 grid h-[230px] w-full max-w-5xl place-items-center gap-5 px-2 md:mt-16 md:h-[240px] md:grid-cols-2 md:place-items-stretch md:gap-14">
      <motion.div
        className={`relative mx-auto h-[220px] w-full max-w-[350px] ${phone && turn !== "gmail" ? "hidden" : ""}`}
        initial={reduce ? false : { x: -20, y: 10, scale: 0.97 }}
        animate={{ x: 0, y: 0, scale: 1 }}
        transition={{ duration: reduce ? 0 : 0.4, ease }}
      >
        <AnimatePresence>
          {gmail.map((item, index) =>
            gmailStep > index ? (
              <motion.div
                key={item.name}
                className="absolute w-[88%] rounded-[16px] border border-[#E8E8E6] bg-white px-4 py-3.5"
                style={{
                  // Tight stack: each earlier mail keeps only its header row showing.
                  left: `${2 + index * 4}%`,
                  top: index * 30,
                  zIndex: 10 + index,
                }}
                initial={reduce ? false : { y: 18, scale: 0.9 }}
                animate={{ y: 0, scale: 1 }}
                exit={reduce ? undefined : { y: -5, scale: 0.95 }}
                transition={{ duration: reduce ? 0 : 0.38, ease }}
              >
                <div className="flex items-center gap-2.5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/logos/icon-gmail-96.png" alt="" className="h-4 w-4" />
                  <span className="text-[12px] font-medium text-[#111110]">{item.name}</span>
                  <span className="ml-auto text-[10px] text-[#ADADAA]">{item.time}</span>
                </div>
                <p className="mt-1.5 text-[12px] leading-[1.35] text-[#6B6A67]">{item.text}</p>
              </motion.div>
            ) : null
          )}
        </AnimatePresence>
      </motion.div>

      <motion.div
        className={`relative mx-auto h-[170px] w-full max-w-[410px] md:ml-auto md:mr-0 ${phone && turn !== "whatsapp" ? "hidden" : ""}`}
        initial={reduce ? false : { x: 20, y: 10, scale: 0.97 }}
        animate={{ x: 0, y: 0, scale: 1 }}
        transition={{ duration: reduce ? 0 : 0.4, delay: reduce ? 0 : 0.65, ease }}
      >
        <AnimatePresence>
          {whatsAppStep >= 1 && whatsAppStep <= 3 ? (
            <motion.div
              key="painting-question"
              className="absolute right-0 top-0 max-w-[88%] rounded-[18px_18px_5px_18px] bg-[#D9FDD3] px-4 py-2.5 text-[#111110]"
              initial={reduce ? false : { y: 12, scale: 0.88 }}
              animate={{ y: 0, scale: 1 }}
              exit={
                reduce ? undefined : { opacity: 0, y: -10, transition: { duration: 0.9, ease } }
              }
              transition={{ duration: reduce ? 0 : 0.38, ease }}
            >
              <p className="text-[13px] leading-[1.3]">{t.q1}</p>
              <span className="mt-1 flex items-center justify-end gap-1 text-[9px] text-[#66776F]">
                10:41 <span className="font-medium text-[#53BDEB]">✓✓</span>
              </span>
            </motion.div>
          ) : null}

          {whatsAppStep === 2 ? (
            <motion.div
              key="painting-typing"
              className="absolute left-0 top-[78px] flex items-center gap-1 rounded-[13px_13px_13px_4px] border border-[#E8E8E6] bg-white px-3.5 py-3"
              initial={reduce ? false : { y: 10, scale: 0.88 }}
              animate={{ y: 0, scale: 1 }}
              exit={reduce ? undefined : { opacity: 0, transition: { duration: 0.2 } }}
              transition={{ duration: reduce ? 0 : 0.3, ease }}
              aria-label={t.typing}
            >
              {[0, 1, 2].map((dot) => (
                <motion.span
                  key={dot}
                  className="h-1.5 w-1.5 rounded-full bg-[#8A8A87]"
                  animate={reduce ? undefined : { y: [0, -3, 0] }}
                  transition={{
                    duration: 0.7,
                    delay: dot * 0.12,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </motion.div>
          ) : null}

          {whatsAppStep === 3 ? (
            <motion.div
              key="painting-answer"
              className="absolute left-0 top-[78px] w-[88%] rounded-[18px_18px_18px_5px] border border-[#E8E8E6] bg-white px-4 py-3 text-left"
              initial={reduce ? false : { y: 12, scale: 0.88 }}
              animate={{ y: 0, scale: 1 }}
              exit={
                reduce ? undefined : { opacity: 0, y: -10, transition: { duration: 0.9, ease } }
              }
              transition={{ duration: reduce ? 0 : 0.38, ease }}
            >
              <p className="text-[12px] leading-[1.4] text-[#111110]">{t.a1}</p>
              <span className="mt-1 block text-right text-[8px] text-[#8A8A87]">10:42</span>
            </motion.div>
          ) : null}

          {whatsAppStep >= 5 && whatsAppStep <= 7 ? (
            <motion.div
              key="chair-question"
              className="absolute right-0 top-0 max-w-[88%] rounded-[18px_18px_5px_18px] bg-[#D9FDD3] px-4 py-2.5 text-[#111110]"
              initial={reduce ? false : { y: 12, scale: 0.88 }}
              animate={{ y: 0, scale: 1 }}
              exit={
                reduce ? undefined : { opacity: 0, y: -10, transition: { duration: 0.9, ease } }
              }
              transition={{ duration: reduce ? 0 : 0.38, ease }}
            >
              <p className="text-[13px] leading-[1.3]">{t.q2}</p>
              <span className="mt-1 flex items-center justify-end gap-1 text-[9px] text-[#66776F]">
                10:44 <span className="font-medium text-[#53BDEB]">✓✓</span>
              </span>
            </motion.div>
          ) : null}

          {whatsAppStep === 6 ? (
            <motion.div
              key="chair-typing"
              className="absolute left-0 top-[78px] flex items-center gap-1 rounded-[13px_13px_13px_4px] border border-[#E8E8E6] bg-white px-3.5 py-3"
              initial={reduce ? false : { y: 10, scale: 0.88 }}
              animate={{ y: 0, scale: 1 }}
              exit={reduce ? undefined : { opacity: 0, transition: { duration: 0.2 } }}
              transition={{ duration: reduce ? 0 : 0.3, ease }}
              aria-label={t.typing}
            >
              {[0, 1, 2].map((dot) => (
                <motion.span
                  key={dot}
                  className="h-1.5 w-1.5 rounded-full bg-[#8A8A87]"
                  animate={reduce ? undefined : { y: [0, -3, 0] }}
                  transition={{
                    duration: 0.7,
                    delay: dot * 0.12,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </motion.div>
          ) : null}

          {whatsAppStep === 7 ? (
            <motion.div
              key="chair-answer"
              className="absolute left-0 top-[78px] w-[88%] rounded-[18px_18px_18px_5px] border border-[#E8E8E6] bg-white px-4 py-3 text-left"
              initial={reduce ? false : { y: 12, scale: 0.88 }}
              animate={{ y: 0, scale: 1 }}
              exit={
                reduce ? undefined : { opacity: 0, y: -10, transition: { duration: 0.9, ease } }
              }
              transition={{ duration: reduce ? 0 : 0.38, ease }}
            >
              <p className="text-[12px] leading-[1.4] text-[#111110]">{t.a2}</p>
              <span className="mt-1 block text-right text-[8px] text-[#8A8A87]">10:45</span>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export function GlideHero({
  showConnectionScene = true,
  lang = "en",
}: {
  showConnectionScene?: boolean;
  lang?: HeroLang;
}) {
  const fr = lang === "fr";
  return (
    <section
      className={`relative overflow-hidden bg-white px-4 md:px-6 ${
        showConnectionScene
          ? "pt-32 md:pt-40"
          : "flex min-h-[100svh] flex-col justify-center py-20 md:py-24"
      }`}
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center pt-12 text-center md:pt-20">
        <h1 className="m-0 mx-auto max-w-5xl text-balance font-display text-[clamp(30px,9vw,44px)] font-medium leading-[1.2] tracking-[-0.04em] text-[#111110] md:text-[68px]">
          {fr ? (
            <>
              <span className="hero-reveal hero-d-1 md:block lg:whitespace-nowrap">
                Vendez
                <HeroObjects object="poster" order={1} />
                <br className="md:hidden" /> ce qui ne se vend pas
                <br className="md:hidden" />
              </span>{" "}
              <span className="hero-reveal hero-d-2 md:block lg:whitespace-nowrap">
                {/* Phones: the chair opens the last line, just before "comme". */}
                <span className="md:hidden">
                  <HeroObjects object="chair" order={2} spaceBefore={false} />
                </span>{" "}
                comme
                <span className="hidden md:contents">
                  <HeroObjects object="chair" order={2} />
                </span>{" "}
                le reste
                <HeroObjects object="dog" order={3} spaceAfter={false} />.
              </span>
            </>
          ) : (
            <>
              <span className="hero-reveal hero-d-1 md:block lg:whitespace-nowrap">
                Sell what
                <HeroObjects object="poster" order={1} />
                <br className="md:hidden" /> doesn&rsquo;t sell
                {/* Phones: the chair sits between "sell" and "like". */}
                <span className="md:hidden">
                  <HeroObjects object="chair" order={2} />
                </span>
              </span>{" "}
              <span className="hero-reveal hero-d-2 md:block lg:whitespace-nowrap">
                like
                <span className="hidden md:contents">
                  <HeroObjects object="chair" order={2} />
                </span>
                <br className="md:hidden" /> everything
                <HeroObjects object="dog" order={3} /> else.
              </span>
            </>
          )}
        </h1>

        <p className="hero-soft hero-d-2 mt-6 max-w-2xl text-balance text-[16px] leading-[1.55] text-[#6B6A67] md:mt-9 md:text-[19px] md:leading-[1.6]">
          {fr
            ? "Good Artworks connecte votre inventaire à Gmail et WhatsApp."
            : "Good Artworks connects your inventory to Gmail and WhatsApp."}
        </p>

        <div className="hero-soft hero-d-3 mt-10 flex w-full justify-center md:mt-12">
          <EmailCta lang={lang} />
        </div>
      </div>
      {!showConnectionScene ? <HeroMicroSignals lang={lang} /> : null}
      {showConnectionScene ? <HeroConnectionScene /> : null}
    </section>
  );
}

/* ─── Works with ────────────────────────────────────────────────────────── */

function WorksWith() {
  const channels = [
    { label: "WhatsApp", logo: "/logos/whatsapp.svg" },
    { label: "Gmail", logo: "/logos/icon-gmail-96.png" },
    { label: "Outlook", logo: null },
  ];
  const sources = [
    { label: "Excel", logo: "/logos/Microsoft_Office_Excel_Logo.svg" },
    { label: "Google Sheets", logo: null },
    { label: "Artlogic exports", logo: null },
  ];
  return (
    <section className="border-y border-[#E8E8E6] bg-white px-4 py-8 md:px-6">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-8 gap-y-4">
        <span className="text-[13px] text-[#ADADAA]">Starts with</span>
        {sources.map((t) => (
          <span key={t.label} className="flex items-center gap-2 text-[15px] text-[#6B6A67]">
            {t.logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={t.logo} alt="" className="h-5 w-5 object-contain grayscale" />
            ) : null}
            {t.label}
          </span>
        ))}
        <span aria-hidden="true" className="hidden h-5 w-px bg-[#E8E8E6] md:block" />
        <span className="text-[13px] text-[#ADADAA]">Connects to</span>
        {channels.map((t) => (
          <span key={t.label} className="flex items-center gap-2 text-[15px] text-[#6B6A67]">
            {t.logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={t.logo} alt="" className="h-5 w-5 object-contain grayscale" />
            ) : null}
            {t.label}
          </span>
        ))}
      </div>
    </section>
  );
}

/* ─── The loop, in tabs ─────────────────────────────────────────────────── */

const ASK_THREAD: WaMessage[] = [
  { from: "me", time: "10:41", text: "elron 2023" },
  {
    from: "bot",
    time: "10:41",
    image: ARTWORK,
    text: "Sacha Elron\nEvening field, 2023\nAcrylic on canvas\n120 × 120 cm\n€10,000",
  },
  { from: "bot", time: "10:41", text: "Available · ref. SE-2023-04" },
];

function MiniChat({ messages }: { messages: WaMessage[] }) {
  return (
    <div
      className="flex h-full w-full max-w-[360px] flex-col justify-end gap-[3px] overflow-hidden rounded-[24px] border border-[#E8E8E6] px-4 py-4"
      style={{ background: WA.wallpaper }}
    >
      {messages.map((m, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease, delay: 0.3 + i * 0.7 }}
        >
          <WaBubble m={m} tail={i === 0 || messages[i - 1].from !== m.from} />
        </motion.div>
      ))}
    </div>
  );
}

function SourceVisual() {
  return (
    <div className="w-full max-w-[460px] overflow-hidden rounded-[16px] border border-[#E8E8E6] bg-white">
      <div className="flex items-center gap-4 px-5 py-5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logos/Microsoft_Office_Excel_Logo.svg" alt="" className="h-9 w-9" />
        <div className="min-w-0 flex-1">
          <p className="text-[15px] font-medium text-[#111110]">gallery_inventory.xlsx</p>
          <p className="mt-0.5 text-[13px] text-[#6B6A67]">
            Works, artists, prices and availability
          </p>
        </div>
        <span className="rounded-full bg-emerald-50 px-3 py-1 text-[12px] text-emerald-700">
          Ready
        </span>
      </div>
      <div className="grid grid-cols-4 border-t border-[#E8E8E6] bg-[#FAFAF8] px-5 py-3 text-[11px] text-[#ADADAA]">
        <span>Title</span>
        <span>Artist</span>
        <span>Price</span>
        <span>Status</span>
      </div>
      {["Evening field", "Blue hour", "Untitled", "Shore"].map((title, i) => (
        <motion.div
          key={title}
          className="grid grid-cols-4 border-t border-[#F0F0EE] px-5 py-3 text-[12px] text-[#6B6A67]"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.3 + i * 0.18 }}
        >
          <span className="truncate pr-2 text-[#111110]">{title}</span>
          <span className="truncate pr-2">{i < 2 ? "Sacha Elron" : "Lina Ores"}</span>
          <span>{["€10,000", "€9,500", "€4,800", "€6,200"][i]}</span>
          <span>{["Available", "Sold", "Reserved", "Available"][i]}</span>
        </motion.div>
      ))}
    </div>
  );
}

/** The inventory result Good Artworks can safely return for a precise question. */
function FindVisual() {
  const works = [
    {
      img: ARTWORK,
      artist: "Sacha Elron",
      title: "Evening field, 2023",
      price: "€10,000",
      status: "Available",
    },
    {
      img: "/artworks/painting-08.jpg",
      artist: "Sacha Elron",
      title: "Blue hour, 2022",
      price: "€9,500",
      status: "Sold",
    },
    {
      img: "/artworks/painting-03.jpg",
      artist: "Lina Ores",
      title: "Untitled, 2025",
      price: "€4,800",
      status: "Reserved",
    },
    {
      img: "/artworks/painting-10.jpg",
      artist: "Lina Ores",
      title: "Shore, 2024",
      price: "€6,200",
      status: "Available",
    },
  ];
  const tone: Record<string, string> = {
    Available: "text-emerald-700",
    Sold: "text-[#ADADAA]",
    Reserved: "text-amber-700",
  };
  return (
    <div className="w-full max-w-[460px] overflow-hidden rounded-[16px] border border-[#E8E8E6] bg-white">
      <div className="flex items-center gap-3 border-b border-[#E8E8E6] px-5 py-4">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#111110] text-[13px] text-white">
          V
        </span>
        <div className="min-w-0 flex-1 leading-tight">
          <p className="text-[14px] font-medium text-[#111110]">Matches from your inventory</p>
          <p className="text-[12px] text-[#6B6A67]">Sacha Elron · 2023</p>
        </div>
        <span className="text-[12px] text-[#ADADAA]">4 works</span>
      </div>
      <ul>
        {works.map((w, i) => (
          <motion.li
            key={w.title}
            className="flex items-center gap-3 border-b border-[#F0F0EE] px-5 py-3 last:border-0"
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease, delay: 0.4 + i * 0.35 }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={w.img} alt="" className="h-11 w-11 rounded-[6px] object-cover" />
            <div className="min-w-0 flex-1 leading-tight">
              <p className="text-[11px] text-[#6B6A67]">{w.artist}</p>
              <p className="truncate text-[14px] italic text-[#111110]">{w.title}</p>
            </div>
            <div className="text-right leading-tight">
              <p className="text-[13px] text-[#111110]">{w.price}</p>
              <p className={`text-[12px] ${tone[w.status]}`}>{w.status}</p>
            </div>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

const TABS = [
  {
    label: "Spreadsheet or export",
    caption: "Start with the records you already maintain — Excel, Google Sheets or Artlogic.",
    visual: <SourceVisual />,
  },
  {
    label: "Good Artworks inventory",
    caption: "Good Artworks turns them into one clean inventory of works, prices and availability.",
    visual: <FindVisual />,
  },
  {
    label: "Gmail, WhatsApp, Outlook",
    caption: "Search and use that inventory without leaving the conversation you are answering.",
    visual: (
      <div className="grid h-[440px] w-full max-w-[820px] grid-cols-1 gap-4 md:grid-cols-[1.15fr_0.85fr]">
        <div className="pointer-events-none overflow-hidden rounded-[16px] border border-[#E8E8E6] bg-white">
          <IntegrationsFrame />
        </div>
        <MiniChat messages={ASK_THREAD} />
      </div>
    ),
  },
];

const TAB_MS = 7000;

function LoopTabs() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.35 });
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (reduce || !inView) return;
    const t = window.setTimeout(() => setActive((a) => (a + 1) % TABS.length), TAB_MS);
    return () => window.clearTimeout(t);
  }, [active, inView, reduce]);

  return (
    <section id="loop" className="scroll-mt-20 bg-white px-4 py-24 md:px-6 md:py-32">
      <div ref={ref} className="mx-auto max-w-6xl">
        <h2 className={`${H2} mx-auto max-w-3xl text-balance text-center`}>
          From your spreadsheet to your conversations.
          <br />
          <span className={H2_GREY}>One inventory connects them.</span>
        </h2>

        {/* Tabs, each with the bar that fills while it plays. */}
        <div className="mt-12 grid grid-cols-3 gap-2 md:mt-16 md:gap-4">
          {TABS.map((t, i) => (
            <button
              key={t.label}
              type="button"
              onClick={() => setActive(i)}
              className="group text-left"
              aria-current={i === active}
            >
              <span className="block h-[2px] w-full overflow-hidden rounded-full bg-[#E8E8E6]">
                {i === active ? (
                  <motion.span
                    key={`${active}-${inView}`}
                    className="block h-full bg-[#111110]"
                    initial={{ width: reduce ? "100%" : "0%" }}
                    animate={{ width: inView ? "100%" : "0%" }}
                    transition={{ duration: reduce ? 0 : TAB_MS / 1000, ease: "linear" }}
                  />
                ) : null}
              </span>
              <span
                className={`mt-3 block text-[13px] transition-colors md:text-[15px] ${
                  i === active ? "text-[#111110]" : "text-[#ADADAA] group-hover:text-[#6B6A67]"
                }`}
              >
                {t.label}
              </span>
            </button>
          ))}
        </div>

        <div className="relative mt-6 flex h-[520px] items-center justify-center overflow-hidden rounded-[24px] bg-[#F5F5F3] p-6 md:p-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              className="flex w-full justify-center"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.45, ease }}
            >
              {TABS[active].visual}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-6 flex justify-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={active}
              className="max-w-xl rounded-full bg-[#111110] px-5 py-2.5 text-center text-[13px] text-white md:text-[14px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {TABS[active].caption}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

/* ─── Sell: three cards ─────────────────────────────────────────────────── */

function SellCards() {
  const cards = [
    {
      lead: "In Gmail.",
      body: "Search a work from the Good Artworks panel and drop its card into the reply you are writing.",
      visual: (
        <div className="pointer-events-none relative h-full w-full">
          <IntegrationsFrame />
        </div>
      ),
    },
    {
      lead: "On WhatsApp.",
      body: "Ask in two words, get the work back, and forward it to the collector from your own phone.",
      visual: (
        <div className="pointer-events-none flex h-full w-full items-center justify-center p-6">
          <WhatsAppShareWorksMock />
        </div>
      ),
    },
    {
      lead: "On their record.",
      body: "What each collector asked and received stays on their record, for the next conversation.",
      visual: (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={CONVERSATIONS} alt="" className="h-full w-full object-cover object-left-top" />
      ),
    },
  ];
  return (
    <section className="border-t border-[#E8E8E6] bg-white px-4 py-24 md:px-6 md:py-32">
      <div className={CONTAINER.replace("px-4 md:px-6", "")}>
        <p className={EYEBROW}>Where it works</p>
        <h2 className={`${H2} mt-5 max-w-3xl`}>
          One inventory. Three useful places.
          <br />
          <span className={H2_GREY}>WhatsApp, email and the collector record.</span>
        </h2>
        <p className={`${BODY} mt-6 max-w-xl`}>
          You keep your inbox and your phone. Good Artworks brings the work into the conversation
          and keeps track of who received what.
        </p>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {cards.map((c) => (
            <div key={c.lead}>
              <div className="relative h-[320px] overflow-hidden rounded-[20px] border border-[#E8E8E6] bg-[#F5F5F3]">
                {c.visual}
              </div>
              <p className="mt-5 text-[15px] leading-[1.55] text-[#6B6A67]">
                <span className="font-medium text-[#111110]">{c.lead}</span> {c.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Trust, on a dark band ─────────────────────────────────────────────── */

function Trust() {
  const items = [
    {
      k: "You send, always",
      v: "Good Artworks prepares. Nothing reaches a collector without a person.",
    },
    { k: "Answers from your records", v: "Prices and availability come only from your inventory." },
    {
      k: "Your usual WhatsApp, untouched",
      v: "Good Artworks only sees what is written to its own numbers.",
    },
    { k: "One gallery, one instance", v: "Your data is never mixed with another gallery’s." },
  ];
  return (
    <section className="bg-[#111110] px-4 py-24 text-white md:px-6 md:py-32">
      <div className="mx-auto grid max-w-6xl gap-14 md:grid-cols-2 md:gap-20">
        <div>
          <p className="text-[14px] font-medium text-white">Trust</p>
          <h2 className="mt-5 font-display text-[34px] font-medium leading-[1.08] tracking-[-0.035em] md:text-[52px]">
            Your collectors stay yours.
            <br />
            <span className="text-[#6B6A67]">Nothing leaves without you.</span>
          </h2>
          <p className="mt-6 max-w-md text-[16px] leading-[1.6] text-[#ADADAA] md:text-[17px]">
            The conversations between a gallery and its collectors are the most sensitive thing it
            has. Good Artworks treats them that way.
          </p>
          <Button size="lg" variant="inverse" onClick={openContact} className="mt-8">
            Book a demo
          </Button>
        </div>
        <ul className="border-t border-white/10">
          {items.map((it) => (
            <li
              key={it.k}
              className="grid gap-1 border-b border-white/10 py-5 md:grid-cols-[1fr_1.3fr] md:gap-6"
            >
              <p className="flex items-center gap-3 text-[16px] text-white">
                <span className="flex h-6 w-6 items-center justify-center rounded-full border border-white/20 text-[11px] text-[#ADADAA]">
                  ✓
                </span>
                {it.k}
              </p>
              <p className="text-[14.5px] leading-[1.55] text-[#ADADAA]">{it.v}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ─── Belief ────────────────────────────────────────────────────────────── */

function Belief() {
  return (
    <section className="bg-white px-4 py-24 md:px-6 md:py-32">
      <motion.p
        className="mx-auto max-w-4xl text-balance text-center font-display text-[30px] font-medium leading-[1.15] tracking-[-0.03em] text-[#111110] md:text-[46px]"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease }}
      >
        “In art and design, the relationship is the business.”
      </motion.p>
    </section>
  );
}

export default function GlideHome() {
  return (
    <>
      <GlideHero />
      <WorksWith />
      <LoopTabs />
      <SellCards />
      <Trust />
      <Belief />
    </>
  );
}
