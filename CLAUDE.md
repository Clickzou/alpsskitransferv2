# alpsskitransfers.com — refonte v2

Refonte du site de transferts aéroport → stations des Alpes, aujourd'hui sous
WordPress / WooCommerce / Rank Math.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript strict · Tailwind 3 · déploiement
Vercel. Aucune dépendance UI tierce : trois dépendances de production, comme sur
les autres sites clients Clickzou (`1- PROJETS/ACTIVAGENCE/v2ia` est le modèle le
plus proche).

```
npm run dev                # http://localhost:3002
npm run build              # prebuild = check-redirections + check-seo, bloquants
npm run migration:status   # où en est la reprise des 51 stations et des 260 URL
npm run redirects:check
npm run seo:check
npm run wp:list -- --filtre database   # inventaire de la sauvegarde .wpress
npm run wp:extract -- database.sql     # extraction sélective vers wp-export/
npm run wp:analyse                     # les 261 URL réelles, leurs metas et leur volume
npm run redirects:generer              # régénère le plan de redirections depuis l'inventaire
npm run migrer:stations                # reprend les pages de station depuis la base WordPress
npm run migrer:trajets                 # idem pour les pages de trajet
npm run migrer:pages                   # pages fonctionnelles conservées (contact, CGV…)
npm run images:preparer                # visuels du dossier pHOTOS/ en WebP + AVIF
npm run distances:calculer             # 2 108 distances routières via OpenStreetMap
npm run tarifs:extraire                # grille tarifaire + coefficients de destination
npm run test                           # tests du calcul de prix (exécutés au prebuild)
#   … --apercu <slug> sur les deux : affiche le module produit sans rien écrire
```

## Documents de référence — à lire avant de coder

- **`docs/REPRISE.md` — où reprendre.** État du site, ordre des travaux, ce qui
  attend une réponse du client. À lire en premier au début d'une session.

- **`docs/seo/SEO_MASTER_ALPSSKITRANSFERS.md` — la référence SEO du projet.** Carte
  d'intention, silo, règles techniques, maillage, rédaction, plan de migration chiffré,
  hors-site, suivi. À lire avant toute création de page et tout déploiement.
- `docs/moteur-reservation.md` — spécification du moteur de réservation.
- `wp-export/inventaire.json` et `.csv` — les 261 URL réellement publiées par le
  WordPress, avec titres, volumes de contenu et metas Rank Math (`npm run wp:analyse`).
**Trois documents sont hors dépôt** — le dépôt GitHub est public, et ceux-là sont
commerciaux. Ils vivent dans le dossier de travail local, et `.gitignore` les
exclut :

- `docs/audit-alpsskitransfers-2026-09-04.html` — audit SEO du 4 septembre 2026 :
  19 constats, relevé de positions, comparatif concurrentiel, plan en trois vagues.
  **La source de vérité du projet.**
- `docs/Audit-alpsskitransfers-Clickzou.pdf` — même contenu, version client.
- `devis/devis-refonte-alpsskitransfers-2026-09-07.md` — le périmètre contractuel :
  ce qui est inclus, ce qui ne l'est pas.

## Structure des URL

Décision d'architecture prise au démarrage, à confirmer avec les données réelles
du `.wpress` :

| Type | Anglais (racine) | Langues traduites (`/fr/`, `/de/`, `/it/`) |
|---|---|---|
| Index des stations | `/ski-resort-transfers/` | `/{lang}/{silo}/` — la racine du silo |
| Index des aéroports | `/airport-ski-transfers/` | `/{lang}/{aéroports}/` (`SEGMENT_AEROPORTS`) |
| Hub pays | `/{country}-ski-transfers/` | `/{lang}/{silo}/{pays}/` — **seulement les pays réellement desservis dans la langue** |
| Station (page mère) | `/{country}-ski-transfers/{resort}/` | `/{lang}/{silo}/{station}/` |
| Trajet (page fille) | `/{country}-ski-transfers/{resort}/{airport}-transfers/` | `/{lang}/{silo}/{station}/{aéroport}/` |
| Hub aéroport | `/{country-de-l-aéroport}-ski-transfers/{airport}/` | pas de hub aéroport traduit : l'index des aéroports mène aux trajets |
| Page fonctionnelle | `/{slug}/` — URL conservées du WordPress | `/{lang}/{slug}/` |
| Blog | `/blog/{slug}/` | `/{lang}/blog/{slug}/` |
| Réservation | `/book-ski-transfer-tickets/` | `/fr/reserver/`, `/de/buchen/`, `/it/prenota/` |

