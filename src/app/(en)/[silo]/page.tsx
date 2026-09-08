import type { Metadata } from "next";
import { notFound } from "next/navigation";
import HubPays from "@/components/HubPays";
import PageContenu from "@/components/PageContenu";
import { PAGES, pageParSlug } from "@/lib/pages";
import { PAYS } from "@/lib/pays";
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
    });
  }

  return {};
}

export default async function Page({ params }: { params: Promise<{ silo: string }> }) {
  const { silo } = await params;

  if (PAYS[silo]) return <HubPays silo={silo} />;

  const page = pageParSlug(silo);
  if (page) return <PageContenu page={page} />;

  notFound();
}
