import { SLIDES } from "@/components/home/hero-slider/constants";
import type { Swiper as SwiperType } from "swiper";

export type Concert = {
  id: string;
  name: string;
  placeName: string;
  ticketTime: string;
  startDate: string;
  endDate: string;
  posterUrl: string;
  maxPrice: number;
  minPrice: number;
  viewCount: number;
  likeCount: number;
};

export type ConcertWithTicket = Concert & {
  ticketOfficeName?: string;
  ticketOfficeUrl?: string;
};

export interface ThumbsSliderProps {
  onSwiper: (swiper: SwiperType) => void;
}

export interface SlideContentProps {
  slide: (typeof SLIDES)[number];
  priority?: boolean;
}

export interface SliderHeaderProps {
  title: string;
  description: string;
  onPrev: () => void;
  onNext: () => void;
  className?: string;
}
