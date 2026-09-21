import type { BlogBlock } from "@/types";

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-IN", {
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
