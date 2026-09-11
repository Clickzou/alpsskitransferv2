import { describe, expect, it } from "vitest";
import { textesTelephone } from "./textes-telephone";

const base = {
  nom: "Jean Dupont",
  reference: "AST-TEST01",
  recap: "Référence : AST-TEST01",
  lienPaiement: null,
  iban: null,
  echeance: null,
  facture: null,
  lienGestion: "https://exemple.fr/fr/gerer-ma-reservation/?ref=AST-TEST01&j=x",
};

describe("textesTelephone", () => {
  it("donne l'IBAN, la référence et l'échéance pour un virement", () => {
    const corps = textesTelephone("fr").corps({
      ...base,
      mode: "virement",
      iban: "IBAN FR76 0000 — BIC XXXX — NM-TRANSPORTS 73",
      echeance: "18 novembre 2026",
      facture: "https://facture.exemple/1",
    });
    expect(corps).toContain("réglez-la par virement avant le 18 novembre 2026 :");
    expect(corps).toContain("IBAN FR76 0000 — BIC XXXX — NM-TRANSPORTS 73");
    expect(corps).toContain("Référence à indiquer avec votre virement : AST-TEST01");
    expect(corps).toContain("Votre facture : https://facture.exemple/1");
  });

  it("donne le lien de paiement pour la carte", () => {
    const corps = textesTelephone("en").corps({
      ...base,
      mode: "carte",
      lienPaiement: "https://paiement.exemple/1",
    });
    expect(corps).toContain("please pay online");
    expect(corps).toContain("https://paiement.exemple/1");
    expect(corps).not.toContain("bank transfer");
  });

  it("prévient quand l'IBAN n'est pas encore configuré", () => {
    expect(textesTelephone("de").corps({ ...base, mode: "virement" })).toContain(
      "Wir senden Ihnen in Kürze unsere Bankverbindung.",
    );
  });
});
