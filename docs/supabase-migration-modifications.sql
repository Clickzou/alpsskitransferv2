-- Migration du 11 septembre 2026 — les demandes de changement, et leur historique
--
-- À exécuter une fois dans l'éditeur SQL du projet Supabase, **avant** de
-- déployer le code qui l'écrit : une demande d'horaire vit dans cette table et
-- nulle part ailleurs. Sans elle, le client qui demande une autre heure reçoit
-- « nous n'avons pas pu enregistrer » — rien n'est perdu, mais rien ne passe.
--
-- ## Pourquoi une demande, et pas une modification
--
-- Décision de JC, 11 septembre 2026 : un changement d'horaire passe par
-- l'exploitant. Le client propose une heure depuis son lien de gestion ; la
-- réservation ne bouge pas ; l'exploitant reçoit un e-mail qui mène à la fiche
-- du client, valide ou refuse, et le client reçoit la réponse par e-mail. Tant
-- que rien n'est validé, l'heure d'origine tient : c'est celle que le chauffeur
-- a dans sa journée.
--
-- ## Pourquoi un historique
--
-- `reservations` ne garde que la valeur retenue. Trois jours plus tard, au
-- téléphone avec un client qui dit « j'avais réservé pour 14 h », l'exploitant
-- doit voir qui a demandé quoi, quand, et ce qu'il en a décidé.
--
-- Une ligne par champ : l'aller et le retour d'une même demande partagent un
-- `lot`, et se valident ensemble. Le numéro de vol s'applique tout de suite
-- (statut `appliquee`) ; les messages à moins de 24 heures sont `transmise`.

create table if not exists modifications (
  id            uuid primary key default gen_random_uuid(),
  reference     text not null references reservations (reference),
  lot           uuid,                              -- une demande : aller et retour ensemble
  champ         text not null,                     -- aller · retour · vol · demande
  ancien        text,                              -- ISO pour une heure, texte sinon
  nouveau       text,                              -- pour une demande à moins de 24 h : le message
  statut        text not null default 'appliquee',
                -- en-attente · acceptee · refusee · remplacee · appliquee · transmise
  langue        text,                              -- celle du client, pour lui répondre
  source        text not null default 'client',   -- client · exploitant
  cree_le       timestamptz not null default now(),
  traite_le     timestamptz,                       -- quand l'exploitant a tranché
  traite_par    text                               -- l'e-mail de celui qui a tranché
);

-- Le back-office relit l'historique d'une réservation, dans l'ordre.
create index if not exists modifications_reference_idx
  on modifications (reference, cree_le);

-- Et la liste des demandes à valider, en tête de l'écran.
create index if not exists modifications_attente_idx
  on modifications (statut)
  where statut = 'en-attente';

alter table modifications enable row level security;
