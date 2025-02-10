import { getPostBySlug } from "@/lib/queries/blog";

export default async function PostPage({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </main>
  );
}
