import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { aValider, decrire, heure, sensDeLaCourse } from "@/lib/admin/affichage";
import { courseParReference, statutLisible } from "@/lib/admin/courses";
import { factureDeReference } from "@/lib/admin/factures";
import { facturesActives } from "@/lib/reservation/stripe";
import { utilisateurCourant } from "@/lib/admin/session";
import { cheminFiche } from "@/lib/reservation/demandes";
import { actionRefuser, actionValider } from "../../actions";
import CarteSens from "../../CarteSens";
import Entete from "../../Entete";

/**
 * La fiche d'un client — là où mène l'e-mail « à valider ».
 *
 * Demande de JC, 11 septembre 2026 : pour chaque client, toutes les
 * informations du formulaire, le suivi de ses changements d'horaire, et les
 * factures ; et la décision sur une demande en attente, sans avoir à chercher
 * la course dans une liste. La demande est donc **en tête**, avec ses deux
 * boutons : c'est pour elle qu'on ouvre la fiche depuis l'e-mail.
 *
 * Les boutons n'envoient que la référence et le lot ; les heures sont relues
 * en base au moment du clic (`actions.ts`).
 */
export const dynamic = "force-dynamic";

const RETOURS: Record<string, { alerte: boolean; texte: string }> = {
  valide: {
    alerte: false,
    texte: "Nouvel horaire validé. Le client a reçu un e-mail de confirmation.",
  },
  "valide-sans-email": {
    alerte: true,
    texte:
      "Nouvel horaire validé, mais l’e-mail au client n’a pas pu partir : prévenez-le par téléphone.",
  },
  refuse: {
    alerte: false,
    texte: "Demande refusée. Le client a été prévenu par e-mail que l’horaire d’origine est maintenu.",
  },
  "refuse-sans-email": {
    alerte: true,
    texte:
      "Demande refusée, mais l’e-mail au client n’a pas pu partir : prévenez-le par téléphone.",
  },
  perimee: {
    alerte: true,
    texte: "Cette demande n’est plus en attente — déjà traitée, ou remplacée par une plus récente.",
  },
  passee: {
    alerte: true,
    texte: "L’heure demandée est déjà passée : la demande ne peut plus être validée.",
  },
  incoherente: {
    alerte: true,
    texte: "Avec cette demande, le retour tomberait avant l’aller : elle ne peut pas être validée.",
  },
  echec: { alerte: true, texte: "L’enregistrement a échoué. Réessayez dans un instant." },
};

function Bloc({ titre, children }: { titre: string; children: React.ReactNode }) {
  return (
    <section className="rounded-xl border border-glacier-200 bg-white p-5 shadow-carte">
      <h2 className="text-xs font-medium uppercase tracking-wide text-alpine-600">{titre}</h2>
      <div className="mt-3 space-y-1 text-sm text-alpine">{children}</div>
    </section>
  );
}

function Info({ libelle, children }: { libelle: string; children: React.ReactNode }) {
  return (
    <p>
      <span className="text-alpine-600">{libelle} : </span>
      {children}
    </p>
  );
}

