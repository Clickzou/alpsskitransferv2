-- Migration du 11 septembre 2026 — la langue du client
--
-- À exécuter une fois dans l'éditeur SQL du projet Supabase, **avant** de
-- déployer le code qui l'écrit : sans cette colonne, PostgREST refuse toute la
-- ligne, et **aucune réservation ne s'enregistre** — le client partirait payer
-- une course que la base ne connaît pas.
--
-- La langue ne vivait que dans les métadonnées de la session Stripe, le temps
-- du paiement. La relance automatique — « il nous manque votre adresse », trois
-- jours avant — part sans session : elle a besoin de savoir, depuis la base
-- seule, dans quelle langue écrire. Les réservations antérieures restent à
-- `null` et reçoivent l'anglais.

alter table reservations
  add column if not exists langue text;   -- en · fr · de · it
