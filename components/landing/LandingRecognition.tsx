"use client";

import TryWhatsAppButton from "@/components/landing/TryWhatsAppButton";
import { CONTAINER, H2, H2_SUB, SECTION } from "@/components/landing/styles";
import WaPhone from "@/components/whatsapp/WaPhone";
import type { WaMessage } from "@/components/whatsapp/WaChat";

export type RecognitionCopy = {
  title: string;
  sub: string;
  p1: string;
  p2: string;
  p3: string;
  cta: string;
  lang: "en" | "fr";
  phone: { name: string; status: string; placeholder: string; messages: WaMessage[] };
};

export const RECOGNITION_EN: RecognitionCopy = {
  title: "Every sale starts with a conversation.",
  sub: "Find artworks, prices and details in WhatsApp.",
  p1: "A collector writes on WhatsApp: “Is it still available?”",
  p2: "Then the search begins. The image is in a folder, the price in a spreadsheet, what you sent last month in someone’s head.",
  p3: "Now ask Good Artworks, right in WhatsApp. It sends back the artwork with its image, price and availability, ready to forward to the collector, and keeps track of what each collector has received.",
  cta: "Try it on WhatsApp",
  lang: "en",
  phone: {
    name: "Good Artworks",
    status: "sales assistant",
    placeholder: "Message",
    messages: [
      {
        from: "me",
        time: "10:41",
        forwarded: { label: "Forwarded", name: "Marie Beaumont" },
        text: "Anything new from Sacha Elron?",
      },
      {
        from: "bot",
        time: "10:41",
        text: "Marie got 2 Elrons in March and loves large formats. This one just came in:",
      },
      {
        from: "bot",
        time: "10:41",
        card: {
          image: "/artworks/painting-03.jpg",
          title: "Sacha Elron — Evening Field",
          meta: "Oil on canvas · 120 × 150 cm",
          price: "€12,000 · available",
        },
      },
      {
        from: "bot",
        time: "10:42",
        text: "“Hello Marie, a new Elron just arrived — the large format you liked in March. Evening Field, 120 × 150 cm. Shall I send you more images?”",
        actions: ["Copy reply", "Make it shorter"],
      },
      { from: "me", time: "10:42", text: "Perfect, sent 👌" },
      { from: "bot", time: "10:42", text: "Saved to Marie’s history ✓" },
    ],
  },
};

/** The moment of recognition, then the demo: a forwarded message and its prepared reply, on WhatsApp. */
export function RecognitionSection({ copy }: { copy: RecognitionCopy }) {
  // The WhatsApp logo sits right in front of the word, wherever it falls in the sentence.
  const at = copy.p1.indexOf("WhatsApp");
  const p1Before = at === -1 ? "" : copy.p1.slice(0, at);
  const p1After = at === -1 ? copy.p1 : copy.p1.slice(at);

  return (
    <section className={`${SECTION} bg-white`}>
      <div className={`${CONTAINER} grid gap-10 md:grid-cols-[0.7fr_1fr] md:items-start md:gap-16`}>
        <div className="max-w-xl">
          <h2 className={H2}>{copy.title}</h2>
          <p className={H2_SUB}>{copy.sub}</p>

          <p className="mt-6 text-[16px] leading-[1.65] tracking-[-0.01em] text-[#6B6A67]">
            {p1Before}
            <span className="mr-1.5 inline-flex items-center align-middle" aria-hidden="true">
              <span className="flex h-6 w-6 items-center justify-center rounded-full border-[0.5px] border-[#E8E8E6] bg-white">
                <img
                  src="/logos/whatsapp.svg"
                  alt=""
                  className="h-[18px] w-[18px] object-contain"
                />
              </span>
            </span>
            {p1After}
          </p>
          <p className="mt-4 text-[16px] leading-[1.65] tracking-[-0.01em] text-[#6B6A67]">
            {copy.p2}
          </p>
          <p className="mt-4 text-[16px] leading-[1.65] tracking-[-0.01em] text-[#111110]">
            {copy.p3}
          </p>

          <div className="mt-7">
            <TryWhatsAppButton lang={copy.lang} label={copy.cta} />
          </div>
        </div>

        <WaPhone
          name={copy.phone.name}
          status={copy.phone.status}
          placeholder={copy.phone.placeholder}
          messages={copy.phone.messages}
        />
      </div>
    </section>
  );
}

export default function LandingRecognition() {
  return <RecognitionSection copy={RECOGNITION_EN} />;
}
