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
| **Barème tarifaire validé** | variable `BAREME_VALIDE` — absente = fermé | **oui** — le moteur affiche des prix mais n'encaisse pas |
| **Compte Stripe en production** | voir la section 1 bis ci-dessous | **oui** pour encaisser |
| **Supabase** | tables créées (`docs/supabase-schema.sql`), clés posées | **oui** pour enregistrer une réservation |
| **Test de bout en bout** | une réservation réelle : session, carte, webhook signé, e-mails, ligne `payee` | **oui** |
| **Taux de change** | `src/lib/reservation/devises.ts`, figés au 8 septembre 2026 | oui si GBP/USD affichés |
| **Médiateur de la consommation** | `[À REMPLACER]` dans les mentions légales, les quatre langues | oui — obligation légale (art. L.612-1) |
| **Fiche Google Business** | doit porter les **mêmes** nom, adresse et téléphone que `src/data/site.ts` | non, mais c'est le premier levier de trafic local |
| **Avis** | `GOOGLE_PLACE_ID` + `GOOGLE_MAPS_API_KEY` — sans eux, quatre témoignages non vérifiables | non |
| **Tunnel WooCommerce de repli** | déplacé sur `book.alpsskitransfers.com`, sorti de l'index, joignable | oui — c'est le filet |

---

## 1 bis. Stripe — à finir quand le moteur est bouclé

Le compte **« Alps Ski Transfers »** (`acct_1UE6LCAS15fy8zV6`) a été créé le
10 septembre 2026 depuis le compte Stripe de Clickzou, en **compte distinct** —
pas dans l'organisation clickzou.fr, pour qu'il vive sans son prestataire. Seul
l'environnement de test est configuré : il sert aux essais et ne touche à aucun
argent réel.

Ce qui reste, dans cet ordre :

1. **Inviter Nassim comme administrateur** — *Paramètres → Équipe et sécurité*,
   avec son e-mail. **C'est le point qui compte le plus** : tant qu'il n'est pas
   sur le compte, celui-ci dépend de Clickzou. C'est exactement ce qui s'est
   passé avec le compte `51ETDm` de l'ancien site, dont le client ignore
   l'existence.
2. **La vérification d'entreprise**, par lui : NM Transports 73, SIREN
   889 065 165, pièce d'identité du dirigeant, IBAN de l'entreprise. Stripe met
   généralement quelques jours ouvrés — c'est le chemin critique.
3. **L'IBAN doit être celui du client.** Le reste est de l'administration ; ça,
   c'est l'endroit où arrive l'argent.
4. **Les clés de production dans Vercel**, jamais dans un fichier du dépôt :
   `STRIPE_SECRET_KEY`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`.
5. **Créer l'endpoint webhook de production** — *Développeurs → Webhooks*, sur
   `https://www.alpsskitransfers.com/api/stripe/webhook`, événement
   `checkout.session.completed` — et poser son `whsec_` dans Vercel. Celui du
   test ne signe pas les événements de production.
6. **Ouvrir l'encaissement** : `BAREME_VALIDE=oui`, une fois la grille validée
   par le client et pas avant. Défaut fermé, comme l'indexation.
7. **Faire tourner les clés de l'ancien compte** si le client en retrouve
   l'accès : elles ont circulé dans une sauvegarde de 1,39 Go.

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
