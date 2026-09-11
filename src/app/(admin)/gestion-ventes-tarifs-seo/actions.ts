"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { ENTREPRISE } from "@/data/site";
import { airportParSlug } from "@/lib/airports";
import { connexion, deconnexion, utilisateurCourant } from "@/lib/admin/session";
import { suiteSure } from "@/lib/admin/suite";
import { LOCALES, type Lang } from "@/lib/i18n";
import { origineSite } from "@/lib/reservation/config";
import { cheminFiche, demandesEnAttente, STATUT_ATTENTE } from "@/lib/reservation/demandes";
import { envoyer } from "@/lib/reservation/email";
import { lienGestion } from "@/lib/reservation/gestion";
import { lire, mettreAJour } from "@/lib/reservation/supabase";
import { textesDecision } from "@/lib/reservation/textes-decision";
import { resortParSlug } from "@/lib/resorts";
import { formaterAlpes } from "@/lib/temps";
import { SITE } from "@/data/site";
import { lireFacture, marquerFacturePayee, creerSessionCheckout } from "@/lib/reservation/stripe";
import { inserer } from "@/lib/reservation/supabase";
import { textesEmail } from "@/lib/reservation/textes";
import { textesTelephone } from "@/lib/reservation/textes-telephone";
import {
  dateClient,
  jourClient,
  montantClient,
  recapDemande,
} from "@/lib/reservation/textes-demande";
import { echeanceVirement } from "@/lib/reservation/telephone";
import { cheminConfirmation } from "@/lib/reservation/config";
import { jetonGestion } from "@/lib/reservation/gestion";

/**
 * Les actions du back-office : entrer, sortir, et trancher une demande.
 *
 * Elles vivent dans un fichier `"use server"` séparé plutôt que dans la page,
 * parce qu'elles sont appelées depuis plusieurs écrans et qu'une action de
 * serveur exportée depuis un composant client ne compile pas.
 */

export async function actionConnexion(
  _etat: string | null,
  donnees: FormData,
): Promise<string | null> {
  const email = String(donnees.get("email") ?? "").trim();
  const motDePasse = String(donnees.get("motDePasse") ?? "");

  if (!email || !motDePasse) return "Renseignez votre e-mail et votre mot de passe.";

  const erreur = await connexion(email, motDePasse);
  if (erreur) return erreur;

  // Retour là où l'on allait — la fiche d'un client, depuis l'e-mail « à valider ».
  redirect(suiteSure(donnees.get("suite")));
}

export async function actionDeconnexion(): Promise<void> {
  await deconnexion();
  redirect("/gestion-ventes-tarifs-seo/connexion/");
}

/** L'exploitant valide la nouvelle heure : elle s'applique, et le client en est averti. */
export async function actionValider(donnees: FormData): Promise<void> {
  await trancher(donnees, "acceptee");
}

/** L'exploitant refuse : l'heure d'origine tient, et le client en est averti. */
export async function actionRefuser(donnees: FormData): Promise<void> {
  await trancher(donnees, "refusee");
}

interface Reservation {
  reference: string;
  airport: string;
  resort: string;
  aller: string;
  retour: string | null;
  client_email: string;
}

/**
 * Tranche une demande de changement d'horaire.
 *
 * Tout se revérifie ici, au moment du clic, et rien n'est pris du formulaire
 * sauf la référence et le lot : les heures viennent de la base. La demande
 * doit être **encore** en attente — déjà traitée, ou remplacée par une plus
 * récente du client, elle ne se valide plus. Et une heure validée doit tenir
 * debout : pas dans le passé, pas un retour avant l'aller.
 */
