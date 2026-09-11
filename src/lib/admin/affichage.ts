import type { Course, Modification } from "@/lib/admin/courses";
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

/** Les lignes d'une course qui attendent la décision de l'exploitant. */
export function aValider(course: Course): Modification[] {
  return course.historique.filter((m) => m.statut === "en-attente");
}
