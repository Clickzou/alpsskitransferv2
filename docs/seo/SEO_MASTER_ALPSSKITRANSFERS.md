# SEO MASTER — ALPS SKI TRANSFERS

**Document de référence SEO du projet de refonte React/Next.js.**
Créé le 2026-09-07 · Dérivé de `SEO_MASTER_CLICKZOU.md`, de l'audit du 2026-09-04 et de
l'inventaire de la base WordPress du 2026-09-07 (`wp-export/inventaire.json`).
À lire avant toute création de page, tout ajout de contenu et tout déploiement.

---

## 1. CONTEXTE & POSITIONNEMENT

| Donnée | Valeur |
|---|---|
| Entreprise | Alps Ski Transfers — transferts privés aéroport ↔ stations des Alpes |
| Site | alpsskitransfers.com (WordPress + WooCommerce + Rank Math, anglais seul) |
| Adresse affichée sur le site | 275 New North Road, London N1 7AA |
| Adresse de la fiche Google | Green Lanes, London N15 3EA — **un arrêt de bus**, fiche non revendiquée |
| Téléphone / e-mail | **à fournir par le client** — absents des données structurées actuelles |
| Zone desservie | France · Suisse · Autriche · Italie (+ aéroports allemands) |
| Aéroports | 31 |
| Stations | **68** (51 au catalogue tarifaire + 17 découvertes dans les URL) |
| Clientèle | UK · NL · BE · DE en priorité ; le marché français est vierge |
| Saisonnalité | Réservations concentrées en décembre |

**Positionnement retenu** : *le transfert privé vers les Alpes au prix ferme, réservé
d'avance, avec un chauffeur qui suit le vol.* Les trois arguments à porter partout :
**le prix fixe par véhicule**, **le suivi des vols**, **le véhicule équipé hiver**.

**Objectif business** : des réservations, pas des positions. Le KPI est le nombre de
transferts vendus par aéroport de départ.

**Point de départ mesuré (audit 2026-09-04)** : en navigation privée, la requête
« alps ski transfers » — son propre nom — ne renvoie pas le site dans les six premiers
résultats. Alps2Alps y figure avec ce nom exact en titre.

---

## 2. CARTE D'INTENTION — UNE INTENTION, UNE PAGE

Règle structurante : **la home ne peut pas ranker sur tout.** Elle porte la marque et
la requête générique ; chaque intention a une page propriétaire et une seule.

| Intention / requête | Page propriétaire |
|---|---|
| alps ski transfers · airport transfers to the alps | **HOME** (`/`) |
| ski transfers to [station] · [station] airport transfer | `/{country}-ski-transfers/{resort}/` |
| [aéroport] to [station] · transfer from [aéroport] | `/{country}-ski-transfers/{resort}/{airport}-transfers/` |
| private vs shared ski transfer · prix, bagages, skis | pages de service (à créer) |
| guides d'accès, conditions de route, matériel | `/blog/{slug}/` |
| transfert aéroport station (marché français, B2B) | `/fr/…` — périmètre 30-40 pages |

**Interdictions de création** (anti-cannibalisation, la maladie n°1 du site actuel) :
- **Une station = une seule page.** Aujourd'hui Val Thorens existe sur 7 URL et Chamonix
  sur 5. Interdiction absolue de recréer une page de station ailleurs que dans son silo.
- **Ne pas créer** de page « ski transfers » générique par pays en plus des hubs pays.
- La home cite les stations en **liens ancre-exacte**, jamais en paragraphes développés.

---

## 3. LE SILO — UNE SEULE ARBORESCENCE

```
                    HOME  (alps ski transfers)
                             │
                    Hub pays  (4 : FR · CH · AT · IT)
                             │
              Page STATION  (mère — 68 à terme, 40 existantes)
                             │
              Page TRAJET  (fille — {aéroport} → {station})
                             │
                        RÉSERVATION
                             ▲
                      Blog (guides) ────┘  maillage descendant
```

