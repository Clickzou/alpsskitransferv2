import type { Resort } from "./types";

/**
 * Les Gets — rédigée à la main : la station n'avait pas de page mère sur le
 * WordPress, alors que trois pages de trajet y menaient déjà.
 *
 * Distances et durées : `src/data/distances.ts` (routage OpenStreetMap).
 */
export const lesGets: Resort = {
  slug: "les-gets",
  name: "Les Gets",
  country: "FR",
  status: "migre",

  metaTitre: "Les Gets Ski Transfers | Geneva Airport to Les Gets",
  metaDescription:
    "Private transfers to Les Gets from Geneva, Chambéry and Lyon airports. Geneva is 69 km away, about 1 h 20. Fixed price per vehicle, ski bags included.",
  h1: "Les Gets Ski Transfers – Private Airport Transfers to the Portes du Soleil",
  chapo:
    "Les Gets is the closest major resort to Geneva: 69 km, about 1 hour 20 minutes by road, which makes it one of the few Alpine resorts you can reach in time to ski the afternoon you land. Chambéry is 118 km away (1 h 35) and Lyon 195 km (2 h 25), both useful when Geneva fares climb in February. We drive all three, door to door, in vehicles equipped for the col des Gets in winter. The price is fixed per vehicle and quoted before you book, ski and board bags included, and your driver follows your flight — a late landing costs you nothing. Saturday is changeover day in the Portes du Soleil: allow more time and book early.",

  airports: ["geneva-airport", "chambery-savoie-airport", "lyon-airport"],

  contenu: [
    {
      type: "paragraphe",
      texte:
        "Les Gets sits at 1,172 m on the col that separates the Arve valley from the Vallée d’Aulps, with Morzine on the other side of the pass. The two share a lift system, and both open into the Portes du Soleil — twelve linked resorts across the French and Swiss border. For a transfer, what matters is simpler: it is the first proper ski resort you meet coming out of Geneva, and the drive is short enough to make a morning flight worth taking.",
    },

    { type: "titre2", texte: "Which airport for Les Gets?" },
    { type: "titre3", texte: "Geneva (GVA) — 69 km, about 1 h 20" },
    {
      type: "paragraphe",
      texte:
        "The obvious choice, and the one nearly all our Les Gets passengers use. Flights run all week from most European cities, the motorway takes you to Cluses, and the last 20 km climb through Taninges to the col. Land at midday and you can be on the snow by mid-afternoon.",
    },
    { type: "titre3", texte: "Annecy (NCY) — 70 km, about 1 h 05" },
    {
      type: "paragraphe",
      texte:
        "The same distance as Geneva and a shorter drive, but a much thinner timetable: Annecy handles few scheduled winter flights. Worth checking, rarely worth planning around.",
    },
    { type: "titre3", texte: "Chambéry Savoie (CMF) — 118 km, about 1 h 35" },
    {
      type: "paragraphe",
      texte:
        "A ski-season airport whose winter schedule is concentrated at weekends, with charter flights from the UK. If your dates match one, the transfer is barely longer than from Geneva.",
    },
    { type: "titre3", texte: "Lyon Saint-Exupéry (LYS) — 195 km, about 2 h 25" },
    {
      type: "paragraphe",
      texte:
        "Year-round flights and a wider choice of airlines. The drive is an hour longer, and largely motorway; it is the sensible fallback when Geneva is full or expensive.",
    },

    { type: "titre2", texte: "The road up to Les Gets in winter" },
    {
      type: "paragraphe",
      texte:
        "From the motorway exit at Cluses, the road climbs steadily to Taninges and then over the col des Gets. It is a main road, cleared and gritted through the season, but it is exposed to snowfall and it is the same road every hire car, coach and transfer uses on a Saturday morning. Winter tyres and chains are legally required in this part of Haute-Savoie from 1 November to 31 March; our vehicles carry both.",
    },
    {
      type: "paragraphe",
      texte:
        "On a busy Saturday, add 45 minutes to an hour to the times above — the queue starts well before the climb. Midweek arrivals almost always run to the times in the table.",
    },

    { type: "titre2", texte: "Les Gets at a glance" },
    {
      type: "liste",
      items: [
        "Village at 1,172 m, skiing to 2,002 m on the Mont Chéry and Chavannes sides.",
        "Lift-linked to Morzine, and part of the Portes du Soleil — twelve resorts either side of the Swiss border.",
        "A working village rather than a purpose-built station: wooden chalets, a church, shops that stay open outside the season.",
        "Mont Chéry, across the valley from the main area, is where locals go when the Chavannes side is busy.",
        "One of the best-known mountain bike destinations in the Alps in summer, which keeps the lifts and the village alive year-round.",
      ],
    },

    { type: "titre2", texte: "Travelling with skis, boards and children" },
    {
      type: "paragraphe",
      texte:
        "Ski and snowboard bags travel free. Tell us how many you are bringing when you book, and anything bulky — a boot bag each, a splitboard, a pushchair — so we send a vehicle with room for the lot rather than one that technically seats you.",
    },
    {
      type: "paragraphe",
      texte:
        "Child and booster seats are free too, fitted before we leave the airport; French law requires an approved restraint for every child under 10. Give us their ages when you book.",
    },

    { type: "titre2", texte: "Private or shared transfer" },
    {
      type: "paragraphe",
      texte:
        "A private transfer leaves when you land, goes straight to your chalet or hotel, and is priced per vehicle: for a family or a group of four and up, it is usually cheaper than buying seats, as well as faster. A shared transfer costs less per person and suits couples and solo travellers with flexible timings, at the price of waiting for other passengers and stopping on the way.",
    },

    { type: "titre2", texte: "When to book" },
    {
      type: "paragraphe",
      texte:
        "Book as soon as your flights are confirmed. The February half-term Saturdays and the fortnight around Christmas are when vehicles run out across the whole Chablais, and an early booking is also a cheaper one. Give us the flight number and we track it: if you land late, your driver is still there.",
    },
  ],

  faq: [
    {
      question: "How long is the transfer from Geneva to Les Gets?",
      reponse:
        "About 1 hour 20 minutes for 69 km, without traffic. On a Saturday in high season, allow up to an hour more: the whole Portes du Soleil changes over on the same morning and the climb from Cluses is slow.",
    },
    {
      question: "Is Les Gets the closest resort to Geneva Airport?",
      reponse:
        "It is one of the closest major resorts: 69 km, roughly the same as Samoëns (67 km) and just ahead of Flaine (80 km) and Megève (79 km). For a short transfer with a full lift network behind it, Les Gets is hard to beat.",
    },
    {
      question: "Can we be picked up in Morzine or Avoriaz on the way back?",
      reponse:
        "Yes — Morzine is on the other side of the same pass and Avoriaz above it. Tell us the exact address when you book and we set the pick-up time from your flight, allowing for the road down.",
    },
    {
      question: "Are ski bags included in the price?",
      reponse:
        "Yes. Ski and board bags travel free, and we size the vehicle to the equipment you declare. There is no per-bag charge and nothing to pay on the day.",
    },
    {
      question: "What happens if my flight is delayed?",
      reponse:
        "Your driver tracks the flight and adjusts the pick-up to the actual landing time. There is nothing to do and nothing extra to pay.",
    },
    {
      question: "Do we need snow chains for the road to Les Gets?",
      reponse:
        "Our vehicles carry winter tyres and chains, as Savoie and Haute-Savoie law requires from 1 November to 31 March. The road over the col is a main road, cleared through the season, but it does get snow.",
    },
  ],
};
