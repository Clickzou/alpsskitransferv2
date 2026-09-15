import Link from "next/link";
import { redirect } from "next/navigation";
import {
  adresseManquante,
  aValider,
  decrire,
  estAAssurer,
  euros,
  heure,
  modifieeParLeClient,
  pastilleStatut,
  sensDeLaCourse,
} from "@/lib/admin/affichage";
import {
  coursesAVenir,
  coursesPassees,
  rechercherCourses,
  type Course,
} from "@/lib/admin/courses";
import { utilisateurCourant } from "@/lib/admin/session";
import { cheminFiche } from "@/lib/reservation/demandes";
import { supabaseConfigure } from "@/lib/reservation/supabase";
import CarteSens from "./CarteSens";
import DemanderAdresse from "./DemanderAdresse";
import Entete from "./Entete";
import Recherche from "./Recherche";

/**
 * La liste des courses — la réponse à « qui je conduis, où, et qui je rappelle ».
 *
 * Demande de l'exploitant du 10 septembre 2026 : il ne voyait pas la
 * destination et devait rappeler chaque client. Le trajet est donc en tête de
 * chaque ligne, avec le nom et le téléphone du client : on sait qui et où sans
 * rien déplier (revue du 11 septembre 2026).
 *
 * Un aller-retour tient sur deux lignes, repliées comme dépliées ; dépliée,
 * chaque sens dit tout, même ce qu'il répète de l'autre (`sensDeLaCourse`).
 *
 * « À venir » ne montre que les courses **à assurer**. Les paiements
 * abandonnés et les annulées restent consultables, repliés en bas — dans la
 * vue du jour comme dans les résultats d'une recherche : mêlés aux vraies
 * courses, ils envoyaient un chauffeur pour rien.
 */

const LIMITE_PASSEES = 50;
const LIMITE_A_VENIR = 200;

/**
 * Trier par date d'achat — demande de JC, 15 septembre 2026 : les dernières
 * ventes en tête. Une course payée compte à son paiement ; une course pas
 * encore payée (devis, lien envoyé), à sa création.
 */
const dateAchat = (course: Course) => (course.payeLe ?? course.creeLe).getTime();
const parAchat = (liste: Course[]) => [...liste].sort((a, b) => dateAchat(b) - dateAchat(a));

