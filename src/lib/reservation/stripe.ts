import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * Stripe en REST, sans SDK.
 *
 * Deux appels suffisent au parcours : créer une session Checkout, et vérifier la
 * signature du webhook. L'API de Stripe est form-encoded et documentée ; son SDK
 * pèse davantage que ces cinquante lignes.
 *
 * **Aucune donnée de carte ne transite par le site** : le visiteur est redirigé
 * vers la page hébergée par Stripe, et la conformité PCI reste chez Stripe.
 */

export function stripeConfigure(): boolean {
  return Boolean(process.env.STRIPE_SECRET_KEY);
}

/**
 * Les factures sont-elles émises ?
 *
 * Interrupteur `FACTURES_ACTIVES=oui`, et le taux de TVA créé dans Stripe
 * (`STRIPE_TAUX_TVA` — 10 %, inclus dans les prix affichés). **Éteint par
 * défaut** : tant que la dénomination, la numérotation et la TVA ne sont pas
 * réglées avec l'exploitant, mieux vaut pas de facture qu'une facture fausse —
 * et une facture émise ne se retire pas, elle s'annule par un avoir.
 */
export function facturesActives(): boolean {
  return process.env.FACTURES_ACTIVES === "oui" && Boolean(process.env.STRIPE_TAUX_TVA?.trim());
}

/** Une course sur la page de paiement. Montant en euros, converti en centimes ici. */
export interface LigneCheckout {
  intitule: string;
  description: string;
  montant: number;
}

export interface DemandeCheckout {
  /** Notre référence de réservation, retrouvée telle quelle dans le webhook. */
  reference: string;
  /**
   * Les courses à payer, une ligne par transfert.
   *
   * Un séjour se paie souvent en deux courses — l'aller et le retour — et le
   * panier peut en réunir davantage. Stripe les affiche alors une par une sur
   * la page de paiement, ce qui vaut mieux qu'un total opaque : le client
   * vérifie ce qu'il paie avant de payer.
   */
  lignes: LigneCheckout[];
  email: string;
  urlSucces: string;
  urlAnnulation: string;
  /** Recopié dans l'objet Stripe, pour la réconciliation. */
  metadonnees?: Record<string, string>;
}

/** Le total en centimes — sert la clé d'idempotence, et rien d'autre. */
function total(lignes: LigneCheckout[]): number {
  return lignes.reduce((somme, ligne) => somme + Math.round(ligne.montant * 100), 0);
}

/**
 * Crée une session Stripe Checkout et renvoie son URL, ou `null` si Stripe n'est
 * pas configuré ou refuse la session. Un échec ne doit pas faire perdre la
 * demande : l'appelant retombe alors sur la confirmation par e-mail.
 */
