import { normaliser, type Lieu } from "@/lib/reservation/lieux";

/**
 * Suggestion d'adresses réelles — hôtels, chalets, gares, rues.
 *
 * Le catalogue local ne contient que ce qu'on sait chiffrer : 34 aéroports et
 * 68 stations. Or un transfert se termine rarement « à Val Thorens » : il se
 * termine à une résidence, un chalet, un hôtel. Ce module complète donc les
 * suggestions locales par un vrai géocodeur, sans jamais les remplacer — une
 * station connue reste en tête, parce qu'elle seule donne un prix ferme.
 *
 * Trois fournisseurs :
 *
 * 1. **Google Places**, si `GOOGLE_MAPS_API_KEY` est renseignée. Il remplace
 *    alors les deux autres. C'est ce que le concurrent utilise ; c'est payant.
 * 2. **La Base Adresse Nationale** (`api-adresse.data.gouv.fr`), pour la France.
 *    Officielle, exhaustive à la porte près, gratuite et sans clé. C'est elle
 *    qui trouve les adresses qu'OpenStreetMap ignore — une voie de lotissement
 *    en Haute-Garonne, par exemple, qu'OSM ne connaît tout simplement pas.
 * 3. **Photon**, pour le reste : Suisse, Italie, Autriche, et les lieux nommés
 *    (chalets, refuges, hôtels) que la BAN ne référence pas, puisqu'elle ne
 *    connaît que des adresses. Service public bâti sur OpenStreetMap et conçu
 *    pour la saisie au fil de l'eau — contrairement à Nominatim, dont les
 *    conditions d'usage interdisent explicitement l'autocomplétion.
 *
 * Les deux derniers sont interrogés **en parallèle** et leurs résultats
 * entrelacés : ils ne se recouvrent pas, ils se complètent. La panne de l'un ne
 * prive pas des suggestions de l'autre.
 *
 * La recherche est bornée à l'**Europe de l'Ouest**, et seulement biaisée vers
 * l'arc alpin. Un cadre serré sur les Alpes paraissait logique — il rendait en
 * réalité introuvable toute adresse de départ française un peu à l'ouest, une
 * commune de Haute-Garonne par exemple. Le biais suffit à faire remonter les
 * lieux alpins en tête sans exclure le reste.
 *
 * L'appel part du serveur, jamais du navigateur : la clé Google reste secrète, et
 * le fournisseur ne voit pas l'adresse IP du visiteur.
 */

/**
 * L'Europe de l'Ouest : de l'Atlantique à l'Autriche, des Pyrénées au Danemark.
 * Assez large pour toute adresse de départ plausible, assez étroit pour écarter
 * les homonymes d'un autre continent.
 */
const CADRE = { ouest: -6.0, sud: 35.0, est: 20.0, nord: 55.0 } as const;

/** Centre de la zone, pour biaiser le classement des résultats. */
const CENTRE = { lat: 46.0, lon: 9.5 } as const;

/** Au-delà, le service met plus de temps que le visiteur n'en accorde. */
const DELAI_MS = 3500;

/**
 * Cache mémoire du processus.
 *
 * Une saisie au clavier produit une requête par frappe utile, et deux visiteurs
 * qui cherchent « val thorens » posent la même question. Le cache évite de
 * repayer, ou de solliciter inutilement un service public gratuit. Il vit le
 * temps de l'instance, ce qui suffit : les adresses ne changent pas.
 */
const CACHE = new Map<string, { a: number; lieux: Lieu[] }>();
const DUREE_CACHE_MS = 30 * 60 * 1000;
const TAILLE_CACHE = 500;

function duCache(cle: string): Lieu[] | null {
  const entree = CACHE.get(cle);
  if (!entree) return null;
  if (Date.now() - entree.a > DUREE_CACHE_MS) {
    CACHE.delete(cle);
    return null;
  }
  return entree.lieux;
}

function auCache(cle: string, lieux: Lieu[]) {
  if (CACHE.size >= TAILLE_CACHE) CACHE.delete(CACHE.keys().next().value as string);
  CACHE.set(cle, { a: Date.now(), lieux });
}

async function recuperer(url: string, entetes?: Record<string, string>) {
  const signal = AbortSignal.timeout(DELAI_MS);
  const reponse = await fetch(url, { signal, headers: entetes ?? {} });
  if (!reponse.ok) throw new Error(`${reponse.status}`);
  return reponse.json();
}

