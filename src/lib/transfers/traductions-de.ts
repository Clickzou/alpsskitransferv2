import type { TraductionTrajet } from "./types";

/**
 * Deutsche Übersetzungen der Transferseiten.
 *
 * Clé : `{aéroport}|{station}`, en slugs anglais — c'est la clé qui relie les
 * versions d'un même trajet. Le périmètre suit celui des stations allemandes :
 * depuis la sortie de l'Autriche (10 septembre 2026), **Zurich et Genève vers
 * la Suisse**. Zurich porte sept des huit liaisons ; Genève ne sert que Zermatt,
 * qu'elle atteint plus vite que Zurich.
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




  /* -------------------------------------------------------------- Sölden */




  /* ----------------------------------------------------------- Kitzbühel */



  /* ------------------------------------------------------------ Obergurgl */



  /* ----------------------------------------------------------- Mayrhofen */


  /* --------------------------------------------------------- Zell am See */


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



  "zurich-airport|engelberg": {
    metaTitre: "Transfer Zürich → Engelberg | 107 km, rund 1 h 50",
    metaDescription:
      "Privater Transfer Flughafen Zürich → Engelberg: 107 km, rund 1 h 50, fast durchgehend Autobahn. Festpreis pro Fahrzeug, Vignette und Skisäcke inklusive.",
    h1: "Transfer Zürich → Engelberg",
    chapo:
      "107 km und rund 1 h 50 vom Flughafen Zürich nach Engelberg: Autobahn über Luzern bis Stans, dann zwanzig Kilometer das Engelbergertal hinauf. Es ist der kürzeste Transfer, den ein internationaler Flughafen in ein großes Schweizer Skigebiet bietet.",
    contenu: [
      { type: "titre2", texte: "Die Strecke" },
      {
        type: "paragraphe",
        texte:
          "A4 und A2 über Luzern bis Stans, dann die Talstraße nach Engelberg. Die Strecke bleibt tief und wird die ganze Saison geräumt — die Höhe machen erst die Bahnen ab dem Dorf. Bei Schneefall ist das einer der wenigen Zugänge in den Alpen, bei denen die Anfahrt kein Thema ist.",
      },
      { type: "titre2", texte: "Wann es länger dauert" },
      {
        type: "paragraphe",
        texte:
          "Samstagvormittag im Februar, wenn sich der Wochenwechsel und der Tagesausflugsverkehr aus Zürich und Luzern überlagern: rechnen Sie zwanzig bis dreißig Minuten mehr ein. Unter der Woche und außerhalb der Ferien fährt man die Strecke fast immer in der genannten Zeit.",
      },
      { type: "titre2", texte: "Morgens landen, mittags fahren" },
      {
        type: "paragraphe",
        texte:
          "Bei knapp zwei Stunden Anfahrt zählt der Ankunftstag noch als Skitag — was bei den meisten Orten dieser Größenordnung nicht funktioniert. Wer vor zehn Uhr landet, steht am frühen Nachmittag am Titlis. Sagen Sie uns die Flugnummer: Der Fahrer verfolgt sie, eine Verspätung verschiebt die Abholung ohne Aufpreis.",
      },
      inklusive,
    ],
    faq: [...faqGemeinsam],
  },

  "zurich-airport|grindelwald": {
    metaTitre: "Transfer Zürich → Grindelwald | 157 km, rund 2 h 40",
    metaDescription:
      "Privater Transfer Flughafen Zürich → Grindelwald: 157 km, rund 2 h 40 über Bern und Interlaken. Festpreis pro Fahrzeug, Vignette und Maut inklusive.",
    h1: "Transfer Zürich → Grindelwald",
    chapo:
      "157 km und rund 2 h 40 vom Flughafen Zürich nach Grindelwald: Autobahn über Bern bis Interlaken, dann rund zwanzig Kilometer durch das Lütschinental bis unter die Eiger-Nordwand. Das Fahrzeug bringt Sie bis vor die Unterkunft.",
    contenu: [
      { type: "titre2", texte: "Die Strecke" },
      {
        type: "paragraphe",
        texte:
          "Autobahn über Zürich, Bern und Thun bis Interlaken — gut zwei Stunden ohne Steigung —, dann die Talstraße über Zweilütschinen nach Grindelwald. Die letzten zwanzig Kilometer sind eine geräumte Hauptstraße; sie kosten dennoch eine gute halbe Stunde, weil sie eng und kurvig ist.",
      },
      { type: "titre2", texte: "Grund oder Dorf" },
      {
        type: "paragraphe",
        texte:
          "Grindelwald zieht sich über mehrere Kilometer und mehrere Höhenmeter. Zwischen Grund, wo der Eiger Express startet, und dem Dorfzentrum liegen Steigung und Gepäck. Nennen Sie bei der Buchung Straße und Hausnummer: Für die Fahrt ändert es wenig, für die Ankunft alles.",
      },
      { type: "titre2", texte: "Zürich oder Genf" },
      {
        type: "paragraphe",
        texte:
          "Ab Genf sind es 233 km und rund drei Stunden — 75 km und eine gute halbe Stunde mehr. Genf lohnt sich, wenn Ihr Flug dorthin deutlich günstiger ist oder aus Süd- und Westeuropa kommt; sonst bleibt Zürich die kürzere Wahl.",
      },
      inklusive,
    ],
    faq: [...faqGemeinsam],
  },

  "zurich-airport|interlaken": {
    metaTitre: "Transfer Zürich → Interlaken | 139 km, rund 2 h 20",
    metaDescription:
      "Privater Transfer Flughafen Zürich → Interlaken: 139 km, rund 2 h 20, durchgehend Autobahn über Bern. Festpreis pro Fahrzeug, Vignette inklusive.",
    h1: "Transfer Zürich → Interlaken",
    chapo:
      "139 km und rund 2 h 20 vom Flughafen Zürich nach Interlaken, durchgehend Autobahn über Bern und am Thuner See entlang. Tief gelegen, flach, ganzjährig geräumt: die unkomplizierteste Ankunft im Berner Oberland.",
    contenu: [
      { type: "titre2", texte: "Die Strecke" },
      {
        type: "paragraphe",
        texte:
          "A1 bis Bern, dann A6 und A8 dem Thuner See entlang bis Interlaken. Keine Passstraße, keine Steigung, 566 m Höhe am Ziel — bei Schneefall im Dezember ist das ein Argument, das man erst zu schätzen weiß, wenn man die Alternative kennt.",
      },
      { type: "titre2", texte: "Ost oder West" },
      {
        type: "paragraphe",
        texte:
          "Interlaken hat zwei Bahnhöfe, und die Unterkünfte verteilen sich über beide Seiten der Stadt sowie über Matten und Unterseen. Geben Sie die genaue Adresse an — zwischen den beiden Enden liegen zu Fuß zwanzig Minuten, mit Skisack mehr.",
      },
      { type: "titre2", texte: "Weiter in die Berge" },
      {
        type: "paragraphe",
        texte:
          "Von Interlaken fahren die Bahnen halbstündlich nach Grindelwald, Lauterbrunnen, Wengen und Mürren. Wer hier wohnt und oben fährt, braucht den Transfer nur einmal — das ist genau der Grund, warum viele Gäste diese Basis wählen.",
      },
      inklusive,
    ],
    faq: [...faqGemeinsam],
  },

  "zurich-airport|wengen": {
    metaTitre: "Transfer Zürich → Wengen | bis Lauterbrunnen, dann die Bahn",
    metaDescription:
      "Privater Transfer Flughafen Zürich → Wengen: mit dem Fahrzeug bis Lauterbrunnen, dann die Wengernalpbahn. Ankunft auf eine Abfahrt abgestimmt, Festpreis.",
    h1: "Transfer Zürich → Wengen",
    chapo:
      "Wengen hat keine Straße: Der Transfer endet am Bahnhof Lauterbrunnen — rund 149 km und zweieinhalb Stunden ab Zürich —, und die Wengernalpbahn fährt in etwa 15 Minuten hinauf, ungefähr alle halbe Stunde. Wir stimmen die Ankunft auf eine Abfahrt ab.",
    contenu: [
      { type: "titre2", texte: "Das Wichtigste zuerst" },
      {
        type: "paragraphe",
        texte:
          "Kein Fahrzeug fährt nach Wengen hinein, und das ist keine Einschränkung unseres Angebots, sondern der Grund, warum das Dorf autofrei ist. Wer Ihnen eine Fahrt „bis Wengen“ verkauft, meint dasselbe wie wir — Lauterbrunnen —, sagt es nur später.",
      },
      { type: "titre2", texte: "Die Strecke" },
      {
        type: "paragraphe",
        texte:
          "Autobahn über Bern bis Interlaken, dann zwölf Kilometer das Lauterbrunnental hinauf bis zum Bahnhof und dem Parkplatz davor. Die Talstraße ist eine geräumte Hauptstraße; die Höhe macht anschließend die Zahnradbahn, nicht der Asphalt.",
      },
      { type: "titre2", texte: "Der Anschluss" },
      {
        type: "liste",
        items: [
          "Die Wengernalpbahn fährt etwa alle 30 Minuten, Fahrzeit rund 15 Minuten.",
          "Ski und Koffer fahren mit; die meisten Hotels holen Gäste in Wengen mit Elektrokarren am Bahnhof ab.",
          "Sagen Sie uns Flugnummer und Hotel: Wir legen die Ankunft in Lauterbrunnen auf eine Abfahrt.",
          "Im Januar, am Lauberhorn-Wochenende, sind Tal und Bahnen voll — früh buchen und mehr Zeit einplanen.",
        ],
      },
      inklusive,
    ],
    faq: [...faqGemeinsam],
  },
};
