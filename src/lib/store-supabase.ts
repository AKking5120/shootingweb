import "server-only";
import { blogPosts as seedBlogs } from "@/data/blogs";
import { siteConfig, socialLinks } from "@/data/site";
import { getSupabase } from "@/lib/supabase";
import { normalizeImagePath } from "@/lib/image-utils";
import type {
  BlogBlock,
  BlogPost,
  ContactMessage,
  MediaFile,
  SiteSettings,
} from "@/types";

interface BlogRow {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  read_time: string;
  image: string;
  featured: boolean;
  tags: string[];
  content: BlogBlock[];
}

interface MessageRow {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  service: string;
  budget: string;
  message: string;
  read: boolean;
  created_at: string;
}

interface SettingsRow {
  name: string;
  email: string;
  phone: string;
  tagline: string;
  positioning: string;
  description: string;
  instagram: string;
  linkedin: string;
  youtube: string;
  media?: SiteSettings["media"];
}

interface MediaFileRow {
  id: string;
  category: string;
  path: string;
  label: string;
  alt: string;
  created_at: string;
}

const defaultSettings: SiteSettings = {
  name: siteConfig.name,
  email: siteConfig.email,
  phone: siteConfig.phone,
  tagline: siteConfig.tagline,
  positioning: siteConfig.positioning,
  description: siteConfig.description,
  instagram: socialLinks.find((s) => s.icon === "instagram")?.href || "",
  linkedin: socialLinks.find((s) => s.icon === "linkedin")?.href || "",
  youtube: socialLinks.find((s) => s.icon === "youtube")?.href || "",
};

function rowToBlog(row: BlogRow): BlogPost {
  return {
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    category: row.category,
    author: row.author,
    date: row.date,
    readTime: row.read_time,
    image: row.image,
    featured: row.featured,
    tags: row.tags ?? [],
    content: row.content ?? [],
  };
}

function blogToRow(post: BlogPost) {
  return {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    category: post.category,
    author: post.author,
    date: post.date,
    read_time: post.readTime,
    image: post.image,
    featured: Boolean(post.featured),
    tags: post.tags,
    content: post.content,
  };
}

function rowToMessage(row: MessageRow): ContactMessage {
  return {
    id: row.id,
    name: row.name,
    company: row.company,
    email: row.email,
    phone: row.phone,
    service: row.service,
    budget: row.budget,
    message: row.message,
    read: row.read,
    createdAt: row.created_at,
  };
}

function rowToSettings(row: SettingsRow): SiteSettings {
  return {
    name: row.name,
    email: row.email,
    phone: row.phone,
    tagline: row.tagline,
    positioning: row.positioning,
    description: row.description,
    instagram: row.instagram,
    linkedin: row.linkedin,
    youtube: row.youtube,
    media: row.media,
  };
}

function settingsToRow(settings: SiteSettings) {
  return {
    id: "default",
    name: settings.name,
    email: settings.email,
    phone: settings.phone,
    tagline: settings.tagline,
    positioning: settings.positioning,
    description: settings.description,
    instagram: settings.instagram,
    linkedin: settings.linkedin,
    youtube: settings.youtube,
    media: settings.media ?? {},
  };
}

function rowToMediaFile(row: MediaFileRow): MediaFile {
  return {
    id: row.id,
    category: row.category,
    path: row.path,
    label: row.label,
    alt: row.alt,
    createdAt: row.created_at,
  };
}

async function seedBlogsIfEmpty() {
  const supabase = getSupabase();
  const { count, error: countError } = await supabase
    .from("blogs")
    .select("*", { count: "exact", head: true });

  if (countError) throw countError;
  if (count && count > 0) return;

  const rows = seedBlogs.map(blogToRow);
  const { error } = await supabase.from("blogs").insert(rows);
  if (error) throw error;
}

