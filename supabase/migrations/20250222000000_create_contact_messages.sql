-- Tabella per i messaggi del form contatti.
-- Esegui questo script nella Supabase Dashboard: SQL Editor → New query → incolla → Run.

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  cognome text not null,
  email text not null,
  cellulare text,
  servizio text not null,
  messaggio text not null,
  created_at timestamptz not null default now()
);

-- Indici utili per cercare/filtrare
create index if not exists contact_messages_created_at_idx on public.contact_messages (created_at desc);
create index if not exists contact_messages_email_idx on public.contact_messages (email);

-- RLS: abilita Row Level Security
alter table public.contact_messages enable row level security;

-- Policy: chiunque (anon) può inserire un messaggio; nessuno può leggere/aggiornare/cancellare dal client.
-- Così il form dal sito può salvare, ma i dati li vedi solo tu dalla Dashboard Supabase.
create policy "Allow anonymous insert"
  on public.contact_messages
  for insert
  to anon
  with check (true);

-- Opzionale: se vuoi che solo utenti autenticati (tu) vedano i dati, aggiungi una policy SELECT per authenticated.
-- create policy "Allow authenticated read"
--   on public.contact_messages
--   for select
--   to authenticated
--   using (true);

comment on table public.contact_messages is 'Messaggi inviati dal form contatti del sito';
