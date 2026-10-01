import { SITE } from "@/data/site";

/**
 * Le domaine canonique, et le saut unique depuis son jumeau.
 *
 * Le site vit sur `alpsskitransfers.com`, **sans `www`** — décision de JC, le
 * 1er octobre 2026 : c'est la forme sous laquelle le WordPress était indexé et
 * lié, donc celle où les pages de station gardent leur adresse à l'identique,
 * sans la moindre redirection.
 *
 * L'autre forme (`www`) doit y mener en **un seul saut**. Si le proxy la
 * reçoit, il répond d'un 301 vers l'URL finale — règle de migration comprise —
 * plutôt que d'enchaîner jumeau → canonique, puis ancienne → nouvelle URL, ce
 * que `check-redirections.mjs` refuse mais ne peut pas voir, lui qui ne connaît
 * que les chemins. Tout se déduit de `SITE.url` : changer de forme canonique
 * est une ligne dans `data/site.ts`.
 */

const HOTE_CANONIQUE = new URL(SITE.url).hostname;
const HOTE_JUMEAU = HOTE_CANONIQUE.startsWith("www.")
  ? HOTE_CANONIQUE.slice(4)
  : `www.${HOTE_CANONIQUE}`;

/** Vrai pour l'autre forme du domaine, avec ou sans port, quelle que soit la casse. */
export function estDomaineJumeau(hote: string | null): boolean {
  if (!hote) return false;
  return hote.toLowerCase().split(":")[0] === HOTE_JUMEAU;
}

/**
 * Le chemin tel que `trailingSlash: true` le servira : avec sa barre finale,
 * sauf pour un fichier (`/llms.txt`). Sans cela, le jumeau enverrait vers le
 * domaine canonique un chemin que Next normaliserait aussitôt — un deuxième
 * saut.
 */
function avecBarreFinale(chemin: string): string {
  if (chemin.endsWith("/")) return chemin;
  const dernier = chemin.slice(chemin.lastIndexOf("/") + 1);
  return dernier.includes(".") ? chemin : `${chemin}/`;
}

/**
 * L'URL canonique où envoyer une requête reçue sur le jumeau.
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
