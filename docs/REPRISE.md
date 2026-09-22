# Mardi 22 septembre 2026 — la page premium, et la fiche Google qui arrive

## Ce qui a été livré

**`/luxury-ski-transfers/` — les demandes sur mesure.** Page neuve, sans
antériorité WordPress : mise à disposition d'un chauffeur à l'heure, à la
journée ou à la semaine, tronçons en hélicoptère et arrivées en jet privé,
mariages, événements de marque et tournages. Mot-clé propriétaire « luxury ski
transfers ».

- Contenu dans `data/page-premium.ts`, gabarit `components/PagePremium`,
  registre `lib/pages/luxury-ski-transfers.ts`.
- **Formulaire dédié** (`components/FormulaireDemandePremium`,
  `POST /api/demande-premium`) : nature de la demande, dates, points, passagers,
  budget. Seuls le nom, l'e-mail et la description sont obligatoires — une
  demande sans dates arrêtées doit pouvoir partir. L'e-mail reçu par
  l'exploitant est mis en forme comme une fiche, pas comme un message.
- **Aucun accusé de réception au demandeur**, délibérément : ce serait un e-mail
  partant vers une adresse saisie par un inconnu, donc un relais de courrier
  indésirable. La confirmation s'affiche à l'écran.
- **La limite est tenue par la rédaction** : NM Transports 73 n'exploite ni
  hélicoptère ni avion. La page écrit noir sur blanc que les vols sont affrétés
  auprès d'opérateurs agréés, et que la route, le sol et la coordination sont
  les siens. Ne pas laisser un script ou une retouche effacer cette réserve.
- Frontière avec `/inquiry/` : celle-là porte **le nombre** (plus de huit
  passagers, agences, entreprises), celle-ci **la nature** de la demande. Les
  deux pages se renvoient l'une à l'autre en fin d'introduction.
- Maillage : menu principal (« Luxury transfers »), pied de page (« Luxury &
  special requests »), `llms.txt`.

**En-tête.** Le menu anglais est passé à neuf entrées et « Contact » retombait
sur une deuxième ligne. Ce n'était pas une affaire d'écran mais de conteneur :
`max-w-6xl` plafonne la barre à 1 152 pixels quelle que soit la fenêtre, et un
premier réglage conditionné à `xl:` n'a donc rien changé là où ça coinçait. La
barre est à 1 216 pixels, les écarts sont resserrés, le corps du menu perd un
demi-point, et **le menu est centré** entre la marque et les actions.

**Les quatre langues, le même jour.** `/luxury-ski-transfers/`,
`/fr/transferts-luxe/`, `/de/luxus-transfer/` et `/it/transfer-di-lusso/` —
même gabarit, même formulaire, hreflang réciproques et sélecteur de langue au
complet. C'est d'ailleurs l'absence du sélecteur sur la page anglaise seule qui
a déclenché la décision : une page qui n'existe que dans une langue ne peut en
proposer aucune autre, et le sélecteur s'efface plutôt que de mener à une 404.

Trois points de structure :

