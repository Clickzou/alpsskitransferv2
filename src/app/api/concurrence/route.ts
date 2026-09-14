import { after, NextResponse } from "next/server";
import { releverLot, TAILLE_LOT, trajetsSuivis } from "@/lib/concurrence/releve";

/**
 * Le relevé des prix concurrents, un lot de cinq trajets par appel.
 *
 * Deux usages :
 *
 * - **la nuit**, les tâches planifiées Vercel (`vercel.json`) appellent chaque
 *   lot à son heure et attendent qu'il soit fini ;
 * - **« Relever tous les trajets maintenant »** appelle le premier lot avec
 *   `chaine=1` : la route répond tout de suite, relève son lot en arrière-plan,
 *   puis appelle le lot suivant de la même façon. Chaque lot tient dans sa
 *   propre fonction — trois minutes environ —, et la chaîne entière dans les
 *   vingt-cinq minutes qu'aucune fonction seule n'aurait le droit de durer.
 *
 * Fermée comme la relance du matin : sans `Authorization: Bearer <CRON_SECRET>`,
 * elle répond 404.
 *
 * GET /api/concurrence?lot=3            (tâche de nuit)
 * GET /api/concurrence?lot=0&chaine=1   (relevé complet à la demande)
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
  if (!Number.isInteger(lot) || lot < 0 || lot > 40) {
    return NextResponse.json({ erreur: "Lot invalide." }, { status: 400 });
  }

  if (url.searchParams.get("chaine") !== "1") {
    return NextResponse.json(await releverLot(lot));
  }

  after(async () => {
    await releverLot(lot);
    const total = (await trajetsSuivis()).length;
    if ((lot + 1) * TAILLE_LOT >= total) return;
    const suite = new URL(url);
    suite.searchParams.set("lot", String(lot + 1));
    // Le lot suivant répond aussitôt et travaille dans sa propre fonction : on n'attend que son accusé.
    await fetch(suite, { headers: { authorization: `Bearer ${secret}` }, cache: "no-store" }).catch((erreur) =>
      console.error(`[concurrence] lot ${lot + 1} non lancé`, erreur),
    );
  });
  return NextResponse.json({ lot, lance: true }, { status: 202 });
}
