import type { Metadata } from "next";
import { notFound } from "next/navigation";
import HubPays from "@/components/HubPays";
import PageContenu from "@/components/PageContenu";
import PageReservation from "@/components/PageReservation";
import PageAeroports from "@/components/PageAeroports";
import PageAide from "@/components/PageAide";
import PageContact from "@/components/PageContact";
import PageGroupes from "@/components/PageGroupes";
import PageStations from "@/components/PageStations";
import PageTransfertsPrives from "@/components/PageTransfertsPrives";
import { alternativesHubPaysEn, alternativesPageFonctionnelleEn } from "@/lib/intl/liens";
import { PAGES, pageParSlug } from "@/lib/pages";
import { PAYS } from "@/lib/pays";
import { CHEMIN_PAGE_RESERVATION } from "@/lib/reservation/config";
import { RESORTS_MIGRES } from "@/lib/resorts";
import { pageMetadata } from "@/lib/seo";

/**
 * Segment racine du site. Il sert deux choses, et une seule route peut le faire
 * puisque Next n'accepte qu'un segment dynamique par niveau :
 *
 *  · les **hubs pays** — `/france-ski-transfers/`, tête de silo, cible de
 *    13 redirections venues des hubs des anciennes arborescences ;
 *  · les **pages fonctionnelles** conservées — `/contact/`, `/privacy/`,
 *    `/general-questions/`… dont le plan de migration promet qu'elles ne bougent
 *    pas. Sans cette route, elles tomberaient en 404 le jour de la bascule.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return [
    ...Object.keys(PAYS).map((silo) => ({ silo })),
    ...PAGES.map((p) => ({ silo: p.slug })),
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ silo: string }>;
}): Promise<Metadata> {
  const { silo } = await params;

  const pays = PAYS[silo];
  if (pays) {
    const stations = RESORTS_MIGRES.filter((r) => r.country === pays.code);
    return pageMetadata({
      title: `${pays.nom} Ski Transfers — Airport to Resort`,
      description: `Private airport transfers to ${stations.length} ${pays.adjectif} ski resorts. Fixed price per vehicle, flight tracking, winter-equipped vehicles.`,
      path: `/${silo}/`,
      lang: "en",
      alternatives: alternativesHubPaysEn(silo),
    });
  }

  const page = pageParSlug(silo);
  if (page) {
    return pageMetadata({
      title: page.metaTitre,
      description: page.metaDescription,
      path: `/${silo}/`,
      lang: "en",
      noindex: page.noindex,
      alternatives: alternativesPageFonctionnelleEn(silo),
    });
  }

  return {};
}

export default async function Page({ params }: { params: Promise<{ silo: string }> }) {
  const { silo } = await params;

  if (PAYS[silo]) return <HubPays silo={silo} />;

  const page = pageParSlug(silo);
  // Deux pages ont leur gabarit — la page de conversion et la page de service.
  // Les autres pages fonctionnelles se lisent, et le gabarit générique suffit.
  if (page) {
    if (silo === CHEMIN_PAGE_RESERVATION.slice(1, -1)) return <PageReservation page={page} />;
    if (silo === "private-airport-transfers-to-alps-ski-resort") {
      return <PageTransfertsPrives page={page} />;
    }
    if (silo === "ski-resort-transfers") return <PageStations page={page} />;
    if (silo === "airport-ski-transfers") return <PageAeroports page={page} />;
    if (silo === "inquiry") return <PageGroupes page={page} />;
    if (silo === "general-questions") return <PageAide page={page} />;
    if (silo === "contact") return <PageContact page={page} />;
    return <PageContenu page={page} />;
  }

  notFound();
}
