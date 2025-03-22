import UpdatePostForm from "@/components/ui/forms/UpdatePostForm";
import { Link } from "@/i18n/routing";
import { getPostBySlug } from "@/lib/queries/blog";

export async function generateMetadata({ params, searchParams }, parent) {
  const locale = (await params).locale;

  const metadata = {
    en: {
      title: "Update post - Learning Spark",
    },
    es: {
      title: "Modificar post - Learning Spark",
    },
  };

  const selectedMetadata = metadata[locale] || metadata.en;

  return {
    title: selectedMetadata.title,
  };
}

export default async function UpdateBlog({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  return (
    <main className="h-screen w-full flex flex-col items-center gap-4 text-secondary">
      {post.error || !post ? (
        <div className="h-screen w-full mt-28 flex flex-col items-center justify-center gap-4">
          <span className="text-red-500">
            We could not find any post or server is down. Try again later.
          </span>
          <Link
            href="/"
            className="bg-primary cursor-pointer text-center transition-all duration-500 hover:bg-alter3 focus:bg-alter4 hover:shadow-lg px-6 py-2 text-white rounded-full font-semibold text-[18px]"
          >
            Go Home
          </Link>
        </div>
      ) : (
        <UpdatePostForm post={post} />
      )}
    </main>
  );
}
