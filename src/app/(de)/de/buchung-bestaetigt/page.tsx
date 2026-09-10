import type { Metadata } from "next";
import Link from "next/link";
import FilAriane from "@/components/FilAriane";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { BoutonAction, HeroInterieur, Section } from "@/components/gabarit/Sections";
import { T } from "@/lib/intl/textes";
import { cheminConfirmation } from "@/lib/reservation/config";
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
  title: "Buchung bestätigt",
  description: "Ihr Transfer in die Alpen ist gebucht.",
  path: cheminConfirmation("de"),
  lang: "de",
  noindex: true,
});

export default async function PageConfirmation({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const reference = typeof params.ref === "string" ? params.ref : null;
  const t = T("de");

  return (
    <>
      <Header lang="de" />
      <main id="contenu">
        <HeroInterieur>
          <FilAriane
            clair
            elements={[
              { nom: t.accueil, chemin: "/de/" },
              { nom: "Buchung bestätigt", chemin: cheminConfirmation("de") },
            ]}
          />
          <h1 className="mt-4 font-display text-titre-page">Ihr Transfer ist gebucht</h1>
          <p className="mt-4 max-w-2xl text-chapo text-glacier-200">
            Danke — Ihre Zahlung ist eingegangen, und eine Bestätigung ist auf dem Weg in Ihr Postfach.
          </p>
        </HeroInterieur>

        <Section fond="blanc">
          <div className="max-w-prose space-y-4 text-alpine-700">
            {reference ? (
              <p className="rounded border border-alpes-300 bg-alpes-50 px-4 py-3">
                Ihre Referenz: <strong className="tabular-nums">{reference}</strong> — nennen Sie sie in jeder Nachricht zu dieser Fahrt.
              </p>
            ) : null}

            <p>Ihr Fahrer verfolgt Ihren Flug und weiß, wann Sie landen. Er erwartet Sie an der Gepäckausgabe mit Ihrem Namen; eine Stunde Wartezeit ist inklusive.</p>

            <p>
              Ändert sich etwas — ein anderer Flug, eine Person mehr, eine andere Adresse im Skiort —{" "}
              <Link className="underline" href="/de/kontakt/">
                sagen Sie uns Bescheid
              </Link>, so früh wie möglich.
            </p>

            <div className="pt-2">
              <BoutonAction href="/de/">Zurück zur Website</BoutonAction>
            </div>
          </div>
        </Section>
      </main>
      <Footer lang="de" />
    </>
  );
}
