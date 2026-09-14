import type { CategorieVehicule } from "@/lib/tarification/bareme";
import { calculer, type Devis } from "@/lib/tarification/calcul";
import { distanceCalculee, distancePubliee } from "@/lib/tarification/distance";
import {
  coefficientDe,
  GRILLE_DEFAUT,
  prixFixeDe,
  saisonDu,
  type Grille,
} from "@/lib/tarification/grille";

/**
 * Le devis d'une réservation — un aller, éventuellement un retour.
 *
 * Cette fonction est **la seule source du prix** : la page l'appelle pour
 * afficher, l'API l'appelle pour encaisser. Le site actuel avait deux calculs
 * différents, il affichait 220 € et facturait 377 € ; quatre commandes sur dix y
 * ont été remboursées. Un seul calcul, pur, testé.
 *
 * Le prix ne dépend jamais de ce que le navigateur envoie : le client transmet un
 * trajet, des dates et un véhicule, pas un montant.
 */

export interface DemandeReservation {
  /** Slug d'aéroport. */
  airport: string;
  /** Slug de station. */
  resort: string;
  categorie: CategorieVehicule;
  passagers: number;
  /**
   * Le groupe du retour, quand il diffère de l'aller.
   *
   * Le prix est **par véhicule** : repartir à deux quand on est venu à quatre
   * ne le change pas. Ce qui change, c'est le véhicule à envoyer — la capacité
   * doit tenir le groupe le plus nombreux des deux — et ce que le chauffeur
   * doit savoir en préparant sa journée. Absent, le retour reprend l'aller.
   */
  passagersRetour?: number | null;
  /**
   * Le véhicule du retour, quand il diffère de celui de l'aller.
   *
   * Un seul véhicule servait les deux sens, dimensionné sur le groupe le plus
   * nombreux : arriver à deux et repartir à six faisait payer un huit places sur
   * les deux trajets, dont l'un à vide. Les sens sont indépendants — deux dates,
   * deux effectifs, parfois deux liaisons — et rien n'oblige à les confier au
   * même véhicule. Absent, le retour reprend celui de l'aller.
   */
  categorieRetour?: CategorieVehicule | null;
  /** Départ de l'aller, heure locale. */
  aller: Date;
  /** Départ du retour. Absent = aller simple. */
  retour?: Date | null;
  /**
   * Retour vers un autre point que l'aller — arriver à Genève et repartir de
   * Lyon, ou changer de station en cours de séjour. Absents, les lieux de
   * l'aller sont repris.
   */
  retourAirport?: string | null;
  retourResort?: string | null;
  /** Valises et sacs, hors bagages à main. */
  bagages?: number;
  /** Housses à skis ou à snowboard. */
  skis?: number;
  /** Prix par personne au lieu du prix par véhicule. */
  partage?: boolean;
}

export interface LigneDevis {
  sens: "aller" | "retour";
  depart: Date;
  km: number;
  /** D'où vient la distance : table calculée, distance publiée sur l'ancien site. */
  sourceDistance: "table" | "publiee" | "api";
  devis: Devis;
}

export interface DevisReservation {
  lignes: LigneDevis[];
  /** Ce que le client paie, remise d'aller-retour comprise. */
  total: number;
  devise: "EUR";
  /** Remise appliquée au retour, en euros. 0 sur un aller simple. */
  remiseAllerRetour: number;
  coefficient: number;
  /** Vrai quand au moins un trajet est facturé à un prix fixe convenu. */
  prixFixe: boolean;
  /**
   * Faux tant que le barème n'est pas validé : le parcours affiche le prix mais
   * se termine en demande de devis. Mieux vaut un devis qu'une réservation payée
   * au mauvais prix.
   */
  encaissable: boolean;
}

/** Motif d'un devis impossible — il n'y a pas de prix à inventer. */
export type EchecDevis =
  | { raison: "distance-inconnue" }
  | { raison: "trop-de-passagers"; maximum: number }
  | { raison: "trop-de-bagages"; maximum: number }
  | { raison: "dates-incoherentes" };

/** Capacité en passagers, reprise des véhicules annoncés sur la home. */
export const CAPACITE: Record<CategorieVehicule, number> = {
  standard: 8,
  business: 7,
  premium: 4,
};

/**
 * Capacité en pièces de bagage — valises et housses à skis confondues.
 *
 * Un Transporter porte huit passagers, mais pas huit valises **et** huit paires
 * de skis : le coffre décide avant les sièges. Ces plafonds évitent d'envoyer un
 * véhicule dans lequel le matériel ne rentre pas, ce qui est la panne la plus
 * banale du métier. **Valeurs à confirmer par le client**, comme le barème.
 */
export const CAPACITE_BAGAGES: Record<CategorieVehicule, number> = {
  standard: 12,
  business: 10,
  premium: 5,
};

/** Coefficient de destination, 1 quand la station n'en a pas. */
export function coefficientDestination(resort: string, grille: Grille = GRILLE_DEFAUT): number {
  return coefficientDe(grille, resort);
}

/**
 * Prix fixe convenu pour ce trajet et ce véhicule, s'il en existe un.
 *
 * Par défaut, la grille ne reprend que les prix de l'ancien site **validés** —
 * aucun ne l'est : ce sont des prix relevés dans le texte des pages, pas une
 * grille confirmée par le client, et ils reconduiraient les incohérences de
 * l'ancien site, où deux trajets de longueur comparable vont du simple au
 * double. Les prix fixes se posent désormais depuis l'onglet Tarifs.
 */
