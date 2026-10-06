import { NextResponse } from "next/server";
import { ENTETES_TABLEAU_DE_BORD, autoriseTableauDeBord } from "@/lib/articles/tableau-de-bord";
import { supabaseConfigure } from "@/lib/reservation/supabase";

/**
 * GET /api/tableau-de-bord/ventes/?du=YYYY-MM-DD&au=YYYY-MM-DD — les ventes de
 * la période pour le tableau de bord client Clickzou (carte « Ventes et chiffre
 * d'affaires »). Lecture seule, même clé que /api/articles-programmes/.
 *
 * Une vente = une réservation payée (`paye_le` renseigné), datée à son
 * paiement en heure de Paris — jamais à sa création : un devis ou un paiement
 * abandonné n'a pas de `paye_le`. Le montant est celui de la réservation (TTC),
 * moins ce qui a été remboursé sur elle (table `paiements`, statut
 * `rembourse`). Une course intégralement remboursée ne compte plus comme vente.
 *
 * Aucune donnée client ne sort : la requête ne lit que référence, montant,
 * devise et date de paiement.
 */
export const dynamic = "force-dynamic";

const DEVISE = "EUR";
const JOURS_MAX = 400;
const PAGE = 1000;

interface LigneVente {
  reference: string;
  montant: string | number;
  devise: string | null;
  paye_le: string;
}

const reponse = (corps: unknown, status = 200) =>
  NextResponse.json(corps, { status, headers: ENTETES_TABLEAU_DE_BORD });

/** Jour civil parisien (YYYY-MM-DD) d'un instant. */
const jourParis = (iso: string) =>
  new Intl.DateTimeFormat("sv-SE", { timeZone: "Europe/Paris" }).format(new Date(iso));

/** Une date YYYY-MM-DD qui existe au calendrier, ou `null`. */
function dateValide(texte: string | null): Date | null {
  if (!texte || !/^\d{4}-\d{2}-\d{2}$/.test(texte)) return null;
  const d = new Date(`${texte}T00:00:00Z`);
  return Number.isNaN(d.getTime()) || d.toISOString().slice(0, 10) !== texte ? null : d;
}

/** Lecture PostgREST qui distingue « aucune ligne » d'un échec (`null`). */
async function lireTout<T>(table: string, parametres: Record<string, string>): Promise<T[] | null> {
  const toutes: T[] = [];
  for (let debut = 0; ; debut += PAGE) {
    const url = new URL(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/${table}`);
    for (const [cle, valeur] of Object.entries(parametres)) url.searchParams.set(cle, valeur);
    url.searchParams.set("limit", String(PAGE));
    url.searchParams.set("offset", String(debut));
    try {
      const r = await fetch(url, {
        headers: {
          apikey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
          Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
        },
        cache: "no-store",
      });
      if (!r.ok) {
        console.error(`[tableau-de-bord/ventes] lecture refusée sur ${table}`, await r.text());
        return null;
      }
      const lignes = (await r.json()) as T[];
      toutes.push(...lignes);
      if (lignes.length < PAGE) return toutes;
    } catch (erreur) {
      console.error(`[tableau-de-bord/ventes] lecture impossible sur ${table}`, erreur);
      return null;
    }
  }
}

export async function GET(requete: Request) {
  const cle = process.env.TABLEAU_DE_BORD_CLE;
  if (!cle || cle.length < 32) return reponse({ erreur: "Accès non configuré" }, 503);
  if (!autoriseTableauDeBord(requete)) return reponse({ erreur: "Non autorisé" }, 401);

  const q = new URL(requete.url).searchParams;
  const du = dateValide(q.get("du"));
  const au = dateValide(q.get("au"));
  if (!du || !au || au < du) return reponse({ erreur: "Paramètres du et au attendus (YYYY-MM-DD, du ≤ au)" }, 400);
  const nbJours = Math.round((au.getTime() - du.getTime()) / 86_400_000) + 1;
  if (nbJours > JOURS_MAX) return reponse({ erreur: `Période limitée à ${JOURS_MAX} jours` }, 400);

  if (!supabaseConfigure()) return reponse({ erreur: "Base des réservations non configurée" }, 503);

  const debut = q.get("du")!;
  const fin = q.get("au")!;
  // Un jour de marge de chaque côté ; le tri exact se fait sur le jour parisien.
  const de = new Date(du.getTime() - 86_400_000).toISOString();
  const a = new Date(au.getTime() + 2 * 86_400_000).toISOString();

  const lignes = await lireTout<LigneVente>("reservations", {
    select: "reference,montant,devise,paye_le",
    and: `(paye_le.gte."${de}",paye_le.lt."${a}")`,
    order: "paye_le.asc",
  });
  if (!lignes) return reponse({ erreur: "La base des réservations n'a pas répondu" }, 502);

  const dansPeriode = lignes.filter((l) => {
    const jour = jourParis(l.paye_le);
    return jour >= debut && jour <= fin;
  });
  const ventes = dansPeriode.filter((l) => (l.devise ?? DEVISE).toUpperCase() === DEVISE);
  const autresDevises = dansPeriode.length - ventes.length;

  // Les remboursements de ces ventes, quelle que soit leur date.
  const rembourse = new Map<string, number>();
  for (let i = 0; i < ventes.length; i += 150) {
    const lot = ventes.slice(i, i + 150).map((v) => v.reference);
    const remb = await lireTout<{ reference: string; montant: string | number | null }>("paiements", {
      select: "reference,montant",
      statut: "eq.rembourse",
      reference: `in.(${lot.join(",")})`,
    });
    if (!remb) return reponse({ erreur: "La base des paiements n'a pas répondu" }, 502);
    for (const r of remb) rembourse.set(r.reference, (rembourse.get(r.reference) ?? 0) + Number(r.montant ?? 0));
  }

  const parJour = new Map<string, { ventes: number; centimes: number }>();
  for (let t = du.getTime(); t <= au.getTime(); t += 86_400_000) {
    parJour.set(new Date(t).toISOString().slice(0, 10), { ventes: 0, centimes: 0 });
  }
  for (const v of ventes) {
    const encaisse = Math.round(Number(v.montant) * 100);
    const net = encaisse - Math.round((rembourse.get(v.reference) ?? 0) * 100);
    const jour = parJour.get(jourParis(v.paye_le))!;
    if (net > 0) jour.ventes += 1;
    jour.centimes += Math.max(0, net);
  }

  const jours = [...parJour].map(([date, j]) => ({ date, ventes: j.ventes, ca: j.centimes / 100 }));
  const totalCentimes = [...parJour.values()].reduce((s, j) => s + j.centimes, 0);

  let definition =
    "Vente = réservation de transfert payée (carte ou virement), datée au jour de son paiement (heure de Paris) ; " +
    "devis et paiements abandonnés exclus. CA = montant TTC encaissé moins les remboursements de ces réservations ; " +
    "une réservation intégralement remboursée ne compte plus.";
  if (autresDevises > 0) {
    definition += ` Seuls les montants en ${DEVISE} sont comptés : ${autresDevises} réservation(s) dans une autre devise écartée(s).`;
  }

  return reponse({
    devise: DEVISE,
    ventes: jours.reduce((s, j) => s + j.ventes, 0),
    ca: totalCentimes / 100,
    parJour: jours,
    definition,
  });
}
