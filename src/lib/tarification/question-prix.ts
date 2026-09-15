import type { Lang } from "@/lib/i18n";

/**
 * La question que les gens posent aux assistants — « combien coûte un
 * transfert privé de Genève à l'Alpe d'Huez ? » — et sa réponse, sur chaque
 * page de trajet, dans sa langue (demande de JC, 15 septembre 2026).
 *
 * Une IA reprend volontiers une réponse courte, chiffrée, placée sous la
 * question exacte, et balisée en FAQ. Le prix est celui de `prixDepuis` : un
 * prix qu'on vend vraiment (Standard, en semaine, de jour, avec la grille
 * publiée), qui suit l'onglet Tarifs — jamais un chiffre recopié à la main qui
 * vieillirait.
 *
 * La réponse ne promet que ce que le tunnel tient : prix par véhicule, péages,
 * housses à skis, sièges enfants et suivi du vol compris, une heure d'attente,
 * majorations le week-end, la nuit et en haute saison.
 */

export interface QuestionReponse {
  question: string;
  reponse: string;
}

/** « à l’Alpe d’Huez », « aux Gets », « au Grand-Bornand », « à Val Thorens ». */
export function aFr(nom: string): string {
  if (/^Alpe d[’']Huez$/.test(nom)) return `à l’${nom}`;
  if (/^Les\s/.test(nom)) return `aux ${nom.slice(4)}`;
  if (/^Le\s/.test(nom)) return `au ${nom.slice(3)}`;
  return `à ${nom}`;
}

const TEXTES: Record<Lang, (depart: string, arrivee: string, prix: number) => QuestionReponse> = {
  en: (d, a, p) => ({
    question: `How much is a private transfer from ${d} to ${a}?`,
    reponse: `A private transfer from ${d} to ${a} starts from €${p} for the whole vehicle — a Standard minivan for up to 8 passengers, on a weekday in the daytime. The price is fixed per vehicle, not per person, and includes tolls, ski bags, child seats, flight tracking and one hour of waiting. Weekend, night-time and peak-season departures cost more, and larger or premium vehicles are quoted on the booking page, where you see the exact price for your date before paying.`,
  }),
  fr: (d, a, p) => ({
    question: `Combien coûte un transfert privé de ${d} ${aFr(a)} ?`,
    reponse: `Un transfert privé de ${d} ${aFr(a)} coûte à partir de ${p} € pour le véhicule entier — un minivan Standard jusqu’à 8 passagers, en semaine et de jour. Le prix est fixe et par véhicule, pas par personne : péages, housses à skis, sièges enfants, suivi du vol et une heure d’attente sont compris. Les départs le week-end, de nuit et en haute saison coûtent davantage ; le prix exact de votre date, et celui des véhicules Business et Premium, s’affichent sur la page de réservation avant tout paiement.`,
  }),
  de: (d, a, p) => ({
    question: `Was kostet ein privater Transfer von ${d} nach ${a}?`,
    reponse: `Ein privater Transfer von ${d} nach ${a} kostet ab ${p} € für das ganze Fahrzeug — einen Standard-Minivan für bis zu 8 Personen, werktags und tagsüber. Der Preis ist ein Festpreis pro Fahrzeug, nicht pro Person: Maut, Skisäcke, Kindersitze, Flugverfolgung und eine Stunde Wartezeit sind inbegriffen. Fahrten am Wochenende, nachts und in der Hochsaison kosten mehr; den genauen Preis für Ihr Datum und für Business- und Premium-Fahrzeuge sehen Sie auf der Buchungsseite, bevor Sie bezahlen.`,
  }),
  it: (d, a, p) => ({
    question: `Quanto costa un transfer privato da ${d} a ${a}?`,
    reponse: `Un transfer privato da ${d} a ${a} costa a partire da ${p} € per l’intero veicolo — un minivan Standard fino a 8 passeggeri, in un giorno feriale e di giorno. Il prezzo è fisso e per veicolo, non a persona: pedaggi, sacche da sci, seggiolini per bambini, monitoraggio del volo e un’ora di attesa sono inclusi. Le partenze nel fine settimana, di notte e in alta stagione costano di più; il prezzo esatto per la tua data, e quello dei veicoli Business e Premium, compare nella pagina di prenotazione prima di pagare.`,
  }),
};

export function questionPrix(lang: Lang, depart: string, arrivee: string, prix: number): QuestionReponse {
  return TEXTES[lang](depart, arrivee, prix);
}

/**
 * La FAQ d'un trajet avec la question du prix en tête. Une question de prix
 * déjà présente — la plupart des pages en ont une, « le prix dépend du
 * véhicule », sans chiffre — est remplacée plutôt que doublée.
 */
export function avecQuestionPrix<T extends QuestionReponse>(faq: T[], qr: QuestionReponse | null): QuestionReponse[] {
  if (!qr) return faq;
  const dejaPrix = /^(how much|what does .* cost|combien|quel est le prix|was kostet|wie viel|quanto costa|qual è il prezzo)/i;
  return [qr, ...faq.filter((f) => !dejaPrix.test(f.question.trim()))];
}

/** « From €276 per vehicle », pour les repères en tête de page. */
export const A_PARTIR_DE: Record<Lang, (prix: number) => string> = {
  en: (p) => `From €${p} per vehicle`,
  fr: (p) => `À partir de ${p} € par véhicule`,
  de: (p) => `Ab ${p} € pro Fahrzeug`,
  it: (p) => `Da ${p} € per veicolo`,
};

/** La fin du title traduit, quand elle tient dans 60 caractères. */
export const TITRE_PRIX: Record<Lang, (prix: number) => string> = {
  en: (p) => `from €${p}`,
  fr: (p) => `dès ${p} €`,
  de: (p) => `ab ${p} €`,
  it: (p) => `da ${p} €`,
};
