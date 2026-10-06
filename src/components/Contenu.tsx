import Link from "next/link";
import type { ReactNode } from "react";
import type { BlocContenu } from "@/lib/resorts/types";
import { Coche } from "@/components/gabarit/Sections";
import { ancresDesTitres } from "@/lib/ancres";

/**
 * Rendu des blocs de contenu, communs aux stations, aux trajets et aux articles.
 *
 * Les pages de station font ≈ 1 100 mots repris du WordPress : la mise en forme
 * doit d'abord les rendre lisibles. D'où la mesure limitée à `max-w-prose`, les
 * H2 posés sur un filet vert, et les listes à coches plutôt qu'à puces — c'est le
 * même signe que celui des blocs de réassurance de la home.
 */
/**
 * Un texte avec ses liens internes : `[ancre](/chemin/)` devient un lien.
 *
 * Ajouté le 6 octobre 2026 pour les articles du blog — le maillage dans le
 * corps du texte, en ancre naturelle (SEO_MASTER §5), et non plus seulement en
 * cartes sous l'article. Seuls les chemins internes (`/…`) deviennent des
 * liens ; tout le reste s'affiche tel quel. Aucun contenu antérieur n'utilisait
 * cette forme : les pages existantes rendent exactement le même HTML.
 *
 * Les titres (H2, H3) n'en portent jamais : leur texte sert d'ancre au sommaire.
 */
const LIEN = /\[([^\]]+)\]\((\/[^)\s]*)\)/g;

export function TexteRiche({ texte }: { texte: string }): ReactNode {
  if (!texte.includes("](/")) return texte;
  const morceaux: ReactNode[] = [];
  let curseur = 0;
  for (const m of texte.matchAll(LIEN)) {
    const debut = m.index ?? 0;
    if (debut > curseur) morceaux.push(texte.slice(curseur, debut));
    morceaux.push(
      <Link
        key={debut}
        href={m[2]}
        className="font-medium text-marque underline decoration-marque/30 underline-offset-2 hover:decoration-marque"
      >
        {m[1]}
      </Link>,
    );
    curseur = debut + m[0].length;
  }
  if (curseur < texte.length) morceaux.push(texte.slice(curseur));
  return morceaux;
}

export default function Contenu({ blocs }: { blocs: BlocContenu[] }) {
  /*
   * Les titres portent une ancre stable, dérivée de leur texte. Elle sert au
   * sommaire des articles, aux liens profonds qu'on peut partager, et aux liens
   * de saut que Google compose parfois sous un résultat de recherche.
   */
  const ancres = ancresDesTitres(blocs);

  return (
    <div className="max-w-prose space-y-4 text-alpine-700">
      {blocs.map((bloc, i) => {
        switch (bloc.type) {
          case "titre2":
            return (
              <h2
                key={i}
                id={ancres.get(i)}
                /*
                  Le filet se cale sur la hauteur du titre : la marge est portée
                  par la marge haute, pas par le padding, sinon le trait vert
                  court sur tout l'espace qui précède.

                  `scroll-mt` : sans cette marge, l'en-tête collant du site
                  recouvre le titre vers lequel on vient de sauter depuis le
                  sommaire.
                */
                className="mt-8 scroll-mt-24 border-l-4 border-alpes pl-4 font-display text-2xl text-alpine"
              >
                {bloc.texte}
              </h2>
            );
          case "titre3":
            return (
              <h3
                key={i}
                id={ancres.get(i)}
                className="scroll-mt-24 pt-5 font-display text-xl text-alpine"
              >
                {bloc.texte}
              </h3>
            );
          case "liste":
            return (
              <ul key={i} className="space-y-2">
                {bloc.items.map((item, j) => (
                  <li key={j} className="flex gap-3">
                    <Coche className="mt-1 h-4 w-4 shrink-0 text-alpes" />
                    <span>
                      <TexteRiche texte={item} />
                    </span>
                  </li>
                ))}
              </ul>
            );
          default:
            return (
              <p key={i} className="leading-relaxed">
                <TexteRiche texte={bloc.texte} />
              </p>
            );
        }
      })}
    </div>
  );
}
