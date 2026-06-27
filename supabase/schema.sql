create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  name text not null,
  role text not null default 'member' check (role in ('member', 'editor', 'admin')),
  language text not null default 'zh-CN',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.route_selections (
  user_id uuid primary key references auth.users(id) on delete cascade,
  selection jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.voyage_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  source text not null check (source in ('voyage', 'routes')),
  progress_key text not null,
  created_at timestamptz not null default now(),
  unique (user_id, source, progress_key)
);

create table if not exists public.submissions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  type text not null,
  content text not null,
  contact text,
  article_title text,
  article_slug text,
  status text not null default 'pending' check (status in ('pending', 'accepted', 'rejected', 'published')),
  reviewer_note text,
  reviewed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.newsletter_signups (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  channel text not null default 'email',
  source text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.conversion_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  event_type text not null,
  target text not null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists submissions_status_created_at_idx on public.submissions (status, created_at desc);
create index if not exists conversion_events_created_at_idx on public.conversion_events (created_at desc);
create index if not exists newsletter_signups_created_at_idx on public.newsletter_signups (created_at desc);

create or replace function public.is_logbook_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and role in ('admin', 'editor')
  );
$$;

alter table public.profiles enable row level security;
alter table public.route_selections enable row level security;
alter table public.voyage_progress enable row level security;
alter table public.submissions enable row level security;
alter table public.newsletter_signups enable row level security;
alter table public.conversion_events enable row level security;

drop policy if exists "profiles_select_own_or_admin" on public.profiles;
create policy "profiles_select_own_or_admin"
on public.profiles for select
using (auth.uid() = id or public.is_logbook_admin());

drop policy if exists "profiles_insert_own" on public.profiles;
create policy "profiles_insert_own"
on public.profiles for insert
with check (auth.uid() = id);

drop policy if exists "profiles_update_own_or_admin" on public.profiles;
create policy "profiles_update_own_or_admin"
on public.profiles for update
using (auth.uid() = id or public.is_logbook_admin())
with check (auth.uid() = id or public.is_logbook_admin());

drop policy if exists "route_selections_own" on public.route_selections;
create policy "route_selections_own"
on public.route_selections for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "voyage_progress_own" on public.voyage_progress;
create policy "voyage_progress_own"
on public.voyage_progress for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "submissions_select_own_or_admin" on public.submissions;
create policy "submissions_select_own_or_admin"
on public.submissions for select
using (auth.uid() = user_id or public.is_logbook_admin());

drop policy if exists "submissions_insert_own" on public.submissions;
create policy "submissions_insert_own"
on public.submissions for insert
with check (auth.uid() = user_id);

drop policy if exists "submissions_update_admin" on public.submissions;
create policy "submissions_update_admin"
on public.submissions for update
using (public.is_logbook_admin())
with check (public.is_logbook_admin());

drop policy if exists "newsletter_signups_public_insert" on public.newsletter_signups;
create policy "newsletter_signups_public_insert"
on public.newsletter_signups for insert
with check (true);

drop policy if exists "newsletter_signups_admin_select" on public.newsletter_signups;
create policy "newsletter_signups_admin_select"
on public.newsletter_signups for select
using (public.is_logbook_admin());

drop policy if exists "conversion_events_public_insert" on public.conversion_events;
create policy "conversion_events_public_insert"
on public.conversion_events for insert
with check (true);

drop policy if exists "conversion_events_admin_select" on public.conversion_events;
create policy "conversion_events_admin_select"
on public.conversion_events for select
using (public.is_logbook_admin());

-- After your first account signs up, run this once in Supabase SQL editor:
-- update public.profiles set role = 'admin' where email = 'you@example.com';
