/**
 * Génère le plan de redirections à partir de l'inventaire WordPress.
 *
 * Écrire 220 redirections à la main, c'est 220 occasions de se tromper d'un
 * caractère. Ce script rapproche chaque ancienne URL de sa cible dans le nouveau
 * silo, et — c'est le point important — **sort tout ce qu'il ne sait pas décider**
 * dans un fichier à arbitrer plutôt que d'inventer une destination.
 *
 * Entrée  : wp-export/inventaire.json (npm run wp:analyse)
 * Sorties : src/data/redirections-migration.ts   (généré, ne pas éditer à la main)
 *           wp-export/redirections-a-arbitrer.csv (ce qui demande une décision)
 *
 * Usage : npm run redirects:generer
 */
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const RACINE = process.cwd();
const inventaire = JSON.parse(
  await readFile(path.join(RACINE, "wp-export", "inventaire.json"), "utf8"),
);

// --- Registres du nouveau site ----------------------------------------------
const registreAeroports = await readFile(
  path.join(RACINE, "src", "lib", "airports", "registry.ts"),
  "utf8",
);
const registreStations = await readFile(
  path.join(RACINE, "src", "lib", "resorts", "registry.ts"),
  "utf8",
);

const AEROPORTS = [
  ...registreAeroports.matchAll(/slug:\s*"([^"]+)",\s*name:\s*"([^"]+)",\s*iata:\s*"([^"]+)",\s*country:\s*"([A-Z]{2})"/g),
].map((m) => ({ slug: m[1], nom: m[2], iata: m[3], pays: m[4] }));

const STATIONS = [
  ...registreStations.matchAll(/slug:\s*"([^"]+)",\s*name:\s*"([^"]+)",\s*country:\s*"([A-Z]{2})"/g),
].map((m) => ({ slug: m[1], nom: m[2], pays: m[3] }));

const SLUG_PAYS = {
  AT: "austria-ski-transfers",
  CH: "switzerland-ski-transfers",
  DE: "germany-ski-transfers",
  FR: "france-ski-transfers",
  IT: "italy-ski-transfers",
};

/** Le pays dans l'ancienne URL est celui de l'AÉROPORT de départ, pas de la station. */
const PAYS_ANCIEN = {
  austria: "AT",
  france: "FR",
  italy: "IT",
  swiss: "CH",
  switzerland: "CH",
  germany: "DE",
};

/**
 * Variantes de slug rencontrées dans les anciennes URL. Le site nomme la même
 * station de plusieurs façons — parfois avec le nom du domaine skiable accolé.
 * Sans cette table, ces URL partiraient à l'arbitrage alors que leur cible ne
 * fait aucun doute.
 */
const ALIAS_STATIONS = {
  "st-anton": "st-anton-am-arlberg",
  "lech-am-arlberg": "lech",
  "deux-alpes": "les-deux-alpes",
  "val-thorens-3-valleys": "val-thorens",
  "les-menuires-3-valleys": "les-menuires",
  "les-arcs-1950-2000-paradiski": "les-arcs",
  "ischgl-transfer": "ischgl",
  "zermatt-tasch": "zermatt",
};

/**
 * Variantes de nommage d'aéroport dans les anciennes URL — fautes de frappe
 * comprises (« aiport »), et regroupements du catalogue que le registre sépare.
 */
const ALIAS_AEROPORTS = {
  "marseille-port-airport": "marseille-provence-airport",
  "montpellier-mediterranean-airport": "montpellier-mediterranee-airport",
  "bologna-brescia-montichiari-aiport": "bologna-airport",
};

/**
 * Sort des pages fonctionnelles, décidé une par une.
 *   "garder"  : l'URL est reprise telle quelle par le nouveau site, aucune règle.
 *   "tunnel"  : page du tunnel WooCommerce, conservée sur book. et mise en noindex
 *               par le proxy — surtout pas de redirection, elle prend l'argent.
 *   "410"     : ni trafic ni lien entrant ; une 301 vers l'accueil y enverrait un
 *               signal de mauvaise qualité.
 *   sinon     : chaîne = destination de la 301.
 */
