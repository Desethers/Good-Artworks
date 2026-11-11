/**
 * Demo data used in marketing mocks (PillarMocks, ProcessFlow,
 * Showcase). Change these once and every mock updates — useful for
 * client-specific previews.
 */

export const SAMPLE_GALLERY = {
  name: "Good Artworks Gallery",
} as const;

/** Featured artist shown across the marketing mocks. */
export const SAMPLE_ARTIST = {
  firstName: "Sacha",
  lastName: "Elron",
  fullName: "Sacha Elron",
} as const;

/** Featured artwork (used in ProcessFlow Step 2 card, ConnectMock). */
export const SAMPLE_ARTWORK = {
  artist: SAMPLE_ARTIST.fullName,
  title: "Dawn Study No. 7",
  year: "2023",
  medium: "Oil on canvas",
  dimensions: "120 × 90 cm",
} as const;

/** Reference artwork for the Audit demo (folder tree + mail + journey). */
export const SAMPLE_REFERENCE_ARTWORK = {
  artist: "Andy Warhol",
  title: "Marilyn, 1967",
  filename: "Warhol_Selection_May_2026.pdf",
  fileSize: "4.2 MB",
  fileCount: 6,
} as const;

/** Collector persona used in mail mockups and pills. */
export const SAMPLE_COLLECTOR = {
  initials: "MT",
  name: "M. Tanaka",
  email: "m.tanaka@tanaka-collection.jp",
  city: "Tokyo",
  recipient: "to me",
  contactDay: "Tue",
  contactTime: "14:32",
} as const;

/** Exhibition reference. */
export const SAMPLE_EXHIBITION = {
  code: "EXH-005",
  shortName: "Basel ’26",
  fullName: "Basel ’26 brief",
} as const;

/** Inventory tooling references. */
export const SAMPLE_INVENTORY = {
  rootFolder: "01 — Inventory 2026",
  artistFolder: "01.1 Sacha Elron",
  filenames: {
    provenance: "Marilyn 1967 — provenance.pdf",
    inventory: "Inventory Q1 2026.xlsx",
    collectorNotes: "M. Tanaka — collector notes.docx",
    exhibition: "EXH-005 — Basel ’26 brief.pdf",
  },
} as const;
