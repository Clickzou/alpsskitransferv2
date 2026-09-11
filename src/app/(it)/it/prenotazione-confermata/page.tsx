import type { Metadata } from "next";
import Link from "next/link";
import FilAriane from "@/components/FilAriane";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { BoutonAction, HeroInterieur, Section } from "@/components/gabarit/Sections";
import { T } from "@/lib/intl/textes";
import { cheminConfirmation } from "@/lib/reservation/config";
import { CHEMIN_GESTION } from "@/lib/reservation/gestion";
import { TEXTES_GESTION } from "@/lib/reservation/textes";
import { pageMetadata } from "@/lib/seo";

/**
 * Retour de paiement.
 *
 * Cette page **ne confirme rien par elle-même** : elle s'atteint en tapant
 * l'URL. La réservation n'est marquée payée que par le webhook signé de Stripe.
 * D'où le ton : le paiement vient de Stripe, la page ne fait que l'annoncer et
 * donner la référence.
 *
 * Elle n'existait qu'en anglais : un client francophone payait sur un site
 * français et atterrissait sur une page anglaise, juste après avoir donné sa
 * carte. La langue voyage désormais du tunnel jusqu'ici, et jusqu'à l'e-mail.
 */
export const metadata: Metadata = pageMetadata({
  title: "Prenotazione confermata",
  description: "Il tuo transfer per le Alpi è prenotato.",
  path: cheminConfirmation("it"),
  lang: "it",
  noindex: true,
});

export default async function PageConfirmation({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const reference = typeof params.ref === "string" ? params.ref : null;
  const jeton = typeof params.j === "string" ? params.j : null;
  /* Sans jeton, pas de lien : après un paiement, un 404 serait le pire accueil. */
  const lienGerer =
    reference && jeton
      ? `${CHEMIN_GESTION.it}?ref=${encodeURIComponent(reference)}&j=${encodeURIComponent(jeton)}`
      : null;
  const t = T("it");

  return (
    <>
      <Header lang="it" />
      <main id="contenu">
        <HeroInterieur>
          <FilAriane
            clair
            elements={[
              { nom: t.accueil, chemin: "/it/" },
              { nom: "Prenotazione confermata", chemin: cheminConfirmation("it") },
            ]}
          />
          <h1 className="mt-4 font-display text-titre-page">Il tuo transfer è prenotato</h1>
          <p className="mt-4 max-w-2xl text-chapo text-glacier-200">
            Grazie — il pagamento è andato a buon fine e una conferma sta arrivando nella tua casella.
          </p>
        </HeroInterieur>

        <Section fond="blanc">
          <div className="max-w-prose space-y-4 text-alpine-700">
            {reference ? (
              <p className="rounded border border-alpes-300 bg-alpes-50 px-4 py-3">
                Il tuo riferimento: <strong className="tabular-nums">{reference}</strong> — citalo in ogni messaggio su questo tragitto.
              </p>
            ) : null}

            <p>Il tuo autista segue il volo e sa quando atterri. Ti aspetta all’uscita dei bagagli con il tuo nome; è inclusa un’ora di attesa.</p>

            <p>
              Se qualcosa cambia — un altro volo, un passeggero in più, un altro indirizzo in località —{" "}
              <Link className="underline" href="/it/contatti/">
                diccelo
              </Link>il prima possibile.
            </p>

            {lienGerer ? (
              <div className="space-y-3 pt-2">
                <p>{TEXTES_GESTION.it.chapo}</p>
                <BoutonAction href={lienGerer}>{TEXTES_GESTION.it.bouton}</BoutonAction>
                <p>
                  <Link className="text-marque underline underline-offset-4" href="/it/">
                    {TEXTES_GESTION.it.retourSite}
                  </Link>
                </p>
              </div>
            ) : (
              <div className="pt-2">
                <BoutonAction href="/it/">Torna al sito</BoutonAction>
              </div>
            )}
          </div>
        </Section>
      </main>
      <Footer lang="it" />
    </>
  );
}
