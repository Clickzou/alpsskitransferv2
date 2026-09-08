import type { Resort } from "./types";

/** Flaine — rédigée à la main ; deux pages de trajet attendaient cette page mère. */
export const flaine: Resort = {
  slug: "flaine",
  name: "Flaine",
  country: "FR",
  status: "migre",

  metaTitre: "Flaine Ski Transfers | Geneva Airport to Flaine",
  metaDescription:
    "Private transfers to Flaine from Geneva (80 km, 1 h 30), Chambéry and Lyon. Fixed price per vehicle, flight tracking, ski and board bags included.",
  h1: "Flaine Ski Transfers – Private Airport Transfers to the Grand Massif",
  chapo:
    "Flaine is 80 km from Geneva, about 1 hour 30 minutes by road, which puts it among the quickest transfers in the Alps for a resort at 1,600 m. Chambéry is 129 km away (1 h 45) and Lyon 206 km (2 h 35). The drive leaves the motorway at Cluses and climbs 20 km of hairpins through Les Carroz to the bowl Flaine sits in — the part of the journey that decides how long the transfer really takes in a snowfall. We drive it door to door, with winter tyres and chains on board, a price fixed per vehicle and quoted before you book, and ski bags included. Your driver tracks your flight; a delayed landing costs you nothing.",

  airports: ["geneva-airport", "chambery-savoie-airport", "lyon-airport"],

  contenu: [
    {
      type: "paragraphe",
      texte:
        "Flaine is a resort with no old village underneath it. It was designed from nothing in the 1960s by the architect Marcel Breuer, in raw concrete, laid out so that the buildings step down the bowl and almost every door opens onto snow. The result divides opinion on sight and settles the argument on skis: there is no bus, no walk with boots on, and the lifts start where the accommodation ends.",
    },
    {
      type: "paragraphe",
      texte:
        "The other thing the bowl gives is snow. Flaine faces north-west at 1,600 m and holds cover when lower resorts in the Arve valley are patchy — the reason it fills at both ends of the season.",
    },

    { type: "titre2", texte: "Which airport for Flaine?" },
    { type: "titre3", texte: "Geneva (GVA) — 80 km, about 1 h 30" },
    {
      type: "paragraphe",
      texte:
        "The natural choice: flights every day of the week, motorway to Cluses, then the climb. Land in the morning and you can ski the same afternoon; land in the evening and you are at your apartment for dinner.",
    },
    { type: "titre3", texte: "Chambéry Savoie (CMF) — 129 km, about 1 h 45" },
    {
      type: "paragraphe",
      texte:
        "A ski-season airport, busiest at weekends with UK charters. Fifteen minutes more driving than Geneva, and often a cheaper flight for a Saturday-to-Saturday week.",
    },
    { type: "titre3", texte: "Lyon Saint-Exupéry (LYS) — 206 km, about 2 h 35" },
    {
      type: "paragraphe",
      texte:
        "The alternative when Geneva is booked out: more airlines, year-round schedules, an hour more on the motorway.",
    },

    { type: "titre2", texte: "The climb from Cluses" },
    {
      type: "paragraphe",
      texte:
        "The last 20 km are the whole story of a Flaine transfer. The road leaves the valley at 480 m and climbs through Arâches and Les Carroz to 1,600 m, in hairpins that are gritted daily through the season but exposed to snowfall. In heavy snow, expect a slower climb rather than a closed road; our vehicles carry winter tyres and chains, as Haute-Savoie law requires from 1 November to 31 March.",
    },
    {
      type: "paragraphe",
      texte:
        "Saturdays in February are the busy day for the whole Grand Massif. Allow an extra 45 minutes to an hour on those mornings, and tell us your flight number so the pick-up is set from your actual landing.",
    },

    { type: "titre2", texte: "Flaine and the Grand Massif" },
    {
      type: "liste",
      items: [
        "Resort at 1,600 m, skiing to 2,500 m at the Grandes Platières, with a north-west aspect that holds snow.",
        "Part of the Grand Massif — around 265 km of linked piste with Les Carroz, Morillon, Samoëns and Sixt.",
        "The Cascades run, 14 km from the top of the Grandes Platières down to Sixt, is the longest in the area and finishes well outside Flaine: check the last lift home before you set off.",
        "Ski-in, ski-out by design: Forum, Forêt and Front de Neige all sit on the snow.",
        "Original works by Picasso, Dubuffet and Vasarely stand in the open air around the resort — a deliberate part of the 1960s plan.",
      ],
    },

    { type: "titre2", texte: "Luggage, ski bags and children" },
    {
      type: "paragraphe",
      texte:
        "Ski and board bags travel free; we size the vehicle to what you declare rather than to the number of seats. A group of six with six ski bags and six boot bags needs a bigger van than a group of six with hand luggage, and that is the vehicle you get.",
    },
    {
      type: "paragraphe",
      texte:
        "Child and booster seats are free and fitted before we leave the airport, as French law requires for every child under 10. Send the ages with your booking.",
    },

    { type: "titre2", texte: "Private or shared, and when to book" },
    {
      type: "paragraphe",
      texte:
        "A private transfer leaves on your landing, drops you at your building, and is priced per vehicle — usually the cheaper option from four people up. A shared transfer costs less per seat and suits flexible timings, with a wait at the airport and stops on the way up.",
    },
    {
      type: "paragraphe",
      texte:
        "Book when your flights are confirmed. Vehicles run out across the Arve valley on the Christmas and February Saturdays, and early bookings cost less than late ones.",
    },
  ],

  faq: [
    {
      question: "How long does the transfer from Geneva to Flaine take?",
      reponse:
        "About 1 hour 30 minutes for 80 km, without traffic. Allow up to an hour more on a Saturday in February, when the whole Grand Massif changes over and the climb from Cluses is slow.",
    },
    {
      question: "Can you drive right to the accommodation in Flaine?",
      reponse:
        "Yes. Flaine is built around covered car parks and short walks, and we drop you as close to your building as the resort allows — tell us the exact residence or chalet when you book.",
    },
    {
      question: "Is the road to Flaine difficult in winter?",
      reponse:
        "It is a mountain road with 20 km of hairpins from Cluses, cleared and gritted daily through the season. Our vehicles carry winter tyres and chains, which are legally required in Haute-Savoie from 1 November to 31 March.",
    },
    {
      question: "Do you also serve Les Carroz, Morillon and Samoëns?",
      reponse:
        "Yes — they are on the same road or the same valley and part of the same ski area. Give us the address and the journey is quoted as one transfer.",
    },
    {
      question: "Are ski bags included in the price?",
      reponse:
        "Yes, ski and snowboard bags travel free. Declare them when you book so the vehicle we send has the space.",
    },
    {
      question: "What happens if my flight is late?",
      reponse:
        "Your driver tracks the flight and adjusts the pick-up to the real landing time. Waiting time is included, with no surcharge.",
    },
  ],
};
