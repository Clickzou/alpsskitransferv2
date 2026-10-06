import { NextResponse } from "next/server";
import { SITE } from "@/data/site";
import { airportParSlug } from "@/lib/airports";
import { ARTICLES, dateAtteinte } from "@/lib/articles";
import type { Article } from "@/lib/articles/types";
import { cheminApercu } from "@/lib/articles/apercu";
import { ENTETES_TABLEAU_DE_BORD, autoriseTableauDeBord } from "@/lib/articles/tableau-de-bord";
import { cheminArticle, cheminTrajet } from "@/lib/intl/liens";
import { LANGS_SECONDAIRES } from "@/lib/i18n";
import { SLUG_PAYS, resortParSlug } from "@/lib/resorts";
import { SEGMENTS_AEROPORT, transferParSlugs } from "@/lib/transfers";

/**
 * GET /api/articles-programmes/ — la liste des articles pour le tableau de bord
 * client Clickzou (clickzou.fr/espace-client, onglet « Articles programmés »),
 * au format `ArticleClient` attendu par Clickzou
 * (`src/lib/espace-client/articles.ts` du dépôt clickzou-v2).
 *
 * Pour chaque article non brouillon : statut (publié / programmé), lien public
 * ou lien d'aperçu signé, et la matière des posts LinkedIn (chapô, points clés,
 * mot-clé, pilier). Sans clé valide : 401, et les sujets à venir ne sortent pas.
 */
export const dynamic = "force-dynamic";

/** Texte brut : retire un éventuel balisage `**gras**` et `[ancre](url)`. */
function brut(texte: string): string {
  return texte.replace(/\*\*/g, "").replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
}

/**
 * La page qui vend, servie par l'article : le premier trajet lié qui a une
 * page, sinon la première station liée, sinon l'index du blog. Chemin relatif,
 * comme chez Un Seul Souffle.
 */
function pilier(a: Article): { href: string; ancre: string } {
  // Article sans version anglaise : le premier trajet cité qui a une page dans sa langue.
  const langue = langueDe(a);
  if (langue) {
    for (const { airport, resort } of a.traductions![langue]!.trajetsLies ?? []) {
      const station = resortParSlug(resort);
      const href = station && transferParSlugs(airport, resort) ? cheminTrajet(station, airport, langue) : undefined;
      if (station && href) {
        const nom = station.traductions?.[langue]?.nom ?? station.name;
        return { href, ancre: `transfert ${SEGMENTS_AEROPORT[langue][airport]?.nom ?? airport} – ${nom}` };
      }
    }
    return { href: `/${langue}/blog/`, ancre: "blog" };
  }
  for (const { airport, resort } of a.trajetsLies ?? []) {
    const station = resortParSlug(resort);
    const aeroport = airportParSlug(airport);
    if (!station || !aeroport || !transferParSlugs(airport, resort)) continue;
    const href = cheminTrajet(station, airport, "en");
    if (href) return { href, ancre: `${aeroport.name} to ${station.name} transfer` };
  }
  for (const slug of a.stationsLiees ?? []) {
    const station = resortParSlug(slug);
    if (station) return { href: `/${SLUG_PAYS[station.country]}/${station.slug}/`, ancre: `${station.name} ski transfers` };
  }
  return { href: "/blog/", ancre: "Alps ski transfer guides" };
}

/** La langue d'un article sans version anglaise (la première traduite) ; `undefined` sinon. */
function langueDe(a: Article) {
  return a.sansVersionAnglaise ? LANGS_SECONDAIRES.find((l) => a.traductions?.[l]) : undefined;
}

export async function GET(requete: Request) {
  if (!autoriseTableauDeBord(requete)) {
    return NextResponse.json({ ok: false }, { status: 401, headers: ENTETES_TABLEAU_DE_BORD });
  }

  // Deux adresses : `url`, l'adresse DÉFINITIVE (alpsskitransfers.com, barre
  // finale comme tout le site — `trailingSlash: true`), celle qu'on diffuse ;
  // `urlActuelle` / `apercuUrl`, le domaine réellement servi (celui de la requête).
  const base = new URL(requete.url).origin;

  const liste = ARTICLES.filter((a) => !a.brouillon)
    .sort((a, b) => a.datePublication.localeCompare(b.datePublication))
    .map((a) => {
      const publie = dateAtteinte(a);
      // Sans version anglaise : titre, adresse et textes viennent de la traduction.
      const langue = langueDe(a);
      const v = langue ? a.traductions![langue]! : a;
      const chemin = cheminArticle(a, langue ?? "en") ?? `/blog/${a.slug}/`;
      const apercu = publie ? null : cheminApercu(a.slug);
      // Le WebP plutôt que l'AVIF du site : LinkedIn ne lit pas l'AVIF.
      const image = a.image?.src ?? (a.visuel ? `/images/${a.visuel.nom}.webp` : undefined);
      return {
        slug: a.slug,
        titre: v.titre,
        datePublication: a.datePublication.slice(0, 10),
        statut: publie ? "publie" : "programme",
        url: `${SITE.url}${chemin}`,
        urlActuelle: `${base}${chemin}`,
        ...(image ? { image: `${base}${image}` } : {}),
        apercuUrl: apercu ? `${base}${apercu}` : null,
        auteur: a.auteur,
        // La requête visée par l'article (`motCle`, dans sa langue). Le repli
        // sur le metaTitre ne sert qu'à un article oublié — le test
        // `mots-cles.test.ts` l'interdit pour tout article non brouillon.
        motCle: v.motCle ?? brut(v.metaTitre || v.titre),
        motsClesSecondaires: v.motsClesSecondaires ?? [],
        metaDescription: v.metaDescription,
        chapo: brut(v.chapo),
        essentiel: { reponse: brut(v.chapo), points: (v.aRetenir ?? []).map(brut) },
        pilier: pilier(a),
      };
    });

  return NextResponse.json(
    { ok: true, site: "Alps Ski Transfers", articles: liste },
    { headers: ENTETES_TABLEAU_DE_BORD },
  );
}
