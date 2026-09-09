import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { SITE } from "@/data/site";
import { airportParSlug } from "@/lib/airports";
import { resortParSlug } from "@/lib/resorts";
import { emailConfigure, envoyer } from "@/lib/reservation/email";
import { validerDemande } from "@/lib/reservation/demande";
import { devisReservation } from "@/lib/reservation/devis";
import { creerSessionCheckout, stripeConfigure } from "@/lib/reservation/stripe";
import { inserer, mettreAJour, supabaseConfigure } from "@/lib/reservation/supabase";

/**
 * Enregistrement d'une réservation.
 *
 * Le montant est **recalculé ici** à partir du trajet : le navigateur envoie une
 * demande, jamais un prix. C'est la règle qui empêche qu'on encaisse ce qu'un
 * formulaire manipulé aurait décidé.
 *
 * Deux issues, selon l'état du barème :
 *  · barème validé et Stripe configuré → session Checkout, le client paie ;
 *  · sinon → demande enregistrée et confirmée par e-mail, rien n'est encaissé.
 *
 * POST /api/reservation
 */
export const dynamic = "force-dynamic";

interface Coordonnees {
  nom?: string;
  email?: string;
  telephone?: string;
  vol?: string;
  adresse?: string;
  skis?: number;
  enfants?: string;
  message?: string;
}

const propre = (valeur: unknown, taille = 200): string =>
  typeof valeur === "string" ? valeur.trim().slice(0, taille) : "";

/** Référence lisible au téléphone : AST-4F7K2Q. */
function reference(): string {
  const brut = randomUUID().replace(/-/g, "").toUpperCase();
  return `AST-${brut.slice(0, 6)}`;
}

