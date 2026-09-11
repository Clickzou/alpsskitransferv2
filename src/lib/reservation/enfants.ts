/**
 * Les enfants, lisibles par l'exploitant.
 *
 * La base garde une phrase fabriquée à la réservation (`phraseEnfants`, dans
 * `/api/reservation`) : « 2 (5, 8) », « aller 1 · retour 2 (3 and 4) », ou les
 * âges seuls. Les âges sont tapés librement par le client, dans sa langue —
 * d'où ce « 3 and 4 » que l'exploitant ne lisait pas d'un coup d'œil, et ce
 * « aller 1 · retour 2 » qui ne disait pas qu'il s'agissait d'enfants.
 * Remarque de JC, 11 septembre 2026.
 *
 * Plutôt que de réécrire les réservations passées, la phrase se relit ici, à
 * l'affichage. Quand les âges ne sont pas une simple liste de nombres — « 3 ans
 * et 18 mois » —, ils restent tels que le client les a écrits : mieux vaut son
 * texte qu'une interprétation fausse, puisque l'âge décide du siège à charger.
 */

// Les mots qui séparent deux âges, dans les quatre langues du site.
const SEPARATEURS = /\s*(?:,|;|&|\+|\/|\bet\b|\band\b|\bund\b|\be\b|\by\b)\s*/i;

// « 3 », « 3 ans », « 3 years », « 3 Jahre », « 3 anni »…
const AGE = /^(\d{1,2})\s*(?:ans?|years?|yrs?|y|jahre?|anni|anno)?$/i;

/** « 3 and 4 » → « 3 ans et 4 ans » ; tout le reste tel qu'écrit. */
export function agesLisibles(texte: string): string {
  const morceaux = texte
    .split(SEPARATEURS)
    .map((m) => m.trim())
    .filter(Boolean);
  const nombres = morceaux.map((m) => m.match(AGE)?.[1]);
  if (nombres.length === 0 || nombres.some((n) => n === undefined)) return texte.trim();

  const ages = nombres.map((n) => {
    const age = Number(n);
    return age < 1 ? "moins d’un an" : `${age} ${age > 1 ? "ans" : "an"}`;
  });
  return ages.length === 1
    ? ages[0]
    : `${ages.slice(0, -1).join(", ")} et ${ages[ages.length - 1]}`;
}

// « 2 (5, 8) » ou « aller 1 · retour 2 (3 and 4) » — le format de `phraseEnfants`.
const PHRASE = /^(?:aller (\d+) · retour (\d+)|(\d+))(?: \((.*)\))?$/s;

/**
 * Les enfants sens par sens : combien à l'aller, combien au retour, et les âges.
 *
 * `null` quand le nombre n'a pas été donné — le client n'a indiqué que des
 * âges. Les âges, eux, sont communs aux deux sens : le formulaire n'a qu'un
 * champ pour les deux.
 */
export function enfantsParSens(texte: string | null | undefined): {
  aller: number | null;
  retour: number | null;
  ages: string | null;
} {
  const phrase = texte?.trim();
  if (!phrase) return { aller: 0, retour: 0, ages: null };

  const agesSeuls = phrase.match(/^âges\s*:\s*(.*)$/is);
  if (agesSeuls) return { aller: null, retour: null, ages: agesSeuls[1] };

  const m = phrase.match(PHRASE);
  if (!m) return { aller: null, retour: null, ages: phrase };

  const [, aller, retour, total, ages] = m;
  return total
    ? { aller: Number(total), retour: Number(total), ages: ages ?? null }
    : { aller: Number(aller), retour: Number(retour), ages: ages ?? null };
}

/** La phrase stockée en base, dite en français à l'exploitant. */
export function enfantsLisibles(texte: string | null | undefined): string {
  const phrase = texte?.trim();
  if (!phrase) return "—";

  // Des âges sans nombre d'enfants : la phrase le marque depuis le 11 septembre.
  const agesSeuls = phrase.match(/^âges\s*:\s*(.*)$/is);
  if (agesSeuls) return `âges : ${agesLisibles(agesSeuls[1])}`;

  const m = phrase.match(PHRASE);
  if (!m) return phrase;

  const [, aller, retour, total, ages] = m;
  const nombre = total
    ? `${total} enfant${Number(total) > 1 ? "s" : ""}`
    : `${aller} enfant${Number(aller) > 1 ? "s" : ""} à l’aller, ${retour} au retour`;
  return ages ? `${nombre} · âges : ${agesLisibles(ages)}` : nombre;
}
