"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Button } from "@/components/ui/button";

// Swiper CSS
import "swiper/css";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import QrCode from "@/components/ui/qr-code";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function UpcomingSlider() {
  // Swiper 인스턴스를 저장할 state
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

  return (
    <section className="w-full overflow-hidden py-20">
      <div className="mx-auto mb-10 flex w-full max-w-400 items-center justify-between px-15">
        <div className="space-y-2">
          <h2 className="text-text-main text-3xl font-extrabold">🎫 예매일 임박! 콘서트 모음</h2>
          <p className="text-text-sub text-base font-medium">
            티켓팅 광탈하고 울지 말고 미리미리 예매하자구요
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
        <Swiper
          onSwiper={setSwiperInstance}
          slidesPerView="auto"
          className="w-full overflow-visible!"
        >
          {Array.from({ length: 10 }).map((_, index) => (
            <SwiperSlide key={index} className="group mr-8 w-auto! last:mr-0">
              <Link className="relative block w-80" href="#">
                <AspectRatio ratio={320 / 426.5}>
                  <Image
                    src="https://kopis.or.kr/_next/image?url=%2Fupload%2FpfmPoster%2FPF_PF281383_251211_125646.jpg&w=384&q=75"
                    alt="먼데이프로젝트 시즌8, 급한노새 단독 콘서트: Adventure Time"
                    fill
                    className="rounded-2xl object-cover"
                  />
                </AspectRatio>
                <div className="absolute top-0 left-0 flex h-full w-full flex-col bg-zinc-900/30 opacity-0 backdrop-blur-xs transition-opacity group-hover:opacity-100">
                  <div className="flex h-[58.8%] items-center justify-center p-6">
                    <h3 className="text-center text-2xl font-semibold text-white">
                      먼데이프로젝트 시즌8, 급한노새 단독 콘서트: Adventure Time
                    </h3>
                  </div>
                  <div className="border-t-bg-main flex h-[41.2%] items-center justify-between border-t border-dashed p-6">
                    <ul className="space-y-5.5 text-white">
                      <li className="space-y-2">
                        <strong className="text-base font-semibold">Date</strong>
                        <p>2025.12.11 ― 12 6PM</p>
                      </li>
                      <li className="space-y-2">
                        <strong className="text-base font-semibold">Venue</strong>
                        <p>Musinsa Garage</p>
                      </li>
                    </ul>
                    <QrCode address="https://ncbticket.com/concerts/1" size={64} />
                  </div>
                  <div className="absolute top-[58.8%] -mt-4 w-full">
                    <div className="bg-bg-main absolute -right-4 h-8 w-8 rounded-full"></div>
                    <div className="bg-bg-main absolute -left-4 h-8 w-8 rounded-full"></div>
                  </div>
                </div>
                <div className="etc">
                  <div className="bg-bg-main absolute -top-4 -left-4 h-8 w-8 rounded-full"></div>
                  <div className="bg-bg-main absolute -top-4 -right-4 h-8 w-8 rounded-full"></div>
                  <div className="bg-bg-main absolute -bottom-4 -left-4 h-8 w-8 rounded-full"></div>
                  <div className="bg-bg-main absolute -right-4 -bottom-4 h-8 w-8 rounded-full"></div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
