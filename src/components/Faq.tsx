import type { Faq as FaqItem } from "@/lib/resorts/types";
import { EnTeteSection } from "@/components/gabarit/Sections";

/**
 * FAQ d'une page du silo, au gabarit de celle de la home : deux colonnes,
 * `<details>` natif, première question ouverte.
 *
 * Les réponses sont dans le HTML, donc indexables et lisibles sans script — c'est
 * ce que le balisage `FAQPage` déclare, il ne doit pas mentir. La section occupe
 * toute la largeur : elle est posée par la page, pas par une colonne de contenu.
 */
export default function Faq({
  items,
  titre,
  surtitre = "Help",
}: {
  items: FaqItem[];
  titre: string;
  surtitre?: string;
}) {
  if (items.length === 0) return null;
  return (
    <section className="border-y border-glacier-200 bg-glacier-50">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-section lg:grid-cols-[1fr_1.4fr]" data-anime>
        <EnTeteSection surtitre={surtitre} titre={titre} />

        <div className="divide-y divide-glacier-200 rounded border border-glacier-200 bg-white">
          {items.map((item, i) => (
            <details key={i} open={i === 0} className="group px-5 py-4">
              <summary className="cursor-pointer list-none font-medium text-alpine marker:content-none">
                <span className="flex items-start justify-between gap-4">
                  {item.question}
                  <span
                    aria-hidden="true"
                    className="mt-1 shrink-0 text-alpes transition group-open:rotate-45"
                  >
                    +
                  </span>
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-alpine-700">{item.reponse}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
