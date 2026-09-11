/**
 * Les relances d'adresse — décision de JC, 11 septembre 2026.
 *
 * L'adresse en station se demande après le paiement. La plupart des clients la
 * donnent tout de suite, depuis la page de confirmation ; pour les autres, une
 * tâche planifiée passe chaque matin :
 *
 * - **au client**, un rappel trois jours avant sa prochaine prise en charge,
 *   s'il manque encore une adresse — une seule fois par réservation ;
 * - **à l'exploitant**, un récapitulatif des courses des 48 prochaines heures
 *   auxquelles il manque une adresse, pour qu'il appelle.
 *
 * Ces règles sont ici, sans accès réseau, pour être testées : la tâche ne fait
 * que les appliquer.
 */

const HEURE = 3600 * 1000;

export interface LigneRelance {
  reference: string;
  statut: string;
  airport: string;
  resort: string;
  aller: string;
  retour: string | null;
  retour_resort: string | null;
  adresse: string | null;
  adresse_retour: string | null;
  client_nom: string;
  client_email: string;
  client_telephone: string;
  langue: string | null;
}

/**
 * Il manque une adresse, à l'aller ou au retour. Au retour, l'absence vaut
 * « la même qu'à l'aller » — seulement quand le client repart de la même station.
 */
export function adresseManque(ligne: LigneRelance): boolean {
  const memeStation = !ligne.retour_resort || ligne.retour_resort === ligne.resort;
  const aller = ligne.adresse?.trim() || null;
  const retour = ligne.adresse_retour?.trim() || (memeStation ? aller : null);
  return !aller || (Boolean(ligne.retour) && !retour);
}

/** La prochaine prise en charge encore à venir, aller ou retour. */
export function prochainePrise(ligne: LigneRelance, maintenant = new Date()): Date | null {
  const prises = [ligne.aller, ligne.retour]
    .filter((d): d is string => Boolean(d))
    .map((d) => new Date(d))
    .filter((d) => d.getTime() > maintenant.getTime())
    .sort((a, b) => a.getTime() - b.getTime());
  return prises[0] ?? null;
}

function concernee(ligne: LigneRelance): boolean {
  return ligne.statut === "payee" && adresseManque(ligne);
}

/**
 * Le rappel au client : la prochaine prise en charge est dans trois jours —
 * entre 72 et 96 heures. La tâche passe une fois par jour : chaque course
 * traverse cette fenêtre exactement une fois.
 */
export function aRappeler(ligne: LigneRelance, maintenant = new Date()): boolean {
  if (!concernee(ligne)) return false;
  const prise = prochainePrise(ligne, maintenant);
  if (!prise) return false;
  const ecart = prise.getTime() - maintenant.getTime();
  return ecart >= 72 * HEURE && ecart < 96 * HEURE;
}

/** Le récapitulatif de l'exploitant : une adresse manque et la course est dans moins de 48 heures. */
export function aSignaler(ligne: LigneRelance, maintenant = new Date()): boolean {
  if (!concernee(ligne)) return false;
  const prise = prochainePrise(ligne, maintenant);
  return prise !== null && prise.getTime() - maintenant.getTime() < 48 * HEURE;
}
