import type { TraductionTrajet } from "./types";

/**
 * Traduzioni italiane delle pagine di trasferimento.
 *
 * Clé : `{aéroport}|{station}`, en slugs anglais. Périmètre italien : Turin,
 * Milan Malpensa, Bergame et Genève vers les stations italiennes et
 * valdôtaines, plus Innsbruck pour la Val Gardena.
 *
 * Chaque page dit ce qu'un comparateur ne dit pas : l'itinéraire réel, le
 * tunnel et son péage, ce qui bloque un samedi de février. Les distances
 * viennent de `src/data/distances.ts`, mesurées sur le réseau routier.
 */

/** Ciò che il prezzo comprende — identico ovunque. */
const incluso = {
  type: "liste" as const,
  items: [
    "Sacche da sci e snowboard, senza supplemento.",
    "Seggiolini e rialzi, montati prima della partenza.",
    "Monitoraggio del volo e attesa in caso di ritardo.",
    "Pedaggi autostradali, trafori e vignette svizzero.",
    "Consegna all’indirizzo esatto del tuo alloggio.",
  ],
};

/** Le domande che tornano su ogni tragitto. */
const faqComuni = [
  {
    question: "Il prezzo è a persona o per veicolo?",
    reponse:
      "Per veicolo. In due o in otto è lo stesso importo, pedaggi compresi — per questo il confronto tra due preventivi ha senso solo dopo aver messo entrambi sulla stessa unità.",
  },
  {
    question: "Le sacche da sci sono comprese?",
    reponse:
      "Sì, senza supplemento. Dichiarale in prenotazione, insieme alle sacche scarponi e al bagaglio ingombrante: scegliamo il veicolo su quello, non solo sul numero di posti.",
  },
  {
    question: "Cosa succede se il volo è in ritardo?",
    reponse:
      "L’autista segue il numero del volo e sposta la presa in carico all’orario reale di atterraggio. L’attesa è compresa, non c’è alcun supplemento.",
  },
];

