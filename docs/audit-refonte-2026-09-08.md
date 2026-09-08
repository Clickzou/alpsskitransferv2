# Audit SEO — avant / après refonte

**alpsskitransfers.com — 8 septembre 2026**
Mesures reproductibles : `npm run audit:seo` (le site doit tourner sur le port 3003).

---

## 1. Comment c'est mesuré

Les deux colonnes sont **comptées, pas déclarées**.

- **Avant** : les 261 URL réellement publiées par le WordPress, relevées dans
  `wp-export/inventaire.json` — titres, metas Rank Math, directive robots, volume
  de contenu. C'est l'inventaire tiré de la sauvegarde du 7 septembre, pas une
  estimation.
- **Après** : le site refait est **crawlé** page par page sur son build de
  production. On lit le HTML servi, celui que Google reçoit, et on en extrait
  title, description, H1, canonical, hreflang, JSON-LD, texte du `<main>`, liens
  internes, images et poids.

Ce que cet audit **ne mesure pas** : les positions, le trafic et les conversions.
Ils demandent la Search Console et trois mois de recul après la bascule. Ce qui
est mesuré ici, c'est la qualité technique et éditoriale — ce sur quoi la refonte
pouvait agir avant la mise en ligne.

---

## 2. Avant / après

| | Avant | Après | |
|---|---:|---:|---|
| **Couverture** | | | |
| URL publiées | 261 | 261 | même nombre, tout autre contenu — voir §3 |
| Pages indexables | 261 | 259 | |
| Pages en `noindex` | **0** | 2 | le tunnel de réservation |
| Erreurs HTTP au crawl | n/d | **0** | |
| **Métadonnées** | | | |
| Sans title | **29** | **0** | ✅ |
| Sans meta description | **29** | **0** | ✅ |
| Titles de plus de 60 caractères | **24** | **0** | ✅ |
| Descriptions de plus de 155 caractères | **22** | **0** | ✅ |
| Titles dupliqués | 0 | 0 | = |
| **Structure** | | | |
| Pages sans H1 | n/d | **0** | ✅ |
| Pages à plusieurs H1 | **≥ 91** | **0** | ✅ |
| Pages sans canonical | n/d | **0** | ✅ |
| **Contenu** | | | |
| Mots au total | 114 871 | **209 220** | +82 % |
| Mots par page | 440 | **802** | +82 % |
| Pages de moins de 300 mots | **104** | **7** | ✅ |
| **Maillage et technique** | | | |
| Liens internes par page | n/d | 16 | |
| Pages orphelines | n/d | 1 | la page de retour de paiement |
| Pages avec données structurées | **0** | **257** | ✅ |
| Pages avec `hreflang` | 0 | 42 | ✅ |
| Images sans attribut `alt` | n/d | **0** | ✅ |
| Poids HTML moyen | n/d | 81 Ko | |

### Le détail qui compte : les quatre arborescences

L'ancien site faisait cohabiter quatre silos pour le même contenu :

| Silo | Pages |
|---|---:|
| `/airport-ski-transfers/` | 97 |
| `/destination/` | 91 |
| `/{pays}-ski-transfers/` | 41 |
| pages fonctionnelles et autres | 32 |

Val Thorens existait sur 7 URL, Chamonix sur 5. Le nouveau site a **un seul
silo** : une station a une page, un trajet a une page, et 191 redirections
amènent les 261 anciennes URL vers leur unique destination — **couverture 261/261,
vérifiée à chaque build**, et plus aucune redirection n'aboutit sur une page
inexistante.

### Répartition du nouveau site

| Type | Pages | Mots en moyenne |
|---|---:|---:|
| Stations | 69 | 1 138 |
| Trajets | 104 | 656 |
| Hubs d'aéroport | 31 | 982 |
| Hubs pays | 6 | 520 |
| Pages fonctionnelles | 11 | 664 |
| Blog | 7 | 792 |
| Français (stations + trajets) | 26 | 462 |
| Français (pages de conversion) | 6 | 460 |

---

## 3. Le même nombre d'URL, un tout autre site

Les deux sites publient 261 URL. C'est une coïncidence, pas une continuité :

- **91 pages `/destination/` supprimées** — vérifié page par page avec
  `npm run destination:analyser` : contenu générique dupliqué et chiffres faux
  (« Chamonix, 1 heure » quand la route en demande 1 h 25). Rien à récupérer,
  elles partent en 301.
- **97 pages `/airport-ski-transfers/`** fusionnées dans le silo unique.
- **33 pages de station créées** (dont Val Thorens, qui n'existait pas alors que
  c'est la station la plus recherchée des Alpes françaises : son URL portait le
  contenu de Courchevel).
- **15 pages de trajet créées** au départ de Genève — le gisement que l'audit du
  4 septembre désignait comme le plus rentable.
