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

export default async function AdminBlog() {
  const posts = (await getAllPosts()) || [];

  return (
    <section className="h-screen flex flex-col items-start px-20 justify-center gap-4 text-secondary">
      <h1 className="text-3xl font-bold">Admin Blog</h1>
      <div>
        <input type="text" placeholder="Search" />
        <Link href="/admin/blog/create">Create Blog</Link>
      </div>
      {posts.map((post) => (
        <div key={post._id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </div>
      ))}
    </section>
  );
}
