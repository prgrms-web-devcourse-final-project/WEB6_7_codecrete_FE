import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import ReviewRatingBar from "@/components/concert/detail/ReviewRatingBar";
import { twMerge } from "tailwind-merge";
import ConcertReviewCard from "@/components/concert/detail/ConcertReviewCard";
import LoadMoreBtn from "@/components/common/LoadMoreBtn";
import Link from "next/link";

export default function ConcertDetailReview({ concertId }: { concertId: string }) {
  return (
    <div className="review flex flex-col gap-6">
      <h2 className="text-text-main text-3xl font-bold">리뷰 게시판</h2>

      <div className={twMerge(`bg-bg-sub flex flex-col gap-6 rounded-xl p-6`)}>
        <div className="flex justify-between">
          <div className="flex gap-4">
            <strong className="text-4xl">4.8</strong>
            <div>
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    className="cursor-pointer"
                    aria-label={`${index + 1}점`}
                  >
                    <Star
                      className="h-5 w-5 text-yellow-400"
                      fill={index < 4 ? "currentColor" : "none"}
                    />
                  </button>
                ))}
              </div>
              <p className="text-text-sub text-sm">리뷰 1,475개</p>
            </div>
          </div>
          <Link href={`/concerts/${concertId}/review/write`}>
            <Button
              variant="outline"
              size="sm"
              className="border-border-point hover:bg-border px-4 py-2"
            >
              리뷰 작성
            </Button>
          </Link>
        </div>
        <ReviewRatingBar />
      </div>
      {Array.from({ length: 3 }).map((_, index) => (
        <ConcertReviewCard key={index} />
      ))}

      <LoadMoreBtn />
    </div>
  );
}
