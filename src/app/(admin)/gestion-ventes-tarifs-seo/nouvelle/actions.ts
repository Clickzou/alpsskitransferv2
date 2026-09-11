"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { SITE } from "@/data/site";
import { utilisateurCourant } from "@/lib/admin/session";
import { airportParSlug } from "@/lib/airports";
import { resortParSlug } from "@/lib/resorts";
import { cheminConfirmation, origineSite } from "@/lib/reservation/config";
import { validerDemande } from "@/lib/reservation/demande";
import { cheminFiche } from "@/lib/reservation/demandes";
import { devisReservation } from "@/lib/reservation/devis";
import { envoyer } from "@/lib/reservation/email";
import { phraseEnfants } from "@/lib/reservation/enfants";
import { jetonGestion, lienGestion } from "@/lib/reservation/gestion";
import {
  creerFactureTelephone,
  creerSessionCheckout,
} from "@/lib/reservation/stripe";
import { inserer, mettreAJour } from "@/lib/reservation/supabase";
import {
  echeanceVirement,
  joursJusqua,
  nouvelleReference,
  type ModePaiement,
} from "@/lib/reservation/telephone";
import {
  dateClient,
  jourClient,
  montantClient,
  recapDemande,
} from "@/lib/reservation/textes-demande";
import { textesTelephone } from "@/lib/reservation/textes-telephone";

/**
 * Créer une réservation prise au téléphone — demande de JC, 11 septembre 2026.
 *
 * L'exploitant remplit les mêmes champs que le client sur le site, et la
 * demande passe par **les mêmes contrôles** (`validerDemande`) et **le même
 * calcul de prix** (`devisReservation`) : deux moteurs, ce serait deux prix.
 * Il peut corriger le prix de la grille — un geste commercial, un cas
 * particulier — et la correction est notée dans l'historique.
 *
 * Puis la course se paie :
 * - **facturation allumée** : une facture Stripe, numérotée dans la série du
 *   site ; sa page en ligne se paie par carte, et pour un virement elle porte
 *   l'IBAN et l'échéance ;
 * - **facturation éteinte** : un lien de paiement Stripe Checkout pour la
 *   carte, et l'IBAN seul dans l'e-mail pour un virement.
 *
 * Le client reçoit un e-mail dans sa langue, avec son lien « gérer ma
 * réservation » — l'adresse en station s'y donne, comme sur le site.
 */

const LANGUES = ["en", "fr", "de", "it"];

