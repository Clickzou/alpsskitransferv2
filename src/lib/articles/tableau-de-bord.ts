import { timingSafeEqual } from "crypto";

/**
 * Accès des routes /api/articles-programmes/ (tableau de bord client Clickzou).
 *
 * `Authorization: Bearer <TABLEAU_DE_BORD_CLE>` — la même valeur est posée côté
 * Clickzou. Clé absente ou de moins de 32 caractères : tout est refusé, plutôt
 * qu'une API ouverte par oubli. Comparaison à temps constant.
 */
export function autoriseTableauDeBord(requete: Request): boolean {
  const cle = process.env.TABLEAU_DE_BORD_CLE;
  const recu = requete.headers.get("authorization") ?? "";
  if (!cle || cle.length < 32) return false;
  const attendu = Buffer.from(`Bearer ${cle}`);
  const donne = Buffer.from(recu);
  return attendu.length === donne.length && timingSafeEqual(attendu, donne);
}

/** En-têtes de toutes les réponses : jamais en cache, jamais indexées. */
export const ENTETES_TABLEAU_DE_BORD = {
  "Cache-Control": "no-store",
  "X-Robots-Tag": "noindex, nofollow",
} as const;
