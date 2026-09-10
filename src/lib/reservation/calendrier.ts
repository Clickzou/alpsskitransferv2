/**
 * Ouvrir le calendrier en cliquant n'importe où dans le champ.
 *
 * Un `<input type="datetime-local">` n'ouvre son sélecteur qu'au clic sur la
 * petite icône de calendrier, à droite. Cliquer sur le reste du champ place un
 * curseur entre `mm` et `dd` et attend une saisie au clavier — ce que personne
 * ne devine, et qui coûte un aller-retour à chaque réservation.
 *
 * `showPicker()` est la méthode standard pour l'ouvrir depuis le code. Elle
 * exige un geste de l'utilisateur, d'où l'appel depuis `onClick` et non depuis
 * un effet : appelée seule, elle lève une exception plutôt que d'ouvrir quoi que
 * ce soit.
 *
 * Le `try` n'est pas de la prudence décorative. La méthode est absente des
 * navigateurs antérieurs à 2022, et lève aussi quand le champ est désactivé ou
 * en lecture seule. Dans tous ces cas le comportement natif reprend la main —
 * l'icône fonctionne toujours, on ne perd rien.
 */
export function ouvrirCalendrier(evenement: { currentTarget: HTMLInputElement }): void {
  try {
    evenement.currentTarget.showPicker();
  } catch {
    // Navigateur trop ancien, ou champ non modifiable : le clic garde son effet
    // habituel et l'icône reste utilisable.
  }
}
