import { FUSEAU_ALPES } from "@/lib/temps";
import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { ENTREPRISE, SITE } from "@/data/site";
import { airportParSlug } from "@/lib/airports";
import { resortParSlug } from "@/lib/resorts";
import { emailConfigure, envoyer } from "@/lib/reservation/email";
import { validerDemande } from "@/lib/reservation/demande";
import { devisReservation } from "@/lib/reservation/devis";
import { cheminConfirmation, origineSite } from "@/lib/reservation/config";
import { departImminent } from "@/lib/reservation/gestion";
import { creerSessionCheckout, stripeConfigure } from "@/lib/reservation/stripe";
import { corpsAvis, sujetAvis } from "@/lib/reservation/textes";
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
    timeZone: FUSEAU_ALPES,
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

/**
 * Le trajet du retour, quand il ne reprend pas l'aller inversé.
 *
 * Renvoie `null` sur un retour symétrique : le répéter alourdirait l'avis sans
 * rien apprendre au chauffeur, et c'est justement la ligne qu'il doit remarquer
 * quand elle est là.
 */
function trajetRetour(demande: {
  airport: string;
  resort: string;
  retourAirport?: string | null;
  retourResort?: string | null;
  retour?: Date | null;
}): string | null {
  if (!demande.retour) return null;
  const memeAeroport = !demande.retourAirport || demande.retourAirport === demande.airport;
  const memeStation = !demande.retourResort || demande.retourResort === demande.resort;
  if (memeAeroport && memeStation) return null;

  const station = resortParSlug(demande.retourResort ?? demande.resort);
  const aeroport = airportParSlug(demande.retourAirport ?? demande.airport);
  return `${station?.name ?? demande.resort} → ${aeroport?.name ?? demande.airport}`;
}

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
  /*
    L'adresse en station est facultative depuis le 10 septembre 2026.

    Elle était exigée parce que c'est elle qui dit où déposer le client. Mais
    beaucoup de voyageurs réservent leur transfert avant d'avoir arrêté leur
    logement, et un champ obligatoire qu'on ne peut pas remplir fait abandonner
    la réservation — alors qu'une adresse manquante se règle par un appel, et
    que le client la donne de lui-même en recevant sa confirmation.

    Ce qui reste exigé est ce sans quoi la course ne peut pas se faire : un nom,
    une adresse e-mail pour la confirmation, un numéro pour joindre le client le
    jour même. L'avis de course dit explicitement quand l'adresse manque, plutôt
    que d'afficher une ligne vide que le chauffeur prendrait pour un oubli
    d'affichage.
  */
  const adresse = propre(client.adresse, 300);
  if (!nom || !email.includes("@") || !telephone) {
    return NextResponse.json(
      { erreur: "Name, email and mobile number are required." },
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
      adresse ? `Address in resort: ${adresse}` : "Address in resort: to be confirmed",
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
  /*
    Le vrai garde-fou.

    Les deux boutons désactivés côté navigateur protègent le client d'une erreur,
    pas le site d'une requête forgée : la console suffit à les contourner. La
    règle est donc vérifiée ici, là où elle décide vraiment — une heure avant
    la prise en charge, on ne vend plus en ligne.
  */
  if (departImminent(demande.aller)) {
    return NextResponse.json(
      {
        erreur:
          "Online booking closes one hour before pick-up — please call us to check availability.",
        appelRequis: true,
        telephone: ENTREPRISE.telephoneAffiche,
      },
      { status: 409 },
    );
  }

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
    /*
      Le véhicule du retour, quand il diffère.

      Nul le reste du temps : c'est la même règle que pour ses lieux et son
      effectif — on n'écrit une valeur que lorsqu'elle apprend quelque chose au
      chauffeur. Un retour sans véhicule propre reprend celui de l'aller.
    */
    vehicule_retour:
      demande.categorieRetour && demande.categorieRetour !== demande.categorie
        ? demande.categorieRetour
        : null,
    passagers: demande.passagers,
    /*
      Le nom de la colonne, pas celui du champ.

      Ecrit en `passagersRetour`, PostgREST refusait la ligne entiere — « Could
      not find the 'passagersRetour' column » — et la reservation n'etait jamais
      enregistree. Le paiement, lui, partait quand meme : une course encaissee
      dont aucun systeme ne gardait la trace. Toutes les colonnes de cette table
      sont en minuscules souligne.
    */
    passagers_retour: demande.passagersRetour ?? null,
    aller: demande.aller.toISOString(),
    retour: demande.retour ? demande.retour.toISOString() : null,
    /*
      D'où repart le client, et vers quel aéroport.

      La course ne gardait du retour que sa date : un aller-retour saisi depuis
      une autre station — arriver aux Gets, repartir de l'Alpe d'Huez — était
      chiffré, encaissé, puis annoncé au chauffeur sans son point de prise en
      charge. Nuls quand le retour reprend l'aller inversé, ce qui est le cas
      courant : l'absence dit alors exactement cela.
    */
    retour_airport: demande.retourAirport ?? null,
    retour_resort: demande.retourResort ?? null,
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

  /* Ce que l'exploitant lit, dans son ordre — voir `corpsAvis`. */
  const avis = {
    reference: ref,
    trajet: intitule,
    aller: heure(demande.aller),
    retour: demande.retour ? heure(demande.retour) : null,
    trajetRetour: trajetRetour(demande),
    passagersRetour: demande.passagersRetour ?? null,
    adresse,
    client: { nom, email, telephone },
    vehicule: demande.categorie,
    vehiculeRetour: demande.categorieRetour ?? null,
    passagers: demande.passagers,
    vol: ligne.vol,
    bagagesSki: ligne.bagages_ski,
    enfants: ligne.enfants,
    message: ligne.message,
    montant: devis.total,
    paye: false,
  };

  const recapitulatif = [
    `Reference: ${ref}`,
    `Journey: ${intitule}`,
    `Outbound: ${heure(demande.aller)}`,
    demande.retour
      ? `Return: ${heure(demande.retour)}${
          trajetRetour(demande) ? ` — ${trajetRetour(demande)}` : ""
        }`
      : null,
    `Vehicle: ${demande.categorie} — ${demande.passagers} passenger(s)`,
    demande.categorieRetour && demande.categorieRetour !== demande.categorie
      ? `Return vehicle: ${demande.categorieRetour}`
      : null,
    demande.passagersRetour && demande.passagersRetour !== demande.passagers
      ? `Return journey: ${demande.passagersRetour} passenger(s)`
      : null,
    `Total: €${devis.total}${demande.retour ? " for both journeys" : ""}`,
    adresse ? `Address in resort: ${adresse}` : "Address in resort: to be confirmed",
    ligne.vol ? `Flight: ${ligne.vol}` : null,
    ligne.bagages_ski ? `Ski or board bags: ${ligne.bagages_ski}` : null,
    ligne.enfants ? `Children: ${ligne.enfants}` : null,
    ligne.message ? `Notes: ${ligne.message}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  /*
    --- Paiement, quand le barème est validé -----------------------------------

    On n'encaisse que ce qu'on a enregistré.

    La condition portait sur le seul barème, si bien qu'une écriture refusée par
    la base laissait quand même partir le client vers Stripe : l'argent arrivait,
    la course n'existait nulle part, et le webhook cherchait ensuite une
    référence introuvable. Quand la base est configurée mais n'a pas pris la
    ligne, la demande redevient un devis — l'exploitant la reçoit par e-mail et
    la rappelle. Un transfert à confirmer à la main coûte un appel ; un paiement
    sans réservation coûte un client.
  */
  const perteEnBase = supabaseConfigure() && !enregistree;
  if (perteEnBase) {
    console.error(`[reservation] ${ref} non enregistrée — paiement non proposé`);
  }
  if (devis.encaissable && stripeConfigure() && !perteEnBase) {
    const origine = origineSite(requete);
    /*
      La langue vient du tunnel ; elle n'est pas un identifiant, seulement un
      aiguillage d'affichage — d'où la liste blanche plutôt qu'une confiance
      accordée à ce qui arrive.
    */
    const langue = ["en", "fr", "de", "it"].includes(String(corps.langue))
      ? String(corps.langue)
      : "en";
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
      urlSucces: `${origine}${cheminConfirmation(langue)}?ref=${ref}`,
      urlAnnulation: `${origine}/book-ski-transfer-tickets/?from=${demande.airport}&to=${demande.resort}`,
      metadonnees: { airport: demande.airport, resort: demande.resort, langue },
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
          /*
            Une course dans moins d'une heure se repère dans une liste de
            notifications, pas en ouvrant l'e-mail : le sujet le dit.
          */
          sujet: departImminent(demande.aller)
            ? `URGENT — ${sujetAvis(avis)}`
            : sujetAvis(avis),
          texte: corpsAvis(avis),
        })
      : Promise.resolve(false),
  ]);

  return NextResponse.json({
    reference: ref,
    enregistree: Boolean(enregistree),
    notifie: notifications.some(Boolean),
  });
}
