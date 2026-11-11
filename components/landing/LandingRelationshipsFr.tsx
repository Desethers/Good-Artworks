"use client";

import {
  RelationshipsSection,
  type RelationshipsCopy,
} from "@/components/landing/LandingRelationships";

const FR_COPY: RelationshipsCopy = {
  eyebrow: "Se souvenir",
  title: "Chaque collectionneur, en mémoire.",
  intro:
    "Good Artworks garde la mémoire de chaque conversation {gmail}Gmail et {whatsapp}WhatsApp, reliée aux œuvres dont vous parlez.",
  link: {
    name: "Qui a reçu quoi",
    body: "Rattache chaque demande et chaque œuvre envoyée au collectionneur et à l’œuvre : qui a demandé, qui l’a reçue, si elle a été ouverte.",
    mock: {
      works: {
        title: "Œuvres évoquées",
        inventory: "Inventaire",
        items: [
          {
            image: "/artworks/painting-05.jpg",
            artist: "Sacha Elron",
            title: "Evening field",
            meta: "Disponible · 10 000 €",
          },
          {
            image: "/artworks/painting-03.jpg",
            artist: "Sacha Elron",
            title: "Crimson Field",
            meta: "Vendue · 9 500 €",
          },
          {
            image: "/artworks/painting-04.jpg",
            artist: "Sacha Elron",
            title: "Sage Interval",
            meta: "Disponible · 6 500 €",
          },
          {
            image: "/artworks/painting-10.jpg",
            artist: "Sacha Elron",
            title: "Amber Nocturne",
            meta: "Vendue · 14 000 €",
          },
        ],
      },
      usage: {
        title: "Usage et activité",
        tabs: [
          { label: "Sélections privées", count: 1 },
          { label: "Expositions", count: 0 },
          { label: "Historique des partages", count: 3 },
        ],
        summary: "2 consultées · 1 non ouverte",
        sends: [
          {
            name: "Anna Roche",
            pill: "Ouverte",
            tone: "blue",
            meta: "Carte e-mail · Ouverte le 30 sept. 2026",
          },
          {
            name: "Marie Beaumont",
            pill: "PDF consulté",
            tone: "emerald",
            meta: "PDF · Consulté le 10 sept. 2026",
          },
          {
            name: "Thomas Baur",
            pill: "Préparée",
            tone: "zinc",
            meta: "WhatsApp · Préparée le 15 sept. 2026",
          },
        ],
      },
      conversations: {
        title: "Conversations",
        rows: [
          {
            name: "Anna Roche",
            channel: "Gmail",
            state: "A ouvert la fiche",
            when: "il y a 6 jours",
          },
          {
            name: "Marie Beaumont",
            channel: "WhatsApp",
            state: "A écrit à propos de cette œuvre",
            when: "il y a 27 jours",
          },
        ],
      },
    },
  },
  memory: {
    name: "Un CRM que vous n’avez pas à remplir",
    body: "Garde sur une seule fiche les demandes d’un collectionneur et les œuvres que vous lui avez envoyées, depuis Gmail et WhatsApp.",
    mock: {
      person: {
        id: "beaumont-marie",
        name: "Marie Beaumont",
        groups: "collection établie · Paris · priorité haute",
        email: "beaumont.marie@gmail.com",
        phone: "+33 6 12 34 56 78",
      },
      channels: { whatsapp: "WhatsApp", gmail: "Gmail" },
      timeline: "Chronologie",
      count: "16 moments",
      filters: [
        { label: "Tout", count: 16 },
        { label: "WhatsApp", count: 4 },
        { label: "Gmail", count: 2 },
        { label: "Rendez-vous", count: 3 },
        { label: "Notes", count: 5 },
        { label: "Sélections", count: 2 },
      ],

      today: "Aujourd’hui",
      todayDate: "6 octobre 2026",
      period: "Septembre",
      toPickUp: "À reprendre",

      exchange: {
        label: "Échange repéré",
        date: "9 sept.",
        text: "Vous a écrit à propos de « Evening field »",
        quote:
          "Bonsoir, Evening field est-elle toujours disponible ? Pouvez-vous me rappeler ses dimensions ?",
        work: { image: "/artworks/painting-05.jpg", artist: "Sacha Elron", title: "Evening field" },
        channel: "WhatsApp",
        action: "Ouvrir dans WhatsApp",
      },
    },
  },
  assistant: {
    name: "Votre brief du matin",
    body: "Vous dit chaque matin qui attend une réponse et qui recontacter, uniquement depuis vos fiches.",
  },
};

export default function LandingRelationshipsFr() {
  return <RelationshipsSection copy={FR_COPY} />;
}
