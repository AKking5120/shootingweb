import type { BlogBlock, BlogPost } from "@/types";

export function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
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

export function todayDateString() {
  return new Date().toISOString().split("T")[0];
}

export function isBlogPubliclyVisible(
  post: BlogPost,
  today = todayDateString()
): boolean {
  const status = post.status ?? "published";

  if (status === "draft") return false;
  if (status === "published") return true;
  if (status === "scheduled") return post.date <= today;
  return post.date <= today;
}

export function getBlogStatusLabel(post: BlogPost): string {
  const status = post.status ?? "published";
  if (status === "scheduled" && post.date > todayDateString()) {
    return `Scheduled · ${post.date}`;
  }
  if (status === "draft") return "Draft";
  return "Published";
}
