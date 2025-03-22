import BlogSearchBar from "@/components/ui/forms/BlogSearchBar";
import BlogPagination from "@/components/ui/pagination/BlogPagination";
import BlogRow from "@/components/ui/tables/BlogRow";
import { Link } from "@/i18n/routing";
import { getAllPosts } from "@/lib/queries/blog";

export async function generateMetadata({ params, searchParams }, parent) {
  const locale = (await params).locale;

  const metadata = {
    en: {
      title: "Admin Blog - Learning Spark",
    },
    es: {
      title: "Admin Blog - Learning Spark",
    },
  };

  const selectedMetadata = metadata[locale] || metadata.en;

  return {
    title: selectedMetadata.title,
  };
}

export default async function AdminBlog({ searchParams }) {
  const resolvedSearchParams = await searchParams;

  const pageParam = resolvedSearchParams?.page ?? "1";
  const search = resolvedSearchParams?.search ?? "";
  const subject = resolvedSearchParams?.subject ?? "all";
  const page = parseInt(pageParam, 10) || 1;
  const limit = 9;

  const blog = (await getAllPosts({ page, limit, search, subject })) || {
    posts: [],
    total: 0,
  };

  const totalPages = Math.ceil(blog?.total / limit);

  if (!blog || blog?.posts?.length === 0 || blog.error) {
    return (
      <main className="h-screen w-full mt-28 flex flex-col items-center justify-center gap-4">
        <span className="text-red-500">
          We could not find any posts or server is down. Try again later.
        </span>
        <Link
          href="/"
          className="bg-primary cursor-pointer text-center transition-all duration-500 hover:bg-alter3 focus:bg-alter4 hover:shadow-lg px-6 py-2 text-white rounded-full font-semibold text-[18px]"
        >
          Go Home
        </Link>
      </main>
    );
  }
  return (
    <main className="h-screen w-full mt-28 flex flex-col items-start px-20 justify-start gap-4 text-secondary">
      <h1 className="text-3xl font-bold">Admin Blog</h1>
      <div className="flex items-start justify-between w-full">
        <BlogSearchBar search={search} href="/admin/blog" />
        <Link
          href="/admin/blog/create"
          className="p-2 bg-secondary text-white rounded min-w-[160px] text-center lg:mb-4"
        >
          Create Blog
        </Link>
      </div>

      <div className="w-full flex flex-col gap-1 overflow-y-scroll">
        {blog?.posts?.map((post) => (
          <BlogRow key={post._id} {...post} subject={post.subjectId.name} />
        ))}
      </div>
      <BlogPagination
        currentPage={page}
        totalPages={totalPages}
        href="/admin/blog"
      />
    </main>
  );
}
