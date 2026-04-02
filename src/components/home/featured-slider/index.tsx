"use client";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { SliderHeader } from "../../common/SliderHeader";
import "swiper/css";
import ArtistCard from "./ArtistCard";
import { useQuery } from "@tanstack/react-query";
import FeaturedArtistsSkeleton from "@/components/loading/home/FeaturedArtistsSkeleton";
import { artistQueries } from "@/queries/artists";
import EmptySection from "@/components/common/EmptySection";

export default function FeaturedSlider({ isAuthenticated }: { isAuthenticated: boolean }) {
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

  const { data, isLoading, isError } = useQuery(artistQueries.featured(0, 20, "LIKE"));

  if (isLoading) return <FeaturedArtistsSkeleton />;
  if (isError) {
    return (
      <section className="bg-bg-sub w-full overflow-hidden px-5 py-10 md:py-15 lg:px-15 lg:py-20">
        <div className="mx-auto flex w-full max-w-400 flex-col gap-6 lg:gap-10">
          <div className="space-y-1 md:space-y-2">
            <h2 className="text-text-main text-2xl font-extrabold md:text-3xl">
              💖 당신의 취향을 저격할 아티스트
            </h2>
            <p className="text-text-sub text-sm font-medium md:text-base">
              팔로우하고 공연 소식 제일 먼저 받아보세요!
            </p>
          </div>
          <EmptySection
            title="에러가 발생했어요. :-("
            message="아티스트 정보를 불러오는 중에 문제가 발생했습니다. 잠시 후 다시 시도해주세요."
            type="error"
          />
        </div>
      </section>
    );
  }

  const artists = data ?? [];
  if (artists.length === 0) {
    return (
      <section className="bg-bg-sub w-full overflow-hidden px-5 py-10 md:py-15 lg:px-15 lg:py-20">
        <div className="mx-auto flex w-full max-w-400 flex-col gap-6 lg:gap-10">
          <div className="space-y-1 md:space-y-2">
            <h2 className="text-text-main text-2xl font-extrabold md:text-3xl">
              💖 당신의 취향을 저격할 아티스트
            </h2>
            <p className="text-text-sub text-sm font-medium md:text-base">
              팔로우하고 공연 소식 제일 먼저 받아보세요!
            </p>
          </div>
          <EmptySection
            title="등록된 아티스트가 없어요."
            message="새로운 아티스트가 등록되면 가장 먼저 알려드릴게요! 조금만 기다려주세요."
            type="empty"
          />
        </div>
      </section>
    );
  }

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
          {artists.map((artist) => (
            <SwiperSlide key={artist.id}>
              <ArtistCard artist={artist} isAuthenticated={isAuthenticated} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
