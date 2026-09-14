import { airportParSlug } from "@/lib/airports";
import { LOCALES, type Lang } from "@/lib/i18n";
import { envoyer } from "@/lib/reservation/email";
import { lienGestion } from "@/lib/reservation/gestion";
import { prochainePrise, type LigneRelance } from "@/lib/reservation/relances";
import { TEXTES_ADRESSES } from "@/lib/reservation/textes-adresses";
import { resortParSlug } from "@/lib/resorts";
import { formaterAlpes } from "@/lib/temps";

const LANGUES: Lang[] = ["en", "fr", "de", "it"];

/**
 * L'e-mail qui demande au client son adresse en station, dans sa langue, avec
 * son lien de gestion.
 *
 * Deux déclencheurs, un seul texte : la relance du matin (`/api/relances`) et
 * le bouton « Demander l'adresse au client » du back-office. Rien n'est noté
 * ici — chacun écrit son historique à sa façon.
 *
 * Répond `false` sans rien envoyer s'il n'y a plus de prise en charge à venir
 * ou pas de lien à donner : un e-mail sans lien demanderait une adresse sans
 * dire où la saisir.
 */
export async function envoyerDemandeAdresse(
  ligne: LigneRelance,
  origine: string,
  maintenant = new Date(),
): Promise<boolean> {
  const langue = LANGUES.includes(ligne.langue as Lang) ? (ligne.langue as Lang) : "en";
  const lien = lienGestion(origine, ligne.reference, langue);
  const prise = prochainePrise(ligne, maintenant);
  if (!lien || !prise) return false;

  const mots = TEXTES_ADRESSES[langue];
  return envoyer({
    destinataire: ligne.client_email,
    sujet: mots.relanceSujet(ligne.reference),
    texte: mots.relanceCorps({
      trajet: `${airportParSlug(ligne.airport)?.name ?? ligne.airport} → ${
        resortParSlug(ligne.resort)?.name ?? ligne.resort
      }`,
      quand: formaterAlpes(prise, LOCALES[langue], {
        weekday: "long",
        day: "numeric",
        month: "long",
        hour: "2-digit",
        minute: "2-digit",
      }),
      lien: `${lien}#adresses`,
    }),
  });
}
