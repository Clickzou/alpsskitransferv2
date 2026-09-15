import { airportParSlug } from "@/lib/airports";
import { lire } from "@/lib/reservation/supabase";
import { resortParSlug } from "@/lib/resorts";
import type { CategorieVehicule } from "@/lib/tarification/bareme";
import type { Grille } from "@/lib/tarification/grille";
import { instantAlpes } from "@/lib/temps";
import { devisReservation } from "@/lib/reservation/devis";
import { dateDuJour, type Gamme } from "./comparaison";
import type { Jour } from "./lieux";
import { trajetsSuivis } from "./releve";

/**
 * Ce que l'onglet Concurrence affiche, trajet par trajet : notre prix calculé
 * avec la grille en vigueur, et le dernier prix relevé chez chaque concurrent,
 * pour un jour, un groupe et une gamme donnés.
 */

export interface LigneReleve {
  releve_le: string;
  airport: string;
  resort: string;
  jour: Jour;
  date_trajet: string;
  passagers: number;
  source: "alps2alps" | "alpy";
  gamme: Gamme;
  prix: number | string | null;
  detail: string | null;
}

export interface LigneComparaison {
  airport: string;
  resort: string;
  trajet: string;
  /** La date du transfert demandée aux concurrents, `YYYY-MM-DD` — `null` sans relevé. */
  dateTrajet: string | null;
  nous: { prix: number; categorie: CategorieVehicule } | null;
  alps2alps: { prix: number | null; detail: string | null };
  alpy: { prix: number | null; detail: string | null };
  /** Le concurrent le moins cher. */
  meilleur: number | null;
  /** Nous moins le moins cher : positif = nous sommes plus chers. */
  ecart: number | null;
  /** Le moins cher des concurrents il y a une trentaine de jours, pour la tendance. */
  meilleurAvant: number | null;
}

export interface Filtres {
  jour: Jour;
  passagers: 2 | 4 | 8;
  /** Notre véhicule comparé — revue de JC, 14 septembre 2026 : le Business ne se voyait nulle part. */
  vehicule: CategorieVehicule;
  /** L'offre concurrente qui lui fait face : standard pour notre Standard, haut de gamme sinon. */
  gamme: Gamme;
}

export const VEHICULES_COMPARES: { cle: CategorieVehicule; nom: string; places: number }[] = [
  { cle: "standard", nom: "Standard", places: 8 },
  { cle: "business", nom: "Business", places: 7 },
  { cle: "premium", nom: "Premium", places: 4 },
];

export function filtresDe(params: Record<string, string | string[] | undefined>): Filtres {
  const jour = params.jour === "samedi" ? "samedi" : "mercredi";
  const vehicule: CategorieVehicule =
    params.vehicule === "business" ? "business" : params.vehicule === "premium" || params.gamme === "premium" ? "premium" : "standard";
  /*
    Huit passagers n'entrent que dans notre Standard : le Business en prend
    sept, le Premium quatre. Une adresse qui demande l'impossible retombe sur
    quatre passagers.
  */
  const demande = params.passagers === "2" ? 2 : params.passagers === "8" ? 8 : 4;
  const passagers = vehicule !== "standard" && demande === 8 ? 4 : demande;
  return { jour, passagers, vehicule, gamme: vehicule === "standard" ? "standard" : "premium" };
}

const JOUR_MS = 24 * 3600 * 1000;

async function dateReleve(croissant: boolean, depuis?: string): Promise<string | null> {
  const [l] = await lire<{ releve_le: string }>("concurrence_releves", {
    colonnes: "releve_le",
    filtres: depuis ? [{ colonne: "releve_le", operateur: "gte", valeur: depuis }] : [],
    tri: { colonne: "releve_le", croissant },
    limite: 1,
  });
  return l?.releve_le ?? null;
}

async function lignesDu(date: string, f: Filtres): Promise<LigneReleve[]> {
  return lire<LigneReleve>("concurrence_releves", {
    filtres: [
      { colonne: "releve_le", operateur: "eq", valeur: date },
      { colonne: "jour", operateur: "eq", valeur: f.jour },
      { colonne: "passagers", operateur: "eq", valeur: String(f.passagers) },
      { colonne: "gamme", operateur: "eq", valeur: f.gamme },
    ],
    limite: 1000,
  });
}

