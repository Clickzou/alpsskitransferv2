/**
 * Accès Supabase en REST, sans SDK.
 *
 * Le site tient sur trois dépendances de production — next, react, react-dom — et
 * PostgREST s'interroge très bien avec `fetch`. Ajouter un client de 300 Ko pour
 * poser une ligne dans une table serait cher payé.
 *
 * La clé de service ne quitte jamais le serveur : ces fonctions ne sont appelées
 * que depuis des route handlers.
 */

export function supabaseConfigure(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

function entetes(): HeadersInit {
  const cle = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  return {
    "Content-Type": "application/json",
    apikey: cle,
    Authorization: `Bearer ${cle}`,
    Prefer: "return=representation",
  };
}

/**
 * Insère une ligne et renvoie la ligne créée, ou `null` si Supabase n'est pas
 * configuré ou refuse l'écriture. L'appelant décide quoi faire d'un échec — ici,
 * une réservation perdue n'est jamais acceptable, donc l'API prévient l'exploitant
 * par e-mail en parallèle.
 */
export async function inserer<T extends Record<string, unknown>>(
  table: string,
  ligne: T,
): Promise<Record<string, unknown> | null> {
  if (!supabaseConfigure()) return null;

  try {
    const reponse = await fetch(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/${table}`,
      {
        method: "POST",
        headers: entetes(),
        body: JSON.stringify(ligne),
        cache: "no-store",
      },
    );
    if (!reponse.ok) {
      console.error(`[supabase] insertion refusée sur ${table}`, await reponse.text());
      return null;
    }
    const lignes = (await reponse.json()) as Record<string, unknown>[];
    return lignes[0] ?? null;
  } catch (erreur) {
    console.error(`[supabase] insertion impossible sur ${table}`, erreur);
    return null;
  }
}

/** Met à jour les lignes d'une table filtrées par une colonne. */
export async function mettreAJour(
  table: string,
  filtre: { colonne: string; valeur: string },
  champs: Record<string, unknown>,
): Promise<boolean> {
  if (!supabaseConfigure()) return false;

  try {
    const url = new URL(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/${table}`);
    url.searchParams.set(filtre.colonne, `eq.${filtre.valeur}`);
    const reponse = await fetch(url, {
      method: "PATCH",
      headers: entetes(),
      body: JSON.stringify(champs),
      cache: "no-store",
    });
    if (!reponse.ok) {
      console.error(`[supabase] mise à jour refusée sur ${table}`, await reponse.text());
      return false;
    }
    return true;
  } catch (erreur) {
    console.error(`[supabase] mise à jour impossible sur ${table}`, erreur);
    return false;
  }
}
