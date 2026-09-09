import { ENTREPRISE } from "@/data/site";
import type { PageFonctionnelle } from "./types";

/**
 * Politique de cookies — **réécrite le 9 septembre 2026**.
 *
 * La page reprise du WordPress faisait **trois mots** : un titre et rien
 * d'autre. Elle annonçait par ailleurs un régime britannique (« UK » jusque dans
 * l'URL) alors que l'éditeur est une entreprise française : c'est le RGPD et
 * l'article 82 de la loi Informatique et Libertés qui s'appliquent, sous le
 * contrôle de la CNIL.
 *
 * **L'URL reste `/cookie-policy-uk/`** : elle est dans le plan de migration, et
 * la déplacer coûterait une redirection pour rien — une page en `noindex` que
 * personne ne recherche. Seul le contenu change.
 *
 * Ce module n'est plus régénéré par `migrer:pages` : il n'y avait rien à
 * reprendre, et une réexécution du script effacerait ce texte.
 *
 * **À FAIRE RELIRE PAR LE CLIENT**, et surtout à confronter à la réalité
 * technique du site le jour de la mise en ligne : ce qui est écrit ici doit
 * décrire les cookies réellement déposés, pas ceux qu'on imagine. Le site n'en
 * dépose aujourd'hui aucun à des fins de mesure — c'est la meilleure des
 * situations, et elle mérite d'être dite.
 */
export const cookiePolicyUk: PageFonctionnelle = {
  slug: "cookie-policy-uk",
  metaTitre: "Cookie policy | Alps Ski Transfers",
  metaDescription: "Which cookies this website uses, what they are for, and how to control them.",
  h1: "Cookie policy",
  chapo:
    "This page explains which cookies alpsskitransfers.com places on your device, what they are used for, and how you can control them.",
  noindex: true,

  contenu: [
    { type: "titre2", texte: "What a cookie is" },
    {
      type: "paragraphe",
      texte:
        "A cookie is a small text file stored on your device when you visit a website. It lets the site remember your actions and preferences between pages and between visits. Similar technologies — local storage, pixels, tags — serve the same purpose and are covered by this policy.",
    },

    { type: "titre2", texte: "Cookies we use" },
    {
      type: "paragraphe",
      texte:
        "We keep this to the minimum. The website is built as static pages and does not run advertising or profiling scripts, so there is nothing to consent to for simply reading it.",
    },
    {
      type: "liste",
      items: [
        "Strictly necessary cookies — used to keep your booking together while you move through the steps, and to keep the payment page secure. Without them the booking process cannot work. These do not require your consent.",
        "Preference storage — if you fill in a search and do not complete it, your entries may be kept in your browser so you do not have to type them again. This stays on your device and is never sent to us.",
        "Payment provider cookies — when you reach the payment page, our payment provider sets its own cookies to detect fraud and secure the transaction. These are necessary to take a payment.",
      ],
    },
    {
      type: "paragraphe",
      texte:
        "We do not currently use analytics, advertising or social media cookies. If that changes, this page will be updated and your consent will be requested before any such cookie is placed — consent that you can refuse as easily as you give it, and withdraw at any time.",
    },

    { type: "titre2", texte: "How long they last" },
    {
      type: "paragraphe",
      texte:
        "Cookies needed for a booking last for the session or for the time needed to complete it. Where a cookie requiring consent is introduced, its lifetime will not exceed thirteen months, and consent will be sought again at the end of that period, in line with CNIL guidance.",
    },

    { type: "titre2", texte: "Controlling cookies" },
    {
      type: "paragraphe",
      texte:
        "You can accept or refuse cookies in your browser settings, and delete those already stored. Every major browser — Chrome, Safari, Firefox, Edge — offers this in its privacy settings. Be aware that blocking strictly necessary cookies will prevent a booking from being completed.",
    },

    { type: "titre2", texte: "Your rights" },
    {
      type: "paragraphe",
      texte: `Cookies that read or write information on your device are governed by the General Data Protection Regulation and by article 82 of the French Data Protection Act. You may exercise your rights of access, rectification, erasure and objection by writing to ${ENTREPRISE.email}, and you may lodge a complaint with the CNIL, the French supervisory authority, at cnil.fr.`,
    },
    {
      type: "paragraphe",
      texte:
        "For everything else we do with your personal data — bookings, payments, driver allocation — see our privacy policy.",
    },

    { type: "titre2", texte: "Changes to this policy" },
    {
      type: "paragraphe",
      texte:
        "This policy is updated whenever the cookies used by the website change. [À REMPLACER — dater la mise en ligne, puis chaque révision.]",
    },
  ],

  faq: [],
};
