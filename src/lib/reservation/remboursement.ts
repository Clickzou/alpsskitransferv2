/**
 * Le remboursement d'une course — demande de JC, 14 septembre 2026.
 *
 * Le montant se **propose**, et l'exploitant peut toujours le forcer :
 *
 * - plus de 24 heures avant l'aller : la totalité, frais compris — les
 *   conditions de vente permettraient de retenir les frais de transaction,
 *   l'exploitant a choisi de ne pas le faire ;
 * - dans les 24 heures, ou aller déjà fait : rien (article 3.1).
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

  /*
    La totalité, frais compris — décision de l'exploitant, 14 septembre 2026 :
    le client est remboursé en entier, même si les conditions de vente
    permettraient de retenir les frais. Stripe, lui, ne rend pas ses frais :
    on le dit, pour que ce que coûte le remboursement ne soit pas une surprise.
  */
  return {
    montant: reste,
    motif:
      etat.frais && etat.dejaRembourse === 0
        ? `Plus de 24 h avant l’aller : la totalité. Stripe garde ses frais sur ce paiement (${euros(etat.frais)}) : ils restent à votre charge.`
        : "Plus de 24 h avant l’aller : la totalité.",
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
