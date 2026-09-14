/**
 * Le remboursement d'une course — demande de JC, 14 septembre 2026.
 *
 * Le montant se **propose** selon les conditions de vente (article 3.1), et
 * l'exploitant peut toujours le forcer :
 *
 * - plus de 24 heures avant la prise en charge : tout, moins les frais de
 *   transaction — ceux que Stripe a réellement prélevés sur ce paiement, et
 *   qu'il ne rend pas quand on rembourse ;
 * - dans les 24 heures, ou course commencée : rien.
 *
 * Ces règles sont ici, sans accès réseau, pour être testées.
 */

const HEURE = 3600 * 1000;

export interface EtatPaiement {
  /** Ce que le client a payé, en euros. */
  paye: number;
  /** Ce qui lui a déjà été rendu, en euros. */
  dejaRembourse: number;
  /** Les frais prélevés par Stripe sur ce paiement, en euros — `null` s'ils sont inconnus. */
  frais: number | null;
}

export interface Suggestion {
  /** Le montant proposé, en euros. */
  montant: number;
  /** Ce que l'exploitant lit sous le champ : d'où vient ce montant. */
  motif: string;
}

const arrondi = (n: number) => Math.round(n * 100) / 100;
const euros = (n: number) => `${String(arrondi(n)).replace(".", ",")} €`;

/** Ce qui peut encore être rendu. */
export function disponible(etat: EtatPaiement): number {
  return Math.max(0, arrondi(etat.paye - etat.dejaRembourse));
}

export function suggestionRemboursement(
  etat: EtatPaiement,
  aller: Date,
  maintenant = new Date(),
): Suggestion {
  const reste = disponible(etat);
  if (reste === 0) return { montant: 0, motif: "Tout a déjà été remboursé." };

  if (aller.getTime() - maintenant.getTime() <= 24 * HEURE) {
    return {
      montant: 0,
      motif:
        "Moins de 24 h avant l’aller, ou aller déjà fait : rien selon les conditions de vente. Pour rendre la part d’un retour, saisissez son montant.",
    };
  }

  // Les frais ne se retirent qu'une fois : un second remboursement les a déjà vus partir.
  const frais = etat.dejaRembourse > 0 ? 0 : (etat.frais ?? 0);
  return {
    montant: Math.max(0, arrondi(reste - frais)),
    motif:
      etat.frais === null
        ? "Plus de 24 h avant la prise en charge : tout, moins les frais de paiement — que Stripe n’a pas donnés ici, vérifiez le montant."
        : frais > 0
          ? `Plus de 24 h avant la prise en charge : tout, moins les frais de paiement retenus par Stripe (${euros(frais)}).`
          : "Plus de 24 h avant la prise en charge : le reste dû.",
  };
}

/**
 * Relit le montant saisi : lisible, positif, et pas plus que ce qui reste.
 * Renvoie le montant en euros, ou le message à afficher.
 */
export function montantRemboursable(saisi: unknown, etat: EtatPaiement): number | string {
  const brut = String(saisi ?? "")
    .replace(/[\s  €]/g, "")
    .replace(",", ".");
  const montant = Number(brut);
  if (brut === "" || !Number.isFinite(montant) || montant <= 0) {
    return "Le montant n’est pas lisible : écrivez un montant en euros, par exemple 250 ou 250,50.";
  }
  const reste = disponible(etat);
  if (arrondi(montant) > reste) {
    return `Le montant dépasse ce qui reste à rembourser (${euros(reste)}).`;
  }
  return arrondi(montant);
}
