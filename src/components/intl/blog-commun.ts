import { articlesPublies } from "@/lib/articles";
import type { Article } from "@/lib/articles/types";
import { LOCALES, type LangueSecondaire } from "@/lib/i18n";

/**
 * Ce que les deux vues du blog traduit partagent.
 *
 * Elles vivent dans deux fichiers parce que le contrôle SEO de prebuild compte
 * les `<h1>` d'un composant importé : deux vues d'un H1 chacune dans le même
 * fichier se lisent comme une page à deux H1 — le défaut relevé sur les pages
 * `/destination/` de l'ancien site. La règle a raison, c'est le rangement qui
 * avait tort.
 */

/** Les articles réellement traduits dans cette langue. */
export function articlesDeLaLangue(lang: LangueSecondaire): Article[] {
  return articlesPublies().filter((a) => a.traductions?.[lang]);
}

/** La date, dans la forme longue de la langue. */
export function dateLongue(iso: string, lang: LangueSecondaire) {
  return new Date(iso).toLocaleDateString(LOCALES[lang], {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/** Le temps de lecture, à 200 mots par minute. */
export function minutesLecture(blocs: { texte?: string; items?: string[] }[]) {
  const mots = blocs
    .flatMap((bloc) => bloc.items ?? [bloc.texte ?? ""])
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(mots / 200));
}

/** L'intitulé du sommaire d'un article, par langue. */
export const TITRE_SOMMAIRE: Record<LangueSecondaire, string> = {
  fr: "Au sommaire",
  de: "Inhalt",
  it: "In questa guida",
};