- **Page de station = page mère.** C'est elle qui porte le contenu de fond
  (≈ 1 030 mots mesurés aujourd'hui, du bon contenu à reprendre tel quel).
- **Page de trajet = page fille**, une par paire aéroport → station réellement vendue.
- **Le blog maille dans les deux sens** : chaque article pointe vers les stations et
  trajets qu'il cite, et chaque page de station affiche les articles qui la mentionnent.
- **Priorité absolue : Genève.** Le site n'est positionné sur aucune requête au départ
  de Genève alors que c'est la première porte d'entrée des Alpes — 15 liaisons manquantes,
  le gisement le plus rentable identifié. Il est en revanche 2ᵉ sur « zurich to
  crans-montana », que personne ne tape.

---

## 4. RÈGLES TECHNIQUES (socle Next.js)

### Framework
- **Next.js 16 App Router, tout en statique.** Aucun contenu indexable rendu côté client.
- **`trailingSlash: true`** — c'est la forme indexée aujourd'hui sur les 261 URL. La
  changer imposerait une redirection sur l'intégralité du site. Helper `src/lib/seo.ts`.
- **`dynamicParams = false`** partout : pas de contenu, pas de page. Aucune page vide
  en ligne, jamais.

### Metas
- `metaTitre` : **max 60 caractères**, mot-clé en tête, marque jamais en premier.
- `metaDescription` : **max 155 caractères**, avec le prix de départ ou la réassurance.
- Les titles et meta actuels sont **rédigés à la main et bien calibrés** : ils se
  reprennent, ils ne se réécrivent pas. 29 URL sur 261 n'en ont pas — ce sont elles à
  écrire.
- `noindex` sur : panier, commande, connexion, inscription, choix du véhicule, résultats
  de recherche interne, compte client. **Six de ces sept pages sont en `index, follow`
  aujourd'hui**, et l'inventaire confirme **zéro `noindex` déclaré** sur tout le site.

### Hiérarchie Hn
- **Un seul H1 par page.** Les pages `/destination/` en ont deux aujourd'hui.
- Pas de saut H1 → H2 → H3. 6 à 10 H2 par page de station.

### JSON-LD — par type de page

| Type de page | Graphe attendu |
|---|---|
| Home | `TaxiService` + `LocalBusiness` + `WebSite` + `BreadcrumbList` |
| Station | `TaxiService` avec `areaServed` + `BreadcrumbList` + `FAQPage` |
| Trajet | `TaxiService` + `Offer` (prix de départ) + `BreadcrumbList` + `FAQPage` |
| Article | `BlogPosting` + `BreadcrumbList` |

**Champs minimum du `TaxiService`** : `name`, `url`, `image`, `telephone`, `areaServed`
(les 4 pays), `provider` (`LocalBusiness` avec `address` complète), `priceRange`,
`aggregateRating` **uniquement si les avis existent réellement**.

L'existant à corriger : le site se déclare `Article` signé d'une `Person` nommée « JC »
(identifiant admin exposé via `/author/jc/`), et son `Organization` n'a ni adresse ni
téléphone.

### Performance et sécurité
- Images **AVIF/WebP**, `width`/`height` explicites, une seule image `priority` par page.
- Aucune image > 200 Ko. Budget page ≤ 800 Ko.
- **En-têtes de sécurité** : HSTS, X-Content-Type-Options, X-Frame-Options,
  Referrer-Policy, Permissions-Policy. Le site actuel n'en sert **aucun** et répond
  `Cache-Control: max-age=0` sur tout.
- Cibles Lighthouse mobile : Performance > 80 · SEO > 95 · Accessibilité > 90.

### Robots & sitemaps
- Sitemap dérivé des registres, jamais écrit à la main. Aucune page `noindex` dedans.
- **Autoriser explicitement** les crawlers de recherche IA : `GPTBot`, `OAI-SearchBot`,
  `ChatGPT-User`, `PerplexityBot`, `Perplexity-User`, `Google-Extended`, `ClaudeBot`,
  `Claude-User`, `Claude-SearchBot`, `CCBot`, `Applebot-Extended`. Ne jamais bloquer un
  *search bot* en croyant bloquer un *training bot*.

### Multilingue
- **Anglais d'abord, français page par page.** L'anglais couvre tout le site ; le
  français n'existe que sur les pages écrites.
- `hreflang` émis **uniquement sur les paires réellement existantes**, `x-default` vers
  l'anglais. Le sélecteur de langue n'affiche une langue que là où elle existe.
- L'existant à supprimer : le menu annonce EN / ES / DE / IT alors que `/es/` est en 404,
  que `/de/`, `/it/` et `/fr/` redirigent vers des pages sans rapport, et qu'aucun
  `hreflang` n'est déclaré (tout en `en-GB`). Le sélecteur est purement décoratif.
- **L'allemand sera probablement plus rentable que le français** (Innsbruck, Salzbourg,
  Zurich desservis, pouvoir d'achat élevé, site déjà classé — mal — dessus). À prévoir
  en phase 2, le néerlandais ensuite.

---

## 5. RÈGLES DE MAILLAGE

| Règle | Valeur |
|---|---|
| Liens internes contextuels minimum par page | **3** |
| Lien de la page fille vers sa page mère | **obligatoire** |
| Liens vers des pages `noindex` | INTERDIT |
| Profondeur de clic maximum depuis la home | **3** |
| Tous les `href` internes | **avec trailing slash** |

**Schéma par type de page** :
- **Station** → ses trajets (tous), son hub pays, les articles qui la citent, la réservation.
- **Trajet** → sa station mère dans le premier paragraphe, 2 à 3 trajets voisins depuis
  le même aéroport, la réservation.
- **Article** → 1 à 3 stations ou trajets cités, en ancre naturelle, dans le corps.

**Anti-patterns interdits** : ancres « click here » / « read more » · listes de liens en
pied de page tenant lieu de maillage · liens vers un concurrent · la même station liée
depuis trois arborescences différentes (c'est exactement le mal actuel).

---

## 6. RÈGLES RÉDACTIONNELLES

### Longueurs cibles

| Type de page | Mots |
|---|---|
| Home | 1 000 - 1 500 |
| Hub pays | 800 - 1 200 |
| Page station | **1 200 - 1 800** (l'existant est à ~1 030, à étoffer sans réécrire) |
| Page trajet | **900 - 1 400** (l'existant plafonne à 455) |
| Article de blog | **2 000 minimum** |

### Structure obligatoire d'une page de station
1. **Réponse directe** en tête : 130-170 mots autonomes — quels aéroports desservent la
   station, lequel choisir, à partir de quel prix. C'est le bloc qu'un LLM extrait.
2. **Réassurance immédiate** : prix ferme par véhicule, suivi du vol, skis inclus.
3. **Comparatif des aéroports** — durée, distance, fréquence des vols, saisonnalité.
   C'est l'élément non copiable de ce métier, et il existe déjà : le conserver.
4. **6 à 10 H2** MECE, chacun rédigé comme une réponse autonome.
5. **FAQ** de 4 à 8 questions issues de vraies requêtes, balisée `FAQPage`.
6. **CTA de réservation** avec le prix de départ, pas « contactez-nous ».

### Ton
Anglais britannique. Concret, factuel, orienté voyage : durées, cols, chaînes, horaires
de vol, bagages et skis. Aucun superlatif creux. Jamais de durée ni de prix inventés —
ils viennent du contenu existant ou du client.

### Contraintes à ne jamais enfreindre
- Aucun avis, note ou témoignage fabriqué. `aggregateRating` seulement si les avis
  existent.
- Aucun engagement de délai que l'exploitation ne tient pas.
- Ne pas prétendre à une implantation locale que l'entreprise n'a pas (cf. §9).

### Images
- Nommage explicite `ski-transfer-{aeroport}-to-{station}.webp`, alt descriptif jamais
  vide. Le dossier `pHOTOS/` du projet contient déjà les visuels par aéroport, par
  station et par véhicule.

---

## 7. CONVERSION

**CTA principal** : « Book your transfer » avec le prix de départ affiché.
**CTA secondaire** : demande sur mesure pour les groupes et le B2B.

**Moteur de réservation** : formulaire maison Next.js + **Stripe Checkout**, paiement
intégral, aller-retour réservable en une fois. Spécification complète dans
`docs/moteur-reservation.md`. Le tunnel WooCommerce reste armé en repli sur
`book.alpsskitransfers.com` pendant la montée en charge.

**Blocs de preuve à afficher haut de page** : prix ferme par véhicule · suivi des vols ·
skis et snowboards inclus · chauffeurs équipés hiver · avis vérifiés **quand ils
existeront**.

**Friction majeure à traiter** : le site n'affiche aucune preuve sociale alors que
alps2alps affiche 2 340+ avis Trustpilot et alpinefleet sa note dans le title. Un flux
d'avis est à lancer en parallèle du développement — c'est un chantier client, pas un
chantier de code.

---

## 8. PLAN DE MIGRATION

### L'existant mesuré (inventaire du 2026-09-07, base WordPress)

**261 URL publiées**, réparties sur **quatre arborescences concurrentes** — l'audit en
avait identifié trois, l'inventaire en révèle une quatrième :

| Arborescence | Pages | Mots moyens | Sort |
|---|---|---|---|
| `/airport-ski-transfers/{pays}/{trajet}/` | 96 | 455 | → 301 vers la page fille du silo |
| `/{pays}-ski-transfers/{station}/` | 40 | **1 030** | **conservée — c'est le silo** |
| `/destination/{pays}/{aéroport}/` | 36 | 230 | → 301, contenu fusionné |
| `/destination/ski-resorts-in-{pays}/{station}/` | **55** | **193** | → 301 vers la page de station |
| Pages fonctionnelles et isolées | 36 | 415 | au cas par cas |
| Produits WooCommerce | 2 | — | tunnel de réservation |

La quatrième arborescence est le doublon le plus coûteux : **chaque station existe en
double**, une fois avec 1 030 mots (`/france-ski-transfers/alpe-dhuez/`) et une fois avec
194 (`/destination/ski-resorts-in-france/alpe-dhuez/`). C'est la cannibalisation à la
source, et elle explique le constat de l'audit : l'URL classée change d'un jour à
l'autre, jusqu'à −18 places sur « grenoble to tignes ».

### Le plan, généré depuis l'inventaire (2026-09-07)

`npm run redirects:generer` rapproche chaque ancienne URL de sa cible et **refuse de
deviner** : ce qu'il ne sait pas trancher part dans
`wp-export/redirections-a-arbitrer.csv`.

| Sort | URL |
|---|---|
| 301 générées | **189** (89 trajets · 51 doublons de station · 31 hubs aéroport · 13 hubs pays · 3 aéroports ambigus · 2 divers) |
| 301 écrites à la main | 2 (`val-thorens-2` → Courchevel, `sestriere-2`) |
| Conservées telles quelles | 15 pages de contenu et légales |
| Tunnel WooCommerce (noindex, aucune redirection) | 13 |
| 410 Gone | 4 |
| Silo conservé, aucune règle | 40 |
| **Couverture** | **261 / 261 — vérifiée au build** |

Trois décisions prises pendant la génération :

1. **Hub d'aéroport** : `/switzerland-ski-transfers/geneva-airport/`. Les 31 anciennes
   pages `/destination/{pays}/{aéroport}/` y redirigent 1 pour 1. Le hub vit dans le
   silo, sous le pays de l'**aéroport** — aucune racine nouvelle, et la requête
   « geneva airport ski transfers » retrouve une page propriétaire qui maille vers les
   trajets, dont les 15 liaisons Genève manquantes.
2. **Le pays de l'URL cible est celui de la station, pas de l'aéroport.**
   `/airport-ski-transfers/swiss/geneva-to-val-thorens-transfers/` devient
   `/france-ski-transfers/val-thorens/geneva-airport-transfers/` : c'est ce qui corrige
   le dossier « suisse » qui contenait des stations françaises.
3. **Aéroport ambigu → page de station.** Milan a deux aéroports et l'ancienne URL ne
   dit pas lequel ; rediriger vers la station plutôt que deviner ne perd aucune
   pertinence et laisse le visiteur choisir son départ. Trois URL concernées.

**17 stations découvertes dans les URL et absentes du catalogue tarifaire** — Les Gets,
Les Arcs, Flaine, Samoëns, Les Menuires, Montgenèvre, Le Grand-Bornand, Chamrousse,
Argentière, Les Carroz, Crans-Montana, Champéry, Wengen, Interlaken, Lauterbrunnen,
Champoluc, Gressoney. Le registre en compte désormais 68. S'être fié au seul catalogue
WooCommerce aurait fait perdre ces 17 pages et leurs redirections.

### Règles de redirection
- **301 en un seul saut**, toujours vers la destination finale, jamais en chaîne.
  `src/data/redirections.ts` + `npm run redirects:check` (bloquant au build).
- **410 Gone, jamais 301**, pour les pages sans trafic ni lien entrant : `/cart-2/`,
  `/checkout-2/`, `/author/jc/`. Une 301 vers l'accueil y transmettrait un signal de
  mauvaise qualité.

### Corrections d'anomalies à traiter dans le plan
- `/france-ski-transfers/val-thorens-2/` porte le contenu **Courchevel** → devient
  `/france-ski-transfers/courchevel/`.
- `/italy-ski-transfers/sestriere-2/` : doublon.
- `/destination/austria/innsbruck-aiport/` : faute de frappe dans l'URL.
- `/airport-ski-transfers/swiss/` → `switzerland`, et ce dossier « suisse » contient des
  stations françaises (Val Thorens, Morzine, Courchevel) parce que le classement se fait
  par aéroport de départ.

### Contrôles avant mise en ligne
- [ ] `trailingSlash: true`, aucun lien interne sans slash
- [ ] Canonical auto-référent sur chaque page indexable
- [x] Les 261 anciennes URL ont un sort — couverture vérifiée à chaque build
- [ ] Aucune chaîne de redirection, aucune boucle (`npm run redirects:check`)
- [ ] Sitemap sans aucune page `noindex`
- [ ] `robots.ts` autorisant les crawlers IA de recherche
- [ ] `TaxiService` complet, NAP identique partout, aucun champ vide émis
- [ ] `hreflang` uniquement sur les paires existantes
- [ ] En-têtes de sécurité présents, `Cache-Control` correct
- [ ] Un seul H1 par page, aucune page sans metas
- [ ] Tunnel de réservation testé de bout en bout, repli `book.` vérifié
- [ ] Search Console + Bing Webmaster Tools : sitemap soumis, suivi des 404

---

## 9. HORS-SITE

**Google Business Profile** — la fiche actuelle n'est **pas revendiquée**, porte 3 avis
et est posée sur un **arrêt de bus londonien** (Green Lanes N15 3EA) alors que le site
affiche N1 7AA. NAP incohérent, et une fiche londonienne ne peut apparaître dans aucun
Local Pack déclenché à Genève, Chambéry ou Innsbruck.

**À faire cette semaine, quoi qu'il arrive** : revendiquer la fiche. C'est gratuit et
rien d'autre en local n'est possible avant.

**Trois vérifications juridiques préalables avant de déplacer la fiche** :
1. L'établissement doit exister réellement et être justifiable auprès de Google — une
   adresse de complaisance entraîne une suspension, bien plus dure à récupérer.
2. Opérer au départ d'aéroports français suppose une inscription au registre VTC ou une
   licence de transport ; une société britannique ne peut pas faire de cabotage
   intra-France. **Savoir quelle entité opère et si le client sous-traite localement.**
3. Une seule fiche ne couvrira pas quatre pays.

**Repli si l'entreprise est réellement britannique avec des sous-traitants locaux** :
garder une fiche UK revendiquée, complète et alimentée en avis, renoncer au Local Pack
alpin, et compenser par les avis, les données structurées, Trustpilot et Tripadvisor.

**Avis** : chantier prioritaire. Tous les concurrents en ont, le site n'en affiche aucun.

**GEO** : ouvrir Bing Webmaster Tools (ChatGPT s'appuie sur Bing). Tester régulièrement
« best airport transfer to Val Thorens » sur ChatGPT, Perplexity et les AI Overviews.

---

## 10. SUIVI

**Refaire l'étude de mots-clés au démarrage.** La liste de suivi actuelle du client est
inexploitable : elle a été construite sur l'arborescence du site
(« airport ski transfers swiss geneva to verbier transfers ») et non sur le langage réel
des voyageurs.

Répartition cible du suivi, 80 à 100 requêtes :
- 20 requêtes trajet au départ de **Genève** (priorité absolue)
- 20 requêtes trajet depuis Lyon, Chambéry, Grenoble
- 20 requêtes de station (« val thorens transfer », « ski transfer courchevel »)
- 10 requêtes de marque et concurrents
- 10 requêtes de service (private vs shared, prix, bagages, skis)
- 10 requêtes françaises et allemandes

**KPI business, dans l'ordre** : réservations payées · valeur moyenne du panier ·
réservations par aéroport de départ · positions sur les requêtes trajet · citations IA.

**Cadence** : revue hebdomadaire pendant les 6 semaines qui suivent la bascule (c'est là
que se voient les redirections ratées), puis mensuelle.

---

## 11. ÉTAT DE LA REFONTE

**Mise à jour : 2026-09-07** — socle livré, build vérifié, contenu à migrer.

| Élément | État |
|---|---|
| Next.js 16 / React 19 / Tailwind, App Router, tout en statique | ✅ |
| `trailingSlash`, en-têtes de sécurité, `Cache-Control` | ✅ |
| Proxy de redirections 301 / 410 + contrôle bloquant au build | ✅ (6 règles sur ~220) |
| Registres : 31 aéroports, 51 stations | ✅ |
| Gabarits station / trajet / blog, sitemap et robots dérivés | ✅ |
| i18n anglais d'abord, `hreflang` conditionnels | ✅ |
| Inventaire des 261 URL WordPress avec metas Rank Math | ✅ |
| Contenu migré | **35 stations, 89 trajets, 13 pages fonctionnelles**, repris par script |
| Contenu rédigé | **Val Thorens** (8 septembre) — la seule page écrite hors migration |
| Hubs pays et hubs aéroport | 5 + 31, générés depuis les registres |
| Pages générées au build | **154** |
| Cibles de redirection en 404 | aucune — les 191 règles aboutissent sur une page |
| Moteur de réservation | à écrire — spec dans `docs/moteur-reservation.md` |
| Coordonnées de l'entreprise, données structurées complètes | en attente du client |

### Ce qui manque encore, par ordre de priorité

1. ~~**Val Thorens n'a aucune page.**~~ — **réglé le 8 septembre.** Le constat tenait :
   `/france-ski-transfers/val-thorens-2/` porte intégralement le contenu Courchevel —
   titre WordPress mis à part, corps et metas parlent de Courchevel 1850, 1650, Le Praz.
   Cette URL part donc en 301 vers Courchevel, et la page Val Thorens a été **écrite**
   (≈ 1 550 mots, 7 H2, FAQ de 7 questions, distances issues de `data/distances.ts`),
   ce qui active ses 5 pages de trajet : Chambéry, Genève, Grenoble, Lyon, Turin.
   C'est la première page du site rédigée hors migration ; elle vit dans
   `src/lib/resorts/rediges.ts`, hors du bloc que le script de migration régénère.
2. **20 autres stations ont des pages de trajet mais pas de page mère** : Zermatt,
   Megève, Les Gets, La Clusaz, Serre Chevalier, Crans-Montana, Wengen, Lech,
   Bad Gastein, Flaine, Samoëns, Les Menuires, Montgenèvre, Le Grand-Bornand,
   Chamrousse, Argentière, Les Carroz, Champéry, Interlaken, Lauterbrunnen.
   **29 pages de trajet restent inertes** tant qu'elles n'existent pas — et autant de
   301 qui aboutissent aujourd'hui sur du 404.
3. **Les 15 liaisons au départ de Genève** identifiées par l'audit.
4. **Les pages de trajet sont maigres** : ~455 mots repris, cible 900-1 400.

### Limite connue
Les slugs du registre des stations sont dérivés du catalogue WooCommerce, pas relevés sur
le site. Ils doivent être confrontés à `wp-export/inventaire.json` avant l'écriture
définitive du plan de redirections — un slug qui diffère d'un caractère, c'est une 301
ratée.
