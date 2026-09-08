/**
 * Inventaire du WordPress actuel, à partir du `database.sql` extrait de la
 * sauvegarde .wpress (`npm run wp:extract -- database.sql`).
 *
 * C'est la pièce qui débloque le plan de redirections : elle donne les URL
 * réellement publiées — pas celles qu'on croit —, leur titre, leur volume de
 * contenu et leurs métadonnées Rank Math. Tout le reste de la migration s'appuie
 * dessus.
 *
 * Produit `wp-export/inventaire.json` et `wp-export/inventaire.csv`.
 *
 * Usage : npm run wp:analyse
 */
import { createReadStream } from "node:fs";
import { writeFile } from "node:fs/promises";
import path from "node:path";
import readline from "node:readline";

const RACINE = process.cwd();
const SQL = path.join(RACINE, "wp-export", "database.sql");
const PREFIXE = "SERVMASK_PREFIX_";

/**
 * Découpe les tuples d'un `INSERT INTO … VALUES (…),(…);`.
 * Écrit à la main parce que les contenus WordPress sont pleins de virgules, de
 * parenthèses et d'apostrophes échappées : une expression régulière ne tient pas.
 */
function tuples(ligne) {
  const debut = ligne.indexOf(" VALUES ");
  if (debut === -1) return [];
  const resultats = [];
  let i = debut + 8;
  const n = ligne.length;

  while (i < n) {
    while (i < n && ligne[i] !== "(") i++;
    if (i >= n) break;
    i++; // passe la parenthèse ouvrante

    const valeurs = [];
    let courant = "";
    let dansChaine = false;
    let estNull = true;

    while (i < n) {
      const c = ligne[i];

      if (dansChaine) {
        if (c === "\\") {
          const suivant = ligne[i + 1];
          courant +=
            suivant === "n" ? "\n" : suivant === "r" ? "\r" : suivant === "t" ? "\t" : suivant;
          i += 2;
          continue;
        }
        if (c === "'") {
          if (ligne[i + 1] === "'") {
            courant += "'";
            i += 2;
            continue;
          }
          dansChaine = false;
          i++;
          continue;
        }
        courant += c;
        i++;
        continue;
      }

      if (c === "'") {
        dansChaine = true;
        estNull = false;
        i++;
        continue;
      }
      if (c === ",") {
        valeurs.push(estNull && courant.trim() === "NULL" ? null : courant.trim());
        courant = "";
        estNull = true;
        i++;
        continue;
      }
      if (c === ")") {
        valeurs.push(estNull && courant.trim() === "NULL" ? null : courant.trim());
        i++;
        break;
      }
      courant += c;
      i++;
    }
    resultats.push(valeurs);
  }
  return resultats;
}

const posts = new Map();
const metas = new Map(); // postId -> { rank_math_title, … }
const META_RETENUES = new Set([
  "rank_math_title",
  "rank_math_description",
  "rank_math_robots",
  "rank_math_canonical_url",
  "_wp_page_template",
]);

const flux = readline.createInterface({
  input: createReadStream(SQL, { encoding: "utf8" }),
  crlfDelay: Infinity,
});

let lignes = 0;
for await (const ligne of flux) {
  lignes += 1;

  if (ligne.startsWith(`INSERT INTO \`${PREFIXE}posts\``)) {
    for (const t of tuples(ligne)) {
      // Ordre des colonnes de wp_posts (schéma standard).
      const [
        id,
        ,
        postDate,
        ,
        contenu,
        titre,
        ,
        statut,
        ,
        ,
        ,
        nom,
        ,
        ,
        modifie,
        ,
        ,
        parent,
        guid,
        ,
        type,
      ] = t;
      posts.set(id, {
        id,
        titre,
        nom,
        statut,
        type,
        parent,
        guid,
        date: postDate,
        modifie,
        mots: contenu ? contenu.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length : 0,
      });
    }
  } else if (ligne.startsWith(`INSERT INTO \`${PREFIXE}postmeta\``)) {
    for (const [, postId, cle, valeur] of tuples(ligne)) {
      if (!META_RETENUES.has(cle)) continue;
      const existant = metas.get(postId) ?? {};
      existant[cle] = valeur;
      metas.set(postId, existant);
    }
  }
}

