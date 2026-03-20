"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { ConcertWithTicket } from "@/types/home";
import ConcertTicketCard from "./ConcertTicketCard";
import { SliderHeader } from "@/components/common/SliderHeader";
import { cn } from "@/lib/utils";

interface TicketShapeSliderProps {
  concerts: ConcertWithTicket[] | null;
  title: string;
  description: string;
  className?: string;
}

export default function TicketShapeSlider({
  concerts,
  title,
  description,
  className,
}: TicketShapeSliderProps) {
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

  if (!concerts?.length) return null;

  const handlePrev = () => {
    swiperInstance?.slidePrev();
  };
  const handleNext = () => {
    swiperInstance?.slideNext();
  };

  return (
    <section className={cn("w-full overflow-hidden py-10 md:py-15 lg:py-20", className)}>
      <div className="flex flex-col gap-6 px-5 lg:gap-10 lg:px-15">
        {/* 헤더 */}
        <SliderHeader
          title={title}
          description={description}
          onPrev={handlePrev}
          onNext={handleNext}
          className="mx-auto w-full max-w-400"
        />

        {/* 슬라이더 */}
        <div className="mx-auto w-full max-w-400">
          <Swiper onSwiper={setSwiperInstance} slidesPerView="auto" className="overflow-visible!">
            {concerts.map((concert, index) => (
              <SwiperSlide key={concert.id} className="w-auto! pr-3 last:pr-0 md:pr-4 lg:pr-8">
                <ConcertTicketCard concert={concert} priority={index === 0} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
