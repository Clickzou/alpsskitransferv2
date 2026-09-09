import type { Metadata } from "next";
import { notFound } from "next/navigation";
import TrajetIntl from "@/components/intl/TrajetIntl";
import { metadataTrajet, paramsTrajets, resoudreTrajet } from "@/lib/intl/routes";

/**
 * Une page de trajet n'est générée que si le trajet ET sa station mère portent
 * une traduction, et que l'aéroport a un segment d'URL dans cette langue.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return paramsTrajets("de");
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ station: string; aeroport: string }>;
}): Promise<Metadata> {
  const { station, aeroport } = await params;
  return metadataTrajet("de", station, aeroport);
}

export default async function Trajet({
  params,
}: {
  params: Promise<{ station: string; aeroport: string }>;
}) {
  const { station, aeroport } = await params;
  const donnees = resoudreTrajet("de", station, aeroport);
  if (!donnees) notFound();
  return <TrajetIntl lang="de" resort={donnees.resort} trajet={donnees.trajet} />;
}
