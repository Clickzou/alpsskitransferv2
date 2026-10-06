import { NextResponse } from "next/server";
import { ARTICLES, dateAtteinte } from "@/lib/articles";
import { champsEditables } from "@/lib/articles/edition-client";
import { ENTETES_TABLEAU_DE_BORD, autoriseTableauDeBord } from "@/lib/articles/tableau-de-bord";

/**
 * GET /api/articles-programmes/contenu/?slug=<slug> — les textes modifiables
 * d'un article (version anglaise), pour l'éditeur de l'espace client Clickzou.
 * Même clé et même contrat que chez Un Seul Souffle. Les textes renvoyés
 * intègrent les corrections déjà enregistrées.
 */
export const dynamic = "force-dynamic";

export async function GET(requete: Request) {
  if (!autoriseTableauDeBord(requete)) {
    return NextResponse.json({ ok: false }, { status: 401, headers: ENTETES_TABLEAU_DE_BORD });
  }
  const slug = new URL(requete.url).searchParams.get("slug") ?? "";
  const article = ARTICLES.find((a) => a.slug === slug && !a.brouillon);
  if (!article) {
    return NextResponse.json({ ok: false, erreur: "Article introuvable" }, { status: 404, headers: ENTETES_TABLEAU_DE_BORD });
  }

  return NextResponse.json(
    {
      ok: true,
      slug: article.slug,
      // Sans version anglaise, `titre` reprend déjà celui de la traduction.
      titre: article.titre,
      datePublication: article.datePublication.slice(0, 10),
      statut: dateAtteinte(article) ? "publie" : "programme",
      // Chemin du fichier de corrections dans le dépôt : Clickzou y écrit.
      fichierCorrections: "src/lib/articles/corrections-client.json",
      champs: champsEditables(article),
    },
    { headers: ENTETES_TABLEAU_DE_BORD },
  );
}
