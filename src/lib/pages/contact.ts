import type { PageFonctionnelle } from "./types";

/**
 * Écrite à la main : la page `/contact/` du WordPress n'avait **aucun contenu**
 * (0 mot dans l'inventaire) — elle ne portait qu'un formulaire d'extension. Son
 * URL est conservée par le plan de migration, elle doit donc exister.
 *
 * À compléter dès que le client aura fourni téléphone et e-mail : ce sont les
 * mêmes coordonnées manquantes que celles qui bloquent les données structurées
 * (`data/site.ts`) et la fiche Google Business.
 */
export const contact: PageFonctionnelle = {
  slug: "contact",
  visuel: { nom: "route-alpine", alt: "Snow-covered Alpine village and winding mountain road at dusk" },
  metaTitre: "Contact — Alps Ski Transfers",
  metaDescription:
    "Get in touch about an airport transfer to the Alps: quotes for groups, special requests, or a booking already made.",
  h1: "Contact us",
  chapo:
    "For a quote, a group booking or a question about a transfer you have already booked, get in touch and we will come back to you.",
  contenu: [
    { type: "titre2", texte: "Before you write" },
    {
      type: "paragraphe",
      texte:
        "If you are booking a standard airport transfer, the booking form gives you a fixed price straight away — it is faster than waiting for a reply.",
    },
    { type: "titre2", texte: "Groups, businesses and special requests" },
    {
      type: "paragraphe",
      texte:
        "Coaches, seminars, multi-vehicle bookings, unusual pick-up points or oversized luggage are quoted individually. Tell us the date, the route and the number of passengers.",
    },
  ],
  faq: [],
};
