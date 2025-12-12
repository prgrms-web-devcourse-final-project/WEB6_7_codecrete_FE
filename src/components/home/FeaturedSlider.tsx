"use client";

import { MouseEvent, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Button } from "@/components/ui/button";

// Swiper CSS
import "swiper/css";
import Link from "next/link";
import { ChevronLeft, ChevronRight, UsersRound } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function FeaturedSlider() {
  // Swiper 인스턴스를 저장할 state
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

  const handleFollow = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    e.stopPropagation();
    alert("팔로우 되었습니다!");
  };

  return (
    <section className="bg-bg-sub w-full overflow-hidden py-20">
      <div className="mx-auto mb-10 flex w-full max-w-400 items-center justify-between px-15">
        <div className="space-y-2">
          <h2 className="text-text-main text-3xl font-extrabold">
            💖 당신의 취향을 저격할 아티스트
          </h2>
          <p className="text-text-sub text-base font-medium">
            팔로우하고 공연 소식 제일 먼저 받아보세요!
          </p>
        </div>
        <div className="flex gap-4">
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

      <div className="m-auto w-full max-w-400 px-15">
        <Swiper onSwiper={setSwiperInstance} slidesPerView={5} spaceBetween={24} loop={true}>
          {Array.from({ length: 10 }).map((_, index) => (
            <SwiperSlide key={index} className="group">
              <Link className="relative block" href="#">
                <Card className="items-center p-8 text-center shadow-none">
                  <Avatar className="ring-border size-30 ring-4">
                    <AvatarImage
                      src="https://kopis.or.kr/_next/image?url=%2Fupload%2FpfmPoster%2FPF_PF281383_251211_125646.jpg&w=384&q=75"
                      alt="아티스트"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className="">
                    <h3 className="text-text-main text-lg font-bold">먼데이키즈</h3>
                    <p className="text-text-sub text-sm font-semibold">발라드 가수</p>
                  </div>
                  <div className="text-text-sub flex items-center gap-2 text-sm font-semibold">
                    <UsersRound size={12} strokeWidth={3} />
                    <p>24.5K 팔로우 중</p>
                  </div>
                  <Button
                    variant="default"
                    size="lg"
                    className="w-full"
                    onClick={(e) => handleFollow(e)}
                  >
                    팔로우
                  </Button>
                </Card>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
