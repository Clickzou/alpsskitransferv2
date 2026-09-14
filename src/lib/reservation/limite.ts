import { createHash } from "node:crypto";
import { ENTREPRISE } from "@/data/site";
import { utilisateurCourant } from "@/lib/admin/session";
import { supabaseConfigure } from "@/lib/reservation/supabase";

/**
 * La limite de devis par visiteur — demande de JC, 14 septembre 2026 : que
 * les concurrents ne puissent pas relever nos prix en masse, sans rien ôter
 * au référencement.
 *
 * Trente devis par heure et par connexion. Un client en fait trois ou quatre
 * — un aller, un retour, un autre véhicule ; un robot qui relève cinquante
 * trajets sur trois tailles de groupe en fait des centaines. Les pages, elles,
 * restent entièrement lisibles par Google et les IA : seul le calcul de prix à
 * la demande est compté.
 *
 * **La limite s'efface quand elle ne peut pas compter** — base injoignable,
 * table absente : un prix qu'un client ne voit pas coûte une vente, un prix
 * qu'un concurrent voit ne coûte rien de plus que ce qu'il voit déjà sur la
 * page. L'exploitant connecté au back-office n'est jamais limité : il chiffre
 * au téléphone toute la journée.
 */

export const DEVIS_PAR_HEURE = 30;

/** L'adresse du visiteur, telle que Vercel la transmet. */
function adresse(requete: Request): string {
  return (
    requete.headers.get("x-real-ip") ??
    requete.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "inconnue"
  );
}

/** L'empreinte de l'adresse et de l'heure — on compte sans garder d'adresse IP. */
function cle(requete: Request, maintenant: Date): string {
  const sel = process.env.SECRET_GESTION ?? "alpsskitransfers";
  const empreinte = createHash("sha256").update(`${sel}|${adresse(requete)}`).digest("hex").slice(0, 32);
  return `${empreinte}|${maintenant.toISOString().slice(0, 13)}`;
}

async function compter(valeur: string): Promise<number | null> {
  if (!supabaseConfigure()) return null;
  try {
    const reponse = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/rpc/compter_demande`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
        Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
      },
      body: JSON.stringify({ p_cle: valeur }),
      signal: AbortSignal.timeout(1500),
      cache: "no-store",
    });
    if (!reponse.ok) return null;
    const total = await reponse.json();
    return typeof total === "number" ? total : null;
  } catch {
    return null;
  }
}

/**
 * `null` si la demande passe ; sinon la réponse 429 à renvoyer telle quelle.
 * Le compte ne se fait qu'une fois par demande, avant tout calcul.
 */
export async function limiteDevis(requete: Request, maintenant = new Date()): Promise<Response | null> {
  const total = await compter(cle(requete, maintenant));
  if (total === null || total <= DEVIS_PAR_HEURE) return null;
  // Au-delà de la limite seulement, on vérifie la session : l'exploitant passe toujours.
  if (await utilisateurCourant()) return null;
  return Response.json(
    {
      erreur: `Too many price requests from your connection. Please try again in an hour, or call us on ${ENTREPRISE.telephoneAffiche}.`,
    },
    { status: 429, headers: { "Retry-After": "3600" } },
  );
}
