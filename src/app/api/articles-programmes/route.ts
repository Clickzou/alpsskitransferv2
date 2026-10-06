import { NextResponse } from "next/server";
import { SITE } from "@/data/site";
import { airportParSlug } from "@/lib/airports";
import { ARTICLES, dateAtteinte } from "@/lib/articles";
import type { Article } from "@/lib/articles/types";
import { cheminApercu } from "@/lib/articles/apercu";
import { ENTETES_TABLEAU_DE_BORD, autoriseTableauDeBord } from "@/lib/articles/tableau-de-bord";
import { cheminTrajet } from "@/lib/intl/liens";
import { SLUG_PAYS, resortParSlug } from "@/lib/resorts";
import { transferParSlugs } from "@/lib/transfers";

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
      const apercu = publie ? null : cheminApercu(a.slug);
      // Le WebP plutôt que l'AVIF du site : LinkedIn ne lit pas l'AVIF.
      const image = a.image?.src ?? (a.visuel ? `/images/${a.visuel.nom}.webp` : undefined);
      return {
        slug: a.slug,
        titre: a.titre,
        datePublication: a.datePublication.slice(0, 10),
        statut: publie ? "publie" : "programme",
        url: `${SITE.url}/blog/${a.slug}/`,
        urlActuelle: `${base}/blog/${a.slug}/`,
        ...(image ? { image: `${base}${image}` } : {}),
        apercuUrl: apercu ? `${base}${apercu}` : null,
        auteur: a.auteur,
        // Le site n'a pas de mot-clé cible par article : le metaTitre en tient lieu.
        motCle: brut(a.metaTitre || a.titre),
        motsClesSecondaires: [] as string[],
        metaDescription: a.metaDescription,
        chapo: brut(a.chapo),
        essentiel: { reponse: brut(a.chapo), points: (a.aRetenir ?? []).map(brut) },
        pilier: pilier(a),
      };
    });

  return NextResponse.json(
    { ok: true, site: "Alps Ski Transfers", articles: liste },
    { headers: ENTETES_TABLEAU_DE_BORD },
  );
}
