"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { SliderHeader } from "../../common/SliderHeader";
import "swiper/css";
import ArtistCard from "./ArtistCard";
import { ArtistListData } from "@/types/artists";

export default function FeaturedSlider({
  artists,
  isAuthenticated,
}: {
  artists: ArtistListData | null;
  isAuthenticated: boolean;
}) {
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

  const displayArtists = artists?.content;

  if (!displayArtists?.length) return null;

  return (
    <section className="bg-bg-sub w-full overflow-hidden px-5 py-10 md:py-15 lg:px-15 lg:py-20">
      <div className="mx-auto flex w-full max-w-400 flex-col gap-6 lg:gap-10">
        <SliderHeader
          title="💖 당신의 취향을 저격할 아티스트"
          description="팔로우하고 공연 소식 제일 먼저 받아보세요!"
          onPrev={() => swiperInstance?.slidePrev()}
          onNext={() => swiperInstance?.slideNext()}
        />

        <Swiper
          onSwiper={setSwiperInstance}
          spaceBetween={12}
          slidesPerView={5}
          loop={true}
          breakpoints={{
            320: {
              slidesPerView: 1.5,
              spaceBetween: 16,
            },
            475: {
              slidesPerView: 2,
              spaceBetween: 16,
            },
            640: {
              slidesPerView: 2.5,
              spaceBetween: 16,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 24,
            },
            1280: {
              slidesPerView: 5,
              spaceBetween: 24,
            },
          }}
          className="w-full"
        >
          {displayArtists.map((artist) => (
            <SwiperSlide key={artist.id}>
              <ArtistCard artist={artist} isAuthenticated={isAuthenticated} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
