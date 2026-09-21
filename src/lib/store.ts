import "server-only";
import { promises as fs } from "fs";
import path from "path";
import { blogPosts as seedBlogs } from "@/data/blogs";
import { siteConfig, socialLinks } from "@/data/site";
import { isSupabaseEnabled } from "@/lib/supabase";
import { normalizeImagePath } from "@/lib/image-utils";
import type {
  BlogPost,
  ContactMessage,
  MediaFile,
  SiteSettings,
  BlogBlock,
} from "@/types";

const DATA_DIR = path.join(process.cwd(), "data", "content");

async function ensureDataDir() {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

async function readJson<T>(filename: string, fallback: T): Promise<T> {
  await ensureDataDir();
  const filePath = path.join(DATA_DIR, filename);
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    return JSON.parse(raw) as T;
  } catch {
    await fs.writeFile(filePath, JSON.stringify(fallback, null, 2));
    return fallback;
  }
}

async function writeJson<T>(filename: string, data: T) {
  await ensureDataDir();
  const filePath = path.join(DATA_DIR, filename);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
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

export function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function parseContentText(text: string): BlogBlock[] {
  const blocks: BlogBlock[] = [];
  const sections = text.split(/\n\n+/);

  for (const section of sections) {
    const trimmed = section.trim();
    if (!trimmed) continue;

    if (trimmed.startsWith("## ")) {
      blocks.push({ type: "heading", content: trimmed.replace(/^##\s+/, "") });
      continue;
    }

    const lines = trimmed.split("\n");
    if (lines.every((l) => l.trim().startsWith("- "))) {
      blocks.push({
        type: "list",
        content: lines.map((l) => l.trim().replace(/^-\s+/, "")),
      });
      continue;
    }

    blocks.push({ type: "paragraph", content: trimmed });
  }

  return blocks;
}

export function contentToText(blocks: BlogBlock[]): string {
  return blocks
    .map((block) => {
      if (block.type === "heading") return `## ${block.content}`;
      if (block.type === "list") {
        return (block.content as string[])
          .map((item) => `- ${item}`)
          .join("\n");
      }
      return block.content as string;
    })
    .join("\n\n");
}

async function getStore() {
  if (isSupabaseEnabled()) {
    return import("@/lib/store-supabase");
  }
  return null;
}

async function getBlogsFromFile(): Promise<BlogPost[]> {
  const blogs = await readJson<BlogPost[]>("blogs.json", seedBlogs);
  return blogs.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export async function getBlogs(): Promise<BlogPost[]> {
  const store = await getStore();
  if (store) return store.getBlogs();
  return getBlogsFromFile();
}

export async function getBlogBySlug(slug: string) {
  const store = await getStore();
  if (store) return store.getBlogBySlug(slug);
  const blogs = await getBlogsFromFile();
  return blogs.find((b) => b.slug === slug);
}

export async function saveBlog(post: BlogPost) {
  const store = await getStore();
  if (store) return store.saveBlog(post);

  const blogs = await getBlogsFromFile();
  const index = blogs.findIndex((b) => b.slug === post.slug);
  if (index >= 0) blogs[index] = post;
  else blogs.unshift(post);
  await writeJson("blogs.json", blogs);
  return post;
}

export async function deleteBlog(slug: string) {
  const store = await getStore();
  if (store) return store.deleteBlog(slug);

  const blogs = await getBlogsFromFile();
  await writeJson(
    "blogs.json",
    blogs.filter((b) => b.slug !== slug)
  );
}

export async function getMessages(): Promise<ContactMessage[]> {
  const store = await getStore();
  if (store) return store.getMessages();

  const messages = await readJson<ContactMessage[]>("messages.json", []);
  return messages.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export async function addMessage(
  data: Omit<ContactMessage, "id" | "read" | "createdAt">
) {
  const store = await getStore();
  if (store) return store.addMessage(data);

  const messages = await getMessages();
  const message: ContactMessage = {
    ...data,
    id: `msg_${Date.now()}`,
    read: false,
    createdAt: new Date().toISOString(),
  };
  messages.unshift(message);
  await writeJson("messages.json", messages);
  return message;
}

export async function markMessageRead(id: string, read: boolean) {
  const store = await getStore();
  if (store) return store.markMessageRead(id, read);

  const messages = await getMessages();
  const index = messages.findIndex((m) => m.id === id);
  if (index >= 0) {
    messages[index].read = read;
    await writeJson("messages.json", messages);
  }
  return messages[index];
}

export async function deleteMessage(id: string) {
  const store = await getStore();
  if (store) return store.deleteMessage(id);

  const messages = await getMessages();
  await writeJson(
    "messages.json",
    messages.filter((m) => m.id !== id)
  );
}

export async function getSettings(): Promise<SiteSettings> {
  const store = await getStore();
  if (store) return store.getSettings();
  return readJson<SiteSettings>("settings.json", defaultSettings);
}

export async function saveSettings(settings: SiteSettings) {
  const store = await getStore();
  if (store) return store.saveSettings(settings);
  await writeJson("settings.json", settings);
  return settings;
}

export async function getDashboardStats() {
  const store = await getStore();
  if (store) return store.getDashboardStats();

  const [blogs, messages] = await Promise.all([getBlogs(), getMessages()]);
  return {
    totalBlogs: blogs.length,
    featuredBlogs: blogs.filter((b) => b.featured).length,
    totalMessages: messages.length,
    unreadMessages: messages.filter((m) => !m.read).length,
  };
}

export async function getMediaFiles(): Promise<MediaFile[]> {
  const store = await getStore();
  if (store) return store.getMediaFiles();
  return readJson<MediaFile[]>("media-files.json", []);
}

export async function addMediaFile(
  data: Omit<MediaFile, "id" | "createdAt">
) {
  const store = await getStore();
  if (store) return store.addMediaFile(data);

  const files = await getMediaFiles();
  const path = normalizeImagePath(data.path, data.category);
  const file: MediaFile = {
    id: `media_${Date.now()}`,
    category: data.category,
    path,
    label: data.label,
    alt: data.alt,
    createdAt: new Date().toISOString(),
  };
  files.unshift(file);
  await writeJson("media-files.json", files);
  return file;
}

export async function deleteMediaFile(id: string) {
  const store = await getStore();
  if (store) return store.deleteMediaFile(id);

  const files = await getMediaFiles();
  await writeJson(
    "media-files.json",
    files.filter((file) => file.id !== id)
  );
}

export async function saveSiteMedia(media: SiteSettings["media"]) {
  const store = await getStore();
  if (store) return store.saveSiteMedia(media);

  const settings = await getSettings();
  return saveSettings({ ...settings, media });
}
