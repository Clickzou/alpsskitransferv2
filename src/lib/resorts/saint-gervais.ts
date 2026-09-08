import type { Resort } from "./types";

/**
 * Saint-Gervais — rédigée à la main.
 *
 * Ses distances étaient fausses jusqu'au 8 septembre : le géocodage avait retenu
 * un hameau « Saint-Gervais » près de Grenoble, d'où un absurde 30 km depuis
 * l'aéroport de Grenoble. Corrigé dans `REQUETES_PRECISES`, la station est bien
 * à 77 km de Genève.
 */
export const saintGervais: Resort = {
  slug: "saint-gervais",
  name: "Saint-Gervais",
  country: "FR",
  status: "migre",

  metaTitre: "Saint-Gervais Ski Transfers | Geneva Airport, 77 km",
  metaDescription:
    "Private transfers to Saint-Gervais-les-Bains from Geneva (77 km, 1 h 15), Chambéry, Lyon and Annecy. Fixed price per vehicle, ski bags included.",
  h1: "Saint-Gervais Ski Transfers – Private Airport Transfers to the Mont Blanc Valley",
  chapo:
    "Saint-Gervais-les-Bains is 77 km from Geneva, about 1 hour 15 minutes by road — one of the shortest transfers to a Mont Blanc resort. Chambéry is 104 km away (1 h 30), Annecy 78 km (1 h) and Lyon 197 km (2 h 25). The village sits at 850 m at the mouth of the Bionnassay valley, on the motorway side of the Mont Blanc massif, so the approach is a valley road rather than a climb. We drive door to door at a price fixed per vehicle and quoted before you book, ski and board bags included, and your driver tracks your flight.",

  airports: ["geneva-airport", "chambery-savoie-airport", "lyon-airport", "annecy-airport"],

  contenu: [
    {
      type: "paragraphe",
      texte:
        "Saint-Gervais is a spa town that happens to sit under Mont Blanc. Its thermal baths have been in use since 1806, its main square is a working town centre rather than a resort street, and the Tramway du Mont-Blanc — the highest rack railway in France — leaves from the edge of the village and climbs to the Nid d’Aigle at 2,372 m, the classic start of the normal route up Mont Blanc.",
    },
    {
      type: "paragraphe",
      texte:
        "The skiing is shared: Saint-Gervais is on the Evasion Mont-Blanc pass with Megève, Combloux, La Giettaz and Les Contamines, around 400 km of mostly tree-lined piste, and the Bettex gondola from the village links straight into it.",
    },

    { type: "titre2", texte: "Which airport for Saint-Gervais?" },
    { type: "titre3", texte: "Geneva (GVA) — 77 km, about 1 h 15" },
    {
      type: "paragraphe",
      texte:
        "The main choice: flights all week, motorway to Le Fayet, and the village a few minutes above it. It is the same road as for Chamonix, without the last 20 km up the valley.",
    },
    { type: "titre3", texte: "Annecy (NCY) — 78 km, about 1 hour" },
    {
      type: "paragraphe",
      texte:
        "The same distance and a slightly quicker drive, but very few scheduled winter flights. Check it, then book Geneva.",
    },
    { type: "titre3", texte: "Chambéry Savoie (CMF) — 104 km, about 1 h 30" },
    {
      type: "paragraphe",
      texte:
        "A weekend-heavy winter timetable with UK charters, through Albertville and the Val d’Arly.",
    },
    { type: "titre3", texte: "Lyon Saint-Exupéry (LYS) — 197 km, about 2 h 25" },
    {
      type: "paragraphe",
      texte:
        "Year-round flights and the widest airline choice, an hour more on the motorway.",
    },

    { type: "titre2", texte: "Le Fayet, the village, or Saint-Nicolas?" },
    {
      type: "paragraphe",
      texte:
        "The commune spreads over three levels and it is worth naming yours when you book. Le Fayet, at 580 m, has the railway station, the thermal baths and the Mont Blanc tramway. The village itself is 3 km and 250 m above it. Saint-Nicolas-de-Véroce, a hamlet on the Megève side, is 8 km further and higher again, on a narrow road that needs a proper vehicle in snow.",
    },

    { type: "titre2", texte: "Saint-Gervais at a glance" },
    {
      type: "liste",
      items: [
        "Village at 850 m, skiing to 2,350 m via Le Bettex and Mont Joly.",
        "On the Evasion Mont-Blanc pass — around 400 km of piste with Megève, Combloux, La Giettaz and Les Contamines.",
        "The Tramway du Mont-Blanc climbs to 2,372 m at the Nid d’Aigle, running through the winter to Bellevue for skiing.",
        "Thermal baths in use since 1806, at Le Fayet.",
        "Les Houches and Chamonix are 10 and 20 km up the valley, on a different pass but an easy add-on.",
      ],
    },

    { type: "titre2", texte: "Winter, luggage and booking" },
    {
      type: "paragraphe",
      texte:
        "The approach is motorway then a short valley climb — one of the more dependable arrivals in the Mont Blanc area, with the usual Saturday slowdown on the A40 in February. Winter tyres and chains are required in Haute-Savoie from 1 November to 31 March and our vehicles carry both. Ski and board bags travel free, child and booster seats are included, and we set the pick-up from your actual landing time.",
    },
  ],

  faq: [
    {
      question: "How long is the transfer from Geneva to Saint-Gervais?",
      reponse:
        "About 1 hour 15 minutes for 77 km. Allow up to 45 minutes more on a Saturday in February, when the A40 towards the Mont Blanc valley is busy.",
    },
    {
      question: "Where exactly should we be dropped?",
      reponse:
        "Tell us: Le Fayet (580 m, station and baths), the village (850 m) or Saint-Nicolas-de-Véroce (1,100 m, 8 km further on a narrow road) are all part of the commune and all different arrivals.",
    },
    {
      question: "Is Saint-Gervais a good base for Megève?",
      reponse:
        "They share the Evasion Mont-Blanc lift pass and are 12 km apart by road. Saint-Gervais is generally the cheaper of the two to stay in.",
    },
    {
      question: "Are ski bags and child seats included?",
      reponse:
        "Both, at no extra charge. Declare your ski or board bags and the ages of any children when booking.",
    },
    {
      question: "What if my flight is delayed?",
      reponse:
        "Your driver tracks the flight and adjusts the pick-up to the actual landing time; waiting time is included.",
    },
  ],
};
