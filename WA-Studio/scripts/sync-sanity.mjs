// Pull artworks (data + images) from the gallery-OS Sanity dataset into a
// local cache, so renders stay deterministic and offline.
// npm run sync:sanity
// Source: gallery-OS/sanity.cli.ts (project d0op0luu, dataset production).
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const projectId = process.env.SANITY_PROJECT_ID ?? "d0op0luu";
const dataset = process.env.SANITY_DATASET ?? "production";
const outDir = path.join(root, "data/sanity");
const imgDir = path.join(outDir, "images");
const IMAGE_WIDTH = 2048; // same width as the reference photos

const query = `*[_type == "artwork" && defined(mainImage.asset)] | order(artist->displayName asc, title asc) {
  _id, "slug": slug.current, title, year, mediumText, "mediumTitle": medium->title,
  dimensions, price, currency, priceOnRequest, status,
  "artist": artist->displayName,
  "imageUrl": mainImage.asset->url
}`;

const url = `https://${projectId}.apicdn.sanity.io/v2023-08-01/data/query/${dataset}?query=${encodeURIComponent(query)}`;
const res = await fetch(url);
if (!res.ok) throw new Error(`Sanity query failed: ${res.status} ${await res.text()}`);
const { result } = await res.json();

fs.mkdirSync(imgDir, { recursive: true });
const artworks = [];
for (const a of result) {
  const id = a.slug ?? a._id;
  const ext = path.extname(new URL(a.imageUrl).pathname);
  const file = path.join(imgDir, `${id}${ext}`);
  if (!fs.existsSync(file)) {
    const img = await fetch(`${a.imageUrl}?w=${IMAGE_WIDTH}`);
    if (!img.ok) throw new Error(`Image download failed for ${id}: ${img.status}`);
    fs.writeFileSync(file, Buffer.from(await img.arrayBuffer()));
  }
  const d = a.dimensions;
  artworks.push({
    id,
    sanityId: a._id,
    artist: a.artist,
    title: a.title,
    year: a.year ? Number(a.year) : undefined,
    medium: a.mediumText ?? a.mediumTitle,
    dimensions: d?.height && d?.width ? `${d.height} × ${d.width} ${d.unit ?? "cm"}` : undefined,
    priceEUR: a.currency === "EUR" && !a.priceOnRequest ? a.price : undefined,
    status: a.status,
    image: path.relative(root, file),
    source: `sanity:${projectId}/${dataset}`,
  });
}

fs.writeFileSync(path.join(outDir, "artworks.json"), JSON.stringify(artworks, null, 2) + "\n");
console.log(`Synced ${artworks.length} artworks → data/sanity/artworks.json`);
