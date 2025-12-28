"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { ConcertWithTicket } from "@/types/home";
import ConcertTicketCard from "./ConcertTicketCard";
import { SliderHeader } from "../SliderHeader";

interface UpcomingSliderProps {
  concerts: ConcertWithTicket[] | null;
}

export default function UpcomingSlider({ concerts }: UpcomingSliderProps) {
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

  if (!concerts?.length) return null;

  return (
    <section className="w-full overflow-hidden py-10 md:py-15 lg:py-20">
      <div className="flex flex-col gap-6 px-5 lg:gap-10 lg:px-15">
        {/* 헤더 */}
        <SliderHeader
          title="🎫 예매일 임박! 콘서트 모음"
          description="티켓팅 광탈하고 울지 말고 미리미리 예매하자구요"
          onPrev={() => swiperInstance?.slidePrev()}
          onNext={() => swiperInstance?.slideNext()}
        />

        {/* 슬라이더 */}
        <div className="mx-auto w-full max-w-400">
          <Swiper onSwiper={setSwiperInstance} slidesPerView="auto" className="overflow-visible!">
            {concerts.map((concert) => (
              <SwiperSlide key={concert.id} className="w-auto! pr-3 last:pr-0 md:pr-4 lg:pr-8">
                <ConcertTicketCard concert={concert} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
