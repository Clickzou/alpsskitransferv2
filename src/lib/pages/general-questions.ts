import type { PageFonctionnelle } from "./types";

/**
 * `/general-questions/` — la FAQ du site.
 * URL conservée par le plan de migration : ne pas la déplacer.
 *
 * **Ce module n'est plus produit par `npm run migrer:pages`.** Refondu le
 * 9 septembre 2026.
 *
 * ## Ce que la reprise avait produit
 *
 * Une page de **réponses sans questions**. Les intitulés vivaient dans des
 * accordéons Elementor — des widgets, pas du texte — et seules les réponses ont
 * été extraites. Résultat en ligne : huit paragraphes qui commençaient par
 * « Yes, subject to availability… » sans qu'on sache à quoi ils répondaient.
 * Et par-dessus, trois défauts de la même origine :
 *
 * · **les huit réponses figuraient deux fois**, à la suite ;
 * · l'une était **tronquée de sa première lettre** — « es. You can modify… » ;
 * · une autre était **répétée deux fois d'affilée**, à l'identique.
 *
 * Les questions sont donc réécrites à partir des réponses, qui les dictent sans
 * ambiguïté. Le fond vient du WordPress ; c'est la structure qui manquait.
 *
 * Mot-clé propriétaire : **« ski transfer faq »**. La page ne concurrence rien —
 * elle répond, elle ne vend pas — et son balisage `FAQPage` la rend éligible aux
 * questions-réponses affichées directement dans les résultats de recherche.
 */
export const generalQuestions: PageFonctionnelle = {
  slug: "general-questions",
  metaTitre: "Ski Transfer FAQ | Booking, Luggage, Prices & Delays",
  metaDescription: "Answers to the questions we are asked most: vehicles, prices, ski bags, child seats, delayed flights, changes and payment.",
  h1: "Ski Transfer FAQ — Your Questions Answered",
  chapo: "Booking, luggage, winter equipment, delayed flights and payment. If your question is not here, we answer the phone and the emails ourselves.",

  /*
   * Vide : la page est bâtie par `PageAide`, qui rend la FAQ ci-dessous en
   * accordéon et y ajoute les deux orientations de fin. Rien à mettre en corps
   * de texte — une FAQ se lit en cherchant, pas en lisant du début à la fin.
   */
  contenu: [],

  faq: [
    {
      question: "How do I book a transfer?",
      reponse:
        "Online, in a few steps: choose your route, your date and time, add the passenger details and confirm your payment securely. You receive an instant confirmation by email. For a group of more than eight people, or anything out of the ordinary, send us a special inquiry instead and we quote it by hand.",
    },
    {
      question: "What vehicles do you use?",
      reponse:
        "A range of comfortable vehicles to suit solo travellers, families and larger groups: the Standard Transporter takes up to 8 passengers, the Business V-Class up to 7 in more comfort, and the Premium saloon up to 4. All of them are equipped for winter conditions. In winter the boot fills up before the seats do, so tell us how many bags and ski carriers you have when you book.",
    },
    {
      question: "How much does a transfer cost?",
      reponse:
        "The price depends on the airport, the distance to your resort, the vehicle category and the time of year. It is quoted per vehicle rather than per seat, so it does not change with the number of passengers — a group of six pays what a couple pays. Tolls are included, and nothing is added on arrival.",
    },
    {
      question: "How can I pay?",
      reponse: "We accept major credit cards, debit cards and secure online payment systems.",
    },
    {
      question: "Can I change or cancel my booking?",
      reponse:
        "Yes. You can modify or cancel your booking by contacting us in advance. Our policies are flexible and depend on how much notice you give — the details are in our ticketing conditions.",
    },
    {
      question: "Can I book at the last minute?",
      reponse:
        "Yes, subject to availability. We recommend booking at least 24 hours in advance, but we will do our best to accommodate urgent requests. In the February school holidays, availability tightens well before that.",
    },
    {
      question: "What happens if my flight is delayed?",
      reponse:
        "Nothing you need to do. We track your flight number and move the pick-up to your actual landing time. Your driver waits for you in the arrivals hall, and a delay does not change the price you were quoted.",
    },
    {
      question: "Will the driver meet us at arrivals?",
      reponse:
        "Yes. Our drivers meet you at arrivals with a name sign and help with your luggage. There is no meeting point to find and no shuttle to catch.",
    },
    {
      question: "Are your vehicles equipped for winter?",
      reponse:
        "Yes. All our vehicles carry snow tyres and the equipment needed for safe travel in the Alps, all season — as the law requires in Savoie and Haute-Savoie from 1 November to 31 March, and in Austria in wintry conditions.",
    },
    {
      question: "Can you carry skis, snowboards and child seats?",
      reponse:
        "Yes, and neither is charged as an extra. Skis, boards and boot bags travel with you; child and booster seats are fitted before your driver leaves for the airport. Tell us the ages of your children and the number of ski carriers when you book, so we send a vehicle that fits.",
    },
    {
      question: "How do I contact you?",
      reponse:
        "By email, by phone, or through the contact form. We answer them ourselves, and a real answer usually comes back the same day.",
    },
  ],
};
