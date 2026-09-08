import { NextResponse } from "next/server";
import { VEHICULES } from "@/data/accueil";
import { airportParSlug } from "@/lib/airports";
import { duree } from "@/lib/airports/dessertes";
import { resortParSlug } from "@/lib/resorts";
import { CATEGORIES, validerDemande } from "@/lib/reservation/demande";
import { CAPACITE, CAPACITE_BAGAGES, devisReservation } from "@/lib/reservation/devis";
import { distanceCalculee, distancePubliee } from "@/lib/tarification/distance";

/**
 * Devis d'un transfert — le prix vient d'ici, jamais du navigateur.
 *
 * La table des distances pèse 172 Ko : elle reste sur le serveur, et le tunnel
 * demande son prix plutôt que d'embarquer la table. Le même calcul sert à
 * l'affichage et à l'encaissement — deux calculs différents, c'est l'écart entre
 * 220 € affichés et 377 € facturés que cette refonte corrige.
 *
 * Trois issues : un prix ferme, une demande de devis quand un lieu est saisi
 * librement, ou un refus motivé. Jamais un prix approximatif.
 *
 * POST /api/devis
 *   { from, to, when, returnWhen?, returnFrom?, returnTo?, passengers, bags?, skis?, shared? }
 */
export const dynamic = "force-dynamic";

export async function POST(requete: Request) {
  let corps: unknown;
  try {
    corps = await requete.json();
  } catch {
    return NextResponse.json({ erreur: "Invalid request." }, { status: 400 });
  }

  const valide = validerDemande((corps ?? {}) as Record<string, unknown>);
  if (!valide.ok) return NextResponse.json({ erreur: valide.message }, { status: 400 });

  // Lieu saisi librement : on ne chiffre pas une liaison qu'on ne sait pas mesurer.
  if ("surMesure" in valide) {
    return NextResponse.json({
      devisSurMesure: true,
      trajet: { depart: valide.surMesure.depart, arrivee: valide.surMesure.arrivee },
      message:
        "We quote addresses, stations and hotels by email — tell us the details and we come back to you with a fixed price.",
    });
  }

  const { demande } = valide;
  const aeroport = airportParSlug(demande.airport)!;
  const station = resortParSlug(demande.resort)!;
  const distance =
    distanceCalculee({ origine: demande.airport, destination: demande.resort }) ??
    distancePubliee({ origine: demande.airport, destination: demande.resort });

  // Un devis par catégorie de véhicule : le visiteur choisit sur un prix, pas sur
  // une promesse. Les catégories trop petites pour le groupe ou pour ses bagages
  // sont écartées — le coffre décide avant les sièges.
  const options = CATEGORIES.map((categorie) => {
    const resultat = devisReservation({ ...demande, categorie });
    if (!resultat.ok) return null;
    const modele = VEHICULES.categories.find((v) => v.nom.toLowerCase() === categorie);
    return {
      categorie,
      nom: modele?.nom ?? categorie,
      modele: modele?.modele ?? "",
      capacite: CAPACITE[categorie],
      capaciteBagages: CAPACITE_BAGAGES[categorie],
      total: resultat.devis.total,
      devise: resultat.devis.devise,
      remiseAllerRetour: resultat.devis.remiseAllerRetour,
      lignes: resultat.devis.lignes.map((l) => ({
        sens: l.sens,
        km: l.km,
        total: l.devis.total,
        majorations: l.devis.detail.majorations.map((m) => m.libelle),
      })),
      encaissable: resultat.devis.encaissable,
    };
  }).filter((option) => option !== null);

  if (options.length === 0) {
    const echec = devisReservation(demande);
    const raison = !echec.ok ? echec.echec.raison : "distance-inconnue";
    const message =
      raison === "trop-de-passagers"
        ? "That is more passengers than one vehicle takes — ask us for a group quote."
        : raison === "trop-de-bagages"
          ? "That is more luggage than one vehicle takes — ask us for a group quote."
          : "We do not have a fixed price for this route yet — ask us for a quote.";
    return NextResponse.json({ erreur: message, devisSurMesure: true }, { status: 422 });
  }

  const retourAilleurs =
    (demande.retourAirport && demande.retourAirport !== demande.airport) ||
    (demande.retourResort && demande.retourResort !== demande.resort);

  return NextResponse.json({
    trajet: {
      aeroport: aeroport.name,
      station: station.name,
      km: distance?.km ?? null,
      duree: duree(distance?.minutes ?? null),
      allerRetour: Boolean(demande.retour),
      retourAilleurs: Boolean(retourAilleurs),
      retourDepart: demande.retourResort
        ? (resortParSlug(demande.retourResort)?.name ?? null)
        : null,
      retourArrivee: demande.retourAirport
        ? (airportParSlug(demande.retourAirport)?.name ?? null)
        : null,
    },
    options,
    // Tant que le barème n'est pas validé, le tunnel affiche le prix et se termine
    // en demande de devis : mieux vaut un devis qu'un prix faux encaissé.
    encaissable: options.every((option) => option.encaissable),
  });
}
