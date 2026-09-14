import { COEFFICIENTS } from "@/data/coefficients";
import { TARIFS } from "@/data/tarifs";
import { AIRPORTS } from "@/lib/airports";
import { RESORTS_MIGRES } from "@/lib/resorts";
import { composantesAlpes } from "@/lib/temps";
import { BAREME_DEFAUT, type Bareme, type CategorieVehicule } from "./bareme";

/**
 * La grille tarifaire — tout ce qui fait un prix, en un seul objet.
 *
 * Demande de JC, 11 septembre 2026 : l'exploitant modifie ses tarifs depuis le
 * back-office, sans déploiement. La grille rassemble donc ce qui vivait dans le
 * code — le barème (`bareme.ts`), les coefficients de station
 * (`data/coefficients.ts`), les prix fixes (`data/tarifs.ts`) — et y ajoute les
 * périodes de saison. Elle est publiée en base (`grilles-publiees.ts`), une
 * version par publication ; ce module-ci reste pur, sans accès réseau, pour être
 * testé et pour que le calcul d'un prix ne dépende jamais d'une requête.
 *
 * Tant que rien n'est publié, `GRILLE_DEFAUT` reprend exactement les valeurs du
 * code : publier pour la première fois ne change aucun prix tant qu'on ne
 * touche à rien.
 */

export const CATEGORIES_GRILLE: CategorieVehicule[] = ["standard", "business", "premium"];

/** Un prix convenu pour un trajet, par véhicule. Un véhicule sans prix suit le calcul. */
export interface PrixFixeTrajet {
  airport: string;
  resort: string;
  prix: Partial<Record<CategorieVehicule, number>>;
}

/** Une période de l'année où les prix changent — vacances scolaires, Noël, basse saison. */
export interface Saison {
  nom: string;
  /** Premier et dernier jour inclus, `YYYY-MM-DD`, à l'heure des Alpes. */
  debut: string;
  fin: string;
  /** En pourcentage du prix de base ; négatif pour une basse saison. */
  majoration: number;
}

export interface Grille {
  bareme: Bareme;
  /** Coefficient par slug de station ; absente, une station vaut 1. */
  coefficients: Record<string, number>;
  prixFixes: PrixFixeTrajet[];
  saisons: Saison[];
}

export const GRILLE_DEFAUT: Grille = {
  bareme: BAREME_DEFAUT,
  coefficients: Object.fromEntries(COEFFICIENTS.map((c) => [c.resort, c.coefficient])),
  /*
    Les 89 prix relevés sur l'ancien site sont tous « à valider » : aucun ne
    fixe un prix tant que l'exploitant ne l'a pas confirmé. Le jour où l'un
    l'est, il valait pour tous les véhicules — d'où la même valeur partout.
  */
  prixFixes: TARIFS.filter((t) => t.valide && t.prive).map((t) => ({
    airport: t.airport,
    resort: t.resort,
    prix: { standard: t.prive!, business: t.prive!, premium: t.prive! },
  })),
  saisons: [],
};

export function coefficientDe(grille: Grille, resort: string): number {
  return grille.coefficients[resort] ?? 1;
}

export function prixFixeDe(
  grille: Grille,
  airport: string,
  resort: string,
  categorie: CategorieVehicule,
): number | null {
  const trajet = grille.prixFixes.find((p) => p.airport === airport && p.resort === resort);
  const prix = trajet?.prix[categorie];
  return prix && prix > 0 ? prix : null;
}

/** « 2026-12-19 » du départ, à l'heure des Alpes — c'est le jour du client qui compte. */
function jourAlpes(depart: Date): string {
  const c = composantesAlpes(depart);
  return `${c.annee}-${String(c.mois).padStart(2, "0")}-${String(c.jour).padStart(2, "0")}`;
}

/**
 * La saison d'un départ. Deux périodes qui se chevauchent : la première de la
 * liste l'emporte — l'écran le dit, et la validation refuse le chevauchement.
 */
export function saisonDu(grille: Grille, depart: Date): Saison | null {
  const jour = jourAlpes(depart);
  return grille.saisons.find((s) => s.debut <= jour && jour <= s.fin) ?? null;
}

/* ------------------------------------------------------------ validation */

const SLUGS_AEROPORTS = new Set(AIRPORTS.map((a) => a.slug));
const SLUGS_STATIONS = new Set(RESORTS_MIGRES.map((r) => r.slug));

type Resultat = { ok: true; grille: Grille } | { ok: false; erreurs: string[] };

/**
 * Relit une grille venue du navigateur ou de la base, et refuse ce qui ne
 * tient pas debout. Rien n'est corrigé en silence : un taux au kilomètre tapé
 * « 118 » au lieu de « 1,18 » doit être refusé, pas publié.
 */
