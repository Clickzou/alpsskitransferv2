import type { TraductionTrajet } from "./types";

/**
 * Deutsche Übersetzungen der Transferseiten.
 *
 * Clé : `{aéroport}|{station}`, en slugs anglais — c'est la clé qui relie les
 * versions d'un même trajet. Le périmètre suit celui des stations allemandes :
 * Innsbruck, Salzbourg et Zurich vers l'Autriche et la Suisse alémanique, plus
 * Genève pour Zermatt.
 *
 * Chaque page dit trois choses qu'un comparateur ne dit pas : l'itinéraire réel,
 * ce qui le ralentit un samedi de février, et où la voiture s'arrête vraiment.
 * Les distances viennent de `src/data/distances.ts`, mesurées sur le réseau
 * routier — aucune n'est estimée.
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

/** Les questions qui reviennent sur chaque trajet, quelles que soient les vallées. */
const faqGemeinsam = [
  {
    question: "Gilt der Preis pro Person oder pro Fahrzeug?",
    reponse:
      "Pro Fahrzeug. Zu zweit oder zu acht ist der genannte Betrag derselbe, Maut inklusive — deshalb lohnt sich der Vergleich erst, wenn Sie beide Angebote auf dieselbe Einheit bringen.",
  },
  {
    question: "Sind Skisäcke im Preis enthalten?",
    reponse:
      "Ja, ohne Aufpreis. Geben Sie sie bei der Buchung an, zusammen mit Skischuhtaschen und sperrigem Gepäck: Wir wählen das Fahrzeug danach, nicht nur nach der Sitzzahl.",
  },
  {
    question: "Was passiert, wenn mein Flug Verspätung hat?",
    reponse:
      "Der Fahrer verfolgt Ihre Flugnummer und verschiebt die Abholung auf die tatsächliche Landezeit. Die Wartezeit ist enthalten, es gibt keinen Aufpreis.",
  },
];

