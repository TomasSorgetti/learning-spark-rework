import { Link } from "@/i18n/routing";
import { getPostBySlug } from "@/lib/queries/blog";
import { formatDate } from "@/lib/utils/formatDate";
import Image from "next/image";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  return {
    title: `${post?.title} - Learning Spark Blog`,
    description: post?.content?.substring(0, 160),
    keywords: post?.tags,
    openGraph: {
      title: `${post?.title} - Learning Spark Blog`,
      description: post?.content?.substring(0, 160),
      images: [
        {
          url: "/images/placeholder.png",
          width: 800,
          height: 600,
          alt: post?.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} - Learning Spark Blog`,
      description: post?.content?.substring(0, 160),
      images: [
        {
          url: "/images/placeholder.png",
          width: 800,
          height: 600,
          alt: post?.title,
        },
      ],
    },
    robots: {
      index: true,
      follow: true,
      nocache: true,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default async function PostPage({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (post.error || !post) {
    return (
      <main className="h-screen w-full mt-28 flex flex-col items-center justify-center gap-4">
        <span className="text-red-500">
          We could not find any post or server is down. Try again later.
        </span>
        <Link
          href="/"
          className="bg-primary cursor-pointer text-center transition-all duration-500 hover:bg-alter3 focus:bg-alter4 hover:shadow-lg px-6 py-2 text-white rounded-full font-semibold text-[18px]"
        >
          Go Home
        </Link>
      </main>
    );
  }
  return (
    <main className="min-h-screen flex flex-col items-center pt-20 md:pt-26 lg:pt-20">
      <section className="w-full h-[400px] relative flex flex-col items-center justify-center">
        <Image
          src={post.image || "/images/placeholder.png"}
          alt={post.title}
          width={313}
          height={200}
          draggable={false}
          loading="lazy"
          className="absolute object-cover w-full h-full filter brightness-[30%] z-[-1]"
        />
        <h1 className="z-10 text-white text-[42px]">{post.title}</h1>
      </section>
      <div className="mt-12 max-w-[1000px] w-full mx-auto flex flex-col gap-4 items-start">
        <div>
          <p>By {post.author}</p>
          <p>Created At {formatDate(post.createdAt)}</p>
          <span className="flex gap-2 items-center justify-start">
            <span className="w-[13px] h-[13px] rounded-full bg-alter2"></span>
            {post.subjectId.name}
          </span>
        </div>
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>
    </main>
  );
}
