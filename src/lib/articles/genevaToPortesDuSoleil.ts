import type { Article } from "./types";

/**
 * Avoriaz, Morzine et Les Gets depuis Genève — programmé au 10 novembre 2026.
 * Sujet de novembre de l'audit articles d'octobre
 * (`clickzou-v2/docs/audits-articles/2026-10/alps.md`) : les Portes du Soleil
 * font 2 271 impressions et 0 clic sur 90 jours, dont trois questions posées
 * telles quelles (durée, budget, prix vers Avoriaz). Complète la série « How to
 * get to X from Geneva » (Chamonix, Zermatt, Verbier).
 *
 * Mot-clé : « how to get to avoriaz from geneva », informationnel — la requête
 * transactionnelle « geneva to avoriaz transfer » reste à la page de trajet,
 * que l'article sert par ses liens.
 *
 * Chiffres : UNIQUEMENT les pages de trajet du site (`src/lib/transfers/*.ts`) —
 * Genève → Les Gets 69 km / 1 h 19, → Morzine 77 km / 1 h 29, → Avoriaz
 * 89 km / 1 h 45 ; Chambéry-Savoie → Les Gets 118 km / 1 h 34, → Morzine
 * 125 km / 1 h 44, → Avoriaz 138 km / 1 h 59 ; Lyon → Les Gets 195 km / 2 h 23,
 * → Morzine 202 km / 2 h 34. Pas de page Lyon → Avoriaz : non chiffré, renvoi à
 * la demande spéciale. Aucun montant : le prix se lit sur la page du trajet.
 * Route (Cluses, Taninges, col des Gets), altitudes, samedi (+45 min à 1 h),
 * équipement hiver du 1er novembre au 31 mars : page de station Les Gets et
 * articles « Closest ski resorts to Geneva » et « Saturday changeover ».
 * Avoriaz (route jusqu'aux parkings, traîneau, chenillette, téléphérique des
 * Prodains en cas de fermeture) : article « Car-free ski resorts », auquel on
 * renvoie sans le répéter. La pratique de dépose de l'exploitant à Avoriaz est
 * « à confirmer » (consignes client § 3) : elle n'est pas décrite.
 *
 * Pas un comparatif de stations (consigne client) : l'article parle de la
 * route et du transfert, jamais du domaine skiable. Le brouillon écarté
 * « Chamonix, Morzine or Les Gets » n'est pas recyclé.
 */