export default async function FicheReservation({
  params,
  searchParams,
}: {
  params: Promise<{ reference: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { reference: brute } = await params;
  const reference = decodeURIComponent(brute);

  const utilisateur = await utilisateurCourant();
  if (!utilisateur) {
    redirect(
      `/gestion-ventes-tarifs-seo/connexion/?suite=${encodeURIComponent(cheminFiche(reference))}`,
    );
  }

  const course = await courseParReference(reference);
  if (!course) notFound();
  // La facture de la course, lue chez Stripe par sa référence.
  const facture = await factureDeReference(course.reference);

  const { fait } = await searchParams;
  const retour = typeof fait === "string" ? RETOURS[fait] : undefined;
  const attente = aValider(course);
  const lot = attente[0]?.lot ?? "";
  const statut = statutLisible(course.statut);

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <Entete email={utilisateur.email} actif="reservations" />

      <p className="mt-6 text-sm">
        <Link href="/gestion-ventes-tarifs-seo/" className="text-alpine-700 underline underline-offset-2">
          ← Toutes les réservations
        </Link>
      </p>

      <div className="mt-4 flex flex-wrap items-baseline justify-between gap-4">
        <h1 className="font-display text-2xl text-alpine">
          {course.client.nom} · {course.trajet}
        </h1>
        <p className="text-sm text-alpine-600">
          <span className="font-mono">{course.reference}</span> · {statut.texte}
        </p>
      </div>

      {retour ? (
        <p
          role="status"
          className={`mt-6 rounded border px-4 py-3 text-sm ${
            retour.alerte
              ? "border-or/40 bg-or-50 text-alpine-700"
              : "border-alpes/30 bg-alpes-50 text-alpine-700"
          }`}
        >
          {retour.texte}
        </p>
      ) : null}

      {attente.length > 0 ? (
        <section className="mt-6 rounded-xl border-2 border-marque/40 bg-white p-5 shadow-carte">
          <h2 className="font-display text-lg text-marque">Demande de changement à valider</h2>
          <ul className="mt-3 space-y-1 text-sm text-alpine">
            {attente.map((m, i) => (
              <li key={i}>{decrire(m)}</li>
            ))}
          </ul>
          <p className="mt-2 text-xs text-alpine-600">
            Demandée le {heure(attente[0].le)}. Tant qu’elle n’est pas validée, l’horaire
            d’origine tient.
          </p>

          <div className="mt-4 flex flex-wrap gap-3">
            <form action={actionValider}>
              <input type="hidden" name="reference" value={course.reference} />
              <input type="hidden" name="lot" value={lot} />
              <button
                type="submit"
                className="rounded bg-alpes px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-alpes-700"
              >
                Valider le nouvel horaire
              </button>
            </form>
            <form action={actionRefuser}>
              <input type="hidden" name="reference" value={course.reference} />
              <input type="hidden" name="lot" value={lot} />
              <button
                type="submit"
                className="rounded border border-marque/40 px-5 py-2.5 text-sm font-semibold text-marque transition hover:bg-marque/5"
              >
                Refuser
              </button>
            </form>
          </div>
          <p className="mt-3 text-xs text-alpine-600">
            Dans les deux cas, le client reçoit un e-mail dans sa langue.
          </p>
        </section>
      ) : null}

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <Bloc titre="Client">
          <p className="font-medium">{course.client.nom}</p>
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
        </Bloc>

        {/*
          Chaque sens au complet, même ce qu'il répète de l'autre — la même
          carte que dans la liste dépliée (`CarteSens`).
        */}
        {sensDeLaCourse(course).map((sens) => (
          <CarteSens key={sens.libelle} sens={sens} />
        ))}
        {course.retour ? null : (
          <Bloc titre="Retour">
            <p>Aller simple — pas de retour réservé.</p>
          </Bloc>
        )}

        <Bloc titre="Message du client">
          <p className="leading-relaxed">{course.message ?? "—"}</p>
        </Bloc>

        <Bloc titre="Paiement">
          <Info libelle="Montant">
            {course.montant} {course.devise === "EUR" ? "€" : course.devise}
          </Info>
          <Info libelle="Statut">{statut.texte}</Info>
          <Info libelle="Réservée le">{heure(course.creeLe)}</Info>
          {course.payeLe ? <Info libelle="Payée le">{heure(course.payeLe)}</Info> : null}
        </Bloc>

        <Bloc titre="Facture">
          {facture ? (
            <>
              <p className="font-mono">{facture.numero}</p>
              <p>
                {facture.statut} · {facture.ttc.toFixed(2).replace(".", ",")} € TTC, dont{" "}
                {facture.tva.toFixed(2).replace(".", ",")} € de TVA
              </p>
              {facture.pdf ? (
                <p>
                  <a className="text-marque underline underline-offset-2" href={facture.pdf}>
                    Télécharger le PDF
                  </a>
                </p>
              ) : null}
            </>
          ) : (
            <p className="text-alpine-600">
              {facturesActives()
                ? "Aucune facture pour cette course."
                : "Aucune facture : la facturation automatique n’est pas encore allumée."}
            </p>
          )}
        </Bloc>
      </div>

      <section className="mt-6 rounded-xl border border-glacier-200 bg-white p-5 shadow-carte">
        <h2 className="text-xs font-medium uppercase tracking-wide text-alpine-600">
          Historique des changements
        </h2>
        {course.historique.length > 0 ? (
          <ul className="mt-3 space-y-1 text-sm text-alpine">
            {course.historique.map((m, i) => (
              <li key={i}>
                <span className="tabular-nums text-alpine-600">{heure(m.le)}</span> — {decrire(m)}
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-3 text-sm text-alpine-600">Aucun changement depuis la réservation.</p>
        )}
      </section>
    </main>
  );
}
