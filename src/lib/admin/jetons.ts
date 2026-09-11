/**
 * Les cookies de session du back-office, et ce qu'il faut pour les prolonger.
 *
 * Partagés par `session.ts` (pages et actions) et `proxy.ts`. C'est le proxy
 * qui prolonge la session, parce qu'une page n'a pas le droit d'écrire un
 * cookie : le rafraîchissement tenté depuis la page échouait en silence, et la
 * session tombait au bout d'une heure — la durée du jeton d'accès de Supabase —
 * au lieu de tenir la journée (revue du 11 septembre 2026).
 */

export const COOKIE_ACCES = "ast_admin";
export const COOKIE_RAFRAICHISSEMENT = "ast_admin_r";
export const DUREE_RAFRAICHISSEMENT = 60 * 60 * 24 * 30;

export function optionsCookie(duree: number) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: duree,
  };
}

/**
 * Le jeton d'accès expire-t-il dans la minute ?
 *
 * On lit seulement sa date d'expiration, sans vérifier la signature : ce n'est
 * pas une preuve d'identité, juste le signal qu'il faut le renouveler.
 * Supabase vérifie le jeton lui-même, à chaque page (`utilisateurCourant`).
 */
export function jetonAExpirer(jeton: string | undefined, maintenant = Date.now()): boolean {
  if (!jeton) return true;
  try {
    const charge = jeton.split(".")[1] ?? "";
    const base64 = charge.replace(/-/g, "+").replace(/_/g, "/");
    const json = JSON.parse(atob(base64.padEnd(Math.ceil(base64.length / 4) * 4, "="))) as {
      exp?: number;
    };
    return !json.exp || json.exp * 1000 - maintenant < 60_000;
  } catch {
    return true;
  }
}

export interface JetonsSupabase {
  access_token: string;
  refresh_token: string;
  expires_in: number;
}

/** Échange le jeton de rafraîchissement contre une nouvelle paire — `null` si Supabase refuse. */
export async function echangerRafraichissement(jeton: string): Promise<JetonsSupabase | null> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const cle = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !cle) return null;
  try {
    const reponse = await fetch(`${url}/auth/v1/token?grant_type=refresh_token`, {
      method: "POST",
      headers: { "Content-Type": "application/json", apikey: cle },
      body: JSON.stringify({ refresh_token: jeton }),
      cache: "no-store",
    });
    if (!reponse.ok) return null;
    const donnees = (await reponse.json()) as Partial<JetonsSupabase>;
    return donnees.access_token && donnees.refresh_token
      ? {
          access_token: donnees.access_token,
          refresh_token: donnees.refresh_token,
          expires_in: donnees.expires_in ?? 3600,
        }
      : null;
  } catch {
    return null;
  }
}
