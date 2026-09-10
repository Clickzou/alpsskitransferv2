import Visuel, { type NomVisuel } from "@/components/Visuel";
import { HERO, REPERES_HERO } from "@/data/accueil";
import type { Lang } from "@/lib/i18n";
import { CHEMIN_TUNNEL } from "@/lib/reservation/config";
import { LIEUX } from "@/lib/reservation/lieux";
import FormulaireRecherche from "./FormulaireRecherche";

/**
 * Bandeau d'accueil : l'image, la promesse, et le formulaire de recherche.
 *
 * Le H1 de la page vit ici. Il reprend le titre de la home actuelle, qui porte la
 * requête de marque et l'offre — « Alps Ski Transfers – Private Airport Transfers
 * to Alpine Resorts ».
 *
 * **Le même bandeau sert les quatre langues.** L'accueil français, allemand et
 * italien utilisait jusqu'au 10 septembre 2026 le gabarit des pages
 * intérieures : fil d'Ariane, pas de formulaire, un bouton à la place. Un
 * visiteur allemand arrivait donc sur une page de contenu là où l'anglais
 * trouvait de quoi réserver — c'est la première marche du tunnel qui manquait,
 * pas une nuance de mise en page.
 */
export default function Hero({
  langue = "en",
  titre = HERO.titre,
  image = HERO.image,
  reperes = REPERES_HERO,
  tunnel = CHEMIN_TUNNEL,
}: {
  langue?: Lang;
  titre?: string;
  image?: { nom: NomVisuel; alt: string };
  reperes?: readonly { valeur: string; libelle: string }[];
  /** Le tunnel de la langue, vers lequel la recherche envoie. */
  tunnel?: string;
}) {
  // `overflow-clip` plutôt que `overflow-hidden` : il rogne l'image de fond comme
  // avant, mais laisse la liste de suggestions déborder du bandeau.
  return (
    <section className="relative isolate overflow-clip">
      <Visuel
        nom={image.nom}
        alt={image.alt}
        priority
        sizes="100vw"
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />
      {/*
        Deux voiles : un dégradé vertical qui assombrit le haut, où se trouvent
        l'accroche et le titre, et un voile uniforme plus léger sous le
        formulaire. Un seul voile à 45 % laissait le texte flotter sur la neige.
      */}
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-b from-alpine/85 via-alpine/60 to-alpine/80"
        aria-hidden="true"
      />

      {/*
        Le bandeau gagne 100 px sur grand écran (demande du 10 septembre 2026) :
        50 px de plus en haut et en bas. Le supplément est porté par le padding
        et non par une hauteur fixe — la photo est un fond, et un bandeau qui ne
        s'adapte plus à son contenu finit par le tronquer sur les écrans courts.
        Sur mobile, le rythme reste celui du reste du site.
      */}
      <div className="mx-auto max-w-6xl px-4 py-section sm:py-[calc(theme(spacing.section-lg)+50px)]">
        <div className="text-center">
          {/*
            L'accroche « Need a ride ? » a été retirée le 10 septembre 2026 : le
            titre dit déjà ce que fait l'entreprise, et deux aplats de couleur
            empilés au-dessus du formulaire retardaient l'accès à ce que le
            visiteur vient faire.
          */}
          <div>
            <h1 className="mx-auto inline-block max-w-3xl text-balance rounded-2xl bg-marque px-7 py-3 font-display text-lg leading-snug text-white shadow-carte sm:text-xl">
              {titre}
            </h1>
          </div>
        </div>

        {/*
          `relative z-20` n'est pas décoratif : le `backdrop-blur` du formulaire
          crée un contexte d'empilement, dans lequel le `z-20` de la liste de
          suggestions reste enfermé. Sans cette élévation du formulaire lui-même,
          les suggestions passaient sous les tuiles de chiffres qui le suivent.
        */}
        <div className="relative z-20 mt-10">
          <FormulaireRecherche lieux={LIEUX} langue={langue} tunnel={tunnel} />
        </div>

        {/* Les trois chiffres qui répondent à « est-ce que ça me concerne ? » */}
        <dl className="relative z-0 mt-10 grid gap-4 text-center sm:grid-cols-3">
          {reperes.map((repere) => (
            <div
              key={repere.libelle}
              className="rounded-xl border border-or/25 bg-alpine/40 px-4 py-3 backdrop-blur-sm"
            >
              <dt className="font-display text-2xl text-or-300">{repere.valeur}</dt>
              <dd className="mt-1 text-xs uppercase tracking-wide text-glacier-300">
                {repere.libelle}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