- **Le gabarit ne contient plus aucune chaîne de caractères** : tout vient de
  `data/page-premium.ts` (l'anglais, et le type `ContenuPremium`) et de
  `data/page-premium-intl.ts` (les trois autres), y compris les mots des boutons
  et les messages du formulaire. Sans cela, une traduction laisse derrière elle
  un « Send your request » sur une page allemande.
- **Le formulaire envoie une clé, pas un libellé.** Le visiteur choisit
  « Hochzeit », le serveur reçoit `wedding`, l'exploitant lit « Mariage » :
  l'objet de l'e-mail reste triable quelle que soit la langue du demandeur. Une
  ligne « Répondre en : italien » dit dans quelle langue répondre.
- **Les exemples suivent le périmètre de chaque langue**, ce ne sont pas des
  miroirs : l'allemand parle de Zurich, Sion, Zermatt et St. Moritz ; l'italien
  de Turin, Milan, Courmayeur et Cervinia. Traduire mot à mot aurait produit
  trois pages qui parlent du marché français en trois langues.

**GEO.** La page est déclarée dans `llms.txt` (faits clés et pages principales),
et ses quatre prestations sont balisées une par une — nouveau nœud
`serviceCatalogueSchema` dans `lib/schema.ts`, un `Service` avec son
`OfferCatalog`. Sans lui, un moteur de réponse interrogé sur « helicopter
transfer to Courchevel » devait déduire le service de la prose.

## L'audit SEO / GEO du jour

Mesuré en crawlant le site servi (`npm run audit:seo` sur un `next start`) :
362 URL, 0 erreur, 0 title manquant ou trop long, 0 page à plusieurs H1, 0 page
sans canonical, 0 image sans alt, 967 mots par page (440 sur le WordPress),
355 pages avec données structurées, 201 avec hreflang, 14 liens internes par
page. Les trois pages « orphelines » sont `/booking/`, `/booking/confirmed/` et
`/manage-booking/` : on y arrive après paiement ou par e-mail, c'est normal.

Déjà en place côté GEO : `llms.txt` avec la grille tarifaire complète recalculée
chaque heure, l'API de prix publique décrite dans `openapi.json`, le serveur MCP
`get_transfer_quote`, et les robots IA autorisés nommément dans `robots.txt`.

## Ce qui attend — par ordre de coût

1. **L'indexation est fermée** (`NEXT_PUBLIC_INDEXATION`). Tant qu'elle l'est,
   rien n'est indexé ni cité, et aucune optimisation ne produit d'effet. À
   ouvrir le jour de la bascule sur le domaine définitif, pas avant.
2. **La fiche Google est en cours de mise à jour par le client** (annoncé le
   22 septembre 2026). JC préviendra dès que c'est fait. **À faire ce jour-là :**
   - vérifier que la fiche porte exactement les nom, adresse et téléphone de
     `data/site.ts` — NM Transports 73, 317 rue de la Bionne, 73000 Chambéry,
     +33 7 69 78 91 89 ;
   - **brancher `sameAs`** dans `organisationSchema()` : l'URL de la fiche
     Google, et les profils sociaux s'il y en a. Le balisage n'en a aucun
     aujourd'hui, et c'est ce qui relie le site à une entité réelle pour Google
     comme pour les moteurs de réponse ;
   - renseigner `GOOGLE_PLACE_ID` et `GOOGLE_MAPS_API_KEY` pour que les vrais
     avis remplacent les quatre témoignages repris du WordPress.
3. **Les mentions légales** ne sont toujours pas écrites, et `cookie-policy-uk`
   reste à reprendre — l'éditeur est français.
4. ~~La page premium n’existe qu’en anglais~~ — **réglé le 22 septembre
   2026** : elle existe dans les quatre langues, avec son formulaire.

# Mardi 15 septembre 2026 — pendant les tests

- **Test 1 réussi** (adresse demandée, adresse saisie, remboursement 10 € sur
  AST-62B62B, ligne dans Factures). Corrigé en route : expéditeur « Alps Ski
  Transfers », e-mails en HTML (`email-html.ts`, habillage tiré de la forme du
  texte), boutons de la page de gestion grisés tant que rien ne change, fenêtre
  « Merci » après l'adresse.
- **Avoirs** : chaque remboursement d'une course facturée crée un avoir Stripe
  (`creerAvoir`), relié au remboursement carte ou déclaré hors Stripe pour un
  virement ; PDF dans l'e-mail au client, dans la fiche et dans Factures ;
  l'identifiant `cn_…` est gardé dans `paiements.session_stripe`. Éprouvé en
  mode test contre Stripe, **inerte tant que `FACTURES_ACTIVES` est éteint**.
  Avant d'allumer : régler dans Stripe la dénomination et l'adresse (le PDF
  affiche « environnement de test Alps Ski Transfers, France »).
- **Parcours complet prouvé par JC** sur une préproduction facturation allumée
  (supprimée ensuite) : paiement AST-7D00EF → facture DVJXZD11-0003 (TVA juste,
  PDF) → remboursement 10 € → avoir DVJXZD11-0003-CN-01 relié au remboursement
  Visa, visible fiche + Factures + e-mail. **Défaut Stripe relevé** : le PDF
  d'une facture payée affiche « 323 € dus » et « Payer en ligne » (figé à
  l'émission, vrai aussi pour une facture payée par l'API) ; la page en ligne,
  elle, dit « Payée » et donne le reçu. À traiter avant d'allumer : réglage du
  modèle de facture Stripe, sinon lier la page en ligne plutôt que le PDF dans
  l'onglet Factures.
- **Données de test à purger avant l'ouverture** : factures DVJXZD11-0001 à 0003
  et leurs avoirs (mode test Stripe), réservations AST-7D00EF et suivantes.
