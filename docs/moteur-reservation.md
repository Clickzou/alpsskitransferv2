# Moteur de réservation — spécification

Décision du 7 septembre 2026, validée par le client : **formulaire de réservation
maison en Next.js + Stripe Checkout**, en remplacement du tunnel WooCommerce.

## Pourquoi pas Shopify

Shopify vend des articles avec un prix et un stock. Alps Ski Transfers vend un
trajet daté : aéroport, station, date, heure, numéro de vol, passagers, bagages et
skis, véhicule, aller simple ou retour, tarif majoré le samedi. Le catalogue
WooCommerce actuel compte **119 556 lignes** pour couvrir ces combinaisons — c'est
la trace de ce qui arrive quand on force un moteur de transfert dans un moteur de
produits. Shopify rejouerait la même impasse, avec en plus 32 à 36 € HT par mois,
2,9 % + 0,30 € par transaction, et une app de réservation tierce payante pour
rattraper les dates.

Les plateformes white-label du secteur (type Transferz) se rémunèrent en commission
sur chaque réservation : pour une entreprise qui a déjà sa clientèle et ses tarifs,
c'est louer son propre chiffre d'affaires.

## Ce qui rend la solution maison réaliste

**Il n'y a pas de stock à gérer.** Pas de disponibilité en temps réel, pas
d'affectation de chauffeurs à automatiser : c'est une demande de transfert payée
d'avance, exactement ce que fait le WooCommerce actuel. Le module à écrire est un
formulaire et un paiement, pas un système de dispatch.

## Calendrier : tout en un mois, avec un repli

Décision de JC du 7 septembre 2026 : **livraison complète début octobre 2026**, site
et moteur de réservation ensemble. Le découpage en deux saisons initialement proposé
est abandonné.

Le risque assumé est clair : un moteur de paiement neuf entre en service quelques
semaines avant le pic de réservations de décembre. Un bug de tarif ou de webhook ne
se traduit pas par une page moche, mais par des réservations perdues ou encaissées
de travers, en pleine saison.

**Le filet, non négociable :** le tunnel WooCommerce est déplacé sur
`book.alpsskitransfers.com` et **reste en service comme repli** jusqu'à ce que le
nouveau moteur ait encaissé une série de réservations réelles sans incident. Une
variable d'environnement suffit à renvoyer les boutons de réservation vers l'un ou
l'autre : la bascule et le retour arrière se font en une minute, sans redéploiement.

WordPress est éteint une fois ce délai de garde passé — pas le jour de la mise en
ligne.

Conséquence sur l'ordre des travaux : les tarifs et le moteur passent **avant** la
production éditoriale. Une station dont le contenu n'est pas encore migré ne fait pas
de page, mais un trajet dont le tarif est faux fait perdre de l'argent.

## Modèle tarifaire — décidé le 7 septembre 2026

**Prix = prise en charge + distance × taux au kilomètre**, majoré selon le moment,
avec un **prix fixe par trajet qui prime** quand le client tient à son prix. La
distance vient d'une API d'itinéraire. Un **dashboard** permet d'éditer le barème
sans déploiement.

Ce que le WordPress faisait, et pourquoi on ne le reprend pas tel quel :
- Son barème (option `transfer_rates`) était un taux au km **seul** : 2,90 €/km en
  standard, 3,40 le samedi. Ni dimanche, ni nuit.
- Il plaçait `premium` (2,70) **sous** `standard` (2,90) — inversion de saisie.
- Appliqué aux distances réelles, il donnait **30 à 45 % de plus que les prix
  affichés sur les pages** : 377 € calculés contre 220 € annoncés sur
  Chambéry → Chamonix, sur **77 trajets sur 85**.
- Sa clé Google Maps était **vide** : le calcul par distance ne pouvait de toute
  façon pas s'exécuter.

Le barème par défaut (`src/lib/tarification/bareme.ts`) est donc **calibré par
régression sur les 85 prix réellement publiés** : `92 € + 1,18 €/km` en standard,
ce qui les reproduit à ±15 % sur 50 trajets. L'ajustement reste imparfait, et c'est
un enseignement en soi : **les prix actuels ne suivent aucune règle** — de 1,16 à
3,27 €/km, avec deux trajets comparables du simple au double (170 km à 450 €,
190 km à 220 €). D'où le prix fixe par trajet, qui laisse au client ses exceptions.

