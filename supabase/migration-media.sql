-- Run this if you already created tables before media support was added

alter table public.site_settings
  add column if not exists media jsonb not null default '{}'::jsonb;

create table if not exists public.media_files (
  id text primary key,
  category text not null,
  path text not null unique,
  label text not null default '',
  alt text not null default '',
  created_at timestamptz not null default now()
);

create index if not exists media_files_category_idx on public.media_files (category);
create index if not exists media_files_path_idx on public.media_files (path);

alter table public.media_files enable row level security;
