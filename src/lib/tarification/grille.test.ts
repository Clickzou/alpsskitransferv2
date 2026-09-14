import { beforeEach, describe, expect, it } from "vitest";
import { devisReservation, type DemandeReservation } from "@/lib/reservation/devis";
import { instantAlpes } from "@/lib/temps";
import { GRILLE_DEFAUT, saisonDu, validerGrille, type Grille } from "./grille";

/**
 * La grille éditable fixe ce que le client paie : ces tests verrouillent
 * qu'une grille republiée telle quelle ne change aucun prix, que chaque réglage
 * de l'onglet Tarifs agit bien, et qu'une saisie absurde ne se publie pas.
 */

beforeEach(() => {
  delete process.env.BAREME_VALIDE;
});

/** Mercredi 13 janvier 2027, 10 h, heure des Alpes. */
const MERCREDI = instantAlpes(2027, 1, 13, 10, 0);

const base: DemandeReservation = {
  airport: "geneva-airport",
  resort: "val-thorens",
  categorie: "standard",
  passagers: 4,
  aller: MERCREDI,
};

function total(demande: DemandeReservation, grille: Grille = GRILLE_DEFAUT): number {
  const r = devisReservation(demande, grille);
  if (!r.ok) throw new Error(r.echec.raison);
  return r.devis.total;
}

const copie = (): Grille => JSON.parse(JSON.stringify(GRILLE_DEFAUT));

describe("grille tarifaire", () => {
  it("se republie telle quelle sans rien changer", () => {
    const relue = validerGrille(JSON.parse(JSON.stringify(GRILLE_DEFAUT)));
    expect(relue.ok).toBe(true);
    if (relue.ok) expect(total(base, relue.grille)).toBe(total(base));
  });

  it("applique la prise en charge et le prix au kilomètre publiés", () => {
    const g = copie();
    g.bareme.priseEnCharge.standard += 100;
    // 100 € de plus, multipliés par le coefficient de Val Thorens (0,98).
    expect(total(base, g)).toBe(total(base) + 98);
  });

  it("majore une période de saison, et seulement pendant ses dates", () => {
    const g = copie();
    g.saisons = [{ nom: "Vacances de février", debut: "2027-02-06", fin: "2027-03-07", majoration: 10 }];
    const pendant = instantAlpes(2027, 2, 10, 10, 0);
    expect(saisonDu(g, pendant)?.nom).toBe("Vacances de février");
    expect(saisonDu(g, MERCREDI)).toBeNull();
    expect(total({ ...base, aller: MERCREDI }, g)).toBe(total(base));
    expect(total({ ...base, aller: pendant }, g)).toBeGreaterThan(total({ ...base, aller: pendant }));
  });

  it("donne un prix fixe par véhicule, et laisse les autres au calcul", () => {
    const g = copie();
    g.prixFixes = [{ airport: "geneva-airport", resort: "val-thorens", prix: { standard: 300 } }];
    expect(total(base, g)).toBe(300);
    expect(total({ ...base, categorie: "premium" }, g)).toBe(total({ ...base, categorie: "premium" }));
  });

  it("refuse un taux au kilomètre tapé sans virgule", () => {
    const g = copie() as unknown as { bareme: { tauxKm: { standard: number } } };
    g.bareme.tauxKm.standard = 118;
    const r = validerGrille(g);
    expect(r.ok).toBe(false);
  });

  it("refuse deux périodes qui se chevauchent, et une fin avant le début", () => {
    const g = copie();
    g.saisons = [
      { nom: "Noël", debut: "2026-12-19", fin: "2027-01-03", majoration: 15 },
      { nom: "Nouvel an", debut: "2026-12-30", fin: "2027-01-02", majoration: 20 },
    ];
    expect(validerGrille(g).ok).toBe(false);
    g.saisons = [{ nom: "Noël", debut: "2027-01-03", fin: "2026-12-19", majoration: 15 }];
    expect(validerGrille(g).ok).toBe(false);
  });

  it("refuse un prix fixe sans trajet", () => {
    const g = copie();
    g.prixFixes = [{ airport: "", resort: "val-thorens", prix: { standard: 300 } }];
    expect(validerGrille(g).ok).toBe(false);
  });
});