Les hubs pays traduits sont apparus le 10 septembre 2026 : l'accueil de la langue
jouait ce rôle, et le pied de page traduit renvoyait donc vers les quatre hubs
**anglais** sans même le signaler. Ils sont **cinq**, pas douze, parce que le
périmètre suit les stations traduites — France en français ; Suisse en allemand ;
Italie et France en italien (`src/lib/pays-intl.ts`). L'accueil, lui,
est redevenu une home : bandeau, formulaire de recherche, réassurance, véhicules,
avis, comme en anglais.

Le segment `{silo}` est propre à chaque langue, parce que c'est un mot-clé :
`transferts-ski`, `skitransfer`, `trasferimenti-sci` (`SEGMENT_STATIONS` dans
`src/lib/i18n.ts`). Idem pour les aéroports : `geneve`, `genf`, `ginevra`
(`SEGMENTS_AEROPORT` dans `src/lib/transfers/segments.ts`). **Un aéroport absent de
la table d'une langue ferme le trajet** — sans segment, pas d'URL, donc pas de page.

Le segment racine `[silo]` sert les hubs pays **et** les pages fonctionnelles ; le
segment `[silo]/[resort]` sert les pages de station **et** les hubs d'aéroport ;
côté traduit, `{silo}/[station]` sert les stations **et** les hubs pays.
Next n'accepte qu'un segment dynamique par niveau, d'où ces aiguillages — chacun
délègue à un composant dédié, un seul H1 par page. `paramsStations()` refuse au
build qu'un hub pays porte le slug d'une station : l'un des deux ne serait jamais
servi.

Le silo anglais conserve le pattern des 40 pages de station existantes : ce sont
les URL qui portent l'antériorité **et** le meilleur contenu du site (≈ 1 100 mots
utiles). Les 97 pages `/airport-ski-transfers/` et les 92 pages `/destination/`
partent en 301 vers ce silo. Côté français il n'y a aucune antériorité à préserver,
d'où une forme plus courte.

## Règles non négociables

1. **Un silo unique.** Page de station mère, pages de trajet filles. Le site actuel fait
   cohabiter **quatre** arborescences — l'inventaire du 7 septembre en a révélé une que
   l'audit n'avait pas vue : `/destination/ski-resorts-in-{pays}/{station}/`, 55 pages de
   ~193 mots qui doublonnent les pages de station de ~1 030 mots. C'est le problème n°1
   du dossier.
2. **Le plan de redirections est généré, pas écrit à la main.**
   `npm run redirects:generer` produit `src/data/redirections-migration.ts` depuis
   l'inventaire WordPress — 189 règles, couverture 261/261. `redirections.ts` ne
   contient que les corrections manuelles ; **ne jamais y recopier une règle générée**,
   le doublon masquerait la règle et bloquerait le build.
   `check-redirections.mjs` refuse les chaînes à deux sauts, les boucles, les
   destinations en 410 ou inconnues des registres, et vérifie que **chaque URL de
   l'ancien site a un sort**.
3. **Pas de contenu = pas de page.** `dynamicParams = false` partout, et seules les
   stations qui ont leur fichier dans `src/lib/resorts/` sont générées. Jamais de
   page vide en ligne.
4. **Contenu repris tel quel** : les pages de station et les titles / meta existants,
   rédigés à la main et bien calibrés. Ne pas réécrire. La reprise est **scriptée**
   (`migrer:stations`, `migrer:trajets`) — corriger le script plutôt que les 124
   modules produits, sauf pour une retouche ponctuelle.
   **Contenu à refondre** : les 92 pages `/destination/` (≈ 260 mots utiles chacune)
   fusionnent dans les pages de trajet.
