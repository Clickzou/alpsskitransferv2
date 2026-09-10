import { afterEach, describe, expect, it } from "vitest";
import { BAREME_DEFAUT } from "./bareme";
import { calculer, estDeNuit, type DemandeTransfert } from "./calcul";

/**
 * Ce calcul fixe ce qu'un client paie : il est testé.
 *
 * Le site actuel affichait 220 € sur la page et en calculait 377 au paiement ;
 * quatre des dix commandes de son historique ont été remboursées. Ces tests
 * verrouillent le comportement du barème pour que l'écart ne puisse pas revenir.
 */

/** Mercredi 14 janvier 2026, 10 h — jour ordinaire, hors plage de nuit. */
const MERCREDI_10H = new Date(2026, 0, 14, 10, 0);
/** Samedi 17 janvier 2026, 10 h — jour de rotation des locations. */
const SAMEDI_10H = new Date(2026, 0, 17, 10, 0);
/** Dimanche 18 janvier 2026, 10 h. */
const DIMANCHE_10H = new Date(2026, 0, 18, 10, 0);
/** Mercredi 14 janvier 2026, 23 h — dans la plage de nuit. */
const MERCREDI_23H = new Date(2026, 0, 14, 23, 0);

const base: DemandeTransfert = {
  km: 100,
  categorie: "standard",
  depart: MERCREDI_10H,
  passagers: 2,
  partage: false,
  allerRetour: false,
};

describe("calcul du prix", () => {
  it("applique prise en charge + kilométrage", () => {
    // 92 € + 100 km × 1,18 = 210 €
    const devis = calculer(base);
    expect(devis.total).toBe(210);
    expect(devis.detail.priseEnCharge).toBe(92);
    expect(devis.detail.kilometrage).toBe(118);
    expect(devis.detail.majorations).toEqual([]);
  });

  it("facture la prise en charge seule sur une distance nulle", () => {
    expect(calculer({ ...base, km: 0 }).total).toBe(92);
  });

  it("ignore une distance négative plutôt que de créer une remise", () => {
    expect(calculer({ ...base, km: -50 }).total).toBe(92);
  });

  it("distingue les catégories de véhicule", () => {
    expect(calculer({ ...base, categorie: "business" }).total).toBe(257); // 115 + 142
    expect(calculer({ ...base, categorie: "premium" }).total).toBe(315); // 140 + 175
  });

  it("place le premium au-dessus du standard", () => {
    // L'ancien barème WordPress faisait l'inverse : premium 2,70 €/km contre
    // standard 2,90. C'était une inversion de saisie, pas une politique.
    expect(BAREME_DEFAUT.tauxKm.premium).toBeGreaterThan(BAREME_DEFAUT.tauxKm.standard);
    expect(BAREME_DEFAUT.priseEnCharge.premium).toBeGreaterThan(
      BAREME_DEFAUT.priseEnCharge.standard,
    );
  });
});

describe("majorations", () => {
  it("majore le samedi de 17 %", () => {
    const devis = calculer({ ...base, depart: SAMEDI_10H });
    expect(devis.total).toBe(246); // 210 + 36
    expect(devis.detail.majorations).toEqual([{ libelle: "Samedi", montant: 36 }]);
  });

  it("majore le dimanche de 8 %", () => {
    const devis = calculer({ ...base, depart: DIMANCHE_10H });
    expect(devis.total).toBe(227); // 210 + 17
  });

  it("majore la nuit de 20 %", () => {
    const devis = calculer({ ...base, depart: MERCREDI_23H });
    expect(devis.total).toBe(252); // 210 + 42
  });

  it("cumule le jour et la nuit", () => {
    const samediNuit = new Date(2026, 0, 17, 23, 0);
    const devis = calculer({ ...base, depart: samediNuit });
    // 210 + 36 (samedi) + 42 (nuit) — les deux majorations portent sur la base.
    expect(devis.total).toBe(288);
    expect(devis.detail.majorations).toHaveLength(2);
  });

  it("ne majore pas deux fois pour le jour", () => {
    // Samedi et dimanche s'excluent : jamais plus d'une majoration de jour.
    const devis = calculer({ ...base, depart: SAMEDI_10H });
    expect(devis.detail.majorations.filter((m) => m.libelle !== "Nuit")).toHaveLength(1);
  });
});

describe("plage de nuit", () => {
  it("couvre la plage qui enjambe minuit", () => {
    expect(estDeNuit(new Date(2026, 0, 14, 22, 0))).toBe(true);
    expect(estDeNuit(new Date(2026, 0, 14, 3, 0))).toBe(true);
    expect(estDeNuit(new Date(2026, 0, 14, 5, 59))).toBe(true);
    expect(estDeNuit(new Date(2026, 0, 14, 6, 0))).toBe(false);
    expect(estDeNuit(new Date(2026, 0, 14, 21, 59))).toBe(false);
  });
});

