import { Link } from "@/i18n/routing";
import Image from "next/image";

export default function BlogPostCard({
  title,
  description,
  image,
  url,
  subject,
  author,
  createdAt,
}) {
  return (
    <div className="flex flex-col gap-4 max-w-[313px] w-full h-[476px] bg-white border border-[1px]-gray rounded-[10px] shadow-md">
      <div className="relative overflow-hidden h-[200px]">
        <div className="absolute top-0 left-0 p-4 z-10 flex flex-col items-start gap-2 text-white">
          <span>By {author}</span>
          <p>{createdAt}</p>
        </div>
        
        <Image
          src={image || "/images/placeholder.png"}
          alt={title}
          width={313}
          height={200}
          draggable={false}
          loading="lazy"
          className="rounded-t-[10px] object-cover h-full"
        />
      </div>

      <div className="h-full max-h-[276px] flex flex-col justify-between items-start p-6 pt-0">
        <div className="flex flex-col items-start gap-2">
          <span className="flex gap-2 items-center justify-start">
            <span className="rounded-full bg-alter2 h-[13px] w-[13px]"></span>
            {subject}
          </span>
          <h3 className="text-[20px] font-bold h-[60px]">{title}</h3>
          <p>{description}</p>
        </div>
        <Link
          href={`/blog/${url}`}
          className="bg-primary py-2 px-4 font-bold text-white rounded-full hover:bg-alter3 hover:shadow-lg mt-2"
        >
          Read post
        </Link>
      </div>
    </div>
  );
}
