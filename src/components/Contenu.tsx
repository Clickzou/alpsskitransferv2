import type { BlocContenu } from "@/lib/resorts/types";
import { Coche } from "@/components/gabarit/Sections";

/**
 * Rendu des blocs de contenu, communs aux stations, aux trajets et aux articles.
 *
 * Les pages de station font ≈ 1 100 mots repris du WordPress : la mise en forme
 * doit d'abord les rendre lisibles. D'où la mesure limitée à `max-w-prose`, les
 * H2 posés sur un filet vert, et les listes à coches plutôt qu'à puces — c'est le
 * même signe que celui des blocs de réassurance de la home.
 */
export default function Contenu({ blocs }: { blocs: BlocContenu[] }) {
  return (
    <div className="max-w-prose space-y-4 text-alpine-700">
      {blocs.map((bloc, i) => {
        switch (bloc.type) {
          case "titre2":
            return (
              <h2
                key={i}
                // Le filet se cale sur la hauteur du titre : la marge est portée
                // par la marge haute, pas par le padding, sinon le trait vert
                // court sur tout l'espace qui précède.
                className="mt-8 border-l-4 border-alpes pl-4 font-display text-2xl text-alpine"
              >
                {bloc.texte}
              </h2>
            );
          case "titre3":
            return (
              <h3 key={i} className="pt-5 font-display text-xl text-alpine">
                {bloc.texte}
              </h3>
            );
          case "liste":
            return (
              <ul key={i} className="space-y-2">
                {bloc.items.map((item, j) => (
                  <li key={j} className="flex gap-3">
                    <Coche className="mt-1 h-4 w-4 shrink-0 text-alpes" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            );
          default:
            return (
              <p key={i} className="leading-relaxed">
                {bloc.texte}
              </p>
            );
        }
      })}
    </div>
  );
}