const heure = (date: Date) =>
  date.toLocaleString("en-GB", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

export async function POST(requete: Request) {
  let corps: Record<string, unknown>;
  try {
    corps = (await requete.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ erreur: "Invalid request." }, { status: 400 });
  }

  const valide = validerDemande(corps);
  if (!valide.ok) return NextResponse.json({ erreur: valide.message }, { status: 400 });

  const client = (corps.client ?? {}) as Coordonnees;
  const nom = propre(client.nom, 120);
  const email = propre(client.email, 160);
  const telephone = propre(client.telephone, 40);
  const adresse = propre(client.adresse, 300);
  if (!nom || !email.includes("@") || !telephone || !adresse) {
    return NextResponse.json(
      { erreur: "Name, email, mobile number and address in resort are required." },
      { status: 400 },
    );
  }

  // Demande sur mesure : un lieu saisi librement, aucune distance a mesurer. On
  // l'enregistre et on la notifie comme une demande de devis, sans prix.
  if ("surMesure" in valide) {
    const ref = reference();
    const s = valide.surMesure;
    const ligneSurMesure = {
      reference: ref,
      statut: "devis-a-confirmer",
      airport: s.depart.slice(0, 200),
      resort: s.arrivee.slice(0, 200),
      vehicule: "a-definir",
      passagers: s.passagers,
      aller: s.aller.toISOString(),
      retour: s.retour ? s.retour.toISOString() : null,
      montant: 0,
      devise: "EUR",
      client_nom: nom,
      client_email: email,
      client_telephone: telephone,
      vol: propre(client.vol, 20),
      adresse,
      bagages_ski: s.skis,
      enfants: propre(client.enfants, 120),
      message: propre(client.message, 2000),
    };
    const enregistreeSurMesure = await inserer("reservations", ligneSurMesure);
    if (!enregistreeSurMesure && !supabaseConfigure() && !emailConfigure()) {
      return NextResponse.json(
        {
          erreur: "Online booking is not open yet — please send us your journey by email.",
          devisSurMesure: true,
        },
        { status: 503 },
      );
    }
    const recap = [
      `Reference: ${ref}`,
      `Journey: ${s.depart} → ${s.arrivee}`,
      `Outbound: ${heure(s.aller)}`,
      s.retour ? `Return: ${heure(s.retour)}` : null,
      `${s.passagers} passenger(s), ${s.bagages} bag(s), ${s.skis} ski bag(s)`,
      `Address in resort: ${adresse}`,
      ligneSurMesure.message ? `Notes: ${ligneSurMesure.message}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    const exploitantSurMesure = process.env.EMAIL_EXPLOITANT;
    await Promise.all([
      envoyer({
        destinataire: email,
        sujet: `Your transfer request ${ref}`,
        texte: [
          `Thank you, ${nom}.`,
          "",
          "This journey is quoted by hand rather than online — we will come back to you by email with a fixed price. Nothing has been charged.",
          "",
          recap,
          "",
          `${SITE.nom} — ${SITE.url}`,
        ].join("\n"),
      }),
      exploitantSurMesure
        ? envoyer({
            destinataire: exploitantSurMesure,
            sujet: `Quote to price by hand ${ref}`,
            texte: [recap, "", `Client: ${nom} · ${email} · ${telephone}`].join("\n"),
          })
        : Promise.resolve(false),
    ]);

    return NextResponse.json({ reference: ref, devisSurMesure: true });
  }

  const { demande } = valide;
  const resultat = devisReservation(demande);
  if (!resultat.ok) {
    return NextResponse.json(
      {
        erreur: "We do not have a fixed price for this journey — ask us for a quote.",
        devisSurMesure: true,
      },
      { status: 422 },
    );
  }

  const devis = resultat.devis;
  const aeroport = airportParSlug(demande.airport)!;
  const station = resortParSlug(demande.resort)!;
  const ref = reference();
  const intitule = `${aeroport.name} → ${station.name}`;

  const ligne = {
    reference: ref,
    statut: devis.encaissable ? "en-attente-paiement" : "devis-a-confirmer",
    airport: demande.airport,
    resort: demande.resort,
    vehicule: demande.categorie,
    passagers: demande.passagers,
    aller: demande.aller.toISOString(),
    retour: demande.retour ? demande.retour.toISOString() : null,
    montant: devis.total,
    devise: devis.devise,
    client_nom: nom,
    client_email: email,
    client_telephone: telephone,
    vol: propre(client.vol, 20),
    adresse,
    bagages_ski: Number.isInteger(client.skis) ? client.skis : 0,
    enfants: propre(client.enfants, 120),
    message: propre(client.message, 2000),
  };

  const enregistree = await inserer("reservations", ligne);

  // Ni base ni e-mail : le moteur n'est pas configuré sur cet environnement. On
  // refuse franchement plutôt que d'afficher une confirmation sans destinataire.
  if (!enregistree && !supabaseConfigure() && !emailConfigure()) {
    return NextResponse.json(
      {
        erreur: "Online booking is not open yet — please send us your journey by email.",
        devisSurMesure: true,
      },
      { status: 503 },
    );
  }

  const recapitulatif = [
    `Reference: ${ref}`,
    `Journey: ${intitule}`,
    `Outbound: ${heure(demande.aller)}`,
    demande.retour ? `Return: ${heure(demande.retour)}` : null,
    `Vehicle: ${demande.categorie} — ${demande.passagers} passenger(s)`,
    `Total: €${devis.total}${demande.retour ? " for both journeys" : ""}`,
    `Address in resort: ${adresse}`,
    ligne.vol ? `Flight: ${ligne.vol}` : null,
    ligne.bagages_ski ? `Ski or board bags: ${ligne.bagages_ski}` : null,
    ligne.enfants ? `Children: ${ligne.enfants}` : null,
    ligne.message ? `Notes: ${ligne.message}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  // --- Paiement, quand le barème est validé ---------------------------------
  if (devis.encaissable && stripeConfigure()) {
    const session = await creerSessionCheckout({
      reference: ref,
      lignes: [
        {
          intitule,
          description: `${heure(demande.aller)} · ${demande.passagers} passenger(s)`,
          montant: devis.total,
        },
      ],
      email,
      urlSucces: `${SITE.url}/booking/confirmed/?ref=${ref}`,
      urlAnnulation: `${SITE.url}/book-ski-transfer-tickets/?from=${demande.airport}&to=${demande.resort}`,
      metadonnees: { airport: demande.airport, resort: demande.resort },
    });

    if (session) {
      await mettreAJour("reservations", { colonne: "reference", valeur: ref }, {
        session_stripe: session.id,
      });
      return NextResponse.json({ reference: ref, paiement: session.url });
    }
    // Stripe indisponible : on ne perd pas la demande, on la traite comme un devis.
  }

  // --- Sinon : confirmation par e-mail --------------------------------------
  const exploitant = process.env.EMAIL_EXPLOITANT;
  const notifications = await Promise.all([
    envoyer({
      destinataire: email,
      sujet: `Your transfer request ${ref} — ${intitule}`,
      texte: [
        `Thank you, ${nom}.`,
        "",
        "We have your transfer request and will confirm it by email shortly.",
        "Nothing has been charged.",
        "",
        recapitulatif,
        "",
        `${SITE.nom} — ${SITE.url}`,
      ].join("\n"),
    }),
    exploitant
      ? envoyer({
          destinataire: exploitant,
          sujet: `New transfer request ${ref} — ${intitule}`,
          texte: [recapitulatif, "", `Client: ${nom} · ${email} · ${telephone}`].join("\n"),
        })
      : Promise.resolve(false),
  ]);

  return NextResponse.json({
    reference: ref,
    enregistree: Boolean(enregistree),
    notifie: notifications.some(Boolean),
  });
}
