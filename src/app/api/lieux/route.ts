import { NextResponse } from "next/server";
import { chercherAdresses } from "@/lib/reservation/adresses";

/**
 * Suggestions d'adresses pour les champs de lieu.
 *
 * Le catalogue des aéroports et des stations est déjà dans le navigateur : il
 * est petit, il ne change pas, et sa recherche doit rester instantanée. Cette
 * route ne sert donc **que** les adresses libres — hôtels, chalets, gares, rues
 * — que seul un géocodeur connaît.
 *
 * Elle passe par le serveur pour deux raisons : la clé Google, quand il y en a
 * une, ne doit pas partir dans le navigateur, et le fournisseur n'a pas à voir
 * l'adresse IP des visiteurs.
 *
 * GET /api/lieux?q=chalet+les+marmottes&lang=fr
 */
export const dynamic = "force-dynamic";

export async function GET(requete: Request) {
  const parametres = new URL(requete.url).searchParams;
  const q = (parametres.get("q") ?? "").slice(0, 120);
  const langue = (parametres.get("lang") ?? "en").slice(0, 2);

  if (q.trim().length < 3) return NextResponse.json({ lieux: [] });

  const lieux = await chercherAdresses(q, langue);
  return NextResponse.json(
    { lieux },
    // Les adresses ne changent pas d'une heure à l'autre : le CDN peut servir
    // deux fois la même réponse sans rien coûter au géocodeur.
    { headers: { "Cache-Control": "public, max-age=600, s-maxage=3600" } },
  );
}
