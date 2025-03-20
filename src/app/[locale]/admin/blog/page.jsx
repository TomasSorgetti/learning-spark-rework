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
  const page = parseInt(searchParams?.page) || 1;
  const limit = 9;
  const blog = (await getAllPosts({ page, limit })) || [];

  return (
    <section className="h-screen w-full flex flex-col items-start px-20 justify-center gap-4 text-secondary">
      <h1 className="text-3xl font-bold">Admin Blog</h1>
      <div className="flex justify-between w-full">
        <input type="text" placeholder="Search" />
        <Link
          href="/admin/blog/create"
          className="p-2 bg-secondary text-white rounded"
        >
          Create Blog
        </Link>
      </div>
      <div className="w-full flex flex-col gap-1 overflow-y-scroll">
        {blog.posts.map((post) => (
          <BlogRow key={post._id} {...post} subject={post.subjectId.name} />
        ))}
      </div>
    </section>
  );
}
