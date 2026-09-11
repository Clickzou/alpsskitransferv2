import { FUSEAU_ALPES } from "@/lib/temps";
import { NextResponse } from "next/server";
import { airportParSlug } from "@/lib/airports";
import { resortParSlug } from "@/lib/resorts";
import { SITE } from "@/data/site";
import { envoyer } from "@/lib/reservation/email";
import { origineSite } from "@/lib/reservation/config";
import { lienGestion } from "@/lib/reservation/gestion";
import { lireFacture, signatureValide } from "@/lib/reservation/stripe";
import { corpsAvis, sujetAvis, textesEmail } from "@/lib/reservation/textes";
import { inserer, lire, mettreAJour } from "@/lib/reservation/supabase";

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
  /** La facture émise par Stripe, quand la facturation est allumée. */
  invoice?: string | null;
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

  /*
    Stripe rejoue un événement tant qu'il n'a pas reçu de 2xx — sur un délai
    réseau, un redémarrage, une erreur passagère. Sans ce garde-fou, un rejeu
    écrivait une deuxième ligne de paiement et renvoyait au client un second
    e-mail de confirmation : la comptabilité fausse et le client inquiet.

    La session Stripe est l'identifiant naturel de l'événement : si elle est
    déjà enregistrée, il n'y a rien à refaire. On acquitte, et Stripe cesse de
    rejouer.
  */
  const dejaTraite = await lire<{ id: string }>("paiements", {
    colonnes: "id",
    filtres: [{ colonne: "session_stripe", operateur: "eq", valeur: session.id }],
    limite: 1,
  });
  if (dejaTraite.length > 0) {
    return NextResponse.json({ recu: true, deja: session.id });
  }

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

  /*
    La réservation complète est en base : nom, téléphone, adresse exacte, vol,
    âge des enfants. Stripe n'en connaît rien — il ne renvoie que ce qu'on lui
    a confié. Une lecture évite d'envoyer à l'exploitant un avis qui l'oblige à
    ouvrir un ordinateur pour savoir qui appeler.
  */
  const [reservation] = reference
    ? await lire<{
        client_nom: string;
        client_telephone: string;
        client_email: string;
        adresse: string;
        vol: string | null;
        aller: string;
        retour: string | null;
        retour_airport: string | null;
        retour_resort: string | null;
        vehicule: string;
        vehicule_retour: string | null;
        passagers: number;
        passagers_retour: number | null;
        bagages_ski: number;
        enfants: string | null;
        message: string | null;
      }>("reservations", {
        filtres: [{ colonne: "reference", operateur: "eq", valeur: reference }],
        limite: 1,
      })
    : [];

  /** Les slugs du registre deviennent des noms : le client ne lit pas « geneva-airport ». */
  const nomAeroport = session.metadata?.airport
    ? (airportParSlug(session.metadata.airport)?.name ?? session.metadata.airport)
    : null;
  const nomStation = session.metadata?.resort
    ? (resortParSlug(session.metadata.resort)?.name ?? session.metadata.resort)
    : null;
  const trajetLisible = nomAeroport && nomStation ? `${nomAeroport} → ${nomStation}` : undefined;

  /*
    Le retour, quand il ne reprend pas l'aller inversé.

    Les métadonnées de la session ne portent que les lieux de l'aller ; ceux du
    retour sont en base, écrits par la route de réservation. L'avis de course
    annonçait donc une date de retour sans point de prise en charge — le
    chauffeur serait allé chercher le client à la station de l'aller, à cent
    cinquante kilomètres de là.
  */
  const trajetRetour = (() => {
    const slugStation = reservation?.retour_resort ?? null;
    const slugAeroport = reservation?.retour_airport ?? null;
    if (!slugStation && !slugAeroport) return null;
    const station = slugStation
      ? (resortParSlug(slugStation)?.name ?? slugStation)
      : (nomStation ?? "");
    const aeroport = slugAeroport
      ? (airportParSlug(slugAeroport)?.name ?? slugAeroport)
      : (nomAeroport ?? "");
    return station && aeroport ? `${station} → ${aeroport}` : null;
  })();

  const quand = (iso: string | null | undefined) =>
    iso
      ? new Date(iso).toLocaleString("fr-FR", {
    timeZone: FUSEAU_ALPES,
          weekday: "short",
          day: "numeric",
          month: "short",
          hour: "2-digit",
          minute: "2-digit",
        })
      : "";

  const recapitulatif = [
    `Reference: ${reference ?? "unknown"}`,
    montant != null ? `Amount paid: €${montant}` : null,
    trajetLisible ? `Journey: ${trajetLisible}` : null,
    trajetRetour ? `Return journey: ${trajetRetour}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  if (email) {
    /*
      La langue vient des métadonnées de la session, posées par la route de
      réservation : le webhook ne sait rien d'autre de la commande, et un
      client qui a réservé en italien ne doit pas être confirmé en anglais.
    */
    const mots = textesEmail(session.metadata?.langue);
    const trajet = trajetLisible;

    /*
      Le lien « gérer ma réservation ».

      C'est le seul endroit d'où il part : l'e-mail de confirmation est le
      message qu'on ressort à l'aéroport, et le lien signé n'a pas d'autre
      porte. Il ne vaut que pour une réservation réellement en base — un
      paiement de panier n'en crée pas — d'où la condition sur la ligne relue.
    */
    const lien =
      reference && reservation
        ? lienGestion(origineSite(requete), reference, session.metadata?.langue)
        : null;

    /*
      La facture, quand elle est émise (`facturesActives`). Son lien part dans
      cet e-mail, dans la langue du client : Stripe peut aussi l'envoyer
      lui-même — c'est un réglage du compte —, mais ce lien n'en dépend pas.
    */
    const facture = session.invoice ? await lireFacture(session.invoice) : null;

    await envoyer({
      destinataire: email,
      sujet: mots.sujet(reference ?? ""),
      texte: [
        mots.corps({
          reference: reference ?? "",
          trajet,
          montant: montant != null ? `${montant} €` : undefined,
          lien: lien ?? undefined,
        }),
        ...(facture?.url ? ["", mots.facture(facture.url)] : []),
        "",
        `${SITE.nom} — ${SITE.url}`,
      ].join("\n"),
    });
  }

  const exploitant = process.env.EMAIL_EXPLOITANT;
  if (exploitant) {
    /*
      L'avis porte tout ce qu'il faut pour conduire la course sans ouvrir un
      ordinateur : quand, où, quel numéro. Les données viennent de la ligne
      relue en base, pas des métadonnées Stripe qui n'en portent qu'une part.
    */
    const avis = {
      reference: reference ?? session.id,
      trajet: trajetLisible ?? "trajet en base",
      aller: quand(reservation?.aller) || "voir le tableau de bord",
      retour: reservation?.retour ? quand(reservation.retour) : null,
      trajetRetour,
      adresse: reservation?.adresse ?? "",
      client: {
        nom: reservation?.client_nom ?? "",
        email: reservation?.client_email ?? email ?? "",
        telephone: reservation?.client_telephone ?? "",
      },
      vehicule: reservation?.vehicule ?? "",
      vehiculeRetour: reservation?.vehicule_retour ?? null,
      passagers: reservation?.passagers ?? 0,
      passagersRetour: reservation?.passagers_retour ?? null,
      vol: reservation?.vol ?? null,
      bagagesSki: reservation?.bagages_ski ?? null,
      enfants: reservation?.enfants ?? null,
      message: reservation?.message ?? null,
      montant,
      paye: true,
    };

    await envoyer({
      destinataire: exploitant,
      sujet: sujetAvis(avis),
      texte: corpsAvis(avis),
    });
  }

  return NextResponse.json({ recu: true });
}
