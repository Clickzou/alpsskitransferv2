import { instantAlpes, saisieAlpes } from "@/lib/temps";

/**
 * Les factures, telles que l'onglet « Factures » les montre.
 *
 * Elles vivent chez Stripe, qui les émet au paiement (`facturesActives`) :
 * rien n'est recopié en base. Une copie, c'est deux vérités qui divergent le
 * jour d'un avoir ou d'une facture annulée — et c'est Stripe qui fait foi pour
 * le comptable. On lit donc Stripe, mois par mois.
 *
 * Demande de JC, 11 septembre 2026 : un onglet Factures dans le tableau de
 * bord, et un export mensuel pour le comptable de l'exploitant.
 */

export interface Facture {
  id: string;
  numero: string;
  date: Date;
  client: string;
  email: string;
  /** La référence de la course — le lien vers la fiche du client. */
  reference: string;
  ht: number;
  tva: number;
  ttc: number;
  devise: string;
  /** payée · à régler · annulée · irrécouvrable */
  statut: string;
  pdf: string | null;
  url: string | null;
}

interface FactureBrute {
  id: string;
  number: string | null;
  created: number;
  status: string;
  customer_name: string | null;
  customer_email: string | null;
  metadata?: Record<string, string>;
  total: number;
  total_excluding_tax: number | null;
  currency: string;
  invoice_pdf: string | null;
  hosted_invoice_url: string | null;
}

const STATUTS: Record<string, string> = {
  paid: "payée",
  open: "à régler",
  void: "annulée",
  uncollectible: "irrécouvrable",
};

/** « 2026-09 », ou `null` si la saisie n'est pas un mois. */
export function moisValide(valeur: unknown): string | null {
  return typeof valeur === "string" && /^\d{4}-(0[1-9]|1[0-2])$/.test(valeur) ? valeur : null;
}

/** Le mois en cours, à l'heure des Alpes. */
export function moisCourant(maintenant = new Date()): string {
  return saisieAlpes(maintenant).slice(0, 7);
}

/** Le mois d'avant ou d'après — « 2026-12 » + 1 = « 2027-01 ». */
export function moisVoisin(mois: string, decalage: number): string {
  const [annee, m] = mois.split("-").map(Number);
  const rang = annee * 12 + (m - 1) + decalage;
  return `${Math.floor(rang / 12)}-${String((rang % 12) + 1).padStart(2, "0")}`;
}

/**
 * Le mois en secondes Unix, **à l'heure des Alpes** : une facture émise le
 * 30 septembre à 23 h 30 est de septembre, même si UTC la date du 1er octobre.
 */
export function bornesMois(mois: string): { debut: number; fin: number } {
  const [annee, m] = mois.split("-").map(Number);
  const [anneeSuivante, mSuivant] = moisVoisin(mois, 1).split("-").map(Number);
  return {
    debut: Math.floor(instantAlpes(annee, m, 1, 0, 0).getTime() / 1000),
    fin: Math.floor(instantAlpes(anneeSuivante, mSuivant, 1, 0, 0).getTime() / 1000),
  };
}