| Paramètre | Défaut | Origine |
|---|---|---|
| Prise en charge standard | 92 € | régression sur les prix publiés |
| Taux standard | 1,18 €/km | idem |
| Business / Premium | ×1,2 / ×1,5 | rapports du barème WordPress, inversion corrigée |
| Majoration samedi | +17 % | rapport 3,40/2,90 du barème WordPress |
| Majoration dimanche | +8 % | nouveau — n'existait pas |
| Majoration nuit (22 h-6 h) | +20 % | nouveau — n'existait pas |
| Part par personne en partagé | 21,4 % | médiane observée sur les prix publiés |
| Remise aller-retour | **aucune** — proposée à −5 % sur le retour, retirée le 10 septembre 2026 faute de validation | à trancher |

**Garde-fou : `BAREME_VALIDE = false`.** Tant que le client n'a pas confirmé, le
moteur calcule et affiche, mais **n'encaisse pas** — le parcours se termine en
demande de devis. Seul un trajet à prix fixe convenu est encaissable. Mieux vaut un
devis qu'une réservation payée au mauvais prix.

Le calcul est une **fonction pure**, testée (`calcul.test.ts`, 19 cas, exécutés au
prebuild) : le prix affiché et le prix encaissé sortent du même endroit. C'est
exactement l'écart qui a produit 4 remboursements sur 10 commandes.

### Trois niveaux de prix

Le client l'a signalé et les chiffres le confirment : **certaines destinations
coûtent plus cher que leur distance ne le laisse penser** — accès difficile, route
de col, retour à vide, station sans voitures. D'où trois niveaux, du général au
particulier :

1. **Le barème** : prise en charge + distance × taux, majoré selon le jour et l'heure.
2. **Un coefficient par destination**, qui capture le surcoût réel d'une station.
   Mesuré sur les 85 prix publiés : le barème seul laisse **14,1 %** d'erreur
   moyenne, le barème × coefficient la ramène à **5,7 %** — et 61 trajets sur 85
   tombent à ±10 % du prix réel. Le coefficient est **stable d'un aéroport à
   l'autre** pour 10 des 13 stations desservies par au moins trois aéroports : c'est
   une politique de prix, pas du bruit. Zermatt ×1,25, Méribel ×1,16, Sölden ×0,78.
3. **Un prix fixe par trajet**, qui prime sur tout le reste, pour les exceptions que
   le client veut garder telles quelles.

Les trois niveaux s'éditent depuis le dashboard. Le coefficient est le bon endroit
pour dire « Zermatt, c'est plus cher » une fois, plutôt que de retoucher les
quinze trajets qui y mènent.

### Distance

**Aucune clé d'API n'est nécessaire.** Les distances routières des ~2 100 liaisons
aéroport → station sont calculées une fois pour toutes avec OpenStreetMap —
géocodage Nominatim, routage OSRM, deux services publics gratuits — et figées dans
`src/data/distances.ts` par `npm run distances:calculer`. Le site lit une table, il
n'appelle rien au runtime.

`src/lib/tarification/distance.ts` interroge dans l'ordre : le cache, la table
calculée, les distances publiées sur les anciennes pages, puis l'API Google
Distance Matrix si une clé est fournie. Une distance indisponible dégrade le
parcours vers une demande de devis, elle ne casse pas la page.

Une clé Google ne devient utile que pour du **porte-à-porte à l'adresse exacte** —
un raffinement, pas un prérequis.

## Parcours cible

1. **Recherche** — départ (aéroport ou station), destination, date et heure
   d'arrivée, nombre de passagers. Le formulaire vit sur les pages de trajet, qui
   pré-remplissent départ et destination.
2. **Tarif** — lecture dans la table des prix : paire × type de véhicule × jour
   (semaine / samedi / dimanche) × aller simple ou retour. Prix ferme par véhicule,
   affiché avant toute saisie de coordonnées.
