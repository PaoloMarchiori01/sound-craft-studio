# Database Supabase per i contatti del form

I dati del form contatti vengono inviati sia al webhook Make.com sia a Supabase. In Supabase i messaggi vengono salvati nella tabella `contact_messages`.

## Come creare la tabella in Supabase

### 1. Accedi a Supabase

- Vai su [supabase.com](https://supabase.com) e apri il tuo progetto (quello con l’URL che hai in `.env` come `VITE_SUPABASE_URL`).

### 2. Apri l’SQL Editor

- Nel menu a sinistra: **SQL Editor** → **New query**.

### 3. Esegui lo script SQL

- Apri il file `supabase/migrations/20250222000000_create_contact_messages.sql` di questo progetto.
- Copia tutto il contenuto e incollalo nell’editor SQL in Supabase.
- Clicca **Run** (o Ctrl/Cmd + Enter).

Se tutto va bene, vedrai un messaggio di successo e la tabella `contact_messages` sarà stata creata.

### 4. Controlla la tabella

- Nel menu: **Table Editor**.
- Seleziona la tabella **contact_messages**: vedrai le colonne `id`, `nome`, `cognome`, `email`, `cellulare`, `servizio`, `messaggio`, `created_at`.

### 5. Variabili d’ambiente

Nel file `.env` (nella root del progetto) devono esserci:

- `VITE_SUPABASE_URL` = URL del progetto (es. `https://xxx.supabase.co`)
- `VITE_SUPABASE_PUBLISHABLE_KEY` = chiave **anon public** (Project Settings → API → `anon` `public`)

Con la tabella creata e le variabili impostate, ogni invio del form salverà un record in `contact_messages` oltre a inviare i dati a Make.com.

---

## Se il form dà "Errore nell'invio del messaggio"

Dopo la modifica al codice, il messaggio di errore mostrato nel toast potrebbe essere quello vero di Supabase. Controlla anche la **console del browser** (F12 → Console) per vedere dettagli.

### Controlli da fare

1. **Tabella e policy create con lo script SQL**  
   Se hai creato la tabella solo da Table Editor, RLS è attivo ma **manca la policy** che permette agli anon di fare INSERT. In Supabase: **SQL Editor** → incolla ed esegui **tutto** il contenuto di `supabase/migrations/20250222000000_create_contact_messages.sql` (crea tabella + policy). Se la tabella esiste già, gli `create table if not exists` e `create index if not exists` non rompono nulla; la parte importante è la policy `"Allow anonymous insert"`. Se quella policy esiste già, Supabase ti dirà che il nome è duplicato: in quel caso non serve rifare nulla.

2. **Chiave anon (public), non service_role**  
   In `.env` deve esserci la chiave **anon public** (Project Settings → API → chiave "anon" "public"). Non usare la "service_role" nel frontend (è segreta).

3. **Riavvio dopo aver cambiato .env**  
   Dopo aver modificato `.env` devi **fermare e riavviare** il server di sviluppo (`npm run dev`), altrimenti le nuove variabili non vengono caricate.

4. **Verifica la policy in Supabase**  
   Dashboard → **Authentication** → **Policies** (oppure **Table Editor** → tabella `contact_messages` → icona shield). Deve esserci una policy che consente **INSERT** per il ruolo **anon** sulla tabella `contact_messages`.
