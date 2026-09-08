import Link from "next/link";
import type { ReactNode } from "react";
import Visuel, { type NomVisuel } from "@/components/Visuel";
import { ETAPES, REASSURANCES } from "@/data/accueil";
import { lienReservation } from "@/lib/reservation/config";

/**
 * Le vocabulaire visuel de la home, disponible pour les pages du silo.
 *
 * La maquette validée par le client tient en quelques motifs : un bandeau
 * photographique voilé de bleu nuit, des sections à fonds alternés (blanc,
 * glacier, bleu nuit, vert), des coches vertes pour la réassurance, et le magenta
 * réservé au seul appel à l'action. Les pages de station, de trajet et les hubs
 * reprennent ces motifs d'ici plutôt que de les recopier : une correction de
 * design se fait alors en un seul endroit.
 */

/* --------------------------------------------------------------- éléments */

/** Coche verte, reprise du bandeau de réassurance de la maquette. */
export function Coche({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
      className={`h-5 w-5 ${className}`}
    >
      <path
        fillRule="evenodd"
        d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.5 7.5a1 1 0 0 1-1.4 0L3.3 9.7a1 1 0 1 1 1.4-1.4l3.8 3.8 6.8-6.8a1 1 0 0 1 1.4 0Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

/**
 * Repères chiffrés du bandeau : distance, durée, nombre d'aéroports desservis.
 *
 * Ils portent l'information que le visiteur cherche en arrivant — « c'est loin
 * comment ? » — avant tout paragraphe. Sur fond sombre uniquement.
 */
export function Reperes({ items }: { items: { libelle: string; valeur: string }[] }) {
  if (items.length === 0) return null;
  return (
    <dl className="mt-6 flex flex-wrap gap-3">
      {items.map((item) => (
        <div
          key={item.libelle}
          className="rounded border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-sm"
        >
          <dt className="text-[0.65rem] font-semibold uppercase tracking-widest text-glacier-300">
            {item.libelle}
          </dt>
          <dd className="font-display text-lg text-white">{item.valeur}</dd>
        </div>
      ))}
    </dl>
  );
}

/** Bouton d'action — magenta, la seule couleur qui appelle au clic. */
export function BoutonAction({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`inline-block rounded bg-marque px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-marque-600 ${className}`}
    >
      {children}
    </Link>
  );
}

/* ---------------------------------------------------------------- bandeau */

/**
 * Bandeau d'une page intérieure : la photo, le voile bleu nuit, et ce que
 * l'appelant y place — fil d'Ariane, H1, chapô, repères, appel à l'action.
 *
 * Le H1 reste **chez l'appelant** : le contrôle SEO de prebuild ne suit les H1
 * que d'un niveau depuis la route, et surtout chaque type de page a sa propre
 * façon de le formuler.
 */
export function HeroInterieur({
  image,
  children,
}: {
  image?: { nom: NomVisuel; alt: string };
  children: ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-alpine text-white">
      {image ? (
        <>
          <Visuel
            nom={image.nom}
            alt={image.alt}
            priority
            sizes="100vw"
            className="absolute inset-0 -z-10 h-full w-full object-cover"
          />
          {/*
            Deux voiles superposés plutôt qu'un seul : un dégradé horizontal qui
            garde la photo visible à droite, et un voile uniforme léger qui
            garantit le contraste du texte même sur une photo très claire — la
            neige au soleil vaut du blanc pur.
          */}
          <div
            className="absolute inset-0 -z-10 bg-gradient-to-r from-alpine via-alpine/90 to-alpine/45"
            aria-hidden="true"
          />
          <div className="absolute inset-0 -z-10 bg-alpine/25" aria-hidden="true" />
        </>
      ) : null}
      <div className="mx-auto max-w-6xl px-4 py-section sm:py-16">{children}</div>
    </section>
  );
}

/* --------------------------------------------------------------- sections */

const FONDS = {
  blanc: "bg-white",
  glacier: "border-y border-glacier-200 bg-glacier-50",
  nuit: "bg-alpine-900 text-white",
  bleu: "bg-alpine text-white",
} as const;

export function Section({
  fond = "blanc",
  children,
  className = "",
}: {
  fond?: keyof typeof FONDS;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={FONDS[fond]}>
      <div className={`mx-auto max-w-6xl px-4 py-section ${className}`}>{children}</div>
    </section>
  );
}

/** Surtitre en capitales, titre de section, chapô — l'en-tête de la maquette. */
export function EnTeteSection({
  surtitre,
  titre,
  chapo,
  clair = false,
  centre = false,
}: {
  surtitre?: string;
  titre: string;
  chapo?: string;
  /** Sur fond sombre. */
  clair?: boolean;
  centre?: boolean;
}) {
  return (
    <div className={centre ? "text-center" : ""}>
      {surtitre ? (
        <p
          className={`text-xs font-semibold uppercase tracking-widest ${
            clair ? "text-glacier-300" : "text-alpine-600"
          }`}
        >
          {surtitre}
        </p>
      ) : null}
      <h2
        className={`font-display text-titre-section ${surtitre ? "mt-3" : ""} ${
          clair ? "text-white" : "text-alpine"
        }`}
      >
        {titre}
      </h2>
      {chapo ? (
        <p
          className={`mt-3 max-w-prose text-sm leading-relaxed ${centre ? "mx-auto" : ""} ${
            clair ? "text-glacier-200" : "text-alpine-600"
          }`}
        >
          {chapo}
        </p>
      ) : null}
    </div>
  );
}

/**
 * Carte de lien — une station, un trajet, un aéroport, un article.
 *
 * Le `meta` porte le chiffre utile (distance, durée, nombre de trajets) : c'est
 * ce qui distingue une aide au choix d'une simple liste de liens.
 */
export function CarteLien({
  href,
  titre,
  meta,
  texte,
  action,
  clair = false,
}: {
  href: string;
  titre: string;
  meta?: string;
  texte?: string;
  action?: string;
  clair?: boolean;
}) {
  return (
    <Link
      href={href}
      className={
        clair
          ? "group flex h-full flex-col rounded border border-white/15 p-4 transition hover:border-alpes hover:bg-white/5"
          : "group flex h-full flex-col rounded border border-glacier-200 bg-white p-4 transition hover:border-alpes hover:shadow-carte"
      }
    >
      <div className="flex items-baseline justify-between gap-3">
        <span
          className={`font-display text-base font-semibold ${clair ? "text-white" : "text-alpine"}`}
        >
          {titre}
        </span>
        {meta ? (
          <span
            className={`shrink-0 text-xs tabular-nums ${
              clair ? "text-glacier-300" : "text-alpine-600"
            }`}
          >
            {meta}
          </span>
        ) : null}
      </div>
      {texte ? (
        <span
          className={`mt-2 flex-1 text-sm leading-relaxed ${
            clair ? "text-glacier-200" : "text-alpine-600"
          }`}
        >
          {texte}
        </span>
      ) : null}
      {action ? (
        <span className="mt-3 text-sm font-medium text-marque group-hover:underline">
          {action} →
        </span>
      ) : null}
    </Link>
  );
}

/* ------------------------------------------------------------ réassurance */

/**
 * Les trois promesses de la home, sous le bandeau.
 *
 * Le niveau de titre se choisit : `h2` sur la home, où elles forment une section
 * à part entière ; `p` sur les pages du silo, où le plan de titres appartient au
 * contenu éditorial et ne doit pas être dilué par trois titres d'interface.
 */
const REASSURANCES_FR = [
  {
    titre: "Prix garanti",
    texte:
      "Le prix est fixe, annoncé par véhicule avant la réservation, péages et housses à skis compris. Rien ne s'ajoute à l'arrivée.",
  },
  {
    titre: "Véhicules équipés hiver",
    texte:
      "Pneus et chaînes à bord toute la saison, comme la loi l'impose en Savoie et Haute-Savoie du 1ᵉʳ novembre au 31 mars.",
  },
  {
    titre: "Vol suivi",
    texte:
      "Votre chauffeur suit votre vol : un retard décale la prise en charge, sans supplément et sans démarche de votre part.",
  },
] as const;

export function BandeauReassurance({
  niveau = "p",
  langue = "en",
}: {
  niveau?: "h2" | "p";
  langue?: "en" | "fr";
}) {
  const Titre = niveau;
  const promesses = langue === "fr" ? REASSURANCES_FR : REASSURANCES;
  return (
    <section className="border-b border-glacier-200 bg-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-3">
        {promesses.map((r) => (
          <div key={r.titre} className="flex gap-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-alpes-50 text-alpes">
              <Coche />
            </span>
            <div>
              <Titre className="font-display text-base font-semibold text-alpine">{r.titre}</Titre>
              <p className="mt-1 text-sm leading-relaxed text-alpine-600">{r.texte}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* -------------------------------------------------------- appel à l'action */

/**
 * Bande verte de fin de page : la promesse, les trois étapes de réservation
 * reprises de la home, et le bouton. Elle ferme toutes les pages du silo — une
 * page de station qui ne propose rien à faire est une page qui ne vend pas.
 */
export function AppelAction({
  titre,
  texte,
  lien,
  action = "Book now",
}: {
  titre: string;
  texte?: string;
  /** Par défaut, le moteur de réservation — ou son repli WooCommerce. */
  lien?: string;
  action?: string;
}) {
  const destination = lien ?? lienReservation();
  return (
    <section className="bg-alpes text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-section lg:grid-cols-2">
        <div>
          <h2 className="font-display text-titre-section">{titre}</h2>
          <p className="mt-3 text-sm text-white/90">{texte ?? ETAPES.chapo}</p>
          <BoutonAction href={destination} className="mt-6">
            {action}
          </BoutonAction>
        </div>
        <ol className="space-y-4">
          {ETAPES.etapes.map((etape, i) => (
            <li key={etape.titre} className="flex gap-3 text-sm">
              <span className="font-semibold">{i + 1}.</span>
              <span>
                <span className="font-semibold">{etape.titre}</span> — {etape.texte}
              </span>
            </li>
          ))}
          <li className="pt-2 text-sm text-white/90">{ETAPES.conclusion}</li>
        </ol>
      </div>
    </section>
  );
}