3. **Détails** — numéro de vol, bagages et skis, sièges enfant, adresse exacte en
   station, téléphone.
4. **Paiement** — redirection vers **Stripe Checkout** (page hébergée par Stripe :
   aucune donnée de carte ne transite par le site, la conformité PCI reste chez
   Stripe).
5. **Confirmation** — webhook Stripe → enregistrement de la réservation → e-mail au
   client et à l'exploitant.

## Modèle de données (Supabase)

| Table | Contenu |
|---|---|
| `tarifs` | paire aéroport ↔ station, véhicule, type de jour, prix, capacité |
| `reservations` | référence, trajet, date et heure, vol, passagers, options, montant, statut |
| `clients` | nom, e-mail, téléphone, langue |
| `paiements` | id de session Stripe, montant, statut, date, remboursements |

Supabase parce que c'est déjà l'outil de la maison Clickzou, et que son offre
gratuite couvre largement ce volume au démarrage.

Source des tarifs : **pas les CSV du dossier `Prix tarnsfers/`** — ils forment un
produit cartésien 82 × 82 dont la colonne prix est très majoritairement vide ou à
« ENTER PRICE ». Les prix réels sont dans la base WooCommerce (`database.sql` de la
sauvegarde `.wpress`), à extraire avec `npm run wp:extract`.

## Coûts d'exploitation

- **Stripe** : aucun abonnement. De l'ordre de 1,5 % + 0,25 € sur une carte
  européenne, 2,5 à 3,25 % sur une carte britannique ou hors zone — à confirmer
  selon l'entité qui facture. La clientèle étant majoritairement UK, c'est le taux
  hors zone qui pèsera : à vérifier avant de figer les prix de vente.
- **Supabase** : gratuit au démarrage.
- **Vercel** : gratuit ou plan Pro selon le trafic.
- **WordPress** : à couper à l'issue de la phase 2.

## Arbitrages — tranchés le 7 septembre 2026

1. **Paiement intégral** à la réservation. Pas d'acompte : c'est ce que fait déjà le
   WooCommerce actuel, et c'est le plus simple à réconcilier.
2. **Aller-retour réservable en une fois**, dès la V1. C'est la norme du transfert de
   ski — le client repart par le même aéroport — et l'absence de ce parcours ferait
   perdre une part importante des ventes. Une réservation porte donc un ou deux
   trajets.
3. **Compte Stripe déjà ouvert.** Aucun délai de vérification à absorber : les clés
   se posent dans `.env.local` (voir `.env.example`), jamais dans le dépôt.
4. **Back-office** réduit à une liste des courses à venir, filtrable et exportable.
   Pas d'application chauffeur. **Chaque ligne montre le trajet en entier** —
   demande explicite de l'exploitant, 10 septembre 2026 : « sur le site aussi le
   plus important c'est le suivi client, avec l'ancien logiciel on ne voyait pas
   la destination de la course, je devais les contacter à chaque fois pour
   demander le trajet ». Une liste de courses qui oblige à rappeler le client
   pour savoir où il va n'est pas un back-office, c'est un carnet de rendez-vous.

   Les colonnes minimales, dans cet ordre de lecture : date et heure de prise en
   charge, **aéroport de départ → station d'arrivée**, **adresse exacte en
   station**, nom du passager, téléphone, numéro de vol, nombre de passagers,
   véhicule, housses à skis, statut de paiement, référence. Le message libre et
   l'âge des enfants suivent en second rang.

   **Les données sont déjà là** : la table `reservations` écrite par
   `/api/reservation/` porte `airport`, `resort`, `adresse`, `vol`, `aller`,
   `retour`, `client_telephone` et le reste (voir `src/app/api/reservation/route.ts`).
   Il ne manque que l'écran — c'est un travail d'affichage, pas de modèle de
   données, et le point est donc tranché sans coût supplémentaire.
5. **Remboursements** faits à la main depuis le tableau de bord Stripe, avec une
   politique d'annulation affichée sur le site.
6. **Euro seul** à l'affichage et à l'encaissement.