function champ(donnees: FormData, cle: string, taille = 200): string {
  return String(donnees.get(cle) ?? "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, taille);
}

function nombre(donnees: FormData, cle: string): number {
  const n = Number(donnees.get(cle));
  return Number.isFinite(n) ? n : 0;
}

export async function actionCreerTelephone(
  _etat: string | null,
  donnees: FormData,
): Promise<string | null> {
  const utilisateur = await utilisateurCourant();
  if (!utilisateur) redirect("/gestion-ventes-tarifs-seo/connexion/");

  const allerRetour = donnees.get("allerRetour") === "on";

  // Les noms des champs du tunnel : la même validation les lit.
  const valide = validerDemande({
    from: champ(donnees, "from"),
    to: champ(donnees, "to"),
    when: champ(donnees, "when", 40),
    passengers: champ(donnees, "passengers", 3),
    bags: champ(donnees, "bags", 3),
    skis: champ(donnees, "skis", 3),
    vehicle: champ(donnees, "vehicle", 20),
    ...(allerRetour
      ? {
          returnWhen: champ(donnees, "returnWhen", 40),
          returnFrom: champ(donnees, "returnFrom") || undefined,
          returnTo: champ(donnees, "returnTo") || undefined,
          returnPassengers: champ(donnees, "returnPassengers", 3) || undefined,
          vehicleReturn: champ(donnees, "vehicleReturn", 20) || undefined,
        }
      : {}),
  });
  if (!valide.ok) return valide.message;
  if ("surMesure" in valide) {
    return "Ce trajet n’a pas de prix dans la grille : choisissez un aéroport et une station du catalogue.";
  }
  const { demande } = valide;

  const grille = devisReservation(demande);
  if (!grille.ok) {
    return grille.echec.raison === "trop-de-passagers"
      ? "Trop de passagers pour ce véhicule : choisissez-en un plus grand."
      : grille.echec.raison === "trop-de-bagages"
        ? "Trop de bagages pour ce véhicule : choisissez-en un plus grand."
        : "Pas de prix dans la grille pour ce trajet.";
  }
  const prixGrille = grille.devis.total;
  const saisi = Number(String(donnees.get("prix") ?? "").replace(",", "."));
  const montant = Number.isFinite(saisi) && saisi > 0 ? Math.round(saisi * 100) / 100 : prixGrille;

  const nom = champ(donnees, "nom", 120);
  const email = champ(donnees, "email", 160);
  const telephone = champ(donnees, "telephone", 40);
  if (!nom || !email.includes("@") || !telephone) {
    return "Le nom, l’e-mail et le téléphone du client sont obligatoires.";
  }
  const langue = LANGUES.includes(champ(donnees, "langue", 2)) ? champ(donnees, "langue", 2) : "fr";
  const mode: ModePaiement = donnees.get("mode") === "virement" ? "virement" : "carte";

  const ref = nouvelleReference();
  const aeroport = airportParSlug(demande.airport)!;
  const station = resortParSlug(demande.resort)!;
  const intitule = `${aeroport.name} → ${station.name}`;
  const trajetRetour =
    demande.retour && (demande.retourResort || demande.retourAirport)
      ? `${resortParSlug(demande.retourResort ?? demande.resort)?.name ?? demande.retourResort} → ${
          airportParSlug(demande.retourAirport ?? demande.airport)?.name ?? demande.retourAirport
        }`
      : null;
  const adresse = champ(donnees, "adresse", 300);
  const adresseRetour = allerRetour ? champ(donnees, "adresseRetour", 300) : "";
  const vol = champ(donnees, "vol", 20) || null;
  const message = champ(donnees, "message", 2000) || null;

  // La ligne, colonne par colonne comme celle du tunnel (`/api/reservation`).
  const ligne = {
    reference: ref,
    statut: "en-attente-paiement",
    airport: demande.airport,
    resort: demande.resort,
    vehicule: demande.categorie,
    vehicule_retour:
      demande.categorieRetour && demande.categorieRetour !== demande.categorie
        ? demande.categorieRetour
        : null,
    passagers: demande.passagers,
    passagers_retour: demande.passagersRetour ?? null,
    aller: demande.aller.toISOString(),
    retour: demande.retour ? demande.retour.toISOString() : null,
    retour_airport: demande.retourAirport ?? null,
    retour_resort: demande.retourResort ?? null,
    montant,
    devise: "EUR",
    client_nom: nom,
    client_email: email,
    client_telephone: telephone,
    vol,
    adresse,
    adresse_retour: adresseRetour || null,
    vol_retour: allerRetour ? champ(donnees, "volRetour", 20) || null : null,
    bagages_ski: demande.skis ?? 0,
    enfants: phraseEnfants(
      nombre(donnees, "enfants"),
      nombre(donnees, "enfantsRetour"),
      champ(donnees, "ages", 120) || null,
      Boolean(demande.retour),
    ),
    message,
    langue,
    source: "telephone",
    mode_paiement: mode,
  };
  if (!(await inserer("reservations", ligne))) {
    return "La réservation n’a pas pu être enregistrée : la base ne répond pas, ou la migration « téléphone » n’est pas passée.";
  }

  const entetes = await headers();
  const origine = origineSite(
    new Request(`${entetes.get("x-forwarded-proto") ?? "http"}://${entetes.get("host") ?? "localhost"}`),
  );
  const lignesPaiement = [
    {
      intitule,
      description: `${dateClient(langue, demande.aller)}${
        demande.retour ? ` · ${dateClient(langue, demande.retour)}` : ""
      }`,
      montant,
    },
  ];
  const echeance = echeanceVirement(demande.aller);
  const echeanceLisible = jourClient(langue, echeance);
  const iban = process.env.IBAN_VIREMENT?.trim() || null;
  const mots = textesTelephone(langue);

  // La facture, quand la facturation est allumée : sa page en ligne se paie par carte.
  const facture = await creerFactureTelephone({
    reference: ref,
    email,
    nom,
    langue,
    lignes: lignesPaiement,
    joursEcheance: joursJusqua(echeance),
    mentionVirement:
      mode === "virement" && iban ? mots.mentionVirement(iban, ref, echeanceLisible) : null,
  });
  let lienPaiement = facture?.url ?? null;
  if (facture) {
    await mettreAJour("reservations", { colonne: "reference", valeur: ref }, { facture_stripe: facture.id });
  } else if (mode === "carte") {
    // Facturation éteinte : la page de paiement du site, comme pour une réservation en ligne.
    const jeton = jetonGestion(ref);
    const session = await creerSessionCheckout({
      reference: ref,
      lignes: lignesPaiement,
      email,
      urlSucces: `${origine}${cheminConfirmation(langue)}?ref=${ref}${jeton ? `&j=${jeton}` : ""}`,
      urlAnnulation: `${origine}/`,
      metadonnees: { airport: demande.airport, resort: demande.resort, langue },
    });
    if (session) {
      lienPaiement = session.url;
      await mettreAJour("reservations", { colonne: "reference", valeur: ref }, { session_stripe: session.id });
    }
  }

  const envoye = await envoyer({
    destinataire: email,
    sujet: mots.sujet(ref, intitule),
    texte: [
      mots.corps({
        nom,
        reference: ref,
        recap: recapDemande(langue, {
          reference: ref,
          trajet: intitule,
          aller: dateClient(langue, demande.aller),
          retour: demande.retour ? dateClient(langue, demande.retour) : null,
          trajetRetour,
          vehicule: demande.categorie,
          vehiculeRetour: ligne.vehicule_retour,
          passagers: demande.passagers,
          passagersRetour:
            demande.passagersRetour && demande.passagersRetour !== demande.passagers
              ? demande.passagersRetour
              : null,
          bagages: demande.bagages ?? null,
          skis: demande.skis ?? 0,
          adresse: adresse || null,
          vol,
          message,
          total: montantClient(langue, montant, Boolean(demande.retour)),
        }),
        mode,
        lienPaiement,
        iban,
        echeance: mode === "virement" ? echeanceLisible : null,
        // Pour la carte, le lien de paiement est déjà la facture : on ne le donne pas deux fois.
        facture: mode === "virement" ? (facture?.url ?? null) : null,
        lienGestion: lienGestion(origine, ref, langue),
      }),
      "",
      `${SITE.nom} — ${SITE.url}`,
    ].join("\n"),
  });

  await inserer("modifications", {
    reference: ref,
    champ: "creation",
    ancien: null,
    nouveau: [
      `Réservation saisie au téléphone par ${utilisateur.email}`,
      mode === "virement" ? "paiement par virement" : "lien de paiement par carte",
      montant !== prixGrille ? `prix de la grille ${prixGrille} € corrigé à ${montant} €` : null,
      facture ? `facture ${facture.numero ?? facture.id}` : null,
      envoye ? null : "e-mail au client NON envoyé",
    ]
      .filter(Boolean)
      .join(" · "),
    statut: "appliquee",
    langue,
    source: "exploitant",
  });

  redirect(`${cheminFiche(ref)}?fait=${envoye ? "cree" : "cree-sans-email"}`);
}
