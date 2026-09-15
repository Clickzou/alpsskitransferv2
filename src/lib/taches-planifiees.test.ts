import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

/**
 * Les tâches planifiées de Vercel ne suivent pas les redirections.
 *
 * Le site répond avec une barre finale (`trailingSlash: true`) : appelée sur
 * `/api/relances`, la route renvoie un 308 vers `/api/relances/`, et la tâche
 * s'arrête là, sans erreur visible. C'est ainsi que le relevé de la
 * concurrence et le rappel d'adresse du matin n'ont jamais tourné, du
 * 11 au 15 septembre 2026.
 */
describe("vercel.json", () => {
  it("appelle chaque tâche planifiée sur son adresse finale, barre comprise", () => {
    const config = JSON.parse(readFileSync("vercel.json", "utf8")) as { crons?: { path: string }[] };
    const sansBarre = (config.crons ?? []).map((c) => c.path).filter((p) => !p.split("?")[0].endsWith("/"));
    expect(sansBarre).toEqual([]);
  });
});
