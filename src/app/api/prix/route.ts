import { NextResponse } from "next/server";
import { devisPublic } from "@/lib/reservation/devis-public";
import { limiteDevis } from "@/lib/reservation/limite";
import { grilleActive } from "@/lib/tarification/grilles-publiees";

/**
 * Le prix exact d'un transfert, en une adresse lisible par un assistant qui
 * navigue — décrite dans `/openapi.json` et annoncée dans `/llms.txt`
 * (demande de JC, 15 septembre 2026).
 *
 * GET /api/prix/?from=Geneva&to=Alpe%20d'Huez&date=2026-12-19&time=14:30&passengers=4&bags=4&ski_bags=4
 *
 * Même calcul et même limite que le devis du tunnel (`devisPublic`,
 * `limiteDevis`) : trente demandes par heure et par connexion, pour que les
 * concurrents ne relèvent pas nos prix en masse par cette porte-ci.
 */
export const dynamic = "force-dynamic";

const ENTETES = {
  "Access-Control-Allow-Origin": "*",
  "Cache-Control": "no-store",
  "X-Robots-Tag": "noindex",
};

export async function GET(requete: Request) {
  const limite = await limiteDevis(requete);
  if (limite) return limite;

  const p = new URL(requete.url).searchParams;
  const entier = (cle: string) => {
    const brut = p.get(cle);
    const n = Number(brut);
    return brut !== null && Number.isFinite(n) ? Math.floor(n) : undefined;
  };
  const from = p.get("from")?.trim();
  const to = p.get("to")?.trim();
  const date = p.get("date")?.trim();
  const passengers = entier("passengers") ?? 2;
  if (!from || !to || !date) {
    return NextResponse.json(
      { ok: false, error: "Required: from, to, date (YYYY-MM-DD). Optional: time (HH:mm), passengers, bags, ski_bags, return_date, return_time." },
      { status: 400, headers: ENTETES },
    );
  }

  const resultat = await devisPublic(
    {
      from: from.slice(0, 200),
      to: to.slice(0, 200),
      date,
      time: p.get("time") ?? undefined,
      passengers,
      bags: entier("bags"),
      skiBags: entier("ski_bags"),
      returnDate: p.get("return_date") ?? undefined,
      returnTime: p.get("return_time") ?? undefined,
    },
    await grilleActive(),
  );
  return NextResponse.json(resultat, { status: resultat.ok ? 200 : 422, headers: ENTETES });
}
