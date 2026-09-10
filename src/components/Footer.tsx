import Link from "next/link";
import Logo from "@/components/Logo";
import { ENTREPRISE, SITE } from "@/data/site";
import type { Lang } from "@/lib/i18n";
import { colonnesPied, lienAccueil, lienTunnelLangue, liensPays } from "@/lib/intl/navigation";
import { T } from "@/lib/intl/textes";

/**
 * Pied de page.
 *
 * Le téléphone et l'e-mail ne s'affichent que s'ils existent dans `data/site.ts` :
 * l'ancien site affichait un bloc de contact incomplet, et ses données structurées
 * déclaraient une organisation sans adresse ni téléphone. Mieux vaut une colonne
 * plus courte qu'un contact qui ne mène nulle part.
 *
 * Les libellés viennent de `lib/intl` : à quatre langues, les garder en ligne
 * ferait de chaque ligne une échelle de ternaires.
 */
export default function Footer({ lang }: { lang: Lang }) {
  const t = T(lang);
  const colonnes = colonnesPied(lang);
  const transportsPar: Record<Lang, string> = {
    en: "Transfers operated by",
    fr: "Transports assurés par",
    de: "Transfers durchgeführt von",
    it: "Trasferimenti effettuati da",
  };

  /*
   * Pas de marge haute sur le pied de page. `mt-16` laissait une bande blanche
   * entre la dernière section et lui sur presque toutes les pages : les sections
   * portent déjà leur propre respiration (`py-section`), et le fond du pied de
   * page doit prendre la suite du leur sans interruption.
   */
  return (
    <footer className="bg-alpine-900 text-glacier-200">
      <div className="mx-auto max-w-6xl px-4 py-section">
        <div className="mb-10 flex flex-wrap items-center justify-between gap-6 border-b border-white/10 pb-10">
          <div>
            <p className="font-display text-titre-carte text-white">{t.pied.accroche}</p>
            <p className="mt-1 text-sm text-glacier-300">{t.pied.accrocheSuite}</p>
          </div>
          <Link
            href={lienTunnelLangue(lang)}
            className="rounded bg-marque px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-marque-600"
          >
            {t.demanderPrix}
          </Link>
        </div>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href={lienAccueil(lang)} className="inline-block">
              <Logo lang={lang} variante="clair" />
            </Link>
            <h2 className="mt-5 text-xs font-semibold uppercase tracking-widest text-or-300">
              {t.pied.aPropos}
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
                      {ENTREPRISE.telephoneAffiche}
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
                  {t.pied.nousEcrire}
                </Link>
              </p>
            )}
          </div>

          {colonnes.map((colonne) => (
            <div key={colonne.titre}>
              <h2 className="text-xs font-semibold uppercase tracking-widest text-or-300">
                {colonne.titre}
              </h2>
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
          aria-label={t.pied.paysDesservis}
          className="mt-10 flex flex-wrap gap-x-6 gap-y-2 border-t border-white/10 pt-6 text-sm"
        >
          {liensPays(lang).map((pays) => (
            <Link key={pays.chemin} href={pays.chemin} className="hover:text-white">
              {pays.texte}
            </Link>
          ))}
        </nav>

        <p className="mt-8 text-xs text-glacier-400">
          © {new Date().getFullYear()} {SITE.nom}. {t.pied.droits} — Website created by Clickzou
        </p>
        {/*
          L'identité de l'éditeur. « Alps Ski Transfers » est une marque : le
          transport est opéré par une entreprise individuelle immatriculée en
          Savoie, et un site édité depuis la France doit dire qui l'édite. Cette
          ligne est le minimum ; la page de mentions légales porte le reste.
        */}
        <p className="mt-2 text-xs text-glacier-500">
          {transportsPar[lang]} {ENTREPRISE.entite.enseigne} ({ENTREPRISE.entite.nom}) — SIREN{" "}
          {ENTREPRISE.entite.siren.replace(/(\d{3})(\d{3})(\d{3})/, "$1 $2 $3")}
        </p>
      </div>
    </footer>
  );
}
