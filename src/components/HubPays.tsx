import Link from "next/link";
import FilAriane from "@/components/FilAriane";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import JsonLd from "@/components/JsonLd";
import Visuel from "@/components/Visuel";
import {
  AppelAction,
  BandeauReassurance,
  BoutonAction,
  CarteLien,
  EnTeteSection,
  HeroInterieur,
  Reperes,
  Section,
} from "@/components/gabarit/Sections";
import { AIRPORTS } from "@/lib/airports";
import { dessertes } from "@/lib/airports/dessertes";
import { PAYS } from "@/lib/pays";
import { lienReservation } from "@/lib/reservation/config";
import { RESORTS_MIGRES } from "@/lib/resorts";
import { filArianeSchema, grapheJsonLd, organisationSchema } from "@/lib/schema";
import { transfersDeLaStation } from "@/lib/transfers";

/**
 * Hub pays — tête de silo, cible de 13 redirections venues des anciennes
 * arborescences. Sa raison d'être est le maillage : il distribue le jus vers les
 * pages de station et vers les hubs d'aéroport, et il est le seul endroit où le
 * visiteur voit d'un coup ce que le site couvre dans un pays.
 */
export default function HubPays({ silo }: { silo: string }) {
  const pays = PAYS[silo]!;

  const stations = RESORTS_MIGRES.filter((r) => r.country === pays.code)
    .map((station) => ({
      ...station,
      trajets: transfersDeLaStation(station.slug).length,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

  // Toutes les stations sont joignables depuis tous les aéroports : afficher le
  // nombre de dessertes donnerait le même chiffre partout. Ce qui distingue un
  // aéroport, c'est ce qu'il a de plus proche et le nombre de trajets rédigés.
  const aeroports = AIRPORTS.filter((a) => a.country === pays.code).map((aeroport) => {
    const desservies = dessertes(aeroport.slug);
    const proche = desservies[0];
    return {
      ...aeroport,
      routes: desservies.filter((d) => d.cheminTrajet).length,
      proche: proche ? `Closest resort: ${proche.nom}, ${proche.km} km` : undefined,
    };
  });

  const trajets = stations.reduce((somme, s) => somme + s.trajets, 0);

  const filAriane = [
    { nom: "Home", chemin: "/" },
    { nom: pays.nom, chemin: `/${silo}/` },
  ];

  return (
    <>
      <Header lang="en" />
      <main id="contenu">
        <HeroInterieur
          image={{
            nom: "hero-alps-ski-transfers",
            alt: "Skieurs dans la poudreuse au-dessus d'une station des Alpes",
          }}
        >
          <FilAriane clair elements={filAriane} />

          <h1 className="mt-4 max-w-3xl text-balance font-display text-titre-page">
            Ski transfers in {pays.nom}
          </h1>
          <p className="mt-4 max-w-2xl text-chapo text-glacier-200">
            Private transfers to {stations.length} {pays.adjectif} resorts, from{" "}
            {aeroports.length} airports and beyond. Fixed price per vehicle, flight
            tracking, winter-equipped vehicles.
          </p>

          <Reperes
            items={[
              { libelle: "Resorts", valeur: String(stations.length) },
              { libelle: "Airports", valeur: String(aeroports.length) },
              ...(trajets > 0 ? [{ libelle: "Routes", valeur: String(trajets) }] : []),
            ]}
          />

          <div className="mt-8">
            <BoutonAction href={lienReservation()}>Get a price</BoutonAction>
          </div>
        </HeroInterieur>

        <BandeauReassurance />

        {pays.intro ? (
          <Section fond="blanc">
            {/* Texte à gauche, photo du pays à droite, centrés l'un sur l'autre. */}
            <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)]">
              <div className="max-w-prose space-y-4 leading-relaxed text-alpine-700">
                {pays.intro.map((paragraphe) => (
                  <p key={paragraphe.slice(0, 40)}>{paragraphe}</p>
                ))}
              </div>
              {pays.visuel ? (
                <Visuel
                  nom={pays.visuel.nom}
                  alt={pays.visuel.alt}
                  sizes="(min-width: 1024px) 26rem, 100vw"
                  className="h-full min-h-[14rem] w-full rounded-xl object-cover shadow-carte"
                />
              ) : null}
            </div>
          </Section>
        ) : null}

        {stations.length > 0 ? (
          <Section fond="blanc">
            <EnTeteSection
              surtitre="Resorts"
              titre={`Ski resorts we serve in ${pays.nom}`}
              chapo="Each resort page lists every airport we drive from, with distances and drive times."
            />
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {stations.map((station) => (
                <li key={station.slug}>
                  <CarteLien
                    href={`/${silo}/${station.slug}/`}
                    titre={station.name}
                    meta={
                      station.trajets > 0
                        ? `${station.trajets} route${station.trajets > 1 ? "s" : ""}`
                        : undefined
                    }
                    action="Transfers"
                  />
                </li>
              ))}
            </ul>
          </Section>
        ) : null}

        {aeroports.length > 0 ? (
          <Section fond="nuit">
            <EnTeteSection
              clair
              surtitre="Airports"
              titre={`Airports in ${pays.nom}`}
              chapo="Start from your airport and see every resort we drive to, with distance and drive time."
            />
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {aeroports.map((aeroport) => (
                <li key={aeroport.slug}>
                  <CarteLien
                    clair
                    href={`/${silo}/${aeroport.slug}/`}
                    titre={`${aeroport.name} (${aeroport.iata})`}
                    meta={
                      aeroport.routes > 0
                        ? `${aeroport.routes} route${aeroport.routes > 1 ? "s" : ""}`
                        : undefined
                    }
                    texte={aeroport.proche}
                    action="Resorts served"
                  />
                </li>
              ))}
            </ul>
          </Section>
        ) : null}

        <Section fond="glacier">
          <EnTeteSection surtitre="Elsewhere in the Alps" titre="Other countries we serve" />
          <ul className="mt-6 flex flex-wrap gap-2">
            {Object.entries(PAYS)
              .filter(([slugPays, autre]) => slugPays !== silo && autre.code !== "DE")
              .map(([slugPays, autre]) => (
                <li key={slugPays}>
                  <Link
                    href={`/${slugPays}/`}
                    className="inline-block rounded border border-glacier-200 bg-white px-4 py-2 text-sm text-alpine-700 transition hover:border-alpes hover:text-marque"
                  >
                    {autre.nom}
                  </Link>
                </li>
              ))}
          </ul>
        </Section>

        <AppelAction titre={`Book your ski transfer in ${pays.nom}`} />
      </main>
      <Footer lang="en" />
      <JsonLd
        data={grapheJsonLd(
          organisationSchema(),
          filArianeSchema(filAriane.map((e) => ({ nom: e.nom, path: e.chemin }))),
        )}
      />
    </>
  );
}
