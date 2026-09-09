import type { Resort } from "./types";

/**
 * Serre Chevalier — rédigée à la main ; deux pages de trajet attendaient cette
 * page mère, dont l'une au départ de Turin, l'aéroport le plus proche.
 */
export const serreChevalier: Resort = {
  slug: "serre-chevalier",
  name: "Serre Chevalier",
  country: "FR",
  status: "migre",

  metaTitre: "Serre Chevalier Ski Transfers | Turin & Grenoble",
  metaDescription:
    "Private transfers to Serre Chevalier from Turin (131 km, 2 h 45), Grenoble, Lyon and Marseille. Fixed price per vehicle, ski bags included.",
  h1: "Serre Chevalier Ski Transfers – Private Airport Transfers to the Southern Alps",
  chapo:
    "Serre Chevalier is the resort where the closest airport is Italian: Turin is 131 km away, about 2 hours 45 minutes through the Fréjus tunnel, against 155 km and 2 h 55 from Grenoble and 204 km and 3 h 30 from Lyon. The resort stretches 15 km along the Guisane valley between Briançon at 1,200 m and Le Monêtier-les-Bains, so the drop-off address matters more here than almost anywhere else. We drive all of them door to door, with winter tyres and chains on board, a price fixed per vehicle and quoted before you book, and ski bags included. Your driver tracks your flight.",

  airports: [
    "turin-airport",
    "grenoble-isere-airport",
    "lyon-airport",
    "marseille-provence-airport",
  ],

  contenu: [
    {
      type: "paragraphe",
      texte:
        "Serre Chevalier is not one village but four, strung along the Guisane between Briançon and the Col du Lautaret: Chantemerle, Villeneuve, Le Monêtier-les-Bains and Briançon itself. They share 250 km of piste on the north-facing side of the valley, and their altitude — 1,200 m at the bottom, 2,800 m at the top — combines with the light of the Southern Alps to give the resort its reputation: cold snow, and sun on it.",
    },
    {
      type: "paragraphe",
      texte:
        "Briançon, at the lower end, is the highest town in France and a fortified Vauban site listed by UNESCO. It is one of the few ski destinations where the evening options include a walled town rather than a resort street.",
    },

    { type: "titre2", texte: "Which airport for Serre Chevalier?" },
    { type: "titre3", texte: "Turin (TRN) — 131 km, about 2 h 45" },
    {
      type: "paragraphe",
      texte:
        "The closest airport, and the surprise for most British visitors. The route runs west from Turin, through the Fréjus road tunnel and down the Maurienne to Briançon. Flights from the UK and northern Europe are frequent in winter and often cheaper than the French airports.",
    },
    { type: "titre3", texte: "Grenoble Alpes-Isère (GNB) — 155 km, about 2 h 55" },
    {
      type: "paragraphe",
      texte:
        "The French option most people know, with weekend charters through the season. The road crosses the Col du Lautaret at 2,058 m — spectacular, and the part of the journey most affected by heavy snow.",
    },
    { type: "titre3", texte: "Lyon Saint-Exupéry (LYS) — 204 km, about 3 h 30" },
    {
      type: "paragraphe",
      texte:
        "Year-round flights and the widest choice of airlines, at the cost of the longest French drive.",
    },
    { type: "titre3", texte: "Marseille Provence (MRS) — 244 km, about 3 h 20" },
    {
      type: "paragraphe",
      texte:
        "The approach from the south, up the Durance valley. Worth comparing for flights from southern Europe, and it avoids the Lautaret entirely.",
    },

    { type: "titre2", texte: "The Lautaret, the tunnel, and winter" },
    {
      type: "paragraphe",
      texte:
        "Two of these routes cross a real obstacle. From Grenoble, the Col du Lautaret at 2,058 m is kept open through the winter but closes for a few hours at a time during heavy snowfall or avalanche control; when it does, the alternative is a long detour and a transfer that takes twice as long. From Turin, the Fréjus tunnel removes the pass altogether, which is one reason the Italian route is often the more reliable in a storm.",
    },
    {
      type: "paragraphe",
      texte:
        "Whichever way you come, winter tyres and chains are required in the Hautes-Alpes from 1 November to 31 March, and our vehicles carry both. Tell us your flight number and we set the pick-up from the actual landing time.",
    },

    { type: "titre2", texte: "Which village should the driver take you to?" },
    {
      type: "paragraphe",
      texte:
        "The four villages are 15 km apart end to end, and the difference matters when you land at midnight. Briançon is the town, with the fort and the shops. Chantemerle and Villeneuve are the two main lift bases. Le Monêtier, at the top of the valley, is the quietest of the four and the one with the thermal baths. Give us the exact address when you book — it is the same journey, but not the same last twenty minutes.",
    },

    { type: "titre2", texte: "Serre Chevalier at a glance" },
    {
      type: "liste",
      items: [
        "250 km of piste between 1,200 m and 2,800 m, on the shaded side of the Guisane valley.",
        "Four villages: Briançon, Chantemerle, Villeneuve and Le Monêtier-les-Bains, on one lift pass.",
        "Around 300 days of sun a year in the Southern Alps — the reason the resort skis differently from the Tarentaise.",
        "Briançon is a UNESCO-listed Vauban fortified town, and the highest town in France at 1,326 m.",
        "Le Monêtier has natural hot springs, used since Roman times, at the top end of the valley.",
      ],
    },

    { type: "titre2", texte: "Skis, luggage and children" },
    {
      type: "paragraphe",
      texte:
        "Ski and snowboard bags travel free, and the vehicle is sized to the equipment you declare rather than to the number of seats. Flag anything bulky when you book.",
    },
    {
      type: "paragraphe",
      texte:
        "Child and booster seats are free and fitted before departure — an approved restraint is required for every child under 10 in France, and this is a long transfer to make without one.",
    },

    { type: "titre2", texte: "Which vehicle, and when to book" },
    {
      type: "paragraphe",
      texte:
        "On a journey of three hours, a private vehicle earns its price: it leaves when you land, stops when you ask, and goes to your door. The vehicle category is set by your group and your luggage — in winter the boot fills before the seats do. Book as soon as your flights are set — the Hautes-Alpes fill for the February half-terms, and vehicles crossing the border are taken early.",
    },
  ],

  faq: [
    {
      question: "Which airport is closest to Serre Chevalier?",
      reponse:
        "Turin, at 131 km and about 2 hours 45 minutes through the Fréjus tunnel. Grenoble is 155 km but 2 h 55 by road over the Col du Lautaret, and Lyon is 204 km and about 3 h 30.",
    },
    {
      question: "Is the Col du Lautaret open in winter?",
      reponse:
        "It is kept open through the season, but it can close for a few hours during heavy snowfall or avalanche control. When that happens the detour is long, which is why the Turin route through the Fréjus tunnel is often the more reliable in a storm.",
    },
    {
      question: "Do you serve Briançon, Chantemerle, Villeneuve and Le Monêtier?",
      reponse:
        "All four, on the same transfer. They are spread over 15 km of the Guisane valley, so give us the exact address when you book.",
    },
    {
      question: "How long does the transfer from Grenoble take?",
      reponse:
        "About 2 hours 55 minutes for 155 km in normal conditions, including the climb to the Lautaret at 2,058 m. Allow more after heavy snow.",
    },
    {
      question: "Are ski bags and child seats included?",
      reponse:
        "Both are included at no extra charge. Declare your ski or board bags and the ages of any children when you book.",
    },
    {
      question: "What if my flight is delayed?",
      reponse:
        "Your driver tracks the flight and moves the pick-up to the actual landing time. Waiting time is included, with no surcharge.",
    },
  ],
};
