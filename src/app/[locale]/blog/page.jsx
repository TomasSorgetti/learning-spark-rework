import { BlogPosts } from "@/components/blog/BlogPosts";
import { getAllPosts } from "@/queries/blog";

export default async function BlogsPage() {
  const posts = (await getAllPosts()) || [];

  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <h1>Blogs Page</h1>
      <BlogPosts posts={posts} />
    </main>
  );
}