export async function creerSessionCheckout(
  demande: DemandeCheckout,
): Promise<{ url: string; id: string } | null> {
  if (!stripeConfigure()) return null;

  const corps = new URLSearchParams({
    mode: "payment",
    success_url: demande.urlSucces,
    cancel_url: demande.urlAnnulation,
    customer_email: demande.email,
    client_reference_id: demande.reference,
  });

  demande.lignes.forEach((ligne, i) => {
    corps.set(`line_items[${i}][quantity]`, "1");
    corps.set(`line_items[${i}][price_data][currency]`, "eur");
    corps.set(`line_items[${i}][price_data][product_data][name]`, ligne.intitule);
    corps.set(`line_items[${i}][price_data][product_data][description]`, ligne.description);
    // Stripe raisonne en centimes : la conversion se fait ici et nulle part ailleurs.
    corps.set(
      `line_items[${i}][price_data][unit_amount]`,
      String(Math.round(ligne.montant * 100)),
    );
  });
  corps.set("metadata[reference]", demande.reference);
  for (const [cle, valeur] of Object.entries(demande.metadonnees ?? {})) {
    corps.set(`metadata[${cle}]`, valeur);
  }

  /*
    La facture — décision de JC et de l'exploitant, 11 septembre 2026.

    Stripe l'émet lui-même après le paiement : numérotation continue, avoirs sur
    les remboursements, PDF dans la langue de la page. La TVA à 10 % est
    **incluse** : le client paie exactement le prix affiché, la facture en
    détaille le HT et la TVA. Le client professionnel coche « j'achète pour une
    entreprise » et donne sa raison sociale et son numéro de TVA. La référence
    suit dans les métadonnées de la facture : c'est elle qui relie la facture à
    sa course, dans l'onglet Factures comme dans la fiche du client.
  */
  const factures = facturesActives();
  if (factures) {
    const taux = process.env.STRIPE_TAUX_TVA!.trim();
    demande.lignes.forEach((_, i) => corps.set(`line_items[${i}][tax_rates][0]`, taux));
    corps.set("invoice_creation[enabled]", "true");
    corps.set("invoice_creation[invoice_data][metadata][reference]", demande.reference);
    corps.set("tax_id_collection[enabled]", "true");
    const langue = demande.metadonnees?.langue;
    if (langue && ["en", "fr", "de", "it"].includes(langue)) corps.set("locale", langue);
  }

  try {
    const reponse = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
        "Content-Type": "application/x-www-form-urlencoded",
        /*
          Une même demande rejouée ne crée qu'une session : un double clic ne
          doit pas produire deux paiements.

          La clé porte le montant en plus de la référence, et c'est nécessaire :
          un client qui revient changer de véhicule garde sa référence mais pas
          son total. Avec la seule référence, Stripe refuserait la requête — même
          clé, paramètres différents — et le paiement échouerait sans explication
          lisible. Avec le montant, un changement produit une nouvelle session et
          un double clic n'en produit toujours qu'une.
        */
        // L'interrupteur des factures change les paramètres : il change donc la clé.
        "Idempotency-Key": `${demande.reference}-${total(demande.lignes)}${factures ? "-f" : ""}`,
      },
      body: corps,
      cache: "no-store",
    });
    if (!reponse.ok) {
      console.error("[stripe] session refusée", await reponse.text());
      return null;
    }
    const session = (await reponse.json()) as { id: string; url: string | null };
    return session.url ? { url: session.url, id: session.id } : null;
  } catch (erreur) {
    console.error("[stripe] session impossible", erreur);
    return null;
  }
}

/**
 * Vérifie la signature `Stripe-Signature` d'un webhook.
 *
 * Sans cette vérification, n'importe qui pourrait déclarer une réservation payée
 * en postant sur l'URL du webhook. La comparaison est faite en temps constant, et
 * l'horodatage est contrôlé pour qu'un événement capté ne puisse pas être rejoué.
 */
export function signatureValide(
  charge: string,
  entete: string | null,
  secret = process.env.STRIPE_WEBHOOK_SECRET,
  toleranceSecondes = 300,
): boolean {
  if (!entete || !secret) return false;

  const champs = Object.fromEntries(
    entete.split(",").map((partie) => {
      const [cle, ...reste] = partie.trim().split("=");
      return [cle, reste.join("=")];
    }),
  );
  const horodatage = Number(champs.t);
  const signature = champs.v1;
  if (!horodatage || !signature) return false;

  const age = Math.abs(Date.now() / 1000 - horodatage);
  if (age > toleranceSecondes) return false;

  const attendue = createHmac("sha256", secret)
    .update(`${horodatage}.${charge}`, "utf8")
    .digest("hex");

  const a = Buffer.from(attendue, "utf8");
  const b = Buffer.from(signature, "utf8");
  return a.length === b.length && timingSafeEqual(a, b);
}

/** Ce que le site garde d'une facture Stripe : son numéro et ses liens. */
export interface FactureStripe {
  id: string;
  numero: string | null;
  /** La page hébergée par Stripe, où le client voit et télécharge sa facture. */
  url: string | null;
  pdf: string | null;
}

