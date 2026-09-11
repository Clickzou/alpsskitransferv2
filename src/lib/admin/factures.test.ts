import { describe, expect, it } from "vitest";
import { bornesMois, csvFactures, moisValide, moisVoisin, type Facture } from "./factures";

describe("moisVoisin", () => {
  it("passe d'une année à l'autre", () => {
    expect(moisVoisin("2026-12", 1)).toBe("2027-01");
    expect(moisVoisin("2026-01", -1)).toBe("2025-12");
  });
});

describe("moisValide", () => {
  it("n'accepte qu'un vrai mois", () => {
    expect(moisValide("2026-09")).toBe("2026-09");
    expect(moisValide("2026-13")).toBeNull();
    expect(moisValide("septembre")).toBeNull();
  });
});

describe("bornesMois", () => {
  it("commence et finit à minuit à l'heure des Alpes", () => {
    const { debut, fin } = bornesMois("2026-09");
    expect(new Date(debut * 1000).toISOString()).toBe("2026-08-31T22:00:00.000Z");
    expect(new Date(fin * 1000).toISOString()).toBe("2026-09-30T22:00:00.000Z");
  });
});

describe("csvFactures", () => {
  const facture: Facture = {
    id: "in_1",
    numero: "199",
    date: new Date("2026-09-12T08:00:00Z"),
    client: "Dupont; et fils",
    email: "dupont@example.fr",
    reference: "AST-9EF8D6",
    ht: 593.64,
    tva: 59.36,
    ttc: 653,
    devise: "EUR",
    statut: "payée",
    pdf: null,
    url: null,
  };

  it("s'ouvre dans Excel en français : point-virgule, virgule décimale, date jour/mois", () => {
    const csv = csvFactures([facture]);
    expect(csv.startsWith("﻿Numéro;Date;Client")).toBe(true);
    expect(csv).toContain('199;12/09/2026;"Dupont; et fils";dupont@example.fr;AST-9EF8D6;593,64;59,36;653,00;EUR;payée;');
  });
});
