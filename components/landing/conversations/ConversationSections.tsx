"use client";

import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import {
  ArchiveRestore,
  ArrowRight,
  BotOff,
  Database,
  FileText,
  Forward,
  LockKeyhole,
  Reply,
  Search,
  Send,
  UserRound,
  type LucideIcon,
} from "lucide-react";
import { IntegrationsFrame } from "@/components/SalesAssistantProductPage";
import { WA, WaBubble, WaTyping, type WaMessage } from "@/components/whatsapp/WaChat";

/*
 * The home after the hero: one section per conversation channel, email then
 * WhatsApp. Each is a scene that plays in beats, in step with three numbered
 * steps beside it. Only what the product does today:
 *  - email: the site's real Gmail mockup (`IntegrationsFrame`): search a work
 *    from the Good Artworks panel and insert it into the reply;
 *  - WhatsApp: the assistant number (`src/lib/whatsapp/i18n.ts`, `inventory.ts`).
 */

const ease = [0.16, 1, 0.3, 1] as const;
const EVENING_FIELD = "/artworks/painting-05.jpg";

type Step = { k: string; v: string };
type Who = { name: string; status: string; initials: string };

/** One icon per step, in the order of the steps (same for both languages). */
const EMAIL_STEP_ICONS: LucideIcon[] = [Reply, Search, Send];
const WHATSAPP_STEP_ICONS: LucideIcon[] = [Search, UserRound, Forward];

/** One line of the simulated feed, shaped like a Gallery OS Conversations event. */
export type FeedEvent = {
  /** Index into `feed.kinds`: inquiry waiting, new exchange, reminder, keep in touch. */
  kind: 0 | 1 | 2 | 3;
  channel: "whatsapp" | "gmail" | null;
  who: string;
  initials: string;
  title: string;
  body: string;
  when: string;
};

export type ConversationSectionsCopy = {
  /** Spreadsheet → Good Artworks inventory → Gmail and WhatsApp, and who does the move. */
  migration: {
    eyebrow: string;
    title: string;
    sub: string;
    stages: { k: string; v: string }[];
    columns: [string, string, string, string];
    file: string;
    /** Drop zone label in the empty inventory, and the line while it imports. */
    drop: string;
    importing: string;
    inventory: string;
    imported: string;
    gmail: string;
    whatsapp: string;
    badge: string;
    line: string;
    rows: { artist: string; title: string; price: string; status: string; image: string }[];
    /** Where the data lives once it is moved, and what we promise about it. */
    security: { title: string; items: { k: string; v: string }[] };
  };
  /** The heading of the one section that holds email, WhatsApp and the feed. */
  block: { eyebrow: string; title: string; sub: string };
  feed: {
    eyebrow: string;
    title: string;
    sub: string;
    line: string;
    kinds: { label: string; body: string }[];
    events: FeedEvent[];
  };
  statement: { lines: [string, string]; linked: string; body: string };
  email: { eyebrow: string; title: string; sub: string; steps: Step[]; line: string };
  whatsapp: {
    eyebrow: string;
    title: string;
    sub: string;
    steps: Step[];
    line: string;
    assistant: Who;
    collector: Who;
    ask: WaMessage[];
    /** The one-line status the bot sends right after a card. */
    status: WaMessage;
    before: WaMessage;
    sheetTitle: string;
    sheetSend: string;
    sheetRows: string[];
    after: WaMessage[];
    forward: WaMessage;
  };
};

export const CONVERSATION_SECTIONS_EN: ConversationSectionsCopy = {
  migration: {
    eyebrow: "Migration",
    title: "We move your spreadsheet into Good Artworks.",
    sub: "Then every work is ready in Gmail and WhatsApp.",
    stages: [
      { k: "Your spreadsheet", v: "Excel, Google Sheets or an Artlogic export. As it is." },
      {
        k: "Your Good Artworks inventory",
        v: "Cleaned up and loaded by us: images, prices, statuses.",
      },
      { k: "Gmail and WhatsApp", v: "Find a work and send it where the collector wrote." },
    ],
    columns: ["Artist", "Title", "Price", "Status"],
    file: "inventory.xlsx",
    drop: "Drop your spreadsheet or Artlogic export",
    importing: "Importing",
    inventory: "Good Artworks · Inventory",
    imported: "works imported",
    gmail: "Insert in your reply",
    whatsapp: "Ready to forward",
    badge: "We handle the whole migration",
    line: "About a week, nothing to retype on your side.",
    security: {
      title: "Your data stays yours.",
      items: [
        { k: "Your own space", v: "Each gallery has its own database, never shared elsewhere." },
        { k: "Encrypted", v: "Works and collectors encrypted, in transit and at rest." },
        {
          k: "No AI training",
          v: "No AI model, not even ours, ever learns from your information.",
        },
        {
          k: "Recoverable",
          v: "Delete a collector anytime. Your inventory returned on request.",
        },
      ],
    },
    rows: [
      {
        artist: "Sacha Elron",
        title: "Evening field",
        price: "€10,000",
        status: "Available",
        image: "/artworks/painting-05.jpg",
      },
      {
        artist: "Sacha Elron",
        title: "Blue hour",
        price: "€9,500",
        status: "Sold",
        image: "/artworks/painting-08.jpg",
      },
      {
        artist: "Lina Ores",
        title: "Untitled",
        price: "€4,800",
        status: "Reserved",
        image: "/artworks/painting-03.jpg",
      },
    ],
  },
  block: {
    eyebrow: "Reply",
    title: "Your inventory, in every conversation.",
    sub: "In Gmail and on WhatsApp.",
  },
  feed: {
    eyebrow: "Remember",
    title: "Every exchange, remembered.",
    sub: "The conversation stays with the collector.",
    line: "See the question, your reply and the work you shared in one history.",
    kinds: [
      { label: "Inquiry waiting", body: "A collector asked. No answer yet." },
      { label: "New exchange", body: "A message came in, or a work went out." },
      { label: "Reminder", body: "A follow-up you set is due." },
      { label: "Keep in touch", body: "Too long without news." },
    ],
    events: [
      {
        kind: 3,
        channel: null,
        who: "Camille Fournier",
        initials: "CF",
        title: "Get back in touch with Camille Fournier",
        body: "Last exchange 3 weeks ago.",
        when: "18 Sept",
      },
      {
        kind: 2,
        channel: null,
        who: "Sofía Alvarez",
        initials: "SA",
        title: "Follow up with Sofía Alvarez",
        body: "Reminder you set for Blue hour.",
        when: "22 Sept",
      },
      {
        kind: 0,
        channel: "gmail",
        who: "Thomas Baur",
        initials: "TB",
        title: "Thomas Baur wrote to you about “Self-Portrait”",
        body: "Could you send me the price and dimensions of the Self-Portrait?",
        when: "6 Oct",
      },
      {
        kind: 1,
        channel: "gmail",
        who: "Thomas Baur",
        initials: "TB",
        title: "You sent “Self-Portrait” to Thomas Baur",
        body: "Card sent from your Gmail reply.",
        when: "6 Oct",
      },
      {
        kind: 0,
        channel: "whatsapp",
        who: "Marie Beaumont",
        initials: "MB",
        title: "Marie Beaumont wrote to you about “Evening field”",
        body: "Good evening, is Evening field still available?",
        when: "Today",
      },
      {
        kind: 1,
        channel: "whatsapp",
        who: "Marie Beaumont",
        initials: "MB",
        title: "You forwarded “Evening field” to Marie Beaumont",
        body: "Prepared in Good Artworks, sent from your WhatsApp.",
        when: "Today",
      },
    ],
  },
  statement: {
    lines: ["Your inventory.", "Your CRM."],
    linked: "Linked to",
    body: "Your stock and your collector records live in Good Artworks, linked to the conversations where you sell. Nothing to retype.",
  },
  email: {
    eyebrow: "Gmail",
    title: "In your inbox.",
    sub: "Answer with the work, not a search.",
    steps: [
      { k: "You reply", v: "Write to Marie as you always do, in Gmail." },
      { k: "You search", v: "Open Good Artworks in the draft and type “Elron”." },
      {
        k: "You send",
        v: "The work goes into your reply, with its image and price. You hit send.",
      },
    ],
    line: "Works in Gmail, inside the reply you are writing.",
  },
  whatsapp: {
    eyebrow: "WhatsApp",
    title: "On WhatsApp.",
    sub: "Ask, prepare, forward.",
    steps: [
      {
        k: "You ask",
        v: "Type the artist and a title. The card comes back with its price and availability.",
      },
      { k: "You prepare", v: "Tap “Send to…”, pick Marie. Good Artworks notes it in her history." },
      { k: "You forward", v: "The card, from your own WhatsApp. Good Artworks never sends." },
    ],
    line: "Your usual WhatsApp is never read.",
    assistant: { name: "Good Artworks", status: "assistant", initials: "GA" },
    collector: { name: "Marie Beaumont", status: "online", initials: "MB" },
    ask: [
      { from: "me", time: "10:41", text: "elron evening field" },
      {
        from: "bot",
        time: "10:41",
        image: EVENING_FIELD,
        text: "Sacha Elron\nEvening field, 2023\nAcrylic on canvas\n120 × 120 cm\n€10,000",
      },
    ],
    status: { from: "bot", time: "10:41", text: "Available · ref. SE-2023-04" },
    before: {
      from: "bot",
      time: "10:41",
      text: "Sacha Elron — Evening field\nWho is this for? Naming them adds it to their history and opens their conversation.",
      listButton: "Send to…",
    },
    sheetTitle: "Send to…",
    sheetSend: "Send",
    sheetRows: ["Marie Beaumont", "Thomas Baur", "→ Don’t record"],
    after: [{ from: "bot", time: "10:42", text: "Prepared for Marie Beaumont · recorded" }],
    forward: {
      from: "me",
      time: "10:43",
      forwarded: { label: "Forwarded" },
      image: EVENING_FIELD,
      text: "Sacha Elron\nEvening field, 2023\nAcrylic on canvas\n120 × 120 cm\n€10,000",
    },
  },
};

