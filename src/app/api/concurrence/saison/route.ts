import { after, NextResponse } from "next/server";
import { trajetsSuivis } from "@/lib/concurrence/releve";
import { releverLotSaison, TAILLE_LOT_SAISON } from "@/lib/concurrence/saison";

/**
 * Le relevé de haute saison (`lib/concurrence/saison.ts`), en chaîne : chaque
 * appel relève un trajet dans sa propre fonction, puis lance le suivant.
 *
 * Une seule tâche planifiée la déclenche, le 1er et le 15 de chaque mois
 * (`vercel.json`) ; le bouton « Relever la haute saison maintenant » fait de
 * même. Fermée comme les autres tâches : sans `Authorization: Bearer
 * <CRON_SECRET>`, 404.
 *
 * GET /api/concurrence/saison/?lot=0&chaine=1
 */
export const dynamic = "force-dynamic";
export const maxDuration = 300;

export async function GET(requete: Request) {
  const secret = process.env.CRON_SECRET?.trim();
  if (!secret || requete.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ erreur: "Not found." }, { status: 404 });
  }
  const url = new URL(requete.url);
  const lot = Number(url.searchParams.get("lot") ?? "0");
  if (!Number.isInteger(lot) || lot < 0 || lot > 200) {
    return NextResponse.json({ erreur: "Lot invalide." }, { status: 400 });
  }

  if (url.searchParams.get("chaine") !== "1") {
    return NextResponse.json(await releverLotSaison(lot));
  }

  after(async () => {
    await releverLotSaison(lot);
    const total = (await trajetsSuivis()).length;
    if ((lot + 1) * TAILLE_LOT_SAISON >= total) return;
    const suite = new URL(url);
    suite.searchParams.set("lot", String(lot + 1));
    await fetch(suite, { headers: { authorization: `Bearer ${secret}` }, cache: "no-store" }).catch((erreur) =>
      console.error(`[saison] lot ${lot + 1} non lancé`, erreur),
    );
  });
  return NextResponse.json({ lot, lance: true }, { status: 202 });
}
