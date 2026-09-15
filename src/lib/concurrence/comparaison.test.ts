import { describe, expect, it } from "vitest";
import { GRILLE_DEFAUT } from "@/lib/tarification/grille";
import { composantesAlpes } from "@/lib/temps";
import { dateDuJour, meilleureOffre, notrePrix, prixSous } from "./comparaison";
import { lireOffresAlpy } from "./sources";

describe("veille des prix", () => {
  const maintenant = new Date("2026-09-14T10:00:00Z");

  it("compare un mercredi et un samedi à au moins trois semaines, à 10 h", () => {
    const mercredi = dateDuJour("mercredi", maintenant);
    const samedi = dateDuJour("samedi", maintenant);
    expect(composantesAlpes(mercredi).jourSemaine).toBe(3);
    expect(composantesAlpes(samedi).jourSemaine).toBe(6);
    expect(composantesAlpes(samedi).heure).toBe(10);
    expect(mercredi.getTime() - maintenant.getTime()).toBeGreaterThanOrEqual(20 * 24 * 3600 * 1000);
  });

  it("garde l'offre la moins chère de chaque gamme", () => {
    const offres = [
      { nom: "Standard minivan", prix: 296, premium: false },
      { nom: "Standard XL minivan", prix: 300, premium: false },
      { nom: "Premium minivan", prix: 352, premium: true },
    ];
    expect(meilleureOffre(offres, "standard")?.prix).toBe(296);
    expect(meilleureOffre(offres, "premium")?.prix).toBe(352);
    expect(meilleureOffre(offres.slice(0, 2), "premium")).toBeNull();
  });

  it("lit les cartes d'Alpy en euros comme en francs suisses, prix par passager fois le groupe", () => {
    const html = `<div class="transfer-card" data-is-premium="false"> x <button data-amount="225.00" data-currency="€">
      </div><div class="transfer-card" data-is-premium="true"> <button data-amount="237.50" data-currency="CHF">`;
    const r = lireOffresAlpy(html, 2);
    expect(r.ok && r.offres).toEqual([
      { nom: "Private Transfer", prix: 450, premium: false },
      { nom: "Premium Private Transfer", prix: 508.25, premium: true },
    ]);
  });

  it("ne prend pas une page de blocage d'Alpy pour un trajet non desservi", () => {
    const vide = lireOffresAlpy("<title>purchase</title><h1>Choose your private transfer</h1>", 4);
    expect(!vide.ok && vide.raison).toBe("Alpy ne propose pas ce trajet à cette date");
    const bloque = lireOffresAlpy("<title>Alps ski resorts transfers</title><form></form>", 4);
    expect(!bloque.ok && bloque.raison).toMatch(/page inattendue/);
  });

  it("chiffre notre prix standard, et aucun premium pour un groupe de huit", () => {
    const samedi = dateDuJour("samedi", maintenant);
    expect(notrePrix(GRILLE_DEFAUT, "geneva-airport", "val-thorens", 8, "standard", samedi)?.categorie).toBe("standard");
    expect(notrePrix(GRILLE_DEFAUT, "geneva-airport", "val-thorens", 8, "premium", samedi)).toBeNull();
    expect(notrePrix(GRILLE_DEFAUT, "geneva-airport", "val-thorens", 4, "premium", samedi)).not.toBeNull();
  });

  it("pose le prix sous le concurrent le moins cher, arrondi à l'euro", () => {
    expect(prixSous([296, 450], 5)).toBe(291);
    expect(prixSous([null, 508.25], 5)).toBe(503);
    expect(prixSous([null, null], 5)).toBeNull();
  });
});
