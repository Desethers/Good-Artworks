# Good Artworks — guide de collaboration

> **Renommage (2026-11-11) :** Vitreen est devenu **Good Artworks**, domaine
> canonique https://goodart.works (vitreen.art redirige en 301). Des
> identifiants gardent l'ancien nom : le cookie `vitreen-lang`, le composant
> `WhoVitreenIsFor`, le fichier `vitreen-playbook.md`, le projet Vercel et les
> entrées de `.claude/launch.json`. Les mentions « Vitreen » du playbook sont
> à lire comme « Good Artworks ».

Ce fichier est lu à chaque session. Il sert de mémoire stable du projet :
positionnement, conventions, pièges à éviter. À enrichir au fil du temps.

> **Obligatoire :** lire `vitreen-playbook.md` en entier au début de chaque
> session, avant toute décision produit, UX, copywriting, design ou
> implémentation. Le playbook est la source de vérité sur la stratégie ; ce
> fichier n'en garde que l'essentiel et les conventions du repo.

---

## 1. Positionnement

> **Thèse du 2026-09-29** (playbook) : Good Artworks garde l'information
> des œuvres en mouvement et les conversations avec les collectionneurs en
> mémoire. Remplace « un produit, trois têtes » (2026-09-28) et les 3 branches
> du 2026-08-11 (Layer / Studio / Gallery Assistant), caducs :
>
> - **Studio a quitté Good Artworks** le 2026-08-31 → R.R Studio sur forart.world
>   (repo et domaine séparés, `/studio` redirige). Rien de Studio ici.
> - **Gallery Assistant** n'est plus une offre : l'assistant IA est une
>   fonction du produit, pas son centre.
> - **Layer** n'est plus un nom : c'est simplement « Good Artworks ».
> - **viewingroom.studio** est un **produit totalement séparé** (aucune donnée
>   ni CRM partagés, jamais dans le même pitch).

### La thèse (playbook)

> **Garder l'information des œuvres en mouvement. Garder les conversations
> avec les collectionneurs en mémoire. Parce que dans l'art et le design, la
> relation est le business.**

Good Artworks connecte **œuvres, collectionneurs et conversations**. L'inventaire
sait les œuvres, les conversations révèlent la relation, la mémoire relie le
passé à la prochaine action. Le produit n'est aucun module : c'est la
connexion entre eux.

```text
ŒUVRE → CONVERSATION → COLLECTIONNEUR → MÉMOIRE → PROCHAINE ACTION → RELATION ↺
```

- **En externe :** « Relationship intelligence for selling art & design ». La
  mémoire est la base, l'intelligence est ce qu'on en fait. « Intelligence » est
  un nom et une direction : aucune fonction promise avant qu'elle existe.
  **En interne :** la couche de relation entre l'inventaire et la conversation.
- **Point d'entrée :** Gmail et WhatsApp — là où les relations existent déjà.
  On ne fait pas quitter ces outils.
- **Le CRM doit disparaître :** l'activité crée la mémoire ; le CRM est la
  conséquence, pas le travail. Pas de pipeline, pas de scoring.
- **L'IA a un seul but :** relier l'information à la relation (comprendre,
  retrouver, relier, préparer, se souvenir). Elle prépare, l'humain relit et
  envoie. Jamais d'envoi autonome. Jamais un prix, une dispo ou une promesse
  inventés.
- **Jamais de blast :** la proactivité, c'est « ces 11 personnes ont une
  raison crédible de s'y intéresser », avec un message distinct pour chacune.
- **La boucle** (playbook §10) : conversation → personne reconnue → objet et
  intention compris → information retrouvée → réponse, sélection ou PDF
  préparé → un humain relit et envoie → Good Artworks se souvient → la prochaine
  interaction part de ce contexte. Toute fonction doit renforcer au moins une
  étape, sinon on ne la construit pas.
- **Le cas de démo** (playbook §37) : Marie écrit « Anything new from Sacha
  Elron? ». À utiliser partout.

