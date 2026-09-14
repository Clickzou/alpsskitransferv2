import { airportParSlug } from "@/lib/airports";
import { devisReservation } from "@/lib/reservation/devis";
import { resortParSlug } from "@/lib/resorts";
import { composantesAlpes, instantAlpes } from "@/lib/temps";
import type { CategorieVehicule } from "./bareme";
import { CATEGORIES_GRILLE, type Grille } from "./grille";

/**
 * L'aperçu d'une grille avant publication : les mêmes trajets, chiffrés avec
 * la grille en vigueur et avec celle qu'on s'apprête à publier.
 *
 * Décision de JC, 11 septembre 2026 : une modification se voit d'abord, avant
 * → après, sur des trajets types. Un pourcentage modifié ne dit pas grand-chose
 * ; « Genève → Val Thorens, samedi : 312 € → 341 € » dit tout.
 */

/** Des trajets que l'exploitant fait souvent, de longueurs différentes. */
const TRAJETS_TYPES: [string, string][] = [
  ["geneva-airport", "les-gets"],
  ["geneva-airport", "chamonix"],
  ["geneva-airport", "val-thorens"],
  ["geneva-airport", "courchevel"],
  ["lyon-airport", "tignes"],
  ["chambery-savoie-airport", "la-plagne"],
  ["geneva-airport", "zermatt"],
  ["turin-airport", "sestriere"],
];

export interface LigneApercu {
  trajet: string;
  cas: string;
  prix: Record<CategorieVehicule, { avant: number | null; apres: number | null }>;
}

const JOUR = 24 * 3600 * 1000;

/** Le prochain jour de la semaine voulu (0 = dimanche), à l'heure dite, à au moins une semaine. */
function prochain(jourSemaine: number, heure: number, maintenant: Date): Date {
  let d = new Date(maintenant.getTime() + 7 * JOUR);
  while (composantesAlpes(d).jourSemaine !== jourSemaine) d = new Date(d.getTime() + JOUR);
  const c = composantesAlpes(d);
  return instantAlpes(c.annee, c.mois, c.jour, heure, 0);
}

export function apercuGrille(avant: Grille, apres: Grille, maintenant = new Date()): LigneApercu[] {
  const cas: { libelle: string; depart: Date }[] = [
    { libelle: "Mercredi, 10 h", depart: prochain(3, 10, maintenant) },
    { libelle: "Samedi, 10 h", depart: prochain(6, 10, maintenant) },
    { libelle: "Mercredi, 23 h", depart: prochain(3, 23, maintenant) },
  ];
  // Une période de saison se montre à sa première date — avant ou après, peu importe d'où elle vient.
  const saisons = [...apres.saisons, ...avant.saisons].filter(
    (s, i, toutes) => toutes.findIndex((t) => t.nom === s.nom && t.debut === s.debut) === i,
  );
  for (const s of saisons) {
    const [annee, mois, jour] = s.debut.split("-").map(Number);
    cas.push({ libelle: `${s.nom} (${jour}/${mois}), 10 h`, depart: instantAlpes(annee, mois, jour, 10, 0) });
  }

  const prix = (grille: Grille, airport: string, resort: string, categorie: CategorieVehicule, depart: Date) => {
    const r = devisReservation({ airport, resort, categorie, passagers: 2, aller: depart }, grille);
    return r.ok ? r.devis.total : null;
  };

  const lignes: LigneApercu[] = [];
  for (const [airport, resort] of TRAJETS_TYPES) {
    const aeroport = airportParSlug(airport);
    const station = resortParSlug(resort);
    if (!aeroport || !station) continue;
    for (const c of cas) {
      const ligne: LigneApercu = {
        trajet: `${aeroport.name} → ${station.name}`,
        cas: c.libelle,
        prix: Object.fromEntries(
          CATEGORIES_GRILLE.map((categorie) => [
            categorie,
            {
              avant: prix(avant, airport, resort, categorie, c.depart),
              apres: prix(apres, airport, resort, categorie, c.depart),
            },
          ]),
        ) as LigneApercu["prix"],
      };
      if (CATEGORIES_GRILLE.some((k) => ligne.prix[k].avant !== null)) lignes.push(ligne);
    }
  }
  return lignes;
}
