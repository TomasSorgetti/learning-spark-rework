import CreatePostForm from "@/components/forms/CreatePostForm";

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

export default async function UpdateBlog() {
  return (
    <section className="h-screen flex flex-col items-center gap-4 text-secondary">
      <CreatePostForm pageTitle="Update Post" />
    </section>
  );
}
