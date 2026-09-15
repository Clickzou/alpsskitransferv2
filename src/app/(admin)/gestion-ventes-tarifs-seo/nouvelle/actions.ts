"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { SITE } from "@/data/site";
import { utilisateurCourant } from "@/lib/admin/session";
import { airportParSlug } from "@/lib/airports";
import { resortParSlug } from "@/lib/resorts";
import { LIEUX, normaliser } from "@/lib/reservation/lieux";
import { cheminConfirmation, origineSite } from "@/lib/reservation/config";
import { CATEGORIES, validerDemande } from "@/lib/reservation/demande";
import { estUneAdresse, validerEtMesurer } from "@/lib/reservation/demande-mesuree";
import { cheminFiche } from "@/lib/reservation/demandes";
import {
  CAPACITE,
  CAPACITE_BAGAGES,
  devisReservation,
  type DemandeReservation,
} from "@/lib/reservation/devis";
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
import type { CategorieVehicule } from "@/lib/tarification/bareme";
import type { Grille } from "@/lib/tarification/grille";
import { grilleActive } from "@/lib/tarification/grilles-publiees";

/**
 * Créer une réservation prise au téléphone — demande de JC, 11 septembre 2026.
 *
 * L'exploitant remplit les mêmes champs que le client sur le site, et la
 * demande passe par **les mêmes contrôles** (`validerDemande`) et **le même
 * calcul de prix** (`devisReservation`) : deux moteurs, ce serait deux prix.
 * Il peut corriger le prix de la grille, et la correction est notée dans
 * l'historique.
 *
 * ## Les adresses hors grille (demande de JC, 14 septembre 2026)
 *
 * Au téléphone, une course ne va pas toujours d'un aéroport à une station :
 * un hôtel à Lyon, une gare, un chalet hors station. Les champs de lieu sont
 * donc ceux du site — aéroport, station ou adresse. Sur le site, une adresse
 * libre part en demande de devis ; ici, l'exploitant a le client en ligne et
 * lui donne son prix : la course se crée comme les autres, **au prix saisi**,
 * qui devient obligatoire faute de grille. **Depuis le 15 septembre 2026, une
 * adresse se chiffre au kilomètre** quand la route se mesure
 * (`validerEtMesurer`) : le prix saisi ne devient obligatoire que si elle ne
 * se mesure pas. Les colonnes de lieu portent alors
 * le nom lisible plutôt qu'un slug — tous les écrans affichent déjà la valeur
 * brute quand elle n'est pas au registre.
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

/** Ce que la réservation enregistre de son trajet, qu'il vienne de la grille ou non. */
interface CourseSaisie {
  /** Slug quand le lieu est au registre, nom lisible sinon. */
  airport: string;
  resort: string;
  retourAirport: string | null;
  retourResort: string | null;
  intitule: string;
  trajetRetour: string | null;
  categorie: CategorieVehicule;
  categorieRetour: CategorieVehicule | null;
  passagers: number;
  passagersRetour: number | null;
  aller: Date;
  retour: Date | null;
  bagages: number;
  skis: number;
  /** `null` : trajet hors grille, le prix saisi fait foi. */
  prixGrille: number | null;
  /** L'arrivée, ou le départ du retour, est une adresse : elle vaut adresse de dépose. */
  adresseArrivee: string | null;
  adresseDepartRetour: string | null;
}

function nomAeroport(slug: string): string {
  return airportParSlug(slug)?.name ?? slug;
}

function nomStation(slug: string): string {
  return resortParSlug(slug)?.name ?? slug;
}

