/**
 * La veille des prix concurrents — demande de JC, 14 septembre 2026.
 *
 * Deux concurrents, choisis par l'exploitant :
 *
 * - **alps2alps** publie une API officielle, gratuite et sans clé
 *   (`booking.alps2alps.com/api/public/v1`), prévue pour être interrogée et
 *   limitée par adresse IP ;
 * - **Alpy Transfers** (plateforme ALSA) n'en a pas : on remplit son
 *   formulaire de recherche comme un visiteur. Plus fragile — un changement de
 *   leur site casse la lecture, et l'onglet le dit plutôt que d'inventer.
 *
 * Leurs codes de lieux ont été relevés le 14 septembre 2026 et vivent ici,
 * plutôt que d'être devinés chaque nuit : « Val d'Isère » renvoyait chez
 * alps2alps « Besse, Isère » en premier résultat. Un lieu absent (`null`) veut
 * dire que ce concurrent ne le dessert pas.
 */

export type Concurrent = "alps2alps" | "alpy";

export const CONCURRENTS: { cle: Concurrent; nom: string; site: string }[] = [
  { cle: "alps2alps", nom: "alps2alps", site: "https://www.alps2alps.com/" },
  { cle: "alpy", nom: "Alpy Transfers", site: "https://www.alpytransfers.com/" },
];

/** Code alps2alps (`airport-1`, `resort-80`) et code Alpy (`[GVA]`, `[VTH]`) de nos lieux. */
export const CODES_LIEUX: Record<string, { alps2alps: string | null; alpy: string | null }> = {
  "geneva-airport": { alps2alps: "airport-1", alpy: "[GVA]" },
  "lyon-airport": { alps2alps: "airport-4", alpy: "[LYS]" },
  "chambery-savoie-airport": { alps2alps: "airport-3", alpy: "[CMF]" },
  "grenoble-isere-airport": { alps2alps: "airport-2", alpy: null },
  "zurich-airport": { alps2alps: "airport-21", alpy: "[ZRH]" },
  "turin-airport": { alps2alps: "airport-25", alpy: null },
  "val-thorens": { alps2alps: "resort-80", alpy: "[VTH]" },
  courchevel: { alps2alps: "resort-72", alpy: "[COU]" },
  meribel: { alps2alps: "resort-78", alpy: "[MRL]" },
  chamonix: { alps2alps: "resort-11", alpy: "[CHA]" },
  tignes: { alps2alps: "resort-58", alpy: "[TGN]" },
  "val-disere": { alps2alps: "resort-59", alpy: "[VDI]" },
  verbier: { alps2alps: "resort-224", alpy: "[VER]" },
  zermatt: { alps2alps: "resort-256", alpy: "[ZER]" },
  "les-arcs": { alps2alps: "resort-66", alpy: "[ARC]" },
  "la-plagne": { alps2alps: "resort-62", alpy: "[PLA]" },
  avoriaz: { alps2alps: "resort-3", alpy: "[AVO]" },
  morzine: { alps2alps: "resort-9", alpy: "[MOR]" },
  "les-gets": { alps2alps: "resort-6", alpy: "[GET]" },
  megeve: { alps2alps: "resort-10", alpy: "[MEG]" },
  flaine: { alps2alps: "resort-15", alpy: "[FLA]" },
  "les-menuires": { alps2alps: "resort-77", alpy: "[LME]" },
  "alpe-dhuez": { alps2alps: "resort-21", alpy: "[ADZ]" },
  "les-deux-alpes": { alps2alps: "resort-27", alpy: "[L2A]" },
  samoens: { alps2alps: "resort-8", alpy: "[SAM]" },
  "la-clusaz": { alps2alps: "resort-94", alpy: "[CLU]" },
  argentiere: { alps2alps: "resort-12", alpy: "[ARG]" },
  "saint-gervais": { alps2alps: "resort-14", alpy: "[STG]" },
  "crans-montana": { alps2alps: "resort-206", alpy: "[CSM]" },
  "villars-sur-ollon": { alps2alps: "resort-222", alpy: "[VIL]" },
  courmayeur: { alps2alps: "resort-147", alpy: "[CMY]" },
  cervinia: { alps2alps: "resort-247", alpy: "[CVI]" },
  chamrousse: { alps2alps: "resort-82", alpy: null },
  davos: { alps2alps: "resort-199", alpy: null },
  "st-moritz": { alps2alps: "resort-393", alpy: "[SMZ]" },
  sestriere: { alps2alps: "resort-398", alpy: null },
};

/**
 * Les 50 trajets suivis par défaut, du plus demandé au moins demandé.
 *
 * Aucune donnée de volume par trajet n'existe encore (Search Console n'est pas
 * branchée) : l'ordre suit la demande connue — Genève d'abord, « demande
 * élevée, non classé » dans l'audit du 4 septembre 2026, puis Lyon, Chambéry,
 * Grenoble, Zurich et Turin, et dans chaque départ les grandes stations.
 * L'exploitant ajuste la liste depuis l'onglet.
 */
export const TRAJETS_PAR_DEFAUT: [string, string][] = [
  ...(
    [
      "val-thorens", "courchevel", "meribel", "chamonix", "tignes", "val-disere", "verbier", "zermatt",
      "les-arcs", "la-plagne", "avoriaz", "morzine", "les-gets", "megeve", "flaine", "les-menuires",
      "alpe-dhuez", "les-deux-alpes", "samoens", "la-clusaz", "argentiere", "saint-gervais",
      "crans-montana", "villars-sur-ollon", "courmayeur", "cervinia",
    ].map((r) => ["geneva-airport", r]) as [string, string][]
  ),
  ...(
    ["val-thorens", "courchevel", "meribel", "alpe-dhuez", "les-deux-alpes", "val-disere", "la-plagne", "morzine", "les-gets"].map(
      (r) => ["lyon-airport", r],
    ) as [string, string][]
  ),
  ...(
    ["val-thorens", "courchevel", "meribel", "les-arcs", "la-plagne", "val-disere"].map((r) => [
      "chambery-savoie-airport",
      r,
    ]) as [string, string][]
  ),
  ...(
    ["alpe-dhuez", "les-deux-alpes", "val-thorens", "chamrousse"].map((r) => ["grenoble-isere-airport", r]) as [
      string,
      string,
    ][]
  ),
  ...(["davos", "st-moritz", "zermatt"].map((r) => ["zurich-airport", r]) as [string, string][]),
  ...(["sestriere", "cervinia"].map((r) => ["turin-airport", r]) as [string, string][]),
];

/** Les tailles de groupe comparées : le prix d'un concurrent change avec le véhicule qu'il faut. */
export const GROUPES = [2, 4, 8] as const;
export type Groupe = (typeof GROUPES)[number];

/** Les deux jours comparés : un mercredi ordinaire, et le samedi des rotations. */
export type Jour = "mercredi" | "samedi";
