import { describe, expect, it } from "vitest";
import { emailAutorise } from "./acces";

const LISTE = "exploitant@example.fr, agence@example.fr";

describe("emailAutorise", () => {
  it("laisse entrer une adresse de la liste, sans égard à la casse ni aux espaces", () => {
    expect(emailAutorise("exploitant@example.fr", LISTE)).toBe(true);
    expect(emailAutorise("  Agence@Example.FR ", LISTE)).toBe(true);
  });

  it("refuse un compte Supabase qui n'est pas dans la liste", () => {
    expect(emailAutorise("inconnu@example.com", LISTE)).toBe(false);
  });

  it("ferme la porte quand la liste est absente ou vide", () => {
    expect(emailAutorise("exploitant@example.fr", undefined)).toBe(false);
    expect(emailAutorise("exploitant@example.fr", "")).toBe(false);
    expect(emailAutorise("exploitant@example.fr", " , ")).toBe(false);
  });

  it("refuse une adresse vide", () => {
    expect(emailAutorise("", LISTE)).toBe(false);
    expect(emailAutorise(null, LISTE)).toBe(false);
  });
});
