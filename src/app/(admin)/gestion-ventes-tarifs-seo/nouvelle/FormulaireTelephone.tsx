"use client";

import { startTransition, useActionState, useRef, useState } from "react";
import ChampLieu, { type ValeurLieu } from "@/components/reservation/ChampLieu";
import { normaliser, type Lieu } from "@/lib/reservation/lieux";
import { actionCreerTelephone } from "./actions";

/**
 * Le formulaire de la réservation téléphonique.
 *
 * Il se remplit pendant l'appel, dans l'ordre où l'on pose les questions :
 * qui, quel trajet, quand, combien, puis le prix et le paiement. « Calculer le
 * prix » interroge la même route que le tunnel du site (`/api/devis`) ; le
 * serveur recalcule tout au moment de créer la réservation.
 *
 * ## Ce qu'il ne doit jamais faire pendant un appel (revue du 11 septembre)
 *
 * - **Perdre la saisie.** Les listes étaient définies dans le composant : React
 *   les recréait à chaque frappe, et cocher « Aller-retour » remettait
 *   l'aéroport et la station à zéro. Et un `<form action>` se vide après
 *   chaque envoi, même refusé : l'envoi passe donc par `onSubmit`, qui ne vide
 *   rien, et une erreur s'affiche au-dessus d'une saisie intacte.
 * - **Garder un prix périmé.** Le prix calculé restait affiché quand on changeait
 *   de véhicule, puis était facturé comme un prix « corrigé ». Il s'efface dès
 *   qu'un champ du trajet change, et le serveur refuse un prix calculé sur un
 *   autre trajet.
 * - **Créer deux fois.** La référence est tirée à l'ouverture de la page : un
 *   second envoi retrouve la réservation au lieu d'en créer une autre.
 *
 * ## Les lieux (demande de JC, 14 septembre 2026)
 *
 * Les champs de lieu sont ceux du site (`ChampLieu`) : aéroport, station, ou
 * adresse — un hôtel à Lyon, une gare, un chalet. Un aéroport et une station de
 * la liste donnent le prix de la grille ; une adresse n'en a pas, et le prix
 * convenu au téléphone devient obligatoire.
 */

const VEHICULES = [
  { valeur: "standard", nom: "Standard (8 places)" },
  { valeur: "business", nom: "Business (7 places)" },
  { valeur: "premium", nom: "Premium (4 places)" },
];

const LANGUES = [
  { valeur: "fr", nom: "Français" },
  { valeur: "en", nom: "Anglais" },
  { valeur: "de", nom: "Allemand" },
  { valeur: "it", nom: "Italien" },
];

/** Les champs qui changent le prix : en toucher un efface le prix calculé. */
const CHAMPS_DU_TRAJET = new Set([
  "from",
  "to",
  "when",
  "returnWhen",
  "returnFrom",
  "returnTo",
  "passengers",
  "returnPassengers",
  "bags",
  "skis",
  "vehicle",
  "vehicleReturn",
  "allerRetour",
]);

const CHAMP =
  "mt-1 w-full rounded border border-glacier-300 bg-white px-3 py-2 text-sm text-alpine focus:border-alpes focus:outline-none focus:ring-2 focus:ring-alpes/40";
const ETIQUETTE = "block text-xs font-medium uppercase tracking-wide text-alpine-600";
const BLOC = "rounded-xl border border-glacier-200 bg-white p-5 shadow-carte";
const TITRE = "font-display text-lg text-alpine";

const VIDE: ValeurLieu = { slug: null, texte: "" };

/**
 * Ce que le serveur reçoit d'un lieu : le slug s'il est au registre, et le
 * texte complet — avec le code postal et la commune d'une adresse tapée à la
 * main, que le complément du champ a demandés à part.
 */
function LieuCache({ nom, valeur }: { nom: string; valeur: ValeurLieu }) {
  const commune = [valeur.codePostal, valeur.ville].map((x) => x?.trim()).filter(Boolean).join(" ");
  const texte =
    !valeur.slug && commune && !valeur.texte.includes(commune)
      ? `${valeur.texte.trim()}, ${commune}`
      : valeur.texte.trim();
  return (
    <>
      <input type="hidden" name={nom} value={valeur.slug ?? ""} />
      <input type="hidden" name={`${nom}Text`} value={texte} />
    </>
  );
}

