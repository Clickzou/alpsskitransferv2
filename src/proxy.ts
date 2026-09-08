import { NextResponse, type NextRequest } from "next/server";
import {
  CHEMINS_NOINDEX,
  PAGES_SUPPRIMEES_410,
  REDIRECTIONS_301,
} from "@/data/redirections";

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

export default function proxy(request: NextRequest) {
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

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/|images/|favicon|robots.txt|sitemap).*)"],
};