/** Photon — OpenStreetMap, sans clé, conçu pour l'autocomplétion. */
async function viaPhoton(saisie: string, langue: string, limite: number): Promise<Lieu[]> {
  const url = new URL("https://photon.komoot.io/api/");
  url.searchParams.set("q", saisie);
  url.searchParams.set("limit", String(limite));
  url.searchParams.set("lang", ["fr", "de", "it", "en"].includes(langue) ? langue : "en");
  url.searchParams.set("lat", String(CENTRE.lat));
  url.searchParams.set("lon", String(CENTRE.lon));
  url.searchParams.set("bbox", `${CADRE.ouest},${CADRE.sud},${CADRE.est},${CADRE.nord}`);

  const donnees = (await recuperer(String(url), {
    "User-Agent": "alpsskitransfers.com (bookings@alpsskitransfers.com)",
  })) as { features?: { properties?: Record<string, unknown> }[] };

  return (donnees.features ?? [])
    .map((element) => {
      const p = (element.properties ?? {}) as Record<string, string | undefined>;
      /*
       * Trois formes possibles, dans cet ordre de préférence :
       * un lieu nommé avec son adresse (« Chalet du Tour, 205 chemin… »),
       * une adresse seule (« 205 chemin du Rocher Nay »), un lieu seul.
       * Reprendre la rue en même temps que le nom quand ils sont identiques
       * produisait « Chemin X, 205 Chemin X » — le libellé se dédoublait.
       */
      const voie = [p.housenumber, p.street].filter(Boolean).join(" ");
      const nom = p.name ?? voie;
      if (!nom) return null;
      const libelle = p.name && voie && voie !== p.name ? `${p.name}, ${voie}` : nom;
      const detail = [p.postcode, p.city ?? p.county, p.country].filter(Boolean).join(" · ");
      return { nom: libelle, detail } as { nom: string; detail: string };
    })
    .filter((x): x is { nom: string; detail: string } => x !== null)
    .map((x) => ({ slug: null, nom: x.nom, type: "adresse" as const, detail: x.detail, cles: [] }));
}

/**
 * Base Adresse Nationale — le référentiel officiel des adresses françaises.
 *
 * `autocomplete=1` demande le mode saisie au fil de l'eau. Le score renvoyé sert
 * de filtre : en dessous de 0,3 la BAN propose n'importe quelle rue vaguement
 * ressemblante, souvent à l'autre bout du pays.
 */
async function viaBan(saisie: string, limite: number): Promise<Lieu[]> {
  const url = new URL("https://api-adresse.data.gouv.fr/search/");
  url.searchParams.set("q", saisie);
  url.searchParams.set("limit", String(limite));
  url.searchParams.set("autocomplete", "1");
  /*
   * Biais vers les Alpes françaises. Sans lui, « gare de Moûtiers » remontait
   * une rue de la Gare des Deux-Sèvres avant celle de Savoie. Le biais est doux :
   * une adresse de Haute-Garonne reste trouvée si c'est la seule à correspondre.
   */
  url.searchParams.set("lat", "45.5");
  url.searchParams.set("lon", "6.4");

  const donnees = (await recuperer(String(url))) as {
    features?: { properties?: Record<string, string | number | undefined> }[];
  };

  return (donnees.features ?? [])
    .filter((f) => Number(f.properties?.score ?? 0) >= 0.3)
    .map((f): Lieu | null => {
      const p = (f.properties ?? {}) as Record<string, string | undefined>;
      const nom = p.name ?? p.label;
      if (!nom) return null;
      return {
        slug: null,
        nom,
        type: "adresse" as const,
        detail: [p.postcode, p.city, "France"].filter(Boolean).join(" · "),
        cles: [],
      };
    })
    .filter((l): l is Lieu => l !== null);
}

