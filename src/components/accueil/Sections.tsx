import Link from "next/link";
import Visuel from "@/components/Visuel";
import { BandeauReassurance, Coche } from "@/components/gabarit/Sections";
import { lienReservation } from "@/lib/reservation/config";
import { airportParSlug } from "@/lib/airports";
import { RESORTS_MIGRES, SLUG_PAYS } from "@/lib/resorts";
import {
  AVANTAGES,
  AVIS,
  DEPARTS,
  ETAPES,
  POURQUOI,
  PRESENTATION,
  STATIONS_PHARES,
  VEHICULES,
} from "@/data/accueil";

function Etoiles() {
  return (
    <div className="flex gap-0.5 text-alpes" aria-label="5 out of 5">
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4" aria-hidden="true">
          <path d="m10 1.5 2.6 5.3 5.9.9-4.2 4.1 1 5.8-5.3-2.8-5.3 2.8 1-5.8L1.5 7.7l5.9-.9L10 1.5Z" />
        </svg>
      ))}
    </div>
  );
}

/**
 * Les trois promesses, juste sous le formulaire de recherche.
 *
 * Le bandeau est partagé avec les pages du silo ; sur la home il porte des `h2`,
 * ailleurs il n'est qu'un élément d'interface.
 */
export function Reassurances() {
  return <BandeauReassurance niveau="h2" />;
}

/**
 * Bandeau sombre : le visuel à gauche, l'argumentaire à droite.
 *
 * Le premier paragraphe passe en chapô — c'est lui qui porte les quatre aéroports
 * et les stations phares, donc la promesse. Les deux suivants sont du détail, et
 * s'affichent comme tel. Les aéroports cités sont cliquables : ils mènent aux
 * hubs, qui sont exactement les pages que ce paragraphe décrit.
 */
