import type { Article } from "./types";

/**
 * La Thuile et Courmayeur depuis Genève, par le tunnel du Mont-Blanc —
 * programmé au 24 novembre 2026. Sujet de novembre de l'audit articles
 * d'octobre (`clickzou-v2/docs/audits-articles/2026-10/alps.md`) : La Thuile et
 * Courmayeur font 1 893 impressions et 1 clic sur 90 jours, dont « geneva to
 * la thuile transfer » 321 et « geneva to la thuile shuttle » 126 ; aucun
 * article ne traitait le départ de Genève (l'article Turin part de Turin).
 *
 * Mot-clé : « how to get to la thuile from geneva », informationnel — la
 * requête transactionnelle « geneva to la thuile transfer » reste à la page de
 * trajet, que l'article sert par ses liens.
 *
 * Chiffres : UNIQUEMENT les pages de trajet du site (`src/lib/transfers/*.ts`) —
 * Genève → Courmayeur 102 km / 1 h 36, Chambéry-Savoie → Courmayeur
 * 151 km / 1 h 51, Turin → Courmayeur 158 km / 1 h 59, Genève → La Thuile
 * 133 km / 2 h 33. Aucune autre page au départ de La Thuile : les autres
 * aéroports ne sont pas chiffrés, renvoi à la demande spéciale. Aucun montant.
 * Itinéraire (vallée de l'Arve, Chamonix, tunnel de 11,6 km, vallée d'Aoste),
 * La Thuile à 1 441 m au pied du Petit-Saint-Bernard, liaison avec La Rosière
 * par l'Espace San Bernardo : pages de trajet Genève → Courmayeur et Genève →
 * La Thuile. Navette gratuite à La Thuile : FAQ de la page de station.
 * Bouchons du tunnel le week-end : article « Saturday changeover ». Contrôles
 * ponctuels aux tunnels, pièce d'identité : page aéroport de Turin.
 *
 * NON écrit, car « à confirmer par le client » (consignes client § 3) : le
 * péage du tunnel du Mont-Blanc compris ou non, et la gestion des fermetures
 * du tunnel (nuit, travaux, itinéraire de repli). L'audit proposait « tolls
 * and closures » dans le titre : retiré pour cette raison.
 */
