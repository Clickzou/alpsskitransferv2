import { describe, expect, it } from "vitest";
import { ARTICLES } from "./index";

/**
 * Chaque article publié ou programmé déclare la requête Google qu'il vise
 * (`motCle`), dans sa langue. Sans elle, le tableau de bord Clickzou retombe
 * sur le metaTitre — un titre de 60 caractères qui ne se classe jamais.
 */
describe("mot-clé cible des articles", () => {
  const actifs = ARTICLES.filter((a) => !a.brouillon);

  it.each(actifs.map((a) => [a.slug, a] as const))("%s déclare son mot-clé", (_slug, a) => {
    const v = a.sansVersionAnglaise ? Object.values(a.traductions ?? {})[0] : a;
    const motCle = v?.motCle ?? "";
    expect(motCle.trim().length).toBeGreaterThan(0);
    // Une requête, pas un titre : courte, en minuscules, sans ponctuation de titre.
    expect(motCle).toBe(motCle.toLowerCase());
    expect(motCle.split(/\s+/).length).toBeLessThanOrEqual(8);
    expect(motCle).not.toMatch(/[?:!]/);
    expect(motCle).not.toBe(v?.metaTitre);
    for (const s of v?.motsClesSecondaires ?? []) expect(s).not.toBe(motCle);
  });
});
