# Mise en ligne — la séquence

Ce document est la procédure du jour J. Il existe parce que les informations
étaient éparpillées entre `CLAUDE.md`, `docs/REPRISE.md` et le master SEO, et
qu'une bascule se conduit dans un ordre, pas en piochant dans trois fichiers.

**Le principe qui commande tout le reste : le domaine d'abord, l'indexation
ensuite.** Ouvrir l'indexation avant que `www.alpsskitransfers.com` ne serve le
nouveau site expose la préproduction Vercel aux moteurs — un duplicata complet
sur un domaine parasite, à désindexer ensuite page par page.

---

## 1. Ce qui doit être réglé avant de toucher au DNS

Rien de tout cela n'est du développement : ce sont des décisions et des données
qui n'appartiennent qu'au client.

| | Où ça se voit | Bloquant ? |
|---|---|---|
| **Barème tarifaire validé** | `BAREME_VALIDE = false` dans `src/lib/tarification/bareme.ts` | **oui** — le moteur affiche des prix mais n'encaisse pas |
| **Compte Stripe en production** | clés `sk_live` / `pk_live` / `whsec_` | **oui** pour encaisser |
| **Supabase** | tables créées (`docs/supabase-schema.sql`), clés posées | **oui** pour enregistrer une réservation |
| **Test de bout en bout** | une réservation réelle : session, carte, webhook signé, e-mails, ligne `payee` | **oui** |
| **Taux de change** | `src/lib/reservation/devises.ts`, figés au 8 septembre 2026 | oui si GBP/USD affichés |
| **Médiateur de la consommation** | `[À REMPLACER]` dans les mentions légales, les quatre langues | oui — obligation légale (art. L.612-1) |
| **Fiche Google Business** | doit porter les **mêmes** nom, adresse et téléphone que `src/data/site.ts` | non, mais c'est le premier levier de trafic local |
| **Avis** | `GOOGLE_PLACE_ID` + `GOOGLE_MAPS_API_KEY` — sans eux, quatre témoignages non vérifiables | non |
| **Tunnel WooCommerce de repli** | déplacé sur `book.alpsskitransfers.com`, sorti de l'index, joignable | oui — c'est le filet |

---

## 2. Le jour J, dans cet ordre

1. **Brancher le domaine sur Vercel.** `www.alpsskitransfers.com` et
   `alpsskitransfers.com` (redirection vers `www`). Attendre les certificats.
2. **Vérifier que le site répond sur le domaine** — une page de chaque type :
   home, station, trajet, hub pays, tunnel, une page traduite.
3. **Puis seulement, ouvrir l'indexation.** Variable d'environnement de
   production sur Vercel :
   ```
   NEXT_PUBLIC_INDEXATION=ouverte
   ```
   puis redéployer (Vercel le propose quand on change une variable). Le build
   doit afficher `[seo] indexation OUVERTE`.
4. **Contrôler l'ouverture**, sur le domaine définitif :
   - `https://www.alpsskitransfers.com/robots.txt` → `Allow: /`, plus de
     `Disallow: /`, et la ligne `Sitemap:` présente ;
   - une page au hasard : plus de `<meta name="robots" content="noindex">` ;
   - l'en-tête HTTP : plus de `X-Robots-Tag: noindex` ;
   - `canonical` auto-référent sur le bon domaine.
5. **Recetter les redirections.** Les 261 anciennes URL ont un sort vérifié à
   chaque build, mais il faut le vérifier *en ligne* : tirer au sort une
   quinzaine d'URL dans `wp-export/inventaire.json`, dont les quatre pages en
   410 et les vingt-six URL autrichiennes, et vérifier le code de réponse et la
   destination finale — un seul saut, jamais deux.
6. **Search Console.** Ajouter la propriété (domaine, ce qui couvre les quatre
   variantes), soumettre `sitemap.xml`, puis utiliser l'outil d'inspection sur
   la home et deux pages de station.
7. **Bing Webmaster Tools.** Même chose ; l'import depuis la Search Console
   évite de tout refaire.

---

## 3. Les trois semaines qui suivent

C'est là que se joue la conservation du trafic sur 260 URL déplacées.

- **Les 404 dans la Search Console**, deux fois par semaine. Une URL oubliée se
  découvre là, et se corrige dans `src/data/redirections.ts` — jamais dans le
  fichier généré.
- **`site:alpsskitransferv2.vercel.app` sur Google.** Si des pages de
  préproduction ont été indexées avant la fermeture, elles se retirent par
  l'outil de suppression de la Search Console. À vérifier une fois, une semaine
  après la bascule.
- **Les positions**, sur les requêtes du master SEO. Un creux de quelques
  semaines est normal après une refonte qui déplace 260 URL ; ce qui ne l'est
  pas, c'est un creux qui ne remonte pas au bout d'un mois.
- **Le repli du moteur.** `NEXT_PUBLIC_MOTEUR_RESERVATION` reste sur
  `wordpress` tant que le moteur maison n'a pas encaissé des réservations
  réelles sans incident. La bascule se fait par variable d'environnement, sans
  redéploiement du code.

---

## 4. Les pièges déjà rencontrés

- **Ne jamais ouvrir l'indexation avant le domaine.** C'est le seul point de
  cette page qui ne se rattrape pas facilement.
- **Le défaut de `NEXT_PUBLIC_INDEXATION` est « fermé »**, et c'est voulu : un
  oubli rend le site invisible plutôt que d'exposer une préproduction. Le
  contrôle de prebuild affiche l'état à chaque build — le lire.
- **Un seul processus par dossier `.next`.** `next dev` et `next build` y
  écrivent tous les deux ; `NEXT_DIST_DIR` sépare les trois usages.
- **Ne jamais recopier une règle générée** dans `src/data/redirections.ts` : le
  doublon masque la règle et bloque le build.
