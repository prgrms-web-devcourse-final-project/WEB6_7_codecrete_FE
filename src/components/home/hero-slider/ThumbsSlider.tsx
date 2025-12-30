import { Swiper, SwiperSlide } from "swiper/react";
import { SLIDES } from "./constants";
import { ThumbsSliderProps } from "@/types/home";
import { cn } from "@/lib/utils";
import { Thumbs } from "swiper/modules";
import Image from "next/image";

export default function ThumbsSlider({
  isMobile,
  onSwiper,
}: ThumbsSliderProps & { isMobile: boolean }) {
  return (
    <div
      className={cn(
        "absolute right-5 bottom-5 left-5 z-20 items-center",
        "md:right-10 md:left-10",
        "lg:top-1/2 lg:bottom-auto lg:left-auto lg:flex lg:h-full lg:-translate-y-1/2 lg:flex-col lg:justify-center lg:py-20"
      )}
    >
      <Swiper
        onSwiper={onSwiper}
        direction={isMobile ? "horizontal" : "vertical"}
        centeredSlides={true}
        centeredSlidesBounds={true}
        slideToClickedSlide={true}
        spaceBetween={isMobile ? 12 : 8}
        slidesPerView="auto"
        watchSlidesProgress={true}
        modules={[Thumbs]}
        className="h-full w-auto"
        style={{ overflow: "visible" }}
      >
        {SLIDES.map((slide) => (
          <SwiperSlide
            key={slide.id}
            className="group flex! h-auto! w-auto! items-center justify-center py-2"
          >
            <div
              className={cn(
                "relative h-10 w-10 cursor-pointer rounded-xl",
                "group-[.swiper-slide-thumb-active]:h-13 group-[.swiper-slide-thumb-active]:w-13",
                "group-[.swiper-slide-thumb-active]:ring-2 group-[.swiper-slide-thumb-active]:ring-white",
                "md:h-15 md:w-15 md:group-[.swiper-slide-thumb-active]:h-18 md:group-[.swiper-slide-thumb-active]:w-18"
              )}
            >
              <Image
                src={slide.bgImage}
                alt={slide.title}
                fill
                className="rounded-xl object-cover"
                placeholder="blur"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
