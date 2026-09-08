import type { NextConfig } from "next";

/**
 * Trailing slash obligatoire : c'est la forme servie par le WordPress actuel et
 * celle qu'a indexée Google sur les 260 URL. Le changer imposerait une
 * redirection supplémentaire sur l'intégralité du site.
 *
 * Le plan de redirections des anciennes URL vit dans src/proxy.ts et non ici :
 * le proxy s'exécute avant la normalisation du trailing slash, ce qui évite les
 * chaînes à deux sauts.
 */
const nextConfig: NextConfig = {
  /*
   * `next build` et `next dev` partagent `.next` par défaut : lancer un build
   * pendant qu'un serveur de développement tourne lui retire ses fichiers sous
   * les pieds, et le site se met à répondre 500 sur sa feuille de styles.
   * `NEXT_DIST_DIR=.next-build npm run build` isole les deux. Vercel, qui ne
   * définit pas la variable, construit dans `.next` comme attendu.
   */
  distDir: process.env.NEXT_DIST_DIR ?? ".next",
  trailingSlash: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          // Constat n°… de l'audit : le site actuel ne sert AUCUN en-tête de
          // sécurité et répond `Cache-Control: max-age=0` sur tout.
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(self)" },
        ],
      },
    ];
  },
};

export default nextConfig;
