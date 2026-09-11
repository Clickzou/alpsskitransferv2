import { describe, expect, it } from "vitest";
import { agesLisibles, enfantsLisibles, enfantsParSens } from "./enfants";

describe("enfantsParSens", () => {
  it("sépare l'aller et le retour", () => {
    expect(enfantsParSens("aller 1 · retour 2 (3 and 4)")).toEqual({
      aller: 1,
      retour: 2,
      ages: "3 and 4",
    });
  });

  it("répète le même nombre sur les deux sens quand il ne change pas", () => {
    expect(enfantsParSens("2 (5, 8)")).toEqual({ aller: 2, retour: 2, ages: "5, 8" });
  });

  it("ne devine pas un nombre qui n'a pas été donné", () => {
    expect(enfantsParSens("âges : 4")).toEqual({ aller: null, retour: null, ages: "4" });
  });

  it("dit zéro quand il n'y a rien", () => {
    expect(enfantsParSens(null)).toEqual({ aller: 0, retour: 0, ages: null });
  });
});

describe("enfantsLisibles", () => {
  it("dit le cas relevé par JC en toutes lettres", () => {
    expect(enfantsLisibles("aller 1 · retour 2 (3 and 4)")).toBe(
      "1 enfant à l’aller, 2 au retour · âges : 3 ans et 4 ans",
    );
  });

  it("accorde le nombre d'enfants", () => {
    expect(enfantsLisibles("1")).toBe("1 enfant");
    expect(enfantsLisibles("2 (5, 8)")).toBe("2 enfants · âges : 5 ans et 8 ans");
  });

  it("accorde l'âge", () => {
    expect(enfantsLisibles("1 (1)")).toBe("1 enfant · âges : 1 an");
    expect(enfantsLisibles("1 (0)")).toBe("1 enfant · âges : moins d’un an");
  });

  it("lit les âges écrits dans les autres langues du site", () => {
    expect(enfantsLisibles("3 (2, 6 und 9)")).toBe("3 enfants · âges : 2 ans, 6 ans et 9 ans");
    expect(enfantsLisibles("2 (4 anni e 7 anni)")).toBe("2 enfants · âges : 4 ans et 7 ans");
  });

  it("lit les âges donnés sans nombre d'enfants", () => {
    expect(enfantsLisibles("âges : 4")).toBe("âges : 4 ans");
  });

  it("laisse tel quel ce qui n'est pas une simple liste d'âges", () => {
    expect(agesLisibles("3 ans et 18 mois")).toBe("3 ans et 18 mois");
    expect(enfantsLisibles("un bébé")).toBe("un bébé");
  });

  it("dit l'absence", () => {
    expect(enfantsLisibles(null)).toBe("—");
    expect(enfantsLisibles("  ")).toBe("—");
  });
});
