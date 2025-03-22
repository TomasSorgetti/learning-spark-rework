import { BlogPosts } from "@/components/blog/BlogPosts";
import { MostViewedPosts } from "@/components/blog/mostViewedPost/MostViewedPosts";
import { Link } from "@/i18n/routing";
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

export default async function BlogsPage({ params, searchParams }) {
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
    <main className="min-h-screen flex flex-col items-center justify-center pt-20 md:pt-26 lg:pt-20">
      {!topPosts || topPosts.length === 0 || topPosts.error ? null : (
        <MostViewedPosts posts={topPosts} />
      )}

      {!blog || blog.posts.length === 0 || blog.error ? (
        <div className="h-[500px] flex flex-col items-center justify-start gap-4">
          <span className="text-red-500">
            We could not find any posts or server is down. Try again later.
          </span>
          <Link
            href="/"
            className="bg-primary cursor-pointer text-center transition-all duration-500 hover:bg-alter3 focus:bg-alter4 hover:shadow-lg px-6 py-2 text-white rounded-full font-semibold text-[18px]"
          >
            Go Home
          </Link>
        </div>
      ) : (
        <BlogPosts
          posts={blog?.posts}
          currentPage={page}
          totalPosts={blog.total}
          search={search}
        />
      )}
    </main>
  );
}
