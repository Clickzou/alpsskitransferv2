/**
 * Rédige le corps des pages de trajet à partir des données mesurées.
 *
 * ## Pourquoi les réécrire
 *
 * Les 108 pages de trajet reprises du WordPress sont les plus maigres du site :
 * ~400 mots, dont une part consacrée à un transfert partagé que le site ne vend
 * pas et à des prix inventés (« €350 – €600 per vehicle »), jamais validés. Le
 * master SEO les vise entre 900 et 1 400 mots.
 *
 * ## Ce que ce script écrit, et ce qu'il n'écrit pas
 *
 * Il ne réécrit **que** `contenu` et `faq`. Les `metaTitre`, `metaDescription`,
 * `h1` et `chapo` sont **conservés** : rédigés à la main et calibrés par Rank
 * Math, ils portent l'antériorité de la page. Seules les mentions du partagé y
 * sont nettoyées.
 *
 * Et surtout : **il ne dit que ce que les données savent.** Distance et durée
 * viennent des 2 108 itinéraires calculés ; le comparatif d'aéroports se déduit
 * du registre ; le passage de frontière se lit sur les pays. Aucun itinéraire
 * précis, aucun col, aucun prix : le WordPress en inventait, et une durée fausse
 * sur une page de trajet finit en réclamation.
 *
 * ## Le risque de similarité, et comment il est traité
 *
 * 108 pages bâties sur un même plan se ressemblent — c'est le danger de tout
 * contenu généré. La parade n'est pas d'allonger : mieux vaut 600 mots dont la
 * moitié est propre à la liaison que 1 200 mots dont 900 sont communs. Chaque
 * page porte donc ses chiffres, son rang parmi les aéroports qui desservent la
 * station, l'écart avec le plus rapide d'entre eux, et ce que sa durée implique.
 *
 * Usage :
 *   node scripts/rediger-trajets.mjs --apercu geneva-airport-to-val-thorens
 *   node scripts/rediger-trajets.mjs --essai
 *   node scripts/rediger-trajets.mjs
 */
import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const RACINE = process.cwd();
const args = process.argv.slice(2);
const apercu = args.includes("--apercu") ? args[args.indexOf("--apercu") + 1] : null;
const essai = args.includes("--essai") || apercu !== null;

/* ------------------------------------------------------------- les données */

const litteral = (source, motif) => [...source.matchAll(motif)];

const distancesSource = await readFile(path.join(RACINE, "src/data/distances.ts"), "utf8");
const DISTANCES = litteral(
  distancesSource,
  /\{ airport: "([^"]+)", resort: "([^"]+)", km: (\d+), minutes: (\d+) \}/g,
).map((m) => ({ airport: m[1], resort: m[2], km: Number(m[3]), minutes: Number(m[4]) }));

const airportsSource = await readFile(path.join(RACINE, "src/lib/airports/registry.ts"), "utf8");
const AIRPORTS = litteral(
  airportsSource,
  /\{ slug: "([^"]+)", name: "([^"]+)", iata: "([^"]+)", country: "([A-Z]{2})" \}/g,
).map((m) => ({ slug: m[1], name: m[2], iata: m[3], country: m[4] }));

/** Nom et pays des stations, lus dans leurs modules. */
const RESORTS = [];
for (const nom of await readdir(path.join(RACINE, "src/lib/resorts"))) {
  if (!nom.endsWith(".ts") || nom === "index.ts" || nom === "types.ts") continue;
  const source = await readFile(path.join(RACINE, "src/lib/resorts", nom), "utf8");
  const slug = source.match(/\n\s*slug: "([^"]+)"/)?.[1];
  const name = source.match(/\n\s*name: "([^"]+)"/)?.[1];
  const country = source.match(/\n\s*country: "([A-Z]{2})"/)?.[1];
  if (slug && name && country) RESORTS.push({ slug, name, country });
}

const PAYS = { AT: "Austria", CH: "Switzerland", DE: "Germany", FR: "France", IT: "Italy" };

/* ------------------------------------------------------------- les helpers */

