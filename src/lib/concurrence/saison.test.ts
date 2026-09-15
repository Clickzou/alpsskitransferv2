import { describe, expect, it } from "vitest";
import { composantesAlpes, instantAlpes } from "@/lib/temps";
import { DATES_SAISON, datesAVenir } from "./saison";

describe("dates de haute saison", () => {
  it("ne relève que des samedis, jours de rotation des locations", () => {
    for (const { date } of DATES_SAISON) {
      const [a, m, j] = date.split("-").map(Number);
      expect(composantesAlpes(instantAlpes(a, m, j, 10, 0)).jourSemaine, date).toBe(6);
    }
  });

  it("écarte les samedis passés", () => {
    const dates = datesAVenir(new Date("2027-01-10T08:00:00Z")).map((d) => d.date);
    expect(dates[0]).toBe("2027-01-16");
    expect(dates).not.toContain("2026-12-19");
  });
});
