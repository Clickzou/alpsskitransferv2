"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { chercherLieux, type Lieu } from "@/lib/reservation/lieux";

/**
 * Champ de recherche d'un lieu, avec suggestions.
 *
 * Un seul champ pour tout : aéroport, station, ou adresse libre. Ce qui est
 * connu du registre porte un slug et donne un prix ferme ; ce qui est tapé
 * librement (une gare, un hôtel, une adresse) est accepté tel quel et bascule le
 * parcours vers une demande de devis — mieux vaut un devis qu'un prix inventé.
 *
 * Le composant est un `combobox` au sens ARIA : navigation au clavier, état
 * annoncé, option active liée. Un formulaire de réservation qui ne se remplit
 * qu'à la souris exclut une partie des clients.
 */

export interface ValeurLieu {
  /** Slug du registre, ou `null` si c'est une adresse libre. */
  slug: string | null;
  /** Ce qui est affiché dans le champ, et envoyé au serveur si `slug` est nul. */
  texte: string;
}

const ICONES: Record<Lieu["type"], string> = {
  aeroport: "✈",
  station: "⛰",
  adresse: "📍",
};

export default function ChampLieu({
  lieux,
  valeur,
  onChange,
  etiquette,
  placeholder,
  id,
  requis = false,
}: {
  lieux: Lieu[];
  valeur: ValeurLieu;
  onChange: (v: ValeurLieu) => void;
  etiquette: string;
  placeholder?: string;
  id?: string;
  requis?: boolean;
}) {
  const genere = useId();
  const idChamp = id ?? genere;
  const idListe = `${idChamp}-suggestions`;
  const [ouvert, setOuvert] = useState(false);
  const [actif, setActif] = useState(-1);
  const conteneur = useRef<HTMLDivElement>(null);

  const suggestions = useMemo(
    () => (ouvert ? chercherLieux(lieux, valeur.texte) : []),
    [lieux, valeur.texte, ouvert],
  );

  // Un clic à l'extérieur ferme la liste : sans cela, elle reste ouverte
  // au-dessus du reste du formulaire.
  useEffect(() => {
    function dehors(evenement: MouseEvent) {
      if (!conteneur.current?.contains(evenement.target as Node)) setOuvert(false);
    }
    document.addEventListener("mousedown", dehors);
    return () => document.removeEventListener("mousedown", dehors);
  }, []);

  function choisir(lieu: Lieu) {
    onChange({ slug: lieu.slug, texte: lieu.nom });
    setOuvert(false);
    setActif(-1);
  }

  function auClavier(evenement: React.KeyboardEvent<HTMLInputElement>) {
    if (evenement.key === "Escape") {
      setOuvert(false);
      return;
    }
    if (suggestions.length === 0) return;
    if (evenement.key === "ArrowDown") {
      evenement.preventDefault();
      setActif((i) => (i + 1) % suggestions.length);
    } else if (evenement.key === "ArrowUp") {
      evenement.preventDefault();
      setActif((i) => (i <= 0 ? suggestions.length - 1 : i - 1));
    } else if (evenement.key === "Enter" && ouvert) {
      // Entrée sans avoir navigué prend la première suggestion : c'est ce que
      // fait le visiteur pressé, et le premier résultat est le bon dans la
      // grande majorité des cas.
      evenement.preventDefault();
      choisir(suggestions[actif === -1 ? 0 : actif]);
    }
  }

  const champ =
    "mt-1 w-full min-w-0 rounded border border-glacier-300 bg-white px-3 py-2 text-sm text-alpine focus:border-alpes focus:outline-none focus:ring-2 focus:ring-alpes/30";

  return (
    <div className="relative min-w-0" ref={conteneur}>
      <label
        className="block text-xs font-semibold uppercase tracking-wide text-alpine-600"
        htmlFor={idChamp}
      >
        {etiquette}
      </label>
      <input
        id={idChamp}
        className={champ}
        value={valeur.texte}
        placeholder={placeholder}
        required={requis}
        autoComplete="off"
        role="combobox"
        aria-expanded={ouvert && suggestions.length > 0}
        aria-controls={idListe}
        aria-autocomplete="list"
        aria-activedescendant={
          ouvert && actif >= 0 && suggestions.length > 0 ? `${idListe}-${actif}` : undefined
        }
        onChange={(e) => {
          // Toute frappe efface le slug : le texte ne correspond plus forcément
          // à un lieu du registre, et le prix ne doit pas rester celui d'avant.
          onChange({ slug: null, texte: e.target.value });
          setOuvert(true);
          setActif(-1);
        }}
        onFocus={() => setOuvert(true)}
        onKeyDown={auClavier}
      />

      {ouvert && suggestions.length > 0 ? (
        <ul
          id={idListe}
          role="listbox"
          className="absolute z-20 mt-1 max-h-72 w-full overflow-auto rounded border border-glacier-200 bg-white shadow-flottant"
        >
          {suggestions.map((lieu, i) => (
            <li
              key={`${lieu.type}-${lieu.slug}`}
              id={`${idListe}-${i}`}
              role="option"
              aria-selected={i === actif}
              className={`flex cursor-pointer items-center justify-between gap-3 px-3 py-2 text-sm ${
                i === actif ? "bg-alpes-50 text-alpine" : "text-alpine-700"
              }`}
              onMouseEnter={() => setActif(i)}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => choisir(lieu)}
            >
              <span className="flex items-center gap-2">
                <span aria-hidden="true" className="text-alpes">
                  {ICONES[lieu.type]}
                </span>
                {lieu.nom}
              </span>
              <span className="shrink-0 text-xs text-alpine-600">{lieu.detail}</span>
            </li>
          ))}
        </ul>
      ) : null}

      {valeur.texte.length >= 2 && !valeur.slug && !ouvert ? (
        <p className="mt-1 text-xs text-alpine-600">
          Free-text address — we will confirm the price by email.
        </p>
      ) : null}
    </div>
  );
}
