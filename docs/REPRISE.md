# Point de reprise — 8 septembre 2026

Tout est enregistré, le build passe : 269 pages, 49 tests, couverture des 261 URL
vérifiée. **Ce fichier dit où reprendre.**

> **Convention de reprise avec JC.**
> « On en est où ? » → lire ce fichier et résumer l'état, sans rien lancer.
> « Go » → enchaîner sur le point 1 de « À reprendre », sans redemander confirmation.

## Où en est le site

| | État |
|---|---|
| Socle Next 16 / React 19 / Tailwind, en statique | livré |
| Plan de redirections | 191 règles, **couverture 261/261**, contrôlée à chaque build |
| Stations | **68 / 68** : 35 reprises du WordPress, **33 rédigées** |
| Trajets | **104** : 89 repris, **15 rédigés** (les liaisons Genève de l'audit) — **0 inerte** |
| Hubs pays et hubs aéroport | 5 + 31 — les **10 aéroports qui portent le trafic** ont un contenu rédigé |
| Pages fonctionnelles conservées | 14 |
| Français | home + **10 stations** + **16 trajets** + **2 articles** + **6 pages de conversion**, tunnel compris |
| Blog | **3 articles** en anglais, **2 en français** |
| Home | **au design validé** par le client |
| Stations, trajets, hubs, pages fonctionnelles | **au design de la home** (8 septembre) |
| Moteur de réservation | **au niveau du concurrent** (autocomplétion, adresse libre, bagages, retour asymétrique, devises) — reste à brancher Stripe et Supabase |

## Fait le 8 septembre

**Le design de la home est décliné sur tout le silo.** Les motifs de la maquette
(bandeau photo voilé de bleu nuit, réassurance à coches vertes, sections à fonds
alternés, cartes de lien, FAQ en accordéon, bande verte d'appel à l'action) vivent
dans `src/components/gabarit/Sections.tsx` et servent les pages de station, de
trajet, les deux hubs, les pages fonctionnelles et la station française. La home
les emprunte au même endroit — une correction de design se fait en un seul point.

Ce que la mise en page ajoute au passage, et qui n'existait pas : les distances et
durées de route dans le bandeau et sur chaque carte de trajet, une colonne d'appoint
qui garde le choix de l'aéroport sous les yeux pendant la lecture, le maillage vers
les stations voisines du même pays et vers les autres aéroports qui desservent la
station, et le fil d'Ariane passant par le hub pays. Contrôlé sur cinq gabarits :
un seul H1 par page, aucun débordement horizontal sur iPhone 13.

**Val Thorens est écrite.** La station la plus recherchée des Alpes françaises avait
zéro page : son URL WordPress `val-thorens-2` porte le contenu Courchevel, et part donc
en 301 vers Courchevel. La nouvelle page fait ≈ 1 550 mots — réponse directe en tête,
comparatif des cinq aéroports, le dernier tronçon depuis Moûtiers, l'équipement hiver,
privé ou partagé, FAQ de 7 questions. Toutes les distances et durées sortent de
`src/data/distances.ts` ; **aucun prix n'est annoncé** tant que le barème n'est pas
validé. Elle active 5 pages de trajet restées inertes : Chambéry, Genève, Grenoble,
Lyon, Turin.

Elle est déclarée dans `src/lib/resorts/rediges.ts`, **hors du bloc régénéré** par
`npm run migrer:stations` — le script réécrit `index.ts` à chaque exécution et l'aurait
effacée. Le script a été ajusté pour ne réécrire que son propre bloc.

**Reste sur le sujet du design** : le contenu migré du WordPress contient des
émojis ✅ en tête de puce, qui doublonnent avec les coches vertes du gabarit (visible
sur Andermatt, Genève → Chamonix). C'est le script de migration qu'il faut corriger,
pas les 124 modules produits.

**Le moteur de réservation est écrit.** Le tunnel `/booking/` (en `noindex`) mène en
trois étapes du trajet au prix par véhicule puis aux coordonnées ; `POST /api/devis/`
donne le prix des trois catégories, `POST /api/reservation/` recalcule le montant côté
serveur, pose une référence `AST-xxxxxx`, écrit dans Supabase et envoie les e-mails ;
`POST /api/stripe/webhook/` vérifie la signature avant de marquer une course payée.
Stripe Checkout est écrit et s'activera seul quand le barème sera validé.

**Sans dépendance nouvelle** : Stripe et Supabase en REST avec `fetch`, signature du
webhook avec `node:crypto`. Le prix ne vient jamais du navigateur — le tunnel envoie
un trajet, le serveur calcule le montant. Le drapeau
`NEXT_PUBLIC_MOTEUR_RESERVATION` fait basculer tous les boutons du site entre le
tunnel maison et le repli WooCommerce, sans toucher au code.

**Le silo anglais est complet.** Les 32 stations qui manquaient sont écrites —
15 françaises, 10 suisses, 5 italiennes, 2 autrichiennes — ce qui a débloqué les
29 pages de trajet restées inertes faute de page mère. Les **15 liaisons au départ de
Genève** que l'audit désignait comme le gisement le plus rentable sont écrites elles
aussi. **Plus une seule 301 n'aboutit sur du 404.**

**Le blog a ses trois articles** : le comparatif des aéroports des Alpes françaises
(avec les distances réelles vers 22 stations), les stations sans voitures et comment on
y arrive vraiment, et ce qu'il faut vérifier avant de payer un transfert. Chacun maille
vers les stations qu'il cite, et chaque page de station affiche en retour les articles
qui la mentionnent.

**Le français est ouvert** : la home, 10 stations et 16 trajets au départ de Genève et
de Lyon, en contenu écrit et non traduit mot à mot. Les pages de trajet françaises
vivent sous `/fr/transferts-ski/{station}/{aéroport}/` — forme courte, aucune
antériorité d'URL à préserver de ce côté. Le `hreflang` n'est émis que sur les paires
qui existent réellement, et le pied de page français signale d'un `(EN)` les pages qui
restent en anglais.

**Trois pièges de tuyauterie traités au passage**, tous du même genre : les scripts de
migration réécrivent leurs blocs générés, et tout ce qui est écrit à la main doit vivre
ailleurs. D'où `resorts/rediges.ts`, `transfers/rediges.ts`, et les deux fichiers
`traductions-fr.ts`, fusionnés dans les index. Une migration relancée n'efface plus rien.

**Deux erreurs de données corrigées** : le géocodage de Saint-Gervais pointait un hameau
près de Grenoble (30 km de l'aéroport au lieu de 170), et le contrôle de redirections
comptait 31 faux positifs sur les hubs d'aéroport, ce qui masquait les vrais.

**Les 91 pages `/destination/` ont été examinées, pas supposées.**
`npm run destination:analyser` compare leur texte au contenu déjà publié, par
n-grammes de huit mots. Verdict : 522 mots en moyenne, mais du texte générique et
des chiffres faux — « Chamonix, 1 hour » quand la route en demande 1 h 25. **Rien à
reprendre**, leurs 301 suffisent. Le script reste au dépôt : c'est la preuve du
constat, pas une intuition.

**Ce que l'analyse a révélé en revanche**, c'est que nos **31 hubs d'aéroport
n'avaient aucun texte** — un titre, une phrase générée, un tableau. Les 10 aéroports
qui portent le trafic (Genève, Chambéry, Lyon, Grenoble, Turin, Zurich, Innsbruck,
Salzbourg, Milan Malpensa, Bergame) ont désormais un contenu rédigé dans
`src/lib/airports/contenus.ts` : point de rendez-vous, ce que l'aéroport dessert le
mieux, les particularités de la route en hiver, une FAQ. Le hub de Genève passe de
350 à 1 300 mots.

**Le blog français existe** : deux des trois articles sont adaptés — pas traduits mot
à mot — avec leur route `/fr/blog/{slug}/` et les `hreflang` croisés dans les deux
sens. Le troisième (stations sans voitures) reste en anglais : il parle surtout à une
clientèle britannique.

**Audit avant / après réalisé** — `docs/audit-refonte-2026-09-08.md`, mesures
reproductibles par `npm run audit:seo`. Résultat : 0 title manquant ou trop long
(contre 29 et 24), 0 page à double H1 (contre 91 au moins), 0 image sans alt,
252 pages avec données structurées (contre 0), et **+80 % de contenu** — 207 000
mots contre 114 000, 810 par page contre 440. Les défauts trouvés au passage ont
été corrigés dans la foulée : six meta descriptions vides, un title à 64
caractères, deux pages orphelines, `&amp;` non décodé sur la page CGV, `/fr/blog/`
absent du sitemap, et les hubs pays sous les 300 mots.

**Le multilingue a été tranché sur données** : alps2alps affiche quatre langues
mais publie **1 853 pages anglaises sur 1 946 (95 %) et 31 françaises (1,6 %)** —
aucune page de station traduite, seulement des trajets au départ de Genève et de
Lyon et des pages de conversion. Recommandation : ne pas traduire les 160 pages
restantes, compléter le tunnel de conversion en français (6 pages), puis mesurer
trois mois avant d'étendre.

**Le moteur a rattrapé le concurrent, et le dépasse sur deux points.** Ajouté le
8 septembre : l'autocomplétion sur un seul champ (34 aéroports et 68 stations,
recherche sans accents, navigation au clavier, ARIA), l'acceptation d'une adresse
libre — gare, hôtel, adresse exacte — qui bascule proprement en demande de devis,
les valises et housses à skis déclarées **avant** le devis (elles écartent les
véhicules dont le coffre ne suffit pas), le retour vers un autre point que
l'aller, et l'affichage en EUR, GBP ou USD. Six tests de plus verrouillent ces
règles, 49 au total.

Ce que le concurrent ne fait pas : dire honnêtement qu'il ne sait pas chiffrer.
Notre tunnel ne propose que les liaisons dont la distance est mesurée ; tout le
reste part en devis plutôt qu'en prix approximatif. Et notre page pèse 151 Ko
contre 501 Ko chez lui, sans widget tiers.

**Le tunnel est bilingue** : un seul composant, un seul calcul, un dictionnaire de
libellés (`lib/reservation/textes.ts`). Le dupliquer pour le traduire aurait
garanti que les deux versions divergent au premier correctif.

**Six pages de conversion françaises** publiées, conformément à ce que l'audit du
concurrent recommandait : `/fr/reserver/` (le tunnel), comment réserver, privé ou
partagé, aide, contact, et agences et professionnels — le levier B2B francophone.
Les pages juridiques restent en anglais : les traduire sans validation juridique
créerait deux versions divergentes d'un même engagement, et le pied de page le
signale par un `(EN)`.

## À reprendre, dans l'ordre

**Ordre de travail arrêté avec JC le 8 septembre : d'abord toutes les pages, ensuite le
design, la technique en dernier.** Les pages sont faites.

1. **Le design des pages produites** — chantier en cours, décidé avec JC. Priorité
   choisie : la home et l'identité générale d'abord, un visuel par station préparé
   au build.

   *Fait le 8 septembre* : les polices (Newsreader + Inter, jamais chargées jusque-là),
   l'échelle typographique et le rythme vertical de `tailwind.config.ts`, l'anneau de
   focus et l'héritage de couleur des titres dans `globals.css`, les 56 visuels
   préparés et branchés par `lib/visuels.ts`, l'en-tête collant avec lien d'évitement
   et navigation mobile, le pied de page avec bandeau d'appel, et la home reprise
   section par section : voile du bandeau, trois chiffres clés, présentation en deux
   colonnes avec chapô et pastilles d'aéroports, cartes de véhicules à format constant,
   trajets populaires groupés par aéroport avec distance et durée, stations phares
   rendues cliquables (7 liens internes de plus depuis la home).

   *Reste à faire* : la déclinaison sur les gabarits intérieurs — pages de station
   (les plus longues), pages de trajet, hubs pays et aéroport, blog, tunnel de
   réservation. Puis une passe de contrôle sur les quatre largeurs.
2. **Le moteur de réservation** — écrit et testé, à brancher : créer les tables
   (`docs/supabase-schema.sql`), poser les clés Stripe de test, jouer une réservation
   de bout en bout (session, carte 4242…, webhook signé, e-mails, ligne `payee`), puis
   le back-office. Reste aussi à protéger le formulaire public du spam.
3. **Ce qui reste côté contenu** : les 21 hubs d'aéroport secondaires n'ont toujours
   que leur tableau de dessertes (suffisant pour l'instant — ils portent peu de
   trafic), et le troisième article n'a pas de version française.
4. **Trois points qui n'attendent que le client** : les avis (aucune preuve sociale
   quand le concurrent en affiche trois), le téléphone et l'e-mail, et les taux de
   change de `lib/reservation/devises.ts`, figés au 8 septembre 2026 et à rafraîchir
   avant la mise en ligne.

