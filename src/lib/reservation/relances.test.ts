import { describe, expect, it } from "vitest";
import { adresseManque, aRappeler, aSignaler, prochainePrise, type LigneRelance } from "./relances";

const maintenant = new Date("2026-12-10T07:00:00Z");
const dans = (heures: number) =>
  new Date(maintenant.getTime() + heures * 3600 * 1000).toISOString();

function ligne(champs: Partial<LigneRelance>): LigneRelance {
  return {
    reference: "AST-TEST01",
    statut: "payee",
    airport: "geneva-airport",
    resort: "les-gets",
    aller: dans(80),
    retour: null,
    retour_resort: null,
    adresse: null,
    adresse_retour: null,
    client_nom: "Test",
    client_email: "test@example.com",
    client_telephone: "+33600000000",
    langue: "fr",
    ...champs,
  };
}

describe("adresseManque", () => {
  it("voit l'adresse de l'aller manquante", () => {
    expect(adresseManque(ligne({ adresse: "" }))).toBe(true);
  });

  it("accepte la même adresse au retour quand c'est la même station", () => {
    expect(adresseManque(ligne({ adresse: "Chalet A", retour: dans(200) }))).toBe(false);
  });

  it("exige une adresse au retour quand le client repart d'une autre station", () => {
    expect(
      adresseManque(ligne({ adresse: "Chalet A", retour: dans(200), retour_resort: "alpe-dhuez" })),
    ).toBe(true);
  });
});

describe("prochainePrise", () => {
  it("prend le retour quand l'aller est passé", () => {
    const l = ligne({ aller: dans(-24), retour: dans(80) });
    expect(prochainePrise(l, maintenant)?.toISOString()).toBe(dans(80));
  });
});

describe("aRappeler", () => {
  it("rappelle trois jours avant, quand une adresse manque", () => {
    expect(aRappeler(ligne({ aller: dans(80) }), maintenant)).toBe(true);
  });

  it("ne rappelle ni trop tôt ni trop tard : chaque course passe une fois", () => {
    expect(aRappeler(ligne({ aller: dans(100) }), maintenant)).toBe(false);
    expect(aRappeler(ligne({ aller: dans(70) }), maintenant)).toBe(false);
  });

  it("ne dérange ni un client complet, ni un paiement non abouti", () => {
    expect(aRappeler(ligne({ adresse: "Chalet A" }), maintenant)).toBe(false);
    expect(aRappeler(ligne({ statut: "en-attente-paiement" }), maintenant)).toBe(false);
  });
});

describe("aSignaler", () => {
  it("signale à l'exploitant une course de moins de 48 heures sans adresse", () => {
    expect(aSignaler(ligne({ aller: dans(20) }), maintenant)).toBe(true);
    expect(aSignaler(ligne({ aller: dans(60) }), maintenant)).toBe(false);
  });
});
