import { Link } from "@/i18n/routing";

export function BlogPosts({ posts = [] }) {
  console.log(posts);

  return (
    <div>
      <h2>Blog Posts</h2>
      {posts?.map((post) => (
        <div key={post._id}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <Link href={`/blog/${post.url}`}>Read more</Link>
        </div>
      ))}
    </div>
  );
}
