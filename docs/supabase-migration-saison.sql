-- Migration du 15 septembre 2026 — les prix concurrents des dates de haute saison
--
-- À exécuter une fois dans l'éditeur SQL du projet Supabase. Sans cette table,
-- la partie « Haute saison » de l'onglet Concurrence reste vide et le dit.
--
-- ## Pourquoi une table à part
--
-- Demande de JC, 15 septembre 2026 : le relevé de chaque nuit demande les prix
-- à trois semaines, une date qui glisse tous les jours — on ne compare jamais
-- deux fois la même, et les jours qui comptent (Noël, février) ne sont jamais
-- relevés. Ce relevé-ci demande des dates fixes, tous les 15 jours, pour voir
-- comment les concurrents font monter leurs prix à l'approche des vacances.
--
-- À part du relevé de nuit, parce que celui-ci recale nos tarifs : mêler des
-- prix de Noël à l'alignement de tous les jours les tirerait vers le haut.

create table if not exists concurrence_saison (
  id           bigint generated always as identity primary key,
  releve_le    date not null,                    -- le jour du relevé, heure des Alpes
  airport      text not null,
  resort       text not null,
  date_trajet  date not null,                    -- la date fixe demandée (samedi de vacances…)
  passagers    smallint not null,                -- 4, le groupe de référence
  source       text not null,                    -- alps2alps · alpy
  gamme        text not null,                    -- standard · premium
  prix         numeric(10, 2),                   -- en euros, par véhicule ; null = pas de prix
  detail       text,                             -- le véhicule proposé, ou pourquoi rien n'a été lu
  cree_le      timestamptz not null default now(),
  unique (releve_le, airport, resort, date_trajet, passagers, source, gamme)
);

create index if not exists concurrence_saison_date_idx on concurrence_saison (date_trajet, releve_le);

alter table concurrence_saison enable row level security;
