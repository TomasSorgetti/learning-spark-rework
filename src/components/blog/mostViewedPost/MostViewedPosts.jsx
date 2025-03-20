"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import { htmlToText } from "html-to-text";
import { cutText } from "@/lib/utils/cutText";
import { formatDate } from "@/lib/utils/formatDate";
import NextButton from "./buttons/NextButton";
import PrevButton from "./buttons/PrevButton";
import CustomDots from "./buttons/CustomDots";

export function MostViewedPosts({ posts = [] }) {
  if (!posts) return null;

  return (
    <section className="mt-14 w-full">
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        loop
        modules={[Autoplay]}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
      >
        {posts.map((post) => {
          const plainTextContent = htmlToText(post.content, {
            wordwrap: false,
            tags: { p: { behavior: "text" } },
          });
          const previewText = cutText(plainTextContent, 80);
          const formatedDate = formatDate(post.createdAt);

          return (
            <SwiperSlide key={post._id} className="relative cursor-grab">
              <Image
                src="/images/placeholder.png"
                alt={post.title}
                width={313}
                height={200}
                draggable={false}
                loading="eager"
                className="absolute object-cover w-full h-full filter brightness-[30%] z-[-1]"
              />
              <div className="h-[400px] w-full flex flex-col items-center justify-center gap-4">
                <span className="flex gap-2 items-center text-white">
                  <span className="w-[13px] h-[13px] rounded-full bg-alter2"></span>
                  {post.subjectId.name}
                </span>
                <span className="text-white flex items-center gap-2">
                  <span className="font-bold">{post.author}</span>
                  {formatedDate}
                </span>
                <span className="text-white font-bold text-center max-w-[600px] text-[36px]">
                  {post.title}
                </span>
                <p className="text-white text-center max-w-[500px]">
                  {previewText}
                </p>
                <Link
                  href={`/blog/${post.url}`}
                  className="mt-4 bg-primary cursor-pointer text-center transition-all duration-500 hover:bg-alter3 focus:bg-alter4 hover:shadow-lg px-6 py-2 text-white rounded-full font-semibold text-[18px]"
                >
                  Read more
                </Link>
              </div>
            </SwiperSlide>
          );
        })}

        <PrevButton />
        <NextButton />

        <CustomDots totalSlides={posts.length} />
      </Swiper>
    </section>
  );
}
