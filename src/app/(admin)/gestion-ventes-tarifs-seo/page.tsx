import { redirect } from "next/navigation";
import Logo from "@/components/Logo";
import { coursesAVenir, coursesPassees, statutLisible, type Course } from "@/lib/admin/courses";
import { utilisateurCourant } from "@/lib/admin/session";
import { supabaseConfigure } from "@/lib/reservation/supabase";
import { actionDeconnexion } from "./actions";

/**
 * La liste des courses.
 *
 * L'ordre des colonnes n'est pas décoratif, c'est la demande de l'exploitant du
 * 10 septembre 2026 : il ne voyait pas la destination et devait rappeler chaque
 * client pour connaître le trajet. Le trajet est donc la deuxième colonne,
 * juste après l'heure de prise en charge, et l'adresse exacte en station la
 * troisième. Tout le reste vient après, y compris le montant.
 *
 * Les colonnes qui ne servent qu'occasionnellement — l'âge des enfants, le
 * message libre — sont dans le repli de chaque ligne : présentes, mais elles ne
 * volent pas la largeur à ce qu'on lit tous les jours.
 */

function heure(date: Date): string {
  return date.toLocaleString("fr-FR", {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function LigneCourse({ course }: { course: Course }) {
  const statut = statutLisible(course.statut);
  const couleur = {
    attente: "bg-or-50 text-or-700 border-or/40",
    confirme: "bg-alpes-50 text-alpes-700 border-alpes/40",
    annule: "bg-glacier-100 text-alpine-600 border-glacier-300",
  }[statut.ton];

  return (
    <details className="group border-b border-glacier-200 last:border-0">
      <summary className="grid cursor-pointer list-none gap-2 px-4 py-4 hover:bg-glacier-50 lg:grid-cols-[10rem_1fr_1fr_7rem_9rem] lg:items-baseline lg:gap-4">
        <span className="font-medium tabular-nums text-alpine">{heure(course.aller)}</span>

        {/* La destination : la raison d'être de cet écran. */}
        <span className="font-semibold text-alpine">{course.trajet}</span>

        <span className="text-sm text-alpine-700">{course.adresse}</span>

        <span className="text-sm text-alpine-600">
          {course.passagers} pax · {course.vehicule}
          {course.bagagesSki > 0 ? ` · ${course.bagagesSki} ski` : ""}
        </span>

        <span className="flex items-center gap-2">
          <span className={`rounded-full border px-2 py-0.5 text-xs ${couleur}`}>
            {statut.texte}
          </span>
          <span className="text-sm tabular-nums text-alpine-700">
            {course.montant} {course.devise === "EUR" ? "€" : course.devise}
          </span>
        </span>
      </summary>

      <div className="grid gap-4 bg-glacier-50 px-4 py-4 text-sm sm:grid-cols-2 lg:grid-cols-4">
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
          <p className="text-xs uppercase tracking-wide text-alpine-600">Vol</p>
          <p className="mt-1">{course.vol ?? "—"}</p>
          <p className="mt-3 text-xs uppercase tracking-wide text-alpine-600">Retour</p>
          <p className="mt-1">{course.retour ? heure(course.retour) : "Aller simple"}</p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-wide text-alpine-600">Enfants</p>
          <p className="mt-1">{course.enfants ?? "—"}</p>
          <p className="mt-3 text-xs uppercase tracking-wide text-alpine-600">Référence</p>
          <p className="mt-1 font-mono text-xs">{course.reference}</p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-wide text-alpine-600">Message</p>
          <p className="mt-1 leading-relaxed">{course.message ?? "—"}</p>
          {course.payeLe ? (
            <>
              <p className="mt-3 text-xs uppercase tracking-wide text-alpine-600">Payée le</p>
              <p className="mt-1">{heure(course.payeLe)}</p>
            </>
          ) : null}
        </div>
      </div>
    </details>
  );
}

function Tableau({ titre, courses, vide }: { titre: string; courses: Course[]; vide: string }) {
  return (
    <section className="mt-8">
      <h2 className="font-display text-lg text-alpine">
        {titre} <span className="text-sm font-normal text-alpine-600">({courses.length})</span>
      </h2>

      <div className="mt-3 overflow-hidden rounded-xl border border-glacier-200 bg-white shadow-carte">
        {courses.length === 0 ? (
          <p className="px-4 py-8 text-center text-sm text-alpine-600">{vide}</p>
        ) : (
          <>
            <div className="hidden border-b border-glacier-200 bg-glacier-50 px-4 py-2 text-xs uppercase tracking-wide text-alpine-600 lg:grid lg:grid-cols-[10rem_1fr_1fr_7rem_9rem] lg:gap-4">
              <span>Prise en charge</span>
              <span>Trajet</span>
              <span>Adresse en station</span>
              <span>Groupe</span>
              <span>Statut</span>
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

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-glacier-200 pb-6">
        <div className="flex items-center gap-4">
          <Logo lang="fr" />
          <h1 className="font-display text-lg text-alpine">Courses</h1>
        </div>

        <div className="flex items-center gap-4 text-sm">
          <span className="text-alpine-600">{utilisateur.email}</span>
          <form action={actionDeconnexion}>
            <button
              type="submit"
              className="rounded border border-glacier-300 px-3 py-1.5 text-alpine-700 transition hover:border-alpine/40 hover:bg-glacier-50"
            >
              Se déconnecter
            </button>
          </form>
        </div>
      </header>

      {!supabaseConfigure() ? (
        <p className="mt-8 rounded border border-or/40 bg-or-50 px-4 py-3 text-sm leading-relaxed text-alpine-700">
          La base n’est pas configurée sur cet environnement : renseignez
          <code className="mx-1 rounded bg-white px-1 text-xs">SUPABASE_SERVICE_ROLE_KEY</code>
          pour voir les courses. Les écrans, eux, fonctionnent.
        </p>
      ) : null}

      <Tableau
        titre="À venir"
        courses={aVenir}
        vide="Aucune course à venir pour le moment."
      />

      <Tableau
        titre="Passées"
        courses={passees}
        vide="Aucune course passée."
      />
    </main>
  );
}