/** Un trajet chiffré — de la table, ou mesuré jusqu'à une adresse : le prix de la grille. */
function courseDeGrille(demande: DemandeReservation, tarifs: Grille): CourseSaisie | string {
  const grille = devisReservation(demande, tarifs);
  if (!grille.ok) {
    return grille.echec.raison === "trop-de-passagers"
      ? "Trop de passagers pour ce véhicule : choisissez-en un plus grand."
      : grille.echec.raison === "trop-de-bagages"
        ? "Trop de bagages pour ce véhicule : choisissez-en un plus grand."
        : "Pas de prix dans la grille pour ce trajet.";
  }
  return {
    airport: demande.airport,
    resort: demande.resort,
    retourAirport: demande.retourAirport ?? null,
    retourResort: demande.retourResort ?? null,
    intitule: `${nomAeroport(demande.airport)} → ${nomStation(demande.resort)}`,
    trajetRetour:
      demande.retour && (demande.retourResort || demande.retourAirport)
        ? `${nomStation(demande.retourResort ?? demande.resort)} → ${nomAeroport(
            demande.retourAirport ?? demande.airport,
          )}`
        : null,
    categorie: demande.categorie,
    categorieRetour: demande.categorieRetour ?? null,
    passagers: demande.passagers,
    passagersRetour: demande.passagersRetour ?? null,
    aller: demande.aller,
    retour: demande.retour ?? null,
    bagages: demande.bagages ?? 0,
    skis: demande.skis ?? 0,
    prixGrille: grille.devis.total,
    // Une adresse d'arrivée vaut adresse de dépose ; au retour, elle est le point de départ.
    adresseArrivee: estUneAdresse(demande.resort) ? demande.resort : estUneAdresse(demande.airport) ? demande.airport : null,
    adresseDepartRetour: demande.retourResort
      ? estUneAdresse(demande.retourResort)
        ? demande.retourResort
        : null
      : estUneAdresse(demande.resort)
        ? demande.resort
        : null,
  };
}

/**
 * Un trajet qui passe par une adresse : pas de grille, le prix saisi fait foi.
 * `validerDemande` a déjà contrôlé les dates, le groupe et les bagages au
 * maximum d'un véhicule ; restent la capacité du véhicule choisi et les lieux.
 */
