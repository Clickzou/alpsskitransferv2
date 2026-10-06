/**
 * Relecture des articles par le client, depuis son espace Clickzou
 * (clickzou.fr/espace-client, onglet « Articles programmés » — demande de JC du
 * 6 octobre 2026, sur le modèle du site Un Seul Souffle).
 *
 * Le client modifie le TEXTE d'un article (version anglaise) ; Clickzou
 * enregistre ses modifications dans `corrections-client.json` (commit GitHub
 * sur main), et le registre des articles les applique au chargement
 * (`ARTICLES = [...].map(appliquerCorrections)`).
 *
 * Restent verrouillés, donc absents de `champsEditables` et refusés par
 * `appliquerCorrections` : titre, metaTitre, metaDescription, slug, dates,
 * auteur, visuels, maillage (stations et trajets liés), traductions — et les
 * intertitres H2 (`titre2`), qui portent la structure de l'article et ses
 * ancres de sommaire. Les liens `[ancre](/url/)` éventuels sont contrôlés côté
 * Clickzou : un texte qui en perd ou en change un est refusé avant tout commit.
 *
 * L'import du JSON est en chemin RELATIF : ce fichier est aussi chargé hors
 * Next (tests), où l'alias `@/` n'est pas garanti.
 */
import type { Article } from "./types";
import corrections from "./corrections-client.json";

export type ChampEditable = {
  /** Adresse du texte dans l'objet article : « contenu.4.texte », « faq.2.reponse ». */
  chemin: string;
  /** Regroupement à l'écran : « Introduction », « Section 2 — <titre H2> », « FAQ ». */
  section: string;
  libelle: string;
  texte: string;
};

type CorrectionsClient = Record<string, { champs: Record<string, string>; modifieLe?: string; par?: string }>;

const EDITABLES = [
  /^chapo$/,
  /^aRetenir\.\d+$/,
  // Paragraphes et intertitres H3 : `contenu.N.texte` — le type du bloc est
  // vérifié en plus par `estEditableDans`, pour qu'un H2 ne passe jamais.
  /^contenu\.\d+\.texte$/,
  /^contenu\.\d+\.items\.\d+$/,
  /^faq\.\d+\.question$/,
  /^faq\.\d+\.reponse$/,
];

export function estEditable(chemin: string): boolean {
  return EDITABLES.some((re) => re.test(chemin));
}

/**
 * Contrôle complet d'un chemin sur un article donné : le motif, puis, pour un
 * bloc de contenu, son type. `contenu.0.texte` a la même forme pour un H2
 * (verrouillé) que pour un paragraphe (modifiable).
 */
function estEditableDans(a: Article, chemin: string): boolean {
  if (!estEditable(chemin)) return false;
  const m = /^contenu\.(\d+)\./.exec(chemin);
  if (!m) return true;
  const bloc = a.contenu[Number(m[1])];
  if (!bloc) return false;
  if (bloc.type === "liste") return chemin.includes(".items.");
  return bloc.type === "paragraphe" || bloc.type === "titre3";
}

export function champsEditables(a: Article): ChampEditable[] {
  const champs: ChampEditable[] = [];
  const ajouter = (chemin: string, section: string, libelle: string, texte: unknown) => {
    if (typeof texte === "string" && texte.trim()) champs.push({ chemin, section, libelle, texte });
  };
  ajouter("chapo", "Introduction", "Chapô", a.chapo);
  (a.aRetenir ?? []).forEach((p, i) => ajouter(`aRetenir.${i}`, "À retenir (Key facts)", `Point ${i + 1}`, p));

  // Les H2 ne sont pas modifiables : ils servent d'en-tête de section à l'écran.
  let section = "Début de l'article";
  let n = 0;
  a.contenu.forEach((b, bi) => {
    const base = `contenu.${bi}`;
    if (b.type === "titre2") {
      n += 1;
      section = `Section ${n} — ${b.texte}`;
    } else if (b.type === "paragraphe") ajouter(`${base}.texte`, section, "Paragraphe", b.texte);
    else if (b.type === "titre3") ajouter(`${base}.texte`, section, "Intertitre", b.texte);
    else if (b.type === "liste") b.items.forEach((t, i) => ajouter(`${base}.items.${i}`, section, `Liste — élément ${i + 1}`, t));
  });

  (a.faq ?? []).forEach((f, fi) => {
    ajouter(`faq.${fi}.question`, "Questions fréquentes", `Question ${fi + 1}`, f.question);
    ajouter(`faq.${fi}.reponse`, "Questions fréquentes", `Réponse ${fi + 1}`, f.reponse);
  });
  return champs.filter((c) => estEditableDans(a, c.chemin));
}

/** Pose un texte à son adresse, seulement si un texte s'y trouve déjà (pas de création de structure). */
function poser(objet: unknown, chemin: string, texte: string) {
  const etapes = chemin.split(".");
  let courant: unknown = objet;
  for (const e of etapes.slice(0, -1)) {
    if (courant === null || typeof courant !== "object") return;
    courant = (courant as Record<string, unknown>)[e];
  }
  const dernier = etapes.at(-1)!;
  if (courant && typeof courant === "object" && typeof (courant as Record<string, unknown>)[dernier] === "string") {
    (courant as Record<string, unknown>)[dernier] = texte;
  }
}

export function appliquerCorrections(a: Article): Article {
  const c = (corrections as CorrectionsClient)[a.slug];
  if (!c?.champs) return a;
  const copie = structuredClone(a);
  for (const [chemin, texte] of Object.entries(c.champs)) {
    if (estEditableDans(a, chemin) && typeof texte === "string") poser(copie, chemin, texte);
  }
  return copie;
}
