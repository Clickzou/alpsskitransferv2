import AccueilIntl from "@/components/intl/AccueilIntl";
import { metadataAccueil } from "@/lib/intl/routes";

export const metadata = metadataAccueil("de");

export default function AccueilDE() {
  return <AccueilIntl lang="de" />;
}
