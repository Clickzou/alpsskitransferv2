import type { Transfer } from "./types";

/** Genève → Interlaken — rédigé à la main (liaison manquante de l'audit). */
export const genevaAirportToInterlaken: Transfer = {
  airport: "geneva-airport",
  resort: "interlaken",

  metaTitre: "Geneva to Interlaken Transfers | 216 km, 2 h 40",
  metaDescription:
    "Private transfers from Geneva Airport to Interlaken: 216 km, about 2 h 40 by motorway through Bern. Fixed price per vehicle, ski bags included.",
  h1: "Geneva to Interlaken Transfers",
  chapo:
    "Interlaken is 216 km from Geneva Airport, about 2 hours 40 minutes, on motorway through Lausanne and Bern with the lakes for company most of the way. It is the base of the Bernese Oberland — the point from which the railways climb to Grindelwald, Wengen, Mürren and the Jungfraujoch — and the drive has no pass, no tunnel toll and no border. Price fixed per vehicle, Swiss vignette and tolls included, ski bags and child seats included, and your driver tracks your flight.",

  contenu: [
    { type: "titre2", texte: "The route" },
    {
      type: "paragraphe",
      texte:
        "Motorway the whole way: along Lake Geneva to Lausanne, north through Fribourg to Bern, then east past Thun and along its lake to Interlaken at 566 m. Around two and a half hours of it at Swiss motorway speeds, cleared and gritted as national routine.",
    },
    {
      type: "paragraphe",
      texte:
        "This is one of the easiest long transfers in the Alps — the climbing is done afterwards, by railway.",
    },

    { type: "titre2", texte: "Winter timings" },
    {
      type: "paragraphe",
      texte:
        "2 h 40 holds well. The predictable slowdowns are Friday evening around Bern and Saturday morning on the Interlaken road in high season; allow half an hour more then. Winter tyres and chains are on board, and the vignette and tolls are in your price.",
    },

    { type: "titre2", texte: "Interlaken, and where you go from there" },
    {
      type: "paragraphe",
      texte:
        "If Interlaken is your base, we drop you at the door. If you are staying higher up, the last stage depends on the village: Grindelwald and Lauterbrunnen are reached by road and we take you there; Wengen and Mürren have no road, so the transfer ends at the station or the cable car below them, timed against a departure.",
    },

    { type: "titre2", texte: "What the price includes" },
    {
      type: "liste",
      items: [
        "Swiss motorway vignette and all tolls.",
        "Ski and snowboard bags, at no extra charge.",
        "Child and booster seats, fitted before departure.",
        "Flight tracking and waiting time if you land late.",
        "Door-to-door in Interlaken, Matten, Wilderswil or Bönigen.",
      ],
    },
  ],

  faq: [
    {
      question: "How long is the Geneva to Interlaken transfer?",
      reponse:
        "About 2 hours 40 minutes for 216 km, motorway almost the whole way. Allow half an hour more on a busy Saturday.",
    },
    {
      question: "Is Zurich closer to Interlaken?",
      reponse:
        "Yes — about 2 h 20 for 139 km. Geneva has the wider choice of European flights; choose on the flight rather than the drive.",
    },
    {
      question: "Can you take us on to Grindelwald, Wengen or Mürren?",
      reponse:
        "Grindelwald and Lauterbrunnen by road, yes. Wengen and Mürren have no road: we drop at the station or cable car below them and time it against a departure.",
    },
    {
      question: "Are the vignette and tolls included?",
      reponse:
        "Yes, along with ski bags and child seats. Nothing is payable on the day.",
    },
    {
      question: "What if my flight is delayed?",
      reponse:
        "Your driver tracks the flight and adjusts the pick-up to the actual landing time; waiting time is included.",
    },
  ],
};