/** Google Places Autocomplete — utilisé dès qu'une clé est configurée. */
async function viaGoogle(
  saisie: string,
  langue: string,
  limite: number,
  cle: string,
): Promise<Lieu[]> {
  const url = new URL("https://maps.googleapis.com/maps/api/place/autocomplete/json");
  url.searchParams.set("input", saisie);
  url.searchParams.set("key", cle);
  url.searchParams.set("language", langue);
  // Un cercle de 400 km autour de l'arc alpin, en priorité stricte.
  url.searchParams.set("location", `${CENTRE.lat},${CENTRE.lon}`);
  url.searchParams.set("radius", "400000");
  url.searchParams.set("components", "country:fr|country:ch|country:it|country:at|country:de");

  const donnees = (await recuperer(String(url))) as {
    status?: string;
    predictions?: { structured_formatting?: { main_text?: string; secondary_text?: string } }[];
  };
  if (donnees.status && !["OK", "ZERO_RESULTS"].includes(donnees.status)) {
    throw new Error(donnees.status);
  }

  return (donnees.predictions ?? [])
    .slice(0, limite)
    .map((p) => ({
      slug: null,
      nom: p.structured_formatting?.main_text ?? "",
      type: "adresse" as const,
      detail: p.structured_formatting?.secondary_text ?? "",
      cles: [],
    }))
    .filter((l) => l.nom.length > 0);
}

/**
 * Cherche des adresses. Ne lève jamais : une suggestion est un confort, son
 * absence ne doit pas casser le formulaire — le visiteur peut toujours valider
 * ce qu'il a tapé, et le parcours bascule alors vers une demande de devis.
 */
export async function chercherAdresses(
  saisie: string,
  langue = "en",
  limite = 5,
): Promise<Lieu[]> {
  const q = saisie.trim();
  if (q.length < 3) return [];

  const cle = `${langue}|${limite}|${q.toLowerCase()}`;
  const connu = duCache(cle);
  if (connu) return connu;

  const cleGoogle = process.env.GOOGLE_MAPS_API_KEY?.trim();

  if (cleGoogle) {
    try {
      const lieux = await viaGoogle(q, langue, limite, cleGoogle);
      auCache(cle, lieux);
      return lieux;
    } catch {
      // On retombe sur les fournisseurs gratuits plutôt que de ne rien proposer.
    }
  }

  const [ban, photon] = await Promise.allSettled([
    viaBan(q, limite),
    viaPhoton(q, langue, limite),
  ]);

  const lieux = entrelacer(
    ban.status === "fulfilled" ? ban.value : [],
    photon.status === "fulfilled" ? photon.value : [],
    limite,
    q,
  );
  auCache(cle, lieux);
  return lieux;
}

/**
 * Fusionne les deux listes, puis les classe.
 *
 * L'entrelacement seul ne suffisait pas : chaque fournisseur classe bien **ses**
 * résultats, aucun ne sait que ceux de l'autre sont meilleurs. « hotel zermatt »
 * plaçait ainsi une rue de Zermatt à Lingolsheim devant le Zermatterhof, à
 * Zermatt.
 *
 * Le signal qui tranche est simple et fiable : **la commune est-elle nommée dans
 * la requête ?** Qui écrit « buzet » veut Buzet-sur-Tarn, qui écrit « zermatt »
 * veut Zermatt. Une correspondance de commune passe donc devant tout le reste,
 * et l'ordre d'origine — une source sur deux — départage les ex æquo.
 */
function entrelacer(a: Lieu[], b: Lieu[], limite: number, saisie: string): Lieu[] {
  const mots = new Set(normaliser(saisie).split(" ").filter((m) => m.length >= 3));

  /** La commune du lieu est-elle nommée dans la requête ? */
  const communeCitee = (lieu: Lieu): number => {
    const commune = normaliser(lieu.detail).split(" ").filter((m) => m.length >= 3);
    return commune.some((mot) => mots.has(mot)) ? 1 : 0;
  };

  const vus = new Set<string>();
  const fusion: Lieu[] = [];
  for (let i = 0; i < Math.max(a.length, b.length); i++) {
    for (const lieu of [a[i], b[i]]) {
      if (!lieu) continue;
      const cle = `${lieu.nom}|${lieu.detail}`.toLowerCase();
      if (vus.has(cle)) continue;
      vus.add(cle);
      fusion.push(lieu);
    }
  }

  return fusion
    .map((lieu, rang) => ({ lieu, rang, score: communeCitee(lieu) }))
    .sort((x, y) => y.score - x.score || x.rang - y.rang)
    .slice(0, limite)
    .map((x) => x.lieu);
}
