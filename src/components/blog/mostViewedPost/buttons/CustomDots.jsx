"use client";

import { useState, useEffect } from "react";
import { useSwiper } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";

export default function CustomDots({ totalSlides }) {
  const swiper = useSwiper();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleSlideChange = () => {
      setActiveIndex(swiper.realIndex);
    };
    swiper.on("slideChange", handleSlideChange);

    return () => {
      swiper.off("slideChange", handleSlideChange);
    };
  }, [swiper]);

  const goToSlide = (index) => {
    swiper.slideToLoop(index);
  };

  return (
    <div className="flex justify-center gap-2 mt-6">
      {Array.from({ length: totalSlides }).map((_, index) => (
        <button
          key={index}
          className="w-[57px] h-[15px] rounded-[10px] transition-colors"
          style={{
            backgroundColor: activeIndex === index ? "#211842" : "#D9D9D9",
            opacity: 1,
            border: "none",
          }}
          onClick={() => goToSlide(index)}
        />
      ))}
    </div>
  );
}
