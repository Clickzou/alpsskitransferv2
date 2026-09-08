import Link from "next/link";
import Contenu from "@/components/Contenu";
import Faq from "@/components/Faq";
import FilAriane from "@/components/FilAriane";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import JsonLd from "@/components/JsonLd";
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
import { airportParSlug } from "@/lib/airports";
import { CONTENUS_AEROPORTS } from "@/lib/airports/contenus";
import { dessertes, duree } from "@/lib/airports/dessertes";
import { PAYS } from "@/lib/pays";
import { lienReservation } from "@/lib/reservation/config";
import { filArianeSchema, grapheJsonLd, organisationSchema } from "@/lib/schema";
import { visuelAeroport } from "@/lib/visuels";

/* ------------------------------------------------------------ hub aéroport */

/**
 * Hub d'aéroport — il reprend les 31 anciennes pages `/destination/{pays}/{aéroport}/`
 * de 230 mots. Sa matière est la desserte : quelles stations, à quelle distance,
 * en combien de temps, et vers quelle page de trajet.
 */
export default function HubAeroport({ silo, slug }: { silo: string; slug: string }) {
  const aeroport = airportParSlug(slug)!;
  const chemin = `/${silo}/${aeroport.slug}/`;
  const pays = PAYS[silo];
  const liste = dessertes(aeroport.slug);
  const court = aeroport.name.replace(" Airport", "");
  // Contenu redige, quand cet aeroport en a un : il remplace la phrase generee.
  const redige = CONTENUS_AEROPORTS[aeroport.slug];

  // Les plus proches d'abord, et seules celles qui ont une page de trajet peuvent
  // faire une carte : ailleurs, le lien mène à la page de station.
  const phares = liste.slice(0, 6);
  const plusProche = liste[0];

  const filAriane = [
    { nom: "Home", chemin: "/" },
    ...(pays ? [{ nom: pays.nom, chemin: `/${silo}/` }] : []),
    { nom: aeroport.name, chemin },
  ];

  return (
    <>
      <Header lang="en" />
      <main id="contenu">
        <HeroInterieur image={visuelAeroport(aeroport.slug, aeroport.name)}>
          <FilAriane clair elements={filAriane} />

          <h1 className="mt-4 max-w-3xl text-balance font-display text-titre-page">
            Ski transfers from {aeroport.name}
          </h1>
          <p className="mt-4 max-w-2xl text-chapo text-glacier-200">
            {redige
              ? redige.chapo
              : `${liste.length} Alpine resorts served from ${aeroport.name} (${aeroport.iata}), by private vehicle with a fixed price and flight tracking.`}
          </p>

          <Reperes
            items={[
              { libelle: "Resorts served", valeur: String(liste.length) },
              ...(plusProche
                ? [
                    { libelle: "Closest resort", valeur: plusProche.nom },
                    ...(plusProche.km
                      ? [{ libelle: "Distance", valeur: `${plusProche.km} km` }]
                      : []),
                  ]
                : []),
            ]}
          />

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <BoutonAction href={lienReservation({ airport: aeroport.slug })}>Get a price</BoutonAction>
            <a
              href="#resorts"
              className="text-sm font-medium text-white underline underline-offset-4 hover:text-alpes-300"
            >
              See all resorts served
            </a>
          </div>
        </HeroInterieur>

        <BandeauReassurance />

        {redige ? (
          <Section fond="blanc">
            <Contenu blocs={redige.contenu} />
          </Section>
        ) : null}

        {phares.length > 0 ? (
          <Section fond="blanc">
            <EnTeteSection
              surtitre="Popular routes"
              titre={`Closest resorts to ${court}`}
              chapo={`The shortest drives from ${aeroport.name} — the ones you can still reach comfortably after an evening flight.`}
            />
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {phares.map((d) => (
                <li key={d.resort}>
                  <CarteLien
                    href={d.cheminTrajet ?? d.cheminStation}
                    titre={`${court} → ${d.nom}`}
                    meta={[d.km ? `${d.km} km` : null, duree(d.minutes) || null]
                      .filter(Boolean)
                      .join(" · ")}
                    action={d.cheminTrajet ? "See this route" : "See this resort"}
                  />
                </li>
              ))}
            </ul>
          </Section>
        ) : null}

        <Section fond="glacier">
          <div id="resorts" className="scroll-mt-6">
            <EnTeteSection
              surtitre="Coverage"
              titre={`All resorts served from ${court}`}
              chapo="Drive times are without traffic. Allow more on a Saturday in high season, and in poor weather on mountain roads."
            />
          </div>

          <div className="mt-8 overflow-x-auto rounded border border-glacier-200 bg-white">
            <table className="w-full min-w-[32rem] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-glacier-200 bg-glacier-100 text-alpine-600">
                  <th className="px-4 py-3 font-medium">Resort</th>
                  <th className="px-4 py-3 font-medium">Distance</th>
                  <th className="px-4 py-3 font-medium">Drive time</th>
                  <th className="px-4 py-3 font-medium">Transfer</th>
                </tr>
              </thead>
              <tbody>
                {liste.map((d) => (
                  <tr key={d.resort} className="border-b border-glacier-100 last:border-0">
                    <td className="px-4 py-3">
                      <Link
                        className="font-medium text-alpine hover:text-marque"
                        href={d.cheminStation}
                      >
                        {d.nom}
                      </Link>
                    </td>
                    <td className="px-4 py-3 tabular-nums text-alpine-700">{d.km} km</td>
                    <td className="px-4 py-3 tabular-nums text-alpine-700">
                      {duree(d.minutes)}
                    </td>
                    <td className="px-4 py-3">
                      {d.cheminTrajet ? (
                        <Link
                          className="font-medium text-marque underline underline-offset-4"
                          href={d.cheminTrajet}
                        >
                          Book this route
                        </Link>
                      ) : (
                        <span className="text-alpine-600">On request</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        {redige ? (
          <Faq items={redige.faq} titre={`Frequently asked questions — ${court}`} />
        ) : null}

        <AppelAction
          titre={`Book your transfer from ${aeroport.name}`}
          lien={lienReservation({ airport: aeroport.slug })}
        />
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
