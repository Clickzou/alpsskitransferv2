import { FUSEAU_ALPES, instantAlpes } from "@/lib/temps";
import { NextResponse } from "next/server";
import { envoyer } from "@/lib/reservation/email";
import { jetonValide, modifiableEnLigne } from "@/lib/reservation/gestion";
import { lire, mettreAJour } from "@/lib/reservation/supabase";
import { corpsAvis } from "@/lib/reservation/textes";
import { airportParSlug } from "@/lib/airports";
import { resortParSlug } from "@/lib/resorts";

/**
 * Modification d'une réservation par le client, depuis le lien de gestion.
 *
 * Deux choses seulement : l'heure de prise en charge et le numéro de vol. Pas
 * l'adresse, pas le trajet, pas le véhicule — ceux-là changent le prix, et un
 * prix qui change après un paiement n'est pas une modification, c'est une autre
 * réservation.
 *
 * Trois vérifications avant d'écrire, dans cet ordre :
 *
 * 1. **Le jeton**, qui prouve que le demandeur a reçu l'e-mail de confirmation.
 * 2. **Le préavis de 24 heures**, à la fois sur l'ancienne et la nouvelle heure :
 *    on ne déplace pas une course de demain, et on ne la déplace pas *vers*
 *    demain non plus — le chauffeur a besoin du même délai dans les deux sens.
 * 3. **La date elle-même**, qui doit être future et lisible.
 *
 * POST /api/gestion
 */
export const dynamic = "force-dynamic";

interface Ligne {
  reference: string;
  statut: string;
  airport: string;
  resort: string;
  aller: string;
  retour: string | null;
  retour_airport: string | null;
  retour_resort: string | null;
  vehicule: string;
  vehicule_retour: string | null;
  passagers: number;
  passagers_retour: number | null;
  adresse: string;
  vol: string | null;
  bagages_ski: number;
  enfants: string | null;
  message: string | null;
  montant: string | number;
  client_nom: string;
  client_email: string;
  client_telephone: string;
}

/**
 * `YYYY-MM-DDTHH:mm`, comme le produit un champ `datetime-local`.
 *
 * L'heure saisie est celle de **l'aéroport**, jamais celle du serveur. Elle
 * était construite par `new Date(annee, mois, jour, heure, minute)`, qui
 * l'interprète dans le fuseau de la machine : Europe/Paris en développement,
 * **UTC sur Vercel**. Un client qui déplaçait sa prise en charge à 14 h la
 * voyait enregistrée à 16 h l'été — et le chauffeur la lisait ainsi. C'est le
 * défaut que `lib/temps` corrige partout ailleurs ; il restait ici, sur le seul
 * écran dont l'unique objet est de choisir une heure.
 */
function dateLocale(valeur: unknown): Date | null {
  if (typeof valeur !== "string") return null;
  const m = valeur.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/);
  if (!m) return null;
  const d = instantAlpes(+m[1], +m[2], +m[3], +m[4], +m[5]);
  return Number.isNaN(d.getTime()) ? null : d;
}

