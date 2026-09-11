"use client";

import { useFormStatus } from "react-dom";

/**
 * Le bouton d'une action du back-office qui écrit au client.
 *
 * Il se grise pendant l'envoi — un second appui ne part pas —, et il peut
 * demander confirmation : en montagne, sur un téléphone, un appui de travers
 * sur « Refuser » annonçait un refus au client sans retour possible (revue du
 * 11 septembre 2026).
 */
export default function BoutonConfirmation({
  libelle,
  enCours = "Envoi…",
  confirmer,
  className,
}: {
  libelle: string;
  enCours?: string;
  /** La question posée avant d'envoyer — rien n'est demandé sans elle. */
  confirmer?: string;
  className: string;
}) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      onClick={(evenement) => {
        if (confirmer && !window.confirm(confirmer)) evenement.preventDefault();
      }}
      className={`${className} disabled:cursor-wait disabled:opacity-60`}
    >
      {pending ? enCours : libelle}
    </button>
  );
}