/**
 * Un prix manquant remplacé par le dernier prix connu, s'il a moins de trois
 * jours — même trajet, jour, groupe, concurrent et gamme.
 *
 * Le 15 septembre 2026, Alpy a filtré le relevé pendant une demi-heure : tout
 * l'onglet affichait « indisponible » et la mise à jour des tarifs ne voyait
 * plus qu'alps2alps. Un concurrent qui ne répond pas un soir n'a pas changé
 * ses prix pour autant ; au-delà de trois jours, on ne présume plus.
 */
async function avecDerniersPrixConnus(
  lignes: LigneReleve[],
  date: string,
  filtres: { colonne: string; operateur: string; valeur: string }[] = [],
): Promise<LigneReleve[]> {
  const depuis = new Date(new Date(`${date}T12:00:00Z`).getTime() - 3 * JOUR_MS).toISOString().slice(0, 10);
  const anciens = await lire<LigneReleve>("concurrence_releves", {
    filtres: [
      { colonne: "releve_le", operateur: "gte", valeur: depuis },
      { colonne: "releve_le", operateur: "lt", valeur: date },
      { colonne: "prix", operateur: "not.is", valeur: "null" },
      ...filtres,
    ],
    tri: { colonne: "releve_le", croissant: false },
    limite: 5000,
  });
  const cle = (l: LigneReleve) => [l.airport, l.resort, l.jour, l.passagers, l.source, l.gamme].join("|");
  const connus = new Map<string, LigneReleve>();
  for (const a of anciens) if (!connus.has(cle(a))) connus.set(cle(a), a);
  const repris = (l: LigneReleve) => ({ ...l, detail: `${l.detail ?? "prix"} — relevé du ${l.releve_le}` });
  const completees = lignes.map((l) => {
    const connu = l.prix === null ? connus.get(cle(l)) : undefined;
    return connu ? { ...repris(connu), releve_le: l.releve_le, date_trajet: l.date_trajet } : l;
  });
  /*
    Un trajet absent du dernier relevé — un relevé coupé en route, le
    15 septembre 2026, s'est arrêté au vingtième trajet — garde lui aussi ses
    prix récents : sans quoi trente trajets passaient « sans prix concurrent ».
  */
  const presents = new Set(lignes.map(cle));
  const absents = [...connus.values()].filter((a) => !presents.has(cle(a))).map(repris);
  return [...completees, ...absents];
}

/**
 * Où en est le relevé du jour : combien de trajets suivis ont déjà leurs prix,
 * et s'il tourne encore — une ligne écrite il y a moins de six minutes, alors
 * que tous les trajets ne sont pas faits. Un lot dure trois minutes : au-delà
 * de six sans rien écrire, la chaîne s'est arrêtée.
 */
export async function avancementReleve(total: number, maintenant = new Date()) {
  const aujourdhui = isoAlpesDuJour(maintenant);
  const lignes = await lire<{ airport: string; resort: string; cree_le: string }>("concurrence_releves", {
    colonnes: "airport,resort,cree_le",
    filtres: [
      { colonne: "releve_le", operateur: "eq", valeur: aujourdhui },
      // Une ligne par trajet suffit à le compter : mercredi, 2 passagers, alps2alps, standard.
      { colonne: "jour", operateur: "eq", valeur: "mercredi" },
      { colonne: "passagers", operateur: "eq", valeur: "2" },
      { colonne: "source", operateur: "eq", valeur: "alps2alps" },
      { colonne: "gamme", operateur: "eq", valeur: "standard" },
    ],
    limite: 500,
  });
  /*
    Le relevé en cours est la dernière série d'écritures sans trou de plus de
    six minutes : un relevé rejoué dans la journée réécrit ses lignes, et
    compter toutes celles du jour le dirait fini dès son premier lot.
  */
  const instants = lignes
    .map((l) => ({ cle: `${l.airport}|${l.resort}`, t: new Date(l.cree_le).getTime() }))
    .sort((a, b) => b.t - a.t);
  const serie = new Set<string>();
  for (let i = 0; i < instants.length; i += 1) {
    if (i > 0 && instants[i - 1].t - instants[i].t > 6 * 60 * 1000) break;
    serie.add(instants[i].cle);
  }
  const derniere = instants[0]?.t ?? 0;
  const faits = serie.size;
  const enCours = faits < total && derniere > 0 && maintenant.getTime() - derniere < 6 * 60 * 1000;
  return { faits, total, enCours };
}

function isoAlpesDuJour(d: Date): string {
  return d.toLocaleDateString("sv-SE", { timeZone: "Europe/Paris" });
}

/**
 * Le dernier relevé, **s'il a moins de trois jours** : recaler nos tarifs sur
 * des prix d'il y a une semaine suivrait des concurrents qui ont peut-être
 * déjà bougé. Toutes les lignes, tous jours, groupes et gammes confondus.
 */
