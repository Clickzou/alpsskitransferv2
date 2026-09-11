-- Migration du 11 septembre 2026 — les réservations prises au téléphone
--
-- À exécuter une fois dans l'éditeur SQL du projet Supabase, **avant** de
-- déployer le code qui les écrit. Le tunnel du site n'écrit pas ces colonnes —
-- leurs valeurs par défaut suffisent —, mais la saisie téléphonique du
-- back-office les écrit toutes : sans elles, elle échouerait.
--
-- ## Pourquoi
--
-- Demande de JC, 11 septembre 2026 : la plupart des réservations arrivent
-- encore par téléphone. L'exploitant les saisit dans le back-office, champ par
-- champ comme le client sur le site, puis envoie un lien de paiement par carte
-- ou demande un virement ; la facture suit dans les deux cas.
--
-- Il faut donc savoir d'où vient une réservation, et comment elle se paie : une
-- réservation téléphonique en attente de virement n'est pas un « paiement non
-- abouti » — c'est une vraie course, à assurer, dont l'argent arrive par la
-- banque. Et la facture Stripe d'une réservation téléphonique se garde, pour
-- la marquer payée à réception du virement.

alter table reservations
  add column if not exists source         text not null default 'site',  -- site · telephone
  add column if not exists mode_paiement  text,                          -- carte · virement
  add column if not exists facture_stripe text;                          -- in_… : facture d'une réservation téléphonique
