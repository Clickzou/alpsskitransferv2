import localFont from "next/font/local";

/**
 * La police du site : **Outfit**, celle du site actuel.
 *
 * Le WordPress charge `Outfit` en 400, 500, 600, 700 et 900, et rien d'autre.
 * C'est aussi la famille du lettrage du logo. La refonte change la mise en page,
 * pas l'identité : une serif aurait donné un autre site.
 *
 * Une seule famille, donc, pour les titres comme pour le texte — c'est ce que
 * fait le site actuel, et c'est un fichier de moins à charger. Les deux
 * variables restent distinctes : si un jour les titres prennent une autre
 * police, seule cette ligne change.
 *
 * Le fichier vit dans le dépôt (`src/polices/`, licence OFL) : la version
 * variable, sous-ensemble latin, toutes les graisses de 100 à 900 en un seul
 * fichier. Jusqu'au 2 octobre 2026 `next/font/google` le téléchargeait à chaque
 * compilation ; ce jour-là Google a servi une autre forme d'URL, et deux
 * déploiements de production ont échoué. Une compilation ne doit dépendre
 * d'aucun tiers.
 *
 * Servi depuis notre domaine : aucune requête vers Google au chargement, donc
 * pas de question RGPD, et le `font-display: swap` évite le texte invisible.
 */
export const police = localFont({
  src: "../polices/outfit-latin.woff2",
  weight: "100 900",
  display: "swap",
  variable: "--font-sans",
});

/**
 * Les titres partagent la même famille, exposée sous son propre nom pour que les
 * composants continuent de dire `font-display` là où ils veulent un titre.
 */
export const display = localFont({
  src: "../polices/outfit-latin.woff2",
  weight: "100 900",
  display: "swap",
  variable: "--font-display",
});

/** Alias conservé : les deux mises en page importent `sans`. */
export const sans = police;
