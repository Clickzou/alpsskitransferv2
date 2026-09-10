import type { PageFonctionnelle } from "./types";

/**
 * Repris de /help/ (WordPress, 95 mots) par `npm run migrer:pages`.
 * URL conservée par le plan de migration : ne pas la déplacer.
 */
export const help: PageFonctionnelle = {
  slug: "help",
  visuel: { nom: "route-hiver", alt: "Winter tyres on a snow-covered road to a ski resort" },
  metaTitre: "Help",
  metaDescription:
    "Need a hand with a booking, a change of flight or an address in resort? Here is how to reach us and what we can do.",
  h1: "Help",
  chapo: "Have questions about our services? Find all the details about routes, vehicles, schedules, and booking conditions to plan your transfer with complete confidence.",

  contenu: [
    { type: "titre3", texte: "General questions" },
    { type: "titre3", texte: "Lost luggage" },
    { type: "paragraphe", texte: "Lost an item or luggage? Report it quickly to our team to start the search with your driver or destination staff. We'll help recover your belongings as soon as possible." },
    { type: "titre3", texte: "Custom inquiry" },
    { type: "paragraphe", texte: "Have a special request? Need a bespoke transfer, custom route, or group transport? Contact us for a tailored quote and enjoy a service designed just for you." },
  ],

  faq: [

  ],
};
