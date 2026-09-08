import type { Transfer } from "./types";

/** Genève → Lauterbrunnen — rédigé à la main (liaison manquante de l'audit). */
export const genevaAirportToLauterbrunnen: Transfer = {
  airport: "geneva-airport",
  resort: "lauterbrunnen",

  metaTitre: "Geneva to Lauterbrunnen Transfers | 226 km, 2 h 50",
  metaDescription:
    "Private transfers from Geneva Airport to Lauterbrunnen, gateway to Wengen and Mürren: 226 km, about 2 h 50. Fixed price per vehicle, vignette included.",
  h1: "Geneva to Lauterbrunnen Transfers",
  chapo:
    "Lauterbrunnen is 226 km from Geneva Airport, about 2 hours 50 minutes, on motorway through Bern and Interlaken and then 12 km up the valley. It is the road head of the Jungfrau region: the last village a vehicle reaches, and the station from which the cog railway climbs to Wengen and the cable cars to Mürren. If your hotel is in one of those two, this is the transfer you need. Price fixed per vehicle, Swiss vignette and tolls included, ski bags and child seats included, flight tracked.",

  contenu: [
    { type: "titre2", texte: "The route" },
    {
      type: "paragraphe",
      texte:
        "Motorway along Lake Geneva to Lausanne, north to Bern, east past Thun to Interlaken, then the valley road south into the Lauterbrunnen valley — vertical limestone walls, 72 waterfalls, and a village at 796 m at the bottom of them.",
    },
    {
      type: "paragraphe",
      texte:
        "Nothing on the way climbs to any altitude: the mountains are gained afterwards, by railway. That makes this one of the more weather-proof long transfers in the Alps.",
    },

    { type: "titre2", texte: "Where the road stops" },
    {
      type: "liste",
      items: [
        "Lauterbrunnen village — we drive to the door.",
        "Wengen — we drop at Lauterbrunnen station; the cog railway takes about 15 minutes, roughly every half-hour into the evening.",
        "Mürren — the funicular from the station via Grütschalp, or the cable car from Stechelberg, 6 km up the valley.",
        "Grindelwald — reached by road over the ridge, about 30 minutes from Lauterbrunnen.",
        "Skis and luggage travel with you on all of these; the stations have trolleys.",
      ],
    },

    { type: "titre2", texte: "Winter timings" },
    {
      type: "paragraphe",
      texte:
        "2 h 50 on a clear road, half an hour more on a busy Saturday. We time the drop-off against a train departure rather than leaving you on a cold platform — tell us your hotel and your flight, and we work back from there. Winter tyres and chains are on board; vignette and tolls are in your price.",
    },

    { type: "titre2", texte: "Going home" },
    {
      type: "paragraphe",
      texte:
        "Coming back, the train sets the schedule, not the road. Take one earlier than you think you need: your driver waits at Lauterbrunnen, and a missed connection on the way down is a missed flight three hours later.",
    },
  ],

  faq: [
    {
      question: "How long is the Geneva to Lauterbrunnen transfer?",
      reponse:
        "About 2 hours 50 minutes for 226 km, motorway almost the whole way. Add the cog railway if you are going on to Wengen — about 15 minutes.",
    },
    {
      question: "Can you drive us to Wengen or Mürren?",
      reponse:
        "No — neither has a road. We drop at Lauterbrunnen station for the Wengen railway, or at the funicular or Stechelberg cable car for Mürren, timed against a departure.",
    },
    {
      question: "Is Zurich a better airport for the Jungfrau region?",
      reponse:
        "It is closer — about 2 h 30 — and better for long-haul. Geneva offers the widest choice of European flights and an easy motorway drive.",
    },
    {
      question: "Are the vignette and tolls included?",
      reponse:
        "Yes, with ski bags and child seats. Nothing is payable on the day.",
    },
    {
      question: "What if my flight is delayed?",
      reponse:
        "Your driver tracks the flight and adjusts the pick-up. The railway runs into the evening, but give us the flight number so the connection is planned rather than discovered.",
    },
  ],
};
