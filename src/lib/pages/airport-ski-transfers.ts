import type { PageFonctionnelle } from "./types";

/**
 * `/airport-ski-transfers/` — l'index des aéroports.
 *
 * **URL récupérée, pas créée.** C'était le hub de l'une des quatre
 * arborescences que la refonte supprime, et le plan de migration l'envoyait
 * d'abord en 301 vers l'accueil. C'était dommage : 598 mots, un title calibré,
 * et l'antériorité sur « airport ski transfers ». Ses **95 pages filles**
 * partent bien en 301 vers le silo — c'est l'arborescence qui disparaît, pas
 * cette page. Elle revient comme index, symétrique de `/ski-resort-transfers/` :
 * l'une répond « où allez-vous ? », l'autre « d'où est-ce que je pars ? ».
 *
 * Le garde-fou est simple, et il faut s'y tenir : **rien ne se republie sous
 * cette racine.** Un trajet vit sous sa station, jamais sous son aéroport, sans
 * quoi on recrée la cannibalisation qui fait exister Val Thorens sur sept URL.
 *
 * Mot-clé propriétaire : **« airport ski transfers »**. Elle ne concurrence pas
 * les hubs d'aéroport — `/switzerland-ski-transfers/geneva-airport/` porte
 * « Geneva airport ski transfers » — ni `/ski-resort-transfers/`, qui porte les
 * destinations.
 *
 * Contenu et liste **générés depuis le registre** par `components/PageAeroports` :
 * les 31 aéroports, leur pays, et le nombre de stations qu'ils desservent.
 */
export const airportSkiTransfers: PageFonctionnelle = {
  slug: "airport-ski-transfers",
  metaTitre: "Airport Ski Transfers | Every Airport We Drive From",
  metaDescription: "All the airports we run ski transfers from, across France, Switzerland, Italy and Austria, with the resorts each one serves and the drive times.",
  h1: "Airport Ski Transfers — Every Airport We Drive From",
  chapo: "Landing at Geneva, Lyon, Zurich or Turin? Find your airport below to see the resorts it serves, the road distance to each and the drive time, then book a private door-to-door transfer.",

  contenu: [],

  faq: [
    {
      question: "Which airport should I fly into for the Alps?",
      reponse:
        "Geneva serves the widest range of French and Swiss resorts and has the most flights, which usually makes it the cheapest to reach. Chambéry is closest to the Three Valleys and to the Tarentaise. Grenoble suits the Isère resorts, Turin the Italian ones, Zurich the Swiss and the Arlberg, Salzburg the Austrian. Compare the drive time as well as the airfare: two hours saved on the road is worth a lot on a Saturday in February.",
    },
    {
      question: "Do you cover every airport in this list?",
      reponse:
        "Yes — each airport listed has its own page showing the resorts we drive to from it, with the measured road distance and drive time for each. If your airport is not listed, or your route is unusual, send us a special inquiry: the list covers what we run regularly, not the limits of where we can drive.",
    },
    {
      question: "How long before my flight lands should I book?",
      reponse:
        "As early as you reasonably can. Availability tightens as the school holidays approach, and Saturday is the changeover day across the Alps — the busiest of the week on every mountain road. Booking early also means the vehicle category you want is still free, which matters more than it sounds when you travel with skis.",
    },
    {
      question: "What happens if my flight is delayed?",
      reponse:
        "Nothing you need to do. We track your flight number and move the pick-up to your actual landing time. Your driver waits for you in the arrivals hall, and a delay does not change the price you were quoted.",
    },
  ],
};
