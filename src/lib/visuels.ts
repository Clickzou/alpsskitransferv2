import dimensions from "../../public/images/dimensions.json";
import type { NomVisuel } from "@/components/Visuel";
import type { Lang } from "@/lib/i18n";

/**
 * Quel visuel pour quelle page.
 *
 * Trente-six stations sur soixante-huit ont leur propre photo dans `pHOTOS/`, et
 * dix aéroports aussi. Les autres retombent sur un visuel générique : une photo
 * de montagne quelconque est acceptable sur une page de station, la photo d'une
 * **autre** station ne le serait pas — c'est un mensonge visuel, et le visiteur
 * qui connaît les lieux le voit tout de suite.
 *
 * `npm run images:preparer` produit `station-{slug}` et `aeroport-{slug}` ; cette
 * fonction se contente de vérifier ce qui existe réellement.
 *
 * **Le texte alternatif suit la langue de la page.** Ces fonctions servent les
 * deux silos : un `alt` français sur une page `lang="en-GB"` fait lire du
 * français à un lecteur d'écran anglophone, et donne à Google un texte dans une
 * langue que la page ne déclare pas. L'anglais est la valeur par défaut, comme
 * partout sur ce site.
 */

const existe = (nom: string): nom is NomVisuel => nom in dimensions;

export interface Visuel {
  nom: NomVisuel;
  alt: string;
  /** Faux quand c'est le visuel générique : utile pour ne pas sur-promettre. */
  propre: boolean;
}

/** `alt` d'une photo de station, dans la langue de la page. */
const ALT_STATION: Record<Lang, (nom: string) => string> = {
  en: (nom) => `${nom} ski resort under snow`,
  fr: (nom) => `${nom} sous la neige`,
  de: (nom) => `${nom} im Schnee`,
  it: (nom) => `${nom} sotto la neve`,
};

const ALT_STATION_GENERIQUE: Record<Lang, string> = {
  en: "Alpine ski resort under snow",
  fr: "Station de ski des Alpes sous la neige",
  de: "Skiort in den Alpen im Schnee",
  it: "Località sciistica delle Alpi sotto la neve",
};

export function visuelStation(slug: string, nomStation: string, lang: Lang = "en"): Visuel {
  const propre = `station-${slug}`;
  if (existe(propre)) {
    return { nom: propre, alt: ALT_STATION[lang](nomStation), propre: true };
  }
  return { nom: "station-alpes", alt: ALT_STATION_GENERIQUE[lang], propre: false };
}

/** Les trois familles d'aéroports, pour ceux qui n'ont pas leur propre photo. */
function familleAeroport(slug: string): NomVisuel {
  if (["lyon-airport", "grenoble-isere-airport", "chambery-savoie-airport"].includes(slug)) {
    return "aeroport-lyon-grenoble-chambery";
  }
  return "aeroport-paris-milan-turin";
}

const ALT_AEROPORT: Record<Lang, (ville: string) => string> = {
  en: (ville) => `${ville} airport terminal`,
  fr: (ville) => `Aéroport de ${ville}`,
  de: (ville) => `Flughafen ${ville}`,
  it: (ville) => `Aeroporto di ${ville}`,
};

const ALT_AEROPORT_GENERIQUE: Record<Lang, string> = {
  en: "Airport terminal, gateway to the Alps",
  fr: "Terminal d'aéroport, porte d'entrée des Alpes",
  de: "Flughafenterminal, Tor zu den Alpen",
  it: "Terminal aeroportuale, porta d'accesso alle Alpi",
};

export function visuelAeroport(slug: string, nomAeroport: string, lang: Lang = "en"): Visuel {
  const ville = nomAeroport.replace(" Airport", "");
  const propre = `aeroport-${slug}`;
  if (existe(propre)) {
    return { nom: propre, alt: ALT_AEROPORT[lang](ville), propre: true };
  }
  return { nom: familleAeroport(slug), alt: ALT_AEROPORT_GENERIQUE[lang], propre: false };
}
