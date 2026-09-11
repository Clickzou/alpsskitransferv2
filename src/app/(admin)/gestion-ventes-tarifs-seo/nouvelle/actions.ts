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
import { creerFactureTelephone, creerSessionCheckout } from "@/lib/reservation/stripe";
import { inserer, lire, mettreAJour } from "@/lib/reservation/supabase";
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
 * Il peut corriger le prix de la grille, et la correction est notée dans
 * l'historique.
 *
 * Puis la course se paie : une facture Stripe quand la facturation est
 * allumée (sa page se paie par carte ; pour un virement elle porte l'IBAN et
 * l'échéance), sinon un lien Stripe Checkout pour la carte et l'IBAN seul dans
 * l'e-mail pour un virement. Le client reçoit un e-mail dans sa langue, avec
 * son lien « gérer ma réservation ».
 *
 * ## Les garde-fous (revue du 11 septembre 2026)
 *
 * - Un départ dans le passé est refusé : une faute de frappe sur l'année
 *   rangeait la course dans « Passées » et écrivait au client pour une date
 *   révolue.
 * - Un prix illisible, nul ou négatif est refusé au lieu d'être remplacé en
 *   silence par la grille ; un prix calculé sur un autre trajet est refusé ;
 *   un écart de plus de moitié avec la grille doit être confirmé.
 * - Les enfants de chaque sens ne dépassent pas les passagers de ce sens, et
 *   « enfants au retour » laissé vide reprend ceux de l'aller.
 * - La référence vient du formulaire, tirée à l'ouverture de la page : un
 *   second envoi retrouve la réservation au lieu d'en créer une autre.
 * - Un échec partiel — lien de paiement, facture — se dit, dans la fiche et
 *   dans l'historique.
 */

const LANGUES = ["en", "fr", "de", "it"];
const PROBLEME_TECHNIQUE = "Un problème technique empêche d’enregistrer la réservation. Réessayez ; si cela se répète, prévenez Clickzou.";

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

  // La référence tirée à l'ouverture de la page : un second envoi la retrouve.
  const referenceSaisie = champ(donnees, "reference", 20);
  const ref = /^AST-[0-9A-F]{6}$/.test(referenceSaisie) ? referenceSaisie : nouvelleReference();
  const [existante] = await lire<{ reference: string }>("reservations", {
    colonnes: "reference",
    filtres: [{ colonne: "reference", operateur: "eq", valeur: ref }],
    limite: 1,
  });
  if (existante) redirect(`${cheminFiche(ref)}?fait=deja-creee`);

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
    return "Ce trajet n’a pas de prix dans la grille : choisissez un aéroport et une station de la liste.";
  }
  const { demande } = valide;
  if (demande.aller.getTime() <= Date.now()) {
    return "La date de l’aller est déjà passée : vérifiez le jour et l’année.";
  }

  // Les enfants de chaque sens, bornés par les passagers de ce sens.
  const enfantsAller = Math.max(0, Math.floor(nombre(donnees, "enfants")));
  const enfantsRetour =
    String(donnees.get("enfantsRetour") ?? "").trim() === ""
      ? enfantsAller
      : Math.max(0, Math.floor(nombre(donnees, "enfantsRetour")));
  if (enfantsAller > demande.passagers) {
    return "Il y a plus d’enfants que de passagers à l’aller : vérifiez le nombre de passagers.";
  }
  if (demande.retour && enfantsRetour > (demande.passagersRetour ?? demande.passagers)) {
    return "Il y a plus d’enfants que de passagers au retour : vérifiez le nombre de passagers.";
  }

  const grille = devisReservation(demande);
  if (!grille.ok) {
    return grille.echec.raison === "trop-de-passagers"
      ? "Trop de passagers pour ce véhicule : choisissez-en un plus grand."
      : grille.echec.raison === "trop-de-bagages"
        ? "Trop de bagages pour ce véhicule : choisissez-en un plus grand."
        : "Pas de prix dans la grille pour ce trajet.";
  }
  const prixGrille = grille.devis.total;

  // Le prix : vide = la grille ; sinon un montant lisible, calculé sur ce trajet-ci.
  const brutPrix = String(donnees.get("prix") ?? "")
    .replace(/[\s  €]/g, "")
    .replace(",", ".");
  let montant = prixGrille;
  if (brutPrix !== "") {
    const saisi = Number(brutPrix);
    if (!Number.isFinite(saisi) || saisi <= 0) {
      return "Le prix saisi n’est pas lisible : écrivez un montant en euros, par exemple 320 ou 320,50 — ou laissez vide pour le prix de la grille.";
    }
    montant = Math.round(saisi * 100) / 100;
    const affiche = Number(String(donnees.get("prixGrilleAffiche") ?? ""));
    if (Number.isFinite(affiche) && affiche > 0 && affiche !== prixGrille) {
      return `Le trajet a changé depuis le calcul : la grille donne maintenant ${prixGrille} €. Recalculez le prix.`;
    }
    const ecart = Math.abs(montant - prixGrille) / prixGrille;
    if (ecart > 0.5 && donnees.get("confirmerPrix") !== "on") {
      return `Le prix saisi (${montant} €) s’écarte de plus de moitié de la grille (${prixGrille} €). Cochez « Je confirme ce prix » pour le garder.`;
    }
  }

  const nom = champ(donnees, "nom", 120);
  const email = champ(donnees, "email", 160);
  const telephone = champ(donnees, "telephone", 40);
  if (!nom || !email.includes("@") || !telephone) {
    return "Le nom, l’e-mail et le téléphone du client sont obligatoires.";
  }
  const langueSaisie = champ(donnees, "langue", 2);
  if (!LANGUES.includes(langueSaisie)) return "Choisissez la langue des e-mails du client.";
  const langue = langueSaisie;
  const mode: ModePaiement = donnees.get("mode") === "virement" ? "virement" : "carte";

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
      enfantsAller,
      enfantsRetour,
      champ(donnees, "ages", 120) || null,
      Boolean(demande.retour),
    ),
    message,
    langue,
    source: "telephone",
    mode_paiement: mode,
  };
  if (!(await inserer("reservations", ligne))) {
    console.error(`[telephone] ${ref} non enregistrée`);
    return PROBLEME_TECHNIQUE;
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
  const notes: string[] = [];

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
    const garde = await mettreAJour(
      "reservations",
      { colonne: "reference", valeur: ref },
      { facture_stripe: facture.id },
    );
    if (!garde) notes.push(`facture ${facture.id} non rattachée à la réservation — à vérifier`);
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
  if (mode === "carte" && !lienPaiement) notes.push("lien de paiement NON créé");

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
  if (!envoye) notes.push("e-mail au client NON envoyé");

  await inserer("modifications", {
    reference: ref,
    champ: "creation",
    ancien: null,
    nouveau: [
      `Réservation saisie au téléphone par ${utilisateur.email}`,
      mode === "virement" ? "paiement par virement" : "lien de paiement par carte",
      montant !== prixGrille ? `prix de la grille ${prixGrille} € corrigé à ${montant} €` : null,
      facture ? `facture ${facture.numero ?? facture.id}` : null,
      ...notes,
    ]
      .filter(Boolean)
      .join(" · "),
    statut: "appliquee",
    langue,
    source: "exploitant",
  });

  const fait = !envoye ? "cree-sans-email" : mode === "carte" && !lienPaiement ? "cree-sans-lien" : "cree";
  redirect(`${cheminFiche(ref)}?fait=${fait}`);
}
