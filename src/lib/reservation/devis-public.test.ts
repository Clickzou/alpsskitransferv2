import { describe, expect, it } from "vitest";
import { resoudreLieu } from "./devis-public";

describe("devis pour les assistants", () => {
  it("reconnaît les lieux écrits en toutes lettres", () => {
    expect(resoudreLieu("Geneva")).toBe("geneva-airport");
    expect(resoudreLieu("Genève")).toBe("geneva-airport");
    expect(resoudreLieu("Alpe d'Huez")).toBe("alpe-dhuez");
    expect(resoudreLieu("val-thorens")).toBe("val-thorens");
  });

  it("garde une adresse telle quelle, pour la mesurer", () => {
    expect(resoudreLieu("Hôtel Pashmina, Val Thorens")).toBe("Hôtel Pashmina, Val Thorens");
  });
});
