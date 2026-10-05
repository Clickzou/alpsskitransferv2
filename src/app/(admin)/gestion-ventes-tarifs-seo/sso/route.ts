import { NextResponse } from "next/server";

import { emailAutorise } from "@/lib/admin/acces";
import { verifierLaissezPasser } from "@/lib/admin/laissez-passer";
import { poserCookies } from "@/lib/admin/session";
import { sessionSansMotDePasse } from "@/lib/admin/session-sans-mot-de-passe";

/**
 * GET /gestion-ventes-tarifs-seo/sso/?jeton=…&suite=/gestion-ventes-tarifs-seo/…
 * Connexion automatique depuis clickzou.fr (laissez-passer signé, 2 min max).
 * Le compte doit exister dans Supabase ET figurer dans ADMIN_EMAILS : le
 * laissez-passer n'ouvre jamais plus que ce que le mot de passe ouvrirait.
 * Tout échec renvoie vers la connexion normale, sans dire pourquoi.
 */
export async function GET(requete: Request) {
  const url = new URL(requete.url);
  const suiteDemandee = url.searchParams.get("suite") ?? "";
  const suite = suiteDemandee.startsWith("/gestion-ventes-tarifs-seo/") ? suiteDemandee : "/gestion-ventes-tarifs-seo/";
  const connexion = new URL("/gestion-ventes-tarifs-seo/connexion/", url.origin);

  const email = verifierLaissezPasser(url.searchParams.get("jeton"), "alpsskitransfers.com");
  if (!email || !emailAutorise(email)) return NextResponse.redirect(connexion);
  const session = await sessionSansMotDePasse(email);
  if (!session) return NextResponse.redirect(connexion);

  await poserCookies(session.access_token, session.refresh_token, session.expires_in);
  return NextResponse.redirect(new URL(suite, url.origin));
}
