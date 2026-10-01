import { describe, expect, it } from "vitest";
import { SITE } from "@/data/site";
import { estDomaineJumeau, urlCanonique } from "./domaine";

describe("estDomaineJumeau", () => {
  it("reconnaît l'autre forme du domaine, avec port ou majuscules", () => {
    expect(estDomaineJumeau("www.alpsskitransfers.com")).toBe(true);
    expect(estDomaineJumeau("WWW.AlpsSkiTransfers.com")).toBe(true);
    expect(estDomaineJumeau("www.alpsskitransfers.com:443")).toBe(true);
  });

  it("laisse passer le domaine canonique, la préproduction et le développement", () => {
    expect(estDomaineJumeau("alpsskitransfers.com")).toBe(false);
    expect(estDomaineJumeau("alpsskitransferv2.vercel.app")).toBe(false);
    expect(estDomaineJumeau("localhost:3002")).toBe(false);
    expect(estDomaineJumeau(null)).toBe(false);
  });

  it("ne prend jamais le domaine canonique pour son jumeau — ce serait une boucle", () => {
    expect(estDomaineJumeau(new URL(SITE.url).host)).toBe(false);
  });
});

describe("urlCanonique", () => {
  it("envoie une ancienne URL droit sur sa destination", () => {
    expect(
      urlCanonique(
        "/destination/ski-resorts-in-france/chamonix/",
        "",
        "/france-ski-transfers/chamonix/",
      ),
    ).toBe("https://alpsskitransfers.com/france-ski-transfers/chamonix/");
  });

  it("conserve le chemin et la requête quand aucune règle ne s'applique", () => {
    expect(urlCanonique("/fr/reserver/", "?from=gva")).toBe(
      "https://alpsskitransfers.com/fr/reserver/?from=gva",
    );
    expect(urlCanonique("/", "")).toBe("https://alpsskitransfers.com/");
  });

  it("pose la barre finale que Next ajouterait, sauf sur un fichier", () => {
    expect(urlCanonique("/contact", "")).toBe("https://alpsskitransfers.com/contact/");
    expect(urlCanonique("/llms.txt", "")).toBe("https://alpsskitransfers.com/llms.txt");
  });
});
