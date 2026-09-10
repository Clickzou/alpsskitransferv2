import { articlesPublies } from "@/lib/articles";
import { SEGMENT_AEROPORTS, SEGMENT_STATIONS, type Lang, type LangueSecondaire } from "@/lib/i18n";
import { HUBS_PAYS } from "@/lib/pays-intl";
import { PAYS } from "@/lib/pays";
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
    { texte: "Stations", chemin: "/fr/transferts-ski/" },
    { texte: "Aéroports", chemin: "/fr/aeroports/" },
    { texte: "Transferts privés", chemin: "/fr/transferts-prives/" },
    { texte: "Comment réserver", chemin: "/fr/comment-reserver/" },
    { texte: "Blog", chemin: "/fr/blog/" },
    { texte: "Aide", chemin: "/fr/aide/" },
    { texte: "Contact", chemin: "/fr/contact/" },
  ],
  de: [
    { texte: "Skiorte", chemin: "/de/skitransfer/" },
    { texte: "Flughäfen", chemin: "/de/flughaefen/" },
    { texte: "Privattransfer", chemin: "/de/privattransfer/" },
    { texte: "So buchen Sie", chemin: "/de/transfer-buchen/" },
    { texte: "Blog", chemin: "/de/blog/" },
    { texte: "Hilfe", chemin: "/de/haeufige-fragen/" },
    { texte: "Kontakt", chemin: "/de/kontakt/" },
  ],
  it: [
    { texte: "Località", chemin: "/it/trasferimenti-sci/" },
    { texte: "Aeroporti", chemin: "/it/aeroporti/" },
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

  /*
    Deux natures de document, deux traitements.

    Les mentions légales et la politique de cookies **décrivent** : qui édite le
    site, ce qu'il dépose sur l'appareil du visiteur. Les publier en anglais
    pour un lecteur allemand était le contraire de leur objet — un éditeur
    français doit se faire comprendre de ceux à qui il vend, et le RGPD raisonne
    en langue du destinataire. Elles sont donc traduites.

    Les conditions de billetterie, les conditions générales et la politique de
    confidentialité **engagent** : elles restent en anglais tant qu'un juriste
    ne les a pas validées ailleurs, parce que deux versions divergentes d'un même
    engagement sont un risque, pas un service. Le suffixe « (EN) » le dit.
  */
  const JURIDIQUES_TRADUITES: Record<
    LangueSecondaire,
    { cookies: LienNav; mentions: LienNav }
  > = {
    fr: {
      cookies: { texte: "Cookies", chemin: "/fr/politique-cookies/" },
      mentions: { texte: "Mentions légales", chemin: "/fr/mentions-legales/" },
    },
    de: {
      cookies: { texte: "Cookie-Richtlinie", chemin: "/de/cookie-richtlinie/" },
      mentions: { texte: "Impressum", chemin: "/de/impressum/" },
    },
    it: {
      cookies: { texte: "Cookie", chemin: "/it/informativa-cookie/" },
      mentions: { texte: "Note legali", chemin: "/it/note-legali/" },
    },
  };

  const juridiques = (titre: string): ColonnePied => {
    const traduites = JURIDIQUES_TRADUITES[lang as LangueSecondaire];
    return {
      titre,
      liens: [
        { texte: en("Ticketing conditions"), chemin: "/ticketing-conditions/" },
        { texte: en("Terms & conditions"), chemin: "/terms-conditions-alps-ski-transfers/" },
        { texte: en("Privacy"), chemin: "/privacy/" },
        traduites.cookies,
        traduites.mentions,
      ],
    };
  };

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
          { texte: "Stations de ski", chemin: "/fr/transferts-ski/" },
          { texte: "Aéroports desservis", chemin: "/fr/aeroports/" },
          // La page locale : elle vit dans le pied, pas dans le menu, parce
          // qu'elle vise un bassin de vie et non le silo.
          { texte: "VTC à Chambéry", chemin: "/fr/vtc-chambery/" },
          { texte: "Assistance", chemin: "/fr/assistance/" },
          { texte: "Bagage perdu", chemin: "/fr/bagage-perdu/" },
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
          { texte: "Skiorte", chemin: "/de/skitransfer/" },
          { texte: "Flughäfen", chemin: "/de/flughaefen/" },
          { texte: "Hilfe unterwegs", chemin: "/de/hilfe-unterwegs/" },
          { texte: "Verlorenes Gepäck", chemin: "/de/verlorenes-gepaeck/" },
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
        { texte: "Località sciistiche", chemin: "/it/trasferimenti-sci/" },
        { texte: "Aeroporti", chemin: "/it/aeroporti/" },
        { texte: "Assistenza in viaggio", chemin: "/it/assistenza-in-viaggio/" },
        { texte: "Bagaglio smarrito", chemin: "/it/bagaglio-smarrito/" },
      ],
    },
    juridiques("Informazioni legali"),
  ];
}

/* ---------------------------------------------------------- barre des pays */

/**
 * Les quatre hubs pays, vus depuis une langue.
 *
 * Le pied de page les listait en dur vers les hubs **anglais**, sans même le
 * suffixe « (EN) » que portent les autres liens sortants : un visiteur allemand
 * qui cliquait « Österreich » atterrissait sans prévenir sur une page anglaise.
 * Depuis le 10 septembre 2026, le lien va vers le hub de la langue quand il
 * existe — et le signale quand il n'existe pas.
 *
 * L'Allemagne reste hors liste : nous n'y desservons aucune station, son hub
 * anglais n'est qu'une porte d'entrée d'aéroports.
 */
export function liensPays(lang: Lang): LienNav[] {
  return Object.entries(PAYS)
    .filter(([, pays]) => pays.code !== "DE")
    .map(([slug, pays]) => {
      if (lang === "en") return { texte: pays.nom, chemin: `/${slug}/` };

      const hub = HUBS_PAYS[lang as LangueSecondaire].find(
        (h) => h.equivalentEn === `/${slug}/`,
      );
      return hub
        ? {
            texte: hub.nom,
            chemin: `/${lang}/${SEGMENT_STATIONS[lang as LangueSecondaire]}/${hub.slug}/`,
          }
        : { texte: `${pays.nom} (EN)`, chemin: `/${slug}/` };
    });
}

/** L'index des stations de la langue — la racine de son silo. */
export function lienIndexStations(lang: Lang): string {
  return lang === "en"
    ? "/ski-resort-transfers/"
    : `/${lang}/${SEGMENT_STATIONS[lang as LangueSecondaire]}/`;
}

/** L'index des aéroports de la langue. */
export function lienIndexAeroports(lang: Lang): string {
  return lang === "en"
    ? "/airport-ski-transfers/"
    : `/${lang}/${SEGMENT_AEROPORTS[lang as LangueSecondaire]}/`;
}