export const CONVERSATION_SECTIONS_FR: ConversationSectionsCopy = {
  migration: {
    eyebrow: "Migration",
    title: "Nous transférons votre tableur dans Good Artworks.",
    sub: "Ensuite, chaque œuvre est prête dans Gmail et WhatsApp.",
    stages: [
      { k: "Votre tableur", v: "Excel, Google Sheets ou un export Artlogic. Tel quel." },
      {
        k: "Votre inventaire Good Artworks",
        v: "Nettoyé et chargé par nous : images, prix, statuts.",
      },
      {
        k: "Gmail et WhatsApp",
        v: "Retrouvez une œuvre et envoyez-la là où le collectionneur a écrit.",
      },
    ],
    columns: ["Artiste", "Titre", "Prix", "Statut"],
    file: "inventaire.xlsx",
    drop: "Déposez votre tableur ou votre export Artlogic",
    importing: "Import en cours",
    inventory: "Good Artworks · Inventaire",
    imported: "œuvres importées",
    gmail: "À insérer dans votre réponse",
    whatsapp: "Prête à transférer",
    badge: "Nous nous occupons de toute la migration",
    line: "Une semaine environ, rien à ressaisir de votre côté.",
    security: {
      title: "Vos données restent les vôtres.",
      items: [
        {
          k: "Votre espace",
          v: "Chaque galerie a sa propre base, jamais partagée ailleurs.",
        },
        {
          k: "Chiffrées",
          v: "Œuvres et collectionneurs chiffrés, en transit comme au repos.",
        },
        {
          k: "Pas d’entraînement",
          v: "Aucun modèle d’IA, pas même le nôtre, n’apprend dessus.",
        },
        {
          k: "Récupérables",
          v: "Supprimez un collectionneur. Inventaire rendu sur demande.",
        },
      ],
    },
    rows: [
      {
        artist: "Sacha Elron",
        title: "Evening field",
        price: "10 000 €",
        status: "Disponible",
        image: "/artworks/painting-05.jpg",
      },
      {
        artist: "Sacha Elron",
        title: "Blue hour",
        price: "9 500 €",
        status: "Vendue",
        image: "/artworks/painting-08.jpg",
      },
      {
        artist: "Lina Ores",
        title: "Sans titre",
        price: "4 800 €",
        status: "Réservée",
        image: "/artworks/painting-03.jpg",
      },
    ],
  },
  block: {
    eyebrow: "Répondre",
    title: "Votre inventaire, dans chaque conversation.",
    sub: "Dans Gmail et sur WhatsApp.",
  },
  feed: {
    eyebrow: "Se souvenir",
    title: "Chaque échange, mémorisé.",
    sub: "La conversation reste liée au collectionneur.",
    line: "Retrouvez la question, votre réponse et l’œuvre partagée dans un même historique.",
    kinds: [
      { label: "Demande en attente", body: "Un collectionneur a demandé. Pas encore de réponse." },
      { label: "Nouvel échange", body: "Un message est arrivé, ou une œuvre est partie." },
      { label: "Rappel", body: "Une relance que vous avez prévue arrive." },
      { label: "Garder le contact", body: "Trop longtemps sans nouvelles." },
    ],
    events: [
      {
        kind: 3,
        channel: null,
        who: "Camille Fournier",
        initials: "CF",
        title: "Reprendre contact avec Camille Fournier",
        body: "Dernier échange il y a 3 semaines.",
        when: "18 sept.",
      },
      {
        kind: 2,
        channel: null,
        who: "Sofía Alvarez",
        initials: "SA",
        title: "Relancer Sofía Alvarez",
        body: "Rappel que vous avez prévu pour Blue hour.",
        when: "22 sept.",
      },
      {
        kind: 0,
        channel: "gmail",
        who: "Thomas Baur",
        initials: "TB",
        title: "Thomas Baur vous a écrit au sujet de « Self-Portrait »",
        body: "Pourriez-vous m’envoyer le prix et les dimensions du Self-Portrait ?",
        when: "6 oct.",
      },
      {
        kind: 1,
        channel: "gmail",
        who: "Thomas Baur",
        initials: "TB",
        title: "Vous avez envoyé « Self-Portrait » à Thomas Baur",
        body: "Fiche envoyée depuis votre réponse Gmail.",
        when: "6 oct.",
      },
      {
        kind: 0,
        channel: "whatsapp",
        who: "Marie Beaumont",
        initials: "MB",
        title: "Marie Beaumont vous a écrit au sujet d’« Evening field »",
        body: "Bonsoir, Evening field est-il toujours disponible ?",
        when: "Aujourd’hui",
      },
      {
        kind: 1,
        channel: "whatsapp",
        who: "Marie Beaumont",
        initials: "MB",
        title: "Vous avez transféré « Evening field » à Marie Beaumont",
        body: "Préparée dans Good Artworks, envoyée depuis votre WhatsApp.",
        when: "Aujourd’hui",
      },
    ],
  },
  statement: {
    lines: ["Votre inventaire.", "Votre CRM."],
    linked: "Relié à",
    body: "Votre stock et vos fiches collectionneurs vivent dans Good Artworks, reliés aux conversations où vous vendez. Rien à ressaisir.",
  },
  email: {
    eyebrow: "Gmail",
    title: "Dans votre boîte mail.",
    sub: "Répondez avec l’œuvre, pas avec une recherche.",
    steps: [
      { k: "Vous répondez", v: "Écrivez à Marie comme d’habitude, dans Gmail." },
      { k: "Vous cherchez", v: "Ouvrez Good Artworks dans le brouillon et tapez « Elron »." },
      {
        k: "Vous envoyez",
        v: "L’œuvre entre dans votre réponse, avec son image et son prix. C’est vous qui envoyez.",
      },
    ],
    line: "Fonctionne dans Gmail, dans la réponse que vous écrivez.",
  },
  whatsapp: {
    eyebrow: "WhatsApp",
    title: "Sur WhatsApp.",
    sub: "Demander, préparer, transférer.",
    steps: [
      {
        k: "Vous demandez",
        v: "Tapez l’artiste et un titre. La fiche revient avec son prix et sa disponibilité.",
      },
      {
        k: "Vous préparez",
        v: "Touchez « Envoyer à… », choisissez Marie. Good Artworks le note dans son historique.",
      },
      {
        k: "Vous transférez",
        v: "La fiche, depuis votre propre WhatsApp. Good Artworks n’envoie rien.",
      },
    ],
    line: "Votre WhatsApp habituel n’est jamais lu.",
    assistant: { name: "Good Artworks", status: "assistant", initials: "GA" },
    collector: { name: "Marie Beaumont", status: "en ligne", initials: "MB" },
    ask: [
      { from: "me", time: "10:41", text: "elron evening field" },
      {
        from: "bot",
        time: "10:41",
        image: EVENING_FIELD,
        text: "Sacha Elron\nEvening field, 2023\nAcrylique sur toile\n120 × 120 cm\n10 000 €",
      },
    ],
    status: { from: "bot", time: "10:41", text: "Disponible · réf. SE-2023-04" },
    before: {
      from: "bot",
      time: "10:41",
      text: "Sacha Elron — Evening field\nPour qui ? Le nommer l’ajoute à son historique et ouvre sa conversation.",
      listButton: "Envoyer à…",
    },
    sheetTitle: "Envoyer à…",
    sheetSend: "Envoyer",
    sheetRows: ["Marie Beaumont", "Thomas Baur", "→ Ne pas noter"],
    after: [{ from: "bot", time: "10:42", text: "Préparée pour Marie Beaumont · noté" }],
    forward: {
      from: "me",
      time: "10:43",
      forwarded: { label: "Transféré" },
      image: EVENING_FIELD,
      text: "Sacha Elron\nEvening field, 2023\nAcrylique sur toile\n120 × 120 cm\n10 000 €",
    },
  },
};

