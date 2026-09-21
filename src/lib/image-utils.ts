export function resolveImageSrc(path: string): string {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  if (path.startsWith("/")) return path;
  return `/${path}`;
}

export function isLocalImage(path: string): boolean {
  return Boolean(path) && !path.startsWith("http://") && !path.startsWith("https://");
}

export function normalizeImagePath(path: string, category?: string): string {
  const trimmed = path.trim();
  if (!trimmed) return "";

  if (
    trimmed.startsWith("http://") ||
    trimmed.startsWith("https://") ||
    trimmed.startsWith("/")
  ) {
    return trimmed;
  }

  if (category) {
    return `/images/${category}/${trimmed.replace(/^\/+/, "")}`;
  }

  return `/${trimmed.replace(/^\/+/, "")}`;
}
