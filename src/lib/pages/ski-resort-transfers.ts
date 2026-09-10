import type { PageFonctionnelle } from "./types";

/**
 * `/ski-resort-transfers/` — l'index des destinations.
 * URL conservée par le plan de migration : ne pas la déplacer.
 *
 * **Ce module n'est plus produit par `npm run migrer:pages`.** Refondue le
 * 9 septembre 2026 : gabarit `components/PageStations`, contenu structuré dans
 * `data/page-stations.ts`, et la liste des stations **générée depuis le
 * registre**. Ne reste ici que ce que la route et le contrôle SEO lisent.
 *
 * Mot-clé propriétaire : **« ski resort transfers »**, l'unique requête
 * générique de destination du site. Elle se place au-dessus des hubs pays sans
 * les concurrencer : `/france-ski-transfers/` porte « France ski transfers ».
 *
 * Ce que la reprise WordPress publiait, et qui a motivé la refonte : onze
 * stations sur soixante-huit, **listées deux fois**, des durées écrites à la
 * main dont plusieurs fausses (Zermatt à « 3h30 from Zurich » pour 4 h 17), et
 * quinze mentions de transfert partagé — dont une section entière et une
 * question de FAQ pour un service que le site ne vend pas.
 */
export const skiResortTransfers: PageFonctionnelle = {
  slug: "ski-resort-transfers",
  metaTitre: "Ski Resort Transfers | All Our Alpine Destinations",
  metaDescription: "Every ski resort we transfer to in France, Switzerland and Italy, with the drive time from the nearest airport. Private door-to-door transfers.",
  h1: "Ski Resort Transfers — Every Destination We Drive To",
  chapo: "Private airport transfers to the ski resorts of the French, Swiss and Italian Alps. Find your resort below, with the drive time from the airport that serves it fastest.",

  /*
   * Vide, et c'est voulu : la page est bâtie par `PageStations` à partir du
   * registre des stations et des itinéraires calculés.
   */
  contenu: [],

  faq: [
    {
      question: "Which ski resorts do you transfer to?",
      reponse:
        "Every resort listed on this page, across France, Switzerland and Italy — among them Val Thorens, Courchevel, Méribel, Chamonix, Morzine, Tignes, Val d'Isère, Verbier, Zermatt, Cervinia, Courmayeur and Sestriere. If your resort is not listed, send us a special inquiry: the list covers the destinations we serve regularly, not the limits of where we can drive.",
    },
    {
      question: "How do I choose my departure airport?",
      reponse:
        "Start from where the flights are, then compare the drive. Geneva serves the widest range of French resorts, Chambéry is closest to the Three Valleys, Grenoble suits the Isère valley, Zurich covers the Swiss resorts. Each resort page lists every airport that serves it with the measured drive time, so the comparison takes a few seconds.",
    },
    {
      question: "What does a ski resort transfer cost?",
      reponse:
        "It depends on the airport, the distance, the vehicle category and the time of year. The price is per vehicle rather than per seat, so it does not change with the number of passengers — a family of six pays what a couple pays. Enter your journey to see your price before booking; tolls are included and nothing is added on arrival.",
    },
    {
      question: "How long does the transfer take?",
      reponse:
        "The time shown next to each resort is the drive from the airport that serves it fastest, measured on the real route and without traffic. Snow, chain controls and Saturday changeover traffic add to it — in high season, a Saturday transfer to the Tarentaise can take an hour longer than the same drive midweek.",
    },
    {
      question: "Do you drive to the accommodation or to the resort centre?",
      reponse:
        "To your accommodation. Your driver takes you to the chalet, hotel or apartment address you give when booking, not to a drop-off point in the village. Give the full address with its postcode when you book — mountain addresses are the ones satellite navigation gets wrong most often.",
    },
    {
      question: "Can you collect us from a train station or a city?",
      reponse:
        "Yes. Airports are the usual starting point, but transfers also run from the TGV stations of the Tarentaise, from Geneva and Chambéry city centres, and between resorts. Anything that is not a standard airport run goes through a special inquiry so we can quote it properly.",
    },
  ],
};