5. **i18n : anglais d'abord, les autres langues page par page.** Quatre langues —
   EN, FR, DE, IT — décidées le 9 septembre 2026 sur les données de l'audit :
   l'allemand est le premier marché après l'anglais (fort pouvoir d'achat),
   l'italien suit ; l'espagnol et le portugais ne sont pas des marchés du ski
   alpin. **Attention** : l'allemand avait été choisi pour l'Autriche, sortie du
   périmètre le 10 septembre 2026 — il ne lui reste que la Suisse, trois stations
   et quatre trajets. Un `hreflang` n'est émis que sur une paire qui
   existe réellement, et le sélecteur de langue n'affiche une langue que là où la
   page existe. Le site actuel annonce EN / ES / DE / IT alors qu'aucune version
   n'existe — c'est le défaut à ne pas reproduire.
   Les deux se calculent **au même endroit**, `src/lib/intl/liens.ts` : un sélecteur
   qui proposerait une langue que le hreflang ne déclare pas serait le même défaut,
   en plus discret. Et la déclaration doit être **réciproque** : jusqu'au
   10 septembre 2026 les pages traduites déclaraient l'anglais sans que l'anglais
   déclare rien, ce que Google ignore purement et simplement — les pages
   fonctionnelles anglaises passent maintenant par `alternativesPageFonctionnelleEn()`,
   les hubs pays par `alternativesHubPaysEn()`. Les traductions vivent dans des registres à part
   (`traductions-{lang}.ts`) pour survivre aux scripts de migration, et chaque langue
   a son propre périmètre — l'allemand vise la Suisse alémanique, l'italien la
   Vallée d'Aoste et le Piémont. Ce ne sont pas des miroirs du français.
6. **Blog** : gabarits livrés, maillage automatique dans les deux sens avec les
   stations et les trajets. `src/lib/articles/`.
   **Design** : la home suit la maquette validée par le client (bleu nuit, vert de
   réassurance, magenta d'action — voir `tailwind.config.ts`). Son contenu est repris
   mot pour mot de la home WordPress dans `src/data/accueil.ts` : la refonte change
   la mise en page, pas le propos.
7. **L'Autriche est hors périmètre** (décision du client, 10 septembre 2026).
   Dix stations, dix-sept trajets, sept traductions allemandes et un hub pays
   traduit retirés — dans toutes les langues, anglais compris. Le point d'entrée
   est `src/lib/resorts/registry.ts` : tous les scripts en partent, donc une
   station remise là revient au prochain `migrer:stations`. Les vingt-six URL
   autrichiennes de l'ancien site partent en 301 vers `/austria-ski-transfers/`,
   qui subsiste comme **porte d'entrée d'aéroports** — Innsbruck dessert Selva
   Val Gardena — sur le modèle de l'Allemagne, qui n'a jamais eu de station. La
   table `STATIONS_HORS_PERIMETRE` du générateur de redirections porte ces
   destinations : c'est là qu'on ajoute un pays si le périmètre bouge encore.
   **Ce qu'il faut savoir** : le silo allemand ne garde que Zermatt, Davos et
   St. Moritz. Le renforcer suppose de traduire d'autres stations suisses.

8. **Le site est fermé aux moteurs tant qu'il n'est pas sur son domaine.**
   `NEXT_PUBLIC_INDEXATION` — absente ou différente de `ouverte`, le site sert
   un `robots.txt` en `Disallow: /`, un en-tête `X-Robots-Tag: noindex, nofollow`
   et un `noindex, nofollow` dans chaque `<head>`. **Le défaut est fermé**, et
   c'est le sens qui compte : un oubli doit rendre le site invisible, jamais
   exposer une préproduction. Une préproduction indexée, c'est un duplicata
   complet du site sur un domaine parasite, à désindexer ensuite page par page ;
   le `canonical` absolu ne suffit pas, c'est une indication que Google refuse
   volontiers quand l'URL canonique sert un autre contenu — ce qui est le cas
   tant que le WordPress est en ligne. **Le jour de la bascule** : poser
   `NEXT_PUBLIC_INDEXATION=ouverte` sur la production Vercel et redéployer, une
   fois le domaine définitif branché et pas avant. Le contrôle de prebuild
   rappelle l'état à chaque build.

9. **Le panier parle les quatre langues** depuis le 10 septembre 2026 :
   `/cart/`, `/fr/panier/`, `/de/warenkorb/`, `/it/carrello/`, un seul composant
   et un seul re-chiffrage serveur. Son icône était masquée hors anglais, si
   bien qu'un visiteur français pouvait mettre un transfert de côté puis ne plus
   le retrouver. `PanierProvider` enveloppe désormais les quatre layouts.

10. **Le moteur de réservation est livré avec le site, en un mois** (décision du
   7 septembre 2026, voir `docs/moteur-reservation.md`) : formulaire maison en Next +
   Stripe Checkout + Supabase. Le tunnel WooCommerce est déplacé sur
   `book.alpsskitransfers.com`, sorti de l'index, et **reste armé en repli** —
   bascule par variable d'environnement, sans redéploiement — jusqu'à ce que le
   nouveau moteur ait encaissé des réservations réelles sans incident. Les tarifs et
   le moteur passent avant la production éditoriale : une page manquante ne coûte
   rien, un tarif faux coûte de l'argent.

## Corrections à ne pas oublier lors de la migration

- `/france-ski-transfers/val-thorens-2/` porte en réalité le contenu **Courchevel**.
- Doublons : `/italy-ski-transfers/sestriere-2/`, `/cart-2/`, `/checkout-2/`.
- Faute d'URL : `/destination/austria/innsbruck-aiport/`.
- `/airport-ski-transfers/swiss/` → `switzerland` (et ce dossier « suisse » contient
  des stations françaises, le classement se faisant par aéroport de départ).
- `noindex` sur `/cart/`, `/checkout/`, `/login/`, `/register/`, `/select-vehicle/`,
  `/search-results/` — six pages aujourd'hui en `index, follow`.
- Données structurées en `TaxiService` / `LocalBusiness` : l'actuel se déclare
  `Article` signé d'une `Person` « JC », et son `Organization` n'a ni adresse ni
  téléphone.
- **15 trajets manquants au départ de Genève** — le gisement le plus rentable identifié.

## Ce qui reste ouvert

- ~~La sauvegarde `.wpress` de référence~~ — **réglé** : archive du 7 septembre 2026
  (1,39 Go, 28 728 fichiers) fournie par le client, `database.sql` extrait et inventorié.
- ~~Les slugs du registre des stations~~ — **réglé** : confrontés aux URL réelles, 17
  stations manquantes ajoutées (68 au total), 8 alias de nommage traités.
- **Les options du moteur de réservation** (acompte ou paiement intégral, aller-retour,
  back-office des courses) — le module étant inclus au forfait, elles ne changent pas
  le prix mais toute la charge : arbitrer au plus simple. La solution technique est
  tranchée : Next + Stripe Checkout + Supabase.
- ~~Les coordonnées de l'entreprise et le préalable juridique~~ — **réglé le
  9 septembre 2026**. L'exploitant est **NM Transports 73** (Nassim Matmati,
  entreprise individuelle, SIREN 889 065 165), 317 rue de la Bionne, 73000 Chambéry,
  `contact@alpsskitransfers.com`, +33 7 69 78 91 89. Activité déclarée : transport de
  voyageurs par taxi et VTC — ce qui légitime le balisage `TaxiService`. Tout est dans
  `src/data/site.ts` et émis par le `LocalBusiness`.
- **La fiche Google** doit maintenant porter **les mêmes** nom, adresse et téléphone :
  elle pointe encore l'adresse londonienne, et une divergence site / fiche est le
  signal qui coûte le plus cher en référencement local.
- **Les mentions légales** — un site édité depuis la France doit publier l'identité de
  son éditeur. Les données sont réunies, la page reste à écrire. `cookie-policy-uk`
  est par ailleurs à revoir : l'éditeur est français, le RGPD s'applique.

## Calendrier

**Livraison début octobre 2026** — un mois, site et moteur ensemble. Le marché est
saisonnier (réservations en décembre) et une refonte qui déplace 260 URL provoque un
creux de trafic de quelques semaines : c'est précisément pour cela que la date ne
peut pas glisser en novembre. Ordre des travaux sur les quatre semaines dans
`docs/moteur-reservation.md`.

## Ressources

Dans le dossier parent `1- PROJETS/ALPSSKITRANSFERS/` : `Logo/`, `pHOTOS/` (visuels
par station et par véhicule), `Prix tarnsfers/` (CSV WooCommerce — attention, produit
cartésien 82 × 82 dont les prix sont majoritairement vides), `Sauvegarde/`.