- **31 hubs d'aéroport** et 6 hubs pays, qui n'existaient pas sous cette forme.
- **7 articles de blog** (le blog était en 404).
- **26 pages françaises** de station et de trajet, plus la home, le blog français
  et **6 pages de conversion** — dont le tunnel de réservation traduit.

À nombre d'URL constant, le site a donc **80 % de contenu en plus**, et chaque
page dit quelque chose qu'aucune autre ne dit.

---

## 4. Ce qui reste imparfait

Rien de bloquant, mais rien ne doit être caché :

1. **Les hubs pays sont les pages les plus légères** (520 mots en moyenne). Ils
   ont désormais une introduction rédigée par pays, mais restent des pages de
   distribution.
2. **Les pages françaises sont plus courtes** que leurs équivalentes anglaises
   (462 mots contre 810). C'est un choix de rythme, pas un accident — voir §5.
3. **Sept pages sous 300 mots** : les deux listes de blog, les deux pages de tunnel
   (en `noindex`), la page contact, la page d'aide et la page agences. Aucune n'est
   une page de destination.
4. **Les données structurées attendent le client** : le `TaxiService` est émis
   sur 252 pages, mais sans téléphone ni e-mail — ils manquent toujours dans
   `src/data/site.ts`, et le schéma ne peut pas inventer ce qu'on ne lui donne pas.
5. **Les avis** : les quatre témoignages repris de l'ancienne home ne sont
   rattachés à aucune plateforme. Tant que c'est le cas, pas d'`aggregateRating`.

---

## 5. Faut-il passer tout le site en français ?

La question a été posée en voyant qu'alps2alps affiche quatre langues. Nous avons
mesuré leur site plutôt que de raisonner d'après leur menu.

### Ce que fait réellement le leader du secteur

| | alps2alps |
|---|---:|
| URL au sitemap | **1 946** |
| dont anglais | **1 853 (95 %)** |
| dont français | **31 (1,6 %)** |
| dont espagnol | 31 |
| dont portugais | 31 |

**Quatre langues affichées, une seule vraiment construite.** Et les 31 pages
françaises sont révélatrices de ce qu'ils jugent rentable de traduire :

- la home, deux hubs d'aéroport (**Genève et Lyon, pas les autres**) ;
- **11 pages de trajet** : Genève → Courchevel, Megève, Tignes, Val Thorens,
  Verbier, Avoriaz, Val d'Isère, Chamonix ; Lyon → Méribel, Val Thorens,
  Alpe d'Huez ;
- des pages de conversion : VIP, offres, dernière minute, transferts privés,
  transferts partagés, transferts en gare, comment réserver, FAQ, témoignages,
  contact, annulation, conditions.

**Aucune page de station traduite.** En français, l'intention de recherche est
« transfert Genève Val Thorens » — le trajet — et non « Val Thorens ». Ils ont
tiré la même conclusion que nos données, et n'ont traduit que le tunnel de
conversion.

