# Template figé v1 — décisions de design

Le master Figma (`Conversation WA_dispo_prix`, 881:5803) a été dessiné à la
main : deux occurrences d'un même composant n'ont pas toujours les mêmes
valeurs. Pour figer un template réutilisable, **la première occurrence de
chaque composant fait référence**. Toutes les valeurs sont dans
`src/tokens.js`.

## Incohérences du master, et choix retenu

| Élément                               | Occurrence 1 (retenue)                                                          | Occurrence 2 (abandonnée)                                               | Effet sur le master rendu                                               |
| ------------------------------------- | ------------------------------------------------------------------------------- | ----------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| Bulle entrante : marge gauche         | x = 29                                                                          | x = 31                                                                  | 2e message entrant décalé de 2 px à gauche                              |
| Bulle entrante : largeur max du texte | 240 px                                                                          | 207 px                                                                  | « Vous auriez » tient sur la 1re ligne (le master coupe après « Vous ») |
| Bulle entrante : marges intérieures   | gauche 10, droite 17, heure à 11,27 du bord                                     | gauche 9, droite 7,8, heure à 6,8                                       | idem                                                                    |
| Ombre bulle entrante                  | rentrée de 6 px côté queue, 0 à droite (comme la 2e bulle et la bulle sortante) | la 1re bulle a 26 px de rentrée à droite, un reste de redimensionnement | invisible à l'œil                                                       |
| Œuvre transférée : image              | y 22, hauteur 168                                                               | y 24, hauteur 162                                                       | 2e photo 6 px plus haute, tout ce qui suit descend de 6 px              |
| Œuvre transférée : légende            | interligne 9, départ 11,5 px sous l'image                                       | interligne 10, départ 9 px sous l'image                                 | 2e légende 1 px plus serrée par ligne                                   |
| Coches de l'œuvre : position          | 1 px sous le haut de l'heure                                                    | 2 px                                                                    | négligeable                                                             |

## Changements demandés après le master (2026-10-31)

- **Bulle entrante : heure alignée sur le bord droit du texte** (Figma : 5,7 px
  plus à droite que le texte).
- **Bulle entrante : largeur ajustée à la ligne la plus longue.** Sans ça, une
  bulle qui passe à la ligne gardait toute la largeur max (240 px) et laissait
  un vide à droite. Les coupures de ligne ne changent pas. La bulle sortante
  a reçu le même traitement : largeur ajustée, heure et coches alignées sur le
  bord droit du texte (Figma : coches 3 px plus à droite que le texte).

- **Photo de l'œuvre : largeur fixe 255 px, hauteur selon le format de
  l'œuvre** (Figma : 255 × 168 recadré), plafonnée au format portrait 3:4
  (340 px) comme dans WhatsApp iOS ; au-delà, la photo est recadrée au centre.
  Mesuré sur une capture réelle : une photo 3:4 s'affiche entière (472 × 630 px
  à l'écran). Le plafond exact au-delà de 3:4 n'a pas pu être vérifié, et aucune
  hauteur minimale n'est appliquée aux panoramiques.

## Valeurs absentes du JSON, mesurées sur `references/master.png`

- **Tracés vectoriels** : queue des bulles, doubles coches, icône « Transféré ».
  Le JSON n'en donne que la boîte et la couleur ; les tracés sont redessinés
  dans `src/components/parts.jsx` et calés au pixel sur le PNG.
- **Écarts entre messages** : 3 px entre deux messages du même expéditeur,
  10,73 px d'un message entrant vers un message sortant, 15,73 px dans l'autre
  sens (positions du master).
- **Décalage des légendes** : Figma place un texte de 12 px dans une ligne de
  9 px 1,75 px plus bas que le navigateur. Le décalage est corrigé
  (`caption.glyphShift`).
- **Optical size** : le JSON indique `opsz 28` pour SF Pro, mais le rendu du
  master correspond à `opsz 12` (la taille réelle du texte). Avec 28, le texte
  sortant se resserre et passe à la ligne au mauvais endroit. On garde 12.

## Contenu (pas du design)

- Le Figma écrit « J'aime » avec une apostrophe droite ; `data/conversations.json`
  écrit « J’aime » avec une apostrophe typographique. On garde les données.
- Les œuvres viennent de Sanity (gallery-OS). Les deux œuvres du Figma n'y
  existent pas : `master-01` utilise Crimson Field (9 500 €) et Sage Interval
  (6 500 €), toutes deux sous 10 000 €, ce qui règle aussi l'écart signalé
  dans `instructions/DESIGN_LOCK.md`.
- Les techniques sont saisies en anglais dans Sanity (« Oil on linen ») et
  s'affichent telles quelles dans une conversation française.

## Limites connues

- Une ligne de légende trop longue (titre d'œuvre très long) passe à la ligne
  avec l'interligne de 9 px du Figma, donc des lignes très serrées. Garder les
  champs de légende sur une ligne (~168 px).
- Le rendu dépend des polices SF Pro installées dans `/Library/Fonts`
  (licence Apple, non copiées dans le dossier). Sans elles, le rendu échoue
  volontairement.
- L'anticrénelage du navigateur diffère légèrement de celui de Figma : il
  restera toujours quelques pixels différents sur les contours du texte.
