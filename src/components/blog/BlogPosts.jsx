import { Link } from "@/i18n/routing";
import { formatDate } from "@/lib/utils/formatDate";
import { cutText } from "@/lib/utils/cutText";
import { htmlToText } from "html-to-text";
import BlogPostCard from "../ui/cards/BlogPostCard";

export function BlogPosts({ posts = [] }) {
  return (
    <div>
      <h2>Blog Posts</h2>
      <div className="flex gap-3 justify-start max-w-[1000px] flex-wrap">
        {posts?.map((post) => {
          const plainTextContent = htmlToText(post.content, {
            wordwrap: false,
            tags: { p: { behavior: "text" } },
          });
          const previewText = cutText(plainTextContent, 100);
          const formatedDate = formatDate(post.createdAt);

          return (
            <BlogPostCard
              key={post._id}
              title={post.title}
              description={previewText}
              image={post.image}
              url={post.url}
              subject={post.subjectId.name}
              author={post.author}
              createdAt={formatedDate}
            />
          );
        })}
      </div>
    </div>
  );
}
