import { describe, expect, it } from "vitest";
import {
  adresseManquante,
  estAAssurer,
  euros,
  heure,
  modifieeParLeClient,
  pastilleStatut,
} from "./affichage";
import type { Course } from "./courses";

const maintenant = new Date("2026-12-10T10:00:00Z");
const dans = (heures: number) => new Date(maintenant.getTime() + heures * 3600 * 1000);

function course(champs: Partial<Course>): Course {
  return {
    reference: "AST-TEST01",
    statut: "payee",
    trajet: "Geneva Airport → Les Gets",
    depart: "Geneva Airport",
    arrivee: "Les Gets",
    adresse: "",
    aller: dans(48),
    retour: null,
    passagers: 2,
    passagersRetour: null,
    trajetRetour: null,
    adresseRetour: null,
    volRetour: null,
    source: "site",
    modePaiement: null,
    factureStripe: null,
    langue: "fr",
    stationRetour: "Les Gets",
    aeroportRetour: "Geneva Airport",
    vehicule: "standard",
    vehiculeRetour: null,
    bagagesSki: 0,
    vol: null,
    client: { nom: "Test", email: "test@example.com", telephone: "+33600000000" },
    enfants: null,
    message: null,
    montant: 300,
    devise: "EUR",
    payeLe: null,
    creeLe: maintenant,
    historique: [],
    ...champs,
  };
}

const sansEspacesFines = (texte: string) => texte.replace(/[  ]/g, " ");

describe("euros", () => {
  it("écrit les montants à la française", () => {
    expect(sansEspacesFines(euros(653))).toBe("653 €");
    expect(sansEspacesFines(euros(245.5))).toBe("245,50 €");
  });
});

describe("heure", () => {
  it("ajoute l'année quand ce n'est pas l'année en cours", () => {
    expect(heure(new Date("2027-01-15T10:00:00Z"), maintenant)).toContain("2027");
    expect(heure(new Date("2026-12-20T10:00:00Z"), maintenant)).not.toContain("2026");
  });
});

describe("états", () => {
  it("tient une réservation téléphonique en attente de virement pour une course à assurer", () => {
    expect(estAAssurer(course({ statut: "en-attente-paiement", source: "telephone" }))).toBe(true);
    expect(estAAssurer(course({ statut: "en-attente-paiement", source: "site" }))).toBe(false);
    expect(estAAssurer(course({ statut: "annulee" }))).toBe(false);
  });

  it("distingue les pastilles", () => {
    expect(pastilleStatut(course({ statut: "payee" })).texte).toBe("Payée");
    expect(
      pastilleStatut(course({ statut: "en-attente-paiement", source: "telephone", modePaiement: "virement" })).texte,
    ).toBe("Virement attendu");
    expect(pastilleStatut(course({ statut: "en-attente-paiement" })).texte).toBe("Paiement non abouti");
  });

  it("ne dit « modifiée par le client » que pour un changement du client", () => {
    const creation = {
      champ: "creation",
      ancien: null,
      nouveau: "Réservation saisie au téléphone",
      statut: "appliquee",
      lot: null,
      langue: "fr",
      source: "exploitant",
      le: maintenant,
    };
    expect(modifieeParLeClient(course({ historique: [creation] }))).toBe(false);
    expect(
      modifieeParLeClient(course({ historique: [{ ...creation, champ: "vol", source: "client" }] })),
    ).toBe(true);
  });
});

describe("adresseManquante", () => {
  it("signale une adresse manquante sur un trajet à venir", () => {
    expect(adresseManquante(course({ aller: dans(48) }), maintenant)).toBe(true);
  });

  it("se tait sur un aller déjà fait, un paiement abandonné ou une course annulée", () => {
    expect(
      adresseManquante(course({ aller: dans(-24), retour: dans(72), adresseRetour: "Chalet A" }), maintenant),
    ).toBe(false);
    expect(adresseManquante(course({ statut: "en-attente-paiement" }), maintenant)).toBe(false);
    expect(adresseManquante(course({ statut: "annulee" }), maintenant)).toBe(false);
  });

  it("signale un virement téléphonique attendu sans adresse", () => {
    expect(
      adresseManquante(course({ statut: "en-attente-paiement", source: "telephone" }), maintenant),
    ).toBe(true);
  });
});
