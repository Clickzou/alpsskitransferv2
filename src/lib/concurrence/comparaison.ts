import { devisReservation, CAPACITE } from "@/lib/reservation/devis";
import type { CategorieVehicule } from "@/lib/tarification/bareme";
import type { Creneau, Grille } from "@/lib/tarification/grille";
import { composantesAlpes, instantAlpes } from "@/lib/temps";
import type { Jour } from "./lieux";
import type { Offre } from "./sources";

/**
 * Comparer à armes égales. Ces règles sont ici, sans accès réseau, pour être
 * testées.
 *
 * - **À groupe égal** : le prix d'un concurrent dépend du véhicule que le
 *   groupe impose (alps2alps passe d'un minivan 5 places à un XL 8 places,
 *   Alpy facture par passager).
 * - **Par gamme** : « standard » est l'offre la moins chère qui tient le
 *   groupe, « premium » la moins chère de leurs offres premium. Chez nous, la
 *   gamme premium est la moins chère de Business et Premium — un « Premium
 *   minivan » d'alps2alps est un Mercedes Classe V, notre Business.
 * - **Au même moment** : un mercredi et un samedi à 10 h, trois semaines après
 *   le relevé, pour rester dans la fenêtre où les clients réservent.
 */

export type Gamme = "standard" | "premium";

const JOUR = 24 * 3600 * 1000;

/** Le prochain mercredi (3) ou samedi (6), à au moins trois semaines, à 10 h, heure des Alpes. */
export function dateDuJour(jour: Jour, maintenant = new Date()): Date {
  const cible = jour === "mercredi" ? 3 : 6;
  let d = new Date(maintenant.getTime() + 21 * JOUR);
  while (composantesAlpes(d).jourSemaine !== cible) d = new Date(d.getTime() + JOUR);
  const c = composantesAlpes(d);
  return instantAlpes(c.annee, c.mois, c.jour, 10, 0);
}

export const isoAlpes = (d: Date) => {
  const c = composantesAlpes(d);
  return `${c.annee}-${String(c.mois).padStart(2, "0")}-${String(c.jour).padStart(2, "0")}`;
};

/** L'offre la moins chère d'une gamme chez un concurrent. */
export function meilleureOffre(offres: Offre[], gamme: Gamme): Offre | null {
  const candidates = offres.filter((o) => o.premium === (gamme === "premium"));
  return candidates.reduce<Offre | null>((min, o) => (!min || o.prix < min.prix ? o : min), null);
}

const PAR_GAMME: Record<Gamme, CategorieVehicule[]> = {
  standard: ["standard"],
  premium: ["business", "premium"],
};

/** Notre prix pour ce trajet, ce groupe, cette gamme et ce moment — et le véhicule qui le fait. */
export function notrePrix(
  grille: Grille,
  airport: string,
  resort: string,
  passagers: number,
  gamme: Gamme,
  depart: Date,
): { prix: number; categorie: CategorieVehicule } | null {
  let meilleur: { prix: number; categorie: CategorieVehicule } | null = null;
  for (const categorie of PAR_GAMME[gamme]) {
    if (CAPACITE[categorie] < passagers) continue;
    const r = devisReservation({ airport, resort, categorie, passagers, aller: depart }, grille);
    if (r.ok && (!meilleur || r.devis.total < meilleur.prix)) meilleur = { prix: r.devis.total, categorie };
  }
  return meilleur;
}

/** Le moment d'un prix fixe qui correspond au jour comparé : 10 h, donc de jour. */
export const CRENEAU_DU_JOUR: Record<Jour, Creneau> = { mercredi: "semaineJour", samedi: "weekendJour" };

/**
 * Le prix à poser pour être `ecart` euros sous le concurrent le moins cher —
 * arrondi à l'euro, jamais sous 1 €. `null` quand aucun concurrent n'a de prix.
 */
export function prixSous(concurrents: (number | null)[], ecart: number): number | null {
  const prix = concurrents.filter((p): p is number => p !== null);
  if (prix.length === 0) return null;
  return Math.max(1, Math.round(Math.min(...prix) - ecart));
}