**Discipline de capture :** le produit existe et couvre déjà l'essentiel de la
thèse (collectionneurs, Conversations, relances, vue « utilisée dans » sur
l'œuvre, add-in Gmail, assistant). Ce qui manque, vérifié dans le code au
2026-09-29 : la capture des **messages WhatsApp des collectionneurs** (non
synchronisés), la capture Gmail au-delà des fils ouverts avec l'add-in,
l'**extraction d'intention et de préférences** depuis les messages, la
**propriété d'un collectionneur par un membre de l'équipe** et la **diffusion
proactive**. État exact : playbook §42. Ne jamais promettre au-delà.

**Vision interne (jamais du copy) :** Good Artworks prépare les galeries physiques
à un web où collectionneurs et IA interrogent les galeries au lieu de les
parcourir. Une galerie ne peut répondre que si ses informations sont au même
endroit, propres, structurées et connectées. Le site ne dit jamais « 2030 »,
« ère de l'IA » ou « AI-ready » : il dit ce que le produit fait aujourd'hui.

### Face à Artlogic

Complémentaire, jamais remplaçant : « Artlogic stocke vos œuvres. Good Artworks les
fait circuler dans vos conversations — et se souvient de qui a reçu quoi. »
Tant qu'aucune synchro native n'existe, écrire « à partir de vos exports
Artlogic », jamais « intégration Artlogic ». Ne jamais inviter à une
comparaison de prix avec Artlogic.

### Offre (décidée le 2026-09-28, remplace Sales 390 € / Partner 590 €)

| Offre                             | Prix                                     | Engagement                   |
| --------------------------------- | ---------------------------------------- | ---------------------------- |
| **Galerie fondatrice** (3 places) | 149 €/mois                               | 3 mois minimum, puis au mois |
| **Good Artworks** (prix public)   | 249 €/mois, ou 199 €/mois payé à l'année | Sans engagement              |

Les deux : **par galerie, utilisateurs illimités**, installation incluse (une
semaine environ). Le raisonnement face aux concurrents (Artlogic, Arternal, ArtCloud, Wati…)
est dans l'historique git du playbook (commit `82a037e`). Points à retenir :

- **Trois galeries fondatrices seulement** : prix gardé tant qu'elles restent,
  en échange de 20 min de retours toutes les deux semaines pendant 3 mois et
  d'une étude de cas. La limite fait de l'offre une entrée réservée, pas une
  remise.
- **Ne jamais lister la capture WhatsApp comme incluse** avant qu'elle
  marche : côté fondatrices, c'est un « accès anticipé ».
- **Partner est en pause** jusqu'à ce que des clients demandent un
  accompagnement continu.
- **Devisé à part** : reprise complète d'Artlogic avec nettoyage, travail sur
  mesure.
- **La maintenance incluse est une liste fermée** (bugs, maintien de
  l'existant, sécurité, compatibilité, restauration). Dire oui une fois
  rouvre la frontière définitivement.
- **Toute modification de pricing se fait dans `components/landing/Offers.tsx`**
  (cartes + liste « inclus », EN et FR), utilisé par la home et `/pricing`.
  La FAQ pricing reste dans `PricingPage.tsx` / `PricingPageFr.tsx`.

### Positionnement IA

Trois piliers : **groundé, pas génératif** (ne répond que depuis les fiches) ·
**installé, pas une app de plus** (dans Gmail et WhatsApp) · **assisté, pas
autonome** (rien ne part sans un clic humain — c'est la promesse, pas une
limite).

### Indie hacker

Good Artworks se construit à la manière indie : un fondateur, un produit, des petits
pas visibles, du build in public. **C'est une manière de construire et de
communiquer, pas un modèle de prix** : l'installation reste personnelle.

---

## 2. Vocabulaire

**Préférer**

- **« relationship intelligence »** (le nom public : « Relationship intelligence
  for selling art & design »), puis « mémoire » (ce que Good Artworks garde de chaque
  collectionneur) — dans cet ordre
- « historique du collectionneur », « qui a reçu quoi »
- « CRM » peut se dire en public pour expliquer (« un CRM qui se remplit tout
  seul »), **jamais comme nom**
- « Conversations » (la surface du dashboard), « l'assistant »
- « dans Gmail et WhatsApp », « organiser le bruit »
- « préparé par l'IA, envoyé par votre équipe », « groundé sur vos fiches »
- « fonctionne à côté d'Artlogic »
- « sélection privée » (**jamais « viewing room »** côté Good Artworks : ce nom
  appartient à viewingroom.studio)

**Éviter**

- « Gallery OS » (y compris « Gallery OS Conversations »), « Layer »,
  « Studio », « Gallery Assistant » comme noms d'offre
- « plateforme tout-en-un », « operating system », « suite »
- « CMS », « site web pour galeries », « logiciel d'inventaire » en promesse
- « pipeline », « deals », « lead scoring » (le CRM est personnel, pas un
  pipeline)
- « autopilot », « envoi automatique », « AI-powered everything »
- « plan », « tier », « upgrade » ; tout tableau comparatif à colonnes
- jargon technique côté client

### Discipline de claims (non négociable)

- L'agent **prépare**, l'humain **envoie**. Jamais d'envoi autonome.
- L'IA ne répond que depuis les fiches de la galerie. Jamais un prix inventé.
- Pas de claim « vendez plus » tant que ce n'est pas mesuré sur des clients.
- « Le CRM se remplit tout seul » seulement pour ce que Good Artworks capte (§1).

---

## 3. Stack & commandes

- **Framework :** Next.js (App Router) + React + TypeScript
- **Bundler dev :** **webpack** (pas Turbopack — incompatible avec le setup)
- **Styling :** Tailwind CSS
- **Animation :** framer-motion
- **i18n :** deux systèmes coexistent, voir §6

```bash
npm run dev
```

Port défini dans `.claude/launch.json` (entrée `vitreen` sur 3001, entrée
`vitreen-3000` sur 3000).

Un hook pre-commit lance **Prettier en mode check** : lancer
`npx prettier --write` sur les fichiers touchés avant de committer, sinon le
commit est rejeté.

---

## 4. Arborescence

```
app/
  (en)/page.tsx           # Home EN
  (fr)/fr/page.tsx        # Home FR
  (en)/pricing, about, tools/*, solutions/[role]   # pages secondaires
  (fr)/fr/...                                      # idem FR
components/
  landing/                # sections de la home (voir §5)
  shared/ArtworkAddInMocks.tsx   # mockups Gmail / WhatsApp / import
  PricingPage.tsx, PricingPageFr.tsx
  ContactModal.tsx        # modale contact, i18n via useLang
lib/
  lang/strings.ts         # i18n des anciennes pages uniquement
  seo.ts
public/
```

### Dette connue

- `tools/viewing-rooms` : le nom de la page contredit la règle « jamais
  viewing room côté Good Artworks ». À renommer (« private selections ») ou retirer.
- `/about`, `/solutions/*` : discours antérieur au recentrage du 2026-09-28,
  à relire.
- Footer : garde une colonne « Vitreen Studio » qui pointe vers forart.world —
  à confirmer ou retirer.
- `GalleryOsSearchWidget` dans `ArtworkAddInMocks.tsx` : le texte affiché dit
  « Good Artworks », mais le **nom de la fonction** garde l'ancien nom.
- `.claude/launch.json` est suivi par git alors qu'il est propre à chaque
  machine/worktree.

---

## 5. La landing (`components/landing/`)

**Doctrine : la home est un récit linéaire, pas une home SaaS.**
Personne ne connaît Good Artworks. Ordre voulu :

1. **Reconnaissance** — le moment vécu : un collectionneur demande, le
   matériel est ailleurs, personne ne se souvient de ce qui a été envoyé.
2. **L'assistant démontré** — un brouillon groundé avec l'étape « Relire et
   envoyer » visible. Sobre : pas d'ombre, pas de couleur.
3. **L'installation** — comment ça se passe, une semaine environ.
4. **L'offre** — cartes galerie fondatrice / prix public, jamais de tableau comparatif.
5. **Un seul CTA** — prendre rendez-vous.

**État réel de `app/(en)/page.tsx` au 2026-09-28** — ne suit pas encore la
doctrine :

```text
LandingNav → LandingHero → LandingOutputs → LandingRecognition →
WhoVitreenIsFor → LandingOffers → LandingFaq → StatementSplit → LandingCta
```

- `LandingFaq` : la question « What is the difference between Send and
  Agent? » renvoie à d'anciens noms d'offre.
- Le hero (« Better tools for every way you sell art. ») et le titre de page
  (« Sales tools for art galleries ») sont antérieurs au recentrage.

**Règles de composition**

- Le texte est **inline dans les composants**, pas dans `lib/lang/strings.ts`.
  Toute modification doit être portée dans le composant EN **et** son jumeau FR
  (suffixe `Fr`).
- Rythme des fonds : alternance `bg-white` / `bg-[#F5F5F3]` d'une section à
  l'autre, avec `border-t border-[#E8E8E6]`. Vérifier l'alternance après tout
  ajout ou déplacement de section.
- `LandingOffers`/`LandingOffersFr` et `/pricing` montent tous le même
  composant `Offers` (`components/landing/Offers.tsx`, prop `lang`).
- `openContact` est exporté par `LandingNav` et réutilisé partout (EN et FR)
  pour piloter la même `ContactModal`, elle-même localisée via `useLang`.

---

## 6. Règles i18n

Deux systèmes coexistent :

1. **Landing (`components/landing/`)** — texte inline, un composant par langue.
   Modifier toujours la paire (`X.tsx` **et** `XFr.tsx`).
2. **Anciennes pages** — `lib/lang/strings.ts`, blocs `fr` et `en`. Toujours
   mettre à jour les deux.

Français : apostrophes courbes `’`, tirets cadratins `—`, guillemets `« »`.
Les mockups partagés acceptent des props de libellés pour rester dans la bonne
langue (`GalleryOsSearchWidget`, `WhatsAppPdfMockup`) — les passer côté FR.

---

## 7. Workflow Git & worktrees

- Branches : `main` (prod), branches de travail (`tuganV3` actuellement).
- Worktrees dans `.claude/worktrees/`, `npm install` après création.
- Prettier avant commit (voir §3).
- Commits en anglais, impératif, sujet court + corps explicatif.

---

## 8. Conventions UI / produit

- **Pas de mega-menu.** La nav est plate.
- Bordure du header : s'active au scroll uniquement.
- Pas d'icônes décoratives, pas de gradients, pas de faux dashboards.
- **Mockups : ne jamais inventer de composant.** Tout visuel (téléphone,
  WhatsApp, Gmail, mémoire, fiche œuvre…) se compose avec les mocks
  existants : `components/landing/conversations/ConversationSections.tsx`
  (WhatsAppScene, ChatHeader, ChatComposer, MemoryFeed, FeedRow),
  `components/shared/ArtworkAddInMocks.tsx`, `components/showcase/`,
  `components/SalesAssistantProductPage.tsx`. S'il manque une pièce, exporter
  ou étendre l'existant, jamais un sosie. Vaut aussi pour les maquettes HTML.
- Partout où l'agent apparaît, l'étape de validation humaine doit être
  **visible** (bouton « Relire et envoyer »), pas seulement affirmée.
- Visuels : uniquement la galerie de démo (Sacha Elron, Marie Beaumont…),
  jamais de vraies données client.

---

## 9. Tokens de design

| Usage                         | Hex                                        |
| ----------------------------- | ------------------------------------------ |
| Texte principal               | `#111110`                                  |
| Texte secondaire              | `#6B6A67`                                  |
| Texte tertiaire / placeholder | `#ADADAA`                                  |
| Bordure / séparateur          | `#E8E8E6` (variantes `#DCDCD8`, `#E1E1DE`) |
| Fond doux                     | `#F5F5F3`                                  |
| Fond                          | `#FFFFFF`                                  |

Classes partagées dans `components/landing/styles.ts` : `SECTION`, `CONTAINER`,
`EYEBROW`, `H2`, `H2_SUB`, `H3`, `BODY`, `BODY_SM`, `LINE_INK`. Les réutiliser
plutôt que de recréer des échelles typographiques.

- `font-display` pour les titres (cf. `app/layout.tsx`)
- Radius : `rounded-[12px]` cartes, `rounded-full` pills
- Ombre panneaux flottants : `shadow-[0_24px_60px_rgba(0,0,0,0.08)]`

---

## 10. Produit (hors de ce repo)

Le dashboard et l'assistant vivent dans **`/Users/raphael/Travail/Web/gallery-OS/dashboard/`**
— dépôt séparé. **Tout chantier produit se mène dans une session ouverte sur
ce dépôt-là, pas ici.** Vérifier son code avant d'affirmer qu'une capacité
existe ou non.

Repères au 2026-09-28 :

- Single-tenant : un projet/dataset Sanity par déploiement, une galerie par
  instance.
- Mémoire par collectionneur : `src/lib/conversations/memory.ts` (événements
  avec canal + œuvres), surface `src/app/workspace/conversations`.
- `src/lib/activity.ts` n'est qu'un flux de notifications — pas la mémoire.
- Capture : `src/lib/conversations/channels.ts` décrit ce que chaque canal
  capte et ne capte pas.
- Assistant : `src/lib/sales-agent/` (Groq, tool loop, groundé, validation
  humaine obligatoire) ; numéro assistant WhatsApp : `src/lib/whatsapp/`.
- Add-in Gmail : `gallery-OS/apps/gmail-addon/`.

**Plan produit (décidé 2026-09-28 ; priorités : playbook §31) : WhatsApp d'abord.**

0. Demander à 5 galeries : WhatsApp Business ou personnel ? ventes en groupes ?
1. Capter tout WhatsApp Business en **coexistence** Meta (même numéro, app +
   API, **180 jours d'historique** importés à l'installation → Conversations
   rempli dès le J1).
2. Conversations existe déjà comme écran d'accueil (« À suivre aujourd'hui »,
   semaine passée, carnet) : l'alimenter avec les messages WhatsApp.
3. Chat assistant : inventaire + mémoire, sources citées, envoi dans l'app
   WhatsApp avec message pré-rempli.
4. Gmail : inchangé pour l'instant.
5. Confiance et données (playbook §17) : export complet des données d'une
   galerie et suppression complète d'un collectionneur (fils et partages
   inclus, à vérifier), avant d'afficher cette promesse au public.

