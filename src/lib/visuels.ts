import dimensions from "../../public/images/dimensions.json";
import type { NomVisuel } from "@/components/Visuel";

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
 */

const existe = (nom: string): nom is NomVisuel => nom in dimensions;

export interface Visuel {
  nom: NomVisuel;
  alt: string;
  /** Faux quand c'est le visuel générique : utile pour ne pas sur-promettre. */
  propre: boolean;
}

export function visuelStation(slug: string, nomStation: string): Visuel {
  const propre = `station-${slug}`;
  if (existe(propre)) {
    return { nom: propre, alt: `${nomStation} sous la neige`, propre: true };
  }
  return {
    nom: "station-alpes",
    alt: "Station de ski des Alpes sous la neige",
    propre: false,
  };
}

/** Les trois familles d'aéroports, pour ceux qui n'ont pas leur propre photo. */
function familleAeroport(slug: string): NomVisuel {
  if (["lyon-airport", "grenoble-isere-airport", "chambery-savoie-airport"].includes(slug)) {
    return "aeroport-lyon-grenoble-chambery";
  }
  return "aeroport-paris-milan-turin";
}

export function visuelAeroport(slug: string, nomAeroport: string): Visuel {
  const propre = `aeroport-${slug}`;
  if (existe(propre)) {
    return { nom: propre, alt: `Aéroport de ${nomAeroport.replace(" Airport", "")}`, propre: true };
  }
  return {
    nom: familleAeroport(slug),
    alt: "Terminal d'aéroport, porte d'entrée des Alpes",
    propre: false,
  };
}
