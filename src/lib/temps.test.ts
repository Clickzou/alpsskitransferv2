import { describe, expect, it } from "vitest";
import { composantesAlpes, formaterAlpes, instantAlpes } from "@/lib/temps";
import { dateLocale } from "@/lib/reservation/demande";
import { departImminent } from "@/lib/reservation/gestion";
import { estDeNuit } from "@/lib/tarification/calcul";

/*
  Ces tests tiennent quel que soit le fuseau de la machine qui les exécute :
  c'est tout leur intérêt. Ils comparent des instants absolus, jamais des
  composantes locales — sans quoi ils passeraient à Chambéry et échoueraient
  sur Vercel, ce qui est exactement le défaut qu'ils surveillent.
*/

describe("l'heure des Alpes", () => {
  it("rattache une saisie d'hiver à CET (UTC+1)", () => {
    // 20 décembre 2026, 13 h 00 à Genève = 12 h 00 UTC.
    expect(instantAlpes(2026, 12, 20, 13, 0).toISOString()).toBe("2026-12-20T12:00:00.000Z");
  });

  it("rattache une saisie d'été à CEST (UTC+2)", () => {
    // 20 juillet 2026, 13 h 00 = 11 h 00 UTC.
    expect(instantAlpes(2026, 7, 20, 13, 0).toISOString()).toBe("2026-07-20T11:00:00.000Z");
  });

  it("passe le changement d'heure du printemps", () => {
    // Le 29 mars 2026 à 2 h, les horloges sautent à 3 h.
    expect(instantAlpes(2026, 3, 29, 1, 30).toISOString()).toBe("2026-03-29T00:30:00.000Z");
    expect(instantAlpes(2026, 3, 29, 4, 0).toISOString()).toBe("2026-03-29T02:00:00.000Z");
  });

  it("relit les composantes dans le fuseau des Alpes", () => {
    const c = composantesAlpes(new Date("2026-12-20T12:00:00Z"));
    expect(c.heure).toBe(13);
    expect(c.jour).toBe(20);
    expect(c.jourSemaine).toBe(0); // dimanche
  });

  it("affiche l'heure de l'aéroport, pas celle du serveur", () => {
    const texte = formaterAlpes(new Date("2026-12-20T12:00:00Z"), "fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    });
    expect(texte).toBe("13:00");
  });
});

describe("ce que le fuseau décidait à tort", () => {
  it("le samedi reste samedi, même construit sur un serveur en UTC", () => {
    // 19 décembre 2026 à 23 h 30 aux Alpes : samedi. En UTC, c'est 22 h 30,
    // toujours samedi — mais un départ à 00 h 30 le dimanche ne doit pas être
    // lu comme un samedi.
    const samediSoir = dateLocale("2026-12-19T23:30")!;
    const dimancheNuit = dateLocale("2026-12-20T00:30")!;
    expect(composantesAlpes(samediSoir).jourSemaine).toBe(6);
    expect(composantesAlpes(dimancheNuit).jourSemaine).toBe(0);
  });

  it("une prise en charge à 23 h est de nuit où que tourne le code", () => {
    expect(estDeNuit(dateLocale("2026-12-20T23:00")!)).toBe(true);
    expect(estDeNuit(dateLocale("2026-12-20T13:00")!)).toBe(false);
  });

  it("compare à l'heure réelle, sans décalage de fuseau", () => {
    const maintenant = new Date("2026-12-20T12:00:00Z"); // 13 h aux Alpes
    // Départ à 13 h 30 aux Alpes : trente minutes, donc trop tard pour vendre.
    expect(departImminent(dateLocale("2026-12-20T13:30")!, maintenant)).toBe(true);
    // Départ à 15 h : deux heures, la vente reste ouverte.
    expect(departImminent(dateLocale("2026-12-20T15:00")!, maintenant)).toBe(false);
  });
});

describe("une heure déjà passée", () => {
  const maintenant = new Date("2026-12-20T12:00:00Z");

  it("est refusée comme une heure trop proche", () => {
    expect(departImminent(dateLocale("2026-12-20T12:30")!, maintenant)).toBe(true);
    expect(departImminent(dateLocale("2026-12-20T08:00")!, maintenant)).toBe(true);
  });

  it("l'était déjà à la minute près — c'est le cas du formulaire ouvert", () => {
    // Le champ s'ouvre sur l'heure courante ; le visiteur valide une minute
    // plus tard. L'ancienne borne `ecart > 0` laissait passer.
    expect(departImminent(new Date(maintenant.getTime() - 60_000), maintenant)).toBe(true);
  });
});
