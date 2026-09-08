/**
 * Devises d'affichage.
 *
 * La clientèle est majoritairement britannique et le concurrent affiche EUR, GBP
 * et USD : voir un prix dans sa monnaie lève un frein réel avant l'achat.
 *
 * Mais **l'encaissement reste en euros**, et ces taux sont figés dans le dépôt :
 * ils vieillissent. C'est acceptable parce que le montant converti est présenté
 * comme indicatif et que rien n'est facturé sur cette base — ce serait une faute
 * de s'en servir pour encaisser. Le jour où le dashboard existe, ces taux
 * viendront de la base et se mettront à jour.
 *
 * Taux relevés le 8 septembre 2026, arrondis. À rafraîchir avant la mise en
 * ligne, puis à chaque début de saison.
 */

export type CodeDevise = "EUR" | "GBP" | "USD";

export const DEVISES: Record<CodeDevise, { symbole: string; taux: number; nom: string }> = {
  EUR: { symbole: "€", taux: 1, nom: "Euro" },
  GBP: { symbole: "£", taux: 0.84, nom: "Pound sterling" },
  USD: { symbole: "$", taux: 1.09, nom: "US dollar" },
};

/** Date des taux ci-dessus, affichée quand on veut être honnête sur leur âge. */
export const TAUX_RELEVES_LE = "2026-09-08";

/**
 * Convertit un montant en euros vers la devise d'affichage.
 *
 * Arrondi à l'entier : un prix de transfert ne s'affiche pas avec des centimes,
 * et une conversion indicative encore moins.
 */
export function convertir(
  montantEuros: number,
  devise: CodeDevise,
): { montant: number; symbole: string } {
  const { symbole, taux } = DEVISES[devise];
  return { montant: Math.round(montantEuros * taux), symbole };
}
