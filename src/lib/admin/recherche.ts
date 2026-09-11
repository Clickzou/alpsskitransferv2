import { instantAlpes } from "@/lib/temps";

/**
 * La recherche du back-office : un nom, un e-mail, un téléphone ou une
 * référence, et une période de prise en charge.
 *
 * Demande de JC, 11 septembre 2026. La liste ne montre que les courses à venir
 * et les cinquante dernières ; le client qui rappelle en février pour une
 * course de décembre, ou la question du matin — « qui je conduis demain » —,
 * demandent de chercher dans toute la base.
 *
 * Le filtre est une expression PostgREST (`and=(…)`), construite ici et
 * testée : la saisie y est nettoyée de tout ce que PostgREST lirait comme de
 * la syntaxe, sans quoi une virgule dans un nom cassait la requête — ou pire,
 * en changeait le sens.
 */

export interface Critere {
  q?: string;
  du?: string;
  au?: string;
}

/** La saisie, débarrassée de ce que PostgREST lirait comme de la syntaxe. */
export function saisieRecherche(q: unknown): string {
  if (typeof q !== "string") return "";
  return q
    .replace(/[,()*"\\%]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 60);
}

function jour(valeur: unknown): { a: number; m: number; j: number } | null {
  if (typeof valeur !== "string") return null;
  const m = valeur.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  return m ? { a: Number(m[1]), m: Number(m[2]), j: Number(m[3]) } : null;
}

/**
 * Le filtre PostgREST, ou `null` quand il n'y a rien à chercher.
 *
 * Les dates sont des **journées à l'heure des Alpes** : « le 12 » commence à
 * minuit à Genève, pas à minuit UTC — sans quoi une prise en charge à 1 h du
 * matin tombait dans la veille. Une course répond si son aller **ou** son
 * retour tombe dans la période : c'est la journée du chauffeur qui compte.
 */
export function filtreRecherche(critere: Critere): string | null {
  const conditions: string[] = [];

  const q = saisieRecherche(critere.q);
  if (q) {
    const motif = `"*${q}*"`;
    const colonnes = ["client_nom", "client_email", "client_telephone", "reference"];
    conditions.push(`or(${colonnes.map((c) => `${c}.ilike.${motif}`).join(",")})`);
  }

  const du = jour(critere.du);
  const au = jour(critere.au);
  if (du || au) {
    const debut = du ? instantAlpes(du.a, du.m, du.j, 0, 0).toISOString() : null;
    const fin = au
      ? new Date(instantAlpes(au.a, au.m, au.j, 23, 59).getTime() + 59_999).toISOString()
      : null;
    const borne = (colonne: string) =>
      [debut ? `${colonne}.gte."${debut}"` : null, fin ? `${colonne}.lte."${fin}"` : null]
        .filter(Boolean)
        .join(",");
    conditions.push(`or(and(${borne("aller")}),and(${borne("retour")}))`);
  }

  return conditions.length > 0 ? `(${conditions.join(",")})` : null;
}
