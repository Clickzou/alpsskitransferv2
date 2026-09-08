import Link from "next/link";
import Logo from "@/components/Logo";
import { ENTREPRISE, SITE } from "@/data/site";
import type { Lang } from "@/lib/i18n";
import { PAYS } from "@/lib/pays";

/**
 * Pied de page.
 *
 * Le téléphone et l'e-mail ne s'affichent que s'ils existent dans `data/site.ts` :
 * l'ancien site affichait un bloc de contact incomplet, et ses données structurées
 * déclaraient une organisation sans adresse ni téléphone. Mieux vaut une colonne
 * plus courte qu'un contact qui ne mène nulle part.
 */
export default function Footer({ lang }: { lang: Lang }) {
  const fr = lang === "fr";

  const colonnes = [
    {
      titre: fr ? "Réservation" : "Booking",
      liens: [
        {
          texte: fr ? "Réserver un transfert" : "Book tickets",
          chemin: fr ? "/fr/reserver/" : "/book-ski-transfer-tickets/",
        },
        {
          texte: fr ? "Comment réserver" : "Help & FAQ",
          chemin: fr ? "/fr/comment-reserver/" : "/general-questions/",
        },
        {
          texte: fr ? "Aide et questions" : "Find your stop",
          chemin: fr ? "/fr/aide/" : "/find-your-stop/",
        },
        { texte: "Contact", chemin: fr ? "/fr/contact/" : "/contact/" },
      ],
    },
    {
      titre: "Services",
      liens: [
        {
          texte: fr ? "Privé ou partagé" : "Private airport transfers",
          chemin: fr
            ? "/fr/transferts-prives/"
            : "/private-airport-transfers-to-alps-ski-resort/",
        },
        {
          texte: fr ? "Agences et professionnels" : "Travel agencies",
          chemin: fr ? "/fr/agences-et-professionnels/" : "/inquiry/",
        },
        {
          texte: fr ? "Stations de ski (EN)" : "Ski resorts",
          chemin: "/ski-resort-transfers/",
        },
        /*
         * En anglais, « Travel agencies » mène déjà à /inquiry/ : la colonne
         * pointait deux fois la même page sous deux libellés. En français les
         * deux entrées mènent bien à deux pages différentes.
         */
        ...(fr
          ? [{ texte: "Demande sur mesure (EN)", chemin: "/inquiry/" }]
          : []),
        { texte: fr ? "Assistance (EN)" : "Help", chemin: "/help/" },
        { texte: fr ? "Bagage perdu (EN)" : "Lost luggage", chemin: "/lost-luggage/" },
      ],
    },
    {
      titre: fr ? "Ressources" : "Resources",
      liens: [
        {
          texte: fr ? "Conditions de vente (EN)" : "Ticketing conditions",
          chemin: "/ticketing-conditions/",
        },
        {
          texte: fr ? "Conditions générales (EN)" : "Terms & conditions",
          chemin: "/terms-conditions-alps-ski-transfers/",
        },
        {
          texte: fr ? "Confidentialité (EN)" : "Privacy",
          chemin: "/privacy/",
        },
        { texte: "Cookies", chemin: "/cookie-policy-uk/" },
      ],
    },
  ];

  return (
    <footer className="mt-16 bg-alpine-900 text-glacier-200">
      <div className="mx-auto max-w-6xl px-4 py-section">
        <div className="mb-10 flex flex-wrap items-center justify-between gap-6 border-b border-white/10 pb-10">
          <div>
            <p className="font-display text-titre-carte text-white">
              {fr
                ? "Un prix ferme, avant de vous engager"
                : "A firm price, before you commit"}
            </p>
            <p className="mt-1 text-sm text-glacier-300">
              {fr
                ? "Skis, sièges enfants, péages et suivi du vol compris."
                : "Ski bags, child seats, tolls and flight tracking included."}
            </p>
          </div>
          <Link
            href={fr ? "/fr/reserver/" : "/booking/"}
            className="rounded bg-marque px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-marque-600"
          >
            {fr ? "Demander un prix" : "Get a price"}
          </Link>
        </div>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href={fr ? "/fr/" : "/"} className="inline-block">
              <Logo lang={lang} variante="clair" />
            </Link>
            <h2 className="mt-5 text-xs font-semibold uppercase tracking-widest text-or-300">
              {fr ? "À propos" : "About Transfers"}
            </h2>
            <address className="mt-3 space-y-1 text-sm not-italic">
              <p>{ENTREPRISE.adresse.rue}</p>
              <p>
                {ENTREPRISE.adresse.codePostal} {ENTREPRISE.adresse.ville}
              </p>
            </address>
            {ENTREPRISE.telephone || ENTREPRISE.email ? (
              <div className="mt-4 space-y-1 text-sm">
                {ENTREPRISE.telephone ? (
                  <p>
                    <a className="hover:text-white" href={`tel:${ENTREPRISE.telephone}`}>
                      {ENTREPRISE.telephone}
                    </a>
                  </p>
                ) : null}
                {ENTREPRISE.email ? (
                  <p>
                    <a className="hover:text-white" href={`mailto:${ENTREPRISE.email}`}>
                      {ENTREPRISE.email}
                    </a>
                  </p>
                ) : null}
              </div>
            ) : (
              <p className="mt-4 text-sm">
                <Link className="underline hover:text-white" href="/contact/">
                  {fr ? "Nous écrire" : "Get in touch"}
                </Link>
              </p>
            )}
          </div>

          {colonnes.map((colonne) => (
            <div key={colonne.titre}>
              <h2 className="text-xs font-semibold uppercase tracking-widest text-or-300">{colonne.titre}</h2>
              <ul className="mt-3 space-y-2 text-sm">
                {colonne.liens.map((lien) => (
                  <li key={lien.texte}>
                    <Link href={lien.chemin} className="transition-colors hover:text-white">
                      {lien.texte}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <nav
          aria-label={fr ? "Pays desservis" : "Countries served"}
          className="mt-10 flex flex-wrap gap-x-6 gap-y-2 border-t border-white/10 pt-6 text-sm"
        >
          {Object.entries(PAYS)
            .filter(([, pays]) => pays.code !== "DE")
            .map(([slug, pays]) => (
              <Link key={slug} href={`/${slug}/`} className="hover:text-white">
                {pays.nom}
              </Link>
            ))}
        </nav>

        <p className="mt-8 text-xs text-glacier-400">
          © {new Date().getFullYear()} {SITE.nom}.{" "}
          {fr ? "Tous droits réservés." : "All rights reserved."} — Website created by Clickzou
        </p>
      </div>
    </footer>
  );
}