Deux faiblesses à ne pas copier : leurs URL françaises gardent les slugs anglais
(`/fr/geneva-airport/geneva-to-courchevel-transfer/`), ce qui prive l'URL du
mot-clé français ; et la traduction est manifestement automatique et non relue —
elle tutoie le client (« Suis ton chauffeur », « Ajoute ta date d'anniversaire »)
et laisse des variables non remplies (« transferts populaires entre l' et la
Suisse »).

### Ce que ça vaut comme clientèle

Le transfert aéroport → station s'adresse à qui **arrive en avion**. C'est une
clientèle structurellement britannique, néerlandaise, belge, scandinave, et de
plus en plus israélienne et américaine. Un Français qui part à Val Thorens y va
en voiture ou en TGV jusqu'à Moûtiers : il n'achète pas un transfert depuis
Genève. Le marché francophone de ce produit existe — Belges, Suisses romands,
Français expatriés, agences — mais il est **petit et surtout B2B**.

### Recommandation

**Ne pas traduire les 160 pages restantes.** Le coût (environ trois semaines de
rédaction, puis chaque modification à faire deux fois) est sans rapport avec le
gain attendu, et le leader du secteur, avec ses moyens, s'en tient à 2 %.

À la place, trois choses, dans cet ordre :

1. **Compléter le tunnel de conversion en français** — la page de réservation, la
   FAQ, le contact, les conditions. C'est ce qui manque à notre périmètre actuel
   et c'est exactement ce qu'alps2alps a traduit en priorité. Six pages, deux
   jours.
2. **Mesurer avant d'étendre.** Nos 26 pages françaises sont un test grandeur
   nature. À trois mois, la Search Console dira si elles ramènent des impressions
   et des réservations. Si oui, on ajoute les dix trajets suivants ; si non, on
   s'arrête là et on aura économisé trois semaines.
3. **Traiter le francophone par le B2B plutôt que par la traduction** : agences,
   conciergeries, hôtels, séminaires. Une page dédiée et une démarche commerciale
   rapporteront davantage que 160 pages traduites — c'est d'ailleurs ce que dit le
   menu d'alps2alps, qui met « Travel Agencies » en tête de sa barre.

---

## 6. Leur moteur de réservation, et le nôtre

### Ce qu'ils ont

Leur formulaire n'est pas dans leur site : c'est un **widget externe** chargé
depuis `booking.alps2alps.com/api/widget`. Le WordPress ne fait que l'afficher.

| | alps2alps | alpsskitransfers |
|---|---|---|
| Architecture | widget tiers sur WordPress | tunnel natif dans le site |
| Poids de la home | **501 Ko**, 31 scripts | **151 Ko** |
| Autocomplétion | oui — aéroports, villes, stations, lacs | non, deux listes déroulantes |
| Adresse libre | oui (« I want to go to other address ») | non |
| Privé / partagé | oui | calcul prêt, non exposé |
| Aller-retour | oui, −5 % annoncé | oui, remise appliquée |
| Retour vers une autre destination | oui | non |
| Bagages et skis déclarés au devis | oui (2 personnes · 2 bagages) | à l'étape des détails |
| Devises | EUR, GBP, USD | EUR seul |
| Espace client, suivi du chauffeur | oui | non |
| A/B testing | oui | non |
| Preuve sociale | Trustpilot, Tripadvisor, Feefo | aucune (à sourcer) |

### Où nous sommes déjà meilleurs

- **Le prix vient d'un calcul serveur unique**, à partir de 2 108 distances
  routières réelles. Leur site affiche un prix issu d'un service tiers ; le nôtre
  est recalculé côté serveur avant tout encaissement, ce qui rend impossible
  l'écart « 220 € affichés, 377 € facturés » de l'ancien WordPress.
- **Trois fois plus léger**, sans dépendance à un service extérieur pour vendre.
- **Le contenu autour du formulaire est indexable**, le leur non.

### Ce qu'il faut leur prendre (par ordre de valeur)

1. **L'autocomplétion.** Un seul champ qui cherche dans les 68 stations, les
   34 aéroports, les gares et les villes, avec le type affiché à côté du nom.
   C'est le premier écart d'expérience, et nous avons déjà toutes les données.
2. **L'adresse exacte au devis**, pas seulement à l'étape des coordonnées :
   « autre adresse » doit être possible dès la recherche.
3. **Bagages et skis déclarés dès le devis** — ils déterminent le véhicule, donc
   le prix ; les demander à la fin oblige à recalculer.
4. **Le retour vers une autre destination** (arrivée à Genève, départ de Lyon) :
   fréquent sur un séjour, absent de notre tunnel.
5. **Les devises GBP et USD à l'affichage** — la clientèle est britannique.
   L'encaissement reste en euros.
6. **La preuve sociale** : c'est un chantier client, pas un chantier de code, et
   c'est ce qui manque le plus à la comparaison.

Le suivi du chauffeur et l'espace client sont hors du forfait actuel ; ils
relèvent d'une phase 2 si les volumes le justifient.

---

## 7. Ce qui a été fait après cet audit, le jour même

1. **Les six écarts de métadonnées et de structure** relevés au §4 ont été corrigés :
   six meta descriptions vides rédigées, un title à 64 caractères raccourci, deux
   pages orphelines reliées, `&amp;` non décodé sur la page CGV, `/fr/blog/` ajouté
   au sitemap, et les hubs pays dotés d'une introduction rédigée par pays.
2. **Le moteur a rattrapé les points 1 à 5 du §6** : autocomplétion sur un champ
   unique, adresse libre acceptée et basculée en devis, bagages et housses à skis
   déclarés avant le devis (ils écartent les véhicules trop petits), retour vers un
   autre point que l'aller, et affichage en EUR, GBP ou USD — la facturation
   restant en euros. Six tests supplémentaires, 49 au total.
3. **Six pages de conversion françaises** ont été publiées, en suivant exactement ce
   que le concurrent a jugé rentable de traduire : le tunnel de réservation, comment
   réserver, privé ou partagé, aide, contact, et une page agences et professionnels.

Restent hors de portée du code : les avis, les coordonnées de l'entreprise et
l'entité juridique.

---

## 8. Décisions demandées

1. **Le français** : s'en tenir au périmètre actuel, plus six pages de conversion
   traduites. Décision à valider.
2. **Le moteur** : intégrer les points 1 à 4 ci-dessus avant la mise en ligne ?
   Ils représentent environ trois jours et concernent directement le taux de
   transformation.
3. **Les avis** : sans flux Trustpilot ou Google, nous restons sans preuve sociale
   face à un concurrent qui en affiche trois. C'est le seul écart que le code ne
   peut pas combler.
4. **Téléphone, e-mail et entité juridique** : toujours attendus, et ils bloquent
   les données structurées complètes autant que la fiche Google.
