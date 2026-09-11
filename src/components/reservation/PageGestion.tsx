import Link from "next/link";
import FilAriane from "@/components/FilAriane";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Gestion from "@/components/reservation/Gestion";
import RecapCourse from "@/components/reservation/RecapCourse";
import { HeroInterieur, Section } from "@/components/gabarit/Sections";
import { ENTREPRISE } from "@/data/site";
import type { Lang } from "@/lib/i18n";
import { lienAccueil, lienContact } from "@/lib/intl/navigation";
import { T } from "@/lib/intl/textes";
import { chargerDossier } from "@/lib/reservation/dossier";
import { CHEMIN_GESTION } from "@/lib/reservation/gestion";
import { TEXTES_GESTION } from "@/lib/reservation/textes";

/**
 * `/manage-booking/` et ses trois sœurs — la page du lien de confirmation.
 *
 * ## Pourquoi une seule page pour quatre URL
 *
 * Le parcours est identique dans les quatre langues : on arrive par un lien
 * signé, on relit sa course, on déplace son heure. Seuls les mots changent. Une
 * page par langue dupliquerait quatre fois la logique de garde — le jeton, les
 * vingt-quatre heures, la course annulée — c'est-à-dire quatre occasions de
 * n'en corriger que trois.
 *
 * ## Elle n'est jamais mise en cache
 *
 * Elle lit la base à chaque appel, avec des paramètres qui changent à chaque
 * visiteur : `force-dynamic` est posé par les routes qui l'utilisent. Une page
 * de réservation servie depuis le cache montrerait la course d'un autre.
 *
 * ## Elle n'est pas indexable
 *
 * `noindex` dans les métadonnées de chaque route. Elle n'a rien à faire dans un
 * moteur de recherche : sans jeton valide, elle ne montre rien ; avec, elle
 * montre le trajet de quelqu'un.
 */
export default async function PageGestion({
  lang,
  reference,
  jeton,
}: {
  lang: Lang;
  reference: string | null;
  jeton: string | null;
}) {
  const t = T(lang);
  const mots = TEXTES_GESTION[lang];
  const contact = lienContact(lang);
  const dossier = await chargerDossier(reference, jeton);

  /*
    Un refus n'est pas une impasse : il porte toujours les deux chemins qui
    restent — écrire, ou appeler. C'est la règle du tunnel appliquée ici : le
    serveur dit d'où vient le refus, et la page laisse une issue.
  */
  const refus: Record<string, { titre: string; texte: string }> = {
    "lien-invalide": { titre: mots.lienInvalideTitre, texte: mots.lienInvalideTexte },
    indisponible: { titre: mots.indisponibleTitre, texte: mots.indisponibleTexte },
    introuvable: { titre: mots.introuvableTitre, texte: mots.introuvableTexte },
    annulee: { titre: mots.annuleeTitre, texte: mots.annuleeTexte },
    passee: { titre: mots.passeeTitre, texte: mots.passeeTexte },
  };

  return (
    <>
      <Header lang={lang} />
      <main id="contenu">
        <HeroInterieur>
          <FilAriane
            clair
            elements={[
              { nom: t.accueil, chemin: lienAccueil(lang) },
              { nom: mots.fil, chemin: CHEMIN_GESTION[lang] },
            ]}
          />
          <h1 className="mt-4 max-w-3xl text-balance font-display text-titre-page">
            {mots.titre}
          </h1>
          <p className="mt-4 max-w-2xl text-chapo text-glacier-200">{mots.chapo}</p>
        </HeroInterieur>

        <Section fond="blanc">
          {dossier.etat === "ouverte" || dossier.etat === "tardive" ? (
            <Gestion
              course={dossier.course}
              jeton={jeton ?? ""}
              langue={lang}
              tardif={dossier.etat === "tardive"}
              modifiable={
                dossier.etat === "ouverte" ? dossier.modifiable : { aller: false, retour: false }
              }
              lienContact={contact}
            />
          ) : (
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_21rem]">
              {/*
                La course reste affichée quand elle existe — annulée ou déjà
                faite. Celui qui ouvre ce lien cherche d'abord à reconnaître son
                trajet ; lui répondre « non » sans lui montrer de quoi on parle
                l'oblige à rouvrir son e-mail pour comprendre.
              */}
              <div className="space-y-6">
                {"course" in dossier ? (
                  <RecapCourse course={dossier.course} langue={lang} mots={mots} />
                ) : null}
              </div>

              <aside>
                <div className="rounded-xl border border-glacier-200 bg-glacier-50 p-5">
                  <p className="font-display text-lg text-alpine">
                    {refus[dossier.etat].titre}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-alpine-700">
                    {refus[dossier.etat].texte}
                  </p>

                  <Link
                    href={contact}
                    className="mt-4 inline-block rounded bg-marque px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-marque-600"
                  >
                    {mots.ecrire}
                  </Link>

                  <a
                    href={`tel:${ENTREPRISE.telephone}`}
                    className="mt-3 block text-sm text-alpine-700 underline underline-offset-2 hover:text-marque"
                  >
                    {mots.appeler} · {ENTREPRISE.telephoneAffiche}
                  </a>
                </div>

                <Link
                  href={lienAccueil(lang)}
                  className="mt-4 block text-center text-sm text-alpine-700 underline underline-offset-2 hover:text-marque"
                >
                  {mots.retourSite}
                </Link>
              </aside>
            </div>
          )}
        </Section>
      </main>
      <Footer lang={lang} />
    </>
  );
}