/**
 * Le lieu du registre derrière une saisie — revue de JC, 14 septembre 2026 :
 * « Geneva Airport » tapé en entier, sans cliquer la suggestion, restait une
 * adresse libre, et le trajet perdait son prix. Un nom exact vaut le lieu.
 */
function reconnaitre(valeur: ValeurLieu, lieux: Lieu[]): ValeurLieu {
  if (valeur.slug || !valeur.texte.trim()) return valeur;
  const cible = normaliser(valeur.texte);
  const lieu = lieux.find((l) => l.slug && (normaliser(l.nom) === cible || l.cles.includes(cible)));
  return lieu ? { slug: lieu.slug, texte: lieu.nom } : valeur;
}

/** Le texte à envoyer au calcul du prix : le slug, sinon ce qui est tapé. */
const pourDevis = (valeur: ValeurLieu) => valeur.slug ?? (valeur.texte.trim() || undefined);

function Requis() {
  return (
    <span className="text-danger" aria-hidden="true">
      {" "}
      *
    </span>
  );
}

export default function FormulaireTelephone({
  lieux,
  ibanConfigure,
  reference,
}: {
  /** Les aéroports et les stations du registre, comme dans la recherche du site. */
  lieux: Lieu[];
  ibanConfigure: boolean;
  /** Tirée à l'ouverture de la page : deux envois ne créent qu'une réservation. */
  reference: string;
}) {
  const [erreur, action, enCours] = useActionState(actionCreerTelephone, null);
  const formulaire = useRef<HTMLFormElement>(null);
  const [allerRetour, setAllerRetour] = useState(false);
  const [mode, setMode] = useState<"carte" | "virement">("carte");
  const [prix, setPrix] = useState("");
  const [prixGrille, setPrixGrille] = useState<number | null>(null);
  const [calcul, setCalcul] = useState<string | null>(null);
  const [depart, setDepart] = useState<ValeurLieu>(VIDE);
  const [arrivee, setArrivee] = useState<ValeurLieu>(VIDE);
  const [retourDepart, setRetourDepart] = useState<ValeurLieu>(VIDE);
  const [retourArrivee, setRetourArrivee] = useState<ValeurLieu>(VIDE);

  function envoyer(evenement: React.FormEvent<HTMLFormElement>) {
    evenement.preventDefault();
    const donnees = new FormData(evenement.currentTarget);
    startTransition(() => action(donnees));
  }

  function trajetModifie() {
    if (prixGrille === null) return;
    setPrix("");
    setPrixGrille(null);
    setCalcul("Le trajet a changé : recalculez le prix.");
  }

  function surChangement(evenement: React.FormEvent<HTMLFormElement>) {
    const nom = (evenement.target as HTMLInputElement).name;
    if (CHAMPS_DU_TRAJET.has(nom)) trajetModifie();
  }

  /*
    La table chiffre un aéroport vers une station ; le reste — une adresse,
    une station de départ — se mesure au kilomètre au moment du calcul
    (15 septembre 2026). On le dit tout de suite, avant « Calculer ».
  */
  const typeDe = (valeur: ValeurLieu) =>
    valeur.slug ? lieux.find((l) => l.slug === valeur.slug)?.type : undefined;
  const retourDeGrille = (valeur: ValeurLieu) => !valeur.texte.trim() || Boolean(valeur.slug);
  /*
    Une station vers un aéroport — le client qui redescend — se chiffre sur la
    même route que l'aller : la grille est la même dans les deux sens. Pas de
    lieux de retour propres, sinon on ne sait plus quelle route inverser.
  */
  const inverse =
    typeDe(depart) === "station" &&
    typeDe(arrivee) === "aeroport" &&
    (!allerRetour || (!retourDepart.texte.trim() && !retourArrivee.texte.trim()));
  const deGrille =
    inverse ||
    (typeDe(depart) === "aeroport" &&
      typeDe(arrivee) === "station" &&
      (!allerRetour || (retourDeGrille(retourDepart) && retourDeGrille(retourArrivee))));

  /** Un lieu qui change efface le prix calculé, comme les autres champs du trajet. */
  const changerLieu = (setter: (v: ValeurLieu) => void) => (valeur: ValeurLieu) => {
    setter(reconnaitre(valeur, lieux));
    trajetModifie();
  };

  async function calculerPrix() {
    const form = formulaire.current;
    if (!form) return;
    const d = new FormData(form);
    const valeur = (cle: string) => String(d.get(cle) ?? "").trim() || undefined;
    setCalcul("Calcul…");
    try {
      const reponse = await fetch("/api/devis/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          // Dans l'autre sens, la grille se lit aéroport → station : on lui présente la route inversée.
          from: pourDevis(inverse ? arrivee : depart),
          to: pourDevis(inverse ? depart : arrivee),
          when: valeur("when"),
          passengers: valeur("passengers"),
          bags: valeur("bags"),
          skis: valeur("skis"),
          ...(allerRetour
            ? {
                returnWhen: valeur("returnWhen"),
                ...(inverse ? {} : { returnFrom: pourDevis(retourDepart), returnTo: pourDevis(retourArrivee) }),
                returnPassengers: valeur("returnPassengers"),
              }
            : {}),
        }),
      });
      const donnees = await reponse.json();
      if (donnees.devisSurMesure && reponse.ok) {
        setCalcul(
          "Pas de prix automatique : l’adresse n’a pas pu être située, ou le retour part d’un autre lieu. Vérifiez l’adresse (avec code postal et commune), ou saisissez le prix convenu avec le client.",
        );
        return;
      }
      if (!reponse.ok) {
        setCalcul(donnees.erreur ?? "Pas de prix pour ce trajet.");
        return;
      }
      const vehicule = valeur("vehicle") ?? "standard";
      const vehiculeRetour = valeur("vehicleReturn") ?? vehicule;
      const aller = (donnees.options ?? []).find((o: { categorie: string }) => o.categorie === vehicule);
      const retour = allerRetour
        ? (donnees.optionsRetour ?? []).find((o: { categorie: string }) => o.categorie === vehiculeRetour)
        : null;
      if (!aller || (allerRetour && !retour)) {
        setCalcul("Ce véhicule est trop petit pour ce groupe ou ces bagages.");
        return;
      }
      const total = aller.total + (retour?.total ?? 0);
      setPrixGrille(total);
      setPrix(String(total));
      setCalcul(null);
    } catch {
      setCalcul("La connexion a échoué. Réessayez.");
    }
  }

  return (
    <form ref={formulaire} onSubmit={envoyer} onChange={surChangement} className="mt-6 space-y-6">
      <input type="hidden" name="reference" value={reference} />
      <input type="hidden" name="prixGrilleAffiche" value={prixGrille ?? ""} />
      <p className="text-xs text-alpine-600">
        <span className="text-danger">*</span> champ obligatoire
      </p>

      <section className={BLOC}>
        <h2 className={TITRE}>Le client</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <label className={ETIQUETTE}>
            Nom<Requis />
            <input name="nom" required maxLength={120} className={CHAMP} />
          </label>
          <label className={ETIQUETTE}>
            Téléphone<Requis />
            <input name="telephone" type="tel" required maxLength={40} className={CHAMP} />
          </label>
          <label className={ETIQUETTE}>
            E-mail<Requis />
            <input name="email" type="email" required maxLength={160} className={CHAMP} />
          </label>
          <label className={ETIQUETTE}>
            Langue des e-mails<Requis />
            <select name="langue" required defaultValue="" className={CHAMP}>
              <option value="">— choisir —</option>
              {LANGUES.map((l) => (
                <option key={l.valeur} value={l.valeur}>
                  {l.nom}
                </option>
              ))}
            </select>
          </label>
        </div>
      </section>

      <section className={BLOC}>
        <h2 className={TITRE}>L’aller</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div>
            <ChampLieu
              id="depart"
              lieux={lieux}
              valeur={depart}
              onChange={changerLieu(setDepart)}
              etiquette="Lieu de prise en charge *"
              placeholder="Aéroport, station, ou adresse avec code postal"
              langue="fr"
              requis
            />
            <LieuCache nom="from" valeur={depart} />
          </div>
          <div>
            <ChampLieu
              id="arrivee"
              lieux={lieux}
              valeur={arrivee}
              onChange={changerLieu(setArrivee)}
              etiquette="Lieu de dépose *"
              placeholder="Station, ou adresse avec code postal et commune"
              langue="fr"
              requis
            />
            <LieuCache nom="to" valeur={arrivee} />
          </div>
          {depart.texte && arrivee.texte && !deGrille ? (
            <p className="text-xs text-attention-700 md:col-span-2">
              Trajet par une adresse : le prix se calcule au kilomètre avec « Calculer le prix de la
              grille ». Si l’adresse ne se situe pas, saisissez le prix convenu.
            </p>
          ) : null}
          <label className={ETIQUETTE}>
            Prise en charge (heure locale)<Requis />
            <input name="when" type="datetime-local" required className={CHAMP} />
          </label>
          <label className={ETIQUETTE}>
            Numéro de vol <span className="normal-case">(facultatif)</span>
            <input name="vol" maxLength={20} className={CHAMP} />
          </label>
          <label className={ETIQUETTE}>
            Passagers, enfants compris<Requis />
            <input name="passengers" type="number" min={1} max={8} required className={CHAMP} />
          </label>
          <label className={ETIQUETTE}>
            Véhicule<Requis />
            <select name="vehicle" defaultValue="standard" className={CHAMP}>
              {VEHICULES.map((v) => (
                <option key={v.valeur} value={v.valeur}>
                  {v.nom}
                </option>
              ))}
            </select>
          </label>
          <label className={`${ETIQUETTE} md:col-span-2`}>
            Adresse en station{" "}
            <span className="normal-case">
              (facultatif — le client pourra la donner ; inutile si la dépose est déjà une adresse)
            </span>
            <input name="adresse" maxLength={300} placeholder="Chalet, hôtel ou résidence" className={CHAMP} />
          </label>
        </div>
      </section>

      <section className={BLOC}>
        <label className="flex items-center gap-2 text-sm font-semibold text-alpine">
          <input
            type="checkbox"
            name="allerRetour"
            checked={allerRetour}
            onChange={(e) => setAllerRetour(e.target.checked)}
            className="h-4 w-4"
          />
          Aller-retour
        </label>

        {allerRetour ? (
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <label className={ETIQUETTE}>
              Prise en charge du retour (heure locale)<Requis />
              <input name="returnWhen" type="datetime-local" required className={CHAMP} />
            </label>
            <label className={ETIQUETTE}>
              Vol retour <span className="normal-case">(facultatif)</span>
              <input name="volRetour" maxLength={20} className={CHAMP} />
            </label>
            <div>
              <ChampLieu
                id="retour-depart"
                lieux={lieux}
                valeur={retourDepart}
                onChange={changerLieu(setRetourDepart)}
                etiquette="Prise en charge du retour"
                placeholder="vide = le lieu de dépose de l’aller"
                langue="fr"
              />
              <LieuCache nom="returnFrom" valeur={retourDepart} />
            </div>
            <div>
              <ChampLieu
                id="retour-arrivee"
                lieux={lieux}
                valeur={retourArrivee}
                onChange={changerLieu(setRetourArrivee)}
                etiquette="Dépose du retour"
                placeholder="vide = le lieu de prise en charge de l’aller"
                langue="fr"
              />
              <LieuCache nom="returnTo" valeur={retourArrivee} />
            </div>
            <label className={ETIQUETTE}>
              Passagers au retour
              <input name="returnPassengers" type="number" min={1} max={8} placeholder="les mêmes" className={CHAMP} />
            </label>
            <label className={ETIQUETTE}>
              Véhicule du retour
              <select name="vehicleReturn" defaultValue="" className={CHAMP}>
                <option value="">— le même qu’à l’aller —</option>
                {VEHICULES.map((v) => (
                  <option key={v.valeur} value={v.valeur}>
                    {v.nom}
                  </option>
                ))}
              </select>
            </label>
            <label className={`${ETIQUETTE} md:col-span-2`}>
              Adresse de prise en charge au retour <span className="normal-case">(vide = la même qu’à l’aller)</span>
              <input name="adresseRetour" maxLength={300} className={CHAMP} />
            </label>
          </div>
        ) : null}
      </section>

      <section className={BLOC}>
        <h2 className={TITRE}>Bagages et enfants</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <label className={ETIQUETTE}>
            Valises
            <input name="bags" type="number" min={0} max={12} placeholder="0" className={CHAMP} />
          </label>
          <label className={ETIQUETTE}>
            Housses à skis
            <input name="skis" type="number" min={0} max={12} placeholder="0" className={CHAMP} />
          </label>
          <label className={ETIQUETTE}>
            Âges des enfants
            <input name="ages" maxLength={120} placeholder="ex. 3 et 7" className={CHAMP} />
          </label>
          <label className={ETIQUETTE}>
            Enfants à l’aller
            <input name="enfants" type="number" min={0} max={8} placeholder="0" className={CHAMP} />
          </label>
          {allerRetour ? (
            <label className={ETIQUETTE}>
              Enfants au retour
              <input name="enfantsRetour" type="number" min={0} max={8} placeholder="comme à l’aller" className={CHAMP} />
            </label>
          ) : null}
          <label className={`${ETIQUETTE} md:col-span-3`}>
            Message ou précision
            <textarea name="message" rows={2} maxLength={2000} className={CHAMP} />
          </label>
        </div>
      </section>

      <section className={BLOC}>
        <h2 className={TITRE}>Le prix et le paiement</h2>
        <div className="mt-4 flex flex-wrap items-end gap-4">
          <button
            type="button"
            onClick={calculerPrix}
            className="rounded border border-glacier-300 px-4 py-2.5 text-sm font-semibold text-alpine-700 transition hover:border-alpine/40 hover:bg-glacier-50"
          >
            Calculer le prix de la grille
          </button>
          <label className={ETIQUETTE}>
            Prix appliqué (€)
            <input
              name="prix"
              inputMode="decimal"
              value={prix}
              onChange={(e) => setPrix(e.target.value)}
              placeholder="grille"
              className={`${CHAMP} w-32`}
            />
          </label>
          {prixGrille !== null ? (
            <p className="text-sm text-alpine-600">
              Grille : {prixGrille} €
              {prix && Number(prix.replace(",", ".")) !== prixGrille
                ? " · prix corrigé, noté dans l’historique"
                : ""}
            </p>
          ) : null}
        </div>
        {calcul ? <p className="mt-2 text-sm text-attention-700">{calcul}</p> : null}
        <p className="mt-2 text-xs text-alpine-600">
          Laissé vide, le prix est celui de la grille, recalculé par le serveur.
        </p>
        <label className="mt-2 flex items-center gap-2 text-xs text-alpine-700">
          <input type="checkbox" name="confirmerPrix" className="h-4 w-4" />
          Je confirme ce prix, même s’il s’écarte de plus de moitié de la grille
        </label>

        <fieldset className="mt-5">
          <legend className={ETIQUETTE}>
            Paiement<Requis />
          </legend>
          <div className="mt-2 flex flex-wrap gap-6 text-sm text-alpine">
            <label className="flex items-center gap-2">
              <input type="radio" name="mode" value="carte" checked={mode === "carte"} onChange={() => setMode("carte")} />
              Lien de paiement par carte
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="mode" value="virement" checked={mode === "virement"} onChange={() => setMode("virement")} />
              Virement bancaire
            </label>
          </div>
          {mode === "virement" && !ibanConfigure ? (
            <p className="mt-2 text-xs text-attention-700">
              Les coordonnées bancaires ne sont pas encore renseignées : l’e-mail annoncera les
              coordonnées sans les donner. Prévenez Clickzou.
            </p>
          ) : null}
        </fieldset>
      </section>

      {erreur ? (
        <p role="alert" className="rounded border border-danger-300 bg-danger-50 px-4 py-3 text-sm text-danger-700">
          {erreur}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={enCours}
        className="rounded bg-marque px-6 py-3 text-sm font-semibold text-white transition hover:bg-marque-600 disabled:cursor-wait disabled:opacity-60"
      >
        {enCours ? "Création…" : "Créer la réservation et écrire au client"}
      </button>
    </form>
  );
}
