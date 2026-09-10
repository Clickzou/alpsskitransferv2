import Link from "next/link";
import Faq from "@/components/Faq";
import FilAriane from "@/components/FilAriane";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { alternativesPageFonctionnelleEn } from "@/lib/intl/liens";
import JsonLd from "@/components/JsonLd";
import Visuel from "@/components/Visuel";
import { Suspense } from "react";
import TunnelAutonome from "@/components/reservation/TunnelAutonome";
import {
  BoutonAction,
  Coche,
  EnTeteSection,
  HeroInterieur,
  Reperes,
  Section,
} from "@/components/gabarit/Sections";
import { PAGE_RESERVATION } from "@/data/page-reservation";
import { airportParSlug } from "@/lib/airports";
import { dessertes, duree } from "@/lib/airports/dessertes";
import type { PageFonctionnelle } from "@/lib/pages";
import { PAYS } from "@/lib/pays";
import { LIEUX } from "@/lib/reservation/lieux";
import { RESORTS_MIGRES } from "@/lib/resorts";
import { filArianeSchema, faqSchema, grapheJsonLd, organisationSchema } from "@/lib/schema";
import { TRANSFERS } from "@/lib/transfers";

/**
 * `/book-ski-transfer-tickets/` — la page de conversion du silo anglais.
 *
 * Elle a son gabarit à elle, comme la home, parce qu'elle a un travail à faire
 * que le gabarit générique des pages fonctionnelles ne fait pas : convaincre,
 * puis envoyer au tunnel. Le contenu éditorial vit dans `data/page-reservation.ts`
 * — hors de portée de `migrer:pages`, qui réécrit les modules de `lib/pages/`.
 *
 * Le plan de titres suit l'intention « book ski transfer tickets » : d'abord les
 * liaisons demandées, puis le véhicule, puis ce que le billet comprend, puis
 * comment on réserve, puis les questions. Aucun développement de station ni de
 * trajet — la page renvoie en ancre exacte et laisse la page mère travailler.
 */