export const TRADUCTIONS_TRAJETS_DE: Record<string, TraductionTrajet> = {
  /* ------------------------------------------------------------- Ischgl */

  "innsbruck-airport|ischgl": {
    metaTitre: "Transfer Innsbruck – Ischgl | 100 km, 1 h 25",
    metaDescription:
      "Privater Transfer Innsbruck – Ischgl: 100 km, rund 1 h 25. Festpreis pro Fahrzeug, Skisäcke und Kindersitze inklusive, Flug überwacht.",
    h1: "Transfer Innsbruck – Ischgl",
    chapo:
      "100 km und rund 1 h 25 trennen den Flughafen Innsbruck von Ischgl: Inntalautobahn bis Landeck, dann 30 km das Paznauntal hinauf. Es ist die kürzeste Anfahrt nach Ischgl und die einzige, die ohne Pass auskommt — dafür führt sie durch das Nadelöhr bei Landeck, das am Samstag den Unterschied macht.",
    contenu: [
      { type: "titre2", texte: "Die Strecke" },
      {
        type: "paragraphe",
        texte:
          "Vom Flughafen auf die Inntalautobahn, 65 km westwärts bis Landeck, dann rechts ins Paznaun. Ab dort sind es 30 km Talstraße an der Trisanna entlang, mit Tunneln und Galerien, bis Ischgl auf 1 377 m. Kein Pass, keine Kehren — aber auch keine zweite Fahrspur.",
      },
      { type: "titre2", texte: "Der Samstag bei Landeck" },
      {
        type: "paragraphe",
        texte:
          "Ischgl wechselt am Samstag die Gäste, und Ankommende wie Abreisende teilen sich dieselbe Talstraße. Zwischen zehn und vierzehn Uhr staut es sich regelmäßig auf den ersten Kilometern ab Landeck. Rechnen Sie an einem Februar-Samstag mit einer guten Stunde zusätzlich; unter der Woche halten die 1 h 25 problemlos.",
      },
      { type: "titre2", texte: "Wenn Innsbruck umleitet" },
      {
        type: "paragraphe",
        texte:
          "Der Anflug auf Innsbruck ist wetterabhängig, und Umleitungen nach München oder Salzburg sind hier häufiger als anderswo. Schreiben Sie uns eine Zeile, wenn es Sie trifft: Wir fahren ab dem Flughafen, auf dem Sie wirklich landen, und stimmen den Preis vorher schriftlich ab.",
      },
      { type: "titre2", texte: "Was inklusive ist" },
      inklusive,
    ],
    faq: [
      {
        question: "Wie lange dauert die Fahrt Innsbruck – Ischgl?",
        reponse:
          "Rund 1 h 25 für 100 km ohne Verkehr, und bis zu 2 h 30 an einem Samstag in der Hochsaison.",
      },
      {
        question: "Fahren Sie auch nach Galtür, Kappl und See?",
        reponse:
          "Ja, dieselbe Talstraße. Galtür liegt 10 km hinter Ischgl, Kappl und See davor.",
      },
      ...faqGemeinsam,
    ],
  },

  "zurich-airport|ischgl": {
    metaTitre: "Transfer Zürich – Ischgl | 228 km, 3 h 30",
    metaDescription:
      "Privater Transfer Zürich – Ischgl: 228 km, rund 3 h 30 über das Rheintal und den Arlberg. Festpreis pro Fahrzeug, Vignette und Maut inklusive.",
    h1: "Transfer Zürich – Ischgl",
    chapo:
      "228 km und rund 3 h 30 vom Flughafen Zürich nach Ischgl: über St. Gallen ins Rheintal, durch Vorarlberg und den Arlbergtunnel nach Landeck, dann das Paznauntal hinauf. Deutlich weiter als ab Innsbruck — aber Zürich fliegt jeden Wochentag ganz Europa an, und genau das kauft man sich mit den zwei Stunden.",
    contenu: [
      { type: "titre2", texte: "Die Strecke" },
      {
        type: "paragraphe",
        texte:
          "Autobahn bis St. Margrethen, Grenze nach Österreich, dann durch Vorarlberg nach Bludenz und über den Arlbergtunnel nach Landeck. Ab dort 30 km Paznauntal. Die Schweizer Vignette und die Arlbergmaut sind im Preis enthalten.",
      },
      { type: "titre2", texte: "Der Arlberg" },
      {
        type: "paragraphe",
        texte:
          "Der Tunnel ist die verlässliche Variante und im Winter praktisch immer offen. Ist er gesperrt, führt der Weg über die Passstraße via Stuben — rund vierzig Minuten mehr, sofern sie geräumt ist. Der Preis bleibt in beiden Fällen der vereinbarte: Eine Sperre ist unser Risiko, nicht Ihres.",
      },
      { type: "titre2", texte: "Grenze und Papiere" },
      {
        type: "paragraphe",
        texte:
          "Schweiz und Österreich liegen beide im Schengen-Raum, die Grenze ist Routine — führen Sie dennoch einen Ausweis mit. Unsere Fahrzeuge sind für beide Länder versichert und ausgerüstet.",
      },
      { type: "titre2", texte: "Was inklusive ist" },
      inklusive,
    ],
    faq: [
      {
        question: "Wie lange dauert die Fahrt Zürich – Ischgl?",
        reponse:
          "Rund 3 h 30 für 228 km ohne Verkehr. An Samstagen in der Hochsaison rechnen Sie eine gute Stunde mehr ein.",
      },
      {
        question: "Sind Vignette und Arlbergmaut enthalten?",
        reponse: "Ja, wie jede Gebühr auf der Strecke. Der genannte Preis ist der, den Sie zahlen.",
      },
      ...faqGemeinsam,
    ],
  },

  "salzburg-airport|ischgl": {
    metaTitre: "Transfer Salzburg – Ischgl | 280 km, 3 h 25",
    metaDescription:
      "Privater Transfer Salzburg – Ischgl: 280 km, rund 3 h 25 über die Inntalautobahn. Festpreis pro Fahrzeug, Skisäcke und Maut inklusive.",
    h1: "Transfer Salzburg – Ischgl",
    chapo:
      "280 km und rund 3 h 25 vom Flughafen Salzburg nach Ischgl, fast durchgehend auf der Autobahn: über Kufstein ins Inntal, an Innsbruck vorbei bis Landeck, dann 30 km Paznauntal. Die Strecke ist lang, aber unkompliziert — und sie ist die richtige Wahl, wenn Sie aus dem Osten anreisen.",
    contenu: [
      { type: "titre2", texte: "Die Strecke" },
      {
        type: "paragraphe",
        texte:
          "Salzburg — Kufstein — Innsbruck — Landeck, alles auf der A12, und erst dann Talstraße. Über 200 der 280 km sind Autobahn, was diese Fahrt planbarer macht als ihre Länge vermuten lässt. Die österreichische Vignette und alle Maut sind im Preis.",
      },
      { type: "titre2", texte: "Das deutsche Eck" },
      {
        type: "paragraphe",
        texte:
          "Die schnellste Verbindung führt kurz über deutsches Gebiet, zwischen Salzburg und Kufstein. Für Sie ändert das nichts — Schengen, keine Kontrolle —, aber es erklärt, warum die Strecke auf der Karte einen Bogen macht.",
      },
      { type: "titre2", texte: "Wann es eng wird" },
      {
        type: "paragraphe",
        texte:
          "Auf der Inntalautobahn ist der Samstagvormittag der volle Moment, besonders im Bereich Kufstein und rund um Innsbruck. Und am Ende wartet wieder das Nadelöhr bei Landeck. Rechnen Sie an einem Februar-Samstag mit einer guten Stunde zusätzlich.",
      },
      { type: "titre2", texte: "Was inklusive ist" },
      inklusive,
    ],
    faq: [
      {
        question: "Wie lange dauert die Fahrt Salzburg – Ischgl?",
        reponse:
          "Rund 3 h 25 für 280 km ohne Verkehr, und bis zu 4 h 30 an einem Samstag in der Hochsaison.",
      },
      {
        question: "Wäre Innsbruck nicht sinnvoller?",
        reponse:
          "Für die Fahrzeit ja — 100 km statt 280. Salzburg lohnt sich, wenn der Flug deutlich besser passt oder Innsbruck ausgebucht ist.",
      },
      ...faqGemeinsam,
    ],
  },

  /* -------------------------------------------------------------- Sölden */

  "innsbruck-airport|solden": {
    metaTitre: "Transfer Innsbruck – Sölden | 84 km, 1 h 15",
    metaDescription:
      "Privater Transfer Innsbruck – Sölden: 84 km, rund 1 h 15 durch das Ötztal. Festpreis pro Fahrzeug, Skisäcke und Kindersitze inklusive.",
    h1: "Transfer Innsbruck – Sölden",
    chapo:
      "84 km und rund 1 h 15 vom Flughafen Innsbruck nach Sölden: 35 km Autobahn bis Ötztal-Bahnhof, dann 35 km das Tal hinauf auf 1 368 m. Es ist eine der kürzesten Anfahrten zu einem Gletscherskigebiet in den Alpen — und eine, bei der der Verkehr im Tal mehr zählt als die Steigung.",
    contenu: [
      { type: "titre2", texte: "Die Strecke" },
      {
        type: "paragraphe",
        texte:
          "Vom Flughafen westwärts auf die A12 bis zur Ausfahrt Ötztal, dann die Talstraße über Ötz, Umhausen und Längenfeld nach Sölden. Die Straße ist gut ausgebaut und wird durchgehend geräumt; eng wird sie nur in den Ortsdurchfahrten, wo Gegenverkehr mit Bussen Zeit kostet.",
      },
      { type: "titre2", texte: "Weiter nach Hochsölden, Obergurgl und Vent" },
      {
        type: "paragraphe",
        texte:
          "Hinter Sölden zweigen drei Wege ab: Hochsölden (rund 15 Minuten hinauf), Obergurgl und Hochgurgl (14 km, rund 25 Minuten) und Vent. Alle drei sind Winterstrecken mit Kettenpflicht bei entsprechenden Verhältnissen — unsere Fahrzeuge führen Ketten mit. Sagen Sie bei der Buchung, wohin es genau geht.",
      },
      { type: "titre2", texte: "Wenn Innsbruck umleitet" },
      {
        type: "paragraphe",
        texte:
          "Der Anflug auf Innsbruck führt durch ein enges Tal und wird bei Föhn oder schlechter Sicht häufiger umgeleitet als anderswo, meist nach München oder Salzburg. Schreiben Sie uns — wir fahren ab dort, wo Sie stehen, und rechnen die Differenz vorher schriftlich ab.",
      },
      { type: "titre2", texte: "Was inklusive ist" },
      inklusive,
    ],
    faq: [
      {
        question: "Wie lange dauert die Fahrt Innsbruck – Sölden?",
        reponse:
          "Rund 1 h 15 für 84 km ohne Verkehr. Am Samstagvormittag in der Hochsaison rechnen Sie 30 bis 60 Minuten mehr ein.",
      },
      {
        question: "Fahren Sie bis Hochsölden hinauf?",
        reponse:
          "Ja, rund 15 Minuten oberhalb des Orts, mit Winterausrüstung an Bord. Geben Sie das Hotel bei der Buchung an.",
      },
      ...faqGemeinsam,
    ],
  },

  "salzburg-airport|solden": {
    metaTitre: "Transfer Salzburg – Sölden | 263 km, 3 h 10",
    metaDescription:
      "Privater Transfer Salzburg – Sölden: 263 km, rund 3 h 10 über die Inntalautobahn und das Ötztal. Festpreis pro Fahrzeug, Maut inklusive.",
    h1: "Transfer Salzburg – Sölden",
    chapo:
      "263 km und rund 3 h 10 vom Flughafen Salzburg nach Sölden: Inntalautobahn bis zur Ausfahrt Ötztal, dann 35 km das Tal hinauf. Die Strecke ist zu vier Fünfteln Autobahn und dadurch planbarer, als ihre Länge vermuten lässt — die Wahl fällt hier am Flugplan, nicht an der Straße.",
    contenu: [
      { type: "titre2", texte: "Die Strecke" },
      {
        type: "paragraphe",
        texte:
          "Über Kufstein ins Inntal, an Innsbruck vorbei bis zur Ausfahrt Ötztal, dann Talstraße über Ötz und Längenfeld nach Sölden. Die österreichische Vignette und jede Maut sind im Preis enthalten.",
      },
      { type: "titre2", texte: "Wann es eng wird" },
      {
        type: "paragraphe",
        texte:
          "Der Samstagvormittag auf der A12 ist der volle Moment, besonders rund um Kufstein und Innsbruck. Dazu kommt das Ötztal selbst, das am Wechseltag zwischen zehn und vierzehn Uhr spürbar zäher wird. Rechnen Sie an einem Februar-Samstag mit einer Stunde zusätzlich.",
      },
      { type: "titre2", texte: "Weiter ins hintere Tal" },
      {
        type: "paragraphe",
        texte:
          "Von Sölden aus geht es weiter nach Hochsölden, Obergurgl, Hochgurgl und Vent. Diese letzten Kilometer sind der einzige echte Winterabschnitt der ganzen Fahrt — geben Sie das Ziel genau an, es verschiebt die Zeitplanung um bis zu dreißig Minuten.",
      },
      { type: "titre2", texte: "Was inklusive ist" },
      inklusive,
    ],
    faq: [
      {
        question: "Wie lange dauert die Fahrt Salzburg – Sölden?",
        reponse:
          "Rund 3 h 10 für 263 km ohne Verkehr, und bis zu 4 h 10 an einem Samstag in der Hochsaison.",
      },
      {
        question: "Wäre Innsbruck nicht näher?",
        reponse:
          "Ja, deutlich — 84 km statt 263. Salzburg lohnt sich, wenn der Flug besser passt oder Innsbruck nicht verfügbar ist.",
      },
      ...faqGemeinsam,
    ],
  },

  "zurich-airport|solden": {
    metaTitre: "Transfer Zürich – Sölden | 272 km, 4 h",
    metaDescription:
      "Privater Transfer Zürich – Sölden: 272 km, rund 4 h über den Arlberg und das Ötztal. Festpreis pro Fahrzeug, Vignette und Maut inklusive.",
    h1: "Transfer Zürich – Sölden",
    chapo:
      "272 km und rund 4 h vom Flughafen Zürich nach Sölden: Rheintal, Vorarlberg, Arlbergtunnel, Inntal bis Ötztal-Bahnhof, dann das Tal hinauf. Die längste der drei Anfahrten nach Sölden — und für viele internationale Gäste trotzdem die richtige, weil Zürich fliegt, wenn Innsbruck nicht fliegt.",
    contenu: [
      { type: "titre2", texte: "Die Strecke" },
      {
        type: "paragraphe",
        texte:
          "Autobahn bis St. Margrethen, durch Vorarlberg nach Bludenz, Arlbergtunnel nach Landeck, weiter im Inntal bis zur Ausfahrt Ötztal und dann 35 km Talstraße. Schweizer Vignette und Arlbergmaut sind im Preis.",
      },
      { type: "titre2", texte: "Der Arlberg" },
      {
        type: "paragraphe",
        texte:
          "Der Tunnel ist im Winter praktisch immer offen. Bei Sperre führt der Weg über die Passstraße via Stuben, rund vierzig Minuten mehr — der Preis bleibt der vereinbarte.",
      },
      { type: "titre2", texte: "Vier Stunden richtig planen" },
      {
        type: "paragraphe",
        texte:
          "Bei einer Fahrt dieser Länge zählt die Landezeit doppelt: Wer um 20 Uhr in Zürich landet, kommt nach Mitternacht in Sölden an. Wir sagen Ihnen die realistische Ankunftszeit vor der Buchung, damit Sie Ihr Hotel entsprechend informieren können — und planen bei Bedarf eine Pause ein.",
      },
      { type: "titre2", texte: "Was inklusive ist" },
      inklusive,
    ],
    faq: [
      {
        question: "Wie lange dauert die Fahrt Zürich – Sölden?",
        reponse:
          "Rund 4 h für 272 km ohne Verkehr. An Samstagen in der Hochsaison rechnen Sie eine Stunde mehr ein.",
      },
      {
        question: "Gibt es eine Pause auf der Strecke?",
        reponse:
          "Ja, wenn Sie möchten — sagen Sie es dem Fahrer. Bei vier Stunden und Kindern an Bord planen wir sie ohnehin ein.",
      },
      ...faqGemeinsam,
    ],
  },

  /* ----------------------------------------------------------- Kitzbühel */

  "salzburg-airport|kitzbuhel": {
    metaTitre: "Transfer Salzburg – Kitzbühel | 75 km, 1 h 20",
    metaDescription:
      "Privater Transfer Salzburg – Kitzbühel: 75 km, rund 1 h 20. Festpreis pro Fahrzeug, Skisäcke und Kindersitze inklusive, Flug überwacht.",
    h1: "Transfer Salzburg – Kitzbühel",
    chapo:
      "75 km und rund 1 h 20 vom Flughafen Salzburg nach Kitzbühel — die kürzeste Anfahrt in die Stadt am Hahnenkamm. Der Weg führt über das Saalachtal oder über Lofer und St. Johann, bleibt durchgehend im Tal und endet auf 762 m: kein Schlussanstieg, keine Passhöhe.",
    contenu: [
      { type: "titre2", texte: "Die Strecke" },
      {
        type: "paragraphe",
        texte:
          "Zwei Varianten führen ans Ziel: über die Tauernautobahn und das Saalachtal, oder über Lofer und St. Johann. Beide dauern etwa gleich lang; der Fahrer wählt nach Verkehrs- und Wetterlage. Beide bleiben auf Hauptstraßen, die früh geräumt werden.",
      },
      { type: "titre2", texte: "Kitzbühel, Kirchberg, Reith" },
      {
        type: "paragraphe",
        texte:
          "Die Orte rund um das Skigebiet liegen dicht beieinander, aber die letzten Minuten unterscheiden sich spürbar: Kirchberg liegt 6 km westlich, Reith dazwischen, Aurach südlich Richtung Pass Thurn. Geben Sie die Straße an, nicht nur den Ort — in der Kitzbüheler Altstadt sind viele Zufahrten eng oder gesperrt.",
      },
      { type: "titre2", texte: "Das Hahnenkamm-Wochenende" },
      {
        type: "paragraphe",
        texte:
          "Im dritten Januarwochenende ist die Stadt nicht mit einer normalen Woche vergleichbar: Sperrzonen, reservierte Flächen, und für die letzten zwei Kilometer bis zu vierzig Minuten. Buchen Sie diese Tage früh und geben Sie die exakte Adresse an — wir planen den Zugang von der richtigen Seite.",
      },
      { type: "titre2", texte: "Was inklusive ist" },
      inklusive,
    ],
    faq: [
      {
        question: "Wie lange dauert die Fahrt Salzburg – Kitzbühel?",
        reponse:
          "Rund 1 h 20 für 75 km ohne Verkehr. Am Hahnenkamm-Wochenende und an Samstagen in der Hochsaison deutlich mehr.",
      },
      {
        question: "Fahren Sie auch nach Kirchberg und ins Brixental?",
        reponse: "Ja, es ist dieselbe Strecke mit anderem Schluss — geben Sie die Adresse an.",
      },
      ...faqGemeinsam,
    ],
  },

  "innsbruck-airport|kitzbuhel": {
    metaTitre: "Transfer Innsbruck – Kitzbühel | 98 km, 1 h 30",
    metaDescription:
      "Privater Transfer Innsbruck – Kitzbühel: 98 km, rund 1 h 30 über die Inntalautobahn. Festpreis pro Fahrzeug, Skisäcke inklusive.",
    h1: "Transfer Innsbruck – Kitzbühel",
    chapo:
      "98 km und rund 1 h 30 vom Flughafen Innsbruck nach Kitzbühel: Inntalautobahn bis Wörgl, dann durch das Brixental oder über St. Johann. Zwanzig Minuten mehr als ab Salzburg — ein Unterschied, der kleiner ist als der zwischen zwei Flugtarifen.",
    contenu: [
      { type: "titre2", texte: "Die Strecke" },
      {
        type: "paragraphe",
        texte:
          "Vom Flughafen ostwärts auf die A12 bis Wörgl, dann entweder durch das Brixental über Hopfgarten, Westendorf und Kirchberg, oder nördlich über St. Johann. Die Brixental-Variante ist landschaftlich die schönere und führt an mehreren Orten des Skigebiets vorbei — praktisch, wenn Sie dort und nicht in Kitzbühel selbst wohnen.",
      },
      { type: "titre2", texte: "Wann es eng wird" },
      {
        type: "paragraphe",
        texte:
          "Auf der A12 ist der Samstagvormittag der volle Moment, im Brixental der späte Nachmittag, wenn die Skibusse fahren. Rechnen Sie an einem Februar-Samstag mit einer halben bis einer Stunde zusätzlich.",
      },
      { type: "titre2", texte: "Wenn Innsbruck umleitet" },
      {
        type: "paragraphe",
        texte:
          "Wird Ihr Flug nach München oder Salzburg umgeleitet, schreiben Sie uns: Ab Salzburg ist Kitzbühel sogar näher, und wir fahren ohne Neubuchung von dort.",
      },
      { type: "titre2", texte: "Was inklusive ist" },
      inklusive,
    ],
    faq: [
      {
        question: "Wie lange dauert die Fahrt Innsbruck – Kitzbühel?",
        reponse:
          "Rund 1 h 30 für 98 km ohne Verkehr. Am Samstag in der Hochsaison rechnen Sie eine halbe bis eine Stunde mehr ein.",
      },
      {
        question: "Innsbruck oder Salzburg?",
        reponse:
          "Salzburg ist 20 Minuten näher. Der Unterschied ist klein genug, dass Sie nach Flugpreis und Abflugzeit entscheiden sollten.",
      },
      ...faqGemeinsam,
    ],
  },

  /* ------------------------------------------------------------ Obergurgl */

  "innsbruck-airport|obergurgl": {
    metaTitre: "Transfer Innsbruck – Obergurgl | 98 km, 1 h 30",
    metaDescription:
      "Privater Transfer Innsbruck – Obergurgl und Hochgurgl: 98 km, rund 1 h 30. Festpreis pro Fahrzeug, Winterausrüstung an Bord.",
    h1: "Transfer Innsbruck – Obergurgl",
    chapo:
      "98 km und rund 1 h 30 vom Flughafen Innsbruck nach Obergurgl: Autobahn bis Ötztal-Bahnhof, dann 49 km das Tal hinauf bis auf 1 930 m. Die letzten 14 km ab Sölden steigen um 560 Höhenmeter in Kehren — der einzige echte Winterabschnitt, und der, für den unsere Fahrzeuge Ketten mitführen.",
    contenu: [
      { type: "titre2", texte: "Die Strecke" },
      {
        type: "paragraphe",
        texte:
          "A12 bis zur Ausfahrt Ötztal, dann Talstraße über Ötz, Längenfeld und Sölden. Hinter Sölden beginnt der Anstieg nach Zwieselstein, Untergurgl und Obergurgl, mit Abzweig nach Hochgurgl auf 2 150 m.",
      },
      { type: "titre2", texte: "Die letzten 14 Kilometer" },
      {
        type: "paragraphe",
        texte:
          "Dieser Abschnitt wird geräumt und gesalzen, unterliegt aber bei entsprechenden Verhältnissen der Kettenpflicht und wird bei starkem Schneefall zeitweise wegen Lawinengefahr gesperrt. Die Sperren sind kurz und angekündigt; unsere Fahrer verfolgen die Meldungen und stimmen die Abfahrt darauf ab, statt Sie auf halber Strecke warten zu lassen.",
      },
      { type: "titre2", texte: "Obergurgl oder Hochgurgl" },
      {
        type: "paragraphe",
        texte:
          "Zwischen beiden liegen sechs Kilometer und zehn Minuten, und die Hotelnamen ähneln sich. Nennen Sie bei der Buchung den Ort und das Hotel — die Zufahrten liegen auf verschiedenen Seiten der Straße.",
      },
      { type: "titre2", texte: "Was inklusive ist" },
      inklusive,
    ],
    faq: [
      {
        question: "Wie lange dauert die Fahrt Innsbruck – Obergurgl?",
        reponse:
          "Rund 1 h 30 für 98 km ohne Verkehr, und bis zu 2 h 30 an einem Samstag in der Hochsaison.",
      },
      {
        question: "Brauchen Sie Ketten für den Schlussanstieg?",
        reponse:
          "Unsere Fahrzeuge führen sie mit und legen sie an, wenn die Verhältnisse es verlangen — im Preis enthalten.",
      },
      ...faqGemeinsam,
    ],
  },

  "salzburg-airport|obergurgl": {
    metaTitre: "Transfer Salzburg – Obergurgl | 277 km, 3 h 25",
    metaDescription:
      "Privater Transfer Salzburg – Obergurgl: 277 km, rund 3 h 25 über die Inntalautobahn und das Ötztal. Festpreis pro Fahrzeug, Maut inklusive.",
    h1: "Transfer Salzburg – Obergurgl",
    chapo:
      "277 km und rund 3 h 25 vom Flughafen Salzburg nach Obergurgl: Inntalautobahn bis zur Ausfahrt Ötztal, dann 49 km bis ans Ende des Tals auf 1 930 m. Vier Fünftel der Strecke sind Autobahn — der Rest ist das, was die Fahrt ausmacht.",
    contenu: [
      { type: "titre2", texte: "Die Strecke" },
      {
        type: "paragraphe",
        texte:
          "Über Kufstein ins Inntal, an Innsbruck vorbei bis Ötztal-Bahnhof, dann Talstraße über Sölden nach Obergurgl. Vignette und Maut sind im Preis enthalten.",
      },
      { type: "titre2", texte: "Der Schlussanstieg" },
      {
        type: "paragraphe",
        texte:
          "Ab Sölden steigt die Straße in 14 km um 560 Höhenmeter. Bei entsprechenden Verhältnissen gilt Kettenpflicht, bei starkem Schneefall wird der Abschnitt kurzzeitig wegen Lawinengefahr gesperrt. Wir verfolgen die Meldungen und planen die Abfahrt danach.",
      },
      { type: "titre2", texte: "Dreieinhalb Stunden planen" },
      {
        type: "paragraphe",
        texte:
          "Wer am Abend in Salzburg landet, kommt spät in Obergurgl an. Wir nennen Ihnen die realistische Ankunftszeit vor der Buchung, damit Sie Ihr Hotel informieren können — auf 1 930 m ist eine späte Anreise kein Problem, eine unangekündigte schon.",
      },
      { type: "titre2", texte: "Was inklusive ist" },
      inklusive,
    ],
    faq: [
      {
        question: "Wie lange dauert die Fahrt Salzburg – Obergurgl?",
        reponse:
          "Rund 3 h 25 für 277 km ohne Verkehr, und über vier Stunden an einem Samstag in der Hochsaison.",
      },
      {
        question: "Fahren Sie auch nach Hochgurgl?",
        reponse: "Ja, sechs Kilometer und rund zehn Minuten weiter. Geben Sie das Hotel an.",
      },
      ...faqGemeinsam,
    ],
  },

  /* ----------------------------------------------------------- Mayrhofen */

  "innsbruck-airport|mayrhofen": {
    metaTitre: "Transfer Innsbruck – Mayrhofen | 75 km, 1 h 10",
    metaDescription:
      "Privater Transfer Innsbruck – Mayrhofen im Zillertal: 75 km, rund 1 h 10. Festpreis pro Fahrzeug, Skisäcke und Kindersitze inklusive.",
    h1: "Transfer Innsbruck – Mayrhofen",
    chapo:
      "75 km und rund 1 h 10 vom Flughafen Innsbruck nach Mayrhofen: Inntalautobahn bis Wiesing, dann 30 km flaches Zillertal. Eine der kürzesten und einfachsten Anfahrten zu einem großen Skigebiet — was hier Zeit kostet, ist nicht die Steigung, sondern der Verkehr.",
    contenu: [
      { type: "titre2", texte: "Die Strecke" },
      {
        type: "paragraphe",
        texte:
          "Vom Flughafen ostwärts auf die A12 bis zur Ausfahrt Zillertal, dann die Bundesstraße durch Fügen, Zell am Ziller und Ramsau nach Mayrhofen auf 630 m. Kein Pass, kein Anstieg, keine Kettenpflicht auf der Hauptstrecke.",
      },
      { type: "titre2", texte: "Der Samstag im Zillertal" },
      {
        type: "paragraphe",
        texte:
          "Das Tal hat sehr viele Betten und eine Straße. Am Samstagvormittag und am späten Nachmittag steht es zwischen Fügen und Zell regelmäßig. Rechnen Sie an einem Februar-Samstag mit einer halben bis einer Stunde zusätzlich — unter der Woche halten die 1 h 10 problemlos.",
      },
      { type: "titre2", texte: "Weiter ins Tuxertal" },
      {
        type: "paragraphe",
        texte:
          "Hinter Mayrhofen führt die Straße nach Finkenberg, Lanersbach und Hintertux auf 1 500 m — rund 30 Minuten und der einzige Winterabschnitt der Fahrt. Sagen Sie bei der Buchung, wohin es geht: Es ändert die Zeitplanung spürbar.",
      },
      { type: "titre2", texte: "Was inklusive ist" },
      inklusive,
    ],
    faq: [
      {
        question: "Wie lange dauert die Fahrt Innsbruck – Mayrhofen?",
        reponse:
          "Rund 1 h 10 für 75 km ohne Verkehr. Am Samstagvormittag in der Hochsaison rechnen Sie eine halbe bis eine Stunde mehr ein.",
      },
      {
        question: "Fahren Sie bis Hintertux weiter?",
        reponse:
          "Ja, rund 30 Minuten ab Mayrhofen, mit Winterausrüstung an Bord. Geben Sie den Ort bei der Buchung an.",
      },
      ...faqGemeinsam,
    ],
  },

  /* --------------------------------------------------------- Zell am See */

  "salzburg-airport|zell-am-see": {
    metaTitre: "Transfer Salzburg – Zell am See | 78 km, 1 h 20",
    metaDescription:
      "Privater Transfer Salzburg – Zell am See und Kaprun: 78 km, rund 1 h 20. Festpreis pro Fahrzeug, Skisäcke und Kindersitze inklusive.",
    h1: "Transfer Salzburg – Zell am See",
    chapo:
      "78 km und rund 1 h 20 vom Flughafen Salzburg nach Zell am See: Tauernautobahn und Saalachtal, durchgehend im Tal, ohne Pass. Kaprun liegt 8 km weiter, das Kitzsteinhorn nochmals darüber. Festpreis pro Fahrzeug, Maut und Kindersitze inklusive.",
    contenu: [
      { type: "titre2", texte: "Die Strecke" },
      {
        type: "paragraphe",
        texte:
          "Vom Flughafen auf die Tauernautobahn Richtung Süden, Ausfahrt Richtung Saalfelden, dann das Saalachtal hinauf nach Zell am See auf 750 m. Die Strecke bleibt auf Hauptstraßen, die früh geräumt werden — sie ist auch bei Schneefall verlässlich.",
      },
      { type: "titre2", texte: "Zell, Schüttdorf, Kaprun" },
      {
        type: "paragraphe",
        texte:
          "Die drei liegen dicht beieinander, sind aber verschiedene Ziele: Schüttdorf am Südufer des Sees, Kaprun 8 km talwärts. Zwischen der Zeller Altstadt und einem Hotel in Kaprun liegen zwanzig Minuten. Nennen Sie die Straße, nicht nur den Ort — die Zeller Uferstraße ist einbahnig und in Teilen gesperrt.",
      },
      { type: "titre2", texte: "Was im Winter nicht geht" },
      {
        type: "paragraphe",
        texte:
          "Die Großglockner Hochalpenstraße ist von Anfang November bis Anfang Mai gesperrt; wer aus Kärnten anreist, fährt durch den Tauerntunnel. Für die Anfahrt aus Salzburg spielt das keine Rolle — unsere Strecke braucht keinen Pass.",
      },
      { type: "titre2", texte: "Was inklusive ist" },
      inklusive,
    ],
    faq: [
      {
        question: "Wie lange dauert die Fahrt Salzburg – Zell am See?",
        reponse:
          "Rund 1 h 20 für 78 km ohne Verkehr. Am Samstag in der Hochsaison rechnen Sie eine halbe Stunde mehr ein.",
      },
      {
        question: "Fahren Sie auch nach Kaprun?",
        reponse:
          "Ja, weitere 8 km und rund 15 Minuten. Geben Sie die genaue Adresse an, die Orte liegen weiter auseinander als die Karte vermuten lässt.",
      },
      ...faqGemeinsam,
    ],
  },

  /* ------------------------------------------------------------- Zermatt */

  "zurich-airport|zermatt": {
    metaTitre: "Transfer Zürich – Zermatt | 251 km bis Täsch",
    metaDescription:
      "Privater Transfer Zürich – Täsch, mit Shuttlezug nach Zermatt: 251 km, rund 4 h 15. Festpreis pro Fahrzeug, Vignette und Maut inklusive.",
    h1: "Transfer Zürich – Zermatt",
    chapo:
      "251 km und rund 4 h 15 vom Flughafen Zürich bis Täsch, wo die Straße endet: Zermatt ist autofrei, und die letzten 5 km fährt der Shuttlezug in zwölf Minuten. Wir sagen das vor der Buchung, nicht bei der Ankunft, und stimmen Ihre Ankunft in Täsch auf eine Abfahrt ab.",
    contenu: [
      { type: "titre2", texte: "Die Strecke" },
      {
        type: "paragraphe",
        texte:
          "Autobahn über Bern ins Wallis, das Rhonetal hinauf bis Visp, dann 30 km das Mattertal hinauf nach Täsch. Der Abschnitt ab Visp führt durch ein enges Tal mit Galerien und Lawinenverbauungen; er wird durchgehend geräumt.",
      },
      { type: "titre2", texte: "Die letzte Etappe" },
      {
        type: "paragraphe",
        texte:
          "Der Shuttlezug Täsch — Zermatt fährt tagsüber alle zwanzig Minuten und braucht zwölf Minuten. Am Bahnhof Täsch gibt es Gepäckwagen und Träger, in Zermatt holen die Hotels ihre Gäste mit Elektrofahrzeugen ab, wenn Sie es ankündigen. Wir planen die Ankunft so, dass Sie nicht mit Skisäcken auf dem Bahnsteig stehen — und verschieben sie mit, wenn Ihr Flug später landet.",
      },
      { type: "titre2", texte: "Wenn das Mattertal gesperrt ist" },
      {
        type: "paragraphe",
        texte:
          "Bei extremem Schneefall wird die Straße ab Visp gesperrt. Dann bringen wir Sie nach Visp, wo die Matterhorn-Gotthard-Bahn abfährt, und der Preis bleibt der vereinbarte. Eine Sperre ist unser Risiko.",
      },
      { type: "titre2", texte: "Was inklusive ist" },
      inklusive,
    ],
    faq: [
      {
        question: "Fahren Sie bis nach Zermatt hinein?",
        reponse:
          "Nein — Zermatt ist autofrei. Wir fahren bis zum Bahnhofsparkplatz Täsch, die letzten 5 km fährt der Shuttlezug in zwölf Minuten.",
      },
      {
        question: "Wie lange dauert die Fahrt Zürich – Täsch?",
        reponse:
          "Rund 4 h 15 für 251 km ohne Verkehr, plus zwölf Minuten Shuttlezug und die Wartezeit auf die nächste Abfahrt.",
      },
      {
        question: "Wäre Genf nicht näher?",
        reponse:
          "Ja, rund eine Stunde: 237 km und etwa 3 h 10. Zürich lohnt sich, wenn der Flug deutlich besser passt.",
      },
      ...faqGemeinsam,
    ],
  },

  "geneva-airport|zermatt": {
    metaTitre: "Transfer Genf – Zermatt | 237 km bis Täsch, 3 h 10",
    metaDescription:
      "Privater Transfer Genf – Täsch, mit Shuttlezug nach Zermatt: 237 km, rund 3 h 10. Festpreis pro Fahrzeug, Vignette und Maut inklusive.",
    h1: "Transfer Genf – Zermatt",
    chapo:
      "237 km und rund 3 h 10 vom Flughafen Genf bis Täsch — die schnellste Anfahrt nach Zermatt, entlang des Genfersees und durch das Rhonetal. Zermatt selbst ist autofrei: Die Straße endet in Täsch, und der Shuttlezug fährt die letzten 5 km in zwölf Minuten.",
    contenu: [
      { type: "titre2", texte: "Die Strecke" },
      {
        type: "paragraphe",
        texte:
          "Autobahn am Nordufer des Genfersees über Lausanne nach Martigny, dann das Rhonetal hinauf bis Visp und 30 km das Mattertal nach Täsch. Fast durchgehend Autobahn bis Visp — das erklärt, warum diese Fahrt trotz der Distanz kürzer ist als die aus Zürich.",
      },
      { type: "titre2", texte: "Die letzte Etappe" },
      {
        type: "paragraphe",
        texte:
          "Der Shuttlezug fährt tagsüber alle zwanzig Minuten und braucht zwölf Minuten. Wir planen die Ankunft in Täsch auf eine Abfahrt ab und verschieben sie mit, wenn Ihr Flug Verspätung hat. Gepäckwagen und Träger gibt es am Bahnhof; die Hotels in Zermatt holen ihre Gäste mit Elektrofahrzeugen ab, wenn Sie es ankündigen.",
      },
      { type: "titre2", texte: "Grenze und Vignette" },
      {
        type: "paragraphe",
        texte:
          "Die Strecke bleibt vollständig in der Schweiz. Die Autobahnvignette ist im Preis enthalten, wie jede Maut. In der Schweiz gibt es keine datumsgebundene Winterreifenpflicht, sondern eine Verantwortung für den Fahrzeugzustand — unsere Fahrzeuge fahren mit Winterreifen und führen Ketten mit.",
      },
      { type: "titre2", texte: "Was inklusive ist" },
      inklusive,
    ],
    faq: [
      {
        question: "Wie lange dauert die Fahrt Genf – Täsch?",
        reponse:
          "Rund 3 h 10 für 237 km ohne Verkehr, plus zwölf Minuten Shuttlezug bis Zermatt.",
      },
      {
        question: "Warum fahren Sie nicht bis Zermatt?",
        reponse:
          "Weil dort keine Autos fahren dürfen. Der Ort ist autofrei, die Straße endet in Täsch — wir sagen es vor der Buchung, damit Sie nicht am Parkplatz überrascht werden.",
      },
      ...faqGemeinsam,
    ],
  },

  /* --------------------------------------------------------------- Davos */

  "zurich-airport|davos": {
    metaTitre: "Transfer Zürich – Davos | 166 km, 2 h 35",
    metaDescription:
      "Privater Transfer Zürich – Davos und Klosters: 166 km, rund 2 h 35. Festpreis pro Fahrzeug, Vignette und Maut inklusive, Flug überwacht.",
    h1: "Transfer Zürich – Davos",
    chapo:
      "166 km und rund 2 h 35 vom Flughafen Zürich nach Davos: Autobahn bis Landquart, dann das Prättigau hinauf über Klosters und den Wolfgangpass auf 1 560 m. Klosters liegt auf halbem Weg und ist ein eigenes Ziel — 15 Minuten vor Davos, am selben Skigebiet.",
    contenu: [
      { type: "titre2", texte: "Die Strecke" },
      {
        type: "paragraphe",
        texte:
          "Autobahn über Zürich und Chur bis Landquart, dann die Prättigauer Straße nach Klosters (1 190 m) und über den Wolfgangpass (1 631 m) nach Davos. Der Pass ist der Grund, warum die letzten dreißig Kilometer länger dauern, als die Karte vermuten lässt.",
      },
      { type: "titre2", texte: "Davos Platz oder Davos Dorf" },
      {
        type: "paragraphe",
        texte:
          "Davos zieht sich über mehrere Kilometer, und zwischen den beiden Ortsteilen liegen rund zehn Minuten. Nennen Sie bei der Buchung den Ortsteil und die Straße: Für die Fahrt macht es wenig aus, für den Treffpunkt alles.",
      },
      { type: "titre2", texte: "Die WEF-Woche" },
      {
        type: "paragraphe",
        texte:
          "Mitte bis Ende Januar gelten während des Weltwirtschaftsforums Zufahrtsbeschränkungen, Kontrollen und Sperrzonen. Fahrten sind möglich, brauchen aber Vorlauf und die exakte Adresse. Buchen Sie diese Woche früh und sagen Sie es uns.",
      },
      { type: "titre2", texte: "Was inklusive ist" },
      inklusive,
    ],
    faq: [
      {
        question: "Wie lange dauert die Fahrt Zürich – Davos?",
        reponse:
          "Rund 2 h 35 für 166 km ohne Verkehr. An Samstagen in der Hochsaison und in der WEF-Woche rechnen Sie mehr ein.",
      },
      {
        question: "Fahren Sie auch nach Klosters?",
        reponse:
          "Ja, es liegt auf derselben Strecke, rund 15 Minuten vor Davos.",
      },
      ...faqGemeinsam,
    ],
  },

  /* ----------------------------------------------------------- St. Moritz */

  "zurich-airport|st-moritz": {
    metaTitre: "Transfer Zürich – St. Moritz | 221 km, 3 h 20",
    metaDescription:
      "Privater Transfer Zürich – St. Moritz über den Julierpass: 221 km, rund 3 h 20. Festpreis pro Fahrzeug, Vignette und Autoverlad inklusive.",
    h1: "Transfer Zürich – St. Moritz",
    chapo:
      "221 km und rund 3 h 20 vom Flughafen Zürich nach St. Moritz: Autobahn bis Chur, dann über den Julierpass (2 284 m) und Silvaplana ins Oberengadin. Es gibt keine Autobahn ins Engadin — welcher Weg offen ist, entscheidet das Wetter, und wir planen beide ein.",
    contenu: [
      { type: "titre2", texte: "Die Strecke" },
      {
        type: "paragraphe",
        texte:
          "Autobahn bis Chur, dann durch das Oberhalbstein über Tiefencastel und Bivio auf den Julierpass, hinunter nach Silvaplana und die flache Talstraße nach St. Moritz auf 1 800 m.",
      },
      { type: "titre2", texte: "Julierpass oder Vereinatunnel" },
      {
        type: "paragraphe",
        texte:
          "Der Julier wird das ganze Jahr offen gehalten und nur bei starkem Schneefall kurzzeitig gesperrt. Passiert das, nehmen wir den Autoverlad durch den Vereinatunnel: Das Fahrzeug fährt auf dem Zug, es kostet Zeit, aber keinen Aufpreis — die Sperre ist unser Risiko, nicht Ihres.",
      },
      { type: "titre2", texte: "Das Oberengadin" },
      {
        type: "paragraphe",
        texte:
          "Celerina, Pontresina, Silvaplana, Sils und Samedan liegen alle innerhalb von zwanzig Minuten auf der flachen Talstraße. Geben Sie trotzdem die genaue Adresse an: Die Ortsdurchfahrten sind eng und die Hotelzufahrten liegen selten an der Hauptstraße.",
      },
      { type: "titre2", texte: "Was inklusive ist" },
      inklusive,
    ],
    faq: [
      {
        question: "Wie lange dauert die Fahrt Zürich – St. Moritz?",
        reponse:
          "Rund 3 h 20 für 221 km ohne Verkehr. Bei Schneefall am Julier rechnen Sie eine gute halbe Stunde mehr ein.",
      },
      {
        question: "Sind Vignette und Autoverlad im Preis?",
        reponse:
          "Ja, wie jede Gebühr auf der Strecke — auch dann, wenn wir wegen einer Passsperre den Vereinatunnel nehmen müssen.",
      },
      ...faqGemeinsam,
    ],
  },

  /* --------------------------------------------------- St. Anton am Arlberg */

  "innsbruck-airport|st-anton-am-arlberg": {
    metaTitre: "Transfer Innsbruck – St. Anton | 96 km, 1 h 15",
    metaDescription:
      "Privater Transfer Innsbruck – St. Anton am Arlberg: 96 km, rund 1 h 15. Festpreis pro Fahrzeug, Skisäcke und Maut inklusive.",
    h1: "Transfer Innsbruck – St. Anton am Arlberg",
    chapo:
      "96 km und rund 1 h 15 vom Flughafen Innsbruck nach St. Anton: Inntalautobahn bis Landeck, dann die S16 den Arlberg hinauf auf 1 304 m. Fast durchgehend Schnellstraße, ohne Pass und ohne Kehren — die schnellste Anfahrt an den Arlberg.",
    contenu: [
      { type: "titre2", texte: "Die Strecke" },
      {
        type: "paragraphe",
        texte:
          "Vom Flughafen westwärts auf die A12 bis Landeck, dann auf die S16 Richtung Arlberg. Die Straße steigt stetig, bleibt aber breit und gut ausgebaut bis St. Anton. Die österreichische Vignette und alle Maut sind im Preis enthalten.",
      },
      { type: "titre2", texte: "St. Anton, St. Christoph, Lech" },
      {
        type: "paragraphe",
        texte:
          "St. Christoph liegt 6 km oberhalb an der Passstraße, Lech und Zürs zweigen bei Alpe Rauz ab — rund 25 Minuten ab St. Anton. Skitechnisch ein Gebiet, verkehrstechnisch mehrere Ziele: Geben Sie die genaue Adresse an, nicht nur den Ort.",
      },
      { type: "titre2", texte: "Wenn Innsbruck umleitet" },
      {
        type: "paragraphe",
        texte:
          "Wird Ihr Flug nach München oder Salzburg umgeleitet, schreiben Sie uns eine Zeile. Wir fahren ab dem Flughafen, auf dem Sie tatsächlich landen; die Differenz stimmen wir vorher schriftlich ab.",
      },
      { type: "titre2", texte: "Was inklusive ist" },
      inklusive,
    ],
    faq: [
      {
        question: "Wie lange dauert die Fahrt Innsbruck – St. Anton?",
        reponse:
          "Rund 1 h 15 für 96 km ohne Verkehr. Am Samstag in der Hochsaison rechnen Sie eine halbe Stunde mehr ein.",
      },
      {
        question: "Fahren Sie auch nach Lech und Zürs?",
        reponse:
          "Ja, rund 25 Minuten ab St. Anton über Alpe Rauz, mit Winterausrüstung an Bord.",
      },
      ...faqGemeinsam,
    ],
  },

  "zurich-airport|st-anton-am-arlberg": {
    metaTitre: "Transfer Zürich – St. Anton | 190 km, 2 h 50",
    metaDescription:
      "Privater Transfer Zürich – St. Anton am Arlberg: 190 km, rund 2 h 50 über das Rheintal. Festpreis pro Fahrzeug, Vignette und Arlbergmaut inklusive.",
    h1: "Transfer Zürich – St. Anton am Arlberg",
    chapo:
      "190 km und rund 2 h 50 vom Flughafen Zürich nach St. Anton: über St. Gallen ins Rheintal, durch Vorarlberg nach Bludenz und über den Arlberg. Der Arlberg ist von Westen genauso gut erreichbar wie von Osten — deshalb ist Zürich hier eine echte Alternative zu Innsbruck, nicht nur ein Umweg.",
    contenu: [
      { type: "titre2", texte: "Die Strecke" },
      {
        type: "paragraphe",
        texte:
          "Autobahn bis St. Margrethen, Grenze nach Österreich, durch Vorarlberg über Feldkirch und Bludenz, dann das Klostertal hinauf und durch den Arlbergtunnel nach St. Anton. Schweizer Vignette und Arlbergmaut sind im Preis.",
      },
      { type: "titre2", texte: "Tunnel oder Pass" },
      {
        type: "paragraphe",
        texte:
          "Der Arlbergtunnel ist die verlässliche Variante. Ist er gesperrt, führt der Weg über die Passstraße via Stuben — rund vierzig Minuten mehr, sofern geräumt. Der Preis bleibt in beiden Fällen der vereinbarte.",
      },
      { type: "titre2", texte: "Lech und Zürs von der Westseite" },
      {
        type: "paragraphe",
        texte:
          "Wenn Sie nach Lech oder Zürs wollen, ist die Anfahrt von Westen sogar kürzer: Die Abzweigung liegt bei Alpe Rauz, vor dem Tunnel. Sagen Sie es bei der Buchung — es spart Ihnen den Umweg über St. Anton.",
      },
      { type: "titre2", texte: "Was inklusive ist" },
      inklusive,
    ],
    faq: [
      {
        question: "Wie lange dauert die Fahrt Zürich – St. Anton?",
        reponse:
          "Rund 2 h 50 für 190 km ohne Verkehr. Über die Feiertage und an Samstagen im Februar rechnen Sie eine gute halbe Stunde mehr ein.",
      },
      {
        question: "Zürich oder Innsbruck?",
        reponse:
          "Innsbruck ist rund 1 h 35 näher. Zürich lohnt sich für internationale Anschlüsse — und für Lech und Zürs ist der Unterschied kleiner, weil die Abzweigung auf der Westseite liegt.",
      },
      ...faqGemeinsam,
    ],
  },
};
