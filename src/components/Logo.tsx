import Image from "next/image";
import type { CSSProperties } from "react";
import dimensions from "../../public/logo-dimensions.json";
import type { Lang } from "@/lib/i18n";

/**
 * Le logo de la marque, préparé par `npm run logo:preparer`.
 *
 * Deux variantes, parce que le lettrage d'origine est bleu nuit : `sombre` sur
 * fond clair, `clair` sur le bleu nuit du pied de page, où le logo d'origine
 * serait invisible. Le pictogramme garde son vert dans les deux cas.
 *
 * Le fichier fait le double de sa taille d'affichage, pour rester net sur un
 * écran à haute densité, et ses dimensions sont déclarées : un logo sans
 * dimensions décale l'en-tête au chargement, sur toutes les pages du site.
 */
export default function Logo({
  lang,
  variante = "sombre",
  className,
}: {
  lang: Lang;
  variante?: "sombre" | "clair";
  className?: string;
}) {
  const { largeur, hauteur, hauteurAffichee } = dimensions;
  /*
    Deux tailles, pas une.

    Le logo mesurait 218 px de large à hauteur fixe, quelle que soit la fenêtre.
    Sur un iPhone 13 — 390 px — il ne restait plus la place du sélecteur de
    langue, du panier et du bouton de réservation, et l'en-tête débordait de
    87 px : tout le site défilait latéralement sur mobile. Il passe donc à 30 px
    de haut sous 640 px de large, et retrouve sa taille au-delà. La hauteur
    nominale voyage en variable CSS parce qu'elle vient du fichier de
    dimensions : une classe Tailwind ne peut pas la connaître à la compilation.
  */
  return (
    <Image
      src={variante === "clair" ? "/logo-alpsskitransfers-blanc.png" : "/logo-alpsskitransfers.png"}
      alt={lang === "en" ? "Alps Ski Transfers" : "Alps Ski Transfers"}
      width={largeur}
      height={hauteur}
      style={{ "--logo-h": `${hauteurAffichee}px` } as CSSProperties}
      className={`h-[30px] w-auto sm:h-[var(--logo-h)] ${className ?? ""}`}
      priority
    />
  );
}
