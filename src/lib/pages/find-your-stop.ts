import type { PageFonctionnelle } from "./types";

/**
 * Repris de /find-your-stop/ (WordPress, 134 mots) par `npm run migrer:pages`.
 * URL conservée par le plan de migration : ne pas la déplacer.
 */
export const findYourStop: PageFonctionnelle = {
  slug: "find-your-stop",
  visuel: { nom: "popular-alps-ski-transfer", alt: "Transfer minibus on a snow-covered mountain road" },
  metaTitre: "Find your stop",
  metaDescription:
    "Where your driver meets you at each airport, and how to find the pick-up point on arrival. Alps Ski Transfers.",
  h1: "Find your stop",
  chapo: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",

  contenu: [
    { type: "titre3", texte: "London Stratford Station" },
    { type: "titre3", texte: "London Gatwick Airport (LGW)" },
    { type: "paragraphe", texte: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo." },
    { type: "titre3", texte: "London Luton Airport (LTN)" },
    { type: "paragraphe", texte: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo." },
    { type: "titre3", texte: "London Stansted Airport (STN)" },
    { type: "paragraphe", texte: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo." },
  ],

  faq: [

  ],
};
