"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Clock } from "lucide-react";
import type { BlogPost } from "@/types";
import { formatDate } from "@/lib/blog-utils";

interface BlogCardProps {
  post: BlogPost;
  index?: number;
  featured?: boolean;
}

export function BlogCard({ post, index = 0, featured = false }: BlogCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
    >
      <Link
        href={`/blogs/${post.slug}`}
        className={`group relative flex overflow-hidden rounded-2xl border border-border bg-surface-elevated/40 backdrop-blur-sm transition-all duration-300 hover:border-accent-blue/30 hover:shadow-[0_8px_40px_rgba(59,130,246,0.1)] ${
          featured ? "flex-col lg:flex-row" : "flex-col"
        }`}
      >
        <div
          className={`relative overflow-hidden ${
            featured ? "aspect-[16/10] lg:aspect-auto lg:w-1/2 lg:min-h-[280px]" : "aspect-[16/10]"
          }`}
        >
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes={featured ? "(max-width: 1024px) 100vw, 50vw" : "(max-width: 768px) 100vw, 33vw"}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
        </div>

        <div className={`flex flex-col justify-center p-6 ${featured ? "lg:w-1/2 lg:p-8" : ""}`}>
          <div className="mb-3 flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-accent-blue/30 bg-accent-blue/10 px-3 py-1 text-xs font-semibold text-accent-blue">
              {post.category}
            </span>
            <span className="flex items-center gap-1 text-xs text-muted">
              <Clock size={12} />
              {post.readTime}
            </span>
          </div>

          <h3
            className={`font-bold leading-snug text-white transition-colors group-hover:text-accent-blue ${
              featured ? "text-xl md:text-2xl" : "text-lg"
            }`}
          >
            {post.title}
          </h3>

          <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted">
            {post.excerpt}
          </p>

          <div className="mt-5 flex items-center justify-between">
            <span className="text-xs text-muted">{formatDate(post.date)}</span>
            <span
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-white transition-all group-hover:border-transparent group-hover:bg-gradient-brand"
              aria-hidden="true"
            >
              <ArrowUpRight size={16} />
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