async function trancher(donnees: FormData, decision: "acceptee" | "refusee"): Promise<void> {
  const utilisateur = await utilisateurCourant();
  if (!utilisateur) redirect("/gestion-ventes-tarifs-seo/connexion/");

  const reference = String(donnees.get("reference") ?? "");
  const lot = String(donnees.get("lot") ?? "");
  const retourFiche = (fait: string): never => redirect(`${cheminFiche(reference)}?fait=${fait}`);

  if (!reference || !lot) return retourFiche("perimee");

  const lignes = (await demandesEnAttente(reference)).filter((l) => l.lot === lot);
  if (lignes.length === 0) return retourFiche("perimee");

  const [reservation] = await lire<Reservation>("reservations", {
    filtres: [{ colonne: "reference", operateur: "eq", valeur: reference }],
    limite: 1,
  });
  if (!reservation) return retourFiche("perimee");

  const nouvelAller = lignes.find((l) => l.champ === "aller")?.nouveau ?? null;
  const nouveauRetour = lignes.find((l) => l.champ === "retour")?.nouveau ?? null;

  // Les heures qui tiendront après la décision : les demandées si l'on valide, les d'origine sinon.
  const aller = new Date(
    decision === "acceptee" && nouvelAller ? nouvelAller : reservation.aller,
  );
  const retourIso =
    decision === "acceptee" && nouveauRetour ? nouveauRetour : reservation.retour;
  const retour = retourIso ? new Date(retourIso) : null;

  if (decision === "acceptee") {
    const maintenant = Date.now();
    if (
      (nouvelAller && new Date(nouvelAller).getTime() <= maintenant) ||
      (nouveauRetour && new Date(nouveauRetour).getTime() <= maintenant)
    ) {
      return retourFiche("passee");
    }
    if (retour && retour.getTime() <= aller.getTime()) return retourFiche("incoherente");

    const champs: Record<string, string> = {};
    if (nouvelAller) champs.aller = nouvelAller;
    if (nouveauRetour) champs.retour = nouveauRetour;
    const ok = await mettreAJour(
      "reservations",
      { colonne: "reference", valeur: reference },
      champs,
    );
    if (!ok) return retourFiche("echec");
  }

  await mettreAJour(
    "modifications",
    [
      { colonne: "reference", valeur: reference },
      { colonne: "lot", valeur: lot },
      { colonne: "statut", valeur: STATUT_ATTENTE },
    ],
    { statut: decision, traite_le: new Date().toISOString(), traite_par: utilisateur.email },
  );

  /*
    La réponse au client, dans la langue de sa demande.

    L'origine sert à fabriquer son lien de gestion : `origineSite` ignore
    l'hôte de la requête en production — il se falsifie — et ne s'en sert
    qu'en développement, où le lien doit mener au serveur local.
  */
  const langue = lignes[0].langue ?? "en";
  const mots = textesDecision(langue);
  const locale = LOCALES[langue as Lang] ?? LOCALES.en;
  const lisible = (d: Date) =>
    formaterAlpes(d, locale, {
      weekday: "long",
      day: "numeric",
      month: "long",
      hour: "2-digit",
      minute: "2-digit",
    });
  const entetes = await headers();
  const origine = origineSite(
    new Request(`${entetes.get("x-forwarded-proto") ?? "http"}://${entetes.get("host") ?? "localhost"}`),
  );

  const details = {
    reference,
    trajet: `${airportParSlug(reservation.airport)?.name ?? reservation.airport} → ${
      resortParSlug(reservation.resort)?.name ?? reservation.resort
    }`,
    aller: lisible(aller),
    retour: retour ? lisible(retour) : null,
    lien: lienGestion(origine, reference, langue),
    telephone: ENTREPRISE.telephoneAffiche,
  };

  const envoye = await envoyer({
    destinataire: reservation.client_email,
    sujet:
      decision === "acceptee" ? mots.sujetValidee(reference) : mots.sujetRefusee(reference),
    texte: decision === "acceptee" ? mots.corpsValidee(details) : mots.corpsRefusee(details),
  });

  const fait = decision === "acceptee" ? "valide" : "refuse";
  return retourFiche(envoye ? fait : `${fait}-sans-email`);
}

/* ---------------------------------------------- réservations téléphoniques */

interface ReservationTelephone {
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
  bagages_ski: number;
  adresse: string | null;
  vol: string | null;
  message: string | null;
  montant: string | number;
  devise: string | null;
  client_nom: string;
  client_email: string;
  langue: string | null;
  mode_paiement: string | null;
  facture_stripe: string | null;
}

async function lireReservation(reference: string): Promise<ReservationTelephone | null> {
  const [r] = await lire<ReservationTelephone>("reservations", {
    filtres: [{ colonne: "reference", operateur: "eq", valeur: reference }],
    limite: 1,
  });
  return r ?? null;
}

async function origineActions(): Promise<string> {
  const entetes = await headers();
  return origineSite(
    new Request(`${entetes.get("x-forwarded-proto") ?? "http"}://${entetes.get("host") ?? "localhost"}`),
  );
}

function trajetDe(r: ReservationTelephone): string {
  return `${airportParSlug(r.airport)?.name ?? r.airport} → ${resortParSlug(r.resort)?.name ?? r.resort}`;
}

/**
 * « Virement reçu » — l'exploitant a vu l'argent arriver sur son compte.
 *
 * La réservation passe à « payée », le paiement s'enregistre sous l'identifiant
 * de la facture, puis la facture est marquée payée chez Stripe. Dans cet ordre :
 * Stripe envoie alors `invoice.paid`, et le webhook, qui trouve le paiement
 * déjà enregistré, ne refait rien — ni seconde ligne, ni second e-mail.
 */
