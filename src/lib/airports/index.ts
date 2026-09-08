import { AIRPORTS } from "./registry";
export type { Airport, CodePays } from "./types";
export { AIRPORTS };

export function airportParSlug(slug: string) {
  return AIRPORTS.find((a) => a.slug === slug);
}
