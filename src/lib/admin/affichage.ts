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

const CHAMPS: Record<string, string> = { aller: "Prise en charge", retour: "Retour", vol: "Vol" };

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
  if (m.champ === "demande") {
    return `Message à moins de 24 h : « ${m.nouveau ?? "sans message"} »`;
  }
  const valeur = (v: string | null) =>
    !v ? "—" : m.champ === "vol" ? v : heure(new Date(v));
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
  vol: string;
  passagers: number;
  vehicule: string;
  enfants: string;
  ages: string;
  housses: string;
}

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
    adresse: course.adresse || "non renseignée",
    vol: course.vol || "non renseigné",
    passagers: course.passagers,
    vehicule: categorie(course.vehicule),
    enfants: compte(enfants.aller),
    ages,
    housses,
  };
  if (!course.retour) return [aller];

  /*
    L'adresse en station est celle de l'aller. Quand le client repart d'une
    autre station, on ne la connaît pas : le dire vaut mieux que de répéter une
    adresse fausse à un chauffeur.
  */
  const memeStation = course.stationRetour === course.arrivee;
  return [
    aller,
    {
      libelle: "Retour",
      quand: course.retour,
      trajet: `${course.stationRetour} → ${course.aeroportRetour}`,
      adresse: memeStation
        ? course.adresse || "non renseignée"
        : "autre station — à demander au client",
      vol: "non demandé",
      passagers: course.passagersRetour ?? course.passagers,
      vehicule: categorie(course.vehiculeRetour ?? course.vehicule),
      enfants: compte(enfants.retour),
      ages,
      housses,
    },
  ];
}

/** Les lignes d'une course qui attendent la décision de l'exploitant. */
export function aValider(course: Course): Modification[] {
  return course.historique.filter((m) => m.statut === "en-attente");
}
