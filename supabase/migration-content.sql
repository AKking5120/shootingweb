-- FAQ, Process, Popup content + scheduled blogs
-- Run in Supabase SQL Editor

alter table public.site_settings
  add column if not exists content jsonb not null default '{}'::jsonb;

alter table public.blogs
  add column if not exists status text not null default 'published';

create index if not exists blogs_status_idx on public.blogs (status);
