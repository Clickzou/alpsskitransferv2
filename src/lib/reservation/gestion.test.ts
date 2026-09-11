import { describe, expect, it } from "vitest";
import { modifiabilite } from "./gestion";

const maintenant = new Date("2026-12-10T12:00:00Z");
const dans = (heures: number) => new Date(maintenant.getTime() + heures * 3600 * 1000);

describe("modifiabilite", () => {
  it("ouvre les deux sens quand tout est à plus de 24 heures", () => {
    expect(modifiabilite(dans(48), dans(200), maintenant)).toEqual({
      aller: true,
      retour: true,
      aVenir: true,
    });
  });

  it("garde le retour ouvert quand l'aller a déjà eu lieu", () => {
    expect(modifiabilite(dans(-48), dans(100), maintenant)).toEqual({
      aller: false,
      retour: true,
      aVenir: true,
    });
  });

  it("garde le retour ouvert quand l'aller est à moins de 24 heures", () => {
    expect(modifiabilite(dans(3), dans(100), maintenant)).toEqual({
      aller: false,
      retour: true,
      aVenir: true,
    });
  });

  it("ferme les deux sens à moins de 24 heures, sans déclarer la course passée", () => {
    expect(modifiabilite(dans(2), dans(20), maintenant)).toEqual({
      aller: false,
      retour: false,
      aVenir: true,
    });
  });

  it("déclare passée une course dont le retour a eu lieu", () => {
    expect(modifiabilite(dans(-200), dans(-2), maintenant)).toEqual({
      aller: false,
      retour: false,
      aVenir: false,
    });
  });

  it("un aller simple n'a pas de retour à ouvrir", () => {
    expect(modifiabilite(dans(48), null, maintenant)).toEqual({
      aller: true,
      retour: false,
      aVenir: true,
    });
  });
});
