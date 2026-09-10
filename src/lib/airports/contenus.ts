import type { BlocContenu, Faq } from "@/lib/resorts/types";

/**
 * Contenu rédigé des hubs d'aéroport — **en anglais**, comme tout le silo racine.
 *
 * Constat du 8 septembre 2026 : les 31 hubs d'aéroport étaient des pages
 * entièrement tabulaires — un titre, une phrase générée, un tableau de dessertes.
 * C'est peu pour des pages qui reçoivent 31 redirections et visent des requêtes
 * comme « geneva airport ski transfers ».
 *
 * L'analyse des 91 pages `/destination/` du WordPress
 * (`scripts/analyser-destination.mjs`) a montré qu'il n'y avait rien à y reprendre :
 * 250 mots de texte générique par page, et des chiffres faux — « Chamonix, 1 hour »
 * quand la route en demande 1 h 25. Ce contenu-ci est donc écrit, et ses durées
 * viennent de `src/data/distances.ts`.
 *
 * Un aéroport sans entrée ici garde sa page : elle affiche son tableau de
 * dessertes, qui reste utile. Le contenu s'ajoute, il ne conditionne pas la page.
 */
export interface ContenuAeroport {
  /** Réponse directe, sous le H1. Remplace la phrase générée. */
  chapo: string;
  contenu: BlocContenu[];
  faq: Faq[];
}

