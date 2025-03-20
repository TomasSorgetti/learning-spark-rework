import { BlogPosts } from "@/components/blog/BlogPosts";
import { MostViewedPosts } from "@/components/blog/mostViewedPost/MostViewedPosts";
import { getAllPosts, getTopViewedPosts } from "@/lib/queries/blog";

export default async function BlogsPage({ searchParams }) {
  const page = parseInt(searchParams?.page) || 1;
  const limit = 9;

  const [blog, topPosts] = await Promise.all([
    getAllPosts({ page, limit }),
    getTopViewedPosts(),
  ]);

  if (!blog) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center">
        <h1>Error to get posts</h1>
      </main>
    );
  }
  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <h1>Blogs Page</h1>
      <MostViewedPosts posts={topPosts} />
      <BlogPosts
        posts={blog.posts}
        currentPage={page}
        totalPosts={blog.total}
      />
    </main>
  );
}
