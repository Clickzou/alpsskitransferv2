import type { Resort } from "./types";

/**
 * Megève — rédigée à la main, la station n'ayant pas de page mère sur le
 * WordPress alors que deux pages de trajet y menaient.
 */
export const megeve: Resort = {
  slug: "megeve",
  name: "Megève",
  country: "FR",
  status: "migre",

  metaTitre: "Megève Ski Transfers | Geneva & Chambéry to Megève",
  metaDescription:
    "Private transfers to Megève from Geneva (79 km, 1 h 20), Chambéry, Lyon and Grenoble. Fixed price per vehicle, flight tracking, ski bags included.",
  h1: "Megève Ski Transfers – Private Airport Transfers to the Pays du Mont-Blanc",
  chapo:
    "Megève is 79 km from Geneva, about 1 hour 20 minutes by road, and 94 km from Chambéry (1 h 20). Lyon is 172 km away (2 h 10) and Grenoble 160 km (2 h 05). The village sits at 1,113 m on a plateau facing Mont Blanc, and the approach — motorway to Sallanches, then the climb to the plateau — is one of the easier ones in the Alps in winter. We drive all four airports door to door, with a price fixed per vehicle and quoted before you book, ski and board bags included. Your driver tracks your flight and is there when you land, and pick-up is at your chalet or hotel rather than at a drop-off point.",

  airports: ["geneva-airport", "chambery-savoie-airport", "lyon-airport", "grenoble-isere-airport"],

  contenu: [
    {
      type: "paragraphe",
      texte:
        "Megève was built as a village long before it was a resort, and the difference shows on arrival: a medieval square, a church tower, horse-drawn sleighs on cobbles that are closed to cars in the evening. The Rothschild family turned it into an Alpine destination in the 1920s, deliberately as an answer to St. Moritz, and the village kept the scale that decision gave it — low buildings, wood and stone, no high-rise.",
    },
    {
      type: "paragraphe",
      texte:
        "For a transfer, the useful fact is the altitude of the road rather than of the pistes: nothing on the way to Megève climbs above 1,150 m, so the approach stays clear when higher resorts are being dug out.",
    },

    { type: "titre2", texte: "Which airport for Megève?" },
    { type: "titre3", texte: "Geneva (GVA) — 79 km, about 1 h 20" },
    {
      type: "paragraphe",
      texte:
        "The busiest gateway and the one most Megève passengers use: flights all week from most European cities, then motorway to Sallanches and 12 km of climb. It is the choice that gives you the widest range of arrival times.",
    },
    { type: "titre3", texte: "Chambéry Savoie (CMF) — 94 km, about 1 h 20" },
    {
      type: "paragraphe",
      texte:
        "The same drive time as Geneva over a shorter distance, through Albertville and the Val d’Arly. Chambéry’s winter timetable is concentrated at weekends, so it works best for a Saturday-to-Saturday week.",
    },
    { type: "titre3", texte: "Lyon Saint-Exupéry (LYS) — 172 km, about 2 h 10" },
    {
      type: "paragraphe",
      texte:
        "Year-round flights, more airlines, and a straightforward motorway run. Worth comparing whenever Geneva fares spike in February half-term.",
    },
    { type: "titre3", texte: "Grenoble Alpes-Isère (GNB) — 160 km, about 2 h 05" },
    {
      type: "paragraphe",
      texte:
        "A ski-season airport with weekend charters, often cheaper than Geneva. The drive is longer but almost entirely motorway.",
    },

    { type: "titre2", texte: "Megève, Saint-Gervais and the Evasion Mont-Blanc area" },
    {
      type: "paragraphe",
      texte:
        "Megève’s lifts link Rochebrune, Le Jaillet and Le Mont d’Arbois, and the pass extends across the Evasion Mont-Blanc area to Saint-Gervais, Combloux, La Giettaz and Les Contamines — around 400 km of piste in total, most of it below 2,000 m and tree-lined. It is skiing built for long days and visibility rather than for altitude records, which is exactly why the resort fills in the shoulder seasons too.",
    },
    {
      type: "paragraphe",
      texte:
        "If you are staying in Combloux, Saint-Gervais or Praz-sur-Arly, the transfer is the same road with a different final turn: give us the exact address and we quote it as one journey.",
    },

    { type: "titre2", texte: "Arriving in winter" },
    {
      type: "paragraphe",
      texte:
        "The climb from Sallanches is a wide, well-maintained road, cleared and gritted through the season. Winter tyres and chains are legally required in Haute-Savoie from 1 November to 31 March, and our vehicles carry both. The pinch point is not the mountain but the valley: the A40 between Geneva and Sallanches is the main artery for the whole Mont-Blanc area, and it slows badly on Saturday mornings in February. Allow an extra 45 minutes on those days.",
    },

    { type: "titre2", texte: "Skis, luggage and children" },
    {
      type: "paragraphe",
      texte:
        "Ski and snowboard bags travel free, and the vehicle is sized to the equipment you declare when booking rather than to the seat count. Tell us about boot bags, splitboards or a pushchair.",
    },
    {
      type: "paragraphe",
      texte:
        "Child and booster seats are free and fitted before departure — an approved restraint is required for every child under 10 in France. Give us the ages when you book.",
    },

    { type: "titre2", texte: "Which vehicle, and when to book" },
    {
      type: "paragraphe",
      texte:
        "A private transfer is the vehicle for your party alone, priced per vehicle: for four people or more it usually beats buying individual seats, and it is the only comfortable option for a late arrival with children. The vehicle category is set by your group and your luggage — in winter the boot fills before the seats do.",
    },
    {
      type: "paragraphe",
      texte:
        "Book as soon as your flights are set. Christmas, New Year and the February half-terms are when vehicles run out across the Mont-Blanc valley, and an early booking is a cheaper one.",
    },
  ],

  faq: [
    {
      question: "How long is the transfer from Geneva to Megève?",
      reponse:
        "About 1 hour 20 minutes for 79 km. On a Saturday in high season the A40 towards Sallanches is slow: allow up to 45 minutes more.",
    },
    {
      question: "Is Chambéry closer to Megève than Geneva?",
      reponse:
        "Chambéry is 94 km away against 79 km from Geneva, and both take about 1 h 20 by road. The deciding factor is usually the flight timetable rather than the distance: Chambéry flies mainly at weekends, Geneva all week.",
    },
    {
      question: "Can you drop us in Combloux, Praz-sur-Arly or Saint-Gervais?",
      reponse:
        "Yes — they are on the same approach and part of the same ski area. Give us the exact address when you book and it is quoted as a single journey.",
    },
    {
      question: "Are ski bags and child seats included?",
      reponse:
        "Both are included at no extra charge. Declare the number of ski or board bags and the ages of any children when you book so the right vehicle and the right seats are sent.",
    },
    {
      question: "What if my flight lands late?",
      reponse:
        "Your driver tracks the flight and shifts the pick-up to the real landing time. One hour of one hour of waiting time is included and there is no surcharge.",
    },
  ],
};
