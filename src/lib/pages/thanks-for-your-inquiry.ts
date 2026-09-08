import type { PageFonctionnelle } from "./types";

/**
 * Repris de /thanks-for-your-inquiry/ (WordPress, 25 mots) par `npm run migrer:pages`.
 * URL conservée par le plan de migration : ne pas la déplacer.
 */
export const thanksForYourInquiry: PageFonctionnelle = {
  slug: "thanks-for-your-inquiry",
  metaTitre: "Thanks for your inquiry",
  metaDescription: "",
  h1: "Thank you !",
  chapo: "",
  noindex: true,

  contenu: [
    { type: "titre2", texte: "We’ve received your special inquiry—thank you! We’ll be in touch shortly to provide you with a quote." },
  ],

  faq: [

  ],
};
