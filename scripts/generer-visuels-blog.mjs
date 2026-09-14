/**
 * Génère les visuels des articles de blog avec fal.ai (Flux Pro 1.1) —
 * demande de JC, 14 septembre 2026.
 *
 * Les images arrivent dans `pHOTOS/blog/{nom}.jpg`, puis `npm run
 * images:preparer` les passe en WebP et AVIF sous `blog-{nom}`, comme toutes
 * les autres photos du site.
 *
 * Les règles, tenues dans les prompts :
 * - des scènes génériques — route enneigée, van, bagages et skis, hall
 *   d'arrivée — jamais une fausse vue d'une station réelle : une image générée
 *   qui prétendrait montrer Val Thorens serait un mensonge visuel ;
 * - aucun visage reconnaissable, aucun texte ni logo ;
 * - paysage 16/9, photoréaliste.
 *
 * Usage : FAL_KEY=… node scripts/generer-visuels-blog.mjs [fichier.json]
 *   Le fichier liste `[{ "nom": "geneva-or-lyon", "prompt": "…" }]`. Une image
 *   déjà présente n'est pas regénérée : relancer ne coûte que les manquantes.
 */
import { mkdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";

const CLE = process.env.FAL_KEY?.trim();
if (!CLE) {
  console.error("FAL_KEY absente : la clé fal.ai est dans l'environnement du site Clickzou.");
  process.exit(1);
}

const liste = JSON.parse(await readFile(process.argv[2] ?? "scripts/visuels-blog.json", "utf8"));
const SORTIE = path.join(process.cwd(), "..", "pHOTOS", "blog");
await mkdir(SORTIE, { recursive: true });

const STYLE =
  " Photorealistic editorial travel photograph, natural winter light, shot on a full-frame camera, 16:9 landscape composition. " +
  "Any people are seen only from behind or far away, with no recognisable faces. No text, no signage lettering, no logos, no brand names.";

const existe = (f) => stat(f).then(() => true, () => false);

for (const { nom, prompt } of liste) {
  const fichier = path.join(SORTIE, `${nom}.jpg`);
  if (await existe(fichier)) {
    console.log(`= ${nom} (déjà là)`);
    continue;
  }
  const reponse = await fetch("https://fal.run/fal-ai/flux-pro/v1.1", {
    method: "POST",
    headers: { Authorization: `Key ${CLE}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      prompt: `${prompt}${STYLE}`,
      // 1 440 px, le plafond de Flux Pro : « landscape_16_9 » ne rendait que 1 024 px, flou en pleine largeur.
      image_size: { width: 1440, height: 810 },
      num_images: 1,
      output_format: "jpeg",
      safety_tolerance: "2",
    }),
  });
  if (!reponse.ok) {
    console.error(`✗ ${nom} : fal.ai a répondu ${reponse.status} ${(await reponse.text()).slice(0, 200)}`);
    continue;
  }
  const { images } = await reponse.json();
  const url = images?.[0]?.url;
  if (!url) {
    console.error(`✗ ${nom} : pas d'image dans la réponse`);
    continue;
  }
  await writeFile(fichier, Buffer.from(await (await fetch(url)).arrayBuffer()));
  console.log(`✓ ${nom}`);
}
