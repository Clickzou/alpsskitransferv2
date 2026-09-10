import { describe, expect, it } from "vitest";
import { corpsAvis, sujetAvis, type CourseAvis } from "./textes";

/**
 * L'avis de course est la seule pièce que le chauffeur lit avant de partir.
 *
 * Ce qu'il doit contenir n'a rien d'esthétique : un aller-retour asymétrique
 * annonçait sa date de retour sans dire d'où repartait le client — le chauffeur
 * serait allé à la station de l'aller, à cent cinquante kilomètres de là. Le nom
 * et le téléphone, eux, étaient présents mais dispersés entre deux blocs. Ces
 * tests fixent ce qui doit s'y trouver, pas la mise en forme.
 */

const course: CourseAvis = {
  reference: "AST-09CB6A",
  trajet: "Geneva Airport → Les Gets",
  aller: "ven. 18 déc., 20:32",
  retour: "mar. 22 déc., 23:36",
  trajetRetour: "Alpe d'Huez → Geneva Airport",
  adresse: "Chalet des Perrières, Les Gets",
  client: { nom: "Claire Fontaine", email: "claire@exemple.fr", telephone: "+33 6 12 34 56 78" },
  vehicule: "standard",
  passagers: 2,
  passagersRetour: 7,
  vol: "U24321",
  bagagesSki: 2,
  enfants: null,
  message: null,
  montant: 515,
  paye: true,
};

describe("l'avis de course", () => {
  const texte = corpsAvis(course);

  it("nomme le client et donne de quoi l'appeler", () => {
    expect(texte).toContain("Claire Fontaine");
    expect(texte).toContain("+33 6 12 34 56 78");
    expect(texte).toContain("claire@exemple.fr");
  });

  it("dit d'où repart le retour quand il diffère de l'aller", () => {
    expect(texte).toContain("Alpe d'Huez → Geneva Airport");
  });

  it("sépare les deux sens", () => {
    expect(texte).toContain("ALLER");
    expect(texte).toContain("RETOUR");
    expect(texte.indexOf("ALLER")).toBeLessThan(texte.indexOf("RETOUR"));
  });

  it("porte l'effectif de chaque sens", () => {
    expect(texte).toContain("2 passager(s)");
    expect(texte).toContain("7 passager(s)");
  });

  it("annonce le montant et son état", () => {
    expect(texte).toContain("COURSE PAYÉE");
    expect(texte).toContain("515 €");
  });

  it("rappelle le retour inversé quand les lieux ne changent pas", () => {
    const symetrique = corpsAvis({ ...course, trajetRetour: null, passagersRetour: null });
    expect(symetrique).toContain("Les Gets → Geneva Airport");
  });

  it("ne parle pas de retour sur un aller simple", () => {
    const simple = corpsAvis({ ...course, retour: null, trajetRetour: null });
    expect(simple).not.toContain("RETOUR");
    expect(simple).toContain("PRISE EN CHARGE");
  });

  it("signale l'aller-retour dès le sujet", () => {
    expect(sujetAvis(course)).toContain("A/R");
    expect(sujetAvis({ ...course, retour: null })).not.toContain("A/R");
  });

  it("distingue une demande non encaissée d'une course payée", () => {
    expect(corpsAvis({ ...course, paye: false })).toContain("DEMANDE À CONFIRMER");
  });
});
