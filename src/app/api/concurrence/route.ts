import { NextResponse } from "next/server";
import { releverLot } from "@/lib/concurrence/releve";

/**
 * Le relevé des prix concurrents — tâches planifiées Vercel (`vercel.json`),
 * un lot de cinq trajets par appel, la nuit.
 *
 * Fermée comme la relance du matin : sans `Authorization: Bearer <CRON_SECRET>`,
 * elle répond 404.
 *
 * GET /api/concurrence?lot=3
 */
export const dynamic = "force-dynamic";
export const maxDuration = 300;

export async function GET(requete: Request) {
  const secret = process.env.CRON_SECRET?.trim();
  if (!secret || requete.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ erreur: "Not found." }, { status: 404 });
  }
  const lot = Number(new URL(requete.url).searchParams.get("lot") ?? "0");
  if (!Number.isInteger(lot) || lot < 0 || lot > 40) {
    return NextResponse.json({ erreur: "Lot invalide." }, { status: 400 });
  }
  return NextResponse.json(await releverLot(lot));
}
