import {
  GONE_MIGRATION,
  REDIRECTIONS_MIGRATION,
  TUNNEL_MIGRATION,
} from "./redirections-migration";

/**
 * PLAN DE REDIRECTIONS — la pièce la plus importante du chantier.
 *
 * Le site actuel expose 260 URL réparties sur trois arborescences concurrentes :
 *   /airport-ski-transfers/{pays}/{trajet}/   97 URL
 *   /destination/{pays}/{aéroport}/           92 URL
 *   /{pays}-ski-transfers/{station}/          40 URL   ← silo conservé
 * Tout ce qui n'est pas le silo conservé part en 301 vers sa page du nouveau silo.
 *
 * RÈGLE : cette table se remplit AU FIL du développement, pas à la fin. Chaque
 * page migrée ajoute ses anciennes URL ici. `npm run redirects:check` vérifie que
 * chaque destination existe et qu'aucune chaîne ne fait deux sauts ; le prebuild
 * l'exécute, donc une destination cassée bloque le déploiement.
 *
 * Clés sans slash final, en minuscules — `normaliser()` du proxy s'en charge.
 */
export const REDIRECTIONS_301: Record<string, string> = {
  // Le gros du plan est généré depuis l'inventaire WordPress par
  // `npm run redirects:generer` : 189 règles couvrant les quatre arborescences.
  // Les règles écrites à la main ci-dessous le complètent et le corrigent — elles
  // sont posées APRÈS, donc elles gagnent en cas de conflit.
  ...REDIRECTIONS_MIGRATION,

  // --- Corrections d'anomalies relevées par l'audit ---------------------------
  // Cette URL porte en réalité le contenu Courchevel (doublon WordPress recyclé).
  "/france-ski-transfers/val-thorens-2": "/france-ski-transfers/courchevel/",
  "/italy-ski-transfers/sestriere-2": "/italy-ski-transfers/sestriere/",
  // Le reste — faute « innsbruck-aiport », dossier « swiss » qui contenait des
  // stations françaises, 89 trajets, 51 doublons de stations, 31 hubs d'aéroport —
  // est traité par le plan généré. Ne rien recopier ici : une règle en double
  // masque la règle générée et sera signalée au build.
};

/**
 * Pages sans intérêt d'indexation ni lien entrant : 410 plutôt que 301.
 * Une 301 vers l'accueil transmettrait un signal de mauvaise qualité vers la
 * page la plus importante du site.
 */
export const PAGES_SUPPRIMEES_410: string[] = [
  // Généré : voir GONE_MIGRATION (les entrées sont des chemins complets).
  ...GONE_MIGRATION.map((chemin) => chemin.replace(/^\/|\/$/g, "")),
  // L'audit relève que l'auteur WordPress « JC » est exposé publiquement et
  // signe les données structurées Article du site.
  "author/jc",
];

/**
 * Pages fonctionnelles à ne jamais indexer.
 *
 * Sur le site actuel, six d'entre elles sont en `index, follow` — seul
 * `/my-account/` est correct. Elles restent servies par WooCommerce tant que le
 * moteur de réservation n'est pas refait (hors périmètre du devis) : le proxy
 * ne les redirige donc pas, il pose seulement l'en-tête `X-Robots-Tag`.
 */
export const CHEMINS_NOINDEX: string[] = TUNNEL_MIGRATION.map((chemin) =>
  chemin.replace(/\/$/, ""),
);
