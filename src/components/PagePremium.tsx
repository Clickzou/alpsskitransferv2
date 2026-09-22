import Link from "next/link";
import Faq from "@/components/Faq";
import FilAriane from "@/components/FilAriane";
import Footer from "@/components/Footer";
import FormulaireDemandePremium from "@/components/FormulaireDemandePremium";
import Header from "@/components/Header";
import JsonLd from "@/components/JsonLd";
import Visuel from "@/components/Visuel";
import {
  BoutonAction,
  Coche,
  EnTeteSection,
  HeroInterieur,
  Reperes,
  Section,
} from "@/components/gabarit/Sections";
import { ANCRE_FORMULAIRE, type ContenuPremium } from "@/data/page-premium";
import { ENTREPRISE } from "@/data/site";
import type { Alternative, Lang } from "@/lib/i18n";
import { T } from "@/lib/intl/textes";
import { lienTunnelLangue } from "@/lib/intl/navigation";
import type { Faq as QuestionReponse } from "@/lib/resorts/types";
import {
  filArianeSchema,
  faqSchema,
  grapheJsonLd,
  organisationSchema,
  serviceCatalogueSchema,
} from "@/lib/schema";

/**
 * La page des demandes sur mesure, dans les quatre langues.
 *
 * Comme la page des groupes, le bandeau **ne porte pas le formulaire de
 * recherche** : le tunnel ne sait pas chiffrer une mise à disposition de six
 * jours ni un vol affrété, et l'y envoyer serait l'envoyer vers un refus. Mais
 * contrairement à elle, l'appel à l'action n'est pas un `mailto:` : il descend
 * vers le formulaire de la page. Un client qui demande une mise à disposition
 * ouvre rarement son logiciel de courrier pour écrire quatre lignes de dates —
 * il remplit ce qu'on lui présente, à condition que ce soit court et à sa place.
 *
 * Le téléphone reste visible à côté, sans concurrencer le bouton : sur ce type
 * de demande, une part des visiteurs appelle, et ceux-là décident vite.
 *
 * **Aucune chaîne de caractères ici.** Tout vient de `contenu`, y compris les
 * mots des boutons : c'est ce qui permet aux quatre langues de partager un seul
 * gabarit sans qu'un « Send your request » traîne sur la page allemande.
 */
