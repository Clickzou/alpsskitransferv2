import { describe, expect, it } from "vitest";
import { estDomaineNu, urlCanonique } from "./domaine";

describe("estDomaineNu", () => {
  it("reconnaît le domaine sans www, avec port ou majuscules", () => {
    expect(estDomaineNu("alpsskitransfers.com")).toBe(true);
    expect(estDomaineNu("AlpsSkiTransfers.com")).toBe(true);
    expect(estDomaineNu("alpsskitransfers.com:443")).toBe(true);
  });

  it("laisse passer www, la préproduction et le développement", () => {
    expect(estDomaineNu("www.alpsskitransfers.com")).toBe(false);
    expect(estDomaineNu("alpsskitransferv2.vercel.app")).toBe(false);
    expect(estDomaineNu("localhost:3002")).toBe(false);
    expect(estDomaineNu(null)).toBe(false);
  });
});

describe("urlCanonique", () => {
  it("envoie une ancienne URL droit sur sa destination, en www", () => {
    expect(
      urlCanonique(
        "/destination/ski-resorts-in-france/chamonix/",
        "",
        "/france-ski-transfers/chamonix/",
      ),
    ).toBe("https://www.alpsskitransfers.com/france-ski-transfers/chamonix/");
  });

  it("conserve le chemin et la requête quand aucune règle ne s'applique", () => {
    expect(urlCanonique("/booking/", "?from=gva")).toBe(
      "https://www.alpsskitransfers.com/booking/?from=gva",
    );
    expect(urlCanonique("/", "")).toBe("https://www.alpsskitransfers.com/");
  });

  it("pose la barre finale que Next ajouterait, sauf sur un fichier", () => {
    expect(urlCanonique("/contact", "")).toBe(
      "https://www.alpsskitransfers.com/contact/",
    );
    expect(urlCanonique("/llms.txt", "")).toBe(
      "https://www.alpsskitransfers.com/llms.txt",
    );
  });
});
