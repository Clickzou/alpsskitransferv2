import { createSign } from "node:crypto";

/**
 * L'accès aux API Google par un compte de service — sans SDK.
 *
 * Le site tient sur trois dépendances de production ; `googleapis` en ajouterait
 * plusieurs dizaines de mégaoctets pour deux appels. Un compte de service
 * s'authentifie en signant un jeton JWT avec sa clé privée, ce que `node:crypto`
 * fait très bien, puis l'échange contre un jeton d'accès d'une heure.
 *
 * Les identifiants sont ceux du compte de service Clickzou, collés dans Vercel :
 * - `GSC_CREDENTIALS_B64` — le JSON du compte, encodé en base64 (le plus sûr) ;
 * - ou `GSC_CREDENTIALS` — le JSON tel quel.
 * Mêmes noms que sur le site Clickzou, pour pouvoir recopier la valeur.
 */

interface CompteService {
  client_email: string;
  private_key: string;
}

/**
 * Un JSON collé dans une variable arrive souvent avec la clé privée sur
 * plusieurs lignes réelles, que `JSON.parse` refuse. On ré-échappe les sauts de
 * ligne à l'intérieur des chaînes seulement.
 */
function lireJson(brut: string): Record<string, unknown> {
  try {
    return JSON.parse(brut);
  } catch {
    let dansChaine = false;
    let echappe = false;
    let repare = "";
    for (const c of brut.trim()) {
      if (echappe) {
        repare += c;
        echappe = false;
      } else if (c === "\\") {
        repare += c;
        echappe = true;
      } else if (c === '"') {
        dansChaine = !dansChaine;
        repare += c;
      } else if (dansChaine && (c === "\n" || c === "\r")) {
        repare += c === "\n" ? "\\n" : "";
      } else {
        repare += c;
      }
    }
    return JSON.parse(repare);
  }
}

export function compteService(): CompteService | null {
  const b64 = process.env.GSC_CREDENTIALS_B64?.trim();
  const brut = b64 ? Buffer.from(b64, "base64").toString("utf8") : process.env.GSC_CREDENTIALS;
  if (!brut) return null;
  try {
    const json = lireJson(brut);
    const email = json.client_email;
    const cle = json.private_key;
    return typeof email === "string" && typeof cle === "string"
      ? { client_email: email, private_key: cle }
      : null;
  } catch {
    console.error("[google] identifiants du compte de service illisibles");
    return null;
  }
}

const base64url = (texte: string | Buffer) => Buffer.from(texte).toString("base64url");

const jetons = new Map<string, { valeur: string; expire: number }>();

/** Un jeton d'accès pour cette portée, gardé jusqu'à cinq minutes de son expiration. */
async function jeton(portee: string): Promise<string> {
  const connu = jetons.get(portee);
  if (connu && connu.expire > Date.now() + 5 * 60 * 1000) return connu.valeur;

  const compte = compteService();
  if (!compte) throw new Error("Identifiants Google absents.");

  const maintenant = Math.floor(Date.now() / 1000);
  const entete = base64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const charge = base64url(
    JSON.stringify({
      iss: compte.client_email,
      scope: portee,
      aud: "https://oauth2.googleapis.com/token",
      iat: maintenant,
      exp: maintenant + 3600,
    }),
  );
  const signature = createSign("RSA-SHA256").update(`${entete}.${charge}`).sign(compte.private_key);

  const reponse = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: `${entete}.${charge}.${base64url(signature)}`,
    }),
    cache: "no-store",
  });
  const donnees = (await reponse.json()) as { access_token?: string; expires_in?: number; error_description?: string };
  if (!reponse.ok || !donnees.access_token) {
    throw new Error(`Google refuse le compte de service : ${donnees.error_description ?? reponse.status}`);
  }
  jetons.set(portee, { valeur: donnees.access_token, expire: Date.now() + (donnees.expires_in ?? 3600) * 1000 });
  return donnees.access_token;
}

/** Un appel POST authentifié ; l'erreur de Google remonte telle quelle, pour être lue. */
export async function appelGoogle<T>(url: string, portee: string, corps: unknown): Promise<T> {
  const reponse = await fetch(url, {
    method: "POST",
    headers: { Authorization: `Bearer ${await jeton(portee)}`, "Content-Type": "application/json" },
    body: JSON.stringify(corps),
    cache: "no-store",
  });
  const donnees = (await reponse.json()) as T & { error?: { message?: string; status?: string } };
  if (!reponse.ok) {
    throw new Error(donnees.error?.message ?? `Erreur Google ${reponse.status}`);
  }
  return donnees;
}
