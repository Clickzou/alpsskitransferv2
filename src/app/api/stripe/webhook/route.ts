import { NextResponse } from "next/server";
import { SITE } from "@/data/site";
import { envoyer } from "@/lib/reservation/email";
import { signatureValide } from "@/lib/reservation/stripe";
import { inserer, mettreAJour } from "@/lib/reservation/supabase";

/**
 * Webhook Stripe — c'est **ici** qu'une réservation devient payée, et nulle part
 * ailleurs.
 *
 * La page de retour du client ne prouve rien : elle s'atteint en tapant l'URL. Le
 * webhook, lui, est signé par Stripe et vérifié avant tout traitement. Un
 * événement non signé est rejeté en 400 sans rien écrire.
 *
 * POST /api/stripe/webhook
 */
export const dynamic = "force-dynamic";

interface SessionStripe {
  id: string;
  client_reference_id: string | null;
  customer_email: string | null;
  customer_details?: { email?: string | null; name?: string | null };
  amount_total: number | null;
  currency: string | null;
  payment_intent: string | null;
  metadata?: Record<string, string>;
}

export async function POST(requete: Request) {
  // Le corps brut, avant tout parsing : la signature porte sur ces octets-là.
  const charge = await requete.text();

  if (!signatureValide(charge, requete.headers.get("stripe-signature"))) {
    return NextResponse.json({ erreur: "Invalid signature." }, { status: 400 });
  }

  let evenement: { type: string; data: { object: SessionStripe } };
  try {
    evenement = JSON.parse(charge);
  } catch {
    return NextResponse.json({ erreur: "Invalid payload." }, { status: 400 });
  }

  // Les autres événements sont acquittés sans traitement : Stripe cesse de les
  // rejouer, et le journal reste lisible.
  if (evenement.type !== "checkout.session.completed") {
    return NextResponse.json({ recu: true, ignore: evenement.type });
  }

  const session = evenement.data.object;
  const reference = session.client_reference_id ?? session.metadata?.reference ?? null;
  const montant = session.amount_total != null ? session.amount_total / 100 : null;
  const email = session.customer_details?.email ?? session.customer_email ?? null;

  if (reference) {
    await mettreAJour("reservations", { colonne: "reference", valeur: reference }, {
      statut: "payee",
      session_stripe: session.id,
      paiement_stripe: session.payment_intent,
      paye_le: new Date().toISOString(),
    });
  }

  await inserer("paiements", {
    reference,
    session_stripe: session.id,
    paiement_stripe: session.payment_intent,
    montant,
    devise: (session.currency ?? "eur").toUpperCase(),
    statut: "paye",
  });

  const recapitulatif = [
    `Reference: ${reference ?? "unknown"}`,
    montant != null ? `Amount paid: €${montant}` : null,
    session.metadata?.airport && session.metadata?.resort
      ? `Journey: ${session.metadata.airport} → ${session.metadata.resort}`
      : null,
  ]
    .filter(Boolean)
    .join("\n");

  if (email) {
    await envoyer({
      destinataire: email,
      sujet: `Your transfer is confirmed — ${reference ?? ""}`.trim(),
      texte: [
        "Your transfer is booked and paid.",
        "",
        recapitulatif,
        "",
        "Your driver will track your flight and meet you in arrivals with your name.",
        "",
        `${SITE.nom} — ${SITE.url}`,
      ].join("\n"),
    });
  }

  const exploitant = process.env.EMAIL_EXPLOITANT;
  if (exploitant) {
    await envoyer({
      destinataire: exploitant,
      sujet: `Paid booking ${reference ?? session.id}`,
      texte: [recapitulatif, email ? `Client: ${email}` : null].filter(Boolean).join("\n"),
    });
  }

  return NextResponse.json({ recu: true });
}
