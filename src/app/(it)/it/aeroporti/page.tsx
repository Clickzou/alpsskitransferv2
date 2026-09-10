import type { Metadata } from "next";
import IndexAeroportsIntl from "@/components/intl/IndexAeroportsIntl";
import { metadataIndexAeroports } from "@/lib/intl/routes";

/** L'index des aéroports de la langue — pendant traduit de `/airport-ski-transfers/`. */
export const metadata: Metadata = metadataIndexAeroports("it");

export default function Page() {
  return <IndexAeroportsIntl lang="it" />;
}
