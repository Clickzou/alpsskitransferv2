import { createHmac, timingSafeEqual } from "crypto";

/**
 * Liens d'aperçu des articles programmés (relecture avant parution).
 *
 * Un article dont la date n'est pas atteinte répond 404 sur /blog/<slug>/ : il
 * n'est lisible que par /blog/apercu/<slug>/?sig=<signature>. La signature
 * (HMAC-SHA256 du slug, en base64url) utilise la clé `TABLEAU_DE_BORD_CLE`, la
 * même que l'API du tableau de bord Clickzou : on ne peut ni deviner un lien,
 * ni réutiliser celui d'un article pour un autre.
 *
 * Les liens sont fabriqués ici, côté site, et transmis au tableau de bord par
 * /api/articles-programmes/ : la clé ne quitte jamais le serveur.
 */

function cle(): string | null {
  const secret = process.env.TABLEAU_DE_BORD_CLE;
  return secret && secret.length >= 32 ? secret : null;
}

function signer(slug: string, secret: string): string {
  return createHmac("sha256", secret).update(slug).digest("base64url");
}

/** Chemin d'aperçu signé d'un article (sans le domaine) ; `null` si la clé manque. */
export function cheminApercu(slug: string): string | null {
  const secret = cle();
  if (!secret) return null;
  return `/blog/apercu/${slug}/?sig=${signer(slug, secret)}`;
}

/** Vrai si la signature correspond au slug. Comparaison à temps constant. */
export function apercuValide(slug: string, sig: string | undefined): boolean {
  const secret = cle();
  if (!secret || !sig) return false;
  const attendu = Buffer.from(signer(slug, secret));
  const recu = Buffer.from(sig);
  return attendu.length === recu.length && timingSafeEqual(attendu, recu);
}