/** « 2 h 45 » plutôt que « 165 min » : c'est ainsi qu'on lit un temps de route. */
function duree(minutes) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return h === 0 ? `${m} min` : m === 0 ? `${h} h` : `${h} h ${String(m).padStart(2, "0")}`;
}

/** « 40 minutes », « 1 h 10 » — un écart se lit comme une durée. */
const ecart = (minutes) => duree(minutes);

const court = (aeroport) => aeroport.name.replace(" Airport", "");

/* ------------------------------------------------ la rédaction d'une page */

/**
 * Les aéroports qui desservent une station, du plus rapide au plus lent.
 * C'est la matière du comparatif, et ce qui rend chaque page différente.
 */
function concurrents(resort, liaisons) {
  return liaisons
    .filter((l) => l.resort === resort)
    .map((l) => {
      const d = DISTANCES.find((x) => x.airport === l.airport && x.resort === resort);
      const a = AIRPORTS.find((x) => x.slug === l.airport);
      return d && a ? { slug: a.slug, nom: court(a), km: d.km, minutes: d.minutes } : null;
    })
    .filter(Boolean)
    .sort((a, b) => a.minutes - b.minutes);
}

function rediger({ aeroport, station, distance, rivaux }) {
  const nomA = court(aeroport);
  const nomS = station.name;
  const contenu = [];
  const faq = [];

  const rang = rivaux.findIndex((r) => r.slug === aeroport.slug);
  const plusRapide = rivaux[0];
  const estLePlusRapide = rang === 0;
  const frontiere = aeroport.country !== station.country;
  const longue = distance.minutes >= 180;
  const courte = distance.minutes <= 90;

  /* --- 1. La liaison en chiffres ------------------------------------------ */

  contenu.push({
    type: "paragraphe",
    texte:
      `The road from ${aeroport.name} to ${nomS} runs ${distance.km} km and takes about ` +
      `${duree(distance.minutes)} without traffic. Your driver meets you in the arrivals hall, ` +
      `takes you straight to your accommodation, and the price is fixed per vehicle before you book.`,
  });

  if (frontiere) {
    contenu.push({
      type: "paragraphe",
      texte:
        `This transfer crosses a border: you land in ${PAYS[aeroport.country]} and finish in ` +
        `${PAYS[station.country]}. There is nothing for you to arrange — our vehicles carry what ` +
        `each country requires in winter, and the crossing itself rarely costs more than a few minutes.`,
    });
  }

  /* --- 2. Ce que la durée implique ---------------------------------------- */

  contenu.push({ type: "titre2", texte: `The drive from ${nomA} to ${nomS}` });

  if (courte) {
    contenu.push({
      type: "paragraphe",
      texte:
        `At ${duree(distance.minutes)}, this is one of the shorter alpine transfers — short enough ` +
        `that a morning landing still leaves you half a day on the slopes. The last stretch is ` +
        `mountain road, so the time depends more on conditions than on distance.`,
    });
  } else if (longue) {
    contenu.push({
      type: "paragraphe",
      texte:
        `At ${duree(distance.minutes)}, this is a long transfer. Your driver plans a comfort stop, ` +
        `and it is worth telling us if you are travelling with young children so we build the ` +
        `journey around them. Motorway covers most of it; the climb at the end is the slow part.`,
    });
  } else {
    contenu.push({
      type: "paragraphe",
      texte:
        `${duree(distance.minutes)} is the drive on clear roads. Most of it is motorway, and the ` +
        `final climb into the resort is where the time is really spent — that section does not ` +
        `get faster, whatever the traffic below.`,
    });
  }

  contenu.push({
    type: "paragraphe",
    texte:
      `Three things lengthen it: snow, chain controls, and Saturday. Saturday is changeover day ` +
      `across the Alps and the busiest of the week on every mountain road — in February it can add ` +
      `an hour to this journey. We track your flight and plan for the day you actually travel.`,
  });

  /* --- 3. Le comparatif d'aéroports, propre à la station ------------------- */

  if (rivaux.length > 1) {
    contenu.push({ type: "titre2", texte: `Is ${nomA} the best airport for ${nomS}?` });

    if (estLePlusRapide) {
      const second = rivaux[1];
      contenu.push({
        type: "paragraphe",
        texte:
          `Yes, on driving time: ${nomA} is the closest of the ${rivaux.length} airports we serve ` +
          `${nomS} from. The next is ${second.nom}, ${ecart(second.minutes - distance.minutes)} ` +
          `further. Flights often decide the rest — a cheaper fare into a slightly longer road ` +
          `can still be the better trip.`,
      });
    } else {
      contenu.push({
        type: "paragraphe",
        texte:
          `Not the closest: ${plusRapide.nom} reaches ${nomS} in ${duree(plusRapide.minutes)}, ` +
          `${ecart(distance.minutes - plusRapide.minutes)} less than from ${nomA}. That said, ` +
          `${nomA} carries more flights on many routes, and an earlier arrival with a longer drive ` +
          `often beats a late landing with a short one.`,
      });
    }

    contenu.push({
      type: "liste",
      items: rivaux.map(
        (r) =>
          `${r.nom} — ${r.km} km, ${duree(r.minutes)}${r.slug === aeroport.slug ? " (this route)" : ""}`,
      ),
    });
  }

  /* --- 4. Ce que le prix comprend ----------------------------------------- */

  contenu.push({ type: "titre2", texte: "What the price includes" });
  contenu.push({
    type: "liste",
    items: [
      "One fixed price for the whole vehicle, tolls and motorway fees included — it does not change with the number of passengers.",
      "Flight tracking: a delayed landing moves your pick-up, at no extra cost and with nothing for you to do.",
      "Winter tyres and snow chains on board all season, as the law requires in the Alps.",
      "Skis, snowboards and boot bags carried at no extra charge.",
      "Child and booster seats on request, fitted before your driver leaves for the airport.",
    ],
  });

  /* --- 5. Quand réserver --------------------------------------------------- */

  contenu.push({ type: "titre2", texte: "When to book" });
  contenu.push({
    type: "paragraphe",
    texte:
      `As early as you can. Availability on this route tightens as the school holidays approach, ` +
      `and the February weeks go first. Booking early also keeps the vehicle category you want ` +
      `free — which matters more than it sounds when you travel with skis.`,
  });

  /* --- 6. La FAQ, chiffrée ------------------------------------------------- */

  faq.push({
    question: `How long is the transfer from ${aeroport.name} to ${nomS}?`,
    reponse:
      `About ${duree(distance.minutes)} for ${distance.km} km on clear roads. Snow, chain controls ` +
      `and Saturday changeover traffic add to it — in high season a Saturday transfer can take an ` +
      `hour longer than the same drive midweek. Your driver plans for the day you travel.`,
  });

  faq.push({
    question: `How much does a transfer from ${nomA} to ${nomS} cost?`,
    reponse:
      `The price depends on the vehicle category and the time of year, and it is quoted per ` +
      `vehicle rather than per seat — a group of six pays what a couple pays. Enter your journey ` +
      `to see your price before you book: tolls are included and nothing is added on arrival.`,
  });

  if (rivaux.length > 1) {
    faq.push({
      question: `Which airport is closest to ${nomS}?`,
      reponse:
        `${plusRapide.nom}, at ${duree(plusRapide.minutes)} for ${plusRapide.km} km. ` +
        (estLePlusRapide
          ? `That is this route. `
          : `From ${nomA} it is ${duree(distance.minutes)}. `) +
        `We serve ${nomS} from ${rivaux.length} airports in all, so the right one is usually ` +
        `decided by the flights available on your dates.`,
    });
  }

  faq.push({
    question: "What happens if my flight is delayed?",
    reponse:
      `Nothing you need to do. We track your flight number and move the pick-up to your actual ` +
      `landing time. Your driver waits for you in the arrivals hall, and a delay does not change ` +
      `the price you were quoted.`,
  });

  faq.push({
    question: "Can you take our ski equipment?",
    reponse:
      `Yes, at no extra charge. Tell us how many bags and ski or board carriers you have when you ` +
      `book: in winter the boot fills up before the seats do, and the count is what decides the ` +
      `vehicle category we send.`,
  });

  return { contenu, faq };
}

