import { filtreRecherche, type Critere } from "@/lib/admin/recherche";
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
  vehicule_retour: string | null;
  passagers: number;
  passagers_retour: number | null;
  aller: string;
  retour: string | null;
  retour_airport: string | null;
  retour_resort: string | null;
  montant: string | number;
  devise: string;
  client_nom: string;
  client_email: string;
  client_telephone: string;
  vol: string | null;
  adresse: string;
  adresse_retour: string | null;
  vol_retour: string | null;
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
  /**
   * « Alpe d'Huez → Geneva Airport », quand le retour ne reprend pas l'aller
   * inversé. `null` autrement : l'écran n'a alors rien à ajouter.
   */
  trajetRetour: string | null;
  /** La prise en charge au retour, donnée après le paiement ; `null` = même adresse qu'à l'aller. */
  adresseRetour: string | null;
  volRetour: string | null;
  /** Où repart le client, et vers quel aéroport — toujours renseignés quand il y a un retour. */
  stationRetour: string;
  aeroportRetour: string;
  vehicule: string;
  /** Le véhicule du retour quand il diffère — `null` s'il est le même. */
  vehiculeRetour: string | null;
  bagagesSki: number;
  vol: string | null;
  client: { nom: string; email: string; telephone: string };
  enfants: string | null;
  message: string | null;
  montant: number;
  devise: string;
  payeLe: Date | null;
  creeLe: Date;
  /** Ce que le client a changé depuis son lien de gestion, dans l'ordre. */
  historique: Modification[];
}

/** Une ligne de l'historique : un champ changé, ou une demande à moins de 24 heures. */
export interface Modification {
  champ: string;
  ancien: string | null;
  nouveau: string | null;
  /** en-attente · acceptee · refusee · remplacee · appliquee · transmise */
  statut: string;
  /** L'aller et le retour d'une même demande partagent un lot, et se tranchent ensemble. */
  lot: string | null;
  langue: string | null;
  source: string;
  le: Date;
}

interface LigneModification {
  reference: string;
  champ: string;
  ancien: string | null;
  nouveau: string | null;
  statut: string | null;
  lot: string | null;
  langue: string | null;
  source: string;
  cree_le: string;
}

/**
 * Rattache à chaque course son historique, en une seule requête.
 *
 * La réservation ne garde que la dernière heure : au téléphone avec un client
 * qui dit « j'avais réservé pour 14 h », c'est ici que l'exploitant voit qui a
 * changé quoi, et quand.
 *
 * L'absence de la table est tolérée : avant la migration du 11 septembre, le
 * back-office doit continuer d'afficher les courses — sans historique.
 */
async function avecHistorique(courses: Course[]): Promise<Course[]> {
  if (courses.length === 0) return courses;
  try {
    const lignes = await lire<LigneModification>("modifications", {
      filtres: [
        {
          colonne: "reference",
          operateur: "in",
          valeur: `(${courses.map((c) => c.reference).join(",")})`,
        },
      ],
      tri: { colonne: "cree_le", croissant: true },
      limite: 1000,
    });
    if (!Array.isArray(lignes)) return courses;

    const parReference = new Map<string, Modification[]>();
    for (const ligne of lignes) {
      const liste = parReference.get(ligne.reference) ?? [];
      liste.push({
        champ: ligne.champ,
        ancien: ligne.ancien,
        nouveau: ligne.nouveau,
        statut: ligne.statut ?? "appliquee",
        lot: ligne.lot,
        langue: ligne.langue,
        source: ligne.source,
        le: new Date(ligne.cree_le),
      });
      parReference.set(ligne.reference, liste);
    }
    return courses.map((c) => ({ ...c, historique: parReference.get(c.reference) ?? [] }));
  } catch {
    return courses;
  }
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
    /*
      Où repart le client, quand ce n'est pas d'où il est arrivé.

      Sans cette ligne, l'écran affichait « Retour : mar. 22 déc., 23:36 » et
      laissait supposer un départ de la station de l'aller. Sur un aller-retour
      asymétrique — arriver aux Gets, repartir de l'Alpe d'Huez — c'est cent
      cinquante kilomètres d'écart au moment d'organiser la journée.
    */
    trajetRetour:
      ligne.retour && (ligne.retour_resort || ligne.retour_airport)
        ? `${nomStation(ligne.retour_resort ?? ligne.resort)} → ${nomAeroport(
            ligne.retour_airport ?? ligne.airport,
          )}`
        : null,
    adresseRetour: ligne.adresse_retour?.trim() || null,
    volRetour: ligne.vol_retour?.trim() || null,
    stationRetour: nomStation(ligne.retour_resort ?? ligne.resort),
    aeroportRetour: nomAeroport(ligne.retour_airport ?? ligne.airport),
    vehicule: ligne.vehicule,
    vehiculeRetour:
      ligne.vehicule_retour && ligne.vehicule_retour !== ligne.vehicule
        ? ligne.vehicule_retour
        : null,
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
    historique: [],
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
  return avecHistorique(lignes.map(versCourse));
}

/**
 * Une réservation et son historique — la fiche du client.
 *
 * C'est là que mène l'e-mail « à valider » : l'exploitant y lit tout ce que le
 * client a saisi, ce qu'il a demandé depuis, et tranche.
 */
export async function courseParReference(reference: string): Promise<Course | null> {
  const [ligne] = await lire<LigneBase>("reservations", {
    filtres: [{ colonne: "reference", operateur: "eq", valeur: reference }],
    limite: 1,
  });
  if (!ligne) return null;
  const [course] = await avecHistorique([versCourse(ligne)]);
  return course ?? null;
}

/**
 * Les courses qui répondent à une recherche, dans toute la base — ou `null`
 * quand il n'y a rien à chercher. Tous statuts confondus : le client qui
 * rappelle a peut-être abandonné son paiement, et c'est justement pour ça.
 */
export async function rechercherCourses(critere: Critere): Promise<Course[] | null> {
  const filtre = filtreRecherche(critere);
  if (!filtre) return null;
  const lignes = await lire<LigneBase>("reservations", {
    tri: { colonne: "aller", croissant: true },
    parametres: { and: filtre },
    limite: 200,
  });
  return avecHistorique(lignes.map(versCourse));
}

/** Les courses passées, la plus récente en tête. */
export async function coursesPassees(limite = 100): Promise<Course[]> {
  const lignes = await lire<LigneBase>("reservations", {
    tri: { colonne: "aller", croissant: false },
    filtres: [{ colonne: "aller", operateur: "lt", valeur: new Date().toISOString() }],
    limite,
  });
  return avecHistorique(lignes.map(versCourse));
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