## Ce qui attend une réponse du client

- **Le barème et les coefficients** (`wp-export/tarifs-a-valider.csv`).
  `BAREME_VALIDE = false` : le moteur affichera des prix mais n'encaissera pas tant
  que ce n'est pas validé.
- **Téléphone et e-mail de l'entreprise** (`src/data/site.ts`). Ils manquent au
  footer, aux données structurées et à la fiche Google.
- **Quelle entité opère réellement les transferts** — préalable juridique à la fiche
  Google Business, et question du compte qui encaisse.
- **Les avis** : les 4 témoignages repris de la home ne sont rattachés à aucune
  plateforme. À sourcer, ou à remplacer par un flux Trustpilot ou Google.

## Trois points de méthode à ne pas réapprendre

- **Le dépôt n'est pas versionné.** 200 fichiers, aucun `git init`. À faire avant
  d'aller plus loin.
- **Un seul processus par dossier `.next`.** `next dev` et `next build` y écrivent
  tous les deux : un build lancé pendant qu'un serveur tourne lui retire ses
  fichiers, et deux serveurs de développement se corrompent mutuellement — le
  symptôme est un 500 sur la feuille de styles, puis un serveur qui ne répond plus.
  `next.config.ts` lit désormais `NEXT_DIST_DIR`, et trois dossiers coexistent :
  `.next` pour `npm run dev` (celui de JC, port 3002), `.next-dev-agent` pour
  `npm run dev:agent` (celui de l'assistant, port 3003), `.next-build` pour
  `NEXT_DIST_DIR=.next-build npm run build`. Vercel ne définit pas la variable et
  construit dans `.next`, comme attendu.
- **Playwright n'est pas une dépendance de ce projet** : les captures et les
  contrôles de rendu empruntent celui du site Clickzou
  (`2- SITE CLICKZOU/SITE IA/clickzou-v2/node_modules`) via `createRequire`, les
  navigateurs étant déjà installés sur la machine. Trois dépendances de production,
  c'est aussi trois dépendances de développement de moins.
- **Chrome headless ne rend pas une fenêtre sous ~500 px sur Windows** : une capture
  demandée en 390 px est rendue à 500 puis recadrée, ce qui simule un débordement
  horizontal inexistant. Pour vérifier un rendu mobile, passer par Playwright avec
  `devices["iPhone 13"]` et comparer `scrollWidth` à `clientWidth`.

## Calendrier

Livraison **début octobre 2026**, site et moteur ensemble. Les réservations se
concentrent en décembre : la date ne peut pas glisser.
