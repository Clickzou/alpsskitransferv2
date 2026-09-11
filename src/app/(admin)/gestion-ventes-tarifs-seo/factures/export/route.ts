import { NextResponse } from "next/server";
import { csvFactures, facturesDuMois, moisCourant, moisValide } from "@/lib/admin/factures";
import { utilisateurCourant } from "@/lib/admin/session";

/**
 * L'export mensuel des factures, pour le comptable de l'exploitant.
 *
 * Réservé au back-office : sans session, la route se tait (404) — la liste des
 * factures dit qui a voyagé, quand, et pour combien.
 *
 * GET /gestion-ventes-tarifs-seo/factures/export/?mois=2026-09
 */
export const dynamic = "force-dynamic";

export async function GET(requete: Request) {
  if (!(await utilisateurCourant())) {
    return NextResponse.json({ erreur: "Not found." }, { status: 404 });
  }

  const mois = moisValide(new URL(requete.url).searchParams.get("mois")) ?? moisCourant();
  const factures = await facturesDuMois(mois);
  if (!factures) {
    return NextResponse.json({ erreur: "Stripe ne répond pas." }, { status: 503 });
  }

  return new NextResponse(csvFactures(factures), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="factures-${mois}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