/** « septembre 2026 ». */
export function libelleMois(mois: string): string {
  const [annee, m] = mois.split("-").map(Number);
  return new Date(Date.UTC(annee, m - 1, 15)).toLocaleString("fr-FR", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

function versFacture(f: FactureBrute): Facture {
  const ttc = f.total / 100;
  const ht = (f.total_excluding_tax ?? f.total) / 100;
  return {
    id: f.id,
    numero: f.number ?? "—",
    date: new Date(f.created * 1000),
    client: f.customer_name ?? "",
    email: f.customer_email ?? "",
    reference: f.metadata?.reference ?? "",
    ht,
    tva: Math.round((ttc - ht) * 100) / 100,
    ttc,
    devise: f.currency.toUpperCase(),
    statut: STATUTS[f.status] ?? f.status,
    pdf: f.invoice_pdf,
    url: f.hosted_invoice_url,
  };
}

async function lireStripe<T>(chemin: string): Promise<T | null> {
  const cle = process.env.STRIPE_SECRET_KEY;
  if (!cle) return null;
  try {
    const reponse = await fetch(`https://api.stripe.com${chemin}`, {
      headers: { Authorization: `Bearer ${cle}` },
      cache: "no-store",
    });
    if (!reponse.ok) {
      console.error("[factures] Stripe a refusé la lecture", await reponse.text());
      return null;
    }
    return (await reponse.json()) as T;
  } catch (erreur) {
    console.error("[factures] Stripe injoignable", erreur);
    return null;
  }
}

/**
 * Les factures émises dans le mois, la plus ancienne en tête — ou `null` si
 * Stripe n'est pas configuré ou ne répond pas. Les brouillons n'en sont pas :
 * seule une facture finalisée porte un numéro.
 */
export async function facturesDuMois(mois: string): Promise<Facture[] | null> {
  if (!process.env.STRIPE_SECRET_KEY) return null;
  const { debut, fin } = bornesMois(mois);
  const factures: Facture[] = [];
  let apres: string | null = null;

  // Vingt pages de cent : deux mille factures par mois, bien au-delà du besoin.
  for (let page = 0; page < 20; page += 1) {
    const parametres = new URLSearchParams({
      limit: "100",
      "created[gte]": String(debut),
      "created[lt]": String(fin),
    });
    if (apres) parametres.set("starting_after", apres);
    const reponse: { data: FactureBrute[]; has_more: boolean } | null = await lireStripe(
      `/v1/invoices?${parametres}`,
    );
    if (!reponse) return page === 0 ? null : factures;

    factures.push(...reponse.data.filter((f) => f.status !== "draft").map(versFacture));
    if (!reponse.has_more || reponse.data.length === 0) break;
    apres = reponse.data[reponse.data.length - 1].id;
  }

  return factures.sort((a, b) => a.date.getTime() - b.date.getTime());
}

/** La facture d'une course, retrouvée par sa référence — ou `null`. */
export async function factureDeReference(reference: string): Promise<Facture | null> {
  if (!process.env.STRIPE_SECRET_KEY) return null;
  const parametres = new URLSearchParams({
    query: `metadata['reference']:'${reference.replace(/['\\]/g, "")}'`,
    limit: "1",
  });
  const reponse = await lireStripe<{ data: FactureBrute[] }>(`/v1/invoices/search?${parametres}`);
  const facture = reponse?.data?.[0];
  return facture ? versFacture(facture) : null;
}

/**
 * L'export du mois pour le comptable — un CSV qu'Excel ouvre tel quel en
 * français : point-virgule entre les colonnes, virgule décimale, date au format
 * jour/mois/année, et la marque UTF-8 en tête pour que les accents s'affichent.
 */
export function csvFactures(factures: Facture[]): string {
  const nombre = (n: number) => n.toFixed(2).replace(".", ",");
  const cellule = (v: string) => (/[;"\r\n]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v);
  const date = (d: Date) => {
    const [annee, mois, jour] = saisieAlpes(d).slice(0, 10).split("-");
    return `${jour}/${mois}/${annee}`;
  };

  const lignes = [
    ["Numéro", "Date", "Client", "E-mail", "Référence", "HT", "TVA", "TTC", "Devise", "Statut", "Facture PDF"].join(";"),
    ...factures.map((f) =>
      [
        f.numero,
        date(f.date),
        f.client,
        f.email,
        f.reference,
        nombre(f.ht),
        nombre(f.tva),
        nombre(f.ttc),
        f.devise,
        f.statut,
        f.pdf ?? "",
      ]
        .map(cellule)
        .join(";"),
    ),
  ];
  return `\uFEFF${lignes.join("\r\n")}\r\n`;
}