export async function POST(requete: Request) {
  let corps: Record<string, unknown>;
  try {
    corps = (await requete.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ erreur: "requete-illisible" }, { status: 400 });
  }

  const reference = typeof corps.reference === "string" ? corps.reference : "";
  const jeton = typeof corps.jeton === "string" ? corps.jeton : "";

  if (!reference || !jetonValide(reference, jeton)) {
    return NextResponse.json({ erreur: "lien-invalide" }, { status: 403 });
  }

  const [reservation] = await lire<Ligne>("reservations", {
    filtres: [{ colonne: "reference", operateur: "eq", valeur: reference }],
    limite: 1,
  });
  if (!reservation) {
    return NextResponse.json({ erreur: "reservation-introuvable" }, { status: 404 });
  }
  if (reservation.statut === "annulee") {
    return NextResponse.json({ erreur: "reservation-annulee" }, { status: 409 });
  }

  const quand = (d: Date) =>
    d.toLocaleString("fr-FR", {
    timeZone: FUSEAU_ALPES,
      weekday: "short",
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });

  /*
    À moins de vingt-quatre heures, on ne modifie plus : on signale.

    Refuser sèchement serait le contraire du service. Un vol annulé la veille au
    soir est exactement le moment où le client doit pouvoir prévenir — mais
    déplacer seul une course de demain matin déferait le planning du chauffeur
    sans que personne le sache. Le message part donc à l'exploitant, qui garde
    la décision, et le client reçoit une réponse plutôt qu'un mur.
  */
  const trajetLisible = `${airportParSlug(reservation.airport)?.name ?? reservation.airport} → ${
    resortParSlug(reservation.resort)?.name ?? reservation.resort
  }`;

  if (!modifiableEnLigne(new Date(reservation.aller))) {
    const ecrit =
      typeof corps.message === "string" ? corps.message.trim().slice(0, 2000) : "";

    /*
      Le formulaire de la page bascule sur un message libre en deçà de vingt-quatre
      heures — mais la bascule se décide à l'affichage, et la barre peut être
      franchie entre le moment où la page s'ouvre et celui où l'on valide. Le
      client a alors envoyé un horaire et aucun message, et l'exploitant recevait
      « Ce qu'il demande : (aucun message) ». L'horaire demandé dit exactement la
      même chose, en actionnable.
    */
    const horaireDemande = dateLocale(corps.aller);
    const message =
      ecrit ||
      (horaireDemande ? `Nouvel horaire demandé : ${quand(horaireDemande)}` : "");

    const exploitantUrgent = process.env.EMAIL_EXPLOITANT;
    const envoye = exploitantUrgent
      ? await envoyer({
          destinataire: exploitantUrgent,
          sujet: `URGENT — demande de changement · ${quand(new Date(reservation.aller))} · ${trajetLisible}`,
          texte: [
            "Le client demande un changement à moins de 24 heures du départ.",
            "La réservation n'a PAS été modifiée : à vous de décider et de le rappeler.",
            "",
            `Prise en charge prévue : ${quand(new Date(reservation.aller))}`,
            `Trajet                 : ${trajetLisible}`,
            `Adresse                : ${reservation.adresse}`,
            `Téléphone              : ${reservation.client_telephone}`,
            `Passager               : ${reservation.client_nom} · ${reservation.client_email}`,
            `Référence              : ${reference}`,
            "",
            "Ce qu'il demande :",
            message || "(aucun message)",
          ].join("\n"),
        })
      : false;

    return NextResponse.json({
      ok: true,
      mode: "signalement",
      transmis: envoye,
      telephone: true,
    });
  }

  const nouvelleHeure = dateLocale(corps.aller);
  if (!nouvelleHeure) {
    return NextResponse.json({ erreur: "date-illisible" }, { status: 400 });
  }
  // Et la nouvelle : on ne déplace pas une course vers demain matin non plus.
  if (!modifiableEnLigne(nouvelleHeure)) {
    return NextResponse.json({ erreur: "nouvelle-date-trop-proche" }, { status: 409 });
  }

  const vol =
    typeof corps.vol === "string" ? corps.vol.trim().slice(0, 20) : (reservation.vol ?? "");

  const ok = await mettreAJour(
    "reservations",
    { colonne: "reference", valeur: reference },
    { aller: nouvelleHeure.toISOString(), vol: vol || null },
  );
  if (!ok) {
    return NextResponse.json({ erreur: "enregistrement-impossible" }, { status: 500 });
  }

  /*
    L'exploitant est prévenu, et c'est le point de toute la fonctionnalité : le
    client a modifié son heure pour que le chauffeur puisse refaire sa journée.
    Une modification que personne ne lit ne sert à rien.
  */
  const exploitant = process.env.EMAIL_EXPLOITANT;
  if (exploitant) {
    const avis = {
      reference,
      trajet: trajetLisible,
      aller: quand(nouvelleHeure),
      retour: reservation.retour ? quand(new Date(reservation.retour)) : null,
      /*
        L'avis d'horaire modifié suit la même règle que celui de la course : il
        dit d'où repart le client quand ce n'est pas d'où il est arrivé. C'est
        précisément le message qu'on lit en refaisant sa journée.
      */
      trajetRetour:
        reservation.retour && (reservation.retour_resort || reservation.retour_airport)
          ? `${resortParSlug(reservation.retour_resort ?? reservation.resort)?.name ?? reservation.retour_resort ?? reservation.resort} → ${
              airportParSlug(reservation.retour_airport ?? reservation.airport)?.name ??
              reservation.retour_airport ??
              reservation.airport
            }`
          : null,
      passagersRetour: reservation.passagers_retour ?? null,
      adresse: reservation.adresse,
      client: {
        nom: reservation.client_nom,
        email: reservation.client_email,
        telephone: reservation.client_telephone,
      },
      vehicule: reservation.vehicule,
      vehiculeRetour: reservation.vehicule_retour,
      passagers: reservation.passagers,
      vol: vol || null,
      bagagesSki: reservation.bagages_ski,
      enfants: reservation.enfants,
      message: reservation.message,
      montant: Number(reservation.montant),
      paye: reservation.statut === "payee",
    };

    await envoyer({
      destinataire: exploitant,
      sujet: `HORAIRE MODIFIÉ — ${avis.aller} · ${avis.trajet}`,
      texte: [
        `Le client a modifié son horaire depuis son lien de gestion.`,
        `Ancienne prise en charge : ${quand(new Date(reservation.aller))}`,
        "",
        corpsAvis(avis),
      ].join("\n"),
    });
  }

  return NextResponse.json({
    ok: true,
    mode: "modifie",
    aller: nouvelleHeure.toISOString(),
    vol: vol || null,
  });
}
