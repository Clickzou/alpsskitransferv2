import { describe, expect, it } from "vitest";
import { montantRemboursable, suggestionRemboursement } from "./remboursement";

const maintenant = new Date("2026-12-10T10:00:00Z");
const dans = (heures: number) => new Date(maintenant.getTime() + heures * 3600 * 1000);

describe("remboursement", () => {
  it("propose tout moins les frais de Stripe à plus de 24 h", () => {
    const s = suggestionRemboursement({ paye: 588, dejaRembourse: 0, frais: 9.07 }, dans(48), maintenant);
    expect(s.montant).toBe(578.93);
    expect(s.motif).toContain("9,07 €");
  });

  it("ne propose rien dans les 24 h, ni une fois la course commencée", () => {
    expect(suggestionRemboursement({ paye: 588, dejaRembourse: 0, frais: 9 }, dans(12), maintenant).montant).toBe(0);
    expect(suggestionRemboursement({ paye: 588, dejaRembourse: 0, frais: 9 }, dans(-5), maintenant).montant).toBe(0);
  });

  it("ne retire pas les frais deux fois", () => {
    const s = suggestionRemboursement({ paye: 588, dejaRembourse: 100, frais: 9 }, dans(48), maintenant);
    expect(s.montant).toBe(488);
  });

  it("refuse un montant illisible, nul, ou plus grand que ce qui reste", () => {
    const etat = { paye: 588, dejaRembourse: 100, frais: 9 };
    expect(montantRemboursable("250,50", etat)).toBe(250.5);
    expect(montantRemboursable("488 €", etat)).toBe(488);
    expect(typeof montantRemboursable("489", etat)).toBe("string");
    expect(typeof montantRemboursable("0", etat)).toBe("string");
    expect(typeof montantRemboursable("abc", etat)).toBe("string");
  });
});
