import type { TraductionStation } from "./types";

/**
 * Deutsche Übersetzungen der Skiort-Seiten.
 *
 * À part des modules de station, comme le français, pour survivre à
 * `npm run migrer:stations` qui réécrit les fichiers repris du WordPress.
 *
 * **Périmètre allemand — la Suisse.** Il ne recopie pas le périmètre français,
 * il suit son marché. Il visait d'abord l'Autriche et la Suisse alémanique au
 * départ d'Innsbruck, Salzbourg et Zurich ; l'Autriche étant sortie du
 * périmètre le 10 septembre 2026, il ne restait que trois stations. Quatre
 * skiorts alémaniques desservis depuis Zurich ont été ajoutés le même jour —
 * Engelberg, Grindelwald, Interlaken et Wengen — pour que le silo allemand
 * tienne debout : sept stations, huit liaisons.
 *
 * Un germanophone qui part skier ne cherche pas Val Thorens depuis Lyon ; il
 * cherche Engelberg ou Grindelwald depuis Zurich. Ce sont aussi les seules
 * liaisons où nous avons quelque chose de précis à dire.
 *
 * Les slugs sont allemands : `soelden`, `kitzbuehel`. Le slug anglais reste la
 * clé de ce registre — c'est lui qui relie les versions entre elles.
 *
 * Les distances et les temps de route viennent de `src/data/distances.ts`,
 * mesurés sur le réseau routier réel. Aucun chiffre n'est ici estimé à vue.
 */

/** Ce que le prix comprend — identique partout, donc écrit une fois. */
const inklusive = {
  type: "liste" as const,
  items: [
    "Skisäcke und Snowboardtaschen, ohne Aufpreis.",
    "Kindersitze und Sitzerhöhungen, vor der Abfahrt eingebaut.",
    "Flugüberwachung und Wartezeit bei Verspätung.",
    "Maut, Tunnelgebühren und die Schweizer Vignette.",
    "Absetzen an der genauen Adresse Ihrer Unterkunft.",
  ],
};

