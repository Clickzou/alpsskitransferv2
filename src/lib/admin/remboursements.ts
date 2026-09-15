import { bornesMois } from "@/lib/admin/factures";
import { lireAvoir, type AvoirStripe } from "@/lib/reservation/stripe";
import { lire } from "@/lib/reservation/supabase";

/**
 * Les remboursements, tels que la fiche et l'onglet Factures les lisent.
 *
 * Ils sont notés dans `paiements` avec le statut `rembourse` — pour une carte
 * comme pour un virement, que Stripe ignore. C'est donc la base qui les
 * connaît tous, et elle qui fait le total du mois.
 */

export interface Remboursement {
  reference: string;
  montant: number;
  devise: string;
  le: Date;
  /** `carte` quand Stripe a rendu l'argent, `virement` quand l'exploitant l'a fait. */
  moyen: "carte" | "virement";
  /** L’avoir émis par Stripe — numéro et PDF — quand la course était facturée. */
  avoir: AvoirStripe | null;
}

interface LignePaiement {
  reference: string;
  montant: number | string;
  devise: string | null;
  paiement_stripe: string | null;
  /** Sur une ligne de remboursement, l’identifiant de l’avoir (`cn_…`). */
  session_stripe: string | null;
  cree_le: string;
}

/** L’avoir se relit chez Stripe, qui fait foi : rien n’en est recopié en base que l’identifiant. */
async function versRemboursement(l: LignePaiement): Promise<Remboursement> {
  const avoir = l.session_stripe?.startsWith("cn_") ? await lireAvoir(l.session_stripe) : null;
  return {
    reference: l.reference,
    montant: Number(l.montant),
    devise: l.devise ?? "EUR",
    le: new Date(l.cree_le),
    moyen: l.paiement_stripe ? "carte" : "virement",
    avoir,
  };
}

/** Ce qui a déjà été rendu pour une course. */
export async function dejaRembourse(reference: string): Promise<number> {
  const lignes = await lire<LignePaiement>("paiements", {
    colonnes: "reference,montant,devise,paiement_stripe,cree_le",
    filtres: [
      { colonne: "reference", operateur: "eq", valeur: reference },
      { colonne: "statut", operateur: "eq", valeur: "rembourse" },
    ],
  });
  return Math.round(lignes.reduce((s, l) => s + Number(l.montant), 0) * 100) / 100;
}

/** Les remboursements d'une course, du plus ancien au plus récent. */
export async function remboursementsDe(reference: string): Promise<Remboursement[]> {
  const lignes = await lire<LignePaiement>("paiements", {
    colonnes: "reference,montant,devise,paiement_stripe,session_stripe,cree_le",
    filtres: [
      { colonne: "reference", operateur: "eq", valeur: reference },
      { colonne: "statut", operateur: "eq", valeur: "rembourse" },
    ],
    tri: { colonne: "cree_le", croissant: true },
  });
  return Promise.all(lignes.map(versRemboursement));
}

/** Les remboursements faits dans le mois, à l'heure des Alpes. */
export async function remboursementsDuMois(mois: string): Promise<Remboursement[]> {
  const { debut, fin } = bornesMois(mois);
  const lignes = await lire<LignePaiement>("paiements", {
    colonnes: "reference,montant,devise,paiement_stripe,session_stripe,cree_le",
    filtres: [{ colonne: "statut", operateur: "eq", valeur: "rembourse" }],
    parametres: {
      and: `(cree_le.gte.${new Date(debut * 1000).toISOString()},cree_le.lt.${new Date(fin * 1000).toISOString()})`,
    },
    tri: { colonne: "cree_le", croissant: true },
    limite: 1000,
  });
  return Promise.all(lignes.map(versRemboursement));
}