- **Tri par date d'achat** dans Réservations (`?tri=achat`), en ligne.
- **Prix au kilomètre pour les adresses**, site et téléphone (décision de JC) :
  `lib/tarification/itineraire.ts` situe chaque point (coordonnées des lieux
  dans `data/coordonnees.ts`, BAN puis Photon pour une adresse), mesure la route
  (table pour aéroport ↔ station dans les deux sens, sinon OSRM public, Google
  en repli) et choisit le coefficient (station du trajet, ou station à moins de
  15 km de l'adresse). `validerEtMesurer` est le passage unique pour le devis,
  la réservation et le téléphone ; le panier mesure aussi. Un retour qui part
  d'ailleurs reste en devis. **Point de vigilance** : OSRM public n'a pas de
  garantie de service — si les devis d'adresse tombent en devis manuel, poser
  une clé Google avec l'API Distance Matrix activée.
- **Retouches notées** : « 0 bag » dans le récapitulatif, lien Stripe trop long
  sous le bouton des e-mails.
- **Demandé, à faire** : onglet **Planning** (calendrier semaine / mois,
  chauffeur et note par trajet — migration de deux colonnes).
- **Assistant « Une question ? »** sur tous les écrans du back-office : Claude
  (`claude-opus-5`, effort medium, repli `fallbacks: "default"`) répond depuis
  `lib/admin/guide-assistant.ts`, mis en cache (~8 500 jetons, ~1,5 centime la
  question). Clé : celle de Clickzou (choix de JC), posée sur Vercel.
  **Tenir le guide à jour quand un écran change.**
- **Tâches planifiées réparées** : `vercel.json` appelait `/api/relances` et
  `/api/concurrence?lot=` sans barre finale ; le site redirige (308) et Vercel ne
  suit pas les redirections — **ni relevé de nuit ni rappel d'adresse n'ont
  tourné avant le 15 septembre**. Barres ajoutées, test de garde. À vérifier
  mercredi matin : des prix datés du 16 dans `concurrence_releves`.
- **Haute saison** (table `concurrence_saison`, migration passée) : 10 samedis
  de vacances relevés le 1er et le 15, partie dédiée dans Concurrence.
- **Alpy** : le 15 entre 18 h 05 et 18 h 33, pages sans offres prises pour
  « trajet non proposé » ; une sonde (`/api/diagnostic/alpy/?n=12`) a montré
  12 recherches réussies d'affilée depuis Vercel vingt minutes plus tard — blocage
  passager d'Imperva. Désormais : page inattendue réessayée avec session neuve,
  et dernier prix connu repris trois jours. **À surveiller** sur les relevés de
  nuit qui tournent enfin.
- **« Réserver ce véhicule »** sur les cartes de l'accueil, quatre langues.
- **Prix lisibles par les IA** : question « combien coûte… » chiffrée en tête de
  la FAQ de chaque page de trajet (quatre langues, remplace la question sans
  chiffre), prix « dès / ab / da » dans le title et les repères des pages
  traduites, `Offer` sur les pages traduites, et `/llms.txt` (117 trajets,
  recalculé chaque heure). **Fait ensuite** : `GET /api/prix/` (prix exact par
  véhicule et lien pré-rempli, décrit dans `/openapi.json`), serveur MCP
  `/mcp/` (outil `get_transfer_quote`, lecture seule, sans SDK), annoncés dans
  `/llms.txt`. Même calcul et même limite (30/h) que le devis du site. **Après
  la mise en ligne** : proposer le connecteur aux annuaires (Claude, ChatGPT).
- **Concurrence, soir du 15 (validé par JC)** : le relevé du 15 s'était arrêté
  à 20 trajets (chaîne coupée par un déploiement) → un trajet absent du dernier
  relevé reprend ses prix de moins de trois jours (`avecDerniersPrixConnus`).
  L'écart tapé n'était pas celui appliqué (5 € au lieu de 2 €) → `ChampEcart` :
  la page se recharge sur la valeur tapée, le champ appartient au formulaire
  d'application, et le bouton refuse tant que l'aperçu ne montre pas la valeur.
- **Back-office sur téléphone (validé par JC)** : `MenuMobile` sous 768 px
  (onglets, compte, mention Clickzou), vue Mois du planning en liste de jours,
  bouton de l'assistant au-dessus de la barre de publication des Tarifs.
- **Test 5 non joué** (JC : « je te fais confiance ») ; le compteur
  `compter_demande` répond en base (vérifié le 15 au soir).
- **Mercredi 16 au matin, en premier** : vérifier le relevé de nuit du 16
  (50 trajets, Alpy compris) et la relance des adresses. Ensuite, la liste
  « avant la mise en ligne » : barème et remise aller-retour avec Nassim,
  `EMAIL_EXPLOITANT`, Stripe (invitation, identité, clés live, dénomination,
  « dus » sur le PDF payé), purge des données de test, domaine puis indexation.

---

# Point de reprise — lundi 14 septembre 2026, 21 h 30 → mardi 15

**Mardi : on fait tous les tests avec JC** (sa décision). Tout est poussé et en
ligne (`8592506`), les trois migrations du jour sont passées (tarifs, concurrence,
limites). Parler court, montrer à l'écran, un test à la fois.

**La liste des tests, dans cet ordre :**

1. **Réservations** — « Demander l'adresse au client » (e-mail dans la langue) ;
   « Rembourser le client → » depuis la liste : fiche ouverte, formulaire déplié,
   rembourser 10 € sur une course de test (Stripe test), vérifier e-mail,
   historique, et la ligne dans l'onglet Factures.
2. **Téléphone** — une course aéroport → station (prix de grille), une course
   station → aéroport (prix inversé), une course vers une adresse (prix saisi),
   un nom tapé sans cliquer la suggestion.
3. **Tarifs** — modifier une valeur, barre du bas, aperçu, publier ; vérifier le
   prix sur le site ; « Revenir à cette version ». Coefficients : « base » et
   « Revenir à la base ». Prix fixe à quatre moments.
4. **Concurrence** — le relevé de la nuit a-t-il tourné (tâches Vercel de 2 h à
   5 h 40) et Alpy a-t-il des prix (bloqué en 403 le 14 après ~150 recherches ;
   réduit à 4 passagers, 6 s d'écart) ? « Voir les nouveaux tarifs », puis
   « Appliquer ces nouveaux tarifs » avec 5 € ; vérifier dans Tarifs « concurrence
   ≈ … » ; revenir à la version précédente. « Relever tous les trajets
   maintenant » : barre d'avancement.
5. **Limite de devis** — 31 devis en une heure depuis une même connexion hors
   back-office → le 31ᵉ doit répondre « Too many price requests ».

**Stats SEO attend la mise en ligne sur le domaine** (décision de JC).

---

# Point de reprise — lundi 14 septembre 2026, après-midi

**JC a demandé d'enchaîner les onglets et de tout tester à la fin.** Rien de ce
qui suit n'est poussé depuis `4d68de3` (bouton « Demander l'adresse ») :

1. `025b77c` — saisie téléphonique : aéroport, station **ou adresse** (champs du
   site) ; hors grille, le prix convenu est obligatoire. Back-office en
   `X-Robots-Tag: noindex, nofollow` quoi qu'il arrive.
2. `df1345e` — **onglet Tarifs** : grille publiée en base (barème, saisons,
   coefficients, prix fixes par véhicule), aperçu avant → après obligatoire,
   historique et retour à une version. **Valises** enregistrées.
3. Le commit suivant — **onglet Stats SEO** : ventes du site sur 28 jours (base),
   Search Console et Analytics 4 par compte de service, sans SDK.

**Avant de pousser, dans cet ordre :** exécuter
`docs/supabase-migration-tarifs.sql` dans Supabase — sans la colonne `bagages`,
plus aucune réservation ne s'enregistre.

**Pour brancher Google :** `GSC_CREDENTIALS_B64` (même compte de service que le
site Clickzou), `GA_PROPERTY_ID`, et `GSC_SITE_URL` si la propriété n'est pas
`sc-domain:alpsskitransfers.com` ; ajouter le compte de service en « Restreint »
dans Search Console et en « Lecteur » dans Analytics. Testé le 14 : Google
accepte le compte, et refuse la propriété tant qu'il n'y est pas ajouté. Le
nouveau site n'a **aucune balise Analytics** : à poser avec le bandeau cookies.

**Tests à faire à la fin :** course téléphonique vers une adresse ; Tarifs —
modifier, aperçu, publier, vérifier un prix sur le site, revenir à la version
précédente ; Stats SEO une fois Google branché.

---

# Point de reprise — vendredi 11 septembre 2026, 22 h 15 → lundi 14

**Lundi, commencer par là, en mots simples pour JC** (il était fatigué et n'a
pas suivi le dernier récapitulatif) :

1. Les corrections du tableau de bord sont **faites et enregistrées (commit
   local), pas encore poussées**. Build OK, 156 tests OK, aucune migration.
   → Lui montrer à l'écran (localhost) plutôt que d'expliquer : la liste, une
   fiche client, le formulaire téléphone. Puis lui demander « je pousse ? ».
2. Ensuite : l'onglet **Tarifs** (décisions ci-dessous), avec la migration des
   **valises** dans la même migration.
3. Ensuite : les prix pour les IA (serveur MCP).

Parler court : une phrase par point, pas de listes techniques.

**Ce fichier dit où reprendre.**

> **Convention de reprise avec JC.**
> « On en est où ? » → lire ce fichier et résumer l'état, sans rien lancer.
> « Go » → enchaîner sur le point 1 de « À reprendre », sans redemander confirmation.

---

# Reprise du 10 septembre 2026 au soir — le moteur tient debout

## À FAIRE EN PREMIER — relire le tableau de bord de bout en bout

**Décision de JC, 11 septembre au soir** : on vérifie d'abord que le tableau de
bord est « super bien fait » — listes, fiche client, recherche, saisie
téléphonique, demandes à valider, adresses, historique. **Paiement, TVA et
Stripe** (interrupteur des factures, réglages du compte, clés réelles) se
traitent **juste avant la mise en ligne**, pas avant.

**L'onglet Tarifs manque — c'est l'onglet principal** (JC, 11 septembre).
Décisions : il édite les **règles générales** (prise en charge, €/km, écart
entre véhicules, majorations samedi/dimanche/nuit, remise aller-retour), les
**stations et trajets** (coefficient par station, prix fixe par trajet) et des
**périodes de saison** par dates. Une modification se voit d'abord en
**aperçu** (avant → après sur des trajets types), puis se **publie** ; chaque
publication est gardée, et on revient à la précédente en un clic. Les prix
**déjà payés ou envoyés restent figés** : un tarif ne touche que les nouvelles
réservations.

**Ensuite — les prix pour les IA** (décision de JC, 11 septembre) : que
ChatGPT, Perplexity, Claude ou les aperçus IA de Google proposent le bon prix.
Trois étages, tous alimentés par la **grille publiée** (jamais un prix non
validé) : (1) « à partir de … € » sur les pages de trajet et de station, en
données structurées (`Offer` du `TaxiService`), et un `llms.txt` ; (2) le devis
(`/api/devis`) documenté pour les assistants (OpenAPI signalée dans
`llms.txt`) ; (3) un **serveur MCP** « obtenir un devis », en lecture seule —
l'IA propose le prix et le lien pré-rempli, le client réserve.

**Revue du tableau de bord du 11 septembre** — corrigés : « À venir » sur la
prochaine prise en charge, couleurs d'état, formulaire téléphonique (saisie,
prix, doublons, dates), session prolongée par le proxy, doubles clics. Reste :
**les valises** ne sont enregistrées nulle part (migration à faire avec celle
des tarifs).

