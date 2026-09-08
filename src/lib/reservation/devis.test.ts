import { describe, expect, it } from "vitest";
import { BAREME_DEFAUT } from "@/lib/tarification/bareme";
import { calculer } from "@/lib/tarification/calcul";
import {
  CAPACITE,
  CAPACITE_BAGAGES,
  coefficientDestination,
  devisReservation,
  prixFixe,
  type DemandeReservation,
} from "./devis";

/**
 * Le devis de réservation est ce que le client paiera : il est testé au même
 * titre que le barème. Ces tests verrouillent trois choses qui coûtent de
 * l'argent quand elles lâchent : la distance vient de la table et non du
 * navigateur, le retour est calculé à sa propre date, et rien n'est encaissable
 * tant que le barème n'est pas validé.
 */

/** Mercredi 14 janvier 2026, 10 h — jour ordinaire, hors plage de nuit. */
const MERCREDI_10H = new Date(2026, 0, 14, 10, 0);
/** Samedi 17 janvier 2026, 10 h — jour de rotation, majoré de 17 %. */
const SAMEDI_10H = new Date(2026, 0, 17, 10, 0);

/** Genève → Val Thorens : 161 km dans la table calculée, coefficient 0,98. */
const base: DemandeReservation = {
  airport: "geneva-airport",
  resort: "val-thorens",
  categorie: "standard",
  passagers: 4,
  aller: MERCREDI_10H,
};

function devisDe(demande: DemandeReservation) {
  const resultat = devisReservation(demande);
  if (!resultat.ok) throw new Error(`devis refusé : ${resultat.echec.raison}`);
  return resultat.devis;
}

describe("devis de réservation", () => {
  it("prend la distance dans la table calculée, pas dans la requête", () => {
    const devis = devisDe(base);
    expect(devis.lignes[0].km).toBe(161);
    expect(devis.lignes[0].sourceDistance).toBe("table");
  });

  it("donne le même prix que le barème appelé directement", () => {
    const devis = devisDe(base);
    const attendu = calculer({
      km: 161,
      categorie: "standard",
      depart: MERCREDI_10H,
      passagers: 4,
      partage: false,
      allerRetour: false,
      coefficient: coefficientDestination("val-thorens"),
      prixFixe: prixFixe("geneva-airport", "val-thorens"),
    });
    expect(devis.total).toBe(attendu.total);
  });

  it("applique le coefficient de la destination", () => {
    expect(devisDe(base).coefficient).toBe(0.98);
  });

  it("majore un départ le samedi", () => {
    expect(devisDe({ ...base, aller: SAMEDI_10H }).total).toBeGreaterThan(
      devisDe(base).total,
    );
  });
});

describe("aller-retour", () => {
  it("calcule le retour à sa propre date, pas à celle de l'aller", () => {
    // Aller un mercredi, retour un samedi : le retour porte la majoration du
    // samedi. Le calculer comme un aller remisé la ferait disparaître.
    const devis = devisDe({ ...base, retour: SAMEDI_10H });
    const [aller, retour] = devis.lignes;
    expect(retour.devis.detail.majorations.map((m) => m.libelle)).toEqual(["Samedi"]);
    expect(retour.devis.total).toBeGreaterThan(aller.devis.total);
  });

  it("remise le seul retour", () => {
    const devis = devisDe({ ...base, retour: SAMEDI_10H });
    const [aller, retour] = devis.lignes;
    const remise = Math.round((retour.devis.total * BAREME_DEFAUT.remiseAllerRetour) / 100);
    expect(devis.remiseAllerRetour).toBe(remise);
    expect(devis.total).toBe(aller.devis.total + retour.devis.total - remise);
  });

  it("ne remise rien sur un aller simple", () => {
    expect(devisDe(base).remiseAllerRetour).toBe(0);
    expect(devisDe(base).lignes).toHaveLength(1);
  });

  it("refuse un retour antérieur à l'aller", () => {
    const resultat = devisReservation({ ...base, retour: new Date(2026, 0, 13, 10, 0) });
    expect(resultat).toEqual({ ok: false, echec: { raison: "dates-incoherentes" } });
  });
});