export const TRADUCTIONS_TRAJETS_IT: Record<string, TraductionTrajet> = {
  /* ------------------------------------------------------------- Cervinia */

  "turin-airport|cervinia": {
    metaTitre: "Transfer Torino – Cervinia | 121 km, 1 h 40",
    metaDescription:
      "Transfer privato Torino – Breuil-Cervinia: 121 km, circa 1 h 40. Prezzo fisso per veicolo, sci e seggiolini inclusi, volo monitorato.",
    h1: "Transfer Torino – Cervinia",
    chapo:
      "121 km e circa 1 h 40 separano l’aeroporto di Torino da Breuil-Cervinia: autostrada della Valle d’Aosta fino a Châtillon, poi 27 km di tornanti fino a 2 050 m. È la via più breve verso il Cervino, e quella in cui l’ora di arrivo conta di più: il sabato la salita si intasa.",
    contenu: [
      { type: "titre2", texte: "Il percorso" },
      {
        type: "paragraphe",
        texte:
          "Tangenziale di Torino, autostrada A5 lungo la Dora Baltea fino a Châtillon (550 m), poi la regionale che risale la Valtournenche per Antey-Saint-André e Valtournenche paese. Novantaquattro chilometri di autostrada e ventisette di montagna: sono i secondi a decidere la durata.",
      },
      { type: "titre2", texte: "Il sabato del cambio" },
      {
        type: "paragraphe",
        texte:
          "Tra le dieci e le quattordici, chi arriva e chi parte percorrono la stessa strada stretta. Il punto critico è l’attraversamento di Valtournenche. In un sabato di febbraio conta un’ora in più; in settimana l’1 h 40 tiene senza problemi.",
      },
      { type: "titre2", texte: "Dotazioni invernali" },
      {
        type: "paragraphe",
        texte:
          "Dal 15 novembre al 15 aprile le dotazioni invernali sono obbligatorie su questa strada. I nostri veicoli hanno pneumatici invernali e catene a bordo, e l’autista sa dove fermarsi per montarle in sicurezza — non nel primo tornante disponibile.",
      },
      { type: "titre2", texte: "Cosa è incluso" },
      incluso,
    ],
    faq: [
      {
        question: "Quanto dura il tragitto Torino – Cervinia?",
        reponse:
          "Circa 1 h 40 per 121 km senza traffico, fino a 2 h 40 in un sabato di alta stagione.",
      },
      {
        question: "Arrivate anche a Valtournenche e Antey?",
        reponse:
          "Sì, sono sulla stessa strada, 9 e 18 km più a valle. Indica l’indirizzo esatto.",
      },
      ...faqComuni,
    ],
  },

  "geneva-airport|cervinia": {
    metaTitre: "Transfer Ginevra – Cervinia | 197 km, 3 h",
    metaDescription:
      "Transfer privato Ginevra – Breuil-Cervinia: 197 km, circa 3 h attraverso il traforo del Monte Bianco. Prezzo fisso per veicolo, pedaggi inclusi.",
    h1: "Transfer Ginevra – Cervinia",
    chapo:
      "197 km e circa 3 h dall’aeroporto di Ginevra a Cervinia: autostrada fino a Chamonix, traforo del Monte Bianco, poi tutta la Valle d’Aosta fino a Châtillon e la salita della Valtournenche. Più lungo che da Torino, ma Ginevra vola ogni giorno da tutta Europa — ed è questo che si compra con l’ora in più.",
    contenu: [
      { type: "titre2", texte: "Il percorso" },
      {
        type: "paragraphe",
        texte:
          "Autostrada per Chamonix, traforo del Monte Bianco (11,6 km), discesa su Courmayeur e Aosta, uscita a Châtillon e 27 km di salita. Si attraversano tre Paesi in senso amministrativo — Svizzera, Francia, Italia — e uno solo in senso pratico: lo spazio Schengen.",
      },
      { type: "titre2", texte: "Il traforo del Monte Bianco" },
      {
        type: "paragraphe",
        texte:
          "Il pedaggio è compreso nel prezzo, e per un minibus non è una cifra trascurabile: verificalo su qualsiasi altro preventivo. Il traforo è aperto tutto l’anno; in caso di chiusura passiamo dal Gran San Bernardo e il prezzo resta quello concordato.",
      },
      { type: "titre2", texte: "Documenti e regole" },
      {
        type: "paragraphe",
        texte:
          "Porta un documento d’identità: i controlli sono rari ma possibili. I nostri veicoli sono assicurati e attrezzati per i tre Paesi del percorso, e il vignette autostradale svizzero è nel prezzo.",
      },
      { type: "titre2", texte: "Cosa è incluso" },
      incluso,
    ],
    faq: [
      {
        question: "Quanto dura il tragitto Ginevra – Cervinia?",
        reponse:
          "Circa 3 h per 197 km senza traffico. In alta stagione al traforo si può fare coda: conta mezz’ora in più.",
      },
      {
        question: "Ginevra o Torino?",
        reponse:
          "Torino è più vicino (121 km contro 197). Ginevra conviene quando il volo è nettamente migliore o non esiste da Torino.",
      },
      ...faqComuni,
    ],
  },

  /* ----------------------------------------------------------- Courmayeur */

  "geneva-airport|courmayeur": {
    metaTitre: "Transfer Ginevra – Courmayeur | 102 km, 1 h 35",
    metaDescription:
      "Transfer privato Ginevra – Courmayeur: 102 km, circa 1 h 35 attraverso il traforo del Monte Bianco. Prezzo fisso per veicolo, pedaggio incluso.",
    h1: "Transfer Ginevra – Courmayeur",
    chapo:
      "102 km e circa 1 h 35 dall’aeroporto di Ginevra a Courmayeur, traforo del Monte Bianco compreso. È uno dei rari casi in cui l’aeroporto straniero batte quello nazionale: da Torino sono 158 km. Il pedaggio del traforo è nel prezzo che ti diamo, non un supplemento all’arrivo.",
    contenu: [
      { type: "titre2", texte: "Il percorso" },
      {
        type: "paragraphe",
        texte:
          "Autostrada da Ginevra verso Sallanches e Chamonix, poi il traforo del Monte Bianco: 11,6 km sotto la montagna e si esce a Entrèves, alle porte di Courmayeur. Nessun colle, nessuna salita: è una delle anfrate più semplici delle Alpi.",
      },
      { type: "titre2", texte: "Il traforo" },
      {
        type: "paragraphe",
        texte:
          "Aperto tutto l’anno, con chiusure programmate in autunno per manutenzione e sporadiche per incidenti o qualità dell’aria. Seguiamo lo stato del traforo e ti avvisiamo prima della partenza. Se è chiuso passiamo dal Gran San Bernardo, con circa un’ora in più e senza cambiare il prezzo.",
      },
      { type: "titre2", texte: "Entrèves, La Palud, Val Ferret" },
      {
        type: "paragraphe",
        texte:
          "Entrèves sta ai piedi dello Skyway, La Palud accanto, e la Val Ferret si apre dietro — d’inverno chiusa al traffico privato oltre un certo punto e servita da navetta. Diccelo in prenotazione se il tuo alloggio è lì: cambia il punto di consegna, e preferiamo dirtelo prima che scoprirlo insieme.",
      },
      { type: "titre2", texte: "Cosa è incluso" },
      incluso,
    ],
    faq: [
      {
        question: "Quanto dura il tragitto Ginevra – Courmayeur?",
        reponse:
          "Circa 1 h 35 per 102 km, traforo compreso. Nei sabati di alta stagione la coda al traforo può aggiungere mezz’ora.",
      },
      {
        question: "Il pedaggio del traforo è compreso?",
        reponse:
          "Sì, come ogni pedaggio del percorso e il vignette svizzero. Il prezzo che leggi è quello che paghi.",
      },
      ...faqComuni,
    ],
  },

  "turin-airport|courmayeur": {
    metaTitre: "Transfer Torino – Courmayeur | 158 km, 2 h",
    metaDescription:
      "Transfer privato Torino – Courmayeur: 158 km, circa 2 h di autostrada lungo la Valle d’Aosta. Prezzo fisso per veicolo, pedaggi inclusi.",
    h1: "Transfer Torino – Courmayeur",
    chapo:
      "158 km e circa 2 h dall’aeroporto di Torino a Courmayeur, quasi interamente in autostrada lungo la Dora Baltea. È la via italiana: nessun traforo internazionale, nessun confine, e una strada che sale dolcemente da 300 a 1 224 m su tutta la lunghezza della Valle d’Aosta.",
    contenu: [
      { type: "titre2", texte: "Il percorso" },
      {
        type: "paragraphe",
        texte:
          "Tangenziale, A5 fino ad Aosta e poi fino a Courmayeur. L’autostrada arriva praticamente in paese: gli ultimi chilometri sono di raccordo, non di montagna. Per questo la fascia oraria conta poco su questo tragitto rispetto ad altri.",
      },
      { type: "titre2", texte: "Quando conviene Torino" },
      {
        type: "paragraphe",
        texte:
          "Quando arrivi con un volo nazionale, quando il traforo del Monte Bianco è chiuso per manutenzione, o quando semplicemente il volo su Torino costa meno. Ginevra è più vicina in chilometri — 102 contro 158 — ma passa dal traforo e dal confine.",
      },
      { type: "titre2", texte: "Il fondovalle valdostano" },
      {
        type: "paragraphe",
        texte:
          "Sulla stessa autostrada si raggiungono Pila (da Aosta), La Thuile (da Pré-Saint-Didier) e le tre valli del Monterosa. Se il tuo gruppo si divide su più località, dillo in prenotazione: spesso si organizza meglio con un solo veicolo e due fermate che con due transfer.",
      },
      { type: "titre2", texte: "Cosa è incluso" },
      incluso,
    ],
    faq: [
      {
        question: "Quanto dura il tragitto Torino – Courmayeur?",
        reponse:
          "Circa 2 h per 158 km senza traffico. È quasi tutta autostrada, quindi molto prevedibile.",
      },
      {
        question: "Torino o Ginevra?",
        reponse:
          "Ginevra è più vicina in chilometri ma passa dal traforo del Monte Bianco. Torino resta tutta in Italia ed è la scelta abituale con un volo nazionale.",
      },
      ...faqComuni,
    ],
  },

  /* ------------------------------------------------------------ Sestriere */

  "turin-airport|sestriere": {
    metaTitre: "Transfer Torino – Sestriere | 107 km, 1 h 40",
    metaDescription:
      "Transfer privato Torino – Sestriere: 107 km, circa 1 h 40 per la Val di Susa o la Val Chisone. Prezzo fisso per veicolo, sci inclusi.",
    h1: "Transfer Torino – Sestriere",
    chapo:
      "107 km e circa 1 h 40 dall’aeroporto di Torino a Sestriere, a 2 035 m sul colle tra due valli. Ci si arriva da Oulx per la Val di Susa o da Pinerolo per la Val Chisone: due strade, una destinazione, e l’autista sceglie quella che scorre.",
    contenu: [
      { type: "titre2", texte: "Il percorso" },
      {
        type: "paragraphe",
        texte:
          "La via abituale è la tangenziale e l’autostrada del Frejus fino a Oulx (1 100 m), poi 22 km di salita per Cesana. L’alternativa risale la Val Chisone da Pinerolo per Fenestrelle e Pragelato: più lunga, meno trafficata, e la scelta naturale quando la Val di Susa è congestionata.",
      },
      { type: "titre2", texte: "Il sabato in Val di Susa" },
      {
        type: "paragraphe",
        texte:
          "È il giorno in cui tutta la Via Lattea cambia ospiti, e l’autostrada del Frejus ne risente tra le dieci e le quattordici. Conta quaranta minuti in più in un sabato di febbraio — o accetta il giro dalla Val Chisone, che spesso costa lo stesso tempo senza la coda.",
      },
      { type: "titre2", texte: "Il colle" },
      {
        type: "paragraphe",
        texte:
          "Sestriere sta su un valico, non in fondo a una valle: la strada continua da entrambi i lati. Resta aperta tutto l’inverno ed è spazzata con priorità; in caso di nevicata forte può chiudere per un’ora o due, e lo sappiamo prima che tu esca dall’aeroporto.",
      },
      { type: "titre2", texte: "Cosa è incluso" },
      incluso,
    ],
    faq: [
      {
        question: "Quanto dura il tragitto Torino – Sestriere?",
        reponse:
          "Circa 1 h 40 per 107 km senza traffico, fino a 2 h 20 in un sabato di alta stagione.",
      },
      {
        question: "Arrivate anche a Pragelato e Claviere?",
        reponse:
          "Sì, sono sulle due vie di accesso al colle. Indica il paese e la via in prenotazione.",
      },
      ...faqComuni,
    ],
  },

  "geneva-airport|sestriere": {
    metaTitre: "Transfer Ginevra – Sestriere | 242 km, 3 h 10",
    metaDescription:
      "Transfer privato Ginevra – Sestriere: 242 km, circa 3 h 10 attraverso il traforo del Monte Bianco. Prezzo fisso per veicolo, pedaggi inclusi.",
    h1: "Transfer Ginevra – Sestriere",
    chapo:
      "242 km e circa 3 h 10 dall’aeroporto di Ginevra a Sestriere: traforo del Monte Bianco, Valle d’Aosta, tangenziale di Torino e poi la Val di Susa. È il tragitto lungo verso la Via Lattea, e ha senso soltanto quando il volo su Ginevra è nettamente migliore di quello su Torino.",
    contenu: [
      { type: "titre2", texte: "Il percorso" },
      {
        type: "paragraphe",
        texte:
          "Autostrada per Chamonix, traforo del Monte Bianco, discesa su Aosta e poi verso Torino, tangenziale e autostrada del Frejus fino a Oulx, infine i 22 km di salita a Sestriere. Quasi tutto autostrada, ma tre ore restano tre ore.",
      },
      { type: "titre2", texte: "Vale la pena?" },
      {
        type: "paragraphe",
        texte:
          "Lo diciamo apertamente: da Torino sono 107 km e 1 h 40. Se hai la scelta del volo, Torino è la risposta giusta per la Via Lattea. Ginevra ha senso se voli da una città che non serve Torino, o se l’orario è incompatibile.",
      },
      { type: "titre2", texte: "Pedaggi e trafori" },
      {
        type: "paragraphe",
        texte:
          "Il pedaggio del traforo del Monte Bianco, il vignette svizzero e tutti i pedaggi autostradali italiani sono compresi nel prezzo. Su un percorso di questa lunghezza è una voce concreta: verificala su ogni preventivo che confronti.",
      },
      { type: "titre2", texte: "Cosa è incluso" },
      incluso,
    ],
    faq: [
      {
        question: "Quanto dura il tragitto Ginevra – Sestriere?",
        reponse:
          "Circa 3 h 10 per 242 km senza traffico, e oltre quattro ore in un sabato di alta stagione con coda al traforo.",
      },
      {
        question: "Non conviene volare su Torino?",
        reponse:
          "Quasi sempre sì: 107 km contro 242. Lo diciamo perché è vero, anche se significa un tragitto più corto per noi.",
      },
      ...faqComuni,
    ],
  },

  /* --------------------------------------------------------- Sauze d’Oulx */

  "turin-airport|sauze-doulx": {
    metaTitre: "Transfer Torino – Sauze d’Oulx | 91 km, 1 h 25",
    metaDescription:
      "Transfer privato Torino – Sauze d’Oulx: 91 km, circa 1 h 25. Via Lattea, prezzo fisso per veicolo, sci e pedaggi inclusi.",
    h1: "Transfer Torino – Sauze d’Oulx",
    chapo:
      "91 km e circa 1 h 25 dall’aeroporto di Torino a Sauze d’Oulx: autostrada del Frejus fino a Oulx, poi cinque chilometri di tornanti per salire i 400 metri che separano il fondovalle dal paese. È il tragitto più breve della Via Lattea, e quello in cui tutto si gioca alla fine.",
    contenu: [
      { type: "titre2", texte: "Il percorso" },
      {
        type: "paragraphe",
        texte:
          "Tangenziale, A32 del Frejus fino all’uscita di Oulx, poi la provinciale che sale a Sauze. Ottantasei chilometri di autostrada, cinque di montagna: una proporzione insolita, e il motivo per cui questo transfer è così rapido.",
      },
      { type: "titre2", texte: "Gli ultimi cinque chilometri" },
      {
        type: "paragraphe",
        texte:
          "Sono ripidi e con tornanti stretti. La strada è spazzata con priorità, ma dopo una nevicata è il tratto delle catene — quello dove si fermano le auto a noleggio con gomme estive. I nostri veicoli le portano a bordo e l’autista le monta prima dell’imbocco della salita, non a metà.",
      },
      { type: "titre2", texte: "Il paese in salita" },
      {
        type: "paragraphe",
        texte:
          "Sauze si sviluppa su più livelli, con vie strette, tratti pedonali e sensi unici. Indica la via e il nome dell’albergo: la differenza tra due indirizzi può essere dieci minuti a piedi con gli sci in mano, e preferiamo dirtelo in prenotazione.",
      },
      { type: "titre2", texte: "Cosa è incluso" },
      incluso,
    ],
    faq: [
      {
        question: "Quanto dura il tragitto Torino – Sauze d’Oulx?",
        reponse:
          "Circa 1 h 25 per 91 km senza traffico, fino a 2 h in un sabato di alta stagione.",
      },
      {
        question: "Venite a prenderci alla stazione di Oulx?",
        reponse:
          "Sì. È 5 km sotto il paese, sulla linea Torino–Modane con TGV da Parigi: indicaci il treno e facciamo la salita.",
      },
      ...faqComuni,
    ],
  },

  "geneva-airport|sauze-doulx": {
    metaTitre: "Transfer Ginevra – Sauze d’Oulx | 227 km, 3 h",
    metaDescription:
      "Transfer privato Ginevra – Sauze d’Oulx: 227 km, circa 3 h attraverso il traforo del Monte Bianco. Prezzo fisso per veicolo, pedaggi inclusi.",
    h1: "Transfer Ginevra – Sauze d’Oulx",
    chapo:
      "227 km e circa 3 h dall’aeroporto di Ginevra a Sauze d’Oulx: traforo del Monte Bianco, Valle d’Aosta, Torino e Val di Susa. Un percorso lungo per una località che da Torino dista 91 km — ha senso quando il volo su Ginevra è l’unico che funziona.",
    contenu: [
      { type: "titre2", texte: "Il percorso" },
      {
        type: "paragraphe",
        texte:
          "Autostrada per Chamonix, traforo del Monte Bianco, Aosta, tangenziale di Torino, autostrada del Frejus fino a Oulx e i cinque chilometri di salita finale. Quasi interamente autostrada fino all’ultimo tratto.",
      },
      { type: "titre2", texte: "Torino resta più vicino" },
      {
        type: "paragraphe",
        texte:
          "Novantuno chilometri contro duecentoventisette: se puoi scegliere il volo, scegli Torino. Preferiamo dirlo qui, dove serve a qualcosa, piuttosto che lasciartelo scoprire alla terza ora di autostrada.",
      },
      { type: "titre2", texte: "Pedaggi e frontiere" },
      {
        type: "paragraphe",
        texte:
          "Il pedaggio del traforo, il vignette svizzero e i pedaggi italiani sono compresi. Svizzera, Francia e Italia sono tutte nello spazio Schengen — porta comunque un documento d’identità.",
      },
      { type: "titre2", texte: "Cosa è incluso" },
      incluso,
    ],
    faq: [
      {
        question: "Quanto dura il tragitto Ginevra – Sauze d’Oulx?",
        reponse:
          "Circa 3 h per 227 km senza traffico, di più se c’è coda al traforo del Monte Bianco.",
      },
      {
        question: "Il pedaggio del traforo è compreso?",
        reponse: "Sì, come il vignette svizzero e ogni pedaggio italiano del percorso.",
      },
      ...faqComuni,
    ],
  },

  /* ------------------------------------------------------------ Champoluc */

  "turin-airport|champoluc": {
    metaTitre: "Transfer Torino – Champoluc | 109 km, 1 h 30",
    metaDescription:
      "Transfer privato Torino – Champoluc, Val d’Ayas: 109 km, circa 1 h 30. Monterosa Ski, prezzo fisso per veicolo, sci e pedaggi inclusi.",
    h1: "Transfer Torino – Champoluc",
    chapo:
      "109 km e circa 1 h 30 dall’aeroporto di Torino a Champoluc: autostrada della Valle d’Aosta fino a Verrès, poi 27 km di Val d’Ayas fino a 1 570 m. È una delle tre porte del Monterosa Ski, e quella che conviene verificare due volte in prenotazione.",
    contenu: [
      { type: "titre2", texte: "Il percorso" },
      {
        type: "paragraphe",
        texte:
          "Tangenziale, A5 fino all’uscita di Verrès (390 m), poi la regionale che risale la valle per Brusson e Antagnod. Ottantadue chilometri di autostrada e ventisette di valle stretta, con attraversamenti di paese.",
      },
      { type: "titre2", texte: "Tre valli, un comprensorio" },
      {
        type: "paragraphe",
        texte:
          "Ayas, Gressoney e Alagna sono collegate dagli impianti, non dalle strade. Chi prenota «per il Monterosa» senza specificare la valle rischia di trovarsi a un’ora di auto dal proprio albergo. Indica il paese, non il comprensorio — è l’errore più frequente di questa zona.",
      },
      { type: "titre2", texte: "Dotazioni invernali" },
      {
        type: "paragraphe",
        texte:
          "Dal 15 novembre al 15 aprile le dotazioni invernali sono obbligatorie sulla salita da Verrès. I nostri veicoli hanno pneumatici invernali e catene a bordo tutta la stagione.",
      },
      { type: "titre2", texte: "Cosa è incluso" },
      incluso,
    ],
    faq: [
      {
        question: "Quanto dura il tragitto Torino – Champoluc?",
        reponse:
          "Circa 1 h 30 per 109 km senza traffico, fino a 2 h in un sabato di alta stagione.",
      },
      {
        question: "Arrivate anche a Frachey?",
        reponse:
          "Sì, 4 km sopra Champoluc, dove parte la funivia per il Monterosa. Indicalo in prenotazione.",
      },
      ...faqComuni,
    ],
  },

  "geneva-airport|champoluc": {
    metaTitre: "Transfer Ginevra – Champoluc | 207 km, 3 h 05",
    metaDescription:
      "Transfer privato Ginevra – Champoluc: 207 km, circa 3 h 05 attraverso il traforo del Monte Bianco. Prezzo fisso per veicolo, pedaggi inclusi.",
    h1: "Transfer Ginevra – Champoluc",
    chapo:
      "207 km e circa 3 h 05 dall’aeroporto di Ginevra a Champoluc: traforo del Monte Bianco, discesa della Valle d’Aosta fino a Verrès, poi 27 km di Val d’Ayas. È la via internazionale verso il Monterosa, quella che usano i gruppi che volano da fuori Italia.",
    contenu: [
      { type: "titre2", texte: "Il percorso" },
      {
        type: "paragraphe",
        texte:
          "Autostrada per Chamonix, traforo del Monte Bianco, poi tutta la Valle d’Aosta in discesa fino a Verrès e la risalita della Val d’Ayas. Il pedaggio del traforo e il vignette svizzero sono nel prezzo.",
      },
      { type: "titre2", texte: "Se il traforo è chiuso" },
      {
        type: "paragraphe",
        texte:
          "Passiamo dal Gran San Bernardo, con circa un’ora in più. Il prezzo resta quello concordato: una chiusura è un rischio nostro, non tuo. Ti avvisiamo prima della partenza, non a metà strada.",
      },
      { type: "titre2", texte: "Quale valle del Monterosa" },
      {
        type: "paragraphe",
        texte:
          "Ayas, Gressoney e Alagna condividono gli impianti ma non le strade. Verifica in quale valle si trova il tuo alloggio prima di prenotare: da Champoluc a Gressoney in auto c’è un’ora, anche se sciando sono pochi minuti.",
      },
      { type: "titre2", texte: "Cosa è incluso" },
      incluso,
    ],
    faq: [
      {
        question: "Quanto dura il tragitto Ginevra – Champoluc?",
        reponse:
          "Circa 3 h 05 per 207 km senza traffico. Con coda al traforo, mezz’ora in più.",
      },
      {
        question: "Ginevra o Torino?",
        reponse:
          "Torino è quasi due volte più vicino (109 km contro 207). Ginevra conviene per i voli internazionali che Torino non ha.",
      },
      ...faqComuni,
    ],
  },

  /* ----------------------------------------------------------- Gressoney */

  "turin-airport|gressoney": {
    metaTitre: "Transfer Torino – Gressoney | 108 km, 1 h 40",
    metaDescription:
      "Transfer privato Torino – Gressoney-La-Trinité e Saint-Jean: 108 km, circa 1 h 40. Monterosa Ski, prezzo fisso per veicolo, sci inclusi.",
    h1: "Transfer Torino – Gressoney",
    chapo:
      "108 km e circa 1 h 40 dall’aeroporto di Torino a Gressoney-La-Trinité: autostrada fino a Pont-Saint-Martin, poi 35 km nella valle del Lys. Saint-Jean sta dodici chilometri prima di La-Trinité — venti minuti di differenza, e la prima cosa da precisare in prenotazione.",
    contenu: [
      { type: "titre2", texte: "Il percorso" },
      {
        type: "paragraphe",
        texte:
          "Tangenziale, A5 fino a Pont-Saint-Martin (345 m), poi la regionale che risale il Lys per Issime e Gaby fino a Gressoney-Saint-Jean (1 385 m) e La-Trinité (1 637 m). Settantatré chilometri di autostrada e trentacinque di valle stretta.",
      },
      { type: "titre2", texte: "L’ultimo tratto" },
      {
        type: "paragraphe",
        texte:
          "Sopra Gaby la strada si stringe e, dopo una nevicata, è il tratto in cui si mettono le catene. I nostri veicoli le portano a bordo. La valle è spazzata tutta la stagione: non è una strada difficile, è una strada lenta.",
      },
      { type: "titre2", texte: "Saint-Jean o La-Trinité" },
      {
        type: "paragraphe",
        texte:
          "Saint-Jean è il paese con i servizi, La-Trinité quello con gli impianti verso il Monterosa. Indica quale dei due e la via — gli ultimi venti minuti dipendono interamente da questo.",
      },
      { type: "titre2", texte: "Cosa è incluso" },
      incluso,
    ],
    faq: [
      {
        question: "Quanto dura il tragitto Torino – Gressoney?",
        reponse:
          "Circa 1 h 40 fino a La-Trinité, senza traffico. Saint-Jean è venti minuti prima.",
      },
      {
        question: "Si arriva a Champoluc o Alagna da qui in auto?",
        reponse:
          "Solo scendendo a fondovalle e risalendo l’altra valle: circa un’ora per Champoluc, oltre due per Alagna.",
      },
      ...faqComuni,
    ],
  },

  /* ------------------------------------------------------------ La Thuile */

  "geneva-airport|la-thuile": {
    metaTitre: "Transfer Ginevra – La Thuile | 133 km, 2 h 35",
    metaDescription:
      "Transfer privato Ginevra – La Thuile: 133 km, circa 2 h 35 attraverso il traforo del Monte Bianco. Prezzo fisso per veicolo, pedaggio incluso.",
    h1: "Transfer Ginevra – La Thuile",
    chapo:
      "133 km e circa 2 h 35 dall’aeroporto di Ginevra a La Thuile: traforo del Monte Bianco, poi 15 km di salita da Pré-Saint-Didier fino a 1 441 m. La Thuile è collegata sci ai piedi con La Rosière, ma d’inverno il Piccolo San Bernardo è chiuso alle auto: i due versanti sono due transfer diversi.",
    contenu: [
      { type: "titre2", texte: "Il percorso" },
      {
        type: "paragraphe",
        texte:
          "Autostrada per Chamonix, traforo del Monte Bianco, uscita a Pré-Saint-Didier (1 000 m) e poi i tornanti larghi che salgono a La Thuile. Il pedaggio del traforo e il vignette svizzero sono nel prezzo.",
      },
      { type: "titre2", texte: "I 15 chilometri finali" },
      {
        type: "paragraphe",
        texte:
          "È l’unica via d’accesso al paese, quindi viene spazzata con priorità. Resta una salita esposta: dopo una nevicata è il tratto delle catene, che i nostri veicoli portano a bordo tutta la stagione.",
      },
      { type: "titre2", texte: "Il colle chiuso" },
      {
        type: "paragraphe",
        texte:
          "Il Piccolo San Bernardo è chiuso da novembre a maggio. Se il tuo alloggio è a La Rosière e atterri a Ginevra, il percorso è un altro — te lo diciamo prima di prenotare, non dopo.",
      },
      { type: "titre2", texte: "Cosa è incluso" },
      incluso,
    ],
    faq: [
      {
        question: "Quanto dura il tragitto Ginevra – La Thuile?",
        reponse:
          "Circa 2 h 35 per 133 km, traforo compreso. In alta stagione la coda al traforo aggiunge mezz’ora.",
      },
      {
        question: "Si può passare a La Rosière dal colle?",
        reponse:
          "D’inverno no: il Piccolo San Bernardo è chiuso da novembre a maggio. Sciando si passa, in auto si fa il giro dal Monte Bianco.",
      },
      ...faqComuni,
    ],
  },

  /* ----------------------------------------------------------- Monginevro */

  "turin-airport|montgenevre": {
    metaTitre: "Transfer Torino – Monginevro | 105 km, 1 h 40",
    metaDescription:
      "Transfer privato Torino – Monginevro: 105 km, circa 1 h 40 per Oulx e Cesana. Via Lattea, prezzo fisso per veicolo, sci e pedaggi inclusi.",
    h1: "Transfer Torino – Monginevro",
    chapo:
      "105 km e circa 1 h 40 dall’aeroporto di Torino a Monginevro: autostrada del Frejus fino a Oulx, poi la statale per Cesana e il valico a 1 860 m. Il paese è francese, l’aeroporto più vicino è italiano, e il confine attraversa la via principale senza che nessuno se ne accorga.",
    contenu: [
      { type: "titre2", texte: "Il percorso" },
      {
        type: "paragraphe",
        texte:
          "Tangenziale, A32 del Frejus fino a Oulx, poi la statale 24 per Cesana Torinese e la salita al colle. La strada è larga, spazzata con priorità dai due lati, e resta aperta tutto l’anno — è il valico alpino più basso tra Italia e Francia.",
      },
      { type: "titre2", texte: "Il confine" },
      {
        type: "paragraphe",
        texte:
          "Italia e Francia sono nello spazio Schengen: nessuna formalità, controlli rari. Porta comunque un documento d’identità. I nostri veicoli sono assicurati e attrezzati per i due Paesi, e rispettano sia l’obbligo italiano (15 novembre – 15 aprile) sia quello francese (1° novembre – 31 marzo nei comuni designati).",
      },
      { type: "titre2", texte: "Un comprensorio su due Paesi" },
      {
        type: "paragraphe",
        texte:
          "Monginevro, Claviere, Cesana, Sansicario, Sauze d’Oulx e Sestriere formano la Via Lattea. Sugli sci si passa; in auto sono paesi distinti, con trenta minuti tra i due estremi. Indica il paese in prenotazione.",
      },
      { type: "titre2", texte: "Cosa è incluso" },
      incluso,
    ],
    faq: [
      {
        question: "Quanto dura il tragitto Torino – Monginevro?",
        reponse:
          "Circa 1 h 40 per 105 km senza traffico, fino a 2 h 10 in un sabato di alta stagione.",
      },
      {
        question: "Il colle è aperto d’inverno?",
        reponse:
          "Sì, tutto l’anno: è il valico più basso tra i due Paesi. Le chiusure sono rare e brevi.",
      },
      ...faqComuni,
    ],
  },

  /* ------------------------------------------------------ Serre Chevalier */

  "turin-airport|serre-chevalier": {
    metaTitre: "Transfer Torino – Serre Chevalier | 131 km, 2 h 45",
    metaDescription:
      "Transfer privato Torino – Serre Chevalier e Briançon: 131 km, circa 2 h 45 via Monginevro. Prezzo fisso per veicolo, sci e pedaggi inclusi.",
    h1: "Transfer Torino – Serre Chevalier",
    chapo:
      "131 km e circa 2 h 45 dall’aeroporto di Torino a Serre Chevalier, via Oulx, Cesana e il colle del Monginevro. Serre Chevalier è francese, ma Torino è il suo aeroporto più vicino: da Lione ci vogliono due ore in più per tratta.",
    contenu: [
      { type: "titre2", texte: "Il percorso" },
      {
        type: "paragraphe",
        texte:
          "Tangenziale, autostrada del Frejus fino a Oulx, statale per Cesana, valico del Monginevro a 1 860 m e discesa su Briançon (1 200 m). Da lì si risale la valle della Guisane verso Chantemerle, Villeneuve e Le Monêtier-les-Bains.",
      },
      { type: "titre2", texte: "L’aeroporto che nessuno considera" },
      {
        type: "paragraphe",
        texte:
          "È il caso più chiaro di scelta sbagliata dell’aeroporto: chi prenota Lione perché la stazione è in Francia paga due ore in più all’andata e altrettante al ritorno. Torino ha voli tutto l’anno, il valico è aperto tutto l’anno, e il confine non cambia nulla in pratica.",
      },
      { type: "titre2", texte: "Quale paese della valle" },
      {
        type: "paragraphe",
        texte:
          "Serre Chevalier è una valle, non un paese: quindici chilometri da Briançon a Le Monêtier, e venti minuti tra i due estremi. Indica il paese e la via — l’indicazione «Serre Chevalier» da sola non basta per l’ultimo tratto.",
      },
      { type: "titre2", texte: "Cosa è incluso" },
      incluso,
    ],
    faq: [
      {
        question: "Quanto dura il tragitto Torino – Serre Chevalier?",
        reponse:
          "Circa 2 h 45 per 131 km senza traffico. In un sabato di alta stagione conta mezz’ora in più.",
      },
      {
        question: "Perché non volare su Lione o Grenoble?",
        reponse:
          "Torino è più vicino: 131 km contro oltre 250 da Lione. Grenoble è più vicino ancora, ma d’inverno vola quasi solo nei fine settimana.",
      },
      ...faqComuni,
    ],
  },

  /* --------------------------------------------------------------- Alagna */

  "milan-malpensa-airport|alagna-valsesia": {
    metaTitre: "Transfer Malpensa – Alagna | 110 km, 1 h 50",
    metaDescription:
      "Transfer privato Milano Malpensa – Alagna Valsesia: 110 km, circa 1 h 50. Monterosa Ski, prezzo fisso per veicolo, sci e pedaggi inclusi.",
    h1: "Transfer Milano Malpensa – Alagna Valsesia",
    chapo:
      "110 km e circa 1 h 50 da Milano Malpensa ad Alagna: autostrada fino a Romagnano Sesia, poi 50 km di Valsesia. La metà del tempo si spende sui secondi cinquanta chilometri — è una valle lunga, stretta e attraversata da paesi, non una strada veloce.",
    contenu: [
      { type: "titre2", texte: "Il percorso" },
      {
        type: "paragraphe",
        texte:
          "Autostrada A26 fino a Romagnano Sesia, poi la statale che risale il fiume Sesia per Varallo, Balmuccia e Riva Valdobbia fino ad Alagna (1 191 m). Sessanta chilometri veloci, cinquanta lenti.",
      },
      { type: "titre2", texte: "L’ultima parte della valle" },
      {
        type: "paragraphe",
        texte:
          "Dopo Riva Valdobbia la strada si stringe ed è, in caso di neve, il tratto delle catene. È spazzata tutta la stagione — Alagna vive di sci e la strada è la sua unica via — ma resta una strada di montagna.",
      },
      { type: "titre2", texte: "Il Monterosa da questo versante" },
      {
        type: "paragraphe",
        texte:
          "Alagna è collegata a Gressoney e Champoluc dagli impianti, non dalla strada: in auto servono oltre due ore, scendendo in pianura e risalendo. Verifica in quale valle si trova il tuo alloggio prima di prenotare il transfer.",
      },
      { type: "titre2", texte: "Cosa è incluso" },
      incluso,
    ],
    faq: [
      {
        question: "Quanto dura il tragitto Malpensa – Alagna?",
        reponse:
          "Circa 1 h 50 per 110 km senza traffico. La seconda metà è tutta strada di valle.",
      },
      {
        question: "Arrivate anche a Riva Valdobbia e Varallo?",
        reponse: "Sì, sono sulla stessa strada. Indica l’indirizzo in prenotazione.",
      },
      ...faqComuni,
    ],
  },

  /* --------------------------------------------------- Selva di Val Gardena */

  "innsbruck-airport|selva-val-gardena": {
    metaTitre: "Transfer Innsbruck – Selva Val Gardena | 120 km",
    metaDescription:
      "Transfer privato Innsbruck – Selva di Val Gardena: 120 km, circa 1 h 50 via Brennero. Dolomiti Superski, prezzo fisso per veicolo, pedaggi inclusi.",
    h1: "Transfer Innsbruck – Selva di Val Gardena",
    chapo:
      "120 km e circa 1 h 50 dall’aeroporto di Innsbruck a Selva: autostrada del Brennero fino a Chiusa, poi 25 km di Val Gardena per Ortisei e Santa Cristina. È l’aeroporto più vicino alla valle — più di Verona, più di Bergamo — e lo scoprono in pochi.",
    contenu: [
      { type: "titre2", texte: "Il percorso" },
      {
        type: "paragraphe",
        texte:
          "Dall’aeroporto sull’autostrada del Brennero, valico a 1 370 m, discesa sulla Valle Isarco fino a Chiusa, poi la risalita della Val Gardena. Il valico è autostradale e aperto tutto l’anno; vignetta austriaca e pedaggi italiani sono nel prezzo.",
      },
      { type: "titre2", texte: "Il Brennero nei fine settimana" },
      {
        type: "paragraphe",
        texte:
          "È uno dei valichi più trafficati d’Europa, e nei sabati di alta stagione si può perdere mezz’ora tra Innsbruck e il confine. Non è un problema di neve — è un problema di volume, e riguarda soprattutto la fascia tra le nove e mezzogiorno.",
      },
      { type: "titre2", texte: "Tre paesi, tre lingue" },
      {
        type: "paragraphe",
        texte:
          "In Val Gardena ogni luogo ha un nome italiano, uno tedesco e uno ladino: Selva è Wolkenstein, Ortisei è St. Ulrich, Santa Cristina è St. Christina. Gli albergatori usano spesso il nome tedesco. Indica l’indirizzo e il nome dell’albergo, così non c’è margine di ambiguità.",
      },
      { type: "titre2", texte: "Cosa è incluso" },
      incluso,
    ],
    faq: [
      {
        question: "Quanto dura il tragitto Innsbruck – Selva?",
        reponse:
          "Circa 1 h 50 per 120 km senza traffico, mezz’ora in più nei sabati di alta stagione per la coda al Brennero.",
      },
      {
        question: "Arrivate anche a Ortisei e Santa Cristina?",
        reponse: "Sì, sono sulla stessa strada, a pochi minuti da Selva.",
      },
      ...faqComuni,
    ],
  },
};
