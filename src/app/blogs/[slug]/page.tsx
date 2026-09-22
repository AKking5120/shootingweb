import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Tag } from "lucide-react";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { BlogContent } from "@/components/blog/BlogContent";
import { BlogCard } from "@/components/blog/BlogCard";
import { Button } from "@/components/ui/Button";
import {
  getAllPosts,
  getPostBySlug,
  getRelatedPosts,
} from "@/lib/blogs";
import { formatDate } from "@/lib/blog-utils";
import { resolveImageSrc } from "@/lib/image-utils";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  buildMetadata,
  getAbsoluteImageUrl,
  getArticleSchema,
  getBreadcrumbSchema,
} from "@/lib/seo";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };

  const imageUrl = resolveImageSrc(post.image);

  return buildMetadata({
    title: `${post.title} | SY Media & Marketing`,
    description: post.excerpt,
    path: `/blogs/${post.slug}`,
    image: imageUrl,
    type: "article",
    publishedTime: post.date,
    authors: [post.author],
    keywords: post.tags,
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const related = await getRelatedPosts(slug);
  const imageSrc = resolveImageSrc(post.image);

  return (
    <>
      <JsonLd
        data={[
          getArticleSchema(post, getAbsoluteImageUrl(imageSrc)),
          getBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blogs" },
            { name: post.title, path: `/blogs/${post.slug}` },
          ]),
        ]}
      />
      <Navbar solid />
      <main>
        <article>
          <header className="relative pt-28 md:pt-36">
            <div className="mx-auto max-w-content px-6 lg:px-8">
              <Link
                href="/blogs"
                className="mb-8 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-white"
              >
                <ArrowLeft size={16} />
                Back to Blog
              </Link>

              <div className="mb-6 flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-accent-blue/30 bg-accent-blue/10 px-3 py-1 text-xs font-semibold text-accent-blue">
                  {post.category}
                </span>
                <span className="flex items-center gap-1 text-xs text-muted">
                  <Clock size={12} />
                  {post.readTime}
                </span>
                <span className="text-xs text-muted">
                  {formatDate(post.date)}
                </span>
              </div>

              <h1 className="max-w-4xl font-display text-[clamp(2rem,5vw,3.25rem)] font-extrabold leading-tight text-white">
                {post.title}
              </h1>

              <p className="mt-5 max-w-3xl text-lg text-muted">{post.excerpt}</p>

              <p className="mt-4 text-sm text-muted">
                By <span className="text-white">{post.author}</span>
              </p>
            </div>

            <div className="relative mx-auto mt-10 max-w-content px-6 lg:px-8">
              <div className="relative aspect-[21/9] overflow-hidden rounded-2xl border border-border">
                <Image
                  src={imageSrc}
                  alt={post.title}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1320px) 100vw, 1320px"
                  unoptimized={imageSrc.startsWith("http")}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
              </div>
            </div>
          </header>

          <div className="mx-auto max-w-3xl px-6 py-16 lg:px-8">
            <BlogContent blocks={post.content} />

            {post.tags.length > 0 && (
              <div className="mt-12 flex flex-wrap items-center gap-2 border-t border-border pt-8">
                <Tag size={14} className="text-muted" />
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-border px-3 py-1 text-xs text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </article>

        {related.length > 0 && (
          <section className="border-t border-border py-20">
            <div className="mx-auto max-w-content px-6 lg:px-8">
              <h2 className="mb-10 font-display text-2xl font-bold text-white">
                Related Articles
              </h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {related.map((relatedPost, i) => (
                  <BlogCard key={relatedPost.slug} post={relatedPost} index={i} />
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="border-t border-border py-20">
          <div className="mx-auto max-w-content px-6 text-center lg:px-8">
            <h2 className="font-display text-2xl font-bold text-white md:text-3xl">
              Want help implementing this?
            </h2>
            <p className="mt-3 text-muted">
              Our team can turn strategy into results for your brand.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button href="/#contact">Start a Project →</Button>
              <Button href="/blogs" variant="outline">More Articles</Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
