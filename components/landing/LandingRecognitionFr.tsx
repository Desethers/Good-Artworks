"use client";

import { RecognitionSection, type RecognitionCopy } from "@/components/landing/LandingRecognition";

const COPY: RecognitionCopy = {
  title: "Chaque vente commence par une conversation.",
  sub: "Retrouvez œuvres, prix et détails dans WhatsApp.",
  p1: "Un collectionneur écrit sur WhatsApp : « Est-elle toujours disponible ? »",
  p2: "Alors la recherche commence. L’image est dans un dossier, le prix dans un tableur, ce que vous lui avez envoyé le mois dernier dans la tête de quelqu’un.",
  p3: "Demandez maintenant à Good Artworks, directement dans WhatsApp. Il vous renvoie l’œuvre avec son image, son prix et sa disponibilité, prête à transférer au collectionneur, et garde la trace de ce que chaque collectionneur a reçu.",
  cta: "Essayer sur WhatsApp",
  lang: "fr",
  phone: {
    name: "Good Artworks",
    status: "assistant de vente",
    placeholder: "Message",
    messages: [
      {
        from: "me",
        time: "10:41",
        forwarded: { label: "Transféré", name: "Marie Beaumont" },
        text: "Du nouveau chez Sacha Elron ?",
      },
      {
        from: "bot",
        time: "10:41",
        text: "Marie a reçu 2 Elron en mars et adore les grands formats. Celui-ci vient d’arriver :",
      },
      {
        from: "bot",
        time: "10:41",
        card: {
          image: "/artworks/painting-03.jpg",
          title: "Sacha Elron — Evening Field",
          meta: "Huile sur toile · 120 × 150 cm",
          price: "12 000 € · disponible",
        },
      },
      {
        from: "bot",
        time: "10:42",
        text: "« Bonjour Marie, un nouvel Elron vient d’arriver — le grand format que vous aviez aimé en mars. Evening Field, 120 × 150 cm. Je vous envoie d’autres images ? »",
        actions: ["Copier la réponse", "Plus court"],
      },
      { from: "me", time: "10:42", text: "Parfait, envoyé 👌" },
      { from: "bot", time: "10:42", text: "Noté dans l’historique de Marie ✓" },
    ],
  },
};

export default function LandingRecognitionFr() {
  return <RecognitionSection copy={COPY} />;
}
