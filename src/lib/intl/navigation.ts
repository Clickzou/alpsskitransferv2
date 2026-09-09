import { articlesPublies } from "@/lib/articles";
import type { Lang } from "@/lib/i18n";
import { CHEMIN_TUNNEL } from "@/lib/reservation/config";
import { lienReserver } from "./textes";

export interface LienNav {
  texte: string;
  chemin: string;
}

/**
 * La navigation principale, par langue.
 *
 * Elle ne pointe **que** vers des pages qui existent dans la langue courante,
 * à une exception près, marquée « (EN) » : les pages juridiques, qui restent en
 * anglais tant qu'un juriste ne les a pas validées dans l'autre langue. Un menu
 * qui promet six pages allemandes et en livre trois en allemand et trois en
 * anglais sans le dire est exactement le défaut relevé sur l'ancien site.
 *
 * Les slugs sont des mots-clés : `privattransfer`, `transfer-privato`. Ce sont
 * les requêtes de ces marchés, et elles vivent dans l'URL.
 */
const NAVIGATION_COMPLETE: Record<Lang, LienNav[]> = {
  en: [
    { texte: "Private transfers", chemin: "/private-airport-transfers-to-alps-ski-resort/" },
    // Les deux index du silo, côte à côte : où l'on va, d'où l'on part.
    { texte: "Ski resorts", chemin: "/ski-resort-transfers/" },
    { texte: "Airports", chemin: "/airport-ski-transfers/" },
    /*
       Groupes, agences, demandes sur mesure : la page qui capte ce qui ne
       rentre pas dans le tunnel standard. L'ancre dit « Groups » et non
       « Special inquiry » : le second est le nom interne du formulaire, il ne
       veut rien dire pour un visiteur et ne correspond à aucune recherche.
    */
    { texte: "Groups", chemin: "/inquiry/" },
    { texte: "Blog", chemin: "/blog/" },
    { texte: "Help", chemin: "/general-questions/" },
    { texte: "Contact", chemin: "/contact/" },
  ],
  fr: [
    { texte: "Stations", chemin: "/fr/" },
    { texte: "Transferts privés", chemin: "/fr/transferts-prives/" },
    { texte: "Comment réserver", chemin: "/fr/comment-reserver/" },
    { texte: "Blog", chemin: "/fr/blog/" },
    { texte: "Aide", chemin: "/fr/aide/" },
    { texte: "Contact", chemin: "/fr/contact/" },
  ],
  de: [
    { texte: "Skiorte", chemin: "/de/" },
    { texte: "Privattransfer", chemin: "/de/privattransfer/" },
    { texte: "So buchen Sie", chemin: "/de/transfer-buchen/" },
    { texte: "Blog", chemin: "/de/blog/" },
    { texte: "Hilfe", chemin: "/de/haeufige-fragen/" },
    { texte: "Kontakt", chemin: "/de/kontakt/" },
  ],
  it: [
    { texte: "Località", chemin: "/it/" },
    { texte: "Transfer privato", chemin: "/it/transfer-privato/" },
    { texte: "Come prenotare", chemin: "/it/come-prenotare/" },
    { texte: "Blog", chemin: "/it/blog/" },
    { texte: "Assistenza", chemin: "/it/domande-frequenti/" },
    { texte: "Contatti", chemin: "/it/contatti/" },
  ],
};

/**
 * La navigation d'une langue, amputée de ce qui n'existe pas encore.
 *
 * Concrètement : le blog. Il n'a d'articles qu'en anglais et en français, et un
 * menu qui mène à un index vide est la version polie du lien mort. Le jour où un
 * article allemand est publié, l'entrée réapparaît d'elle-même — c'est dérivé,
 * pas déclaré.
 */
export function navigation(lang: Lang): LienNav[] {
  const aUnBlog =
    lang === "en" || articlesPublies().some((a) => a.traductions?.[lang]);
  return NAVIGATION_COMPLETE[lang].filter((item) => aUnBlog || item.texte !== "Blog");
}

/** L'accueil de la langue. */
export function lienAccueil(lang: Lang): string {
  return lang === "en" ? "/" : `/${lang}/`;
}

/** Le tunnel de réservation de la langue. */
export function lienTunnelLangue(lang: Lang): string {
  return lang === "en" ? CHEMIN_TUNNEL : lienReserver(lang);
}

export interface ColonnePied {
  titre: string;
  liens: LienNav[];
}

/**
 * Les colonnes du pied de page, par langue.
 *
 * Le suffixe « (EN) » n'est pas une coquetterie : il prévient qu'un lien change
 * de langue. Les conditions de vente, les CGV, la confidentialité et les
 * mentions légales engagent juridiquement — les traduire sans validation
 * créerait deux versions divergentes d'un même engagement, et c'est un risque
 * réel, pas théorique.
 */
