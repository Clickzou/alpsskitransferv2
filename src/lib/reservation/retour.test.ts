import { describe, expect, it } from "vitest";
import { devisReservation } from "@/lib/reservation/devis";
import { instantAlpes } from "@/lib/temps";

/*
  Le groupe du retour peut différer de celui de l'aller — une personne repart
  plus tôt, un enfant reste. Le prix est **par véhicule** : cela ne le change
  pas. Ce que cela change, c'est le véhicule à envoyer.
*/

const base = {
  airport: "geneva-airport",
  resort: "val-thorens",
  categorie: "standard" as const,
  aller: instantAlpes(2026, 12, 20, 13, 0),
  retour: instantAlpes(2026, 12, 27, 9, 0),
};

describe("un retour au groupe différent", () => {
  it("ne change pas le prix : il est par véhicule", () => {
    const memeGroupe = devisReservation({ ...base, passagers: 4 });
    const moinsAuRetour = devisReservation({ ...base, passagers: 4, passagersRetour: 2 });
    expect(memeGroupe.ok && moinsAuRetour.ok).toBe(true);
    if (memeGroupe.ok && moinsAuRetour.ok) {
      expect(moinsAuRetour.devis.total).toBe(memeGroupe.devis.total);
    }
  });

  it("retient la capacité du trajet le plus chargé", () => {
    // Une Premium tient 4 personnes. Partir à 3 et revenir à 6 ne rentre pas,
    // même si chaque trajet pris seul semblerait acceptable à l'aller.
    const trop = devisReservation({
      ...base,
      categorie: "premium",
      passagers: 3,
      passagersRetour: 6,
    });
    expect(trop.ok).toBe(false);
    if (!trop.ok) expect(trop.echec.raison).toBe("trop-de-passagers");
  });

  it("accepte quand les deux trajets tiennent dans le véhicule", () => {
    const bon = devisReservation({
      ...base,
      categorie: "premium",
      passagers: 4,
      passagersRetour: 2,
    });
    expect(bon.ok).toBe(true);
  });

  it("reprend l'aller quand rien n'est précisé", () => {
    const sansPrecision = devisReservation({ ...base, passagers: 4, passagersRetour: null });
    const explicite = devisReservation({ ...base, passagers: 4, passagersRetour: 4 });
    expect(sansPrecision.ok && explicite.ok).toBe(true);
    if (sansPrecision.ok && explicite.ok) {
      expect(sansPrecision.devis.total).toBe(explicite.devis.total);
    }
  });
});
