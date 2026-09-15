import { airportParSlug } from "@/lib/airports";
import { resortParSlug } from "@/lib/resorts";
import { mesurer } from "@/lib/tarification/itineraire";
import { validerDemande, type EntreeBrute, type Validation } from "./demande";

/**
 * Valider une demande, puis mesurer ce que la table ne connaît pas.
 *
 * `validerDemande` reste pure : elle dit si la demande porte des lieux de la
 * table, ou un lieu libre. Ce second temps, qui a le droit d'appeler le réseau,
 * tente de chiffrer le lieu libre — une adresse, un hôtel, une station de
 * départ — en mesurant la route (`lib/tarification/itineraire.ts`). S'il y
 * parvient, la demande redevient une demande chiffrée comme les autres, et
 * passe par le calcul unique du prix ; sinon elle reste une demande de devis.
 *
 * **Les trois appelants passent par ici** — le devis du tunnel, la réservation
 * qui encaisse, la saisie téléphonique — pour que le prix affiché et le prix
 * encaissé sortent de la même mesure. La mesure est gardée en mémoire : deux
 * appels rapprochés ne la refont pas.
 *
 * Un retour qui part d'ailleurs que l'aller reste en devis : c'est un cas rare,
 * et deux adresses de plus à situer, c'est deux occasions de se tromper.
 */
export async function validerEtMesurer(entree: EntreeBrute): Promise<Validation> {
  const valide = validerDemande(entree);
  if (!valide.ok || !("surMesure" in valide)) return valide;

  const s = valide.surMesure;
  if (s.retourAilleurs) return valide;

  const mesure = await mesurer(s.lieuDepart, s.lieuArrivee);
  if (!mesure) return valide;

  /*
    Les colonnes de lieu gardent le slug quand il y en a un, le libellé sinon :
    tous les écrans affichent déjà la valeur brute quand elle n'est pas au
    registre, et un slug y reste un slug — la fiche, les e-mails, l'avis au
    chauffeur retrouvent le nom.
  */
  const lieu = (brut: string, lisible: string) =>
    airportParSlug(brut) || resortParSlug(brut) ? brut : lisible.slice(0, 200);

  return {
    ok: true,
    demande: {
      airport: lieu(s.lieuDepart, s.depart),
      resort: lieu(s.lieuArrivee, s.arrivee),
      categorie: s.categorie,
      categorieRetour: s.categorieRetour,
      passagers: s.passagers,
      passagersRetour: s.passagersRetour,
      aller: s.aller,
      retour: s.retour,
      bagages: s.bagages,
      skis: s.skis,
      partage: s.partage,
      mesures: { aller: { km: mesure.km, minutes: mesure.minutes, station: mesure.station } },
    },
  };
}

/** Le nom lisible d'un lieu de colonne : aéroport, station, ou l'adresse elle-même. */
export function nomDuLieu(valeur: string): string {
  return airportParSlug(valeur)?.name ?? resortParSlug(valeur)?.name ?? valeur;
}

/** Vrai quand la colonne porte une adresse plutôt qu'un lieu du registre. */
export function estUneAdresse(valeur: string | null | undefined): boolean {
  return Boolean(valeur) && !airportParSlug(valeur!) && !resortParSlug(valeur!);
}
