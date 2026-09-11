import type { Course, Modification } from "@/lib/admin/courses";
import { agesLisibles, enfantsParSens } from "@/lib/reservation/enfants";
import { FUSEAU_ALPES } from "@/lib/temps";

/**
 * Ce que la liste des courses et la fiche d'un client affichent de la même
 * façon : les heures, et les lignes d'historique.
 *
 * Toujours à l'heure des Alpes — le serveur tourne en UTC sur Vercel, et une
 * prise en charge lue deux heures trop tôt est un chauffeur à l'aéroport pour
 * rien.
 */

export function heure(date: Date): string {
  return date.toLocaleString("fr-FR", {
    timeZone: FUSEAU_ALPES,
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

const CHAMPS: Record<string, string> = {
  aller: "Prise en charge",
  retour: "Retour",
  vol: "Vol",
  adresse: "Adresse à l’aller",
  adresse_retour: "Adresse au retour",
  vol_retour: "Vol retour",
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
  if (m.champ === "creation" || m.champ === "paiement") return m.nouveau ?? "";
  if (m.champ === "relance") {
    return "Rappel automatique envoyé au client : adresse manquante";
  }
  if (m.champ === "demande") {
    return `Message à moins de 24 h : « ${m.nouveau ?? "sans message"} »`;
  }
  const valeur = (v: string | null) =>
    !v ? "—" : m.champ === "aller" || m.champ === "retour" ? heure(new Date(v)) : v;
  return `${CHAMPS[m.champ] ?? m.champ} : ${valeur(m.ancien)} → ${valeur(m.nouveau)} · ${
    STATUTS[m.statut] ?? m.statut
  }`;
}

/** Un trajet d'une course, au complet. */
export interface Sens {
  libelle: "Aller" | "Retour";
  quand: Date;
  trajet: string;
  adresse: string;
  /** L'adresse manque : le chauffeur ne sait pas où aller. */
  adresseManquante: boolean;
  vol: string;
  passagers: number;
  vehicule: string;
  enfants: string;
  ages: string;
  housses: string;
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
 * infos pour l'aller et pour le retour, même si identiques ». L'écran taisait
 * ce qui ne changeait pas d'un sens à l'autre — économe, et illisible : il
 * fallait reconstituer le retour à partir de l'aller. Chaque sens dit
 * désormais tout, y compris ce qu'il répète.
 */
export function sensDeLaCourse(course: Course): Sens[] {
  const enfants = enfantsParSens(course.enfants);
  const ages = enfants.ages ? agesLisibles(enfants.ages) : "—";
  const housses = course.bagagesSki > 0 ? String(course.bagagesSki) : "aucune";
  const compte = (n: number | null) =>
    n === null ? "non précisé" : n === 0 ? "aucun" : `${n} enfant${n > 1 ? "s" : ""}`;

  const aller: Sens = {
    libelle: "Aller",
    quand: course.aller,
    trajet: course.trajet,
    adresse: course.adresse || MANQUANTE,
    adresseManquante: !course.adresse,
    vol: course.vol || "non renseigné",
    passagers: course.passagers,
    vehicule: categorie(course.vehicule),
    enfants: compte(enfants.aller),
    ages,
    housses,
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
      adresse: adresseRetour ?? MANQUANTE,
      adresseManquante: !adresseRetour,
      vol: course.volRetour || "non renseigné",
      passagers: course.passagersRetour ?? course.passagers,
      vehicule: categorie(course.vehiculeRetour ?? course.vehicule),
      enfants: compte(enfants.retour),
      ages,
      housses,
    },
  ];
}

/**
 * Il manque une adresse pour une course encore à assurer. Un paiement non
 * abouti n'est pas concerné — il n'y a personne à aller chercher —, ni une
 * course dont les trajets sont déjà faits.
 */
export function adresseManquante(course: Course): boolean {
  if (course.statut === "en-attente-paiement") return false;
  if ((course.retour ?? course.aller).getTime() <= Date.now()) return false;
  return sensDeLaCourse(course).some((s) => s.adresseManquante);
}

/** Les lignes d'une course qui attendent la décision de l'exploitant. */
export function aValider(course: Course): Modification[] {
  return course.historique.filter((m) => m.statut === "en-attente");
}
