"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs, Mousewheel, EffectFade, Autoplay, Parallax } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import Image from "next/image";
import { SLIDES } from "./constants";
import ThumbsSlider from "./ThumbsSlider";
import { SlideContentProps } from "@/types/home";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

export default function HeroSlider() {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const isMobile = useIsMobile();

  return (
    <div className="relative h-100 w-full overflow-hidden bg-black text-white md:h-150 lg:h-130">
      {/* 메인 슬라이더 */}
      <Swiper
        direction={isMobile ? "horizontal" : "vertical"}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
        modules={[Thumbs, Mousewheel, EffectFade, Autoplay, Parallax]}
        className="h-full w-full"
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        parallax={true}
        speed={1000}
        effect={isMobile ? "fade" : undefined}
      >
        {SLIDES.map((slide, index) => (
          <SwiperSlide key={slide.id} className="h-full w-full">
            <SlideContent slide={slide} priority={index === 0} />
          </SwiperSlide>
        ))}
      </Swiper>
      <ThumbsSlider isMobile={isMobile} onSwiper={setThumbsSwiper} />
    </div>
  );
}

function SlideContent({ slide, priority = false }: SlideContentProps) {
  return (
    <div className="flex h-full w-full flex-col lg:flex-row">
      {/* 왼쪽 배경색 - 데스크톱만 */}
      <div className="hidden flex-1 lg:block" style={{ backgroundColor: slide.bgColorLeft }} />

      {/* 메인 콘텐츠 */}
      <div className="relative h-full w-full lg:max-w-[1600px]">
        <Image
          src={slide.bgImage}
          alt={slide.title}
          fill
          className="object-cover object-center"
          placeholder="blur"
          priority={priority}
          fetchPriority={priority ? "high" : "auto"}
          sizes="(max-width: 768px) 100dvw, (max-width: 1200px) 100dvw, 1600px"
        />

        {/* 텍스트 오버레이 */}
        <div
          className={cn(
            "absolute top-10 left-5 space-y-3 md:top-15 md:left-10 md:space-y-4 lg:top-20 lg:left-25 lg:space-y-6",
            slide.darkBg ? "text-white" : "text-zinc-900"
          )}
        >
          <h2
            className="text-3xl font-extrabold whitespace-pre-line md:text-4xl lg:text-6xl"
            data-swiper-parallax="-100%"
            data-swiper-parallax-opacity="0"
          >
            {slide.title}
          </h2>
          <h3
            className="text-base font-bold md:text-lg lg:text-2xl"
            data-swiper-parallax="-70%"
            data-swiper-parallax-opacity="0"
          >
            {slide.description}
          </h3>
          <div className="space-y-0.5 text-xs font-semibold md:space-y-1 md:text-sm lg:text-lg">
            <p data-swiper-parallax="-40%" data-swiper-parallax-opacity="0">
              {slide.place}
            </p>
            <p data-swiper-parallax="-40%" data-swiper-parallax-opacity="0">
              {slide.period}
            </p>
          </div>
        </div>
      </div>

      {/* 오른쪽 배경색 - 데스크톱만 */}
      <div className="hidden flex-1 lg:block" style={{ backgroundColor: slide.bgColorRight }} />
    </div>
  );
}
