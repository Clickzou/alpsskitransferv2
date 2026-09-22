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

      {/*
        L'en-tête est plus large que le contenu au-delà de 1 024 pixels, et les
        écarts y sont resserrés.

        Le menu anglais porte neuf entrées depuis l'ajout des transferts
        premium, et « Contact » retombait sur une deuxième ligne. Ce n'était pas
        une affaire d'écran mais de **conteneur** : `max-w-6xl` plafonne la barre
        à 1 152 pixels quelle que soit la largeur de la fenêtre, si bien qu'un
        réglage conditionné à la taille de l'écran ne changeait rien là où ça
        coinçait. La barre passe donc à 1 216 pixels — les 32 pixels gagnés de
        chaque côté restent en deçà du seuil où l'œil perçoit le décalage avec la
        colonne de texte, et la barre des pays suit, pour que « Where we drive »
        reste aligné sur le logo.
      */}
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-3 py-3 sm:gap-4 sm:px-4 lg:max-w-[76rem]">
        <Link href={lienAccueil(lang)} className="shrink-0" aria-label={t.logoAccueil}>
          <Logo lang={lang} />
        </Link>

        {/*
          Le menu occupe l'espace laissé libre entre la marque et les actions,
          et s'y centre. Il était auparavant collé au bloc d'actions, tout à
          droite : les neuf entrées formaient alors un pavé de texte continu
          avec le sélecteur de langue et le bouton de réservation, et l'œil ne
          distinguait plus la navigation de l'appel à l'action. Le centrage
          rétablit les trois zones que la barre doit donner à lire d'un coup —
          qui l'on est, où l'on va, ce que l'on fait.

          Le corps du menu, lui, perd un demi-point sans condition de largeur :
          le menu tient ou ne tient pas dans une barre dont la largeur est
          plafonnée, et cela ne dépend pas de la taille de l'écran. Un réglage
          en `xl:` n'aurait servi qu'à rendre le défaut intermittent — donc
          plus difficile à voir et à corriger.
        */}
        <nav
          aria-label={t.navPrincipale}
          className="hidden min-w-0 flex-1 flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[0.8125rem] lg:flex"
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

        {/*
          Les actions restent groupées à droite, et `shrink-0` les y tient : une
          barre où le bouton de réservation se comprime au profit du menu
          inverserait la hiérarchie annoncée en tête de ce fichier.
        */}
        <div className="flex shrink-0 items-center gap-x-3 gap-y-2 sm:gap-x-4">
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
            className="shrink-0 rounded bg-marque px-3 py-2 text-xs font-semibold text-white transition hover:bg-marque-600 sm:px-4 sm:text-sm"
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
            className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-6 gap-y-1 px-4 py-2 text-xs text-alpine-600 lg:max-w-[76rem]"
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
