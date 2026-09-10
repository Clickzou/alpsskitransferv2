import type { PageFonctionnelle } from "./types";

/**
 * `/private-airport-transfers-to-alps-ski-resort/` — page de service du silo.
 * URL conservée par le plan de migration : ne pas la déplacer.
 *
 * **Ce module n'est plus produit par `npm run migrer:pages`.** La page a été
 * refondue le 9 septembre 2026 : gabarit `components/PageTransfertsPrives`,
 * contenu structuré dans `data/page-transferts-prives.ts`. Ne reste ici que ce
 * que la route et le contrôle SEO lisent — metas, H1, chapô, FAQ.
 *
 * Mot-clé propriétaire : **« private airport ski transfer »**. La carte
 * d'intention et le détail de la refonte sont dans l'en-tête du fichier de
 * données ; en deux mots, la reprise WordPress publiait le bloc des dix
 * aéroports **deux fois**, des listes de stations tronquées à une ligne, des
 * réponses de FAQ amputées des listes qui les complétaient, et sept mentions de
 * transfert partagé.
 *
 * La FAQ ci-dessous est **recomposée** : chaque réponse récupère la liste qui
 * lui appartenait et qui traînait dans le corps de page.
 */
export const privateAirportTransfersToAlpsSkiResort: PageFonctionnelle = {
  slug: "private-airport-transfers-to-alps-ski-resort",
  metaTitre: "Private Airport Ski Transfers | Door to Door to the Alps",
  metaDescription: "Private airport ski transfers to the Alps. Fixed price per vehicle, no waiting and no stops, with drive times from Geneva, Lyon, Chambéry and Zurich.",
  h1: "Private Airport Ski Transfers — Direct, Door to Door, to Your Resort",
  chapo: "Looking for a private airport ski transfer that gets you to your resort quickly and comfortably? Our transfers are door to door: no waiting, no extra stops, and one fixed price for the whole vehicle.",

  /*
   * Vide, et c'est voulu : le contenu est structuré en sections dans
   * `data/page-transferts-prives.ts`, mis en page par `PageTransfertsPrives`.
   */
  contenu: [],

  faq: [
    {
      question: "What is a private airport ski transfer?",
      reponse:
        "It is a vehicle booked for you alone, from the airport to your accommodation. Unlike public transport, it leaves when you land rather than on a timetable, takes the direct road with no stops at other resorts, and drops you at your door rather than at a bus station in the village. You travel with an experienced driver who knows these mountain roads in winter.",
    },
    {
      question: "Are child seats available?",
      reponse:
        "Yes, and at no extra charge. Baby seats and booster seats are fitted before your driver leaves for the airport, so tell us the ages of your children when you book rather than on the day. We also allow for family luggage and ski equipment when we choose the vehicle, and any specific requirement is easier to meet if we know it in advance.",
    },
    {
      question: "How much does a private ski transfer cost?",
      reponse:
        "The price depends on the airport, the distance to your resort, the vehicle category and the time of year. It is quoted per vehicle and not per seat, so a group of six pays the same as a couple — which usually makes a private transfer cheaper per person than it first appears. Enter your journey on the site to see your price before you commit; tolls are included and nothing is added on arrival.",
    },
    {
      question: "What are the benefits of a private transfer?",
      reponse:
        "Direct transport with no waiting for other passengers and no detours. Comfortable, spacious vehicles with dedicated space for skis and boards. Door-to-door service, from the arrivals hall to your accommodation. And flexibility: your pick-up time follows your flight, so a delayed landing costs you nothing and requires nothing from you.",
    },
    {
      question: "How long does the transfer take?",
      reponse:
        "From Geneva, count roughly 1 h 25 to Chamonix, 1 h 30 to Morzine, 2 h 25 to Méribel and 3 h 05 to Tignes. From Chambéry, the Three Valleys are closer still. The table above gives the measured road distance and drive time for every airport we serve — without traffic. Snow, chain controls and Saturday changeover traffic add to these times, and your driver plans for them.",
    },
    {
      question: "Which airports do you transfer from?",
      reponse:
        "Geneva, Lyon, Chambéry-Savoie, Grenoble-Isère, Turin, Milan Malpensa, Zurich, Salzburg, Nice and Paris Charles de Gaulle, among others. Geneva is the most used gateway to the French Alps; Chambéry is the closest airport to the Three Valleys. Each airport has its own page listing the resorts it serves and the drive time to each.",
    },
    {
      question: "Which ski resorts can I reach by transfer?",
      reponse:
        "The main resorts of the French, Swiss and Italian Alps — among them Val Thorens, the highest resort in Europe; Chamonix, at the foot of Mont Blanc; Tignes and Val d'Isère in the Espace Killy; and Morzine, in the Portes du Soleil. Each resort has its own page with the transfer times from every airport that serves it.",
    },
    {
      question: "Can I book for a group or through an agency?",
      reponse:
        "Yes. Groups, travel agencies, chalet companies and anything that does not fit the standard booking form go through a special inquiry: tell us the numbers, the dates and the pick-up points, and we build the quote around them.",
    },
  ],
};
