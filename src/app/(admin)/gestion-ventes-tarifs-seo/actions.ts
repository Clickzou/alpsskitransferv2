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
import { lire, mettreAJour, mettreAJourSi } from "@/lib/reservation/supabase";
import { textesDecision } from "@/lib/reservation/textes-decision";
import { resortParSlug } from "@/lib/resorts";
import { formaterAlpes } from "@/lib/temps";
import { SITE } from "@/data/site";
import { factureDeReference, factureParId } from "@/lib/admin/factures";
import {
  creerAvoir,
  creerSessionCheckout,
  facturesActives,
  lireFacture,
  lirePaiementStripe,
  marquerFacturePayee,
  rembourserStripe,
} from "@/lib/reservation/stripe";
import { montantRemboursable } from "@/lib/reservation/remboursement";
import { dejaRembourse } from "@/lib/admin/remboursements";
import { textesRemboursement } from "@/lib/reservation/textes-remboursement";
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
import { CHAMP_DEMANDE_ADRESSE } from "@/lib/admin/affichage";
import { envoyerDemandeAdresse } from "@/lib/reservation/rappel-adresse";
import { adresseManque, prochainePrise, type LigneRelance } from "@/lib/reservation/relances";
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
  statut: string;
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
  // Une course annulée ne se déplace plus.
  if (reservation.statut === "annulee") return retourFiche("annulee");

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
  }

  /*
    Trancher une fois, et une seule.

    Les lignes passent d'abord de « en attente » à la décision, sous condition :
    deux clics simultanés — ou « Valider » dans un onglet et « Refuser » dans
    un autre — ne peuvent pas passer tous deux. Le second trouve zéro ligne en
    attente et s'arrête : le client ne reçoit jamais deux e-mails contradictoires.
  */
  const tranchees = await mettreAJourSi(
    "modifications",
    [
      { colonne: "reference", valeur: reference },
      { colonne: "lot", valeur: lot },
      { colonne: "statut", valeur: STATUT_ATTENTE },
    ],
    { statut: decision, traite_le: new Date().toISOString(), traite_par: utilisateur.email },
  );
  if (tranchees === null) return retourFiche("echec");
  if (tranchees === 0) return retourFiche("perimee");

  if (decision === "acceptee") {
    const champs: Record<string, string> = {};
    if (nouvelAller) champs.aller = nouvelAller;
    if (nouveauRetour) champs.retour = nouveauRetour;
    const ok = await mettreAJour(
      "reservations",
      { colonne: "reference", valeur: reference },
      champs,
    );
    if (!ok) {
      // L'heure n'a pas bougé : la demande redevient à valider plutôt que de paraître tranchée.
      await mettreAJour(
        "modifications",
        [
          { colonne: "reference", valeur: reference },
          { colonne: "lot", valeur: lot },
          { colonne: "statut", valeur: decision },
        ],
        { statut: STATUT_ATTENTE, traite_le: null, traite_par: null },
      );
      return retourFiche("echec");
    }
  }

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
  if (r.statut === "annulee") return retourFiche("annulee");

  /*
    Une seule fois : la réservation ne passe à « payée » que si elle ne l'était
    pas. Un double clic trouve zéro ligne à changer, et le client ne reçoit pas
    deux confirmations.
  */
  const payees = await mettreAJourSi(
    "reservations",
    [
      { colonne: "reference", valeur: reference },
      { colonne: "statut", operateur: "in", valeur: "(en-attente-paiement,devis-a-confirmer)" },
    ],
    { statut: "payee", paye_le: new Date().toISOString() },
  );
  if (payees === null) return retourFiche("echec");
  if (payees === 0) return retourFiche("deja-payee");

  await inserer("paiements", {
    reference,
    session_stripe: r.facture_stripe ?? `virement-${reference}`,
    paiement_stripe: null,
    montant: Number(r.montant),
    devise: r.devise ?? "EUR",
    statut: "paye",
  });
  /*
    La facture passe à « payée » chez Stripe. Si Stripe refuse, elle resterait
    payable par carte : l'exploitant doit le savoir, pour la vérifier.
  */
  const factureNonMarquee = r.facture_stripe ? !(await marquerFacturePayee(r.facture_stripe)) : false;
  if (factureNonMarquee) {
    await inserer("modifications", {
      reference,
      champ: "paiement",
      ancien: null,
      nouveau: "Stripe n’a pas marqué la facture payée — à vérifier dans Stripe",
      statut: "appliquee",
      source: "exploitant",
    });
  }
  await inserer("modifications", {
    reference,
    champ: "paiement",
    ancien: null,
    nouveau: `Virement reçu — noté par ${utilisateur.email}`,
    statut: "appliquee",
    source: "exploitant",
  });

  // La confirmation au client, comme après un paiement en ligne.
  const langue = r.langue ?? "fr";
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

  return retourFiche(factureNonMarquee ? "virement-recu-facture" : "virement-recu");
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

