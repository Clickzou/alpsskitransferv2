-- Migration du 10 septembre 2026 — les lieux du retour
--
-- À exécuter une fois dans l'éditeur SQL du projet Supabase, **avant** de
-- déployer le code qui les écrit. La table ne gardait du retour que sa date et,
-- depuis le 10 septembre, son effectif : ni d'où il part, ni où il arrive.
--
-- Ce qui manquait se voit dans l'avis de course reçu par l'exploitant :
--
--   TRAJET  : Geneva Airport → Les Gets
--   Retour  : mar. 22 déc., 23:36 · 7 passager(s)
--
-- Le retour partait d'Alpe d'Huez. Le chauffeur serait allé aux Gets, à
-- 150 kilomètres de là, à 23 h 36 en décembre. Un aller-retour asymétrique
-- pouvait donc être vendu, encaissé, et rester inexécutable — le tunnel
-- proposait la saisie, le prix la comptait, et la course l'oubliait.
--
-- Les deux colonnes sont nullables : sur un aller-retour symétrique, le retour
-- reprend les lieux de l'aller inversés, et l'absence dit exactement cela.

alter table reservations
  add column if not exists retour_airport text,   -- slug, null = même qu'à l'aller
  add column if not exists retour_resort  text;   -- slug, null = même qu'à l'aller
