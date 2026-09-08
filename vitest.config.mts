import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

/**
 * Vitest ne lit pas les chemins de `tsconfig.json` : sans cet alias, un test qui
 * importe `@/lib/...` échoue alors que le build passe. Dix lignes de config
 * plutôt qu'un plugin de plus.
 */
export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
