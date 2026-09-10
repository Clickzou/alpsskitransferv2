"use client";

import { useSearchParams } from "next/navigation";
import Tunnel from "@/components/reservation/Tunnel";
import type { Lieu } from "@/lib/reservation/lieux";

/**
 * Le tunnel, sur une page **statique**.
 *
 * `/book-ski-transfer-tickets/` est prégénérée : elle porte le mot-clé, elle est
 * indexée, et elle ne doit pas basculer en rendu à la demande. Or lire
 * `searchParams` côté serveur suffirait à la rendre dynamique — c'est ce que
 * faisait `/booking/`, qui n'était pas indexée et pouvait se le permettre.
 *
 * On lit donc le pré-remplissage **dans le navigateur**. La page reste un
 * fichier statique servi depuis le cache, et un visiteur qui arrive avec
 * `?from=geneva-airport&to=val-thorens` retrouve tout de même sa saisie.
 *
 * Appelé sous `<Suspense>` : `useSearchParams` l'exige sur une page prégénérée.
 */
export default function TunnelAutonome({ lieux }: { lieux: Lieu[] }) {
  const params = useSearchParams();
  const texte = (cle: string) => params.get(cle) ?? undefined;
  const entierPositif = (cle: string) => {
    const n = Number(params.get(cle));
    return Number.isInteger(n) && n > 0 ? n : undefined;
  };

  /*
    Le retour aussi, et pas seulement l'aller.

    Quatre paramètres manquaient ici — `returnWhen`, `returnFrom`, `returnTo`,
    `returnPassengers` — alors que la recherche de l'accueil les met dans l'URL et
    que le tunnel sait les recevoir : la version traduite les passait déjà. Un
    visiteur qui avait coché « aller-retour », choisi une autre station de départ
    au retour et annoncé un groupe différent arrivait donc sur un tunnel qui n'en
    savait rien, et se voyait proposer le prix d'un aller simple. Sa saisie était
    perdue en silence, à l'écran qui devait la lui confirmer.
  */
  return (
    <Tunnel
      lieux={lieux}
      depart={texte("from")}
      arrivee={texte("to")}
      quand={texte("when")}
      passagersInitial={entierPositif("passengers")}
      retourQuand={texte("returnWhen")}
      retourDepart={texte("returnFrom")}
      retourArrivee={texte("returnTo")}
      retourPassagersInitial={entierPositif("returnPassengers")}
    />
  );
}
