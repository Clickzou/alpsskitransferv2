import type { BlocContenu } from "@/lib/resorts/types";
import { sommaire } from "@/lib/ancres";

/**
 * Sommaire d'un article long.
 *
 * Il sert deux choses à la fois, et c'est ce qui le rend rentable :
 *
 * · **la lecture** — un guide de neuf intertitres se parcourt avant de se lire,
 *   et la plupart des visiteurs cherchent une seule des sections ;
 * · **le référencement** — Google compose parfois des liens de saut sous le
 *   résultat de recherche à partir des ancres d'une page, ce qui élargit
 *   l'emprise du résultat dans la page de résultats.
 *
 * Il ne s'affiche qu'**à partir de quatre entrées** : en dessous, il double le
 * plan sans rendre service, et il repousse le texte sous la ligne de flottaison.
 *
 * Rendu en `<nav>` avec une liste ordonnée : ce sont des liens de navigation
 * interne, et l'ordre porte du sens.
 */
export default function Sommaire({
  blocs,
  titre = "In this guide",
  minimum = 4,
}: {
  blocs: BlocContenu[];
  titre?: string;
  /** Nombre d'entrées en deçà duquel le sommaire ne s'affiche pas. */
  minimum?: number;
}) {
  const entrees = sommaire(blocs);
  if (entrees.length < minimum) return null;

  return (
    <nav
      aria-label={titre}
      className="mb-10 rounded-xl border border-glacier-200 bg-glacier-50 p-5 sm:p-6"
    >
      <p className="text-xs font-semibold uppercase tracking-widest text-or-700">{titre}</p>
      <ol className="mt-4 grid gap-x-8 gap-y-2 sm:grid-cols-2">
        {entrees.map((entree, i) => (
          <li key={entree.ancre} className="flex gap-3 text-sm">
            <span className="shrink-0 tabular-nums text-alpine-600">{i + 1}.</span>
            <a
              href={`#${entree.ancre}`}
              className="text-alpine-700 underline-offset-2 hover:text-marque hover:underline"
            >
              {entree.titre}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
