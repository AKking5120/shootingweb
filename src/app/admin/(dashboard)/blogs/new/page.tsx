import { BlogForm } from "@/components/admin/BlogForm";

export default function NewBlogPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">New Blog Post</h1>
      <p className="mt-2 text-muted">Create a new article for your website</p>
      <div className="mt-8">
        <BlogForm />
      </div>
    </div>
  );
}