## ~~La saisie téléphonique~~ — en ligne le 11 septembre

Migration `telephone` passée, `IBAN_VIREMENT` posée (clé vérifiée, lue par la
production), `invoice.paid` ajouté à l'endpoint Stripe de test.

Demande de JC, 11 septembre : la plupart des réservations arrivent par
téléphone. **« + Nouvelle réservation (téléphone) »** dans le back-office
(`nouvelle/`) : les mêmes champs, les mêmes contrôles (`validerDemande`) et le
même prix de grille (`devisReservation`) que le site ; le prix se corrige, et
la correction entre dans l'historique. Puis **carte** ou **virement** :

- facturation allumée — une facture Stripe « à régler », dans la série NMT ;
  sa page en ligne se paie par carte, et pour un virement elle porte l'IBAN,
  la référence et l'échéance (7 jours, ramenés à 2 jours avant le départ) ;
- facturation éteinte — un lien Stripe Checkout pour la carte, l'IBAN seul dans
  l'e-mail pour un virement.

Le client reçoit un e-mail dans sa langue (`textes-telephone.ts`). La fiche
montre l'origine, et les boutons **« Virement reçu »** et **« Renvoyer
l'e-mail de paiement »**. Une facture téléphonique payée par carte passe seule à
« payée » par le webhook (`invoice.paid`) ; un virement déjà noté n'y est pas
compté deux fois. Les réservations téléphoniques en attente restent dans
« À venir », pas dans « Paiements non aboutis ».

