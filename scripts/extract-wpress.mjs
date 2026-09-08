/**
 * Extracteur d'archive .wpress (All-in-One WP Migration).
 *
 * La sauvegarde du WordPress actuel — `alpsskitransfers-com-20250821-105433…wpress`,
 * 745 Mo — est la source de vérité de la migration : le contenu des 260 pages, les
 * titles et meta Rank Math, les slugs réels et les médias. C'est elle qui permet
 * d'écrire le plan de redirections sans rien deviner.
 *
 * Format : suite de blocs [header de 4377 octets][contenu]. Le header est composé
 * de quatre champs à taille fixe, complétés par des octets nuls :
 *   nom (255) · taille (14) · date de modification (12) · chemin relatif (4096)
 * Un header entièrement nul marque la fin de l'archive.
 *
 * Usage :
 *   node scripts/extract-wpress.mjs --list [--filtre <motif>]
 *   node scripts/extract-wpress.mjs --extract <motif> [--sortie wp-export]
 *
 * `wp-export/` est ignoré par git : l'archive et son contenu ne rentrent pas
 * dans le dépôt.
 */
import { createReadStream, createWriteStream } from "node:fs";
import { mkdir, open, readdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";

const TAILLE_HEADER = 4377;
const CHAMPS = [
  ["nom", 255],
  ["taille", 14],
  ["mtime", 12],
  ["chemin", 4096],
];

const args = process.argv.slice(2);
function option(nom) {
  const i = args.indexOf(nom);
  return i === -1 ? undefined : (args[i + 1] ?? true);
}

const RACINE = process.cwd();

async function trouverArchive() {
  for (const dossier of [RACINE, path.join(RACINE, "..", "Sauvegarde")]) {
    try {
      const fichier = (await readdir(dossier)).find((f) => f.endsWith(".wpress"));
      if (fichier) return path.join(dossier, fichier);
    } catch {
      /* dossier absent */
    }
  }
  return null;
}

function lireHeader(buffer) {
  let position = 0;
  const champs = {};
  for (const [nom, taille] of CHAMPS) {
    // Champs à taille fixe complétés par des octets nuls. On coupe au PREMIER
    // nul plutôt que de rogner la fin : l'export du 7 septembre 2026 laisse des
    // résidus après le padding, et un simple trim laissait passer des \0 dans
    // les chemins (mkdir échouait sur « path must be… without null bytes »).
    const brut = buffer.subarray(position, position + taille).toString("utf8");
    const fin = brut.indexOf("\0");
    champs[nom] = (fin === -1 ? brut : brut.slice(0, fin)).trim();
    position += taille;
  }
  return champs;
}

const archive = await trouverArchive();
if (!archive) {
  console.error("Aucune archive .wpress trouvée dans le projet ni dans ../Sauvegarde/.");
  process.exit(1);
}

const taille = (await stat(archive)).size;
console.log(`Archive : ${path.basename(archive)} (${(taille / 1e6).toFixed(0)} Mo)\n`);

const fd = await open(archive, "r");
const entete = Buffer.alloc(TAILLE_HEADER);

const filtre = option("--filtre") ?? option("--extract");
const motif = typeof filtre === "string" ? filtre.toLowerCase() : null;
const extraire = args.includes("--extract");
const sortie = path.join(RACINE, String(option("--sortie") ?? "wp-export"));

let position = 0;
let total = 0;
let retenus = 0;
let octetsRetenus = 0;

while (position + TAILLE_HEADER <= taille) {
  const { bytesRead } = await fd.read(entete, 0, TAILLE_HEADER, position);
  if (bytesRead < TAILLE_HEADER) break;
  if (entete.every((o) => o === 0)) break; // fin d'archive

  const champs = lireHeader(entete);
  const octets = Number.parseInt(champs.taille, 10);
  if (!Number.isFinite(octets)) break;

  const chemin = path.posix.join(champs.chemin === "." ? "" : champs.chemin, champs.nom);
  const debutContenu = position + TAILLE_HEADER;
  total += 1;

  if (!motif || chemin.toLowerCase().includes(motif)) {
    retenus += 1;
    octetsRetenus += octets;

    if (extraire) {
      const destination = path.join(sortie, chemin);
      await mkdir(path.dirname(destination), { recursive: true });
      const morceau = Buffer.alloc(Math.min(octets, 64 * 1024 * 1024));
      if (octets <= morceau.length) {
        await fd.read(morceau, 0, octets, debutContenu);
        await writeFile(destination, morceau.subarray(0, octets));
      } else {
        // Gros fichier (la base peut peser plusieurs centaines de Mo) : par flux.
        await new Promise((resolve, reject) => {
          const lecture = createReadStream(archive, {
            start: debutContenu,
            end: debutContenu + octets - 1,
          });
          const ecriture = lecture.pipe(createWriteStream(destination));
          ecriture.on("finish", resolve);
          ecriture.on("error", reject);
          lecture.on("error", reject);
        });
      }
      console.log(`  extrait  ${chemin} (${(octets / 1e6).toFixed(2)} Mo)`);
    } else if (retenus <= 60) {
      console.log(`  ${chemin.padEnd(70)} ${(octets / 1024).toFixed(0)} Ko`);
    }
  }

  position = debutContenu + octets;
}

await fd.close();

if (!extraire && retenus > 60) console.log(`  … et ${retenus - 60} autres`);
console.log(
  `\n${retenus} fichier(s) retenu(s) sur ${total} — ${(octetsRetenus / 1e6).toFixed(1)} Mo.`,
);
if (!extraire && motif) console.log(`Pour extraire : --extract ${motif}`);
