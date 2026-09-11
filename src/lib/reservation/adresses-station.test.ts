import { describe, expect, it } from "vitest";
import { adresseModifiable, adressePropre } from "./adresses-station";

const maintenant = new Date("2026-12-10T12:00:00Z");
const dans = (heures: number) => new Date(maintenant.getTime() + heures * 3600 * 1000);

describe("adresseModifiable", () => {
  it("laisse corriger une adresse connue à plus de 24 heures", () => {
    expect(adresseModifiable(dans(48), "Chalet Les Sorbiers", maintenant)).toBe(true);
  });

  it("verrouille une adresse connue à moins de 24 heures", () => {
    expect(adresseModifiable(dans(5), "Chalet Les Sorbiers", maintenant)).toBe(false);
  });

  it("laisse compléter une adresse manquante jusqu'à la prise en charge", () => {
    expect(adresseModifiable(dans(5), null, maintenant)).toBe(true);
    expect(adresseModifiable(dans(5), "", maintenant)).toBe(true);
  });

  it("ferme un trajet déjà fait, ou qui n'existe pas", () => {
    expect(adresseModifiable(dans(-1), null, maintenant)).toBe(false);
    expect(adresseModifiable(null, null, maintenant)).toBe(false);
  });
});

describe("adressePropre", () => {
  it("resserre les espaces", () => {
    expect(adressePropre("  Chalet   Les  Sorbiers ")).toBe("Chalet Les Sorbiers");
  });

  it("refuse ce qui ne dit rien", () => {
    expect(adressePropre("  ")).toBeNull();
    expect(adressePropre("ab")).toBeNull();
    expect(adressePropre(42)).toBeNull();
  });
});