**Avant de déployer, dans cet ordre :**

1. `docs/supabase-migration-telephone.sql` (colonnes `source`, `mode_paiement`,
   `facture_stripe`) — sans elle, la saisie téléphonique échoue ; le site, lui,
   ne les écrit pas.
2. `IBAN_VIREMENT` sur Vercel, posée par JC — IBAN, BIC et titulaire sur une
   ligne. Sans elle, l'e-mail annonce les coordonnées sans les donner.
3. Stripe → Développeurs → Webhooks : ajouter l'événement **`invoice.paid`** à
   l'endpoint `/api/stripe/webhook` (il n'écoute que `checkout.session.completed`).

## Pour mémoire — la migration `langue` (passée le 11 septembre) et la relance du matin

**Dans cet ordre, impérativement.** Exécuter `docs/supabase-migration-langue.sql`
avant de déployer : `/api/reservation` écrit désormais la langue du client, et
sans la colonne PostgREST refuse **toute la ligne** — plus aucune réservation
ne s'enregistrerait.

**La relance du matin** (`/api/relances`, déclarée dans `vercel.json`, tous les
jours à 7 h UTC) :

- au client, un rappel dans sa langue trois jours avant sa prochaine prise en
  charge s'il manque une adresse — une seule fois, noté dans l'historique ;
- à Nassim, le récapitulatif des courses payées des 48 prochaines heures
  encore sans adresse, avec le lien vers chaque fiche. Rien si rien ne manque.

Elle est fermée par `CRON_SECRET` (posé sur Vercel, Production) : sans lui
elle répond 404, sans quoi n'importe qui pourrait faire écrire à tous les
clients. Les règles sont dans `lib/reservation/relances.ts`, testées.

## ~~La migration `adresses`~~ — passée le 11 septembre

`adresse_retour` et `vol_retour` sont en base.

**L'adresse en station se demande après le paiement** (décision de JC,
11 septembre) : obligatoire, mais hors du tunnel pour ne pas alourdir l'achat.

- La page de confirmation et l'e-mail de paiement disent « il reste une étape »
  et mènent à l'encadré **« Votre adresse en station »**, en tête de la page de
  gestion (`Adresses.tsx`, ancre `#adresses`) : dépose à l'aller, prise en
  charge au retour — « même adresse » cochée par défaut quand c'est la même
  station — et vol retour, facultatif.
- Une adresse manquante se complète jusqu'à la prise en charge ; connue, elle
  ne se change plus à moins de 24 h (`adresses-station.ts`). Elle s'applique
  sans validation — ni l'heure ni le prix ne bougent — et entre dans
  l'historique. Nassim n'est prévenu par e-mail que pour une course de moins
  de 48 h.
- Back-office : « MANQUANTE — à demander au client » en rouge dans les cartes,
  et « adresse manquante » sur la ligne repliée.

La relance automatique — J-3 au client, récapitulatif à Nassim — est en place :
voir plus haut.

## ~~La migration `modifications`~~ — passée le 11 septembre

**Dans cet ordre, sinon les demandes d'horaire échouent.** Exécuter
`docs/supabase-migration-modifications.sql` dans l'éditeur SQL de Supabase,
puis pousser. Déployé avant la table, le code répond « nous n'avons pas pu
enregistrer » à tout client qui demande une autre heure — rien n'est perdu,
rien ne passe.

Ce que le 11 septembre a changé, sur décisions de JC :

