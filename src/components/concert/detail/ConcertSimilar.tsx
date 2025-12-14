"use client";

import { Calendar, ChevronLeft, ChevronRight, Heart, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { twMerge } from "tailwind-merge";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { useState } from "react";

export default function ConcertSimilar() {
  // Swiper 인스턴스를 저장할 state
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

  return (
    <section className={twMerge(`similar bg-bg-sub flex w-full flex-col gap-8 px-40 py-20`)}>
      <div className={twMerge(`header flex w-full items-center justify-between`)}>
        <div className="intro flex flex-col gap-1">
          <h2 className="text-text-main text-3xl font-bold">추천 공연</h2>
          <p className="text-text-sub text-sm">이런 공연도 한 번 확인해보세요!</p>
        </div>
        <div className="btn flex gap-4">
          <Button
            variant="outline"
            onClick={() => swiperInstance?.slidePrev()} // 인스턴스 사용
            className="size-12 cursor-pointer rounded-full"
          >
            <ChevronLeft className="stroke-border-point size-6" />
          </Button>
          <Button
            variant="outline"
            onClick={() => swiperInstance?.slideNext()} // 인스턴스 사용
            className="size-12 cursor-pointer rounded-full"
          >
            <ChevronRight className="stroke-border-point size-6" />
          </Button>
        </div>
      </div>

      <div className="m-auto w-full max-w-400">
        <Swiper
          onSwiper={setSwiperInstance}
          slidesPerView={4}
          spaceBetween={32}
          loop={true}
          className="w-full overflow-visible!"
        >
          {Array.from({ length: 10 }).map((_, index) => (
            <SwiperSlide key={index} className="mr-8 w-auto! last:mr-0">
              <Link className="relative block w-80" href="#">
                <div className="concert-card rounded-xl">
                  <div className="relative">
                    <Image
                      src="/ConcertPoster.png"
                      alt="Concert Poster"
                      width={380}
                      height={255}
                      className="aspect-3/2 rounded-t-lg"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      className={twMerge(
                        `border-border hover:bg-border absolute top-3 right-3 z-0`
                      )}
                    >
                      <Heart />
                    </Button>
                    <Badge
                      className={twMerge(
                        `bg-point-main text-text-point-main absolute bottom-3 left-3 z-0 mr-2 text-sm`
                      )}
                    >
                      Rock
                    </Badge>
                  </div>
                  <div className="bg-bg-main flex flex-col gap-1 p-4">
                    <strong className="text-lg">Thunder Valley Live</strong>
                    <div className="text-text-sub flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <p>2026-01-02</p>
                    </div>
                    <div className="text-text-sub flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <p>고척스카이돔</p>
                    </div>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
