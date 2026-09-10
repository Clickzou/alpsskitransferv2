-- Le groupe du retour, quand il diffère de celui de l'aller.
--
-- À exécuter une fois dans l'éditeur SQL du projet Supabase, AVANT de déployer
-- le code qui écrit cette colonne : PostgREST rejette une colonne inconnue, et
-- toutes les réservations aller-retour échoueraient dans l'intervalle.
--
-- Pourquoi une colonne plutôt qu'une note
--
-- Une personne repart plus tôt, un enfant reste une semaine de plus : le groupe
-- du retour n'est pas toujours celui de l'aller. Cela ne change pas le prix, qui
-- est calculé par véhicule. Cela change le véhicule à envoyer — la capacité
-- retenue est celle du trajet le plus chargé — et ce que le chauffeur doit
-- savoir en préparant sa journée. Une information qui décide du véhicule se
-- range dans une colonne, pas dans un champ de texte libre qu'aucune requête
-- ne sait lire.
--
-- `null` veut dire « le groupe ne change pas », et non « zéro passager » : le
-- retour reprend alors le nombre de l'aller. C'est ce qui permet d'ajouter la
-- colonne sans rien réécrire des réservations déjà enregistrées.

alter table reservations
  add column if not exists passagers_retour smallint
  check (passagers_retour is null or passagers_retour between 1 and 16);

comment on column reservations.passagers_retour is
  'Passagers au retour quand ils diffèrent de l''aller. null = groupe inchangé.';
