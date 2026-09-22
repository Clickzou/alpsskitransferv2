import type { PageFonctionnelle } from "./types";

/**
 * `/luxury-ski-transfers/` — demandes sur mesure : mise à disposition,
 * hélicoptère, jet privé, mariages et événements de marque.
 *
 * **Page créée le 22 septembre 2026**, elle ne vient pas du WordPress et
 * n'apparaît donc dans aucune redirection : c'est une URL neuve, sans
 * antériorité, qui ouvre un axe que le site n'avait pas du tout. Gabarit
 * `components/PagePremium`, contenu structuré dans `data/page-premium.ts`.
 *
 * Mot-clé propriétaire : **« luxury ski transfers »**. Le partage des rôles avec
 * `/inquiry/` tient en un mot : cette page-là porte **le nombre** — plus de huit
 * passagers, agences, entreprises — celle-ci porte **la nature** de la demande.
 * Voir l'en-tête de `data/page-premium.ts`.
 *
 * Elle a **son propre formulaire** (`components/FormulaireDemandePremium`,
 * `POST /api/demande-premium`) : une mise à disposition se chiffre sur des dates,
 * des points et des heures retenues, et le champ libre du contact ne les obtient
 * pas du premier coup.
 */
export const luxurySkiTransfers: PageFonctionnelle = {
  slug: "luxury-ski-transfers",
  metaTitre: "Luxury Ski Transfers | Chauffeur, Helicopter & Jet",
  metaDescription: "Chauffeur at your disposal, helicopter and private jet transfers to the Alps — weddings, brand events and private arrivals. Written quote in 24 hours.",
  h1: "Luxury Ski Transfers — Chauffeur, Helicopter and Private Jet",
  chapo: "A car and a driver held for the length of your stay, an air leg when the road is full, a wedding or a brand event with one coordinator from the first arrival to the last departure. Tell us what the stay looks like, and we come back in writing.",

  /*
   * Vide, et c'est voulu : le contenu est structuré en sections dans
   * `data/page-premium.ts`, mis en page par `PagePremium`.
   */
  contenu: [],

  visuel: {
    nom: "vehicule-premium",
    alt: "Premium saloon waiting at the foot of an Alpine resort",
  },

  faq: [
    {
      question: "Do you operate the helicopters and jets yourselves?",
      reponse:
        "No, and it matters that we say so. We are a road operator — licensed for passenger transport by taxi and VTC — and every air leg is chartered with a licensed air operator we work with. What we own is the rest: the route, the timings, the drivers at both ends of the flight, and one person answering for the whole programme. The operator is named in your quote before you confirm anything.",
    },
    {
      question: "What does “chauffeur at your disposal” include?",
      reponse:
        "A vehicle and a driver held for you for a period you choose — half a day, a full day, or the whole stay — rather than for a single journey. Waiting time is part of the price, so an afternoon that changes at four o'clock costs nothing extra. The same driver stays with you throughout, which is usually what makes the difference by day three.",
    },
    {
      question: "How far ahead should I ask?",
      reponse:
        "As early as you can for Christmas, New Year and the February half-terms — those weeks fill first, and a helicopter slot into a resort altiport is the scarcest thing in the programme. Outside them, a few days is often enough for a car and driver. If your dates are close, call rather than write: we will tell you straight away whether it is possible.",
    },
    {
      question: "Can you handle a wedding or an event spread over several days?",
      reponse:
        "Yes, and it is the part we plan hardest. Guests rarely land at one airport or on one day: a mountain wedding is usually Geneva, Lyon and Chambéry across two days, a shuttle between the ceremony and the reception, then a departure window on the Sunday. You get a schedule rather than a list of bookings, one coordinator reachable throughout, and one invoice at the end.",
    },
    {
      question: "How discreet is it, and will you sign an NDA?",
      reponse:
        "Yes to the NDA — yours or ours, signed before the quote if your event requires it. Beyond the paperwork: no name on a placard unless you want one, nothing published about a journey, and drivers briefed on the itinerary before the day so that nothing is discussed in front of your guests.",
    },
    {
      question: "How is a bespoke request priced?",
      reponse:
        "Not by the kilometre. A disposal is priced on the hours held and the vehicle; an event on the movements and the days; an air leg on the operator's quote, passed on as it stands. You get one written proposal with all of it on a single page, and nothing is charged until you have accepted it. For a straightforward airport run to a resort, the booking form is quicker and gives you a fixed price on the spot.",
    },
  ],
};
