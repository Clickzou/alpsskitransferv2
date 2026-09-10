import { airportParSlug } from "@/lib/airports";
import { lire } from "@/lib/reservation/supabase";
import { resortParSlug } from "@/lib/resorts";

/**
 * Les courses, telles que le back-office les montre.
 *
 * ## Ce que ce module existe pour régler
 *
 * Demande explicite de l'exploitant, 10 septembre 2026 : « avec l'ancien
 * logiciel on ne voyait pas la destination de la course, je devais les
 * contacter à chaque fois pour demander le trajet ». Une liste de courses qui
 * oblige à rappeler le client pour savoir où il va n'est pas un back-office,
 * c'est un carnet de rendez-vous.
 *
 * Le trajet est donc **la deuxième colonne**, juste après l'heure, et l'adresse
 * exacte en station la troisième. Le reste suit.
 *
 * ## Les slugs deviennent des noms ici
 *
 * La base stocke `geneva-airport` et `val-thorens` : ce sont les clés des
 * registres, et elles doivent le rester — un nom d'affichage en base, c'est une
 * jointure impossible le jour où le nom change. La traduction en « Geneva
 * Airport → Val Thorens » se fait à la lecture, contre les registres, qui sont
 * la source.
 */

/** Une ligne de la table `reservations`, telle que PostgREST la renvoie. */
interface LigneBase {
  reference: string;
  statut: string;
  airport: string;
  resort: string;
  vehicule: string;
  passagers: number;
  passagers_retour: number | null;
  aller: string;
  retour: string | null;
  montant: string | number;
  devise: string;
  client_nom: string;
  client_email: string;
  client_telephone: string;
  vol: string | null;
  adresse: string;
  bagages_ski: number;
  enfants: string | null;
  message: string | null;
  paye_le: string | null;
  cree_le: string;
}

export interface Course {
  reference: string;
  statut: string;
  /** « Geneva Airport → Val Thorens », prêt à lire. */
  trajet: string;
  depart: string;
  arrivee: string;
  adresse: string;
  aller: Date;
  retour: Date | null;
  passagers: number;
  /** Le groupe du retour quand il diffère — `null` s'il est le même. */
  passagersRetour: number | null;
  vehicule: string;
  bagagesSki: number;
  vol: string | null;
  client: { nom: string; email: string; telephone: string };
  enfants: string | null;
  message: string | null;
  montant: number;
  devise: string;
  payeLe: Date | null;
  creeLe: Date;
}

/** Le nom lisible d'un aéroport ou d'une station, ou son slug si le registre l'ignore. */
function nomAeroport(slug: string): string {
  return airportParSlug(slug)?.name ?? slug;
}

function nomStation(slug: string): string {
  return resortParSlug(slug)?.name ?? slug;
}

function versCourse(ligne: LigneBase): Course {
  const depart = nomAeroport(ligne.airport);
  const arrivee = nomStation(ligne.resort);
  return {
    reference: ligne.reference,
    statut: ligne.statut,
    trajet: `${depart} → ${arrivee}`,
    depart,
    arrivee,
    adresse: ligne.adresse,
    aller: new Date(ligne.aller),
    retour: ligne.retour ? new Date(ligne.retour) : null,
    passagers: ligne.passagers,
    // Un retour au même effectif n'est pas une information : on ne le remonte
    // que lorsqu'il diffère, sinon l'écran répète ce qu'il a déjà dit.
    passagersRetour:
      ligne.passagers_retour && ligne.passagers_retour !== ligne.passagers
        ? ligne.passagers_retour
        : null,
    vehicule: ligne.vehicule,
    bagagesSki: ligne.bagages_ski,
    vol: ligne.vol,
    client: {
      nom: ligne.client_nom,
      email: ligne.client_email,
      telephone: ligne.client_telephone,
    },
    enfants: ligne.enfants,
    message: ligne.message,
    montant: Number(ligne.montant),
    devise: ligne.devise,
    payeLe: ligne.paye_le ? new Date(ligne.paye_le) : null,
    creeLe: new Date(ligne.cree_le),
  };
}

/**
 * Les courses à venir, la plus proche en tête.
 *
 * C'est la vue par défaut parce que c'est la question du matin : qui je conduis
 * aujourd'hui, et où. Le passé se consulte, il ne s'affiche pas d'office.
 */
export async function coursesAVenir(limite = 200): Promise<Course[]> {
  const lignes = await lire<LigneBase>("reservations", {
    tri: { colonne: "aller", croissant: true },
    filtres: [{ colonne: "aller", operateur: "gte", valeur: new Date().toISOString() }],
    limite,
  });
  return lignes.map(versCourse);
}

/** Les courses passées, la plus récente en tête. */
export async function coursesPassees(limite = 100): Promise<Course[]> {
  const lignes = await lire<LigneBase>("reservations", {
    tri: { colonne: "aller", croissant: false },
    filtres: [{ colonne: "aller", operateur: "lt", valeur: new Date().toISOString() }],
    limite,
  });
  return lignes.map(versCourse);
}

/**
 * Le libellé d'un statut, en français.
 *
 * Les valeurs de la base sont des identifiants — `en-attente-paiement` —, ce
 * qui est juste pour un `where` et illisible dans une colonne.
 */
export const STATUTS: Record<string, { texte: string; ton: "attente" | "confirme" | "annule" }> = {
  "devis-a-confirmer": { texte: "Devis à confirmer", ton: "attente" },
  "en-attente-paiement": { texte: "En attente de paiement", ton: "attente" },
  payee: { texte: "Payée", ton: "confirme" },
  annulee: { texte: "Annulée", ton: "annule" },
};

export function statutLisible(statut: string) {
  return STATUTS[statut] ?? { texte: statut, ton: "attente" as const };
}
