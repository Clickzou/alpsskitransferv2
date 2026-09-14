import { redirect } from "next/navigation";
import { AIRPORTS } from "@/lib/airports";
import { utilisateurCourant } from "@/lib/admin/session";
import { euros, heure } from "@/lib/admin/affichage";
import { VEHICULES } from "@/data/accueil";
import { CAPACITE, CAPACITE_BAGAGES, devisReservation } from "@/lib/reservation/devis";
import { supabaseConfigure } from "@/lib/reservation/supabase";
import { RESORTS_MIGRES } from "@/lib/resorts";
import { baremeValide } from "@/lib/tarification/bareme";
import { coefficientDe, type Grille } from "@/lib/tarification/grille";
import { grilleActive, historiqueGrilles } from "@/lib/tarification/grilles-publiees";
import { composantesAlpes, instantAlpes } from "@/lib/temps";
import BoutonConfirmation from "../BoutonConfirmation";
import Entete from "../Entete";
import { actionRevenirGrille } from "./actions";
import EditeurTarifs, { type FicheVehicule } from "./EditeurTarifs";

/**
 * L'onglet Tarifs — « l'onglet principal » (JC, 11 septembre 2026).
 *
 * En tête, comment un prix se calcule, avec les chiffres en vigueur et un
 * exemple réel : l'exploitant doit pouvoir refaire le calcul de tête avant de
 * toucher à un réglage. Dessous, l'éditeur — règles générales, périodes de
 * saison, coefficients de station, prix fixes —, qui ne publie qu'après un
 * aperçu avant → après. Enfin l'historique des publications, et le retour à
 * une version en un clic.
 */
export const dynamic = "force-dynamic";

const ICI = "/gestion-ventes-tarifs-seo/tarifs/";

const RETOURS: Record<string, { alerte: boolean; texte: string }> = {
  "version-restauree": {
    alerte: false,
    texte: "Version restaurée : elle est republiée et fait les prix des nouvelles réservations.",
  },
  "version-introuvable": { alerte: true, texte: "Cette version est introuvable ou illisible : rien n’a changé." },
  echec: { alerte: true, texte: "L’enregistrement a échoué. Réessayez dans un instant." },
};

const pct = (n: number) => `${String(n).replace(".", ",")} %`;
const nombre = (n: number) => String(n).replace(".", ",");

/** Un exemple chiffré avec la grille en vigueur : le prochain mercredi et samedi à 10 h. */
function exemple(grille: Grille) {
  const dans = new Date(Date.now() + 7 * 24 * 3600 * 1000);
  const jour = (cible: number) => {
    let d = dans;
    while (composantesAlpes(d).jourSemaine !== cible) d = new Date(d.getTime() + 24 * 3600 * 1000);
    const c = composantesAlpes(d);
    return instantAlpes(c.annee, c.mois, c.jour, 10, 0);
  };
  const demande = {
    airport: "geneva-airport",
    resort: "val-thorens",
    categorie: "standard" as const,
    passagers: 2,
  };
  const mercredi = devisReservation({ ...demande, aller: jour(3) }, grille);
  const samedi = devisReservation({ ...demande, aller: jour(6) }, grille);
  if (!mercredi.ok || !samedi.ok) return null;
  const l = mercredi.devis.lignes[0];
  return {
    km: l.km,
    prise: grille.bareme.priseEnCharge.standard,
    taux: grille.bareme.tauxKm.standard,
    coefficient: coefficientDe(grille, "val-thorens"),
    fixe: l.devis.prixFixe,
    mercredi: mercredi.devis.total,
    samedi: samedi.devis.total,
    majorationsMercredi: l.devis.detail.majorations,
  };
}