export function colonnesPied(lang: Lang): ColonnePied[] {
  const en = (texte: string) => (lang === "en" ? texte : `${texte} (EN)`);

  if (lang === "en") {
    return [
      {
        titre: "Booking",
        liens: [
          { texte: "Book tickets", chemin: "/book-ski-transfer-tickets/" },
          { texte: "Help & FAQ", chemin: "/general-questions/" },
          { texte: "Find your stop", chemin: "/find-your-stop/" },
          { texte: "Contact", chemin: "/contact/" },
        ],
      },
      {
        titre: "Services",
        liens: [
          {
            texte: "Private airport transfers",
            chemin: "/private-airport-transfers-to-alps-ski-resort/",
          },
          { texte: "Travel agencies", chemin: "/inquiry/" },
          { texte: "Ski resorts", chemin: "/ski-resort-transfers/" },
          { texte: "Help", chemin: "/help/" },
          { texte: "Lost luggage", chemin: "/lost-luggage/" },
        ],
      },
      {
        titre: "Resources",
        liens: [
          { texte: "Ticketing conditions", chemin: "/ticketing-conditions/" },
          { texte: "Terms & conditions", chemin: "/terms-conditions-alps-ski-transfers/" },
          { texte: "Privacy", chemin: "/privacy/" },
          { texte: "Cookies", chemin: "/cookie-policy-uk/" },
          { texte: "Legal notice", chemin: "/legal-notice/" },
        ],
      },
    ];
  }

  const juridiques = (titre: string): ColonnePied => ({
    titre,
    liens: [
      { texte: en("Ticketing conditions"), chemin: "/ticketing-conditions/" },
      { texte: en("Terms & conditions"), chemin: "/terms-conditions-alps-ski-transfers/" },
      { texte: en("Privacy"), chemin: "/privacy/" },
      { texte: "Cookies", chemin: "/cookie-policy-uk/" },
      { texte: en("Legal notice"), chemin: "/legal-notice/" },
    ],
  });

  if (lang === "fr") {
    return [
      {
        titre: "Réservation",
        liens: [
          { texte: "Réserver un transfert", chemin: "/fr/reserver/" },
          { texte: "Comment réserver", chemin: "/fr/comment-reserver/" },
          { texte: "Aide et questions", chemin: "/fr/aide/" },
          { texte: "Contact", chemin: "/fr/contact/" },
        ],
      },
      {
        titre: "Services",
        liens: [
          { texte: "Transferts privés", chemin: "/fr/transferts-prives/" },
          { texte: "Agences et professionnels", chemin: "/fr/agences-et-professionnels/" },
          { texte: en("Stations de ski"), chemin: "/ski-resort-transfers/" },
          { texte: en("Assistance"), chemin: "/help/" },
          { texte: en("Bagage perdu"), chemin: "/lost-luggage/" },
        ],
      },
      juridiques("Ressources"),
    ];
  }

  if (lang === "de") {
    return [
      {
        titre: "Buchung",
        liens: [
          { texte: "Transfer buchen", chemin: "/de/buchen/" },
          { texte: "So buchen Sie", chemin: "/de/transfer-buchen/" },
          { texte: "Häufige Fragen", chemin: "/de/haeufige-fragen/" },
          { texte: "Kontakt", chemin: "/de/kontakt/" },
        ],
      },
      {
        titre: "Leistungen",
        liens: [
          { texte: "Privattransfer", chemin: "/de/privattransfer/" },
          { texte: "Agenturen und Firmen", chemin: "/de/agenturen-und-firmen/" },
          { texte: en("Skiorte"), chemin: "/ski-resort-transfers/" },
          { texte: en("Hilfe"), chemin: "/help/" },
          { texte: en("Verlorenes Gepäck"), chemin: "/lost-luggage/" },
        ],
      },
      juridiques("Rechtliches"),
    ];
  }

  return [
    {
      titre: "Prenotazione",
      liens: [
        { texte: "Prenota un transfer", chemin: "/it/prenota/" },
        { texte: "Come prenotare", chemin: "/it/come-prenotare/" },
        { texte: "Domande frequenti", chemin: "/it/domande-frequenti/" },
        { texte: "Contatti", chemin: "/it/contatti/" },
      ],
    },
    {
      titre: "Servizi",
      liens: [
        { texte: "Transfer privato", chemin: "/it/transfer-privato/" },
        { texte: "Agenzie e aziende", chemin: "/it/agenzie-e-aziende/" },
        { texte: en("Località sciistiche"), chemin: "/ski-resort-transfers/" },
        { texte: en("Assistenza"), chemin: "/help/" },
        { texte: en("Bagaglio smarrito"), chemin: "/lost-luggage/" },
      ],
    },
    juridiques("Informazioni legali"),
  ];
}
