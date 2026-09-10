import type { MetadataRoute } from "next";
import { SITE } from "@/data/site";
import { CHEMINS_NOINDEX } from "@/data/redirections";

/**
 * Crawlers de recherche IA autorisés explicitement.
 *
 * Piège à éviter : ne jamais bloquer un *search bot* en croyant bloquer un
 * *training bot*. OAI-SearchBot, PerplexityBot et Claude-SearchBot conditionnent
 * la présence dans les réponses de ChatGPT, Perplexity et Claude — un canal qui
 * pèse déjà sur la recommandation de prestataires de voyage.
 */
const BOTS_IA = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "CCBot",
  "Applebot-Extended",
];

/**
 * Le panier est **retiré du blocage**, et c'est volontaire.
 *
 * Il y était avec les pages du tunnel WooCommerce, tout en servant un
 * `noindex` : les deux ensemble se contredisent. Google ne lit pas le `noindex`
 * d'une page qu'il n'a pas le droit d'explorer, et une URL bloquée qui reçoit
 * des liens internes peut malgré tout apparaître dans les résultats, sans titre
 * ni description. Or l'icône du panier pose un lien vers lui **sur chaque page
 * du site**, dans les quatre langues. Laisser explorer et servir le `noindex`
 * est la seule combinaison qui garantit la désindexation.
 */
const PANIERS = ["/cart"];

export default function robots(): MetadataRoute.Robots {
  // Les pages du tunnel WooCommerce restent accessibles (elles servent la
  // réservation) mais ne doivent pas être explorées.
  const regles = {
    allow: "/",
    disallow: [
      "/api/",
      ...CHEMINS_NOINDEX.filter((c) => !PANIERS.includes(c)).map((c) => `${c}/`),
    ],
  };

  return {
    rules: [{ userAgent: "*", ...regles }, ...BOTS_IA.map((bot) => ({ userAgent: bot, ...regles }))],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
