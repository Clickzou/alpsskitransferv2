-- Migration du 14 septembre 2026 — la veille des prix concurrents.
--
-- À exécuter dans l'éditeur SQL de Supabase. Sans ces tables, l'onglet
-- Concurrence reste vide et le relevé de nuit n'écrit rien ; le reste du site
-- n'en dépend pas.

-- Les trajets suivis. Vide, le relevé suit les 50 trajets par défaut
-- (`src/lib/concurrence/lieux.ts`) ; la première modification depuis l'onglet
-- les recopie ici.
create table if not exists concurrence_trajets (
  id        bigint generated always as identity primary key,
  airport   text not null,
  resort    text not null,
  ordre     integer not null default 0,
  cree_le   timestamptz not null default now(),
  unique (airport, resort)
);

-- Un prix relevé : un concurrent, un trajet, un jour, un groupe, une gamme.
-- Rejoué la même nuit, le relevé remplace ses lignes au lieu de les doubler.
create table if not exists concurrence_releves (
  id           bigint generated always as identity primary key,
  releve_le    date not null,                    -- la nuit du relevé, heure des Alpes
  airport      text not null,
  resort       text not null,
  jour         text not null,                    -- mercredi · samedi
  date_trajet  date not null,                    -- la date demandée au concurrent
  passagers    smallint not null,                -- 2 · 4 · 8
  source       text not null,                    -- alps2alps · alpy
  gamme        text not null,                    -- standard · premium
  prix         numeric(10, 2),                   -- en euros, par véhicule ; null = pas de prix
  detail       text,                             -- le véhicule proposé, ou pourquoi rien n'a été lu
  cree_le      timestamptz not null default now(),
  unique (releve_le, airport, resort, jour, passagers, source, gamme)
);

create index if not exists concurrence_releves_date_idx on concurrence_releves (releve_le);

alter table concurrence_trajets enable row level security;
alter table concurrence_releves enable row level security;