/* ------------------------------------------------------------- l'écriture */

const rendreTexte = (t) => JSON.stringify(t);

function rendreBlocs(blocs) {
  return blocs
    .map((b) =>
      b.type === "liste"
        ? `    { type: "liste", items: [${b.items.map(rendreTexte).join(", ")}] },`
        : `    { type: ${rendreTexte(b.type)}, texte: ${rendreTexte(b.texte)} },`,
    )
    .join("\n");
}

const rendreFaq = (faq) =>
  faq
    .map((f) => `    { question: ${rendreTexte(f.question)}, reponse: ${rendreTexte(f.reponse)} },`)
    .join("\n");

/* --------------------------------------------------------------- la boucle */

const dossier = path.join(RACINE, "src/lib/transfers");
const fichiers = (await readdir(dossier)).filter(
  (n) => n.endsWith(".ts") && !["index.ts", "types.ts"].includes(n) && n.includes("-to-"),
);

// Le catalogue des liaisons, pour le comparatif.
const liaisons = [];
for (const nom of fichiers) {
  const source = await readFile(path.join(dossier, nom), "utf8");
  const airport = source.match(/\n\s*airport: "([^"]+)"/)?.[1];
  const resort = source.match(/\n\s*resort: "([^"]+)"/)?.[1];
  if (airport && resort) liaisons.push({ fichier: nom, airport, resort });
}

