import { formatDate } from "@/lib/utils/formatDate";
import { cutText } from "@/lib/utils/cutText";
import { htmlToText } from "html-to-text";
import BlogPostCard from "../ui/cards/BlogPostCard";
import BlogPagination from "../ui/pagination/BlogPagination";
import BlogSearchBar from "../ui/forms/BlogSearchBar";

export function BlogPosts({ posts = [], currentPage, totalPosts, search }) {
  const postsPerPage = 9;
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  return (
    <section className="w-full">
      <div className="my-20">
        <h1 className="text-center font-bold text-[38px] mb-6 max-w-[600px] mx-auto">
          Guides and Tips for Your IB and IGCSE Exams
        </h1>
        <p className="max-w-[600px] mx-auto text-center">
          Explore expert articles with practical guides and study tips to excel
          in your IB and IGCSE exams, tailored for your success!
        </p>
      </div>

      {/* Search */}
      <BlogSearchBar search={search} href="/blog" />
      {/* Posts */}
      <div className="flex gap-3 my-10 justify-center w-full max-w-[1000px] mx-auto flex-wrap lg:justify-start">
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

      <BlogPagination
        currentPage={currentPage}
        totalPages={totalPages}
        href="/blog"
      />
    </section>
  );
}
