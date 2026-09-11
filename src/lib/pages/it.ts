import { ENTREPRISE, SITE } from "@/data/site";
import type { PageIntl } from "./intl";

const { adresse, entite } = ENTREPRISE;
const adressePostale = `${adresse.rue}, ${adresse.codePostal} ${adresse.ville}, France`;
const sirenLisible = `SIREN ${entite.siren.replace(/(\d{3})(\d{3})(\d{3})/, "$1 $2 $3")}`;


/**
 * Le pagine di conversione in italiano.
 *
 * Périmètre italien arrêté le 9 septembre 2026 : les cinq mêmes pages qu'en
 * allemand — réserver, transfert privé, aide, contact, professionnels. Pas de
 * traduction du catalogue.
 *
 * Le marché italien arrive par Turin, Milan Malpensa et Bergame, et il pense en
 * tunnels et en péages : Mont-Blanc, Fréjus, vignette suisse. Les exemples sont
 * valdôtains et piémontais, et le tutoiement est l'usage sur les sites de
 * voyage italiens — le vouvoiement y sonne administratif.
 */
export const PAGES_IT: PageIntl[] = [
  {
    slug: "come-prenotare",
    visuel: { nom: "popular-alps-ski-transfer", alt: "Minibus per transfer su una strada di montagna innevata" },
    metaTitre: "Come prenotare un transfer per le Alpi in tre passi",
    metaDescription:
      "Prenotare un trasferimento aeroporto per le Alpi: tragitto, veicolo e prezzo, dati di contatto. Prezzo fisso per veicolo, sci e seggiolini inclusi.",
    h1: "Come prenotare il tuo trasferimento",
    chapo:
      "Tre passi, pochi minuti, e un prezzo fermo prima di qualsiasi impegno. Indichi il tragitto e le date, scegli un veicolo in base al prezzo — per veicolo, non per persona — e lasci i tuoi dati. Confermiamo via e-mail, e il giorno stesso il tuo autista segue il volo.",
    equivalentEn: "/book-ski-transfer-tickets/",
    contenu: [
      { type: "titre2", texte: "1. Il tuo tragitto" },
      {
        type: "paragraphe",
        texte:
          "Scrivi l’aeroporto di partenza e la località: il campo cerca tra 34 aeroporti e 68 località dalle prime due lettere. Se il punto di partenza o di arrivo non è nell’elenco — una stazione, un hotel, un indirizzo preciso — scrivilo comunque: questi tragitti li calcoliamo a mano e rispondiamo via e-mail.",
      },
      {
        type: "paragraphe",
        texte:
          "Indica anche il numero di valigie e di sacche da sci. Non è una formalità: è il bagagliaio a decidere il veicolo, prima dei posti. Un minibus omologato per otto persone non porta otto valigie e otto paia di sci. Chiedendolo prima del preventivo, evitiamo di mandarti un veicolo in cui l’attrezzatura non entra.",
      },

      { type: "titre2", texte: "2. Il prezzo, per veicolo" },
      {
        type: "paragraphe",
        texte:
          "Mostriamo un prezzo per veicolo per ogni categoria compatibile con il tuo gruppo e il tuo bagaglio. L’importo non dipende dal numero di passeggeri: in due come in otto è lo stesso, pedaggi compresi. E il veicolo parte quando atterri.",
      },
      {
        type: "liste",
        items: [
          "Il prezzo è fisso, indicato prima della prenotazione, e non cambia dopo.",
          "Pedaggi autostradali, trafori e vignette svizzero sono inclusi.",
          "Sacche da sci e snowboard viaggiano senza supplemento.",
          "Seggiolini e rialzi sono forniti e montati prima della partenza.",
          "Il volo è monitorato; l’attesa in caso di ritardo non si paga.",
        ],
      },

      { type: "titre2", texte: "3. I tuoi dati" },
      {
        type: "paragraphe",
        texte:
          "Ci servono il numero del volo, un cellulare per il giorno del viaggio e l’indirizzo esatto in località. Il numero del volo è il dato più importante: da lì l’autista vede l’orario reale di atterraggio e sposta la presa in carico da solo, senza che tu debba fare nulla.",
      },
      {
        type: "paragraphe",
        texte:
          "Se viaggiano bambini, indica la loro età: da lì scegliamo i seggiolini. In Italia il seggiolino è obbligatorio fino a 150 cm di altezza, in Francia fino a 10 anni — portiamo il modello giusto per il percorso.",
      },

      { type: "titre2", texte: "Quando prenotare" },
      {
        type: "paragraphe",
        texte:
          "Meglio insieme al volo. A Natale e in febbraio i veicoli finiscono prima dei letti, e il sabato mattina in Valle d’Aosta come sulla Via Lattea è il momento più stretto della stagione.",
      },
    ],
    faq: [
      {
        question: "Posso prenotare andata e ritorno insieme?",
        reponse:
          "Sì. Spunta la casella del ritorno nel modulo e indica l’orario di decollo: calcoliamo noi l’ora di partenza dalla località, con il margine invernale.",
      },
      {
        question: "Cosa succede se il volo è in ritardo?",
        reponse:
          "L’autista segue il numero del volo e aspetta. L’attesa non si paga e non devi segnalare nulla.",
      },
      {
        question: "Devo pagare subito?",
        reponse:
          "No. Ricevi il prezzo per iscritto e confermi dopo. Nulla viene addebitato senza il tuo accordo.",
      },
      {
        question: "E se la mia località non è nell’elenco?",
        reponse:
          "Scrivila liberamente. Serviamo più località di quante il campo ne suggerisca, e calcoliamo questi tragitti a mano.",
      },
    ],
  },

  {
    slug: "transfer-privato",
    visuel: { nom: "transfert-prive", alt: "Veicolo privato davanti a uno chalet in località" },
    metaTitre: "Transfer privato per le Alpi | Prezzo fisso per veicolo",
    metaDescription:
      "Transfer privato da Torino, Milano Malpensa, Bergamo e Ginevra verso le località sciistiche. Prezzo per veicolo, partenza al tuo atterraggio, sci inclusi.",
    h1: "Il transfer privato per le Alpi",
    chapo:
      "Un veicolo solo per il tuo gruppo, che parte quando atterri davvero e ti lascia davanti al tuo alloggio. Il prezzo è per veicolo ed è fissato prima della prenotazione: in otto, si paga una volta. Sacche da sci, seggiolini, pedaggi e monitoraggio del volo sono dentro.",
    equivalentEn: "/private-airport-transfers-to-alps-ski-resort/",
    contenu: [
      { type: "titre2", texte: "Cosa vuol dire «privato»" },
      {
        type: "paragraphe",
        texte:
          "Il veicolo trasporta solo il tuo gruppo. Non aspetta nessun altro in aeroporto, non lascia nessun altro lungo la strada, e il percorso è il più breve tra il tuo terminal e il tuo indirizzo. La differenza si misura: su una salita come quella della Valtournenche, un sabato di febbraio, ogni fermata evitata vale venti o trenta minuti.",
      },
      {
        type: "liste",
        items: [
          "Partenza al tuo atterraggio reale: l’autista segue il numero del volo.",
          "Nessuna fermata intermedia, nessuna finestra oraria da rispettare.",
          "Prezzo per veicolo, indicato prima della prenotazione e non rivisto dopo.",
          "Seggiolini e rialzi montati prima della partenza.",
          "Sacche da sci e snowboard senza supplemento.",
          "Consegna all’indirizzo esatto del tuo alloggio in località.",
        ],
      },

      { type: "titre2", texte: "Il prezzo è per veicolo, non per persona" },
      {
        type: "paragraphe",
        texte:
          "È il punto che conta quando confronti. Un prezzo per veicolo non si muove con il numero di passeggeri. Quindi, davanti a due preventivi, controlla l’unità prima dell’importo: un «da 40 €» a persona e una tariffa forfettaria si assomigliano su una pagina di risultati e, moltiplicati, danno spesso lo stesso totale.",
      },
      {
        type: "paragraphe",
        texte:
          "Controlla anche cosa copre il prezzo. Da noi i pedaggi autostradali, i trafori del Monte Bianco e del Fréjus e il vignette svizzero sono compresi, l’attrezzatura da sci viaggia gratis, e l’attesa per un volo in ritardo non si paga. Sono le tre voci che, altrove, si aggiungono all’arrivo.",
      },

      { type: "titre2", texte: "Il veicolo si sceglie sul bagaglio" },
      {
        type: "paragraphe",
        texte:
          "Il bagagliaio decide prima dei posti. Un minibus omologato per otto persone non porta otto valigie e otto paia di sci: per questo chiediamo valigie e sacche prima del preventivo e non dopo. Eviti così il caso classico — un veicolo giusto per il numero di persone, in cui l’attrezzatura non entra.",
      },

      { type: "titre2", texte: "Inverno, trafori e frontiere" },
      {
        type: "paragraphe",
        texte:
          "I nostri veicoli hanno pneumatici invernali e catene a bordo. In Italia l’obbligo di dotazioni invernali va dal 15 novembre al 15 aprile sulle strade indicate dagli enti gestori; in Francia vale dal 1° novembre al 31 marzo nei comuni montani designati; in Svizzera conta lo stato della strada più che la data.",
      },
      {
        type: "paragraphe",
        texte:
          "Il passaggio di frontiera è di routine — Italia, Francia e Svizzera sono tutte nello spazio Schengen — ma porta un documento. E aspettati un traforo: il Monte Bianco da Chamonix, il Fréjus dalla Moriana. I loro pedaggi sono nel prezzo che ti diamo.",
      },

      { type: "titre2", texte: "Gruppi, ritorno e richieste particolari" },
      {
        type: "paragraphe",
        texte:
          "Il ritorno si prenota insieme all’andata, con l’orario di decollo: calcoliamo noi l’ora di partenza dalla località, margine invernale compreso. Oltre gli otto passeggeri coordiniamo più veicoli sullo stesso orario. Per un seminario, un gruppo scolastico o una presa in carico in stazione — Aosta, Oulx, Bardonecchia — scrivici: questi tragitti si calcolano a mano.",
      },
    ],
    faq: [
      {
        question: "Il prezzo è a persona o per veicolo?",
        reponse:
          "Per veicolo. In due o in otto, l’importo indicato è quello che paghi, pedaggi compresi.",
      },
      {
        question: "Cosa succede se il volo ritarda?",
        reponse:
          "L’autista segue il numero del volo e sposta la presa in carico all’orario reale di atterraggio. L’attesa non si paga e non devi segnalare nulla.",
      },
      {
        question: "Sci e snowboard si pagano a parte?",
        reponse:
          "No. Le sacche viaggiano gratis; ti chiediamo solo di dichiararle in prenotazione per dimensionare il bagagliaio.",
      },
      {
        question: "Fornite i seggiolini?",
        reponse:
          "Sì, seggiolini e rialzi sono forniti e montati prima della partenza, senza supplemento. Indicaci l’età dei bambini.",
      },
      {
        question: "Potete prendermi altrove che in aeroporto?",
        reponse:
          "Sì: stazione, hotel, indirizzo esatto. Scrivi il punto di partenza nel modulo e calcoliamo il tragitto.",
      },
    ],
  },

  {
    slug: "domande-frequenti",
    visuel: { nom: "faq", alt: "Sciatore al tramonto sopra una località sciistica" },
    metaTitre: "Domande frequenti sui trasferimenti per le Alpi",
    metaDescription:
      "Prezzo, bagagli, seggiolini, ritardi, cancellazione, dotazioni invernali: le risposte alle domande prima di prenotare un transfer aeroporto.",
    h1: "Domande frequenti",
    chapo:
      "Le domande che arrivano prima di ogni prenotazione, e le risposte — senza note in fondo pagina. Quello che non trovi qui, rispondiamo via e-mail, di solito in giornata.",
    equivalentEn: "/general-questions/",
    contenu: [
      { type: "titre2", texte: "Prezzo e pagamento" },
      {
        type: "paragraphe",
        texte:
          "Il prezzo è per veicolo, indicato prima della prenotazione, e non cambia dopo. Comprende pedaggi autostradali, trafori, vignette svizzero, sacche da sci, seggiolini, monitoraggio del volo e attesa in caso di ritardo. La fattura è in euro; le altre valute sono indicative.",
      },
      {
        type: "paragraphe",
        texte:
          "Finché il pagamento online è in fase di completamento, confermiamo via e-mail: ricevi il prezzo per iscritto e nulla viene addebitato prima del tuo accordo.",
      },

      { type: "titre2", texte: "Bagagli e veicolo" },
      {
        type: "paragraphe",
        texte:
          "Dimensioniamo il veicolo sul bagaglio che dichiari, non sul numero di posti. Sci, snowboard e sacche scarponi viaggiano gratis. Un passeggino, uno strumento musicale o un trasportino stanno anche loro — dicci che ci sono, e mandiamo il veicolo giusto.",
      },

      { type: "titre2", texte: "Il giorno del viaggio" },
      {
        type: "paragraphe",
        texte:
          "L’autista ti aspetta in area arrivi con un cartello, dopo il ritiro bagagli. Il giorno prima ricevi un messaggio con il suo nome e il suo numero. Se il volo viene dirottato, scrivici: partiamo dall’aeroporto su cui atterri davvero.",
      },

      { type: "titre2", texte: "Inverno, strada e tempi" },
      {
        type: "paragraphe",
        texte:
          "I tempi indicati sono misurati sulla rete stradale reale, senza traffico. Un sabato di alta stagione conta un’ora buona in più: in Valle d’Aosta come sulla Via Lattea, quella mattina decine di migliaia di persone cambiano alloggio nello stesso momento.",
      },
      {
        type: "paragraphe",
        texte:
          "Se una strada viene chiusa, l’autista prende l’alternativa e ti avvisa. Il prezzo resta quello concordato: una deviazione per neve è un rischio nostro, non tuo.",
      },
    ],
    faq: [
      {
        question: "Entro quando posso cancellare?",
        reponse:
          "Fino a 24 ore prima della presa in carico ti rimborsiamo l’intero importo, meno le eventuali spese di transazione. Dopo non è più previsto un rimborso — ma puoi chiedere un altro orario fino a 24 ore prima, dal link nella tua e-mail di conferma.",
      },
      {
        question: "Posso prenotare per qualcun altro?",
        reponse:
          "Sì. Metti nel modulo i dati di chi viaggia e la tua e-mail per la conferma.",
      },
      {
        question: "Servite anche località senza auto?",
        reponse:
          "Sì. Per Zermatt arriviamo a Täsch, per la valle di Lauterbrunnen alla stazione, e sincronizziamo l’arrivo con una partenza. Te lo diciamo prima del pagamento, non dopo.",
      },
      {
        question: "Gli autisti parlano italiano?",
        reponse:
          "Sulle tratte da Torino, Milano e Bergamo sì. Per le altre segnalacelo in prenotazione e organizziamo di conseguenza.",
      },
      {
        question: "Ricevo una fattura?",
        reponse:
          "Sì, via e-mail dopo il viaggio. Per le aziende la intestiamo alla ragione sociale, con partita IVA.",
      },
    ],
  },

  {
    slug: "contatti",
    visuel: { nom: "route-alpine", alt: "Villaggio alpino innevato e strada di montagna al crepuscolo" },
    metaTitre: "Contatti — Alps Ski Transfers",
    metaDescription:
      "Scrivici per un preventivo, un trasferimento di gruppo o una domanda su una prenotazione esistente. Rispondiamo di solito in giornata.",
    h1: "Contattaci",
    chapo:
      "Per un preventivo, un gruppo, una presa in carico fuori elenco o una domanda su una prenotazione già fatta: scrivici. Rispondiamo di solito in giornata, e in stagione anche nel fine settimana.",
    equivalentEn: "/contact/",
    contenu: [
      { type: "titre2", texte: "Per un preventivo" },
      {
        type: "paragraphe",
        texte:
          "La via più rapida è il modulo di prenotazione: calcola il tragitto subito e vedi il prezzo per veicolo prima di lasciare qualsiasi dato. Per un viaggio che il modulo non riesce a rappresentare — una stazione ferroviaria, più veicoli, una data insolita — scrivici direttamente.",
      },
      {
        type: "liste",
        items: [
          "Indica partenza e arrivo, data e ora.",
          "Indica quante persone, quante valigie e quante sacche da sci.",
          "Indica l’età dei bambini che viaggiano.",
          "Indica il numero del volo, appena lo hai.",
        ],
      },

      { type: "titre2", texte: "Per una prenotazione esistente" },
      {
        type: "paragraphe",
        texte:
          "Indica il numero di riferimento che trovi nell’e-mail di conferma. Per una modifica in giornata — una coincidenza persa, un volo dirottato — meglio telefonare: un’e-mail non raggiunge l’autista abbastanza in fretta.",
      },

      { type: "titre2", texte: "Chi siamo" },
      {
        type: "paragraphe",
        texte:
          "Alps Ski Transfers è un marchio; i trasporti sono effettuati da un’impresa registrata in Savoia, con licenza per il trasporto di persone. Indirizzo, numeri di registrazione e assicurazione sono nelle note legali.",
      },
    ],
    faq: [
      {
        question: "In quanto tempo rispondete?",
        reponse:
          "Di solito entro poche ore, in stagione anche nel fine settimana. Per una domanda su un viaggio in giornata, meglio telefonare.",
      },
      {
        question: "In che lingua posso scrivere?",
        reponse: "Italiano, inglese o francese — rispondiamo nella tua lingua.",
      },
      {
        question: "Posso prenotare per telefono?",
        reponse:
          "Sì, ma ti mandiamo comunque la conferma per iscritto: un prezzo che hai nero su bianco è un prezzo su cui non si discute dopo.",
      },
    ],
  },

  {
    slug: "agenzie-e-aziende",
    visuel: { nom: "transfert-prive-detail", alt: "Interno di un minibus per transfer, sedili e vano sci" },
    metaTitre: "Agenzie, chalet e aziende | Trasferimenti sulla neve",
    metaDescription:
      "Trasferimenti per agenzie di viaggio, gestori di chalet, servizi di concierge e aziende: più veicoli, un solo referente, fattura unica.",
    h1: "Agenzie, chalet e aziende",
    chapo:
      "Se porti ospiti in montagna con regolarità, non ti serve un modulo: ti serve un referente. Gestiamo serie di trasferimenti, coordiniamo più veicoli sullo stesso orario e fatturiamo in modo unico.",
    equivalentEn: "/inquiry/",
    contenu: [
      { type: "titre2", texte: "Come funziona" },
      {
        type: "paragraphe",
        texte:
          "Ci mandi l’elenco dei viaggi — data, volo, persone, destinazione —, ti restituiamo un listino per tratta e confermiamo ogni corsa singolarmente. Per le settimane con arrivo al sabato pianifichiamo i veicoli in anticipo: la mattina di un sabato di febbraio, in Valle d’Aosta, improvvisare non è un’opzione.",
      },
      {
        type: "liste",
        items: [
          "Un referente per la stagione, non un call center.",
          "Listino per tratta, valido per tutta la stagione.",
          "Fattura unica mensile o per pratica.",
          "Più veicoli coordinati sullo stesso orario.",
          "Segnalazione alla tua reception appena gli ospiti sono a bordo.",
        ],
      },

      { type: "titre2", texte: "Seminari e gruppi" },
      {
        type: "paragraphe",
        texte:
          "Oltre le otto persone viaggiamo con più veicoli in convoglio, così il gruppo arriva insieme. Per i seminari organizziamo anche gli spostamenti in loco — cena, visita, rientro scaglionato. Questi viaggi si calcolano singolarmente.",
      },
    ],
    faq: [
      {
        question: "Lavorate con prezzi fissi di stagione?",
        reponse:
          "Sì. Ti diamo un listino per tratta valido tutta la stagione, che puoi riportare nelle tue offerte.",
      },
      {
        question: "Potete fatturare all’agenzia invece che al cliente finale?",
        reponse: "Sì, con fattura mensile cumulativa o per pratica, come preferisci.",
      },
      {
        question: "Gestite gruppi oltre le otto persone?",
        reponse:
          "Sì, con più veicoli coordinati. Queste richieste si preventivano singolarmente.",
      },
    ],
  },

  {
    slug: "assistenza-in-viaggio",
    visuel: { nom: "route-hiver", alt: "Pneumatici invernali su una strada innevata verso una località" },
    metaTitre: "Assistenza in viaggio — trovare l’autista, volo in ritardo",
    metaDescription:
      "Volo in ritardo, autista introvabile, indirizzo cambiato in località: come contattarci e che cosa succede in ogni caso.",
    h1: "Assistenza durante il viaggio",
    chapo:
      "Un transfer si svolge quasi sempre senza bisogno di chiamarci. Quasi: ecco che cosa fare nei quattro casi in cui capita.",
    equivalentEn: "/help/",
    contenu: [
      { type: "titre2", texte: "Il tuo volo è in ritardo" },
      {
        type: "paragraphe",
        texte:
          "Non fare nulla. L’autista segue il numero del volo che hai indicato in fase di prenotazione: la presa in carico slitta da sola, senza supplemento e senza che tu debba avvisare. È per questo che chiediamo il numero del volo, e solo per questo.",
      },
      {
        type: "paragraphe",
        texte:
          "Se il volo viene dirottato su un altro aeroporto — succede più spesso a Innsbruck che altrove — chiamaci: partiamo dall’aeroporto dove sei atterrato davvero, senza una seconda prenotazione.",
      },

      { type: "titre2", texte: "Non trovi il tuo autista" },
      {
        type: "paragraphe",
        texte:
          "Il punto d’incontro è indicato nell’e-mail di conferma: di norma l’uscita bagagli, con un cartello con il tuo nome. Aspetta cinque minuti esattamente lì prima di chiamare — un autista che sta parcheggiando non è un autista assente.",
      },
      {
        type: "liste",
        items: [
          "Resta nel punto indicato: è lì che l’autista ti cerca.",
          "Tieni il telefono acceso e con la suoneria attiva, anche in roaming.",
          "Chiama il numero della conferma, non il centralino: squilla direttamente dal referente di turno.",
        ],
      },

      { type: "titre2", texte: "L’indirizzo in località è cambiato" },
      {
        type: "paragraphe",
        texte:
          "Scrivici appena lo sai, indicando il riferimento della prenotazione. Un indirizzo diverso nella stessa località non cambia il prezzo. Una località diversa sì: in quel caso ti comunichiamo il nuovo importo prima di modificare qualsiasi cosa.",
      },

      { type: "titre2", texte: "Hai dimenticato qualcosa nel veicolo" },
      {
        type: "paragraphe",
        texte:
          "C’è la pagina dedicata al bagaglio smarrito: verifichiamo con l’autista in giornata e conserviamo gli oggetti per trenta giorni.",
      },
    ],
    faq: [
      {
        question: "Devo avvisare in caso di ritardo del volo?",
        reponse:
          "No. Il volo è monitorato e la presa in carico slitta automaticamente, senza supplemento. Avvisaci solo se il volo viene dirottato o cancellato.",
      },
      {
        question: "Quanto aspetta l’autista?",
        reponse:
          "Il tempo di attesa è compreso nel prezzo: un’ora dall’atterraggio effettivo per i voli internazionali, quarantacinque minuti per i voli nazionali. Oltre, ti chiamiamo prima di prendere qualsiasi decisione.",
      },
      {
        question: "Come vi contatto il giorno del transfer?",
        reponse:
          "Il numero è nell’e-mail di conferma e squilla dal referente di turno, non dal centralino. Per iscritto, contact@alpsskitransfers.com resta il canale che lascia traccia.",
      },
      {
        question: "Posso cambiare l’orario della presa in carico?",
        reponse:
          "Sì, finché il veicolo non è partito. Scrivici con il tuo riferimento: confermiamo il nuovo orario via e-mail, e il prezzo non cambia se il tragitto resta lo stesso.",
      },
    ],
  },
  {
    slug: "bagaglio-smarrito",
    visuel: { nom: "aeroport-lyon-airport", alt: "Terminal aeroportuale, ritiro bagagli" },
    metaTitre: "Bagaglio smarrito, oggetto dimenticato",
    metaDescription:
      "Bagaglio non consegnato dalla compagnia o oggetto dimenticato nel veicolo: che cosa facciamo, in quali tempi e che cosa non possiamo garantire.",
    h1: "Bagaglio in ritardo, oggetto dimenticato",
    chapo:
      "Due situazioni diverse, due risposte diverse: un bagaglio che la compagnia non ha consegnato e un oggetto rimasto nel veicolo.",
    equivalentEn: "/lost-luggage/",
    contenu: [
      { type: "titre2", texte: "La compagnia non ha consegnato il bagaglio" },
      {
        type: "paragraphe",
        texte:
          "Denuncialo al banco bagagli prima di uscire dall’aeroporto: senza il modulo di smarrimento la compagnia non consegna nulla. L’autista ti aspetta durante la pratica, fa parte dell’arrivo.",
      },
      {
        type: "paragraphe",
        texte:
          "Fai consegnare il bagaglio al tuo indirizzo in località, non in aeroporto. Ridiscendere a prenderlo costa mezza giornata, e la compagnia consegna in località come ovunque.",
      },

      { type: "titre2", texte: "Hai dimenticato un oggetto nel veicolo" },
      {
        type: "paragraphe",
        texte:
          "Scrivici il prima possibile con il riferimento della prenotazione e la descrizione dell’oggetto: sentiamo l’autista in giornata. In un veicolo che ha fatto altre tre corse non si ritrova più tutto, e l’ora conta.",
      },
      {
        type: "liste",
        items: [
          "Conserviamo gli oggetti ritrovati per trenta giorni.",
          "Il ritiro presso il nostro deposito è gratuito.",
          "La spedizione è possibile, a tue spese, con tracciamento.",
          "Ti teniamo aggiornato via e-mail a ogni passo della ricerca.",
        ],
      },
      {
        type: "paragraphe",
        texte:
          "Cerchiamo seriamente, ma non possiamo garantire di ritrovare un oggetto e non ci assumiamo la responsabilità degli effetti personali lasciati nel veicolo. È il quadro, meglio dirlo prima che dopo.",
      },
    ],
    faq: [
      {
        question: "L’autista aspetta durante la denuncia del bagaglio?",
        reponse:
          "Sì. Il un’ora di attesa compresa nel prezzo copre questa pratica: avvisa l’autista quando lo raggiungi, ti aspetta al punto d’incontro.",
      },
      {
        question: "Per quanto tempo conservate un oggetto ritrovato?",
        reponse:
          "Trenta giorni. Trascorso il termine, gli oggetti non reclamati vengono donati o smaltiti secondo la loro natura.",
      },
      {
        question: "Potete spedirmi l’oggetto in località?",
        reponse:
          "Sì, con tracciamento e a tue spese. Il ritiro in deposito resta gratuito se ripassi dalla valle.",
      },
      {
        question: "Può ritirarlo un’altra persona?",
        reponse:
          "Sì, a condizione di avvisarci prima e di darci il suo nome: non consegniamo un oggetto a qualcuno che non ci hai annunciato.",
      },
    ],
  },

  {
    slug: "note-legali",
    metaTitre: "Note legali | Alps Ski Transfers",
    metaDescription:
      "Editore, hosting e informazioni legali del sito alpsskitransfers.com.",
    h1: "Note legali",
    chapo:
      "Informazioni richieste dall’articolo 6-III della legge francese del 21 giugno 2004 sulla fiducia nell’economia digitale (LCEN).",
    equivalentEn: "/legal-notice/",
    noindex: true,
    contenu: [
      { type: "titre2", texte: "Editore del sito" },
      {
        type: "paragraphe",
        texte: `Questo sito è pubblicato da ${entite.nom}, che opera con l’insegna ${entite.enseigne}, impresa individuale registrata in Francia il 17 settembre 2020.`,
      },
      {
        type: "liste",
        items: [
          `Sede: ${adressePostale}`,
          `Registrazione: ${sirenLisible}`,
          "Attività dichiarata: trasporto di persone con taxi e noleggio con conducente (VTC)",
          `Telefono: ${ENTREPRISE.telephoneAffiche}`,
          `E-mail: ${ENTREPRISE.email}`,
          `Iscrizione al registro francese degli operatori di noleggio con conducente (VTC): ${entite.evtc}`,
          `Licenza di trasporto interno di persone (LTI) n. ${entite.lti.numero}, valida dal 27 febbraio 2026 al 26 febbraio 2036, iscritta al registro nazionale delle imprese di trasporto su strada di persone per la Savoia. Gestore dei trasporti: ${entite.lti.gestionnaire}.`,
          `SIRET: ${entite.siret}`,
          `Partita IVA intracomunitaria: ${entite.tva}`,
        ],
      },
      {
        type: "paragraphe",
        texte: `« Alps Ski Transfers » è un nome commerciale. I servizi di trasporto offerti su questo sito sono effettuati da ${entite.nom} alle condizioni sopra indicate.`,
      },

      { type: "titre2", texte: "Direttore della pubblicazione" },
      {
        type: "paragraphe",
        texte: `${entite.nom}, in qualità di titolare dell’impresa.`,
      },

      { type: "titre2", texte: "Hosting" },
      {
        type: "paragraphe",
        texte:
          "Il sito è ospitato da Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, Stati Uniti — vercel.com.",
      },

      { type: "titre2", texte: "Proprietà intellettuale" },
      {
        type: "paragraphe",
        texte: `La struttura, i testi, le immagini e la veste grafica di ${SITE.url} sono protetti dal diritto d’autore. Qualsiasi riproduzione o riutilizzo, totale o parziale, su qualunque supporto, richiede il consenso scritto preventivo dell’editore. Le fotografie delle località e dei veicoli restano di proprietà dei rispettivi autori.`,
      },

      { type: "titre2", texte: "Dati personali" },
      {
        type: "paragraphe",
        texte:
          "I dati personali raccolti tramite questo sito sono trattati nel rispetto del regolamento generale sulla protezione dei dati (UE 2016/679) e della legge francese sulla protezione dei dati. Hai diritto di accesso, rettifica, cancellazione, limitazione, portabilità e opposizione, esercitabili all’indirizzo e-mail sopra indicato. Il dettaglio dei dati raccolti e delle finalità è nella nostra informativa sulla privacy, e i cookie utilizzati sono elencati nell’informativa sui cookie.",
      },
      {
        type: "paragraphe",
        texte:
          "Se ritieni che i tuoi diritti non siano stati rispettati, puoi rivolgerti alla CNIL, autorità francese per la protezione dei dati — cnil.fr.",
      },

      { type: "titre2", texte: "Condizioni di vendita" },
      {
        type: "paragraphe",
        texte:
          "I transfer prenotati su questo sito sono regolati dalle nostre condizioni di biglietteria e dalle condizioni generali, che disciplinano prezzi, cancellazione, bagagli e responsabilità. Questi documenti sono al momento pubblicati in inglese.",
      },

      { type: "titre2", texte: "Risoluzione delle controversie" },
      {
        type: "paragraphe",
        texte:
          "In caso di controversia, contattaci prima all’indirizzo e-mail sopra indicato. In mancanza di accordo, i consumatori residenti nell’Unione europea possono rivolgersi a un mediatore del consumo e utilizzare la piattaforma europea di risoluzione delle controversie online. [À REMPLACER — nome, indirizzo e sito del mediatore del consumo a cui l’impresa ha aderito.]",
      },
    ],
    faq: [],
  },
  {
    slug: "informativa-cookie",
    metaTitre: "Informativa sui cookie | Alps Ski Transfers",
    metaDescription:
      "Quali cookie utilizza alpsskitransfers.com, a che cosa servono e come controllarli.",
    h1: "Informativa sui cookie",
    chapo:
      "Questa pagina indica quali cookie alpsskitransfers.com salva sul tuo dispositivo, a che cosa servono e come puoi controllarli.",
    equivalentEn: "/cookie-policy-uk/",
    noindex: true,
    contenu: [
      { type: "titre2", texte: "Che cos’è un cookie" },
      {
        type: "paragraphe",
        texte:
          "Un cookie è un piccolo file di testo salvato sul tuo dispositivo quando visiti un sito. Permette al sito di ricordare le tue azioni e preferenze da una pagina all’altra e da una visita all’altra. Le tecnologie equivalenti — archiviazione locale, pixel, tag — hanno lo stesso scopo e rientrano in questa informativa.",
      },

      { type: "titre2", texte: "I cookie che utilizziamo" },
      {
        type: "paragraphe",
        texte:
          "Il meno possibile. Il sito è composto da pagine statiche e non esegue script pubblicitari o di profilazione: leggerlo non richiede alcun consenso.",
      },
      {
        type: "liste",
        items: [
          "Cookie strettamente necessari — tengono insieme la tua prenotazione tra un passaggio e l’altro e proteggono la pagina di pagamento. Senza di essi la prenotazione non può concludersi. Non richiedono il tuo consenso.",
          "Memorizzazione dei dati inseriti — se inizi una ricerca senza completarla, i dati possono restare nel browser per non doverli riscrivere. Restano sul tuo dispositivo e non ci vengono mai trasmessi.",
          "Cookie del fornitore di pagamento — sulla pagina di pagamento il nostro fornitore imposta cookie propri per rilevare le frodi e proteggere la transazione. Sono necessari per incassare.",
        ],
      },
      {
        type: "paragraphe",
        texte:
          "Oggi non utilizziamo cookie di misurazione, pubblicitari o di social network. Se cambiasse, questa pagina verrebbe aggiornata e il tuo consenso raccolto prima di qualsiasi installazione — un consenso facile da negare quanto da concedere, e revocabile in ogni momento.",
      },

      { type: "titre2", texte: "Quanto durano" },
      {
        type: "paragraphe",
        texte:
          "I cookie necessari a una prenotazione durano quanto la sessione o il tempo necessario a completarla. Se venisse introdotto un cookie soggetto a consenso, la sua durata non supererebbe i tredici mesi e il consenso verrebbe richiesto di nuovo alla scadenza, secondo le raccomandazioni della CNIL.",
      },

      { type: "titre2", texte: "Come controllarli" },
      {
        type: "paragraphe",
        texte:
          "Puoi accettare o rifiutare i cookie nelle impostazioni del browser e cancellare quelli già salvati. Chrome, Safari, Firefox ed Edge offrono questa possibilità nelle impostazioni sulla privacy. Attenzione: bloccando i cookie strettamente necessari non è possibile completare una prenotazione.",
      },

      { type: "titre2", texte: "I tuoi diritti" },
      {
        type: "paragraphe",
        texte: `I cookie che leggono o scrivono informazioni sul tuo dispositivo sono regolati dal GDPR e dall’articolo 82 della legge francese sulla protezione dei dati. Puoi esercitare i diritti di accesso, rettifica, cancellazione e opposizione scrivendo a ${ENTREPRISE.email}, e presentare reclamo alla CNIL, autorità di controllo francese, su cnil.fr.`,
      },
      {
        type: "paragraphe",
        texte:
          "Per tutto il resto di ciò che facciamo con i tuoi dati — prenotazioni, pagamenti, assegnazione degli autisti — vedi la nostra informativa sulla privacy.",
      },

      { type: "titre2", texte: "Modifiche" },
      {
        type: "paragraphe",
        texte:
          "Questa informativa viene aggiornata ogni volta che cambiano i cookie del sito. [À REMPLACER — datare la pubblicazione e ogni revisione.]",
      },
    ],
    faq: [],
  },
];
