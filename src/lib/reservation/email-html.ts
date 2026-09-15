import { ENTREPRISE, SITE } from "@/data/site";

/**
 * La mise en page des e-mails — demande de JC, 15 septembre 2026 : « plus
 * sympa à lire, du gras, de la couleur ».
 *
 * Les textes restent écrits en texte brut, dans leurs fichiers de langue, et
 * partent tels quels en version texte. Cette page les **habille** au moment
 * de l'envoi, d'après leur forme, sans qu'aucun appelant ait à changer :
 *
 *  · un lien seul sur sa ligne, ou au bout d'une phrase, devient un bouton ;
 *  · « Libellé : valeur » devient une ligne de récapitulatif, libellé en gras ;
 *  · une ligne en capitales devient un intertitre — en rouge quand elle
 *    signale une chose à faire (« À OBTENIR », « MANQUANTE », « URGENT ») ;
 *  · une ligne indentée rejoint l'encadré de son intertitre ;
 *  · un trajet seul sur sa ligne (« Genève → Les Gets — … ») est mis en avant.
 *
 * Une règle par forme plutôt qu'un gabarit par message : vingt e-mails en
 * quatre langues, c'est quatre-vingts gabarits qui divergeraient au premier
 * correctif. Pas d'image non plus : la marque est écrite, pas chargée — une
 * messagerie qui bloque les images n'affiche pas un cadre vide.
 */

const COULEURS = {
  nuit: "#1B2444",
  or: "#C9A87A",
  orTexte: "#8A6B3A",
  action: "#0E7F5F",
  texte: "#1F2937",
  doux: "#5A6690",
  fond: "#F6F8FB",
  cadre: "#DCE2EC",
  danger: "#B42318",
  dangerFond: "#FEF3F2",
} as const;

type Langue = "en" | "fr" | "de" | "it";

const BOUTONS: Record<string, Record<Langue, string>> = {
  adresse: {
    en: "Add my address in resort",
    fr: "Indiquer mon adresse en station",
    de: "Adresse im Skiort angeben",
    it: "Inserisci l’indirizzo in località",
  },
  gestion: {
    en: "Manage my booking",
    fr: "Gérer ma réservation",
    de: "Buchung verwalten",
    it: "Gestisci la prenotazione",
  },
  facture: { en: "View my invoice", fr: "Voir ma facture", de: "Rechnung ansehen", it: "Vedi la fattura" },
  avoir: {
    en: "Download my credit note",
    fr: "Télécharger mon avoir",
    de: "Gutschrift herunterladen",
    it: "Scarica la nota di credito",
  },
  paiement: { en: "Pay online", fr: "Payer en ligne", de: "Online bezahlen", it: "Paga online" },
  recu: { en: "View my receipt", fr: "Voir mon reçu", de: "Beleg ansehen", it: "Vedi la ricevuta" },
  fiche: { en: "Open the booking", fr: "Ouvrir la fiche", de: "Buchung öffnen", it: "Apri la prenotazione" },
  site: { en: "Open the link", fr: "Ouvrir le lien", de: "Link öffnen", it: "Apri il link" },
};

const PIED: Record<Langue, string> = {
  en: "Private airport transfers to the Alps ski resorts",
  fr: "Transferts privés entre aéroports et stations des Alpes",
  de: "Private Flughafentransfers in die Skiorte der Alpen",
  it: "Transfer privati dagli aeroporti alle stazioni delle Alpi",
};

