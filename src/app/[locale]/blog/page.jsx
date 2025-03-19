import { BlogPosts } from "@/components/blog/BlogPosts";
import { MostViewedPosts } from "@/components/blog/mostViewedPost/MostViewedPosts";
import { getAllPosts, getTopViewedPosts } from "@/lib/queries/blog";

export default async function BlogsPage() {
  const [posts, topPosts] = await Promise.all([
    getAllPosts(),
    getTopViewedPosts(),
  ]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <h1>Blogs Page</h1>
      <MostViewedPosts posts={topPosts} />
      <BlogPosts posts={posts} />
    </main>
  );
}