export default function PageReservation({ page }: { page: PageFonctionnelle }) {
  const chemin = `/${page.slug}/`;
  const filAriane = [
    { nom: "Home", chemin: "/" },
    { nom: "Book ski transfer tickets", chemin },
  ];

  /*
   * Les liaisons mises en avant, résolues sur les registres : une paire sans
   * page de trajet est écartée plutôt que liée dans le vide. Distance et durée
   * viennent des 2 108 itinéraires calculés — ce sont les seuls chiffres de la
   * page, et ils sont mesurés.
   */
  const routes = PAGE_RESERVATION.routes.selection
    .map(({ airport, resort }) => {
      const aeroport = airportParSlug(airport);
      const desserte = dessertes(airport).find((d) => d.resort === resort);
      if (!aeroport || !desserte?.cheminTrajet) return null;
      return {
        cle: `${airport}|${resort}`,
        aeroport: aeroport.name,
        station: desserte.nom,
        chemin: desserte.cheminTrajet,
        km: desserte.km,
        minutes: desserte.minutes,
      };
    })
    .filter((r): r is NonNullable<typeof r> => r !== null);

  const reperes = [
    { libelle: "Ski resorts served", valeur: `${RESORTS_MIGRES.length}` },
    { libelle: "Routes with their own page", valeur: `${TRANSFERS.length}` },
    { libelle: "Price", valeur: "Fixed per vehicle" },
  ];

  return (
    <>
      <Header lang="en" alternatives={alternativesPageFonctionnelleEn(page.slug)} />
      <main id="contenu">
        <HeroInterieur
          debordant
          image={{
            nom: "route-alpine",
            alt: "Snowy mountain road leading to an Alpine ski resort",
          }}
        >
          <FilAriane clair elements={filAriane} />
          <h1 className="mt-4 max-w-4xl text-balance font-display text-titre-page">{page.h1}</h1>
          <p className="mt-4 max-w-2xl text-chapo text-glacier-200">{page.chapo}</p>

          <Reperes items={reperes} />

          {/*
            Le bandeau ne porte plus le formulaire de recherche : le tunnel
            complet est juste en dessous, sur cette même page. Deux formulaires
            l'un au-dessus de l'autre obligeraient à saisir deux fois.
          */}
          <BoutonAction sur="sombre" href="#reserver" className="mt-8">
            Book your transfer
          </BoutonAction>
        </HeroInterieur>

        {/* ------------------------------------------------------- le tunnel */}
        <Section fond="blanc" id="reserver">
          <EnTeteSection
            surtitre="Book online"
            titre="Get your price and book"
            chapo="Enter your journey to see the price for your vehicle, then confirm. Tolls, ski carriage and flight tracking are included."
          />
          <div className="mt-8">
            <Suspense fallback={null}>
              <TunnelAutonome lieux={LIEUX} />
            </Suspense>
          </div>
        </Section>

        {/* ---------------------------------------------------- introduction */}
        <Section fond="glacier">
          {/*
            Texte à gauche, photo à droite. La colonne de texte garde sa mesure
            de lecture (`max-w-prose`) : c'est la photo qui prend le reste, pas
            les lignes qui s'allongent.
          */}
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)]">
            <div className="max-w-prose space-y-4 leading-relaxed text-alpine-700">
              {PAGE_RESERVATION.intro.map((paragraphe) => (
                <p key={paragraphe.slice(0, 40)}>{paragraphe}</p>
              ))}
            </div>
            <Visuel
              nom={PAGE_RESERVATION.introImage.nom}
              alt={PAGE_RESERVATION.introImage.alt}
              sizes="(min-width: 1024px) 26rem, 100vw"
              className="h-full w-full rounded-xl object-cover shadow-carte"
            />
          </div>
        </Section>

        {/*
          Trois sections ont quitté cette page le 10 septembre 2026 : les
          liaisons mises en avant, les véhicules et les trois étapes de la
          réservation. Elles répétaient mot pour mot ce que le formulaire fait
          au-dessus — il propose les liaisons, montre les véhicules avec leur
          prix, et *est* les trois étapes. Un visiteur descendait donc de
          l'outil vers sa description.

          Ce qui reste travaille toujours pour le référencement sans se répéter :
          l'introduction reprise du WordPress, ce que le billet comprend, et la
          FAQ. La page perd environ 250 mots sur deux mille, et garde son
          antériorité sur « book ski transfer tickets ».

          Le maillage n'y perd rien non plus : les liaisons restent atteignables
          depuis la home, les hubs d'aéroport et le pied de page.
        */}
        <Section fond="glacier">
          <EnTeteSection
            surtitre={PAGE_RESERVATION.inclus.surtitre}
            titre={PAGE_RESERVATION.inclus.titre}
            chapo={PAGE_RESERVATION.inclus.chapo}
          />

          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" data-anime-decale>
            {PAGE_RESERVATION.inclus.points.map((point) => (
              <li
                key={point.titre}
                className="rounded border border-glacier-200 bg-white p-5 shadow-carte"
              >
                <p className="flex items-start gap-3 font-display text-base font-semibold text-alpine">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-alpes-50 text-alpes">
                    <Coche className="h-3.5 w-3.5" />
                  </span>
                  {point.titre}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-alpine-600">{point.texte}</p>
              </li>
            ))}
          </ul>
        </Section>

        <Faq
          items={page.faq}
          titre="Frequently asked questions about booking ski transfers"
          surtitre="Booking"
        />
      </main>
      <Footer lang="en" />
      <JsonLd
        data={grapheJsonLd(
          organisationSchema(),
          filArianeSchema(filAriane.map((e) => ({ nom: e.nom, path: e.chemin }))),
          faqSchema(page.faq),
        )}
      />
    </>
  );
}