export const genevaToPortesDuSoleil: Article = {
  slug: "how-to-get-to-avoriaz-morzine-les-gets-from-geneva",
  titre: "How to get to Avoriaz, Morzine and Les Gets from Geneva: drive times, prices and the last stretch",
  metaTitre: "How to Get to Avoriaz, Morzine and Les Gets from Geneva",
  motCle: "how to get to avoriaz from geneva",
  motsClesSecondaires: ["how long is the transfer to avoriaz", "how much is a transfer to avoriaz"],
  metaDescription:
    "Geneva to Les Gets 1 h 19, Morzine 1 h 29, Avoriaz 1 h 45: the road, Saturday traffic, how the price works and the last stretch into car-free Avoriaz.",
  chapo:
    "From Geneva airport, Les Gets is about 1 h 19 by road, Morzine 1 h 29 and Avoriaz 1 h 45, all on the same road through Cluses and over the col des Gets. Morzine and Les Gets are reached door to door; Avoriaz is car-free, so the road ends at the car parks at the entrance of the resort. Here is how the journey works, what changes on a Saturday, how a private transfer is priced, and what to plan for the last stretch.",
  datePublication: "2026-11-10",
  auteur: "Alps Ski Transfers",
  visuel: {
    nom: "station-morzine",
    alt: "Morzine in winter: wooden chalets below a snow-covered forested slope under a blue sky",
  },

  aRetenir: [
    "Geneva airport is the closest airport to the three French resorts of the Portes du Soleil: Les Gets is 69 km and about 1 h 19 away, Morzine 77 km and 1 h 29, Avoriaz 89 km and 1 h 45 without traffic.",
    "Chambéry-Savoie is about 15 minutes further than Geneva to each of the three resorts: 1 h 34 to Les Gets, 1 h 44 to Morzine and 1 h 59 to Avoriaz.",
    "Lyon is roughly an hour further than Geneva: 2 h 23 to Les Gets and 2 h 34 to Morzine.",
    "Avoriaz is a car-free resort at 1,800 m: the road up from Morzine ends at the car parks on its edge, and the last leg to the accommodation is by horse-drawn sledge, snowcat or on skis.",
    "On a busy Saturday in the season, allow 45 minutes to an hour more than these clear-road times on the climb from Cluses.",
  ],

  stationsLiees: ["avoriaz", "morzine", "les-gets"],

  trajetsLies: [
    { airport: "geneva-airport", resort: "avoriaz" },
    { airport: "geneva-airport", resort: "morzine" },
    { airport: "geneva-airport", resort: "les-gets" },
    { airport: "chambery-savoie-airport", resort: "avoriaz" },
    { airport: "chambery-savoie-airport", resort: "morzine" },
    { airport: "chambery-savoie-airport", resort: "les-gets" },
    { airport: "lyon-airport", resort: "morzine" },
    { airport: "lyon-airport", resort: "les-gets" },
  ],

  lectures: ["car-free-ski-resorts-how-you-actually-get-there", "closest-ski-resorts-to-geneva-airport"],

  contenu: [
    {
      type: "paragraphe",
      texte:
        "Avoriaz, Morzine and Les Gets are the three big French resorts of the Portes du Soleil, the lift-linked ski area that spreads across the border between France and Switzerland. For a transfer, they have one thing in common that matters more than anything else: they share the same road. From Geneva airport, you take the motorway as far as Cluses, then climb through Taninges and over the col des Gets. Les Gets is at the top of that col, Morzine on the other side, and Avoriaz above Morzine at the end of its own access road.",
    },
    {
      type: "paragraphe",
      texte:
        "That order sets the drive times. Les Gets is the closest, at 69 km and about 1 h 19 without traffic. Morzine comes next, at 77 km and 1 h 29. Avoriaz is the furthest, at 89 km and 1 h 45 — and the only one of the three where the vehicle cannot take you to the door, because the resort has no cars at all.",
    },
    {
      type: "paragraphe",
      texte:
        "This guide follows the journey from the arrivals hall to the last few hundred metres: the road, the other airports, Saturdays, how the price of a private transfer works, and what to arrange in advance if you are staying in Avoriaz. Every time quoted here is a clear-road time taken from the pages of the routes we run.",
    },

    { type: "titre2", texte: "How long is the transfer from Geneva to each resort?" },
    {
      type: "liste",
      items: [
        "Geneva to Les Gets — 69 km, about 1 h 19.",
        "Geneva to Morzine — 77 km, about 1 h 29.",
        "Geneva to Avoriaz — 89 km, about 1 h 45.",
      ],
    },
    {
      type: "paragraphe",
      texte:
        "The gaps are small on the map and larger on the road. Morzine is only 8 km beyond Les Gets, on the far side of the same col, and the extra ten minutes are the descent into the valley. Avoriaz is 12 km beyond Morzine, but those kilometres are the climb to 1,800 m, which is why they add another sixteen minutes. Each of the three routes has its own page: [Geneva to Les Gets](/france-ski-transfers/les-gets/geneva-airport-transfers/), [Geneva to Morzine](/france-ski-transfers/morzine/geneva-airport-transfers/) and [Geneva to Avoriaz](/france-ski-transfers/avoriaz/geneva-airport-transfers/).",
    },
    {
      type: "paragraphe",
      texte:
        "These are short transfers by Alpine standards. Land in Geneva at midday and you can be on the snow in Les Gets by mid-afternoon; by comparison, the big resorts of the Tarentaise — Tignes, Val d’Isère, La Plagne, Les Arcs — are between 2 h 44 and 3 h 14 from the same airport.",
    },

    { type: "titre2", texte: "The road: motorway to Cluses, then the col des Gets" },
    {
      type: "paragraphe",
      texte:
        "The journey starts in Switzerland and ends in France. You cross the border a few minutes after leaving the airport, and there is nothing for you to arrange: Switzerland and France are both in the Schengen area, the vehicle carries what each country requires in winter, and the crossing itself rarely costs more than a few minutes. Keep your passport or identity card to hand all the same — you will need it for the flight home.",
    },
    {
      type: "paragraphe",
      texte:
        "Most of the distance is motorway, as far as the exit at Cluses. From there, the road climbs steadily to Taninges and then over the col des Gets, about twenty kilometres of mountain road. It is a main road, cleared and gritted through the season, but it is exposed to snowfall and it is the road every hire car, coach and transfer from Geneva uses to reach these three resorts. That last section is where the time is really spent, and it does not get faster whatever the traffic below.",
    },
    {
      type: "paragraphe",
      texte:
        "Les Gets sits at 1,172 m on the col itself, between the Arve valley and the Vallée d’Aulps. Morzine is on the other side, lower down in the valley. Avoriaz is reached by a separate road that climbs from Morzine to the resort at 1,800 m.",
    },
    {
      type: "paragraphe",
      texte:
        "Winter tyres or snow chains are compulsory in this part of Haute-Savoie from 1 November to 31 March, and our vehicles carry both all season. If you want to know what the rules mean in practice, our guide to [snow chains and winter tyres in the Alps](/blog/snow-chains-winter-tyres-alps-rules/) sets them out.",
    },

    { type: "titre2", texte: "Is Geneva the best airport for the Portes du Soleil?" },
    {
      type: "paragraphe",
      texte:
        "On drive time, yes, for all three resorts. Chambéry-Savoie comes second, about fifteen minutes behind each time, and Lyon third, roughly an hour behind.",
    },
    {
      type: "liste",
      items: [
        "Les Gets — Geneva 69 km, 1 h 19; Chambéry-Savoie 118 km, 1 h 34; Lyon 195 km, 2 h 23.",
        "Morzine — Geneva 77 km, 1 h 29; Chambéry-Savoie 125 km, 1 h 44; Lyon 202 km, 2 h 34.",
        "Avoriaz — Geneva 89 km, 1 h 45; Chambéry-Savoie 138 km, 1 h 59.",
      ],
    },
    {
      type: "paragraphe",
      texte:
        "Fifteen minutes is not much over a whole holiday, and the flight usually decides. Geneva flies every day of the week from most European cities. Chambéry-Savoie runs a winter programme concentrated at weekends, built around charter and low-cost flights; if one leaves from your city on your dates, [Chambéry to Morzine](/france-ski-transfers/morzine/chambery-savoie-airport-transfers/) or [Chambéry to Avoriaz](/france-ski-transfers/avoriaz/chambery-savoie-airport-transfers/) is barely longer than the same transfer from Geneva. Our guide to [Chambéry airport and its Saturday flights](/blog/chambery-airport-ski-resorts-saturday-flights/) explains how that kind of airport works.",
    },
    {
      type: "paragraphe",
      texte:
        "Lyon is the fallback when Geneva is full or expensive: year-round flights, a wide choice of airlines, and a drive that is an hour longer but largely motorway. [Lyon to Les Gets](/france-ski-transfers/les-gets/lyon-airport-transfers/) takes about 2 h 23 and Lyon to Morzine about 2 h 34. Lyon to Avoriaz is not one of the routes we publish, so we do not quote a time for it here; if Lyon is the only airport that works for your dates, a [special inquiry](/inquiry/) is the way to ask for it.",
    },

    { type: "titre2", texte: "Avoriaz: where the road ends" },
    {
      type: "paragraphe",
      texte:
        "Avoriaz is different in kind from Morzine and Les Gets. There is a road up from Morzine, and it is open in winter, but it stops at the car parks on the edge of the resort. Inside, there are no cars: you get around by horse-drawn sledge, by snowcat or on skis. That is part of the charm of the place, and it is also the one point in this journey that needs planning.",
    },
    {
      type: "paragraphe",
      texte:
        "In practice, a transfer takes you as far as the road goes. The last leg, from the entrance of the resort to your apartment, chalet or hotel, is made by sledge or snowcat, with your luggage. Ask your accommodation how it works for your residence and book that last leg with them in advance, especially if you land late in the evening: it is the one part of the journey that runs to someone else’s schedule.",
    },
    {
      type: "paragraphe",
      texte:
        "After heavy snowfall, the access road to Avoriaz is occasionally closed for clearing. The alternative is the Prodains cable car, which goes up from the Morzine side. Our guide to [car-free ski resorts](/blog/car-free-ski-resorts-how-you-actually-get-there/) covers Avoriaz alongside Zermatt, Wengen and the others, and what happens to your luggage in each of them.",
    },

    { type: "titre2", texte: "Saturdays: when 1 h 19 becomes more than two hours" },
    {
      type: "paragraphe",
      texte:
        "Most ski accommodation in the Portes du Soleil is let from Saturday to Saturday. The guests leaving and the guests arriving therefore travel on the same day, and they all use the same road from Cluses. In the busiest weeks of the season — the February half-term weeks above all — allow 45 minutes to an hour more than the clear-road times. A Geneva to Les Gets transfer that takes 1 h 19 on a Tuesday can come close to 2 h 20 on a February Saturday, and Avoriaz, 1 h 45 midweek, can approach three hours.",
    },
    {
      type: "paragraphe",
      texte:
        "The queue usually starts well before the climb, so there is no clever shortcut. Not every Saturday is the same, though: one in early January or late March can feel almost like midweek, while one in the middle of February can be the slowest day of the year on this road. The return matters most, because the aircraft will not wait: on the way home, we set your pick-up time in resort from your flight, with the Saturday traffic in mind, and if the time we suggest feels early, that is the reason. Our guide to [Saturday changeover day in the Alps](/blog/saturday-changeover-day-alps-ski-transfer/) covers the whole of the Alps, valley by valley.",
    },

    { type: "titre2", texte: "How much does a transfer to Avoriaz, Morzine or Les Gets cost?" },
    {
      type: "paragraphe",
      texte:
        "A private transfer is priced per vehicle, not per seat. The price depends on the route, the vehicle category and the time of year, and it does not change with the number of passengers: a group of six pays what a couple pays. Tolls and motorway fees are included, and nothing is added on arrival. A Saturday pick-up, like a late-night or very early one, is priced above a midweek daytime journey — and the price is shown before you book and fixed from that moment.",
    },
    {
      type: "paragraphe",
      texte:
        "Because each route has its own price, the only reliable figure is the one on the page of your route: open [Geneva to Avoriaz](/france-ski-transfers/avoriaz/geneva-airport-transfers/), Geneva to Morzine or Geneva to Les Gets, enter your journey, and you see the price for the whole vehicle before you book. Our guide to [how ski transfer prices are calculated](/blog/how-ski-transfer-prices-are-calculated/) explains what makes one route or one date cost more than another, and what to check in any quote.",
    },
    {
      type: "paragraphe",
      texte:
        "The budget question is therefore less about the transfer itself than about how many people share it. For a family or a group of four and up, a private transfer priced per vehicle is usually cheaper than buying seats, as well as faster, because the same price is shared by everyone on board.",
    },

    { type: "titre2", texte: "Which vehicle for your group and your skis?" },
    {
      type: "paragraphe",
      texte:
        "We run three vehicle categories, and the choice depends as much on your luggage as on the number of passengers.",
    },
    {
      type: "liste",
      items: [
        "Standard, a Volkswagen Transporter: up to 8 passengers.",
        "Business, a Mercedes V-Class or Vito Tourer: up to 7 passengers.",
        "Premium, a Mercedes E-Class saloon: up to 4 passengers.",
      ],
    },
    {
      type: "paragraphe",
      texte:
        "Skis, snowboards and boot bags travel at no extra charge, and child and booster seats are provided on request, fitted before your driver leaves for the airport. Tell us how many bags and ski or board carriers you have when you book: in winter the boot fills up before the seats do, and the count is what decides the vehicle category. Our guide to [travelling with skis and snowboards](/blog/skis-snowboards-ski-transfer-luggage/) goes into the detail.",
    },
    {
      type: "paragraphe",
      texte:
        "Above eight passengers, the party travels in several vehicles coordinated on the same schedule. For a larger group, or for a chalet company booking on behalf of its guests, the [group transfers page](/inquiry/) gives you a single quote for everyone.",
    },

    { type: "titre2", texte: "What to give us when you book" },
    {
      type: "liste",
      items: [
        "Your flight number, so that your driver follows the aircraft rather than the timetable: if you land late, the pick-up moves with you, at no extra cost.",
        "The exact address of your accommodation, so that the driver goes straight to the door — or, in Avoriaz, to the entrance of the resort.",
        "The number of passengers, bags and ski or board carriers.",
        "The ages of any children, so that the right seats are fitted.",
        "For the return, your flight time home: we work back from it to set the pick-up time in resort.",
      ],
    },
    {
      type: "paragraphe",
      texte:
        "The same goes for the way home. Whether you are staying in Les Gets, Morzine or Avoriaz, give us the exact pick-up address and your flight time, and we set the pick-up time from your flight, allowing for the road down.",
    },

    { type: "titre2", texte: "The short version" },
    {
      type: "liste",
      items: [
        "Les Gets — Geneva, 1 h 19; Chambéry-Savoie, 1 h 34 if a weekend flight suits you.",
        "Morzine — Geneva, 1 h 29; Chambéry-Savoie, 1 h 44; Lyon, 2 h 34 as the fallback.",
        "Avoriaz — Geneva, 1 h 45, to the car parks at the entrance of the resort; book the sledge or snowcat for the last leg with your accommodation.",
        "Saturdays in February — allow 45 minutes to an hour more on the climb from Cluses.",
        "Price — fixed per vehicle, shown on the page of your route before you book.",
      ],
    },
    {
      type: "paragraphe",
      texte:
        "For the wider picture of every resort within easy reach of the airport, our guide to the [closest ski resorts to Geneva airport](/blog/closest-ski-resorts-to-geneva-airport/) ranks them by real drive time.",
    },
  ],

  faq: [
    {
      question: "How long does the transfer from Geneva airport to Avoriaz take?",
      reponse:
        "About 1 h 45 for 89 km without traffic. On a busy Saturday in the season, allow 45 minutes to an hour more. The road ends at the car parks at the entrance of the resort, which is car-free.",
    },
    {
      question: "How much does a transfer to Avoriaz cost?",
      reponse:
        "A private transfer is priced per vehicle, not per person, tolls included. The price depends on the airport, the vehicle category and the date, and it is shown on the page of the route before you book.",
    },
    {
      question: "What is the closest airport to Morzine and Les Gets?",
      reponse:
        "Geneva: 77 km and about 1 h 29 to Morzine, 69 km and about 1 h 19 to Les Gets. Chambéry-Savoie is about fifteen minutes further, Lyon about an hour further.",
    },
    {
      question: "Can a car drive into Avoriaz?",
      reponse:
        "No. Avoriaz is a car-free resort: the road up from Morzine stops at the car parks on its edge, and you reach your accommodation by horse-drawn sledge, snowcat or on skis. Book that last leg with your accommodation in advance.",
    },
    {
      question: "Do I need to do anything at the border between Geneva and France?",
      reponse:
        "No. Switzerland and France are both in the Schengen area and the crossing rarely takes more than a few minutes. Carry a passport or identity card anyway, as spot checks happen and you need it for the flight home.",
    },
  ],
};
