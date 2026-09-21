import type { BlogBlock } from "@/types";

interface BlogContentProps {
  blocks: BlogBlock[];
}

export function BlogContent({ blocks }: BlogContentProps) {
  return (
    <div className="prose-blog space-y-6">
      {blocks.map((block, i) => {
        if (block.type === "heading") {
          return (
            <h2
              key={i}
              className="font-display text-2xl font-bold text-white md:text-3xl"
            >
              {block.content as string}
            </h2>
          );
        }

        if (block.type === "list") {
          return (
            <ul key={i} className="space-y-3 pl-1">
              {(block.content as string[]).map((item, j) => (
                <li
                  key={j}
                  className="flex gap-3 text-base leading-relaxed text-muted"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-blue" />
                  {item}
                </li>
              ))}
            </ul>
          );
        }

        return (
          <p key={i} className="text-base leading-relaxed text-muted md:text-lg">
            {block.content as string}
          </p>
        );
      })}
    </div>
  );
}