export default function PagePremium({
  lang,
  chemin,
  h1,
  chapo,
  faq,
  contenu,
  alternatives,
}: {
  lang: Lang;
  /** Chemin absolu de la page, `/luxury-ski-transfers-alps/` ou `/fr/chauffeur-prive-alpes/`. */
  chemin: string;
  h1: string;
  chapo: string;
  faq: QuestionReponse[];
  contenu: ContenuPremium;
  alternatives: Alternative[];
}) {
  const t = T(lang);
  const ancre = `#${ANCRE_FORMULAIRE}`;
  const reserver = lienTunnelLangue(lang);
  const filAriane = [
    { nom: t.accueil, chemin: lang === "en" ? "/" : `/${lang}/` },
    { nom: contenu.filAriane, chemin },
  ];

  return (
    <>
      <Header lang={lang} alternatives={alternatives} />
      <main id="contenu">
        <HeroInterieur image={contenu.heroImage}>
          <FilAriane clair elements={filAriane} />
          <h1 className="mt-4 max-w-4xl text-balance font-display text-titre-page">{h1}</h1>
          <p className="mt-4 max-w-2xl text-chapo text-glacier-200">{chapo}</p>

          <Reperes items={[...contenu.reperes]} />

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <BoutonAction href={ancre}>{contenu.actions.envoyer}</BoutonAction>
            <a
              href={`tel:${ENTREPRISE.telephone}`}
              className="text-sm font-medium text-white underline underline-offset-4 hover:text-alpes-300"
            >
              {contenu.actions.appeler} {ENTREPRISE.telephoneAffiche}
            </a>
          </div>
        </HeroInterieur>

        {/* ---------------------------------------------------- introduction */}
        <Section fond="blanc">
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)]">
            <div className="max-w-prose space-y-4 leading-relaxed text-alpine-700">
              {contenu.intro.map((paragraphe) => (
                <p key={paragraphe.slice(0, 40)}>{paragraphe}</p>
              ))}
              {/*
                Le renvoi vers les groupes est ici, en fin d'introduction, et pas
                dans le pied : les deux pages se ressemblent de loin, et un
                visiteur venu pour un convoi de minibus doit pouvoir partir avant
                d'avoir lu une page de mise à disposition.
              */}
              <p className="text-sm text-alpine-600">
                {contenu.renvoiGroupes.avant}
                <Link
                  href={contenu.renvoiGroupes.chemin}
                  className="font-semibold text-marque hover:underline"
                >
                  {contenu.renvoiGroupes.lien}
                </Link>
                {contenu.renvoiGroupes.apres}
              </p>
            </div>
            <Visuel
              nom={contenu.introImage.nom}
              alt={contenu.introImage.alt}
              sizes="(min-width: 1024px) 26rem, 100vw"
              className="h-full min-h-[14rem] w-full rounded-xl object-cover shadow-carte"
            />
          </div>
        </Section>

        {/* ------------------------------------------------------ prestations */}
        <Section fond="glacier">
          <EnTeteSection
            surtitre={contenu.prestations.surtitre}
            titre={contenu.prestations.titre}
            chapo={contenu.prestations.chapo}
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-2" data-anime-decale>
            {contenu.prestations.cartes.map((carte) => (
              <article
                key={carte.titre}
                className="flex flex-col overflow-hidden rounded-xl border border-glacier-200 bg-white shadow-carte"
              >
                {/*
                  La photo en tête de carte, pleine largeur et sans marge. Un
                  hélicoptère et un jet privé se vendent d'abord par l'image :
                  cette page était la seule du site à n'en porter aucune là où
                  elle en avait le plus besoin. Le ratio est fixe pour que les
                  quatre cartes s'alignent quelle que soit la longueur du texte.
                */}
                <Visuel
                  nom={carte.image.nom}
                  alt={carte.image.alt}
                  sizes="(min-width: 1024px) 34rem, 100vw"
                  className="aspect-[16/9] w-full object-cover"
                />
                <div className="flex flex-1 flex-col p-6">
                  <h2 className="font-display text-titre-carte text-alpine">{carte.titre}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-alpine-600">{carte.texte}</p>
                  <ul className="mt-5 space-y-2 border-t border-glacier-200 pt-5">
                    {carte.points.map((point) => (
                      <li
                        key={point}
                        className="flex gap-3 text-sm leading-relaxed text-alpine-700"
                      >
                        <Coche className="mt-0.5 h-4 w-4 shrink-0 text-alpes" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </Section>

        {/* --------------------------------------------------------- pour qui */}
        <Section fond="blanc">
          <EnTeteSection
            surtitre={contenu.occasions.surtitre}
            titre={contenu.occasions.titre}
            chapo={contenu.occasions.chapo}
          />
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" data-anime-decale>
            {contenu.occasions.points.map((point) => (
              <li
                key={point.titre}
                className="rounded border border-glacier-200 bg-white p-5 shadow-carte"
              >
                <p className="font-display text-base font-semibold text-alpine">{point.titre}</p>
                <p className="mt-3 text-sm leading-relaxed text-alpine-600">{point.texte}</p>
              </li>
            ))}
          </ul>
        </Section>

        {/* ------------------------------------------------------- discrétion */}
        <Section fond="nuit">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-white/70">
                {contenu.discretion.surtitre}
              </p>
              <h2 className="mt-3 font-display text-titre-section">{contenu.discretion.titre}</h2>
              <p className="mt-3 text-sm leading-relaxed text-white/90">
                {contenu.discretion.chapo}
              </p>
            </div>
            <ul className="space-y-3">
              {contenu.discretion.points.map((point) => (
                <li key={point} className="flex gap-3 text-sm leading-relaxed text-white/90">
                  <Coche className="mt-1 h-4 w-4 shrink-0 text-alpes-300" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </Section>

        {/* -------------------------------------------------- comment ça marche */}
        <section className="bg-alpine text-white">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 py-section lg:grid-cols-2" data-anime>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-white/70">
                {contenu.fonctionnement.surtitre}
              </p>
              <h2 className="mt-3 font-display text-titre-section">
                {contenu.fonctionnement.titre}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-white/90">
                {contenu.fonctionnement.chapo}
              </p>
              <BoutonAction href={ancre} className="mt-6">
                {contenu.actions.commencer}
              </BoutonAction>
            </div>
            <ol className="space-y-4">
              {contenu.fonctionnement.etapes.map((etape, i) => (
                <li key={etape.titre} className="flex gap-3 text-sm">
                  <span className="font-semibold tabular-nums">{i + 1}.</span>
                  <span>
                    <span className="font-semibold">{etape.titre}</span> — {etape.texte}
                  </span>
                </li>
              ))}
              <li className="pt-2 text-sm text-white/90">
                {contenu.fonctionnement.conclusion.avant}{" "}
                <Link href={reserver} className="underline underline-offset-2 hover:text-white">
                  {contenu.fonctionnement.conclusion.lien}
                </Link>
                .
              </li>
            </ol>
          </div>
        </section>

        {/* -------------------------------------------------------- formulaire */}
        <Section fond="glacier" id={ANCRE_FORMULAIRE}>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_19rem]">
            <div>
              <EnTeteSection
                surtitre={contenu.formulaire.surtitre}
                titre={contenu.formulaire.titre}
                chapo={contenu.formulaire.chapo}
              />
              <div className="mt-8 rounded-xl border border-glacier-200 bg-white p-6 shadow-carte">
                <FormulaireDemandePremium lang={lang} champs={contenu.champs} />
              </div>
            </div>

            <aside className="space-y-6 lg:sticky lg:top-6 lg:h-fit">
              {/* Une part de cette clientèle appelle. Le numéro doit être lisible. */}
              <div className="rounded border border-glacier-200 bg-white p-5">
                <p className="font-display text-lg text-alpine">{contenu.encartTelephone.titre}</p>
                <p className="mt-2 text-sm leading-relaxed text-alpine-600">
                  {contenu.encartTelephone.texte}
                </p>
                <ul className="mt-4 space-y-2 text-sm">
                  <li>
                    <a
                      className="font-semibold text-alpine-700 hover:text-marque"
                      href={`tel:${ENTREPRISE.telephone}`}
                    >
                      {ENTREPRISE.telephoneAffiche}
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-alpine-700 hover:text-marque"
                      href={`mailto:${ENTREPRISE.email}`}
                    >
                      {ENTREPRISE.email}
                    </a>
                  </li>
                </ul>
              </div>

              {/* Le raccourci pour ceux qui n'ont besoin que d'un trajet. */}
              <div className="rounded border border-glacier-200 bg-glacier-50 p-5">
                <p className="font-display text-lg text-alpine">
                  {contenu.encartReservation.titre}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-alpine-600">
                  {contenu.encartReservation.texte}
                </p>
                <Link
                  href={reserver}
                  className="mt-4 inline-block rounded bg-marque px-5 py-2 text-sm font-semibold text-white transition hover:bg-marque-600"
                >
                  {contenu.encartReservation.bouton}
                </Link>
              </div>
            </aside>
          </div>
        </Section>

        <Faq items={faq} titre={contenu.faq.titre} surtitre={contenu.faq.surtitre} />
      </main>
      <Footer lang={lang} />
      <JsonLd
        data={grapheJsonLd(
          organisationSchema(),
          /*
            Les quatre prestations déclarées une par une. Sans ce nœud, un moteur
            de réponse interrogé sur « helicopter transfer to Courchevel » doit
            déduire de la prose que le service existe ; avec lui, il le lit.
          */
          serviceCatalogueSchema({
            id: "demandes-sur-mesure",
            chemin,
            nom: contenu.nomService,
            description: chapo,
            prestations: contenu.prestations.cartes.map((carte) => ({
              titre: carte.titre,
              texte: carte.texte,
            })),
          }),
          filArianeSchema(filAriane.map((e) => ({ nom: e.nom, path: e.chemin }))),
          faqSchema(faq),
        )}
      />
    </>
  );
}
