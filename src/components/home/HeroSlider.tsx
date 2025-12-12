"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs, Mousewheel, EffectFade, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import Image from "next/image";

// swiper css
import "swiper/css";
import "swiper/css/thumbs";
import "swiper/css/effect-fade";
import { twMerge } from "tailwind-merge";

const SLIDES = [
  {
    id: 1,
    title: "슬라이드 1",
    bgImage: "/images/slide01.gif",
    bgColorLeft: "#cab5be",
    bgColorRight: "#cab5be",
  },
  {
    id: 2,
    title: "슬라이드 2",
    bgImage: "/images/slide02.gif",
    bgColorLeft: "#030001",
    bgColorRight: "#030001",
  },
  {
    id: 3,
    title: "슬라이드 3",
    bgImage: "/images/slide03.gif",
    bgColorLeft: "#030001",
    bgColorRight: "#030001",
  },
  {
    id: 4,
    title: "슬라이드 4",
    bgImage: "/images/slide04.gif",
    bgColorLeft: "#030001",
    bgColorRight: "#030001",
  },
  {
    id: 5,
    title: "슬라이드 4",
    bgImage: "/images/slide05.gif",
    bgColorLeft: "#c53121",
    bgColorRight: "#c53121",
  },
  {
    id: 6,
    title: "슬라이드 4",
    bgImage: "/images/slide06.gif",
    bgColorLeft: "#030001",
    bgColorRight: "#030001",
  },
];

export default function HeroSlider() {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  return (
    <div className="relative h-130 w-full overflow-hidden bg-black text-white">
      {/* 메인 슬라이더 */}
      <Swiper
        direction="vertical"
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
        modules={[Thumbs, Mousewheel, EffectFade, Autoplay]}
        className="h-full w-full"
      >
        {SLIDES.map((slide) => (
          <SwiperSlide key={slide.id} className="h-full w-full">
            <div className="flex h-full w-full">
              <div className="flex-1" style={{ backgroundColor: slide.bgColorLeft }} />
              <div className="relative h-full w-full max-w-[1600px]">
                <Image
                  src={slide.bgImage}
                  alt={slide.title}
                  fill
                  className="h-130 w-auto object-cover"
                />
              </div>
              <div className="flex-1" style={{ backgroundColor: slide.bgColorRight }} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* 썸네일 슬라이더 (우측) */}
      <div className="absolute top-1/2 right-10 z-20 flex h-full -translate-y-1/2 flex-col justify-center py-20">
        <Swiper
          onSwiper={setThumbsSwiper}
          direction="vertical"
          centeredSlides={true}
          centeredSlidesBounds={true}
          slideToClickedSlide={true}
          spaceBetween={8}
          slidesPerView="auto"
          watchSlidesProgress={true}
          modules={[Thumbs]}
          className="thumbs-swiper h-full! w-auto!"
          style={{ overflow: "visible" }}
        >
          {SLIDES.map((slide) => (
            <SwiperSlide key={slide.id} className="group h-auto! w-auto! py-2">
              <div
                className={twMerge(
                  "relative m-auto h-15 w-15 cursor-pointer rounded-xl",
                  "group-[.swiper-slide-thumb-active]:h-18 group-[.swiper-slide-thumb-active]:w-18",
                  "group-[.swiper-slide-thumb-active]:ring-2 group-[.swiper-slide-thumb-active]:ring-white"
                )}
              >
                <Image
                  src={slide.bgImage}
                  alt={slide.title}
                  fill
                  className="rounded-xl object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
