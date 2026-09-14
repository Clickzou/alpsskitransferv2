import type { Article } from "./types";

/**
 * Comment se calcule le prix d'un transfert — article de réassurance.
 *
 * **Structure seulement, aucun montant ni pourcentage** : la grille s'édite
 * depuis l'onglet Tarifs, et un chiffre écrit ici serait faux au premier
 * ajustement. Ce que l'article décrit suit `lib/tarification/calcul.ts` et
 * `lib/reservation/devis.ts` :
 *  · prise en charge + distance × taux au km, par catégorie de véhicule ;
 *  · coefficient de destination, jamais appliqué sur un prix fixe ;
 *  · majorations samedi / dimanche, nuit qui s'y ajoute, périodes de saison ;
 *  · prix fixe par trajet qui remplace le calcul — les majorations restent dues
 *    sauf s'il a été posé pour le créneau exact ;
 *  · aller et retour chiffrés séparément, chacun à sa date et son véhicule ;
 *  · un seul calcul pour l'affichage et l'encaissement.
 * Si le modèle change (remise d'aller-retour validée, par exemple), relire ici.
 *
 * Exemples distance / durée : `src/data/distances.ts`.
 */
export const howSkiTransferPricesWork: Article = {
  slug: "how-ski-transfer-prices-are-calculated",
  titre: "How ski transfer prices are calculated, and what to check before you pay",
  metaTitre: "How Ski Transfer Prices Are Calculated | What to Check",
  metaDescription:
    "Distance, vehicle, resort access, Saturday and night pick-ups, fixed route prices: what goes into a fair ski transfer price, and why it is per vehicle.",
  chapo:
    "A ski transfer price can look arbitrary: two routes of similar length quoted very differently, a Saturday dearer than a Wednesday, a family of six paying what a couple pays. None of that is arbitrary when you know what the price is made of. This is how our prices are built, element by element — without figures, because the grid is reviewed through the season — and the handful of things worth checking before you pay anyone.",
  visuel: { nom: "blog-how-ski-transfer-prices-work", alt: "Minibus on winter tyres driving up a gritted mountain road between snowbanks" },
  datePublication: "2026-09-15",
  auteur: "Alps Ski Transfers",

  aRetenir: [
    "Our private transfer price starts from two elements set for each vehicle category: a pick-up charge per journey and a rate per kilometre of road distance from the airport to the resort.",
    "A destination coefficient adjusts the calculated price for resorts that cost more, or less, to serve than their distance suggests — a long mountain climb, a dead-end valley, a car-free resort where the road stops short.",
    "Saturday and Sunday pick-ups carry a weekend rate and late-night or early-morning pick-ups a night rate, which adds to the day's rate; they are published in the grid in advance, not set on the day by demand.",
    "On some routes a fixed price agreed for that route and vehicle replaces the distance calculation, and the destination coefficient never applies on top of it.",
    "The price is per vehicle, not per person, and tolls are included: two passengers and eight pay the same for the same vehicle and journey.",
  ],

  stationsLiees: ["val-thorens", "verbier", "avoriaz", "chamonix", "zermatt", "tasch", "flaine"],

  trajetsLies: [
    { airport: "geneva-airport", resort: "val-thorens" },
    { airport: "chambery-savoie-airport", resort: "val-thorens" },
    { airport: "lyon-airport", resort: "val-thorens" },
    { airport: "geneva-airport", resort: "verbier" },
    { airport: "geneva-airport", resort: "avoriaz" },
    { airport: "geneva-airport", resort: "chamonix" },
  ],

  contenu: [
    {
      type: "paragraphe",
      texte:
        "A fair ski transfer price is built from what the journey actually costs to run. At Alps Ski Transfers, the calculation starts from a pick-up charge and a rate per kilometre, both set for the vehicle category you choose, applied to the road distance between the airport and your resort. A destination coefficient then adjusts that result for resorts that are harder or easier to serve than their distance suggests. The day and time of the pick-up come next: weekend departures, and pick-ups late at night or in the early hours, carry published rates on top. On some routes, a fixed price agreed for that route replaces the distance calculation altogether. The result is one price for the whole vehicle, tolls included, quoted before you book and charged as quoted. It does not depend on how many passengers you are, and it does not move because a flight is delayed.",
    },

    { type: "titre2", texte: "The two building blocks: a pick-up charge and a rate per kilometre" },
    {
      type: "paragraphe",
      texte:
        "Every calculated price starts from the same two elements.",
    },
    {
      type: "liste",
      items: [
        "The pick-up charge is a fixed amount per journey. It covers what every transfer costs before the wheels turn: the driver's time to reach the airport and wait in the arrivals hall, the vehicle's preparation, the booking itself. It also acts as the floor of the price — no journey can cost less than it.",
        "The rate per kilometre applies to the road distance of the route. It carries the costs that grow with the journey: fuel, tolls, tyres, wear, and the driver's time on the road.",
      ],
    },
    {
      type: "paragraphe",
      texte:
        "The sum of the two is the base of the price. Why both, rather than a rate per kilometre alone? Because a short transfer is not simply a small fraction of a long one. A driver who collects you at Geneva for Les Gets, 69 km away, has still driven to the airport, parked, tracked the flight and waited for you; a price built only on distance would make short routes uneconomic and push their costs onto everyone else.",
    },

    { type: "titre3", texte: "Why the vehicle category changes the price" },
    {
      type: "paragraphe",
      texte:
        "Both building blocks are set separately for each of our three vehicle categories, because the vehicles do not cost the same to buy, insure or run.",
    },
    {
      type: "liste",
      items: [
        "Standard — Volkswagen Transporter, up to 8 passengers. The workhorse of Alpine transfers, with the most room for luggage.",
        "Business — Mercedes V-Class or Vito Tourer, up to 7 passengers, with a more comfortable cabin.",
        "Premium — Mercedes E-Class saloon, up to 4 passengers, for travellers who want a car rather than a minibus.",
      ],
    },
    {
      type: "paragraphe",
      texte:
        "The category you need is decided by your group and, in winter, by your luggage. Suitcases, ski bags and boot bags fill a boot faster than passengers fill seats, so declare them when you book: a vehicle that seats your party but cannot take its skis is not the cheaper option, it is the wrong one.",
    },

    { type: "titre2", texte: "Distance measured on the road, not on a map" },
    {
      type: "paragraphe",
      texte:
        "The distance in the calculation is the road distance of the route, measured on the road network from the airport to the resort. It is not a straight line, and it is not a figure copied from a brochure.",
    },
    {
      type: "paragraphe",
      texte:
        "Even measured properly, distance does not tell the whole story, because two routes of the same length can take very different times. From Geneva, Verbier is 163 km and about 2 h 09 on clear roads, while Val Thorens is 161 km and about 2 h 44 — most of the difference is the 37 km climb from Moûtiers. Chamonix is 91 km and about 1 h 25, Avoriaz 89 km and about 1 h 45. Similar kilometres, very different journeys, and very different days for the vehicle and the driver.",
    },
    {
      type: "paragraphe",
      texte:
        "The airport matters as much as the resort. Val Thorens is 122 km and about 1 h 40 from Chambéry, 161 km from Geneva and 200 km and about 2 h 33 from Lyon. The same resort from three airports gives three different distances, and so three different prices; choosing the airport is often the largest price decision of the trip.",
    },

    { type: "titre2", texte: "The destination coefficient: when a resort costs more to reach than its distance suggests" },
    {
      type: "paragraphe",
      texte:
        "Some resorts cost more to serve than their kilometres show; a few cost less. The destination coefficient is how the price accounts for that. It is a multiplier set per resort and applied to the calculated price, and it reflects things a distance cannot:",
    },
    {
      type: "liste",
      items: [
        "Access: a long climb of hairpins at the end of the route is slower, harder on the vehicle and more exposed to snow than the same distance of motorway.",
        "The return leg: a resort at the head of a dead-end valley means the vehicle usually drives back down empty.",
        "Where the road stops: for car-free resorts the drive ends at a terminal or car park — Zermatt transfers stop at Täsch — which shapes how the journey is organised.",
        "The time on the road: the gap between kilometres and minutes shown above is exactly what the coefficient corrects.",
      ],
    },
    {
      type: "paragraphe",
      texte:
        "Two points about how it is used. It applies only to a calculated price, never to a fixed route price, which is already the price intended for that destination. And it is a property of the resort, not of your booking: every traveller to the same resort, in the same vehicle, at the same time, gets the same result.",
    },

    { type: "titre2", texte: "Saturday, Sunday and night: what changes with the time of pick-up" },
    {
      type: "paragraphe",
      texte:
        "The day and hour of your pick-up can add a published rate to the base price. The moment that counts is the pick-up time, in local time at the airport or the resort.",
    },
    {
      type: "liste",
      items: [
        "Saturday: changeover day across the Alps, when a large share of the week's arrivals and departures happen on the same morning. Demand for vehicles and drivers peaks, roads are slower — the resort pages advise allowing up to an hour more on a February Saturday — and a vehicle does fewer journeys in its day.",
        "Sunday: part of the weekend too, with a weekend rate of its own, so a Sunday pick-up is not priced as a Monday.",
        "Night: a pick-up late at night or in the early hours carries a night rate. It adds to the day's rate, so a Saturday night pick-up carries both.",
      ],
    },
    {
      type: "paragraphe",
      texte:
        "This is not surge pricing. The rates are written into the grid in advance, they are the same for everyone travelling at that time, and they are inside the price you are quoted when you book. Nothing is recalculated on the day because the arrivals hall is busy or your flight lands late: a delayed landing moves your pick-up, not your price.",
    },
    {
      type: "paragraphe",
      texte:
        "The grid can also hold seasonal periods — school holidays, the Christmas weeks — where prices move up, and quieter periods where they can move down. If your dates are flexible, a midweek arrival outside the busiest weeks is the simplest way to pay less, and it usually saves time on the road as well.",
    },

    { type: "titre2", texte: "Fixed prices on established routes" },
    {
      type: "paragraphe",
      texte:
        "On some routes, a fixed price is agreed for the route and the vehicle category, and it takes precedence over the calculation. Fixed prices exist where a route is run often enough for its real cost to be well known, or where the calculation would not reflect it.",
    },
    {
      type: "paragraphe",
      texte:
        "A fixed price replaces the distance calculation, not the calendar. It can be set for a precise slot — weekday or weekend, day or night — in which case the weekend and night rates are already inside it. Where it is set as a single price for the route, those rates still apply on top, because a Saturday at midnight is still a Saturday at midnight. As noted above, the destination coefficient never applies to a fixed price.",
    },
    {
      type: "paragraphe",
      texte:
        "You do not need to work out which of the two applies to your route. The price shown when you enter your journey is the one that applies, whether it comes from a fixed route price or from the calculation, with the rates for your day and time already inside it.",
    },

    { type: "titre2", texte: "Why the price is per vehicle and not per person" },
    {
      type: "paragraphe",
      texte:
        "A private transfer is a vehicle and a driver committed to your journey: to the airport, through the wait, up the mountain and back down. None of those costs changes with the number of people on board. Fuel, tolls, the driver's time and the empty return are the same with two passengers as with eight.",
    },
    {
      type: "paragraphe",
      texte:
        "Pricing per person would therefore mean one of two things: couples paying less than the journey costs and groups paying more, or a price per head that quietly assumes a full vehicle. Pricing per vehicle is simply the honest unit. It is also what makes a private transfer good value for families and groups — a party of six shares one price rather than paying six.",
    },
    {
      type: "paragraphe",
      texte:
        "When you compare quotes, check the unit before the number. A per-seat price is a shared shuttle, and it multiplies with your party; a per-vehicle price does not.",
    },

    { type: "titre2", texte: "Return journeys: two prices, not one" },
    {
      type: "paragraphe",
      texte:
        "An outbound and a return transfer are two journeys, and each is priced on its own terms.",
    },
    {
      type: "liste",
      items: [
        "Each leg takes its own date and time: an outbound transfer on a Wednesday afternoon and a return on a Saturday morning are priced as exactly that, not as two Wednesdays.",
        "Each leg can use its own vehicle category: arrive as a couple in a Premium saloon and leave with friends in a Standard minibus, without paying for the larger vehicle both ways.",
        "Each leg can use its own route: land at Geneva and fly home from Lyon, and the return is priced on the Lyon distance.",
      ],
    },
    {
      type: "paragraphe",
      texte:
        "The total is the sum of the two, and you see it before you pay. Because the return is priced on its own date, a flight home on a Saturday morning carries the Saturday rate even if you arrived midweek — one more reason to check both legs before paying.",
    },

    { type: "titre2", texte: "When you get a quote rather than an instant price" },
    {
      type: "paragraphe",
      texte:
        "Most journeys are priced the moment you enter them. A few are not, and the reason is deliberate: when the calculation cannot give a reliable figure, it gives none rather than an approximate one. An approximate price is how travellers end up paying something different from what they were shown.",
    },
    {
      type: "liste",
      items: [
        "A route without a measured distance — an unusual pick-up point, a village that is not on our list — goes to a quote request, priced by hand on the real route.",
        "A party larger than the vehicle takes, or more luggage than its boot holds, cannot be put in one vehicle, so the form offers only the categories that take the load and, beyond the largest, asks you for a group quote.",
        "Groups over eight, several vehicles in convoy and arrivals on different flights are quoted by hand, as one journey, because the timings are part of the price.",
      ],
    },
    {
      type: "paragraphe",
      texte:
        "In each case you still get a fixed price before you commit. It simply comes from a person looking at the route rather than from the form, and it is built from the same elements described above.",
    },

    { type: "titre2", texte: "What should be inside a fixed price" },
    {
      type: "paragraphe",
      texte:
        "A price is only comparable if it covers the same journey. Ours includes the following, and any quote you compare it with should say clearly whether it does too:",
    },
    {
      type: "liste",
      items: [
        "Tolls and motorway fees for the whole route.",
        "Skis, snowboards and boot bags, carried at no extra charge.",
        "Child and booster seats, provided free and fitted before the driver leaves.",
        "Flight tracking, with the pick-up moved to your actual landing and no charge for the delay.",
        "Winter tyres and snow chains on board all season.",
        "The drive to your accommodation address, not to a drop-off point in the village.",
      ],
    },
    {
      type: "paragraphe",
      texte:
        "One more thing matters more than it sounds: the price you see and the price you pay should come from the same calculation. Ours does. The booking form sends a route, dates and a vehicle, and the price is calculated once, on our side, for both the page and the payment.",
    },

    { type: "titre2", texte: "What to check before you pay" },
    {
      type: "liste",
      items: [
        "The unit: per vehicle or per person, and for how many passengers.",
        "The vehicle: does the category take your passengers and your luggage, skis included?",
        "The pick-up time: is it the time you land, and does the quote reflect the right day and hour, including weekend and night rates?",
        "Both legs: does the return have its own date, time and vehicle, and is it priced as such?",
        "Inclusions: tolls, ski bags, child seats, waiting time after a delayed flight.",
        "The address: the exact accommodation, with its postcode, not just the resort name.",
        "The confirmation: route, date, time, vehicle category, passengers, price and what it includes, in writing.",
        "The cancellation terms, read before paying rather than after.",
      ],
    },
    {
      type: "paragraphe",
      texte:
        "If a quote answers all of these clearly, you can compare it fairly with any other. If it does not, the headline number is not yet the price.",
    },
  ],

  faq: [
    {
      question: "How is the price of a ski transfer calculated?",
      reponse:
        "Ours starts from a pick-up charge plus a rate per kilometre of road distance, both set for the vehicle category. A destination coefficient adjusts for resorts that are harder or easier to serve, and weekend and night pick-ups carry published rates. Some routes have a fixed price instead. The result is one price per vehicle, tolls included.",
    },
    {
      question: "Why does a Saturday ski transfer cost more?",
      reponse:
        "Saturday is changeover day across the Alps: demand for vehicles and drivers peaks, the roads are slower and each vehicle completes fewer journeys. Our Saturday rate is written into the grid in advance and included in the price quoted at booking — it is not surge pricing and it does not change on the day.",
    },
    {
      question: "Is a private ski transfer priced per person?",
      reponse:
        "No. A private transfer is priced per vehicle, because the cost of the journey does not change with the number of passengers. Two people pay the same as eight in the same vehicle. A per-person price usually indicates a shared shuttle, where the total grows with every traveller.",
    },
    {
      question: "Does the price change if my flight is delayed?",
      reponse:
        "No. We track your flight and move the pick-up to your actual landing time. The price is fixed when you book and a delay does not change it, even if the new landing time falls later in the day.",
    },
    {
      question: "Why do two transfers of similar distance have different prices?",
      reponse:
        "Because distance is not the only cost. A long climb of hairpins, a dead-end valley with an empty return, or a car-free resort all make a route cost more to run than its kilometres suggest. From Geneva, Verbier is 163 km and about 2 h 09, Val Thorens 161 km and about 2 h 44.",
    },
  ],
};
