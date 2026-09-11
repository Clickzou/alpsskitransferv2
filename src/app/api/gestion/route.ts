import { randomUUID } from "node:crypto";
import { FUSEAU_ALPES, instantAlpes } from "@/lib/temps";
import { NextResponse } from "next/server";
import { origineSite } from "@/lib/reservation/config";
import { cheminFiche, STATUT_ATTENTE } from "@/lib/reservation/demandes";
import { envoyer } from "@/lib/reservation/email";
import { jetonValide, modifiabilite, modifiableEnLigne } from "@/lib/reservation/gestion";
import { inserer, lire, mettreAJour } from "@/lib/reservation/supabase";
import { corpsAvis } from "@/lib/reservation/textes";
import { airportParSlug } from "@/lib/airports";
import { resortParSlug } from "@/lib/resorts";

/**
 * Ce que le client demande depuis son lien de gestion — et ce qui s'applique
 * tout de suite.
 *
 * ## Une heure se demande, elle ne se modifie pas
 *
 * Décision de JC, 11 septembre 2026. Le client propose une nouvelle heure de
 * prise en charge, à l'aller ou au retour ; la réservation ne bouge pas.
 * L'exploitant reçoit un e-mail qui mène à la fiche du client, où il valide ou
 * refuse, et le client reçoit la réponse par e-mail. Tant que rien n'est
 * validé, l'heure d'origine tient : c'est celle que le chauffeur a dans sa
 * journée.
 *
 * Le numéro de vol, lui, s'applique tout de suite : corriger une faute de
 * frappe ne refait la journée de personne. L'exploitant en est informé.
 *
 * Rien d'autre : ni l'adresse, ni le trajet, ni le véhicule — ceux-là changent
 * le prix, et un prix qui change après un paiement n'est pas une modification,
 * c'est une autre réservation.
 *
 * ## Trois vérifications avant d'écrire, dans cet ordre
 *
 * 1. **Le jeton**, qui prouve que le demandeur a reçu l'e-mail de confirmation.
 * 2. **Le préavis de 24 heures, sens par sens**, sur l'ancienne heure comme sur
 *    la nouvelle. Le retour se juge sur sa propre date — le client déjà en
 *    station doit pouvoir demander à décaler son retour.
 * 3. **Les dates elles-mêmes** : lisibles, et le retour après l'aller.
 *
 * POST /api/gestion
 */
export const dynamic = "force-dynamic";

const LANGUES = ["en", "fr", "de", "it"];

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

type Sens = { ok: true; heure: Date | null } | { ok: false; erreur: string };

/**
 * La nouvelle heure demandée pour un sens, ou `null` quand il ne bouge pas.
 *
 * Un champ absent, ou renvoyé à l'identique, ne compte pas : ce n'est pas une
 * demande de changement. Un champ changé doit tenir le préavis — le sens doit
 * être ouvert, et la nouvelle heure à plus de 24 heures.
 */
function nouvelleHeure(valeur: unknown, ancienne: Date | null, ouvert: boolean): Sens {
  // Pas de retour réservé : en ajouter un changerait le prix.
  if (!ancienne) return { ok: true, heure: null };
  if (valeur === undefined || valeur === null || valeur === "") return { ok: true, heure: null };

  const heure = dateLocale(valeur);
  if (!heure) return { ok: false, erreur: "date-illisible" };
  if (heure.getTime() === ancienne.getTime()) return { ok: true, heure: null };
  if (!ouvert || !modifiableEnLigne(heure)) {
    return { ok: false, erreur: "nouvelle-date-trop-proche" };
  }
  return { ok: true, heure };
}