async function seedSettingsIfEmpty() {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("site_settings")
    .select("id")
    .eq("id", "default")
    .maybeSingle();

  if (error) throw error;
  if (data) return;

  const { error: insertError } = await supabase
    .from("site_settings")
    .insert(settingsToRow(defaultSettings));

  if (insertError) throw insertError;
}

export async function getBlogs(): Promise<BlogPost[]> {
  await seedBlogsIfEmpty();

  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .order("date", { ascending: false });

  if (error) throw error;
  return (data as BlogRow[]).map(rowToBlog);
}

export async function getBlogBySlug(slug: string) {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error) throw error;
  return data ? rowToBlog(data as BlogRow) : undefined;
}

export async function saveBlog(post: BlogPost) {
  const supabase = getSupabase();
  const { error } = await supabase.from("blogs").upsert(blogToRow(post), {
    onConflict: "slug",
  });

  if (error) throw error;
  return post;
}

export async function deleteBlog(slug: string) {
  const supabase = getSupabase();
  const { error } = await supabase.from("blogs").delete().eq("slug", slug);
  if (error) throw error;
}

export async function getMessages(): Promise<ContactMessage[]> {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data as MessageRow[]).map(rowToMessage);
}

export async function addMessage(
  data: Omit<ContactMessage, "id" | "read" | "createdAt">
) {
  const supabase = getSupabase();
  const message = {
    id: `msg_${Date.now()}`,
    name: data.name,
    company: data.company,
    email: data.email,
    phone: data.phone,
    service: data.service,
    budget: data.budget,
    message: data.message,
    read: false,
  };

  const { error } = await supabase.from("messages").insert(message);
  if (error) throw error;

  return rowToMessage({
    ...message,
    created_at: new Date().toISOString(),
  });
}

export async function markMessageRead(id: string, read: boolean) {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("messages")
    .update({ read })
    .eq("id", id)
    .select("*")
    .maybeSingle();

  if (error) throw error;
  return data ? rowToMessage(data as MessageRow) : undefined;
}

export async function deleteMessage(id: string) {
  const supabase = getSupabase();
  const { error } = await supabase.from("messages").delete().eq("id", id);
  if (error) throw error;
}

export async function getSettings(): Promise<SiteSettings> {
  await seedSettingsIfEmpty();

  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("site_settings")
    .select("*")
    .eq("id", "default")
    .maybeSingle();

  if (error) throw error;
  return data ? rowToSettings(data as SettingsRow) : defaultSettings;
}

export async function saveSettings(settings: SiteSettings) {
  const supabase = getSupabase();
  const { error } = await supabase
    .from("site_settings")
    .upsert(settingsToRow(settings), { onConflict: "id" });

  if (error) throw error;
  return settings;
}

export async function getDashboardStats() {
  const [blogs, messages] = await Promise.all([getBlogs(), getMessages()]);
  return {
    totalBlogs: blogs.length,
    featuredBlogs: blogs.filter((b) => b.featured).length,
    totalMessages: messages.length,
    unreadMessages: messages.filter((m) => !m.read).length,
  };
}

export async function getMediaFiles(): Promise<MediaFile[]> {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("media_files")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data as MediaFileRow[]).map(rowToMediaFile);
}

export async function addMediaFile(
  data: Omit<MediaFile, "id" | "createdAt">
) {
  const supabase = getSupabase();
  const path = normalizeImagePath(data.path, data.category);
  const file: Omit<MediaFileRow, "created_at"> = {
    id: `media_${Date.now()}`,
    category: data.category,
    path,
    label: data.label,
    alt: data.alt,
  };

  const { error } = await supabase.from("media_files").insert(file);
  if (error) throw error;

  return rowToMediaFile({
    ...file,
    created_at: new Date().toISOString(),
  });
}

export async function deleteMediaFile(id: string) {
  const supabase = getSupabase();
  const { error } = await supabase.from("media_files").delete().eq("id", id);
  if (error) throw error;
}

export async function saveSiteMedia(media: SiteSettings["media"]) {
  const settings = await getSettings();
  return saveSettings({ ...settings, media });
}
