import type { Metadata } from "next";
import { notFound } from "next/navigation";
import HubPaysIntl from "@/components/intl/HubPaysIntl";
import StationIntl from "@/components/intl/StationIntl";
import { metadataStation, paramsStations } from "@/lib/intl/routes";
import { hubPaysParSlug } from "@/lib/pays-intl";
import { resortParSlugTraduit } from "@/lib/resorts";

/**
 * Le segment sert deux choses, comme `[silo]/[resort]` côté anglais : les pages
 * de station et les **hubs pays** de la langue. Chacune délègue à son composant,
 * un seul H1 par page.
 *
 * Seules les stations qui portent une traduction complète ont une page :
 * pas de contenu, pas de page, pas de hreflang.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return paramsStations("de");
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ station: string }>;
}): Promise<Metadata> {
  const { station } = await params;
  return metadataStation("de", station);
}

export default async function Station({ params }: { params: Promise<{ station: string }> }) {
  const { station } = await params;

  const hub = hubPaysParSlug("de", station);
  if (hub) return <HubPaysIntl lang="de" hub={hub} />;

  const resort = resortParSlugTraduit("de", station);
  if (!resort) notFound();
  return <StationIntl lang="de" resort={resort} />;
}
