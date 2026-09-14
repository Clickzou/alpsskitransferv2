import type { Article } from "./types";

/**
 * Chamonix, Morzine ou Les Gets au départ de Genève.
 *
 * Temps et distances : `src/data/distances.ts` (routage OpenStreetMap, sans
 * trafic). Routes d'accès et caractère des stations : pages rédigées Les Gets,
 * Argentière, Saint-Gervais et Champéry dans `src/lib/resorts/`, pages reprises
 * Chamonix, Morzine et Avoriaz, et l'article sur les stations sans voitures pour
 * la dernière étape d'Avoriaz. Capacités des véhicules : FAQ générale et
 * `CAPACITE` dans `src/lib/reservation/devis.ts`.
 */
export const chamonixMorzineLesGetsFromGeneva: Article = {
  slug: "chamonix-morzine-or-les-gets-from-geneva",
  titre: "Chamonix, Morzine or Les Gets from Geneva: which valley for your week?",
  metaTitre: "Chamonix, Morzine or Les Gets from Geneva?",
  metaDescription:
    "Drive times from Geneva airport, the roads, the character of each valley and the transfer details that matter when choosing Chamonix, Morzine or Les Gets.",
  chapo:
    "Chamonix, Morzine and Les Gets are the three names most people weigh up when they land in Geneva, and all three are less than an hour and a half away. They are not three versions of the same holiday. Here is how the drives compare, where the roads split, what each valley is really like for a week, and the transfer details that decide how smoothly you arrive.",
  datePublication: "2026-09-15",
  auteur: "Alps Ski Transfers",
  // Brouillon : l’analyse SERP du 14/09/2026 (docs/concurrence/) montre que ce format ne se classe pas face aux pages concernées — gardé, non publié.
  brouillon: true,
  visuel: {
    nom: "station-morzine",
    alt: "Snow-covered Alpine village and wooded slopes in the northern French Alps",
  },

  aRetenir: [
    "From Geneva airport, Les Gets is 69 km and about 1 h 19 away, Chamonix 91 km and about 1 h 25, and Morzine 77 km and about 1 h 29, on clear roads.",
    "All three share the A40 motorway out of Geneva; Les Gets and Morzine leave it at Cluses and climb over the col des Gets, while Chamonix continues to Le Fayet and up a valley road with no col.",
    "Les Gets and Morzine are lift-linked and part of the Portes du Soleil, twelve resorts on one pass across the French-Swiss border; Chamonix’s ski areas are separate sectors spread along its valley.",
    "On a February Saturday, allow 45 minutes to an hour more for any of the three: the A40 is the shared bottleneck.",
    "If Geneva has no suitable flight, Chambéry is the next quickest airport for all three: Les Gets 1 h 34, Chamonix 1 h 40, Morzine 1 h 44.",
  ],

  stationsLiees: ["chamonix", "morzine", "les-gets", "avoriaz", "argentiere", "champery", "saint-gervais"],

  trajetsLies: [
    { airport: "geneva-airport", resort: "chamonix" },
    { airport: "geneva-airport", resort: "morzine" },
    { airport: "geneva-airport", resort: "les-gets" },
    { airport: "geneva-airport", resort: "avoriaz" },
    { airport: "geneva-airport", resort: "argentiere" },
    { airport: "chambery-savoie-airport", resort: "chamonix" },
    { airport: "lyon-airport", resort: "morzine" },
    { airport: "lyon-airport", resort: "les-gets" },
  ],

  contenu: [
    {
      type: "paragraphe",
      texte:
        "From Geneva airport, Les Gets is the quickest of the three at 69 km and about 1 h 19 on a clear road, Chamonix takes about 1 h 25 for 91 km, and Morzine about 1 h 29 for 77 km. Les Gets and Morzine sit either side of the same col and share a lift system in the Portes du Soleil, twelve linked resorts across the French-Swiss border, with tree-lined skiing at modest altitude — the natural choice for families, mixed groups and anyone who wants miles of pistes from the door. Chamonix is a mountain town under Mont Blanc, with separate ski sectors along its valley and some of the most demanding high terrain in the Alps — the choice for strong skiers, off-piste and non-skiers who want more than a resort. All three are served by the same A40 motorway out of Geneva, and on a February Saturday all three need the same extra 45 minutes to an hour.",
    },
    {
      type: "paragraphe",
      texte:
        "The times in this article are measured on the road network from the airport to the centre of each resort, without traffic. They are what a driver holds on a quiet weekday; the Saturday section below explains how they change.",
    },

    { type: "titre2", texte: "How long is the drive from Geneva to Chamonix, Morzine and Les Gets?" },
    {
      type: "liste",
      items: [
        "Les Gets — 69 km, about 1 h 19.",
        "Chamonix — 91 km, about 1 h 25.",
        "Morzine — 77 km, about 1 h 29.",
        "Avoriaz, above Morzine — 89 km, about 1 h 45.",
        "Argentière, up the Chamonix valley — 100 km, about 1 h 37.",
      ],
    },
    {
      type: "paragraphe",
      texte:
        "Two things in that list are worth noticing. Chamonix is the furthest of the three and not the slowest, because almost all of its route is motorway. And the resort you name matters less than the village you actually stay in: Avoriaz adds a quarter of an hour to Morzine, Argentière twelve minutes to Chamonix. When you compare, compare the address, not the name on the lift pass.",
    },

    { type: "titre2", texte: "Two routes out of Geneva: where the roads split" },
    {
      type: "paragraphe",
      texte:
        "All three transfers begin the same way. From the airport, the motorway skirts Geneva, crosses into France and joins the A40, which runs south-east along the Arve valley towards Mont Blanc. For the first stretch there is no difference at all between a Chamonix transfer and a Morzine one.",
    },
    {
      type: "paragraphe",
      texte:
        "The roads split at Cluses. For Les Gets and Morzine, the transfer leaves the motorway there and climbs steadily to Taninges, then over the col des Gets. Les Gets sits on the col itself, at 1,172 m, about 20 km after the motorway exit; Morzine is on the far side, down into the Vallée d’Aulps. It is a main road, cleared and gritted through the season, but it is a climb, and it is exposed to snowfall.",
    },
    {
      type: "paragraphe",
      texte:
        "For Chamonix, the transfer stays on the A40 past Sallanches to Le Fayet, at the foot of Saint-Gervais, and then follows the valley road up through Les Houches to Chamonix. There is no col on the way. That valley road serves the whole Chamonix valley and the Mont Blanc tunnel, and it is cleared around the clock in season: snow slows it, and it rarely stops it.",
    },
    {
      type: "paragraphe",
      texte:
        "In practice, this means the Chamonix drive is the more predictable of the two in fresh snow, while the Les Gets drive is the shorter on a clear day. Winter tyres or chains are legally required in Haute-Savoie from 1 November to 31 March, on both routes, and our vehicles carry both.",
    },

    { type: "titre2", texte: "Les Gets: the short transfer and a village on the col" },
    {
      type: "paragraphe",
      texte:
        "Les Gets is the first proper ski resort you meet coming out of Geneva, and at 1 h 19 the transfer is short enough to make a morning flight worth taking: land at midday and you can be on the snow by mid-afternoon. It is a working village rather than a purpose-built station — wooden chalets, a church, shops that stay open outside the season.",
    },
    {
      type: "liste",
      items: [
        "Village at 1,172 m, with skiing to 2,002 m on two sides of the valley: the Chavannes side, lift-linked to Morzine, and Mont Chéry opposite, where locals go when Chavannes is busy.",
        "Part of the Portes du Soleil, twelve resorts on one lift pass either side of the Swiss border.",
        "Much of the skiing is among the trees, which helps visibility on grey days.",
        "A village scale that suits families and mixed-ability groups.",
        "One of the best-known mountain bike destinations in the Alps in summer, which keeps the lifts and the village alive year-round.",
      ],
    },
    {
      type: "paragraphe",
      texte:
        "The limitation is altitude. A village at 1,172 m and a top station at 2,002 m is plenty in a normal winter, and it is the reason the skiing is so pleasant among the trees; it also means the lower slopes depend more on the season than those of a resort at 1,800 m.",
    },

    { type: "titre2", texte: "Morzine: a valley town with the Portes du Soleil above it" },
    {
      type: "paragraphe",
      texte:
        "Morzine is a town before it is a resort: a real centre, a river, and a busy street life in the evening. It is known for its après-ski and for its lower-altitude, tree-lined runs, which make it a sound choice for families and for groups who want the evenings to count as much as the days.",
    },
    {
      type: "liste",
      items: [
        "Lift-linked to Les Gets on one side and to Avoriaz on the other, and through Avoriaz to Champéry in Switzerland and the rest of the Portes du Soleil.",
        "Avoriaz, at 1,800 m, is the high, snow-sure part of the same system — reached from Morzine by road or by the Prodains cable car.",
        "A wide choice of chalets and hotels in the town and its surrounding hamlets, which makes the exact address important when you book.",
        "About ten minutes more in the vehicle than Les Gets, because the road continues over the col and down the other side.",
      ],
    },
    {
      type: "paragraphe",
      texte:
        "Morzine’s great practical advantage is the choice it gives within one lift pass: stay in the town for the evenings, ski up to Avoriaz for the altitude, or across to Les Gets for a quieter day. If you want the altitude every morning instead, stay in Avoriaz itself — but know that it is a car-free resort. The road ends at the car park on its edge, and the last stretch to your accommodation is by horse-drawn sledge or snowcat taxi. Book that last leg with your accommodation in advance, particularly for a late arrival.",
    },

    { type: "titre2", texte: "Chamonix: a mountain town, not a ski resort" },
    {
      type: "paragraphe",
      texte:
        "Chamonix sits at the foot of Mont Blanc, the highest summit in western Europe, and it is not organised like a ski resort at all. It is a town of its own, with a valley of villages strung out either side of it, and the skiing comes in separate sectors along that valley rather than in one linked area.",
    },
    {
      type: "liste",
      items: [
        "Over 150 km of piste across the valley lift pass: Les Houches, Brévent-Flégère above the town, the Grands Montets above Argentière, and Balme at Le Tour.",
        "The Grands Montets rise to 3,275 m, and are the reason for the valley’s reputation for steep, high, off-piste terrain.",
        "The Aiguille du Midi cable car and the Vallée Blanche, one of the longest off-piste descents in the world — a day for a guide, not for guesswork.",
        "Le Tour and Vallorcine, at the head of the valley, are the sunnier and gentler end of the same pass.",
        "A full town for non-skiers and bad-weather days: shops, restaurants, ice climbing, snowshoeing, and Italy through the Mont Blanc tunnel.",
      ],
    },
    {
      type: "paragraphe",
      texte:
        "The price of that variety is movement. Because the sectors are not linked by lift, a Chamonix week involves the valley bus or train between them, and your choice of base shapes your days: Argentière for the Grands Montets, the town for Brévent-Flégère and the evenings, Les Houches for the tree-lined skiing at the valley entrance. The Chamonix valley is not car-free, whatever a few booking sites imply, and every village in it is served by the road.",
    },

    { type: "titre2", texte: "Which valley suits which kind of week?" },
    {
      type: "liste",
      items: [
        "A first ski holiday, or young children: Les Gets. The shortest transfer, a village atmosphere, and a large amount of easy and intermediate terrain on one pass.",
        "A mixed group with some keen skiers and some who want the evenings: Morzine, with Avoriaz above for the stronger skiers and the whole Portes du Soleil in reach.",
        "Strong skiers, off-piste, ski touring: Chamonix, and Argentière in particular.",
        "Non-skiers in the party: Chamonix, which works as a destination in itself, or Morzine, a town with plenty to do beyond the slopes.",
        "Snow reliability at the door: none of the three villages is high; Avoriaz, at 1,800 m, is the high base of the Portes du Soleil, and the Grands Montets the high ground of the Chamonix valley.",
        "A long weekend: Les Gets, where a morning landing still leaves an afternoon on the snow — or Chamonix, whose motorway route keeps the drive short.",
        "Poor-visibility days: the tree-lined runs of Les Gets and Morzine, or Les Houches in the Chamonix valley.",
      ],
    },
    {
      type: "paragraphe",
      texte:
        "What none of the three can offer is the linked, high-altitude purpose-built skiing of the Tarentaise. If that is what the group really wants, it is a different airport question altogether: the Three Valleys are more than two hours from Geneva, and closer to Chambéry.",
    },

    { type: "titre2", texte: "What does Saturday do to these transfers?" },
    {
      type: "paragraphe",
      texte:
        "Saturday is changeover day across the northern French Alps, and the A40 between Geneva, Cluses and Sallanches is the artery for the Portes du Soleil and the Mont Blanc valley alike. On a Saturday morning in February it slows badly, and the queue for Les Gets and Morzine starts well before the climb from Cluses. Allow 45 minutes to an hour more than the times above, whichever of the three you are going to.",
    },
    {
      type: "paragraphe",
      texte:
        "Because the bottleneck is shared, Saturday does not change the order between the three: it lengthens all of them. What does help is avoiding it. Geneva flies every day of the week from most European cities, and a midweek arrival usually runs to the clear-road times — which, over a return trip, is up to two hours regained. Midweek flights and accommodation are often cheaper as well.",
    },
    {
      type: "paragraphe",
      texte:
        "The same applies on the way home. The Saturday that brings the new week up the valley takes the previous week down it, and when you give us your return flight, the pick-up in resort is set from it with the road down in mind.",
    },

    { type: "titre2", texte: "Transfer practicalities: addresses, luggage and children" },
    {
      type: "paragraphe",
      texte:
        "All three resorts spread well beyond their centres, and the most useful thing you can do when booking is give the full address of your accommodation rather than the name of the resort.",
    },
    {
      type: "liste",
      items: [
        "Morzine or Avoriaz: they share a lift system and are completely different arrivals. Avoriaz ends at the car park, with a sledge or snowcat for the last leg.",
        "Chamonix: Les Houches, Chamonix town, Les Praz, Argentière and Le Tour are all “Chamonix” to a lift pass and several kilometres apart on the road.",
        "Les Gets: chalets on the Mont Chéry side and around the col are reached by different lanes from the centre.",
        "Ski and snowboard bags travel at no extra charge; declare how many you are bringing, along with boot bags and anything bulky such as a pushchair or a splitboard.",
        "The vehicle is chosen for the luggage as well as the passengers. The Standard Transporter takes up to eight passengers, the Business V-Class up to seven, the Premium saloon up to four — and in winter the boot fills before the seats do.",
        "Child and booster seats are free and fitted before the driver leaves for the airport; in France, an approved restraint is required for every child under 10. Give the ages when you book.",
      ],
    },
    {
      type: "paragraphe",
      texte:
        "At Geneva, your driver meets you in arrivals with your name, on the Swiss or French side of the airport depending on your flight; your confirmation says which. The flight is tracked, so a late landing moves the pick-up at no extra cost, and one hour of waiting is included, counted from the actual landing time. The price is fixed per vehicle before you book, with tolls included, so a group of six pays what a couple pays.",
    },

    { type: "titre2", texte: "What if Geneva is not your airport?" },
    {
      type: "paragraphe",
      texte:
        "Geneva is the natural airport for all three resorts, but not the only one. If the flights or fares do not work, here is how the alternatives compare, on clear roads.",
    },
    {
      type: "liste",
      items: [
        "Chambéry — Les Gets 1 h 34, Chamonix 1 h 40, Morzine 1 h 44. About a quarter of an hour more than Geneva for each, with a winter timetable concentrated at weekends.",
        "Lyon — Les Gets 2 h 23, Chamonix 2 h 30, Morzine 2 h 34. About an hour more, but flights all year and all week, and often cheaper in February.",
        "Grenoble — Les Gets 2 h 21, Chamonix 2 h 28, Morzine 2 h 32. Weekend charters, and a similar drive to Lyon.",
        "Annecy — Les Gets 1 h 04, Chamonix 1 h 10, Morzine 1 h 14. The shortest drives of all, from an airport with very few scheduled winter flights. Worth checking, rarely worth planning around.",
      ],
    },
    {
      type: "paragraphe",
      texte:
        "Chambéry is the one worth a real look. For a Saturday-to-Saturday week, a charter from your city into Chambéry may land at a better hour or for a lower fare than the Geneva flights, and fifteen minutes more in the vehicle is a small price for either.",
    },

    { type: "titre2", texte: "Can you stay in one and ski the others?" },
    {
      type: "paragraphe",
      texte:
        "Between Les Gets and Morzine, yes, and without a vehicle: they are lift-linked, and the Portes du Soleil pass takes you on to Avoriaz and into Switzerland at Champéry. Between the Portes du Soleil and Chamonix, no. They are different valleys, reached by different branches of the motorway, and a day in Chamonix from Morzine is a return journey by road rather than a lift ride.",
    },
    {
      type: "paragraphe",
      texte:
        "If your party is splitting its week — a few days in Chamonix, a few in Morzine — or needs a journey that is not an airport run, a resort-to-resort transfer can be arranged through a special inquiry. For a single airport transfer each way, the booking form is quicker: it gives you the price straight away, and the choice of valley is the only hard decision left.",
    },
  ],

  faq: [
    {
      question: "Which is closest to Geneva airport: Chamonix, Morzine or Les Gets?",
      reponse:
        "Les Gets, at 69 km and about 1 h 19 without traffic. Chamonix takes about 1 h 25 for 91 km, mostly motorway, and Morzine about 1 h 29 for 77 km, over the col des Gets.",
    },
    {
      question: "Is Chamonix or Morzine better for beginners?",
      reponse:
        "Morzine and Les Gets usually suit beginners and mixed groups better: lower, tree-lined runs on one linked lift system. Chamonix’s sectors are separate and known for demanding high terrain, though Les Houches and Le Tour have gentler skiing.",
    },
    {
      question: "Are Morzine and Les Gets connected?",
      reponse:
        "Yes. They are lift-linked, and both are part of the Portes du Soleil, twelve resorts on one pass either side of the French-Swiss border, including Avoriaz and Champéry.",
    },
    {
      question: "Can you drive into Avoriaz?",
      reponse:
        "Only to the car park at the edge of the resort. Avoriaz is car-free: the last leg to your accommodation is by horse-drawn sledge or snowcat taxi, best booked with your accommodation in advance.",
    },
    {
      question: "How much longer is the transfer on a Saturday?",
      reponse:
        "Allow 45 minutes to an hour more in February for all three resorts. They share the A40 out of Geneva, which is the bottleneck on changeover Saturdays.",
    },
    {
      question: "Which airport is the best alternative to Geneva for these resorts?",
      reponse:
        "Chambéry, about fifteen minutes further for each: Les Gets 1 h 34, Chamonix 1 h 40, Morzine 1 h 44. Its winter flights are concentrated at weekends; Lyon, about an hour further, flies all week.",
    },
  ],
};
