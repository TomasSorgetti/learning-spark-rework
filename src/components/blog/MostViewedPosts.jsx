"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import MainButton from "../ui/buttons/MainButton";
import { htmlToText } from "html-to-text";
import { cutText } from "@/lib/utils/cutText";
import { formatDate } from "@/lib/utils/formatDate";

export function MostViewedPosts({ posts = [] }) {
  if (!posts) return null;

  return (
    <section className="mt-16 w-full">
      <Swiper spaceBetween={0} slidesPerView={1} loop>
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
                <MainButton href={`/blog/${post.url}`} className="mt-4">
                  Read more
                </MainButton>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
}
