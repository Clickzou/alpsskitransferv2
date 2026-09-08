import Footer from "@/components/Footer";
import Header from "@/components/Header";
import JsonLd from "@/components/JsonLd";
import Hero from "@/components/accueil/Hero";
import FaqAccueil from "@/components/accueil/FaqAccueil";
import {
  Avantages,
  Avis,
  Departs,
  Etapes,
  Pourquoi,
  Presentation,
  Reassurances,
  StationsPhares,
  TrajetsPopulaires,
  Vehicules,
} from "@/components/accueil/Sections";
import { FAQ_ACCUEIL } from "@/data/accueil";
import { DISTANCES } from "@/data/distances";
import { airportParSlug } from "@/lib/airports";
import { RESORTS_MIGRES, SLUG_PAYS } from "@/lib/resorts";
import { TRANSFERS, segmentTrajet } from "@/lib/transfers";
import { faqSchema, grapheJsonLd, organisationSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Alps Ski Transfers | Private Airport Transfers to the Alps",
  description:
    "Private airport transfers to the Alps from Geneva, Lyon, Chambéry and Grenoble. Fixed price per vehicle, flight tracking, English-speaking drivers.",
  path: "/",
  lang: "en",
});

/**
 * Les trajets mis en avant sont **dérivés du silo**, jamais écrits à la main :
 * les liaisons les plus courtes au départ des quatre aéroports qui comptent, donc
 * celles qui se vendent. Genève d'abord — c'est la première porte d'entrée des
 * Alpes, et celle où le site est aujourd'hui absent.
 */
function trajetsPopulaires() {
  const prioritaires = [
    "geneva-airport",
    "lyon-airport",
    "chambery-savoie-airport",
    "grenoble-isere-airport",
  ];

  return prioritaires.flatMap((airport) => {
    const aeroport = airportParSlug(airport);
    if (!aeroport) return [];

    const trajets = TRANSFERS.filter((t) => t.airport === airport)
      .flatMap((t) => {
        const station = RESORTS_MIGRES.find((r) => r.slug === t.resort);
        if (!station) return [];
        const distance = DISTANCES.find((d) => d.airport === airport && d.resort === station.slug);
        return [
          {
            station: station.name,
            chemin: `/${SLUG_PAYS[station.country]}/${station.slug}/${segmentTrajet(airport)}/`,
            km: distance?.km ?? null,
            minutes: distance?.minutes ?? null,
          },
        ];
      })
      .sort((a, b) => (a.km ?? 9999) - (b.km ?? 9999))
      .slice(0, 5);

    if (trajets.length === 0) return [];
    return [
      {
        nom: aeroport.name,
        chemin: `/${SLUG_PAYS[aeroport.country]}/${airport}/`,
        trajets,
      },
    ];
  });
}

export default function Accueil() {
  return (
    <>
      <Header lang="en" />
      <main id="contenu">
        <Hero />
        <Reassurances />
        <Presentation />
        <Vehicules />
        <Avantages />
        <StationsPhares />
        <Departs />
        <Etapes />
        <Pourquoi />
        <TrajetsPopulaires aeroports={trajetsPopulaires()} />
        <Avis />
        <FaqAccueil />
      </main>
      <Footer lang="en" />
      <JsonLd
        data={grapheJsonLd(
          organisationSchema(),
          faqSchema(
            FAQ_ACCUEIL.questions.map((q) => ({ question: q.question, reponse: q.reponse })),
          ),
        )}
      />
    </>
  );
}
