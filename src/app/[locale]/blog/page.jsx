import { BlogPosts } from "@/components/blog/BlogPosts";
import { MostViewedPosts } from "@/components/blog/mostViewedPost/MostViewedPosts";
import { getAllPosts, getTopViewedPosts } from "@/lib/queries/blog";
export const dynamic = "force-dynamic";

export async function generateMetadata({ params, searchParams }) {
  const locale = (await params).locale;
  const metadata = {
    en: { title: "Blog | Learning Spark", description: "", keywords: "" },
    es: { title: "Blog | Learning Spark", description: "", keywords: "" },
  };
  const selectedMetadata = metadata[locale] || metadata.en;
  return {
    title: selectedMetadata.title,
    description: selectedMetadata.description,
  };
}

export default async function BlogsPage({ searchParams }) {
  const pageParam = (await searchParams?.page) ?? "1";
  const search = (await searchParams?.search) ?? "";
  const subject = (await searchParams?.subject) ?? "all";
  const page = parseInt(pageParam, 10) || 1;
  const limit = 9;

  const [blog, topPosts] = await Promise.all([
    getAllPosts({ page, limit, search, subject }),
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
        search={search}
      />
    </main>
  );
}
