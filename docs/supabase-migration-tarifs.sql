-- Migration du 14 septembre 2026 — l'onglet Tarifs, et les valises.
--
-- À exécuter dans l'éditeur SQL de Supabase AVANT de déployer : le site écrit
-- désormais le nombre de valises de chaque réservation, et sans la colonne
-- PostgREST refuse toute la ligne — plus aucune réservation ne s'enregistrerait.
-- La table des grilles, elle, peut manquer sans dommage : le site applique
-- alors le barème du code.

-- Une ligne par publication de la grille, jamais modifiée : la plus récente
-- fait les prix, les autres sont l'historique — et « revenir à cette version »
-- republie leur contenu.
create table if not exists grilles_tarifaires (
  id          bigint generated always as identity primary key,
  contenu     jsonb not null,                    -- barème, coefficients, prix fixes, saisons
  note        text,                              -- ce qui a changé, en une phrase
  publie_par  text not null,                     -- l'e-mail du compte du back-office
  publie_le   timestamptz not null default now()
);

alter table grilles_tarifaires enable row level security;

-- Les valises n'étaient enregistrées nulle part : le client les donnait, le
-- prix en tenait compte (capacité du coffre), et le chauffeur ne les voyait pas.
alter table reservations add column if not exists bagages smallint not null default 0;