- **Une heure se demande, elle ne se modifie plus.** Le client propose depuis
  son lien ; la réservation ne bouge pas ; Nassim reçoit « À VALIDER » avec le
  lien vers la **fiche du client** (`/gestion-ventes-tarifs-seo/reservations/{ref}/`),
  valide ou refuse ; le client reçoit la réponse dans sa langue
  (`textes-decision.ts`). Sans réponse, l'heure d'origine tient. Pas de
  contre-proposition. Le **numéro de vol**, lui, s'applique tout de suite.
- **Chaque sens a son préavis de 24 h** (`modifiabilite()`) : le client déjà en
  station peut demander à décaler son retour, et la course n'est « passée »
  que quand le retour l'est aussi. Avant, tout se jugeait sur l'aller.
- **Le back-office** : onglets (celui des tarifs s'ajoutera avec son écran),
  « Demandes à valider » en tête de liste, fiche client complète — formulaire,
  paiement, historique, place réservée aux factures. La connexion ramène sur la
  fiche d'où venait le lien (`suiteSure`, qui refuse toute adresse hors du
  back-office).
- **Pages légales corrigées** : modification 24 h, annulation alignée sur les
  conditions de vente (plus de 24 h : remboursement moins les frais, rien en
  deçà — les CGV disaient 7 jours / 50 %), attente 100 €/h (140 € dans les
  conditions de vente), e-mail `contact@` au lieu de `customerservice@` et d'un
  « [customer support email] » jamais rempli. Les trois pages sont désormais
  protégées de `migrer:pages`.

**À tester après déploiement** : une demande sur l'aller, une sur le retour, la
validation, le refus, les deux e-mails au client, et le lien de l'e-mail
« À VALIDER » session ouverte puis session fermée.

**Facturation — réponses de Nassim, 11 septembre** : il facture la **TVA à
10 %**, numéro **FR87889065165**. En-tête : **NM-TRANSPORTS 73**, adresse,
SIREN, TVA, téléphone, e-mail. Sa numérotation en est à **198** : la prochaine
facture est la **199**. Un **export mensuel** convient à son comptable.

Solution retenue : les factures de Stripe Checkout, avec un taux de TVA de
10 % **inclus** dans les prix affichés (TTC), le numéro de TVA et le SIREN sur
la facture, et la place « Factures » de la fiche client reliée à Stripe.
**Encore à trancher avec lui** : les trajets qui passent par la Suisse ou
restent en Italie, la mention « EI » après la dénomination (obligatoire pour
une entreprise individuelle), le format exact de ses numéros, et s'il continue
de facturer à la main en parallèle — deux systèmes sur une même série de
numéros finiraient par se chevaucher.

**Prêt, interrupteur éteint** (`FACTURES_ACTIVES`). Stripe Checkout émet la
facture au paiement, TVA 10 % **incluse** (`STRIPE_TAUX_TVA` — taux créé en mode
test, `txr_1UEYiGAr5ktb0ZHxR9SVMF5f`, posé sur Vercel) ; le lien part dans
l'e-mail de confirmation, dans la langue du client ; l'onglet **Factures** liste
le mois avec ses totaux et l'export CSV pour le comptable ; la fiche client
montre la facture de sa course. Rien n'est recopié en base : Stripe fait foi.

Pour allumer, dans cet ordre :

1. Les quatre réponses de Nassim (Suisse et Italie, « EI », format des
   numéros, factures manuelles en parallèle).
2. Stripe → Paramètres : **Entreprise** (dénomination, adresse, téléphone,
   e-mail) ; **ID fiscaux** FR87889065165 ; **Factures** — numérotation au
   niveau du compte, prochain numéro **199** (préfixe selon sa réponse), pied de
   page avec le SIREN et « EI » ; **E-mails clients** — envoi des factures
   payées (Stripe n'envoie rien en mode test).
3. Un paiement de test (4242…) avec `FACTURES_ACTIVES=oui` **en Preview
   d'abord** : si Stripe refuse un paramètre, c'est la page de paiement qui
   tombe — on le voit là, pas chez un client.
4. `FACTURES_ACTIVES=oui` en Production. Au passage en réel, recréer le taux
   de TVA en mode live et remplacer `STRIPE_TAUX_TVA`.

## Accès au back-office — fermé le 11 septembre

`https://alpsskitransferv2.vercel.app/gestion-ventes-tarifs-seo/`, deux comptes
Supabase Auth créés par JC : `contact@alpsskitransfers.com` (Nassim) et
`jc@clickzou.fr`. Les mots de passe ne sont nulle part dans le dépôt ni dans
la conversation.

**L'inscription libre était ouverte** sur le projet Supabase : avec la clé
publique du site, n'importe qui pouvait se créer un compte et lire toutes les
réservations — et l'adresse du back-office est dans ce dépôt public. Aucun
compte n'existait encore. Deux verrous désormais :

- l'inscription est **désactivée** dans Supabase (Authentication → Sign In /
  Providers) ;
- `ADMIN_EMAILS` (`lib/admin/acces.ts`) : seules ces adresses entrent, même
  avec un compte valide. **Fermé si la variable est vide.** Ajouter quelqu'un,
  c'est créer son compte dans Supabase **et** ajouter son adresse ici, sur
  Vercel, puis redéployer.

## ~~L'espace « ma réservation »~~ — construit le 11 septembre

