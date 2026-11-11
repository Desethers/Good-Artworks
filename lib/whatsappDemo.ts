/**
 * The public demo number: a WhatsApp contact anyone can message to try Good Artworks.
 *
 * Digits only, with the country code and no "+" (the wa.me format). Set
 * NEXT_PUBLIC_WHATSAPP_DEMO_NUMBER to the real number; until then the
 * placeholder below keeps every "Try it on WhatsApp" button in place.
 */
const PLACEHOLDER = "33100000000";

export const WHATSAPP_DEMO_NUMBER =
  (process.env.NEXT_PUBLIC_WHATSAPP_DEMO_NUMBER ?? "").replace(/\D/g, "") || PLACEHOLDER;

const PREFILL = {
  en: "Hi Good Artworks, I’d like to try the demo.",
  fr: "Bonjour Good Artworks, je voudrais essayer la démo.",
} as const;

/** wa.me link that opens WhatsApp on the demo number with a ready-to-send message. */
export function whatsappDemoLink(lang: "en" | "fr", message?: string): string {
  const text = message?.trim() || PREFILL[lang];
  return `https://wa.me/${WHATSAPP_DEMO_NUMBER}?text=${encodeURIComponent(text)}`;
}
