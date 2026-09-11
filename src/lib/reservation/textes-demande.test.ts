import { describe, expect, it } from "vitest";
import { dateClient, montantClient, recapDemande, textesDemande } from "./textes-demande";

const base = {
  reference: "AST-TEST01",
  trajet: "Geneva Airport → Les Gets",
  aller: "samedi 12 décembre à 15:30",
  retour: null,
  trajetRetour: null,
  vehicule: "premium",
  vehiculeRetour: null,
  passagers: 2,
  passagersRetour: null,
  bagages: null,
  skis: 1,
  adresse: null,
  vol: null,
  message: null,
  total: null,
};

describe("recapDemande", () => {
  it("écrit le français avec ses libellés, ses pluriels et l'espace avant les deux-points", () => {
    const recap = recapDemande("fr", base);
    expect(recap).toContain("Référence : AST-TEST01");
    expect(recap).toContain("Véhicule : Premium");
    expect(recap).toContain("Groupe : 2 passagers, 1 housse à skis");
    expect(recap).toContain("Adresse en station : à confirmer");
  });

  it("écrit l'allemand et l'italien sans espace avant les deux-points", () => {
    expect(recapDemande("de", base)).toContain("Gruppe: 2 Personen, 1 Skitasche");
    expect(recapDemande("it", base)).toContain("Gruppo: 2 passeggeri, 1 sacca da sci");
  });

  it("dit le retour et son trajet quand il y en a un", () => {
    const recap = recapDemande("en", {
      ...base,
      retour: "Saturday 19 December at 17:00",
      trajetRetour: "Alpe d’Huez → Geneva Airport",
      passagersRetour: 5,
    });
    expect(recap).toContain("Return: Saturday 19 December at 17:00 — Alpe d’Huez → Geneva Airport");
    expect(recap).toContain("Return group: 5 passengers");
  });
});

describe("montantClient", () => {
  it("formate le montant comme la langue l'écrit", () => {
    expect(montantClient("fr", 610, true).replace(/ | /g, " ")).toBe(
      "610 € pour les deux trajets",
    );
    expect(montantClient("en", 610, false)).toBe("€610");
  });
});

describe("dateClient et textesDemande", () => {
  it("retombe sur l'anglais pour une langue inconnue", () => {
    expect(textesDemande("es").libelles.reference).toBe("Reference");
    expect(dateClient("fr", new Date("2026-12-12T14:30:00Z"))).toContain("15:30");
  });
});
