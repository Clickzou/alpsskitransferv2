import type { Metadata } from "next";
import TunnelIntl, { TEXTES_PAGE } from "@/components/intl/TunnelIntl";
import { lienReserver } from "@/lib/intl/textes";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: TEXTES_PAGE.fr.metaTitre,
  description: TEXTES_PAGE.fr.metaDescription,
  path: lienReserver("fr"),
  lang: "fr",
  noindex: true,
});

export default async function PageReservationFR({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  return <TunnelIntl lang="fr" params={await searchParams} />;
}
