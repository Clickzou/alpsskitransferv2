import type { Metadata } from "next";
import IndexStationsIntl from "@/components/intl/IndexStationsIntl";
import { metadataIndexStations } from "@/lib/intl/routes";

/**
 * L'index du silo : la tête à laquelle se rattachent les hubs pays et les pages
 * de station. Le menu pointait « Località » vers l'accueil, qui a un autre rôle.
 */
export const metadata: Metadata = metadataIndexStations("it");

export default function Page() {
  return <IndexStationsIntl lang="it" />;
}
