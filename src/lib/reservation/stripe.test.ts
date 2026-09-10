import { createHmac } from "node:crypto";
import { describe, expect, it } from "vitest";
import { creerSessionCheckout, signatureValide } from "./stripe";

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

/**
 * La clé d'idempotence de la session Checkout.
 *
 * Elle ne portait que la référence de réservation, et cela cassait sur un cas
 * réel : le client qui revient changer de véhicule avant de payer garde sa
 * référence mais pas son total. Stripe refuse alors la requête — même clé,
 * paramètres différents — et le paiement échoue sans explication lisible.
 *
 * On teste le comportement à travers l'appel réseau, en interceptant `fetch` :
 * c'est l'en-tête envoyé à Stripe qui compte, pas une fonction interne.
 */
describe("clé d'idempotence de la session Checkout", () => {
  const demande = (montant: number) => ({
    reference: "AST-4F7K2Q",
    lignes: [{ intitule: "Geneva → Val Thorens", description: "2 passagers", montant }],
    email: "client@example.com",
    urlSucces: "https://example.com/ok/",
    urlAnnulation: "https://example.com/ko/",
  });

  async function cleEnvoyee(montant: number): Promise<string> {
    const original = globalThis.fetch;
    let cle = "";
    globalThis.fetch = (async (_url: string, options: RequestInit) => {
      cle = String((options.headers as Record<string, string>)["Idempotency-Key"]);
      return {
        ok: true,
        json: async () => ({ id: "cs_test", url: "https://checkout.stripe.com/x" }),
      } as Response;
    }) as typeof fetch;

    process.env.STRIPE_SECRET_KEY = "sk_test_pour_le_test";
    await creerSessionCheckout(demande(montant));
    globalThis.fetch = original;
    return cle;
  }

  it("reste identique pour deux demandes identiques — un double clic ne paie pas deux fois", async () => {
    expect(await cleEnvoyee(240)).toBe(await cleEnvoyee(240));
  });

  it("change quand le montant change — le client qui change de véhicule peut payer", async () => {
    expect(await cleEnvoyee(240)).not.toBe(await cleEnvoyee(310));
  });

  it("porte la référence, pour rester lisible dans le tableau de bord Stripe", async () => {
    expect(await cleEnvoyee(240)).toContain("AST-4F7K2Q");
  });
});
