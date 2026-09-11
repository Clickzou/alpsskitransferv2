"use client";

import { useActionState, useRef, useState } from "react";
import { actionCreerTelephone } from "./actions";

/**
 * Le formulaire de la réservation téléphonique.
 *
 * Il se remplit pendant l'appel, dans l'ordre où l'on pose les questions :
 * qui, quel trajet, quand, combien, puis le prix et le paiement. « Calculer le
 * prix » interroge la même route que le tunnel du site (`/api/devis`) et
 * pré-remplit le prix de la grille ; l'exploitant peut le corriger. Le serveur
 * recalcule tout au moment de créer la réservation — ce que le formulaire
 * affiche n'engage rien.
 *
 * `useActionState` : le formulaire fonctionne sans JavaScript, et une erreur
 * du serveur s'affiche au-dessus du bouton sans rien perdre de la saisie.
 */

interface Option {
  slug: string;
  nom: string;
}

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

export default function FormulaireTelephone({
  aeroports,
  stations,
  ibanConfigure,
}: {
  aeroports: Option[];
  stations: Option[];
  ibanConfigure: boolean;
}) {
  const [erreur, action, enCours] = useActionState(actionCreerTelephone, null);
  const formulaire = useRef<HTMLFormElement>(null);
  const [allerRetour, setAllerRetour] = useState(false);
  const [mode, setMode] = useState<"carte" | "virement">("carte");
  const [prix, setPrix] = useState("");
  const [prixGrille, setPrixGrille] = useState<number | null>(null);
  const [calcul, setCalcul] = useState<string | null>(null);

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
          from: valeur("from"),
          to: valeur("to"),
          when: valeur("when"),
          passengers: valeur("passengers"),
          bags: valeur("bags"),
          skis: valeur("skis"),
          ...(allerRetour
            ? {
                returnWhen: valeur("returnWhen"),
                returnFrom: valeur("returnFrom"),
                returnTo: valeur("returnTo"),
                returnPassengers: valeur("returnPassengers"),
              }
            : {}),
        }),
      });
      const donnees = await reponse.json();
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

  const champ =
    "mt-1 w-full rounded border border-glacier-300 bg-white px-3 py-2 text-sm text-alpine focus:border-alpes focus:outline-none focus:ring-2 focus:ring-alpes/40";
  const etiquette = "block text-xs font-medium uppercase tracking-wide text-alpine-600";
  const bloc = "rounded-xl border border-glacier-200 bg-white p-5 shadow-carte";
  const titre = "font-display text-lg text-alpine";

  const Liste = ({ nom, options, vide }: { nom: string; options: Option[]; vide?: string }) => (
    <select name={nom} required={!vide} defaultValue="" className={champ}>
      <option value="">{vide ?? "— choisir —"}</option>
      {options.map((o) => (
        <option key={o.slug} value={o.slug}>
          {o.nom}
        </option>
      ))}
    </select>
  );

  return (
    <form ref={formulaire} action={action} className="mt-6 space-y-6">
      <section className={bloc}>
        <h2 className={titre}>Le client</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <label className={etiquette}>
            Nom
            <input name="nom" required maxLength={120} className={champ} />
          </label>
          <label className={etiquette}>
            Téléphone
            <input name="telephone" type="tel" required maxLength={40} className={champ} />
          </label>
          <label className={etiquette}>
            E-mail
            <input name="email" type="email" required maxLength={160} className={champ} />
          </label>
          <label className={etiquette}>
            Langue des e-mails
            <select name="langue" defaultValue="fr" className={champ}>
              {LANGUES.map((l) => (
                <option key={l.valeur} value={l.valeur}>
                  {l.nom}
                </option>
              ))}
            </select>
          </label>
        </div>
      </section>

      <section className={bloc}>
        <h2 className={titre}>L’aller</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <label className={etiquette}>
            Aéroport de départ
            <Liste nom="from" options={aeroports} />
          </label>
          <label className={etiquette}>
            Station d’arrivée
            <Liste nom="to" options={stations} />
          </label>
          <label className={etiquette}>
            Prise en charge (heure locale)
            <input name="when" type="datetime-local" required className={champ} />
          </label>
          <label className={etiquette}>
            Numéro de vol
            <input name="vol" maxLength={20} className={champ} />
          </label>
          <label className={etiquette}>
            Passagers (enfants compris)
            <input name="passengers" type="number" min={1} max={8} defaultValue={2} required className={champ} />
          </label>
          <label className={etiquette}>
            Véhicule
            <select name="vehicle" defaultValue="standard" className={champ}>
              {VEHICULES.map((v) => (
                <option key={v.valeur} value={v.valeur}>
                  {v.nom}
                </option>
              ))}
            </select>
          </label>
          <label className={`${etiquette} md:col-span-2`}>
            Adresse en station
            <input name="adresse" maxLength={300} placeholder="Chalet, hôtel ou résidence — facultatif, le client pourra la donner" className={champ} />
          </label>
        </div>
      </section>

      <section className={bloc}>
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
            <label className={etiquette}>
              Prise en charge du retour (heure locale)
              <input name="returnWhen" type="datetime-local" required className={champ} />
            </label>
            <label className={etiquette}>
              Vol retour
              <input name="volRetour" maxLength={20} className={champ} />
            </label>
            <label className={etiquette}>
              Station de départ du retour
              <Liste nom="returnFrom" options={stations} vide="— la même qu’à l’aller —" />
            </label>
            <label className={etiquette}>
              Aéroport d’arrivée du retour
              <Liste nom="returnTo" options={aeroports} vide="— le même qu’à l’aller —" />
            </label>
            <label className={etiquette}>
              Passagers au retour
              <input name="returnPassengers" type="number" min={1} max={8} placeholder="les mêmes" className={champ} />
            </label>
            <label className={etiquette}>
              Véhicule du retour
              <select name="vehicleReturn" defaultValue="" className={champ}>
                <option value="">— le même qu’à l’aller —</option>
                {VEHICULES.map((v) => (
                  <option key={v.valeur} value={v.valeur}>
                    {v.nom}
                  </option>
                ))}
              </select>
            </label>
            <label className={`${etiquette} md:col-span-2`}>
              Adresse de prise en charge au retour
              <input name="adresseRetour" maxLength={300} placeholder="Vide = la même qu’à l’aller" className={champ} />
            </label>
          </div>
        ) : null}
      </section>

      <section className={bloc}>
        <h2 className={titre}>Bagages et enfants</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <label className={etiquette}>
            Valises
            <input name="bags" type="number" min={0} max={12} defaultValue={2} className={champ} />
          </label>
          <label className={etiquette}>
            Housses à skis
            <input name="skis" type="number" min={0} max={12} defaultValue={0} className={champ} />
          </label>
          <label className={etiquette}>
            Âges des enfants
            <input name="ages" maxLength={120} placeholder="ex. 3 et 7" className={champ} />
          </label>
          <label className={etiquette}>
            Enfants à l’aller
            <input name="enfants" type="number" min={0} max={8} defaultValue={0} className={champ} />
          </label>
          {allerRetour ? (
            <label className={etiquette}>
              Enfants au retour
              <input name="enfantsRetour" type="number" min={0} max={8} defaultValue={0} className={champ} />
            </label>
          ) : null}
          <label className={`${etiquette} md:col-span-3`}>
            Message ou précision
            <textarea name="message" rows={2} maxLength={2000} className={champ} />
          </label>
        </div>
      </section>

      <section className={bloc}>
        <h2 className={titre}>Le prix et le paiement</h2>
        <div className="mt-4 flex flex-wrap items-end gap-4">
          <button
            type="button"
            onClick={calculerPrix}
            className="rounded border border-glacier-300 px-4 py-2 text-sm font-semibold text-alpine-700 transition hover:border-alpine/40 hover:bg-glacier-50"
          >
            Calculer le prix de la grille
          </button>
          <label className={etiquette}>
            Prix appliqué (€)
            <input
              name="prix"
              inputMode="decimal"
              value={prix}
              onChange={(e) => setPrix(e.target.value)}
              placeholder="grille"
              className={`${champ} w-32`}
            />
          </label>
          {prixGrille !== null ? (
            <p className="text-sm text-alpine-600">
              Grille : {prixGrille} €
              {prix && Number(prix.replace(",", ".")) !== prixGrille ? " · prix corrigé, noté dans l’historique" : ""}
            </p>
          ) : null}
        </div>
        {calcul ? <p className="mt-2 text-sm text-marque">{calcul}</p> : null}
        <p className="mt-2 text-xs text-alpine-600">
          Laissé vide, le prix est celui de la grille, recalculé par le serveur.
        </p>

        <fieldset className="mt-5">
          <legend className={etiquette}>Paiement</legend>
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
            <p className="mt-2 text-xs text-marque">
              L’IBAN n’est pas encore configuré (IBAN_VIREMENT) : l’e-mail annoncera les coordonnées bancaires sans les donner.
            </p>
          ) : null}
        </fieldset>
      </section>

      {erreur ? (
        <p role="alert" className="rounded border border-marque/30 bg-marque/5 px-4 py-3 text-sm text-marque">
          {erreur}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={enCours}
        className="rounded bg-marque px-6 py-3 text-sm font-semibold text-white transition hover:bg-marque-600 disabled:opacity-60"
      >
        {enCours ? "Création…" : "Créer la réservation et écrire au client"}
      </button>
    </form>
  );
}