/* ─── Shared pieces ─────────────────────────────────────────────────────── */

const AIRY = "px-4 py-24 md:px-6 md:py-36";
const TITLE =
  "mx-auto max-w-3xl text-balance text-center font-display text-[26px] font-medium leading-[1.1] tracking-[-0.03em] text-[#111110] md:text-[36px]";
const SUB =
  "mx-auto mt-2 max-w-3xl text-balance text-center font-display text-[26px] font-medium leading-[1.1] tracking-[-0.03em] text-[#ADADAA] md:text-[36px]";
const KICKER = "mb-5 text-center text-[13px] tracking-[-0.01em] text-[#6B6A67]";

const pop = {
  initial: { opacity: 0, y: 10, scale: 0.97 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0 },
};

/** Centered kicker, title and grey subtitle: the heading every home section uses. */
export function Heading({
  eyebrow,
  title,
  sub,
  dark = false,
}: {
  eyebrow: string;
  title: string;
  sub: string;
  /** White title, softer greys: for a section on black. */
  dark?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease }}
    >
      <p className={dark ? KICKER.replace("text-[#6B6A67]", "text-[#ADADAA]") : KICKER}>
        {eyebrow}
      </p>
      <h2 className={dark ? TITLE.replace("text-[#111110]", "text-white") : TITLE}>{title}</h2>
      <p className={dark ? SUB.replace("text-[#ADADAA]", "text-[#8F8E8A]") : SUB}>{sub}</p>
    </motion.div>
  );
}

/** A row's own heading, left-aligned above its steps, inside the shared section. */
function RowHeading({
  eyebrow,
  title,
  sub,
  logo,
}: {
  eyebrow: string;
  title: string;
  sub: string;
  /** Channel logo shown before the eyebrow. */
  logo?: string;
}) {
  return (
    <div className="mb-4 pl-3">
      <p className="flex items-center gap-1.5 text-[13px] text-[#6B6A67]">
        {logo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={logo} alt="" className="h-4 w-4 object-contain" />
        ) : null}
        {eyebrow}
      </p>
      <h3 className="mt-1.5 font-display text-[22px] font-medium leading-[1.15] tracking-[-0.025em] text-[#111110] md:text-[26px]">
        {title}
      </h3>
      <p className="mt-0.5 font-display text-[17px] leading-[1.25] tracking-[-0.02em] text-[#ADADAA] md:text-[19px]">
        {sub}
      </p>
    </div>
  );
}

/**
 * Plays a scene in beats while it is on screen, looping. `durations` is how
 * long each beat holds; `stepOf` maps a beat to the step lit beside it.
 * Without motion, the scene rests on its last beat.
 */
function useBeats(durations: number[]) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.45 });
  const [beat, setBeat] = useState(0);

  useEffect(() => {
    if (reduce || !inView) return;
    const t = window.setTimeout(() => setBeat((b) => (b + 1) % durations.length), durations[beat]);
    return () => window.clearTimeout(t);
  }, [beat, inView, reduce, durations]);

  return { ref, beat: reduce ? durations.length - 1 : beat, setBeat };
}