export const CONTENUS_AEROPORTS: Record<string, ContenuAeroport> = {
  "geneva-airport": {
    chapo:
      "Geneva is the first gateway to the Alps: flights every day of the week from most European cities, and a motorway that reaches the nearest resorts in about an hour. Les Gets is 69 km away (1 h 20), Chamonix 91 km (1 h 25), Val Thorens 161 km (2 h 45). We drive from both sides of the airport — Swiss and French — at a price fixed per vehicle, ski bags and child seats included.",
    contenu: [
      { type: "titre2", texte: "Meeting your driver at Geneva" },
      {
        type: "paragraphe",
        texte:
          "Geneva airport has two exits: the Swiss sector, which handles almost every flight, and the French sector, connected to Ferney-Voltaire. Your driver waits in arrivals with your name, on the side stated in your confirmation. If your flight is diverted or badly delayed, they know before you do: the flight is tracked and waiting time is included.",
      },
      { type: "titre2", texte: "The Saturday problem, and how to avoid it" },
      {
        type: "paragraphe",
        texte:
          "Geneva funnels an entire season through one morning a week: Saturday. The two roads that matter — the A40 towards Chamonix and the Tarentaise towards Moûtiers — slow badly, and you should allow 45 minutes to an hour more than the times below. A midweek arrival saves that hour in each direction, and usually saves money on the fare too.",
      },
      { type: "titre2", texte: "What Geneva serves best" },
      {
        type: "liste",
        items: [
          "The Chablais and the Portes du Soleil: Les Gets, Morzine, Avoriaz, Châtel — 1 h 15 to 1 h 45.",
          "The Grand Massif: Samoëns, Les Carroz, Flaine — 1 h 10 to 1 h 30.",
          "The Mont Blanc valley: Saint-Gervais, Megève, Chamonix, Argentière — 1 h 15 to 1 h 40.",
          "The Aravis: La Clusaz and Le Grand-Bornand, a little over an hour.",
          "The Tarentaise and the Three Valleys, further out: 2 h 25 to 3 h 15 depending on the resort.",
        ],
      },
      { type: "titre2", texte: "Winter driving out of Geneva" },
      {
        type: "paragraphe",
        texte:
          "The roads leaving Geneva climb quickly. Winter tyres and chains are legally required in Savoie and Haute-Savoie from 1 November to 31 March, and our vehicles carry both — a real difference from a hire car picked up on arrival, which is often shod for the motorway rather than for the col.",
      },
    ],
    faq: [
      {
        question: "Where do we meet the driver at Geneva?",
        reponse:
          "In arrivals, with your name, on the Swiss or French side depending on your flight — your confirmation says which. The flight is tracked and waiting time is included.",
      },
      {
        question: "Which resort is closest to Geneva?",
        reponse:
          "Le Grand-Bornand and La Clusaz, 56 and 59 km away, a little over an hour. Among the bigger areas, Les Gets (69 km) and Samoëns (67 km) are the quickest.",
      },
      {
        question: "How long to the Three Valleys?",
        reponse:
          "About 2 h 25 to Méribel, 2 h 30 to Courchevel, 2 h 45 to Val Thorens and Les Menuires, without traffic. Allow an hour more on a Saturday in February.",
      },
      {
        question: "Do we need a passport to use the French sector?",
        reponse:
          "Not within the Schengen area, but carry identification: spot checks happen, and you will need it for your flight home.",
      },
    ],
  },

  "chambery-savoie-airport": {
    chapo:
      "Chambéry is the Tarentaise airport: Méribel is 103 km away (1 h 20), Courchevel 110 km (1 h 30), Val Thorens 122 km (1 h 40). Its winter timetable is concentrated at weekends, with charters from the UK and northern Europe — which makes it the best choice in the region for a Saturday-to-Saturday week, and a poor one midweek.",
    contenu: [
      { type: "titre2", texte: "A seasonal airport" },
      {
        type: "paragraphe",
        texte:
          "Chambéry Savoie Mont-Blanc is a small airport whose winter traffic fits into a handful of Saturday rotations. When your dates match, nothing gets you into the Tarentaise faster. When they do not, look at Lyon or Geneva rather than waiting three days for a flight.",
      },
      { type: "titre2", texte: "What Chambéry serves best" },
      {
        type: "liste",
        items: [
          "The Three Valleys: Méribel 1 h 20, Courchevel 1 h 30, Les Menuires and Val Thorens 1 h 40.",
          "The Tarentaise: La Plagne and Les Arcs, around 1 h 45.",
          "The Haute-Tarentaise: Tignes 2 h, Val d’Isère 2 h 10.",
          "The Mont Blanc valley: Megève 1 h 20, Chamonix 1 h 40.",
          "The Aravis: La Clusaz and Le Grand-Bornand, 1 h 10.",
        ],
      },
      { type: "titre2", texte: "Arriving" },
      {
        type: "paragraphe",
        texte:
          "The terminal is small and there is one exit: your driver waits there with your name. On busy Saturdays the baggage hall can take a while — waiting time is included, and the flight is tracked.",
      },
    ],
    faq: [
      {
        question: "Does Chambéry fly midweek?",
        reponse:
          "Very little in winter: the schedule is built around Saturday rotations. For a midweek arrival, Lyon and Geneva are the alternatives.",
      },
      {
        question: "How long to Val Thorens?",
        reponse:
          "About 1 h 40 for 122 km without traffic — the shortest of any airport. Allow an hour more on a Saturday in high season.",
      },
      {
        question: "Does the driver wait if the flight is late?",
        reponse: "Yes. The flight is tracked and waiting time is included.",
      },
    ],
  },

  "lyon-airport": {
    chapo:
      "Lyon Saint-Exupéry is the airport that flies all year: the widest choice of airlines in the region, and a motorway that runs to Albertville without a detour. Méribel is 181 km away (2 h 15), Courchevel 188 km (2 h 20), Alpe d’Huez 155 km (2 h 10) and Val Thorens 200 km (2 h 35). It is the answer when Chambéry and Grenoble do not fly your dates.",
    contenu: [
      { type: "titre2", texte: "Why Lyon rather than Geneva" },
      {
        type: "paragraphe",
        texte:
          "For the Tarentaise and the Oisans, Lyon is often quicker than Geneva despite the extra distance: motorway covers most of the route, while the drive from Geneva crosses the Genevois countryside and the A40 first. In February, when Geneva fares climb, the comparison is worth making before you book the flight rather than after.",
      },
      { type: "titre2", texte: "What Lyon serves best" },
      {
        type: "liste",
        items: [
          "The Oisans: Alpe d’Huez 2 h 10, Les Deux Alpes 2 h 15.",
          "The Three Valleys: Méribel 2 h 15, Courchevel 2 h 20, Val Thorens 2 h 35.",
          "The Tarentaise: La Plagne and Les Arcs, about 2 h 35.",
          "The Haute-Tarentaise: Val d’Isère, about 3 h.",
          "The Chablais and Mont Blanc, further out: Morzine and Chamonix, around 2 h 30.",
        ],
      },
      { type: "titre2", texte: "Arriving at Saint-Exupéry" },
      {
        type: "paragraphe",
        texte:
          "The two terminals share one arrivals area, where your driver waits with your name. The airport also has its own TGV station, useful if part of your party is coming from Paris by train.",
      },
    ],
    faq: [
      {
        question: "Is Lyon further from the resorts than Geneva?",
        reponse:
          "In kilometres, often yes; in time, not always. For the Tarentaise and the Oisans the motorway makes Lyon competitive, and its flights run all year.",
      },
      {
        question: "How long to Alpe d’Huez?",
        reponse:
          "About 2 h 10 for 155 km, including the 21 hairpins climbing from Le Bourg-d’Oisans.",
      },
      {
        question: "Are there midweek flights?",
        reponse:
          "Yes, all year and to many destinations — that is Lyon’s main advantage over Chambéry and Grenoble.",
      },
    ],
  },

  "grenoble-isere-airport": {
    chapo:
      "Grenoble Alpes-Isère is the airport for the Oisans and the Southern Alps: Chamrousse is 78 km away (1 h 10), Alpe d’Huez 106 km (1 h 40), Les Deux Alpes 110 km (1 h 40) and Serre Chevalier 155 km (2 h 55). Like Chambéry, it lives on weekend charters, often cheaper than the Geneva fares.",
    contenu: [
      { type: "titre2", texte: "What Grenoble serves best" },
      {
        type: "liste",
        items: [
          "Chamrousse, Grenoble’s own mountain: 1 h 10.",
          "The Oisans: Alpe d’Huez and Les Deux Alpes, about 1 h 40.",
          "The Three Valleys: Méribel 2 h 05, Courchevel 2 h 15.",
          "The Tarentaise: La Plagne and Les Arcs, around 2 h 30.",
          "The Hautes-Alpes: Serre Chevalier, 2 h 55 over the Col du Lautaret.",
        ],
      },
      { type: "titre2", texte: "The Col du Lautaret in winter" },
      {
        type: "paragraphe",
        texte:
          "Towards Serre Chevalier and Montgenèvre the road crosses the Lautaret at 2,058 m. It is kept open through the winter but closes for a few hours at a time for avalanche control, and the detour is long. For those two resorts, Turin — through the Fréjus tunnel — is often the more reliable arrival.",
      },
      { type: "titre2", texte: "Arriving" },
      {
        type: "paragraphe",
        texte:
          "One terminal, one exit: your driver waits with your name and tracks your flight. On charter Saturdays the airport fills in a rush; waiting time is included.",
      },
    ],
    faq: [
      {
        question: "Grenoble or Lyon for Alpe d’Huez?",
        reponse:
          "Grenoble is closer — 1 h 40 against 2 h 10 — but Lyon flies all year, while Grenoble concentrates its winter flights on weekends.",
      },
      {
        question: "Is the Col du Lautaret open in winter?",
        reponse:
          "Yes, it is kept open, with occasional closures of a few hours after heavy snow. For Serre Chevalier, Turin is often the more dependable route.",
      },
      {
        question: "Do your vehicles carry winter equipment?",
        reponse:
          "Yes: winter tyres and chains, as Isère requires from 1 November to 31 March.",
      },
    ],
  },

  "turin-airport": {
    chapo:
      "Turin is the closest airport to two French resorts most people assume are served from France: Montgenèvre is 105 km away (1 h 40) and Serre Chevalier 131 km (2 h 45), through the Fréjus tunnel. It also serves the Italian Milky Way — Sestriere, Sauze d’Oulx — and the Aosta valley: Courmayeur, Champoluc, Gressoney.",
    contenu: [
      { type: "titre2", texte: "The airport British skiers overlook" },
      {
        type: "paragraphe",
        texte:
          "For Serre Chevalier and Montgenèvre, Turin beats Grenoble and Chambéry on drive time, and frequently on fare. The reason is geography: the Fréjus tunnel removes the pass that every French route has to cross.",
      },
      { type: "titre2", texte: "What Turin serves best" },
      {
        type: "liste",
        items: [
          "Montgenèvre: 1 h 40, up the Susa valley.",
          "Sestriere and Sauze d’Oulx: about 1 h 30, on the Milky Way.",
          "Serre Chevalier: 2 h 45, through the Fréjus tunnel.",
          "The Aosta valley: Courmayeur 1 h 30, Champoluc 1 h 30, Gressoney 1 h 40.",
          "Cervinia: about 2 hours.",
        ],
      },
      { type: "titre2", texte: "Crossing the border" },
      {
        type: "paragraphe",
        texte:
          "France and Italy are both in the Schengen area, so there is no routine check — but carry your passport or identity card, since spot checks happen at the tunnels. Our vehicles are insured and equipped for both countries, and tunnel tolls are included in the price we quote.",
      },
    ],
    faq: [
      {
        question: "Is Turin really the closest airport to Serre Chevalier?",
        reponse:
          "Yes: 131 km and about 2 h 45 through the Fréjus tunnel, against 2 h 55 from Grenoble over the Lautaret, and more from Chambéry.",
      },
      {
        question: "Are tunnel tolls included?",
        reponse:
          "Yes — Fréjus, Mont Blanc and all motorway tolls are in the price quoted before you book.",
      },
      {
        question: "Do we need a passport?",
        reponse:
          "No routine check within Schengen, but bring identification: it is asked for occasionally and needed for your return flight.",
      },
    ],
  },

  "zurich-airport": {
    chapo:
      "Zurich is Switzerland’s main hub: flights all week, long-haul connections, and a motorway network that puts the Grisons and the Bernese Oberland two to three hours away. Engelberg is 107 km (1 h 50), Laax 159 km (2 h 20), Arosa 164 km (2 h 30), and Zermatt about 3 h 20 via the Rhône valley.",
    contenu: [
      { type: "titre2", texte: "What Zurich serves best" },
      {
        type: "liste",
        items: [
          "Central Switzerland: Engelberg, 1 h 50 — the shortest transfer to a major Swiss resort.",
          "The Grisons: Laax 2 h 20, Arosa 2 h 30, Davos and Klosters, St. Moritz beyond.",
          "The Bernese Oberland: Interlaken 2 h 20, Lauterbrunnen 2 h 30, Grindelwald and Wengen above.",
          "The Austrian Arlberg: Lech and St. Anton, around 3 h 30.",
          "The Valais: Zermatt via Täsch, about 3 h 20.",
        ],
      },
      { type: "titre2", texte: "Where the road stops before the village" },
      {
        type: "paragraphe",
        texte:
          "Three destinations served from Zurich cannot be reached by car. Zermatt: the transfer ends at Täsch, then a twelve-minute shuttle train. Wengen: it ends at Lauterbrunnen, then the cog railway. Mürren: cable car or funicular. We say so before you book, drop you at the right platform, and time the arrival against a departure.",
      },
      { type: "titre2", texte: "Vignette and winter equipment" },
      {
        type: "paragraphe",
        texte:
          "The Swiss motorway vignette and all tolls are in the price. Our vehicles carry winter tyres and chains: in Switzerland the rule is not a date but the state of the road, and the driver remains responsible for the vehicle being equipped.",
      },
    ],
    faq: [
      {
        question: "Which resort is closest to Zurich?",
        reponse:
          "Engelberg, 107 km and about 1 h 50 — the shortest transfer from an international airport to a major Swiss resort.",
      },
      {
        question: "Can you drive us into Zermatt?",
        reponse:
          "No. Zermatt is car-free: the transfer ends at the Täsch terminal and the shuttle train covers the last 5 km in twelve minutes, about every twenty minutes.",
      },
      {
        question: "Is the Swiss vignette included?",
        reponse: "Yes, along with every toll on the route.",
      },
    ],
  },

  "innsbruck-airport": {
    chapo:
      "Innsbruck sits in the Inn valley, ten minutes from the city centre. We no longer serve Austrian resorts, but the airport keeps one real use: the Brenner is half an hour away, and Selva Val Gardena is an hour and three quarters from the terminal — often for a lower fare than Milan or Verona. Its approach is hemmed in by mountains and diversions to Munich or Salzburg are more frequent than elsewhere: tell us where you actually land and we drive from there.",
    contenu: [
      { type: "titre2", texte: "What Innsbruck serves best" },
      {
        type: "liste",
        items: [
          "The Arlberg: St. Anton about 1 h 30, Lech 2 h 15.",
          "The Ötztal: Sölden and Obergurgl, one to one and a half hours.",
          "The Zillertal: Mayrhofen, about an hour.",
          "The Paznaun: Ischgl, about 1 h 30.",
          "Serfaus-Fiss-Ladis, a little over an hour.",
        ],
      },
      { type: "titre2", texte: "A particular approach" },
      {
        type: "paragraphe",
        texte:
          "Innsbruck is approached between mountains, and the airport closes more often than most for wind or visibility: diversions to Munich or Salzburg are a fact of the season. Your driver tracks the flight; if you land somewhere else, tell us and we rearrange the transfer from there rather than leaving you stranded.",
      },
      { type: "titre2", texte: "Winter in Austria" },
      {
        type: "paragraphe",
        texte:
          "Winter tyres are compulsory in Austria from 1 November to 15 April in wintry conditions, and our vehicles also carry chains — necessary on the valley roads after a night of snowfall.",
      },
    ],
    faq: [
      {
        question: "What happens if my flight is diverted?",
        reponse:
          "It happens at Innsbruck, where the approach is sensitive to wind. Tell us: we rearrange the transfer from the airport you actually land at rather than leaving you there.",
      },
      {
        question: "How long to Sölden or Ischgl?",
        reponse:
          "About an hour to Sölden and an hour and a half to Ischgl, without traffic and outside fresh snowfall.",
      },
      {
        question: "Are winter tyres compulsory?",
        reponse:
          "In Austria, yes, from 1 November to 15 April in wintry conditions. Our vehicles carry tyres and chains.",
      },
    ],
  },

  "salzburg-airport": {
    chapo:
      "Salzburg is a comfortable, well-connected airport, and since we stopped serving Austrian resorts its interest lies south: the eastern Dolomites are within reach, and the fare is frequently below Milan or Venice. Like Innsbruck, its winter schedule is dense on Saturdays — book the transfer as soon as you have the flight.",
    contenu: [
      { type: "titre2", texte: "What Salzburg serves best" },
      {
        type: "liste",
        items: [
          "Kitzbühel and the Kitzbüheler Alpen: a little over an hour.",
          "Zell am See and Kaprun: about 1 h 20.",
          "The Gastein valley: Bad Gastein and Bad Hofgastein, about 2 hours.",
          "Schladming and Styria, to the east.",
          "The Ötztal and western Tyrol, further out, three to four hours.",
        ],
      },
      { type: "titre2", texte: "The Austrian Saturday" },
      {
        type: "paragraphe",
        texte:
          "As everywhere in the Alps, the season turns on Saturday: charter rotations follow one another and the valleys fill in a few hours. Allow extra time on that day, and give us your flight number so the pick-up follows the actual landing.",
      },
      { type: "titre2", texte: "The Tauern car-carrying train" },
      {
        type: "paragraphe",
        texte:
          "Towards Carinthia the Gastein valley is a dead end for cars: vehicles take the shuttle train from Böckstein to Mallnitz. It is a normal part of local life, and sometimes faster than driving round by the motorway.",
      },
    ],
    faq: [
      {
        question: "How long to Bad Gastein?",
        reponse:
          "About 2 hours for 104 km, motorway then valley road. Allow more on a Saturday in high season.",
      },
      {
        question: "Does Salzburg fly midweek?",
        reponse:
          "Less than at weekends: like Innsbruck, its winter programme is built on Saturday charters.",
      },
      {
        question: "Do your vehicles carry winter equipment?",
        reponse:
          "Yes, tyres and chains, as Austrian law requires from 1 November to 15 April in wintry conditions.",
      },
    ],
  },

  "milan-malpensa-airport": {
    chapo:
      "Malpensa is northern Italy’s big airport, and the shortest way to Zermatt: 195 km and about 3 hours through the Simplon, against 3 h 10 from Geneva. It also serves Alagna (110 km, 1 h 50), Champoluc, Gressoney, Cervinia and the Swiss resorts of the Ticino and the Valais.",
    contenu: [
      { type: "titre2", texte: "What Malpensa serves best" },
      {
        type: "liste",
        items: [
          "Monterosa: Alagna 1 h 50, Champoluc 2 h 10, Gressoney 2 h 20.",
          "The Swiss Valais: Zermatt via Täsch, about 3 hours through the Simplon.",
          "Cervinia and the Aosta valley, two to two and a half hours.",
          "The Ticino and Grisons resorts, by the Gotthard or the San Bernardino.",
          "Bormio and Livigno, further east.",
        ],
      },
      { type: "titre2", texte: "The Simplon, the Gotthard and the snow" },
      {
        type: "paragraphe",
        texte:
          "Routes into Switzerland cross a pass or a tunnel: the Simplon for the Valais, the Gotthard or the San Bernardino for the Grisons. Passes close for a few hours after heavy snowfall, and the tunnels queue on holiday weekends. Your driver picks the route on the day, from the real state of the roads.",
      },
      { type: "titre2", texte: "What the price includes" },
      {
        type: "paragraphe",
        texte:
          "Italian and Swiss tolls, the Swiss vignette, ski bags, child seats, flight tracking and waiting time. Winter equipment is compulsory on Italian Alpine roads from mid-November to mid-April, and our vehicles carry it.",
      },
    ],
    faq: [
      {
        question: "Is Malpensa a good airport for Zermatt?",
        reponse:
          "It is the closest of the major airports: about 3 hours to Täsch through the Simplon, then the twelve-minute shuttle train. Geneva takes 3 h 10 and Zurich 3 h 20.",
      },
      {
        question: "Are tolls and the Swiss vignette included?",
        reponse: "Yes, along with ski bags and child seats.",
      },
      {
        question: "What happens if a pass closes?",
        reponse:
          "Your driver takes the alternative — tunnel or rail shuttle — and tells you. The quoted price does not change.",
      },
    ],
  },

  "bergamo-airport": {
    chapo:
      "Bergamo Orio al Serio is northern Italy’s low-cost airport and a common way into the Dolomites, the Valtellina and Italian Switzerland. Madonna di Campiglio is 173 km away (2 h 35), Livigno and Bormio lie east, and Zermatt and Lauterbrunnen further on, over the Swiss passes.",
    contenu: [
      { type: "titre2", texte: "What Bergamo serves best" },
      {
        type: "liste",
        items: [
          "The Trentino: Madonna di Campiglio 2 h 35, the Val di Fiemme about 2 h 55.",
          "The Valtellina: Bormio and Livigno, two and a half to three and a half hours.",
          "The Dolomites, by way of Verona or Trento.",
          "Monterosa and the Aosta valley, to the west.",
          "Italian Switzerland and the Grisons, over the San Bernardino.",
        ],
      },
      { type: "titre2", texte: "Cheap flights, long transfers" },
      {
        type: "paragraphe",
        texte:
          "Bergamo owes its fares to its position: it is further from the resorts than Verona or Innsbruck. The sum worth doing is the whole one — fare plus transfer — before booking, and we give you the transfer price before you commit to anything.",
      },
      { type: "titre2", texte: "What the price includes" },
      {
        type: "paragraphe",
        texte:
          "Tolls, ski bags, child seats, flight tracking and waiting time. Winter equipment is compulsory on Italian Alpine roads from mid-November to mid-April, and our vehicles carry it.",
      },
    ],
    faq: [
      {
        question: "How long to Madonna di Campiglio?",
        reponse:
          "About 2 h 35 for 173 km. Verona is slightly closer in time, at about 2 h 25.",
      },
      {
        question: "Is Bergamo worth it for a cheaper flight?",
        reponse:
          "It depends on the resort: the saving on the fare is sometimes paid back in hours on the road. Ask for the transfer price before booking the flight.",
      },
      {
        question: "Are tolls included?",
        reponse: "Yes, along with ski bags and child seats.",
      },
    ],
  },
};
