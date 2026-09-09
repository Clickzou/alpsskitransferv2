import type { TraductionStation } from "./types";

/**
 * Traduzioni italiane delle pagine delle località sciistiche.
 *
 * À part des modules de station, comme le français et l'allemand, pour survivre
 * à `npm run migrer:stations`.
 *
 * **Périmètre italien — décision du 9 septembre 2026.** La Vallée d'Aoste, le
 * Piémont et la Via Lattea, au départ de Turin, Milan Malpensa, Bergame et
 * Genève. C'est le marché intérieur du ski italien, et c'est le seul endroit où
 * l'on peut dire quelque chose d'utile sur le tunnel du Mont-Blanc, la montée de
 * la Valtournenche ou la frontière du Montgenèvre.
 *
 * Montgenèvre et Serre Chevalier sont françaises mais se rejoignent depuis
 * Turin : elles sont ici parce que c'est de là qu'un Italien y va, pas par
 * fantaisie géographique. Le champ `nom` porte le nom italien quand il diffère.
 *
 * Les distances viennent de `src/data/distances.ts`, mesurées sur le réseau
 * routier réel.
 */

/** Ciò che il prezzo comprende — identico ovunque, quindi scritto una volta. */
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

export const TRADUCTIONS_IT: Record<string, TraductionStation> = {
  cervinia: {
    slug: "cervinia",
    nom: "Breuil-Cervinia",
    metaTitre: "Transfer Cervinia | Torino 121 km, Ginevra, Milano",
    metaDescription:
      "Transfer privato per Breuil-Cervinia da Torino (121 km, 1 h 40) e Ginevra. Prezzo fisso per veicolo, sci e seggiolini inclusi, volo monitorato.",
    h1: "Trasferimenti per Breuil-Cervinia",
    chapo:
      "Cervinia sta a 2 050 m in fondo alla Valtournenche, e ci si arriva sempre allo stesso modo: autostrada della Valle d’Aosta fino a Châtillon, poi 27 km di salita. Torino è l’aeroporto più vicino (121 km, circa 1 h 40), Ginevra la porta internazionale (197 km, 3 h). Prezzo fisso per veicolo, pedaggi e sacche da sci compresi.",
    contenu: [
      {
        type: "paragraphe",
        texte:
          "La Valtournenche è una valle chiusa: si entra e si esce dalla stessa strada, che finisce ai piedi del Cervino. Questo definisce tutto il viaggio — l’autostrada conta meno degli ultimi ventisette chilometri.",
      },
      { type: "titre2", texte: "Quale aeroporto scegliere" },
      {
        type: "liste",
        items: [
          "Torino Caselle — 121 km, circa 1 h 40. Il più vicino, e con l’autostrada fin quasi all’imbocco della valle.",
          "Ginevra — 197 km, circa 3 h. Passa dal traforo del Monte Bianco; voli da tutta Europa ogni giorno della settimana.",
          "Milano Malpensa — 181 km, circa 2 h 20 su richiesta. Utile per chi arriva da fuori Europa.",
        ],
      },
      {
        type: "paragraphe",
        texte:
          "I tempi sono misurati sulla rete stradale reale, senza traffico. Valgono per un giorno feriale libero, non per un caso migliore teorico.",
      },
      { type: "titre2", texte: "I 27 chilometri da Châtillon" },
      {
        type: "paragraphe",
        texte:
          "Da Châtillon (550 m) la strada sale a 2 050 m in ventisette chilometri di tornanti, passando per Antey-Saint-André e Valtournenche. È una strada regionale ben tenuta, spazzata e salata tutta la stagione, ma è stretta nei paesi e ha poche possibilità di sorpasso: dietro un pullman si perdono venti minuti senza rimedio.",
      },
      {
        type: "paragraphe",
        texte:
          "In Italia le dotazioni invernali sono obbligatorie dal 15 novembre al 15 aprile sulle strade indicate dagli enti gestori, e questa è tra quelle. I nostri veicoli hanno pneumatici invernali e catene a bordo tutta la stagione.",
      },
      { type: "titre2", texte: "Il sabato in Valtournenche" },
      {
        type: "paragraphe",
        texte:
          "Il sabato è il giorno del cambio: chi arriva e chi parte percorrono la stessa strada nelle stesse ore. Tra le dieci e le quattordici la salita si intasa, soprattutto all’altezza di Valtournenche paese. In un sabato di febbraio conta un’ora in più su ciascuno dei tempi indicati.",
      },
      { type: "titre2", texte: "Arrivare in treno" },
      {
        type: "paragraphe",
        texte:
          "La stazione più vicina è Châtillon-Saint-Vincent, a 27 km a valle, sulla linea Chivasso–Aosta. Se arrivi in treno, dicci il numero: è la stessa salita, dallo stesso punto di partenza.",
      },
      { type: "titre2", texte: "Cosa è incluso" },
      incluso,
    ],
    faq: [
      {
        question: "Quanto dura il transfer Torino – Cervinia?",
        reponse:
          "Circa 1 h 40 per 121 km, senza traffico. In un sabato di alta stagione conta un’ora in più: la salita da Châtillon si intasa nelle ore del cambio.",
      },
      {
        question: "Qual è l’aeroporto più vicino a Cervinia?",
        reponse:
          "Torino Caselle, a 121 km e circa 1 h 40. Ginevra è a 197 km ma ha un’offerta di voli internazionali molto più ampia.",
      },
      {
        question: "Gli sci sono compresi nel prezzo?",
        reponse:
          "Sì. Le sacche da sci e snowboard viaggiano gratis; ti chiediamo di dichiararle in prenotazione per scegliere il veicolo giusto.",
      },
      {
        question: "Servono le catene per salire a Cervinia?",
        reponse:
          "I nostri veicoli le portano a bordo e le montano quando serve, senza costi aggiuntivi. Dal 15 novembre al 15 aprile le dotazioni invernali sono obbligatorie su questa strada.",
      },
      {
        question: "Arrivate anche a Valtournenche e Antey?",
        reponse:
          "Sì, sono sulla stessa strada, rispettivamente 9 e 18 km più a valle. Indica l’indirizzo esatto in prenotazione.",
      },
    ],
  },

  courmayeur: {
    slug: "courmayeur",
    metaTitre: "Transfer Courmayeur | Ginevra 102 km, Torino 158 km",
    metaDescription:
      "Transfer privato per Courmayeur da Ginevra (102 km, 1 h 35, traforo del Monte Bianco) e Torino. Prezzo fisso per veicolo, pedaggi inclusi.",
    h1: "Trasferimenti per Courmayeur — ai piedi del Monte Bianco",
    chapo:
      "Courmayeur è uno dei rari casi in cui l’aeroporto straniero è più vicino di quello italiano: Ginevra dista 102 km e circa 1 h 35 attraverso il traforo del Monte Bianco, Torino 158 km e circa 2 h. Il pedaggio del traforo, che per un minibus non è una cifra trascurabile, è compreso nel prezzo che ti diamo.",
    contenu: [
      {
        type: "paragraphe",
        texte:
          "Courmayeur sta a 1 224 m all’imbocco italiano del traforo, e questo spiega tutta la sua geografia dei trasporti: da nord si arriva in un’ora e mezza da un aeroporto internazionale, da sud si risale tutta la Valle d’Aosta.",
      },
      { type: "titre2", texte: "Quale aeroporto scegliere" },
      {
        type: "liste",
        items: [
          "Ginevra — 102 km, circa 1 h 35. Autostrada fino a Chamonix, poi il traforo del Monte Bianco: 11,6 km e si è in Italia.",
          "Torino Caselle — 158 km, circa 2 h. Tutta autostrada lungo la Dora Baltea, senza trafori a pedaggio.",
          "Milano Malpensa — su richiesta, circa 2 h 45 per la stessa autostrada.",
        ],
      },
      { type: "titre2", texte: "Il traforo del Monte Bianco" },
      {
        type: "paragraphe",
        texte:
          "Il traforo è aperto tutto l’anno e la sua chiusura è rara, ma esiste: manutenzione programmata in autunno, e sporadicamente per incidenti o qualità dell’aria. Quando succede, l’alternativa è il Gran San Bernardo o il giro dal Piccolo San Bernardo — che d’inverno è chiuso — e i tempi cambiano molto. Seguiamo lo stato del traforo e ti avvisiamo prima che tu parta.",
      },
      {
        type: "paragraphe",
        texte:
          "Il pedaggio è nel prezzo. Vale la pena verificarlo su qualsiasi preventivo: per un minibus è una cifra a due cifre alte, e un preventivo che la esclude non è confrontabile con uno che la include.",
      },
      { type: "titre2", texte: "Val Ferret, Val Vény, Entrèves" },
      {
        type: "paragraphe",
        texte:
          "Courmayeur non è solo il centro: Entrèves sta ai piedi dello Skyway, La Palud accanto, e la Val Ferret si apre dietro. In inverno la Val Ferret è chiusa al traffico privato oltre un certo punto e servita da navetta. Diccelo in prenotazione se il tuo alloggio è lì — cambia il punto di consegna.",
      },
      { type: "titre2", texte: "Cosa è incluso" },
      incluso,
    ],
    faq: [
      {
        question: "Quanto dura il transfer Ginevra – Courmayeur?",
        reponse:
          "Circa 1 h 35 per 102 km, senza traffico, traforo del Monte Bianco compreso. In alta stagione al traforo si può fare coda: conta mezz’ora in più.",
      },
      {
        question: "Il pedaggio del traforo è compreso?",
        reponse:
          "Sì, come ogni pedaggio del percorso. Il prezzo che leggi è quello che paghi.",
      },
      {
        question: "Ginevra o Torino?",
        reponse:
          "Ginevra è più vicina (102 km contro 158) e ha molti più voli. Torino evita il traforo e resta tutta in Italia — è la scelta di chi arriva da un volo nazionale.",
      },
      {
        question: "Cosa succede se il traforo è chiuso?",
        reponse:
          "Ti avvisiamo prima della partenza e passiamo dal Gran San Bernardo. Il prezzo resta quello concordato: una chiusura è un rischio nostro.",
      },
    ],
  },

  sestriere: {
    slug: "sestriere",
    metaTitre: "Transfer Sestriere | Torino 107 km, 1 h 40",
    metaDescription:
      "Transfer privato per Sestriere da Torino (107 km, 1 h 40) e Ginevra. Via Lattea, prezzo fisso per veicolo, sci e seggiolini inclusi.",
    h1: "Trasferimenti per Sestriere — la Via Lattea da Torino",
    chapo:
      "Sestriere sta a 2 035 m su un colle, non in fondo a una valle, e questo la rende accessibile da due lati: da Oulx per la Val di Susa e da Pinerolo per la Val Chisone. Torino dista 107 km e circa 1 h 40, Ginevra 242 km e circa 3 h 10. Prezzo fisso per veicolo, pedaggi compresi.",
    contenu: [
      {
        type: "paragraphe",
        texte:
          "Sestriere è nata come stazione sciistica, sul valico tra due valli, e la sua posizione è anche il suo vantaggio logistico: se una salita è bloccata, l’altra di solito non lo è.",
      },
      { type: "titre2", texte: "Quale aeroporto scegliere" },
      {
        type: "liste",
        items: [
          "Torino Caselle — 107 km, circa 1 h 40. Tangenziale, autostrada del Frejus fino a Oulx, poi 22 km di salita.",
          "Ginevra — 242 km, circa 3 h 10 attraverso il traforo del Monte Bianco e la Valle d’Aosta.",
          "Milano Malpensa — su richiesta, circa 2 h 45 per l’autostrada Torino–Milano.",
        ],
      },
      { type: "titre2", texte: "Due salite, una destinazione" },
      {
        type: "paragraphe",
        texte:
          "Da Oulx (1 100 m) si sale a 2 035 m in 22 km passando per Cesana. Da Pinerolo si risale invece tutta la Val Chisone per Fenestrelle e Pragelato: più lunga, meno trafficata, e la scelta abituale quando la Val di Susa è congestionata. Il nostro autista sceglie in base al traffico del giorno, non in base a un itinerario stampato.",
      },
      { type: "titre2", texte: "La Via Lattea è un comprensorio, non un paese" },
      {
        type: "paragraphe",
        texte:
          "Sestriere, Sauze d’Oulx, Cesana, Claviere e Monginevro condividono gli impianti ma non la strada: tra Sestriere e Sauze d’Oulx ci sono trenta minuti di auto. Indica il paese e la via — non il comprensorio.",
      },
      { type: "titre2", texte: "Inverno e dotazioni" },
      {
        type: "paragraphe",
        texte:
          "Su queste strade le dotazioni invernali sono obbligatorie dal 15 novembre al 15 aprile. I nostri veicoli hanno pneumatici invernali e catene a bordo. Il colle di Sestriere resta aperto tutto l’inverno ed è spazzato con priorità, ma in caso di nevicata forte può essere chiuso per un’ora o due — lo sappiamo prima che tu esca dall’aeroporto.",
      },
      { type: "titre2", texte: "Cosa è incluso" },
      incluso,
    ],
    faq: [
      {
        question: "Quanto dura il transfer Torino – Sestriere?",
        reponse:
          "Circa 1 h 40 per 107 km, senza traffico. In un sabato di alta stagione conta quaranta minuti in più sulla Val di Susa.",
      },
      {
        question: "Si passa da Oulx o dalla Val Chisone?",
        reponse:
          "Dipende dal traffico del giorno. L’autista sceglie la via più scorrevole: entrambe arrivano a Sestriere, la seconda è più lunga ma spesso più libera.",
      },
      {
        question: "Arrivate anche a Pragelato e Claviere?",
        reponse:
          "Sì, sono sulle due strade di accesso. Indica il paese e l’indirizzo in prenotazione.",
      },
      {
        question: "Il prezzo è per persona?",
        reponse:
          "No, per veicolo. In due o in otto è lo stesso importo, pedaggi compresi.",
      },
    ],
  },

  "sauze-doulx": {
    slug: "sauze-d-oulx",
    metaTitre: "Transfer Sauze d’Oulx | Torino 91 km, 1 h 25",
    metaDescription:
      "Transfer privato per Sauze d’Oulx da Torino (91 km, 1 h 25) e Ginevra. Via Lattea, prezzo fisso per veicolo, sci e pedaggi inclusi.",
    h1: "Trasferimenti per Sauze d’Oulx",
    chapo:
      "Sauze d’Oulx sta a 1 509 m sopra la Val di Susa, a soli 5 km dal fondovalle ma 500 metri più in alto. Torino dista 91 km e circa 1 h 25 — la località della Via Lattea più rapida da raggiungere. Ginevra è a 227 km, circa 3 h. Prezzo fisso per veicolo, pedaggi compresi.",
    contenu: [
      {
        type: "paragraphe",
        texte:
          "Il vantaggio di Sauze d’Oulx è tutto negli ultimi cinque chilometri: l’autostrada arriva quasi sotto il paese, e la salita è breve. Lo svantaggio è lo stesso: quei cinque chilometri sono ripidi, e in caso di neve fresca sono il tratto che conta.",
      },
      { type: "titre2", texte: "Quale aeroporto scegliere" },
      {
        type: "liste",
        items: [
          "Torino Caselle — 91 km, circa 1 h 25. Autostrada del Frejus fino a Oulx, poi 5 km di salita.",
          "Ginevra — 227 km, circa 3 h, attraverso il traforo del Monte Bianco.",
          "Milano Malpensa — su richiesta, circa 2 h 30.",
        ],
      },
      { type: "titre2", texte: "Gli ultimi cinque chilometri" },
      {
        type: "paragraphe",
        texte:
          "Da Oulx (1 100 m) a Sauze (1 509 m) la strada sale con tornanti stretti. È spazzata con priorità, ma dopo una nevicata è il tratto dove si mettono le catene — e dove chi arriva con un’auto a noleggio estiva si ferma. I nostri veicoli le portano a bordo e l’autista sa dove fermarsi per montarle in sicurezza.",
      },
      { type: "titre2", texte: "Sauze, Jouvenceaux, Sportinia" },
      {
        type: "paragraphe",
        texte:
          "Il paese si allunga su più livelli e le vie del centro storico sono strette, in parte pedonali e spesso a senso unico. Jouvenceaux sta più in basso, Sportinia in quota e non è raggiungibile in auto. Indica la via, non solo il paese: la differenza tra un indirizzo e l’altro può essere dieci minuti a piedi con gli sci in mano.",
      },
      { type: "titre2", texte: "La stazione di Oulx" },
      {
        type: "paragraphe",
        texte:
          "Oulx-Cesana è una stazione sulla linea Torino–Modane, con TGV diretti da Parigi e treni da Torino. Sta 5 km sotto il paese: se arrivi in treno, la salita la facciamo noi.",
      },
      { type: "titre2", texte: "Cosa è incluso" },
      incluso,
    ],
    faq: [
      {
        question: "Quanto dura il transfer Torino – Sauze d’Oulx?",
        reponse:
          "Circa 1 h 25 per 91 km, senza traffico. In un sabato di alta stagione conta mezz’ora in più.",
      },
      {
        question: "Servono le catene per l’ultima salita?",
        reponse:
          "Spesso sì dopo una nevicata. I nostri veicoli le hanno a bordo e l’autista le monta quando serve, senza supplemento.",
      },
      {
        question: "Venite a prenderci alla stazione di Oulx?",
        reponse:
          "Sì. È a 5 km e circa 15 minuti dal paese — indicaci il treno e organizziamo la salita.",
      },
      {
        question: "Arrivate fino all’indirizzo esatto?",
        reponse:
          "Fin dove la strada è aperta e percorribile. Alcune vie del centro storico sono pedonali: te lo diciamo prima, non all’arrivo.",
      },
    ],
  },

  champoluc: {
    slug: "champoluc",
    metaTitre: "Transfer Champoluc | Torino 109 km, 1 h 30",
    metaDescription:
      "Transfer privato per Champoluc e la Val d’Ayas da Torino (109 km, 1 h 30) e Ginevra. Prezzo fisso per veicolo, sci e pedaggi inclusi.",
    h1: "Trasferimenti per Champoluc — la Val d’Ayas",
    chapo:
      "Champoluc sta a 1 570 m in fondo alla Val d’Ayas, una delle tre valli del Monterosa Ski. Torino dista 109 km e circa 1 h 30, Ginevra 207 km e circa 3 h 05. Si esce dall’autostrada a Verrès e si risalgono 27 km di valle — una strada tranquilla, che d’inverno chiede però attrezzatura vera.",
    contenu: [
      {
        type: "paragraphe",
        texte:
          "Il Monterosa Ski unisce tre valli — Ayas, Gressoney e Alagna — con gli impianti, non con le strade. Chi sbaglia valle in prenotazione si ritrova a due ore di auto dal proprio albergo pur essendo sullo stesso comprensorio: è l’errore più comune di questa zona.",
      },
      { type: "titre2", texte: "Quale aeroporto scegliere" },
      {
        type: "liste",
        items: [
          "Torino Caselle — 109 km, circa 1 h 30. Autostrada fino a Verrès, poi 27 km di valle.",
          "Ginevra — 207 km, circa 3 h 05, attraverso il traforo del Monte Bianco.",
          "Milano Malpensa — su richiesta, circa 2 h 15: spesso la scelta di chi arriva da lontano.",
        ],
      },
      { type: "titre2", texte: "I 27 chilometri da Verrès" },
      {
        type: "paragraphe",
        texte:
          "Da Verrès (390 m) la strada sale a 1 570 m passando per Brusson e Antagnod. È stretta, con tornanti, e attraversa i paesi. Non è una strada difficile, ma è una strada di montagna vera: dal 15 novembre al 15 aprile le dotazioni invernali sono obbligatorie, e i nostri veicoli hanno pneumatici invernali e catene a bordo.",
      },
      { type: "titre2", texte: "Champoluc, Frachey, Antagnod" },
      {
        type: "paragraphe",
        texte:
          "Frachey sta 4 km sopra Champoluc, dove parte la funivia per il Monterosa; Antagnod e Brusson più in basso. Sono pochi chilometri ma su una strada lenta: indica il paese esatto in prenotazione.",
      },
      { type: "titre2", texte: "Cosa è incluso" },
      incluso,
    ],
    faq: [
      {
        question: "Quanto dura il transfer Torino – Champoluc?",
        reponse:
          "Circa 1 h 30 per 109 km, senza traffico. In un sabato di alta stagione conta mezz’ora in più sulla salita da Verrès.",
      },
      {
        question: "Posso raggiungere Gressoney da Champoluc in auto?",
        reponse:
          "Solo scendendo a fondovalle e risalendo l’altra valle: circa un’ora. Con gli impianti aperti si passa sciando in molto meno — ma per un transfer conta la strada, non la funivia.",
      },
      {
        question: "Arrivate anche a Frachey?",
        reponse: "Sì, 4 km sopra Champoluc, dove parte la funivia. Indicalo in prenotazione.",
      },
      {
        question: "Il prezzo cambia se siamo in sei?",
        reponse:
          "No, è per veicolo. Scegliamo la dimensione del veicolo in base a persone e bagagli che dichiari.",
      },
    ],
  },

  gressoney: {
    slug: "gressoney",
    metaTitre: "Transfer Gressoney | Torino 108 km, 1 h 40",
    metaDescription:
      "Transfer privato per Gressoney-La-Trinité e Saint-Jean da Torino (108 km, 1 h 40). Monterosa Ski, prezzo fisso per veicolo, sci inclusi.",
    h1: "Trasferimenti per Gressoney — la valle del Lys",
    chapo:
      "Gressoney sta nella valle del Lys, al centro del Monterosa Ski, e si raggiunge uscendo dall’autostrada a Pont-Saint-Martin: 108 km da Torino, circa 1 h 40, di cui 35 km di valle. Saint-Jean sta a 1 385 m, La-Trinité a 1 637 m: dodici chilometri e venti minuti separano i due — un dettaglio che conta in prenotazione.",
    contenu: [
      {
        type: "paragraphe",
        texte:
          "La valle del Lys è la più lunga delle tre valli del Monterosa, e la più isolata: nessun collegamento stradale in quota con Ayas o Alagna, solo il fondovalle. Chi prenota per «Monterosa» senza dire quale valle rischia di finire a un’ora dal proprio albergo.",
      },
      { type: "titre2", texte: "Quale aeroporto scegliere" },
      {
        type: "liste",
        items: [
          "Torino Caselle — 108 km, circa 1 h 40. Autostrada fino a Pont-Saint-Martin, poi 35 km di valle.",
          "Milano Malpensa — su richiesta, circa 2 h. Spesso la scelta più comoda per chi arriva dall’estero.",
          "Ginevra — su richiesta, attraverso il traforo del Monte Bianco.",
        ],
      },
      { type: "titre2", texte: "I 35 chilometri da Pont-Saint-Martin" },
      {
        type: "paragraphe",
        texte:
          "Da 345 m si sale a 1 637 m su una strada regionale stretta che attraversa Issime e Gaby. È spazzata tutta la stagione, ma dopo Gaby è il tratto in cui si mettono le catene dopo una nevicata. I nostri veicoli le portano a bordo.",
      },
      { type: "titre2", texte: "Saint-Jean o La-Trinité" },
      {
        type: "paragraphe",
        texte:
          "Saint-Jean è il paese più grande, con negozi e servizi; La-Trinité, dodici chilometri più su, è dove partono gli impianti verso il Monterosa e dove stanno la maggior parte degli hotel sciistici. Indica quale dei due, e la via: gli ultimi venti minuti dipendono da questo.",
      },
      { type: "titre2", texte: "Cosa è incluso" },
      incluso,
    ],
    faq: [
      {
        question: "Quanto dura il transfer Torino – Gressoney?",
        reponse:
          "Circa 1 h 40 per 108 km fino a La-Trinité, senza traffico. In alta stagione conta mezz’ora in più.",
      },
      {
        question: "Che differenza c’è tra Saint-Jean e La-Trinité?",
        reponse:
          "Dodici chilometri e circa venti minuti. La-Trinité è più in alto e più vicina agli impianti del Monterosa.",
      },
      {
        question: "Si può passare in auto a Champoluc o Alagna?",
        reponse:
          "No, non in quota. Bisogna scendere a fondovalle e risalire l’altra valle: circa un’ora per Champoluc.",
      },
      {
        question: "Servono le catene?",
        reponse:
          "Dopo una nevicata, nel tratto sopra Gaby, spesso sì. Le abbiamo a bordo e le montiamo senza supplemento.",
      },
    ],
  },

  "la-thuile": {
    slug: "la-thuile",
    metaTitre: "Transfer La Thuile | Ginevra 133 km, 2 h 35",
    metaDescription:
      "Transfer privato per La Thuile da Ginevra (133 km, 2 h 35) attraverso il traforo del Monte Bianco. Prezzo fisso per veicolo, pedaggi inclusi.",
    h1: "Trasferimenti per La Thuile — l’Espace San Bernardo",
    chapo:
      "La Thuile sta a 1 441 m all’imbocco italiano del Piccolo San Bernardo, collegata sci ai piedi con La Rosière in Francia. Da Ginevra sono 133 km e circa 2 h 35, attraverso il traforo del Monte Bianco e poi 15 km di salita da Pré-Saint-Didier. Pedaggio del traforo compreso nel prezzo.",
    contenu: [
      {
        type: "paragraphe",
        texte:
          "La Thuile è italiana ma vive tra due Paesi: il suo comprensorio scavalca il colle e scende su La Rosière. D’inverno però il colle è chiuso al traffico — sci sì, auto no. Chi arriva dalla Francia in auto fa il giro dal Monte Bianco.",
      },
      { type: "titre2", texte: "Quale aeroporto scegliere" },
      {
        type: "liste",
        items: [
          "Ginevra — 133 km, circa 2 h 35, attraverso il traforo del Monte Bianco.",
          "Torino Caselle — 168 km, circa 2 h 35 su richiesta, tutta in Italia lungo la Dora Baltea.",
          "Milano Malpensa — su richiesta, circa 3 h.",
        ],
      },
      { type: "titre2", texte: "I 15 chilometri da Pré-Saint-Didier" },
      {
        type: "paragraphe",
        texte:
          "Da Pré-Saint-Didier (1 000 m) la strada sale a 1 441 m in una serie di tornanti larghi, spazzati con priorità perché è l’unica via d’accesso al paese. È una salita corta ma esposta: dopo una nevicata è il tratto delle catene, che i nostri veicoli portano a bordo.",
      },
      { type: "titre2", texte: "Il Piccolo San Bernardo d’inverno" },
      {
        type: "paragraphe",
        texte:
          "Il colle è chiuso da novembre a maggio. Se il tuo volo atterra a Ginevra e il tuo alloggio è a La Rosière, non si passa da qui: sono due transfer diversi, e te lo diciamo prima di prenotare.",
      },
      { type: "titre2", texte: "Cosa è incluso" },
      incluso,
    ],
    faq: [
      {
        question: "Quanto dura il transfer Ginevra – La Thuile?",
        reponse:
          "Circa 2 h 35 per 133 km, traforo del Monte Bianco compreso. In alta stagione al traforo si può fare coda.",
      },
      {
        question: "Il pedaggio del traforo è compreso?",
        reponse: "Sì, come ogni pedaggio del percorso.",
      },
      {
        question: "Si può passare il Piccolo San Bernardo d’inverno?",
        reponse:
          "No, il colle è chiuso da novembre a maggio. Da e per la Francia si passa dal traforo del Monte Bianco.",
      },
      {
        question: "Arrivate anche a Pré-Saint-Didier e Morgex?",
        reponse: "Sì, sono sulla stessa strada, più a valle. Indica l’indirizzo in prenotazione.",
      },
    ],
  },

  montgenevre: {
    slug: "monginevro",
    nom: "Monginevro",
    metaTitre: "Transfer Monginevro | Torino 105 km, 1 h 40",
    metaDescription:
      "Transfer privato per Monginevro da Torino (105 km, 1 h 40). Via Lattea, valico aperto tutto l’anno, prezzo fisso per veicolo, sci inclusi.",
    h1: "Trasferimenti per Monginevro",
    chapo:
      "Monginevro è francese ma si raggiunge dall’Italia: 105 km da Torino, circa 1 h 40, uscita autostradale a Oulx e poi la statale per Cesana e il colle a 1 860 m. È il valico alpino più basso tra Italia e Francia, aperto tutto l’anno, e fa parte della Via Lattea insieme a Sestriere e Sauze d’Oulx.",
    contenu: [
      {
        type: "paragraphe",
        texte:
          "Il confine passa in mezzo al paese, e per lo sciatore non cambia nulla: stesso comprensorio, stessi impianti, stesso skipass Via Lattea. Per il transfer cambia una cosa sola — porta un documento, anche se il controllo è raro.",
      },
      { type: "titre2", texte: "Quale aeroporto scegliere" },
      {
        type: "liste",
        items: [
          "Torino Caselle — 105 km, circa 1 h 40. L’aeroporto più vicino, e più vicino di qualsiasi aeroporto francese.",
          "Milano Malpensa — su richiesta, circa 2 h 45.",
          "Ginevra — su richiesta, circa 3 h 30 attraverso il traforo del Monte Bianco.",
        ],
      },
      {
        type: "paragraphe",
        texte:
          "Vale la pena sottolinearlo, perché molti sciatori francesi e britannici non lo sanno: per Monginevro e Serre Chevalier, Torino è più vicino di Lione e di Grenoble. È uno dei casi in cui l’aeroporto «sbagliato» sulla carta è quello giusto sulla strada.",
      },
      { type: "titre2", texte: "Il colle" },
      {
        type: "paragraphe",
        texte:
          "A 1 860 m, il Monginevro è il valico alpino più basso tra i due Paesi e resta aperto tutto l’anno. Viene spazzato con priorità da entrambi i lati; le chiusure sono rare e brevi. Dal lato italiano la salita da Cesana è breve e larga, dal lato francese scende verso Briançon.",
      },
      { type: "titre2", texte: "Regole invernali su due Paesi" },
      {
        type: "paragraphe",
        texte:
          "In Italia le dotazioni invernali sono obbligatorie dal 15 novembre al 15 aprile sulle strade indicate; in Francia, nei comuni montani designati, dal 1° novembre al 31 marzo. I nostri veicoli soddisfano entrambe le regole, con pneumatici invernali e catene a bordo.",
      },
      { type: "titre2", texte: "Cosa è incluso" },
      incluso,
    ],
    faq: [
      {
        question: "Quanto dura il transfer Torino – Monginevro?",
        reponse:
          "Circa 1 h 40 per 105 km, senza traffico. In un sabato di alta stagione conta mezz’ora in più sulla Val di Susa.",
      },
      {
        question: "Serve il passaporto per il confine?",
        reponse:
          "No, Italia e Francia sono nello spazio Schengen. Porta comunque un documento d’identità: i controlli sono rari ma possibili.",
      },
      {
        question: "Il colle è aperto d’inverno?",
        reponse:
          "Sì, tutto l’anno. È il valico più basso tra i due Paesi ed è spazzato con priorità; le chiusure sono rare e brevi.",
      },
      {
        question: "Lo skipass copre anche Sestriere?",
        reponse:
          "Il comprensorio Via Lattea collega Monginevro, Claviere, Cesana, Sansicario, Sauze d’Oulx e Sestriere con gli impianti. Su strada, però, sono paesi distinti.",
      },
    ],
  },

  "serre-chevalier": {
    slug: "serre-chevalier",
    metaTitre: "Transfer Serre Chevalier | Torino 131 km, 2 h 45",
    metaDescription:
      "Transfer privato per Serre Chevalier e Briançon da Torino (131 km, 2 h 45) via Monginevro. Prezzo fisso per veicolo, sci e pedaggi inclusi.",
    h1: "Trasferimenti per Serre Chevalier — da Torino, via Monginevro",
    chapo:
      "Serre Chevalier è francese, ma l’aeroporto più vicino è italiano: Torino dista 131 km e circa 2 h 45, contro le quattro ore abbondanti da Lione. Si passa dal Monginevro, il valico più basso tra i due Paesi, aperto tutto l’anno. Prezzo fisso per veicolo, pedaggi compresi.",
    contenu: [
      {
        type: "paragraphe",
        texte:
          "È il caso di scuola dell’aeroporto scelto male: chi prenota un volo per Lione perché la stazione è in Francia paga due ore di strada in più all’andata e altrettante al ritorno. Da Torino si arriva dal versante italiano, si valica a 1 860 m e si scende su Briançon.",
      },
      { type: "titre2", texte: "Quale aeroporto scegliere" },
      {
        type: "liste",
        items: [
          "Torino Caselle — 131 km, circa 2 h 45. Il più vicino, via Oulx, Cesana e Monginevro.",
          "Grenoble — circa 2 h 15 su richiesta, ma con voli quasi solo nei fine settimana d’inverno.",
          "Milano Malpensa e Ginevra — su richiesta, entrambe oltre le tre ore e mezza.",
        ],
      },
      { type: "titre2", texte: "La valle della Guisane" },
      {
        type: "paragraphe",
        texte:
          "Serre Chevalier non è un paese ma una valle: Briançon in fondo, poi Chantemerle, Villeneuve e Le Monêtier-les-Bains salendo verso il Lautaret. Sono quindici chilometri da un capo all’altro, e tra Briançon e Le Monêtier ci sono venti minuti. Indica il paese e la via, non «Serre Chevalier».",
      },
      { type: "titre2", texte: "Il valico e l’inverno" },
      {
        type: "paragraphe",
        texte:
          "Il Monginevro resta aperto tutto l’anno ed è spazzato con priorità dai due lati. Il colle del Lautaret, che porta verso Grenoble, è invece la strada che d’inverno viene chiusa più spesso: se il tuo itinerario passa da lì, il Monginevro è l’alternativa affidabile.",
      },
      { type: "titre2", texte: "Cosa è incluso" },
      incluso,
    ],
    faq: [
      {
        question: "Quanto dura il transfer Torino – Serre Chevalier?",
        reponse:
          "Circa 2 h 45 per 131 km, senza traffico. In un sabato di alta stagione conta mezz’ora in più.",
      },
      {
        question: "Perché Torino e non Lione?",
        reponse:
          "Perché è più vicino: 131 km contro oltre 250, e due ore di strada in meno per tratta. Il confine non è un ostacolo, il Monginevro è aperto tutto l’anno.",
      },
      {
        question: "Quale paese della valle indicare?",
        reponse:
          "Briançon, Chantemerle, Villeneuve o Le Monêtier-les-Bains: sono quindici chilometri da un capo all’altro, e venti minuti di differenza.",
      },
      {
        question: "Serve un documento per il confine?",
        reponse:
          "Italia e Francia sono nello spazio Schengen, quindi non serve un passaporto, ma porta un documento d’identità.",
      },
    ],
  },

  "alagna-valsesia": {
    slug: "alagna-valsesia",
    metaTitre: "Transfer Alagna Valsesia | Malpensa 110 km, 1 h 50",
    metaDescription:
      "Transfer privato per Alagna Valsesia da Milano Malpensa (110 km, 1 h 50). Monterosa Ski, prezzo fisso per veicolo, sci e pedaggi inclusi.",
    h1: "Trasferimenti per Alagna Valsesia",
    chapo:
      "Alagna sta a 1 191 m in fondo alla Valsesia, sul versante piemontese del Monterosa. Milano Malpensa è l’aeroporto di riferimento: 110 km e circa 1 h 50, uscita a Romagnano Sesia e poi 50 km di valle. È la più lunga risalita di valle delle tre porte del Monterosa, e la più tranquilla.",
    contenu: [
      {
        type: "paragraphe",
        texte:
          "Alagna è un paese walser di poche centinaia di abitanti che si è ritrovato collegato a un comprensorio enorme. La strada, però, è rimasta quella di prima: cinquanta chilometri di valle stretta, senza scorciatoie.",
      },
      { type: "titre2", texte: "Quale aeroporto scegliere" },
      {
        type: "liste",
        items: [
          "Milano Malpensa — 110 km, circa 1 h 50. Il più vicino, e con il maggior numero di voli internazionali.",
          "Torino Caselle — su richiesta, circa 2 h 15 per Vercelli e Varallo.",
          "Milano Linate e Bergamo — su richiesta, entrambi oltre le due ore.",
        ],
      },
      { type: "titre2", texte: "I 50 chilometri della Valsesia" },
      {
        type: "paragraphe",
        texte:
          "Da Romagnano Sesia la strada risale il fiume per Varallo, Balmuccia e Riva Valdobbia. È stretta, con molti attraversamenti di paese e pochi tratti veloci: i cinquanta chilometri richiedono un’ora piena. Dopo Riva Valdobbia, in caso di neve, è il tratto delle catene — che i nostri veicoli portano a bordo.",
      },
      { type: "titre2", texte: "Il Monterosa da questo lato" },
      {
        type: "paragraphe",
        texte:
          "Alagna è collegata a Gressoney e Champoluc con gli impianti, non con la strada: per raggiungerle in auto bisogna scendere fino in pianura e risalire, oltre due ore. Se prenoti un alloggio «sul Monterosa», verifica in quale delle tre valli si trova prima di prenotare il transfer.",
      },
      { type: "titre2", texte: "Cosa è incluso" },
      incluso,
    ],
    faq: [
      {
        question: "Quanto dura il transfer Malpensa – Alagna?",
        reponse:
          "Circa 1 h 50 per 110 km, senza traffico. La seconda metà è tutta strada di valle: è lì che si perde tempo, non in autostrada.",
      },
      {
        question: "Posso raggiungere Champoluc o Gressoney da Alagna in auto?",
        reponse:
          "Solo scendendo in pianura e risalendo: oltre due ore. Con gli impianti aperti si passa sciando in molto meno.",
      },
      {
        question: "Arrivate anche a Riva Valdobbia e Varallo?",
        reponse: "Sì, sono sulla stessa strada. Indica l’indirizzo in prenotazione.",
      },
      {
        question: "Il prezzo comprende i pedaggi?",
        reponse: "Sì, come le sacche da sci e i seggiolini. Il prezzo che leggi è quello che paghi.",
      },
    ],
  },

  "selva-val-gardena": {
    slug: "selva-di-val-gardena",
    nom: "Selva di Val Gardena",
    metaTitre: "Transfer Selva di Val Gardena | Innsbruck 120 km",
    metaDescription:
      "Transfer privato per Selva di Val Gardena da Innsbruck (120 km, 1 h 50) via Brennero. Dolomiti Superski, prezzo fisso per veicolo, sci inclusi.",
    h1: "Trasferimenti per Selva di Val Gardena",
    chapo:
      "Selva sta a 1 563 m in fondo alla Val Gardena, nel cuore del Dolomiti Superski. L’aeroporto più vicino non è italiano: Innsbruck dista 120 km e circa 1 h 50 attraverso il Brennero, contro le tre ore abbondanti da Verona o Bergamo. Prezzo fisso per veicolo, pedaggi e sacche da sci compresi.",
    contenu: [
      {
        type: "paragraphe",
        texte:
          "La Val Gardena guarda a sud ma si raggiunge da nord: l’autostrada del Brennero passa a venti chilometri dall’imbocco della valle, e da Innsbruck ci si arriva in meno di due ore. È un’asimmetria che sorprende chi prenota il volo prima di guardare la strada.",
      },
      { type: "titre2", texte: "Quale aeroporto scegliere" },
      {
        type: "liste",
        items: [
          "Innsbruck — 120 km, circa 1 h 50, via Brennero e Chiusa. Il più vicino, e con voli invernali dedicati allo sci.",
          "Verona — 194 km, circa 2 h 30 su richiesta: la porta italiana delle Dolomiti.",
          "Bergamo — 274 km, circa 3 h 15 su richiesta, con i voli low cost.",
        ],
      },
      { type: "titre2", texte: "Il Brennero e la Valle Isarco" },
      {
        type: "paragraphe",
        texte:
          "Da Innsbruck l’autostrada sale al Brennero (1 370 m) e scende sulla Valle Isarco fino a Chiusa; da lì si risalgono 25 km di Val Gardena per Ortisei e Santa Cristina. Il valico è autostradale e aperto tutto l’anno; il pedaggio austriaco e quello italiano sono compresi nel prezzo.",
      },
      { type: "titre2", texte: "Ortisei, Santa Cristina, Selva" },
      {
        type: "paragraphe",
        texte:
          "I tre paesi della valle si susseguono sulla stessa strada, a cinque minuti l’uno dall’altro, e in Val Gardena ognuno ha tre nomi — italiano, tedesco e ladino. Selva è Wolkenstein, Ortisei è St. Ulrich, Santa Cristina è St. Christina. Indica l’indirizzo esatto: gli albergatori usano spesso il nome tedesco.",
      },
      { type: "titre2", texte: "Cosa è incluso" },
      incluso,
    ],
    faq: [
      {
        question: "Quanto dura il transfer Innsbruck – Selva?",
        reponse:
          "Circa 1 h 50 per 120 km, senza traffico. Al Brennero, nei fine settimana di alta stagione, si può perdere mezz’ora.",
      },
      {
        question: "Perché Innsbruck e non Verona?",
        reponse:
          "Perché è più vicino: 120 km contro 194, e quaranta minuti in meno. Verona resta una buona alternativa se il volo è nettamente migliore.",
      },
      {
        question: "I pedaggi del Brennero sono compresi?",
        reponse: "Sì, come la vignetta austriaca e ogni pedaggio del percorso.",
      },
      {
        question: "Arrivate anche a Ortisei e Santa Cristina?",
        reponse:
          "Sì, sono sulla stessa strada, a pochi minuti. Indica il nome del paese e dell’albergo: in valle ogni luogo ha tre nomi.",
      },
    ],
  },
};
