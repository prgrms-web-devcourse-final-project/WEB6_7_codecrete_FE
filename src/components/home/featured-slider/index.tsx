"use client";

import { MouseEvent, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { SliderHeader } from "../SliderHeader";
import "swiper/css";
import { toast } from "sonner";
import ArtistCard from "./ArtistCard";

// 임시 데이터 타입
interface Artist {
  id: number;
  name: string;
  genre: string;
  imageUrl: string;
  followers: string;
}

interface FeaturedSliderProps {
  artists?: Artist[] | null;
}

export default function FeaturedSlider({ artists }: FeaturedSliderProps) {
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

  // 임시 데이터
  const mockArtists: Artist[] = Array.from({ length: 10 }).map((_, index) => ({
    id: index,
    name: "먼데이키즈",
    genre: "발라드 가수",
    imageUrl:
      "https://kopis.or.kr/_next/image?url=%2Fupload%2FpfmPoster%2FPF_PF281383_251211_125646.jpg&w=384&q=75",
    followers: "24.5K",
  }));

  const displayArtists = artists || mockArtists;

  const handleFollow = (e: MouseEvent<HTMLButtonElement>, artistId: number) => {
    e.preventDefault();
    e.stopPropagation();
    toast.success(`아티스트 ${artistId} 팔로우 되었습니다!`);
  };

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
              <ArtistCard artist={artist} onFollow={(e) => handleFollow(e, artist.id)} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
