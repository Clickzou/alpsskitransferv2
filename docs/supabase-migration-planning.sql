-- Migration du 15 septembre 2026 — le planning : un chauffeur et une note par trajet
--
-- À exécuter une fois dans l'éditeur SQL du projet Supabase. Sans ces colonnes,
-- l'onglet Planning s'affiche mais ne peut rien enregistrer : il le dit.
--
-- ## Pourquoi par trajet, et pas par course
--
-- Demande de JC, 15 septembre 2026 : un onglet « Planning » où l'exploitant voit
-- les trajets de la semaine et du mois, et y inscrit le chauffeur et une note.
-- Un aller-retour, ce sont deux trajets, souvent à une semaine d'écart : ce
-- n'est pas forcément le même chauffeur qui fait l'aller et le retour. Chaque
-- sens a donc sa colonne, comme l'adresse et le vol.
--
-- Le chauffeur est un nom libre : pas de table des chauffeurs tant qu'il n'y en
-- a que quelques-uns. Le planning propose les noms déjà saisis.

alter table reservations
  add column if not exists chauffeur            text,   -- l'aller
  add column if not exists chauffeur_retour     text,   -- le retour
  add column if not exists note_planning        text,   -- note interne, jamais montrée au client
  add column if not exists note_planning_retour text;
