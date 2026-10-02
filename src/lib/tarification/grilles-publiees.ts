import { updateTag } from "next/cache";
import { inserer, lire } from "@/lib/reservation/supabase";
import { GRILLE_DEFAUT, validerGrille, type Grille } from "./grille";

/**
 * Les grilles publiées depuis l'onglet Tarifs — table `grilles_tarifaires`.
 *
 * Une ligne par publication, jamais modifiée ni effacée : la grille en vigueur
 * est la plus récente, et « revenir à une version » republie son contenu. On
 * sait ainsi toujours quel barème valait à quelle date, et qui l'a posé.
 *
 * Les prix déjà payés ou envoyés ne bougent pas : chaque réservation garde son
 * montant en base, et la grille ne sert qu'à chiffrer les nouvelles.
 */

export interface GrillePubliee {
  id: number;
  contenu: Grille;
  note: string | null;
  publie_par: string;
  publie_le: string;
}

/*
  La grille en vigueur, gardée quelques secondes en mémoire.

  Le tunnel chiffre chaque véhicule de chaque sens : sans cache, un seul devis
  ferait six lectures de la même ligne. Trente secondes suffisent — une
  publication se voit partout en moins d'une demi-minute, et l'instance qui
  publie vide son cache tout de suite.
*/
const DUREE_CACHE_MS = 30 * 1000;
let cache: { a: number; grille: Grille } | null = null;

export function oublierGrilleActive() {
  cache = null;
}

/**
 * La grille qui chiffre les réservations. Sans table, sans publication, ou si
 * la base ne répond pas : les valeurs du code — un site qui vend au barème
 * d'origine vaut mieux qu'un site qui ne vend plus.
 */
export async function grilleActive(): Promise<Grille> {
  if (cache && Date.now() - cache.a < DUREE_CACHE_MS) return cache.grille;
  const [derniere] = await lire<GrillePubliee>("grilles_tarifaires", {
    colonnes: "id,contenu",
    tri: { colonne: "id", croissant: false },
    limite: 1,
  });
  const valide = derniere ? validerGrille(derniere.contenu) : null;
  if (valide && !valide.ok) {
    console.error(`[tarifs] grille ${derniere?.id} illisible, barème du code appliqué`, valide.erreurs);
  }
  const grille = valide?.ok ? valide.grille : GRILLE_DEFAUT;
  cache = { a: Date.now(), grille };
  return grille;
}

/** L'étiquette de cache des pages qui affichent un prix tiré de la grille. */
const ETIQUETTE_GRILLE = "grille-tarifaire";

/**
 * La grille publiée, pour les pages statiques qui affichent un prix « à partir
 * de » — title, FAQ, données structurées des pages de trajet.
 *
 * `grilleActive()` lit toujours la base à neuf, ce que Next refuse pendant la
 * fabrication d'une page statique : la lecture échouait en silence et ces pages
 * affichaient le barème du code à la place de la grille publiée — Genève → Val
 * Thorens « dès 276 € » pour 314 € vendus, constaté le 2 octobre 2026. Ici la
 * lecture est mise en cache une heure, et `publierGrille` la périme aussitôt.
 *
 * Le moteur de réservation, lui, garde `grilleActive()` : un prix qu'on
 * encaisse ne sort jamais d'un cache.
 */
export async function grilleAffichee(): Promise<Grille> {
  const [derniere] = await lire<GrillePubliee>("grilles_tarifaires", {
    colonnes: "id,contenu",
    tri: { colonne: "id", croissant: false },
    limite: 1,
    cache: { secondes: 3600, etiquettes: [ETIQUETTE_GRILLE] },
  });
  const valide = derniere ? validerGrille(derniere.contenu) : null;
  if (valide && !valide.ok) {
    console.error(`[tarifs] grille ${derniere?.id} illisible, barème du code affiché`, valide.erreurs);
  }
  return valide?.ok ? valide.grille : GRILLE_DEFAUT;
}

/** Les dernières publications, la plus récente d'abord. */
export async function historiqueGrilles(limite = 20): Promise<GrillePubliee[]> {
  return lire<GrillePubliee>("grilles_tarifaires", {
    colonnes: "id,contenu,note,publie_par,publie_le",
    tri: { colonne: "id", croissant: false },
    limite,
  });
}

export async function grilleParId(id: number): Promise<GrillePubliee | null> {
  const [ligne] = await lire<GrillePubliee>("grilles_tarifaires", {
    colonnes: "id,contenu,note,publie_par,publie_le",
    filtres: [{ colonne: "id", operateur: "eq", valeur: String(id) }],
    limite: 1,
  });
  return ligne ?? null;
}

export async function publierGrille(grille: Grille, par: string, note: string | null): Promise<boolean> {
  const ligne = await inserer("grilles_tarifaires", { contenu: grille, note, publie_par: par });
  if (ligne) {
    oublierGrilleActive();
    // Les pages de trajet se refont avec le nouveau prix à leur prochaine visite.
    // La grille est publiée quoi qu'il arrive : au pire, le cache d'une heure
    // s'en charge.
    try {
      updateTag(ETIQUETTE_GRILLE);
    } catch (erreur) {
      console.error("[tarifs] cache des pages de trajet non périmé", erreur);
    }
  }
  return Boolean(ligne);
}
