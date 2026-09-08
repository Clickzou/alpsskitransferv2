import {
  BAREME_DEFAUT,
  BAREME_VALIDE,
  type Bareme,
  type CategorieVehicule,
} from "./bareme";

/**
 * Calcul du prix d'un transfert. Fonction pure : aucune entrée-sortie, aucune
 * horloge, aucun aléa — elle est testable et rejouable, ce qui compte pour du
 * code qui fixe ce qu'un client paie.
 *
 * Le prix affiché et le prix encaissé sortent tous les deux d'ici : jamais deux
 * calculs différents, c'est ce qui produisait 220 € sur la page et 377 € au
 * paiement sur l'ancien site.
 */

export interface DemandeTransfert {
  /** Distance de l'itinéraire, en kilomètres. */
  km: number;
  categorie: CategorieVehicule;
  /** Départ, heure locale. Détermine le jour et la majoration de nuit. */
  depart: Date;
  passagers: number;
  /** Partagé : prix par personne. Privé : prix par véhicule. */
  partage: boolean;
  allerRetour: boolean;
  /**
   * Coefficient de la destination. Certaines stations coûtent plus cher à
   * desservir que leur distance ne le laisse penser — accès difficile, route de
   * col, retour à vide, station sans voitures. Mesuré sur les prix publiés :
   * appliquer ce coefficient fait passer l'erreur du barème de 14,1 % à 5,7 %.
   * 1 = pas de coefficient. Voir `data/coefficients.ts`.
   */
  coefficient?: number;
  /** Prix fixe convenu pour ce trajet, s'il en existe un. Il prime sur le calcul. */
  prixFixe?: number | null;
}

export interface Devis {
  /** Ce que le client paie, toutes majorations comprises. */
  total: number;
  devise: "EUR";
  /** Détail, pour l'afficher au client et pour le service après-vente. */
  detail: {
    priseEnCharge: number;
    kilometrage: number;
    majorations: { libelle: string; montant: number }[];
    remises: { libelle: string; montant: number }[];
    /** Coefficient de destination appliqué. */
    coefficient: number;
    /** Prix d'un aller, avant remise d'aller-retour. */
    aller: number;
  };
  /** Vrai quand le prix vient d'un prix fixe et non du barème. */
  prixFixe: boolean;
  /** Faux tant que le barème n'est pas validé : afficher, mais ne pas encaisser. */
  encaissable: boolean;
}

const arrondi = (montant: number) => Math.round(montant);

/** Une prise en charge entre 22h et 6h est de nuit — bornes du barème. */
export function estDeNuit(depart: Date, bareme: Bareme = BAREME_DEFAUT): boolean {
  const heure = depart.getHours();
  const { debut, fin } = bareme.plageNuit;
  return debut > fin ? heure >= debut || heure < fin : heure >= debut && heure < fin;
}

export function calculer(demande: DemandeTransfert, bareme: Bareme = BAREME_DEFAUT): Devis {
  const majorations: { libelle: string; montant: number }[] = [];
  const remises: { libelle: string; montant: number }[] = [];

  // Un prix fixe convenu court-circuite le barème, mais pas les majorations :
  // un samedi à 23 h reste un samedi à 23 h.
  const prixFixe = demande.prixFixe != null && demande.prixFixe > 0;

  const priseEnCharge = prixFixe ? 0 : bareme.priseEnCharge[demande.categorie];
  const kilometrage = prixFixe
    ? 0
    : Math.max(0, demande.km) * bareme.tauxKm[demande.categorie];

  // Le coefficient de destination porte sur le calcul, jamais sur un prix négocié :
  // un prix fixe est déjà le prix voulu pour cette destination.
  const coefficient = prixFixe ? 1 : (demande.coefficient ?? 1);
  const base = prixFixe ? demande.prixFixe! : (priseEnCharge + kilometrage) * coefficient;

  const jour = demande.depart.getDay();
  if (jour === 6) {
    const montant = (base * bareme.majorations.samedi) / 100;
    majorations.push({ libelle: "Samedi", montant: arrondi(montant) });
  } else if (jour === 0) {
    const montant = (base * bareme.majorations.dimanche) / 100;
    majorations.push({ libelle: "Dimanche", montant: arrondi(montant) });
  }
  if (estDeNuit(demande.depart, bareme)) {
    const montant = (base * bareme.majorations.nuit) / 100;
    majorations.push({ libelle: "Nuit", montant: arrondi(montant) });
  }

  const aller = arrondi(base + majorations.reduce((somme, m) => somme + m.montant, 0));

  let total = aller;
  if (demande.allerRetour) {
    const retour = arrondi(aller * (1 - bareme.remiseAllerRetour / 100));
    remises.push({
      libelle: `Aller-retour (−${bareme.remiseAllerRetour} % sur le retour)`,
      montant: aller - retour,
    });
    total = aller + retour;
  }

  // En partagé, le prix est par personne : la part est appliquée au trajet complet,
  // puis multipliée par le nombre de passagers.
  if (demande.partage) {
    const parPersonne = arrondi(total * bareme.ratioPartage);
    total = parPersonne * Math.max(1, demande.passagers);
  }

  return {
    total,
    devise: bareme.devise,
    detail: {
      priseEnCharge: arrondi(priseEnCharge),
      kilometrage: arrondi(kilometrage),
      coefficient,
      majorations,
      remises,
      aller,
    },
    prixFixe,
    encaissable: BAREME_VALIDE || prixFixe,
  };
}

/** Prix par personne d'un transfert partagé, pour l'affichage « à partir de ». */
export function prixParPersonne(devis: Devis, passagers: number): number {
  return arrondi(devis.total / Math.max(1, passagers));
}
