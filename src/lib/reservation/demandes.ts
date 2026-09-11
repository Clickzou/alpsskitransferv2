import { lire } from "@/lib/reservation/supabase";

/**
 * Les demandes de changement d'horaire, en attente de l'exploitant.
 *
 * ## Le circuit
 *
 * Décision de JC, 11 septembre 2026. Le client propose une heure depuis son
 * lien de gestion ; la réservation ne bouge pas. L'exploitant reçoit un e-mail
 * qui mène à la fiche du client, où il valide ou refuse ; le client reçoit la
 * réponse par e-mail, dans sa langue. Sans réponse, l'heure d'origine tient :
 * c'est celle que le chauffeur a dans sa journée, et rien ne doit la déplacer
 * sans que l'exploitant l'ait décidé.
 *
 * Les demandes vivent dans la table `modifications`, avec l'historique : une
 * ligne par champ, l'aller et le retour d'une même demande partageant un `lot`.
 */

export const STATUT_ATTENTE = "en-attente";

export interface LigneModification {
  id: string;
  reference: string;
  lot: string | null;
  champ: string;
  ancien: string | null;
  nouveau: string | null;
  statut: string;
  langue: string | null;
  source: string;
  cree_le: string;
  traite_le: string | null;
}

/**
 * Les lignes en attente d'une réservation, dans l'ordre.
 *
 * Tolère l'absence de la table : la page du client et la fiche doivent
 * s'afficher même avant la migration — simplement sans demande.
 */
export async function demandesEnAttente(reference: string): Promise<LigneModification[]> {
  try {
    const lignes = await lire<LigneModification>("modifications", {
      filtres: [
        { colonne: "reference", operateur: "eq", valeur: reference },
        { colonne: "statut", operateur: "eq", valeur: STATUT_ATTENTE },
      ],
      tri: { colonne: "cree_le", croissant: true },
    });
    return Array.isArray(lignes) ? lignes : [];
  } catch {
    return [];
  }
}

/** La fiche d'une réservation dans le back-office — là où mène l'e-mail « à valider ». */
export function cheminFiche(reference: string): string {
  return `/gestion-ventes-tarifs-seo/reservations/${encodeURIComponent(reference)}/`;
}
