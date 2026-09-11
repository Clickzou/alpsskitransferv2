-- Migration du 11 septembre 2026 — les adresses en station, demandées après le paiement
--
-- À exécuter une fois dans l'éditeur SQL du projet Supabase, **avant** de
-- déployer le code qui les écrit : sans ces colonnes, PostgREST refuse toute la
-- mise à jour, et le client qui indique son adresse reçoit « nous n'avons pas
-- pu l'enregistrer ».
--
-- ## Pourquoi après le paiement
--
-- Décision de JC, 11 septembre 2026 : l'adresse est obligatoire — sans elle,
-- le chauffeur ne sait ni où déposer le client ni où venir le chercher — mais
-- la demander avant l'achat alourdit le tunnel. Elle se demande donc juste
-- après, sur la page de confirmation et dans l'e-mail, par le lien signé
-- « gérer ma réservation ». Le back-office signale en rouge celles qui manquent.
--
-- ## Pourquoi deux adresses
--
-- `adresse` ne disait que la dépose de l'aller. Un client qui repart d'une
-- autre station — arriver aux Gets, repartir de l'Alpe d'Huez — n'avait
-- aucune adresse de prise en charge au retour. `adresse_retour` vaut `null`
-- quand le retour repart de la même adresse qu'à l'aller.

alter table reservations
  add column if not exists adresse_retour text,   -- null = même adresse qu'à l'aller
  add column if not exists vol_retour     text;   -- le vol du départ, pour caler la prise en charge
