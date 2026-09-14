import { airportParSlug } from "@/lib/airports";
import { devisReservation } from "@/lib/reservation/devis";
import { resortParSlug } from "@/lib/resorts";
import type { CategorieVehicule } from "@/lib/tarification/bareme";
import type { Creneau, Grille } from "@/lib/tarification/grille";
import { instantAlpes } from "@/lib/temps";
import { dateDuJour, type Gamme } from "./comparaison";
import type { Jour } from "./lieux";

/**
 * « Mettre à jour nos tarifs » — demande de JC, 14 septembre 2026 : un seul
 * bouton qui recale **tous** nos prix à X € sous le concurrent le moins cher,
 * à la baisse quand on est plus cher, à la hausse quand on l'est beaucoup
 * moins, pour tous les véhicules, en semaine comme le week-end, de jour comme
 * de nuit.
 *
 * Les règles, pour que le résultat soit prévisible :
 *
 * - **Référence : 4 passagers**, la famille type. Notre prix est par véhicule
 *   et ne dépend pas du groupe ; celui des concurrents, si. Un seul groupe de
 *   référence évite qu'un prix aligné sur deux personnes brade les groupes de
 *   huit.
 * - **Par gamme** : notre Standard face à leur offre standard la moins chère,
 *   nos Business et Premium face à leur haut de gamme.
 * - **Par moment** : le relevé du mercredi fait notre prix « semaine, jour »,
 *   celui du samedi notre « week-end, jour ». La nuit, qu'aucun concurrent ne
 *   chiffre dans le relevé, reprend le prix de jour aligné plus notre
 *   majoration de nuit.
 * - **Garde-fous** : un prix qui baisserait de plus de moitié, ou doublerait,
 *   n'est pas posé — c'est presque toujours un relevé faux (mauvais véhicule,
 *   devise) ; il est signalé. Un trajet sans aucun prix concurrent ne bouge pas.
 *
 * Tout se publie en une seule version de la grille : l'onglet Tarifs la défait
 * en un clic. Ce module est pur, pour être testé.
 */

export const GROUPE_REFERENCE = 4;

const GAMME_DE: Record<CategorieVehicule, Gamme> = {
  standard: "standard",
  business: "premium",
  premium: "premium",
};

const CRENEAUX_DU_JOUR: Record<Jour, { jour: Creneau; nuit: Creneau }> = {
  mercredi: { jour: "semaineJour", nuit: "semaineNuit" },
  samedi: { jour: "weekendJour", nuit: "weekendNuit" },
};

export interface PrixReleve {
  airport: string;
  resort: string;
  jour: Jour;
  date_trajet: string;
  passagers: number;
  gamme: Gamme;
  prix: number | string | null;
}

export interface Changement {
  airport: string;
  resort: string;
  trajet: string;
  categorie: CategorieVehicule;
  creneau: Creneau;
  /** Le concurrent le moins cher, `null` pour un prix de nuit déduit du jour. */
  reference: number | null;
  avant: number | null;
  apres: number;
}

export interface Plan {
  changements: Changement[];
  /** Les prix écartés par un garde-fou, à regarder à la main. */
  ecartes: (Changement & { raison: string })[];
  /** Les trajets sans aucun prix concurrent, laissés tels quels. */
  sansReference: string[];
}

const nomTrajet = (airport: string, resort: string) =>
  `${airportParSlug(airport)?.name ?? airport} → ${resortParSlug(resort)?.name ?? resort}`;

/** Notre prix actuel pour un véhicule, à une date et une heure données. */
function prixActuel(grille: Grille, airport: string, resort: string, categorie: CategorieVehicule, depart: Date) {
  const r = devisReservation({ airport, resort, categorie, passagers: 1, aller: depart }, grille);
  return r.ok ? r.devis.total : null;
}

/** Le même jour que `depart`, à l'heure dite. */
function aHeure(dateIso: string, heure: number): Date {
  const [a, m, j] = dateIso.split("-").map(Number);
  return instantAlpes(a, m, j, heure, 0);
}

export function planAlignement(
  grille: Grille,
  trajets: { airport: string; resort: string }[],
  releves: PrixReleve[],
  ecart: number,
  maintenant = new Date(),
): Plan {
  const plan: Plan = { changements: [], ecartes: [], sansReference: [] };
  const nuit = 1 + grille.bareme.majorations.nuit / 100;

  for (const { airport, resort } of trajets) {
    const trajet = nomTrajet(airport, resort);
    let touche = false;

    for (const jour of ["mercredi", "samedi"] as Jour[]) {
      for (const categorie of ["standard", "business", "premium"] as CategorieVehicule[]) {
        const lignes = releves.filter(
          (r) =>
            r.airport === airport &&
            r.resort === resort &&
            r.jour === jour &&
            r.passagers === GROUPE_REFERENCE &&
            r.gamme === GAMME_DE[categorie] &&
            r.prix !== null,
        );
        if (lignes.length === 0) continue;
        touche = true;
        const reference = Math.min(...lignes.map((l) => Number(l.prix)));
        const dateTrajet = lignes[0].date_trajet ?? null;
        const jourIso = dateTrajet ?? dateDuJour(jour, maintenant).toISOString().slice(0, 10);
        const cible = Math.max(1, Math.round(reference - ecart));

        const creneaux = CRENEAUX_DU_JOUR[jour];
        const propositions: Changement[] = [
          {
            airport, resort, trajet, categorie, creneau: creneaux.jour, reference,
            avant: prixActuel(grille, airport, resort, categorie, aHeure(jourIso, 10)),
            apres: cible,
          },
          {
            airport, resort, trajet, categorie, creneau: creneaux.nuit, reference: null,
            avant: prixActuel(grille, airport, resort, categorie, aHeure(jourIso, 23)),
            apres: Math.round(cible * nuit),
          },
        ];

        for (const p of propositions) {
          if (p.avant !== null && p.apres < p.avant * 0.5) {
            plan.ecartes.push({ ...p, raison: "baisse de plus de moitié" });
          } else if (p.avant !== null && p.apres > p.avant * 2) {
            plan.ecartes.push({ ...p, raison: "prix plus que doublé" });
          } else if (p.avant !== p.apres) {
            plan.changements.push(p);
          }
        }
      }
    }
    if (!touche) plan.sansReference.push(trajet);
  }
  return plan;
}

/** La grille avec les prix du plan posés en prix fixes. */
export function appliquerPlan(grille: Grille, plan: Plan): Grille {
  const nouvelle: Grille = JSON.parse(JSON.stringify(grille));
  for (const c of plan.changements) {
    let fixe = nouvelle.prixFixes.find((p) => p.airport === c.airport && p.resort === c.resort);
    if (!fixe) {
      fixe = { airport: c.airport, resort: c.resort, prix: {} };
      nouvelle.prixFixes.push(fixe);
    }
    fixe.prix[c.categorie] = { ...(fixe.prix[c.categorie] ?? {}), [c.creneau]: c.apres };
  }
  return nouvelle;
}