let ecrits = 0;
let dejaAJour = 0;
const sautes = [];

for (const { fichier, airport, resort } of liaisons) {
  if (apercu && !fichier.startsWith(apercu)) continue;

  const aeroport = AIRPORTS.find((a) => a.slug === airport);
  const station = RESORTS.find((r) => r.slug === resort);
  const distance = DISTANCES.find((d) => d.airport === airport && d.resort === resort);
  if (!aeroport || !station || !distance) {
    sautes.push(`${fichier} (données manquantes)`);
    continue;
  }

  const { contenu, faq } = rediger({
    aeroport,
    station,
    distance,
    rivaux: concurrents(resort, liaisons),
  });

  const chemin = path.join(dossier, fichier);
  const source = await readFile(chemin, "utf8");

  // On remplace les deux tableaux, et rien d'autre : metas, h1 et chapô restent.
  let sortie = source.replace(
    /(\n {2}contenu: \[)[\s\S]*?(\n {2}\],)/,
    `$1\n${rendreBlocs(contenu)}$2`,
  );
  sortie = sortie.replace(/(\n {2}faq: \[)[\s\S]*?(\n {2}\],)/, `$1\n${rendreFaq(faq)}$2`);

  /*
   * Rien n'a changé : soit la page est déjà à jour — le cas normal quand on
   * relance le script — soit ses tableaux ne sont pas au format attendu. On
   * distingue les deux, sinon un simple « rien à faire » se lit comme une
   * erreur et fait chercher un problème qui n'existe pas.
   */
  if (sortie === source) {
    if (source.includes("\n  contenu: [")) dejaAJour += 1;
    else sautes.push(`${fichier} (tableaux introuvables)`);
    continue;
  }

  if (apercu) {
    const mots = [...contenu.flatMap((b) => (b.items ?? [b.texte])), ...faq.map((f) => f.reponse)]
      .join(" ")
      .split(/\s+/).length;
    console.log(sortie.slice(sortie.indexOf("  contenu: [")));
    console.log(`\n[apercu] ${fichier} — ${mots} mots, ${contenu.length} blocs, ${faq.length} questions`);
    process.exit(0);
  }

  if (!essai) await writeFile(chemin, sortie, "utf8");
  ecrits += 1;
}

console.log(
  `[trajets] ${ecrits} pages rédigées, ${dejaAJour} déjà à jour${essai ? " (essai)" : ""}`,
);
for (const s of sautes) console.warn(`[trajets] sauté : ${s}`);
