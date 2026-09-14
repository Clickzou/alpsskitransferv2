import { airportParSlug } from "@/lib/airports";
import { lire } from "@/lib/reservation/supabase";
import { resortParSlug } from "@/lib/resorts";
import type { CategorieVehicule } from "@/lib/tarification/bareme";
import type { Grille } from "@/lib/tarification/grille";
import { instantAlpes } from "@/lib/temps";
import { dateDuJour, notrePrix, type Gamme } from "./comparaison";
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
  gamme: Gamme;
}

export function filtresDe(params: Record<string, string | string[] | undefined>): Filtres {
  const jour = params.jour === "samedi" ? "samedi" : "mercredi";
  const passagers = params.passagers === "2" ? 2 : params.passagers === "8" ? 8 : 4;
  const gamme = params.gamme === "premium" ? "premium" : "standard";
  return { jour, passagers, gamme };
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

export async function tableauConcurrence(grille: Grille, f: Filtres, maintenant = new Date()) {
  const dernier = await dateReleve(false);
  const il30j = new Date(maintenant.getTime() - 30 * JOUR_MS).toISOString().slice(0, 10);
  const ancien = dernier ? await dateReleve(true, il30j) : null;
  const [trajets, recents, anciens] = await Promise.all([
    trajetsSuivis(),
    dernier ? lignesDu(dernier, f) : Promise.resolve([]),
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
    const nous = notrePrix(grille, airport, resort, f.passagers, f.gamme, depart);
    const meilleur = minimum(nombre(a2a?.prix), nombre(alpy?.prix));
    return {
      airport,
      resort,
      trajet: `${airportParSlug(airport)?.name ?? airport} → ${resortParSlug(resort)?.name ?? resort}`,
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
  return { dernier, ancien: ancien !== dernier ? ancien : null, lignes };
}
