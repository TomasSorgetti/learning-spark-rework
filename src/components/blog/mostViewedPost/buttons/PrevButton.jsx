"use client";
import { useSwiper } from "swiper/react";

export default function PrevButton() {
  const swiper = useSwiper();

  return (
    <button
      className="hidden md:flex absolute h-[400px] top-0 left-0 z-40 items-center justify-center w-24 hover:bg-black hover:bg-opacity-50 transition-opacity group "
      onClick={() => swiper.slidePrev()}
    >
      <svg
        width="16"
        height="28"
        viewBox="0 0 16 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="rotate-180"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M15.3638 15.5553L3.07233 28L0 24.8894L10.7553 14L0 3.11062L3.07233 0L15.3638 12.4447C15.7712 12.8572 16 13.4167 16 14C16 14.5833 15.7712 15.1428 15.3638 15.5553Z"
          fill="white"
        />
      </svg>
    </button>
  );
}
