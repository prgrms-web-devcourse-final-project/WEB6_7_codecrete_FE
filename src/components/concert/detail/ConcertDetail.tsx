import { twMerge } from "tailwind-merge";
import ConcertDetailVenue from "@/components/concert/detail/ConcertDetailVenue";
import ConcertDetailReview from "@/components/concert/detail/ConcertDetailReview";
import ConcertDetailInfo from "@/components/concert/detail/ConcertDetailInfo";
import ConcertDetailSideBar from "@/components/concert/detail/ConcertDetailSideBar";

export default function ConcertDetail() {
  return (
    <section className={twMerge(`header bg-bg-main mx-auto w-full max-w-400 py-20`)}>
      <div className="max-auto flex w-full gap-12">
        <div className={twMerge(`left flex w-full flex-2 flex-col gap-12`)}>
          <ConcertDetailInfo />
          <ConcertDetailVenue />
          <ConcertDetailReview />
        </div>

        <div className="right relative flex-1">
          <ConcertDetailSideBar />
        </div>
      </div>
    </section>
  );
}
