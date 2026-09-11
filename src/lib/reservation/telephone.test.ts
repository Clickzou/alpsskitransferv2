import { describe, expect, it } from "vitest";
import { echeanceVirement, joursJusqua } from "./telephone";

const maintenant = new Date("2026-11-01T10:00:00Z");
const dans = (jours: number) => new Date(maintenant.getTime() + jours * 24 * 3600 * 1000);

describe("echeanceVirement", () => {
  it("laisse sept jours quand la course est loin", () => {
    expect(echeanceVirement(dans(40), maintenant).toISOString()).toBe(dans(7).toISOString());
  });

  it("ramène l'échéance à deux jours avant la prise en charge", () => {
    expect(echeanceVirement(dans(5), maintenant).toISOString()).toBe(dans(3).toISOString());
  });

  it("ne fixe jamais d'échéance avant demain", () => {
    expect(echeanceVirement(dans(2), maintenant).toISOString()).toBe(dans(1).toISOString());
  });
});

describe("joursJusqua", () => {
  it("compte les jours entiers, au moins un", () => {
    expect(joursJusqua(dans(7), maintenant)).toBe(7);
    expect(joursJusqua(dans(0.2), maintenant)).toBe(1);
  });
});
