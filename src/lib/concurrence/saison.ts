import { airportParSlug } from "@/lib/airports";
import { devisReservation } from "@/lib/reservation/devis";
import { ecrireLignes, lire } from "@/lib/reservation/supabase";
import { resortParSlug } from "@/lib/resorts";
import type { CategorieVehicule } from "@/lib/tarification/bareme";
import type { Grille } from "@/lib/tarification/grille";
import { instantAlpes } from "@/lib/temps";
import { GROUPE_REFERENCE } from "./alignement";
import { isoAlpes, meilleureOffre, type Gamme } from "./comparaison";
import { CODES_LIEUX, type Concurrent } from "./lieux";
import { trajetsSuivis } from "./releve";
import { alpyAReessayer, lireAlps2alps, lireAlpy, ouvrirSessionAlpy, type Lecture, type SessionAlpy } from "./sources";
import type { LigneComparaison } from "./tableau";

/**
 * Le relevé de haute saison — demande de JC, 15 septembre 2026.
 *
 * Le relevé de nuit demande les prix à trois semaines : une date qui glisse
 * chaque jour, si bien qu'on ne compare jamais deux fois la même, et que Noël
 * ou février ne sont jamais relevés avant d'être à trois semaines. Celui-ci
 * demande **des dates fixes** — les samedis de vacances, et un samedi calme
 * pour comparer — **tous les 15 jours** (le 1er et le 15, `vercel.json`) :
 * on voit les concurrents monter leurs prix à l'approche des vacances.
 *
 * Il ne sert pas à recaler nos tarifs (le relevé de nuit s'en charge) : il
 * s'écrit dans sa propre table, `concurrence_saison`.
 *
 * **Un trajet par lot.** Dix dates, deux concurrents, pour un groupe de
 * 4 personnes : vingt demandes, espacées — alps2alps toutes les deux secondes
 * et demie, Alpy toutes les huit, lui qui a répondu 403 le 14 septembre au
 * bout d'environ 150 recherches rapprochées. Un peu plus de deux minutes par
 * trajet ; la chaîne entière, deux heures environ.
 */

export interface DateSaison {
  date: string;
  periode: string;
  libelle: string;
}

/** Les samedis — jours d'arrivée et de départ des locations. À renouveler chaque été. */
export const DATES_SAISON: DateSaison[] = [
  { date: "2026-12-19", periode: "Noël", libelle: "sam. 19 déc." },
  { date: "2026-12-26", periode: "Noël", libelle: "sam. 26 déc." },
  { date: "2027-01-02", periode: "Nouvel An", libelle: "sam. 2 janv." },
  { date: "2027-01-16", periode: "Hors vacances", libelle: "sam. 16 janv." },
  { date: "2027-02-06", periode: "Février", libelle: "sam. 6 févr." },
  { date: "2027-02-13", periode: "Février", libelle: "sam. 13 févr." },
  { date: "2027-02-20", periode: "Février", libelle: "sam. 20 févr." },
  { date: "2027-02-27", periode: "Février", libelle: "sam. 27 févr." },
  { date: "2027-04-03", periode: "Pâques", libelle: "sam. 3 avr." },
  { date: "2027-04-10", periode: "Pâques", libelle: "sam. 10 avr." },
];

export const TAILLE_LOT_SAISON = 1;
const PAUSE_A2A_MS = 2500;
const PAUSE_ALPY_MS = 8000;

/** Les dates encore à venir : on ne relève pas un samedi passé. */
export function datesAVenir(maintenant = new Date()): DateSaison[] {
  const aujourdhui = isoAlpes(maintenant);
  return DATES_SAISON.filter((d) => d.date > aujourdhui);
}

const attendre = (ms: number) => new Promise((r) => setTimeout(r, ms));

function lignes(
  base: { releve_le: string; airport: string; resort: string; date_trajet: string; passagers: number },
  source: Concurrent,
  lecture: Lecture,
) {
  return (["standard", "premium"] as Gamme[]).map((gamme) => {
    const offre = lecture.ok ? meilleureOffre(lecture.offres, gamme) : null;
    return {
      ...base,
      source,
      gamme,
      prix: offre?.prix ?? null,
      detail: offre ? offre.nom : lecture.ok ? "pas d’offre dans cette gamme" : lecture.raison,
    };
  });
}

/** Relève les dates de haute saison d'un lot de trajets, et les écrit. */
export async function releverLotSaison(lot: number, maintenant = new Date()) {
  const trajets = (await trajetsSuivis()).slice(lot * TAILLE_LOT_SAISON, (lot + 1) * TAILLE_LOT_SAISON);
  const releveLe = isoAlpes(maintenant);
  const dates = datesAVenir(maintenant);
  let session: SessionAlpy | null = null;
  let prixTrouves = 0;
  let reessais = 3;

  for (const t of trajets) {
    const depart = CODES_LIEUX[t.airport];
    const arrivee = CODES_LIEUX[t.resort];
    const aEcrire: Record<string, unknown>[] = [];

    for (const { date } of dates) {
      const base = { releve_le: releveLe, airport: t.airport, resort: t.resort, date_trajet: date, passagers: GROUPE_REFERENCE };

      let a2a: Lecture = { ok: false, raison: "alps2alps ne dessert pas ce trajet" };
      if (depart?.alps2alps && arrivee?.alps2alps) {
        a2a = await lireAlps2alps(depart.alps2alps, arrivee.alps2alps, date, GROUPE_REFERENCE);
        await attendre(PAUSE_A2A_MS);
      }

      let alpy: Lecture = { ok: false, raison: "Alpy ne dessert pas ce trajet" };
      if (depart?.alpy && arrivee?.alpy) {
        session ??= await ouvrirSessionAlpy();
        alpy = session
          ? await lireAlpy(session, depart.alpy, arrivee.alpy, t.airport.endsWith("-airport"), date, GROUPE_REFERENCE)
          : { ok: false, raison: "Alpy injoignable" };
        if (alpyAReessayer(alpy) && reessais > 0) {
          reessais -= 1;
          await attendre(20_000);
          session = await ouvrirSessionAlpy();
          alpy = session
            ? await lireAlpy(session, depart.alpy, arrivee.alpy, t.airport.endsWith("-airport"), date, GROUPE_REFERENCE)
            : { ok: false, raison: "Alpy injoignable" };
        }
        await attendre(PAUSE_ALPY_MS);
      }

      const nouvelles = [...lignes(base, "alps2alps", a2a), ...lignes(base, "alpy", alpy)];
      prixTrouves += nouvelles.filter((l) => l.prix !== null).length;
      aEcrire.push(...nouvelles);
    }

    const ecrit = new Date().toISOString();
    await ecrireLignes(
      "concurrence_saison",
      aEcrire.map((l) => ({ ...l, cree_le: ecrit })),
      "releve_le,airport,resort,date_trajet,passagers,source,gamme",
    );
  }

  return { lot, trajets: trajets.length, dates: dates.length, prixTrouves };
}

