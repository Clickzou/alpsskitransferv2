import type { PageFonctionnelle } from "./types";

/**
 * `/book-ski-transfer-tickets/` — page de conversion du silo anglais.
 * URL conservée par le plan de migration : ne pas la déplacer.
 *
 * **Ce module n'est plus produit par `npm run migrer:pages`.** La page a été
 * refondue le 9 septembre 2026 : elle a son gabarit (`components/PageReservation`)
 * et son contenu éditorial (`data/page-reservation.ts`), hors de portée du script.
 * Ne reste ici que ce que la route et le contrôle SEO de prebuild lisent — metas,
 * H1, chapô, FAQ. Relancer `migrer:pages` écraserait ce fichier : le script doit
 * désormais sauter ce slug.
 *
 * Mot-clé propriétaire : **« book ski transfer tickets »**. Voir l'en-tête de
 * `data/page-reservation.ts` pour la carte d'intention de la page.
 *
 * Le texte est celui du WordPress (927 mots), aux deux corrections près :
 *  · **plus aucune mention de transfert partagé** — le site ne vend que du privé ;
 *  · les durées au départ de Genève sont celles des itinéraires calculés, pas
 *    celles annoncées par l'ancien site (« 1 hour » pour Chamonix, qui en fait
 *    1 h 25).
 */
export const bookSkiTransferTickets: PageFonctionnelle = {
  slug: "book-ski-transfer-tickets",
  metaTitre: "Book Ski Transfer Tickets | Private Alps Airport Transfers",
  metaDescription: "Book your ski transfer tickets online. Private airport transfers from Geneva, Lyon and Grenoble to the Alps: fixed price per vehicle, flight tracking.",
  h1: "Book Ski Transfer Tickets — Easy & Reliable Airport Transfers to the Alps",
  chapo: "Looking for a fast, easy and affordable way to book ski transfer tickets? Our private ski transfer service guarantees a seamless booking process for transfers from Geneva, Lyon and other major airports to popular ski resorts.",

  /*
   * Vide, et c'est voulu : le contenu de cette page est structuré en sections
   * dans `data/page-reservation.ts`, que `PageReservation` met en page. Le
   * gabarit générique `PageContenu` n'est pas utilisé ici.
   */
  contenu: [],

  faq: [
    {
      question: "How do I book ski transfer tickets?",
      reponse:
        "Choose your departure airport and your ski resort, give your arrival date, your flight number and the number of passengers, then pick the vehicle that suits your group. You confirm online and your booking details arrive by email straight away. The whole process takes a few minutes, and the price is fixed from the moment you book.",
    },
    {
      question: "Which ski resorts do you serve?",
      reponse:
        "We drive to the main resorts of the French, Swiss, Italian and Austrian Alps, including Val Thorens, Courchevel, Méribel, Chamonix, Morzine, Avoriaz, Tignes, Val d'Isère, La Plagne and Les Arcs. Each resort has its own page with the transfer times from every airport we serve.",
    },
    {
      question: "How long is the transfer from Geneva Airport?",
      reponse:
        "It depends on the resort and on the road conditions. Counting on clear roads: around 1 h 25 to Chamonix, 1 h 30 to Morzine, 2 h 25 to Méribel, 2 h 45 to Val Thorens and 3 h 05 to Tignes. Snow, chain controls and Saturday changeover traffic add to these times, and your driver plans for them.",
    },
    {
      question: "How can I save money on my ski transfer?",
      reponse:
        "Book early: availability tightens as the school holidays approach, and the closer to the date you book, the fewer vehicles are left. Travel together, too — the price is per vehicle and not per seat, so a group of six pays the same as a couple. Finally, a midweek arrival avoids the Saturday changeover, the busiest and most expensive day of the alpine week.",
    },
    {
      question: "What are the benefits of a private transfer?",
      reponse:
        "Your vehicle is yours alone. There is no waiting for other passengers, no stops at other resorts on the way, and no shuttle to catch: your driver meets you in the arrivals hall and takes you to your accommodation door. We track your flight, so a delayed landing simply moves your pick-up time, at no extra cost.",
    },
    {
      question: "What happens if my flight is delayed?",
      reponse:
        "Nothing you need to do. We track your flight number and adjust the pick-up time to your actual landing. Your driver waits for you in the arrivals hall, and a delay does not change the price you were quoted.",
    },
  ],
};
