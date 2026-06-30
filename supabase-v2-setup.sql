create table if not exists public.entries_v2 (
  id uuid primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  original_date date not null,
  title text not null,
  original_text text not null,
  season text not null,
  story_arc text,
  tags text[] not null default '{}',
  people text[] not null default '{}',
  location text,
  scripture text,
  reflection_date date,
  reflection_text text,
  atlas jsonb not null default '{}'::jsonb,
  structured_data jsonb not null default '{}'::jsonb,
  relationship_edges jsonb not null default '[]'::jsonb,
  map_data jsonb not null default '{}'::jsonb,
  living_stories jsonb not null default '[]'::jsonb,
  intercession jsonb not null default '{}'::jsonb,
  connections jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.entries_v2 add column if not exists atlas jsonb not null default '{}'::jsonb;
alter table public.entries_v2 add column if not exists structured_data jsonb not null default '{}'::jsonb;
alter table public.entries_v2 add column if not exists relationship_edges jsonb not null default '[]'::jsonb;
alter table public.entries_v2 add column if not exists map_data jsonb not null default '{}'::jsonb;
alter table public.entries_v2 add column if not exists living_stories jsonb not null default '[]'::jsonb;
alter table public.entries_v2 add column if not exists intercession jsonb not null default '{}'::jsonb;

alter table public.entries_v2 enable row level security;

drop policy if exists "Users can read their own v2 entries" on public.entries_v2;
create policy "Users can read their own v2 entries" on public.entries_v2 for select to authenticated using (auth.uid() = user_id);

drop policy if exists "Users can create their own v2 entries" on public.entries_v2;
create policy "Users can create their own v2 entries" on public.entries_v2 for insert to authenticated with check (auth.uid() = user_id);

drop policy if exists "Users can update their own v2 entries" on public.entries_v2;
create policy "Users can update their own v2 entries" on public.entries_v2 for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "Users can delete their own v2 entries" on public.entries_v2;
create policy "Users can delete their own v2 entries" on public.entries_v2 for delete to authenticated using (auth.uid() = user_id);

create index if not exists entries_v2_user_date_idx on public.entries_v2 (user_id, original_date);
create index if not exists entries_v2_user_arc_idx on public.entries_v2 (user_id, story_arc);
create index if not exists entries_v2_user_atlas_idx on public.entries_v2 using gin (atlas);
create index if not exists entries_v2_user_structured_idx on public.entries_v2 using gin (structured_data);
create index if not exists entries_v2_user_relationship_edges_idx on public.entries_v2 using gin (relationship_edges);
create index if not exists entries_v2_user_map_data_idx on public.entries_v2 using gin (map_data);
create index if not exists entries_v2_user_living_stories_idx on public.entries_v2 using gin (living_stories);
create index if not exists entries_v2_user_intercession_idx on public.entries_v2 using gin (intercession);
create index if not exists entries_v2_user_connections_idx on public.entries_v2 using gin (connections);
