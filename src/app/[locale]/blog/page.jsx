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
  const resolvedSearchParams = await searchParams;

  const pageParam = resolvedSearchParams?.page ?? "1";
  const search = resolvedSearchParams?.search ?? "";
  const subject = resolvedSearchParams?.subject ?? "all";
  const page = parseInt(pageParam, 10) || 1;
  const limit = 9;

  const [blog, topPosts] = await Promise.all([
    getAllPosts({ page, limit, search, subject }),
    getTopViewedPosts(),
  ]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
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
