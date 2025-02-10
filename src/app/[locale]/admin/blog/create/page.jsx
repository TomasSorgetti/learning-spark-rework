import CreatePostForm from "@/components/forms/CreatePostForm";

export default async function CreateBlog() {
  return (
    <section className="h-screen w-full flex flex-col items-center gap-4 text-secondary">
      <CreatePostForm pageTitle="Create Post" />
    </section>
  );
}
