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
    ["Housses à skis", sens.housses],
  ];

  return (
    <section className="rounded-lg border border-glacier-200 bg-white p-4">
      <h3 className="text-xs font-semibold uppercase tracking-wide text-marque">{sens.libelle}</h3>
      <dl className="mt-2 grid grid-cols-[9.5rem_1fr] gap-x-3 gap-y-1 text-sm">
        {lignes.map(([libelle, valeur]) => (
          <Fragment key={libelle}>
            <dt className="text-alpine-600">{libelle}</dt>
            <dd className="text-alpine">{valeur}</dd>
          </Fragment>
        ))}
      </dl>
    </section>
  );
}
