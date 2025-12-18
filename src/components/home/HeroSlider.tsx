"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs, Mousewheel, EffectFade, Autoplay, Parallax } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import Image from "next/image";

import { twMerge } from "tailwind-merge";

const SLIDES = [
  {
    id: 1,
    title: "뮤지컬\n킹키부츠",
    description: "무지개 빛깔의 아름다운 이야기",
    place: "서울시씨어터",
    period: "2025.12.28 - 2026.3.29",
    bgImage: "/images/hero_slide_01.png",
    bgColorLeft: "#AF0C0D",
    bgColorRight: "#D2131A",
    darkBg: true,
  },
  {
    id: 2,
    title: "라이프 오브 파이\n한국 초연",
    description: "믿을 수 없는 경이로움!",
    place: "GS아트센터",
    period: "2025.11.29 - 2026.3.2",
    bgImage: "/images/hero_slide_02.png",
    bgColorLeft: "#0C1F49",
    bgColorRight: "#0C1F49",
    darkBg: true,
  },
  {
    id: 3,
    title: "츄\n2nd Tiny-Con",
    description: "첫 눈이 오면 그때 거기서 만나",
    place: "신한카드 SOL페이 스페어 라이브홀",
    period: "2025.12.13 - 2025.12.14",
    bgImage: "/images/hero_slide_03.png",
    bgColorLeft: "#050409",
    bgColorRight: "#050409",
    darkBg: true,
  },
  {
    id: 4,
    title: "뮤지컬\n데스노트",
    description: "최대 12만원 할인 로터리 티켓 OPEN",
    place: "NOL 티켓",
    period: "2025.12.9 - 2025.12.14",
    bgImage: "/images/hero_slide_04.png",
    bgColorLeft: "#010101",
    bgColorRight: "#010101",
    darkBg: true,
  },
  {
    id: 5,
    title: "도자 캣\n내한공연",
    description: "Doja Cat - Ma Vie World Tour",
    place: "킨텍스 제2전시장 10홀",
    period: "2025.12.13",
    bgImage: "/images/hero_slide_05.png",
    bgColorLeft: "#030201",
    bgColorRight: "#030201",
    darkBg: true,
  },
  {
    id: 6,
    title: "임영웅\nIM HERO 2025",
    description: "음악으로 건네는 진심, 영원히 기억될 순간",
    place: "서울투어",
    period: "2025.10.17 - 2026.2.8",
    bgImage: "/images/hero_slide_06.png",
    bgColorLeft: "#C28595",
    bgColorRight: "#8E6391",
    darkBg: true,
  },
  {
    id: 7,
    title: "뮤지컬\n보니 앤 클라이드",
    description: "역사상 가장 아이코닉한 커플의 이야기",
    place: "홍익대 대극로 아트센터 대극장",
    period: "2025.12.11 - 2026.3.2",
    bgImage: "/images/hero_slide_07.png",
    bgColorLeft: "#852121",
    bgColorRight: "#3d1a1a",
    darkBg: true,
  },
  {
    id: 8,
    title: "더 나이트 스펙트럼\n원더풀 나이트",
    description: "4인조 락밴드의 열정적인 공연",
    place: "올림픽체조경기장",
    period: "2025.12.20 - 2025.12.21",
    bgImage: "/images/hero_slide_08.png",
    bgColorLeft: "#050402",
    bgColorRight: "#050402",
    darkBg: true,
  },
  {
    id: 9,
    title: "피아노 협주곡의 밤\n클래식 페스티벌",
    description: "세계적 거장들의 우아한 선율",
    place: "예술의전당 콘서트홀",
    period: "2025.12.15 - 2025.12.17",
    bgImage: "/images/hero_slide_09.png",
    bgColorLeft: "#050402",
    bgColorRight: "#050402",
    darkBg: true,
  },
  {
    id: 10,
    title: "재즈 보컬의 매력\n달빛 아래",
    description: "감정이 흐르는 재즈의 세계로",
    place: "블루스퀘어 삼성홀",
    period: "2025.12.18 - 2025.12.19",
    bgImage: "/images/hero_slide_10.png",
    bgColorLeft: "#030001",
    bgColorRight: "#030001",
    darkBg: true,
  },
];

export default function HeroSlider() {
  // Swiper 인스턴스 저장 (직접 제어용)
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  return (
    <div className="relative h-130 w-full overflow-hidden bg-black text-white">
      {/* 메인 슬라이더 */}
      <Swiper
        // direction="vertical"
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
        modules={[Thumbs, Mousewheel, EffectFade, Autoplay, Parallax]}
        className="h-full w-full"
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        parallax={true}
        speed={1000}
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
                <div
                  className={twMerge(
                    "absolute top-20 left-25 space-y-6",
                    slide.darkBg ? "text-white" : "text-zinc-900"
                  )}
                >
                  <h2
                    className="text-6xl font-extrabold whitespace-pre-line"
                    data-swiper-parallax="-150%"
                  >
                    {slide.title}
                  </h2>
                  <h3 className="text-2xl font-bold" data-swiper-parallax="-175%">
                    {slide.description}
                  </h3>
                  <div className="space-y-1 font-semibold">
                    <p className="text-lg" data-swiper-parallax="-200%">
                      {slide.place}
                    </p>
                    <p className="text-lg" data-swiper-parallax="-225%">
                      {slide.period}
                    </p>
                  </div>
                </div>
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
