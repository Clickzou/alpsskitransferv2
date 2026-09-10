import { COEFFICIENTS } from "@/data/coefficients";
import { TARIFS } from "@/data/tarifs";
import { BAREME_DEFAUT, type CategorieVehicule } from "@/lib/tarification/bareme";
import { calculer, type Devis } from "@/lib/tarification/calcul";
import { distanceCalculee, distancePubliee } from "@/lib/tarification/distance";

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
export function coefficientDestination(resort: string): number {
  return COEFFICIENTS.find((c) => c.resort === resort)?.coefficient ?? 1;
}

/**
 * Prix fixe convenu pour ce trajet, s'il en existe un **et qu'il est validé**.
 *
 * Les 89 tarifs extraits du site actuel sont tous en `valide: false` : ce sont des
 * prix publiés, relevés dans le texte des pages, pas une grille confirmée par le
 * client. Tant qu'ils ne sont pas validés, ils ne fixent pas un prix — sinon la
 * refonte reconduirait les incohérences de l'ancien site, où deux trajets de
 * longueur comparable vont du simple au double.
 */
export function prixFixe(airport: string, resort: string): number | null {
  const tarif = TARIFS.find((t) => t.airport === airport && t.resort === resort);
  return tarif?.valide && tarif.prive ? tarif.prive : null;
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
 */
export function devisReservation(
  demande: DemandeReservation,
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

  const coefficient = coefficientDestination(demande.resort);
  const fixe = prixFixe(demande.airport, demande.resort);

  // Chaque sens est calculé avec sa propre date : un retour le samedi à 6 h n'est
  // pas un aller du mercredi remisé. `calculer` reste appelé en aller simple, la
  // remise d'aller-retour est appliquée ici, sur le seul retour.
  const ligne = (sens: "aller" | "retour", depart: Date): LigneDevis => {
    const retour = sens === "retour";
    const d = retour ? distanceRetour! : distance;
    return {
      sens,
      depart,
      km: d.km,
      sourceDistance: d.source,
      devis: calculer({
        km: d.km,
        categorie: retour ? categorieRetour : demande.categorie,
        depart,
        passagers: retour ? passagersRetour : demande.passagers,
        partage: demande.partage ?? false,
        allerRetour: false,
        coefficient: retour ? coefficientDestination(resortRetour) : coefficient,
        prixFixe: retour ? prixFixe(airportRetour, resortRetour) : fixe,
      }),
    };
  };

  const lignes = [ligne("aller", demande.aller)];
  if (demande.retour) lignes.push(ligne("retour", demande.retour));

  const brut = lignes.reduce((somme, l) => somme + l.devis.total, 0);
  const remiseAllerRetour =
    lignes.length === 2
      ? Math.round((lignes[1].devis.total * BAREME_DEFAUT.remiseAllerRetour) / 100)
      : 0;

  return {
    ok: true,
    devis: {
      lignes,
      total: brut - remiseAllerRetour,
      devise: BAREME_DEFAUT.devise,
      remiseAllerRetour,
      coefficient,
      prixFixe: lignes.some((l) => l.devis.prixFixe),
      // Un seul trajet non encaissable rend toute la réservation non encaissable.
      encaissable: lignes.every((l) => l.devis.encaissable),
    },
  };
}
