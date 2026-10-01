import { SITE } from "@/data/site";

/**
 * Le domaine nu, et le saut unique vers `www`.
 *
 * L'ancien WordPress vivait sur `alpsskitransfers.com`, sans `www` : c'est
 * sous cette forme que ses 261 URL sont indexées et liées. Le nouveau site vit
 * sur `www`. Laisser Vercel rediriger le domaine nu vers `www` ferait de chaque
 * ancienne URL une chaîne — nu → `www` (308), puis `www` → nouvelle URL (301) —
 * soit exactement ce que `check-redirections.mjs` refuse au build, mais qu'il
 * ne peut pas voir puisqu'il ne connaît que les chemins.
 *
 * Le proxy s'en charge donc lui-même : sur le domaine nu, il répond d'un seul
 * 301 vers l'URL finale en `www`. **Dans Vercel, le domaine nu se branche sur
 * la production sans redirection** ; en ajouter une recrée la chaîne.
 */

const HOTE_CANONIQUE = new URL(SITE.url).hostname;
const HOTE_NU = HOTE_CANONIQUE.replace(/^www\./, "");

/** Vrai pour `alpsskitransfers.com`, avec ou sans port, quelle que soit la casse. */
export function estDomaineNu(hote: string | null): boolean {
  if (!hote) return false;
  return hote.toLowerCase().split(":")[0] === HOTE_NU;
}

/**
 * Le chemin tel que `trailingSlash: true` le servira : avec sa barre finale,
 * sauf pour un fichier (`/llms.txt`). Sans cela, le domaine nu enverrait vers
 * `www` un chemin que Next normaliserait aussitôt — un deuxième saut.
 */
function avecBarreFinale(chemin: string): string {
  if (chemin.endsWith("/")) return chemin;
  const dernier = chemin.slice(chemin.lastIndexOf("/") + 1);
  return dernier.includes(".") ? chemin : `${chemin}/`;
}

/**
 * L'URL en `www` où envoyer une requête reçue sur le domaine nu.
 * `destination` est la cible d'une règle 301 quand le chemin en a une ; sinon
 * le chemin et sa chaîne de requête sont conservés.
 */
export function urlCanonique(
  chemin: string,
  recherche: string,
  destination?: string,
): string {
  if (destination) return new URL(destination, SITE.url).toString();
  return new URL(`${avecBarreFinale(chemin)}${recherche}`, SITE.url).toString();
}
