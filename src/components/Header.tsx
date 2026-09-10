import Link from "next/link";
import Logo from "@/components/Logo";
import SelecteurLangue from "@/components/SelecteurLangue";
import IconePanier from "@/components/panier/IconePanier";
import { PAYS } from "@/lib/pays";
import type { Alternative, Lang } from "@/lib/i18n";
import { lienAccueil, lienTunnelLangue, navigation as liensNavigation } from "@/lib/intl/navigation";
import { T } from "@/lib/intl/textes";

/**
 * En-tête du site.
 *
 * Trois choses y tiennent, dans cet ordre de priorité : la marque, l'accès à la
 * réservation, la navigation. Le bouton d'action est donc le seul élément
 * coloré, et il reste visible sur mobile là où le menu se replie.
 *
 * La barre secondaire liste les quatre pays du silo : c'est le maillage le plus
 * rentable du site, présent sur chaque page.
 *
 * `alternatives` ne contient que des pages qui existent réellement dans l'autre
 * langue — voir `SelecteurLangue`.
 */
export default function Header({
  lang,
  alternatives = [],
}: {
  lang: Lang;
  alternatives?: Alternative[];
}) {
  const t = T(lang);
  const navigation = liensNavigation(lang);

  return (
    <header className="sticky top-0 z-30 border-b border-glacier-200 bg-white/95 shadow-entete backdrop-blur">
      {/* Le raccourci du clavier : premier élément focusable de la page. */}
      <a
        href="#contenu"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded focus:bg-alpine focus:px-4 focus:py-2 focus:text-sm focus:text-white"
      >
        {t.allerAuContenu}
      </a>

      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-3">
        <Link href={lienAccueil(lang)} className="shrink-0" aria-label={t.logoAccueil}>
          <Logo lang={lang} />
        </Link>

        <div className="flex flex-1 items-center justify-end gap-x-5 gap-y-2">
          <nav
            aria-label={t.navPrincipale}
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

          <SelecteurLangue lang={lang} alternatives={alternatives} />

          {/*
            Le panier est visible dans les quatre langues depuis le
            10 septembre 2026. Il ne l'était qu'en anglais — la page `/cart/` et
            les libellés n'existaient que là — si bien qu'un visiteur français
            pouvait mettre un transfert de côté depuis une page de trajet, puis
            ne plus trouver où le retrouver. Chaque langue a maintenant sa page
            (`/fr/panier/`, `/de/warenkorb/`, `/it/carrello/`) et ses mots ;
            le re-chiffrage par `/api/panier/`, lui, reste le même pour tous.
          */}
          <IconePanier etiquette={t.panier} langue={lang} />

          <Link
            href={lienTunnelLangue(lang)}
            className="shrink-0 rounded bg-marque px-4 py-2 text-sm font-semibold text-white transition hover:bg-marque-600"
          >
            {t.reserver}
          </Link>
        </div>
      </div>

      {/* Sur les écrans étroits, la navigation passe sous la marque plutôt que
          derrière un menu à ouvrir : six liens tiennent sur deux lignes, et un
          menu caché coûte un clic à chaque visiteur. */}
      <nav
        aria-label={t.navCompacte}
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
            {/*
              Les deux index — stations et aéroports — vivent dans le menu
              principal. Les répéter ici ferait deux liens vers la même URL sur
              chaque page : le second n'apporte rien, et il dilue la barre, dont
              le rôle est le maillage vers les quatre hubs pays.
            */}
            <Link href="/switzerland-ski-transfers/geneva-airport/" className="hover:text-marque">
              Geneva Airport
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
