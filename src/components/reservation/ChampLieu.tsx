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
 * Les suggestions viennent de deux sources, dans cet ordre :
 *
 * 1. **Le registre**, embarqué dans le navigateur : instantané, et le seul à
 *    donner un prix ferme. Il reste donc toujours en tête de liste.
 * 2. **Un géocodeur**, interrogé par `/api/lieux` quand la saisie ressemble à une
 *    adresse : hôtels, chalets, gares, rues. Un transfert se termine rarement
 *    « à Val Thorens », il se termine à une adresse, et le visiteur doit pouvoir
 *    la saisir sans quitter le formulaire.
 *
 * L'appel distant est différé de 250 ms et annulé à la frappe suivante : une
 * requête par caractère saturerait le géocodeur pour rien. Son échec est muet —
 * le visiteur garde les suggestions locales et peut toujours valider sa saisie.
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
  /*
   * Code postal et commune, pour une adresse. Renseignés automatiquement quand
   * le visiteur choisit une suggestion, demandés à part sinon : un chauffeur ne
   * se rend pas à « chez moi », et une adresse sans commune n'est pas une
   * adresse. Ils ne concernent jamais un aéroport ni une station.
   */
  codePostal?: string;
  ville?: string;
}

/** Une adresse est complète quand on sait dans quelle commune elle se trouve. */
export function adresseComplete(valeur: ValeurLieu): boolean {
  return valeur.slug !== null || (!!valeur.ville?.trim() && !!valeur.codePostal?.trim());
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
  langue = "en",
  adressesDistantes = true,
  variante = "clair",
}: {
  lieux: Lieu[];
  valeur: ValeurLieu;
  onChange: (v: ValeurLieu) => void;
  etiquette: string;
  placeholder?: string;
  id?: string;
  requis?: boolean;
  /** Langue des suggestions d'adresses. */
  langue?: string;
  /** À couper si le géocodeur n'a rien à apporter — un champ d'aéroport seul. */
  adressesDistantes?: boolean;
  /** `sombre` pour les champs posés sur le bandeau bleu nuit de la home. */
  variante?: "clair" | "sombre";
}) {
  const genere = useId();
  const idChamp = id ?? genere;
  const idListe = `${idChamp}-suggestions`;
  const [ouvert, setOuvert] = useState(false);
  const [actif, setActif] = useState(-1);
  const conteneur = useRef<HTMLDivElement>(null);

  const [adresses, setAdresses] = useState<Lieu[]>([]);
  const [complementOuvert, setComplementOuvert] = useState(false);

  const locales = useMemo(
    () => (ouvert ? chercherLieux(lieux, valeur.texte) : []),
    [lieux, valeur.texte, ouvert],
  );

  /*
   * Les adresses complètent les résultats locaux, elles ne les remplacent pas :
   * une station connue passe devant, parce qu'elle seule donne un prix ferme.
   * On en garde au plus quatre, pour que la liste reste lisible sans défilement.
   */
  const suggestions = useMemo(() => {
    if (!ouvert) return [];
    const vus = new Set(locales.map((l) => l.nom.toLowerCase()));
    return [...locales, ...adresses.filter((a) => !vus.has(a.nom.toLowerCase()))].slice(0, 10);
  }, [ouvert, locales, adresses]);

  // Interrogation du géocodeur, différée et annulable.
  useEffect(() => {
    const saisie = valeur.texte.trim();
    if (!ouvert || saisie.length < 3 || !adressesDistantes) {
      setAdresses([]);
      return;
    }
    const controleur = new AbortController();
    const minuteur = setTimeout(async () => {
      try {
        const reponse = await fetch(
          `/api/lieux/?q=${encodeURIComponent(saisie)}&lang=${langue}`,
          { signal: controleur.signal },
        );
        if (!reponse.ok) return;
        const donnees = (await reponse.json()) as { lieux?: Lieu[] };
        setAdresses((donnees.lieux ?? []).slice(0, 4));
      } catch {
        // Abandon volontaire ou service indisponible : les suggestions locales
        // suffisent, et le champ accepte de toute façon le texte libre.
      }
    }, 250);
    return () => {
      controleur.abort();
      clearTimeout(minuteur);
    };
  }, [valeur.texte, ouvert, langue, adressesDistantes]);

  // Un clic à l'extérieur ferme la liste : sans cela, elle reste ouverte
  // au-dessus du reste du formulaire.
  useEffect(() => {
    function dehors(evenement: MouseEvent) {
      if (!conteneur.current?.contains(evenement.target as Node)) setOuvert(false);
    }
    document.addEventListener("mousedown", dehors);
    return () => document.removeEventListener("mousedown", dehors);
  }, []);

  /**
   * Ce qui s'écrit dans le champ après un choix.
   *
   * Une adresse s'y écrit **en entier** — voie, code postal, commune — parce que
   * c'est ce que le visiteur relit pour vérifier, et ce que le chauffeur devra
   * saisir. « 8 Golf Palmola » seul ne dit pas où l'on va ; « 8 Golf Palmola,
   * 31660 Buzet-sur-Tarn » le dit. Un aéroport ou une station gardent leur nom :
   * ils sont uniques au registre, un code postal ne leur ajoute rien.
   */
  function libelleComplet(lieu: Lieu): string {
    if (lieu.slug) return lieu.nom;
    const commune = [lieu.codePostal, lieu.ville].map((x) => x?.trim()).filter(Boolean).join(" ");
    return commune && !lieu.nom.includes(commune) ? `${lieu.nom}, ${commune}` : lieu.nom;
  }

  function choisir(lieu: Lieu) {
    onChange({
      slug: lieu.slug,
      texte: libelleComplet(lieu),
      codePostal: lieu.codePostal,
      ville: lieu.ville,
    });
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

  /*
   * On ne réclame le complément qu'une fois la saisie posée : l'afficher pendant
   * la frappe ferait apparaître et disparaître deux champs à chaque caractère.
   */
  /*
   * Le complément s'ouvre quand l'adresse n'est pas reconnue, et **reste**
   * ouvert : le masquer dès que la ville est saisie faisait disparaître le champ
   * sous les doigts du visiteur au moment précis où il finissait de le remplir.
   * Il ne se referme qu'en choisissant une suggestion, ou en vidant le champ.
   */
  const adresseLibre = !valeur.slug && valeur.texte.trim().length >= 3;

  useEffect(() => {
    if (!adresseLibre) setComplementOuvert(false);
    else if (!ouvert && !adresseComplete(valeur)) setComplementOuvert(true);
  }, [adresseLibre, ouvert, valeur]);

  const complementRequis = complementOuvert && adresseLibre;

  const sombre = variante === "sombre";
  const champ = `mt-1 w-full min-w-0 rounded border bg-white px-3 py-2 text-sm text-alpine focus:border-alpes focus:outline-none focus:ring-2 focus:ring-alpes/40 ${
    sombre ? "border-alpine-700 bg-white/95" : "border-glacier-300"
  }`;

  return (
    <div className="relative min-w-0" ref={conteneur}>
      <label
        className={`block text-xs font-semibold uppercase tracking-wide ${
          sombre ? "text-glacier-300" : "text-alpine-600"
        }`}
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
          onChange({
            slug: null,
            texte: e.target.value,
            codePostal: undefined,
            ville: undefined,
          });
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
              key={`${lieu.type}-${lieu.slug ?? lieu.nom}-${i}`}
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

      {/*
        Le complément n'apparaît que pour une adresse tapée à la main que le
        géocodeur n'a pas confirmée. Demander code postal et ville d'entrée de
        jeu aurait alourdi le formulaire pour tous ceux — la grande majorité —
        qui choisissent une suggestion, laquelle les apporte déjà.
      */}
      {complementRequis ? (
        <div className="mt-2">
          <p className={`text-xs ${sombre ? "text-glacier-300" : "text-alpine-600"}`}>
            {langue === "fr"
              ? "Adresse non reconnue — précisez la commune :"
              : "Address not recognised — tell us the town:"}
          </p>
          <div className="mt-1 grid grid-cols-[7rem_1fr] gap-2">
            <input
              className={champ.replace("mt-1 ", "")}
              value={valeur.codePostal ?? ""}
              onChange={(e) => onChange({ ...valeur, codePostal: e.target.value })}
              placeholder={langue === "fr" ? "Code postal" : "Postcode"}
              aria-label={langue === "fr" ? "Code postal" : "Postcode"}
              autoComplete="postal-code"
              inputMode="numeric"
              required={requis}
            />
            <input
              className={champ.replace("mt-1 ", "")}
              value={valeur.ville ?? ""}
              onChange={(e) => onChange({ ...valeur, ville: e.target.value })}
              placeholder={langue === "fr" ? "Ville" : "Town"}
              aria-label={langue === "fr" ? "Ville" : "Town"}
              autoComplete="address-level2"
              required={requis}
            />
          </div>
        </div>
      ) : null}

    </div>
  );
}
