import CreatePostForm from "@/components/ui/forms/CreatePostForm";

export async function generateMetadata({ params, searchParams }, parent) {
  const locale = (await params).locale;

  const metadata = {
    en: {
      title: "Create new post - Learning Spark",
    },
    es: {
      title: "Crear un nuevo post - Learning Spark",
    },
  };

  const selectedMetadata = metadata[locale] || metadata.en;

  return {
    title: selectedMetadata.title,
  };
}

export default async function CreateBlog() {
  return (
    <section className="h-screen w-full flex flex-col items-center gap-4 text-secondary">
      <CreatePostForm pageTitle="Create Post" />
    </section>
  );
}
