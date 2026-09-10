import type { ResortStub } from "./types";

/**
 * Les 68 stations desservies.
 *
 * 51 viennent du catalogue WooCommerce ; **17 ont été découvertes dans les URL
 * réellement publiées** (`npm run redirects:generer`) — Les Gets, Les Arcs, Flaine,
 * Samoëns, Les Menuires, Crans-Montana, Wengen… Le catalogue tarifaire ne les
 * contenait pas : s'y fier seul aurait fait perdre 17 pages et leurs redirections. Registre de travail de la migration : chaque
 * entrée passe de `a-migrer` à `migre` quand son contenu a été repris depuis
 * WordPress dans un fichier `resorts/<slug>.ts`.
 *
 * `npm run migration:status` compte ce qui reste.
 *
 * ATTENTION : ces slugs sont dérivés des noms du catalogue, pas relevés sur le
 * site actuel. Ils doivent être confrontés aux 40 URL réelles
 * `/{pays}-ski-transfers/{station}/` avant d'écrire le plan de redirections —
 * un slug qui diffère d'un caractère, c'est une 301 de plus ou une page perdue.
 */
/*
 * **L'Autriche est hors périmètre depuis le 10 septembre 2026** — décision du
 * client, pour l'anglais comme pour l'allemand. Les dix stations autrichiennes
 * (Ischgl, Sölden, Kitzbühel, St. Anton, Obergurgl, Mayrhofen, Zell am See,
 * Lech, Serfaus, Bad Gastein) et leurs dix-sept trajets ont été retirés.
 *
 * Ne pas les réintroduire ici sans décision contraire : ce registre est la
 * source dont partent `migrer:stations`, `migrer:trajets`, le générateur de
 * redirections et le contrôle de prebuild. Une ligne remise ici, et les pages
 * reviennent au prochain passage des scripts.
 *
 * Les quatre aéroports autrichiens restent, eux, dans le registre des
 * aéroports : Innsbruck dessert Selva Val Gardena, et le hub pays
 * `/austria-ski-transfers/` devient une porte d'entrée d'aéroports — le même
 * traitement que l'Allemagne, qui n'a jamais eu de station.
 */
export const RESORTS: ResortStub[] = [
  // AT
  // FR
  { slug: "alpe-dhuez", name: "Alpe d’Huez", country: "FR", status: "migre" },
  { slug: "annecy", name: "Annecy", country: "FR", status: "migre" },
  { slug: "avoriaz", name: "Avoriaz", country: "FR", status: "migre" },
  { slug: "chamonix", name: "Chamonix", country: "FR", status: "migre" },
  { slug: "courchevel", name: "Courchevel", country: "FR", status: "migre" },
  { slug: "les-deux-alpes", name: "Les Deux Alpes", country: "FR", status: "migre" },
  { slug: "isola-2000", name: "Isola 2000", country: "FR", status: "migre" },
  { slug: "la-clusaz", name: "La Clusaz", country: "FR", status: "migre" },
  { slug: "la-plagne", name: "La Plagne", country: "FR", status: "migre" },
  { slug: "megeve", name: "Megève", country: "FR", status: "migre" },
  { slug: "meribel", name: "Méribel", country: "FR", status: "migre" },
  { slug: "morzine", name: "Morzine", country: "FR", status: "migre" },
  { slug: "saint-gervais", name: "Saint-Gervais", country: "FR", status: "migre" },
  { slug: "serre-chevalier", name: "Serre Chevalier", country: "FR", status: "migre" },
  { slug: "tignes", name: "Tignes", country: "FR", status: "migre" },
  { slug: "val-disere", name: "Val d’Isère", country: "FR", status: "migre" },
  { slug: "val-thorens", name: "Val Thorens", country: "FR", status: "migre" },
  { slug: "argentiere", name: "Argentière", country: "FR", status: "migre" },
  { slug: "chamrousse", name: "Chamrousse", country: "FR", status: "migre" },
  { slug: "flaine", name: "Flaine", country: "FR", status: "migre" },
  { slug: "le-grand-bornand", name: "Le Grand-Bornand", country: "FR", status: "migre" },
  { slug: "les-arcs", name: "Les Arcs", country: "FR", status: "migre" },
  { slug: "les-carroz-grand-massif", name: "Les Carroz", country: "FR", status: "migre" },
  { slug: "les-gets", name: "Les Gets", country: "FR", status: "migre" },
  { slug: "les-menuires", name: "Les Menuires", country: "FR", status: "migre" },
  { slug: "montgenevre", name: "Montgenèvre", country: "FR", status: "migre" },
  { slug: "samoens", name: "Samoëns", country: "FR", status: "migre" },
  // IT
  { slug: "alagna-valsesia", name: "Alagna Valsesia", country: "IT", status: "migre" },
  { slug: "cervinia", name: "Cervinia", country: "IT", status: "migre" },
  { slug: "cortina", name: "Cortina", country: "IT", status: "migre" },
  { slug: "courmayeur", name: "Courmayeur", country: "IT", status: "migre" },
  { slug: "la-thuile", name: "La Thuile", country: "IT", status: "migre" },
  { slug: "livigno", name: "Livigno", country: "IT", status: "migre" },
  { slug: "madonna-di-campiglio", name: "Madonna di Campiglio", country: "IT", status: "migre" },
  { slug: "sauze-doulx", name: "Sauze d’Oulx", country: "IT", status: "migre" },
  { slug: "selva-val-gardena", name: "Selva Val Gardena", country: "IT", status: "migre" },
  { slug: "sestriere", name: "Sestriere", country: "IT", status: "migre" },
  { slug: "val-di-fiemme", name: "Val di Fiemme", country: "IT", status: "migre" },
  { slug: "champoluc", name: "Champoluc", country: "IT", status: "migre" },
  { slug: "gressoney", name: "Gressoney", country: "IT", status: "migre" },
  // CH
  { slug: "andermatt", name: "Andermatt", country: "CH", status: "migre" },
  { slug: "arosa", name: "Arosa", country: "CH", status: "migre" },
  { slug: "davos", name: "Davos", country: "CH", status: "migre" },
  { slug: "engelberg", name: "Engelberg", country: "CH", status: "migre" },
  { slug: "grimentz", name: "Grimentz", country: "CH", status: "migre" },
  { slug: "grindelwald", name: "Grindelwald", country: "CH", status: "migre" },
  { slug: "gstaad", name: "Gstaad", country: "CH", status: "migre" },
  { slug: "laax", name: "Laax", country: "CH", status: "migre" },
  { slug: "st-moritz", name: "St. Moritz", country: "CH", status: "migre" },
  { slug: "tasch", name: "Täsch", country: "CH", status: "migre" },
  { slug: "verbier", name: "Verbier", country: "CH", status: "migre" },
  { slug: "villars-sur-ollon", name: "Villars-sur-Ollon", country: "CH", status: "migre" },
  { slug: "zermatt", name: "Zermatt", country: "CH", status: "migre" },
  { slug: "champery", name: "Champéry", country: "CH", status: "migre" },
  { slug: "crans-montana", name: "Crans-Montana", country: "CH", status: "migre" },
  { slug: "interlaken", name: "Interlaken", country: "CH", status: "migre" },
  { slug: "lauterbrunnen", name: "Lauterbrunnen", country: "CH", status: "migre" },
  { slug: "wengen", name: "Wengen", country: "CH", status: "migre" },
];
