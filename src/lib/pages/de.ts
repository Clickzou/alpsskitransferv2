import type { PageIntl } from "./intl";

/**
 * Die deutschsprachigen Conversion-Seiten.
 *
 * Périmètre allemand arrêté le 9 septembre 2026 : les cinq pages qui
 * transforment — comment on réserve, ce qu'est un transfert privé, l'aide, le
 * contact, les professionnels. Pas de traduction du catalogue : le germanophone
 * qui cherche un transfert cherche un trajet et un prix.
 *
 * Le texte n'est pas la version française traduite. Le marché n'est pas le
 * même : ici on part d'Innsbruck, de Salzbourg, de Zurich ou de Munich, la
 * réglementation hivernale est autrichienne et suisse, et le voyageur connaît
 * les Alpes mieux que le Britannique moyen. Les exemples sont donc tyroliens et
 * valaisans, pas savoyards.
 */
export const PAGES_DE: PageIntl[] = [
  {
    slug: "transfer-buchen",
    metaTitre: "Skitransfer buchen — in drei Schritten zum Festpreis",
    metaDescription:
      "Flughafentransfer in die Alpen buchen: Strecke, Fahrzeug und Preis, Kontaktdaten. Festpreis pro Fahrzeug, Skisäcke und Kindersitze inklusive.",
    h1: "So buchen Sie Ihren Transfer",
    chapo:
      "Drei Schritte, wenige Minuten, und ein fester Preis, bevor Sie sich binden. Sie nennen Strecke und Datum, wählen ein Fahrzeug nach seinem Preis — pro Fahrzeug, nicht pro Person — und hinterlassen Ihre Kontaktdaten. Wir bestätigen per E-Mail, und am Tag selbst verfolgt Ihr Fahrer Ihren Flug.",
    equivalentEn: "/book-ski-transfer-tickets/",
    contenu: [
      { type: "titre2", texte: "1. Ihre Strecke" },
      {
        type: "paragraphe",
        texte:
          "Geben Sie Abflughafen und Zielort ein: Das Feld durchsucht 34 Flughäfen und 68 Skiorte ab dem zweiten Buchstaben. Wenn Ihr Start- oder Zielpunkt nicht in der Liste steht — ein Bahnhof, ein Hotel, eine genaue Adresse — schreiben Sie ihn einfach hin. Solche Fahrten kalkulieren wir von Hand und antworten per E-Mail.",
      },
      {
        type: "paragraphe",
        texte:
          "Nennen Sie auch die Zahl der Koffer und Skisäcke. Das ist keine Formsache: Der Kofferraum entscheidet über das Fahrzeug, bevor die Sitze es tun. Ein Bus, der acht Personen befördert, befördert nicht acht Koffer und acht Paar Ski. Weil wir vorher fragen, schicken wir Ihnen kein Fahrzeug, in das Ihre Ausrüstung nicht passt.",
      },

      { type: "titre2", texte: "2. Der Preis, pro Fahrzeug" },
      {
        type: "paragraphe",
        texte:
          "Wir zeigen einen Preis pro Fahrzeug für jede Kategorie, die zu Ihrer Gruppe und Ihrem Gepäck passt. Der Betrag hängt nicht von der Personenzahl ab: zu zweit wie zu acht ist er derselbe, Maut inklusive. Und das Fahrzeug fährt los, wenn Sie landen.",
      },
      {
        type: "liste",
        items: [
          "Der Preis ist fest und wird vor der Buchung genannt — er ändert sich danach nicht.",
          "Maut, Tunnel und die Schweizer Vignette sind enthalten.",
          "Skisäcke und Snowboardtaschen reisen ohne Aufpreis mit.",
          "Kindersitze und Sitzerhöhungen werden gestellt und vor der Abfahrt eingebaut.",
          "Der Flug wird überwacht; Wartezeit bei Verspätung wird nicht berechnet.",
        ],
      },

      { type: "titre2", texte: "3. Ihre Kontaktdaten" },
      {
        type: "paragraphe",
        texte:
          "Wir brauchen Ihre Flugnummer, eine Mobilnummer für den Tag der Fahrt und die genaue Adresse im Skiort. Die Flugnummer ist die wichtigste Angabe: Über sie sieht der Fahrer die tatsächliche Landezeit und verschiebt die Abholung selbst, ohne dass Sie etwas tun müssen.",
      },
      {
        type: "paragraphe",
        texte:
          "Wenn Kinder mitfahren, geben Sie deren Alter an. Danach richten sich die Sitze, und in Österreich, Deutschland, Italien und Frankreich ist die Sicherung von Kindern im Auto gesetzlich geregelt — wir bringen das passende Modell mit.",
      },

      { type: "titre2", texte: "Wann Sie buchen sollten" },
      {
        type: "paragraphe",
        texte:
          "Am besten gleichzeitig mit dem Flug. In den Weihnachts- und Februarferien sind die Fahrzeuge vor den Betten ausgebucht, und ein Samstagvormittag im Februar ist im Tiroler Unterland wie im Wallis der engste Moment der Saison.",
      },
    ],
    faq: [
      {
        question: "Kann ich Hin- und Rückfahrt zusammen buchen?",
        reponse:
          "Ja. Setzen Sie im Formular das Häkchen für die Rückfahrt und geben Sie die Abflugzeit an — wir berechnen die Abholzeit im Skiort daraus, mit Winterreserve.",
      },
      {
        question: "Was passiert bei Verspätung oder Umleitung?",
        reponse:
          "Der Fahrer verfolgt Ihre Flugnummer und wartet. Wird Ihr Flug umgeleitet — Innsbruck trifft es häufiger als andere, meist nach München oder Salzburg — schreiben Sie uns kurz: Wir fahren von dem Flughafen ab, auf dem Sie wirklich landen.",
      },
      {
        question: "Zahle ich sofort?",
        reponse:
          "Nein. Sie erhalten den Preis schriftlich und bestätigen erst dann. Nichts wird ohne Ihre Zustimmung belastet.",
      },
      {
        question: "Und wenn mein Zielort nicht in der Liste steht?",
        reponse:
          "Schreiben Sie ihn frei hinein. Wir fahren mehr Orte an, als das Feld vorschlägt, und kalkulieren diese Fahrten von Hand.",
      },
    ],
  },

  {
    slug: "privattransfer",
    metaTitre: "Privattransfer in die Alpen | Festpreis pro Fahrzeug",
    metaDescription:
      "Privater Flughafentransfer ab Innsbruck, Salzburg, Zürich und München in die Skiorte. Festpreis pro Fahrzeug, Abfahrt bei Ihrer Landung, Ski inklusive.",
    h1: "Der Privattransfer in die Alpen",
    chapo:
      "Ein Fahrzeug nur für Ihre Gruppe, das losfährt, wenn Sie tatsächlich landen, und Sie vor Ihrer Unterkunft absetzt. Der Preis gilt pro Fahrzeug und steht vor der Buchung fest: zu acht zahlen Sie einmal. Skisäcke, Kindersitze, Maut und Flugüberwachung sind darin enthalten.",
    equivalentEn: "/private-airport-transfers-to-alps-ski-resort/",
    contenu: [
      { type: "titre2", texte: "Was „privat“ hier bedeutet" },
      {
        type: "paragraphe",
        texte:
          "Das Fahrzeug fährt nur Ihre Gruppe. Es wartet am Flughafen auf niemanden sonst, setzt unterwegs niemanden ab, und seine Route ist die kürzeste zwischen Ihrem Terminal und Ihrer Adresse. Der Unterschied ist messbar: An einem Samstag im Februar im Zillertal oder im Paznaun kostet jeder vermiedene Zwischenstopp zwanzig bis dreißig Minuten.",
      },
      {
        type: "liste",
        items: [
          "Abfahrt bei Ihrer tatsächlichen Landung — der Fahrer verfolgt die Flugnummer.",
          "Kein Zwischenstopp, kein gemeinsames Zeitfenster.",
          "Preis pro Fahrzeug, vor der Buchung genannt und danach nicht revidiert.",
          "Kindersitze und Sitzerhöhungen vor der Abfahrt eingebaut.",
          "Skisäcke und Snowboardtaschen ohne Aufpreis.",
          "Absetzen an der genauen Adresse Ihrer Unterkunft im Ort.",
        ],
      },

      { type: "titre2", texte: "Der Preis gilt pro Fahrzeug, nicht pro Person" },
      {
        type: "paragraphe",
        texte:
          "Das ist der Punkt, auf den es beim Vergleichen ankommt. Ein Preis pro Fahrzeug bewegt sich nicht mit der Personenzahl. Prüfen Sie deshalb bei zwei Angeboten zuerst die Einheit: Ein „ab 45 €“ pro Person und ein Pauschalpreis sehen auf einer Ergebnisseite ähnlich aus und ergeben nach dem Multiplizieren oft denselben Betrag.",
      },
      {
        type: "paragraphe",
        texte:
          "Prüfen Sie ebenso, was der Preis abdeckt. Bei uns sind Autobahnmaut, Tunnel und die Schweizer Vignette enthalten, Skiausrüstung reist kostenlos, und Wartezeit bei verspätetem Flug wird nicht berechnet. Genau diese drei Posten kommen anderswo bei der Ankunft dazu.",
      },

      { type: "titre2", texte: "Das Fahrzeug richtet sich nach Ihrem Gepäck" },
      {
        type: "paragraphe",
        texte:
          "Der Kofferraum entscheidet vor den Sitzen. Ein für acht Personen zugelassener Bus fasst nicht acht Koffer und acht Paar Ski. Deshalb fragen wir Koffer und Skisäcke vor der Kalkulation ab und nicht danach — und deshalb passiert Ihnen bei uns nicht, was sonst regelmäßig passiert: ein Fahrzeug, das zur Personenzahl passt und in das die Ausrüstung nicht hineingeht.",
      },

      { type: "titre2", texte: "Winterausrüstung, Länder und Regeln" },
      {
        type: "paragraphe",
        texte:
          "Unsere Fahrzeuge fahren mit Winterreifen und führen Ketten mit. In Österreich gilt die situative Winterausrüstungspflicht vom 1. November bis 15. April, in der Schweiz entscheidet der Straßenzustand statt des Datums, in Frankreich gilt in den ausgewiesenen Gemeinden Savoyens und Hochsavoyens die Pflicht vom 1. November bis 31. März. Unsere Fahrer machen diese Anstiege die ganze Saison.",
      },
      {
        type: "paragraphe",
        texte:
          "Grenzübertritte sind Routine — Österreich, die Schweiz, Italien und Frankreich liegen alle im Schengen-Raum —, führen Sie dennoch einen Ausweis mit. Die Schweizer Autobahnvignette und jede Maut auf der Strecke sind im genannten Preis enthalten.",
      },

      { type: "titre2", texte: "Gruppen, Rückfahrt und Sonderwünsche" },
      {
        type: "paragraphe",
        texte:
          "Die Rückfahrt buchen Sie zusammen mit der Hinfahrt und nennen die Abflugzeit; die Abholzeit im Ort berechnen wir daraus, Winterreserve eingerechnet. Über acht Personen koordinieren wir mehrere Fahrzeuge auf denselben Termin. Für Seminare, Schulgruppen oder eine Abholung am Bahnhof — St. Anton, Landeck, Jenbach, Visp — schreiben Sie uns: Diese Fahrten kalkulieren wir von Hand.",
      },
    ],
    faq: [
      {
        question: "Gilt der Preis pro Person oder pro Fahrzeug?",
        reponse:
          "Pro Fahrzeug. Ob zu zweit oder zu acht — der genannte Betrag ist der, den Sie zahlen, Maut inklusive.",
      },
      {
        question: "Was passiert, wenn mein Flug Verspätung hat?",
        reponse:
          "Der Fahrer verfolgt Ihre Flugnummer und verschiebt die Abholung auf die tatsächliche Landezeit. Die Wartezeit wird nicht berechnet, und Sie müssen nichts melden.",
      },
      {
        question: "Kosten Ski und Snowboard extra?",
        reponse:
          "Nein. Die Taschen reisen kostenlos mit; wir bitten Sie nur, sie bei der Buchung anzugeben, damit wir den Kofferraum richtig bemessen.",
      },
      {
        question: "Stellen Sie Kindersitze?",
        reponse:
          "Ja, Sitze und Sitzerhöhungen werden gestellt und vor der Abfahrt eingebaut, ohne Aufpreis. Geben Sie uns dafür das Alter der Kinder an.",
      },
      {
        question: "Holen Sie auch woanders als am Flughafen ab?",
        reponse:
          "Ja: Bahnhof, Hotel, genaue Adresse. Tragen Sie den Startpunkt ins Formular ein, wir kalkulieren die Fahrt.",
      },
    ],
  },

  {
    slug: "haeufige-fragen",
    metaTitre: "Häufige Fragen zum Skitransfer in die Alpen",
    metaDescription:
      "Preis, Gepäck, Kindersitze, Verspätung, Stornierung, Winterausrüstung: die Antworten auf die Fragen vor der Buchung eines Flughafentransfers.",
    h1: "Häufige Fragen",
    chapo:
      "Die Fragen, die vor jeder Buchung kommen, und die Antworten darauf — ohne Kleingedrucktes. Was nicht hier steht, beantworten wir per E-Mail, meist am selben Tag.",
    equivalentEn: "/general-questions/",
    contenu: [
      { type: "titre2", texte: "Preis und Zahlung" },
      {
        type: "paragraphe",
        texte:
          "Der Preis gilt pro Fahrzeug, wird vor der Buchung genannt und ändert sich danach nicht. Enthalten sind Autobahnmaut, Tunnel, die Schweizer Vignette, Skisäcke, Kindersitze, die Flugüberwachung und die Wartezeit bei Verspätung. Abgerechnet wird in Euro; andere Währungen sind Richtwerte.",
      },
      {
        type: "paragraphe",
        texte:
          "Solange die Online-Zahlung noch fertiggestellt wird, bestätigen wir per E-Mail: Sie erhalten den Preis schriftlich, und vor Ihrer Zustimmung wird nichts belastet.",
      },

      { type: "titre2", texte: "Gepäck und Fahrzeug" },
      {
        type: "paragraphe",
        texte:
          "Wir bemessen das Fahrzeug nach dem Gepäck, das Sie angeben, nicht nach der Sitzzahl. Ski, Snowboards und Boot-Bags reisen kostenlos mit. Ein Kinderwagen, ein Cello oder ein Hundetransportbox passen ebenfalls — sagen Sie es uns, damit wir das richtige Fahrzeug schicken.",
      },

      { type: "titre2", texte: "Am Tag der Fahrt" },
      {
        type: "paragraphe",
        texte:
          "Ihr Fahrer erwartet Sie in der Ankunftshalle mit einem Schild, hinter der Gepäckausgabe. Sie bekommen am Vortag eine Nachricht mit seinem Namen und seiner Nummer. Wird Ihr Flug umgeleitet, schreiben Sie uns: Wir fahren von dem Flughafen ab, auf dem Sie wirklich landen.",
      },

      { type: "titre2", texte: "Winter, Straße und Zeit" },
      {
        type: "paragraphe",
        texte:
          "Die angegebenen Fahrzeiten sind auf dem realen Straßennetz ohne Verkehr gemessen. An einem Samstag in der Hochsaison rechnen Sie eine gute Stunde mehr ein: Im Zillertal, im Paznaun und im Wallis wechseln an diesem Vormittag zehntausende Menschen gleichzeitig die Unterkunft.",
      },
      {
        type: "paragraphe",
        texte:
          "Wird eine Straße gesperrt, fährt der Fahrer die Ausweichroute und sagt Ihnen Bescheid. Der Preis bleibt der vereinbarte — eine Umleitung wegen Schnee ist unser Risiko, nicht Ihres.",
      },
    ],
    faq: [
      {
        question: "Bis wann kann ich stornieren?",
        reponse:
          "Bis 48 Stunden vor der Abholung kostenfrei. Danach hängt es davon ab, ob das Fahrzeug bereits disponiert ist — schreiben Sie uns, wir finden meist eine Lösung.",
      },
      {
        question: "Kann ich einen Transfer für jemand anderen buchen?",
        reponse:
          "Ja. Geben Sie im Formular die Kontaktdaten der reisenden Person an und Ihre eigene E-Mail-Adresse für die Bestätigung.",
      },
      {
        question: "Fahren Sie auch zu Orten ohne Autozufahrt?",
        reponse:
          "Ja. Nach Zermatt fahren wir bis Täsch, ins Lauterbrunnental bis zum Bahnhof, und wir stimmen die Ankunft auf eine Abfahrt ab. Wir sagen Ihnen das vor der Zahlung, nicht danach.",
      },
      {
        question: "Sprechen die Fahrer Deutsch?",
        reponse:
          "Auf den Strecken ab Innsbruck, Salzburg, Zürich und München ja. Für andere Strecken sagen Sie es uns bei der Buchung, wir teilen entsprechend ein.",
      },
      {
        question: "Bekomme ich eine Rechnung?",
        reponse:
          "Ja, per E-Mail nach der Fahrt. Für Firmen stellen wir auf Wunsch auf die Firmenadresse aus, mit UID-Nummer.",
      },
    ],
  },

  {
    slug: "kontakt",
    metaTitre: "Kontakt — Alps Ski Transfers",
    metaDescription:
      "Schreiben Sie uns für ein Angebot, eine Gruppenfahrt oder eine Frage zu einer bestehenden Buchung. Antwort meist am selben Tag.",
    h1: "Kontakt",
    chapo:
      "Für ein Angebot, eine Gruppenfahrt, eine Abholung außerhalb der Liste oder eine Frage zu einer bestehenden Buchung: Schreiben Sie uns. Wir antworten meist am selben Tag, in der Saison auch am Wochenende.",
    equivalentEn: "/contact/",
    contenu: [
      { type: "titre2", texte: "Für ein Angebot" },
      {
        type: "paragraphe",
        texte:
          "Am schnellsten geht es über das Buchungsformular: Es kalkuliert die Strecke sofort und Sie sehen den Preis pro Fahrzeug, bevor Sie irgendetwas hinterlassen. Für eine Fahrt, die dort nicht abbildbar ist — ein Bahnhof, mehrere Fahrzeuge, ein ungewöhnlicher Termin — schreiben Sie uns direkt.",
      },
      {
        type: "liste",
        items: [
          "Nennen Sie Start und Ziel, Datum und Uhrzeit.",
          "Nennen Sie die Zahl der Personen, Koffer und Skisäcke.",
          "Nennen Sie das Alter mitfahrender Kinder.",
          "Nennen Sie die Flugnummer, sobald Sie sie haben.",
        ],
      },

      { type: "titre2", texte: "Für eine bestehende Buchung" },
      {
        type: "paragraphe",
        texte:
          "Geben Sie Ihre Referenznummer aus der Bestätigungsmail an. Für eine Änderung am selben Tag — ein verpasster Anschluss, ein umgeleiteter Flug — rufen Sie besser an: Eine E-Mail erreicht den Fahrer nicht schnell genug.",
      },

      { type: "titre2", texte: "Wer wir sind" },
      {
        type: "paragraphe",
        texte:
          "Alps Ski Transfers ist eine Marke; die Fahrten führt ein in Savoyen eingetragenes Unternehmen durch, mit Lizenz für den Personenverkehr. Anschrift, Registernummern und Versicherung stehen im Impressum.",
      },
    ],
    faq: [
      {
        question: "Wie schnell antworten Sie?",
        reponse:
          "Meist innerhalb weniger Stunden, in der Saison auch am Wochenende. Bei einer Frage zu einer Fahrt am selben Tag rufen Sie besser an.",
      },
      {
        question: "In welcher Sprache kann ich schreiben?",
        reponse: "Deutsch, Englisch oder Französisch — wir antworten in Ihrer Sprache.",
      },
      {
        question: "Kann ich telefonisch buchen?",
        reponse:
          "Ja, aber wir schicken Ihnen die Bestätigung trotzdem schriftlich: Ein Preis, den Sie schwarz auf weiß haben, ist ein Preis, über den es später keine Diskussion gibt.",
      },
    ],
  },

  {
    slug: "agenturen-und-firmen",
    metaTitre: "Agenturen, Chalet-Betreiber und Firmen | Skitransfer",
    metaDescription:
      "Transfers für Reisebüros, Chalet-Betreiber, Concierge-Dienste und Firmen: mehrere Fahrzeuge, ein Ansprechpartner, Sammelrechnung.",
    h1: "Agenturen, Chalet-Betreiber und Firmen",
    chapo:
      "Wenn Sie regelmäßig Gäste in die Berge bringen, brauchen Sie kein Buchungsformular, sondern einen Ansprechpartner. Wir übernehmen Serien, koordinieren mehrere Fahrzeuge auf einen Termin und rechnen gesammelt ab.",
    equivalentEn: "/inquiry/",
    contenu: [
      { type: "titre2", texte: "Wie es abläuft" },
      {
        type: "paragraphe",
        texte:
          "Sie schicken uns die Liste der Fahrten — Datum, Flug, Personen, Ziel —, wir geben eine Preisliste je Strecke zurück und bestätigen jede Fahrt einzeln. Für Wochen mit Anreise am Samstag planen wir die Fahrzeuge vorab: Am Vormittag eines Februar-Samstags ist Improvisation im Tiroler Unterland keine Option.",
      },
      {
        type: "liste",
        items: [
          "Ein Ansprechpartner für die Saison, nicht ein Callcenter.",
          "Preisliste je Strecke, gültig für die ganze Saison.",
          "Sammelrechnung monatlich oder je Vorgang.",
          "Mehrere Fahrzeuge auf denselben Termin koordiniert.",
          "Meldung an Ihre Rezeption, sobald die Gäste abgeholt sind.",
        ],
      },

      { type: "titre2", texte: "Seminare und Gruppen" },
      {
        type: "paragraphe",
        texte:
          "Über acht Personen fahren wir mit mehreren Fahrzeugen im Konvoi, damit die Gruppe gemeinsam ankommt. Für Seminare planen wir auch die Fahrten vor Ort — Abendveranstaltung, Werkstour, Rückfahrt in Etappen. Diese Fahrten kalkulieren wir einzeln.",
      },
    ],
    faq: [
      {
        question: "Arbeiten Sie mit festen Saisonpreisen?",
        reponse:
          "Ja. Wir geben Ihnen eine Preisliste je Strecke, die die ganze Saison gilt — Sie können sie in Ihre eigenen Angebote übernehmen.",
      },
      {
        question: "Können Sie an die Agentur statt an den Endkunden fakturieren?",
        reponse: "Ja, monatlich gesammelt oder je Vorgang, wie es Ihnen passt.",
      },
      {
        question: "Übernehmen Sie Gruppen über acht Personen?",
        reponse:
          "Ja, mit mehreren koordinierten Fahrzeugen. Solche Anfragen kalkulieren wir individuell.",
      },
    ],
  },
];