/** Chemin hiérarchique d'une page, reconstitué via post_parent. */
function cheminPage(post) {
  const segments = [];
  let courant = post;
  const vus = new Set();
  while (courant && courant.nom) {
    if (vus.has(courant.id)) break; // sécurité : boucle de parents
    vus.add(courant.id);
    segments.unshift(courant.nom);
    courant = courant.parent && courant.parent !== "0" ? posts.get(courant.parent) : null;
  }
  return `/${segments.join("/")}/`;
}

/**
 * Types à ignorer : ce ne sont pas des URL du site.
 * Tout le reste compte, y compris les types personnalisés du thème ThemeEnergy
 * « Transfers » — c'est là que vivent les 91 pages `destination`, qui n'ont
 * jamais été des `page` WordPress. Les rater, c'est rater un tiers du plan de
 * redirections.
 */
const IGNORES = new Set([
  "attachment",
  "revision",
  "nav_menu_item",
  "custom_css",
  "customize_changeset",
  "oembed_cache",
  "user_request",
  "wp_global_styles",
  "wp_navigation",
  "wp_template",
  "wp_template_part",
  "wp_block",
  "scheduled-action",
  "shop_order",
  "shop_order_refund",
  "shop_coupon",
  "product_variation",
  // Types techniques du thème et des extensions : ils n'ont pas d'URL publique.
  "elementor_library",
  "wp_font_face",
  "wp_font_family",
  "wpcf7_contact_form",
  "extra_item", // options de réservation (siège enfant, etc.)
  "transport_type", // types de véhicule, affichés dans le tunnel
]);

/** Types hiérarchiques : leur URL se reconstitue via post_parent. */
const HIERARCHIQUES = new Set(["page", "destination"]);

const inventaire = [];

for (const post of posts.values()) {
  if (post.statut !== "publish" || IGNORES.has(post.type)) continue;

  // Le CPT `destination` du thème est hiérarchique ET préfixé par sa base de
  // réécriture : /destination/austria/innsbruck-aiport/.
  const url =
    post.type === "destination"
      ? `/destination${cheminPage(post)}`
      : post.type === "page"
        ? cheminPage(post)
        : post.type === "post"
          ? `/${post.nom}/`
          : `/${post.type}/${post.nom}/`;

  const meta = metas.get(post.id) ?? {};
  inventaire.push({
    url,
    type: post.type,
    titre: post.titre,
    slug: post.nom,
    mots: post.mots,
    modifie: post.modifie,
    metaTitre: meta.rank_math_title ?? "",
    metaDescription: meta.rank_math_description ?? "",
    robots: meta.rank_math_robots ?? "",
    canonical: meta.rank_math_canonical_url ?? "",
  });
}

inventaire.sort((a, b) => a.url.localeCompare(b.url));

const parType = inventaire.reduce((acc, e) => {
  acc[e.type] = (acc[e.type] ?? 0) + 1;
  return acc;
}, {});

const sortie = path.join(RACINE, "wp-export");
await writeFile(path.join(sortie, "inventaire.json"), JSON.stringify(inventaire, null, 2), "utf8");

const csv = [
  "url;type;titre;mots;modifie;meta_titre;meta_description;robots",
  ...inventaire.map((e) =>
    [
      e.url,
      e.type,
      (e.titre ?? "").replaceAll(";", ","),
      e.mots,
      e.modifie,
      (e.metaTitre ?? "").replaceAll(";", ","),
      (e.metaDescription ?? "").replaceAll(";", ","),
      e.robots,
    ].join(";"),
  ),
].join("\n");
await writeFile(path.join(sortie, "inventaire.csv"), csv, "utf8");

console.log(`\n  ${lignes} lignes SQL lues, ${posts.size} entrées wp_posts.`);
console.log(`  ${inventaire.length} URL publiées :`);
for (const [type, n] of Object.entries(parType)) console.log(`    ${type.padEnd(10)} ${n}`);
console.log(`\n  → wp-export/inventaire.json et inventaire.csv\n`);
