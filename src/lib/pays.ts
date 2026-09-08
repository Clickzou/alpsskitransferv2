/**
 * Les pays du silo. Le slug est la racine d'URL conservée du WordPress —
 * `/france-ski-transfers/` — parce qu'elle porte l'antériorité des 40 pages de
 * station.
 */
export interface Pays {
  code: string;
  nom: string;
  adjectif: string;
  /**
   * Presentation du pays sur son hub. Sans elle, un hub pays se reduit a deux
   * listes de liens — et le hub allemand, qui n'a aucune station, tombait sous
   * les 250 mots.
   */
  intro?: string[];
}

export const PAYS: Record<string, Pays> = {
  "austria-ski-transfers": {
    code: "AT",
    nom: "Austria",
    adjectif: "Austrian",
    intro: [
      "Austrian resorts sit lower than the French ones and make up for it with north-facing terrain and a season built around the Christmas and February weeks. The transfers are correspondingly short: Innsbruck is under two hours from most of the Tyrol, and Salzburg an hour from Kitzbuhel and Zell am See.",
      "Two things shape a winter transfer here. Innsbruck's approach is hemmed in by mountains and the airport diverts more often than most, usually to Munich or Salzburg — tell us if that happens and we drive from wherever you actually land. And winter tyres are compulsory across the country from 1 November to 15 April in wintry conditions; our vehicles carry chains as well.",
    ],
  },
  "france-ski-transfers": {
    code: "FR",
    nom: "France",
    adjectif: "French",
    intro: [
      "The French Alps carry the largest linked ski areas in the world — the Three Valleys, Paradiski, the Portes du Soleil — and four airports that serve them: Geneva for the north, Chambery for the Tarentaise, Grenoble for the Oisans, Lyon for everything when the other two are not flying.",
      "Distances here are deceptive. Chamonix is an hour and a half from Geneva; Val Thorens, half as far again in kilometres, takes nearly three hours because the last 37 km climb from Moutiers. Every resort page below gives the real road time from each airport, measured on the road network rather than estimated.",
    ],
  },
  "italy-ski-transfers": {
    code: "IT",
    nom: "Italy",
    adjectif: "Italian",
    intro: [
      "Italy is the value side of the Alps, and the side British skiers reach through the wrong airport. Turin is closer to Serre Chevalier and Montgenevre than any French airport; Milan Malpensa is the shortest way to Zermatt; Bergamo opens the Dolomites and the Valtellina.",
      "Border crossings are routine — France, Italy and Switzerland are all in the Schengen area — but carry identification, and expect a tunnel: the Mont Blanc from Chamonix, the Frejus from the Maurienne. Their tolls are in the price we quote, and our vehicles are insured and equipped for every country on the route.",
    ],
  },
  "switzerland-ski-transfers": {
    code: "CH",
    nom: "Switzerland",
    adjectif: "Swiss",
    intro: [
      "Swiss resorts are reached by a mix of road and rail, and the difference matters before you book. Zermatt, Wengen and Murren have no road at all: transfers end at Tasch, at Lauterbrunnen station or at a cable car, and the last stretch runs to a timetable. We say so before you pay, and time the drop-off against a departure.",
      "Geneva and Zurich are the two gateways, with Milan Malpensa a real third option for the Valais through the Simplon. The Swiss motorway vignette and every toll on the route are included in the price, and our vehicles carry winter tyres and chains — in Switzerland the rule is the state of the road, not the date.",
    ],
  },
  "germany-ski-transfers": {
    code: "DE",
    nom: "Germany",
    adjectif: "German",
    intro: [
      "We do not serve German resorts — the Bavarian ski areas are small, and our drivers work the Alps proper. What Germany gives you is airports: Munich, Memmingen, Friedrichshafen and Stuttgart are all within a few hours of the Tyrol and the Arlberg, and their fares are frequently lower than Innsbruck's.",
      "Munich is the useful one: a major hub with flights from everywhere, about two hours from the Zillertal and three from Solden or Ischgl. Friedrichshafen, on Lake Constance, is the quickest way into the Arlberg and the Grisons. Pick your airport below and you will see every resort we drive to from it, with distance and drive time.",
    ],
  },
};
