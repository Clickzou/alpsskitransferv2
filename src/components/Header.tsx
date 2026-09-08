import Link from "next/link";
import { PAYS } from "@/lib/pays";
import { lienReservation } from "@/lib/reservation/config";
import type { Lang } from "@/lib/i18n";

/**
 * En-tête du site.
 *
 * Trois choses y tiennent, dans cet ordre de priorité : la marque, l'accès à la
 * réservation, la navigation. Le bouton d'action est donc le seul élément
 * coloré, et il reste visible sur mobile là où le menu se replie.
 *
 * La barre secondaire liste les quatre pays du silo : c'est le maillage le plus
 * rentable du site, présent sur chaque page, et il remplace le menu de langues
 * décoratif de l'ancien site — quatre langues annoncées dont aucune n'existait.
 *
 * `alternate` n'est passé que si la page existe réellement dans l'autre langue.
 */
export default function Header({
  lang,
  alternate,
}: {
  lang: Lang;
  alternate?: { lang: Lang; path: string };
}) {
  const accueil = lang === "en" ? "/" : "/fr/";

  const navigation =
    lang === "en"
      ? [
          { texte: "Book tickets", chemin: "/book-ski-transfer-tickets/" },
          { texte: "Private transfers", chemin: "/private-airport-transfers-to-alps-ski-resort/" },
          { texte: "Ski resorts", chemin: "/ski-resort-transfers/" },
          { texte: "Blog", chemin: "/blog/" },
          { texte: "Help", chemin: "/general-questions/" },
          { texte: "Contact", chemin: "/contact/" },
        ]
      : [
          { texte: "Stations", chemin: "/fr/" },
          { texte: "Privé ou partagé", chemin: "/fr/transferts-prives/" },
          { texte: "Comment réserver", chemin: "/fr/comment-reserver/" },
          { texte: "Blog", chemin: "/fr/blog/" },
          { texte: "Aide", chemin: "/fr/aide/" },
          { texte: "Contact", chemin: "/fr/contact/" },
        ];

  return (
    <header className="sticky top-0 z-30 border-b border-glacier-200 bg-white/95 shadow-entete backdrop-blur">
      {/* Le raccourci du clavier : premier élément focusable de la page. */}
      <a
        href="#contenu"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded focus:bg-alpine focus:px-4 focus:py-2 focus:text-sm focus:text-white"
      >
        {lang === "en" ? "Skip to content" : "Aller au contenu"}
      </a>

      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-3">
        <Link
          href={accueil}
          className="flex shrink-0 items-baseline gap-1.5 font-display text-xl leading-none"
          aria-label={lang === "en" ? "Alps Ski Transfers, home" : "Alps Ski Transfers, accueil"}
        >
          <span className="font-semibold text-alpine">Alps Ski</span>
          <span className="text-alpes">Transfers</span>
        </Link>

        <div className="flex flex-1 items-center justify-end gap-x-5 gap-y-2">
          <nav
            aria-label={lang === "en" ? "Main" : "Principal"}
            className="hidden flex-wrap items-center gap-x-5 gap-y-1 text-sm lg:flex"
          >
            {navigation.map((item) => (
              <Link
                key={item.chemin}
                href={item.chemin}
                className="text-alpine-700 transition-colors hover:text-marque"
              >
                {item.texte}
              </Link>
            ))}
          </nav>

          {alternate ? (
            <Link
              href={alternate.path}
              hrefLang={alternate.lang}
              className="rounded border border-glacier-300 px-2 py-1 text-xs font-medium uppercase tracking-wide text-alpine-700 transition hover:border-alpes hover:text-alpes"
            >
              {alternate.lang}
            </Link>
          ) : null}

          <Link
            href={lang === "en" ? lienReservation() : "/fr/reserver/"}
            className="shrink-0 rounded bg-marque px-4 py-2 text-sm font-semibold text-white transition hover:bg-marque-600"
          >
            {lang === "en" ? "Book now" : "Réserver"}
          </Link>
        </div>
      </div>

      {/* Sur les écrans étroits, la navigation passe sous la marque plutôt que
          derrière un menu à ouvrir : six liens tiennent sur deux lignes, et un
          menu caché coûte un clic à chaque visiteur. */}
      <nav
        aria-label={lang === "en" ? "Main, compact" : "Principal, compact"}
        className="border-t border-glacier-100 bg-glacier-50 lg:hidden"
      >
        <div className="mx-auto flex max-w-6xl flex-wrap gap-x-5 gap-y-1 px-4 py-2 text-xs text-alpine-700">
          {navigation.map((item) => (
            <Link key={item.chemin} href={item.chemin} className="hover:text-marque">
              {item.texte}
            </Link>
          ))}
        </div>
      </nav>

      {lang === "en" ? (
        <div className="hidden border-t border-glacier-100 bg-glacier-50 lg:block">
          <nav
            aria-label="Countries"
            className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-6 gap-y-1 px-4 py-2 text-xs text-alpine-600"
          >
            <span className="font-semibold uppercase tracking-widest text-alpine-600">
              Where we drive
            </span>
            {Object.entries(PAYS)
              .filter(([, pays]) => pays.code !== "DE")
              .map(([slug, pays]) => (
                <Link key={slug} href={`/${slug}/`} className="hover:text-marque">
                  {pays.nom}
                </Link>
              ))}
            <Link href="/switzerland-ski-transfers/geneva-airport/" className="hover:text-marque">
              Geneva Airport
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
