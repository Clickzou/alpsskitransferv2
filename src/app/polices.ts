import { Inter, Newsreader } from "next/font/google";

/**
 * Les deux polices du site.
 *
 * Jusqu'au 8 septembre, `--font-display` et `--font-sans` étaient déclarées dans
 * Tailwind mais **jamais définies** : le site tournait sur Georgia et system-ui,
 * c'est-à-dire sur ce que le navigateur avait sous la main. La maquette validée
 * ayant un rendu à empattements, on garde cette famille — mais choisie.
 *
 * `next/font` télécharge les fichiers au build et les sert depuis notre domaine :
 * aucune requête vers Google au chargement, donc pas de dépendance à un tiers ni
 * de question RGPD, et le `font-display: swap` évite le texte invisible.
 *
 * Deux familles, pas cinq — le concurrent en charge cinq sur sa home.
 */

/** Titres : une serif variable, chaleureuse et lisible en gros comme en petit. */
export const display = Newsreader({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

/** Texte courant et interface : neutre, dessinée pour l'écran. */
export const sans = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});
