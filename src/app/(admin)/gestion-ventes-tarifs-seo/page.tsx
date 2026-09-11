import Link from "next/link";
import { redirect } from "next/navigation";
import {
  adresseManquante,
  aValider,
  decrire,
  heure,
  sensDeLaCourse,
} from "@/lib/admin/affichage";
import { coursesAVenir, coursesPassees, statutLisible, type Course } from "@/lib/admin/courses";
import { utilisateurCourant } from "@/lib/admin/session";
import { cheminFiche } from "@/lib/reservation/demandes";
import { supabaseConfigure } from "@/lib/reservation/supabase";
import CarteSens from "./CarteSens";
import Entete from "./Entete";

/**
 * La liste des courses.
 *
 * L'ordre des colonnes n'est pas décoratif, c'est la demande de l'exploitant du
 * 10 septembre 2026 : il ne voyait pas la destination et devait rappeler chaque
 * client pour connaître le trajet. Le trajet vient donc juste après l'heure de
 * prise en charge, et l'adresse en station ensuite. Le montant en dernier.
 *
 * ## Un aller-retour, c'est deux lignes
 *
 * Remarque de JC, 11 septembre 2026 : « je vois les infos mais je ne comprends
 * pas tout ». La ligne ne montrait que l'aller, et le retour se devinait à
 * travers « 3 pax (7 au retour) » et « retour d'un autre lieu ». Chaque sens a
 * désormais sa ligne, repliée comme dépliée ; dépliée, chacun dit tout, même ce
 * qu'il répète de l'autre (`sensDeLaCourse`).
 */

