import { notFound } from "next/navigation";
import { getBlogBySlug } from "@/lib/store";
import { BlogForm } from "@/components/admin/BlogForm";

export default async function EditBlogPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);
  if (!post) notFound();

  return (
    <div>
      <h1 className="text-3xl font-bold">Edit Blog Post</h1>
      <p className="mt-2 text-muted">{post.title}</p>
      <div className="mt-8">
        <BlogForm post={post} />
      </div>
    </div>
  );
}
