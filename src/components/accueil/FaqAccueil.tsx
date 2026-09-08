import Visuel from "@/components/Visuel";
import { FAQ_ACCUEIL } from "@/data/accueil";

/**
 * FAQ de la home.
 *
 * En `<details>` natif plutôt qu'en accordéon JavaScript : le contenu des réponses
 * est présent dans le HTML, donc indexable et lisible sans script — c'est ce que
 * le balisage `FAQPage` déclare, il ne doit pas mentir.
 */
export default function FaqAccueil() {
  return (
    <section className="border-t border-glacier-200 bg-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-section-lg lg:grid-cols-[1fr_1.4fr]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-alpine-600">
            {FAQ_ACCUEIL.surtitre}
          </p>
          <h2 className="mt-3 font-display text-titre-section text-alpine">
            {FAQ_ACCUEIL.titre}
          </h2>
          <Visuel
            nom={FAQ_ACCUEIL.image.nom}
            alt={FAQ_ACCUEIL.image.alt}
            sizes="(min-width: 1024px) 30vw, 90vw"
            className="mt-6 h-56 w-full rounded object-cover"
          />
        </div>

        <div className="divide-y divide-glacier-200 rounded border border-glacier-200">
          {FAQ_ACCUEIL.questions.map((q, i) => (
            <details key={q.question} open={i === 0} className="group px-5 py-4">
              <summary className="cursor-pointer list-none font-medium text-alpine marker:content-none">
                <span className="flex items-start justify-between gap-4">
                  {q.question}
                  <span
                    aria-hidden="true"
                    className="mt-1 shrink-0 text-alpes transition group-open:rotate-45"
                  >
                    +
                  </span>
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-alpine-700">{q.reponse}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
