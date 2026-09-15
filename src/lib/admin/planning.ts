import { bagagesCourts, estAAssurer, sensDeLaCourse } from "@/lib/admin/affichage";
import type { Course } from "@/lib/admin/courses";
import { instantAlpes, saisieAlpes } from "@/lib/temps";

/**
 * Le planning — demande de JC, 15 septembre 2026 : « un calendrier avec tous
 * les trajets de la semaine, du mois », et le nom du chauffeur et une note sur
 * chacun.
 *
 * L'unité est le **trajet**, pas la course : un aller-retour occupe deux cases,
 * à deux dates, et chacune a son chauffeur. Les jours sont ceux des Alpes —
 * une prise en charge à 0 h 30 est du jour qui commence, où que tourne le
 * serveur.
 *
 * Ce module est pur : il découpe une période et range des trajets. La page lit
 * la base et affiche.
 */

export type Vue = "jour" | "semaine" | "mois";

export interface Periode {
  vue: Vue;
  /** Le jour de référence, « 2026-09-15 ». */
  jour: string;
  /** Les jours affichés, du premier au dernier — la grille du mois déborde sur les semaines voisines. */
  jours: string[];
  debut: Date;
  fin: Date;
  precedent: string;
  suivant: string;
  titre: string;
}

export interface Trajet {
  cle: string;
  reference: string;
  sens: "aller" | "retour";
  quand: Date;
  jour: string;
  heure: string;
  trajet: string;
  adresse: string;
  adresseManquante: boolean;
  client: string;
  telephone: string;
  passagers: number;
  vehicule: string;
  /** « 2 valises · 1 housse à skis », vide s'il n'y en a pas. */
  bagages: string;
  vol: string;
  chauffeur: string | null;
  note: string | null;
}

const MOIS = [
  "janvier", "février", "mars", "avril", "mai", "juin",
  "juillet", "août", "septembre", "octobre", "novembre", "décembre",
];
const JOURS = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];

/** « 2026-09-15 » → date UTC de minuit, pour compter les jours sans fuseau. */
function versUtc(jour: string): Date {
  const [a, m, j] = jour.split("-").map(Number);
  return new Date(Date.UTC(a, m - 1, j));
}

function versJour(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export function decaler(jour: string, jours: number): string {
  const d = versUtc(jour);
  d.setUTCDate(d.getUTCDate() + jours);
  return versJour(d);
}

/** Le jour d'aujourd'hui, à l'heure des Alpes. */
export function aujourdhui(maintenant = new Date()): string {
  return saisieAlpes(maintenant).slice(0, 10);
}

/** Un jour lisible dans l'URL, sinon aujourd'hui. */
export function jourValide(valeur: unknown, maintenant = new Date()): string {
  return typeof valeur === "string" && /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/.test(valeur)
    ? valeur
    : aujourdhui(maintenant);
}

/** « mardi 15 septembre » */
export function jourLisible(jour: string, avecAnnee = false): string {
  const d = versUtc(jour);
  return `${JOURS[d.getUTCDay()]} ${d.getUTCDate()} ${MOIS[d.getUTCMonth()]}${
    avecAnnee ? ` ${d.getUTCFullYear()}` : ""
  }`;
}

/** Le lundi de la semaine du jour. */
function lundi(jour: string): string {
  const jourSemaine = versUtc(jour).getUTCDay();
  return decaler(jour, -((jourSemaine + 6) % 7));
}

export function periode(vue: Vue, jour: string): Periode {
  let premier: string;
  let nombre: number;
  let precedent: string;
  let suivant: string;
  let titre: string;

  if (vue === "jour") {
    premier = jour;
    nombre = 1;
    precedent = decaler(jour, -1);
    suivant = decaler(jour, 1);
    titre = jourLisible(jour, true);
  } else if (vue === "semaine") {
    premier = lundi(jour);
    nombre = 7;
    precedent = decaler(jour, -7);
    suivant = decaler(jour, 7);
    const dernier = decaler(premier, 6);
    const [d1, d2] = [versUtc(premier), versUtc(dernier)];
    titre =
      d1.getUTCMonth() === d2.getUTCMonth()
        ? `Semaine du ${d1.getUTCDate()} au ${d2.getUTCDate()} ${MOIS[d2.getUTCMonth()]} ${d2.getUTCFullYear()}`
        : `Semaine du ${d1.getUTCDate()} ${MOIS[d1.getUTCMonth()]} au ${d2.getUTCDate()} ${MOIS[d2.getUTCMonth()]} ${d2.getUTCFullYear()}`;
  } else {
    const d = versUtc(jour);
    const debutMois = versJour(new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), 1)));
    const finMois = versJour(new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + 1, 0)));
    premier = lundi(debutMois);
    const dernier = decaler(lundi(finMois), 6);
    nombre = Math.round((versUtc(dernier).getTime() - versUtc(premier).getTime()) / 86_400_000) + 1;
    precedent = versJour(new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() - 1, 1)));
    suivant = versJour(new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + 1, 1)));
    titre = `${MOIS[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
    titre = titre.charAt(0).toUpperCase() + titre.slice(1);
  }

  const jours = Array.from({ length: nombre }, (_, i) => decaler(premier, i));
  const [a1, m1, j1] = jours[0].split("-").map(Number);
  const [a2, m2, j2] = decaler(jours[jours.length - 1], 1).split("-").map(Number);
  return {
    vue,
    jour,
    jours,
    debut: instantAlpes(a1, m1, j1, 0, 0),
    fin: instantAlpes(a2, m2, j2, 0, 0),
    precedent,
    suivant,
    titre,
  };
}

/** Les trajets à assurer dans la période, du plus tôt au plus tard. */
export function trajetsDe(courses: Course[], debut: Date, fin: Date, maintenant = new Date()): Trajet[] {
  const trajets: Trajet[] = [];
  for (const course of courses) {
    if (!estAAssurer(course)) continue;
    for (const s of sensDeLaCourse(course, maintenant)) {
      if (s.quand.getTime() < debut.getTime() || s.quand.getTime() >= fin.getTime()) continue;
      const sens = s.libelle === "Aller" ? "aller" : "retour";
      const saisie = saisieAlpes(s.quand);
      trajets.push({
        cle: `${course.reference}-${sens}`,
        reference: course.reference,
        sens,
        quand: s.quand,
        jour: saisie.slice(0, 10),
        heure: saisie.slice(11, 16),
        trajet: s.trajet,
        adresse: s.adresse,
        adresseManquante: s.adresseManquante,
        client: course.client.nom,
        telephone: course.client.telephone,
        passagers: s.passagers,
        vehicule: s.vehicule,
        bagages: bagagesCourts(course.bagages, course.bagagesSki),
        vol: s.vol,
        chauffeur: course.planning[sens].chauffeur,
        note: course.planning[sens].note,
      });
    }
  }
  return trajets.sort((a, b) => a.quand.getTime() - b.quand.getTime());
}

export function parJour(trajets: Trajet[]): Map<string, Trajet[]> {
  const jours = new Map<string, Trajet[]>();
  for (const t of trajets) jours.set(t.jour, [...(jours.get(t.jour) ?? []), t]);
  return jours;
}

/** Les chauffeurs déjà inscrits, pour les proposer à la saisie. */
export function chauffeursConnus(courses: Course[]): string[] {
  const noms = new Map<string, string>();
  for (const c of courses) {
    for (const nom of [c.planning.aller.chauffeur, c.planning.retour.chauffeur]) {
      if (nom) noms.set(nom.toLowerCase(), nom);
    }
  }
  return [...noms.values()].sort((a, b) => a.localeCompare(b, "fr"));
}
