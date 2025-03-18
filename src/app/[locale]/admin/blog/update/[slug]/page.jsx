import UpdatePostForm from "@/components/ui/forms/UpdatePostForm";
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
  console.log(post);

  return (
    <section className="h-screen flex flex-col items-center gap-4 text-secondary">
      <UpdatePostForm post={post} />
    </section>
  );
}