/* ------------------------------------------------------------ remboursement */

/**
 * « Rembourser le client » — demande de JC, 14 septembre 2026.
 *
 * Tout se relit au clic : le montant payé et déjà rendu chez Stripe pour une
 * carte, en base pour un virement. Pour une carte, Stripe rembourse — une seule
 * fois, grâce à la clé d'idempotence ; pour un virement, Stripe n'y peut rien :
 * l'exploitant fait le virement lui-même, et le bouton le note.
 *
 * Le remboursement s'enregistre dans `paiements` (statut `rembourse`, ce que
 * lit l'onglet Factures), dans l'historique, et part au client par e-mail. La
 * course n'est annulée que si la case est cochée : un geste commercial sur un
 * retard ne supprime pas le retour.
 */
export async function actionRembourser(donnees: FormData): Promise<void> {
  const utilisateur = await utilisateurCourant();
  if (!utilisateur) redirect("/gestion-ventes-tarifs-seo/connexion/");

  const reference = String(donnees.get("reference") ?? "");
  const retourFiche = (fait: string): never => redirect(`${cheminFiche(reference)}?fait=${fait}`);

  const [r] = await lire<{
    reference: string;
    statut: string;
    airport: string;
    resort: string;
    montant: number | string;
    devise: string | null;
    paye_le: string | null;
    paiement_stripe: string | null;
    client_email: string;
    langue: string | null;
    facture_stripe: string | null;
  }>("reservations", {
    colonnes:
      "reference,statut,airport,resort,montant,devise,paye_le,paiement_stripe,client_email,langue,facture_stripe",
    filtres: [{ colonne: "reference", operateur: "eq", valeur: reference }],
    limite: 1,
  });
  if (!r) return retourFiche("perimee");
  if (!r.paye_le) return retourFiche("remboursement-non-paye");

  const carte = Boolean(r.paiement_stripe);
  const stripe = carte ? await lirePaiementStripe(r.paiement_stripe!) : null;
  if (carte && !stripe) return retourFiche("remboursement-echec");
  const etat = stripe
    ? { paye: stripe.paye, dejaRembourse: stripe.rembourse, frais: stripe.frais }
    : { paye: Number(r.montant), dejaRembourse: await dejaRembourse(reference), frais: null };

  const montant = montantRemboursable(donnees.get("montant"), etat);
  if (typeof montant === "string") {
    return redirect(`${cheminFiche(reference)}?fait=remboursement-refuse&detail=${encodeURIComponent(montant)}`);
  }

  let identifiant: string | null = null;
  if (carte) {
    const remboursement = await rembourserStripe(r.paiement_stripe!, montant, reference, etat.dejaRembourse);
    if (!remboursement) return retourFiche("remboursement-echec");
    identifiant = remboursement.id;
  }

  /*
    L'avoir — demande de JC, 15 septembre 2026. Seulement si la course a une
    facture payée : la facture téléphonique est gardée en base, celle du site se
    retrouve par sa référence. Sans facture (facturation éteinte, ou course
    payée avant l'allumage), il n'y a rien à annuler et donc pas d'avoir.
  */
  let avoir: Awaited<ReturnType<typeof creerAvoir>> = null;
  let avoirManque = false;
  if (facturesActives()) {
    const facture = r.facture_stripe
      ? await factureParId(r.facture_stripe)
      : await factureDeReference(reference);
    if (facture?.statut === "Payée") {
      avoir = await creerAvoir({
        facture: facture.id,
        reference,
        montant,
        dejaRembourse: etat.dejaRembourse,
        remboursement: identifiant,
      });
      avoirManque = !avoir;
    }
  }

  const annuler = donnees.get("annuler") === "on" && r.statut !== "annulee";
  await inserer("paiements", {
    reference,
    /*
      Une ligne de remboursement n'a pas de session Checkout : la colonne porte
      l'identifiant de son avoir (`cn_…`), que l'onglet Factures relit chez
      Stripe pour le numéro et le PDF.
    */
    session_stripe: avoir?.id ?? null,
    paiement_stripe: r.paiement_stripe,
    montant,
    devise: r.devise ?? "EUR",
    statut: "rembourse",
  });
  if (annuler) {
    await mettreAJour("reservations", { colonne: "reference", valeur: reference }, { statut: "annulee" });
  }

  const lisible = `${String(montant).replace(".", ",")} €`;
  const envoye = await envoyer({
    destinataire: r.client_email,
    sujet: textesRemboursement(r.langue).sujet(reference),
    texte: [
      textesRemboursement(r.langue).corps({
        reference,
        trajet: `${airportParSlug(r.airport)?.name ?? r.airport} → ${resortParSlug(r.resort)?.name ?? r.resort}`,
        montant: lisible,
        moyen: carte ? "carte" : "virement",
        annulee: annuler,
        telephone: ENTREPRISE.telephoneAffiche,
        avoir: avoir?.pdf ?? null,
      }),
      "",
      `${SITE.nom} — ${SITE.url}`,
    ].join("\n"),
  });

  await inserer("modifications", {
    reference,
    champ: "paiement",
    ancien: null,
    nouveau: [
      carte
        ? `Remboursement de ${lisible} par Stripe (${identifiant})`
        : `Remboursement de ${lisible} par virement, noté`,
      `par ${utilisateur.email}`,
      avoir ? `avoir ${avoir.numero}` : null,
      avoirManque ? "AVOIR NON ÉMIS — à faire dans Stripe" : null,
      annuler ? "course annulée" : null,
      envoye ? null : "e-mail au client NON parti",
    ]
      .filter(Boolean)
      .join(" · "),
    statut: "appliquee",
    source: "exploitant",
  });

  return retourFiche(envoye ? (carte ? "rembourse" : "rembourse-note") : "rembourse-sans-email");
}

