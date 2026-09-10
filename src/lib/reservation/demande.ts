import { airportParSlug } from "@/lib/airports";
import { resortParSlug } from "@/lib/resorts";
import type { CategorieVehicule } from "@/lib/tarification/bareme";
import { instantAlpes } from "@/lib/temps";
import { CAPACITE, CAPACITE_BAGAGES, type DemandeReservation } from "./devis";

/**
 * Validation des demandes venues du navigateur.
 *
 * Tout ce qui entre par une requête est suspect : un slug de station, une date,
 * un nombre de passagers — jamais un prix, qui est calculé côté serveur. Cette
 * fonction refuse plutôt qu'elle ne corrige, et son message dit quoi corriger.
 *
 * Deux cas de sortie, et c'est la nouveauté du moteur : soit la demande porte
 * des lieux connus des registres et se chiffre, soit elle porte une adresse
 * libre — une gare, un hôtel, une adresse exacte — et part en demande de devis.
 * On ne devine jamais un prix sur un lieu qu'on ne sait pas mesurer.
 */

export const CATEGORIES: CategorieVehicule[] = ["standard", "business", "premium"];

export interface EntreeBrute {
  from?: unknown;
  to?: unknown;
  when?: unknown;
  returnPassengers?: unknown;
  returnWhen?: unknown;
  returnFrom?: unknown;
  returnTo?: unknown;
  passengers?: unknown;
  bags?: unknown;
  skis?: unknown;
  vehicle?: unknown;
  /** Le véhicule du retour, quand il diffère de celui de l'aller. */
  vehicleReturn?: unknown;
  shared?: unknown;
  /** Textes libres, quand le lieu n'est pas au registre. */
  fromText?: unknown;
  toText?: unknown;
  returnFromText?: unknown;
  returnToText?: unknown;
}

const texte = (v: unknown, taille = 200): string | null =>
  typeof v === "string" && v.trim() !== "" ? v.trim().slice(0, taille) : null;

const entier = (v: unknown): number | null => {
  const n = Number(v);
  return Number.isInteger(n) ? n : null;
};

/**
 * Analyse une date `YYYY-MM-DDTHH:mm`, telle que la produit un `datetime-local`.
 *
 * L'heure saisie est celle de l'aéroport, pas celle du serveur : `instantAlpes`
 * la rattache au fuseau du service. Sans cela la même saisie donnait deux
 * instants différents en développement et en production — voir `lib/temps.ts`.
 */
export function dateLocale(valeur: unknown): Date | null {
  const brut = texte(valeur, 40);
  if (!brut) return null;
  const m = brut.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/);
  if (!m) return null;
  const [, annee, mois, jour, heure, minute] = m.map(Number) as unknown as number[];
  const date = instantAlpes(annee, mois, jour, heure, minute);
  return Number.isNaN(date.getTime()) ? null : date;
}

export interface DemandeSurMesure {
  /** Ce que le visiteur a tapé, tel quel — c'est ce que l'exploitant lira. */
  depart: string;
  arrivee: string;
  aller: Date;
  retour: Date | null;
  passagers: number;
  bagages: number;
  skis: number;
  motif: "adresse-libre" | "liaison-inconnue";
}

/**
 * Le champ qu'un refus désigne.
 *
 * Un message seul laisse le visiteur devant un formulaire de quinze champs :
 * « Passengers must be between 1 and 8 » est exact et ne dit pas où corriger.
 * Le tunnel s'en sert pour ramener à l'étape du trajet, le curseur sur le champ
 * en cause.
 */
export type ChampFautif = "passagers" | "passagersRetour" | "bagages" | "dates" | "lieux";

export type Validation =
  | { ok: true; demande: DemandeReservation }
  | { ok: true; surMesure: DemandeSurMesure }
  | { ok: false; message: string; champ?: ChampFautif };

