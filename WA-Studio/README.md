# Vitreen / WA-Studio

Prepared handoff for building a repeatable static WhatsApp conversation PNG generator in Codex or Claude Code. Everything lives in this folder and must remain isolated from the Vitreen production website.

## Contents

- `references/master.png`: 405 × 838 source mockup
- `references/painting-07.jpg`, `references/painting-09.png`: original paintings photographed in gallery spaces
- `specs/vitreen-design-spec.json`: complete structured Figma design export
- `data/artworks.json`: initial artwork records (not verified against Sanity)
- `data/conversations.json`: 1 source conversation; more scenarios will be generated after template validation
- `instructions/DESIGN_LOCK.md`: non-negotiable visual and content constraints
- `instructions/PROMPT_CODEX.md`: paste or point your coding agent to this brief
- `output/`: target PNG renders, initially empty

## Setup

Unzip into `/Users/raphael/Travail/Web/Vitreen/WA-Studio/` (merge into existing folder, preserve existing files). Tell Codex or Claude Code: `Read WA-Studio/instructions/PROMPT_CODEX.md and follow it. Start with Phase 1 only.`

## Important

This is a **handoff/source pack**, not an already-implemented renderer. Neither access to your Mac nor a verified pixel-perfect rendering is claimed. The artwork priced at €10,000 does not meet a strict `< €10,000` filter; see DESIGN_LOCK.

---

## Générateur (template figé v1)

### Installation (une fois)

```bash
cd WA-Studio && npm install && npx playwright install chromium
```

Polices requises : SF Pro et SF Pro Text dans `/Library/Fonts`.

### Commandes

- `npm run render:master` : génère `output/master-render.png` (405 × 838).
- `npm run compare` : compare au Figma et écrit `output/qa/side-by-side.png`
  (master | rendu | diff) et `output/qa/diff.png`, avec les écarts par bande
  horizontale.
- `npm run qa` : lance les deux.
- `npm run render:all` : rend toutes les conversations de
  `data/conversations.json` dans `output/<id>.png`. Si une conversation ne tient
  pas dans 838 px, le rendu s'arrête (relancer avec `--height`).
- `npm run sync:sanity` : récupère les œuvres (infos + photos) du dataset Sanity
  de gallery-OS (projet `d0op0luu`, dataset `production`) dans `data/sanity/`.
  Une conversation cite une œuvre par son `id` (le slug Sanity, ou l'`_id`
  quand l'œuvre n'a pas de slug). Les photos en cache ne sont pas versionnées.
- `npm run render -- --conversation <id> --output output/<nom>.png [--height 838]` :
  rend n'importe quelle conversation de `data/conversations.json`.

### Structure

- `src/tokens.js` : **toutes** les valeurs de design (couleurs, polices, tailles,
  marges, rayons, ombres, écarts). C'est le seul fichier de style.
- `src/components/` : `IncomingMessage`, `OutgoingMessage`, `ForwardedArtwork`,
  `Conversation`, et les formes vectorielles dans `parts.jsx`.
- `src/content.js` : lit `data/*.json` et fabrique la légende des œuvres
  (artiste / titre, année / technique / dimensions / prix).
- `scripts/render.jsx` : rendu React → HTML → PNG avec Playwright.
- `scripts/compare.mjs` : comparaison au pixel avec `references/master.png`.
- `DESIGN_DECISIONS.md` : les incohérences du Figma et le choix retenu.

### Ajouter une conversation

Ajouter une entrée dans `data/conversations.json` (types `incoming_text`,
`outgoing_text`, `forwarded_artwork`). Les œuvres viennent de Sanity
(`npm run sync:sanity`) ; `data/artworks.json` ne sert plus qu'au master Figma.
Si une info manque dans Sanity (prix, dimensions…), le rendu s'arrête avec une
erreur au lieu d'inventer une valeur. Aucun style à toucher :
les bulles grandissent avec le texte, la largeur max reste fixe, la
conversation s'allonge vers le bas. Utiliser `--height` si elle dépasse 838 px.

### Résultat de la comparaison avec le master

Depuis le 2026-10-31, `master-01` montre deux œuvres de Sacha Elron tirées de
Sanity (Crimson Field, Sage Interval) au lieu des deux photos du Figma, qui
n'existent pas dans Sanity. La comparaison ne vaut donc plus que pour la mise
en page (bulles, textes, heures) : les zones des photos et des légendes
diffèrent forcément (15,8 % de pixels). Mesure faite avec les photos d'origine :

1,9 % de pixels différents (pixelmatch, seuil 0,1). Bulle entrante 1, bulle
sortante, première œuvre : alignés à ±0,25 px près, photo identique. Les écarts
visibles viennent des harmonisations décrites dans `DESIGN_DECISIONS.md` (2e
photo, dernier message).
