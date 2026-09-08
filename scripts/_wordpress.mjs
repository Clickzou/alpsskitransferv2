/**
 * Boîte à outils commune aux scripts de reprise WordPress.
 *
 * Le parseur SQL et l'extraction de contenu servent à l'inventaire, à la reprise
 * des stations et à celle des trajets : ils vivent ici plutôt qu'en trois copies.
 */

/**
 * Découpe les tuples d'un `INSERT INTO … VALUES (…),(…);`.
 * Écrit à la main parce que les contenus WordPress sont pleins de virgules, de
 * parenthèses et d'apostrophes échappées : une expression régulière ne tient pas.
 */
export function tuples(ligne) {
  const debut = ligne.indexOf(" VALUES ");
  if (debut === -1) return [];
  const resultats = [];
  let i = debut + 8;
  const n = ligne.length;

  while (i < n) {
    while (i < n && ligne[i] !== "(") i++;
    if (i >= n) break;
    i++;

    const valeurs = [];
    let courant = "";
    let dansChaine = false;
    let estNull = true;

    while (i < n) {
      const c = ligne[i];

      if (dansChaine) {
        if (c === "\\") {
          const s = ligne[i + 1];
          courant += s === "n" ? "\n" : s === "r" ? "\r" : s === "t" ? "\t" : s;
          i += 2;
          continue;
        }
        if (c === "'") {
          if (ligne[i + 1] === "'") {
            courant += "'";
            i += 2;
            continue;
          }
          dansChaine = false;
          i++;
          continue;
        }
        courant += c;
        i++;
        continue;
      }

      if (c === "'") {
        dansChaine = true;
        estNull = false;
        i++;
        continue;
      }
      if (c === ",") {
        valeurs.push(estNull && courant.trim() === "NULL" ? null : courant.trim());
        courant = "";
        estNull = true;
        i++;
        continue;
      }
      if (c === ")") {
        valeurs.push(estNull && courant.trim() === "NULL" ? null : courant.trim());
        i++;
        break;
      }
      courant += c;
      i++;
    }
    resultats.push(valeurs);
  }
  return resultats;
}

export const ENTITES = {
  "&amp;": "&",
  "&nbsp;": " ",
  "&#8217;": "’",
  "&#8216;": "‘",
  "&#8211;": "–",
  "&#8212;": "—",
  "&#8220;": "“",
  "&#8221;": "”",
  "&quot;": '"',
  "&#039;": "'",
  "&lt;": "<",
  "&gt;": ">",
  "&eacute;": "é",
  "&egrave;": "è",
};

/** Balises retirées, entités décodées, espaces normalisés. */
export function texte(html) {
  return html
    .replace(/<[^>]+>/g, "")
    .replace(/&[a-z#0-9]+;/gi, (e) => ENTITES[e] ?? " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Décode les entités sans retirer les balises (metas Rank Math). */
export function decoder(s) {
  return (s ?? "").replace(/&[a-z#0-9]+;/gi, (e) => ENTITES[e] ?? e);
}

/**
 * Ne garde que la matière rédigée du `post_content`. Les grilles de vignettes du
 * thème sont des suites de `<a>` et d'`<img>` sans paragraphe : elles disparaissent
 * d'elles-mêmes puisqu'on ne lit que h1-h3, p et li. Restent à écarter les
 * fragments trop courts, qui sont des libellés d'interface.
 */
export function extraire(html) {
  const blocs = [];
  const motif = /<(h1|h2|h3|p|li)\b[^>]*>([\s\S]*?)<\/\1>/gi;
  let m;
  while ((m = motif.exec(html))) {
    const balise = m[1].toLowerCase();
    const contenu = texte(m[2]);
    if (!contenu) continue;
    if (balise === "li" && contenu.length < 25) continue;
    if (balise === "p" && contenu.length < 40) continue;
    blocs.push({ balise, texte: contenu });
  }
  return blocs;
}

/** Regroupe les `<li>` consécutifs et traduit les balises en blocs typés. */
export function assembler(blocs) {
  const sortie = [];
  let liste = null;
  for (const b of blocs) {
    if (b.balise === "li") {
      liste = liste ?? { type: "liste", items: [] };
      liste.items.push(b.texte);
      continue;
    }
    if (liste) {
      sortie.push(liste);
      liste = null;
    }
    sortie.push({
      type:
        b.balise === "h1"
          ? "titre1"
          : b.balise === "h2"
            ? "titre2"
            : b.balise === "h3"
              ? "titre3"
              : "paragraphe",
      texte: b.texte,
    });
  }
  if (liste) sortie.push(liste);
  return sortie;
}

/** Sépare la FAQ du corps : un titre interrogatif et le texte qui le suit. */
export function separerFaq(blocs) {
  const corps = [];
  const faq = [];
  for (let i = 0; i < blocs.length; i++) {
    const b = blocs[i];
    const estQuestion =
      (b.type === "titre2" || b.type === "titre3") && b.texte.trim().endsWith("?");
    if (!estQuestion) {
      corps.push(b);
      continue;
    }
    const reponses = [];
    let j = i + 1;
    while (j < blocs.length && blocs[j].type === "paragraphe") {
      reponses.push(blocs[j].texte);
      j++;
    }
    if (reponses.length > 0) {
      faq.push({ question: b.texte, reponse: reponses.join(" ") });
      i = j - 1;
    } else {
      corps.push(b);
    }
  }
  return { corps, faq };
}

/** Échappement pour insertion dans un littéral TypeScript. */
export const echappe = (s) => s.replace(/\\/g, "\\\\").replace(/"/g, '\\"');

/** `val-thorens` → `valThorens`. */
export const nomVariable = (slug) => slug.replace(/-([a-z])/g, (_, c) => c.toUpperCase());

/** Rend les blocs de contenu sous forme de littéraux TypeScript. */
export function rendreBlocs(blocs, indentation = "    ") {
  return blocs
    .map((b) =>
      b.type === "liste"
        ? `${indentation}{ type: "liste", items: [${b.items
            .map((i) => `"${echappe(i)}"`)
            .join(", ")}] },`
        : `${indentation}{ type: "${b.type}", texte: "${echappe(b.texte)}" },`,
    )
    .join("\n");
}

/** Rend une FAQ sous forme de littéraux TypeScript. */
export function rendreFaq(faq, indentation = "    ") {
  return faq
    .map((f) => `${indentation}{ question: "${echappe(f.question)}", reponse: "${echappe(f.reponse)}" },`)
    .join("\n");
}
