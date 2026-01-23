"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { useState } from "react";
import ConcertTicketCard from "./ConcertTicketCard";
import { ConcertWithTicket } from "@/types/home";

export default function ConcertSimilar({
  similarConcerts,
}: {
  similarConcerts: ConcertWithTicket[];
}) {
  // Swiper 인스턴스를 저장할 state
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

  if (similarConcerts.length === 0) {
    return null;
  }

  return (
    <section className="bg-bg-sub flex w-full flex-col gap-8 overflow-hidden px-5 py-10 lg:px-15 lg:py-20">
      <div className="mx-auto flex w-full max-w-400 items-center justify-between">
        <div className="space-y-1 md:space-y-2">
          <h2 className="text-text-main text-2xl font-extrabold md:text-3xl">
            🎈 이 공연도 여기서 해요
          </h2>
          <p className="text-text-sub text-sm font-medium md:text-base">
            같은 공연장에서 진행하는 다른 공연도 확인해보세요!
          </p>
        </div>
        {similarConcerts.length > 3 && (
          <div className="hidden gap-4 md:flex">
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
        )}
      </div>

      <div className="mx-auto w-full max-w-400">
        <Swiper onSwiper={setSwiperInstance} slidesPerView="auto" className="overflow-visible!">
          {similarConcerts.map((concert) => (
            <SwiperSlide key={concert.id} className="w-auto! pr-3 last:pr-0 md:pr-4 lg:pr-8">
              <ConcertTicketCard concert={concert} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
