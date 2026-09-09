import AccueilIntl from "@/components/intl/AccueilIntl";
import { metadataAccueil } from "@/lib/intl/routes";

export const metadata = metadataAccueil("it");

export default function AccueilIT() {
  return <AccueilIntl lang="it" />;
}
