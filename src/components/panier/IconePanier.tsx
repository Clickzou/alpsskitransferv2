"use client";

import Link from "next/link";
import { usePanier } from "@/components/panier/PanierProvider";

/**
 * L'icône de panier de l'en-tête, avec sa pastille de quantité.
 *
 * Elle est **toujours visible**, à côté du bouton d'action : le visiteur doit
 * savoir où retrouver ce qu'il a mis de côté, même quand il n'a encore rien mis.
 *
 * La pastille, elle, n'apparaît qu'à partir d'une course. Afficher « 0 » en
 * permanence — ce que faisait le WordPress — n'apprend rien et attire l'œil sur
 * un chiffre qui ne veut rien dire.
 *
 * Le compte n'est rendu qu'une fois le stockage lu (`pret`) : sinon la pastille
 * apparaîtrait à zéro le temps d'une image, ce qui se voit.
 */
export default function IconePanier({ etiquette = "Your transfers" }: { etiquette?: string }) {
  const { nombre, pret } = usePanier();

  return (
    <Link
      href="/cart/"
      /*
        Un cercle or autour de l'icône : il la pose comme un bouton, la
        distingue des liens de texte voisins, et reprend l'or du logo juste à
        côté du bouton d'action vert — les deux ne se disputent pas le regard.
      */
      className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-alpes-300 text-alpine-700 transition hover:border-alpes hover:text-alpes"
      aria-label={
        pret && nombre > 0
          ? `${etiquette} — ${nombre} ${nombre > 1 ? "transfers" : "transfer"}`
          : `${etiquette} — empty`
      }
    >
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-5 w-5">
        <path
          d="M3 4h2l2.4 10.4a2 2 0 0 0 2 1.6h7.2a2 2 0 0 0 2-1.55L20.5 8H6"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="10" cy="20" r="1.4" fill="currentColor" />
        <circle cx="17" cy="20" r="1.4" fill="currentColor" />
      </svg>

      {pret && nombre > 0 ? (
        <span
          /* `tabular-nums` : la pastille ne change pas de largeur entre 1 et 2. */
          className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-marque px-1 text-[0.7rem] font-semibold tabular-nums text-white"
        >
          {nombre}
        </span>
      ) : null}
    </Link>
  );
}
