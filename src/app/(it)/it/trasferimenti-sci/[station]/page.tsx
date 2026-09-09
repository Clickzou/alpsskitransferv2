import type { Metadata } from "next";
import { notFound } from "next/navigation";
import StationIntl from "@/components/intl/StationIntl";
import { metadataStation, paramsStations } from "@/lib/intl/routes";
import { resortParSlugTraduit } from "@/lib/resorts";

/**
 * Seules les stations qui portent une traduction complète ont une page :
 * pas de contenu, pas de page, pas de hreflang.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return paramsStations("it");
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ station: string }>;
}): Promise<Metadata> {
  const { station } = await params;
  return metadataStation("it", station);
}

export default async function Station({ params }: { params: Promise<{ station: string }> }) {
  const { station } = await params;
  const resort = resortParSlugTraduit("it", station);
  if (!resort) notFound();
  return <StationIntl lang="it" resort={resort} />;
}
