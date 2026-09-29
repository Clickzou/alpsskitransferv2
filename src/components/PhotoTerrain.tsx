import Visuel from "@/components/Visuel";
import { photoTerrainStation } from "@/data/photos-terrain";
import type { Lang } from "@/lib/i18n";

/**
 * La photo prise sur place par l'exploitant, sous le texte d'une page de
 * station. Rien si la station n'en a pas, ou pas de légende dans cette langue.
 *
 * Hors de la colonne latérale, délibérément : elle est collante, et une photo
 * en portrait l'aurait rendue plus haute que l'écran — la carte « Réserver »,
 * en bas, n'aurait plus été visible pendant la lecture.
 */
export default function PhotoTerrain({ slug, lang = "en" }: { slug: string; lang?: Lang }) {
  const photo = photoTerrainStation(slug, lang);
  if (!photo) return null;
  return (
    <figure className="mt-10 max-w-sm overflow-hidden rounded-xl border border-glacier-200 bg-white shadow-carte">
      <Visuel
        nom={photo.nom}
        alt={photo.legende}
        sizes="(min-width: 640px) 24rem, 100vw"
        className="aspect-[4/5] w-full object-cover"
      />
      <figcaption className="px-4 py-3 text-sm text-alpine-600">{photo.legende}</figcaption>
    </figure>
  );
}
