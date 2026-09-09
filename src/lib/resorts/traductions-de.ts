import type { TraductionStation } from "./types";

/**
 * Deutsche Übersetzungen der Skiort-Seiten.
 *
 * À part des modules de station, comme le français, pour survivre à
 * `npm run migrer:stations` qui réécrit les fichiers repris du WordPress.
 *
 * **Périmètre allemand — décision du 9 septembre 2026.** Il ne recopie pas le
 * périmètre français, il suit son marché : l'Autriche et la Suisse alémanique,
 * au départ d'Innsbruck, Salzbourg et Zurich. Un germanophone qui part skier ne
 * cherche pas Val Thorens depuis Lyon ; il cherche Ischgl depuis Innsbruck,
 * Sölden depuis Salzbourg, Zermatt depuis Zurich. Ce sont aussi les seules
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
  ischgl: {
    slug: "ischgl",
    metaTitre: "Transfer Ischgl | Innsbruck 100 km, Zürich, Salzburg",
    metaDescription:
      "Privater Transfer nach Ischgl ab Innsbruck (100 km, 1 h 25), Zürich und Salzburg. Festpreis pro Fahrzeug, Skisäcke und Kindersitze inklusive.",
    h1: "Transfers nach Ischgl — das Paznaun ab Innsbruck",
    chapo:
      "Ischgl liegt am Ende des Paznauntals auf 1 377 m, und der Weg dorthin ist immer derselbe: von Landeck taleinwärts, 30 km an der Trisanna entlang. Innsbruck ist mit 100 km und rund 1 h 25 der nächste Flughafen, Zürich (228 km, 3 h 30) die internationale Alternative, Salzburg (280 km, 3 h 25) die Verbindung für den Osten. Wir fahren alle drei zum Festpreis pro Fahrzeug, mit Skisäcken und Kindersitzen inklusive.",
    contenu: [
      {
        type: "paragraphe",
        texte:
          "Ischgl ist kein Ort, den man im Vorbeifahren erreicht. Das Paznaun ist eine Sackgasse: Wer hineinfährt, fährt auf derselben Straße wieder hinaus, und diese Straße endet in Galtür. Das prägt jede Anfahrt — im Guten wie im Schlechten.",
      },
      { type: "titre2", texte: "Welcher Flughafen?" },
      {
        type: "liste",
        items: [
          "Innsbruck — 100 km, etwa 1 h 25. Der nächste, und tagsüber der schnellste: Inntalautobahn bis Landeck, dann das Tal hinauf.",
          "Zürich — 228 km, etwa 3 h 30. Deutlich weiter, dafür Flüge aus ganz Europa an jedem Wochentag.",
          "Salzburg — 280 km, etwa 3 h 25. Sinnvoll, wenn Sie aus dem Osten anreisen oder Innsbruck ausgebucht ist.",
          "München — kein Direktangebot in dieser Liste, aber auf Anfrage gefahren: rechnen Sie mit gut drei Stunden über Garmisch und das Inntal.",
        ],
      },
      {
        type: "paragraphe",
        texte:
          "Die Zeiten sind auf dem realen Straßennetz gemessen, ohne Verkehr. Sie gelten für einen freien Wochentag, nicht für einen Bestfall.",
      },
      { type: "titre2", texte: "Der Samstag im Paznaun" },
      {
        type: "paragraphe",
        texte:
          "Ischgl wechselt am Samstag komplett die Gäste, und alle fahren durch dasselbe Nadelöhr bei Landeck. Zwischen zehn und vierzehn Uhr staut es sich regelmäßig am Talschluss, weil Ankommende und Abreisende sich auf einer zweispurigen Straße begegnen. Rechnen Sie an einem Februar-Samstag eine gute Stunde auf jede der oben genannten Zeiten.",
      },
      { type: "titre2", texte: "Die letzten 30 Kilometer" },
      {
        type: "paragraphe",
        texte:
          "Ab Landeck (816 m) steigt die Straße auf 1 377 m — kein Pass, aber eine durchgehende Talstraße mit Tunneln, Galerien und wenig Ausweichmöglichkeit. Sie wird die ganze Saison geräumt und gesalzen. Bei starkem Schneefall wird sie punktuell wegen Lawinengefahr gesperrt; unsere Fahrer haben die Sperrmeldungen laufend und sagen Ihnen Bescheid, bevor Sie am Flughafen stehen.",
      },
      {
        type: "paragraphe",
        texte:
          "Der nächste Bahnhof ist Landeck-Zams, 30 km talauswärts, mit Direktzügen aus Wien, München und Zürich. Wenn Sie mit der Bahn anreisen, sagen Sie es uns: Es ist dieselbe Fahrt, ab demselben Punkt.",
      },
      { type: "titre2", texte: "Was inklusive ist" },
      inklusive,
    ],
    faq: [
      {
        question: "Wie lange dauert der Transfer Innsbruck – Ischgl?",
        reponse:
          "Rund 1 h 25 für 100 km, ohne Verkehr. An einem Samstag in der Hochsaison rechnen Sie eine Stunde mehr ein: Bei Landeck treffen Ankommende und Abreisende aufeinander.",
      },
      {
        question: "Welcher Flughafen liegt am nächsten?",
        reponse:
          "Innsbruck, 100 km und etwa 1 h 25. Zürich ist mit 228 km deutlich weiter, hat aber ein dichteres internationales Flugangebot.",
      },
      {
        question: "Sind Skisäcke im Preis enthalten?",
        reponse:
          "Ja. Ski- und Snowboardtaschen reisen ohne Aufpreis mit; wir bemessen das Fahrzeug nach dem Material, das Sie bei der Buchung angeben.",
      },
      {
        question: "Was, wenn die Paznauntalstraße gesperrt ist?",
        reponse:
          "Wir verfolgen die Sperrmeldungen und informieren Sie, bevor Sie losfahren. Wird während der Fahrt gesperrt, warten wir an einem sinnvollen Punkt ab — ohne Aufpreis, das Risiko liegt bei uns.",
      },
      {
        question: "Fahren Sie auch nach Galtür, Kappl und See?",
        reponse:
          "Ja, es ist dieselbe Talstraße. Galtür liegt 10 km hinter Ischgl, Kappl und See davor — geben Sie die genaue Adresse bei der Buchung an.",
      },
    ],
  },

  solden: {
    slug: "soelden",
    metaTitre: "Transfer Sölden | Innsbruck 84 km, 1 h 15",
    metaDescription:
      "Privater Transfer nach Sölden ab Innsbruck (84 km, 1 h 15), Salzburg und Zürich. Festpreis pro Fahrzeug, Skisäcke inklusive, Flug überwacht.",
    h1: "Transfers nach Sölden — das Ötztal ab Innsbruck",
    chapo:
      "Sölden liegt 84 km von Innsbruck entfernt, gut 1 h 15 Fahrt, und ist damit einer der am schnellsten erreichbaren Gletscherorte der Alpen. Salzburg liegt bei 263 km (3 h 10), Zürich bei 272 km (4 h). Die Anfahrt folgt der Inntalautobahn bis Ötztal-Bahnhof und dann 35 km das Tal hinauf — kein Pass, aber ein stetiger Anstieg auf 1 368 m.",
    contenu: [
      {
        type: "paragraphe",
        texte:
          "Das Ötztal ist das längste Seitental des Inntals, und Sölden liegt weit hinten darin. Was die Anfahrt angenehm macht: Die Autobahn bringt Sie bis fast an den Talanfang, und erst danach beginnt Bergstraße.",
      },
      { type: "titre2", texte: "Welcher Flughafen?" },
      {
        type: "liste",
        items: [
          "Innsbruck — 84 km, etwa 1 h 15. Der nächste Flughafen der Alpen zu einem Gletscherskigebiet dieser Größe.",
          "Salzburg — 263 km, etwa 3 h 10. Die Wahl bei Anreise aus dem Osten oder wenn Innsbruck nicht passt.",
          "Zürich — 272 km, etwa 4 h. Weit, aber mit dem breitesten Flugangebot und oft den günstigsten Tarifen.",
        ],
      },
      { type: "titre2", texte: "Innsbruck landet nicht immer in Innsbruck" },
      {
        type: "paragraphe",
        texte:
          "Der Anflug auf Innsbruck führt durch ein enges Tal und ist wetterabhängiger als anderswo: Bei Föhn oder schlechter Sicht wird häufiger als an anderen Flughäfen nach München oder Salzburg umgeleitet. Wenn Ihnen das passiert, schreiben Sie uns eine Zeile — wir fahren von dort, wo Sie tatsächlich stehen, und Sie buchen nichts neu.",
      },
      { type: "titre2", texte: "Die letzten 35 Kilometer" },
      {
        type: "paragraphe",
        texte:
          "Ab Ötztal-Bahnhof (700 m) steigt die Straße bis Sölden auf 1 368 m. Sie ist gut ausgebaut und wird durchgehend geräumt, hat aber im Bereich Ötz und Umhausen enge Stellen, an denen Gegenverkehr mit Bussen Zeit kostet. Die Weiterfahrt nach Hochsölden, Obergurgl und Vent zweigt hinter dem Ort ab und ist im Winter Kettenpflicht-Gebiet — unsere Fahrzeuge führen Ketten mit.",
      },
      {
        type: "paragraphe",
        texte:
          "Der Bahnhof Ötztal an der Arlbergstrecke ist der nächstgelegene, 35 km talauswärts, mit Direktverbindungen aus Wien, München und Zürich. Auch von dort fahren wir.",
      },
      { type: "titre2", texte: "Was inklusive ist" },
      inklusive,
    ],
    faq: [
      {
        question: "Wie lange dauert der Transfer Innsbruck – Sölden?",
        reponse:
          "Rund 1 h 15 für 84 km, ohne Verkehr. An einem Samstag in der Hochsaison rechnen Sie 30 bis 60 Minuten mehr ein.",
      },
      {
        question: "Fahren Sie bis Hochsölden und Obergurgl weiter?",
        reponse:
          "Ja. Hochsölden liegt gut 15 Minuten oberhalb, Obergurgl 14 km weiter hinten im Tal — beide fahren wir an, mit Winterausrüstung an Bord.",
      },
      {
        question: "Was passiert, wenn mein Flug nach München umgeleitet wird?",
        reponse:
          "Schreiben Sie uns. Wir fahren ab München statt ab Innsbruck; die Differenz stimmen wir vorher schriftlich mit Ihnen ab, es gibt keine Überraschung bei der Ankunft.",
      },
      {
        question: "Gilt der Preis pro Person?",
        reponse:
          "Nein, pro Fahrzeug. Zu zweit oder zu acht ist der genannte Betrag derselbe, Maut inklusive.",
      },
    ],
  },

  kitzbuhel: {
    slug: "kitzbuehel",
    metaTitre: "Transfer Kitzbühel | Salzburg 75 km, Innsbruck 98 km",
    metaDescription:
      "Privater Transfer nach Kitzbühel ab Salzburg (75 km, 1 h 20) und Innsbruck (98 km, 1 h 30). Festpreis pro Fahrzeug, Skisäcke inklusive.",
    h1: "Transfers nach Kitzbühel — Salzburg oder Innsbruck",
    chapo:
      "Kitzbühel ist einer der wenigen großen Skiorte, die von zwei Flughäfen fast gleich weit entfernt sind: Salzburg liegt 75 km entfernt (rund 1 h 20), Innsbruck 98 km (rund 1 h 30). Die Wahl entscheidet sich deshalb am Flugplan, nicht an der Fahrzeit. Beide Strecken fahren wir zum Festpreis pro Fahrzeug, mit Skisäcken, Kindersitzen und Maut im Preis.",
    contenu: [
      {
        type: "paragraphe",
        texte:
          "Kitzbühel liegt auf 762 m — tief für einen Ort dieser Bekanntheit — und genau darin liegt der Vorteil der Anfahrt: Es gibt keinen langen Schlussanstieg. Wer hier ankommt, ist die ganze Strecke auf Talstraßen gefahren.",
      },
      { type: "titre2", texte: "Welcher Flughafen?" },
      {
        type: "liste",
        items: [
          "Salzburg — 75 km, etwa 1 h 20. Über die Tauernautobahn und das Saalachtal, oder über Lofer. Der kürzeste Weg.",
          "Innsbruck — 98 km, etwa 1 h 30. Inntalautobahn bis Wörgl, dann durch das Brixental oder über St. Johann.",
          "München — auf Anfrage, rund zwei Stunden über Rosenheim und Kufstein. Oft die günstigsten Flüge, und für viele deutsche Gäste die kürzeste Gesamtreise.",
        ],
      },
      {
        type: "paragraphe",
        texte:
          "Die zwanzig Minuten Unterschied zwischen Salzburg und Innsbruck fallen weniger ins Gewicht als der Flugpreis und die Abflugzeit. Entscheiden Sie nach dem Flug — die Fahrt macht keinen Unterschied, den Sie am Abend noch merken.",
      },
      { type: "titre2", texte: "Das Hahnenkamm-Wochenende" },
      {
        type: "paragraphe",
        texte:
          "Am Wochenende des Hahnenkammrennens, meist im dritten Januarwochenende, ist Kitzbühel nicht mit einer normalen Woche vergleichbar. Zufahrten werden abschnittsweise gesperrt, Parkflächen sind reserviert, und die letzten zwei Kilometer können vierzig Minuten dauern. Wenn Sie an diesen Tagen anreisen, buchen Sie früh und geben Sie uns die genaue Adresse: Wir planen den Zugang von der richtigen Seite.",
      },
      { type: "titre2", texte: "Winterausrüstung und Straßen" },
      {
        type: "paragraphe",
        texte:
          "In Österreich gilt die situative Winterausrüstungspflicht vom 1. November bis 15. April: Bei winterlichen Verhältnissen müssen Winterreifen montiert oder Ketten aufgezogen sein. Unsere Fahrzeuge erfüllen beides. Die Strecken nach Kitzbühel sind Hauptstraßen und werden früh geräumt — der kritische Abschnitt ist eher der Pass Thurn Richtung Mittersill als die Anfahrt selbst.",
      },
      { type: "titre2", texte: "Was inklusive ist" },
      inklusive,
    ],
    faq: [
      {
        question: "Salzburg oder Innsbruck — was ist besser?",
        reponse:
          "Salzburg ist 20 Minuten näher (75 km statt 98 km). Der Unterschied ist klein genug, dass Sie nach Flugpreis und Abflugzeit entscheiden sollten.",
      },
      {
        question: "Fahren Sie auch nach Kirchberg, Reith und Aurach?",
        reponse:
          "Ja, alle Orte im Brixental und rund um Kitzbühel. Geben Sie die genaue Adresse an — die letzten Minuten unterscheiden sich spürbar.",
      },
      {
        question: "Ist die Fahrt am Hahnenkamm-Wochenende länger?",
        reponse:
          "Ja, deutlich. Rechnen Sie in der Stadt selbst bis zu vierzig Minuten für die letzten Kilometer, und buchen Sie diese Tage früh.",
      },
      {
        question: "Was kostet ein Kindersitz?",
        reponse:
          "Nichts. Sitze und Sitzerhöhungen sind im Preis enthalten und werden vor der Abfahrt eingebaut — geben Sie uns das Alter der Kinder an.",
      },
    ],
  },

  "st-anton-am-arlberg": {
    slug: "st-anton-am-arlberg",
    metaTitre: "Transfer St. Anton am Arlberg | Innsbruck, Zürich",
    metaDescription:
      "Privater Transfer nach St. Anton am Arlberg ab Innsbruck (96 km, 1 h 15) und Zürich (190 km, 2 h 50). Festpreis pro Fahrzeug, Skisäcke inklusive.",
    h1: "Transfers nach St. Anton am Arlberg",
    chapo:
      "St. Anton liegt auf 1 304 m am Fuß des Arlbergs, direkt an der Bahnstrecke und an der S16. Innsbruck ist 96 km entfernt (rund 1 h 15), Zürich 190 km (rund 2 h 50) — und Zürich ist für viele internationale Gäste die praktischere Wahl, weil der Arlberg von Westen genauso gut erreichbar ist wie von Osten. Beide Strecken zum Festpreis pro Fahrzeug.",
    contenu: [
      {
        type: "paragraphe",
        texte:
          "Der Arlberg ist ein Übergang, kein Talschluss: Von Osten kommt man aus dem Inntal, von Westen aus dem Rheintal, und beide Seiten treffen sich im Tunnel. Das macht St. Anton zu einem der am besten erreichbaren großen Skiorte Österreichs — und zu einem, bei dem die Wahl des Flughafens wirklich offen ist.",
      },
      { type: "titre2", texte: "Welcher Flughafen?" },
      {
        type: "liste",
        items: [
          "Innsbruck — 96 km, etwa 1 h 15. Inntalautobahn bis Landeck, dann die S16 den Arlberg hinauf.",
          "Zürich — 190 km, etwa 2 h 50. Über St. Gallen und das Rheintal, dann durch Vorarlberg — landschaftlich die schönere Anfahrt.",
          "Friedrichshafen und München — auf Anfrage. Friedrichshafen ist der schnellste Weg in den Arlberg, den kaum jemand kennt.",
        ],
      },
      { type: "titre2", texte: "Der Arlbergtunnel und die Passstraße" },
      {
        type: "paragraphe",
        texte:
          "Von Westen führt der Weg durch den Arlbergtunnel (mautpflichtig, im Preis enthalten) oder über die Passstraße via Stuben. Der Tunnel ist die verlässliche Variante; die Passstraße wird bei Schneefall gesperrt und ist ohnehin die längere. Wir fahren den Tunnel, außer er ist gesperrt — dann kostet der Umweg über den Pass rund vierzig Minuten, und der Preis bleibt der vereinbarte.",
      },
      { type: "titre2", texte: "St. Anton, St. Christoph, Stuben und Lech" },
      {
        type: "paragraphe",
        texte:
          "Der Arlberg ist skitechnisch ein Gebiet, verkehrstechnisch mehrere Orte. St. Christoph liegt 6 km oberhalb an der Passstraße, Stuben auf der Vorarlberger Seite, Lech und Zürs zweigen bei Alpe Rauz ab. Die letzten Kilometer unterscheiden sich also erheblich — geben Sie die genaue Adresse an, nicht nur den Ort.",
      },
      { type: "titre2", texte: "Anreise mit der Bahn" },
      {
        type: "paragraphe",
        texte:
          "St. Anton hat einen eigenen Bahnhof an der Arlbergstrecke, mit Direktzügen aus Wien, Zürich und Bregenz. Wer den Zug bis dorthin nimmt, braucht keinen Transfer mehr — wer aus Landeck oder Bludenz kommt, schon, und die Fahrt buchen Sie hier genauso.",
      },
      { type: "titre2", texte: "Was inklusive ist" },
      inklusive,
    ],
    faq: [
      {
        question: "Wie lange dauert der Transfer Zürich – St. Anton?",
        reponse:
          "Rund 2 h 50 für 190 km, ohne Verkehr. Über die Feiertage und an Samstagen im Februar rechnen Sie eine gute halbe Stunde mehr ein.",
      },
      {
        question: "Ist die Arlbergmaut im Preis enthalten?",
        reponse:
          "Ja, wie jede Maut auf der Strecke. Der genannte Preis ist der, den Sie zahlen.",
      },
      {
        question: "Fahren Sie auch nach Lech und Zürs?",
        reponse:
          "Ja. Die Abzweigung liegt bei Alpe Rauz; Lech ist von St. Anton rund 25 Minuten entfernt, mit Winterausrüstung an Bord.",
      },
      {
        question: "Was passiert, wenn der Arlbergtunnel gesperrt ist?",
        reponse:
          "Wir fahren über die Passstraße, sofern sie offen ist — rund vierzig Minuten mehr. Der Preis bleibt der vereinbarte: Eine Sperre ist unser Risiko, nicht Ihres.",
      },
    ],
  },

  obergurgl: {
    slug: "obergurgl",
    metaTitre: "Transfer Obergurgl | Innsbruck 98 km, 1 h 30",
    metaDescription:
      "Privater Transfer nach Obergurgl und Hochgurgl ab Innsbruck (98 km, 1 h 30) und Salzburg. Festpreis pro Fahrzeug, Winterausrüstung an Bord.",
    h1: "Transfers nach Obergurgl — das hintere Ötztal",
    chapo:
      "Obergurgl liegt auf 1 930 m am Talschluss des Ötztals und ist damit einer der höchstgelegenen Kirchdörfer Österreichs. Innsbruck ist 98 km entfernt, rund 1 h 30, Salzburg 277 km (3 h 25). Die letzten 14 km ab Sölden steigen um 560 Höhenmeter — ein echter Winteranstieg, den unsere Fahrzeuge mit Winterreifen und Ketten an Bord machen.",
    contenu: [
      {
        type: "paragraphe",
        texte:
          "Wer nach Obergurgl fährt, fährt bis ans Ende des Ötztals. Dahinter liegt nur noch das Timmelsjoch, das den ganzen Winter über gesperrt ist. Das bedeutet: eine Zufahrt, ein Weg zurück, und ein Schlussanstieg, der die Fahrt prägt.",
      },
      { type: "titre2", texte: "Welcher Flughafen?" },
      {
        type: "liste",
        items: [
          "Innsbruck — 98 km, etwa 1 h 30. Autobahn bis Ötztal-Bahnhof, dann 49 km Talstraße bis Obergurgl.",
          "Salzburg — 277 km, etwa 3 h 25. Für Anreisen aus dem Osten Österreichs oder wenn Innsbruck nicht passt.",
          "Zürich und München — auf Anfrage; beide liegen bei rund vier Stunden.",
        ],
      },
      { type: "titre2", texte: "Die 14 Kilometer ab Sölden" },
      {
        type: "paragraphe",
        texte:
          "Ab Sölden (1 368 m) steigt die Straße in Kehren auf 1 930 m, mit einem Abzweig nach Hochgurgl auf 2 150 m. Sie ist geräumt und gesalzen, aber im Winter gilt hier Kettenpflicht bei entsprechenden Verhältnissen, und bei starkem Schneefall wird der Abschnitt wegen Lawinengefahr zeitweise gesperrt. Diese Sperren sind kurz und angekündigt; unsere Fahrer verfolgen sie und stimmen die Abfahrtszeit darauf ab.",
      },
      { type: "titre2", texte: "Obergurgl oder Hochgurgl" },
      {
        type: "paragraphe",
        texte:
          "Die beiden Orte sind sechs Kilometer und zehn Minuten voneinander entfernt, und die Hotels heißen ähnlich. Geben Sie bei der Buchung an, welcher es ist — und wenn Sie in Hochgurgl wohnen, auch das Hotel: Die Zufahrten liegen auf verschiedenen Seiten der Straße, und im Schnee ist das kein Detail.",
      },
      { type: "titre2", texte: "Höhe und Saison" },
      {
        type: "paragraphe",
        texte:
          "Auf dieser Höhe ist die Saison lang — von Mitte November bis in den Mai —, und im November wie im April ist die Anfahrt oft angenehmer als im Februar: weniger Verkehr im Tal, dieselbe Straße. Wenn Ihre Daten flexibel sind, lohnt sich der Blick auf einen Wochentag.",
      },
      { type: "titre2", texte: "Was inklusive ist" },
      inklusive,
    ],
    faq: [
      {
        question: "Wie lange dauert der Transfer Innsbruck – Obergurgl?",
        reponse:
          "Rund 1 h 30 für 98 km, ohne Verkehr. An einem Samstag in der Hochsaison rechnen Sie 30 bis 60 Minuten mehr ein.",
      },
      {
        question: "Fahren Sie auch nach Hochgurgl?",
        reponse:
          "Ja, weitere sechs Kilometer und rund zehn Minuten. Geben Sie das Hotel an, damit wir die richtige Zufahrt nehmen.",
      },
      {
        question: "Brauchen Sie Schneeketten für diese Strecke?",
        reponse:
          "Unsere Fahrzeuge führen sie mit und legen sie an, wenn die Verhältnisse es verlangen. Das ist im Preis enthalten und kostet Sie nichts extra.",
      },
      {
        question: "Ist das Timmelsjoch im Winter befahrbar?",
        reponse:
          "Nein, es ist von Ende Oktober bis Ende Mai gesperrt. Die Anfahrt aus Südtirol führt im Winter über den Brenner und das Inntal.",
      },
    ],
  },

  mayrhofen: {
    slug: "mayrhofen",
    metaTitre: "Transfer Mayrhofen | Innsbruck 75 km, 1 h 10",
    metaDescription:
      "Privater Transfer nach Mayrhofen im Zillertal ab Innsbruck (75 km, 1 h 10). Festpreis pro Fahrzeug, Skisäcke und Kindersitze inklusive.",
    h1: "Transfers nach Mayrhofen — das Zillertal ab Innsbruck",
    chapo:
      "Mayrhofen liegt 75 km von Innsbruck entfernt, rund 1 h 10 Fahrt: Inntalautobahn bis Wiesing, dann 30 km flaches Zillertal. Es ist eine der kürzesten Anfahrten zu einem großen Skigebiet in den Alpen, und eine der einfachsten — der Ort liegt auf 630 m, ohne nennenswerten Schlussanstieg.",
    contenu: [
      {
        type: "paragraphe",
        texte:
          "Das Zillertal ist breit, flach und dicht besiedelt, und Mayrhofen liegt dort, wo es sich in vier Seitentäler aufteilt. Die Anfahrt ist deshalb bis zum Schluss unspektakulär — wer eine Bergstraße erwartet, findet eine Bundesstraße durch Dörfer.",
      },
      { type: "titre2", texte: "Welcher Flughafen?" },
      {
        type: "liste",
        items: [
          "Innsbruck — 75 km, etwa 1 h 10. Die naheliegende Wahl, und tagsüber die schnellste.",
          "Salzburg — rund 190 km über die Inntalautobahn; auf Anfrage gefahren.",
          "München — rund 190 km über Kufstein; für deutsche Gäste oft die kürzeste Gesamtreise.",
        ],
      },
      { type: "titre2", texte: "Der Verkehr im Zillertal" },
      {
        type: "paragraphe",
        texte:
          "Was hier Zeit kostet, ist nicht die Steigung, sondern die Menge. Das Zillertal hat sehr viele Betten und eine Straße, und am Samstagvormittag wie am späten Nachmittag steht es zwischen Fügen und Zell regelmäßig. Rechnen Sie an einem Februar-Samstag mit einer halben bis einer Stunde zusätzlich.",
      },
      {
        type: "paragraphe",
        texte:
          "Die Zillertalbahn fährt parallel zur Straße und ist bei Stau tatsächlich schneller — aber sie nimmt Ihr Gepäck nicht ab und endet nicht vor Ihrer Unterkunft. Für zwei Personen mit Handgepäck eine Option; mit Ski und Koffern nicht.",
      },
      { type: "titre2", texte: "Die Seitentäler" },
      {
        type: "paragraphe",
        texte:
          "Hinter Mayrhofen zweigen Zillergrund, Stillupgrund, Zemmgrund und das Tuxertal ab. Hintertux liegt 20 km und rund 30 Minuten weiter, auf 1 500 m, und ist der Teil der Fahrt, für den Winterausrüstung zählt. Auch dorthin fahren wir — sagen Sie es bei der Buchung, es ändert die Zeitplanung.",
      },
      { type: "titre2", texte: "Was inklusive ist" },
      inklusive,
    ],
    faq: [
      {
        question: "Wie lange dauert der Transfer Innsbruck – Mayrhofen?",
        reponse:
          "Rund 1 h 10 für 75 km, ohne Verkehr. Am Samstagvormittag in der Hochsaison rechnen Sie eine halbe bis eine Stunde mehr ein.",
      },
      {
        question: "Fahren Sie bis Hintertux und Lanersbach?",
        reponse:
          "Ja, das Tuxertal hinauf — rund 30 Minuten ab Mayrhofen. Geben Sie den Ort bei der Buchung an.",
      },
      {
        question: "Lohnt sich die Zillertalbahn statt eines Transfers?",
        reponse:
          "Bei Stau ist sie schneller, aber sie endet am Bahnhof und nicht vor Ihrer Unterkunft. Mit Ski und Koffern ist der Transfer die bequemere Rechnung.",
      },
      {
        question: "Gilt der Preis auch für acht Personen?",
        reponse:
          "Ja, er gilt pro Fahrzeug. Wir wählen die Fahrzeuggröße nach Personen und Gepäck, das Sie bei der Buchung angeben.",
      },
    ],
  },

  "zell-am-see": {
    slug: "zell-am-see",
    metaTitre: "Transfer Zell am See | Salzburg 78 km, 1 h 20",
    metaDescription:
      "Privater Transfer nach Zell am See und Kaprun ab Salzburg (78 km, 1 h 20). Festpreis pro Fahrzeug, Skisäcke und Kindersitze inklusive.",
    h1: "Transfers nach Zell am See und Kaprun",
    chapo:
      "Zell am See liegt 78 km von Salzburg entfernt, rund 1 h 20 Fahrt über die Tauernautobahn und das Saalachtal. Der Ort liegt auf 750 m am See, Kaprun 8 km weiter im Tal, und das Gletscherskigebiet am Kitzsteinhorn nochmals darüber. Festpreis pro Fahrzeug, Skisäcke und Kindersitze inklusive.",
    contenu: [
      {
        type: "paragraphe",
        texte:
          "Zell am See ist eine Stadt am See mit Skigebiet, nicht ein Skiort mit Stadtkern — was für die Anfahrt heißt: Sie fahren bis in einen Ort mit Ampeln, Einbahnen und Uferstraße. Die genaue Adresse zählt hier mehr als anderswo.",
      },
      { type: "titre2", texte: "Welcher Flughafen?" },
      {
        type: "liste",
        items: [
          "Salzburg — 78 km, etwa 1 h 20. Der nächste, und mit Abstand der praktischste.",
          "München — rund 190 km, etwa 2 h 15; oft günstigere Flüge, auf Anfrage gefahren.",
          "Innsbruck — rund 170 km über den Pass Thurn; wetterabhängiger und selten die bessere Wahl.",
        ],
      },
      { type: "titre2", texte: "Zell am See, Kaprun, Schüttdorf" },
      {
        type: "paragraphe",
        texte:
          "Die drei liegen dicht beieinander und werden im selben Atemzug genannt, sind aber verschiedene Ziele: Schüttdorf am Südufer, Kaprun 8 km talwärts Richtung Kitzsteinhorn. Zwischen einer Adresse in der Zeller Altstadt und einem Hotel in Kaprun liegen zwanzig Minuten — geben Sie die Straße an, nicht nur den Ort.",
      },
      { type: "titre2", texte: "Der Pass Thurn und die Tauern" },
      {
        type: "paragraphe",
        texte:
          "Zwei Passstraßen berühren die Region: der Pass Thurn Richtung Kitzbühel und die Großglockner Hochalpenstraße, die im Winter gesperrt ist. Für die Anfahrt aus Salzburg brauchen Sie keine davon — die Strecke bleibt im Tal, und das macht sie auch bei Schneefall verlässlich.",
      },
      { type: "titre2", texte: "Anreise mit der Bahn" },
      {
        type: "paragraphe",
        texte:
          "Zell am See liegt an der Salzburg-Tiroler-Bahn, mit Direktzügen aus Salzburg und Innsbruck, und der Bahnhof ist mitten im Ort. Wenn Sie mit dem Zug kommen und nur die letzte Etappe brauchen — nach Kaprun, auf die Schmittenhöhe, in ein Hotel am Südufer —, fahren wir auch das.",
      },
      { type: "titre2", texte: "Was inklusive ist" },
      inklusive,
    ],
    faq: [
      {
        question: "Wie lange dauert der Transfer Salzburg – Zell am See?",
        reponse:
          "Rund 1 h 20 für 78 km, ohne Verkehr. Am Samstag in der Hochsaison rechnen Sie eine halbe Stunde mehr ein.",
      },
      {
        question: "Fahren Sie auch nach Kaprun?",
        reponse:
          "Ja, weitere 8 km und rund 15 Minuten. Geben Sie die genaue Adresse an — zwischen Zeller Altstadt und Kaprun liegen zwanzig Minuten.",
      },
      {
        question: "Ist die Großglocknerstraße eine Option?",
        reponse:
          "Im Winter nicht: Sie ist von Anfang November bis Anfang Mai gesperrt. Unsere Strecken bleiben im Tal.",
      },
      {
        question: "Können Sie mehrere Fahrzeuge für eine Gruppe stellen?",
        reponse:
          "Ja, ab neun Personen koordinieren wir mehrere Fahrzeuge auf denselben Termin, damit die Gruppe zusammen ankommt.",
      },
    ],
  },

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
};