Les quatre URL répondent — `/manage-booking/`, `/fr/gerer-ma-reservation/`,
`/de/buchung-verwalten/`, `/it/gestisci-prenotazione/` — une seule page
(`PageGestion`), `force-dynamic` et `noindex`. `chargerDossier()`
(`src/lib/reservation/dossier.ts`) vérifie le jeton **avant** toute lecture et
rend un état nommé : lien invalide, base muette, introuvable, annulée, passée,
tardive (< 24 h : message à l'exploitant + téléphone), ouverte (heure et vol
modifiables). La course reste affichée quand on refuse, pour qu'on la reconnaisse.

Le lien est branché aux deux endroits : **l'URL de retour Stripe** porte le jeton
calculé par `/api/reservation` (jamais par la page, qui s'atteint en tapant son
URL), et **l'e-mail de paiement** du webhook le contient dans les quatre langues.
Sans jeton — paiement de panier, visite directe — la confirmation garde son
ancien bouton.

Corrigé en chemin : `/api/gestion` construisait l'heure saisie dans le fuseau
du serveur — **UTC sur Vercel**, donc 14 h enregistrées 16 h l'été.

**Vérifié en local** sur AST-62B62B : deux sens, deux véhicules, deux effectifs,
formulaire ouvert ; lien absent ou faux refusé dans les quatre langues.
**En production aussi, le 11 septembre** : `SECRET_GESTION` n'y valait pas la
valeur locale (la sonde répondait 404). Remplacée par la CLI en Production et
Preview, redéployée : la sonde répond, commit `0d1b076`, et AST-62B62B s'ouvre
sur `alpsskitransferv2.vercel.app` avec un jeton calculé en local.
**Testé par JC le 11 septembre, en production** : paiement AST-9EF8D6 (653 €,
statut `payee`), e-mail reçu avec le lien, lien ouvert sur la bonne course, et
— le départ étant le lendemain — message « moins de 24 h » transmis à
l'exploitant, réservation laissée intacte.
**Prouvé ensuite** : le changement d'heure d'AST-E8919A (15 h 45 → 17 h 10,
stockée 15 h 10 UTC — la correction du fuseau tient), e-mails reçus. Ce mode
immédiat a été remplacé le jour même par la validation de l'exploitant — voir
plus haut.

Les aéroports s'affichent sous leur nom anglais dans les quatre langues — comme
dans le tunnel et l'e-mail : il n'existe pas de registre de noms traduits.

## ~~La migration~~ — passée le 10 septembre au soir

Les trois colonnes `retour_airport`, `retour_resort`, `vehicule_retour` sont en
base. **Vérifié dans la foulée par un paiement complet** : AST-62B62B, 610 €,
Genève → Les Gets en Premium à deux, retour Alpe d'Huez → Genève en Standard à
sept, un enfant à l'aller et trois au retour. Statut `payee`, ligne dans
`paiements`, `payment_intent` réel. **Deux véhicules, deux effectifs, deux
lieux : le cas complet est prouvé.**


## Ce qui a été prouvé hier soir

**Le paiement complet, pour la première fois** — réservation AST-09CB6A, 515 €,
Genève → Les Gets avec retour depuis l'Alpe d'Huez : statut `payee`, ligne dans
`paiements`, vrai `payment_intent`, confirmation au client, avis de course reçu.

Trois pannes silencieuses le bloquaient : une colonne écrite en casse camel qui
faisait rejeter toute la ligne pendant que le client partait payer ; le retour
après paiement pointé sur l'URL de déploiement, protégée par le SSO Vercel ; et
le tunnel qui jetait les quatre paramètres de retour à l'entrée.

## Ce que le moteur sait faire maintenant

- **Un véhicule et un prix par sens**, chiffrés sur l'effectif de ce sens. Un
  audit l'a d'ailleurs sauvé d'un défaut sérieux : le véhicule du retour n'était
  transmis que sur les aller-retours dont les lieux changent, si bien qu'une
  Premium à quatre places pouvait être vendue pour un retour à sept personnes.
- **Les enfants se comptent par trajet**, bornés par le groupe de leur sens, et
  la liste explique pourquoi elle s'arrête là.
- **Les refus disent d'où ils viennent** : le serveur nomme le champ fautif, le
  tunnel propose « revenir et le modifier » et pose le curseur dessus.
- **Le plafond de huit personnes s'annonce avant qu'on le heurte**, avec le lien
  vers le devis groupe de la langue ; les catégories écartées faute de places
  disent qu'elles existent.
- `npm run moteur:auditer` rejoue les treize cas limites — capacités, effectifs,
  bagages, enfants, dates. **Tous passent.**

## Ce qui a changé à l'écran

- L'écran du véhicule : titre, photos, récapitulatif des deux sens avec lieux,
  dates, distances et effectifs, prix « pour ce trajet » formatés par langue.
- L'étape des coordonnées : quatre champs, astérisque sur les obligatoires,
  « optional » sur le vol. **L'adresse exacte a été retirée** (décision du
  client) : un seul champ ne pouvait pas décrire un aller-retour asymétrique, et
  l'avis de course porte « ADRESSE À OBTENIR PAR TÉLÉPHONE ».