describe("aller-retour", () => {
  it("applique la remise sur le seul retour", () => {
    const devis = calculer({ ...base, allerRetour: true });
    // 210 aller + 200 retour (−5 %)
    expect(devis.total).toBe(410);
    expect(devis.detail.aller).toBe(210);
    expect(devis.detail.remises).toEqual([
      { libelle: "Aller-retour (−5 % sur le retour)", montant: 10 },
    ]);
  });
});

describe("transfert partagé", () => {
  it("facture par personne", () => {
    const devis = calculer({ ...base, partage: true, passagers: 2 });
    // 210 × 0,214 = 45 par personne, × 2
    expect(devis.total).toBe(90);
  });

  it("facture au moins une personne", () => {
    const devis = calculer({ ...base, partage: true, passagers: 0 });
    expect(devis.total).toBe(45);
  });
});

describe("coefficient de destination", () => {
  it("majore une destination difficile d'accès", () => {
    // Zermatt : ×1,25 mesuré sur les prix publiés. Station sans voitures, le
    // transfert s'arrête à Täsch.
    const devis = calculer({ ...base, coefficient: 1.25 });
    expect(devis.total).toBe(263); // (92 + 118) × 1,25
    expect(devis.detail.coefficient).toBe(1.25);
  });

  it("minore une destination facile d'accès", () => {
    expect(calculer({ ...base, coefficient: 0.78 }).total).toBe(164); // Sölden
  });

  it("vaut 1 par défaut", () => {
    expect(calculer(base).detail.coefficient).toBe(1);
  });

  it("s'applique avant les majorations", () => {
    // (92 + 118) × 1,25 = 263, puis +17 % de samedi = 263 + 45.
    const devis = calculer({ ...base, coefficient: 1.25, depart: SAMEDI_10H });
    expect(devis.total).toBe(308);
  });

  it("ne s'applique pas à un prix fixe", () => {
    // Un prix négocié est déjà le prix voulu pour cette destination : le
    // coefficient l'appliquerait deux fois.
    const devis = calculer({ ...base, prixFixe: 180, coefficient: 1.25 });
    expect(devis.total).toBe(180);
    expect(devis.detail.coefficient).toBe(1);
  });
});

describe("prix fixe", () => {
  it("prime sur le barème", () => {
    const devis = calculer({ ...base, prixFixe: 180 });
    expect(devis.total).toBe(180);
    expect(devis.prixFixe).toBe(true);
    expect(devis.detail.kilometrage).toBe(0);
  });

  it("reste soumis aux majorations", () => {
    // Un samedi à 23 h reste un samedi à 23 h, prix négocié ou non.
    const devis = calculer({ ...base, prixFixe: 180, depart: new Date(2026, 0, 17, 23, 0) });
    expect(devis.total).toBe(247); // 180 + 31 + 36
  });

  it("ignore un prix fixe nul ou négatif", () => {
    expect(calculer({ ...base, prixFixe: 0 }).prixFixe).toBe(false);
    expect(calculer({ ...base, prixFixe: -10 }).prixFixe).toBe(false);
  });
});

describe("garde-fou d'encaissement", () => {
  it("n'autorise pas l'encaissement tant que le barème n'est pas validé", () => {
    // Tant que le client n'a pas confirmé le barème, le parcours doit se terminer
    // en demande de devis plutôt qu'en paiement.
    expect(calculer(base).encaissable).toBe(false);
  });

  it("autorise l'encaissement sur un prix fixe convenu", () => {
    expect(calculer({ ...base, prixFixe: 180 }).encaissable).toBe(true);
  });
});

/**
 * L'interrupteur d'encaissement.
 *
 * `BAREME_VALIDE` était une constante du code ; c'est une variable
 * d'environnement depuis le 10 septembre 2026, pour qu'un test de paiement ne
 * demande plus de modifier le code — et surtout de penser à le remettre après.
 *
 * Le défaut est fermé : c'est ce que ces trois cas verrouillent.
 */
describe("interrupteur d'encaissement", () => {
  const initial = process.env.BAREME_VALIDE;
  afterEach(() => {
    if (initial === undefined) delete process.env.BAREME_VALIDE;
    else process.env.BAREME_VALIDE = initial;
  });

  it("n'encaisse pas quand la variable est absente", () => {
    delete process.env.BAREME_VALIDE;
    expect(calculer(base).encaissable).toBe(false);
  });

  it("n'encaisse pas sur une valeur approchante — seul « oui » ouvre", () => {
    for (const valeur of ["true", "1", "OUI", "yes", ""]) {
      process.env.BAREME_VALIDE = valeur;
      expect(calculer(base).encaissable).toBe(false);
    }
  });

  it("encaisse quand la variable vaut « oui »", () => {
    process.env.BAREME_VALIDE = "oui";
    expect(calculer(base).encaissable).toBe(true);
  });
});
