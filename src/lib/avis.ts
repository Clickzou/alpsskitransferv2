import { AVIS } from "@/data/accueil";

/**
 * Les avis affichés sur la home.
 *
 * Deux sources, et une règle : **on n'invente pas une preuve sociale**.
 *
 * 1. **Google**, dès que `GOOGLE_PLACE_ID` et `GOOGLE_MAPS_API_KEY` sont
 *    renseignés. Ce sont alors de vrais avis, avec leur auteur, leur note et
 *    leur date, et la section le dit.
 * 2. **Les quatre témoignages repris du WordPress**, sinon. Ils ne sont
 *    rattachés à aucune plateforme : la section les présente donc comme des
 *    témoignages clients, sans note en étoiles ni prétention de vérification.
 *
 * L'appel a lieu **au build**, pas au chargement de page : le site est statique,
 * les avis changent lentement, et Google n'a pas à voir passer les visiteurs.
 * Un déploiement rafraîchit les avis — ce qui respecte au passage la règle de
 * Google interdisant de conserver ses données plus de trente jours.
 *
 * Les conditions de l'API imposent d'afficher l'auteur et de créditer Google
 * dès qu'un avis en vient : `source` sert exactement à cela.
 */

export interface Avis {
  texte: string;
  auteur: string;
  /** Ville pour un témoignage, date relative pour un avis Google. */
  detail: string;
  /** Note sur 5, quand la source en fournit une. */
  note?: number;
  lien?: string;
}

export interface BlocAvis {
  source: "google" | "temoignages";
  avis: Avis[];
  /** Note moyenne de la fiche Google, quand elle existe. */
  moyenne?: number;
  /** Nombre total d'avis de la fiche — l'API n'en renvoie que cinq. */
  total?: number;
  lienFiche?: string;
}

const TEMOIGNAGES: BlocAvis = {
  source: "temoignages",
  avis: AVIS.avis.map((a) => ({ texte: a.texte, auteur: a.auteur, detail: a.ville })),
};

export async function avisDuSite(): Promise<BlocAvis> {
  const cle = process.env.GOOGLE_MAPS_API_KEY?.trim();
  const place = process.env.GOOGLE_PLACE_ID?.trim();
  if (!cle || !place) return TEMOIGNAGES;

  try {
    const url = new URL("https://maps.googleapis.com/maps/api/place/details/json");
    url.searchParams.set("place_id", place);
    url.searchParams.set("key", cle);
    url.searchParams.set("language", "en");
    url.searchParams.set("reviews_sort", "newest");
    url.searchParams.set("fields", "rating,user_ratings_total,url,reviews");

    const reponse = await fetch(String(url), { signal: AbortSignal.timeout(6000) });
    if (!reponse.ok) return TEMOIGNAGES;

    const donnees = (await reponse.json()) as {
      status?: string;
      result?: {
        rating?: number;
        user_ratings_total?: number;
        url?: string;
        reviews?: {
          text?: string;
          author_name?: string;
          rating?: number;
          relative_time_description?: string;
          author_url?: string;
        }[];
      };
    };
    if (donnees.status !== "OK" || !donnees.result?.reviews?.length) return TEMOIGNAGES;

    // Un avis sans texte ne dit rien, et un avis tiède n'a pas sa place sur une
    // home — mais on ne descend pas sous 4 : masquer les avis moyens serait déjà
    // trafiquer la preuve sociale.
    const avis = donnees.result.reviews
      .filter((a) => (a.text ?? "").trim().length >= 40 && (a.rating ?? 0) >= 4)
      .slice(0, 4)
      .map((a) => ({
        texte: (a.text ?? "").trim(),
        auteur: a.author_name ?? "Google user",
        detail: a.relative_time_description ?? "",
        note: a.rating,
        lien: a.author_url,
      }));

    if (avis.length === 0) return TEMOIGNAGES;

    return {
      source: "google",
      avis,
      moyenne: donnees.result.rating,
      total: donnees.result.user_ratings_total,
      lienFiche: donnees.result.url,
    };
  } catch {
    // Une panne de l'API ne doit pas vider la page : on retombe sur les
    // témoignages, qui sont du contenu, pas une promesse de note.
    return TEMOIGNAGES;
  }
}
