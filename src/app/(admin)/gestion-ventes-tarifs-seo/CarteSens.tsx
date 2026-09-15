import { Fragment } from "react";
import { heure, type Sens } from "@/lib/admin/affichage";

/**
 * Un trajet, au complet : tout ce qu'il faut pour le préparer, sans rien
 * reconstituer à partir de l'autre sens. La même carte sert à la liste dépliée
 * et à la fiche du client.
 */
export default function CarteSens({ sens }: { sens: Sens }) {
  const lignes: [string, string][] = [
    ["Prise en charge", heure(sens.quand)],
    ["Trajet", sens.trajet],
    ["Adresse en station", sens.adresse],
    ["Vol", sens.vol],
    ["Passagers", String(sens.passagers)],
    ["Véhicule", sens.vehicule],
    ["Enfants", sens.enfants],
    ["Âges des enfants", sens.ages],
    ["Valises", sens.valises],
    ["Housses à skis", sens.housses],
    ["Chauffeur", sens.chauffeur ?? "à inscrire dans le Planning"],
    ...(sens.notePlanning ? ([["Note du planning", sens.notePlanning]] as [string, string][]) : []),
  ];

  return (
    <section className="rounded-lg border border-glacier-200 bg-white p-4">
      <h3 className="text-xs font-semibold uppercase tracking-wide text-marque">{sens.libelle}</h3>
      {/* Une colonne de libellés plus étroite sur téléphone : la valeur garde la place. */}
      <dl className="mt-2 grid grid-cols-[6.5rem_1fr] gap-x-3 gap-y-1 text-sm sm:grid-cols-[9.5rem_1fr]">
        {lignes.map(([libelle, valeur]) => (
          <Fragment key={libelle}>
            <dt className="text-alpine-600">{libelle}</dt>
            <dd
              className={
                libelle === "Adresse en station" && sens.adresseManquante
                  ? "font-semibold text-danger"
                  : "text-alpine"
              }
            >
              {valeur}
            </dd>
          </Fragment>
        ))}
      </dl>
    </section>
  );
}