describe("garde-fous", () => {
  it("refuse plus de passagers que le véhicule n'en porte", () => {
    const resultat = devisReservation({ ...base, categorie: "premium", passagers: 6 });
    expect(resultat).toEqual({
      ok: false,
      echec: { raison: "trop-de-passagers", maximum: CAPACITE.premium },
    });
  });

  it("refuse zéro passager", () => {
    expect(devisReservation({ ...base, passagers: 0 }).ok).toBe(false);
  });

  it("refuse une liaison dont la distance est inconnue plutôt que d'inventer un prix", () => {
    const resultat = devisReservation({ ...base, resort: "station-qui-nexiste-pas" });
    expect(resultat).toEqual({ ok: false, echec: { raison: "distance-inconnue" } });
  });

  it("n'encaisse pas tant que le barème n'est pas validé", () => {
    expect(devisDe(base).encaissable).toBe(false);
  });

  it("ignore les tarifs extraits du site actuel, qui ne sont pas validés", () => {
    // 350 € annoncés sur l'ancienne page Genève → Val Thorens, en `valide: false` :
    // ils ne doivent pas fixer le prix tant que le client ne les a pas confirmés.
    expect(prixFixe("geneva-airport", "val-thorens")).toBeNull();
    expect(devisDe(base).prixFixe).toBe(false);
  });
});

describe("bagages et capacité du coffre", () => {
  it("écarte un véhicule dont le coffre ne prend pas le matériel", () => {
    // 4 valises + 4 housses = 8 pièces : au-delà des 5 du Premium.
    const resultat = devisReservation({
      ...base,
      categorie: "premium",
      passagers: 4,
      bagages: 4,
      skis: 4,
    });
    expect(resultat).toEqual({
      ok: false,
      echec: { raison: "trop-de-bagages", maximum: CAPACITE_BAGAGES.premium },
    });
  });

  it("accepte le même chargement dans un véhicule qui le prend", () => {
    expect(
      devisReservation({ ...base, categorie: "standard", bagages: 4, skis: 4 }).ok,
    ).toBe(true);
  });

  it("ne facture pas les bagages : ils choisissent le véhicule, pas le prix", () => {
    const sans = devisDe({ ...base, bagages: 0, skis: 0 });
    const avec = devisDe({ ...base, bagages: 4, skis: 4 });
    expect(avec.total).toBe(sans.total);
  });
});

describe("retour vers un autre point", () => {
  /** Genève → Méribel à l'aller, Courchevel → Lyon au retour. */
  const asymetrique = {
    ...base,
    resort: "meribel",
    retour: SAMEDI_10H,
    retourResort: "courchevel",
    retourAirport: "lyon-airport",
  };

  it("chiffre le retour sur sa propre liaison", () => {
    const devis = devisDe(asymetrique);
    const [aller, retour] = devis.lignes;
    // Genève → Méribel fait 142 km, Lyon → Courchevel 188 : les deux lignes
    // n'ont pas la même distance, donc pas le même prix de base.
    expect(aller.km).toBe(142);
    expect(retour.km).toBe(188);
    expect(retour.devis.total).not.toBe(aller.devis.total);
  });

  it("applique le coefficient de la station du retour, pas celui de l'aller", () => {
    // Val Thorens (0,98) à l'aller, Courchevel (1,13) au retour : deux
    // coefficients réellement différents, sinon le test ne prouverait rien.
    const devis = devisDe({
      ...base,
      retour: SAMEDI_10H,
      retourResort: "courchevel",
      retourAirport: "lyon-airport",
    });
    const [aller, retour] = devis.lignes;

    const attenduRetour = calculer({
      km: retour.km,
      categorie: "standard",
      depart: SAMEDI_10H,
      passagers: 4,
      partage: false,
      allerRetour: false,
      coefficient: coefficientDestination("courchevel"),
      prixFixe: prixFixe("lyon-airport", "courchevel"),
    });

    expect(retour.devis.total).toBe(attenduRetour.total);
    expect(retour.devis.detail.coefficient).toBe(coefficientDestination("courchevel"));
    expect(aller.devis.detail.coefficient).toBe(coefficientDestination("val-thorens"));
  });

  it("refuse un retour dont la liaison est inconnue", () => {
    const resultat = devisReservation({
      ...asymetrique,
      retourResort: "station-inexistante",
    });
    expect(resultat).toEqual({ ok: false, echec: { raison: "distance-inconnue" } });
  });
});
