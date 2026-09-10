/**
 * L'heure des Alpes, quel que soit le fuseau du serveur.
 *
 * ## Le défaut que ce module corrige
 *
 * Un visiteur qui saisit « 18 h 50 » veut dire 18 h 50 **à l'aéroport**. Le
 * code construisait cette date avec `new Date(annee, mois, jour, heure, minute)`,
 * qui l'interprète dans le fuseau de la machine : Europe/Paris sur le poste de
 * développement, **UTC sur Vercel**. La même saisie devenait donc deux instants
 * différents selon l'endroit où le code tournait.
 *
 * Les composantes relues plus tard (`getHours`, `getDay`) restaient cohérentes
 * — construites en UTC, relues en UTC — si bien que les majorations du samedi
 * et de la nuit tombaient juste. Ce qui ne tombait pas juste, c'est toute
 * comparaison avec l'heure **réelle** : le serveur croyait qu'il restait deux
 * heures de plus qu'en réalité. Le refus de réserver à moins d'une heure ne se
 * déclenchait jamais au bon moment, et le préavis de 24 h était faux d'autant.
 *
 * ## Pourquoi Europe/Paris
 *
 * Tous les aéroports desservis sont sur le même fuseau — Genève, Lyon,
 * Chambéry, Grenoble, Turin, Milan, Zurich, Innsbruck, Munich : CET l'hiver,
 * CEST l'été, changements aux mêmes dates. Une seule zone suffit donc à décrire
 * l'heure du service, et elle est écrite ici plutôt que subie.
 *
 * ## Pourquoi pas la variable TZ
 *
 * Poser `TZ=Europe/Paris` sur Vercel réglerait tout d'un coup — et ferait
 * dépendre la justesse d'un prix d'une case de configuration que personne ne
 * relit. Un tarif faux coûte de l'argent ; le fuseau est donc dans le code, et
 * les tests le vérifient sans rien supposer de la machine.
 */

/** Le fuseau du service. Un seul, parce qu'un seul suffit — voir plus haut. */
export const FUSEAU_ALPES = "Europe/Paris";

/** Les composantes d'un instant, lues dans le fuseau des Alpes. */
export interface ComposantesAlpes {
  annee: number;
  mois: number;
  jour: number;
  heure: number;
  minute: number;
  /** 0 = dimanche, 6 = samedi — même convention que `Date.getDay()`. */
  jourSemaine: number;
}

const JOURS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

/**
 * Décompose un instant dans le fuseau des Alpes.
 *
 * Passe par `Intl`, qui embarque la base des fuseaux et sait donc à quelle date
 * l'heure d'été commence — ce qu'un décalage écrit en dur ne saurait pas.
 */
export function composantesAlpes(instant: Date): ComposantesAlpes {
  const parties = new Intl.DateTimeFormat("en-US", {
    timeZone: FUSEAU_ALPES,
    hourCycle: "h23",
    weekday: "short",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).formatToParts(instant);

  const p = (type: string) => parties.find((x) => x.type === type)?.value ?? "0";
  return {
    annee: Number(p("year")),
    mois: Number(p("month")),
    jour: Number(p("day")),
    heure: Number(p("hour")),
    minute: Number(p("minute")),
    jourSemaine: Math.max(0, JOURS.indexOf(p("weekday"))),
  };
}

/** Le décalage du fuseau des Alpes à cet instant-là, en millisecondes. */
function decalage(instant: Date): number {
  const c = composantesAlpes(instant);
  const vuDesAlpes = Date.UTC(c.annee, c.mois - 1, c.jour, c.heure, c.minute);
  // Les secondes ne comptent pas ici : le décalage est un multiple de la minute.
  const reel = Math.floor(instant.getTime() / 60000) * 60000;
  return vuDesAlpes - reel;
}

/**
 * L'instant réel correspondant à une heure lue sur une horloge des Alpes.
 *
 * Deux passes, et c'est nécessaire : le décalage à appliquer dépend de l'instant
 * qu'on cherche justement à trouver. La première passe donne une approximation
 * à une heure près, la seconde la corrige — ce qui n'a d'effet que les deux
 * nuits de changement d'heure, mais ces nuits-là existent.
 */
export function instantAlpes(
  annee: number,
  mois: number,
  jour: number,
  heure: number,
  minute: number,
): Date {
  const commeSiUTC = Date.UTC(annee, mois - 1, jour, heure, minute);
  let instant = commeSiUTC - decalage(new Date(commeSiUTC));
  instant = commeSiUTC - decalage(new Date(instant));
  return new Date(instant);
}

/**
 * Une date affichée à l'heure des Alpes.
 *
 * L'exploitant lit « 13:00 » et le chauffeur se présente à 13 h : sans fuseau
 * explicite, le même e-mail affichait 13 h en développement et 11 h en
 * production.
 */
export function formaterAlpes(
  instant: Date,
  locale: string,
  options: Intl.DateTimeFormatOptions = {},
): string {
  return instant.toLocaleString(locale, { ...options, timeZone: FUSEAU_ALPES });
}
