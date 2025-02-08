import CreatePostForm from "@/components/forms/CreatePostForm";

export default async function UpdateBlog() {
  return (
    <section className="h-screen flex flex-col items-center gap-4 text-secondary">
      <CreatePostForm pageTitle="Update Post" />
    </section>
  );
}