export const genevaToLaThuileCourmayeur: Article = {
  slug: "how-to-get-to-la-thuile-courmayeur-from-geneva",
  titre: "How to get to La Thuile and Courmayeur from Geneva, through the Mont Blanc tunnel",
  metaTitre: "How to Get to La Thuile and Courmayeur from Geneva",
  motCle: "how to get to la thuile from geneva",
  motsClesSecondaires: ["geneva to la thuile transfer time", "geneva to courmayeur mont blanc tunnel"],
  metaDescription:
    "Geneva airport to Courmayeur is 102 km and about 1 h 36, La Thuile 133 km and 2 h 33, through the Mont Blanc tunnel. The route, the borders and Saturdays.",
  chapo:
    "From Geneva airport, Courmayeur is 102 km and about 1 h 36 by road, and La Thuile 133 km and about 2 h 33. Both are reached through the Mont Blanc tunnel: you land in Switzerland, drive through France to Chamonix, and come out in Italy’s Aosta valley. Here is how the route works, why Geneva is usually quicker than Turin for these two resorts, what to expect on a Saturday, and what to give us when you book.",
  datePublication: "2026-11-24",
  auteur: "Alps Ski Transfers",
  visuel: {
    nom: "station-la-thuile",
    alt: "Snow-covered stone chalets above an Alpine village in the Aosta valley, with a road winding between the houses",
  },

  aRetenir: [
    "Geneva airport to Courmayeur is 102 km and about 1 h 36 without traffic, through the Mont Blanc tunnel.",
    "Geneva airport to La Thuile is 133 km and about 2 h 33 without traffic, by the same tunnel and then up from the Aosta valley to the village at 1,441 m.",
    "For Courmayeur, Geneva is the quickest of the three airports we run it from: Chambéry-Savoie takes about 1 h 51 and Turin about 1 h 59.",
    "The journey crosses two borders — Switzerland to France, then France to Italy — all inside the Schengen area; carry a passport or identity card, as spot checks happen at the tunnels.",
    "On Saturdays in the season, the motorway towards Chamonix and the approach to the tunnel are at their busiest: allow up to an hour more than the clear-road times.",
  ],

  stationsLiees: ["la-thuile", "courmayeur"],

  trajetsLies: [
    { airport: "geneva-airport", resort: "la-thuile" },
    { airport: "geneva-airport", resort: "courmayeur" },
    { airport: "chambery-savoie-airport", resort: "courmayeur" },
    { airport: "turin-airport", resort: "courmayeur" },
  ],

  lectures: ["turin-airport-ski-resorts-milky-way-cervinia", "how-to-get-to-chamonix-from-geneva"],

  contenu: [
    {
      type: "paragraphe",
      texte:
        "La Thuile and Courmayeur are in Italy, in the upper Aosta valley, on the far side of Mont Blanc from Chamonix. For travellers flying from the UK or northern Europe, the natural airport is not Italian at all: it is Geneva, because the road goes under the mountain rather than around it. From Geneva airport, Courmayeur is 102 km and about 1 h 36 without traffic. La Thuile, further up a side valley, is 133 km and about 2 h 33.",
    },
    {
      type: "paragraphe",
      texte:
        "This guide follows that journey from the arrivals hall to the resort: the route through the Mont Blanc tunnel, the two border crossings, how Geneva compares with the other airports, what changes on a Saturday, and what to tell us when you book. Every time quoted here is a clear-road time taken from the pages of the routes we run.",
    },

    { type: "titre2", texte: "The route: Arve valley, Chamonix, then under Mont Blanc" },
    {
      type: "paragraphe",
      texte:
        "The road leaves Geneva on the motorway towards the Mont Blanc valley and follows it up the Arve valley as far as Le Fayet. From there, the valley road climbs through Les Houches to Chamonix — the same road you would take for a ski week in Chamonix itself, cleared and gritted around the clock in season. Just beyond Chamonix, it enters the Mont Blanc tunnel: 11.6 km under the massif, from France into Italy.",
    },
    {
      type: "paragraphe",
      texte:
        "On the Italian side, the road comes down into the Aosta valley to Courmayeur. That is why the journey is so short: you land in Switzerland, drive through France and arrive in Italy in under two hours. For La Thuile, the journey carries on down the Aosta valley to the village, at the foot of the Petit-Saint-Bernard pass.",
    },
    {
      type: "paragraphe",
      texte:
        "If you know the first half of this route, it is because it is also the route to Chamonix. Our guide on [how to get to Chamonix from Geneva](/blog/how-to-get-to-chamonix-from-geneva/) describes that part of the road in more detail, along with the bus and train options for the French side of the massif.",
    },

    { type: "titre2", texte: "Geneva to Courmayeur: about 1 h 36" },
    {
      type: "paragraphe",
      texte:
        "[Geneva to Courmayeur](/italy-ski-transfers/courmayeur/geneva-airport-transfers/) is 102 km and about 1 h 36 without traffic. It is one of the shortest international transfers in the Alps, and a midday landing leaves plenty of the afternoon once you arrive.",
    },
    {
      type: "paragraphe",
      texte:
        "Courmayeur sits at the foot of Mont Blanc, on the Italian side. It is the Italian end of the Skyway Monte Bianco cable car and of the Vallée Blanche, the famous off-piste route that comes down into Chamonix. None of that changes the transfer: give us the exact address of your hotel, chalet or apartment and the driver goes straight to the door.",
    },

    { type: "titre2", texte: "Geneva to La Thuile: about 2 h 33" },
    {
      type: "paragraphe",
      texte:
        "[Geneva to La Thuile](/italy-ski-transfers/la-thuile/geneva-airport-transfers/) is 133 km and about 2 h 33 without traffic. The first part of the journey is the same as for Courmayeur, through the tunnel; the rest is the descent into the Aosta valley and the climb to the village, at 1,441 m.",
    },
    {
      type: "paragraphe",
      texte:
        "La Thuile is on the Italian side of the border it shares with La Rosière, in France. The two are linked on skis by the Espace San Bernardo, which makes La Thuile an international ski area as much as an Italian resort. Once in the village, a free shuttle runs in winter between the different parts of La Thuile and the ski lifts.",
    },
    {
      type: "paragraphe",
      texte:
        "Geneva is the only airport from which we publish a route to La Thuile. If another airport suits your flights better — Turin, for example — send us a [special inquiry](/inquiry/) with your dates and we will look at it by hand rather than quote a time here that we have not measured.",
    },

    { type: "titre2", texte: "Geneva, Chambéry or Turin for Courmayeur?" },
    {
      type: "paragraphe",
      texte:
        "We run Courmayeur transfers from three airports. Measured on the road network, Geneva is the quickest, and the gaps are smaller than most people expect.",
    },
    {
      type: "liste",
      items: [
        "Geneva — 102 km, about 1 h 36.",
        "Chambéry-Savoie — 151 km, about 1 h 51.",
        "Turin — 158 km, about 1 h 59.",
      ],
    },
    {
      type: "paragraphe",
      texte:
        "Turin is the nearest Italian airport, and yet it is 23 minutes slower than Geneva to Courmayeur. Chambéry-Savoie, in France, sits between the two. With only a quarter of an hour between Geneva and Chambéry, and 23 minutes between Geneva and Turin, the flight is what usually decides: which airport has a direct flight from your city, on your dates, at a sensible fare.",
    },
    {
      type: "paragraphe",
      texte:
        "Geneva flies every day of the week from most European cities. Chambéry-Savoie runs a winter programme concentrated at weekends, built around charter and low-cost flights. Turin is the airport for the Italian side of the Alps — the Milky Way, Cervinia and Monterosa — and our guide to [flying into Turin](/blog/turin-airport-ski-resorts-milky-way-cervinia/) sets out which resorts it serves best. The three routes have their own pages: [Geneva to Courmayeur](/italy-ski-transfers/courmayeur/geneva-airport-transfers/), [Chambéry to Courmayeur](/italy-ski-transfers/courmayeur/chambery-savoie-airport-transfers/) and [Turin to Courmayeur](/italy-ski-transfers/courmayeur/turin-airport-transfers/).",
    },

    { type: "titre2", texte: "Two borders in one transfer: what you need to know" },
    {
      type: "paragraphe",
      texte:
        "A transfer from Geneva to Courmayeur or La Thuile crosses two borders: Switzerland to France just after the airport, and France to Italy in the Mont Blanc tunnel. There is nothing for you to arrange. All three countries are in the Schengen area, so there is no routine check, and our vehicles are insured and equipped for each of them in winter.",
    },
    {
      type: "paragraphe",
      texte:
        "Carry a passport or identity card all the same. Spot checks happen at the tunnels, and you will need it for the flight home in any case. Keep it in your hand luggage rather than in the boot, with your skis.",
    },
    {
      type: "paragraphe",
      texte:
        "Winter tyres or snow chains are compulsory on the French part of the route from 1 November to 31 March, and our vehicles carry both all season. Our guide to [snow chains and winter tyres in the Alps](/blog/snow-chains-winter-tyres-alps-rules/) explains the rules on each side of the border.",
    },

    { type: "titre2", texte: "Saturdays: the motorway, the tunnel and the valley" },
    {
      type: "paragraphe",
      texte:
        "Saturday is changeover day across the Alps, on the Italian side as on the French one: most ski accommodation is let from Saturday to Saturday, so the guests leaving and the guests arriving travel on the same day. On this route, two stretches are at their busiest on a Saturday morning in the season: the motorway from Geneva towards Chamonix, and the approach to the Mont Blanc tunnel, which queues at weekends.",
    },
    {
      type: "paragraphe",
      texte:
        "In February, a Saturday can add up to an hour to the clear-road times. A Geneva to Courmayeur transfer that takes 1 h 36 midweek can then approach 2 h 40, and La Thuile, 2 h 33 midweek, can come close to three and a half hours. Not every Saturday is the same: one in early January or late March can feel almost like midweek, while one in the middle of February can be the slowest day of the season.",
    },
    {
      type: "paragraphe",
      texte:
        "The return is the journey that cannot absorb a delay, because the aircraft will not wait. That is why the pick-up time we give you in resort on a Saturday can look early: we set it from your flight time, with the traffic on the tunnel and the motorway in mind. Our guide to [Saturday changeover day in the Alps](/blog/saturday-changeover-day-alps-ski-transfer/) covers the whole of the Alps, valley by valley.",
    },

    { type: "titre2", texte: "How a private transfer to La Thuile or Courmayeur is priced" },
    {
      type: "paragraphe",
      texte:
        "A private transfer is priced per vehicle, not per seat. The price depends on the route, the vehicle category and the time of year, and it does not change with the number of passengers: a group of six pays what a couple pays. A Saturday pick-up, like a late-night or very early one, is priced above a midweek daytime journey.",
    },
    {
      type: "paragraphe",
      texte:
        "Each route has its own price, shown on its page before you book: open [Geneva to La Thuile](/italy-ski-transfers/la-thuile/geneva-airport-transfers/) or Geneva to Courmayeur, enter your journey, and you see the price for the whole vehicle before anything is paid. Our guide to [how ski transfer prices are calculated](/blog/how-ski-transfer-prices-are-calculated/) explains what makes one route or one date cost more than another, and what to check in any quote.",
    },

    { type: "titre2", texte: "Which vehicle, and what to give us when you book" },
    {
      type: "paragraphe",
      texte:
        "We run three vehicle categories: Standard, a Volkswagen Transporter for up to 8 passengers; Business, a Mercedes V-Class or Vito Tourer for up to 7; and Premium, a Mercedes E-Class saloon for up to 4. Above eight passengers, the party travels in several vehicles coordinated on the same schedule, and the [group transfers page](/inquiry/) gives you a single quote for everyone.",
    },
    {
      type: "liste",
      items: [
        "Your flight number: your driver follows the aircraft, and if you land late the pick-up moves with you, at no extra cost.",
        "The exact address of your accommodation in Courmayeur or La Thuile.",
        "The number of passengers, bags and ski or board carriers — skis, snowboards and boot bags travel at no extra charge, and the count decides the vehicle category.",
        "The ages of any children, so that the right child or booster seats are fitted before the driver leaves for the airport.",
        "For the return, your flight time home, from which we set the pick-up time in resort.",
      ],
    },

    { type: "titre2", texte: "The short version" },
    {
      type: "liste",
      items: [
        "Courmayeur — Geneva, 102 km and about 1 h 36 through the Mont Blanc tunnel; Chambéry-Savoie 1 h 51; Turin 1 h 59.",
        "La Thuile — Geneva, 133 km and about 2 h 33, by the same tunnel; other airports on request.",
        "Borders — Switzerland, France, Italy, all in Schengen; carry a passport or identity card.",
        "Saturdays in February — allow up to an hour more on the motorway towards Chamonix and at the tunnel.",
        "Price — fixed per vehicle, shown on the page of your route before you book.",
      ],
    },
  ],

  faq: [
    {
      question: "How long is the transfer from Geneva airport to La Thuile?",
      reponse:
        "About 2 h 33 for 133 km without traffic, through the Mont Blanc tunnel and the Aosta valley. On a Saturday in February, allow up to an hour more.",
    },
    {
      question: "How long is the transfer from Geneva airport to Courmayeur?",
      reponse:
        "About 1 h 36 for 102 km without traffic. The route runs up the Arve valley to Chamonix and through the Mont Blanc tunnel into the Aosta valley.",
    },
    {
      question: "Is Geneva or Turin closer to Courmayeur?",
      reponse:
        "Geneva is quicker by road: about 1 h 36 for 102 km, against 1 h 59 for 158 km from Turin. Chambéry-Savoie sits between the two at 1 h 51. The flights available on your dates usually decide.",
    },
    {
      question: "Do I need a passport for a transfer from Geneva to Italy?",
      reponse:
        "Switzerland, France and Italy are all in the Schengen area, so there is no routine border check. Carry a passport or identity card anyway: spot checks happen at the tunnels, and you need it for the flight home.",
    },
    {
      question: "Can I book a transfer to La Thuile from another airport than Geneva?",
      reponse:
        "Geneva is the only airport from which we publish a route to La Thuile. For another airport, send a special inquiry with your dates and the number of passengers, and we will look at it by hand.",
    },
  ],
};