function LigneCourse({ course, achat = false }: { course: Course; achat?: boolean }) {
  const pastille = pastilleStatut(course);
  const sens = sensDeLaCourse(course);
  const devise = course.devise === "EUR" ? "EUR" : course.devise;

  return (
    <details className="group border-b border-glacier-200 last:border-0">
      <summary className="grid cursor-pointer list-none gap-3 px-4 py-4 hover:bg-glacier-50 lg:grid-cols-[1fr_15rem] lg:items-start lg:gap-4 [&::-webkit-details-marker]:hidden">
        <div className="space-y-2">
          {/* Qui : on le sait sans déplier. Le chevron dit que la ligne s'ouvre. */}
          <p className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5 text-sm">
            <span
              aria-hidden="true"
              className="inline-block text-alpine-600 transition group-open:rotate-90"
            >
              ›
            </span>
            <span className="font-semibold text-alpine">{course.client.nom}</span>
            <span className="tabular-nums text-alpine-700">{course.client.telephone}</span>
            <span className="font-mono text-xs text-alpine-600">{course.reference}</span>
            {achat ? (
              <span className="text-xs text-alpine-600">
                {course.payeLe ? "payée le" : "créée le"} {heure(course.payeLe ?? course.creeLe)}
              </span>
            ) : null}
          </p>

          {sens.map((s) => (
            <div
              key={s.libelle}
              className="text-sm lg:grid lg:grid-cols-[4.5rem_10rem_1fr_1fr_8rem] lg:items-baseline lg:gap-x-4"
            >
              {/* Sur téléphone : deux lignes lisibles. Sur ordinateur : cinq colonnes. */}
              <p className="flex flex-wrap gap-x-2 lg:contents">
                <span className="text-xs font-semibold uppercase tracking-wide text-alpine-600">
                  {s.libelle}
                </span>
                <span className="font-medium tabular-nums text-alpine">{heure(s.quand)}</span>
                <span className="font-semibold text-alpine">{s.trajet}</span>
              </p>
              <p className="flex flex-wrap gap-x-2 lg:contents">
                <span className={s.adresseManquante ? "font-semibold text-danger" : "text-alpine-700"}>
                  {s.adresse}
                </span>
                <span aria-hidden="true" className="text-alpine-600 lg:hidden">
                  ·
                </span>
                <span className="text-alpine-600">
                  {s.passagers} passager{s.passagers > 1 ? "s" : ""} · {s.vehicule}
                </span>
              </p>
            </div>
          ))}

          {aValider(course).length > 0 ? (
            <p className="text-xs font-semibold text-danger">demande de changement à valider</p>
          ) : modifieeParLeClient(course) ? (
            <p className="text-xs text-attention-700">modifiée par le client</p>
          ) : null}
          {adresseManquante(course) ? (
            <p className="text-xs font-semibold text-danger">
              adresse manquante — à demander au client
            </p>
          ) : null}
          {course.source === "telephone" ? (
            <p className="text-xs text-alpine-600">réservation téléphonique</p>
          ) : null}
        </div>

        <span className="flex items-center gap-2 lg:justify-end">
          <span className={`whitespace-nowrap rounded-full border px-2 py-0.5 text-xs ${pastille.classes}`}>
            {pastille.texte}
          </span>
          <span className="whitespace-nowrap text-sm tabular-nums text-alpine-700">
            {euros(course.montant, devise)}
          </span>
        </span>
      </summary>

      <div className="space-y-4 bg-glacier-50 px-4 py-4 text-sm">
        {adresseManquante(course) ? <DemanderAdresse course={course} /> : null}

        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <p className="text-xs uppercase tracking-wide text-alpine-600">Client</p>
            <p className="mt-1 font-medium">{course.client.nom}</p>
            <p>
              <a className="underline" href={`tel:${course.client.telephone}`}>
                {course.client.telephone}
              </a>
            </p>
            <p>
              <a className="break-all underline" href={`mailto:${course.client.email}`}>
                {course.client.email}
              </a>
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wide text-alpine-600">Paiement</p>
            <p className="mt-1">
              {pastille.texte} · {euros(course.montant, devise)}
            </p>
            {course.payeLe ? <p>Payée le {heure(course.payeLe)}</p> : null}
            <p className="mt-1 font-mono text-xs">{course.reference}</p>
            {/*
              Le remboursement se fait sur la fiche, où l'on voit ce qui a déjà été
              rendu et les frais Stripe ; la liste y mène, formulaire ouvert
              (revue de JC, 14 septembre 2026 : il le cherchait ici).
            */}
            {course.payeLe ? (
              <Link
                href={`${cheminFiche(course.reference)}?rembourser=1#paiement`}
                className="mt-2 inline-block rounded border border-danger-300 px-3 py-1 text-xs font-semibold text-danger-700 hover:bg-danger-50"
              >
                Rembourser le client →
              </Link>
            ) : null}
          </div>

          <div>
            <p className="text-xs uppercase tracking-wide text-alpine-600">Message du client</p>
            <p className="mt-1 leading-relaxed">{course.message ?? "—"}</p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {sens.map((s) => (
            <CarteSens key={s.libelle} sens={s} />
          ))}
          {course.retour ? null : (
            <p className="rounded-lg border border-dashed border-glacier-300 p-4 text-alpine-600">
              Aller simple — pas de retour réservé.
            </p>
          )}
        </div>

        {course.historique.length > 0 ? (
          <div>
            <p className="text-xs uppercase tracking-wide text-alpine-600">Historique</p>
            <ul className="mt-1 space-y-1">
              {course.historique.map((m, i) => (
                <li key={i}>
                  <span className="tabular-nums text-alpine-600">{heure(m.le)}</span> —{" "}
                  {decrire(m)}
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <Link
          href={cheminFiche(course.reference)}
          className="inline-block text-sm font-semibold text-marque underline underline-offset-4"
        >
          Ouvrir la fiche du client →
        </Link>
      </div>
    </details>
  );
}

function Tableau({
  titre,
  courses,
  vide,
  note,
  achat = false,
}: {
  titre?: string;
  courses: Course[];
  vide: string;
  note?: string | null;
  achat?: boolean;
}) {
  return (
    <section className={titre ? "mt-8" : "mt-3"}>
      {titre ? (
        <h2 className="font-display text-lg text-alpine">
          {titre} <span className="text-sm font-normal text-alpine-600">({courses.length})</span>
        </h2>
      ) : null}
      {note ? <p className="mt-1 text-xs text-alpine-600">{note}</p> : null}

      <div className="mt-3 overflow-hidden rounded-xl border border-glacier-200 bg-white shadow-carte">
        {courses.length === 0 ? (
          <p className="px-4 py-8 text-center text-sm text-alpine-600">{vide}</p>
        ) : (
          <>
            <div className="hidden border-b border-glacier-200 bg-glacier-50 px-4 py-2 text-xs uppercase tracking-wide text-alpine-600 lg:grid lg:grid-cols-[1fr_15rem] lg:gap-4">
              <div className="grid gap-x-4 lg:grid-cols-[4.5rem_10rem_1fr_1fr_8rem]">
                <span>Sens</span>
                <span>Prise en charge</span>
                <span>Trajet</span>
                <span>Adresse en station</span>
                <span>Passagers</span>
              </div>
              <span className="text-right">Statut</span>
            </div>
            {courses.map((course) => (
              <LigneCourse key={course.reference} course={course} achat={achat} />
            ))}
          </>
        )}
      </div>
    </section>
  );
}

/** Les courses sans suite — annulées, paiements abandonnés —, repliées : consultables, pas mêlées. */
function SansSuite({
  courses,
  contexte,
  achat = false,
}: {
  courses: Course[];
  contexte: string;
  achat?: boolean;
}) {
  if (courses.length === 0) return null;
  return (
    <details className="mt-10">
      <summary className="cursor-pointer font-display text-lg text-alpine-600 hover:text-alpine">
        Annulées et paiements non aboutis {contexte}
        <span className="text-sm font-normal"> ({courses.length})</span>
      </summary>
      <p className="mt-2 max-w-prose text-sm leading-relaxed text-alpine-600">
        Rien à assurer ici : une course annulée, ou un client qui a ouvert la page de paiement
        sans payer — un client qui a hésité, qu’on peut rappeler.
      </p>
      <Tableau courses={achat ? parAchat(courses) : courses} vide="Rien ici." achat={achat} />
    </details>
  );
}

export default async function PageAdmin({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const utilisateur = await utilisateurCourant();
  if (!utilisateur) redirect("/gestion-ventes-tarifs-seo/connexion/");

  const params = await searchParams;
  const texte = (valeur: unknown) => (typeof valeur === "string" ? valeur : "");
  const critere = { q: texte(params.q), du: texte(params.du), au: texte(params.au) };
  const tri = params.tri === "achat" ? "achat" : "prise";
  const achat = tri === "achat";

  const [aVenir, passees, resultats] = await Promise.all([
    coursesAVenir(LIMITE_A_VENIR),
    coursesPassees(LIMITE_PASSEES),
    rechercherCourses(critere),
  ]);

  // Les demandes d'horaire passent devant tout : tant qu'elles ne sont pas
  // tranchées, le client ne sait pas à quelle heure on vient le chercher.
  const demandes = aVenir.filter((course) => aValider(course).length > 0);
  const sansSuite = (liste: Course[]) => liste.filter((c) => !estAAssurer(c));

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <Entete email={utilisateur.email} actif="reservations" />
      <h1 className="sr-only">Réservations</h1>

      <div className="mt-6 flex justify-end">
        <Link
          href="/gestion-ventes-tarifs-seo/nouvelle/"
          className="rounded bg-marque px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-marque-600"
        >
          + Nouvelle réservation (téléphone)
        </Link>
      </div>

      <Recherche q={critere.q} du={critere.du} au={critere.au} tri={tri} />

      {!supabaseConfigure() ? (
        <p className="mt-8 rounded border border-danger-300 bg-danger-50 px-4 py-3 text-sm leading-relaxed text-danger-700">
          Les réservations ne peuvent pas être lues pour le moment — prévenez Clickzou.
        </p>
      ) : null}

      {resultats ? (
        <>
          <Tableau
            titre="Résultats"
            courses={achat ? parAchat(resultats.filter(estAAssurer)) : resultats.filter(estAAssurer)}
            achat={achat}
            vide="Aucune course à assurer ne correspond à cette recherche."
            note={
              resultats.length >= 200
                ? "Les 200 premières seulement — précisez la recherche pour voir la suite."
                : null
            }
          />
          <SansSuite courses={sansSuite(resultats)} contexte="dans ces résultats" achat={achat} />
        </>
      ) : (
        <>
          {demandes.length > 0 ? (
            <section className="mt-8">
              <h2 className="font-display text-lg text-danger">
                Demandes à valider{" "}
                <span className="text-sm font-normal text-alpine-600">({demandes.length})</span>
              </h2>
              <ul className="mt-3 divide-y divide-glacier-200 overflow-hidden rounded-xl border border-danger-300 bg-white shadow-carte">
                {demandes.map((course) => (
                  <li key={course.reference}>
                    <Link
                      href={cheminFiche(course.reference)}
                      className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 px-4 py-3 hover:bg-glacier-50"
                    >
                      <span className="font-semibold text-alpine">
                        {course.client.nom} · {course.trajet}
                      </span>
                      <span className="text-sm text-alpine-700">
                        {aValider(course).map(decrire).join(" · ")}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {achat ? (
            <Tableau
              titre="Par date d’achat"
              courses={parAchat([...aVenir, ...passees].filter(estAAssurer))}
              vide="Aucune réservation pour le moment."
              note={`Les dernières ventes en tête — les ${LIMITE_A_VENIR} prochaines courses et les ${LIMITE_PASSEES} dernières passées.`}
              achat
            />
          ) : (
          <>
          <Tableau
            titre="À venir"
            courses={aVenir.filter(estAAssurer)}
            vide="Aucune course à venir pour le moment."
            note={
              aVenir.length >= LIMITE_A_VENIR
                ? `Les ${LIMITE_A_VENIR} prochaines seulement — utilisez la recherche par dates pour la suite.`
                : null
            }
          />

          <Tableau
            titre="Passées"
            courses={passees.filter(estAAssurer)}
            vide="Aucune course passée."
            note={`Les ${LIMITE_PASSEES} dernières — pour plus ancien, utilisez la recherche.`}
          />
          </>
          )}

          <SansSuite
            courses={[...aVenir.filter((c) => !estAAssurer(c)), ...sansSuite(passees)]}
            contexte=""
            achat={achat}
          />
        </>
      )}
    </main>
  );
}
