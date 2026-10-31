// Content only: reads data/*.json and turns it into component props.
import fs from "node:fs";
import path from "node:path";

const labels = {
  fr: { forwarded: "Transféré" },
  en: { forwarded: "Forwarded" },
};

function formatPrice(eur, language) {
  const n = String(eur).replace(/\B(?=(\d{3})+(?!\d))/g, language === "fr" ? " " : ",");
  return language === "fr" ? `${n} €` : `€${n}`;
}

// Artworks come from the gallery-OS Sanity cache (npm run sync:sanity) and,
// for the Figma master only, from data/artworks.json. Ids must be unique.
function loadArtworks(root) {
  const files = ["data/artworks.json", "data/sanity/artworks.json"];
  const all = files
    .filter((f) => fs.existsSync(path.join(root, f)))
    .flatMap((f) => JSON.parse(fs.readFileSync(path.join(root, f), "utf8")));
  const seen = new Set();
  for (const a of all) {
    if (seen.has(a.id)) throw new Error(`Duplicate artwork id "${a.id}"`);
    seen.add(a.id);
  }
  return all;
}

export function loadConversation(root, id) {
  const conversations = JSON.parse(
    fs.readFileSync(path.join(root, "data/conversations.json"), "utf8")
  );
  const artworks = loadArtworks(root);
  const conversation = conversations.find((c) => c.id === id);
  if (!conversation) throw new Error(`Conversation "${id}" not found in data/conversations.json`);
  const lang = conversation.language;
  if (!labels[lang]) throw new Error(`Unsupported language "${lang}"`);

  const messages = conversation.messages.map((m) => {
    if (m.type !== "forwarded_artwork") return m;
    const a = artworks.find((x) => x.id === m.artworkId);
    if (!a)
      throw new Error(`Artwork "${m.artworkId}" not found (data/artworks.json, data/sanity/)`);
    for (const field of ["artist", "title", "year", "medium", "dimensions", "priceEUR"])
      if (a[field] == null) throw new Error(`Artwork "${a.id}" has no ${field} in its source`);
    const image = path.join(root, a.image);
    if (!fs.existsSync(image)) throw new Error(`Missing artwork image: ${a.image}`);
    return {
      type: m.type,
      time: m.time,
      read: m.read,
      label: labels[lang].forwarded,
      image: a.image, // served relative to WA-Studio root
      captionLines: [
        a.artist,
        `${a.title}, ${a.year}`,
        a.medium,
        a.dimensions,
        formatPrice(a.priceEUR, lang),
      ],
    };
  });
  return { ...conversation, messages };
}
