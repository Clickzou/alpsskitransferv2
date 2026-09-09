/**
 * `/book-ski-transfer-tickets/` — la page de conversion du silo anglais.
 *
 * ## Mot-clé et intention
 *
 * **Mot-clé propriétaire : « book ski transfer tickets »** — requête
 * transactionnelle, bas de tunnel, déjà portée par l'URL, le title et le H1
 * repris du WordPress. C'est la seule page du site qui a le droit de la viser :
 * la home porte « alps ski transfers », les pages de station portent la station,
 * les pages de trajet portent la paire aéroport → station.
 *
 * Requêtes secondaires servies par les H2 : « book ski transfers online »,
 * « ski transfer booking », « airport transfer to ski resort », « what's
 * included in a ski transfer », « how to book a ski transfer ».
 *
 * ## Ce que la page ne fait pas
 *
 * - **Elle ne développe aucune station ni aucun trajet.** Elle y renvoie en
 *   ancre exacte, comme la home. Une page de conversion qui rédige trois
 *   paragraphes sur Val Thorens cannibalise la page de station.
 * - **Elle n'affiche aucun prix.** Les 89 tarifs relevés sont en `valide: false`
 *   dans `data/tarifs.ts` — ce sont les prix *publiés* par l'ancien site, pas une
 *   grille confirmée. Le prix se donne dans le tunnel, par le moteur, une seule
 *   fois. La page affiche la distance et la durée, qui sont mesurées.
 * - **Elle ne parle pas de transfert partagé.** Décision du 9 septembre 2026 :
 *   le site ne vend que du privé. Toute la section « Private vs. Shared » de la
 *   page WordPress est remplacée par « What your ski transfer ticket includes »,
 *   qui sert la même intention — comprendre ce qu'on achète — sans annoncer un
 *   service qui n'existe pas.
 *
 * Le reste du texte est **repris du WordPress** (927 mots), à la mise en forme et
 * au nettoyage des mentions de partagé près.
 */

export interface PointInclus {
  titre: string;
  texte: string;
}

/** Une liaison mise en avant. Le chemin et la distance sont résolus à l'affichage. */
export interface RouteMiseEnAvant {
  airport: string;
  resort: string;
}

export const PAGE_RESERVATION = {
  /** Documenté ici pour que la prochaine main sache ce que la page vise. */
  motCle: "book ski transfer tickets",

  /** Illustration de l'introduction, à droite du texte. */
  introImage: {
    nom: "popular-alps-ski-transfer",
    alt: "Travellers walking through the snow on arrival at their Alpine ski resort",
  },

  intro: [
    "With our online booking system, you can compare options, get your quote and secure your ski holiday transfer in just a few clicks. We offer both budget-friendly and premium private transfers, ensuring maximum comfort at competitive rates. Whether you are travelling solo or with a group, you can reserve your airport transfer in advance and avoid any waiting time at Geneva airport.",
    "Our private transfer service offers door-to-door convenience for a smooth journey from the airport to your resort. Forget hidden fees — our ski transfer company provides clear, upfront pricing, with discounts for early bookings. Travel stress-free to Morzine, Tignes, Chamonix, Val Thorens and the Portes du Soleil with our highly experienced alpine drivers.",
    "Don't wait — book your ski transfer tickets now and guarantee a smooth, reliable trip with no delays.",
  ],

  routes: {
    surtitre: "Where we drive",
    titre: "Most popular ski transfer routes",
    chapo:
      "The liaisons we are asked for most often. Each one has its own page with the road distance, the driving time and the conditions of the journey — open it, or book straight away with the route already filled in.",
    /*
     * Genève d'abord : première porte d'entrée des Alpes, et la priorité absolue
     * du plan SEO — le site n'y est positionné sur aucune requête. Puis Lyon et
     * Grenoble, qui portaient les trois liaisons citées par la page WordPress.
     */
    selection: [
      { airport: "geneva-airport", resort: "val-thorens" },
      { airport: "geneva-airport", resort: "courchevel" },
      { airport: "geneva-airport", resort: "meribel" },
      { airport: "geneva-airport", resort: "chamonix" },
      { airport: "geneva-airport", resort: "morzine" },
      { airport: "geneva-airport", resort: "tignes" },
      { airport: "lyon-airport", resort: "meribel" },
      { airport: "lyon-airport", resort: "val-thorens" },
      { airport: "grenoble-isere-airport", resort: "les-deux-alpes" },
    ] as RouteMiseEnAvant[],
  },

  vehicules: {
    surtitre: "Our vehicles",
    titre: "Choose the vehicle that fits your group",
    chapo:
      "One price per vehicle, not per seat: the whole car is yours, with room for luggage, skis and boards. Pick the category when you book — the price is fixed from that moment.",
  },

  inclus: {
    surtitre: "Your ticket",
    titre: "What your ski transfer ticket includes",
    chapo:
      "A seamless ski transfer can make all the difference to your ski holiday. Everything below is part of the price you are quoted — there is nothing to add on arrival.",
    points: [
      {
        titre: "A fixed price per vehicle",
        texte:
          "The price announced when you book is the price you pay, tolls and motorway fees included. No surge pricing, no hidden fees, no recalculation on the day.",
      },
      {
        titre: "Door-to-door service",
        texte:
          "Your driver meets you in the arrivals hall and takes you straight to your accommodation. No change of vehicle, no stops on the way, no waiting for other passengers.",
      },
      {
        titre: "Flight tracking",
        texte:
          "We follow your flight number. A delayed landing moves your pick-up time with it, at no extra cost and with nothing for you to do.",
      },
      {
        titre: "Winter-equipped vehicles",
        texte:
          "Winter tyres and snow chains on board all season, as the law requires in Savoie and Haute-Savoie from 1 November to 31 March.",
      },
      {
        titre: "Room for skis and boards",
        texte:
          "Skis, snowboards and boot bags travel with you, in vehicles sized for winter luggage rather than for city runs.",
      },
      {
        titre: "Experienced alpine drivers",
        texte:
          "Professionally trained, English-speaking drivers who drive these mountain roads all winter — the part of the journey where experience actually counts.",
      },
    ] as PointInclus[],
  },

  etapes: {
    surtitre: "Booking process",
    titre: "How to book your ski transfer tickets",
    chapo:
      "Our booking process is secure, simple and hassle-free. Three steps, a few minutes, and an instant confirmation.",
    etapes: [
      {
        titre: "Choose your route",
        texte:
          "Pick your departure airport and your ski resort, with your arrival date and time.",
      },
      {
        titre: "Choose your vehicle",
        texte:
          "Select the category that fits your group and see your price for the whole vehicle.",
      },
      {
        titre: "Confirm and pay",
        texte:
          "Confirm your reservation and receive your booking details straight away by email.",
      },
    ],
    conclusion:
      "Booking early is the surest way to keep the price down: availability tightens as the school holidays approach.",
  },

  /**
   * Le maillage descendant de la page : le silo et le hub de Genève.
   * Ancre exacte, aucun paragraphe développé — la page mère reste la page mère.
   */
  silo: {
    titre: "Ski transfers by country",
    lien: {
      texte: "Geneva Airport ski transfers",
      chemin: "/switzerland-ski-transfers/geneva-airport/",
    },
  },
} as const;
