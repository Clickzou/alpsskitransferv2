import { describe, expect, it } from "vitest";
import { filtreRecherche, saisieRecherche } from "./recherche";

describe("saisieRecherche", () => {
  it("retire ce que PostgREST lirait comme de la syntaxe", () => {
    expect(saisieRecherche("Dupont, (Jean)*")).toBe("Dupont Jean");
    expect(saisieRecherche('a"b\\c%d')).toBe("a b c d");
  });

  it("ne garde rien d'une saisie vide ou qui n'est pas du texte", () => {
    expect(saisieRecherche("   ")).toBe("");
    expect(saisieRecherche(undefined)).toBe("");
  });
});

describe("filtreRecherche", () => {
  it("ne filtre rien sans critère", () => {
    expect(filtreRecherche({})).toBeNull();
    expect(filtreRecherche({ q: " , ", du: "pas une date" })).toBeNull();
  });

  it("cherche le nom dans le nom, l'e-mail, le téléphone et la référence", () => {
    expect(filtreRecherche({ q: "Castanet" })).toBe(
      '(or(client_nom.ilike."*Castanet*",client_email.ilike."*Castanet*",client_telephone.ilike."*Castanet*",reference.ilike."*Castanet*"))',
    );
  });

  it("borne une journée à l'heure des Alpes, à l'aller comme au retour", () => {
    // Le 12 septembre 2026, heure d'été : UTC+2.
    const debut = '"2026-09-11T22:00:00.000Z"';
    const fin = '"2026-09-12T21:59:59.999Z"';
    expect(filtreRecherche({ du: "2026-09-12", au: "2026-09-12" })).toBe(
      `(or(and(aller.gte.${debut},aller.lte.${fin}),and(retour.gte.${debut},retour.lte.${fin})))`,
    );
  });

  it("combine le nom et la période", () => {
    const filtre = filtreRecherche({ q: "AST-9EF8D6", du: "2026-09-01" });
    expect(filtre).toContain('reference.ilike."*AST-9EF8D6*"');
    expect(filtre).toContain('aller.gte."2026-08-31T22:00:00.000Z"');
  });
});
