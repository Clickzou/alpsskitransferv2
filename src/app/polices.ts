import { Outfit } from "next/font/google";

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
 * `next/font` télécharge les fichiers au build et les sert depuis notre domaine :
 * aucune requête vers Google au chargement, donc pas de dépendance à un tiers ni
 * de question RGPD, et le `font-display: swap` évite le texte invisible.
 */
export const police = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
});

/**
 * Les titres partagent la même famille, exposée sous son propre nom pour que les
 * composants continuent de dire `font-display` là où ils veulent un titre.
 */
export const display = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
  weight: ["500", "600", "700"],
});

/** Alias conservé : les deux mises en page importent `sans`. */
export const sans = police;