export function validerDemande(entree: EntreeBrute): Validation {
  const aller = dateLocale(entree.when);
  if (!aller) return { ok: false, message: "Give a pick-up date and time.", champ: "dates" };

  const retour = entree.returnWhen ? dateLocale(entree.returnWhen) : null;
  if (entree.returnWhen && !retour) {
    return { ok: false, message: "Return date is not valid.", champ: "dates" };
  }
  if (retour && retour.getTime() <= aller.getTime()) {
    return { ok: false, message: "The return must be after the outbound journey.", champ: "dates" };
  }

  const passagers = entier(entree.passengers);
  if (passagers === null || passagers < 1 || passagers > CAPACITE.standard) {
    return {
      ok: false,
      message: `Passengers must be between 1 and ${CAPACITE.standard}.`,
      champ: "passagers",
    };
  }

  /*
    Le groupe du retour, quand il diffère. Il n'a de sens qu'avec un retour :
    reçu sur un aller simple, il est ignoré plutôt que refusé — un paramètre
    d'URL oublié ne doit pas bloquer une réservation valable.
  */
  const passagersRetour = retour ? entier(entree.returnPassengers) : null;
  if (passagersRetour !== null && (passagersRetour < 1 || passagersRetour > CAPACITE.standard)) {
    return {
      ok: false,
      message: `Passengers must be between 1 and ${CAPACITE.standard}.`,
      champ: "passagersRetour",
    };
  }

  const bagages = Math.max(0, entier(entree.bags) ?? 0);
  const skis = Math.max(0, entier(entree.skis) ?? 0);
  if (bagages + skis > CAPACITE_BAGAGES.standard) {
    return {
      ok: false,
      message: `That is more luggage than one vehicle takes — ask us for a group quote.`,
      champ: "bagages",
    };
  }

  const categorie = CATEGORIES.includes(entree.vehicle as CategorieVehicule)
    ? (entree.vehicle as CategorieVehicule)
    : "standard";

  /*
    Le véhicule du retour. Inconnu ou absent, le retour reprend celui de
    l'aller — et sur un aller simple il n'a aucun sens, on l'ignore plutôt que
    de refuser la demande pour un paramètre d'URL oublié, comme pour l'effectif
    du retour juste au-dessus.
  */
  const categorieRetour =
    retour && CATEGORIES.includes(entree.vehicleReturn as CategorieVehicule)
      ? (entree.vehicleReturn as CategorieVehicule)
      : null;

  const from = texte(entree.from);
  const to = texte(entree.to);
  const departConnu = from ? airportParSlug(from) : null;
  const arriveeConnue = to ? resortParSlug(to) : null;

  // Une adresse libre d'un côté ou de l'autre : on ne chiffre pas, on devise.
  if (!departConnu || !arriveeConnue) {
    const depart = texte(entree.fromText, 300) ?? from;
    const arrivee = texte(entree.toText, 300) ?? to;
    if (!depart || !arrivee) {
      return { ok: false, message: "Tell us where you are travelling from and to.", champ: "lieux" };
    }
    return {
      ok: true,
      surMesure: {
        depart,
        arrivee,
        aller,
        retour,
        passagers,
        bagages,
        skis,
        motif: "adresse-libre",
      },
    };
  }

  // Retour asymétrique : les lieux du retour, s'ils diffèrent, doivent eux aussi
  // être connus des registres — sinon la réservation entière passe en devis.
  const retourFrom = texte(entree.returnFrom);
  const retourTo = texte(entree.returnTo);
  if (retour && (retourFrom || retourTo)) {
    const resortRetour = retourFrom ? resortParSlug(retourFrom) : arriveeConnue;
    const airportRetour = retourTo ? airportParSlug(retourTo) : departConnu;
    if (!resortRetour || !airportRetour) {
      return {
        ok: true,
        surMesure: {
          depart: `${departConnu.name} → ${arriveeConnue.name}`,
          arrivee: `${texte(entree.returnFromText, 200) ?? retourFrom ?? arriveeConnue.name} → ${
            texte(entree.returnToText, 200) ?? retourTo ?? departConnu.name
          }`,
          aller,
          retour,
          passagers,
          bagages,
          skis,
          motif: "adresse-libre",
        },
      };
    }
    return {
      ok: true,
      demande: {
        airport: departConnu.slug,
        resort: arriveeConnue.slug,
        categorie,
        categorieRetour,
        passagers,
        passagersRetour,
        aller,
        retour,
        retourAirport: airportRetour.slug,
        retourResort: resortRetour.slug,
        bagages,
        skis,
        partage: entree.shared === true || entree.shared === "true",
      },
    };
  }

  return {
    ok: true,
    demande: {
      airport: departConnu.slug,
      resort: arriveeConnue.slug,
      categorie,
      /*
        Le véhicule du retour voyage aussi par ce chemin — le cas courant.

        Il n'était transmis que par la branche du retour asymétrique, celle où
        les lieux changent. Sur un aller-retour ordinaire, le retour reprenait
        donc silencieusement le véhicule de l'aller : une Premium à quatre
        places était acceptée pour un retour à sept personnes, et le choix
        inverse — venir en Premium, repartir en Standard — était refusé faute de
        places. Deux fautes symétriques, la première étant la grave.
      */
      categorieRetour,
      passagers,
      passagersRetour,
      aller,
      retour,
      bagages,
      skis,
      partage: entree.shared === true || entree.shared === "true",
    },
  };
}
