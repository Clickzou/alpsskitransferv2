import type { Course, Modification } from "@/lib/admin/courses";
import { agesLisibles, enfantsParSens } from "@/lib/reservation/enfants";
import { FUSEAU_ALPES } from "@/lib/temps";

/**
 * Ce que la liste des courses, la fiche d'un client et l'onglet Factures
 * affichent de la même façon : les heures, les montants, les états, et les
 * lignes d'historique.
 *
 * Toujours à l'heure des Alpes — le serveur tourne en UTC sur Vercel, et une
 * prise en charge lue deux heures trop tôt est un chauffeur à l'aéroport pour
 * rien.
 */

function anneeAlpes(date: Date): string {
  return date.toLocaleString("fr-FR", { timeZone: FUSEAU_ALPES, year: "numeric" });
}

/**
 * « sam. 20 déc., 14:30 » — et l'année dès qu'elle n'est pas l'année en
 * cours. Sans elle, en « Passées », dans la recherche et dans l'historique,
 * décembre 2026 et décembre 2027 se confondaient (revue du 11 septembre 2026).
 */
export function heure(date: Date, maintenant = new Date()): string {
  const autreAnnee = anneeAlpes(date) !== anneeAlpes(maintenant);
  return date.toLocaleString("fr-FR", {
    timeZone: FUSEAU_ALPES,
    weekday: "short",
    day: "numeric",
    month: "short",
    ...(autreAnnee ? { year: "numeric" as const } : {}),
    hour: "2-digit",
    minute: "2-digit",
  });
}

/**
 * « 653 € », « 245,50 € » — le même format sur tous les écrans. La liste et la
 * fiche écrivaient « 245.5 € », l'onglet Factures « 245,50 € ».
 */
export function euros(montant: number, devise = "EUR"): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: devise || "EUR",
    minimumFractionDigits: Number.isInteger(montant) ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(montant);
}

/* ----------------------------------------------------------------- états */

/** Un paiement abandonné sur le site : le client a ouvert Stripe sans payer. */
export function estNonAboutie(course: Course): boolean {
  return course.statut === "en-attente-paiement" && course.source !== "telephone";
}

/**
 * Une course à assurer : ni annulée, ni paiement abandonné. Une réservation
 * téléphonique en attente de virement **en est une** — l'argent arrive par la
 * banque, la course, elle, a bien lieu.
 */
export function estAAssurer(course: Course): boolean {
  return course.statut !== "annulee" && !estNonAboutie(course);
}

/** La prochaine prise en charge encore à venir — l'aller, sinon le retour. */
export function prochainePrise(course: Course, maintenant = new Date()): Date {
  if (course.aller.getTime() >= maintenant.getTime() || !course.retour) return course.aller;
  return course.retour;
}

/**
 * Le client a-t-il lui-même changé quelque chose ? L'historique contient aussi
 * la création d'une réservation téléphonique, ses paiements et les relances
 * automatiques : « modifiée par le client » s'affichait sur chacune.
 */
export function modifieeParLeClient(course: Course): boolean {
  return course.historique.some((m) => m.source === "client" && m.champ !== "relance");
}

/* ------------------------------------------------------------ historique */

/** La ligne d'historique du bouton « Demander l'adresse au client ». */
export const CHAMP_DEMANDE_ADRESSE = "demande-adresse";

/**
 * Quand l'adresse a été demandée au client pour la dernière fois — à la main
 * ou par la relance du matin. Le bouton l'affiche, pour qu'on n'écrive pas
 * deux fois au client sans le savoir.
 */
export function derniereDemandeAdresse(course: Course): Date | null {
  const demandes = course.historique.filter(
    (m) => m.champ === CHAMP_DEMANDE_ADRESSE || m.champ === "relance",
  );
  return demandes.length > 0 ? demandes[demandes.length - 1].le : null;
}

const CHAMPS: Record<string, string> = {
  aller: "Aller",
  retour: "Retour",
  vol: "Vol aller",
  adresse: "Adresse à l’aller",
  adresse_retour: "Adresse au retour",
  vol_retour: "Vol retour",
  chauffeur: "Chauffeur à l’aller",
  chauffeur_retour: "Chauffeur au retour",
  note_planning: "Note du planning (aller)",
  note_planning_retour: "Note du planning (retour)",
};

const STATUTS: Record<string, string> = {
  "en-attente": "à valider",
  acceptee: "validée",
  refusee: "refusée",
  remplacee: "remplacée par une demande plus récente",
  appliquee: "enregistrée",
  transmise: "transmise",
};

/** Une ligne d'historique, lisible d'un coup d'œil : ce qui a bougé, d'où, vers où, et son sort. */
export function decrire(m: Modification): string {
  // La création d'une réservation téléphonique et ses paiements se disent en toutes lettres.
  if (m.champ === "creation" || m.champ === "paiement" || m.champ === CHAMP_DEMANDE_ADRESSE) {
    return m.nouveau ?? "";
  }
  if (m.champ === "relance") {
    return "Rappel automatique envoyé au client : adresse manquante";
  }
  if (m.champ === "demande") {
    return `Demande de dernière minute (moins de 24 h avant) : « ${
      m.nouveau ?? "sans message"
    } » — à régler par téléphone`;
  }
  const valeur = (v: string | null) =>
    !v ? "—" : m.champ === "aller" || m.champ === "retour" ? heure(new Date(v)) : v;
  return `${CHAMPS[m.champ] ?? m.champ} : ${valeur(m.ancien)} → ${valeur(m.nouveau)} · ${
    STATUTS[m.statut] ?? m.statut
  }`;
}