function refus(erreur: string) {
  const statut = erreur === "date-illisible" ? 400 : erreur === "enregistrement-impossible" ? 500 : 409;
  return NextResponse.json({ erreur }, { status: statut });
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
  // La langue de la page : c'est dans celle-là que la réponse de l'exploitant partira.
  const langue = LANGUES.includes(String(corps.langue)) ? String(corps.langue) : "en";

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

  const trajetLisible = `${airportParSlug(reservation.airport)?.name ?? reservation.airport} → ${
    resortParSlug(reservation.resort)?.name ?? reservation.resort
  }`;
  const lienFiche = `${origineSite(requete)}${cheminFiche(reference)}`;

  const ancienAller = new Date(reservation.aller);
  const ancienRetour = reservation.retour ? new Date(reservation.retour) : null;
  const ouvert = modifiabilite(ancienAller, ancienRetour);

  /*
    Aucun sens à plus de vingt-quatre heures : on ne demande plus, on signale.

    Refuser sèchement serait le contraire du service. Un vol annulé la veille au
    soir est exactement le moment où le client doit pouvoir prévenir. Le message
    part donc à l'exploitant, qui garde la décision, et le client reçoit une
    réponse plutôt qu'un mur.
  */
  if (!ouvert.aller && !ouvert.retour) {
    const ecrit =
      typeof corps.message === "string" ? corps.message.trim().slice(0, 2000) : "";

    /*
      Le formulaire de la page bascule sur un message libre en deçà de vingt-quatre
      heures — mais la bascule se décide à l'affichage, et la barre peut être
      franchie entre le moment où la page s'ouvre et celui où l'on valide. Le
      client a alors envoyé des horaires et aucun message, et l'exploitant
      recevait « Ce qu'il demande : (aucun message) ». Les horaires demandés
      disent exactement la même chose, en actionnable.
    */
    const allerDemande = dateLocale(corps.aller);
    const retourDemande = dateLocale(corps.retour);
    const message =
      ecrit ||
      [
        allerDemande && allerDemande.getTime() !== ancienAller.getTime()
          ? `Nouvel horaire aller demandé : ${quand(allerDemande)}`
          : "",
        retourDemande && ancienRetour && retourDemande.getTime() !== ancienRetour.getTime()
          ? `Nouvel horaire retour demandé : ${quand(retourDemande)}`
          : "",
      ]
        .filter(Boolean)
        .join("\n");

    const exploitantUrgent = process.env.EMAIL_EXPLOITANT;
    const envoye = exploitantUrgent
      ? await envoyer({
          destinataire: exploitantUrgent,
          sujet: `URGENT — demande de changement · ${quand(ancienAller)} · ${trajetLisible}`,
          texte: [
            "Le client demande un changement à moins de 24 heures du départ.",
            "La réservation n'a PAS été modifiée : à vous de décider et de le rappeler.",
            "",
            `Prise en charge prévue : ${quand(ancienAller)}`,
            ...(ancienRetour ? [`Retour prévu           : ${quand(ancienRetour)}`] : []),
            `Trajet                 : ${trajetLisible}`,
            `Adresse                : ${reservation.adresse}`,
            `Téléphone              : ${reservation.client_telephone}`,
            `Passager               : ${reservation.client_nom} · ${reservation.client_email}`,
            `Référence              : ${reference}`,
            "",
            "Ce qu'il demande :",
            message || "(aucun message)",
            "",
            "Fiche du client :",
            lienFiche,
          ].join("\n"),
        })
      : false;

    // La demande n'a rien modifié, mais elle fait partie du suivi du client.
    await inserer("modifications", {
      reference,
      champ: "demande",
      ancien: null,
      nouveau: message || null,
      statut: "transmise",
      langue,
      source: "client",
    });

    return NextResponse.json({
      ok: true,
      mode: "signalement",
      transmis: envoye,
      telephone: true,
    });
  }

  const aller = nouvelleHeure(corps.aller, ancienAller, ouvert.aller);
  if (!aller.ok) return refus(aller.erreur);
  const retour = nouvelleHeure(corps.retour, ancienRetour, ouvert.retour);
  if (!retour.ok) return refus(retour.erreur);

  // Le même contrôle que le tunnel à la réservation : le retour vient après l'aller.
  const allerVise = aller.heure ?? ancienAller;
  const retourVise = retour.heure ?? ancienRetour;
  if (retourVise && retourVise.getTime() <= allerVise.getTime()) {
    return refus("retour-avant-aller");
  }

  /*
    Le vol est celui de l'arrivée : il suit la règle de l'aller. Un numéro de
    vol changé à moins de vingt-quatre heures, c'est un chauffeur qui attend le
    mauvais avion — cela passe par l'exploitant.
  */
  const ancienVol = reservation.vol || null;
  const vol =
    ouvert.aller && typeof corps.vol === "string"
      ? corps.vol.trim().slice(0, 20) || null
      : ancienVol;
  const volChange = vol !== ancienVol;

  const demande = [
    aller.heure
      ? { champ: "aller", ancien: ancienAller.toISOString(), nouveau: aller.heure.toISOString() }
      : null,
    retour.heure && ancienRetour
      ? { champ: "retour", ancien: ancienRetour.toISOString(), nouveau: retour.heure.toISOString() }
      : null,
  ].filter((l): l is { champ: string; ancien: string; nouveau: string } => l !== null);

  const reponse = () =>
    NextResponse.json({
      ok: true,
      mode: demande.length > 0 ? "demande" : "modifie",
      // La réservation telle qu'elle est — les heures ne bougent qu'à la validation.
      aller: ancienAller.toISOString(),
      retour: ancienRetour?.toISOString() ?? null,
      vol,
      demande:
        demande.length > 0
          ? {
              aller: aller.heure?.toISOString() ?? null,
              retour: retour.heure?.toISOString() ?? null,
            }
          : null,
    });

  // Rien n'a bougé : rien à écrire, personne à déranger.
  if (demande.length === 0 && !volChange) return reponse();

  // Le vol s'applique tout de suite, et laisse sa trace.
  if (volChange) {
    const ok = await mettreAJour(
      "reservations",
      { colonne: "reference", valeur: reference },
      { vol },
    );
    if (!ok) return refus("enregistrement-impossible");
    await inserer("modifications", {
      reference,
      champ: "vol",
      ancien: ancienVol,
      nouveau: vol,
      statut: "appliquee",
      langue,
      source: "client",
    });
  }

  /*
    Les heures : une demande, pas une modification.

    Elle s'écrit d'abord, et remplace ensuite celle qui attendait encore — dans
    cet ordre, pour qu'un échec d'écriture ne laisse jamais le client sans
    aucune demande. Si elle ne peut pas s'écrire, le client le sait : une
    demande qui disparaît en silence serait pire qu'un refus.
  */
  if (demande.length > 0) {
    const lot = randomUUID();
    const inscrites = await Promise.all(
      demande.map((ligne) =>
        inserer("modifications", {
          reference,
          lot,
          statut: STATUT_ATTENTE,
          langue,
          source: "client",
          ...ligne,
        }),
      ),
    );
    if (inscrites.some((ligne) => ligne === null)) return refus("enregistrement-impossible");

    await mettreAJour(
      "modifications",
      [
        { colonne: "reference", valeur: reference },
        { colonne: "statut", valeur: STATUT_ATTENTE },
        { colonne: "lot", operateur: "neq", valeur: lot },
      ],
      { statut: "remplacee" },
    );
  }

  /*
    L'exploitant est prévenu — et pour une heure, c'est lui qui décide : l'e-mail
    dit ce qui est demandé, ancien et nouveau côte à côte, et mène à la fiche du
    client où il valide ou refuse.
  */
  const exploitant = process.env.EMAIL_EXPLOITANT;
  if (exploitant) {
    const avis = {
      reference,
      trajet: trajetLisible,
      aller: quand(ancienAller),
      retour: ancienRetour ? quand(ancienRetour) : null,
      /*
        L'avis suit la même règle que celui de la course : il dit d'où repart le
        client quand ce n'est pas d'où il est arrivé.
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
      vol,
      bagagesSki: reservation.bagages_ski,
      enfants: reservation.enfants,
      message: reservation.message,
      montant: Number(reservation.montant),
      paye: reservation.statut === "payee",
    };

    const lignes = [
      aller.heure ? `Aller  : ${quand(ancienAller)} → demandé ${quand(aller.heure)}` : null,
      retour.heure && ancienRetour
        ? `Retour : ${quand(ancienRetour)} → demandé ${quand(retour.heure)}`
        : null,
      volChange ? `Vol    : ${ancienVol ?? "—"} → ${vol ?? "—"} (déjà enregistré)` : null,
    ].filter((ligne): ligne is string => ligne !== null);

    await envoyer({
      destinataire: exploitant,
      sujet:
        demande.length > 0
          ? `À VALIDER — changement d'horaire · ${quand(aller.heure ?? retour.heure ?? ancienAller)} · ${trajetLisible}`
          : `VOL MODIFIÉ — ${quand(ancienAller)} · ${trajetLisible}`,
      texte: [
        demande.length > 0
          ? "Le client demande un changement d'horaire. Rien n'est modifié tant que vous ne l'avez pas validé."
          : "Le client a corrigé son numéro de vol depuis son lien de gestion.",
        "",
        ...lignes,
        "",
        demande.length > 0 ? "Valider ou refuser, sur la fiche du client :" : "Fiche du client :",
        lienFiche,
        "",
        corpsAvis(avis),
      ].join("\n"),
    });
  }

  return reponse();
}
