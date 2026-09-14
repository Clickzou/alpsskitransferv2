import { derniereDemandeAdresse, heure } from "@/lib/admin/affichage";
import type { Course } from "@/lib/admin/courses";
import { actionDemanderAdresse } from "./actions";
import BoutonConfirmation from "./BoutonConfirmation";

/**
 * « Demander l'adresse au client » — là où l'adresse manque, dans la liste
 * dépliée comme sur la fiche. Il dit quand elle a déjà été demandée, et la
 * confirmation le répète : écrire deux fois au client doit être un choix.
 */
export default function DemanderAdresse({ course }: { course: Course }) {
  const derniere = derniereDemandeAdresse(course);
  return (
    <form action={actionDemanderAdresse} className="flex flex-wrap items-center gap-x-3 gap-y-1">
      <input type="hidden" name="reference" value={course.reference} />
      <BoutonConfirmation
        libelle={derniere ? "Redemander l’adresse au client" : "Demander l’adresse au client"}
        confirmer={`${
          derniere ? `L’adresse a déjà été demandée le ${heure(derniere)}. ` : ""
        }Envoyer à ${course.client.email} un e-mail qui lui demande son adresse en station ?`}
        className="rounded bg-danger px-4 py-2 text-sm font-semibold text-white transition hover:bg-danger-700"
      />
      <span className="text-xs text-alpine-600">
        {derniere ? `Demandée le ${heure(derniere)}` : "Pas encore demandée"}
      </span>
    </form>
  );
}