export function prixFixe(
  airport: string,
  resort: string,
  categorie: CategorieVehicule = "standard",
  grille: Grille = GRILLE_DEFAUT,
): number | null {
  return prixFixeDe(grille, airport, resort, categorie);
}

function distanceDuTrajet(airport: string, resort: string) {
  const trajet = { origine: airport, destination: resort };
  return distanceCalculee(trajet) ?? distancePubliee(trajet);
}

/**
 * Calcule le devis d'une réservation, ou dit pourquoi il n'y en a pas.
 *
 * Fonction pure : aucun appel réseau, aucune horloge. Une distance introuvable
 * renvoie un échec plutôt qu'un prix approximatif — le parcours dégrade alors
 * vers une demande de devis.
 *
 * La grille est passée par l'appelant, qui la lit en base
 * (`grilleActive()`) : le calcul reste pur, et l'aperçu de l'onglet Tarifs
 * chiffre les mêmes trajets avec deux grilles côte à côte. Sans grille, ce
 * sont les valeurs du code.
 */
export function devisReservation(
  demande: DemandeReservation,
  grille: Grille = GRILLE_DEFAUT,
): { ok: true; devis: DevisReservation } | { ok: false; echec: EchecDevis } {
  /*
    Chaque sens tient dans son propre véhicule.

    La règle portait sur le groupe le plus nombreux des deux trajets, parce
    qu'un seul véhicule les servait. Chacun ayant désormais le sien, c'est à
    chacun de tenir son effectif : deux personnes à l'aller n'obligent plus à
    réserver le huit places dont le retour a besoin.
  */
  const categorieRetour = demande.categorieRetour ?? demande.categorie;
  const passagersRetour = demande.passagersRetour ?? demande.passagers;
  const maximum = CAPACITE[demande.categorie];
  if (demande.passagers < 1 || demande.passagers > maximum) {
    return { ok: false, echec: { raison: "trop-de-passagers", maximum } };
  }
  if (demande.retour) {
    const maxRetour = CAPACITE[categorieRetour];
    if (passagersRetour < 1 || passagersRetour > maxRetour) {
      return { ok: false, echec: { raison: "trop-de-passagers", maximum: maxRetour } };
    }
  }

  // Les bagages, eux, voyagent dans les deux sens : les deux coffres les tiennent.
  const pieces = (demande.bagages ?? 0) + (demande.skis ?? 0);
  const maxBagages = Math.min(
    CAPACITE_BAGAGES[demande.categorie],
    demande.retour ? CAPACITE_BAGAGES[categorieRetour] : CAPACITE_BAGAGES[demande.categorie],
  );
  if (pieces > maxBagages) {
    return { ok: false, echec: { raison: "trop-de-bagages", maximum: maxBagages } };
  }

  if (demande.retour && demande.retour.getTime() <= demande.aller.getTime()) {
    return { ok: false, echec: { raison: "dates-incoherentes" } };
  }

  const distance = distanceDuTrajet(demande.airport, demande.resort);
  if (!distance) return { ok: false, echec: { raison: "distance-inconnue" } };

  // Le retour peut partir d'ailleurs : on le chiffre sur sa propre liaison.
  const airportRetour = demande.retourAirport ?? demande.airport;
  const resortRetour = demande.retourResort ?? demande.resort;
  const distanceRetour =
    airportRetour === demande.airport && resortRetour === demande.resort
      ? distance
      : distanceDuTrajet(airportRetour, resortRetour);
  if (demande.retour && !distanceRetour) {
    return { ok: false, echec: { raison: "distance-inconnue" } };
  }

  const coefficient = coefficientDe(grille, demande.resort);

  // Chaque sens est calculé avec sa propre date : un retour le samedi à 6 h n'est
  // pas un aller du mercredi remisé. `calculer` reste appelé en aller simple, la
  // remise d'aller-retour est appliquée ici, sur le seul retour.
  const ligne = (sens: "aller" | "retour", depart: Date): LigneDevis => {
    const retour = sens === "retour";
    const d = retour ? distanceRetour! : distance;
    const categorie = retour ? categorieRetour : demande.categorie;
    return {
      sens,
      depart,
      km: d.km,
      sourceDistance: d.source,
      devis: calculer(
        {
          km: d.km,
          categorie,
          depart,
          passagers: retour ? passagersRetour : demande.passagers,
          partage: demande.partage ?? false,
          allerRetour: false,
          coefficient: retour ? coefficientDe(grille, resortRetour) : coefficient,
          prixFixe: retour
            ? prixFixeDe(grille, airportRetour, resortRetour, categorie)
            : prixFixeDe(grille, demande.airport, demande.resort, categorie),
          saison: saisonDu(grille, depart),
        },
        grille.bareme,
      ),
    };
  };

  const lignes = [ligne("aller", demande.aller)];
  if (demande.retour) lignes.push(ligne("retour", demande.retour));

  const brut = lignes.reduce((somme, l) => somme + l.devis.total, 0);
  const remiseAllerRetour =
    lignes.length === 2
      ? Math.round((lignes[1].devis.total * grille.bareme.remiseAllerRetour) / 100)
      : 0;

  return {
    ok: true,
    devis: {
      lignes,
      total: brut - remiseAllerRetour,
      devise: grille.bareme.devise,
      remiseAllerRetour,
      coefficient,
      prixFixe: lignes.some((l) => l.devis.prixFixe),
      // Un seul trajet non encaissable rend toute la réservation non encaissable.
      encaissable: lignes.every((l) => l.devis.encaissable),
    },
  };
}
