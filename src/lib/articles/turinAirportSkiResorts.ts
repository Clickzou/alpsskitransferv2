import type { Article } from "./types";

/**
 * Turin pour la Voie Lactée, Cervinia et le Monterosa.
 *
 * Distances et durées : `src/data/distances.ts` (routage OpenStreetMap, sans
 * trafic). Les faits de station — altitudes, vallées, montées finales — viennent
 * des pages de station et de la version italienne des articles existants.
 *
 * **À vérifier** : les pages Serre Chevalier et le hub de Grenoble font passer
 * le trajet Turin → Serre Chevalier « par le tunnel du Fréjus ». Les 131 km de
 * la table correspondent plutôt au col de Montgenèvre puis Briançon. Faute de
 * certitude, cet article ne nomme pas l'itinéraire : il dit seulement qu'il
 * évite le Lautaret, ce qui est vrai dans les deux cas.
 */
export const turinAirportSkiResorts: Article = {
  slug: "turin-airport-ski-resorts-milky-way-cervinia",
  titre: "Flying into Turin for the Milky Way, Cervinia and Monterosa",
  metaTitre: "Turin Airport Ski Transfers: Milky Way and Cervinia",
  metaDescription:
    "Sauze d’Oulx, Sestriere, Montgenèvre, Serre Chevalier, Cervinia, Champoluc and Gressoney: real drive times from Turin, compared with Geneva and Milan.",
  chapo:
    "Turin is the airport most skiers outside Piedmont never consider, and for a long list of resorts it is the closest one by a wide margin. It serves the Milky Way on the French-Italian border, the Monterosa valleys and Cervinia, and two French resorts that most people assume are reached from France. Here are the measured drive times from Turin, how they compare with Geneva, Milan Malpensa and the French airports, and the few resorts where Turin is not the answer.",
  visuel: { nom: "blog-turin-airport-ski-resorts", alt: "Sunny Italian Alpine valley with a hairpin road leading to a mountain village" },
  datePublication: "2026-09-15",
  auteur: "Alps Ski Transfers",

  aRetenir: [
    "Turin is the closest airport to the Milky Way ski area: Sauze d’Oulx is 91 km away (about 1 h 25), Sestriere 107 km (1 h 38) and Montgenèvre 105 km (1 h 40).",
    "For Serre Chevalier, Turin (131 km, about 2 h 45) is quicker than Grenoble (155 km, 2 h 57) and its route avoids the Col du Lautaret, which can close for a few hours after heavy snow.",
    "Cervinia is 121 km and about 1 h 42 from Turin airport, against 2 h 20 from Milan Malpensa and just over 3 hours from Geneva.",
    "Champoluc (109 km, 1 h 31) and Gressoney (108 km, 1 h 41) are both closer to Turin than to any other airport; from Milan Malpensa each is more than two hours away.",
    "Turin is not the quickest airport for Courmayeur, which is 1 h 36 from Geneva through the Mont Blanc tunnel against 1 h 59 from Turin, nor for Alagna Valsesia, 1 h 51 from Malpensa.",
  ],

  stationsLiees: [
    "sauze-doulx",
    "sestriere",
    "montgenevre",
    "serre-chevalier",
    "cervinia",
    "champoluc",
    "gressoney",
    "courmayeur",
    "alagna-valsesia",
  ],

  trajetsLies: [
    { airport: "turin-airport", resort: "sauze-doulx" },
    { airport: "turin-airport", resort: "sestriere" },
    { airport: "turin-airport", resort: "montgenevre" },
    { airport: "turin-airport", resort: "serre-chevalier" },
    { airport: "turin-airport", resort: "cervinia" },
    { airport: "turin-airport", resort: "champoluc" },
    { airport: "turin-airport", resort: "gressoney" },
    { airport: "turin-airport", resort: "courmayeur" },
  ],

  contenu: [
    {
      type: "paragraphe",
      texte:
        "Turin is the closest airport to the whole Milky Way and to the southern valleys of Monte Rosa. Sauze d’Oulx is 91 km away, about 1 h 25 on a clear road; Sestriere 107 km (1 h 38); Montgenèvre, just across the border in France, 105 km (1 h 40). Towards the Aosta valley, Champoluc is 109 km (1 h 31), Gressoney 108 km (1 h 41) and Cervinia 121 km (1 h 42). Serre Chevalier, at 131 km and about 2 h 45, is the one long transfer, and it is still quicker than from Grenoble. Against the obvious alternatives the gap is wide: Sestriere is 3 h 11 from Geneva, and Cervinia 2 h 20 from Milan Malpensa and just over three hours from Geneva. Turin loses only at the edges of its area: Courmayeur is quicker from Geneva, Alagna from Malpensa. If your resort is on the Milky Way or in the Ayas, Lys or Valtournenche valleys, check Turin’s flights before anything else.",
    },

    { type: "titre2", texte: "Why is Turin so well placed for skiing?" },
    {
      type: "paragraphe",
      texte:
        "Turin sits at the foot of the western Alps, and two motorways leave it in exactly the directions skiers need. One runs west up the Susa valley to Oulx, the junction for the Milky Way resorts and the border at Montgenèvre. The other runs north towards the Aosta valley, with exits at Pont-Saint-Martin for the Lys valley, at Verrès for the Val d’Ayas and further up for Cervinia.",
    },
    {
      type: "paragraphe",
      texte:
        "Neither route crosses a high pass before the final climb to the resort. That is the whole advantage. From the French airports, the same resorts sit behind the Col du Lautaret or a long run through the Maurienne; from Geneva, behind the Mont Blanc tunnel and the length of the Aosta valley; from Milan, behind an extra sixty kilometres or more of motorway.",
    },
    {
      type: "paragraphe",
      texte:
        "Winter flights into Turin from the UK and northern Europe are frequent through the season, and fares are often lower than at the French airports for the same weekend. Your driver meets you in arrivals with your name and follows your flight, so a late landing moves the pick-up at no extra cost.",
    },

    { type: "titre2", texte: "How long is the transfer from Turin to the Milky Way resorts?" },
    {
      type: "paragraphe",
      texte:
        "The Milky Way — Via Lattea in Italian, Voie Lactée in French — is around 400 km of linked piste shared by Sauze d’Oulx, Sestriere, Sansicario, Cesana, Claviere and Montgenèvre. All of its resorts are reached from the Susa valley motorway, and all are well under two hours from Turin on a clear road:",
    },
    {
      type: "liste",
      items: [
        "Sauze d’Oulx — 91 km, about 1 h 25. The resort sits at around 1,500 m above Oulx; Oulx railway station is about fifteen minutes below by road.",
        "Sestriere — 107 km, about 1 h 38. The village sits at 2,035 m, at the top of its own climb from the valley.",
        "Montgenèvre — 105 km, about 1 h 40. Motorway to Oulx, then the climb through Cesana and Claviere to the col, where the village sits at 1,860 m on the border.",
      ],
    },
    {
      type: "paragraphe",
      texte:
        "The alternatives are all slower, and most are much slower. Chambéry is the nearest of the French airports, at 1 h 53 to Sauze d’Oulx, 2 h 05 to Sestriere and 2 h 07 to Montgenèvre; with its Saturday charters from the UK it is worth comparing for a weekend-to-weekend week. After that the gaps open up. Milan Malpensa is 2 h 36 from Sauze d’Oulx and 2 h 49 from Sestriere. Lyon is 2 h 45 and 2 h 58. Geneva is 2 h 58 to Sauze d’Oulx, 3 h 11 to Sestriere and 3 h 12 to Montgenèvre.",
    },
    {
      type: "paragraphe",
      texte:
        "The road from Oulx up to Sauze d’Oulx is steep and narrow when it snows, and the climb to Sestriere is a genuine mountain road. Both are main routes, cleared through the season, but they are where the time goes on a bad day.",
    },

    { type: "titre2", texte: "Is Turin really the best airport for Montgenèvre and Serre Chevalier?" },
    {
      type: "paragraphe",
      texte:
        "Yes, and it is the comparison that surprises British skiers most. Both resorts are in France, and both are closer in time to Turin than to any French airport.",
    },
    { type: "titre3", texte: "Montgenèvre" },
    {
      type: "paragraphe",
      texte:
        "Turin is 105 km away, about 1 h 40. Chambéry, the nearest French airport, is 156 km and 2 h 07; Grenoble is 170 km and 2 h 40, over the Col du Lautaret at 2,058 m. The Italian approach is a valley climb to the col at the village itself, with no tunnel and no long detour. The col is the highest point of the drive from Turin and the road is kept open through the season.",
    },
    { type: "titre3", texte: "Serre Chevalier" },
    {
      type: "paragraphe",
      texte:
        "Turin is 131 km away, about 2 h 45. Grenoble is 155 km and 2 h 57; Lyon 204 km and 3 h 29; Geneva 247 km and 3 h 56. The French routes from Grenoble and Lyon cross the Col du Lautaret, which is kept open in winter but closes for a few hours at a time during heavy snowfall or avalanche control; when it does, the detour is long. The route from Turin avoids the Lautaret altogether, which is one reason it is often the more dependable arrival in a storm.",
    },
    {
      type: "paragraphe",
      texte:
        "Serre Chevalier is four villages strung along 15 km of the Guisane valley — Briançon, Chantemerle, Villeneuve and Le Monêtier-les-Bains — so the exact address matters more than usual. Briançon is 12 km down the French side from Montgenèvre, on the same road.",
    },
    {
      type: "paragraphe",
      texte:
        "Montgenèvre and Serre Chevalier also share a practical question that is easier to settle before you land: the lift pass. In Montgenèvre the choice is between the local area, the whole Voie Lactée across the border, or the Grand Serre Che. It does not change the transfer, but it does change where you want to be based, and therefore which address the driver takes you to.",
    },

    { type: "titre2", texte: "Is Turin or Milan better for Cervinia?" },
    {
      type: "paragraphe",
      texte:
        "Turin, by a little under forty minutes. Cervinia is 121 km and about 1 h 42 from Turin, against 181 km and about 2 h 20 from Milan Malpensa. Geneva is 197 km and 3 h 02, through the Mont Blanc tunnel and down the Aosta valley.",
    },
    {
      type: "paragraphe",
      texte:
        "The last part of the drive is the same from every airport: the climb from Châtillon, in the Aosta valley, up the Valtournenche to Breuil-Cervinia at 2,050 m. That climb is 27 km of hairpins, the slow part of the journey, and the part that counts after a snowfall. The resort centre is largely pedestrian and traffic is regulated, so give us the name of your hotel or residence: the last few metres are on foot with the luggage.",
    },
    {
      type: "paragraphe",
      texte:
        "Malpensa still earns its place in the comparison. It is northern Italy’s largest airport, with flights from far more cities, and a direct international flight into Malpensa usually beats a connection to reach Turin. If you have the choice between two direct flights, Turin is closer.",
    },
    {
      type: "paragraphe",
      texte:
        "One thing to know if you are tempted by the link with Zermatt: Cervinia and Zermatt share a ski area across the border, but not a road. Crossing on skis takes a morning; crossing by road takes around four hours.",
    },

    { type: "titre2", texte: "How long is the transfer from Turin to Champoluc and Gressoney?" },
    {
      type: "paragraphe",
      texte:
        "Champoluc and Gressoney are two of the three valleys of Monterosa Ski, around 180 km of piste linked by lifts beneath Monte Rosa. Both are reached by the Aosta valley motorway and a side road of about 30 km.",
    },
    {
      type: "liste",
      items: [
        "Champoluc — 109 km, about 1 h 31. Motorway north to Verrès, then 30 km up the Val d’Ayas to the village at 1,570 m.",
        "Gressoney — 108 km, about 1 h 41. Motorway to Pont-Saint-Martin, then some 30 km up the Lys valley. Gressoney-Saint-Jean is at 1,385 m; Gressoney-La-Trinité, 8 km higher at 1,635 m, is at the foot of the Monterosa lifts.",
      ],
    },
    {
      type: "paragraphe",
      texte:
        "From Milan Malpensa, Champoluc is 169 km and 2 h 10 and Gressoney 168 km and 2 h 19. From Geneva, through the Mont Blanc tunnel, Champoluc is 3 h 06 and Gressoney 3 h 30.",
    },
    {
      type: "paragraphe",
      texte:
        "In Gressoney, the choice of village matters more than the choice of airport. Saint-Jean is the larger village, with more shops and a lake at its edge, but only a small local ski area. La Trinité is smaller and sits at the foot of the lifts into the linked Monterosa system. If you are there to ski the three valleys, La Trinité is where you want to wake up. Either way, both valleys have fewer beds than the size of the ski area suggests, so book accommodation and transfer together, as early as you can.",
    },
    {
      type: "paragraphe",
      texte:
        "The three Monterosa valleys are linked on skis but not by road. Moving from one to another by vehicle means going back down to the Aosta valley and up again, a good hour and a half. If you arrive in one valley and leave from another, tell us when you book: it is a different journey, not a small change.",
    },

    { type: "titre2", texte: "Which resorts are better reached from another airport?" },
    {
      type: "paragraphe",
      texte:
        "Turin covers a wide area, but not everything in north-western Italy is closest to it. Four cases are worth knowing before you book a flight:",
    },
    {
      type: "liste",
      items: [
        "Courmayeur — Geneva is quicker: 102 km and 1 h 36 through the Mont Blanc tunnel, against 158 km and 1 h 59 from Turin.",
        "La Thuile — close to a draw: 2 h 33 from Geneva, 2 h 36 from Turin. Let the flight decide.",
        "Alagna Valsesia — Milan Malpensa is quicker: 110 km and 1 h 51, against 170 km and 2 h 22 from Turin.",
        "The Tarentaise and the Oisans — Turin is the long way round: Val Thorens is 3 h 27 through the Fréjus tunnel, Les Deux Alpes 2 h 56 and Alpe d’Huez 3 h 15, all far slower than from Chambéry or Grenoble.",
      ],
    },

    { type: "titre2", texte: "Do you need a passport, and are tunnel tolls included?" },
    {
      type: "paragraphe",
      texte:
        "France, Italy and Switzerland are all in the Schengen area, so there is no routine border check on the way to Montgenèvre, Serre Chevalier or from Geneva into the Aosta valley. Carry a passport or identity card all the same: spot checks happen at the tunnels and on the border roads, and you will need it for your flight home.",
    },
    {
      type: "paragraphe",
      texte:
        "Tolls are not a detail on these routes. The Fréjus and Mont Blanc tunnels each cost a serious sum for a minibus, and Italian motorways are paid at the barrier. All of them are included in the price we quote before you book, along with ski bags and child seats. When you compare two quotes, check that both include them.",
    },
    {
      type: "paragraphe",
      texte:
        "Our vehicles are insured and equipped for both countries. Italy requires winter tyres or chains on board on Alpine roads from mid-November to mid-April, and the Hautes-Alpes from 1 November to 31 March; we carry both all season.",
    },

    { type: "titre2", texte: "How much longer does it take on a Saturday?" },
    {
      type: "paragraphe",
      texte:
        "Every time above is a clear-road figure. On a February Saturday the Alps change guests on the same morning, and the roads that matter here — the Fréjus motorway up the Susa valley, the climb up the Valtournenche to Cervinia — slow down. Allow forty minutes to an hour more, whichever airport you use.",
    },
    {
      type: "paragraphe",
      texte:
        "A Sunday or midweek arrival avoids most of it. If your dates are fixed to Saturday, a morning flight into Turin still leaves time to reach any Milky Way resort before dark, which is worth more than any saving on the fare.",
    },

    { type: "titre2", texte: "Which vehicle, and what to tell us?" },
    {
      type: "paragraphe",
      texte:
        "Every transfer is private, with a price fixed per vehicle before you book: a group of six pays for one vehicle, not six seats. The Standard, a Volkswagen Transporter, takes up to 8 passengers; the Business, a Mercedes V-Class, up to 7; the Premium, a Mercedes E-Class saloon, up to 4. In winter the boot decides before the seats do, so tell us how many suitcases and ski or board bags you have — and declare touring or freeride kit if you are heading for Monterosa, which attracts plenty of it.",
    },
    {
      type: "paragraphe",
      texte:
        "Give us the exact address: the village in Serre Chevalier, Saint-Jean or La Trinité in Gressoney, the hotel in Cervinia. Child and booster seats are free and fitted before departure. Book once your flights are confirmed; cross-border vehicles are among the first to go for the February half-terms.",
    },

    { type: "titre2", texte: "The short version" },
    {
      type: "liste",
      items: [
        "Sauze d’Oulx, Sestriere, Montgenèvre — Turin, 1 h 25 to 1 h 40.",
        "Serre Chevalier — Turin, about 2 h 45, ahead of Grenoble (2 h 57) and clear of the Lautaret.",
        "Cervinia — Turin (1 h 42); Malpensa (2 h 20) if the direct flight is there.",
        "Champoluc and Gressoney — Turin, 1 h 31 and 1 h 41.",
        "Courmayeur — Geneva (1 h 36); La Thuile — Geneva or Turin; Alagna — Malpensa.",
        "Saturday in February — add forty minutes to an hour.",
      ],
    },
  ],

  faq: [
    {
      question: "Which airport is closest to Sestriere?",
      reponse:
        "Turin: 107 km and about 1 h 38 without traffic. Chambéry is the nearest French airport at 2 h 05, and Geneva is 3 h 11 away.",
    },
    {
      question: "Is Turin or Milan Malpensa better for Cervinia?",
      reponse:
        "Turin is closer: 121 km and about 1 h 42, against 181 km and 2 h 20 from Malpensa. Malpensa makes sense when it has a direct flight and Turin would mean a connection.",
    },
    {
      question: "Is Turin really the closest airport to Serre Chevalier?",
      reponse:
        "Yes, on driving time: about 2 h 45 for 131 km, against 2 h 57 from Grenoble and 3 h 29 from Lyon. The Turin route also avoids the Col du Lautaret, which can close for a few hours after heavy snow.",
    },
    {
      question: "Do we need a passport for a transfer from Turin to a French resort?",
      reponse:
        "There is no routine border check between Italy and France within the Schengen area. Carry a passport or identity card anyway: spot checks happen, and you need it for the flight home.",
    },
    {
      question: "Are tunnel and motorway tolls included in the price?",
      reponse:
        "Yes. The Fréjus and Mont Blanc tunnels and all motorway tolls are included in the fixed price quoted before you book.",
    },
    {
      question: "Can we arrive in Gressoney and leave from Champoluc?",
      reponse:
        "Yes, but tell us when you book. The Monterosa valleys are linked on skis, not by road, so moving between them by vehicle means going down to the Aosta valley and back up — a different journey of a good hour and a half.",
    },
  ],
};
