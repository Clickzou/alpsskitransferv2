"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Apparition des sections au défilement.
 *
 * Trois règles, dans cet ordre :
 *
 * 1. **Sans JavaScript, tout est visible.** L'état masqué n'est appliqué que si
 *    la classe `js-anime` est posée sur `<html>`, ce que fait un script en
 *    ligne au tout début du `<body>`. Un robot, un lecteur de flux ou un
 *    navigateur sans script voit la page entière — une animation ne doit jamais
 *    pouvoir faire disparaître du contenu.
 * 2. **`prefers-reduced-motion` gagne.** La feuille de styles neutralise
 *    l'apparition pour qui a demandé moins de mouvement ; ce composant n'a alors
 *    rien à faire.
 * 3. **Ce qui est déjà à l'écran est révélé tout de suite.** Sans cela, un bloc
 *    plus haut que la fenêtre — le corps d'une page de station, par exemple —
 *    reste invisible sous le bandeau : il n'atteint jamais le seuil de
 *    visibilité demandé, puisqu'il est trop grand pour y entrer.
 * 4. **On observe, on révèle, on oublie.** Chaque élément n'est observé qu'une
 *    fois : la page ne doit pas continuer à calculer après avoir été lue.
 * 5. **On recommence à chaque page.** Ce composant est posé dans le layout
 *    racine, qui ne se remonte pas d'une navigation à l'autre : un effet à
 *    dépendances vides ne s'exécuterait qu'au tout premier chargement, et
 *    chaque page atteinte depuis un lien interne resterait masquée. D'où le
 *    chemin en dépendance.
 */
export default function Animations() {
  const chemin = usePathname();

  useEffect(() => {
    const doux = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cibles = document.querySelectorAll<HTMLElement>(
      "[data-anime]:not(.vu), [data-anime-decale]:not(.vu)",
    );

    if (doux || typeof IntersectionObserver === "undefined") {
      cibles.forEach((element) => element.classList.add("vu"));
      return;
    }

    const observateur = new IntersectionObserver(
      (entrees) => {
        for (const entree of entrees) {
          if (!entree.isIntersecting) continue;
          entree.target.classList.add("vu");
          observateur.unobserve(entree.target);
        }
      },
      /*
       * Seuil à zéro : **le moindre pixel visible suffit**. Un seuil en
       * pourcentage paraît plus fin, mais il condamne les blocs plus hauts que
       * la fenêtre — ils n'en occuperont jamais 8 %. La marge négative en bas
       * garde l'idée utile : révéler juste avant que l'œil n'arrive.
       */
      { threshold: 0, rootMargin: "0px 0px -5% 0px" },
    );

    /*
     * Ce qui est déjà à l'écran au chargement se révèle sans transition : une
     * animation d'entrée sur du contenu que le visiteur regarde déjà n'est pas
     * une entrée, c'est un clignotement.
     */
    const hauteur = window.innerHeight;
    for (const element of cibles) {
      if (element.getBoundingClientRect().top < hauteur * 0.95) element.classList.add("vu");
      else observateur.observe(element);
    }
    return () => observateur.disconnect();
  }, [chemin]);

  return null;
}

/**
 * Le script posé avant le premier rendu.
 *
 * Il ne fait qu'une chose : dire à la feuille de styles que JavaScript est là.
 * Le faire depuis React arriverait après le premier affichage, et le contenu
 * déjà peint disparaîtrait le temps d'une image.
 *
 * C'est un **attribut**, pas une classe : `className` de `<html>` porte les
 * variables de police et est rendu par React. Y ajouter une classe avant
 * l'hydratation faisait diverger le DOM du rendu serveur, et React s'en
 * plaignait à chaque chargement.
 */
export const SCRIPT_ANIMATIONS =
  "document.documentElement.setAttribute('data-anime-pret','')";