- Changer d'étape ramène en haut du formulaire.
- **`/book-ski-transfer-tickets/` n'est plus que son formulaire** (décision du
  client) : plus de bandeau, de texte WordPress, de FAQ. **Cette URL ne se
  positionnera plus sur « book ski transfer tickets »** — c'est assumé, et écrit
  en tête du composant.
- L'en-tête débordait de 87 px sur iPhone, sur toutes les pages. Réglé.

## Ce qui attend le client

1. **Le barème** (`wp-export/tarifs-a-valider.csv`). La remise d'aller-retour a
   été **mise à zéro** : elle valait 5 %, ne venait pas du WordPress, et Nassim
   ne l'avait jamais consentie. La remettre est une ligne.
2. **Inviter Nassim sur Stripe**, puis la vérification d'identité de
   NM Transports 73 pour encaisser réellement.
3. Le passage aux **clés `sk_live_`** et un webhook sur le domaine définitif.

## Deux choses à nettoyer avant la mise en ligne

- **Les réservations de test sont dans la vraie base** — une quinzaine, toutes
  du 10 septembre. À supprimer avant l'ouverture.
- `EMAIL_EXPLOITANT` vaut `contact@alpsskitransfers.com` en production, pas
  `nmtransports73@gmail.com` — à confirmer avec Nassim.

## Le prochain vrai morceau

**L'écran d'édition des tarifs** — la demande d'origine. La table `tarifs` existe
mais aucun code ne la lit : les prix viennent de `BAREME_DEFAUT`, dans le code.
Tant que cet écran n'existe pas, changer un tarif demande un déploiement.

## Ce qui attend le client

1. **Le barème** (`wp-export/tarifs-a-valider.csv`), remise d'aller-retour
   comprise — elle est à zéro en attendant.
2. **Inviter Nassim sur Stripe**, puis la vérification d'identité de
   NM Transports 73 pour encaisser réellement.
3. Le passage aux **clés `sk_live_`** et un webhook sur le domaine définitif.

## Deux choses à nettoyer avant la mise en ligne

- **Les réservations de test sont dans la vraie base** (`AST-09CB6A`,
  `AST-9ADD77`, `AST-9EABD9` et les précédentes). À supprimer avant l'ouverture.
- `EMAIL_EXPLOITANT` vaut `contact@alpsskitransfers.com` en production, pas
  `nmtransports73@gmail.com` — à confirmer avec Nassim.

## Ce qui a été réglé aujourd'hui

**Les onze clés de Vercel existaient mais étaient vides.** L'import de la veille
avait créé les noms sans les valeurs, et l'interface les affichait comme des
variables normales. Diagnostiqué par `/api/diagnostic/` — une sonde qui dit,
sans révéler aucune valeur, ce que le processus voit vraiment. Elle exige
`SECRET_GESTION` en en-tête et répond 404 sans lui. **Elle resservira le jour de
la bascule vers les clés réelles.**

**Le fuseau horaire.** `new Date(annee, mois, …)` prenait le fuseau de la
machine : Europe/Paris en développement, UTC sur Vercel. Toute comparaison avec
l'heure réelle était fausse de deux heures — le refus de vendre à moins d'une
heure ne se déclenchait jamais. Le fuseau du service est maintenant écrit dans
`src/lib/temps.ts`, pas subi, et les tests passent sous cinq fuseaux.

**Resend est vérifié** : les trois enregistrements DNS sont dans la zone
o2switch, l'expéditeur est `bookings@alpsskitransfers.com`. La lenteur venait du
cache négatif d'o2switch, réglé à 24 h — bon à savoir pour les prochains
domaines.

**Le webhook Stripe** existe enfin (`checkout.session.completed`), son
`whsec_` est dans Vercel et en local.

**Le parcours** : « Voir mon prix » montre un prix, la date est obligatoire et
bornée, le calendrier s'ouvre au clic sur tout le champ, l'aller-retour se
déplie (date, groupe, lieux), le bouton conclut le formulaire, et l'étape des
coordonnées ne montre plus que cinq champs.

**Le groupe du retour** peut différer de l'aller : colonne `passagers_retour`
créée en base, écrite, affichée au tableau de bord. Le prix ne change pas — il
est par véhicule — mais la capacité retenue est celle du trajet le plus chargé.

## Ce qui attend le client

1. **Inviter Nassim sur Stripe** (Paramètres → Équipe et sécurité), puis la
   vérification d'identité de NM Transports 73 pour encaisser réellement.
2. Le passage aux **clés `sk_live_`**, et un nouvel endpoint webhook sur le
   domaine définitif.

## Le prochain vrai morceau

**L'écran d'édition des tarifs** — la demande d'origine. La table `tarifs`
existe en base mais aucun code ne la lit : les prix viennent toujours de
`BAREME_DEFAUT`, dans le code. Tant que cet écran n'existe pas, changer un tarif
demande un déploiement.


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
| Moteur de réservation | **en production** : Stripe, Supabase et Resend branchés et vérifiés en ligne. Reste le test de paiement complet et l'écran des tarifs |

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
