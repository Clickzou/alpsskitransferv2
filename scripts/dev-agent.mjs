/**
 * Second serveur de développement — celui de l'assistant, jamais celui de JC.
 *
 * Deux `next dev` lancés sur le même dossier `.next` se retirent les fichiers
 * l'un à l'autre : le serveur de JC finit par répondre 500 sur sa feuille de
 * styles, ou par ne plus répondre du tout. Ce lanceur pose donc un port **et**
 * un `distDir` distincts, que `next.config.ts` lit dans `NEXT_DIST_DIR`.
 *
 * Même précaution pour les builds : `NEXT_DIST_DIR=.next-build npm run build`.
 */
import { spawn } from "node:child_process";

const port = process.argv[2] ?? "3003";

spawn("npx", ["next", "dev", "-p", port], {
  stdio: "inherit",
  shell: true,
  env: { ...process.env, NEXT_DIST_DIR: ".next-dev-agent" },
}).on("exit", (code) => process.exit(code ?? 0));
