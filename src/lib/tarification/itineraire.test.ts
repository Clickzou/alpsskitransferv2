import { afterEach, describe, expect, it, vi } from "vitest";
import { COORDONNEES } from "@/data/coordonnees";
import { AIRPORTS } from "@/lib/airports";
import { validerEtMesurer } from "@/lib/reservation/demande-mesuree";
import { devisReservation, type DemandeReservation } from "@/lib/reservation/devis";
import { RESORTS_MIGRES } from "@/lib/resorts";
import { stationProche } from "./itineraire";

/**
 * Le prix d'un trajet qui passe par une adresse — 15 septembre 2026.
 *
 * Ce qui coûte de l'argent quand ça lâche : une station choisie au départ qui
 * ne coûte pas ce que coûte l'aller, une adresse de station moins chère que la
 * station elle-même, et une mesure qui échoue en silence au lieu de rendre la
 * main au devis.
 */

const MERCREDI_10H = new Date(2026, 0, 14, 10, 0);

const base: DemandeReservation = {
  airport: "geneva-airport",
  resort: "val-thorens",
  categorie: "standard",
  passagers: 2,
  aller: MERCREDI_10H,
};

function total(demande: DemandeReservation) {
  const r = devisReservation(demande);
  if (!r.ok) throw new Error(r.echec.raison);
  return r.devis.total;
}

describe("coordonnées", () => {
  it("situe chaque aéroport et chaque station que le site propose", () => {
    const manquants = [...AIRPORTS.map((a) => a.slug), ...RESORTS_MIGRES.map((r) => r.slug)].filter(
      (slug) => !COORDONNEES[slug],
    );
    expect(manquants).toEqual([]);
  });

  it("rattache une adresse à la station voisine", () => {
    const [lat, lon] = COORDONNEES["val-thorens"];
    expect(stationProche({ lat: lat + 0.01, lon: lon + 0.01 })).toBe("val-thorens");
    // Lyon centre : aucune station à moins de 15 km.
    expect(stationProche({ lat: 45.764, lon: 4.8357 })).toBeNull();
  });
});

describe("devis d'un trajet mesuré", () => {
  it("chiffre une adresse au kilomètre, coefficient 1 hors station", () => {
    const demande = {
      ...base,
      resort: "12 rue de la République, 69002 Lyon",
      mesures: { aller: { km: 150, minutes: 110, station: null } },
    };
    const r = devisReservation(demande);
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.devis.lignes[0].km).toBe(150);
      expect(r.devis.coefficient).toBe(1);
    }
  });

  it("donne à une adresse de station le coefficient de la station", () => {
    const station = devisReservation(base);
    const chalet = devisReservation({
      ...base,
      resort: "Chalet des Neiges, 73440 Val Thorens",
      mesures: { aller: { km: 161, minutes: 150, station: "val-thorens" } },
    });
    expect(station.ok && chalet.ok).toBe(true);
    if (station.ok && chalet.ok) expect(chalet.devis.coefficient).toBe(station.devis.coefficient);
  });

  it("refuse toujours un lieu inconnu sans mesure", () => {
    const r = devisReservation({ ...base, resort: "Quelque part" });
    expect(r.ok).toBe(false);
  });
});

describe("validerEtMesurer", () => {
  afterEach(() => vi.unstubAllGlobals());

  it("chiffre station → aéroport au prix de l'aller, sans appel réseau", async () => {
    const appels = vi.fn();
    vi.stubGlobal("fetch", appels);
    const valide = await validerEtMesurer({
      from: "val-thorens",
      to: "geneva-airport",
      when: "2026-01-14T10:00",
      passengers: 2,
    });
    expect(appels).not.toHaveBeenCalled();
    expect(valide.ok && "demande" in valide).toBe(true);
    if (valide.ok && "demande" in valide) expect(total(valide.demande)).toBe(total(base));
  });

  it("mesure une adresse par la BAN et OSRM", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async (url: string | URL) => {
        const u = String(url);
        const corps = u.includes("api-adresse")
          ? { features: [{ geometry: { coordinates: [4.8357, 45.764] }, properties: { score: 0.93 } }] }
          : u.includes("project-osrm")
            ? { code: "Ok", routes: [{ distance: 151_400, duration: 6_600 }] }
            : {};
        return new Response(JSON.stringify(corps), { status: 200 });
      }),
    );
    const valide = await validerEtMesurer({
      from: "geneva-airport",
      toText: "12 rue de la République, 69002 Lyon",
      when: "2026-01-14T10:00",
      passengers: 2,
    });
    expect(valide.ok && "demande" in valide).toBe(true);
    if (valide.ok && "demande" in valide) {
      expect(valide.demande.resort).toBe("12 rue de la République, 69002 Lyon");
      expect(valide.demande.mesures?.aller?.km).toBe(151);
    }
  });

  it("mesure à part un retour qui part et arrive ailleurs", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async (url: string | URL) => {
        const u = String(url);
        const toulouse = u.includes("Toulouse");
        const corps = u.includes("api-adresse")
          ? {
              features: [
                {
                  geometry: { coordinates: toulouse ? [1.3638, 43.6293] : [1.6053, 43.6653] },
                  properties: { score: 0.9 },
                },
              ],
            }
          : u.includes("project-osrm")
            ? { code: "Ok", routes: [{ distance: u.includes("1.3638") ? 36_000 : 712_000, duration: 2_400 }] }
            : {};
        return new Response(JSON.stringify(corps), { status: 200 });
      }),
    );
    const valide = await validerEtMesurer({
      from: "geneva-airport",
      toText: "Golf de Palmola, 31660 Buzet-sur-Tarn",
      when: "2026-01-14T10:00",
      returnWhen: "2026-01-20T10:00",
      returnFromText: "Golf de Palmola, 31660 Buzet-sur-Tarn",
      returnToText: "Aéroport de Toulouse-Blagnac, 31700 Blagnac",
      passengers: 2,
    });
    expect(valide.ok && "demande" in valide).toBe(true);
    if (valide.ok && "demande" in valide) {
      expect(valide.demande.retourAirport).toBe("Aéroport de Toulouse-Blagnac, 31700 Blagnac");
      const r = devisReservation(valide.demande);
      expect(r.ok && r.devis.lignes.map((l) => l.km)).toEqual([712, 36]);
    }
  });

  it("laisse la demande en devis quand l'adresse ne se situe pas", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => new Response("{}", { status: 200 })));
    const valide = await validerEtMesurer({
      from: "geneva-airport",
      toText: "Nulle part du tout, 00000 Introuvable",
      when: "2026-01-14T10:00",
      passengers: 2,
    });
    expect(valide.ok && "surMesure" in valide).toBe(true);
  });
});
