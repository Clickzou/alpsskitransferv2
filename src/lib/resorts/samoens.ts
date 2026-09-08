import type { Resort } from "./types";

/** Samoëns — rédigée à la main ; deux pages de trajet attendaient cette page mère. */
export const samoens: Resort = {
  slug: "samoens",
  name: "Samoëns",
  country: "FR",
  status: "migre",

  metaTitre: "Samoëns Ski Transfers | Geneva Airport to Samoëns",
  metaDescription:
    "Private transfers to Samoëns from Geneva (67 km, 1 h 15), Chambéry and Lyon. Fixed price per vehicle, flight tracking, ski and board bags included.",
  h1: "Samoëns Ski Transfers – Private Airport Transfers to the Giffre Valley",
  chapo:
    "Samoëns is 67 km from Geneva and about 1 hour 15 minutes by road — the shortest airport transfer of any resort in the Grand Massif, and one of the shortest in the Alps. Chambéry is 116 km away (1 h 30) and Lyon 193 km (2 h 20). The village sits at 720 m in the Giffre valley, so the drive stays in the valley the whole way: no col, no long climb, and a road that stays open when higher approaches are being cleared. We drive it door to door, with a price fixed per vehicle and quoted before you book, ski bags included, and a driver who tracks your flight.",

  airports: ["geneva-airport", "chambery-savoie-airport", "lyon-airport"],

  contenu: [
    {
      type: "paragraphe",
      texte:
        "Samoëns is the rarest thing in this valley: a village that existed centuries before skiing and still works as one. Its stonemasons — the frahans — built across France from the Middle Ages onwards, and the square, the covered market and the 500-year-old lime tree at its centre are listed as historic monuments. It is the only French resort where the whole village carries that protection.",
    },
    {
      type: "paragraphe",
      texte:
        "The skiing is reached rather than stepped into: the Grand Massif Express gondola climbs from the edge of the village to Samoëns 1600, and from there the pistes link across to Morillon, Les Carroz and Flaine. For a transfer, that layout is good news — the drop-off is in a village at 720 m, not at the top of twenty hairpins.",
    },

    { type: "titre2", texte: "Which airport for Samoëns?" },
    { type: "titre3", texte: "Geneva (GVA) — 67 km, about 1 h 15" },
    {
      type: "paragraphe",
      texte:
        "The shortest transfer to any Grand Massif resort. Motorway to Cluses, then the valley road along the Giffre to Taninges and Samoëns. Flights run all week, which means you can arrive midweek instead of fighting the Saturday rotation.",
    },
    { type: "titre3", texte: "Chambéry Savoie (CMF) — 116 km, about 1 h 30" },
    {
      type: "paragraphe",
      texte:
        "Weekend-heavy winter schedule, useful for a Saturday-to-Saturday week and often a cheaper flight. Fifteen minutes more in the vehicle than from Geneva.",
    },
    { type: "titre3", texte: "Lyon Saint-Exupéry (LYS) — 193 km, about 2 h 20" },
    {
      type: "paragraphe",
      texte:
        "More airlines and year-round flights, an hour more of motorway. The fallback when Geneva is expensive in half-term.",
    },

    { type: "titre2", texte: "A valley approach rather than a climb" },
    {
      type: "paragraphe",
      texte:
        "Most Alpine transfers end with a long climb; this one does not. From Cluses the road follows the Giffre at valley level, which makes Samoëns one of the more reliable arrivals in bad weather — snowfall slows the road, it rarely blocks it. Our vehicles still carry winter tyres and chains, as Haute-Savoie requires from 1 November to 31 March.",
    },
    {
      type: "paragraphe",
      texte:
        "The bottleneck is the same as everywhere in the Arve valley: Saturday morning in February, when every hire car and coach in the region is on the same motorway. Allow an extra 30 to 45 minutes on those days.",
    },

    { type: "titre2", texte: "Samoëns at a glance" },
    {
      type: "liste",
      items: [
        "Village at 720 m, skiing from 1,600 m to 2,500 m, reached by the Grand Massif Express gondola.",
        "Part of the Grand Massif — around 265 km of piste linked with Morillon, Les Carroz, Sixt and Flaine.",
        "The whole village is a listed historic site: the covered market, the Gros Tilleul planted in 1438, the Jaÿsinia alpine garden above it.",
        "Low altitude means the village keeps its trees, its shops and a life outside the season — and that early-season cover is on the pistes above, not in the street.",
        "Sixt-Fer-à-Cheval, at the head of the valley, is a nature reserve worth the ten-minute drive on a bad-weather day.",
      ],
    },

    { type: "titre2", texte: "Skis, luggage and children" },
    {
      type: "paragraphe",
      texte:
        "Ski and board bags travel free, and the vehicle is chosen for the equipment you declare, not just the head count. Say how many bags, and flag anything bulky such as boot bags or a pushchair.",
    },
    {
      type: "paragraphe",
      texte:
        "Child and booster seats are included and fitted before departure; an approved restraint is required in France for every child under 10. Send the ages with the booking.",
    },

    { type: "titre2", texte: "Private or shared, and when to book" },
    {
      type: "paragraphe",
      texte:
        "A private transfer is priced per vehicle and leaves when you land — from four people up it usually costs less than individual seats. A shared transfer is cheaper per person and fits flexible timings, with a wait and intermediate stops.",
    },
    {
      type: "paragraphe",
      texte:
        "Book as soon as flights are confirmed, and well ahead for the February half-terms, when vehicles across the valley are taken weeks in advance.",
    },
  ],

  faq: [
    {
      question: "How long is the transfer from Geneva to Samoëns?",
      reponse:
        "About 1 hour 15 minutes for 67 km — the shortest transfer in the Grand Massif. On a Saturday in high season, allow 30 to 45 minutes more for traffic in the Arve valley.",
    },
    {
      question: "Is Samoëns easier to reach than Flaine in bad weather?",
      reponse:
        "Usually, yes. Samoëns sits at 720 m and the road follows the valley, while Flaine is reached by 20 km of hairpins climbing to 1,600 m. Both are cleared through the season, but the valley road is the more predictable one.",
    },
    {
      question: "Can you drop us at Samoëns 1600 rather than in the village?",
      reponse:
        "Tell us the exact address when you book. Samoëns 1600 is reached by a mountain road that is not always open to vehicles in winter; where it is not, we drop at the gondola and you ride up with your luggage.",
    },
    {
      question: "Are ski bags and child seats included?",
      reponse:
        "Both, at no extra charge. Declare the number of ski or board bags and the ages of any children so the right vehicle and seats are sent.",
    },
    {
      question: "What if my flight is delayed?",
      reponse:
        "Your driver follows the flight and adjusts the pick-up to the actual landing time. Waiting time is included.",
    },
  ],
};