export async function actionVirementRecu(donnees: FormData): Promise<void> {
  const utilisateur = await utilisateurCourant();
  if (!utilisateur) redirect("/gestion-ventes-tarifs-seo/connexion/");

  const reference = String(donnees.get("reference") ?? "");
  const retourFiche = (fait: string): never => redirect(`${cheminFiche(reference)}?fait=${fait}`);

  const r = await lireReservation(reference);
  if (!r) return retourFiche("perimee");
  if (r.statut === "payee") return retourFiche("deja-payee");

  const ok = await mettreAJour(
    "reservations",
    { colonne: "reference", valeur: reference },
    { statut: "payee", paye_le: new Date().toISOString() },
  );
  if (!ok) return retourFiche("echec");

  await inserer("paiements", {
    reference,
    session_stripe: r.facture_stripe ?? `virement-${reference}`,
    paiement_stripe: null,
    montant: Number(r.montant),
    devise: r.devise ?? "EUR",
    statut: "paye",
  });
  if (r.facture_stripe) await marquerFacturePayee(r.facture_stripe);
  await inserer("modifications", {
    reference,
    champ: "paiement",
    ancien: null,
    nouveau: `Virement reçu — noté par ${utilisateur.email}`,
    statut: "appliquee",
    source: "exploitant",
  });

  // La confirmation au client, comme après un paiement en ligne.
  const langue = r.langue ?? "en";
  const mots = textesEmail(langue);
  const facture = r.facture_stripe ? await lireFacture(r.facture_stripe) : null;
  const lien = lienGestion(await origineActions(), reference, langue);
  await envoyer({
    destinataire: r.client_email,
    sujet: mots.sujet(reference),
    texte: [
      mots.corps({
        reference,
        trajet: trajetDe(r),
        montant: `${Number(r.montant)} €`,
        lien: lien ?? undefined,
      }),
      ...(facture?.url ? ["", mots.facture(facture.url)] : []),
      "",
      `${SITE.nom} — ${SITE.url}`,
    ].join("\n"),
  });

  return retourFiche("virement-recu");
}

/**
 * Renvoyer au client l'e-mail de paiement — il ne l'a pas reçu, ou l'a perdu.
 *
 * Le lien de paiement est refait : celui de la facture quand elle existe, sinon
 * une nouvelle page de paiement Stripe — une page Checkout expire au bout de
 * vingt-quatre heures.
 */
export async function actionRenvoyerPaiement(donnees: FormData): Promise<void> {
  const utilisateur = await utilisateurCourant();
  if (!utilisateur) redirect("/gestion-ventes-tarifs-seo/connexion/");

  const reference = String(donnees.get("reference") ?? "");
  const retourFiche = (fait: string): never => redirect(`${cheminFiche(reference)}?fait=${fait}`);

  const r = await lireReservation(reference);
  if (!r) return retourFiche("perimee");
  if (r.statut === "payee") return retourFiche("deja-payee");

  const langue = r.langue ?? "fr";
  const mode = r.mode_paiement === "virement" ? "virement" : "carte";
  const origine = await origineActions();
  const aller = new Date(r.aller);
  const retour = r.retour ? new Date(r.retour) : null;
  const montant = Number(r.montant);
  const trajet = trajetDe(r);
  const trajetRetour =
    retour && (r.retour_resort || r.retour_airport)
      ? `${resortParSlug(r.retour_resort ?? r.resort)?.name ?? r.retour_resort} → ${
          airportParSlug(r.retour_airport ?? r.airport)?.name ?? r.retour_airport
        }`
      : null;

  const facture = r.facture_stripe ? await lireFacture(r.facture_stripe) : null;
  let lienPaiement = facture?.url ?? null;
  if (!facture && mode === "carte") {
    const jeton = jetonGestion(reference);
    const session = await creerSessionCheckout({
      reference,
      lignes: [
        {
          intitule: trajet,
          description: `${dateClient(langue, aller)}${retour ? ` · ${dateClient(langue, retour)}` : ""}`,
          montant,
        },
      ],
      email: r.client_email,
      urlSucces: `${origine}${cheminConfirmation(langue)}?ref=${reference}${jeton ? `&j=${jeton}` : ""}`,
      urlAnnulation: `${origine}/`,
      metadonnees: { airport: r.airport, resort: r.resort, langue },
    });
    if (session) {
      lienPaiement = session.url;
      await mettreAJour("reservations", { colonne: "reference", valeur: reference }, { session_stripe: session.id });
    }
  }

  const mots = textesTelephone(langue);
  const envoye = await envoyer({
    destinataire: r.client_email,
    sujet: mots.sujet(reference, trajet),
    texte: [
      mots.corps({
        nom: r.client_nom,
        reference,
        recap: recapDemande(langue, {
          reference,
          trajet,
          aller: dateClient(langue, aller),
          retour: retour ? dateClient(langue, retour) : null,
          trajetRetour,
          vehicule: r.vehicule,
          vehiculeRetour: r.vehicule_retour,
          passagers: r.passagers,
          passagersRetour: r.passagers_retour,
          bagages: null,
          skis: r.bagages_ski,
          adresse: r.adresse || null,
          vol: r.vol,
          message: r.message,
          total: montantClient(langue, montant, Boolean(retour)),
        }),
        mode,
        lienPaiement,
        iban: process.env.IBAN_VIREMENT?.trim() || null,
        echeance: mode === "virement" ? jourClient(langue, echeanceVirement(aller)) : null,
        facture: mode === "virement" ? (facture?.url ?? null) : null,
        lienGestion: lienGestion(origine, reference, langue),
      }),
      "",
      `${SITE.nom} — ${SITE.url}`,
    ].join("\n"),
  });

  await inserer("modifications", {
    reference,
    champ: "paiement",
    ancien: null,
    nouveau: `E-mail de paiement renvoyé par ${utilisateur.email}${envoye ? "" : " — NON parti"}`,
    statut: "appliquee",
    source: "exploitant",
  });

  return retourFiche(envoye ? "renvoye" : "renvoi-echec");
}
