-- Schéma Supabase du moteur de réservation — alpsskitransfers.com
--
-- À exécuter une fois dans l'éditeur SQL du projet Supabase. Le site écrit avec
-- la clé de service depuis ses route handlers ; aucune écriture ne vient du
-- navigateur, d'où des politiques RLS fermées : rien n'est lisible ni écrivable
-- avec la clé publique.
--
-- Les montants sont en euros, en `numeric` — jamais en flottant : un centime
-- perdu à l'arrondi sur une réservation, c'est une réconciliation impossible.

create table if not exists reservations (
  id            uuid primary key default gen_random_uuid(),
  reference     text not null unique,              -- AST-4F7K2Q, dite au téléphone
  statut        text not null default 'devis-a-confirmer',
                -- devis-a-confirmer · en-attente-paiement · payee · annulee
  airport       text not null,                     -- slug du registre des aéroports
  resort        text not null,                     -- slug du registre des stations
  vehicule      text not null,                     -- standard · business · premium
  vehicule_retour text,                            -- null = même véhicule qu'à l'aller
  passagers     smallint not null check (passagers between 1 and 16),
  passagers_retour smallint                        -- null = le groupe ne change pas
                check (passagers_retour is null or passagers_retour between 1 and 16),
  aller         timestamptz not null,
  retour        timestamptz,                       -- null = aller simple
  retour_airport text,                             -- slug, null = même qu'à l'aller
  retour_resort  text,                             -- slug, null = même qu'à l'aller
  montant       numeric(10, 2) not null,
  devise        text not null default 'EUR',
  client_nom    text not null,
  client_email  text not null,
  client_telephone text not null,
  vol           text,
  adresse       text not null,                     -- adresse exacte en station, à l'aller
  adresse_retour text,                             -- null = même adresse qu'à l'aller
  vol_retour    text,                              -- demandés après le paiement
  langue        text,                              -- en · fr · de · it, pour écrire au client
  bagages_ski   smallint not null default 0,
  enfants       text,                              -- âges, pour les bons sièges
  message       text,
  session_stripe   text,
  paiement_stripe  text,
  paye_le       timestamptz,
  cree_le       timestamptz not null default now()
);

-- Le back-office liste les courses à venir : c'est l'index qui compte.
create index if not exists reservations_aller_idx on reservations (aller);
create index if not exists reservations_statut_idx on reservations (statut);

create table if not exists paiements (
  id            uuid primary key default gen_random_uuid(),
  reference     text references reservations (reference),
  session_stripe   text,
  paiement_stripe  text,
  montant       numeric(10, 2),
  devise        text not null default 'EUR',
  statut        text not null,                     -- paye · rembourse
  cree_le       timestamptz not null default now()
);

-- Une session Stripe ne paie qu'une fois. Le webhook vérifie déjà qu'il n'a pas
-- traité l'événement, mais deux rejeux simultanés passeraient tous deux la
-- vérification avant que l'un ait écrit : c'est la base qui tranche, et elle
-- seule peut le faire sans condition de course.
create unique index if not exists paiements_session_idx
  on paiements (session_stripe)
  where session_stripe is not null;

-- Grille tarifaire éditable depuis le back-office : changer un prix ne doit
-- jamais demander un déploiement. Tant que la table est vide, le site applique
-- le barème de `src/lib/tarification/bareme.ts`.
create table if not exists tarifs (
  id            uuid primary key default gen_random_uuid(),
  airport       text not null,
  resort        text not null,
  vehicule      text not null,
  type_jour     text not null default 'semaine',   -- semaine · samedi · dimanche
  prix          numeric(10, 2) not null,
  capacite      smallint not null default 8,
  valide        boolean not null default false,    -- confirmé par le client
  maj_le        timestamptz not null default now(),
  unique (airport, resort, vehicule, type_jour)
);

-- Les demandes de changement faites depuis le lien de gestion, et leur sort :
-- une heure se demande et l'exploitant la valide ; le vol s'applique tout de
-- suite. Voir `supabase-migration-modifications.sql`.
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
  traite_le     timestamptz,
  traite_par    text
);

create index if not exists modifications_reference_idx
  on modifications (reference, cree_le);
create index if not exists modifications_attente_idx
  on modifications (statut)
  where statut = 'en-attente';

-- Row Level Security : tout est fermé, seule la clé de service écrit et lit.
alter table reservations  enable row level security;
alter table paiements     enable row level security;
alter table tarifs        enable row level security;
alter table modifications enable row level security;
