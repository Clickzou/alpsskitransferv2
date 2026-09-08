import type { Transfer } from "./types";

/** Genève → Grindelwald — rédigé à la main (liaison manquante de l'audit). */
export const genevaAirportToGrindelwald: Transfer = {
  airport: "geneva-airport",
  resort: "grindelwald",

  metaTitre: "Geneva to Grindelwald Transfers | 233 km, 3 hours",
  metaDescription:
    "Private transfers from Geneva Airport to Grindelwald: 233 km, about 3 hours through Bern and Interlaken. Fixed price per vehicle, ski bags included.",
  h1: "Geneva to Grindelwald Transfers",
  chapo:
    "Grindelwald is 233 km from Geneva Airport, about 3 hours by road, on motorway through Lausanne and Bern to Interlaken and then 20 km up the valley to the village at 1,034 m. Zurich is closer to the Bernese Oberland, but Geneva has the widest European flight choice — and this drive is one of the easiest long transfers in the Alps, with no pass to cross. The price is fixed per vehicle, Swiss motorway vignette and tolls included, and quoted before you book. Ski bags and child seats are included, and your driver tracks your flight.",

  contenu: [
    { type: "titre2", texte: "The route" },
    {
      type: "paragraphe",
      texte:
        "Motorway along Lake Geneva to Lausanne, north to Bern, then east to Interlaken — around two and a half hours of it, at Swiss motorway speeds, with the lakes on one side for most of the way. The last stretch leaves the motorway at Interlaken Ost and climbs the Lütschental to Grindelwald, under the north face of the Eiger.",
    },
    {
      type: "paragraphe",
      texte:
        "No col, no tunnel toll, no border: from Geneva to Grindelwald you never leave Switzerland, and the only climbing is the final 600 m into the valley.",
    },

    { type: "titre2", texte: "Winter timings" },
    {
      type: "paragraphe",
      texte:
        "Three hours holds well: this is motorway that is cleared and gritted as a matter of national routine, and Swiss traffic on it is disciplined. The predictable slowdowns are Friday evenings around Bern and Saturday mornings on the Interlaken road in the high season — allow 30 to 45 minutes more then.",
    },
    {
      type: "paragraphe",
      texte:
        "Our vehicles carry winter tyres and chains and the Swiss motorway vignette. The vignette is included in your price, as are all tolls.",
    },

    { type: "titre2", texte: "Grindelwald, and the villages you cannot drive to" },
    {
      type: "paragraphe",
      texte:
        "Grindelwald itself is reached by road, so we drop you at your hotel or chalet. Its neighbours are not all so simple: Wengen has no road at all and is reached by cog railway from Lauterbrunnen, and Mürren by cable car or funicular. If your booking is in one of those, this transfer becomes a Lauterbrunnen transfer plus a train — tell us and we set the drop-off against a departure time.",
    },

    { type: "titre2", texte: "What the price includes" },
    {
      type: "liste",
      items: [
        "Swiss motorway vignette and all tolls on the route.",
        "Ski and snowboard bags, at no extra charge.",
        "Child and booster seats, fitted before departure.",
        "Flight tracking and waiting time if you land late.",
        "Door-to-door service in Grindelwald, Grund, Wargistal or the Terrassenweg.",
      ],
    },

    { type: "titre2", texte: "Private or shared, and when to book" },
    {
      type: "paragraphe",
      texte:
        "Three hours is a journey where a private vehicle earns its price: it leaves when you land, it stops when you ask, and it goes to the door. Book as soon as your flights are confirmed — the Jungfrau region fills for Christmas, New Year and the January Lauberhorn race week.",
    },
  ],

  faq: [
    {
      question: "How long is the Geneva to Grindelwald transfer?",
      reponse:
        "About 3 hours for 233 km, motorway almost the whole way through Bern and Interlaken. Allow 30 to 45 minutes more on a busy Saturday.",
    },
    {
      question: "Is Zurich a better airport for Grindelwald?",
      reponse:
        "Zurich is closer — around 2 h 20 — and better for long-haul. Geneva has the widest choice of European flights, and the drive is easy motorway; choose on the flight rather than the distance.",
    },
    {
      question: "Can you take us to Wengen or Mürren?",
      reponse:
        "Not by road — neither has one. We drop at Lauterbrunnen station for the Wengen cog railway, or at the funicular or Stechelberg cable car for Mürren, timed against a departure.",
    },
    {
      question: "Is the Swiss motorway vignette included?",
      reponse:
        "Yes. The vignette and all tolls are in the quoted price; there is nothing to pay on the day.",
    },
    {
      question: "What if my flight is delayed?",
      reponse:
        "Your driver tracks the flight and adjusts the pick-up to the actual landing time; waiting time is included.",
    },
  ],
};
