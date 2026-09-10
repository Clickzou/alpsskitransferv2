/**
 * Barème de tarification — valeurs par défaut.
 *
 * Modèle retenu le 7 septembre 2026 : **prise en charge + distance × taux au
 * kilomètre**, avec des majorations selon le moment du trajet. La distance vient
 * d'une API de calcul d'itinéraire (voir `distance.ts`).
 *
 * Ces valeurs sont les **défauts du code**. Le barème réel est édité depuis le
 * dashboard et stocké en base : changer un tarif ne doit jamais demander un
 * déploiement. Un prix fixe posé sur un trajet précis prime toujours sur le calcul.
 */

export type CategorieVehicule = "standard" | "business" | "premium";

export interface Bareme {
  /** Montant forfaitaire par course, avant le kilométrage. */
  priseEnCharge: Record<CategorieVehicule, number>;
  /** Taux au kilomètre. */
  tauxKm: Record<CategorieVehicule, number>;
  /** Majorations en pourcentage du prix de base. Elles ne se cumulent pas entre
   *  jours, mais la majoration de nuit s'ajoute à celle du jour. */
  majorations: {
    samedi: number;
    dimanche: number;
    nuit: number;
  };
  /** Bornes horaires de la majoration de nuit (heure de prise en charge). */
  plageNuit: { debut: number; fin: number };
  /** Part du prix privé facturée par personne en transfert partagé. */
  ratioPartage: number;
  /** Remise sur le second trajet d'un aller-retour, en pourcentage. */
  remiseAllerRetour: number;
  devise: "EUR";
}

/**
 * D'où viennent ces chiffres.
 *
 * Le WordPress appliquait un taux au kilomètre seul (2,90 €/km en standard). Deux
 * raisons de ne pas le reprendre tel quel :
 *
 * 1. Il donnait 30 à 45 % de plus que les prix affichés sur les pages — 377 €
 *    calculés contre 220 € annoncés sur Chambéry → Chamonix, et 77 trajets sur 85
 *    dans ce cas. Comme la clé Google Maps du thème était vide, ce barème n'a
 *    probablement jamais pu s'appliquer.
 * 2. Il plaçait `premium` sous `standard`, une inversion de saisie.
 *
 * Les valeurs ci-dessous sont **calibrées par régression sur les 85 prix réellement
 * publiés** : `prix = 92 € + 1,18 €/km` reproduit ces prix à ±15 % sur 50 trajets
 * sur 85, avec une erreur moyenne de 14 %. Cet ajustement imparfait dit quelque
 * chose du site actuel : **les prix publiés ne suivent aucune règle**. Ils vont de
 * 1,16 à 3,27 €/km, et deux trajets de longueur comparable peuvent varier du simple
 * au double — 170 km à 450 € contre 190 km à 220 €.
 *
 * Le calcul sert donc de règle générale, et les trajets où le client tient à son
 * prix reçoivent un prix fixe qui prime (`tarifs.ts`).
 *
 * Les écarts entre catégories reprennent les rapports du barème WordPress, une
 * fois l'inversion corrigée. **Tout ceci est à valider par le client.**
 *
 * Il n'y a pas de prix plancher séparé : la prise en charge joue ce rôle, puisque
 * aucun trajet ne peut coûter moins qu'elle.
 */
export const BAREME_DEFAUT: Bareme = {
  priseEnCharge: {
    standard: 92,
    business: 115,
    premium: 140,
  },
  tauxKm: {
    standard: 1.18,
    business: 1.42,
    premium: 1.75,
  },
  majorations: {
    // Le samedi est le jour de rotation des locations : la demande y est maximale.
    // L'ancien barème le majorait de 17 % (3,40 contre 2,90 €/km) — repris tel quel.
    samedi: 17,
    // Le dimanche n'existait pas dans l'ancien barème.
    dimanche: 8,
    nuit: 20,
  },
  plageNuit: { debut: 22, fin: 6 },
  // Médiane observée sur les prix publiés : 0,214.
  ratioPartage: 0.214,
  remiseAllerRetour: 5,
  devise: "EUR",
};

/**
 * Tant que ce drapeau est faux, le moteur calcule et affiche des prix mais
 * **n'encaisse pas** : le parcours se termine en demande de devis. Mieux vaut un
 * devis qu'une réservation payée au mauvais prix.
 *
 * ## Pourquoi une variable d'environnement et non une constante
 *
 * C'était `const BAREME_VALIDE = false` dans ce fichier. Pour tester un
 * paiement, il fallait donc modifier le code, et surtout **penser à le remettre
 * après** — la seule ligne du projet qui décide si le site encaisse dépendait
 * d'un aller-retour manuel dans un commit.
 *
 * `BAREME_VALIDE=oui` l'ouvre, tout le reste le laisse fermé. Le défaut est donc
 * fermé, comme pour l'indexation et pour le moteur : un oubli de configuration
 * fait un devis, jamais un débit.
 *
 * **À ouvrir en production le jour où le client a validé la grille tarifaire**,
 * et pas avant. Un prix faux encaissé coûte plus qu'un prix juste non encaissé.
 */
export function baremeValide(): boolean {
  return process.env.BAREME_VALIDE === "oui";
}
