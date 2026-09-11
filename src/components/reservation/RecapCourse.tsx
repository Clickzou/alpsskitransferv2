import { LOCALES, type Lang } from "@/lib/i18n";
import type { CourseGestion } from "@/lib/reservation/dossier";
import type { TextesGestion } from "@/lib/reservation/textes";
import { formaterAlpes } from "@/lib/temps";

/**
 * La course, telle que le client la reconnaît.
 *
 * Aucun état, aucun `hook` : le composant sert donc aussi bien à la page rendue
 * sur le serveur — course annulée, course passée — qu'au formulaire côté
 * navigateur, qui réaffiche le même bloc après une modification. Un seul
 * gabarit, deux usages, et pas deux versions du récapitulatif à tenir d'accord.
 *
 * Les dates sont formatées **à l'heure des Alpes** et dans la langue de la page :
 * « 13:00 » doit dire treize heures à l'aéroport, quel que soit le fuseau du
 * serveur qui rend la page ou du téléphone qui la lit.
 */
export function quandLisible(iso: string, langue: Lang): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return formaterAlpes(date, LOCALES[langue], {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function Ligne({ libelle, children }: { libelle: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-glacier-200 py-3 last:border-b-0">
      <dt className="text-xs font-medium uppercase tracking-wide text-alpine-600">{libelle}</dt>
      <dd className="text-right text-sm text-alpine">{children}</dd>
    </div>
  );
}

export default function RecapCourse({
  course,
  langue,
  mots,
}: {
  course: CourseGestion;
  langue: Lang;
  mots: TextesGestion;
}) {
  return (
    <div className="rounded-xl border border-glacier-200 bg-white p-5 shadow-carte sm:p-6">
      <p className="font-display text-lg text-alpine">{course.trajetAller}</p>

      <dl className="mt-4">
        <Ligne libelle={mots.reference}>
          <strong className="tabular-nums">{course.reference}</strong>
        </Ligne>

        <Ligne libelle={mots.aller}>{quandLisible(course.aller, langue)}</Ligne>

        {course.retour ? (
          <Ligne libelle={mots.retour}>
            {quandLisible(course.retour, langue)}
            {/*
              Le retour qui ne reprend pas l'aller inversé est dit en toutes
              lettres : arriver à Genève et repartir de Lyon est le genre de
              détail qu'on veut relire sur sa confirmation, pas découvrir le
              jour du départ.
            */}
            {course.trajetRetour ? (
              <span className="mt-0.5 block text-xs text-alpine-600">{course.trajetRetour}</span>
            ) : null}
          </Ligne>
        ) : null}

        <Ligne libelle={mots.vehicule}>
          {course.vehicule} · {mots.passagers(course.passagers)}
          {/*
            Deux véhicules, deux effectifs : un aller-retour dont le groupe
            change n'a pas une ligne mais deux, sinon l'une des deux est fausse.
          */}
          {course.vehiculeRetour && course.vehiculeRetour !== course.vehicule ? (
            <span className="mt-0.5 block text-xs text-alpine-600">
              {mots.retour} : {course.vehiculeRetour}
              {course.passagersRetour ? ` · ${mots.passagers(course.passagersRetour)}` : null}
            </span>
          ) : course.passagersRetour && course.passagersRetour !== course.passagers ? (
            <span className="mt-0.5 block text-xs text-alpine-600">
              {mots.retour} : {mots.passagers(course.passagersRetour)}
            </span>
          ) : null}
        </Ligne>

        <Ligne libelle={mots.vol}>
          {course.vol ? (
            <span className="tabular-nums">{course.vol}</span>
          ) : (
            <span className="text-alpine-600">{mots.sansVol}</span>
          )}
        </Ligne>

        {course.montant > 0 ? (
          <Ligne libelle={mots.montant}>
            {/* « 610 € » en français et en allemand, « €610 » en anglais : comme le tunnel. */}
            <span className="tabular-nums">
              {new Intl.NumberFormat(LOCALES[langue], {
                style: "currency",
                currency: "EUR",
                maximumFractionDigits: 0,
              }).format(course.montant)}
            </span>{" "}
            <span className="text-alpine-600">
              {course.payee ? mots.paye : mots.aRegler}
            </span>
          </Ligne>
        ) : null}
      </dl>
    </div>
  );
}
