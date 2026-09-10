import { AIRPORTS } from "@/lib/airports";
import { LANGS_SECONDAIRES } from "@/lib/i18n";
import { RESORTS_MIGRES } from "@/lib/resorts";
import { SEGMENTS_AEROPORT } from "@/lib/transfers/segments";

/**
 * Le catalogue de lieux du moteur de recherche.
 *
 * Un seul champ pour chercher, comme chez alps2alps, mais avec une règle que
 * leur widget n'a pas : **on ne propose que ce qu'on sait chiffrer**. Les
 * 34 aéroports et les 68 stations ont une distance routière dans
 * `data/distances.ts`, donc un prix ferme. Tout le reste — une gare, un hôtel,
 * une adresse — reste saisissable en texte libre et bascule vers une demande de
 * devis, plutôt que d'afficher un prix inventé.
 *
 * La liste est **construite côté serveur** puis passée au composant client sous
 * sa forme réduite : `RESORTS_MIGRES` contient le contenu complet des 68 pages de
 * station, plusieurs centaines de kilo-octets qui n'ont rien à faire dans le
 * navigateur. Seuls le slug, le nom, le type et les clés de recherche partent —
 * une centaine d'entrées, quelques kilo-octets, et la recherche est instantanée
 * sans aucun appel réseau.
 */

export type TypeLieu = "aeroport" | "station" | "adresse";

export interface Lieu {
  /** Slug du registre, ou `null` pour une adresse libre. */
  slug: string | null;
  nom: string;
  type: TypeLieu;
  /** Code IATA ou pays, affiché à droite de la suggestion. */
  detail: string;
  /** Formes normalisées pour la recherche : nom, code, variantes usuelles. */
  cles: string[];
  /*
   * Pour une adresse seulement : ses composants, tels que les rend le géocodeur.
   * Une course se conduit à une porte, pas à une chaîne de caractères — le
   * chauffeur a besoin du code postal et de la commune, et les garder séparés
   * évite d'avoir à les redemander au visiteur qui vient de choisir sa rue.
   */
  codePostal?: string;
  ville?: string;
  pays?: string;
}

/** Sans accents, en minuscules : « Méribel » se trouve en tapant « meribel ». */
export function normaliser(texte: string): string {
  return texte
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

const PAYS_LISIBLE: Record<string, string> = {
  FR: "France",
  CH: "Suisse",
  IT: "Italie",
  AT: "Autriche",
  DE: "Allemagne",
};

/**
 * Variantes usuelles que les visiteurs tapent réellement : le nom court d'un
 * aéroport, le nom d'une station sans son article, une graphie sans tiret.
 */
function variantes(nom: string): string[] {
  const base = normaliser(nom);
  const sansArticle = base.replace(/^(les|la|le|l) /, "");
  return [...new Set([base, sansArticle, base.replace(/ /g, "")])];
}

/**
 * Les noms d'un aéroport dans les autres langues.
 *
 * Le champ de recherche est traduit depuis le 10 septembre 2026, mais ses clés
 * ne l'étaient pas : un Allemand qui tapait « Genf » dans un formulaire allemand
 * n'obtenait aucune suggestion, et un Italien qui tapait « Torino » non plus.
 * Les noms de marché sont donc versés dans les clés — ils ne changent pas ce qui
 * s'affiche, seulement ce qui se trouve.
 */
function nomsTraduitsAeroport(slug: string): string[] {
  return LANGS_SECONDAIRES.flatMap((lang) => {
    const segment = SEGMENTS_AEROPORT[lang][slug];
    return segment ? variantes(segment.nom) : [];
  });
}

export const LIEUX: Lieu[] = [
  ...AIRPORTS.map((a) => ({
    slug: a.slug,
    nom: a.name,
    type: "aeroport" as const,
    detail: a.iata,
    cles: [
      ...new Set([
        ...variantes(a.name),
        normaliser(a.iata),
        ...variantes(a.name.replace(" Airport", "")),
        ...nomsTraduitsAeroport(a.slug),
      ]),
    ],
  })),
  ...RESORTS_MIGRES.map((r) => ({
    slug: r.slug,
    nom: r.name,
    type: "station" as const,
    detail: PAYS_LISIBLE[r.country] ?? r.country,
    /*
      Le nom traduit d'une station est rarement différent du nom français —
      « Val Thorens » se dit partout — mais quand il l'est (« Cortina
      d'Ampezzo », « Sankt Anton »), c'est exactement le mot que le visiteur de
      ce marché tape.
    */
    cles: [
      ...new Set([
        ...variantes(r.name),
        normaliser(r.slug),
        ...LANGS_SECONDAIRES.flatMap((lang) => {
          const traduction = r.traductions?.[lang];
          if (!traduction) return [];
          return [...(traduction.nom ? variantes(traduction.nom) : []), normaliser(traduction.slug)];
        }),
      ]),
    ],
  })),
];

/**
 * Recherche pour l'autocomplétion.
 *
 * Le classement compte autant que le filtre. Une correspondance en **début de
 * mot** passe devant une correspondance au milieu, sans quoi taper « ge »
 * remonte Klagenfurt et Memmingen — qui contiennent bien « ge », et n'ont rien à
 * faire là. Ordre retenu : la clé entière, puis le début de clé, puis le début
 * d'un mot, et seulement ensuite le reste. À pertinence égale, les aéroports
 * passent devant : c'est presque toujours le point de départ.
 */
export function chercherLieux(liste: Lieu[], saisie: string, limite = 8): Lieu[] {
  const q = normaliser(saisie);
  if (q.length < 2) return [];

  const score = (lieu: Lieu): number => {
    let meilleur = Infinity;
    for (const cle of lieu.cles) {
      if (cle === q) meilleur = Math.min(meilleur, 0);
      else if (cle.startsWith(q)) meilleur = Math.min(meilleur, 1);
      else if (cle.split(" ").some((mot) => mot.startsWith(q))) meilleur = Math.min(meilleur, 2);
      else if (cle.includes(q)) meilleur = Math.min(meilleur, 3);
    }
    if (meilleur === Infinity) return Infinity;
    return meilleur * 10 + (lieu.type === "aeroport" ? 0 : 1);
  };

  return liste.map((lieu) => ({ lieu, s: score(lieu) }))
    .filter((x) => x.s !== Infinity)
    .sort((a, b) => a.s - b.s || a.lieu.nom.localeCompare(b.lieu.nom))
    .slice(0, limite)
    .map((x) => x.lieu);
}

/** Retrouve un lieu par son slug — sert à valider ce que renvoie le navigateur. */
export function lieuParSlug(slug: string): Lieu | undefined {
  return LIEUX.find((l) => l.slug === slug);
}
