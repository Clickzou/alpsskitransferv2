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

export interface DemandeCheckout {
  /** Notre référence de réservation, retrouvée telle quelle dans le webhook. */
  reference: string;
  /** Libellé affiché sur la page de paiement. */
  intitule: string;
  description: string;
  /** Montant en euros. Converti en centimes ici, une seule fois. */
  montant: number;
  email: string;
  urlSucces: string;
  urlAnnulation: string;
  /** Recopié dans l'objet Stripe, pour la réconciliation. */
  metadonnees?: Record<string, string>;
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
    "line_items[0][quantity]": "1",
    "line_items[0][price_data][currency]": "eur",
    "line_items[0][price_data][product_data][name]": demande.intitule,
    "line_items[0][price_data][product_data][description]": demande.description,
    // Stripe raisonne en centimes : la conversion se fait ici et nulle part ailleurs.
    "line_items[0][price_data][unit_amount]": String(Math.round(demande.montant * 100)),
  });
  corps.set("metadata[reference]", demande.reference);
  for (const [cle, valeur] of Object.entries(demande.metadonnees ?? {})) {
    corps.set(`metadata[${cle}]`, valeur);
  }

  try {
    const reponse = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
        "Content-Type": "application/x-www-form-urlencoded",
        // Une même demande rejouée ne crée qu'une session : un double clic ne
        // doit pas produire deux paiements.
        "Idempotency-Key": demande.reference,
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