**Ce module est inclus dans les 900 € du devis** et doit être livré en un mois avec
le reste. Les six questions ci-dessus ne changent donc plus le prix ni le délai :
elles changent seulement ce qui entre dans la V1. À défaut de réponse, les valeurs
retenues sont les plus simples — paiement intégral, aller-retour supporté (c'est la
norme du transfert de ski), back-office réduit à une liste exportable **montrant le
trajet complet**, remboursements faits à la main dans Stripe, euro seul.

Le point 6 est le seul vrai bloquant : **le compte Stripe ne s'ouvre pas sans savoir
quelle entité encaisse.** À lancer le premier jour, la vérification d'identité prend
plusieurs jours ouvrés.

## État au 8 septembre 2026 — ce qui est écrit

| Brique | État |
|---|---|
| Calcul du prix (barème × coefficient, prix fixe, majorations) | livré, 24 tests |
| Devis d'une réservation, aller **et** retour à leurs propres dates | livré, 13 tests — `src/lib/reservation/devis.ts` |
| Validation des demandes venues du navigateur | livré — `demande.ts` |
| API de devis `POST /api/devis/` | livré, un prix par catégorie de véhicule |
| Tunnel en trois étapes (trajet → véhicule → détails) | livré — `components/reservation/Tunnel.tsx`, `/booking/` et `/fr/reserver/` en `noindex` |
| Autocomplétion, adresse libre, bagages, retour asymétrique, devises | livré le 8 septembre, après audit du concurrent |
| API de réservation `POST /api/reservation/` | livré : recalcul serveur, référence `AST-xxxxxx`, écriture Supabase, e-mails |
| Stripe Checkout (création de session, REST) | écrit — `stripe.ts`, activé dès que le barème est validé |
| Webhook `POST /api/stripe/webhook/` avec signature vérifiée | livré, 6 tests |
| Page de retour `/booking/confirmed/` | livré, `noindex` |
| « Gérer ma réservation » `/manage-booking/` (+ FR, DE, IT) — lien signé HMAC, heure et vol modifiables à plus de 24 h | livré le 11 septembre, `noindex` — `PageGestion.tsx`, `dossier.ts` |
| Schéma Supabase | écrit — `docs/supabase-schema.sql`, **tables à créer** |
| Back-office des courses | à faire (semaine 4) |

**Aucune dépendance ajoutée.** Stripe et Supabase sont appelés en REST avec `fetch`,
la signature du webhook est vérifiée avec `node:crypto`. Le site tient toujours sur
trois dépendances de production.

**Le prix ne vient jamais du navigateur** : le tunnel envoie un trajet, des dates et
un nombre de passagers ; l'API recalcule. C'est la règle qui empêche de reproduire
l'écart de l'ancien site — 220 € affichés, 377 € facturés.

### Ce qu'il reste à brancher

1. **Créer les tables** dans Supabase (`docs/supabase-schema.sql`) et poser les clés
   dans `.env.local`.
2. **Clés Stripe de test** puis recette de bout en bout : session, paiement 4242…,
   webhook signé, e-mails, ligne `payee` en base.
3. **Valider le barème avec le client** (`BAREME_VALIDE`). Tant qu'il est faux, le
   tunnel affiche le prix et se termine en demande de devis — c'est voulu.
4. **Passer `NEXT_PUBLIC_MOTEUR_RESERVATION=interne`** le jour de la bascule : tous
   les boutons du site pointent alors sur `/booking/` au lieu de WooCommerce, sans
   modifier une ligne de code.
5. **Anti-spam** sur le formulaire public — rien n'est en place aujourd'hui.

---

## Ordre des travaux sur les quatre semaines

1. **Semaine 1** — sauvegarde `.wpress` 2026 extraite, tarifs réels sortis de la base
   WooCommerce, plan des 260 redirections écrit, compte Stripe ouvert.
2. **Semaine 2** — moteur : formulaire, grille tarifaire, Stripe Checkout, webhook,
   e-mails de confirmation. Testé en mode test de bout en bout.
3. **Semaine 3** — contenu migré par script depuis la base WordPress (les 40 pages de
   station et les trajets prioritaires au départ de Genève), pas à la main.
4. **Semaine 4** — back-office, recette des redirections, bascule DNS, surveillance.
   Le repli `book.` reste armé.
