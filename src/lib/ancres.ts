import type { BlocContenu } from "@/lib/resorts/types";

/**
 * Ancres des titres, pour le sommaire et les liens profonds.
 *
 * Deux raisons de les poser, dans cet ordre :
 *
 * 1. **Un guide de 800 mots à neuf intertitres se parcourt avant de se lire.**
 *    Le sommaire donne le plan en un coup d'œil et permet d'aller droit à la
 *    section utile.
 * 2. **Google s'en sert.** Il compose parfois des liens de saut sous le
 *    résultat de recherche à partir des ancres d'une page, ce qui élargit
 *    l'emprise du résultat. Il faut pour cela des `id` stables et un sommaire
 *    qui y renvoie réellement.
 *
 * L'ancre est dérivée du texte du titre plutôt que de sa position : elle survit
 * donc à l'ajout d'une section au milieu de l'article, et un lien partagé ne se
 * casse pas à la première révision éditoriale.
 */

/** « Which airport, and why it matters » → « which-airport-and-why-it-matters ». */
export function ancre(texte: string): string {
  return (
    texte
      .normalize("NFD")
      // Retire les diacritiques : « Chambéry » et « Chambery » doivent donner
      // la même ancre, sans quoi l'URL se retrouve percluse de %C3%A9.
      .replace(/[̀-ͯ]/g, "")
      .toLowerCase()
      .replace(/['’]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 60) || "section"
  );
}

/**
 * Les ancres d'une suite de blocs, dans l'ordre, dédoublonnées.
 *
 * Deux titres identiques dans un même article donneraient deux `id` identiques,
 * et le second lien du sommaire ramènerait alors au premier. Le suffixe
 * numérique règle le cas sans changer l'ancre du premier.
 */
export function ancresDesTitres(blocs: BlocContenu[]): Map<number, string> {
  const vues = new Map<string, number>();
  const resultat = new Map<number, string>();

  blocs.forEach((bloc, index) => {
    if (bloc.type !== "titre2" && bloc.type !== "titre3") return;
    const base = ancre(bloc.texte);
    const compte = vues.get(base) ?? 0;
    vues.set(base, compte + 1);
    resultat.set(index, compte === 0 ? base : `${base}-${compte + 1}`);
  });

  return resultat;
}

/** Les entrées du sommaire : les H2 seuls — un plan à deux niveaux ne se lit plus. */
export function sommaire(blocs: BlocContenu[]): { titre: string; ancre: string }[] {
  const ancres = ancresDesTitres(blocs);
  return blocs.flatMap((bloc, index) =>
    bloc.type === "titre2" ? [{ titre: bloc.texte, ancre: ancres.get(index)! }] : [],
  );
}