const PAGES_FONCTIONNELLES = {
  "/contact/": "garder",
  "/contact-alps-ski-transfers/": "/contact/",
  "/privacy/": "garder",
  "/cookie-policy-uk/": "garder",
  "/terms-conditions-alps-ski-transfers/": "garder",
  "/ticketing-conditions/": "garder",
  "/general-questions/": "garder",
  "/help/": "garder",
  "/lost-luggage/": "garder",
  "/find-your-stop/": "garder",
  "/inquiry/": "garder",
  "/book-ski-transfer-tickets/": "garder",
  // Deux pages de fond à ne pas perdre : 2 157 et 1 374 mots.
  "/private-airport-transfers-to-alps-ski-resort/": "garder",
  "/ski-resort-transfers/": "garder",
  "/thanks-for-your-inquiry/": "garder",
  // Tunnel de réservation.
  "/cart/": "tunnel",
  "/checkout/": "tunnel",
  "/checkout-form/": "tunnel",
  "/booking-page/": "tunnel",
  "/reserver/": "tunnel",
  "/select-vehicle/": "tunnel",
  "/search-results/": "tunnel",
  "/login/": "tunnel",
  "/register/": "tunnel",
  "/reset-password/": "tunnel",
  "/my-account/": "tunnel",
  "/user-account/": "tunnel",
  "/shop/": "tunnel",
  // Doublons WordPress recyclés et fiches produit techniques.
  "/cart-2/": "410",
  "/checkout-2/": "410",
  "/product/product-form-no-deleted/": "410",
  "/product/tf-transfer-product/": "410",
};

const redirections = [];
const conserves = [];
const tunnel = [];
const gone = [];
const arbitrer = [];
const stationsInconnues = new Set();

function poser(de, vers, note) {
  redirections.push({ de: de.replace(/\/$/, ""), vers, note });
}
function aArbitrer(url, raison, proposition = "") {
  arbitrer.push({ url, raison, proposition });
}

/** Retrouve une station par son slug d'URL ancienne, alias compris. */
function station(slug) {
  const canonique = ALIAS_STATIONS[slug] ?? slug;
  return STATIONS.find((s) => s.slug === canonique);
}

/**
 * Hub d'aéroport : `/switzerland-ski-transfers/geneva-airport/`.
 * Il vit dans le silo, sous le pays de l'AÉROPORT — pas de nouvelle racine, et
 * la requête « geneva airport ski transfers » retrouve une page propriétaire.
 */
function hubAeroport(a) {
  return `/${SLUG_PAYS[a.pays]}/${a.slug}/`;
}

/**
 * Retrouve un aéroport à partir du préfixe utilisé dans les anciennes URL
 * (« geneva », « zurich », « chambery »…). Renvoie null si plusieurs aéroports
 * correspondent — Milan et Paris en ont deux chacun, et deviner serait pire que
 * demander.
 */
function aeroport(prefixe) {
  const candidats = AEROPORTS.filter((a) => a.slug.startsWith(`${prefixe}-`) || a.slug === prefixe);
  if (candidats.length === 1) return candidats[0];
  return null;
}

for (const entree of inventaire) {
  const url = entree.url;
  const segments = url.split("/").filter(Boolean);

  // --- 1. Le silo conservé : rien à faire ------------------------------------
  if (/^\/[a-z]+-ski-transfers\//.test(url) && !url.startsWith("/airport-ski-transfers/")) {
    continue;
  }

  // --- 2. Hubs des anciennes arborescences → hub pays du silo ----------------
  if (url === "/airport-ski-transfers/" || url === "/destination/") {
    poser(url, "/", "hub d'une arborescence supprimée");
    continue;
  }
  if (segments.length === 2 && segments[0] === "airport-ski-transfers") {
    const pays = PAYS_ANCIEN[segments[1]];
    if (pays) poser(url, `/${SLUG_PAYS[pays]}/`, "hub pays");
    else aArbitrer(url, "pays inconnu dans l'URL");
    continue;
  }
  if (segments.length === 2 && segments[0] === "destination") {
    const cle = segments[1].replace(/^ski-resorts-in-/, "");
    const pays = PAYS_ANCIEN[cle];
    if (pays) poser(url, `/${SLUG_PAYS[pays]}/`, "hub pays");
    else aArbitrer(url, "pays inconnu dans l'URL");
    continue;
  }

  // --- 3. Pages de trajet ----------------------------------------------------
  if (segments[0] === "airport-ski-transfers" && segments.length === 3) {
    const slug = segments[2].replace(/-transfers$/, "");
    const coupe = slug.split("-to-");
    if (coupe.length !== 2) {
      aArbitrer(url, "slug de trajet non reconnu (pas de « -to- »)");
      continue;
    }
    const [prefixeAeroport, slugStation] = coupe;
    const a = aeroport(prefixeAeroport);
    const s = station(slugStation);

    if (!s) {
      stationsInconnues.add(slugStation);
      aArbitrer(url, `station « ${slugStation} » absente du registre`, "ajouter la station");
      continue;
    }
    if (!a) {
      const candidats = AEROPORTS.filter((x) => x.slug.startsWith(`${prefixeAeroport}-`));
      if (candidats.length > 1) {
        // Milan et Paris ont deux aéroports : plutôt que de deviner lequel était
        // vendu, on renvoie sur la page de station. Aucune perte de pertinence,
        // et le visiteur y retrouve tous les départs.
        poser(url, `/${SLUG_PAYS[s.pays]}/${s.slug}/`, "aéroport ambigu → page de station");
        aArbitrer(url, `aéroport ambigu : ${candidats.map((c) => c.slug).join(" ou ")}`, `redirigé vers /${SLUG_PAYS[s.pays]}/${s.slug}/`);
      } else {
        aArbitrer(url, `aéroport « ${prefixeAeroport} » inconnu`, "");
      }
      continue;
    }
    poser(url, `/${SLUG_PAYS[s.pays]}/${s.slug}/${a.slug}-transfers/`, "trajet");
    continue;
  }

  // --- 4. Anciennes pages de station (le doublon à 193 mots) -----------------
  if (segments[0] === "destination" && segments[1]?.startsWith("ski-resorts-in-")) {
    const s = station(segments[2]);
    if (!s) {
      stationsInconnues.add(segments[2]);
      aArbitrer(url, `station « ${segments[2] }» absente du registre`, "ajouter la station");
      continue;
    }
    poser(url, `/${SLUG_PAYS[s.pays]}/${s.slug}/`, "doublon de page de station");
    continue;
  }

  // --- 5. Anciennes pages d'aéroport ----------------------------------------
  if (segments[0] === "destination" && segments.length === 3) {
    // Le slug d'aéroport de l'ancienne URL est parfois fautif : « innsbruck-aiport ».
    const slugCorrige = ALIAS_AEROPORTS[segments[2]] ?? segments[2].replace("-aiport", "-airport");
    const a = AEROPORTS.find((x) => x.slug === slugCorrige);
    if (a) {
      poser(url, hubAeroport(a), "hub aéroport");
    } else {
      const pays = PAYS_ANCIEN[segments[1]];
      aArbitrer(url, `aéroport « ${segments[2]} » absent du registre`, pays ? `/${SLUG_PAYS[pays]}/` : "");
    }
    continue;
  }

  // --- 6. Pages fonctionnelles, décidées une par une dans la table ci-dessus --
  const sort = PAGES_FONCTIONNELLES[url];
  if (sort === "garder") conserves.push(url);
  else if (sort === "tunnel") tunnel.push(url);
  else if (sort === "410") gone.push(url);
  else if (typeof sort === "string") poser(url, sort, "page fonctionnelle");
  else aArbitrer(url, `page isolée (${entree.mots} mots), sort non décidé`, "");
}

