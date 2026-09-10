import { ENTREPRISE, SITE } from "@/data/site";
import type { PageIntl } from "./intl";

const { adresse, entite } = ENTREPRISE;
const adressePostale = `${adresse.rue}, ${adresse.codePostal} ${adresse.ville}, France`;
const sirenLisible = `SIREN ${entite.siren.replace(/(\d{3})(\d{3})(\d{3})/, "$1 $2 $3")}`;


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
    visuel: { nom: "popular-alps-ski-transfer", alt: "Transferfahrzeug auf einer verschneiten Bergstraße" },
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
          "Am besten gleichzeitig mit dem Flug. In den Weihnachts- und Februarferien sind die Fahrzeuge vor den Betten ausgebucht, und ein Samstagvormittag im Februar ist im Wallis wie in Graubünden der engste Moment der Saison.",
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
    visuel: { nom: "transfert-prive", alt: "Privatfahrzeug vor einem Chalet im Skiort" },
    metaTitre: "Privattransfer in die Alpen | Festpreis pro Fahrzeug",
    metaDescription:
      "Privater Flughafentransfer ab Zürich und Genf in die Schweizer Skiorte. Festpreis pro Fahrzeug, Abfahrt bei Ihrer Landung, Ski inklusive.",
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
    visuel: { nom: "faq", alt: "Skifahrerin im Abendlicht oberhalb eines Skiorts" },
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
    visuel: { nom: "route-alpine", alt: "Verschneites Alpendorf und Bergstraße in der Dämmerung" },
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
    visuel: { nom: "transfert-prive-detail", alt: "Innenraum eines Transferfahrzeugs mit Sitzen und Skifach" },
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

  {
    slug: "hilfe-unterwegs",
    visuel: { nom: "route-hiver", alt: "Winterreifen auf einer verschneiten Straße zu einem Skiort" },
    metaTitre: "Hilfe unterwegs — Fahrer finden, Flug verspätet",
    metaDescription:
      "Flug verspätet, Fahrer nicht auffindbar, neue Adresse im Skiort: wie Sie uns erreichen und was in jedem Fall passiert.",
    h1: "Hilfe während Ihrer Fahrt",
    chapo:
      "Ein Transfer läuft fast immer ohne Anruf ab. Fast: hier steht, was in den vier Fällen zu tun ist, in denen es doch passiert.",
    equivalentEn: "/help/",
    contenu: [
      { type: "titre2", texte: "Ihr Flug hat Verspätung" },
      {
        type: "paragraphe",
        texte:
          "Tun Sie nichts. Ihr Fahrer verfolgt die Flugnummer, die Sie bei der Buchung angegeben haben: die Abholung verschiebt sich von selbst, ohne Aufpreis und ohne dass Sie anrufen müssen. Genau dafür fragen wir die Flugnummer ab — und für nichts anderes.",
      },
      {
        type: "paragraphe",
        texte:
          "Wird Ihr Flug umgeleitet — in Innsbruck kommt das häufiger vor als anderswo, meist nach München oder Salzburg — rufen Sie uns an: wir fahren von dem Flughafen ab, auf dem Sie gelandet sind, ohne neue Buchung.",
      },

      { type: "titre2", texte: "Sie finden Ihren Fahrer nicht" },
      {
        type: "paragraphe",
        texte:
          "Der Treffpunkt steht in Ihrer Bestätigungs-E-Mail: in der Regel die Gepäckausgabe, Schild mit Ihrem Namen. Warten Sie fünf Minuten genau dort, bevor Sie anrufen — ein Fahrer, der gerade parkt, ist kein fehlender Fahrer.",
      },
      {
        type: "liste",
        items: [
          "Bleiben Sie am genannten Treffpunkt: dort sucht der Fahrer Sie.",
          "Halten Sie Ihr Telefon eingeschaltet, auch im Roaming.",
          "Wählen Sie die Nummer aus der Bestätigung, nicht die Zentrale: sie klingelt direkt beim Disponenten.",
        ],
      },

      { type: "titre2", texte: "Ihre Adresse im Skiort hat sich geändert" },
      {
        type: "paragraphe",
        texte:
          "Schreiben Sie uns, sobald Sie es wissen, mit Ihrer Buchungsnummer. Eine andere Adresse im selben Ort ändert den Preis nicht. Ein anderer Ort schon: dann nennen wir Ihnen den neuen Betrag, bevor wir irgendetwas ändern.",
      },

      { type: "titre2", texte: "Sie haben etwas im Fahrzeug vergessen" },
      {
        type: "paragraphe",
        texte:
          "Dafür gibt es die Seite zum verlorenen Gepäck: wir fragen den Fahrer noch am selben Tag und bewahren Fundstücke dreißig Tage auf.",
      },
    ],
    faq: [
      {
        question: "Muss ich bei Flugverspätung Bescheid geben?",
        reponse:
          "Nein. Der Flug wird überwacht, die Abholung verschiebt sich automatisch und ohne Aufpreis. Melden Sie sich nur, wenn Ihr Flug umgeleitet oder gestrichen wird.",
      },
      {
        question: "Wie lange wartet der Fahrer?",
        reponse:
          "Die Wartezeit ist im Preis enthalten: eine Stunde nach der tatsächlichen Landung bei internationalen Flügen, fünfundvierzig Minuten bei Inlandsflügen. Danach rufen wir Sie an, bevor wir entscheiden.",
      },
      {
        question: "Wie erreiche ich Sie am Tag des Transfers?",
        reponse:
          "Die Nummer steht in der Bestätigungs-E-Mail und klingelt beim diensthabenden Disponenten. Schriftlich bleibt contact@alpsskitransfers.com der Weg, der eine Spur hinterlässt.",
      },
      {
        question: "Kann ich die Abholzeit ändern?",
        reponse:
          "Ja, solange das Fahrzeug nicht losgefahren ist. Schreiben Sie uns mit Ihrer Buchungsnummer: wir bestätigen den neuen Zeitpunkt per E-Mail, und der Preis bleibt gleich, wenn die Strecke dieselbe ist.",
      },
    ],
  },
  {
    slug: "verlorenes-gepaeck",
    visuel: { nom: "aeroport-lyon-airport", alt: "Flughafenterminal, Gepäckausgabe" },
    metaTitre: "Verlorenes Gepäck, vergessener Gegenstand",
    metaDescription:
      "Gepäck von der Airline nicht geliefert oder etwas im Fahrzeug vergessen: was wir tun, in welcher Frist, und was wir nicht garantieren können.",
    h1: "Verspätetes Gepäck, vergessene Gegenstände",
    chapo:
      "Zwei verschiedene Fälle, zwei verschiedene Antworten: Gepäck, das die Airline nicht ausgeliefert hat, und ein Gegenstand, der im Fahrzeug geblieben ist.",
    equivalentEn: "/lost-luggage/",
    contenu: [
      { type: "titre2", texte: "Die Airline hat Ihr Gepäck nicht ausgeliefert" },
      {
        type: "paragraphe",
        texte:
          "Melden Sie es am Gepäckschalter, bevor Sie den Flughafen verlassen: ohne Schadensmeldung liefert die Airline nichts nach. Ihr Fahrer wartet währenddessen — das gehört zur Ankunft.",
      },
      {
        type: "paragraphe",
        texte:
          "Lassen Sie das Gepäck an Ihre Adresse im Skiort liefern, nicht an den Flughafen. Die Rückfahrt ins Tal kostet einen halben Tag, und die Airline liefert in den Skiort wie überall hin.",
      },

      { type: "titre2", texte: "Sie haben etwas im Fahrzeug vergessen" },
      {
        type: "paragraphe",
        texte:
          "Schreiben Sie uns so früh wie möglich mit Buchungsnummer und Beschreibung: wir fragen den Fahrer noch am selben Tag. In einem Fahrzeug, das seither drei Fahrten gemacht hat, findet sich nicht mehr alles — die Stunde zählt.",
      },
      {
        type: "liste",
        items: [
          "Fundstücke bewahren wir dreißig Tage auf.",
          "Die Abholung in unserem Depot ist kostenlos.",
          "Ein Versand ist möglich, auf Ihre Kosten, mit Sendungsverfolgung.",
          "Wir halten Sie per E-Mail über jeden Schritt der Suche auf dem Laufenden.",
        ],
      },
      {
        type: "paragraphe",
        texte:
          "Wir suchen ernsthaft, können ein Wiederauffinden aber nicht garantieren, und wir übernehmen keine Haftung für im Fahrzeug zurückgelassene persönliche Gegenstände. Das ist der Rahmen — besser vorher gesagt als nachher.",
      },
    ],
    faq: [
      {
        question: "Wartet der Fahrer während der Schadensmeldung?",
        reponse:
          "Ja. Die im Preis enthaltene Wartezeit deckt das ab: sagen Sie dem Fahrer kurz Bescheid, er wartet am Treffpunkt.",
      },
      {
        question: "Wie lange bewahren Sie Fundstücke auf?",
        reponse:
          "Dreißig Tage. Danach werden nicht abgeholte Gegenstände je nach Art gespendet oder entsorgt.",
      },
      {
        question: "Können Sie mir den Gegenstand in den Skiort schicken?",
        reponse:
          "Ja, mit Sendungsverfolgung und auf Ihre Kosten. Die Abholung im Depot bleibt kostenlos, wenn Sie ohnehin durchs Tal fahren.",
      },
      {
        question: "Darf jemand anderes den Gegenstand abholen?",
        reponse:
          "Ja, wenn Sie uns vorher Bescheid geben und den Namen nennen: wir geben nichts an jemanden heraus, den Sie nicht angekündigt haben.",
      },
    ],
  },

  {
    slug: "impressum",
    metaTitre: "Impressum | Alps Ski Transfers",
    metaDescription:
      "Anbieter, Hosting und rechtliche Angaben zur Website alpsskitransfers.com.",
    h1: "Impressum",
    chapo:
      "Angaben gemäß Artikel 6-III des französischen Gesetzes vom 21. Juni 2004 über das Vertrauen in die digitale Wirtschaft (LCEN).",
    equivalentEn: "/legal-notice/",
    noindex: true,
    contenu: [
      { type: "titre2", texte: "Anbieter der Website" },
      {
        type: "paragraphe",
        texte: `Diese Website wird betrieben von ${entite.nom}, handelnd unter der Bezeichnung ${entite.enseigne}, einem in Frankreich am 17. September 2020 eingetragenen Einzelunternehmen.`,
      },
      {
        type: "liste",
        items: [
          `Sitz: ${adressePostale}`,
          `Registernummer: ${sirenLisible}`,
          "Geschäftstätigkeit: Personenbeförderung mit Taxi und Mietwagen mit Fahrer (VTC)",
          `Telefon: ${ENTREPRISE.telephoneAffiche}`,
          `E-Mail: ${ENTREPRISE.email}`,
          `Eintragung im französischen Register der Mietwagenunternehmen (VTC): ${entite.evtc}`,
          `Personenbeförderungslizenz (LTI) Nr. ${entite.lti.numero}, gültig vom 27. Februar 2026 bis 26. Februar 2036, eingetragen im nationalen Register der Straßenpersonenverkehrsunternehmen für das Departement Savoyen. Verkehrsleiter: ${entite.lti.gestionnaire}.`,
          `SIRET: ${entite.siret}`,
          `USt-IdNr.: ${entite.tva}`,
        ],
      },
      {
        type: "paragraphe",
        texte: `„Alps Ski Transfers“ ist eine Geschäftsbezeichnung. Die auf dieser Website angebotenen Beförderungsleistungen werden von ${entite.nom} unter den oben genannten Angaben erbracht.`,
      },

      { type: "titre2", texte: "Verantwortlich für den Inhalt" },
      {
        type: "paragraphe",
        texte: `${entite.nom}, als Inhaber des Unternehmens.`,
      },

      { type: "titre2", texte: "Hosting" },
      {
        type: "paragraphe",
        texte:
          "Die Website wird gehostet von Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA — vercel.com.",
      },

      { type: "titre2", texte: "Urheberrecht" },
      {
        type: "paragraphe",
        texte: `Aufbau, Texte, Bilder und Gestaltung von ${SITE.url} sind urheberrechtlich geschützt. Eine vollständige oder teilweise Vervielfältigung oder Weiterverwendung, gleich auf welchem Medium, bedarf der vorherigen schriftlichen Zustimmung des Anbieters. Die Fotografien der Skiorte und Fahrzeuge bleiben Eigentum ihrer Urheber.`,
      },

      { type: "titre2", texte: "Personenbezogene Daten" },
      {
        type: "paragraphe",
        texte:
          "Über diese Website erhobene personenbezogene Daten werden nach der Datenschutz-Grundverordnung (EU 2016/679) und dem französischen Datenschutzgesetz verarbeitet. Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit und Widerspruch; wenden Sie sich dafür an die oben genannte E-Mail-Adresse. Welche Daten zu welchem Zweck erhoben werden, steht in unserer Datenschutzerklärung; die verwendeten Cookies sind in der Cookie-Richtlinie aufgeführt.",
      },
      {
        type: "paragraphe",
        texte:
          "Sind Sie der Ansicht, dass Ihre Rechte nicht gewahrt wurden, können Sie sich bei der CNIL, der französischen Datenschutzaufsicht, beschweren — cnil.fr.",
      },

      { type: "titre2", texte: "Verkaufsbedingungen" },
      {
        type: "paragraphe",
        texte:
          "Über diese Website gebuchte Transfers unterliegen unseren Beförderungs- und Allgemeinen Geschäftsbedingungen, die Preise, Stornierung, Gepäck und Haftung regeln. Diese Dokumente liegen derzeit auf Englisch vor.",
      },

      { type: "titre2", texte: "Streitbeilegung" },
      {
        type: "paragraphe",
        texte:
          "Wenden Sie sich bei Beanstandungen zunächst an die oben genannte E-Mail-Adresse. Kommt keine Einigung zustande, können Verbraucher mit Wohnsitz in der Europäischen Union eine Verbraucherschlichtungsstelle anrufen und die Online-Streitbeilegungsplattform der Europäischen Kommission nutzen. [À REMPLACER — Name, Anschrift und Website der Schlichtungsstelle, der das Unternehmen angehört.]",
      },
    ],
    faq: [],
  },
  {
    slug: "cookie-richtlinie",
    metaTitre: "Cookie-Richtlinie | Alps Ski Transfers",
    metaDescription:
      "Welche Cookies alpsskitransfers.com setzt, wozu sie dienen und wie Sie sie steuern.",
    h1: "Cookie-Richtlinie",
    chapo:
      "Diese Seite erklärt, welche Cookies alpsskitransfers.com auf Ihrem Gerät speichert, wozu sie dienen und wie Sie sie steuern können.",
    equivalentEn: "/cookie-policy-uk/",
    noindex: true,
    contenu: [
      { type: "titre2", texte: "Was ein Cookie ist" },
      {
        type: "paragraphe",
        texte:
          "Ein Cookie ist eine kleine Textdatei, die beim Besuch einer Website auf Ihrem Gerät gespeichert wird. Sie erlaubt es der Website, Ihre Eingaben und Einstellungen von Seite zu Seite und von Besuch zu Besuch zu behalten. Vergleichbare Techniken — lokaler Speicher, Zählpixel, Tags — dienen demselben Zweck und fallen unter dieselbe Richtlinie.",
      },

      { type: "titre2", texte: "Welche Cookies wir setzen" },
      {
        type: "paragraphe",
        texte:
          "So wenige wie möglich. Die Website besteht aus statischen Seiten und führt keine Werbe- oder Profiling-Skripte aus: für das bloße Lesen ist keine Einwilligung nötig.",
      },
      {
        type: "liste",
        items: [
          "Unbedingt erforderliche Cookies — sie halten Ihre Buchung über die einzelnen Schritte zusammen und sichern die Zahlungsseite. Ohne sie kann eine Buchung nicht abgeschlossen werden. Sie sind einwilligungsfrei.",
          "Gespeicherte Eingaben — brechen Sie eine Suche ab, können Ihre Eingaben im Browser bleiben, damit Sie sie nicht erneut tippen müssen. Sie verbleiben auf Ihrem Gerät und werden nie an uns übertragen.",
          "Cookies des Zahlungsdienstleisters — auf der Zahlungsseite setzt unser Dienstleister eigene Cookies zur Betrugserkennung und zur Absicherung der Transaktion. Sie sind für die Zahlung erforderlich.",
        ],
      },
      {
        type: "paragraphe",
        texte:
          "Wir verwenden derzeit keine Cookies für Reichweitenmessung, Werbung oder soziale Netzwerke. Sollte sich das ändern, wird diese Seite aktualisiert und Ihre Einwilligung eingeholt, bevor ein solches Cookie gesetzt wird — eine Einwilligung, die sich ebenso leicht verweigern wie erteilen und jederzeit widerrufen lässt.",
      },

      { type: "titre2", texte: "Wie lange sie gelten" },
      {
        type: "paragraphe",
        texte:
          "Für eine Buchung erforderliche Cookies gelten für die Sitzung oder für die Dauer der Buchung. Wird ein einwilligungspflichtiges Cookie eingeführt, beträgt seine Laufzeit höchstens dreizehn Monate; danach wird die Einwilligung erneut eingeholt, entsprechend den Empfehlungen der CNIL.",
      },

      { type: "titre2", texte: "Cookies steuern" },
      {
        type: "paragraphe",
        texte:
          "Sie können Cookies in den Einstellungen Ihres Browsers annehmen oder ablehnen und bereits gespeicherte löschen. Chrome, Safari, Firefox und Edge bieten das jeweils in den Datenschutzeinstellungen an. Beachten Sie: Werden unbedingt erforderliche Cookies blockiert, lässt sich eine Buchung nicht abschließen.",
      },

      { type: "titre2", texte: "Ihre Rechte" },
      {
        type: "paragraphe",
        texte: `Cookies, die Informationen auf Ihrem Gerät lesen oder schreiben, unterliegen der Datenschutz-Grundverordnung und Artikel 82 des französischen Datenschutzgesetzes. Ihre Rechte auf Auskunft, Berichtigung, Löschung und Widerspruch können Sie unter ${ENTREPRISE.email} ausüben; eine Beschwerde ist bei der CNIL, der französischen Aufsichtsbehörde, unter cnil.fr möglich.`,
      },
      {
        type: "paragraphe",
        texte:
          "Alles Weitere zum Umgang mit Ihren Daten — Buchungen, Zahlungen, Fahrerzuteilung — steht in unserer Datenschutzerklärung.",
      },

      { type: "titre2", texte: "Änderungen" },
      {
        type: "paragraphe",
        texte:
          "Diese Richtlinie wird aktualisiert, sobald sich die von der Website gesetzten Cookies ändern. [À REMPLACER — Datum der Veröffentlichung und jeder Überarbeitung.]",
      },
    ],
    faq: [],
  },
];
