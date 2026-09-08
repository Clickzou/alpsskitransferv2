import type { Resort } from "./types";

/**
 * Wengen — rédigée à la main. Comme Zermatt, la station est **sans voitures** :
 * le transfert s'arrête à Lauterbrunnen et le train à crémaillère fait les
 * derniers kilomètres. C'est ce que la durée de la table reflète.
 */
export const wengen: Resort = {
  slug: "wengen",
  name: "Wengen",
  country: "CH",
  status: "migre",

  metaTitre: "Wengen Ski Transfers | Airport to Lauterbrunnen & Wengen",
  metaDescription:
    "Private transfers to Wengen via Lauterbrunnen from Zurich, Bern, Geneva and Basel. Car-free village: the cog railway climbs from Lauterbrunnen in 15 min.",
  h1: "Wengen Ski Transfers – Private Airport Transfers via Lauterbrunnen",
  chapo:
    "Wengen has no road: the village at 1,274 m is reached only by the cog railway from Lauterbrunnen, which climbs the cliff in about 15 minutes and runs roughly every half-hour. Road transfers therefore end at Lauterbrunnen station — 61 km and about 55 minutes from Bern, 149 km and 2 h 30 from Zurich, 226 km and around 2 h 50 from Geneva. We drive to the station, help you and your skis onto the platform, and your hotel meets the train with a sledge or an electric cart. Price fixed per vehicle, quoted before booking, ski bags included, flight tracked.",

  airports: ["zurich-airport", "berne-airport", "geneva-airport", "basel-airport"],

  contenu: [
    {
      type: "paragraphe",
      texte:
        "Wengen sits on a shelf above the Lauterbrunnen valley, facing the Jungfrau, the Mönch and the Eiger across a gap of clear air. It has been a resort since the Victorians came for the views, and it has never had a road: everything arrives by the Wengernalpbahn, the cog railway that has climbed from Lauterbrunnen since 1893.",
    },
    {
      type: "paragraphe",
      texte:
        "The result is a village without traffic, and a transfer that ends on a railway platform rather than at a door. Told in advance, it is part of the charm; discovered on arrival at eleven at night, it is not — which is why it is the first thing on this page.",
    },

    { type: "titre2", texte: "Which airport for Wengen?" },
    { type: "titre3", texte: "Zurich (ZRH) — 149 km to Lauterbrunnen, about 2 h 30" },
    {
      type: "paragraphe",
      texte:
        "The main international gateway, with long-haul connections and flights all week. Motorway to Bern and Interlaken, then the valley road to Lauterbrunnen.",
    },
    { type: "titre3", texte: "Bern (BRN) — 61 km, about 55 minutes" },
    {
      type: "paragraphe",
      texte:
        "By far the closest airport, but with a thin scheduled timetable. Excellent when it happens to serve your city.",
    },
    { type: "titre3", texte: "Geneva (GVA) — 226 km, about 2 h 50" },
    {
      type: "paragraphe",
      texte:
        "The widest European choice of flights, at the price of a longer drive along the lake and through Bern.",
    },
    { type: "titre3", texte: "Basel Mulhouse (BSL) — about 190 km, 2 h 20" },
    {
      type: "paragraphe",
      texte:
        "The northern option, useful for flights from the UK and Germany, on motorway most of the way.",
    },

    { type: "titre2", texte: "How the last stretch works" },
    {
      type: "liste",
      items: [
        "Your driver drops you at Lauterbrunnen station, in the village, a few steps from the platform.",
        "The Wengernalpbahn climbs to Wengen in about 15 minutes, roughly every 30 minutes, into the evening.",
        "Skis and luggage travel with you; the station has trolleys and a luggage service in season.",
        "Wengen station is in the middle of the village — hotels meet the train with electric carts or sledges if you give them your arrival time.",
        "Going home, take a train earlier than you think you need: the schedule, not the road, sets your departure.",
      ],
    },

    { type: "titre2", texte: "Wengen at a glance" },
    {
      type: "liste",
      items: [
        "Car-free village at 1,274 m, on a terrace above the Lauterbrunnen valley.",
        "Part of the Jungfrau Ski Region — around 200 km of piste linked with Grindelwald, Kleine Scheidegg and Mürren.",
        "The Lauberhorn, above the village, hosts the longest downhill race on the World Cup circuit each January — the village is full that week.",
        "Views straight onto the Eiger north face, the Mönch and the Jungfrau.",
        "Lauterbrunnen, in the valley below, is a village of 72 waterfalls and the transport hub for the whole area.",
      ],
    },

    { type: "titre2", texte: "Winter in the Lauterbrunnen valley" },
    {
      type: "paragraphe",
      texte:
        "The valley road from Interlaken is a main Swiss road, cleared through the season and rarely a problem — the altitude gain is on the railway, not on the tarmac. Our vehicles carry winter tyres and chains. The Lauberhorn race weekend in January is the one date to plan around: the valley and its trains are full.",
    },

    { type: "titre2", texte: "Skis, luggage, children — and when to book" },
    {
      type: "paragraphe",
      texte:
        "Ski and board bags travel free in the vehicle and on the train. Child and booster seats are included and fitted before departure. Book early for the January race week and the February half-terms; and tell us your hotel, so we can time the drop-off to a train rather than to a wait on a cold platform.",
    },
  ],

  faq: [
    {
      question: "Can you drive us into Wengen?",
      reponse:
        "No — Wengen has no road. Every transfer ends at Lauterbrunnen station, and the cog railway climbs to the village in about 15 minutes, roughly every half-hour.",
    },
    {
      question: "How long is the transfer from Zurich to Wengen?",
      reponse:
        "About 2 hours 30 minutes by road to Lauterbrunnen for 149 km, plus the 15-minute train. From Bern it is about 55 minutes by road, from Geneva about 2 h 50.",
    },
    {
      question: "What do we do with skis and luggage at Lauterbrunnen?",
      reponse:
        "They travel with you on the train. The station has trolleys, and hotels in Wengen meet the train with electric carts or sledges if you tell them your arrival time.",
    },
    {
      question: "Do you also serve Grindelwald, Mürren and Interlaken?",
      reponse:
        "Yes. Grindelwald and Interlaken are reached by road; Mürren, like Wengen, is car-free and reached by cable car from Stechelberg or the funicular from Lauterbrunnen.",
    },
    {
      question: "What if my flight is delayed?",
      reponse:
        "Your driver tracks the flight and adjusts the pick-up. The railway runs into the evening, but tell us your flight number so we can plan the connection rather than discover it.",
    },
  ],
};
