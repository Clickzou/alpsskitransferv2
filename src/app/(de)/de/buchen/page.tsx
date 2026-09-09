import type { Metadata } from "next";
import TunnelIntl, { TEXTES_PAGE } from "@/components/intl/TunnelIntl";
import { lienReserver } from "@/lib/intl/textes";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: TEXTES_PAGE.de.metaTitre,
  description: TEXTES_PAGE.de.metaDescription,
  path: lienReserver("de"),
  lang: "de",
  noindex: true,
});

export default async function PageReservationDE({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  return <TunnelIntl lang="de" params={await searchParams} />;
}
