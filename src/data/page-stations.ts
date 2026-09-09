/**
 * `/ski-resort-transfers/` — l'index des destinations.
 *
 * ## Mot-clé et intention
 *
 * **Mot-clé propriétaire : « ski resort transfers »** — intention exploratoire :
 * « où allez-vous ? ». C'est la seule requête générique de destination du site,
 * et cette page est la seule à pouvoir la porter. Elle se place **au-dessus des
 * hubs pays** dans le silo, sans les concurrencer : `/france-ski-transfers/`
 * porte « France ski transfers », elle porte le niveau tous pays.
 *
 * Requêtes secondaires : « ski transfer destinations », « which ski resorts do
 * you serve », « airport transfer to {pays} ski resorts ».
 *
 * Depuis le 9 septembre 2026, elle est aussi la cible du lien **« All resorts »**
 * de la barre de navigation, présent sur chaque page : c'est devenu la porte
 * d'entrée des destinations, et elle doit donc **toutes** les montrer.
 *
 * ## Pourquoi le contenu est refondu
 *
 * La reprise WordPress promettait un index et n'en était pas un :
 *
 * - **Onze stations en tout**, sur soixante-huit desservies — et listées
 *   **deux fois** dans la même page, une fois par pays puis une fois en bloc.
 * - **Des durées écrites à la main, dont plusieurs fausses** : Zermatt annoncé
 *   à « 3h30 from Zurich » pour 4 h 17 réelles, Chamonix à « 1h15 » pour 1 h 25,
 *   Verbier à « 2h » pour 2 h 09.
 * - **Quinze mentions de transfert partagé**, dont une section entière et une
 *   question de FAQ — un service que le site ne vend pas.
 * - Des réponses de FAQ amputées des listes qui les complétaient, restées dans
 *   le corps de page.
 *
 * La liste est donc **générée depuis les registres** : toutes les stations qui
 * ont une page, leur aéroport le plus rapide et le temps de route mesuré. Une
 * station ajoutée au registre apparaît ici sans que personne y pense.
 */

export const PAGE_STATIONS = {
  motCle: "ski resort transfers",

  heroImage: {
    nom: "station-alpes",
    alt: "Snow-covered Alpine ski resort seen from the slopes",
  },

  /** Illustration de l'introduction, à droite du texte. */
  introImage: {
    nom: "stations-index",
    alt: "Skiers looking out over an Alpine resort at the end of their transfer",
  },

  intro: [
    "Our ski resort transfers run from the major airports of the Alps — Geneva, Lyon, Chambéry, Grenoble, Turin, Milan, Zurich and Salzburg — to the resorts of France, Switzerland, Italy and Austria. Every destination below has its own page, with the road distance and drive time from each airport that serves it.",
    "Pick your resort to see the transfers available, or start from your airport if you already know where you land. Drive times are measured on the real routes and given without traffic.",
  ],

  destinations: {
    surtitre: "Destinations",
    titre: "Every ski resort we transfer to",
    chapo:
      "Grouped by country, with the fastest airport for each and the drive time from it. Follow a resort to see all the airports that serve it.",
  },

  pourquoi: {
    surtitre: "What you get",
    titre: "The same service to every resort",
    chapo:
      "Wherever you are going, the transfer works the same way — and the price is agreed before you travel.",
    points: [
      {
        titre: "Door to door",
        texte:
          "Your driver meets you in the arrivals hall and takes you to your chalet or hotel. No shuttle to catch once you reach the village.",
      },
      {
        titre: "One price per vehicle",
        texte:
          "Quoted before you book, tolls included. It does not change with the number of passengers, nor on the day.",
      },
      {
        titre: "Flight tracking",
        texte:
          "We follow your flight number. A late landing moves the pick-up, at no extra cost.",
      },
      {
        titre: "Winter-equipped vehicles",
        texte:
          "Winter tyres and chains on board all season, as the law requires in the Alps from November to spring.",
      },
    ],
  },
} as const;
