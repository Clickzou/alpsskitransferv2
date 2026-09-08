import Image from "next/image";
import dimensions from "../../public/images/dimensions.json";

/**
 * Image du site, servie depuis `public/images` en AVIF avec repli WebP.
 *
 * Les dimensions viennent du fichier produit par `npm run images:preparer` :
 * elles réservent la place et évitent le décalage de mise en page. Les oublier
 * est la première cause de mauvais score CLS.
 */
/** Nom d'un visuel préparé par `npm run images:preparer`. */
export type NomVisuel = keyof typeof dimensions;

export default function Visuel({
  nom,
  alt,
  className,
  sizes,
  priority = false,
}: {
  nom: NomVisuel;
  alt: string;
  className?: string;
  sizes?: string;
  /** À réserver à l'image LCP — une seule par page. */
  priority?: boolean;
}) {
  const { width, height } = dimensions[nom];
  return (
    <Image
      src={`/images/${nom}.avif`}
      alt={alt}
      width={width}
      height={height}
      className={className}
      sizes={sizes}
      priority={priority}
    />
  );
}
