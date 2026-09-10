import type { NomVisuel } from "@/components/Visuel";
import type { LangueSecondaire } from "@/lib/i18n";

/**
 * Les hubs pays des langues traduites.
 *
 * L'architecture de départ n'en prévoyait pas : l'accueil de chaque langue
 * jouait ce rôle. Décision du 10 septembre 2026 — le pied de page traduit
 * renvoyait vers les quatre hubs **anglais**, sans même le signaler, et un
 * visiteur allemand qui cliquait « Österreich » atterrissait sur une page en
 * anglais listant 68 stations dont 61 n'ont pas de page allemande.
 *
 * Un hub par pays **réellement desservi dans la langue**, pas un par pays du
 * silo : la règle « pas de contenu, pas de page » vaut ici comme ailleurs. Le
 * périmètre est donc dérivé des stations traduites, et ce registre ne porte que
 * ce qui ne se dérive pas — les mots.
 *
 * Le hub autrichien a été retiré le 10 septembre 2026, avec les dix stations
 * autrichiennes : l'allemand ne dessert plus que la Suisse — Zermatt, Davos,
 * St. Moritz. C'est la conséquence directe de la sortie de l'Autriche du
 * périmètre, et c'est le marché allemand qu'elle touche le plus.
 *
 * Le slug vit **dans le silo de la langue** : `/de/skitransfer/oesterreich/`.
 * Le segment `[station]` sert donc les stations et les hubs pays, comme
 * `[silo]/[resort]` sert côté anglais les stations et les hubs d'aéroport. Un
 * seul segment dynamique par niveau chez Next, d'où l'aiguillage — et un slug
 * de hub ne peut pas entrer en collision avec un slug de station, le contrôle
 * de build le vérifie.
 */
export interface HubPaysIntl {
  /** Code ISO du pays, celui des stations : FR, AT, CH, IT. */
  code: string;
  /** Segment d'URL dans le silo de la langue. C'est un mot-clé du marché. */
  slug: string;
  nom: string;
  h1: string;
  metaTitre: string;
  metaDescription: string;
  chapo: string;
  intro: string[];
  visuel: { nom: NomVisuel; alt: string };
  /** Le hub anglais correspondant, pour le `hreflang`. */
  equivalentEn: string;
}