/** Un appel d'écriture à l'API Stripe — `null` sur tout refus, journalisé. */
async function ecrireStripe<T>(
  chemin: string,
  parametres: URLSearchParams,
  idempotence?: string,
): Promise<T | null> {
  if (!stripeConfigure()) return null;
  try {
    const reponse = await fetch(`https://api.stripe.com${chemin}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
        "Content-Type": "application/x-www-form-urlencoded",
        ...(idempotence ? { "Idempotency-Key": idempotence } : {}),
      },
      body: parametres,
      cache: "no-store",
    });
    if (!reponse.ok) {
      console.error(`[stripe] ${chemin} refusé`, await reponse.text());
      return null;
    }
    return (await reponse.json()) as T;
  } catch (erreur) {
    console.error(`[stripe] ${chemin} impossible`, erreur);
    return null;
  }
}

export interface DemandeFactureTelephone {
  reference: string;
  email: string;
  nom: string;
  langue: string;
  lignes: LigneCheckout[];
  /** Le délai de paiement, en jours. */
  joursEcheance: number;
  /** La mention de virement — IBAN, référence, échéance — ou `null` pour la carte. */
  mentionVirement: string | null;
}

/**
 * La facture d'une réservation prise au téléphone.
 *
 * Une facture « à régler », pas une page de paiement : Stripe la numérote dans
 * la même série que les factures du site, et sa page en ligne permet de la
 * payer par carte — c'est le lien de paiement envoyé au client. Pour un
 * virement, la mention porte l'IBAN, la référence et l'échéance ; l'exploitant
 * la marque payée à réception (`marquerFacturePayee`).
 *
 * Chaque appel porte une clé d'idempotence tirée de la référence : un double
 * clic, ou une nouvelle tentative après une coupure, ne crée ni deux clients
 * ni deux factures.
 *
 * `null` quand la facturation est éteinte ou que Stripe refuse une étape.
 */
export async function creerFactureTelephone(
  demande: DemandeFactureTelephone,
): Promise<FactureStripe | null> {
  if (!facturesActives()) return null;
  const taux = process.env.STRIPE_TAUX_TVA!.trim();

  const client = await ecrireStripe<{ id: string }>(
    "/v1/customers",
    new URLSearchParams({
      email: demande.email,
      name: demande.nom,
      "preferred_locales[0]": demande.langue,
      "metadata[reference]": demande.reference,
    }),
    `client-${demande.reference}`,
  );
  if (!client) return null;

  for (const [i, ligne] of demande.lignes.entries()) {
    const element = await ecrireStripe(
      "/v1/invoiceitems",
      new URLSearchParams({
        customer: client.id,
        currency: "eur",
        amount: String(Math.round(ligne.montant * 100)),
        description: `${ligne.intitule} — ${ligne.description}`,
        "tax_rates[0]": taux,
      }),
      `ligne-${demande.reference}-${i}`,
    );
    if (!element) return null;
  }

  const parametres = new URLSearchParams({
    customer: client.id,
    collection_method: "send_invoice",
    days_until_due: String(demande.joursEcheance),
    pending_invoice_items_behavior: "include",
    "metadata[reference]": demande.reference,
    "metadata[source]": "telephone",
    "payment_settings[payment_method_types][0]": "card",
  });
  if (demande.mentionVirement) parametres.set("description", demande.mentionVirement);

  const brouillon = await ecrireStripe<{ id: string }>(
    "/v1/invoices",
    parametres,
    `facture-${demande.reference}`,
  );
  if (!brouillon) return null;

  const finale = await ecrireStripe<{
    id: string;
    number: string | null;
    hosted_invoice_url: string | null;
    invoice_pdf: string | null;
  }>(`/v1/invoices/${brouillon.id}/finalize`, new URLSearchParams({ auto_advance: "false" }));
  if (!finale) return null;

  return {
    id: finale.id,
    numero: finale.number,
    url: finale.hosted_invoice_url,
    pdf: finale.invoice_pdf,
  };
}

/**
 * Marque une facture payée hors de Stripe — un virement reçu sur le compte de
 * l'exploitant. Stripe la passe à « payée » sans rien encaisser lui-même.
 */
export async function marquerFacturePayee(id: string): Promise<boolean> {
  const reponse = await ecrireStripe(
    `/v1/invoices/${encodeURIComponent(id)}/pay`,
    new URLSearchParams({ paid_out_of_band: "true" }),
  );
  return reponse !== null;
}

/** Relit une facture Stripe — `null` si Stripe n'est pas configuré ou ne répond pas. */
export async function lireFacture(id: string): Promise<FactureStripe | null> {
  if (!stripeConfigure()) return null;
  try {
    const reponse = await fetch(`https://api.stripe.com/v1/invoices/${encodeURIComponent(id)}`, {
      headers: { Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}` },
      cache: "no-store",
    });
    if (!reponse.ok) return null;
    const f = (await reponse.json()) as {
      id: string;
      number: string | null;
      hosted_invoice_url: string | null;
      invoice_pdf: string | null;
    };
    return { id: f.id, numero: f.number, url: f.hosted_invoice_url, pdf: f.invoice_pdf };
  } catch {
    return null;
  }
}