function courseHorsGrille(donnees: FormData, allerRetour: boolean): CourseSaisie | string {
  /** Le nom d'un lieu de la liste, ou l'adresse telle que saisie. */
  const lieu = (cleSlug: string, cleTexte: string): { nom: string; adresse: string | null } | null => {
    const slug = champ(donnees, cleSlug);
    const connu = slug ? (airportParSlug(slug)?.name ?? resortParSlug(slug)?.name) : undefined;
    if (connu) return { nom: connu, adresse: null };
    const texte = champ(donnees, cleTexte, 300);
    return texte ? { nom: texte, adresse: texte } : null;
  };

  const depart = lieu("from", "fromText");
  const arrivee = lieu("to", "toText");
  if (!depart || !arrivee) return "Indiquez le lieu de départ et le lieu d’arrivée.";
  const retourDepart = allerRetour ? lieu("returnFrom", "returnFromText") : null;
  const retourArrivee = allerRetour ? lieu("returnTo", "returnToText") : null;

  const valide = validerDemande({
    from: "",
    to: "",
    fromText: depart.nom,
    toText: arrivee.nom,
    when: champ(donnees, "when", 40),
    returnWhen: allerRetour ? champ(donnees, "returnWhen", 40) : undefined,
    passengers: champ(donnees, "passengers", 3),
    bags: champ(donnees, "bags", 3),
    skis: champ(donnees, "skis", 3),
  });
  if (!valide.ok) return valide.message;
  if (!("surMesure" in valide)) return "Indiquez le lieu de départ et le lieu d’arrivée.";
  const s = valide.surMesure;

  const categorieDe = (cle: string): CategorieVehicule | null => {
    const v = champ(donnees, cle, 20);
    return CATEGORIES.includes(v as CategorieVehicule) ? (v as CategorieVehicule) : null;
  };
  const categorie = categorieDe("vehicle") ?? "standard";
  const categorieRetour = s.retour ? categorieDe("vehicleReturn") : null;

  const brutRetour = s.retour ? champ(donnees, "returnPassengers", 3) : "";
  const passagersRetour = brutRetour === "" ? null : Number(brutRetour);
  if (passagersRetour !== null && !(Number.isInteger(passagersRetour) && passagersRetour >= 1)) {
    return "Le nombre de passagers au retour n’est pas lisible.";
  }

  if (s.passagers > CAPACITE[categorie]) {
    return "Trop de passagers pour ce véhicule : choisissez-en un plus grand.";
  }
  const vehiculeRetour = categorieRetour ?? categorie;
  if (s.retour && (passagersRetour ?? s.passagers) > CAPACITE[vehiculeRetour]) {
    return "Trop de passagers au retour pour ce véhicule : choisissez-en un plus grand.";
  }
  if (s.bagages + s.skis > CAPACITE_BAGAGES[categorie]) {
    return "Trop de bagages pour ce véhicule : choisissez-en un plus grand.";
  }

  return {
    airport: depart.nom.slice(0, 200),
    resort: arrivee.nom.slice(0, 200),
    retourAirport: retourArrivee ? retourArrivee.nom.slice(0, 200) : null,
    retourResort: retourDepart ? retourDepart.nom.slice(0, 200) : null,
    intitule: `${depart.nom} → ${arrivee.nom}`,
    trajetRetour:
      s.retour && (retourDepart || retourArrivee)
        ? `${(retourDepart ?? arrivee).nom} → ${(retourArrivee ?? depart).nom}`
        : null,
    categorie,
    categorieRetour: categorieRetour && categorieRetour !== categorie ? categorieRetour : null,
    passagers: s.passagers,
    passagersRetour,
    aller: s.aller,
    retour: s.retour,
    bagages: s.bagages,
    skis: s.skis,
    prixGrille: null,
    adresseArrivee: arrivee.adresse,
    adresseDepartRetour: retourDepart ? retourDepart.adresse : null,
  };
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

  /*
    Les noms des champs du tunnel : la même validation les lit. Comme sur le
    site, un lieu passe par son slug, ou à défaut par son texte — qu'aucun
    registre ne reconnaît, ce qui fait basculer le trajet hors grille. Le
    retour surtout : un slug vide y voudrait dire « comme à l'aller », et une
    adresse de retour tapée à la main serait ignorée au profit de la grille.
  */
  const lieuSaisi = (cle: string) => {
    const slug = champ(donnees, cle);
    if (slug) return slug;
    // Un nom exact tapé sans cliquer la suggestion vaut le lieu du registre.
    const texte = champ(donnees, `${cle}Text`, 300);
    const cible = normaliser(texte);
    return (cible && LIEUX.find((l) => l.slug && (normaliser(l.nom) === cible || l.cles.includes(cible)))?.slug) || texte;
  };
  const from = lieuSaisi("from");
  const to = lieuSaisi("to");
  const retourPropre = allerRetour && Boolean(lieuSaisi("returnFrom") || lieuSaisi("returnTo"));
  /*
    Station → aéroport : la grille se lit dans l'autre sens, la route est la
    même. On la chiffre inversée, puis on remet la course dans son vrai sens.
  */
  const inverse = Boolean(resortParSlug(from) && airportParSlug(to)) && !retourPropre;
  const valide = await validerEtMesurer({
    from: inverse ? to : from,
    to: inverse ? from : to,
    when: champ(donnees, "when", 40),
    passengers: champ(donnees, "passengers", 3),
    bags: champ(donnees, "bags", 3),
    skis: champ(donnees, "skis", 3),
    vehicle: champ(donnees, "vehicle", 20),
    ...(allerRetour
      ? {
          returnWhen: champ(donnees, "returnWhen", 40),
          returnFrom: (inverse ? undefined : lieuSaisi("returnFrom")) || undefined,
          returnTo: (inverse ? undefined : lieuSaisi("returnTo")) || undefined,
          returnPassengers: champ(donnees, "returnPassengers", 3) || undefined,
          vehicleReturn: champ(donnees, "vehicleReturn", 20) || undefined,
        }
      : {}),
  });
  if (!valide.ok) return valide.message;

  const grilleOuTexte =
    "surMesure" in valide
      ? courseHorsGrille(donnees, allerRetour)
      : courseDeGrille(valide.demande, await grilleActive());
  const course =
    inverse && typeof grilleOuTexte !== "string" && "demande" in valide
      ? {
          ...grilleOuTexte,
          // Les colonnes disent d'où l'on part et où l'on va : le nom lisible, dans le vrai sens.
          airport: nomStation(valide.demande.resort),
          resort: nomAeroport(valide.demande.airport),
          retourAirport: null,
          retourResort: null,
          intitule: `${nomStation(valide.demande.resort)} → ${nomAeroport(valide.demande.airport)}`,
          trajetRetour: valide.demande.retour
            ? `${nomAeroport(valide.demande.airport)} → ${nomStation(valide.demande.resort)}`
            : null,
        }
      : grilleOuTexte;
  if (typeof course === "string") return course;
  if (course.aller.getTime() <= Date.now()) {
    return "La date de l’aller est déjà passée : vérifiez le jour et l’année.";
  }

  // Les enfants de chaque sens, bornés par les passagers de ce sens.
  const enfantsAller = Math.max(0, Math.floor(nombre(donnees, "enfants")));
  const enfantsRetour =
    String(donnees.get("enfantsRetour") ?? "").trim() === ""
      ? enfantsAller
      : Math.max(0, Math.floor(nombre(donnees, "enfantsRetour")));
  if (enfantsAller > course.passagers) {
    return "Il y a plus d’enfants que de passagers à l’aller : vérifiez le nombre de passagers.";
  }
  if (course.retour && enfantsRetour > (course.passagersRetour ?? course.passagers)) {
    return "Il y a plus d’enfants que de passagers au retour : vérifiez le nombre de passagers.";
  }

  const { prixGrille } = course;

  // Le prix : vide = la grille ; sinon un montant lisible, calculé sur ce trajet-ci.
  const brutPrix = String(donnees.get("prix") ?? "")
    .replace(/[\s  €]/g, "")
    .replace(",", ".");
  if (brutPrix === "" && prixGrille === null) {
    return "Ce trajet passe par une adresse hors de la grille : il n’a pas de prix automatique. Saisissez le prix convenu avec le client.";
  }
  let montant = prixGrille ?? 0;
  if (brutPrix !== "") {
    const saisi = Number(brutPrix);
    if (!Number.isFinite(saisi) || saisi <= 0) {
      return "Le prix saisi n’est pas lisible : écrivez un montant en euros, par exemple 320 ou 320,50 — ou laissez vide pour le prix de la grille.";
    }
    montant = Math.round(saisi * 100) / 100;
    if (prixGrille !== null) {
      const affiche = Number(String(donnees.get("prixGrilleAffiche") ?? ""));
      if (Number.isFinite(affiche) && affiche > 0 && affiche !== prixGrille) {
        return `Le trajet a changé depuis le calcul : la grille donne maintenant ${prixGrille} €. Recalculez le prix.`;
      }
      const ecart = Math.abs(montant - prixGrille) / prixGrille;
      if (ecart > 0.5 && donnees.get("confirmerPrix") !== "on") {
        return `Le prix saisi (${montant} €) s’écarte de plus de moitié de la grille (${prixGrille} €). Cochez « Je confirme ce prix » pour le garder.`;
      }
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

  const { intitule, trajetRetour } = course;
  /*
    Une arrivée à une adresse est déjà l'adresse de dépose : la redemander
    afficherait « MANQUANTE » et ferait relancer le client pour ce qu'il a
    donné au téléphone.
  */
  const adresse = champ(donnees, "adresse", 300) || course.adresseArrivee || "";
  const adresseRetour = allerRetour
    ? champ(donnees, "adresseRetour", 300) || course.adresseDepartRetour || ""
    : "";
  const vol = champ(donnees, "vol", 20) || null;
  const message = champ(donnees, "message", 2000) || null;

  // La ligne, colonne par colonne comme celle du tunnel (`/api/reservation`).
  const ligne = {
    reference: ref,
    statut: "en-attente-paiement",
    airport: course.airport,
    resort: course.resort,
    vehicule: course.categorie,
    vehicule_retour:
      course.categorieRetour && course.categorieRetour !== course.categorie
        ? course.categorieRetour
        : null,
    passagers: course.passagers,
    passagers_retour: course.passagersRetour,
    aller: course.aller.toISOString(),
    retour: course.retour ? course.retour.toISOString() : null,
    retour_airport: course.retourAirport,
    retour_resort: course.retourResort,
    montant,
    devise: "EUR",
    client_nom: nom,
    client_email: email,
    client_telephone: telephone,
    vol,
    adresse,
    adresse_retour: adresseRetour || null,
    vol_retour: allerRetour ? champ(donnees, "volRetour", 20) || null : null,
    bagages: course.bagages,
    bagages_ski: course.skis,
    enfants: phraseEnfants(
      enfantsAller,
      enfantsRetour,
      champ(donnees, "ages", 120) || null,
      Boolean(course.retour),
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
      description: `${dateClient(langue, course.aller)}${
        course.retour ? ` · ${dateClient(langue, course.retour)}` : ""
      }`,
      montant,
    },
  ];
  const echeance = echeanceVirement(course.aller);
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
      metadonnees: { airport: course.airport, resort: course.resort, langue },
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
          aller: dateClient(langue, course.aller),
          retour: course.retour ? dateClient(langue, course.retour) : null,
          trajetRetour,
          vehicule: course.categorie,
          vehiculeRetour: ligne.vehicule_retour,
          passagers: course.passagers,
          passagersRetour:
            course.passagersRetour && course.passagersRetour !== course.passagers
              ? course.passagersRetour
              : null,
          bagages: course.bagages,
          skis: course.skis,
          adresse: adresse || null,
          vol,
          message,
          total: montantClient(langue, montant, Boolean(course.retour)),
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
      prixGrille === null
        ? `trajet hors grille, prix convenu ${montant} €`
        : montant !== prixGrille
          ? `prix de la grille ${prixGrille} € corrigé à ${montant} €`
          : null,
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
