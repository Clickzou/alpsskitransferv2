import { airportParSlug } from "@/lib/airports";
import { resortParSlug } from "@/lib/resorts";
import type { CategorieVehicule } from "@/lib/tarification/bareme";
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
  returnWhen?: unknown;
  returnFrom?: unknown;
  returnTo?: unknown;
  passengers?: unknown;
  bags?: unknown;
  skis?: unknown;
  vehicle?: unknown;
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

/** Analyse une date locale `YYYY-MM-DDTHH:mm`, telle que la produit un `datetime-local`. */
export function dateLocale(valeur: unknown): Date | null {
  const brut = texte(valeur, 40);
  if (!brut) return null;
  const m = brut.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/);
  if (!m) return null;
  const [, annee, mois, jour, heure, minute] = m.map(Number) as unknown as number[];
  const date = new Date(annee, mois - 1, jour, heure, minute);
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

export type Validation =
  | { ok: true; demande: DemandeReservation }
  | { ok: true; surMesure: DemandeSurMesure }
  | { ok: false; message: string };

export function validerDemande(entree: EntreeBrute): Validation {
  const aller = dateLocale(entree.when);
  if (!aller) return { ok: false, message: "Give a pick-up date and time." };

  const retour = entree.returnWhen ? dateLocale(entree.returnWhen) : null;
  if (entree.returnWhen && !retour) {
    return { ok: false, message: "Return date is not valid." };
  }
  if (retour && retour.getTime() <= aller.getTime()) {
    return { ok: false, message: "The return must be after the outbound journey." };
  }

  const passagers = entier(entree.passengers);
  if (passagers === null || passagers < 1 || passagers > CAPACITE.standard) {
    return { ok: false, message: `Passengers must be between 1 and ${CAPACITE.standard}.` };
  }

  const bagages = Math.max(0, entier(entree.bags) ?? 0);
  const skis = Math.max(0, entier(entree.skis) ?? 0);
  if (bagages + skis > CAPACITE_BAGAGES.standard) {
    return {
      ok: false,
      message: `That is more luggage than one vehicle takes — ask us for a group quote.`,
    };
  }

  const categorie = CATEGORIES.includes(entree.vehicle as CategorieVehicule)
    ? (entree.vehicle as CategorieVehicule)
    : "standard";

  const from = texte(entree.from);
  const to = texte(entree.to);
  const departConnu = from ? airportParSlug(from) : null;
  const arriveeConnue = to ? resortParSlug(to) : null;

  // Une adresse libre d'un côté ou de l'autre : on ne chiffre pas, on devise.
  if (!departConnu || !arriveeConnue) {
    const depart = texte(entree.fromText, 300) ?? from;
    const arrivee = texte(entree.toText, 300) ?? to;
    if (!depart || !arrivee) {
      return { ok: false, message: "Tell us where you are travelling from and to." };
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
        passagers,
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
      passagers,
      aller,
      retour,
      bagages,
      skis,
      partage: entree.shared === true || entree.shared === "true",
    },
  };
}
