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
  const passagers = Number(params.get("passengers"));

  return (
    <Tunnel
      lieux={lieux}
      depart={texte("from")}
      arrivee={texte("to")}
      quand={texte("when")}
      passagersInitial={Number.isInteger(passagers) && passagers > 0 ? passagers : undefined}
    />
  );
}