En pause tant que ça ne marche pas chez une vraie galerie : multi-tenant,
self-serve, publisher de site, expositions, tout nouveau module.

---

## 11. Roadmap

| Brique                                           | Statut                                       |
| ------------------------------------------------ | -------------------------------------------- |
| Inventaire + import CSV/Excel                    | ✅ Existe                                    |
| Add-in Gmail                                     | ✅ Fonctionnel                               |
| Numéro assistant WhatsApp                        | ✅ Fonctionnel                               |
| Assistant IA (brouillons groundés, validation)   | ✅ Live                                      |
| Sélections privées + PDF                         | ✅ Existe                                    |
| Mémoire collectionneur + Conversations           | ✅ Existe                                    |
| Capture Gmail                                    | 🟡 Fils ouverts + réponses suivies           |
| Capture WhatsApp (coexistence + 180 j)           | 🔴 Priorité — étape 1 du plan                |
| Conversations comme écran d'accueil              | ✅ Existe                                    |
| Assistant lit la mémoire sur toutes les surfaces | 🔴 Ensuite                                   |
| Home réécrite autour de la boucle                | 🔴 À faire (§5)                              |
| Élargir au-delà des galeries                     | 🟡 Plus tard, après la boucle (playbook §30) |
| Envoi autonome (autopilot)                       | ⛔ Jamais                                    |

