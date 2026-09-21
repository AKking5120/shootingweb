-- SY Media & Marketing — Supabase schema
-- Run this in Supabase Dashboard → SQL Editor → New query → Run

-- Blogs
create table if not exists public.blogs (
  slug text primary key,
  title text not null,
  excerpt text not null,
  category text not null,
  author text not null default 'SY Media Team',
  date date not null,
  read_time text not null default '5 min read',
  image text not null,
  featured boolean not null default false,
  status text not null default 'published',
  tags jsonb not null default '[]'::jsonb,
  content jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Contact messages
create table if not exists public.messages (
  id text primary key,
  name text not null,
  company text not null default '',
  email text not null,
  phone text not null default '',
  service text not null,
  budget text not null default '',
  message text not null,
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);

-- Site settings (single row)
create table if not exists public.site_settings (
  id text primary key default 'default',
  name text not null,
  email text not null,
  phone text not null,
  tagline text not null,
  positioning text not null,
  description text not null,
  instagram text not null default '',
  linkedin text not null default '',
  youtube text not null default '',
  media jsonb not null default '{}'::jsonb,
  content jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

-- Image library (paths to files in public/images on GitHub)
create table if not exists public.media_files (
  id text primary key,
  category text not null,
  path text not null unique,
  label text not null default '',
  alt text not null default '',
  created_at timestamptz not null default now()
);

-- Indexes
create index if not exists blogs_date_idx on public.blogs (date desc);
create index if not exists messages_created_at_idx on public.messages (created_at desc);
create index if not exists messages_read_idx on public.messages (is_read);
create index if not exists media_files_category_idx on public.media_files (category);
create index if not exists media_files_path_idx on public.media_files (path);

-- Row Level Security (API uses service role key server-side)
alter table public.blogs enable row level security;
alter table public.messages enable row level security;
alter table public.site_settings enable row level security;
alter table public.media_files enable row level security;

-- Updated_at trigger
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists blogs_updated_at on public.blogs;
create trigger blogs_updated_at
  before update on public.blogs
  for each row execute function public.set_updated_at();

drop trigger if exists site_settings_updated_at on public.site_settings;
create trigger site_settings_updated_at
  before update on public.site_settings
  for each row execute function public.set_updated_at();