export function validerGrille(brut: unknown): Resultat {
  const erreurs: string[] = [];
  const g = (brut ?? {}) as Partial<Record<keyof Grille, unknown>>;
  const b = (g.bareme ?? {}) as Record<string, unknown>;

  const nombre = (valeur: unknown, libelle: string, min: number, max: number): number => {
    const n = typeof valeur === "string" ? Number(valeur.replace(",", ".")) : Number(valeur);
    if (valeur === "" || valeur === null || valeur === undefined || !Number.isFinite(n)) {
      erreurs.push(`${libelle} : valeur manquante.`);
      return 0;
    }
    if (n < min || n > max) erreurs.push(`${libelle} : ${n} est hors des limites (${min} à ${max}).`);
    return n;
  };
  const parVehicule = (valeur: unknown, libelle: string, min: number, max: number) => {
    const v = (valeur ?? {}) as Record<string, unknown>;
    return Object.fromEntries(
      CATEGORIES_GRILLE.map((c) => [c, nombre(v[c], `${libelle} (${c})`, min, max)]),
    ) as Record<CategorieVehicule, number>;
  };

  const majorations = (b.majorations ?? {}) as Record<string, unknown>;
  const plage = (b.plageNuit ?? {}) as Record<string, unknown>;
  const bareme: Bareme = {
    priseEnCharge: parVehicule(b.priseEnCharge, "Prise en charge", 0, 1000),
    tauxKm: parVehicule(b.tauxKm, "Prix au kilomètre", 0, 10),
    majorations: {
      samedi: nombre(majorations.samedi, "Majoration du samedi", 0, 200),
      dimanche: nombre(majorations.dimanche, "Majoration du dimanche", 0, 200),
      nuit: nombre(majorations.nuit, "Majoration de nuit", 0, 200),
    },
    plageNuit: {
      debut: nombre(plage.debut, "Début de la nuit", 0, 23),
      fin: nombre(plage.fin, "Fin de la nuit", 0, 23),
    },
    ratioPartage: BAREME_DEFAUT.ratioPartage,
    remiseAllerRetour: nombre(b.remiseAllerRetour, "Remise aller-retour", 0, 50),
    devise: "EUR",
  };
  for (const c of ["debut", "fin"] as const) {
    if (!Number.isInteger(bareme.plageNuit[c])) erreurs.push("Les heures de nuit sont des heures entières.");
  }

  const coefficients: Record<string, number> = {};
  for (const [resort, valeur] of Object.entries((g.coefficients ?? {}) as Record<string, unknown>)) {
    if (!SLUGS_STATIONS.has(resort)) continue;
    const n = nombre(valeur, `Coefficient de ${resort}`, 0.3, 3);
    // 1 est la valeur par défaut : inutile de la stocker.
    if (n !== 1) coefficients[resort] = Math.round(n * 100) / 100;
  }

  const prixFixes: PrixFixeTrajet[] = [];
  const vus = new Set<string>();
  for (const [i, ligne] of ((Array.isArray(g.prixFixes) ? g.prixFixes : []) as Record<string, unknown>[]).entries()) {
    const libelle = `Prix fixe n° ${i + 1}`;
    const airport = String(ligne?.airport ?? "");
    const resort = String(ligne?.resort ?? "");
    if (!SLUGS_AEROPORTS.has(airport) || !SLUGS_STATIONS.has(resort)) {
      erreurs.push(`${libelle} : choisissez un aéroport et une station.`);
      continue;
    }
    const cle = `${airport}|${resort}`;
    if (vus.has(cle)) erreurs.push(`${libelle} : ce trajet a déjà un prix fixe plus haut.`);
    vus.add(cle);
    const prixBrut = (ligne?.prix ?? {}) as Record<string, unknown>;
    const prix: Partial<Record<CategorieVehicule, number>> = {};
    for (const c of CATEGORIES_GRILLE) {
      if (prixBrut[c] === "" || prixBrut[c] === null || prixBrut[c] === undefined) continue;
      prix[c] = Math.round(nombre(prixBrut[c], `${libelle} (${c})`, 1, 10000));
    }
    if (Object.keys(prix).length === 0) erreurs.push(`${libelle} : donnez au moins un prix.`);
    prixFixes.push({ airport, resort, prix });
  }

  const saisons: Saison[] = [];
  const date = /^\d{4}-\d{2}-\d{2}$/;
  for (const [i, ligne] of ((Array.isArray(g.saisons) ? g.saisons : []) as Record<string, unknown>[]).entries()) {
    const nom = String(ligne?.nom ?? "").trim().slice(0, 60);
    const libelle = `Période « ${nom || `n° ${i + 1}`} »`;
    const debut = String(ligne?.debut ?? "");
    const fin = String(ligne?.fin ?? "");
    if (!nom) erreurs.push(`Période n° ${i + 1} : donnez-lui un nom.`);
    if (!date.test(debut) || !date.test(fin)) {
      erreurs.push(`${libelle} : dates manquantes.`);
      continue;
    }
    if (debut > fin) erreurs.push(`${libelle} : la fin est avant le début.`);
    const chevauche = saisons.find((s) => s.debut <= fin && debut <= s.fin);
    if (chevauche) erreurs.push(`${libelle} : elle chevauche « ${chevauche.nom} ».`);
    saisons.push({ nom, debut, fin, majoration: nombre(ligne?.majoration, `${libelle}, majoration`, -50, 200) });
  }

  if (erreurs.length > 0) return { ok: false, erreurs: [...new Set(erreurs)] };
  return { ok: true, grille: { bareme, coefficients, prixFixes, saisons } };
}
