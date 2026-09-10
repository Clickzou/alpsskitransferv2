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
| Français | home + **10 stations** + **17 trajets** + **3 articles** + pages de conversion, service, juridique et la page locale VTC Chambéry |
| Allemand | home + **7 stations** + **8 trajets** + **9 pages** + **2 articles**, tunnel compris — l'Autriche est sortie le 10 septembre, quatre skiorts suisses l'ont remplacée |
| Italien | home + **11 stations** + **16 trajets** + **3 articles** + pages de conversion, service et juridique |
| Blog | **3 articles × 4 langues** — chacun adapté à son marché, pas traduit |
| Home | **au design validé** par le client |
| Stations, trajets, hubs, pages fonctionnelles | **au design de la home** (8 septembre) |
| Moteur de réservation | **au niveau du concurrent** (autocomplétion, adresse libre, bagages, retour asymétrique, devises) — reste à brancher Stripe et Supabase |

## Fait le 9 septembre

**Le site parle quatre langues.** Le socle n'en gérait que deux : une seule
alternative par page (`alternate?: {lang, path}`) et `lang === "fr"` en dur dans
l'en-tête et le pied de page. À quatre langues, chaque page n'aurait déclaré qu'une
seule de ses trois voisines à Google, et chaque libellé serait devenu une échelle de
ternaires.

Ce qui a changé de forme :

- `Resort.fr` / `Transfer.fr` / `Article.fr` deviennent `traductions`, indexées par
  langue. Ajouter une langue est désormais une ligne de données, pas une branche.
- `pageMetadata` prend `alternatives[]` et construit un groupe hreflang complet et
  réciproque, la page courante comprise.
- `src/lib/intl/liens.ts` calcule ces paires **en un seul endroit** : le hreflang des
  metas et le sélecteur de langue de l'en-tête montrent forcément le même groupe. Les
  faire diriger par deux calculs séparés, c'était se garantir qu'ils divergent.
- Les gabarits traduits (accueil, station, trajet, page de conversion, blog, tunnel)
  sont des composants partagés. Next impose un segment statique par langue, donc trois
  arborescences de routes — elles ne contiennent que des aiguillages de quinze lignes.

**Allemand et italien, écrits pour leur marché.** L'allemand partait d'Innsbruck, de
Salzbourg et de Zurich vers le Tyrol, l'Arlberg et la Suisse alémanique — **l'Autriche
est sortie du périmètre le 10 septembre 2026**, il ne lui reste que Zermatt, Davos et
St. Moritz depuis Zurich et Genève ; l'italien de
Turin, Milan et Bergame vers la Vallée d'Aoste, le Piémont et la Via Lattea. Ce ne sont
pas des traductions du français : le périmètre, les exemples et la réglementation
hivernale citée diffèrent. Toutes les distances viennent de `data/distances.ts`.

Deux choses que ces pages disent et qu'un comparateur ne dit pas : où la voiture
s'arrête vraiment (Zermatt s'arrête à Täsch, la Val Ferret est fermée l'hiver au trafic
privé), et quel aéroport est réellement le plus proche — Turin pour Serre Chevalier,
Innsbruck pour la Val Gardena — y compris quand cela raccourcit la course.

**Le blog suit, deux articles par langue.** « Quel aéroport ? » devient en allemand
Innsbruck contre Munich contre Friedrichshafen, avec le déroutement fréquent d'Innsbruck
comme argument ; en italien, Turin contre Malpensa, avec le péage du tunnel comme
critère de comparaison. Les stations sans voiture sont passées en allemand parce que
Zermatt, Wengen, Mürren, Saas-Fee, Bettmeralp et Stoos sont toutes en Suisse alémanique.

Deux champs ajoutés à `TraductionArticle` pour que cela tienne : `stationsLiees`, parce
qu'un article allemand sur le Tyrol n'a rien à dire de Val Thorens et que la liste
anglaise, filtrée sur les stations traduites, serait tombée à zéro ; et `altVisuel`,
parce que l'image est la même montagne mais son texte alternatif ne peut pas rester
anglais sur une page qui se déclare allemande.

**Le nettoyage « pas de transfert partagé » n'avait porté que sur l'anglais.** La page
`/fr/transferts-prives/` était entièrement bâtie sur la comparaison privé/partagé, et
l'article français la reprenait. Les deux sont refaits. Corrigé au passage un artefact
du nettoyage anglais : un paragraphe de l'article répétait deux fois la même phrase.

