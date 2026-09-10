import Link from "next/link";
import { NOMS_LANGUES, type Alternative, type Lang } from "@/lib/i18n";
import { T } from "@/lib/intl/textes";

/**
 * Le sélecteur de langue de l'en-tête.
 *
 * **Il n'affiche que des langues qui existent pour la page courante.** C'est le
 * constat n°1 de l'audit retourné : l'ancien site propose EN / ES / DE / IT sur
 * chaque page, `/es/` répond 404 et les trois autres redirigent vers des pages
 * sans rapport. Ici, une langue apparaît quand la page a été écrite dans cette
 * langue, et pas avant.
 *
 * Il ne s'affiche donc pas du tout sur une page qui n'existe que dans une
 * langue — un bouton seul qui ne mène nulle part ne rend service à personne.
 *
 * **Un bouton, pas quatre codes en ligne.** La version précédente posait les
 * quatre codes côte à côte dans la barre : un rectangle large qui, sur la home
 * anglaise, repoussait « Contact » à la ligne suivante alors que le sélecteur
 * n'est utilisé qu'une fois par visite. Le bouton n'occupe plus que la place de
 * la langue courante, et la liste s'ouvre au clic.
 *
 * `details` / `summary` plutôt qu'un menu en React : il s'ouvre, se ferme, se
 * navigue au clavier et s'annonce aux lecteurs d'écran **sans une ligne de
 * JavaScript**. Un sélecteur de langue est justement ce qu'un visiteur cherche
 * quand la page vient de s'afficher, avant que les scripts ne soient chargés.
 */
export default function SelecteurLangue({
  lang,
  alternatives,
}: {
  lang: Lang;
  alternatives: Alternative[];
}) {
  if (alternatives.length === 0) return null;

  return (
    <details className="group relative shrink-0">
      <summary
        aria-label={T(lang).changerDeLangue}
        className="flex cursor-pointer list-none items-center gap-1.5 rounded border border-glacier-300 px-2 py-1.5 text-xs font-semibold uppercase tracking-wide text-alpine transition hover:border-alpine/40 hover:bg-glacier-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-alpes [&::-webkit-details-marker]:hidden"
      >
        {/*
          Le globe pose la fonction avant le code : « DE » seul dans une barre
          peut se lire comme une destination, et le visiteur qui cherche sa
          langue cherche cette icône.
        */}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          className="h-4 w-4 shrink-0 text-alpine-600"
        >
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
          <path
            d="M3 12h18M12 3c2.5 2.6 2.5 15.4 0 18-2.5-2.6-2.5-15.4 0-18Z"
            stroke="currentColor"
            strokeWidth="1.6"
          />
        </svg>
        {lang}
        {/* Le chevron pivote à l'ouverture : c'est ce qui distingue un bouton
            qui déplie d'un bouton qui navigue. */}
        <svg
          viewBox="0 0 20 20"
          fill="none"
          aria-hidden="true"
          className="h-3 w-3 shrink-0 text-alpine-600 transition-transform group-open:rotate-180"
        >
          <path d="m5 7.5 5 5 5-5" stroke="currentColor" strokeWidth="1.8" />
        </svg>
      </summary>

      <nav
        aria-label={T(lang).changerDeLangue}
        className="absolute right-0 z-40 mt-1 min-w-[10rem] overflow-hidden rounded border border-glacier-200 bg-white py-1 shadow-flottant"
      >
        {/* La langue courante reste dans la liste, marquée : sans elle, le
            visiteur ne sait pas ce qu'il quitte. */}
        <span
          aria-current="true"
          className="flex items-center justify-between gap-3 bg-glacier-50 px-3 py-2 text-sm font-semibold text-alpine"
        >
          {NOMS_LANGUES[lang]}
          <span aria-hidden="true" className="text-xs uppercase text-alpine-600">
            {lang}
          </span>
        </span>

        {alternatives.map((autre) => (
          <Link
            key={autre.lang}
            href={autre.path}
            hrefLang={autre.lang}
            lang={autre.lang}
            className="flex items-center justify-between gap-3 px-3 py-2 text-sm text-alpine-700 transition hover:bg-glacier-100 hover:text-alpes"
          >
            {NOMS_LANGUES[autre.lang]}
            <span aria-hidden="true" className="text-xs uppercase text-alpine-600">
              {autre.lang}
            </span>
          </Link>
        ))}
      </nav>
    </details>
  );
}
