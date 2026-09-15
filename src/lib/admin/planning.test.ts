import { describe, expect, it } from "vitest";
import { jourValide, periode } from "./planning";

describe("periode", () => {
  it("découpe la semaine du lundi au dimanche", () => {
    const p = periode("semaine", "2026-09-17");
    expect(p.jours[0]).toBe("2026-09-14");
    expect(p.jours[6]).toBe("2026-09-20");
    expect(p.titre).toBe("Semaine du 14 au 20 septembre 2026");
    expect(p.precedent).toBe("2026-09-10");
  });

  it("borne la semaine à minuit, heure des Alpes", () => {
    const p = periode("semaine", "2026-09-17");
    // 14 septembre 0 h à Paris = 13 septembre 22 h UTC (heure d'été).
    expect(p.debut.toISOString()).toBe("2026-09-13T22:00:00.000Z");
    expect(p.fin.toISOString()).toBe("2026-09-20T22:00:00.000Z");
  });

  it("donne au mois des semaines entières", () => {
    const p = periode("mois", "2026-10-15");
    expect(p.jours[0]).toBe("2026-09-28");
    expect(p.jours[p.jours.length - 1]).toBe("2026-11-01");
    expect(p.jours.length % 7).toBe(0);
    expect(p.titre).toBe("Octobre 2026");
    expect(p.suivant).toBe("2026-11-01");
  });

  it("franchit le changement d'heure sans perdre de jour", () => {
    const p = periode("semaine", "2026-10-25");
    expect(p.jours).toHaveLength(7);
    expect(p.fin.toISOString()).toBe("2026-10-25T23:00:00.000Z");
  });

  it("refuse un jour illisible", () => {
    expect(jourValide("2026-13-01", new Date("2026-09-15T08:00:00Z"))).toBe("2026-09-15");
  });
});
