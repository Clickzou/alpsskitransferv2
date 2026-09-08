import Visuel from "@/components/Visuel";
import { HERO } from "@/data/accueil";
import { AIRPORTS } from "@/lib/airports";
import { RESORTS_MIGRES, SLUG_PAYS } from "@/lib/resorts";
import { TRANSFERS, segmentTrajet } from "@/lib/transfers";
import FormulaireRecherche from "./FormulaireRecherche";

/**
 * Bandeau d'accueil : l'image, la promesse, et le formulaire de recherche.
 *
 * Le H1 de la page vit ici. Il reprend le titre de la home actuelle, qui porte la
 * requête de marque et l'offre — « Alps Ski Transfers – Private Airport Transfers
 * to Alpine Resorts ».
 */
export default function Hero() {
  const aeroports = AIRPORTS.map((a) => ({
    slug: a.slug,
    nom: a.name,
    silo: SLUG_PAYS[a.country],
  }));

  const stations = RESORTS_MIGRES.map((r) => ({
    slug: r.slug,
    nom: r.name,
    silo: SLUG_PAYS[r.country],
  })).sort((a, b) => a.nom.localeCompare(b.nom));

  const liaisons = TRANSFERS.flatMap((t) => {
    const station = RESORTS_MIGRES.find((r) => r.slug === t.resort);
    if (!station) return [];
    return [
      {
        airport: t.airport,
        resort: t.resort,
        chemin: `/${SLUG_PAYS[station.country]}/${station.slug}/${segmentTrajet(t.airport)}/`,
      },
    ];
  });

  return (
    <section className="relative isolate overflow-hidden">
      <Visuel
        nom={HERO.image.nom}
        alt={HERO.image.alt}
        priority
        sizes="100vw"
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />
      {/*
        Deux voiles : un dégradé vertical qui assombrit le haut, où se trouvent
        l'accroche et le titre, et un voile uniforme plus léger sous le
        formulaire. Un seul voile à 45 % laissait le texte flotter sur la neige.
      */}
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-b from-alpine/85 via-alpine/60 to-alpine/80"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-6xl px-4 py-section sm:py-section-lg">
        <div className="text-center">
          {/*
            Composition validée par le client : l'accroche verte, puis le titre
            sur le bandeau magenta. Ce qui change ici est l'exécution — le titre
            passe à la serif du site et à une taille lisible, et le bandeau ne
            court plus sur toute la largeur.
          */}
          <p className="inline-block rounded bg-alpes px-6 py-3 font-display text-titre-section font-semibold text-white shadow-carte">
            {HERO.accroche}
          </p>
          {/* Le titre passe à la ligne sous l'accroche : côte à côte, les deux
              aplats de couleur se touchaient et formaient un seul bloc confus. */}
          <div className="mt-4">
            <h1 className="mx-auto inline-block max-w-3xl text-balance rounded bg-marque px-5 py-2.5 font-display text-lg leading-snug text-white shadow-carte sm:text-xl">
              {HERO.titre}
            </h1>
          </div>
        </div>

        <div className="mt-10">
          <FormulaireRecherche
            aeroports={aeroports}
            stations={stations}
            liaisons={liaisons}
          />
        </div>

        {/* Les trois chiffres qui répondent à « est-ce que ça me concerne ? » */}
        <dl className="mt-10 grid gap-4 text-center sm:grid-cols-3">
          {[
            { valeur: "68", libelle: "Alpine resorts served" },
            { valeur: "34", libelle: "Airports across four countries" },
            { valeur: "Fixed", libelle: "Price per vehicle, quoted upfront" },
          ].map((repere) => (
            <div
              key={repere.libelle}
              className="rounded border border-white/15 bg-alpine/40 px-4 py-3 backdrop-blur-sm"
            >
              <dt className="font-display text-2xl text-white">{repere.valeur}</dt>
              <dd className="mt-1 text-xs uppercase tracking-wide text-glacier-300">
                {repere.libelle}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