redirections.sort((a, b) => a.de.localeCompare(b.de));

// --- Écriture ---------------------------------------------------------------
const lignes = redirections.map((r) => `  "${r.de}": "${r.vers}", // ${r.note}`);

await writeFile(
  path.join(RACINE, "src", "data", "redirections-migration.ts"),
  `/**
 * GÉNÉRÉ PAR \`npm run redirects:generer\` — NE PAS ÉDITER À LA MAIN.
 *
 * Rapprochement automatique des anciennes URL WordPress (wp-export/inventaire.json)
 * avec le nouveau silo. Les cas que le script refuse de deviner sont dans
 * wp-export/redirections-a-arbitrer.csv et se traitent à la main dans
 * \`redirections.ts\`.
 *
 * ${redirections.length} règles générées le ${new Date().toISOString().slice(0, 10)}.
 */
export const REDIRECTIONS_MIGRATION: Record<string, string> = {
${lignes.join("\n")}
};

/** Pages sans trafic ni lien entrant : 410, jamais 301. */
export const GONE_MIGRATION: string[] = [
${gone.map((u) => `  "${u}",`).join("\n")}
];

/**
 * Pages du tunnel WooCommerce : conservées en service, sorties de l'index.
 * Aucune redirection — ce sont elles qui encaissent.
 */
export const TUNNEL_MIGRATION: string[] = [
${tunnel.map((u) => `  "${u}",`).join("\n")}
];

/** URL reprises telles quelles par le nouveau site : aucune règle nécessaire. */
export const URL_CONSERVEES: string[] = [
${conserves.map((u) => `  "${u}",`).join("\n")}
];
`,
  "utf8",
);

const csv = [
  "url;raison;proposition",
  ...arbitrer.map((a) => [a.url, a.raison, a.proposition].join(";")),
].join("\n");
await writeFile(path.join(RACINE, "wp-export", "redirections-a-arbitrer.csv"), csv, "utf8");

const parNote = redirections.reduce((acc, r) => {
  acc[r.note] = (acc[r.note] ?? 0) + 1;
  return acc;
}, {});

console.log(`\n  ${redirections.length} redirections générées :`);
for (const [note, n] of Object.entries(parNote)) console.log(`    ${note.padEnd(34)} ${n}`);
console.log(`\n  ${arbitrer.length} URL à arbitrer → wp-export/redirections-a-arbitrer.csv`);
if (stationsInconnues.size > 0) {
  console.log(
    `\n  ${stationsInconnues.size} stations présentes dans les anciennes URL mais absentes du registre :`,
  );
  console.log(`    ${[...stationsInconnues].sort().join(", ")}`);
}
console.log();
