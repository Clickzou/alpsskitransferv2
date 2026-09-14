-- Migration du 14 septembre 2026 — la limite de devis par visiteur.
--
-- Sans elle, le site fonctionne : la limite ne s'applique simplement pas.
-- Une limite qui tombe ne doit jamais empêcher un client de voir un prix.

-- Un compteur par visiteur et par heure. La clé est une empreinte de l'adresse
-- IP, jamais l'adresse elle-même : on compte, on n'identifie personne.
create table if not exists limites_demandes (
  cle      text primary key,                     -- empreinte|2026-09-14T21
  nombre   integer not null default 0,
  fenetre  timestamptz not null default now()
);

alter table limites_demandes enable row level security;

-- Compte une demande et rend le total de l'heure, en une seule écriture : deux
-- demandes simultanées ne peuvent pas lire le même compteur. Une fois sur cent,
-- elle efface les heures de la veille.
create or replace function compter_demande(p_cle text) returns integer
language plpgsql as $$
declare
  total integer;
begin
  insert into limites_demandes (cle, nombre) values (p_cle, 1)
  on conflict (cle) do update set nombre = limites_demandes.nombre + 1
  returning nombre into total;
  if random() < 0.01 then
    delete from limites_demandes where fenetre < now() - interval '1 day';
  end if;
  return total;
end;
$$;

-- Seule la clé de service du site l'appelle.
revoke execute on function compter_demande(text) from public, anon, authenticated;
