/**
 * L'interrupteur d'indexation du site.
 *
 * ## Pourquoi il existe
 *
 * Le site vit sur une URL Vercel avant d'être servi depuis
 * `www.alpsskitransfers.com`. Sans garde-fou, cette préproduction est
 * parfaitement explorable : `robots.txt` répond `Allow: /` et aucune page ne
 * porte de `noindex`. Un domaine `.vercel.app` se découvre très bien — par un
 * lien, par les journaux de certificats, par la barre d'adresse d'un
 * navigateur qui synchronise. Le jour où il est indexé, on hérite d'un
 * duplicata complet du futur site sur un domaine parasite, à désindexer
 * ensuite page par page.
 *
 * Le `canonical` absolu vers le domaine final ne suffit pas : c'est une
 * indication, pas une directive, et Google la refuse volontiers quand l'URL
 * canonique annoncée sert un autre contenu — ce qui est exactement le cas tant
 * que le WordPress est encore en ligne.
 *
 * ## Comment il marche
 *
 * Une variable d'environnement, `NEXT_PUBLIC_INDEXATION`, et **le défaut est
 * fermé**. C'est le sens qui compte : un oubli de configuration doit fermer le
 * site aux moteurs, jamais l'ouvrir. On perd quelques jours d'indexation si on
 * oublie de l'ouvrir le jour de la bascule ; on perd des mois à désindexer une
 * préproduction si le défaut avait été l'inverse.
 *
 * Trois verrous, parce qu'aucun ne couvre tout seul :
 *
 * 1. `robots.ts` sert un `Disallow: /` — il empêche l'exploration.
 * 2. `proxy.ts` pose `X-Robots-Tag: noindex, nofollow` sur chaque réponse —
 *    il empêche l'indexation d'une URL déjà connue, que `robots.txt` ne sait
 *    pas faire (une URL bloquée mais liée peut être indexée sans contenu).
 * 3. `pageMetadata` pose le `noindex` dans le `<head>` — il couvre le cas où
 *    la page est servie sans passer par le proxy (fichier statique du CDN).
 *
 * ## Le jour de la mise en ligne
 *
 * Poser `NEXT_PUBLIC_INDEXATION=ouverte` sur l'environnement de production
 * Vercel, et redéployer. La variable est `NEXT_PUBLIC_` parce que les pages
 * sont statiques : elle est lue au build, comme celle du moteur de
 * réservation. Vercel propose le redéploiement quand on change une variable.
 *
 * À ne faire **qu'une fois le domaine définitif branché** : ouvrir
 * l'indexation sur l'URL `.vercel.app` produit exactement le problème que ce
 * module évite.
 */

/** Vrai seulement si l'indexation a été ouverte explicitement. */
export function indexationOuverte(): boolean {
  return process.env.NEXT_PUBLIC_INDEXATION === "ouverte";
}
