import AccueilIntl from "@/components/intl/AccueilIntl";
import { metadataAccueil } from "@/lib/intl/routes";

export const metadata = metadataAccueil("fr");

export default function AccueilFR() {
  return <AccueilIntl lang="fr" />;
}
