import { describe, expect, it } from "vitest";
import { expediteur } from "./email";
import { langueDuTexte, texteEnHtml } from "./email-html";

describe("expediteur", () => {
  it("affiche toujours la marque, quel que soit le nom posé dans la variable", () => {
    expect(expediteur("bookings@alpsskitransfers.com")).toBe("Alps Ski Transfers <bookings@alpsskitransfers.com>");
    expect(expediteur('"bookings" <bookings@alpsskitransfers.com>')).toBe(
      "Alps Ski Transfers <bookings@alpsskitransfers.com>",
    );
    expect(expediteur(' "bookings@alpsskitransfers.com"\n')).toBe(
      "Alps Ski Transfers <bookings@alpsskitransfers.com>",
    );
  });
});

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

  it("raccourcit le lien écrit sous le bouton, pas le lien cliqué", () => {
    const long = `https://checkout.stripe.com/c/pay/cs_test_${"a".repeat(300)}#fidnandhYHdWcXxpYCc`;
    const html = texteEnHtml(`Payez ici :\n${long}`, "S");
    expect(html).toContain(`href="${long}"`);
    expect(html).toContain(">checkout.stripe.com/c/pay/cs_test_aaaaaaaaaaa…</a>");
  });

  it("laisse une phrase qui finit par un point dans le texte", () => {
    expect(texteEnHtml("Une question : +33 7 69 78 91 89.", "S")).not.toContain(">Une question</td>");
  });

  it("garde entière une phrase dont la première ligne ressemble à un libellé", () => {
    const html = texteEnHtml(
      [
        "Référence : AST-1",
        "Montant réglé : 1 €",
        "",
        "Il reste une étape : votre adresse en station, pour que votre",
        "chauffeur sache où vous déposer et où venir vous chercher. Indiquez-la",
        "ici, jusqu'à 24 heures avant :",
        "https://x.fr/fr/gerer-ma-reservation/?ref=AST-1&j=a#adresses",
      ].join("\n"),
      "S",
    );
    expect(html).not.toContain(">Il reste une étape</td>");
    expect(html).toContain("Il reste une étape : votre adresse en station, pour que votre<br>chauffeur sache");
    expect(html).toContain(">Référence</td>");
    expect(html).toContain(">Montant réglé</td>");
  });

  it("invite à payer une facture à régler, et à voir une facture réglée", () => {
    const lien = "https://invoice.stripe.com/i/acct_1/live_abc";
    const aRegler = texteEnHtml(
      `Pour confirmer votre réservation, réglez-la en ligne — c’est l’affaire d’une minute :
${lien}`,
      "S",
    );
    expect(aRegler).toContain("Payer ma facture");
    expect(aRegler).not.toContain("Voir ma facture");
    expect(texteEnHtml(`To confirm your booking, please pay online — it takes a minute:
${lien}`, "S")).toContain(
      "Pay my invoice",
    );
    expect(texteEnHtml(`Um Ihre Buchung zu bestätigen, bezahlen Sie bitte online:
${lien}`, "S")).toContain(
      "Rechnung bezahlen",
    );
    expect(texteEnHtml(`Per confermare la prenotazione, paga online — ci vuole un minuto:
${lien}`, "S")).toContain(
      "Paga la fattura",
    );
    expect(texteEnHtml(`Votre transfert est payé.

Votre facture : ${lien}`, "S")).toContain("Voir ma facture");
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