/* ------------------------------------------------------ adresse en station */

/** Deux clics — ou deux onglets — dans cet intervalle n'envoient qu'un e-mail. */
const INTERVALLE_DEMANDE_ADRESSE = 10 * 60 * 1000;

/**
 * « Demander l'adresse au client » — le même e-mail que la relance du matin,
 * envoyé tout de suite (demande de JC, 14 septembre 2026).
 *
 * Tout se relit en base au clic : si le client a donné son adresse entre-temps,
 * ou si la course est annulée ou passée, rien ne part. La relance automatique
 * de J-3 n'en tient pas compte et part quand même : elle rappelle, elle ne
 * double pas un geste de la minute.
 */
export async function actionDemanderAdresse(donnees: FormData): Promise<void> {
  const utilisateur = await utilisateurCourant();
  if (!utilisateur) redirect("/gestion-ventes-tarifs-seo/connexion/");

  const reference = String(donnees.get("reference") ?? "");
  const retourFiche = (fait: string): never => redirect(`${cheminFiche(reference)}?fait=${fait}`);

  const [ligne] = await lire<LigneRelance>("reservations", {
    colonnes:
      "reference,statut,airport,resort,aller,retour,retour_resort,adresse,adresse_retour,client_nom,client_email,client_telephone,langue",
    filtres: [{ colonne: "reference", operateur: "eq", valeur: reference }],
    limite: 1,
  });
  if (!ligne) return retourFiche("perimee");
  if (ligne.statut === "annulee") return retourFiche("annulee");
  if (!adresseManque(ligne)) return retourFiche("adresse-deja-donnee");
  if (!prochainePrise(ligne)) return retourFiche("adresse-course-passee");

  const [derniere] = await lire<{ cree_le: string }>("modifications", {
    colonnes: "cree_le",
    filtres: [
      { colonne: "reference", operateur: "eq", valeur: reference },
      { colonne: "champ", operateur: "eq", valeur: CHAMP_DEMANDE_ADRESSE },
    ],
    tri: { colonne: "cree_le", croissant: false },
    limite: 1,
  });
  if (derniere && Date.now() - new Date(derniere.cree_le).getTime() < INTERVALLE_DEMANDE_ADRESSE) {
    return retourFiche("adresse-deja-demandee");
  }

  const envoye = await envoyerDemandeAdresse(ligne, await origineActions());
  if (!envoye) return retourFiche("adresse-echec");

  await inserer("modifications", {
    reference,
    champ: CHAMP_DEMANDE_ADRESSE,
    ancien: null,
    nouveau: `Adresse demandée au client par e-mail — par ${utilisateur.email}`,
    statut: "transmise",
    langue: ligne.langue,
    source: "exploitant",
  });

  return retourFiche("adresse-demandee");
}
