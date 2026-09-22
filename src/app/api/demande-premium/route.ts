import { NextResponse } from "next/server";
import { ENTREPRISE } from "@/data/site";
import { CLES_DEMANDE, LIBELLES_EXPLOITANT, type CleDemande } from "@/data/page-premium";
import { emailConfigure, envoyer } from "@/lib/reservation/email";

/**
 * Formulaire des demandes sur mesure — `/luxury-ski-transfers-alps/` et ses trois
 * traductions, qui postent toutes ici.
 *
 * Mêmes principes que `/api/contact/` : on ne ment pas sur l'envoi, on valide
 * côté serveur, on ne stocke rien. Deux différences, qui tiennent au dossier
 * qu'elle sert :
 *
 * 1. **L'e-mail est mis en forme comme une fiche**, pas comme un message. Une
 *    demande de mise à disposition se chiffre sur des lignes précises — nature,
 *    dates, points, passagers — et l'exploitant répond depuis son téléphone,
 *    souvent en conduisant entre deux courses. Un pavé de texte l'oblige à
 *    reconstituer la demande ; une fiche se lit en dix secondes.
 * 2. **Le sujet porte la nature de la demande, toujours en français.**
 *    « Hélicoptère » ou « Mariage » en objet permet de trier une boîte de
 *    réception sans l'ouvrir, et de retrouver un dossier trois mois plus tard —
 *    y compris quand la demande vient de la page allemande.
 *
 * Aucun accusé de réception n'est envoyé au demandeur, et c'est délibéré :
 * ce serait un e-mail partant vers une adresse saisie par un inconnu, donc un
 * relais de courrier indésirable offert à qui remplirait le formulaire avec
 * l'adresse d'un tiers. La confirmation s'affiche à l'écran, où elle ne peut
 * servir qu'à celui qui vient d'écrire.
 *
 * POST /api/demande-premium
 *   { nom, email, type (clé), langue, details, telephone?, societe?, debut?, fin?,
 *     depart?, destination?, passagers?, budget? }
 */
export const dynamic = "force-dynamic";

/** Longueurs maximales : au-delà, c'est un robot ou une erreur de copier-coller. */
const LIMITES = {
  nom: 120,
  email: 200,
  telephone: 40,
  societe: 160,
  lieu: 160,
  budget: 80,
  date: 10,
  details: 5000,
};

function texte(valeur: unknown, max: number): string {
  return typeof valeur === "string" ? valeur.trim().slice(0, max) : "";
}

/** Validation volontairement permissive : refuser une adresse valide est pire. */
function emailPlausible(valeur: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(valeur);
}

/**
 * Le nombre de passagers tel qu'il arrivera dans l'e-mail : un entier, ou rien.
 * Un « 12 people » tapé dans un champ numérique n'arrive de toute façon pas
 * jusqu'ici, mais un POST direct, lui, peut contenir n'importe quoi.
 */
function passagers(valeur: unknown): string {
  const nombre = Number(texte(valeur, 10));
  if (!Number.isInteger(nombre) || nombre < 1 || nombre > 500) return "";
  return String(nombre);
}

export async function POST(requete: Request) {
  let corps: unknown;
  try {
    corps = await requete.json();
  } catch {
    return NextResponse.json({ ok: false, erreur: "Requête illisible." }, { status: 400 });
  }

  const entree = corps as Record<string, unknown>;

  /*
   * Piège à robots : un champ que personne ne voit et que seuls les
   * remplisseurs automatiques renseignent. On répond `ok` sans rien envoyer.
   */
  if (texte(entree.website, 100)) return NextResponse.json({ ok: true });

  const nom = texte(entree.nom, LIMITES.nom);
  const email = texte(entree.email, LIMITES.email);
  const details = texte(entree.details, LIMITES.details);

  /*
   * La nature arrive en clé — « wedding », « helicopter » — et ressort en
   * français. Le formulaire existe en quatre langues ; sans cette table,
   * l'exploitant recevrait « Hochzeit » dans l'objet d'un e-mail qu'il lit en
   * français, et ne pourrait plus trier sa boîte de réception.
   *
   * Une clé inconnue — donc un POST fabriqué — retombe sur « Autre demande »
   * plutôt que d'écrire dans l'objet ce qu'on lui a soufflé.
   */
  const propose = texte(entree.type, 40);
  const cle = (CLES_DEMANDE as readonly string[]).includes(propose)
    ? (propose as CleDemande)
    : "other";
  const type = LIBELLES_EXPLOITANT[cle];

  /*
   * La langue du visiteur : elle ne sert pas à la validation, elle dit dans
   * quelle langue répondre. Une demande venue de la page italienne appelle une
   * réponse en italien, et rien d'autre dans l'e-mail ne le révèle.
   */
  const langues: Record<string, string> = { en: "anglais", fr: "français", de: "allemand", it: "italien" };
  const langue = langues[texte(entree.langue, 5)] ?? "anglais";

  const manquants: string[] = [];
  if (nom.length < 2) manquants.push("nom");
  if (!emailPlausible(email)) manquants.push("email");
  if (details.length < 10) manquants.push("details");
  if (manquants.length > 0) {
    return NextResponse.json({ ok: false, erreur: "champs-invalides", manquants }, { status: 422 });
  }

  const destinataire = process.env.EMAIL_EXPLOITANT || ENTREPRISE.email;
  if (!emailConfigure() || !destinataire) {
    return NextResponse.json(
      { ok: false, erreur: "envoi-indisponible", email: ENTREPRISE.email },
      { status: 503 },
    );
  }

  const debut = texte(entree.debut, LIMITES.date);
  const fin = texte(entree.fin, LIMITES.date);
  const dates = [debut, fin].filter(Boolean).join(" → ");

  const lignes: (string | null)[] = [
    `Nature : ${type}`,
    `Répondre en : ${langue}`,
    "",
    `De : ${nom} <${email}>`,
    texte(entree.telephone, LIMITES.telephone)
      ? `Téléphone : ${texte(entree.telephone, LIMITES.telephone)}`
      : null,
    texte(entree.societe, LIMITES.societe)
      ? `Société / marque : ${texte(entree.societe, LIMITES.societe)}`
      : null,
    "",
    dates ? `Dates : ${dates}` : "Dates : non précisées",
    texte(entree.depart, LIMITES.lieu) ? `Arrivée : ${texte(entree.depart, LIMITES.lieu)}` : null,
    texte(entree.destination, LIMITES.lieu)
      ? `Destination : ${texte(entree.destination, LIMITES.lieu)}`
      : null,
    passagers(entree.passagers) ? `Passagers : ${passagers(entree.passagers)}` : null,
    texte(entree.budget, LIMITES.budget)
      ? `Budget évoqué : ${texte(entree.budget, LIMITES.budget)}`
      : null,
    "",
    "Demande :",
    details,
  ];

  const envoye = await envoyer({
    destinataire,
    sujet: `[Site] Demande premium — ${type} — ${nom}`,
    texte: lignes.filter((ligne) => ligne !== null).join("\n"),
  });

  if (!envoye) {
    return NextResponse.json(
      { ok: false, erreur: "envoi-echoue", email: ENTREPRISE.email },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
