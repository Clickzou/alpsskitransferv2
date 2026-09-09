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
 * Pas de menu déroulant : à trois entrées au maximum, une liste de codes tient
 * dans la barre, se lit d'un coup d'œil et fonctionne sans JavaScript. Le code
 * porte le nom complet en `title` et en libellé accessible, parce que « IT »
 * seul ne dit rien à qui ne le cherche pas.
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
    <nav
      aria-label={T(lang).changerDeLangue}
      className="flex shrink-0 items-center gap-1 rounded border border-glacier-300 px-1 py-0.5"
    >
      {/*
        Le globe pose la fonction avant les codes : « DE » seul dans une barre
        peut se lire comme une destination, et le visiteur qui cherche sa langue
        cherche cette icône.
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
      <span className="px-1 text-xs font-semibold uppercase tracking-wide text-alpine">
        {lang}
      </span>
      {alternatives.map((autre) => (
        <Link
          key={autre.lang}
          href={autre.path}
          hrefLang={autre.lang}
          lang={autre.lang}
          title={NOMS_LANGUES[autre.lang]}
          className="rounded px-1.5 py-0.5 text-xs font-medium uppercase tracking-wide text-alpine-600 transition hover:bg-glacier-100 hover:text-alpes"
        >
          <span aria-hidden="true">{autre.lang}</span>
          <span className="sr-only">{NOMS_LANGUES[autre.lang]}</span>
        </Link>
      ))}
    </nav>
  );
}
