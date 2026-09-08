import Image from "next/image";
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
  return (
    <Image
      src={variante === "clair" ? "/logo-alpsskitransfers-blanc.png" : "/logo-alpsskitransfers.png"}
      alt={lang === "en" ? "Alps Ski Transfers" : "Alps Ski Transfers"}
      width={largeur}
      height={hauteur}
      style={{ height: hauteurAffichee, width: "auto" }}
      className={className}
      priority
    />
  );
}