export default async function PageTarifs({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const utilisateur = await utilisateurCourant();
  if (!utilisateur) redirect(`/gestion-ventes-tarifs-seo/connexion/?suite=${encodeURIComponent(ICI)}`);

  const [grille, historique] = await Promise.all([grilleActive(), historiqueGrilles()]);
  const { fait } = await searchParams;
  const retour = typeof fait === "string" ? RETOURS[fait] : undefined;
  const b = grille.bareme;
  const ex = exemple(grille);

  const stations = RESORTS_MIGRES.map((r) => ({ slug: r.slug, nom: r.name })).sort((x, y) =>
    x.nom.localeCompare(y.nom, "fr"),
  );
  const aeroports = AIRPORTS.map((a) => ({ slug: a.slug, nom: a.name })).sort((x, y) =>
    x.nom.localeCompare(y.nom, "fr"),
  );

  // Les véhicules de la home, avec les capacités que le devis applique vraiment.
  const vehicules: FicheVehicule[] = VEHICULES.categories.map((v) => ({
    cle: v.cle,
    modele: v.modele,
    image: v.image.nom,
    places: CAPACITE[v.cle],
    bagages: CAPACITE_BAGAGES[v.cle],
  }));

  const carte = "rounded-xl border border-glacier-200 bg-white p-5 shadow-carte";

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <Entete email={utilisateur.email} actif="tarifs" />
      <h1 className="mt-6 font-display text-2xl text-alpine">Tarifs</h1>

      {retour ? (
        <p
          role="status"
          className={`mt-4 rounded border px-4 py-3 text-sm ${
            retour.alerte
              ? "border-attention-300 bg-attention-50 text-attention-700"
              : "border-succes-300 bg-succes-50 text-succes-700"
          }`}
        >
          {retour.texte}
        </p>
      ) : null}

      {!supabaseConfigure() ? (
        <p className="mt-4 rounded border border-danger-300 bg-danger-50 px-4 py-3 text-sm text-danger-700">
          La base n’est pas joignable : les tarifs affichés sont ceux d’origine et ne peuvent pas être publiés.
        </p>
      ) : null}

      <section className={`mt-6 ${carte}`}>
        <h2 className="font-display text-lg text-alpine">Comment le prix est calculé</h2>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-alpine-700">
          <li>
            <strong className="text-alpine">Le prix de base</strong> = prise en charge + distance × prix au
            kilomètre, selon le véhicule (Standard {euros(b.priseEnCharge.standard)} + {nombre(b.tauxKm.standard)}{" "}
            €/km, Business {euros(b.priseEnCharge.business)} + {nombre(b.tauxKm.business)} €/km, Premium{" "}
            {euros(b.priseEnCharge.premium)} + {nombre(b.tauxKm.premium)} €/km). La distance est celle de la
            route, de l’aéroport à la station, calculée une fois pour toutes.
          </li>
          <li>
            <strong className="text-alpine">× le coefficient de la station.</strong> 1 = prix normal. Au-dessus,
            la station coûte plus cher à desservir que sa distance ne le dit (route de col, retour à vide) ; en
            dessous, moins.
          </li>
          <li>
            <strong className="text-alpine">Un prix fixe</strong> posé sur un trajet remplace les deux étapes
            précédentes pour ce véhicule. S’il est donné pour le moment du départ (semaine ou week-end, jour ou
            nuit), il comprend déjà les majorations du week-end et de la nuit ; sinon on part du prix « semaine,
            jour » et on les ajoute.
          </li>
          <li>
            <strong className="text-alpine">+ les majorations</strong>, en pourcentage du prix de base : samedi{" "}
            {pct(b.majorations.samedi)}, dimanche {pct(b.majorations.dimanche)}, nuit {pct(b.majorations.nuit)}{" "}
            (prise en charge de {b.plageNuit.debut} h à {b.plageNuit.fin} h — elle s’ajoute à celle du jour)
            {grille.saisons.length > 0
              ? `, et la période de saison du jour de départ (${grille.saisons
                  .map((s) => `${s.nom} ${s.majoration >= 0 ? "+" : ""}${pct(s.majoration)}`)
                  .join(", ")})`
              : " ; aucune période de saison n’est définie"}
            .
          </li>
          <li>
            <strong className="text-alpine">Aller-retour :</strong> chaque sens est calculé à sa propre date
            {b.remiseAllerRetour > 0
              ? `, puis ${pct(b.remiseAllerRetour)} de remise sur le retour.`
              : ", sans remise sur le retour."}
          </li>
          <li>
            Le prix est <strong className="text-alpine">par véhicule</strong>, arrondi à l’euro. Une
            réservation déjà payée ou envoyée garde son prix : un changement ne touche que les nouvelles.
          </li>
        </ol>

        {ex ? (
          <p className="mt-4 rounded-lg bg-glacier-50 px-4 py-3 text-sm leading-relaxed text-alpine">
            <strong>Exemple — Genève → Val Thorens, Standard, mercredi 10 h.</strong>{" "}
            {ex.fixe
              ? "Le trajet a un prix fixe"
              : `${euros(ex.prise)} + ${ex.km} km × ${nombre(ex.taux)} € = ${euros(
                  Math.round(ex.prise + ex.km * ex.taux),
                )} ; × ${nombre(ex.coefficient)}, le coefficient de Val Thorens`}
            {ex.majorationsMercredi.length > 0
              ? ` ; ${ex.majorationsMercredi.map((m) => `${m.libelle} ${m.montant >= 0 ? "+" : "−"} ${euros(Math.abs(m.montant))}`).join(", ")}`
              : ""}{" "}
            → <strong>{euros(ex.mercredi)}</strong>. Le samedi à la même heure : <strong>{euros(ex.samedi)}</strong>.
          </p>
        ) : null}

        <p
          className={`mt-3 text-sm ${baremeValide() ? "text-succes-700" : "text-attention-700"}`}
        >
          {baremeValide()
            ? "Le site encaisse ces prix en ligne."
            : "Le site affiche ces prix, mais n’encaisse pas encore en ligne — sauf les trajets à prix fixe : il envoie une demande de devis. L’encaissement s’ouvre quand la grille est validée (réglage Clickzou)."}
        </p>
      </section>

      <EditeurTarifs grille={grille} stations={stations} aeroports={aeroports} vehicules={vehicules} />

      <section className={`mt-6 ${carte}`}>
        <h2 className="font-display text-lg text-alpine">Historique des publications</h2>
        {historique.length === 0 ? (
          <p className="mt-3 text-sm text-alpine-600">
            Rien n’a encore été publié : ce sont les tarifs d’origine qui s’appliquent.
          </p>
        ) : (
          <ul className="mt-3 divide-y divide-glacier-200 text-sm">
            {historique.map((v, i) => (
              <li key={v.id} className="flex flex-wrap items-center justify-between gap-3 py-3">
                <span>
                  <span className="font-semibold text-alpine">Version n° {v.id}</span>
                  <span className="text-alpine-600">
                    {" "}
                    · {heure(new Date(v.publie_le))} · {v.publie_par}
                  </span>
                  {v.note ? <span className="block text-alpine-700">{v.note}</span> : null}
                </span>
                {i === 0 ? (
                  <span className="rounded-full border border-succes-300 bg-succes-50 px-2 py-0.5 text-xs text-succes-700">
                    En vigueur
                  </span>
                ) : (
                  <form action={actionRevenirGrille}>
                    <input type="hidden" name="id" value={v.id} />
                    <BoutonConfirmation
                      libelle="Revenir à cette version"
                      confirmer={`Republier la version n° ${v.id} ? Elle fera les prix des nouvelles réservations dès maintenant.`}
                      className="rounded border border-glacier-300 px-3 py-1.5 text-xs font-semibold text-alpine-700 transition hover:border-alpine/40 hover:bg-glacier-50"
                    />
                  </form>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