export async function dernierReleve(maintenant = new Date()): Promise<{ date: string; lignes: LigneReleve[] } | null> {
  const date = await dateReleve(false);
  if (!date || maintenant.getTime() - new Date(`${date}T12:00:00Z`).getTime() > 3.5 * JOUR_MS) return null;
  const lignes = await lire<LigneReleve>("concurrence_releves", {
    filtres: [{ colonne: "releve_le", operateur: "eq", valeur: date }],
    limite: 5000,
  });
  return { date, lignes: await avecDerniersPrixConnus(lignes, date) };
}

export async function tableauConcurrence(grille: Grille, f: Filtres, maintenant = new Date()) {
  const dernier = await dateReleve(false);
  const il30j = new Date(maintenant.getTime() - 30 * JOUR_MS).toISOString().slice(0, 10);
  const ancien = dernier ? await dateReleve(true, il30j) : null;
  const [trajets, recents, anciens] = await Promise.all([
    trajetsSuivis(),
    dernier
      ? lignesDu(dernier, f).then((l) =>
          avecDerniersPrixConnus(l, dernier, [
            { colonne: "jour", operateur: "eq", valeur: f.jour },
            { colonne: "passagers", operateur: "eq", valeur: String(f.passagers) },
            { colonne: "gamme", operateur: "eq", valeur: f.gamme },
          ]),
        )
      : Promise.resolve([]),
    ancien && ancien !== dernier ? lignesDu(ancien, f) : Promise.resolve([]),
  ]);

  const trouver = (lignes: LigneReleve[], airport: string, resort: string, source: LigneReleve["source"]) =>
    lignes.find((l) => l.airport === airport && l.resort === resort && l.source === source);
  const nombre = (p: LigneReleve["prix"] | undefined) => (p === null || p === undefined ? null : Number(p));
  const minimum = (...prix: (number | null)[]) => {
    const connus = prix.filter((p): p is number => p !== null);
    return connus.length ? Math.min(...connus) : null;
  };

  const lignes: LigneComparaison[] = trajets.map(({ airport, resort }) => {
    const a2a = trouver(recents, airport, resort, "alps2alps");
    const alpy = trouver(recents, airport, resort, "alpy");
    // Notre prix à la date même demandée aux concurrents, sinon au prochain jour comparable.
    const dateTrajet = a2a?.date_trajet ?? alpy?.date_trajet;
    const depart = dateTrajet
      ? (() => {
          const [a, m, j] = dateTrajet.split("-").map(Number);
          return instantAlpes(a, m, j, 10, 0);
        })()
      : dateDuJour(f.jour, maintenant);
    const devis = devisReservation({ airport, resort, categorie: f.vehicule, passagers: f.passagers, aller: depart }, grille);
    const nous = devis.ok ? { prix: devis.devis.total, categorie: f.vehicule } : null;
    const meilleur = minimum(nombre(a2a?.prix), nombre(alpy?.prix));
    return {
      airport,
      resort,
      trajet: `${airportParSlug(airport)?.name ?? airport} → ${resortParSlug(resort)?.name ?? resort}`,
      dateTrajet: dateTrajet ?? null,
      nous,
      alps2alps: { prix: nombre(a2a?.prix), detail: a2a?.detail ?? null },
      alpy: { prix: nombre(alpy?.prix), detail: alpy?.detail ?? null },
      meilleur,
      ecart: nous && meilleur !== null ? Math.round((nous.prix - meilleur) * 100) / 100 : null,
      meilleurAvant: minimum(
        nombre(trouver(anciens, airport, resort, "alps2alps")?.prix),
        nombre(trouver(anciens, airport, resort, "alpy")?.prix),
      ),
    };
  });

  // Les plus chers que la concurrence d'abord : ce sont eux qu'on corrige.
  lignes.sort((a, b) => (b.ecart ?? -Infinity) - (a.ecart ?? -Infinity));

  // La date du transfert comparé, la plus fréquente : un relevé fait d'une traite n'en a qu'une.
  const compte = new Map<string, number>();
  for (const l of lignes) if (l.dateTrajet) compte.set(l.dateTrajet, (compte.get(l.dateTrajet) ?? 0) + 1);
  const dateTrajet = [...compte].sort((a, b) => b[1] - a[1])[0]?.[0] ?? null;

  return { dernier, ancien: ancien !== dernier ? ancien : null, lignes, dateTrajet };
}