const URL = /https?:\/\/[^\s<>"]+/;

function echapper(texte: string): string {
  return texte
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * La langue du message : celle de son lien de gestion quand il en a un, sinon
 * celle de ses mots les plus courants. Elle ne sert qu'aux libellés des
 * boutons et au pied de page — le texte, lui, est déjà dans la bonne langue.
 */
export function langueDuTexte(texte: string): Langue {
  if (/\/fr\/|gestion-ventes-tarifs-seo/.test(texte)) return "fr";
  if (/\/de\//.test(texte)) return "de";
  if (/\/it\//.test(texte)) return "it";
  if (/\/manage-booking\//.test(texte)) return "en";

  const mots = texte.toLowerCase().split(/[^a-zàâäçéèêëîïôöùûüß’']+/);
  const scores: Record<Langue, number> = { en: 0, fr: 0, de: 0, it: 0 };
  const indices: Record<Langue, string[]> = {
    en: ["the", "your", "you", "and", "we", "to", "is"],
    fr: ["le", "la", "votre", "vous", "et", "nous", "est", "des"],
    de: ["die", "der", "und", "ihre", "sie", "wir", "ist", "ihr"],
    it: ["il", "la", "e", "vostro", "tuo", "per", "della", "di"],
  };
  for (const mot of mots) {
    for (const langue of Object.keys(indices) as Langue[]) {
      if (indices[langue].includes(mot)) scores[langue] += 1;
    }
  }
  return (Object.keys(scores) as Langue[]).reduce((a, b) => (scores[b] > scores[a] ? b : a), "en");
}

function libelleBouton(url: string, langue: Langue): string {
  const type =
    /gestion-ventes-tarifs-seo/.test(url)
      ? "fiche"
      : /(manage-booking|gerer-ma-reservation|buchung-verwalten|gestisci-prenotazione)/.test(url)
        ? url.includes("#adresses")
          ? "adresse"
          : "gestion"
        : /credit_notes/.test(url)
          ? "avoir"
          : /invoice\.stripe\.com|pay\.stripe\.com\/invoice/.test(url)
          ? "facture"
          : /checkout\.stripe\.com|buy\.stripe\.com/.test(url)
            ? "paiement"
            : /pay\.stripe\.com\/receipts/.test(url)
              ? "recu"
              : "site";
  return BOUTONS[type][langue];
}

/**
 * Le lien écrit sous le bouton, raccourci : le domaine et le début du chemin.
 * Un lien Stripe fait plus de 300 caractères et remplissait cinq lignes
 * (retour de JC, 15 septembre 2026). Le lien cliqué, lui, reste entier.
 */
export function lienLisible(url: string): string {
  const sansProtocole = url.replace(/^https?:\/\//, "").replace(/[?#].*$/, "");
  return sansProtocole.length > 48 ? `${sansProtocole.slice(0, 45)}…` : sansProtocole;
}

function bouton(url: string, langue: Langue): string {
  const propre = url.replace(/[.,;:)]+$/, "");
  const href = echapper(propre);
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:18px 0 6px"><tr><td style="border-radius:8px;background:${COULEURS.action}">
<a href="${href}" style="display:inline-block;padding:13px 24px;font-size:15px;font-weight:700;color:#ffffff;text-decoration:none;border-radius:8px">${echapper(libelleBouton(url, langue))} →</a>
</td></tr></table>
<p style="margin:0 0 14px;font-size:11px;line-height:1.5;color:${COULEURS.doux}"><a href="${href}" style="color:${COULEURS.doux}">${echapper(lienLisible(propre))}</a></p>`;
}

/**
 * « Référence : AST-… », « Total: 515 € » — un libellé court, puis une valeur.
 * Une valeur qui finit par un point est une phrase (« Une question : +33… ») :
 * elle reste dans le texte.
 */
function libelleValeur(ligne: string): [string, string] | null {
  const m = /^([^:.,!?→]{2,32}?)\s?:\s+(.+)$/.exec(ligne.trim());
  if (!m || /[.!?]$/.test(m[2])) return null;
  return [m[1].trim(), m[2].trim()];
}

function enCapitales(ligne: string): boolean {
  const lettres = ligne.replace(/[^A-Za-zÀ-ÿ]/g, "");
  return lettres.length >= 3 && lettres === lettres.toUpperCase() && ligne.trim().length <= 60;
}

function alerte(ligne: string): boolean {
  return /URGENT|À OBTENIR|MANQUANTE|À VALIDER|À CONFIRMER|MISSING|REFUS/i.test(ligne) && enCapitales(ligne);
}

function lignesRecap(lignes: [string, string][]): string {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:6px 0 16px;border:1px solid ${COULEURS.cadre};border-radius:8px;background:${COULEURS.fond}">
${lignes
  .map(
    ([libelle, valeur], i) =>
      `<tr><td style="padding:9px 14px;${i ? `border-top:1px solid ${COULEURS.cadre};` : ""}font-size:13px;color:${COULEURS.doux};font-weight:700;white-space:nowrap;vertical-align:top">${echapper(libelle)}</td><td style="padding:9px 14px;${i ? `border-top:1px solid ${COULEURS.cadre};` : ""}font-size:14px;color:${COULEURS.texte};font-weight:600">${echapper(valeur)}</td></tr>`,
  )
  .join("\n")}
</table>`;
}

function paragraphe(html: string): string {
  return `<p style="margin:0 0 14px;font-size:15px;line-height:1.6;color:${COULEURS.texte}">${html}</p>`;
}

/** Un bloc — ce qui tient entre deux lignes vides. */
function bloc(lignes: string[], langue: Langue): string {
  const sortie: string[] = [];
  let recap: [string, string][] = [];
  let encadre: string[] = [];
  let texte: string[] = [];

  const viderRecap = () => {
    if (recap.length) sortie.push(lignesRecap(recap));
    recap = [];
  };
  const viderEncadre = () => {
    if (encadre.length) {
      sortie.push(
        `<div style="margin:0 0 16px;padding:10px 14px;border-left:3px solid ${COULEURS.or};background:${COULEURS.fond};font-size:14px;line-height:1.7;color:${COULEURS.texte}">${encadre.join("<br>")}</div>`,
      );
    }
    encadre = [];
  };
  const viderTexte = () => {
    if (texte.length) sortie.push(paragraphe(texte.join("<br>")));
    texte = [];
  };
  const viderTout = () => {
    viderRecap();
    viderEncadre();
    viderTexte();
  };

  for (const brute of lignes) {
    const ligne = brute.trimEnd();
    const lien = URL.exec(ligne);

    if (lien) {
      viderTout();
      const avant = ligne.slice(0, lien.index).trim().replace(/\s*:$/, "");
      if (avant) sortie.push(paragraphe(`<strong>${echapper(avant)}</strong>`));
      sortie.push(bouton(lien[0], langue));
      continue;
    }

    if (/^\s{2,}\S/.test(brute)) {
      viderRecap();
      viderTexte();
      const contenu = echapper(ligne.trim());
      encadre.push(
        alerte(ligne) ? `<strong style="color:${COULEURS.danger}">${contenu}</strong>` : contenu,
      );
      continue;
    }

    if (enCapitales(ligne)) {
      viderTout();
      sortie.push(
        alerte(ligne)
          ? `<p style="margin:4px 0 10px;padding:8px 12px;border-radius:6px;background:${COULEURS.dangerFond};font-size:14px;font-weight:800;letter-spacing:.04em;color:${COULEURS.danger}">${echapper(ligne.trim())}</p>`
          : `<p style="margin:6px 0 8px;font-size:12px;font-weight:800;letter-spacing:.12em;color:${COULEURS.orTexte}">${echapper(ligne.trim())}</p>`,
      );
      continue;
    }

    const paire = libelleValeur(ligne);
    if (paire && !ligne.trim().endsWith(":")) {
      viderEncadre();
      viderTexte();
      recap.push(paire);
      continue;
    }

    if (ligne.includes("→") && ligne.length <= 140) {
      viderTout();
      sortie.push(
        `<p style="margin:0 0 16px;padding:12px 16px;border-radius:8px;background:${COULEURS.fond};border:1px solid ${COULEURS.cadre};font-size:16px;font-weight:700;color:${COULEURS.nuit}">${echapper(ligne.trim())}</p>`,
      );
      continue;
    }

    viderRecap();
    viderEncadre();
    texte.push(echapper(ligne.trim()));
  }
  viderTout();
  return sortie.join("\n");
}

export function texteEnHtml(texte: string, sujet: string): string {
  const langue = langueDuTexte(texte);
  const signature = `${SITE.nom} — ${SITE.url}`;
  const lignes = texte
    .replace(/\r\n/g, "\n")
    .split("\n")
    .filter((l) => l.trim() !== signature);

  const blocs: string[][] = [];
  let courant: string[] = [];
  for (const ligne of lignes) {
    if (ligne.trim() === "") {
      if (courant.length) blocs.push(courant);
      courant = [];
    } else {
      courant.push(ligne);
    }
  }
  if (courant.length) blocs.push(courant);

  /* La salutation — « Bonjour Jean, » — ouvre le message en plus grand. */
  const [premier, ...suite] = blocs;
  const salutation =
    premier && premier.length === 1 && /,$/.test(premier[0].trim()) && premier[0].length <= 60;
  const corps = [
    salutation
      ? `<p style="margin:0 0 16px;font-size:18px;font-weight:700;color:${COULEURS.nuit}">${echapper(premier[0].trim())}</p>`
      : premier
        ? bloc(premier, langue)
        : "",
    ...(salutation ? suite : blocs.slice(1)).map((b) => bloc(b, langue)),
  ].join("\n");

  const site = SITE.url.replace(/^https?:\/\//, "");

  return `<!doctype html>
<html lang="${langue}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${echapper(sujet)}</title></head>
<body style="margin:0;padding:0;background:#EDF1F6;font-family:-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#EDF1F6"><tr><td align="center" style="padding:24px 12px">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:12px;overflow:hidden">
<tr><td style="background:${COULEURS.nuit};padding:22px 28px;border-bottom:3px solid ${COULEURS.or}">
<span style="font-size:20px;font-weight:800;letter-spacing:.02em;color:#ffffff">Alps <span style="color:${COULEURS.or}">Ski</span> Transfers</span>
</td></tr>
<tr><td style="padding:28px 28px 12px">
${corps}
</td></tr>
<tr><td style="padding:18px 28px 24px;border-top:1px solid ${COULEURS.cadre};font-size:12px;line-height:1.7;color:${COULEURS.doux}">
<strong style="color:${COULEURS.nuit}">${echapper(SITE.nom)}</strong> · ${echapper(PIED[langue])}<br>
<a href="tel:${ENTREPRISE.telephone}" style="color:${COULEURS.doux}">${ENTREPRISE.telephoneAffiche}</a> · <a href="mailto:${ENTREPRISE.email}" style="color:${COULEURS.doux}">${ENTREPRISE.email}</a> · <a href="${SITE.url}" style="color:${COULEURS.doux}">${site}</a>
</td></tr>
</table>
</td></tr></table>
</body></html>`;
}
