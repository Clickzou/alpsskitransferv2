import { beforeEach, describe, expect, it } from "vitest";
import { GRILLE_DEFAUT, type Grille } from "@/lib/tarification/grille";
import { devisReservation } from "@/lib/reservation/devis";
import { instantAlpes } from "@/lib/temps";
import { appliquerPlan, planAlignement, type PrixReleve } from "./alignement";

beforeEach(() => {
  delete process.env.BAREME_VALIDE;
});

const trajet = [{ airport: "geneva-airport", resort: "val-thorens" }];
const releve = (jour: "mercredi" | "samedi", gamme: "standard" | "premium", prix: number | null, passagers = 4): PrixReleve => ({
  airport: "geneva-airport",
  resort: "val-thorens",
  jour,
  date_trajet: jour === "mercredi" ? "2026-10-07" : "2026-10-10",
  passagers,
  gamme,
  prix,
});

const prix = (g: Grille, categorie: "standard" | "business" | "premium", depart: Date) => {
  const r = devisReservation({ airport: "geneva-airport", resort: "val-thorens", categorie, passagers: 1, aller: depart }, g);
  return r.ok ? r.devis.total : null;
};

describe("mettre à jour tous nos tarifs", () => {
  it("baisse sous un concurrent moins cher, et monte quand on l'est beaucoup moins", () => {
    const plan = planAlignement(GRILLE_DEFAUT, trajet, [releve("mercredi", "standard", 250), releve("samedi", "standard", 500)], 5);
    const g = appliquerPlan(GRILLE_DEFAUT, plan);
    expect(prix(g, "standard", instantAlpes(2026, 10, 7, 10, 0))).toBe(245);
    expect(prix(g, "standard", instantAlpes(2026, 10, 10, 10, 0))).toBe(495);
  });

  it("déduit la nuit du prix de jour aligné plus la majoration de nuit", () => {
    const plan = planAlignement(GRILLE_DEFAUT, trajet, [releve("mercredi", "standard", 250)], 5);
    const g = appliquerPlan(GRILLE_DEFAUT, plan);
    expect(prix(g, "standard", instantAlpes(2026, 10, 7, 23, 0))).toBe(Math.round(245 * 1.2));
  });

  it("aligne Business et Premium sur le haut de gamme, et ignore les autres groupes", () => {
    const plan = planAlignement(
      GRILLE_DEFAUT,
      trajet,
      [releve("mercredi", "premium", 400), releve("mercredi", "standard", 100, 2)],
      10,
    );
    expect(plan.changements.filter((c) => c.creneau === "semaineJour").map((c) => [c.categorie, c.apres])).toEqual([
      ["business", 390],
      ["premium", 390],
    ]);
  });

  it("n'applique pas une baisse de plus de moitié, et laisse un trajet sans concurrent", () => {
    const plan = planAlignement(GRILLE_DEFAUT, [...trajet, { airport: "lyon-airport", resort: "courchevel" }], [releve("mercredi", "standard", 60)], 5);
    expect(plan.changements.filter((c) => c.categorie === "standard")).toEqual([]);
    expect(plan.ecartes.length).toBeGreaterThan(0);
    expect(plan.sansReference).toEqual(["Lyon Airport → Courchevel"]);
  });
});
