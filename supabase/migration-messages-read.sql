-- Fix messages table: rename "read" column (can cause API issues) to is_read
-- Run in Supabase SQL Editor if messages exist but admin panel shows empty

alter table public.messages
  rename column read to is_read;

-- If you get "column read does not exist", column may already be is_read — skip this file.
