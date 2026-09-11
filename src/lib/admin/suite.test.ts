import { describe, expect, it } from "vitest";
import { ACCUEIL_ADMIN, suiteSure } from "./suite";

describe("suiteSure", () => {
  it("ramène sur la fiche d'un client", () => {
    const fiche = "/gestion-ventes-tarifs-seo/reservations/AST-E8919A/";
    expect(suiteSure(fiche)).toBe(fiche);
  });

  it("refuse une adresse d'un autre site", () => {
    expect(suiteSure("https://site-piege.example/")).toBe(ACCUEIL_ADMIN);
  });

  it("refuse un chemin qui sort du back-office", () => {
    expect(suiteSure("/fr/")).toBe(ACCUEIL_ADMIN);
  });

  it("refuse les doubles barres qui changeraient d'hôte", () => {
    expect(suiteSure("/gestion-ventes-tarifs-seo//site-piege.example")).toBe(ACCUEIL_ADMIN);
    expect(suiteSure("/gestion-ventes-tarifs-seo/\\site-piege.example")).toBe(ACCUEIL_ADMIN);
  });

  it("retombe sur l'accueil sans suite", () => {
    expect(suiteSure(undefined)).toBe(ACCUEIL_ADMIN);
    expect(suiteSure(["/gestion-ventes-tarifs-seo/"])).toBe(ACCUEIL_ADMIN);
  });
});
