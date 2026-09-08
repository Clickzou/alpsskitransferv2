import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FilAriane from "@/components/FilAriane";
import JsonLd from "@/components/JsonLd";
import {
  BoutonAction,
  CarteLien,
  EnTeteSection,
  HeroInterieur,
  Reperes,
  Section,
} from "@/components/gabarit/Sections";
import { DISTANCES } from "@/data/distances";
import { duree } from "@/lib/airports/dessertes";
import { resortsFr } from "@/lib/resorts";
import { trajetsFrDeLaStation, SEGMENTS_FR } from "@/lib/transfers";
import { grapheJsonLd, organisationSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

/**
 * Accueil français.
 *
 * Le français n'est pas un miroir de l'anglais : périmètre retenu le 8 septembre
 * 2026 — la home, les 10 stations les plus recherchées côté francophone et leurs
 * trajets au départ de Genève et de Lyon — et non les 260 pages du site anglais.
 * Une page française n'existe que là où le contenu existe vraiment, et le
 * `hreflang` n'est émis que sur une paire réelle.
 */
export const metadata = pageMetadata({
  title: "Transferts aéroport vers les stations des Alpes",
  description:
    "Transferts privés depuis Genève, Lyon, Chambéry et Grenoble vers les stations des Alpes. Prix fixe par véhicule, suivi des vols, skis inclus.",
  path: "/fr/",
  lang: "fr",
  alternate: { lang: "en", path: "/" },
});

export default function AccueilFr() {
  const stations = resortsFr()
    .map((station) => {
      const trajets = trajetsFrDeLaStation(station.slug);
      const distances = trajets
        .map((t) => DISTANCES.find((d) => d.airport === t.airport && d.resort === station.slug))
        .filter((d) => d != null)
        .sort((a, b) => a.km - b.km);
      return { station, trajets, plusProche: distances[0] };
    })
    .sort((a, b) => a.station.name.localeCompare(b.station.name));

  const trajets = stations.flatMap(({ station, trajets: liste }) =>
    liste.map((t) => ({
      cle: `${t.airport}-${station.slug}`,
      titre: `${SEGMENTS_FR[t.airport]?.nom ?? t.airport} → ${station.name}`,
      chemin: `/fr/transferts-ski/${station.fr!.slug}/${SEGMENTS_FR[t.airport]?.segment}/`,
      distance: DISTANCES.find((d) => d.airport === t.airport && d.resort === station.slug),
    })),
  );

  return (
    <>
      <Header lang="fr" alternate={{ lang: "en", path: "/" }} />
      <main id="contenu">
        <HeroInterieur
          image={{
            nom: "hero-alps-ski-transfers",
            alt: "Skieurs dans la poudreuse au-dessus d'une station des Alpes",
          }}
        >
          <FilAriane clair elements={[{ nom: "Accueil", chemin: "/fr/" }]} />

          <h1 className="mt-4 max-w-3xl text-balance font-display text-titre-page">
            Transferts aéroport vers les stations des Alpes
          </h1>
          <p className="mt-4 max-w-2xl text-chapo text-glacier-200">
            Un chauffeur vous attend à la sortie des bagages, votre vol est suivi, et le
            prix est fixé par véhicule avant la réservation — skis, snowboards et sièges
            enfants compris. Nous desservons les Alpes françaises, suisses, italiennes et
            autrichiennes depuis Genève, Lyon, Chambéry et Grenoble.
          </p>

          <Reperes
            items={[
              { libelle: "Stations desservies", valeur: "68" },
              { libelle: "Aéroports", valeur: "34" },
              { libelle: "Prix", valeur: "Fixe, par véhicule" },
            ]}
          />

          <div className="mt-8">
            <BoutonAction href="/booking/">Demander un prix</BoutonAction>
          </div>
        </HeroInterieur>

        <Section fond="blanc">
          <div className="max-w-prose space-y-4 text-alpine-700">
            <h2 className="font-display text-2xl text-alpine">
              Un transfert privé, pas une navette partagée
            </h2>
            <p className="leading-relaxed">
              Le véhicule part quand vous atterrissez et vous dépose à l&apos;adresse de
              votre logement. Pas d&apos;attente à l&apos;aéroport pendant que se remplit
              un minibus, pas de dépose intermédiaire dans trois résidences avant la
              vôtre : sur une route de montagne en février, cette différence se compte en
              heures.
            </p>
            <p className="leading-relaxed">
              Le prix est annoncé par véhicule et non par personne. À partir de quatre
              passagers, c&apos;est presque toujours moins cher que d&apos;acheter des
              places — et cela reste vrai avec les skis, les sièges enfants et les péages,
              qui sont compris.
            </p>
            <h2 className="pt-4 font-display text-2xl text-alpine">
              Ce qui est inclus, et qui ne se rajoute pas à l&apos;arrivée
            </h2>
            <p className="leading-relaxed">
              Les housses à skis et à snowboard voyagent gratuitement, et le véhicule est
              choisi en fonction du matériel que vous déclarez, pas seulement du nombre de
              sièges. Les sièges enfants et rehausseurs sont fournis et installés avant le
              départ, comme la loi française l&apos;exige jusqu&apos;à 10 ans. Les péages,
              tunnels et vignettes suisses sont dans le prix.
            </p>
            <p className="leading-relaxed">
              Nos véhicules sont équipés pour l&apos;hiver — pneus et chaînes — sur des
              routes où les équipements sont obligatoires du 1ᵉʳ novembre au 31 mars.
            </p>
          </div>
        </Section>

        {stations.length > 0 ? (
          <Section fond="glacier">
            <EnTeteSection
              surtitre="Stations"
              titre="Les stations desservies, page par page"
              chapo="Chaque page indique les aéroports qui desservent la station, la distance réelle et le temps de route."
            />
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {stations.map(({ station, trajets: liste, plusProche }) => (
                <li key={station.slug}>
                  <CarteLien
                    href={`/fr/transferts-ski/${station.fr!.slug}/`}
                    titre={station.name}
                    meta={plusProche ? `${plusProche.km} km` : undefined}
                    texte={
                      liste.length > 0
                        ? `${liste.length} trajet${liste.length > 1 ? "s" : ""} au départ de ${liste
                            .map((t) => SEGMENTS_FR[t.airport]?.nom ?? t.airport)
                            .join(" et ")}`
                        : undefined
                    }
                    action="Voir les transferts"
                  />
                </li>
              ))}
            </ul>
          </Section>
        ) : null}

        {trajets.length > 0 ? (
          <Section fond="blanc">
            <EnTeteSection
              surtitre="Trajets"
              titre="Les liaisons les plus demandées"
              chapo="Distances et durées mesurées sur le réseau routier, hors trafic. Comptez davantage un samedi de haute saison."
            />
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {trajets.map((t) => (
                <li key={t.cle}>
                  <CarteLien
                    href={t.chemin}
                    titre={t.titre}
                    meta={
                      t.distance
                        ? [`${t.distance.km} km`, duree(t.distance.minutes)]
                            .filter(Boolean)
                            .join(" · ")
                        : undefined
                    }
                    action="Voir ce trajet"
                  />
                </li>
              ))}
            </ul>
          </Section>
        ) : null}

        <section className="bg-alpes text-white">
          <div className="mx-auto max-w-6xl px-4 py-section">
            <h2 className="font-display text-titre-section">
              Réservez votre transfert vers les Alpes
            </h2>
            <p className="mt-3 max-w-prose text-sm text-white/90">
              Devis immédiat, confirmation par e-mail, chauffeur au point de rendez-vous
              convenu. Pour un groupe, un séminaire ou une demande sur mesure,{" "}
              <Link className="underline" href="/contact/">
                écrivez-nous
              </Link>
              .
            </p>
            <BoutonAction href="/booking/" className="mt-6">
              Réserver
            </BoutonAction>
          </div>
        </section>
      </main>
      <Footer lang="fr" />
      <JsonLd data={grapheJsonLd(organisationSchema())} />
    </>
  );
}
