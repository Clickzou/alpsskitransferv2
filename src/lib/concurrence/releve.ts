import { ecrireLignes, lire } from "@/lib/reservation/supabase";
import { dateDuJour, isoAlpes, meilleureOffre, type Gamme } from "./comparaison";
import { CODES_LIEUX, GROUPES, TRAJETS_PAR_DEFAUT, type Concurrent, type Jour } from "./lieux";
import { lireAlps2alps, lireAlpy, ouvrirSessionAlpy, type Lecture, type SessionAlpy } from "./sources";

/**
 * Le relevé de nuit : les prix des concurrents sur les trajets suivis, écrits
 * dans `concurrence_releves`.
 *
 * Il tourne **par lots de cinq trajets** (`vercel.json`, de 1 h à 6 h 30) :
 * cinq trajets, deux jours, trois groupes, deux concurrents font une trentaine
 * de demandes, espacées de deux secondes et demie — un peu plus de deux
 * minutes, sous la durée qu'autorise une fonction, et un rythme de visiteur
 * attentif plutôt que de robot.
 *
 * Nos propres prix ne sont pas stockés : l'onglet les calcule à l'affichage
 * avec la grille en vigueur, si bien qu'un prix aligné se voit tout de suite.
 */

export const TAILLE_LOT = 5;
const PAUSE_MS = 2500;
const JOURS: Jour[] = ["mercredi", "samedi"];

const pause = () => new Promise((r) => setTimeout(r, PAUSE_MS));

export interface TrajetSuivi {
  airport: string;
  resort: string;
}

/** La liste suivie : celle de l'onglet, ou les 50 trajets par défaut tant qu'elle est vide. */
export async function trajetsSuivis(): Promise<TrajetSuivi[]> {
  const lignes = await lire<TrajetSuivi & { ordre: number }>("concurrence_trajets", {
    colonnes: "airport,resort,ordre",
    tri: { colonne: "ordre", croissant: true },
    limite: 200,
  });
  return lignes.length ? lignes : TRAJETS_PAR_DEFAUT.map(([airport, resort]) => ({ airport, resort }));
}

function lignesDe(
  base: { releve_le: string; airport: string; resort: string; jour: Jour; date_trajet: string; passagers: number },
  source: Concurrent,
  lecture: Lecture,
) {
  return (["standard", "premium"] as Gamme[]).map((gamme) => {
    const offre = lecture.ok ? meilleureOffre(lecture.offres, gamme) : null;
    return {
      ...base,
      source,
      gamme,
      prix: offre?.prix ?? null,
      detail: offre ? offre.nom : lecture.ok ? "pas d’offre dans cette gamme" : lecture.raison,
    };
  });
}

/** Relève un lot de trajets et l'écrit. Rend le nombre de prix trouvés et les erreurs rencontrées. */
export async function releverLot(lot: number, maintenant = new Date()) {
  const tous = await trajetsSuivis();
  const trajets = tous.slice(lot * TAILLE_LOT, (lot + 1) * TAILLE_LOT);
  const releveLe = isoAlpes(maintenant);
  let session: SessionAlpy | null = null;
  let prixTrouves = 0;
  const erreurs = new Set<string>();

  for (const t of trajets) {
    const codesDepart = CODES_LIEUX[t.airport];
    const codesArrivee = CODES_LIEUX[t.resort];
    const lignes: Record<string, unknown>[] = [];

    for (const jour of JOURS) {
      const date = isoAlpes(dateDuJour(jour, maintenant));
      for (const passagers of GROUPES) {
        const base = { releve_le: releveLe, airport: t.airport, resort: t.resort, jour, date_trajet: date, passagers };

        const a2a: Lecture =
          codesDepart?.alps2alps && codesArrivee?.alps2alps
            ? await lireAlps2alps(codesDepart.alps2alps, codesArrivee.alps2alps, date, passagers)
            : { ok: false, raison: "alps2alps ne dessert pas ce trajet" };
        if (codesDepart?.alps2alps && codesArrivee?.alps2alps) await pause();

        let alpy: Lecture = { ok: false, raison: "Alpy ne dessert pas ce trajet" };
        if (codesDepart?.alpy && codesArrivee?.alpy) {
          session ??= await ouvrirSessionAlpy();
          alpy = session
            ? await lireAlpy(session, codesDepart.alpy, codesArrivee.alpy, t.airport.endsWith("-airport"), date, passagers)
            : { ok: false, raison: "Alpy injoignable" };
          await pause();
        }

        for (const lecture of [a2a, alpy]) if (!lecture.ok && !/ne dessert pas/.test(lecture.raison)) erreurs.add(lecture.raison);
        const nouvelles = [...lignesDe(base, "alps2alps", a2a), ...lignesDe(base, "alpy", alpy)];
        prixTrouves += nouvelles.filter((l) => l.prix !== null).length;
        lignes.push(...nouvelles);
      }
    }
    // Trajet par trajet : une fonction coupée en route garde ce qu'elle a déjà lu.
    // L'heure d'écriture est reposée à chaque fois : c'est elle qui dit l'avancement d'un relevé rejoué.
    const ecrit = new Date().toISOString();
    await ecrireLignes(
      "concurrence_releves",
      lignes.map((l) => ({ ...l, cree_le: ecrit })),
      "releve_le,airport,resort,jour,passagers,source,gamme",
    );
  }

  return { lot, trajets: trajets.length, prixTrouves, erreurs: [...erreurs] };
}