---

## 12. Social content

Guides de rédaction par réseau dans `.claude/social/` :

- `README.md` — voix globale + matrice IG vs X
- `instagram.md` — ton « luxe calme », carrousels, stories
- `twitter.md` — voix founder, threads, building in public
- `references.md` — chiffres marché, comptes inspirants, glossaire

Lire le fichier concerné avant de rédiger un post. Build in public : chaque
post montre un maillon de la boucle qui vient d'être livré. Jamais de nom de
client sans accord, jamais de données de collectionneurs ni de prix réels.

---

## 13. Questions ouvertes

- [ ] Réponses des 5 galeries : WhatsApp Business ou personnel ? groupes ?
- [ ] RGPD avant la première connexion réelle : DPA, hébergement des
      données (Sanity), phrase de confiance pour la galerie
- [ ] Formulation de la promesse site une fois la capture WhatsApp livrée
- [ ] Réécrire la home EN/FR autour de la boucle (§5)
- [ ] Valider les montants (fondatrice 149 €, public 249 € / 199 € à l'année)
      après les trois galeries fondatrices
- [ ] Export complet des données d'une galerie : absent du produit, promis par
      la §17 du playbook et la FAQ pricing
- [ ] Chiffrer le coût par galerie (fournisseur WhatsApp, Sanity, inférence)
- [ ] Site connecté (à partir de 4 500 €) : garder, basculer vers R.R Studio,
      ou abandonner
- [ ] Commandes lint / test / build une fois stabilisées
- [ ] Documenter l'API contact (`/api/contact`)
