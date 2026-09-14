import { dateDuJour } from "@/lib/concurrence/comparaison";
import { devisReservation } from "@/lib/reservation/devis";
import { grilleActive } from "./grilles-publiees";

/**
 * Le prix « à partir de » d'un trajet — décision du 15 septembre 2026, prise
 * sur l'analyse des SERP : la page de trajet classée 1re sur six requêtes de
 * réservation met son prix dans le title, et c'est ce que le client lit avant
 * de cliquer.
 *
 * Le prix affiché doit être un prix qu'on vend vraiment : le Standard, un
 * mercredi à 10 h trois semaines à l'avance — ni samedi, ni nuit, ni saison —,
 * calculé par le même moteur que le devis et avec la grille publiée. Ce n'est
 * jamais un prix plancher inventé : un client qui réserve ce créneau paie ce
 * montant.
 */
export async function prixDepuis(airport: string, resort: string): Promise<number | null> {
  const r = devisReservation(
    { airport, resort, categorie: "standard", passagers: 1, aller: dateDuJour("mercredi") },
    await grilleActive(),
  );
  return r.ok ? r.devis.total : null;
}

/**
 * Le title avec le prix : la partie mot-clé du title d'origine est gardée telle
 * quelle, et sa fin générique (« | Book Now », « | Fixed Price »…) laisse la
 * place au prix. Si le tout dépasse 60 caractères, le title d'origine reste.
 */
export function titreAvecPrix(titre: string, prix: number | null): string {
  if (prix === null) return titre;
  const base = titre.split(/\s+[|–-]\s+/)[0].trim();
  const avecPrix = `${base} | from €${prix}`;
  return avecPrix.length <= 60 ? avecPrix : titre;
}
