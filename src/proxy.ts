import { NextResponse, type NextRequest } from "next/server";
import {
  CHEMINS_NOINDEX,
  PAGES_SUPPRIMEES_410,
  REDIRECTIONS_301,
} from "@/data/redirections";
import { indexationOuverte } from "@/lib/indexation";
import {
  COOKIE_ACCES,
  COOKIE_RAFRAICHISSEMENT,
  DUREE_RAFRAICHISSEMENT,
  echangerRafraichissement,
  jetonAExpirer,
  optionsCookie,
} from "@/lib/admin/jetons";

/**
 * Prolonge la session du back-office avant que la page ne se rende.
 *
 * Le jeton d'accès de Supabase vit une heure. Le renouveler depuis la page est
 * impossible — une page n'écrit pas de cookie —, si bien que la session
 * tombait au bout d'une heure. Le proxy, lui, le peut : il échange le jeton de
 * rafraîchissement, remplace les cookies **de la requête** pour que la page
 * voie tout de suite le nouveau jeton, et les pose sur la réponse pour le
 * navigateur. Rien à faire tant que le jeton a plus d'une minute devant lui.
 */
async function sessionProlongee(request: NextRequest): Promise<NextResponse | null> {
  const acces = request.cookies.get(COOKIE_ACCES)?.value;
  const rafraichissement = request.cookies.get(COOKIE_RAFRAICHISSEMENT)?.value;
  if (!rafraichissement || !jetonAExpirer(acces)) return null;

  const jetons = await echangerRafraichissement(rafraichissement);
  if (!jetons) return null;

  request.cookies.set(COOKIE_ACCES, jetons.access_token);
  request.cookies.set(COOKIE_RAFRAICHISSEMENT, jetons.refresh_token);
  const reponse = NextResponse.next({ request: { headers: request.headers } });
  reponse.cookies.set(COOKIE_ACCES, jetons.access_token, optionsCookie(jetons.expires_in));
  reponse.cookies.set(
    COOKIE_RAFRAICHISSEMENT,
    jetons.refresh_token,
    optionsCookie(DUREE_RAFRAICHISSEMENT),
  );
  return reponse;
}

/**
 * Traitement des anciennes URL WordPress. Convention Next 16 : ce fichier
 * remplace src/middleware.ts (déprécié).
 *
 * Les règles sont ici plutôt que dans `next.config.ts` parce qu'avec
 * `trailingSlash: true`, une URL sans slash final serait d'abord normalisée
 * (308) puis redirigée (301) : deux sauts. Le proxy traite les deux formes et
 * pointe directement sur la destination finale.
 */

const GONE = new Set(
  PAGES_SUPPRIMEES_410.flatMap((slug) => [`/${slug}`, `/${slug}/`]),
);

/** Retire le slash final pour comparer un chemin aux clés de la table. */
function normaliser(chemin: string): string {
  const bas = chemin.toLowerCase();
  return bas.length > 1 && bas.endsWith("/") ? bas.slice(0, -1) : bas;
}

/**
 * L'en-tête qui ferme la préproduction.
 *
 * `robots.txt` empêche l'exploration, pas l'indexation : une URL bloquée mais
 * liée depuis ailleurs peut apparaître dans les résultats, sans titre ni
 * description. Seul un `noindex` lu sur la réponse l'empêche — d'où cet
 * en-tête, posé sur tout ce qui sort.
 */
function fermerAuxMoteurs(reponse: NextResponse): NextResponse {
  if (!indexationOuverte()) {
    reponse.headers.set("X-Robots-Tag", "noindex, nofollow");
  }
  return reponse;
}

export default async function proxy(request: NextRequest) {
  const chemin = request.nextUrl.pathname.toLowerCase();
  const normalise = normaliser(chemin);

  if (GONE.has(chemin)) {
    return new NextResponse("410 Gone — this page was removed when the site was rebuilt.", {
      status: 410,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "X-Robots-Tag": "noindex",
      },
    });
  }

  const destination = REDIRECTIONS_301[normalise];
  if (destination) {
    return NextResponse.redirect(new URL(destination, request.url), 301);
  }

  // Pages du tunnel WooCommerce, conservées en l'état : on ne les redirige pas,
  // on les sort de l'index.
  if (CHEMINS_NOINDEX.includes(normalise)) {
    const reponse = NextResponse.next();
    reponse.headers.set("X-Robots-Tag", "noindex, follow");
    return reponse;
  }

  if (chemin.startsWith("/gestion-ventes-tarifs-seo")) {
    const prolongee = await sessionProlongee(request);
    if (prolongee) return fermerAuxMoteurs(prolongee);
  }

  return fermerAuxMoteurs(NextResponse.next());
}

export const config = {
  matcher: ["/((?!_next/|images/|favicon|robots.txt|sitemap).*)"],
};
