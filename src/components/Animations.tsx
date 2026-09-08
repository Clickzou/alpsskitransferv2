"use client";

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
 * 3. **On observe, on révèle, on oublie.** Chaque élément n'est observé qu'une
 *    fois : la page ne doit pas continuer à calculer après avoir été lue.
 */
export default function Animations() {
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
      // Le seuil bas et la marge négative en bas évitent qu'un bloc apparaisse
      // alors qu'il est déjà lu : il se révèle juste avant d'entrer dans l'œil.
      { threshold: 0.08, rootMargin: "0px 0px -8% 0px" },
    );

    cibles.forEach((element) => observateur.observe(element));
    return () => observateur.disconnect();
  }, []);

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
