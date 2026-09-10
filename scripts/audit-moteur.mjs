/**
 * Audit du modèle de réservation : tous les cas où les nombres peuvent diverger.
 *
 * On envoie au serveur ce qu'un navigateur manipulé pourrait envoyer, et on
 * vérifie qu'il refuse — ou accepte — pour la bonne raison.
 */
const BASE = process.argv[2] ?? "http://localhost:3003";

const base = {
  from: "geneva-airport",
  to: "les-gets",
  when: "2026-12-18T20:32",
  passengers: 4,
  bags: 2,
  skis: 2,
  vehicle: "standard",
  langue: "en",
  client: { nom: "Audit", email: "a@b.fr", telephone: "0600000000" },
};

const cas = [
  {
    nom: "4 passagers, Premium (4 places)",
    corps: { ...base, vehicle: "premium" },
    attendu: "prix",
  },
  {
    nom: "5 passagers, Premium (4 places) — forcé",
    corps: { ...base, passengers: 5, vehicle: "premium" },
    attendu: "refus",
  },
  {
    nom: "9 passagers",
    corps: { ...base, passengers: 9 },
    attendu: "refus",
  },
  {
    nom: "0 passager",
    corps: { ...base, passengers: 0 },
    attendu: "refus",
  },
  {
    nom: "14 bagages en Standard (12 max)",
    corps: { ...base, bags: 10, skis: 4 },
    attendu: "refus",
  },
  {
    nom: "retour à 9 personnes",
    corps: { ...base, returnWhen: "2026-12-22T23:36", returnPassengers: 9 },
    attendu: "refus",
  },
  {
    nom: "retour à 7 en Premium — forcé",
    corps: {
      ...base,
      returnWhen: "2026-12-22T23:36",
      returnPassengers: 7,
      vehicleReturn: "premium",
    },
    attendu: "refus",
  },
  {
    nom: "retour à 7 en Standard, aller à 2 en Premium",
    corps: {
      ...base,
      passengers: 2,
      vehicle: "premium",
      returnWhen: "2026-12-22T23:36",
      returnPassengers: 7,
      vehicleReturn: "standard",
    },
    attendu: "prix",
  },
  {
    nom: "5 enfants pour 4 passagers",
    corps: { ...base, client: { ...base.client, enfantsNombre: "5" } },
    attendu: "refus",
  },
  {
    nom: "4 enfants pour 4 passagers",
    corps: { ...base, client: { ...base.client, enfantsNombre: "4" } },
    attendu: "prix",
  },
  {
    nom: "enfants au retour dépassant le groupe du retour",
    corps: {
      ...base,
      returnWhen: "2026-12-22T23:36",
      returnPassengers: 2,
      client: { ...base.client, enfantsNombreRetour: "3" },
    },
    attendu: "refus",
  },
  {
    nom: "retour avant l'aller",
    corps: { ...base, returnWhen: "2026-12-01T10:00" },
    attendu: "refus",
  },
  {
    nom: "catégorie inconnue",
    corps: { ...base, vehicle: "limousine" },
    attendu: "prix", // retombe sur standard, comme prévu par validerDemande
  },
];

let echecs = 0;
for (const c of cas) {
  const reponse = await fetch(`${BASE}/api/reservation/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(c.corps),
  });
  const donnees = await reponse.json();
  /* La route accepte quand elle rend une référence, refuse quand elle rend une erreur. */
  const accepte = Boolean(donnees.reference) && !donnees.devisSurMesure;
  const obtenu = accepte ? "prix" : "refus";
  const ok = obtenu === c.attendu;
  if (!ok) echecs += 1;
  const detail = accepte ? `acceptée ${donnees.reference}` : donnees.erreur;
  console.log(`${ok ? "  ok " : "ÉCHEC"} · ${c.nom}\n        → ${detail}`);
}
console.log(echecs === 0 ? "\nTous les cas se comportent comme attendu." : `\n${echecs} cas divergent.`);
