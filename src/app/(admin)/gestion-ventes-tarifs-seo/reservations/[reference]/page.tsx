import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import {
  adresseManquante,
  aValider,
  decrire,
  euros,
  heure,
  pastilleStatut,
  sensDeLaCourse,
} from "@/lib/admin/affichage";
import { courseParReference } from "@/lib/admin/courses";
import { factureDeReference, factureParId } from "@/lib/admin/factures";
import { utilisateurCourant } from "@/lib/admin/session";
import { cheminFiche } from "@/lib/reservation/demandes";
import { facturesActives } from "@/lib/reservation/stripe";
import {
  actionRefuser,
  actionRenvoyerPaiement,
  actionValider,
  actionVirementRecu,
} from "../../actions";
import BoutonConfirmation from "../../BoutonConfirmation";
import CarteSens from "../../CarteSens";
import DemanderAdresse from "../../DemanderAdresse";
import { remboursementsDe } from "@/lib/admin/remboursements";
import { disponible, suggestionRemboursement } from "@/lib/reservation/remboursement";
import { lirePaiementStripe } from "@/lib/reservation/stripe";
import Remboursement from "./Remboursement";
import Entete from "../../Entete";

/**
 * La fiche d'un client — là où mène l'e-mail « à valider ».
 *
 * Demande de JC, 11 septembre 2026 : pour chaque client, toutes les
 * informations du formulaire, le suivi de ses changements, la facture ; et la
 * décision sur une demande en attente, sans chercher la course dans une liste.
 *
 * Elle se lit par rangées (revue du 11 septembre) : Client | Paiement, puis
 * Aller | Retour côte à côte, puis Message | Facture. La demande à valider est
 * en tête, l'heure demandée écrite en gros ; les boutons qui écrivent au client
 * demandent confirmation et ne partent qu'une fois.
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
    texte: "Nouvel horaire validé, mais l’e-mail au client n’a pas pu partir : prévenez-le par téléphone.",
  },
  refuse: {
    alerte: false,
    texte: "Demande refusée. Le client a été prévenu par e-mail que l’horaire d’origine est maintenu.",
  },
  "refuse-sans-email": {
    alerte: true,
    texte: "Demande refusée, mais l’e-mail au client n’a pas pu partir : prévenez-le par téléphone.",
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
  annulee: { alerte: true, texte: "Cette réservation est annulée : rien ne peut plus y être changé." },
  echec: { alerte: true, texte: "L’enregistrement a échoué. Réessayez dans un instant." },
  cree: {
    alerte: false,
    texte: "Réservation créée. Le client a reçu un e-mail avec le moyen de payer et son lien.",
  },
  "cree-sans-email": {
    alerte: true,
    texte: "Réservation créée, mais l’e-mail au client n’a pas pu partir : utilisez « Renvoyer l’e-mail de paiement ».",
  },
  "cree-sans-lien": {
    alerte: true,
    texte: "Réservation créée, mais le lien de paiement n’a pas pu être fabriqué : le client a reçu l’e-mail sans lien. Utilisez « Renvoyer l’e-mail de paiement ».",
  },
  "deja-creee": {
    alerte: true,
    texte: "Cette réservation avait déjà été créée — le formulaire a été envoyé deux fois. Rien n’a été dupliqué.",
  },
  "virement-recu": {
    alerte: false,
    texte: "Virement noté : la réservation est payée, et le client a reçu sa confirmation.",
  },
  "virement-recu-facture": {
    alerte: true,
    texte: "Virement noté et client confirmé — mais Stripe n’a pas marqué la facture payée : vérifiez-la dans Stripe.",
  },
  "deja-payee": { alerte: true, texte: "Cette réservation est déjà payée." },
  renvoye: { alerte: false, texte: "L’e-mail de paiement est reparti chez le client." },
  "adresse-demandee": {
    alerte: false,
    texte: "L’e-mail est parti : le client a reçu, dans sa langue, le lien pour donner son adresse en station.",
  },
  "adresse-deja-demandee": {
    alerte: true,
    texte: "L’adresse vient déjà d’être demandée il y a moins de dix minutes : aucun second e-mail n’est parti.",
  },
  "adresse-deja-donnee": {
    alerte: false,
    texte: "Le client a déjà donné son adresse : aucun e-mail n’est parti.",
  },
  "adresse-course-passee": {
    alerte: true,
    texte: "Cette course est passée : aucun e-mail n’est parti.",
  },
  "adresse-echec": {
    alerte: true,
    texte: "L’e-mail n’a pas pu partir : vérifiez l’adresse e-mail du client, ou appelez-le.",
  },
  rembourse: {
    alerte: false,
    texte: "Remboursement envoyé par Stripe. Le client a reçu un e-mail ; sa banque l’affichera sous 5 à 10 jours ouvrés.",
  },
  "rembourse-note": {
    alerte: false,
    texte: "Remboursement par virement noté. Le client a reçu un e-mail.",
  },
  "rembourse-sans-email": {
    alerte: true,
    texte: "Remboursement fait, mais l’e-mail au client n’a pas pu partir : prévenez-le par téléphone.",
  },
  "remboursement-echec": {
    alerte: true,
    texte: "Stripe n’a pas accepté le remboursement : rien n’a été rendu. Réessayez, ou vérifiez le paiement dans Stripe.",
  },
  "remboursement-non-paye": { alerte: true, texte: "Cette course n’est pas payée : il n’y a rien à rembourser." },
  "renvoi-echec": {
    alerte: true,
    texte: "L’e-mail de paiement n’a pas pu partir : vérifiez l’adresse du client, ou appelez-le.",
  },
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
  let reference: string;
  try {
    reference = decodeURIComponent(brute);
  } catch {
    // Une adresse mal recopiée ne doit pas faire une erreur : la fiche n'existe pas, c'est tout.
    notFound();
  }

  const utilisateur = await utilisateurCourant();
  if (!utilisateur) {
    redirect(
      `/gestion-ventes-tarifs-seo/connexion/?suite=${encodeURIComponent(cheminFiche(reference))}`,
    );
  }

  const course = await courseParReference(reference);
  if (!course) notFound();
  // La facture par son identifiant quand on l'a ; sinon par la recherche Stripe.
  const facture = course.factureStripe
    ? await factureParId(course.factureStripe)
    : await factureDeReference(course.reference);

  const { fait, detail } = await searchParams;
  const retour =
    fait === "remboursement-refuse"
      ? { alerte: true, texte: `Rien n’a été remboursé. ${typeof detail === "string" ? detail : ""}` }
      : typeof fait === "string"
        ? RETOURS[fait]
        : undefined;

  /*
    Le remboursement : ce qui a été payé et déjà rendu, lu chez Stripe pour une
    carte (avec les frais qu'il a retenus), en base pour un virement.
  */
  const remboursements = course.payeLe ? await remboursementsDe(course.reference) : [];
  const stripe = course.payeLe && course.paiementStripe ? await lirePaiementStripe(course.paiementStripe) : null;
  const etatPaiement = stripe
    ? { paye: stripe.paye, dejaRembourse: stripe.rembourse, frais: stripe.frais }
    : {
        paye: course.montant,
        dejaRembourse: remboursements.reduce((s, r) => s + r.montant, 0),
        frais: null,
      };
  const rembourseTotal = etatPaiement.dejaRembourse;
  // La demande la plus récente : c'est elle que les boutons tranchent.
  const enAttente = aValider(course);
  const lot = enAttente[enAttente.length - 1]?.lot ?? "";
  const attente = enAttente.filter((m) => m.lot === lot);
  const pastille = pastilleStatut(course);
  const sens = sensDeLaCourse(course);
  const devise = course.devise === "EUR" ? "EUR" : course.devise;
  const boutonPrincipal =
    "rounded bg-marque px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-marque-600";
  const boutonSecondaire =
    "rounded border border-glacier-300 px-5 py-2.5 text-sm font-semibold text-alpine-700 transition hover:border-alpine/40 hover:bg-glacier-50";

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <Entete email={utilisateur.email} actif="reservations" />

      <p className="mt-6 text-sm">
        <Link href="/gestion-ventes-tarifs-seo/" className="text-alpine-700 underline underline-offset-2">
          ← Toutes les réservations
        </Link>
      </p>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-2xl text-alpine">
          {course.client.nom} · {course.trajet}
        </h1>
        <p className="flex flex-wrap items-center gap-2 text-sm text-alpine-600">
          <span className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${pastille.classes}`}>
            {pastille.texte}
          </span>
          <span className="font-mono">{course.reference}</span>
          {course.source === "telephone" ? <span>· réservation téléphonique</span> : null}
        </p>
      </div>

      {retour ? (
        <p
          role="status"
          className={`mt-6 rounded border px-4 py-3 text-sm ${
            retour.alerte
              ? "border-attention-300 bg-attention-50 text-attention-700"
              : "border-succes-300 bg-succes-50 text-succes-700"
          }`}
        >
          {retour.texte}
        </p>
      ) : null}

      {adresseManquante(course) ? (
        <div className="mt-6 space-y-3 rounded border border-danger-300 bg-danger-50 px-4 py-3">
          <p className="text-sm font-medium text-danger-700">
            Adresse manquante — à demander au client :{" "}
            <a className="underline" href={`tel:${course.client.telephone}`}>
              {course.client.telephone}
            </a>
          </p>
          <DemanderAdresse course={course} />
        </div>
      ) : null}

      {attente.length > 0 ? (
        <section className="mt-6 rounded-xl border-2 border-danger-300 bg-white p-5 shadow-carte">
          <h2 className="font-display text-lg text-danger">Demande de changement à valider</h2>
          <ul className="mt-3 space-y-2">
            {attente.map((m, i) => (
              <li key={i} className="text-base text-alpine">
                <span className="font-semibold">{m.champ === "retour" ? "Retour" : "Aller"}</span> :{" "}
                <span className="text-alpine-600">{m.ancien ? heure(new Date(m.ancien)) : "—"}</span>{" "}
                → <strong>{m.nouveau ? heure(new Date(m.nouveau)) : "—"}</strong>
              </li>
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
              <BoutonConfirmation
                libelle="Valider le nouvel horaire"
                confirmer="Valider le nouvel horaire ? Le client recevra un e-mail de confirmation."
                className={boutonPrincipal}
              />
            </form>
            <form action={actionRefuser}>
              <input type="hidden" name="reference" value={course.reference} />
              <input type="hidden" name="lot" value={lot} />
              <BoutonConfirmation
                libelle="Refuser"
                confirmer="Refuser la demande ? Le client recevra un e-mail : l’horaire d’origine est maintenu."
                className={boutonSecondaire}
              />
            </form>
          </div>
          <p className="mt-3 text-xs text-alpine-600">
            Dans les deux cas, le client reçoit un e-mail dans sa langue.
          </p>
        </section>
      ) : null}

      {/* Rangée 1 : qui, et où en est le paiement. */}
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <Bloc titre="Client">
          <p className="font-medium">{course.client.nom}</p>
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
        </Bloc>

        <Bloc titre="Paiement">
          <Info libelle="Montant">{euros(course.montant, devise)}</Info>
          <Info libelle="État">{pastille.texte}</Info>
          <Info libelle="Réservée le">{heure(course.creeLe)}</Info>
          {course.payeLe ? <Info libelle="Payée le">{heure(course.payeLe)}</Info> : null}
          {rembourseTotal > 0 ? (
            <Info libelle="Remboursé">
              <strong className="text-danger-700">{euros(rembourseTotal, devise)}</strong>
              {remboursements.length > 0
                ? ` (${remboursements.map((r) => `${euros(r.montant, devise)} le ${heure(r.le)}`).join(", ")})`
                : ""}
            </Info>
          ) : null}
          {course.payeLe && (course.paiementStripe ? stripe : true) ? (
            <Remboursement
              reference={course.reference}
              disponible={disponible(etatPaiement)}
              suggestion={suggestionRemboursement(etatPaiement, course.aller)}
              moyen={course.paiementStripe ? "carte" : "virement"}
              annulee={course.statut === "annulee"}
            />
          ) : course.payeLe && course.paiementStripe ? (
            <p className="mt-3 text-xs text-attention-700">
              Stripe ne répond pas : le remboursement n’est pas disponible pour le moment.
            </p>
          ) : null}
          {course.source === "telephone" ? (
            <Info libelle="Moyen de paiement">
              {course.modePaiement === "virement" ? "virement" : "carte"}
            </Info>
          ) : null}
          {course.source === "telephone" &&
          course.statut !== "payee" &&
          course.statut !== "annulee" ? (
            <div className="mt-3 flex flex-wrap gap-2">
              {course.modePaiement === "virement" ? (
                <form action={actionVirementRecu}>
                  <input type="hidden" name="reference" value={course.reference} />
                  <BoutonConfirmation
                    libelle="Virement reçu"
                    confirmer={`Confirmer la réception du virement de ${euros(course.montant, devise)} ? La course passera à « Payée » et le client recevra sa confirmation.`}
                    className={boutonPrincipal}
                  />
                </form>
              ) : null}
              <form action={actionRenvoyerPaiement}>
                <input type="hidden" name="reference" value={course.reference} />
                <BoutonConfirmation libelle="Renvoyer l’e-mail de paiement" className={boutonSecondaire} />
              </form>
            </div>
          ) : null}
        </Bloc>
      </div>

      {/* Rangée 2 : l'aller et le retour côte à côte, chacun au complet. */}
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {sens.map((s) => (
          <CarteSens key={s.libelle} sens={s} />
        ))}
        {course.retour ? null : (
          <Bloc titre="Retour">
            <p>Aller simple — pas de retour réservé.</p>
          </Bloc>
        )}
      </div>

      {/* Rangée 3 : ce que le client a écrit, et la facture. */}
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <Bloc titre="Message du client">
          <p className="leading-relaxed">{course.message ?? "—"}</p>
        </Bloc>

        <Bloc titre="Facture">
          {facture ? (
            <>
              <p className="font-mono">{facture.numero}</p>
              <p>
                {facture.statut} · {euros(facture.ttc)} TTC, dont {euros(facture.tva)} de TVA
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

      <section className="mt-4 rounded-xl border border-glacier-200 bg-white p-5 shadow-carte">
        <h2 className="text-xs font-medium uppercase tracking-wide text-alpine-600">Historique</h2>
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