/** Les lignes d'une course qui attendent la décision de l'exploitant. */
export function aValider(course: Course): Modification[] {
  return course.historique.filter((m) => m.statut === "en-attente");
}

/* ---------------------------------------------------------------- trajets */

/** Un trajet d'une course, au complet. */
export interface Sens {
  libelle: "Aller" | "Retour";
  quand: Date;
  trajet: string;
  adresse: string;
  /** L'adresse manque sur un trajet encore à faire : le chauffeur ne sait pas où aller. */
  adresseManquante: boolean;
  vol: string;
  passagers: number;
  vehicule: string;
  enfants: string;
  ages: string;
  valises: string;
  housses: string;
  /** Inscrits depuis l'onglet Planning. */
  chauffeur: string | null;
  notePlanning: string | null;
}

/** Ce que la carte affiche à la place d'une adresse que le client n'a pas encore donnée. */
const MANQUANTE = "MANQUANTE — à demander au client";

/** « premium » → « Premium » : les catégories portent le même nom partout. */
function categorie(vehicule: string): string {
  return vehicule ? vehicule.charAt(0).toUpperCase() + vehicule.slice(1) : "—";
}

/**
 * Les trajets d'une course, chacun au complet.
 *
 * Demande de JC, 11 septembre 2026 : « quand je déplie, je veux toutes les
 * infos pour l'aller et pour le retour, même si identiques ». Chaque sens dit
 * tout, y compris ce qu'il répète.
 *
 * Une adresse manquante ne se signale que sur un trajet **encore à faire** d'une
 * course **à assurer** : sur un aller déjà fait, ou un paiement abandonné,
 * l'alerte ne sert à rien et noie celles qui comptent.
 */
export function sensDeLaCourse(course: Course, maintenant = new Date()): Sens[] {
  const enfants = enfantsParSens(course.enfants);
  const ages = enfants.ages ? agesLisibles(enfants.ages) : "—";
  const housses = course.bagagesSki > 0 ? String(course.bagagesSki) : "aucune";
  const valises = course.bagages > 0 ? String(course.bagages) : "aucune";
  const compte = (n: number | null) =>
    n === null ? "non précisé" : n === 0 ? "aucun" : `${n} enfant${n > 1 ? "s" : ""}`;
  const aSurveiller = estAAssurer(course);
  const adresseDe = (adresse: string | null, quand: Date) => {
    const aVenir = quand.getTime() > maintenant.getTime();
    if (adresse) return { adresse, adresseManquante: false };
    return aSurveiller && aVenir
      ? { adresse: MANQUANTE, adresseManquante: true }
      : { adresse: "non donnée", adresseManquante: false };
  };

  const aller: Sens = {
    libelle: "Aller",
    quand: course.aller,
    trajet: course.trajet,
    ...adresseDe(course.adresse || null, course.aller),
    vol: course.vol || "non renseigné",
    passagers: course.passagers,
    vehicule: categorie(course.vehicule),
    enfants: compte(enfants.aller),
    ages,
    valises,
    housses,
    chauffeur: course.planning.aller.chauffeur,
    notePlanning: course.planning.aller.note,
  };
  if (!course.retour) return [aller];

  /*
    Au retour, pas d'adresse propre veut dire « la même qu'à l'aller » — mais
    seulement quand le client repart de la même station. D'une autre, elle
    manque tant qu'il ne l'a pas donnée : le dire vaut mieux que de répéter une
    adresse fausse à un chauffeur.
  */
  const memeStation = course.stationRetour === course.arrivee;
  const adresseRetour = course.adresseRetour ?? (memeStation ? course.adresse || null : null);
  return [
    aller,
    {
      libelle: "Retour",
      quand: course.retour,
      trajet: `${course.stationRetour} → ${course.aeroportRetour}`,
      ...adresseDe(adresseRetour, course.retour),
      vol: course.volRetour || "non renseigné",
      passagers: course.passagersRetour ?? course.passagers,
      vehicule: categorie(course.vehiculeRetour ?? course.vehicule),
      enfants: compte(enfants.retour),
      ages,
      valises,
      housses,
      chauffeur: course.planning.retour.chauffeur,
      notePlanning: course.planning.retour.note,
    },
  ];
}

/**
 * La pastille d'état d'une course, et sa couleur : vert « réglé », orange « en
 * attente », gris « sans suite ». « Payée » et « En attente de paiement »
 * étaient beige sur beige (revue du 11 septembre 2026).
 */
export function pastilleStatut(course: Course): { texte: string; classes: string } {
  const neutre = "border-glacier-300 bg-glacier-100 text-alpine-600";
  const attente = "border-attention-300 bg-attention-50 text-attention-700";
  if (course.statut === "annulee") return { texte: "Annulée", classes: neutre };
  if (course.statut === "payee") {
    return { texte: "Payée", classes: "border-succes-300 bg-succes-50 text-succes-700" };
  }
  if (estNonAboutie(course)) return { texte: "Paiement non abouti", classes: neutre };
  if (course.statut === "devis-a-confirmer") return { texte: "Devis à confirmer", classes: attente };
  return {
    texte:
      course.source === "telephone" && course.modePaiement === "virement"
        ? "Virement attendu"
        : "Paiement attendu",
    classes: attente,
  };
}

/** Il manque une adresse sur un trajet encore à faire d'une course à assurer. */
export function adresseManquante(course: Course, maintenant = new Date()): boolean {
  return sensDeLaCourse(course, maintenant).some((s) => s.adresseManquante);
}