export const HUBS_PAYS: Record<LangueSecondaire, HubPaysIntl[]> = {
  fr: [
    {
      code: "FR",
      slug: "france",
      nom: "France",
      h1: "Transferts vers les stations françaises",
      metaTitre: "Transferts vers les stations françaises | Prix par véhicule",
      metaDescription:
        "Transferts privés vers les stations des Alpes françaises depuis Genève, Lyon, Chambéry et Grenoble. Prix fixe par véhicule, skis et péages compris.",
      chapo:
        "Les Alpes françaises portent les plus grands domaines reliés du monde — les Trois Vallées, Paradiski, les Portes du Soleil — et quatre aéroports qui les desservent. Un véhicule pour vous seuls, un prix annoncé avant la réservation.",
      intro: [
        "Genève dessert le nord et la Tarentaise, Lyon prend le relais pour l’Oisans et quand les deux aéroports de montagne ne volent pas, Chambéry et Grenoble jouent la proximité. Le bon aéroport n’est pas toujours le plus proche à vol d’oiseau : l’Alpe d’Huez est à 216 km de Genève mais à 155 km de Lyon, et l’écart se compte en une heure de route.",
        "Les distances sont trompeuses en montagne. Chamonix est à 91 km de Genève, soit une heure vingt-cinq ; Val Thorens, à 161 km, demande près de deux heures trois quarts parce que les 37 derniers kilomètres montent depuis Moûtiers. Chaque page de station donne le temps de route réel, mesuré sur le réseau routier et non estimé. Nos véhicules sont équipés pour l’hiver — pneus et chaînes — comme la loi Montagne l’impose du 1ᵉʳ novembre au 31 mars.",
      ],
      visuel: { nom: "pays-france", alt: "Station des Alpes françaises au-dessus de la limite des arbres" },
      equivalentEn: "/france-ski-transfers/",
    },
  ],

  de: [
    {
      code: "CH",
      slug: "schweiz",
      nom: "Schweiz",
      h1: "Skitransfer in die Schweiz",
      metaTitre: "Skitransfer in die Schweiz | Zürich, Genf, Festpreis",
      metaDescription:
        "Privater Transfer ab Zürich und Genf nach Zermatt, Davos und St. Moritz. Festpreis pro Fahrzeug, Vignette und Maut inklusive, Winterausrüstung an Bord.",
      chapo:
        "Zürich und Genf sind die beiden Tore in die Schweizer Alpen. Festpreis pro Fahrzeug, Vignette und Maut inklusive — und wir sagen vorher, wo die Straße endet.",
      intro: [
        "Davos liegt 166 km von Zürich, St. Moritz 221 km über den Julier: das sind zweieinhalb bis dreieinhalb Stunden, je nach Straßenzustand. Zermatt ist der Sonderfall — der Ort ist autofrei. Der Transfer endet in Täsch, und die letzten fünf Kilometer fährt der Zug im Zwanzig-Minuten-Takt. Wir sagen das vor der Buchung und legen die Ankunft auf eine Abfahrt, statt Sie am Bahnhof rechnen zu lassen.",
        "In der Schweiz entscheidet nicht das Datum über die Winterausrüstung, sondern der Zustand der Straße: unsere Fahrzeuge fahren die ganze Saison mit Winterreifen und Ketten an Bord. Die Autobahnvignette und jede Maut der Strecke sind im genannten Preis enthalten — ein Angebot, das sie ausklammert, ist kein Angebot, sondern eine Schätzung.",
      ],
      visuel: { nom: "pays-switzerland", alt: "Schweizer Skiort unterhalb der Gipfel" },
      equivalentEn: "/switzerland-ski-transfers/",
    },
  ],

  it: [
    {
      code: "IT",
      slug: "italia",
      nom: "Italia",
      h1: "Trasferimenti per le località sciistiche italiane",
      metaTitre: "Transfer per le località sciistiche italiane | Prezzo fisso",
      metaDescription:
        "Transfer privato da Torino, Milano Malpensa e Bergamo verso la Valle d’Aosta, il Piemonte e le Dolomiti. Prezzo fisso per veicolo, pedaggi inclusi.",
      chapo:
        "Valle d’Aosta, Piemonte, Dolomiti: le località italiane sono vicine ai loro aeroporti, e il tragitto è breve. Un veicolo solo per voi, prezzo fissato prima di prenotare.",
      intro: [
        "Torino è l’aeroporto della Via Lattea e della Valle d’Aosta: Sauze d’Oulx dista 91 km, Sestriere 107 km, Gressoney 108 km, Cervinia 121 km — da un’ora e mezza a un’ora e tre quarti. Milano Malpensa serve Alagna Valsesia in 110 km, Bergamo apre la Valtellina. Per Courmayeur, invece, l’aeroporto più rapido non è italiano: Ginevra è a 102 km contro i 158 di Torino, un’ora e mezza contro due.",
        "Il traforo del Monte Bianco e quello del Fréjus costano una cifra seria per un minibus, e sono nel preventivo che vi diamo, come tutti i pedaggi del percorso. Francia, Italia e Svizzera sono nello spazio Schengen, quindi il passaggio di frontiera è di routine — portate comunque un documento. I nostri veicoli montano pneumatici invernali e hanno le catene a bordo, obbligatorie su molte strade alpine da metà novembre a metà aprile.",
      ],
      visuel: { nom: "pays-italy", alt: "Località sciistica delle Alpi italiane in una giornata di sole" },
      equivalentEn: "/italy-ski-transfers/",
    },
    {
      code: "FR",
      slug: "francia",
      nom: "Francia",
      h1: "Trasferimenti per le Alpi francesi",
      metaTitre: "Transfer per le Alpi francesi da Torino | Prezzo per veicolo",
      metaDescription:
        "Transfer privato da Torino verso Monginevro e Serre Chevalier, oltre il colle del Monginevro. Prezzo fisso per veicolo, pedaggi e sci inclusi.",
      chapo:
        "Dal Piemonte, le stazioni francesi del Brianzonese sono più vicine di quanto sembri: si passa il colle del Monginevro e si è dall’altra parte.",
      intro: [
        "Monginevro è a 105 km da Torino, un’ora e quaranta: è la stazione francese più vicina a un aeroporto italiano, più vicina di quanto lo sia da Lione o da Grenoble. Serre Chevalier segue a 131 km, con un tempo di percorrenza più lungo — poco meno di tre ore — perché dopo il colle la strada scende su Briançon e prosegue nel fondovalle.",
        "Il valico del Monginevro è aperto tutto l’anno e non ha traforo a pagamento, ma è un colle di montagna a 1 850 metri: in caso di nevicata l’attrezzatura invernale non è una precauzione, è la condizione per passare. I nostri veicoli montano pneumatici invernali e portano le catene, e il prezzo comprende i pedaggi autostradali fino a Oulx.",
      ],
      visuel: { nom: "pays-france", alt: "Stazione sciistica delle Alpi francesi sopra il limite del bosco" },
      equivalentEn: "/france-ski-transfers/",
    },
  ],
};

/** Les hubs pays publiés dans cette langue. */
export function hubsPaysDeLaLangue(lang: LangueSecondaire): HubPaysIntl[] {
  return HUBS_PAYS[lang];
}

/** Un hub pays par son slug, dans une langue. */
export function hubPaysParSlug(lang: LangueSecondaire, slug: string): HubPaysIntl | undefined {
  return HUBS_PAYS[lang].find((h) => h.slug === slug);
}

/**
 * Les langues où ce pays a un hub traduit — pour le `hreflang` **et** pour le
 * pied de page, qui doit savoir s'il envoie vers une page de la langue ou vers
 * la version anglaise.
 */
export function hubsPaysDuPaysEn(equivalentEn: string): { lang: LangueSecondaire; hub: HubPaysIntl }[] {
  return (Object.keys(HUBS_PAYS) as LangueSecondaire[]).flatMap((lang) =>
    HUBS_PAYS[lang]
      .filter((hub) => hub.equivalentEn === equivalentEn)
      .map((hub) => ({ lang, hub })),
  );
}
