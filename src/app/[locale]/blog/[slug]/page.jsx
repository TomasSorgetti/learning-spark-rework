import { getPostBySlug } from "@/lib/queries/blog";
import { formatDate } from "@/lib/utils/formatDate";
import Image from "next/image";

// Manual Cache with Map
const postCache = new Map();

async function getCachedPost(slug) {
  if (postCache.has(slug)) {
    return postCache.get(slug);
  }
  const post = await getPostBySlug(slug);
  postCache.set(slug, post);
  return post;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getCachedPost(slug);

  return {
    title: `${post.title} - Learning Spark Blog`,
    description: post.content.substring(0, 160),
    keywords: post.tags,
    openGraph: {
      title: `${post.title} - Learning Spark Blog`,
      description: post.content.substring(0, 160),
      images: [
        {
          url: "/images/placeholder.png",
          width: 800,
          height: 600,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} - Learning Spark Blog`,
      description: post.content.substring(0, 160),
      images: [
        {
          url: "/images/placeholder.png",
          width: 800,
          height: 600,
          alt: post.title,
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
  const post = await getCachedPost(slug);

  return (
    <main className="min-h-screen flex flex-col items-center mt-12">
      <section className="w-full h-[400px] relative flex flex-col items-center justify-center">
        <Image
          src="/images/placeholder.png"
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