export function Presentation() {
  const hubs = ["geneva-airport", "lyon-airport", "grenoble-isere-airport", "chambery-savoie-airport"]
    .map((slug) => {
      const aeroport = airportParSlug(slug);
      if (!aeroport) return null;
      return {
        nom: aeroport.name.replace(" Airport", ""),
        chemin: `/${SLUG_PAYS[aeroport.country]}/${slug}/`,
      };
    })
    .filter((h): h is { nom: string; chemin: string } => h !== null);

  const [chapo, ...suite] = PRESENTATION.paragraphes;

  return (
    <section className="bg-alpine text-white">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-section-lg lg:grid-cols-[0.9fr_1.1fr]">
        <Visuel
          nom={PRESENTATION.image.nom}
          alt={PRESENTATION.image.alt}
          sizes="(min-width: 1024px) 40vw, 100vw"
          className="aspect-[4/3] w-full rounded object-cover lg:aspect-[3/4] lg:h-full"
        />
        <div>
          <h2 className="font-display text-titre-section">{PRESENTATION.titre}</h2>
          <p className="mt-5 text-chapo leading-relaxed text-white">{chapo}</p>
          <div className="mt-5 space-y-4 text-sm leading-relaxed text-glacier-300">
            {suite.map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
          </div>

          <nav aria-label="Main departure airports" className="mt-7 flex flex-wrap gap-2">
            {hubs.map((hub) => (
              <Link
                key={hub.chemin}
                href={hub.chemin}
                className="rounded-full border border-white/20 px-4 py-1.5 text-sm transition hover:border-alpes hover:bg-alpes hover:text-white"
              >
                {hub.nom}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </section>
  );
}

/**
 * Les trois catégories de véhicules.
 *
 * La photo passe au-dessus du texte, sur un aplat glacier et à format constant :
 * les trois images n'ont ni la même proportion ni le même cadrage, et posées sous
 * le texte elles laissaient des vides différents dans chaque carte.
 */
export function Vehicules() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-section-lg">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-alpine-600">
            {VEHICULES.surtitre}
          </p>
          <h2 className="mt-3 font-display text-titre-section text-alpine">{VEHICULES.titre}</h2>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {VEHICULES.categories.map((v) => (
            <article
              key={v.nom}
              className="overflow-hidden rounded-lg border border-glacier-200 transition hover:shadow-carte"
            >
              <div className="flex aspect-[16/10] items-center justify-center bg-white p-5">
                <Visuel
                  nom={v.image.nom}
                  alt={v.image.alt}
                  sizes="(min-width: 640px) 30vw, 90vw"
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="border-t border-glacier-200 p-5">
                <h3 className="font-display text-titre-carte text-alpine">{v.nom}</h3>
                <p className="mt-2 text-sm text-alpine-600">{v.modele}</p>
                <p className="mt-2 text-sm font-medium text-alpes">{v.capacite}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Avantages() {
  return (
    <section className="border-y border-glacier-200 bg-glacier-50">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-section lg:grid-cols-[1fr_1.4fr]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-alpine-600">
            {AVANTAGES.surtitre}
          </p>
          <h2 className="mt-3 font-display text-titre-section text-alpine">{AVANTAGES.titre}</h2>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2">
          {AVANTAGES.points.map((point) => (
            <li key={point} className="flex gap-3 text-sm text-alpine-700">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-alpes text-white">
                <Coche className="h-3.5 w-3.5" />
              </span>
              {point}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Image large et carte blanche en surimpression, comme sur la maquette. */
export function StationsPhares() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-section-lg">
        <div className="relative lg:grid lg:grid-cols-2 lg:items-center">
          <Visuel
            nom={STATIONS_PHARES.image.nom}
            alt={STATIONS_PHARES.image.alt}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="h-72 w-full rounded object-cover lg:h-[26rem]"
          />
          <div className="-mt-10 rounded bg-white p-6 shadow-flottant sm:p-8 lg:-ml-16 lg:mt-0">
            <p className="text-xs font-semibold uppercase tracking-widest text-alpine-600">
              {STATIONS_PHARES.surtitre}
            </p>
            <h2 className="mt-3 font-display text-2xl text-alpine">{STATIONS_PHARES.titre}</h2>
            <p className="mt-4 text-sm leading-relaxed text-alpine-700">
              {STATIONS_PHARES.chapo}
            </p>
            <ul className="mt-4 space-y-2 text-sm text-alpine-700">
              {STATIONS_PHARES.stations.map((station) => (
                <li key={station.nom}>
                  {station.slugs.map((slug, i) => {
                    const fiche = RESORTS_MIGRES.find((r) => r.slug === slug);
                    const nom = fiche?.name ?? slug;
                    return (
                      <span key={slug}>
                        {i > 0 ? " & " : null}
                        {fiche ? (
                          <Link
                            href={`/${SLUG_PAYS[fiche.country]}/${fiche.slug}/`}
                            className="font-semibold text-alpine underline decoration-glacier-300 underline-offset-4 transition hover:text-marque hover:decoration-marque"
                          >
                            {nom}
                          </Link>
                        ) : (
                          <span className="font-semibold text-alpine">{nom}</span>
                        )}
                      </span>
                    );
                  })}{" "}
                  — {station.texte}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm leading-relaxed text-alpine-600">
              {STATIONS_PHARES.conclusion}
            </p>
            <Link
              href={lienReservation()}
              className="mt-6 inline-block rounded bg-marque px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-marque-600"
            >
              Book now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Departs() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-4 pb-section-lg">
        <h2 className="text-center font-display text-titre-section text-alpine">
          {DEPARTS.titre}
        </h2>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {DEPARTS.cartes.map((carte) => (
            <article key={carte.titre} className="flex flex-col">
              <Visuel
                nom={carte.image.nom}
                alt={carte.image.alt}
                sizes="(min-width: 1024px) 30vw, 90vw"
                className="h-48 w-full rounded object-cover"
              />
              <h3 className="mt-4 font-display text-base font-semibold text-alpine">
                {carte.titre}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-alpine-600">{carte.texte}</p>
              <Link
                href={carte.lien.chemin}
                className="mt-3 text-sm font-medium text-marque underline underline-offset-4"
              >
                {carte.lien.texte}
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Etapes() {
  return (
    <section className="bg-alpes text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-section lg:grid-cols-2">
        <div>
          <h2 className="font-display text-titre-section">{ETAPES.titre}</h2>
          <p className="mt-3 text-sm text-white/90">{ETAPES.chapo}</p>
          <Link
            href={lienReservation()}
            className="mt-6 inline-block rounded bg-marque px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-marque-600"
          >
            Book now
          </Link>
        </div>
        <ol className="space-y-4">
          {ETAPES.etapes.map((etape, i) => (
            <li key={etape.titre} className="flex gap-3 text-sm">
              <span className="font-semibold">{i + 1}.</span>
              <span>
                <span className="font-semibold">{etape.titre}</span> — {etape.texte}
              </span>
            </li>
          ))}
          <li className="pt-2 text-sm text-white/90">{ETAPES.conclusion}</li>
        </ol>
      </div>
    </section>
  );
}

export function Pourquoi() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-3xl px-4 py-section-lg text-center">
        <h2 className="font-display text-titre-section text-alpine">{POURQUOI.titre}</h2>
        <p className="mt-3 text-sm text-alpine-600">{POURQUOI.chapo}</p>
        <ul className="mt-6 inline-block space-y-2 text-left">
          {POURQUOI.points.map((point) => (
            <li key={point} className="flex gap-3 text-sm text-alpine-700">
              <Coche className="mt-0.5 shrink-0 text-alpes" />
              {point}
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-alpine-600">{POURQUOI.conclusion}</p>
      </div>
    </section>
  );
}

/**
 * Trajets les plus demandés — dérivés du silo, jamais écrits à la main.
 *
 * Groupés par aéroport de départ : c'est ainsi que le visiteur cherche, et cela
 * donne quatre colonnes lisibles là où douze liens en vrac formaient un tableau.
 * L'en-tête de chaque colonne mène au hub de l'aéroport.
 */
export function TrajetsPopulaires({
  aeroports,
}: {
  aeroports: {
    nom: string;
    chemin: string;
    trajets: { station: string; chemin: string; km: number | null; minutes: number | null }[];
  }[];
}) {
  if (aeroports.length === 0) return null;
  return (
    <section className="bg-alpine-900 text-white">
      <div className="mx-auto max-w-6xl px-4 py-section-lg">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-glacier-400">
            Where we drive
          </p>
          <h2 className="mt-3 font-display text-titre-section">
            Most popular routes between airports and the Alps
          </h2>
        </div>

        <div className="mt-10 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {aeroports.map((aeroport) => (
            <div key={aeroport.chemin}>
              <h3 className="border-b border-white/15 pb-3 font-display text-titre-carte">
                <Link href={aeroport.chemin} className="transition hover:text-alpes">
                  {aeroport.nom}
                </Link>
              </h3>
              <ul className="mt-3 space-y-1">
                {aeroport.trajets.map((trajet) => (
                  <li key={trajet.chemin}>
                    <Link
                      href={trajet.chemin}
                      className="group flex items-baseline justify-between gap-3 rounded px-2 py-2 text-sm transition hover:bg-white/5"
                    >
                      <span className="group-hover:text-alpes-300">{trajet.station}</span>
                      {trajet.km ? (
                        <span className="shrink-0 text-xs text-glacier-400">
                          {trajet.km} km
                          {trajet.minutes ? ` · ${dureeCourte(trajet.minutes)}` : ""}
                        </span>
                      ) : null}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** « 1 h 25 » plutôt que « 85 min » : c'est ainsi qu'on lit un temps de route. */
function dureeCourte(minutes: number) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return h === 0 ? `${m} min` : m === 0 ? `${h} h` : `${h} h ${String(m).padStart(2, "0")}`;
}

export function Avis() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-section-lg">
        <p className="text-xs font-semibold uppercase tracking-widest text-alpine-600">
          {AVIS.surtitre}
        </p>
        <h2 className="mt-3 font-display text-titre-section text-alpine">{AVIS.titre}</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {AVIS.avis.map((avis) => (
            <figure
              key={avis.auteur}
              className="flex h-full flex-col rounded border border-glacier-200 p-5"
            >
              <Etoiles />
              <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-alpine-700">
                {avis.texte}
              </blockquote>
              <figcaption className="mt-4 text-sm">
                <span className="font-semibold text-alpine">{avis.auteur}</span>
                <span className="block text-xs text-alpine-600">{avis.ville}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
