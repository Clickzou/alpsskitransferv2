import FilAriane from "@/components/FilAriane";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Tunnel from "@/components/reservation/Tunnel";
import { HeroInterieur, Section } from "@/components/gabarit/Sections";
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
        {/*
          Une page de conversion, pas d'acquisition — elle est en `noindex`
          explicite, contrairement à `/book-ski-transfer-tickets/` qui porte le
          mot-clé anglais et l'antériorité du WordPress.

          D'où le dépouillement décidé le 10 septembre 2026 : le chapô, le
          bandeau de réassurance et l'appel du pied de page répétaient, au-dessus
          et au-dessous du formulaire, ce que le formulaire dit lui-même — et
          proposaient de « demander un prix » à quelqu'un occupé à le demander.
          Restent le fil d'Ariane et le titre : une page sans titre n'est pas une
          page, ni pour un lecteur d'écran ni pour le contrôle de prebuild.
        */}
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
          {moteurInterne() ? null : (
            <p className="mt-4 max-w-2xl rounded border border-white/20 bg-white/10 px-4 py-3 text-sm text-glacier-200">
              {textes.apercu}
            </p>
          )}
        </HeroInterieur>

        {/*
          `id="reserver"` n'est pas décoratif : le formulaire de recherche de la
          home traduite pousse vers `…?from=…#reserver`, la même ancre que la
          page de réservation anglaise. Sans elle, le visiteur atterrit en haut
          d'une page dont le formulaire est deux écrans plus bas — avec sa
          saisie déjà reportée, mais invisible.
        */}
        <Section fond="blanc" id="reserver">
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
      <Footer lang={lang} appel={false} />
    </>
  );
}

/** Les textes propres à la page du tunnel — distincts des libellés du formulaire. */
export const TEXTES_PAGE: Record<
  LangueSecondaire,
  { fil: string; h1: string; apercu: string; metaTitre: string; metaDescription: string }
> = {
  fr: {
    fil: "Réserver",
    h1: "Réservez votre transfert",
    apercu:
      "Aperçu : la réservation en ligne est en cours de finalisation. Envoyez-nous votre trajet par ce formulaire, nous confirmons par e-mail.",
    metaTitre: "Réserver un transfert vers les Alpes",
    metaDescription:
      "Réservez un transfert privé vers les stations des Alpes : prix fixe par véhicule, suivi du vol, housses à skis et sièges enfants compris.",
  },
  de: {
    fil: "Buchen",
    h1: "Buchen Sie Ihren Transfer",
    apercu:
      "Vorschau: Die Online-Buchung wird gerade fertiggestellt. Schicken Sie uns Ihre Fahrt über dieses Formular — wir bestätigen per E-Mail.",
    metaTitre: "Skitransfer in die Alpen buchen",
    metaDescription:
      "Buchen Sie einen privaten Transfer in die Skiorte der Alpen: Festpreis pro Fahrzeug, Flugüberwachung, Skisäcke und Kindersitze inklusive.",
  },
  it: {
    fil: "Prenota",
    h1: "Prenota il tuo trasferimento",
    apercu:
      "Anteprima: la prenotazione online è in fase di completamento. Inviaci il tuo tragitto con questo modulo, confermiamo via e-mail.",
    metaTitre: "Prenota un transfer per le Alpi",
    metaDescription:
      "Prenota un transfer privato per le località sciistiche delle Alpi: prezzo fisso per veicolo, volo monitorato, sci e seggiolini inclusi.",
  },
};
