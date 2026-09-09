import type { PageFonctionnelle } from "./types";

/**
 * `/inquiry/` — groupes et professionnels.
 * URL conservée par le plan de migration : ne pas la déplacer.
 *
 * **Ce module n'est plus produit par `npm run migrer:pages`.** Refondue le
 * 9 septembre 2026 : gabarit `components/PageGroupes`, contenu structuré dans
 * `data/page-groupes.ts`.
 *
 * Mot-clé propriétaire : **« group ski transfers »**. Il remplace « special
 * inquiry ski transfer », que la page reprise du WordPress répétait dans son
 * title, son H1, ses sept questions de FAQ et presque tous ses paragraphes — une
 * expression de jargon interne, le nom du formulaire de demande, que personne ne
 * tape dans un moteur de recherche. Voir l'en-tête de `data/page-groupes.ts`.
 *
 * La page couvre l'axe B2B que le plan SEO réclamait — agences, conciergeries,
 * tour-opérateurs, séminaires — et pour lequel le site n'avait aucune page.
 */
export const inquiry: PageFonctionnelle = {
  slug: "inquiry",
  metaTitre: "Group Ski Transfers | For Agencies, Companies & Coaches",
  metaDescription: "Group ski transfers to the Alps for parties of any size: several vehicles, one contact, one quote. For travel agencies, chalet companies and company trips.",
  h1: "Group Ski Transfers — Parties, Agencies and Company Trips",
  chapo: "Travelling with more than eight people, or booking on behalf of others? Tell us the numbers, the dates and the pick-up points, and you get one quote covering the whole party — several vehicles, one arrival time, one confirmation.",

  /*
   * Vide, et c'est voulu : le contenu est structuré en sections dans
   * `data/page-groupes.ts`, mis en page par `PageGroupes`.
   */
  contenu: [],

  faq: [
    {
      question: "How many passengers fit in one vehicle?",
      reponse:
        "Up to 8 in the Standard Transporter, 7 in the Business V-Class and 4 in the Premium saloon. In winter the boot decides before the seats do — eight passengers rarely travel with eight suitcases and eight pairs of skis — so tell us the luggage count and we size the vehicles around it. Beyond one vehicle, the party travels as a convoy that arrives together.",
    },
    {
      question: "Can you collect a group from more than one airport?",
      reponse:
        "Yes, and it is one of the most common requests. Guests landing at Geneva, Lyon and Chambéry on the same afternoon can be coordinated to reach the same chalet within the same window. Each vehicle is matched to its own flight, so a delay on one arrival does not disrupt the others.",
    },
    {
      question: "Do you work with travel agencies and chalet companies?",
      reponse:
        "Yes. Agencies, tour operators, chalet companies and concierges get a named contact rather than a booking form, one invoice instead of one per traveller, and — if it helps — recurring slots held for changeover Saturdays through the season. Passenger names and flight numbers can be sent later.",
    },
    {
      question: "How long does a group quote take?",
      reponse:
        "Usually within a working day. A convoy cannot be priced sensibly by an online form: the number of vehicles, the timings that make them arrive together and the pick-up points all change the answer, so we build it by hand. The outline is enough to start — numbers, dates, airports and resort.",
    },
    {
      question: "Can you invoice the company rather than each traveller?",
      reponse:
        "Yes. Company trips and seminars are invoiced to the company, with a single reference for the whole journey. It is also worth knowing that midweek trips travel on clearer roads than the Saturday changeover, and that shows in both the timings and the price.",
    },
    {
      question: "What if we only need one vehicle?",
      reponse:
        "Then the booking form is quicker: it gives you a price straight away for a standard airport run. This page is for what does not fit it — more than eight passengers, several pick-up points, unusual timings, or an invoice to a company.",
    },
  ],
};
