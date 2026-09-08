import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Contenu from "@/components/Contenu";
import Faq from "@/components/Faq";
import FilAriane from "@/components/FilAriane";
import JsonLd from "@/components/JsonLd";
import {
  BoutonAction,
  CarteLien,
  EnTeteSection,
  HeroInterieur,
  Section,
} from "@/components/gabarit/Sections";
import { DISTANCES } from "@/data/distances";
import { duree } from "@/lib/airports/dessertes";
import { SLUG_PAYS, resortsFr } from "@/lib/resorts";
import { SEGMENTS_FR, trajetsFrDeLaStation } from "@/lib/transfers";
import { visuelStation } from "@/lib/visuels";
import { faqSchema, filArianeSchema, grapheJsonLd, organisationSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

/**
 * Page de station française.
 *
 * `generateStaticParams` ne renvoie que les stations qui portent une traduction
 * complète : une station sans clé `fr` n'a pas de page française, pas de
 * hreflang, et n'apparaît pas dans le sélecteur de langue. C'est exactement ce
 * que le site actuel ne fait pas — il annonce quatre langues dont aucune
 * n'existe.
 *
 * Même gabarit que le silo anglais, mais sans les blocs dont le texte n'existe
 * qu'en anglais : afficher la réassurance et les étapes de réservation de la home
 * anglaise sur une page française serait reproduire le défaut que l'on corrige.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return resortsFr().map((r) => ({ station: r.fr!.slug }));
}

function stationParSlugFr(slug: string) {
  return resortsFr().find((r) => r.fr!.slug === slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ station: string }>;
}): Promise<Metadata> {
  const { station } = await params;
  const resort = stationParSlugFr(station);
  if (!resort) return {};
  return pageMetadata({
    title: resort.fr!.metaTitre,
    description: resort.fr!.metaDescription,
    path: `/fr/transferts-ski/${resort.fr!.slug}/`,
    lang: "fr",
    alternate: { lang: "en", path: `/${SLUG_PAYS[resort.country]}/${resort.slug}/` },
  });
}

export default async function PageStationFr({
  params,
}: {
  params: Promise<{ station: string }>;
}) {
  const { station } = await params;
  const resort = stationParSlugFr(station);
  if (!resort) notFound();

  const fr = resort.fr!;
  const chemin = `/fr/transferts-ski/${fr.slug}/`;
  const trajets = trajetsFrDeLaStation(resort.slug);
  const cheminEn = `/${SLUG_PAYS[resort.country]}/${resort.slug}/`;

  return (
    <>
      <Header lang="fr" alternate={{ lang: "en", path: cheminEn }} />
      <main id="contenu">
        <HeroInterieur image={visuelStation(resort.slug, resort.name)}>
          <FilAriane
            clair
            elements={[
              { nom: "Accueil", chemin: "/fr/" },
              { nom: resort.name, chemin },
            ]}
          />

          <h1 className="mt-4 max-w-3xl text-balance font-display text-titre-page">
            {fr.h1}
          </h1>
          <p className="mt-4 max-w-2xl text-chapo text-glacier-200">{fr.chapo}</p>

          <div className="mt-8">
            <BoutonAction href="/booking/">Demander un prix</BoutonAction>
          </div>
        </HeroInterieur>

        <Section fond="blanc">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_19rem]">
            <Contenu blocs={fr.contenu} />

            <aside className="lg:sticky lg:top-6 lg:h-fit">
              <div className="rounded bg-alpine p-5 text-white">
                <p className="font-display text-lg">Prêt à réserver ?</p>
                <p className="mt-2 text-sm text-glacier-200">
                  Prix fixe par véhicule, suivi du vol, et un chauffeur qui vous attend
                  même si l&apos;avion a du retard.
                </p>
                <BoutonAction href="/booking/" className="mt-4">
                  Réserver
                </BoutonAction>
              </div>
            </aside>
          </div>
        </Section>

        {trajets.length > 0 ? (
          <Section fond="glacier">
            <EnTeteSection
              surtitre="Trajets"
              titre={`Transferts vers ${resort.name}`}
              chapo="Distances et durées mesurées sur le réseau routier, hors trafic. Comptez davantage un samedi de haute saison."
            />
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {trajets.map((t) => (
                <li key={t.airport}>
                  <CarteLien
                    href={`${chemin}${SEGMENTS_FR[t.airport].segment}/`}
                    titre={`${SEGMENTS_FR[t.airport].nom} → ${resort.name}`}
                    meta={(() => {
                      const d = DISTANCES.find(
                        (x) => x.airport === t.airport && x.resort === resort.slug,
                      );
                      return d ? [`${d.km} km`, duree(d.minutes)].filter(Boolean).join(" · ") : undefined;
                    })()}
                    action="Voir ce trajet"
                  />
                </li>
              ))}
            </ul>
          </Section>
        ) : null}

        <Faq items={fr.faq} titre={`Questions fréquentes — ${resort.name}`} surtitre="Aide" />

        <section className="bg-alpes text-white">
          <div className="mx-auto max-w-6xl px-4 py-section">
            <h2 className="font-display text-titre-section">
              Réservez votre transfert vers {resort.name}
            </h2>
            <p className="mt-3 max-w-prose text-sm text-white/90">
              Devis immédiat, confirmation par e-mail, chauffeur au point de rendez-vous
              convenu.
            </p>
            <BoutonAction href="/booking/" className="mt-6">
              Réserver
            </BoutonAction>
          </div>
        </section>
      </main>
      <Footer lang="fr" />
      <JsonLd
        data={grapheJsonLd(
          organisationSchema(),
          filArianeSchema([
            { nom: "Accueil", path: "/fr/" },
            { nom: resort.name, path: chemin },
          ]),
          faqSchema(fr.faq),
        )}
      />
    </>
  );
}