**Deux défauts de hreflang corrigés** : `x-default` sortait en URL doublée sur les pages
anglaises, et `/de/blog/` comme `/it/blog/` existaient sans aucun article. Les index
vides répondaient 404 et sortaient du menu ; depuis la publication des articles, ils
sont revenus d'eux-mêmes — l'entrée est dérivée du registre, personne ne l'a rallumée.

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

## Où reprendre — 8 septembre au soir

**Prochaine séance : la page `/book-ski-transfer-tickets/`**, puis les autres
onglets du menu. JC valide la home (les avis attendent la fiche Google) et a
demandé de traiter les onglets avant les pages de station.

Ce qui est déjà établi sur cette page, à ne pas rechercher :

- **Elle n'est pas vide.** Elle contient 927 mots repris du WordPress. Elle
  *paraissait* vide à cause du seuil d'apparition au défilement — corrigé.
- **Trois titres y sont orphelins** : « Most popular routes » et « Our vehicles »
  portaient des blocs dynamiques du thème, que la migration ne reprend pas, et
  « Frequently asked questions… » double le titre de la section FAQ, que
  `separerFaq` sort déjà du corps.
- **Les listes du WordPress ont été aplaties en paragraphes**, avec leurs
  marqueurs : `✅`, `✔`, `1️⃣`. Mesuré sur tout le site — **60 signes dans les
  pages fonctionnelles, 188 dans les stations, 400 dans les trajets**. C'est
  systémique : la correction va dans `scripts/_wordpress.mjs` (une étape de
  normalisation après `assembler`), pas dans les 122 fichiers produits.
- **Mots collés** : « type)Up to 8 passengers », « SedanUp to 4 passengers ».
- Attention avant de relancer `migrer:stations` : 38 des 73 modules de station
  sont écrits à la main. Le garde-fou de l'index ne protège que `rediges.ts`.

Pour revoir la mise en page de l'original, la capture se refait en une commande
(le site refuse un navigateur sans agent utilisateur complet, d'où le `userAgent`
dans le script de capture du bloc-notes de session).

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

   *Fait le 8 septembre au soir* : le nouveau logo (bleu nuit et or) et son
   favicon, l'or du logo posé par touches sur ce qui ne se clique pas — surtitres,
   étoiles, filets — le vert et le magenta conservés dans leurs rôles, les
   sections de la home en pleine largeur à 100 px des bords, l'apparition au
   défilement sur les sept types de page, et le moteur de recherche à saisie
   libre avec suggestions d'adresses réelles. **La home est validée par JC**,
   à l'exception des avis, qui attendent la fiche Google.

   *Reste à faire* : les onglets du menu (en cours), puis les pages de station
   (les plus longues), les trajets, les hubs, le blog et le tunnel. Puis une
   passe de contrôle sur les quatre largeurs.

   Un essai de palette entièrement bleu nuit et or vit sur la branche
   `essai-palette-or` — écarté, mais conservé. Il a montré une chose utile :
   l'or exact du logo plafonne à 2,3:1 sur blanc, il ne peut donc pas porter de
   texte.
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

**~~Question du 9 septembre~~ — tranchée le 10 septembre 2026 : le `hreflang` de
l'article « quel aéroport » est **conservé**.** Les quatre versions restent un seul
groupe. Le raisonnement est écrit en tête de `src/lib/articles/quel-aeroport-alpes.ts` :
`hreflang` couvre l'adaptation régionale et pas seulement la traduction littérale ;
un groupe jugé trop divergent est ignoré par Google, jamais pénalisé, quand le
couper coûte à coup sûr quatre pages orphelines et un lecteur allemand renvoyé sur
l'anglais ; et la version allemande, réécrite sur la Suisse après la sortie de
l'Autriche, est aujourd'hui plus proche des trois autres qu'au moment de la question.
**Le seul signal qui justifierait de revenir dessus** : ces URL signalées « page en
double sans URL canonique choisie par l'utilisateur » dans la Search Console.

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

## La bascule

La séquence du jour J vit dans **`docs/MISE-EN-LIGNE.md`** : ce qui doit être
réglé avant de toucher au DNS, l'ordre des opérations — le domaine d'abord,
l'indexation ensuite —, la recette des redirections en ligne et les trois
semaines de surveillance qui suivent. Le site est fermé aux moteurs par défaut
(`NEXT_PUBLIC_INDEXATION`), et le prebuild rappelle son état à chaque build.

## Calendrier

Livraison **début octobre 2026**, site et moteur ensemble. Les réservations se
concentrent en décembre : la date ne peut pas glisser.
