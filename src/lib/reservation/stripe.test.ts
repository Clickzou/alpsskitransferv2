import { createHmac } from "node:crypto";
import { describe, expect, it } from "vitest";
import { signatureValide } from "./stripe";

/**
 * La signature du webhook est le seul rempart entre « Stripe dit que c'est payé »
 * et « quelqu'un a posté sur notre URL ». Elle est donc testée : sans elle,
 * n'importe qui déclare une réservation payée.
 */

const SECRET = "whsec_test_secret";
const CHARGE = JSON.stringify({ type: "checkout.session.completed", data: { object: {} } });

function entete(charge: string, horodatage: number, secret = SECRET) {
  const signature = createHmac("sha256", secret)
    .update(`${horodatage}.${charge}`, "utf8")
    .digest("hex");
  return `t=${horodatage},v1=${signature}`;
}

const maintenant = () => Math.floor(Date.now() / 1000);

describe("signature du webhook Stripe", () => {
  it("accepte une signature valide et récente", () => {
    expect(signatureValide(CHARGE, entete(CHARGE, maintenant()), SECRET)).toBe(true);
  });

  it("refuse une signature calculée avec un autre secret", () => {
    const usurpee = entete(CHARGE, maintenant(), "whsec_autre_secret");
    expect(signatureValide(CHARGE, usurpee, SECRET)).toBe(false);
  });

  it("refuse une charge modifiée après signature", () => {
    const signe = entete(CHARGE, maintenant());
    const falsifiee = CHARGE.replace("completed", "expired");
    expect(signatureValide(falsifiee, signe, SECRET)).toBe(false);
  });

  it("refuse un événement rejoué hors de la tolérance", () => {
    const vieux = maintenant() - 3600;
    expect(signatureValide(CHARGE, entete(CHARGE, vieux), SECRET)).toBe(false);
  });

  it("refuse un en-tête absent, vide ou mal formé", () => {
    expect(signatureValide(CHARGE, null, SECRET)).toBe(false);
    expect(signatureValide(CHARGE, "", SECRET)).toBe(false);
    expect(signatureValide(CHARGE, "t=123", SECRET)).toBe(false);
    expect(signatureValide(CHARGE, "v1=abc", SECRET)).toBe(false);
  });

  it("refuse tout quand le secret n'est pas configuré", () => {
    expect(signatureValide(CHARGE, entete(CHARGE, maintenant()), undefined)).toBe(false);
  });
});
