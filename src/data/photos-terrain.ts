import type { NomVisuel } from "@/components/Visuel";
import type { Lang } from "@/lib/i18n";

/**
 * Les photos réelles prises en station par l'exploitant (29 septembre 2026).
 *
 * Elles prouvent ce qu'aucun visuel de banque d'images ne prouve : que la
 * voiture va réellement là. D'où la règle — **une photo n'est rattachée qu'à la
 * station qu'on y reconnaît sans hésiter** (un panneau, une entrée, un hôtel
 * connu). Une photo de chalet quelconque attribuée à la mauvaise station serait
 * le mensonge visuel que `lib/visuels.ts` s'interdit déjà.
 *
 * Les plaques sont floutées dans les sources (`pHOTOS/terrain/`). Une langue
 * sans légende n'affiche pas la photo.
 */
interface PhotoTerrain {
  nom: NomVisuel;
  legende: Partial<Record<Lang, string>>;
}

const PHOTOS_STATIONS: Record<string, PhotoTerrain> = {
  "les-arcs": {
    nom: "terrain-station-les-arcs",
    legende: {
      en: "Our Mercedes V-Class at the entrance to Les Arcs.",
      fr: "Notre Mercedes Classe V à l’entrée des Arcs.",
    },
  },
  "val-thorens": {
    nom: "terrain-station-val-thorens",
    legende: {
      en: "Our Mercedes V-Class arriving in Val Thorens, at night.",
      fr: "Notre Mercedes Classe V à l’arrivée à Val Thorens, de nuit.",
    },
  },
  courchevel: {
    nom: "terrain-station-courchevel",
    legende: {
      en: "Our Mercedes V-Class in Courchevel, on a winter evening.",
      fr: "Notre Mercedes Classe V à Courchevel, un soir d’hiver.",
    },
  },
  "val-disere": {
    nom: "terrain-station-val-disere",
    legende: {
      en: "Drop-off at Les Barmes de l’Ours, Val d’Isère.",
      fr: "Dépose devant Les Barmes de l’Ours, à Val d’Isère.",
    },
  },
};

export function photoTerrainStation(
  slug: string,
  lang: Lang,
): { nom: NomVisuel; legende: string } | null {
  const photo = PHOTOS_STATIONS[slug];
  const legende = photo?.legende[lang];
  return photo && legende ? { nom: photo.nom, legende } : null;
}
