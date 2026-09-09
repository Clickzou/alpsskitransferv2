import type { CategorieVehicule } from "@/lib/tarification/bareme";

/**
 * Le panier de transferts.
 *
 * ## Pourquoi un panier sur un site de transferts
 *
 * Un séjour, ce sont souvent deux courses — l'aller et le retour — et parfois
 * quatre, quand un groupe arrive sur deux vols. Les faire payer une par une
 * oblige à ressaisir ses coordonnées à chaque fois et fait perdre la moitié des
 * secondes réservations. Le panier les rassemble en un seul paiement.
 *
 * ## Ce qu'il stocke, et ce qu'il ne stocke pas
 *
 * Il garde **la demande**, pas le prix. Le montant affiché dans le panier est un
 * rappel de ce qui a été annoncé au moment de l'ajout ; le total qui sera
 * encaissé est **recalculé côté serveur** au passage en caisse, par la même
 * fonction que le devis. C'est la règle du projet, et elle vient de l'ancien
 * site : 220 € affichés, 377 € facturés.
 *
 * Le panier vit dans le `localStorage` du visiteur. Rien ne part au serveur tant
 * qu'il ne paie pas — donc aucune donnée personnelle stockée chez nous, et un
 * panier qui survit à la fermeture de l'onglet.
 */

/** Une course dans le panier : ce qu'il faut pour la rechiffrer et l'afficher. */
export interface LignePanier {
  /** Identifiant local, pour retirer une ligne sans ambiguïté. */
  id: string;
  /** Slug d'aéroport ou adresse libre. */
  from: string;
  to: string;
  /** Départ, `YYYY-MM-DDTHH:mm`. */
  when: string;
  passengers: number;
  categorie: CategorieVehicule;
  bags?: number;
  skis?: number;
  /** Libellés lisibles, figés à l'ajout : le panier doit rester lisible hors ligne. */
  libelleDepart: string;
  libelleArrivee: string;
  /** Prix annoncé au moment de l'ajout, en euros. Indicatif — le serveur tranche. */
  prixIndicatif: number;
}

export const CLE_PANIER = "ast-panier-v1";

/** Le panier est plafonné : au-delà, c'est une demande de groupe, pas un panier. */
export const MAX_LIGNES = 6;

/**
 * Relit le panier stocké.
 *
 * Tolérant par construction : un `localStorage` peut contenir n'importe quoi —
 * une version précédente du format, une écriture interrompue, un autre onglet.
 * Une entrée qui ne ressemble pas à une ligne est écartée plutôt que de faire
 * planter la page du panier.
 */
export function lirePanier(brut: string | null): LignePanier[] {
  if (!brut) return [];
  try {
    const donnees = JSON.parse(brut);
    if (!Array.isArray(donnees)) return [];
    return donnees.filter(estLigne).slice(0, MAX_LIGNES);
  } catch {
    return [];
  }
}

function estLigne(valeur: unknown): valeur is LignePanier {
  if (typeof valeur !== "object" || valeur === null) return false;
  const l = valeur as Record<string, unknown>;
  return (
    typeof l.id === "string" &&
    typeof l.from === "string" &&
    typeof l.to === "string" &&
    typeof l.when === "string" &&
    typeof l.passengers === "number" &&
    typeof l.libelleDepart === "string" &&
    typeof l.libelleArrivee === "string"
  );
}

/** Identifiant d'une ligne : un même trajet à la même heure ne s'ajoute pas deux fois. */
export function identifiant(ligne: Omit<LignePanier, "id">): string {
  return [ligne.from, ligne.to, ligne.when, ligne.categorie].join("|");
}
