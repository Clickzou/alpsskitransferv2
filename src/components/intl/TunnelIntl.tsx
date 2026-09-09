import FilAriane from "@/components/FilAriane";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Tunnel from "@/components/reservation/Tunnel";
import { BandeauReassurance, HeroInterieur, Section } from "@/components/gabarit/Sections";
import type { LangueSecondaire } from "@/lib/i18n";
import { T, lienReserver } from "@/lib/intl/textes";
import { moteurInterne } from "@/lib/reservation/config";
import { LIEUX } from "@/lib/reservation/lieux";

/**
 * Le tunnel de réservation dans une langue traduite.
 *
 * Même composant, même calcul, mêmes garde-fous que la version anglaise : seuls
 * les libellés changent. Le prix est recalculé côté serveur à chaque étape — le
 * navigateur ne décide jamais d'un montant, quelle que soit la langue.
 *
 * `noindex`, comme son équivalent anglais : une page de tunnel n'a rien à faire
 * dans l'index, et l'ancien site en laissait six s'y promener.
 */
export default function TunnelIntl({
  lang,
  params,
}: {
  lang: LangueSecondaire;
  params: Record<string, string | string[] | undefined>;
}) {
  const t = T(lang);
  const textes = TEXTES_PAGE[lang];

  const texte = (cle: string) => {
    const valeur = params[cle];
    return typeof valeur === "string" ? valeur : undefined;
  };

  const lieux = LIEUX.map((l) => ({
    slug: l.slug,
    nom: l.nom,
    type: l.type,
    detail: l.detail,
    cles: l.cles,
  }));

  const passagers = Number(texte("passengers"));

  return (
    <>
      <Header lang={lang} />
      <main id="contenu">
        <HeroInterieur>
          <FilAriane
            clair
            elements={[
              { nom: t.accueil, chemin: `/${lang}/` },
              { nom: textes.fil, chemin: lienReserver(lang) },
            ]}
          />
          <h1 className="mt-4 max-w-3xl text-balance font-display text-titre-page">
            {textes.h1}
          </h1>
          <p className="mt-4 max-w-2xl text-chapo text-glacier-200">{textes.chapo}</p>
          {moteurInterne() ? null : (
            <p className="mt-4 max-w-2xl rounded border border-white/20 bg-white/10 px-4 py-3 text-sm text-glacier-200">
              {textes.apercu}
            </p>
          )}
        </HeroInterieur>

        <BandeauReassurance langue={lang} />

        <Section fond="blanc">
          <Tunnel
            langue={lang}
            lieux={lieux}
            depart={texte("from")}
            arrivee={texte("to")}
            quand={texte("when")}
            passagersInitial={Number.isInteger(passagers) && passagers > 0 ? passagers : undefined}
          />
        </Section>
      </main>
      <Footer lang={lang} />
    </>
  );
}

/** Les textes propres à la page du tunnel — distincts des libellés du formulaire. */
export const TEXTES_PAGE: Record<
  LangueSecondaire,
  { fil: string; h1: string; chapo: string; apercu: string; metaTitre: string; metaDescription: string }
> = {
  fr: {
    fil: "Réserver",
    h1: "Réservez votre transfert",
    chapo:
      "Un prix par véhicule, annoncé avant tout engagement. Housses à skis, sièges enfants, péages, suivi du vol et temps d’attente compris.",
    apercu:
      "Aperçu : la réservation en ligne est en cours de finalisation. Envoyez-nous votre trajet par ce formulaire, nous confirmons par e-mail.",
    metaTitre: "Réserver un transfert vers les Alpes",
    metaDescription:
      "Réservez un transfert privé vers les stations des Alpes : prix fixe par véhicule, suivi du vol, housses à skis et sièges enfants compris.",
  },
  de: {
    fil: "Buchen",
    h1: "Buchen Sie Ihren Transfer",
    chapo:
      "Ein Preis pro Fahrzeug, genannt bevor Sie sich binden. Skisäcke, Kindersitze, Maut, Flugüberwachung und Wartezeit inklusive.",
    apercu:
      "Vorschau: Die Online-Buchung wird gerade fertiggestellt. Schicken Sie uns Ihre Fahrt über dieses Formular — wir bestätigen per E-Mail.",
    metaTitre: "Skitransfer in die Alpen buchen",
    metaDescription:
      "Buchen Sie einen privaten Transfer in die Skiorte der Alpen: Festpreis pro Fahrzeug, Flugüberwachung, Skisäcke und Kindersitze inklusive.",
  },
  it: {
    fil: "Prenota",
    h1: "Prenota il tuo trasferimento",
    chapo:
      "Un prezzo per veicolo, indicato prima di qualsiasi impegno. Sacche da sci, seggiolini, pedaggi, monitoraggio del volo e tempo di attesa inclusi.",
    apercu:
      "Anteprima: la prenotazione online è in fase di completamento. Inviaci il tuo tragitto con questo modulo, confermiamo via e-mail.",
    metaTitre: "Prenota un transfer per le Alpi",
    metaDescription:
      "Prenota un transfer privato per le località sciistiche delle Alpi: prezzo fisso per veicolo, volo monitorato, sci e seggiolini inclusi.",
  },
};
