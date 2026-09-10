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

  /*
    Un devis par catégorie **et par sens**.

    Le calcul ne produisait qu'une liste, pour un véhicule unique qui servait
    l'aller et le retour : la capacité retenue était celle du trajet le plus
    chargé, si bien qu'arriver à deux et repartir à six faisait payer un huit
    places sur les deux trajets, dont l'un à vide. Chaque sens a maintenant sa
    liste, filtrée sur son propre effectif — le retour peut être plus grand, ou
    plus petit, que l'aller.

    Le prix annoncé pour chaque sens est celui de ce sens seul, remise
    d'aller-retour déduite du retour : c'est ce qu'on additionne à l'écran, et
    c'est ce que le serveur recalculera au moment d'encaisser.
  */
  const fiche = (categorie: (typeof CATEGORIES)[number]) => {
    const modele = VEHICULES.categories.find((v) => v.nom.toLowerCase() === categorie);
    return {
      categorie,
      nom: modele?.nom ?? categorie,
      modele: modele?.modele ?? "",
      capacite: CAPACITE[categorie],
      capaciteBagages: CAPACITE_BAGAGES[categorie],
    };
  };

  /**
   * Les véhicules possibles pour un sens, avec le prix de ce sens.
   *
   * Le sens se chiffre en demandant le devis complet avec cette catégorie des
   * deux côtés, puis en ne lisant que sa ligne : les lignes sont indépendantes,
   * et c'est le seul chemin qui passe par le calcul unique du prix. Une
   * catégorie que le devis refuse — trop petite pour le groupe ou pour les
   * bagages — disparaît de la liste plutôt que d'y figurer sans prix.
   */
  const optionsDuSens = (sens: "aller" | "retour") =>
    CATEGORIES.map((categorie) => {
      const resultat = devisReservation({
        ...demande,
        categorie,
        categorieRetour: categorie,
        /*
          Pour chiffrer l'aller seul, on retire le retour : sa présence
          n'ajoute rien au prix de l'aller, mais sa capacité ferait refuser une
          catégorie qui convient parfaitement au trajet qu'on est en train de
          chiffrer.
        */
        ...(sens === "aller" ? { retour: null, passagersRetour: null } : {}),
      });
      if (!resultat.ok) return null;

      const ligne = resultat.devis.lignes.find((l) => l.sens === sens);
      if (!ligne) return null;

      const remise = sens === "retour" ? resultat.devis.remiseAllerRetour : 0;
      return {
        ...fiche(categorie),
        total: ligne.devis.total - remise,
        devise: resultat.devis.devise,
        remiseAllerRetour: remise,
        km: ligne.km,
        majorations: ligne.devis.detail.majorations.map((m) => m.libelle),
        encaissable: resultat.devis.encaissable,
      };
    }).filter((option) => option !== null);

  const options = optionsDuSens("aller");
  const optionsRetour = demande.retour ? optionsDuSens("retour") : [];

  if (options.length === 0 || (demande.retour && optionsRetour.length === 0)) {
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

  /*
    Le retour, décrit en entier.

    L'écran du choix de véhicule n'affichait que l'aller, et concluait par
    « One-way » alors que la course était un aller-retour : le visiteur qui avait
    pris soin de saisir une autre station de départ et un autre effectif ne les
    retrouvait nulle part avant de payer. Ces champs n'étaient renseignés que
    lorsque le retour partait d'ailleurs ; ils le sont maintenant dès qu'il y a un
    retour, quitte à reprendre les lieux de l'aller inversés — c'est bien la
    course qui est décrite, pas ce qui la distingue de l'aller.
  */
  const stationRetour = demande.retourResort
    ? resortParSlug(demande.retourResort)
    : station;
  const aeroportRetour = demande.retourAirport
    ? airportParSlug(demande.retourAirport)
    : aeroport;
  const distanceRetour = demande.retour
    ? (distanceCalculee({
        origine: aeroportRetour?.slug ?? demande.airport,
        destination: stationRetour?.slug ?? demande.resort,
      }) ??
      distancePubliee({
        origine: aeroportRetour?.slug ?? demande.airport,
        destination: stationRetour?.slug ?? demande.resort,
      }))
    : null;

  return NextResponse.json({
    trajet: {
      aeroport: aeroport.name,
      station: station.name,
      km: distance?.km ?? null,
      duree: duree(distance?.minutes ?? null),
      allerRetour: Boolean(demande.retour),
      retourAilleurs: Boolean(retourAilleurs),
      retourDepart: demande.retour ? (stationRetour?.name ?? null) : null,
      retourArrivee: demande.retour ? (aeroportRetour?.name ?? null) : null,
      retourKm: distanceRetour?.km ?? null,
      retourDuree: duree(distanceRetour?.minutes ?? null),
      passagers: demande.passagers,
      passagersRetour: demande.passagersRetour ?? null,
    },
    options,
    optionsRetour,
    // Tant que le barème n'est pas validé, le tunnel affiche le prix et se termine
    // en demande de devis : mieux vaut un devis qu'une réservation payée au
    // mauvais prix.
    encaissable: [...options, ...optionsRetour].every((option) => option.encaissable),
  });
}