function LigneCourse({ course }: { course: Course }) {
  const statut = statutLisible(course.statut);
  const couleur = {
    attente: "bg-or-50 text-or-700 border-or/40",
    confirme: "bg-alpes-50 text-alpes-700 border-alpes/40",
    annule: "bg-glacier-100 text-alpine-600 border-glacier-300",
  }[statut.ton];
  const sens = sensDeLaCourse(course);

  return (
    <details className="group border-b border-glacier-200 last:border-0">
      <summary className="grid cursor-pointer list-none gap-3 px-4 py-4 hover:bg-glacier-50 lg:grid-cols-[1fr_15rem] lg:items-start lg:gap-4">
        <div className="space-y-2">
          {sens.map((s) => (
            <div
              key={s.libelle}
              className="grid gap-x-4 gap-y-0.5 lg:grid-cols-[4.5rem_10rem_1fr_1fr_9rem] lg:items-baseline"
            >
              <span className="text-xs font-semibold uppercase tracking-wide text-alpine-600">
                {s.libelle}
              </span>
              <span className="font-medium tabular-nums text-alpine">{heure(s.quand)}</span>
              {/* La destination : la raison d'être de cet écran. */}
              <span className="font-semibold text-alpine">{s.trajet}</span>
              <span
                className={
                  s.adresseManquante ? "text-sm font-semibold text-marque" : "text-sm text-alpine-700"
                }
              >
                {s.adresse}
              </span>
              <span className="text-sm text-alpine-600">
                {s.passagers} pax · {s.vehicule}
              </span>
            </div>
          ))}

          {/* Une demande en attente, ou un changement passé, se voit sans déplier la ligne. */}
          {aValider(course).length > 0 ? (
            <p className="text-xs font-semibold text-marque">demande de changement à valider</p>
          ) : course.historique.length > 0 ? (
            <p className="text-xs text-or-700">modifiée par le client</p>
          ) : null}
          {/* Sans adresse, le chauffeur ne sait pas où aller : Nassim appelle le client. */}
          {adresseManquante(course) ? (
            <p className="text-xs font-semibold text-marque">
              adresse manquante — à demander au client
            </p>
          ) : null}
        </div>

        <span className="flex items-center gap-2 lg:justify-end">
          <span className={`whitespace-nowrap rounded-full border px-2 py-0.5 text-xs ${couleur}`}>
            {statut.texte}
          </span>
          <span className="whitespace-nowrap text-sm tabular-nums text-alpine-700">
            {course.montant} {course.devise === "EUR" ? "€" : course.devise}
          </span>
        </span>
      </summary>

      <div className="space-y-4 bg-glacier-50 px-4 py-4 text-sm">
        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <p className="text-xs uppercase tracking-wide text-alpine-600">Passager</p>
            <p className="mt-1 font-medium">{course.client.nom}</p>
            <p>
              <a className="underline" href={`tel:${course.client.telephone}`}>
                {course.client.telephone}
              </a>
            </p>
            <p>
              <a className="underline" href={`mailto:${course.client.email}`}>
                {course.client.email}
              </a>
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wide text-alpine-600">Paiement</p>
            <p className="mt-1">
              {statut.texte} · {course.montant} {course.devise === "EUR" ? "€" : course.devise}
            </p>
            {course.payeLe ? <p>Payée le {heure(course.payeLe)}</p> : null}
            <p className="mt-1 font-mono text-xs">{course.reference}</p>
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
            <p className="text-xs uppercase tracking-wide text-alpine-600">
              Modifications par le client
            </p>
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

function Tableau({ titre, courses, vide }: { titre?: string; courses: Course[]; vide: string }) {
  return (
    <section className={titre ? "mt-8" : "mt-3"}>
      {/* Sans titre quand la section qui l'enveloppe en porte déjà un. */}
      {titre ? (
        <h2 className="font-display text-lg text-alpine">
          {titre} <span className="text-sm font-normal text-alpine-600">({courses.length})</span>
        </h2>
      ) : null}

      <div className="mt-3 overflow-hidden rounded-xl border border-glacier-200 bg-white shadow-carte">
        {courses.length === 0 ? (
          <p className="px-4 py-8 text-center text-sm text-alpine-600">{vide}</p>
        ) : (
          <>
            <div className="hidden border-b border-glacier-200 bg-glacier-50 px-4 py-2 text-xs uppercase tracking-wide text-alpine-600 lg:grid lg:grid-cols-[1fr_15rem] lg:gap-4">
              <div className="grid gap-x-4 lg:grid-cols-[4.5rem_10rem_1fr_1fr_9rem]">
                <span>Sens</span>
                <span>Prise en charge</span>
                <span>Trajet</span>
                <span>Adresse en station</span>
                <span>Groupe</span>
              </div>
              <span className="text-right">Statut</span>
            </div>
            {courses.map((course) => (
              <LigneCourse key={course.reference} course={course} />
            ))}
          </>
        )}
      </div>
    </section>
  );
}

export default async function PageAdmin() {
  const utilisateur = await utilisateurCourant();
  if (!utilisateur) redirect("/gestion-ventes-tarifs-seo/connexion/");

  const [aVenir, passees] = await Promise.all([coursesAVenir(), coursesPassees(50)]);
  // Les demandes d'horaire en attente passent devant tout : tant qu'elles ne sont
  // pas tranchées, le client ne sait pas à quelle heure on vient le chercher.
  const demandes = aVenir.filter((course) => aValider(course).length > 0);
  /*
    Un paiement non abouti n'est pas une course : le client a ouvert la page
    Stripe et n'a pas payé. Mêlé aux vraies courses, il envoie un chauffeur pour
    rien — et les tentatives répétées d'un même client s'y affichaient en double.
    Il reste consultable, replié en bas : c'est un client qui a hésité, qu'on
    peut rappeler. Décision de JC, 11 septembre 2026.
  */
  const aAssurer = aVenir.filter((course) => course.statut !== "en-attente-paiement");
  const nonAboutis = aVenir.filter((course) => course.statut === "en-attente-paiement");

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <Entete email={utilisateur.email} actif="reservations" />
      <h1 className="sr-only">Réservations</h1>

      {demandes.length > 0 ? (
        <section className="mt-8">
          <h2 className="font-display text-lg text-marque">
            Demandes à valider{" "}
            <span className="text-sm font-normal text-alpine-600">({demandes.length})</span>
          </h2>
          <ul className="mt-3 divide-y divide-glacier-200 overflow-hidden rounded-xl border border-marque/30 bg-white shadow-carte">
            {demandes.map((course) => (
              <li key={course.reference}>
                <Link
                  href={cheminFiche(course.reference)}
                  className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 px-4 py-3 hover:bg-glacier-50"
                >
                  <span className="font-semibold text-alpine">
                    {course.trajet} · {course.client.nom}
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

      {!supabaseConfigure() ? (
        <p className="mt-8 rounded border border-or/40 bg-or-50 px-4 py-3 text-sm leading-relaxed text-alpine-700">
          La base n’est pas configurée sur cet environnement : renseignez
          <code className="mx-1 rounded bg-white px-1 text-xs">SUPABASE_SERVICE_ROLE_KEY</code>
          pour voir les courses. Les écrans, eux, fonctionnent.
        </p>
      ) : null}

      <Tableau
        titre="À venir"
        courses={aAssurer}
        vide="Aucune course à venir pour le moment."
      />

      <Tableau
        titre="Passées"
        courses={passees}
        vide="Aucune course passée."
      />

      {nonAboutis.length > 0 ? (
        <details className="mt-10">
          <summary className="cursor-pointer font-display text-lg text-alpine-600 hover:text-alpine">
            Paiements non aboutis{" "}
            <span className="text-sm font-normal">({nonAboutis.length})</span>
          </summary>
          <p className="mt-2 max-w-prose text-sm leading-relaxed text-alpine-600">
            Le client a ouvert la page de paiement sans payer. Ces courses ne sont pas à
            assurer ; elles restent ici pour rappeler un client qui a hésité.
          </p>
          <Tableau courses={nonAboutis} vide="Aucun paiement non abouti." />
        </details>
      ) : null}
    </main>
  );
}
