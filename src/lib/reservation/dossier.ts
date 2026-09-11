import { airportParSlug } from "@/lib/airports";
import { resortParSlug } from "@/lib/resorts";
import { demandesEnAttente } from "@/lib/reservation/demandes";
import { jetonValide, modifiabilite } from "@/lib/reservation/gestion";
import { lire, supabaseConfigure } from "@/lib/reservation/supabase";

/**
 * Le dossier qu'ouvre le lien « gérer ma réservation ».
 *
 * ## Pourquoi la page lit la base elle-même
 *
 * La page est rendue sur le serveur, et le jeton s'y vérifie exactement comme
 * dans `/api/gestion`. Passer par une route d'API ne ferait qu'ajouter un aller
 * et retour — et une deuxième surface publique capable de rendre une
 * réservation, c'est-à-dire une deuxième occasion de se tromper de garde.
 *
 * ## Ce qui sort d'ici
 *
 * Un état, jamais une exception : le lien est invalide, la base est muette, la
 * course est annulée, passée, trop proche, ou modifiable. La page a une phrase
 * pour chacun de ces cas — c'est tout l'intérêt de les nommer.
 *
 * ## Ce qui n'en sort pas
 *
 * Ni téléphone, ni e-mail, ni adresse. Le lien ouvre **une** course pour
 * quelqu'un qui la connaît déjà ; il n'a pas à réafficher les coordonnées
 * personnelles du client, qui ne servent à rien ici et qui fuiteraient avec le
 * lien. On rend ce qu'il faut pour reconnaître son trajet et pas davantage.
 */

/** La course, telle qu'elle s'affiche — des valeurs sérialisables, rien de plus. */
export interface CourseGestion {
  reference: string;
  /** Départ de l'aller, en ISO. La page le formate dans sa langue. */
  aller: string;
  retour: string | null;
  trajetAller: string;
  /** Le retour quand il ne reprend pas l'aller inversé. */
  trajetRetour: string | null;
  vehicule: string;
  vehiculeRetour: string | null;
  passagers: number;
  passagersRetour: number | null;
  vol: string | null;
  montant: number;
  payee: boolean;
  /**
   * La demande qui attend l'exploitant — les heures demandées, en ISO — ou
   * `null`. Le client doit voir ce qu'il a demandé, et que ce n'est pas acquis.
   */
  demande: { aller: string | null; retour: string | null } | null;
}

export type Dossier =
  | { etat: "lien-invalide" }
  | { etat: "indisponible" }
  | { etat: "introuvable" }
  | { etat: "annulee"; course: CourseGestion }
  | { etat: "passee"; course: CourseGestion }
  | { etat: "tardive"; course: CourseGestion }
  | {
      etat: "ouverte";
      course: CourseGestion;
      /** Chaque sens a son propre préavis : l'un peut être ouvert, l'autre non. */
      modifiable: { aller: boolean; retour: boolean };
    };

interface Ligne {
  reference: string;
  statut: string;
  airport: string;
  resort: string;
  aller: string;
  retour: string | null;
  retour_airport: string | null;
  retour_resort: string | null;
  vehicule: string;
  vehicule_retour: string | null;
  passagers: number;
  passagers_retour: number | null;
  vol: string | null;
  montant: string | number;
}

/** « geneva-airport » → « Geneva Airport » : le client ne lit pas des slugs. */
function nomAeroport(slug: string | null | undefined): string {
  if (!slug) return "";
  return airportParSlug(slug)?.name ?? slug;
}

function nomStation(slug: string | null | undefined): string {
  if (!slug) return "";
  return resortParSlug(slug)?.name ?? slug;
}

/** « premium » → « Premium » : les catégories portent le même nom partout. */
function nomVehicule(categorie: string | null | undefined): string {
  if (!categorie) return "";
  return categorie.charAt(0).toUpperCase() + categorie.slice(1);
}

/**
 * Relit une réservation pour la page de gestion.
 *
 * L'ordre des refus compte : le jeton d'abord, avant toute lecture. Sans lui, la
 * référence seule ouvrirait la porte — `AST-4F7K2Q` se devine par essais
 * successifs, le HMAC non.
 */
export async function chargerDossier(
  reference: string | null,
  jeton: string | null,
  maintenant = new Date(),
): Promise<Dossier> {
  if (!reference || !jetonValide(reference, jeton)) return { etat: "lien-invalide" };
  if (!supabaseConfigure()) return { etat: "indisponible" };

  const [ligne] = await lire<Ligne>("reservations", {
    filtres: [{ colonne: "reference", operateur: "eq", valeur: reference }],
    limite: 1,
  });
  if (!ligne) return { etat: "introuvable" };

  const trajetRetour =
    ligne.retour && (ligne.retour_resort || ligne.retour_airport)
      ? `${nomStation(ligne.retour_resort ?? ligne.resort)} → ${nomAeroport(
          ligne.retour_airport ?? ligne.airport,
        )}`
      : null;

  const course: CourseGestion = {
    reference: ligne.reference,
    aller: ligne.aller,
    retour: ligne.retour,
    trajetAller: `${nomAeroport(ligne.airport)} → ${nomStation(ligne.resort)}`,
    trajetRetour,
    vehicule: nomVehicule(ligne.vehicule),
    vehiculeRetour: ligne.vehicule_retour ? nomVehicule(ligne.vehicule_retour) : null,
    passagers: ligne.passagers,
    passagersRetour: ligne.passagers_retour,
    vol: ligne.vol,
    montant: Number(ligne.montant),
    payee: ligne.statut === "payee",
    demande: null,
  };

  if (ligne.statut === "annulee") return { etat: "annulee", course };

  /*
    Une course passée n'est pas une course trop proche.

    Le lien vit dans une boîte mail pour toujours : celui qui le rouvre en avril
    doit lire « ce trajet a déjà eu lieu », pas « prévenez-nous 24 heures à
    l'avance » — qui l'enverrait écrire à l'exploitant pour rien.
  */
  const attente = await demandesEnAttente(ligne.reference);
  if (attente.length > 0) {
    course.demande = {
      aller: attente.find((l) => l.champ === "aller")?.nouveau ?? null,
      retour: attente.find((l) => l.champ === "retour")?.nouveau ?? null,
    };
  }

  const sens = modifiabilite(
    new Date(ligne.aller),
    ligne.retour ? new Date(ligne.retour) : null,
    maintenant,
  );
  /*
    Et la course n'est passée que quand le retour l'est aussi : le client déjà
    en station, qui décale son retour, n'a pas à lire que tout est fini.
  */
  if (!sens.aVenir) return { etat: "passee", course };

  return sens.aller || sens.retour
    ? { etat: "ouverte", course, modifiable: { aller: sens.aller, retour: sens.retour } }
    : { etat: "tardive", course };
}
