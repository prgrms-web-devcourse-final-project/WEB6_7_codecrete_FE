"use client";

import { Suspense, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import QrCode from "@/components/ui/qr-code";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Concert } from "@/types/home";
import UpcomingSkeleton from "../loading/UpcomingSkeleton";
import Image from "next/image";

export default function UpcomingSlider({ concerts }: { concerts: Concert[] }) {
  // Swiper 인스턴스 저장 (직접 제어용)
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

  return (
    <section className="w-full overflow-hidden py-20">
      <div className="px-15">
        <div className="mx-auto mb-10 flex w-full max-w-400 items-center justify-between">
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
        <div className="m-auto w-full max-w-400">
          <Suspense fallback={<UpcomingSkeleton />}>
            <Swiper
              onSwiper={setSwiperInstance}
              slidesPerView="auto"
              className="w-full overflow-visible!"
            >
              {concerts.map((concert) => {
                const startDate = new Date(concert.startDate);
                const endDate = new Date(concert.endDate);

                let dateString = "";
                // TODO : 공연 시간도 반영하기 (현재는 날짜만 입력되어 있음)

                if (startDate === endDate) {
                  dateString = `${startDate.getFullYear()}.${(startDate.getMonth() + 1).toString().padStart(2, "0")}.${startDate.getDate().toString().padStart(2, "0")}`;
                } else {
                  dateString = `${startDate.getFullYear()}.${(startDate.getMonth() + 1).toString().padStart(2, "0")}.${startDate.getDate().toString().padStart(2, "0")} ― ${endDate.getDate().toString().padStart(2, "0")}`;
                }

                return (
                  <SwiperSlide key={concert.id} className="group mr-8 w-auto! last:mr-0">
                    <Link className="relative block w-80" href={`/concerts/${concert.id}`}>
                      <AspectRatio ratio={320 / 426.5}>
                        <Image
                          src={concert.posterUrl}
                          alt={concert.name}
                          className="rounded-2xl object-cover"
                          loading="eager"
                          priority
                          width={320}
                          height={426.5}
                        />
                      </AspectRatio>
                      <div className="absolute top-0 left-0 flex h-full w-full flex-col bg-zinc-900/30 opacity-0 backdrop-blur-xs transition-opacity group-hover:opacity-100">
                        <div className="flex h-[58.8%] items-center justify-center p-6">
                          <h3 className="text-center text-2xl font-semibold text-white">
                            {concert.name}
                          </h3>
                        </div>
                        <div className="border-t-bg-main flex h-[41.2%] items-center justify-between border-t border-dashed p-6">
                          <ul className="space-y-5.5 text-white">
                            <li className="space-y-2">
                              <strong className="text-base font-semibold">Date</strong>
                              <p>{dateString}</p>
                            </li>
                            <li className="space-y-2">
                              <strong className="text-base font-semibold">Venue</strong>
                              <p>{concert.placeName}</p>
                            </li>
                          </ul>
                          {/* TODO : 해당 공연의 예매 가능한 링크 넣기 */}
                          <QrCode address="https://ncbticket.com/concerts/1" size={64} />
                        </div>
                        {/* 티켓 옆 꾸밈요소 */}
                        <div className="absolute top-[58.8%] -mt-4 w-full">
                          <div className="bg-bg-main absolute -right-4 h-8 w-8 rounded-full"></div>
                          <div className="bg-bg-main absolute -left-4 h-8 w-8 rounded-full"></div>
                        </div>
                      </div>
                      {/* 티켓 각 모서리 꾸밈요소 */}
                      <div className="etc">
                        <div className="bg-bg-main absolute -top-4 -left-4 h-8 w-8 rounded-full"></div>
                        <div className="bg-bg-main absolute -top-4 -right-4 h-8 w-8 rounded-full"></div>
                        <div className="bg-bg-main absolute -bottom-4 -left-4 h-8 w-8 rounded-full"></div>
                        <div className="bg-bg-main absolute -right-4 -bottom-4 h-8 w-8 rounded-full"></div>
                      </div>
                    </Link>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </Suspense>
        </div>
      </div>
    </section>
  );
}
