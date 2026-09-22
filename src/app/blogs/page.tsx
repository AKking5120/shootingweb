import type { Metadata } from "next";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { BlogFilter } from "@/components/blog/BlogFilter";
import { Button } from "@/components/ui/Button";
import { getAllPosts } from "@/lib/blogs";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Blog | SY Media & Marketing",
  description:
    "Marketing insights, growth strategies, and creative tips from SY Media & Marketing. Learn about social media, paid ads, content, video, and brand growth.",
  path: "/blogs",
  keywords: [
    "digital marketing blog",
    "social media tips",
    "content marketing guide",
    "Google Ads tips",
    "brand growth strategies",
    "affiliate marketing guide",
  ],
});

export default async function BlogsPage() {
  const posts = await getAllPosts();

  return (
    <>
      <Navbar solid />
      <main>
        <section className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-20">
          <div className="absolute inset-0 bg-gradient-glow opacity-40" />
          <div className="relative mx-auto max-w-content px-6 lg:px-8">
            <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.2em] text-accent-blue">
              Insights &amp; Resources
            </span>
            <h1 className="font-display text-[clamp(2.5rem,6vw,4rem)] font-extrabold leading-tight text-white">
              Marketing{" "}
              <span className="bg-gradient-text bg-clip-text text-transparent">
                Insights
              </span>
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-muted">
              Practical strategies on digital marketing, social media, content
              creation, paid advertising, and brand growth — from the SY Media
              team.
            </p>
          </div>
        </section>

        <section className="pb-24 md:pb-32">
          <div className="mx-auto max-w-content px-6 lg:px-8">
            <BlogFilter posts={posts} />
          </div>
        </section>

        <section className="border-t border-border py-20">
          <div className="mx-auto max-w-content px-6 text-center lg:px-8">
            <h2 className="font-display text-2xl font-bold text-white md:text-3xl">
              Ready to put these strategies to work?
            </h2>
            <p className="mt-3 text-muted">
              Let&apos;s build a growth plan tailored to your brand.
            </p>
            <div className="mt-8">
              <Button href="/#contact">Start a Project →</Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
