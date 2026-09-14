import { describe, expect, it } from "vitest";
import { apercuGrille } from "./apercu";
import { GRILLE_DEFAUT, type Grille } from "./grille";

describe("aperçu d'une grille", () => {
  const maintenant = new Date("2026-09-14T10:00:00Z");

  it("chiffre des trajets types, sans écart quand rien ne change", () => {
    const lignes = apercuGrille(GRILLE_DEFAUT, GRILLE_DEFAUT, maintenant);
    expect(lignes.length).toBeGreaterThanOrEqual(15);
    for (const l of lignes) {
      expect(l.prix.standard.avant).toBe(l.prix.standard.apres);
    }
  });

  it("montre la hausse du samedi quand sa majoration monte", () => {
    const apres: Grille = JSON.parse(JSON.stringify(GRILLE_DEFAUT));
    apres.bareme.majorations.samedi = 30;
    const lignes = apercuGrille(GRILLE_DEFAUT, apres, maintenant);
    const samedi = lignes.find((l) => l.cas.startsWith("Samedi"))!;
    const mercredi = lignes.find((l) => l.cas.startsWith("Mercredi, 10"))!;
    expect(samedi.prix.standard.apres!).toBeGreaterThan(samedi.prix.standard.avant!);
    expect(mercredi.prix.standard.apres).toBe(mercredi.prix.standard.avant);
  });

  it("ajoute une ligne par période de saison", () => {
    const apres: Grille = JSON.parse(JSON.stringify(GRILLE_DEFAUT));
    apres.saisons = [{ nom: "Noël", debut: "2026-12-19", fin: "2027-01-03", majoration: 15 }];
    const noel = apercuGrille(GRILLE_DEFAUT, apres, maintenant).filter((l) => l.cas.startsWith("Noël"));
    expect(noel.length).toBeGreaterThan(0);
    expect(noel[0].prix.standard.apres!).toBeGreaterThan(noel[0].prix.standard.avant!);
  });
});