/** The three steps beside a scene: the current one lit, each one clickable. */
function Steps({
  steps,
  icons,
  active,
  onPick,
  line,
}: {
  steps: Step[];
  icons: LucideIcon[];
  active: number;
  /** Without it, the steps only follow the scene. */
  onPick?: (i: number) => void;
  line: string;
}) {
  return (
    <div>
      <ol className="flex flex-col gap-1">
        {steps.map((s, i) => {
          const on = i === active;
          const Icon = icons[i];
          return (
            <li key={s.k}>
              <button
                type="button"
                onClick={onPick ? () => onPick(i) : undefined}
                disabled={!onPick}
                aria-current={on}
                className={`flex w-full gap-3.5 rounded-[12px] px-3 py-2.5 text-left transition-colors duration-300 ${
                  on ? "bg-[#F5F5F3]" : onPick ? "hover:bg-[#FAFAF8]" : ""
                }`}
              >
                <span
                  className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${
                    on ? "bg-[#111110] text-white" : "border border-[#E8E8E6] text-[#6B6A67]"
                  }`}
                >
                  <Icon className="h-[14px] w-[14px]" strokeWidth={1.75} aria-hidden="true" />
                </span>
                <span>
                  <span
                    className={`block font-display text-[17px] tracking-[-0.02em] transition-colors duration-300 ${
                      on ? "text-[#111110]" : "text-[#ADADAA]"
                    }`}
                  >
                    {s.k}
                  </span>
                  <span
                    className={`mt-0.5 block text-[14px] leading-[1.5] transition-colors duration-300 ${
                      on ? "text-[#6B6A67]" : "text-[#ADADAA]"
                    }`}
                  >
                    {s.v}
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>
      <p className="mt-5 pl-3 font-display text-[16px] tracking-[-0.015em] text-[#111110]">
        {line}
      </p>
    </div>
  );
}

/**
 * Phones: only the current step, right under the scene, as a caption that
 * changes with it. Dots show where the loop is and jump to a step.
 */
function StepCaption({
  steps,
  icons,
  active,
  onPick,
  line,
}: {
  steps: Step[];
  icons: LucideIcon[];
  active: number;
  onPick?: (i: number) => void;
  line: string;
}) {
  const s = steps[active];
  const Icon = icons[active];
  return (
    <div className="px-3">
      <div className="flex items-center gap-1">
        {steps.map((step, i) => (
          <button
            key={step.k}
            type="button"
            aria-label={step.k}
            aria-current={i === active}
            onClick={onPick ? () => onPick(i) : undefined}
            disabled={!onPick}
            className="py-2 pr-1"
          >
            <span
              className={`block h-1.5 rounded-full transition-all duration-300 ${
                i === active ? "w-5 bg-[#111110]" : "w-1.5 bg-[#DCDCD8]"
              }`}
            />
          </button>
        ))}
      </div>
      <div className="mt-1 min-h-[76px]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25, ease }}
          >
            <p className="flex items-center gap-2 font-display text-[17px] tracking-[-0.02em] text-[#111110]">
              <Icon className="h-4 w-4 shrink-0" strokeWidth={1.75} aria-hidden="true" />
              {s.k}
            </p>
            <p className="mt-0.5 text-[14px] leading-[1.5] text-[#6B6A67]">{s.v}</p>
          </motion.div>
        </AnimatePresence>
      </div>
      <p className="mt-3 text-[13px] leading-[1.45] text-[#ADADAA]">{line}</p>
    </div>
  );
}

/* ─── Email: the Gmail add-in ───────────────────────────────────────────── */

function EmailSection({ c, lang }: { c: ConversationSectionsCopy["email"]; lang: "en" | "fr" }) {
  // The real Gmail mockup plays its own loop; the steps follow its phases.
  const [phase, setPhase] = useState<0 | 1 | 2>(0);
  // Phones: heading, scene, caption. Desktop: scene left, heading and steps right.
  return (
    <div className="mx-auto grid max-w-6xl gap-5 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:grid-rows-[1fr_auto_1fr] lg:gap-x-16 lg:gap-y-0">
      <div className="lg:col-start-2 lg:row-start-1 lg:self-end">
        <RowHeading
          eyebrow={c.eyebrow}
          title={c.title}
          sub={c.sub}
          logo="/logos/icon-gmail-96.png"
        />
      </div>
      <div className="pointer-events-none relative h-[340px] overflow-hidden rounded-[20px] border border-[#E8E8E6] bg-white md:h-[460px] lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:self-center">
        <IntegrationsFrame onPhase={setPhase} lang={lang} />
      </div>
      <div className="lg:col-start-2 lg:row-start-2">
        <div className="lg:hidden">
          <StepCaption steps={c.steps} icons={EMAIL_STEP_ICONS} active={phase} line={c.line} />
        </div>
        <div className="hidden lg:block">
          <Steps steps={c.steps} icons={EMAIL_STEP_ICONS} active={phase} line={c.line} />
        </div>
      </div>
    </div>
  );
}

/* ─── WhatsApp: the assistant number ────────────────────────────────────── */

/** WhatsApp's chat header: back arrow, avatar, name and status. */
function ChatHeader({ who }: { who: Who }) {
  return (
    <div
      className="flex items-center gap-2 border-b border-[#E8E8E6] px-5 pb-3 pt-1"
      style={{ color: WA.ink }}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M15 5l-7 7 7 7"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#DFE5E7] text-[13px] font-medium text-[#54656F]">
        {who.initials}
      </span>
      <div className="min-w-0 leading-tight">
        <p className="truncate text-[15px] font-medium">{who.name}</p>
        <p className="truncate text-[12px]" style={{ color: WA.muted }}>
          {who.status}
        </p>
      </div>
    </div>
  );
}

/** WhatsApp's composer, at rest. */
function ChatComposer({ typed = "" }: { typed?: string }) {
  return (
    <div className="flex items-center gap-2 px-4 pb-6 pt-1">
      <div
        className="min-h-[40px] flex-1 truncate rounded-full bg-white px-4 py-2.5 text-[14px]"
        style={{ color: typed ? WA.ink : WA.muted }}
      >
        {typed ? (
          <>
            {typed}
            <span className="ml-px inline-block h-[15px] w-px translate-y-[3px] bg-[#111B21]" />
          </>
        ) : (
          "Message"
        )}
      </div>
      <span
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
        style={{ background: WA.green }}
      >
        {typed ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="white" aria-hidden="true">
            <path d="M3.4 20.4 21 12 3.4 3.6 3.4 10l12.6 2-12.6 2z" />
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M12 15a3 3 0 0 0 3-3V6a3 3 0 1 0-6 0v6a3 3 0 0 0 3 3Zm6-3a6 6 0 0 1-12 0m6 6v3"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        )}
      </span>
    </div>
  );
}

/** WhatsApp's list sheet, as it opens under "Send to…". `picked` ticks the first row. */
function SendToSheet({
  title,
  rows,
  send,
  picked,
}: {
  title: string;
  rows: string[];
  send: string;
  picked: boolean;
}) {
  return (
    <div
      className="overflow-hidden rounded-t-[16px] bg-white shadow-[0_-4px_20px_rgba(11,20,26,0.10)]"
      style={{ color: WA.ink }}
    >
      <div className="mx-auto mt-2 h-1 w-9 rounded-full bg-[#D1D7DB]" />
      <div className="relative py-3 text-center text-[15px] font-medium">
        <span
          className="absolute left-4 top-1/2 -translate-y-1/2 text-[18px] leading-none"
          style={{ color: WA.muted }}
        >
          ×
        </span>
        {title}
      </div>
      <ul className="px-4">
        {rows.map((label, i) => {
          const on = picked && i === 0;
          return (
            <li
              key={label}
              className="flex items-center justify-between border-t border-[#E9EDEF] py-3 text-[14.5px]"
            >
              {label}
              <span
                className="flex h-[20px] w-[20px] items-center justify-center rounded-full border-2 transition-colors duration-300"
                style={{ borderColor: on ? WA.green : "#8696A0" }}
              >
                <motion.span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ background: WA.green }}
                  initial={false}
                  animate={{ scale: on ? 1 : 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 28 }}
                />
              </span>
            </li>
          );
        })}
      </ul>
      <div className="flex justify-end px-4 pb-4 pt-2">
        <motion.span
          className="flex h-11 w-11 items-center justify-center rounded-full"
          style={{ background: WA.green }}
          aria-label={send}
          initial={false}
          animate={{ opacity: picked ? 1 : 0.4, scale: picked ? 1 : 0.9 }}
          transition={{ duration: 0.3 }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="white" aria-hidden="true">
            <path d="M3.4 20.4 21 12 3.4 3.6 3.4 10l12.6 2-12.6 2z" />
          </svg>
        </motion.span>
      </div>
    </div>
  );
}

/*
 *  0  the question is typed in the composer      step 1, You ask
 *  1  sent; the assistant "types"                │
 *  2  the card comes back                        ┘
 *  3  "Who is this for?" + Send to…              ┐ step 2, You prepare
 *  4  the sheet opens                            │
 *  5  Marie is ticked                            │
 *  6  "Prepared … · recorded"                    ┘
 *  7  Marie's chat, the card forwarded           step 3, You forward
 */
const WA_BEATS = [2300, 1900, 2300, 1700, 1300, 1600, 2400, 3600];
const WA_STEP_OF_BEAT = [0, 0, 0, 1, 1, 1, 1, 2];
const WA_FIRST_BEAT = [0, 3, 7];

function WhatsAppScene({ c, beat }: { c: ConversationSectionsCopy["whatsapp"]; beat: number }) {
  const inMarie = beat === 7;
  // Beat 0: the question is typed letter by letter in the composer, then sent.
  const question = c.ask[0].text ?? "";
  const [typedCount, setTypedCount] = useState(0);
  useEffect(() => {
    if (beat !== 0) {
      setTypedCount(0);
      return;
    }
    setTypedCount(0);
    const t = window.setInterval(() => setTypedCount((n) => Math.min(n + 1, question.length)), 80);
    return () => window.clearInterval(t);
  }, [beat, question]);
  const who = inMarie ? c.collector : c.assistant;
  // The assistant thread, in the order it builds up.
  const thread: { key: string; m: WaMessage; from: number; tail: boolean }[] = [
    { key: "ask", m: c.ask[0], from: 1, tail: true },
    { key: "card", m: c.ask[1], from: 2, tail: true },
    { key: "status", m: c.status, from: 2, tail: false },
    { key: "before", m: c.before, from: 3, tail: false },
    ...c.after.map((m, i) => ({ key: `after-${i}`, m, from: 6, tail: false })),
  ];

  return (
    <div className="relative mx-auto flex h-[480px] w-full max-w-[340px] flex-col md:h-[640px] overflow-hidden rounded-[56px] border-[0.5px] border-[#E8E8E6] bg-[#F5F5F3] pt-[58px]">
      {/* The island, like the home's other phone. */}
      <div className="absolute left-1/2 top-4 z-10 h-[28px] w-[116px] -translate-x-1/2 rounded-full bg-[#E8E8E6]" />
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={who.name}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <ChatHeader who={who} />
        </motion.div>
      </AnimatePresence>

      <AnimatePresence mode="wait" initial={false}>
        {inMarie ? (
          <motion.div
            key="marie"
            className="flex flex-1 flex-col justify-end gap-[3px] px-[18px] py-3"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease }}
          >
            <motion.div {...pop} transition={{ duration: 0.35, ease, delay: 0.6 }}>
              <WaBubble m={c.forward} />
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="assistant"
            className="flex flex-1 flex-col justify-end gap-[3px] overflow-hidden px-[18px] py-3"
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.4, ease }}
          >
            <AnimatePresence initial={false}>
              {thread
                .filter((t) => beat >= t.from)
                .map((t) => (
                  <motion.div key={t.key} layout {...pop} transition={{ duration: 0.35, ease }}>
                    <WaBubble m={t.m} tail={t.tail} />
                  </motion.div>
                ))}
              {beat === 1 ? (
                <motion.div
                  key="typing"
                  layout
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0, transition: { delay: 0.5, duration: 0.3, ease } }}
                  exit={{ opacity: 0, transition: { duration: 0.2 } }}
                >
                  <WaTyping />
                </motion.div>
              ) : null}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      <ChatComposer typed={question.slice(0, typedCount)} />

      {/* The list sheet rises over the chat, like WhatsApp's bottom sheet. */}
      <AnimatePresence>
        {beat === 4 || beat === 5 ? (
          <motion.div
            key="sheet"
            className="absolute inset-0 flex flex-col justify-end bg-black/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.45, ease }}
            >
              <SendToSheet
                title={c.sheetTitle}
                rows={c.sheetRows}
                send={c.sheetSend}
                picked={beat === 5}
              />
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function WhatsAppSection({ c }: { c: ConversationSectionsCopy["whatsapp"] }) {
  const { ref, beat, setBeat } = useBeats(WA_BEATS);
  return (
    // Phones: heading, phone, caption. Desktop: heading and steps left, phone right.
    <div
      ref={ref}
      className="mx-auto grid max-w-6xl gap-5 md:grid-cols-2 md:grid-rows-[1fr_auto_1fr] md:gap-x-20 md:gap-y-0"
    >
      <div className="max-w-lg md:col-start-1 md:row-start-1 md:self-end">
        <RowHeading eyebrow={c.eyebrow} title={c.title} sub={c.sub} logo="/logos/whatsapp.svg" />
      </div>
      <div className="md:col-start-2 md:row-span-3 md:row-start-1 md:self-center">
        <WhatsAppScene c={c} beat={beat} />
      </div>
      <div className="max-w-lg md:col-start-1 md:row-start-2">
        <div className="md:hidden">
          <StepCaption
            steps={c.steps}
            icons={WHATSAPP_STEP_ICONS}
            active={WA_STEP_OF_BEAT[beat]}
            onPick={(i) => setBeat(WA_FIRST_BEAT[i])}
            line={c.line}
          />
        </div>
        <div className="hidden md:block">
          <Steps
            steps={c.steps}
            icons={WHATSAPP_STEP_ICONS}
            active={WA_STEP_OF_BEAT[beat]}
            onPick={(i) => setBeat(WA_FIRST_BEAT[i])}
            line={c.line}
          />
        </div>
      </div>
    </div>
  );
}

/* ─── Feed: the exchanges, as Gallery OS keeps them (simulated) ─────────── */

/** The app's own pill colours, in the order of `feed.kinds`. */
const KIND_TONES = [
  "bg-rose-50 text-rose-700",
  "bg-blue-50 text-blue-700",
  "bg-amber-50 text-amber-700",
  "bg-violet-50 text-violet-700",
];
const CHANNEL_LOGO = { whatsapp: "/logos/whatsapp.svg", gmail: "/logos/icon-gmail-96.png" };

/** One vertical piece of the feed's thread; it fades in just after a new exchange lands. */
function ThreadPiece({ className }: { className: string }) {
  return (
    <motion.span
      aria-hidden="true"
      className={`absolute left-[15px] w-px bg-[#E1E1DE] md:left-[19px] ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.3 }}
    />
  );
}

function FeedRow({
  e,
  kinds,
  isFrench,
  answered,
  linked,
  up,
}: {
  e: FeedEvent;
  kinds: { label: string }[];
  isFrench: boolean;
  answered: boolean;
  /** An older exchange sits below: the thread line runs down to it. */
  linked: boolean;
  /** A newer exchange sits above: the thread line arrives from it. */
  up: boolean;
}) {
  const isArtwork = e.kind === 1 && e.title.toLowerCase().includes("self-portrait");
  return (
    <div className="relative pl-10 md:pl-12">
      {/* The thread: the pieces above and below the icon meet the neighbours' pieces. */}
      {up ? <ThreadPiece className="top-0 h-9" /> : null}
      {linked ? <ThreadPiece className="top-9 bottom-0" /> : null}
      <span
        className={`absolute left-0 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full border-[0.4px] border-[#C9C9C5] md:left-1 ${
          e.channel ? "bg-white" : "bg-[#2F80ED] text-white"
        }`}
      >
        {e.channel ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={CHANNEL_LOGO[e.channel]} alt="" className="h-6 w-6 object-contain" />
        ) : (
          <FileText size={15} strokeWidth={1.8} aria-hidden="true" />
        )}
      </span>

      <div className="rounded-[15px] border border-[#DEDEDB] bg-white px-3.5 py-3 md:px-4 md:py-3.5">
        <div className="flex gap-3">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#E8FAF5] text-[11px] font-medium text-[#147D68]">
            {e.initials}
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[13px] font-medium leading-[1.35] tracking-[-0.01em] text-[#111110] md:text-[13.5px]">
              {e.title}
            </p>
            <p className="mt-1 border-l-2 border-[#E4E4E1] pl-2.5 text-[12px] leading-[1.4] text-[#71717A] md:text-[12.5px]">
              {e.body}
            </p>
            <div className="mt-2.5 flex flex-wrap items-center gap-2">
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${answered ? "bg-emerald-50 text-emerald-700" : KIND_TONES[e.kind]}`}
              >
                {answered ? (isFrench ? "Réponse envoyée" : "Reply sent") : kinds[e.kind].label}
              </span>
            </div>

            {isArtwork ? (
              <div className="mt-3 flex max-w-[280px] items-center gap-2.5 rounded-lg bg-[#FAFAF9] p-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/artworks/van-gogh-self-portrait.jpg"
                  alt=""
                  className="h-11 w-16 rounded-md object-cover"
                />
                <span className="min-w-0">
                  <span className="block text-[11px] text-[#71717A]">Vincent van Gogh</span>
                  <span className="block truncate text-[13px] font-medium italic text-[#111110]">
                    Self-Portrait
                  </span>
                  <span className="mt-0.5 flex items-center gap-1.5 text-[11px] text-emerald-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Available
                  </span>
                </span>
              </div>
            ) : null}
          </div>
          <ArrowRight size={16} className="mt-1 shrink-0 text-[#D4D4D1]" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}

function feedDayLabel(when: string, isFrench: boolean) {
  const labels: Record<string, [string, string]> = {
    Today: ["Today", "Aujourd’hui"],
    "Aujourd’hui": ["Today", "Aujourd’hui"],
    "6 Oct": ["Tuesday 6 October", "Mardi 6 octobre"],
    "6 oct.": ["Tuesday 6 October", "Mardi 6 octobre"],
    "22 Sept": ["Tuesday 22 September", "Mardi 22 septembre"],
    "22 sept.": ["Tuesday 22 September", "Mardi 22 septembre"],
    "18 Sept": ["Friday 18 September", "Vendredi 18 septembre"],
    "18 sept.": ["Friday 18 September", "Vendredi 18 septembre"],
  };
  return labels[when]?.[isFrench ? 1 : 0] ?? when;
}

/**
 * The collector memory as a still list: every event of the home's feed, newest
 * first, joined by the thread. Used where the page needs the history at rest.
 */
export function MemoryFeed({ c }: { c: ConversationSectionsCopy["feed"] }) {
  const shown = [...c.events].reverse();
  const isFrench = c.eyebrow === "Se souvenir";
  return (
    <div className="py-2">
      <p className="mb-4 text-[13px] font-medium text-[#71717A] md:pl-2">
        {isFrench ? "Activité récente" : "Recent activity"}
      </p>
      <ul className="flex flex-col">
        {shown.map((e, index) => (
          <li key={`${e.who}-${e.title}`} className="relative">
            {index > 0 ? (
              <div className="relative h-3">
                <ThreadPiece className="top-0 h-full" />
              </div>
            ) : null}
            {index === 0 || shown[index - 1]?.when !== e.when ? (
              <div className="relative pb-2.5">
                {index > 0 ? <ThreadPiece className="top-0 h-full" /> : null}
                <p className="pl-10 text-[11px] font-medium text-[#A1A1AA] md:pl-12 md:text-[12px]">
                  {feedDayLabel(e.when, isFrench)}
                </p>
              </div>
            ) : null}
            <FeedRow
              e={e}
              kinds={c.kinds}
              isFrench={isFrench}
              answered={
                e.kind === 0 && shown.some((other) => other.kind === 1 && other.who === e.who)
              }
              linked={index < shown.length - 1}
              up={index > 0}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

function FeedSection({ c }: { c: ConversationSectionsCopy["feed"] }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  // Starts as soon as the list comes into view, not once it is mostly on screen.
  const inView = useInView(ref, { amount: 0.1 });
  const total = c.events.length;
  // One notification first; each new one pops in on top and links to the
  // thread below, until the history is full. Then it starts over.
  const [n, setN] = useState(1);
  // Each loop is its own list: the whole history fades out at once, then
  // the next loop starts from a single notification (no overlapping exits).
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    if (reduce) {
      setN(total);
      return;
    }
    if (!inView) return;
    const t = window.setTimeout(
      () => {
        if (n >= total) {
          setCycle((k) => k + 1);
          setN(1);
        } else {
          setN(n + 1);
        }
      },
      n >= total ? 4500 : 1300
    );
    return () => window.clearTimeout(t);
  }, [n, inView, reduce, total]);

  const shown = c.events.slice(0, n).reverse();
  const isFrench = c.eyebrow === "Se souvenir";

  // The panel's height follows the list: it grows as notifications arrive.
  const listRef = useRef<HTMLDivElement>(null);
  const [listH, setListH] = useState<number | "auto">("auto");
  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setListH(el.offsetHeight));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return (
    <section id="memory" className="scroll-mt-16 bg-white px-4 py-16 md:px-6 md:py-20">
      <Heading eyebrow={c.eyebrow} title={c.title} sub={c.sub} />
      <p className="mx-auto mt-6 max-w-2xl text-center font-display text-[16px] leading-[1.5] tracking-[-0.015em] text-[#6B6A67] md:text-[18px]">
        {c.line}
      </p>
      <motion.div
        ref={ref}
        className="relative mx-auto mt-14 max-w-4xl overflow-hidden bg-white md:mt-20"
        animate={{ height: listH }}
        transition={{ type: "spring", stiffness: 260, damping: 32 }}
      >
        <div ref={listRef} className="py-2">
          <p className="mb-4 text-[13px] font-medium text-[#71717A] md:pl-2">
            {isFrench ? "Activité récente" : "Recent activity"}
          </p>
          <AnimatePresence mode="wait" initial={false}>
            <motion.ul
              key={cycle}
              className="flex flex-col"
              exit={{ opacity: 0, transition: { duration: 0.35 } }}
            >
              <AnimatePresence initial={cycle > 0}>
                {shown.map((e, index) => (
                  <motion.li
                    key={`${e.who}-${e.title}`}
                    layout="position"
                    initial={reduce ? false : { opacity: 0, y: -14, scale: 0.92 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={reduce ? undefined : { opacity: 0, transition: { duration: 0.2 } }}
                    transition={{
                      layout: { type: "spring", stiffness: 260, damping: 30 },
                      default: { type: "spring", stiffness: 380, damping: 24 },
                    }}
                    style={{ transformOrigin: "50% 0%" }}
                    className="relative"
                  >
                    {index > 0 ? (
                      <>
                        {/* The gap between two exchanges, crossed by the thread. */}
                        <div className="relative h-3">
                          <ThreadPiece className="top-0 h-full" />
                        </div>
                      </>
                    ) : null}
                    {index === 0 || shown[index - 1]?.when !== e.when ? (
                      <div className="relative pb-2.5">
                        {index > 0 ? <ThreadPiece className="top-0 h-full" /> : null}
                        <p className="pl-10 text-[11px] font-medium text-[#A1A1AA] md:pl-12 md:text-[12px]">
                          {feedDayLabel(e.when, isFrench)}
                        </p>
                      </div>
                    ) : null}
                    <FeedRow
                      e={e}
                      kinds={c.kinds}
                      isFrench={isFrench}
                      answered={
                        e.kind === 0 &&
                        shown.some((other) => other.kind === 1 && other.who === e.who)
                      }
                      linked={index < shown.length - 1}
                      up={index > 0}
                    />
                  </motion.li>
                ))}
              </AnimatePresence>
            </motion.ul>
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
}

/* ─── Statement: one inventory, one CRM, every channel ──────────────────── */

const CHANNELS = [
  { name: "WhatsApp", color: "#00A884" },
  { name: "Gmail", color: "#EA4335" },
  { name: "Outlook", color: "#2B88D8" },
];

/** The closing statement; `action` (the final buttons) sits under it when it opens the footer. */
export function StatementSection({
  c,
  action,
}: {
  c: ConversationSectionsCopy["statement"];
  action?: ReactNode;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const [i, setI] = useState(0);

  useEffect(() => {
    if (reduce || !inView) return;
    const t = window.setInterval(() => setI((x) => (x + 1) % CHANNELS.length), 2400);
    return () => window.clearInterval(t);
  }, [inView, reduce]);

  const channel = CHANNELS[i];
  return (
    <section className="flex flex-1 flex-col justify-center bg-[#111110] px-4 py-16 text-white md:px-6 md:py-8">
      <div ref={ref} className="mx-auto w-full max-w-6xl">
        <h2 className="font-display text-[40px] font-medium leading-[1.04] tracking-[-0.045em] md:text-[60px] lg:text-[64px]">
          {c.lines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
          <span className="block">
            <motion.span
              className="inline-block"
              animate={{ color: channel.color }}
              transition={{ duration: 0.5 }}
            >
              {c.linked}
            </motion.span>{" "}
            {/* The channel rolls in from below, in its own colour. */}
            <span className="relative inline-flex overflow-hidden pb-[0.12em] align-top">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={channel.name}
                  className="inline-block"
                  style={{ color: channel.color }}
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: "-100%", opacity: 0 }}
                  transition={{ duration: 0.5, ease }}
                >
                  {channel.name}.
                </motion.span>
              </AnimatePresence>
            </span>
          </span>
        </h2>
        <p className="mt-6 max-w-xl text-[16px] leading-[1.55] text-[#ADADAA] md:mt-8 md:text-[18px]">
          {c.body}
        </p>
        {action ? <div className="mt-8 md:mt-10">{action}</div> : null}
      </div>
    </section>
  );
}

/* ─── Migration: the spreadsheet dropped into the Gallery OS artworks ───── */

/** The works as Gallery OS lists them once imported (demo gallery). */
const SCREEN_ROWS = [
  {
    title: "Evening field",
    artist: "Sacha Elron",
    year: "2023",
    price: "10 000 €",
    status: "Available",
    image: "/artworks/painting-05.jpg",
  },
  {
    title: "Blue hour",
    artist: "Sacha Elron",
    year: "2022",
    price: "9 500 €",
    status: "Sold",
    image: "/artworks/painting-08.jpg",
  },
  {
    title: "Self-Portrait",
    artist: "Vincent van Gogh",
    year: "1887",
    price: "85 000 €",
    status: "Available",
    image: "/artworks/van-gogh-self-portrait.jpg",
  },
  {
    title: "Untitled",
    artist: "Lina Ores",
    year: "2025",
    price: "4 800 €",
    status: "Reserved",
    image: "/artworks/painting-03.jpg",
  },
  {
    title: "Sunflowers",
    artist: "Vincent van Gogh",
    year: "1888",
    price: "92 000 €",
    status: "Available",
    image: "/artworks/van-gogh-sunflowers.jpg",
  },
  {
    title: "Low tide",
    artist: "Mara Velt",
    year: "2021",
    price: "6 200 €",
    status: "Available",
    image: "/artworks/painting-10.jpg",
  },
  {
    title: "Study in ochre",
    artist: "Lina Ores",
    year: "2024",
    price: "3 900 €",
    status: "Available",
    image: "/artworks/painting-07.jpg",
  },
  {
    title: "Night garden",
    artist: "Sacha Elron",
    year: "2021",
    price: "14 500 €",
    status: "Sold",
    image: "/artworks/painting-04.jpg",
  },
  {
    title: "Interior, morning",
    artist: "Mara Velt",
    year: "2023",
    price: "7 800 €",
    status: "Available",
    image: "/artworks/painting-02.png",
  },
  {
    title: "Field notes",
    artist: "Lina Ores",
    year: "2022",
    price: "2 600 €",
    status: "Reserved",
    image: "/artworks/painting-01.png",
  },
];
const STATUS_PILL: Record<string, string> = {
  Available: "border-emerald-200 bg-emerald-50 text-emerald-700",
  Sold: "border-[#E8E8E6] bg-[#F5F5F3] text-[#6B6A67]",
  Reserved: "border-amber-200 bg-amber-50 text-amber-700",
};
const FILTERS = [
  "Available",
  "Reserved",
  "Sold",
  "Consignment",
  "On loan",
  "Not for sale",
  "Withdrawn",
];

/** Icons for the data promises, in the order of `security.items`. */
const SECURITY_ICONS = [Database, LockKeyhole, BotOff, ArchiveRestore];

/*
 * The real onboarding first (OnboardingWizard, step "Inventory"), then the
 * Artworks screen it leads to:
 *  0  Connect your inventory: the three ways in
 *  1  "Import a file" is picked
 *  2  the file step, its drop zone waiting
 *  3  inventory.xlsx is dragged in
 *  4  dropped: the import bar fills
 *  5… the Artworks screen, works appearing row by row, then hold
 */
const MIGRATION_TIMES = [1500, 900, 800, 1500, 1300];
const MIGRATION_ROW_MS = 550;
const MIGRATION_HOLD_MS = 4200;
/** While the screen holds, the rest of the inventory keeps coming in: the counters climb to here. */
const IMPORT_TOTAL = 248;
const ARTWORKS_FROM = 5;

function FileChip({ name }: { name: string }) {
  return (
    <span className="flex items-center gap-2 rounded-[10px] border border-[#E8E8E6] bg-white px-3 py-2 text-[13px] text-[#111110]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/logos/Microsoft_Office_Excel_Logo.svg" alt="" className="h-5 w-5" />
      {name}
    </span>
  );
}

const ONBOARDING_METHODS = [
  {
    title: "Import a file",
    desc: "CSV or Excel — bring your whole inventory at once",
    badge: "Recommended",
    tone: "bg-emerald-50 text-emerald-700",
    icon: "▤",
  },
  {
    title: "Connect Artlogic",
    desc: "Sync automatically from your Artlogic database",
    badge: "Beta",
    tone: "bg-violet-50 text-violet-700",
    icon: "◫",
  },
  {
    title: "Add manually",
    desc: "Create your first work one field at a time",
    badge: null,
    tone: "",
    icon: "✎",
  },
];

/** Gallery OS onboarding, step "Inventory", as OnboardingWizard renders it. */
function OnboardingScreen({ c, beat }: { c: ConversationSectionsCopy["migration"]; beat: number }) {
  const picking = beat <= 1;
  return (
    <div className="flex h-full flex-col items-center justify-center bg-zinc-50 px-4">
      <div className="w-full max-w-md">
        <div className="relative overflow-hidden rounded-[22px] border border-zinc-200 bg-white">
          <AnimatePresence mode="wait" initial={false}>
            {picking ? (
              <motion.div
                key="picker"
                className="space-y-4 p-5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.3 }}
              >
                <div>
                  <p className="text-[15px] font-semibold text-zinc-900">Connect your inventory</p>
                  <p className="mt-0.5 text-[12px] text-zinc-700">
                    Choose how to bring your works into Good Artworks
                  </p>
                </div>
                <div className="space-y-2">
                  {ONBOARDING_METHODS.map((m, i) => {
                    const hot = i === 0 && beat === 1;
                    return (
                      <motion.div
                        key={m.title}
                        className={`flex items-center gap-3 rounded-xl border px-3 py-2.5 transition-colors duration-200 ${
                          hot ? "border-zinc-900" : "border-zinc-200"
                        }`}
                        animate={{ scale: hot ? [1, 0.97, 1] : 1 }}
                        transition={{ duration: 0.4 }}
                      >
                        <span
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[13px] transition-colors ${
                            hot ? "bg-zinc-900 text-white" : "bg-zinc-50 text-zinc-500"
                          }`}
                        >
                          {m.icon}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="flex flex-wrap items-center gap-1.5">
                            <span className="whitespace-nowrap text-[13px] font-medium text-zinc-900">
                              {m.title}
                            </span>
                            {m.badge ? (
                              <span
                                className={`rounded px-1.5 py-0.5 text-[9px] font-medium ${m.tone}`}
                              >
                                {m.badge}
                              </span>
                            ) : null}
                          </span>
                          <span className="mt-0.5 block truncate text-[11px] text-zinc-500">
                            {m.desc}
                          </span>
                        </span>
                        <span className={`text-[14px] ${hot ? "text-zinc-900" : "text-zinc-300"}`}>
                          ›
                        </span>
                      </motion.div>
                    );
                  })}
                </div>
                <p className="text-[11px] text-zinc-400">I&apos;ll do this later</p>
              </motion.div>
            ) : (
              <motion.div
                key="file"
                className="space-y-4 p-5"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[15px] font-semibold text-zinc-900">Import a file</p>
                    <p className="mt-0.5 text-[12px] text-zinc-700">
                      Bring your whole inventory from a CSV file
                    </p>
                  </div>
                  <span className="mt-0.5 text-[11px] text-zinc-400">← Back</span>
                </div>
                <div className="relative h-[150px]">
                  {beat <= 3 ? (
                    <div
                      className={`flex h-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed transition-colors duration-300 ${
                        beat === 3
                          ? "border-emerald-400 bg-emerald-50/60"
                          : "border-zinc-300 bg-zinc-50"
                      }`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="/logos/Microsoft_Office_Excel_Logo.svg"
                        alt=""
                        className="h-6 w-6 opacity-60"
                      />
                      <span className="text-[12px] text-zinc-500">{c.drop}</span>
                    </div>
                  ) : (
                    <div className="flex h-full flex-col justify-center gap-2 rounded-xl border border-zinc-200 px-4">
                      <div className="flex items-center gap-3">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src="/logos/Microsoft_Office_Excel_Logo.svg"
                          alt=""
                          className="h-5 w-5"
                        />
                        <p className="text-[12px] text-zinc-900">
                          {c.importing} · {c.file}
                        </p>
                      </div>
                      <div className="h-1 overflow-hidden rounded-full bg-zinc-200">
                        <motion.div
                          className="h-full rounded-full bg-zinc-900"
                          initial={{ width: "0%" }}
                          animate={{ width: "100%" }}
                          transition={{ duration: MIGRATION_TIMES[4] / 1000, ease }}
                        />
                      </div>
                    </div>
                  )}
                  <AnimatePresence>
                    {beat === 3 ? (
                      <motion.div
                        key="drag"
                        className="pointer-events-none absolute left-1/2 top-1/2 z-20 -mt-5"
                        initial={{ x: "-230%", y: -50, opacity: 0, rotate: -4 }}
                        animate={{ x: "-50%", y: 0, opacity: 1, rotate: -2 }}
                        exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                        transition={{ duration: 1.1, ease }}
                      >
                        <div className="relative">
                          <FileChip name={c.file} />
                          <svg
                            className="absolute -bottom-3 right-2"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <path
                              d="M4 2l16 9-7 2-3 7z"
                              fill="#111110"
                              stroke="white"
                              strokeWidth="1.5"
                            />
                          </svg>
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

/** Gallery OS · Artworks, as workspace/inventory/artworks renders it. */
function ArtworksScreen({
  loaded,
  holding,
  locked = false,
}: {
  loaded: number;
  holding: boolean;
  /** The visitor cannot scroll it: only the animation moves the list. */
  locked?: boolean;
}) {
  const rows = SCREEN_ROWS.slice(0, loaded);
  // Once the visible rows are in, the counters keep climbing until the screen changes.
  const [extra, setExtra] = useState(0);
  useEffect(() => {
    if (!holding) {
      setExtra(0);
      return;
    }
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / MIGRATION_HOLD_MS);
      setExtra(Math.round((1 - Math.pow(1 - p, 2)) * (IMPORT_TOTAL - SCREEN_ROWS.length)));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [holding]);
  const total = loaded + extra;
  // Scroll the screen down as rows arrive, so the newest work is always in view.
  const scroller = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    el.scrollTo({
      top: loaded === 0 ? 0 : el.scrollHeight,
      behavior: loaded === 0 ? "auto" : "smooth",
    });
  }, [loaded]);
  const available = rows.filter((r) => r.status === "Available").length + Math.round(extra * 0.86);
  const sold = rows.filter((r) => r.status === "Sold").length + Math.round(extra * 0.09);
  const cols =
    "grid-cols-[minmax(0,2fr)_minmax(0,1fr)] md:grid-cols-[minmax(0,2.2fr)_minmax(0,1.4fr)_56px_84px_92px]";
  return (
    <div
      ref={scroller}
      className={`h-full bg-white pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${locked ? "pointer-events-none overflow-hidden" : "overflow-y-auto"}`}
    >
      <div className="m-2 rounded-2xl bg-zinc-50/80 px-4 pb-4 pt-5 md:m-3 md:px-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="font-display text-[20px] font-medium tracking-[-0.03em] text-[#111110] md:text-[24px]">
              Artworks
            </p>
            <p className="mt-1 text-[12px] text-[#6B6A67]">
              The works behind your conversations and selections.
            </p>
          </div>
          <div className="hidden items-center gap-2 sm:flex">
            <span className="rounded-[7px] bg-[#111110] px-2.5 py-1.5 text-[11.5px] font-medium text-white">
              + Add artwork
            </span>
            <span className="rounded-[7px] border border-[#E8E8E6] bg-white px-2.5 py-1.5 text-[11.5px] text-[#111110]">
              ↥ Import a CSV
            </span>
          </div>
        </div>
        <p className="mt-3 text-[12px] tabular-nums text-[#6B6A67]">
          {total} total · {available} available · {sold} sold
        </p>
        <div className="mt-3 rounded-[9px] border border-[#E8E8E6] bg-white px-3 py-2 text-[12px] text-[#ADADAA]">
          ⌕ Filter artworks in this view…
        </div>
        <div className="mt-3 hidden flex-wrap gap-2 md:flex">
          {FILTERS.map((f) => (
            <span
              key={f}
              className="rounded-full border border-[#E8E8E6] bg-white px-2.5 py-0.5 text-[11px] text-[#3F3F46]"
            >
              {f}
            </span>
          ))}
        </div>
        <p className="mt-3 text-[11px] tabular-nums text-[#ADADAA]">{total} results</p>
      </div>
      <div
        className={`mx-2 grid ${cols} border-b border-[#E8E8E6] px-3 py-2 text-[11px] font-medium text-[#3F3F46] md:mx-3`}
      >
        <span className="pl-11">Title</span>
        <span className="hidden md:block">Artist</span>
        <span className="hidden md:block">Year</span>
        <span className="text-right md:text-left">Price</span>
        <span className="hidden md:block">Status</span>
      </div>
      {rows.map((r) => (
        <motion.div
          key={r.title}
          className={`mx-2 grid ${cols} items-center border-b border-[#F0F0EE] px-3 py-2 md:mx-3`}
          initial={{ opacity: 0, y: 8, backgroundColor: "rgba(236,253,245,1)" }}
          animate={{ opacity: 1, y: 0, backgroundColor: "rgba(255,255,255,0)" }}
          transition={{ duration: 0.5, ease, backgroundColor: { duration: 1.2 } }}
        >
          <span className="flex min-w-0 items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={r.image} alt="" className="h-8 w-8 shrink-0 rounded-[6px] object-cover" />
            <span className="truncate text-[13px] text-[#111110]">{r.title}</span>
          </span>
          <span className="hidden truncate text-[12.5px] text-[#3F3F46] md:block">{r.artist}</span>
          <span className="hidden text-[12.5px] tabular-nums text-[#3F3F46] md:block">
            {r.year}
          </span>
          <span className="text-right text-[12.5px] tabular-nums text-[#111110] md:text-left">
            {r.price}
          </span>
          <span className="hidden md:block">
            <span
              className={`rounded-full border px-2 py-0.5 text-[11px] ${STATUS_PILL[r.status]}`}
            >
              {r.status}
            </span>
          </span>
        </motion.div>
      ))}
    </div>
  );
}

/**
 * The migration screen on its own: the onboarding takes the spreadsheet, then
 * the Artworks list fills row by row, and the loop starts again. Shared by
 * the home's migration section and the inventory page.
 */
export function MigrationScreen({
  c,
  className = "",
  artworksOnly = false,
}: {
  c: ConversationSectionsCopy["migration"];
  /** Size and corners of the screen; the content always fills it. */
  className?: string;
  /** Loop only the second screen: the Artworks list filling, then again. Nothing to scroll. */
  artworksOnly?: boolean;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.35 });
  const total = SCREEN_ROWS.length;
  const last = ARTWORKS_FROM + total; // the hold, once every work is in
  const first = artworksOnly ? ARTWORKS_FROM : 0;
  const [beat, setBeat] = useState(reduce ? last : first);
  // Each loop of the list is its own screen, so a restart fades instead of jumping.
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    if (reduce || !inView) return;
    const wait =
      beat < ARTWORKS_FROM
        ? MIGRATION_TIMES[beat]
        : beat >= last
          ? MIGRATION_HOLD_MS
          : MIGRATION_ROW_MS;
    const t = window.setTimeout(() => {
      if (beat >= last) {
        setCycle((k) => k + 1);
        setBeat(first);
      } else {
        setBeat(beat + 1);
      }
    }, wait);
    return () => window.clearTimeout(t);
  }, [beat, inView, reduce, last, first]);

  const onArtworks = beat >= ARTWORKS_FROM;
  const loaded = Math.max(0, Math.min(beat - ARTWORKS_FROM + 1, total));

  return (
    <div ref={ref} className={`relative overflow-hidden bg-white ${className}`}>
      {/* One screen at a time: the onboarding, then the Artworks list it fills */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={onArtworks ? `artworks-${cycle}` : "onboarding"}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          {onArtworks ? (
            <ArtworksScreen loaded={loaded} holding={beat >= last} locked={artworksOnly} />
          ) : (
            <OnboardingScreen c={c} beat={beat} />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function MigrationSection({ c }: { c: ConversationSectionsCopy["migration"] }) {
  return (
    <section className="bg-[#111110] px-4 pb-8 pt-16 text-white md:px-6 md:py-20">
      <Heading eyebrow={c.eyebrow} title={c.title} sub={c.sub} dark />
      <div className="relative mx-auto mt-10 w-full max-w-4xl md:mt-12">
        <MigrationScreen
          c={c}
          className="h-[clamp(380px,calc(100svh-380px),540px)] rounded-[32px]"
        />

        <div className="mt-5 flex flex-col items-center text-center">
          <span className="text-[13px] text-[#ADADAA]">{c.line}</span>
        </div>
      </div>
    </section>
  );
}

/** Where the data lives: the reassurance that comes with the move, on its own dark band. */
function SecuritySection({ c }: { c: ConversationSectionsCopy["migration"]["security"] }) {
  return (
    <section className="bg-[#111110] px-4 pb-16 pt-6 md:px-6 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[auto_minmax(0,1fr)] lg:items-start lg:gap-16">
        <p className="font-display text-[22px] font-medium tracking-[-0.02em] text-white md:text-[26px] lg:whitespace-nowrap">
          {c.title}
        </p>
        <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          {c.items.map((it, i) => {
            const Icon = SECURITY_ICONS[i] ?? Database;
            return (
              <li key={it.k} className="flex flex-col gap-2">
                <span className="flex items-center gap-2 text-[15px] font-medium text-white">
                  <Icon
                    size={16}
                    strokeWidth={1.75}
                    className="shrink-0 text-white"
                    aria-hidden="true"
                  />
                  {it.k}
                </span>
                <span className="text-[14px] leading-[1.5] text-[#ADADAA]">{it.v}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export default function ConversationSections({
  copy,
  afterWhatsApp,
}: {
  copy: ConversationSectionsCopy;
  afterWhatsApp?: ReactNode;
}) {
  return (
    <>
      {/* One section holds the rows, alternating scene left and right. */}
      <section className="bg-white px-4 pb-16 pt-0 md:px-6 md:pb-20 md:pt-4">
        <Heading eyebrow={copy.block.eyebrow} title={copy.block.title} sub={copy.block.sub} />
        <div className="mt-14 flex flex-col gap-24 md:mt-28 md:gap-40">
          <EmailSection c={copy.email} lang={copy === CONVERSATION_SECTIONS_FR ? "fr" : "en"} />
          <WhatsAppSection c={copy.whatsapp} />
        </div>
      </section>
      <FeedSection c={copy.feed} />
      <MigrationSection c={copy.migration} />
      <SecuritySection c={copy.migration.security} />
      {afterWhatsApp}
    </>
  );
}
