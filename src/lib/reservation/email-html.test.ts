import { describe, expect, it } from "vitest";
import { langueDuTexte, texteEnHtml } from "./email-html";

describe("texteEnHtml", () => {
  it("fait d'un lien de gestion un bouton dans la langue du client", () => {
    const html = texteEnHtml(
      "Il manque votre adresse :\nhttps://x.fr/fr/gerer-ma-reservation/?ref=AST-1&j=a#adresses",
      "Sujet",
    );
    expect(html).toContain("Indiquer mon adresse en station");
    expect(html).toContain('href="https://x.fr/fr/gerer-ma-reservation/?ref=AST-1&amp;j=a#adresses"');
  });

  it("met les « libellé : valeur » en récapitulatif et échappe le contenu", () => {
    const html = texteEnHtml("Référence : AST-1\nRemarques : <b>chalet</b>", "Sujet");
    expect(html).toContain(">Référence</td>");
    expect(html).toContain("&lt;b&gt;chalet&lt;/b&gt;");
    expect(html).not.toContain("<b>chalet");
  });

  it("signale en rouge ce qui reste à faire", () => {
    expect(texteEnHtml("ALLER\n  ADRESSE À OBTENIR PAR TÉLÉPHONE", "S")).toContain("#B42318");
  });

  it("devine la langue sans lien", () => {
    expect(langueDuTexte("Bonjour, votre transfert est confirmé et nous vous attendons.")).toBe("fr");
    expect(langueDuTexte("Hello, your transfer is confirmed and we are waiting for you.")).toBe("en");
    expect(langueDuTexte("Hallo, Ihre Buchung ist bestätigt und wir freuen uns.")).toBe("de");
  });
});