export const TRADUCTIONS_DE: Record<string, TraductionStation> = {







  zermatt: {
    slug: "zermatt",
    metaTitre: "Transfer Zermatt | Zürich und Genf bis Täsch",
    metaDescription:
      "Privater Transfer nach Zermatt ab Zürich (251 km) und Genf (237 km) — bis Täsch, mit Anschluss an den Shuttlezug. Festpreis pro Fahrzeug.",
    h1: "Transfers nach Zermatt — bis Täsch, und dann der Zug",
    chapo:
      "Zermatt ist autofrei, und das ist keine Formalität: Die Straße endet in Täsch, 5 km vorher, und die letzte Etappe fährt der Shuttlezug in zwölf Minuten. Wir bringen Sie bis zum Bahnhofsparkplatz Täsch — ab Zürich 251 km und rund 4 h 15, ab Genf 237 km und rund 3 h 10 — und stimmen die Ankunft auf eine Abfahrt ab.",
    contenu: [
      {
        type: "paragraphe",
        texte:
          "Wir sagen das vor der Buchung und nicht danach: Kein Fahrzeug fährt nach Zermatt hinein. Die Anbieter, die etwas anderes andeuten, meinen dasselbe wie wir — Täsch —, sagen es nur später.",
      },
      { type: "titre2", texte: "Welcher Flughafen?" },
      {
        type: "liste",
        items: [
          "Genf — 237 km, etwa 3 h 10. Über die Autobahn am Genfersee und das Rhonetal bis Visp, dann 30 km das Mattertal hinauf.",
          "Zürich — 251 km, etwa 4 h 15. Über Bern und das Lötschberg-Gebiet ins Wallis; länger, aber mit dichterem Flugangebot.",
          "Mailand Malpensa — auf Anfrage, über den Simplonpass; bei guter Wetterlage die kürzeste Verbindung von Süden.",
        ],
      },
      { type: "titre2", texte: "Die letzte Etappe: Täsch — Zermatt" },
      {
        type: "paragraphe",
        texte:
          "Der Shuttlezug fährt tagsüber alle zwanzig Minuten und braucht zwölf Minuten. Am Bahnhof Täsch gibt es Gepäckwagen und Träger; in Zermatt holen die Hotels ihre Gäste mit Elektrofahrzeugen ab, wenn Sie es ankündigen. Wir planen die Ankunft in Täsch so, dass Sie nicht mit Skisäcken auf dem Bahnsteig warten — und wenn Ihr Flug verspätet ist, verschiebt sich das mit.",
      },
      { type: "titre2", texte: "Das Mattertal im Winter" },
      {
        type: "paragraphe",
        texte:
          "Die 30 km von Visp nach Täsch führen durch ein enges Tal mit Galerien und Lawinenverbauungen. Die Straße ist gut ausgebaut und wird durchgehend geräumt, wird aber bei extremem Schneefall gesperrt — dann fährt die Matterhorn-Gotthard-Bahn ab Visp weiter, und wir bringen Sie dorthin statt nach Täsch. Der Preis bleibt der vereinbarte.",
      },
      { type: "titre2", texte: "Schweizer Besonderheiten" },
      {
        type: "paragraphe",
        texte:
          "Die Autobahnvignette und jede Maut auf der Strecke sind im Preis enthalten. In der Schweiz gibt es keine datumsgebundene Winterreifenpflicht, sondern eine Verantwortung für den Zustand des Fahrzeugs: Unsere Fahrzeuge fahren mit Winterreifen und führen Ketten mit, die ganze Saison.",
      },
      { type: "titre2", texte: "Was inklusive ist" },
      inklusive,
    ],
    faq: [
      {
        question: "Fahren Sie bis nach Zermatt hinein?",
        reponse:
          "Nein — Zermatt ist autofrei. Wir fahren bis zum Bahnhofsparkplatz in Täsch, 5 km davor, und der Shuttlezug braucht zwölf Minuten. Wir sagen das vor der Buchung, nicht bei der Ankunft.",
      },
      {
        question: "Wie oft fährt der Shuttlezug Täsch – Zermatt?",
        reponse:
          "Tagsüber alle zwanzig Minuten. Wir planen die Ankunft in Täsch auf eine Abfahrt ab und verschieben sie mit, wenn Ihr Flug später landet.",
      },
      {
        question: "Genf oder Zürich?",
        reponse:
          "Genf ist rund eine Stunde näher (3 h 10 gegen 4 h 15). Zürich lohnt sich, wenn der Flug deutlich besser passt.",
      },
      {
        question: "Ist die Schweizer Vignette im Preis?",
        reponse:
          "Ja, wie jede Maut auf der Strecke. Der genannte Preis ist der, den Sie zahlen.",
      },
      {
        question: "Was passiert, wenn die Mattertalstraße gesperrt ist?",
        reponse:
          "Dann bringen wir Sie nach Visp, wo die Matterhorn-Gotthard-Bahn abfährt. Der Preis bleibt derselbe.",
      },
    ],
  },

  davos: {
    slug: "davos",
    metaTitre: "Transfer Davos | Zürich 166 km, 2 h 35",
    metaDescription:
      "Privater Transfer nach Davos und Klosters ab Zürich (166 km, 2 h 35). Festpreis pro Fahrzeug, Vignette und Maut inklusive, Flug überwacht.",
    h1: "Transfers nach Davos und Klosters",
    chapo:
      "Davos liegt 166 km von Zürich entfernt, rund 2 h 35 Fahrt: Autobahn bis Landquart, dann das Prättigau hinauf über Klosters und den Wolfgangpass. Der Ort liegt auf 1 560 m und ist damit die höchstgelegene Stadt Europas — was die letzten Kilometer erklärt. Festpreis pro Fahrzeug, Vignette und Maut inklusive.",
    contenu: [
      {
        type: "paragraphe",
        texte:
          "Davos ist eine Stadt, kein Dorf: zwei Ortsteile, Davos Platz und Davos Dorf, eine Durchgangsstraße von mehreren Kilometern und Hotels über die ganze Länge verteilt. Zwischen einer Adresse in Platz und einer in Dorf liegen zehn Minuten — für die Fahrt kein Drama, für den Treffpunkt schon.",
      },
      { type: "titre2", texte: "Welcher Flughafen?" },
      {
        type: "liste",
        items: [
          "Zürich — 166 km, etwa 2 h 35. Die klare Wahl: Autobahn bis Landquart, dann Prättigau.",
          "Friedrichshafen — auf Anfrage, rund 2 h 30 über das Rheintal; für viele deutsche Gäste die kürzere Anreise.",
          "Mailand Malpensa — auf Anfrage über den San Bernardino; im Winter wetterabhängig.",
        ],
      },
      { type: "titre2", texte: "Prättigau, Klosters und der Wolfgangpass" },
      {
        type: "paragraphe",
        texte:
          "Ab Landquart (530 m) steigt die Straße durch das Prättigau nach Klosters (1 190 m) und über den Wolfgangpass (1 631 m) nach Davos. Der Pass ist keine gefürchtete Strecke — er wird geräumt und ist selten gesperrt —, aber er ist der Grund, warum die letzten dreißig Kilometer länger dauern als die Karte vermuten lässt.",
      },
      {
        type: "paragraphe",
        texte:
          "Klosters liegt auf halbem Weg und ist ein eigenes Ziel: 15 Minuten vor Davos, mit Anschluss ans selbe Skigebiet. Geben Sie an, welches der beiden es ist.",
      },
      { type: "titre2", texte: "Das WEF-Fenster im Januar" },
      {
        type: "paragraphe",
        texte:
          "In der Woche des Weltwirtschaftsforums, meist Mitte bis Ende Januar, gelten in Davos Zufahrtsbeschränkungen, Sicherheitskontrollen und Sperrzonen. Fahrten sind möglich, brauchen aber Vorlauf und die exakte Adresse. Wenn Sie in dieser Woche anreisen, buchen Sie früh und sagen Sie es uns — wir planen die Zufahrt entsprechend.",
      },
      { type: "titre2", texte: "Was inklusive ist" },
      inklusive,
    ],
    faq: [
      {
        question: "Wie lange dauert der Transfer Zürich – Davos?",
        reponse:
          "Rund 2 h 35 für 166 km, ohne Verkehr. An Samstagen in der Hochsaison und in der WEF-Woche rechnen Sie mehr ein.",
      },
      {
        question: "Fahren Sie auch nach Klosters?",
        reponse:
          "Ja, es liegt auf derselben Strecke, rund 15 Minuten vor Davos. Geben Sie die genaue Adresse an.",
      },
      {
        question: "Davos Platz oder Davos Dorf?",
        reponse:
          "Zwischen beiden liegen rund zehn Minuten. Nennen Sie den Ortsteil und die Straße, damit der Fahrer direkt vorfährt.",
      },
      {
        question: "Ist der Wolfgangpass im Winter offen?",
        reponse:
          "In der Regel ja, er wird durchgehend geräumt. Bei einer Sperre fahren wir über Filisur und Wiesen — der Preis bleibt der vereinbarte.",
      },
    ],
  },

  "st-moritz": {
    slug: "st-moritz",
    metaTitre: "Transfer St. Moritz | Zürich 221 km, 3 h 20",
    metaDescription:
      "Privater Transfer nach St. Moritz und ins Oberengadin ab Zürich (221 km, 3 h 20). Festpreis pro Fahrzeug, Vignette und Maut inklusive.",
    h1: "Transfers nach St. Moritz — das Oberengadin ab Zürich",
    chapo:
      "St. Moritz liegt 221 km von Zürich entfernt, rund 3 h 20 Fahrt über Chur, den Julierpass und Silvaplana. Das Oberengadin liegt auf 1 800 m in einem breiten Hochtal — die Anfahrt ist deshalb lang, aber der Schluss ist flach. Festpreis pro Fahrzeug, Schweizer Vignette und Maut inklusive.",
    contenu: [
      {
        type: "paragraphe",
        texte:
          "Das Engadin ist von Zürich aus nicht schnell erreichbar, und das ist Teil seines Charakters. Es gibt keine Autobahn hinein: Ab Chur führt die Strecke über Passstraßen, und welche davon offen ist, entscheidet das Wetter.",
      },
      { type: "titre2", texte: "Welcher Flughafen?" },
      {
        type: "liste",
        items: [
          "Zürich — 221 km, etwa 3 h 20. Über Chur und den Julierpass; die verlässlichste Verbindung.",
          "Mailand Malpensa — auf Anfrage über den Malojapass, rund 3 h 30 bei offener Strecke.",
          "Friedrichshafen und Innsbruck — auf Anfrage; beide sind Umwege, aber gelegentlich der bessere Flug.",
        ],
      },
      { type: "titre2", texte: "Julier, Albula, Maloja" },
      {
        type: "paragraphe",
        texte:
          "Der Julierpass (2 284 m) ist die Winterverbindung ins Oberengadin: Er wird das ganze Jahr offen gehalten und nur bei starkem Schneefall kurzzeitig gesperrt. Der Albulapass ist im Winter geschlossen, der Maloja Richtung Italien offen, aber wetterabhängig. Bei einer Julier-Sperre bleibt der Autoverlad Vereina durch den Tunnel — die Fahrzeuge fahren auf dem Zug, und wir planen das ein, ohne Aufpreis.",
      },
      { type: "titre2", texte: "Das Oberengadin ist mehr als St. Moritz" },
      {
        type: "paragraphe",
        texte:
          "Celerina, Pontresina, Silvaplana, Sils und Samedan liegen alle innerhalb von zwanzig Minuten und teilen dasselbe Skigebiet. Auf der flachen Talstraße kosten sie kaum Zeit — geben Sie trotzdem die genaue Adresse an, denn die Ortsdurchfahrten sind eng und die Hotelzufahrten liegen selten an der Hauptstraße.",
      },
      { type: "titre2", texte: "Anreise mit der Rhätischen Bahn" },
      {
        type: "paragraphe",
        texte:
          "Die Strecke Chur — St. Moritz gehört zu den schönsten Bahnfahrten Europas, und sie ist bei Passsperre auch die verlässlichste. Wenn Sie diese Variante wählen, fahren wir Sie nach Chur und Sie steigen dort um — oder wir holen Sie am Bahnhof St. Moritz ab und übernehmen nur die letzte Etappe.",
      },
      { type: "titre2", texte: "Was inklusive ist" },
      inklusive,
    ],
    faq: [
      {
        question: "Wie lange dauert der Transfer Zürich – St. Moritz?",
        reponse:
          "Rund 3 h 20 für 221 km, ohne Verkehr. Bei Schneefall am Julierpass rechnen Sie eine gute halbe Stunde mehr ein.",
      },
      {
        question: "Was passiert, wenn der Julierpass gesperrt ist?",
        reponse:
          "Wir nehmen den Autoverlad durch den Vereinatunnel. Das kostet Zeit, aber keinen Aufpreis — die Sperre ist unser Risiko.",
      },
      {
        question: "Fahren Sie auch nach Pontresina und Celerina?",
        reponse:
          "Ja, wie ins ganze Oberengadin. Die Orte liegen innerhalb von zwanzig Minuten auf der Talstraße.",
      },
      {
        question: "Ist die Schweizer Vignette im Preis enthalten?",
        reponse:
          "Ja, wie jede Maut und jeder Autoverlad auf der Strecke. Der genannte Preis ist der, den Sie zahlen.",
      },
    ],
  },

  engelberg: {
    slug: "engelberg",
    metaTitre: "Transfer Engelberg | 107 km ab Zürich, rund 1 h 50",
    metaDescription:
      "Privater Transfer nach Engelberg ab Zürich: 107 km, rund 1 h 50, fast durchgehend Autobahn. Festpreis pro Fahrzeug, Skisäcke und Vignette inklusive.",
    h1: "Transfers nach Engelberg — der kürzeste Weg ab Zürich",
    chapo:
      "Engelberg ist der nächstgelegene ernstzunehmende Skiort ab Zürich: 107 km, rund 1 h 50, davon der größte Teil Autobahn. Wer morgens landet, steht mittags am Titlis — das schafft kaum ein Ort dieser Größenordnung.",
    contenu: [
      { type: "titre2", texte: "Warum die Entfernung hier zählt" },
      {
        type: "paragraphe",
        texte:
          "Autobahn bis Stans, dann zwanzig Kilometer das Tal hinauf: der Transfer ab Zürich ist der kürzeste, den ein internationaler Flughafen in die Schweizer Alpen bietet. Das ist kein Detail für einen Kurzaufenthalt — bei drei Skitagen entscheidet die Anfahrt darüber, ob der erste davon zählt.",
      },
      {
        type: "paragraphe",
        texte:
          "Die Höhe gewinnen hier die Bahnen, nicht der Transfer. Die Talstraße liegt niedrig und wird die ganze Saison geräumt, was Engelberg zu einer der verlässlichsten Anfahrten der Alpen bei schlechtem Wetter macht.",
      },

      { type: "titre2", texte: "Welcher Flughafen für Engelberg?" },
      {
        type: "liste",
        items: [
          "Zürich (ZRH) — 107 km, rund 1 h 50. Flüge die ganze Woche, Langstreckenanschluss, Autobahn bis Stans.",
          "Bern (BRN) — 158 km, rund 2 h 05. Näher an der Mitte des Landes, aber mit dünnem Flugplan: erst die Verbindung prüfen, dann planen.",
          "Basel (BSL) — rund 145 km, 2 h. Interessant für Flüge aus Deutschland und Frankreich.",
          "Milano Malpensa (MXP) — 220 km, rund 3 h durch den Gotthard. Lohnt sich für den Flugpreis, nicht für die Fahrt: der Tunnel staut sich an Wochenenden und Feiertagen erheblich.",
        ],
      },

      { type: "titre2", texte: "Der Ort" },
      {
        type: "paragraphe",
        texte:
          "Engelberg ist um ein Benediktinerkloster von 1120 gewachsen, und die Abtei steht bis heute mitten im Dorf — ungewöhnliche Nachbarschaft für einen Ort, der international als einer der besten Freeride-Berge der Alpen gilt. Der Titlis darüber reicht auf 3 020 m, mit einem Gletscher, der die Saison lang trägt.",
      },
      {
        type: "paragraphe",
        texte:
          "Für den Transfer heißt das zweierlei: Das Dorf ist kompakt und die Adressen liegen nah beieinander, und viele Gäste bringen Tourenausrüstung mit. Melden Sie Splitboards, Felle und Airbag-Rucksäcke bei der Buchung an — sie brauchen mehr Platz als ein Paar Ski, und der Kofferraum bestimmt das Fahrzeug vor der Sitzzahl.",
      },

      { type: "titre2", texte: "Winter, Gepäck, Buchung" },
      {
        type: "paragraphe",
        texte:
          "Unsere Fahrzeuge fahren mit Winterreifen und führen Ketten mit; in der Schweiz entscheidet der Zustand der Straße, nicht das Datum. Die Autobahnvignette und jede Maut der Strecke sind im genannten Preis enthalten.",
      },
      inklusive,
    ],
    faq: [
      {
        question: "Wie lange dauert der Transfer vom Flughafen Zürich nach Engelberg?",
        reponse:
          "107 km und rund 1 h 50 ohne Verkehr, fast durchgehend Autobahn bis Stans. An einem Samstag in der Hochsaison rechnen Sie zwanzig bis dreißig Minuten mehr ein.",
      },
      {
        question: "Fährt das Fahrzeug bis vor die Unterkunft?",
        reponse:
          "Ja. Engelberg ist mit dem Auto erreichbar, wir setzen Sie an der genauen Adresse ab — Hotel, Chalet oder Ferienwohnung.",
      },
      {
        question: "Lohnt sich Milano Malpensa für Engelberg?",
        reponse:
          "Nur beim Flugpreis. 220 km und rund drei Stunden durch den Gotthardtunnel, der sich an Wochenenden und in den Ferien staut. Zürich bleibt bei gleichem Preis immer die bessere Wahl.",
      },
      {
        question: "Nehmen Sie Tourenausrüstung mit?",
        reponse:
          "Ja, und ohne Aufpreis. Melden Sie Splitboards, Tourenski und Airbag-Rucksäcke bei der Buchung an: Sie brauchen mehr Platz als klassische Ski, und wir wählen das Fahrzeug danach aus.",
      },
      {
        question: "Was ist im Preis enthalten?",
        reponse:
          "Der Festpreis pro Fahrzeug, Skisäcke, Kindersitze, Maut, die Schweizer Vignette, Flugüberwachung und Wartezeit bei Verspätung. Nach der Buchung ändert sich nichts mehr.",
      },
    ],
  },

  grindelwald: {
    slug: "grindelwald",
    metaTitre: "Transfer Grindelwald | Zürich 157 km, Genf 233 km",
    metaDescription:
      "Privater Transfer nach Grindelwald ab Zürich (157 km, 2 h 40) und Genf (233 km, 3 h). Festpreis pro Fahrzeug, Vignette und Skisäcke inklusive.",
    h1: "Transfers nach Grindelwald — unter der Eiger-Nordwand",
    chapo:
      "Grindelwald liegt auf 1 034 m am Fuß der Eiger-Nordwand, und die Anfahrt bleibt bis zuletzt im Tal: 157 km und rund 2 h 40 ab Zürich, 233 km und rund 3 h ab Genf. Die Höhe machen die Bahnen — der Transfer endet vor Ihrer Unterkunft.",
    contenu: [
      { type: "titre2", texte: "Welcher Flughafen für Grindelwald?" },
      {
        type: "liste",
        items: [
          "Zürich (ZRH) — 157 km, rund 2 h 40. Der Hauptzugang: Autobahn über Bern und Interlaken, dann das Lütschinental hinauf.",
          "Genf (GVA) — 233 km, rund 3 h. Die größere Auswahl an europäischen Flügen, dafür die längere Fahrt am Genfersee entlang.",
          "Bern (BRN) — rund 80 km, gut eine Stunde. Mit Abstand der nächste Flughafen, aber mit dünnem Flugplan.",
          "Basel (BSL) — rund 180 km. Sinnvoll für Flüge aus Deutschland, überwiegend Autobahn.",
        ],
      },

      { type: "titre2", texte: "Der Ort und das Gebiet" },
      {
        type: "paragraphe",
        texte:
          "Grindelwald ist kein zusammengebautes Retortendorf: ein gewachsener Ort mit Bauernhäusern, Hotels aus der Belle Époque und einer Aussicht, die seit hundertfünfzig Jahren Gäste bringt. Zwei Gebiete teilen sich den Ort — First im Norden, Männlichen und Kleine Scheidegg im Süden, von dort geht es weiter nach Wengen.",
      },
      {
        type: "paragraphe",
        texte:
          "Seit dem Eiger Express ist die Kleine Scheidegg in gut zwanzig Minuten erreichbar. Für den Transfer heißt das: Fragen Sie nicht nach dem nächsten Lift, sondern nennen Sie Ihre Adresse — der Ort zieht sich über mehrere Kilometer, und zwischen Grund und Dorf liegt ein spürbarer Höhenunterschied mit Gepäck.",
      },

      { type: "titre2", texte: "Die letzte Etappe" },
      {
        type: "paragraphe",
        texte:
          "Die Straße von Interlaken durch das Lütschinental ist eine Hauptstraße, die ganze Saison geräumt, und selten das Problem. Was hier zählt, ist der Verkehr an Samstagen und die Anreise bei Schneefall am Nachmittag: Planen Sie die Abholung nicht auf die letzte Minute vor einer Bahnabfahrt.",
      },
      inklusive,
    ],
    faq: [
      {
        question: "Wie lange dauert die Fahrt vom Flughafen Zürich nach Grindelwald?",
        reponse:
          "157 km und rund 2 h 40 ohne Verkehr: Autobahn über Bern bis Interlaken, dann rund 20 km durch das Lütschinental. An Samstagen in der Hochsaison etwas mehr.",
      },
      {
        question: "Zürich oder Genf für Grindelwald?",
        reponse:
          "Zürich ist rund 75 km und eine gute halbe Stunde näher. Genf lohnt sich, wenn Ihr Flug dorthin deutlich günstiger ist oder aus Süd- oder Westeuropa kommt.",
      },
      {
        question: "Fährt das Fahrzeug bis ins Dorf?",
        reponse:
          "Ja. Grindelwald ist mit dem Auto erreichbar, anders als Wengen oder Mürren im Nachbartal. Wir setzen Sie an der genauen Adresse ab.",
      },
      {
        question: "Kann ich von Grindelwald aus nach Wengen fahren?",
        reponse:
          "Über die Kleine Scheidegg mit der Bahn, ja — mit dem Auto nicht: Wengen hat keine Straße. Wer dort wohnt, bucht den Transfer nach Lauterbrunnen und steigt in die Wengernalpbahn.",
      },
      {
        question: "Ist die Vignette im Preis?",
        reponse:
          "Ja, wie jede Maut der Strecke. Der genannte Preis ist der Endpreis pro Fahrzeug.",
      },
    ],
  },

  interlaken: {
    slug: "interlaken",
    metaTitre: "Transfer Interlaken | 139 km ab Zürich, rund 2 h 20",
    metaDescription:
      "Privater Transfer nach Interlaken ab Zürich (139 km, 2 h 20) und Genf (216 km, 2 h 40). Festpreis pro Fahrzeug, Vignette und Skisäcke inklusive.",
    h1: "Transfers nach Interlaken — die Basis des Berner Oberlands",
    chapo:
      "Interlaken ist selbst kein Skiort, sondern das Drehkreuz der Region: 566 m hoch, zwischen Thuner und Brienzer See, mit Bahnen, die halbstündlich in die Berge fahren. 139 km und rund 2 h 20 ab Zürich, 216 km und rund 2 h 40 ab Genf.",
    contenu: [
      { type: "titre2", texte: "Warum viele hier wohnen und anderswo Ski fahren" },
      {
        type: "paragraphe",
        texte:
          "Der Preis, die Auswahl an Unterkünften und die Bahnen: Grindelwald liegt 20 km entfernt, Lauterbrunnen 12 km, Wengen und Mürren eine Bergbahn darüber, Adelboden und Gstaad innerhalb einer Fahrstunde. Wer eine Woche im Oberland verbringt und mehrere Gebiete fahren will, wohnt hier oft günstiger als oben.",
      },
      {
        type: "paragraphe",
        texte:
          "Für den Transfer ist das die einfachste Ankunft der Region: flach, tief gelegen, Autobahn bis kurz vor die Stadt. Bei Schneefall ist Interlaken eine der wenigen Adressen in den Alpen, bei denen die Anfahrt kein Thema ist.",
      },

      { type: "titre2", texte: "Welcher Flughafen für Interlaken?" },
      {
        type: "liste",
        items: [
          "Bern (BRN) — 51 km, rund 50 Minuten. Mit Abstand der nächste, auf der Autobahn am Thuner See entlang; der Flugplan ist allerdings dünn.",
          "Zürich (ZRH) — 139 km, rund 2 h 20. Der Hauptzugang, Autobahn die ganze Strecke über Bern.",
          "Genf (GVA) — 216 km, rund 2 h 40. Die größte europäische Auswahl, eine ruhige Fahrt an den Seen entlang.",
          "Milano Malpensa (MXP) — über den Simplon oder mit dem Autoverlad in Kandersteg, je nach Verhältnissen. Für Flüge aus Südeuropa einen Vergleich wert.",
        ],
      },

      { type: "titre2", texte: "Ankunft und Adresse" },
      {
        type: "paragraphe",
        texte:
          "Interlaken hat zwei Bahnhöfe — Ost und West — und die Unterkünfte verteilen sich über beide Seiten der Stadt sowie über Matten und Unterseen. Nennen Sie bei der Buchung die genaue Adresse: Für die Fahrt macht es wenig aus, für den Treffpunkt alles.",
      },
      inklusive,
    ],
    faq: [
      {
        question: "Ist Interlaken ein Skiort?",
        reponse:
          "Nein, es ist die Basis. Gefahren wird in Grindelwald, auf der Kleinen Scheidegg, in Wengen, Mürren oder am Schilthorn — alles halbstündlich mit der Bahn erreichbar.",
      },
      {
        question: "Wie lange dauert der Transfer ab Zürich?",
        reponse:
          "139 km und rund 2 h 20 ohne Verkehr, überwiegend Autobahn über Bern. Ab Genf sind es 216 km und rund 2 h 40.",
      },
      {
        question: "Lohnt sich der Flughafen Bern?",
        reponse:
          "Wenn Ihre Stadt angeflogen wird, ja: 51 km und knapp eine Stunde, die kürzeste Anfahrt der Region. Der Flugplan ist aber schmal — prüfen Sie die Verbindung, bevor Sie darauf planen.",
      },
      {
        question: "Können wir unterwegs in Grindelwald oder Lauterbrunnen halten?",
        reponse:
          "Sagen Sie es bei der Buchung. Ein Zwischenstopp im Tal ist möglich; wir nennen Ihnen den Preis vorher, er ändert sich danach nicht.",
      },
      {
        question: "Ist die Anfahrt bei Schneefall heikel?",
        reponse:
          "Weniger als fast überall sonst in den Alpen: die Strecke bleibt tief und verläuft auf Autobahn und Seestraße. Unsere Fahrzeuge fahren dennoch mit Winterreifen und führen Ketten mit.",
      },
    ],
  },

  wengen: {
    slug: "wengen",
    metaTitre: "Transfer Wengen | über Lauterbrunnen und die Bergbahn",
    metaDescription:
      "Privater Transfer nach Wengen ab Zürich: bis Lauterbrunnen, dann die Wengernalpbahn. Festpreis pro Fahrzeug, Ankunft auf eine Abfahrt abgestimmt.",
    h1: "Transfers nach Wengen — bis Lauterbrunnen, dann die Bahn",
    chapo:
      "Wengen hat keine Straße. Das Dorf auf 1 274 m wird ausschließlich von der Wengernalpbahn erschlossen, die in rund 15 Minuten die Felswand hinauf fährt, etwa alle halbe Stunde. Ihr Transfer endet also in Lauterbrunnen — und wir stimmen die Ankunft auf eine Abfahrt ab.",
    contenu: [
      { type: "titre2", texte: "Das steht hier oben, nicht unten auf der Seite" },
      {
        type: "paragraphe",
        texte:
          "Im Voraus gesagt gehört das zum Reiz des Ortes; um elf Uhr abends am Bahnsteig entdeckt, nicht mehr. Deshalb steht es als Erstes: Kein Fahrzeug fährt nach Wengen hinein, und wer Ihnen etwas anderes andeutet, meint dasselbe — Lauterbrunnen —, sagt es nur später.",
      },
      {
        type: "paragraphe",
        texte:
          "Die Straße endet in Lauterbrunnen, rund 149 km und zweieinhalb Stunden ab Zürich. Die 174 km und knapp 4 h 45, die Sie in der Tabelle unten finden, schließen die Bergbahn bis ins Dorf ein — beides stimmt, es misst nur nicht dasselbe.",
      },

      { type: "titre2", texte: "Wie die letzte Etappe funktioniert" },
      {
        type: "liste",
        items: [
          "Wir setzen Sie am Bahnhof Lauterbrunnen ab, direkt am Parkplatz.",
          "Die Wengernalpbahn fährt etwa alle 30 Minuten, die Fahrt dauert rund 15 Minuten.",
          "Ski und Gepäck fahren mit; für schweres Gepäck gibt es in Wengen Elektrokarren der Hotels.",
          "Sagen Sie uns Ihr Hotel: Wir legen die Ankunft auf eine Abfahrt, statt Sie auf einem kalten Bahnsteig warten zu lassen.",
        ],
      },

      { type: "titre2", texte: "Der Ort" },
      {
        type: "paragraphe",
        texte:
          "Wengen liegt auf einer Terrasse über dem Lauterbrunnental, gegenüber Jungfrau, Mönch und Eiger. Skiort ist es seit den Viktorianern, und eine Straße hatte es nie — das Ergebnis ist ein Dorf ohne Autoverkehr, mit dem Skigebiet der Kleinen Scheidegg direkt darüber.",
      },
      {
        type: "paragraphe",
        texte:
          "Ein Datum sollten Sie kennen: das Lauberhorn-Wochenende im Januar. Tal und Bahnen sind dann voll, die Unterkünfte lange ausgebucht. Wer in dieser Woche kommt, bucht den Transfer früh — und rechnet mit mehr Zeit für die letzten Kilometer.",
      },
      inklusive,
    ],
    faq: [
      {
        question: "Kann das Fahrzeug bis Wengen fahren?",
        reponse:
          "Nein. Wengen ist autofrei und hat keine Straßenverbindung. Der Transfer endet am Bahnhof Lauterbrunnen, von dort fährt die Wengernalpbahn in rund 15 Minuten hinauf.",
      },
      {
        question: "Wie oft fährt die Bahn?",
        reponse:
          "Etwa alle halbe Stunde, bis in den späten Abend. Nennen Sie uns Ihren Flug und Ihr Hotel: Wir stimmen die Ankunft in Lauterbrunnen auf eine Abfahrt ab.",
      },
      {
        question: "Wie lange dauert die Fahrt ab Zürich?",
        reponse:
          "Bis Lauterbrunnen rund 149 km und zweieinhalb Stunden. Mit der Bergbahn bis ins Dorf kommen Sie insgesamt auf knapp 4 h 45, je nach Anschluss.",
      },
      {
        question: "Was passiert mit dem Gepäck?",
        reponse:
          "Ski und Koffer fahren in der Bahn mit. In Wengen selbst holen die meisten Hotels ihre Gäste mit Elektrokarren am Bahnhof ab — sagen Sie dem Hotel Ihre Ankunftszeit.",
      },
      {
        question: "Wann ist es besonders voll?",
        reponse:
          "Am Lauberhorn-Wochenende im Januar und in den Februarferien. Beides sind Termine, an denen man den Transfer nicht kurzfristig bucht.",
      },
    ],
  },
};
