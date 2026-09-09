"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import {
  CLE_PANIER,
  MAX_LIGNES,
  identifiant,
  lirePanier,
  type LignePanier,
} from "@/lib/reservation/panier";

interface Contexte {
  lignes: LignePanier[];
  /** Nombre de courses — c'est lui qu'affiche la pastille du menu. */
  nombre: number;
  ajouter: (ligne: Omit<LignePanier, "id">) => "ajoute" | "deja-present" | "plein";
  retirer: (id: string) => void;
  vider: () => void;
  /** Faux avant la lecture du stockage : évite d'afficher « 0 » puis « 2 ». */
  pret: boolean;
}

const PanierContexte = createContext<Contexte | null>(null);

/**
 * L'état du panier, partagé par l'en-tête et la page `/cart/`.
 *
 * Il vit dans le `localStorage` du visiteur : rien ne part au serveur tant qu'il
 * ne paie pas, et son panier survit à la fermeture de l'onglet — un séjour se
 * réserve rarement d'une traite.
 *
 * Deux précautions qui ne se voient pas :
 *
 * · **`pret`** — le stockage n'est lisible qu'une fois le composant monté. Sans
 *   ce drapeau, la pastille afficherait « 0 » au premier rendu puis le vrai
 *   compte, ce qui produit un clignotement et une divergence d'hydratation.
 * · **L'écoute de `storage`** — deux onglets ouverts sur le site partagent le
 *   même panier. Sans elle, l'un ajoute une course et l'autre l'ignore, puis
 *   l'écrase à son tour.
 */
export function PanierProvider({ children }: { children: React.ReactNode }) {
  const [lignes, setLignes] = useState<LignePanier[]>([]);
  const [pret, setPret] = useState(false);

  useEffect(() => {
    setLignes(lirePanier(window.localStorage.getItem(CLE_PANIER)));
    setPret(true);

    const surStockage = (evenement: StorageEvent) => {
      if (evenement.key === CLE_PANIER) setLignes(lirePanier(evenement.newValue));
    };
    window.addEventListener("storage", surStockage);
    return () => window.removeEventListener("storage", surStockage);
  }, []);

  const enregistrer = useCallback((suivantes: LignePanier[]) => {
    setLignes(suivantes);
    try {
      window.localStorage.setItem(CLE_PANIER, JSON.stringify(suivantes));
    } catch {
      // Stockage plein ou navigation privée verrouillée : le panier vit alors
      // le temps de la visite. Mieux vaut ça qu'une erreur en pleine commande.
    }
  }, []);

  const ajouter = useCallback<Contexte["ajouter"]>(
    (ligne) => {
      const id = identifiant(ligne);
      if (lignes.some((l) => l.id === id)) return "deja-present";
      if (lignes.length >= MAX_LIGNES) return "plein";
      enregistrer([...lignes, { ...ligne, id }]);
      return "ajoute";
    },
    [lignes, enregistrer],
  );

  const retirer = useCallback(
    (id: string) => enregistrer(lignes.filter((l) => l.id !== id)),
    [lignes, enregistrer],
  );

  const vider = useCallback(() => enregistrer([]), [enregistrer]);

  const valeur = useMemo(
    () => ({ lignes, nombre: lignes.length, ajouter, retirer, vider, pret }),
    [lignes, ajouter, retirer, vider, pret],
  );

  return <PanierContexte.Provider value={valeur}>{children}</PanierContexte.Provider>;
}

/**
 * Accès au panier.
 *
 * Renvoie un panier vide hors du fournisseur plutôt que de lever : le silo
 * français n'a pas encore de panier, et un composant partagé ne doit pas s'y
 * casser.
 */
export function usePanier(): Contexte {
  return (
    useContext(PanierContexte) ?? {
      lignes: [],
      nombre: 0,
      ajouter: () => "plein",
      retirer: () => {},
      vider: () => {},
      pret: false,
    }
  );
}