interface LigneSaison {
  releve_le: string;
  airport: string;
  resort: string;
  source: Concurrent;
  prix: number | string | null;
  detail: string | null;
  cree_le: string;
}

/**
 * Où en est le relevé de haute saison : trajets écrits dans la dernière série
 * d'écritures, et s'il tourne encore (une écriture il y a moins de six minutes).
 */
export async function avancementSaison(total: number, maintenant = new Date()) {
  const lignesDuJour = await lire<{ airport: string; resort: string; cree_le: string }>("concurrence_saison", {
    colonnes: "airport,resort,cree_le",
    filtres: [
      { colonne: "releve_le", operateur: "eq", valeur: isoAlpes(maintenant) },
      { colonne: "source", operateur: "eq", valeur: "alps2alps" },
      { colonne: "gamme", operateur: "eq", valeur: "standard" },
    ],
    limite: 2000,
  });
  const instants = lignesDuJour
    .map((l) => ({ cle: `${l.airport}|${l.resort}`, t: new Date(l.cree_le).getTime() }))
    .sort((a, b) => b.t - a.t);
  const serie = new Set<string>();
  for (let i = 0; i < instants.length; i += 1) {
    if (i > 0 && instants[i - 1].t - instants[i].t > 6 * 60 * 1000) break;
    serie.add(instants[i].cle);
  }
  const derniere = instants[0]?.t ?? 0;
  const enCours = serie.size < total && derniere > 0 && maintenant.getTime() - derniere < 6 * 60 * 1000;
  return { faits: serie.size, total, enCours };
}

/**
 * Le tableau d'une date de haute saison : notre prix ce jour-là à 10 h, le
 * dernier prix relevé chez chaque concurrent, et le moins cher au relevé
 * précédent — pour voir de combien ils ont bougé en quinze jours.
 */
export async function tableauSaison(
  grille: Grille,
  dateTrajet: string,
  vehicule: CategorieVehicule,
): Promise<{ dernier: string | null; precedent: string | null; lignes: LigneComparaison[] }> {
  const gamme: Gamme = vehicule === "standard" ? "standard" : "premium";
  const [trajets, releves] = await Promise.all([
    trajetsSuivis(),
    lire<LigneSaison>("concurrence_saison", {
      filtres: [
        { colonne: "date_trajet", operateur: "eq", valeur: dateTrajet },
        { colonne: "gamme", operateur: "eq", valeur: gamme },
      ],
      tri: { colonne: "releve_le", croissant: false },
      limite: 5000,
    }),
  ]);
  const jours = [...new Set(releves.map((r) => r.releve_le))];
  const [dernier = null, precedent = null] = jours;

  const [a, m, j] = dateTrajet.split("-").map(Number);
  const depart = instantAlpes(a, m, j, 10, 0);
  const prix = (jour: string | null, airport: string, resort: string, source: Concurrent) => {
    const l = jour ? releves.find((r) => r.releve_le === jour && r.airport === airport && r.resort === resort && r.source === source) : undefined;
    return { prix: l?.prix === null || l?.prix === undefined ? null : Number(l.prix), detail: l?.detail ?? null };
  };
  const minimum = (...valeurs: (number | null)[]) => {
    const connues = valeurs.filter((v): v is number => v !== null);
    return connues.length ? Math.min(...connues) : null;
  };

  const lignesTableau = trajets.map(({ airport, resort }) => {
    const a2a = prix(dernier, airport, resort, "alps2alps");
    const alpy = prix(dernier, airport, resort, "alpy");
    const devis = devisReservation({ airport, resort, categorie: vehicule, passagers: GROUPE_REFERENCE, aller: depart }, grille);
    const nous = devis.ok ? { prix: devis.devis.total, categorie: vehicule } : null;
    const meilleur = minimum(a2a.prix, alpy.prix);
    return {
      airport,
      resort,
      trajet: `${airportParSlug(airport)?.name ?? airport} → ${resortParSlug(resort)?.name ?? resort}`,
      dateTrajet,
      nous,
      alps2alps: a2a,
      alpy,
      meilleur,
      ecart: nous && meilleur !== null ? Math.round((nous.prix - meilleur) * 100) / 100 : null,
      meilleurAvant: minimum(prix(precedent, airport, resort, "alps2alps").prix, prix(precedent, airport, resort, "alpy").prix),
    };
  });
  lignesTableau.sort((x, y) => (y.ecart ?? -Infinity) - (x.ecart ?? -Infinity));
  return { dernier, precedent, lignes: lignesTableau };
}
