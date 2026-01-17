"use client";

import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import ReviewRatingBar from "@/components/concert/detail/ReviewRatingBar";
import { twMerge } from "tailwind-merge";
import ConcertReviewCard from "@/components/concert/detail/ConcertReviewCard";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ConcertReviewListResponse } from "@/types/community/concert-review";
import { getConcertReviewList } from "@/lib/api/community/concert-review/review.client";
import ConcertReviewSummarySkeleton from "@/components/concert/detail/ConcertReviewSummarySkeleton";

export default function ConcertDetailReview({
  concertId,
  isLoggedIn,
}: {
  concertId: string;
  isLoggedIn: boolean;
}) {
  const [data, setData] = useState<ConcertReviewListResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showAllReviews, setShowAllReviews] = useState(false);

  useEffect(() => {
    if (!concertId) return;

    const fetchReviews = async () => {
      try {
        setIsLoading(true);
        const result = await getConcertReviewList(Number(concertId));
        setData(result);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, [concertId]);

  if (isLoading) {
    return (
      <div className="review flex flex-col gap-6">
        <h2 className="text-text-main text-3xl font-bold">리뷰 게시판</h2>

        <ConcertReviewSummarySkeleton />
      </div>
    );
  }

  if (!data) {
    return <div>리뷰 정보를 불러올 수 없습니다.</div>;
  }

  const { summary, reviews } = data;

  return (
    <div className="review mb-15 space-y-4 px-5 lg:mb-0 lg:space-y-6 lg:px-0">
      <h2 className="text-text-main text-xl font-bold lg:text-3xl">리뷰 게시판</h2>
      <div className="bg-bg-sub flex flex-col gap-4 rounded-xl p-4 lg:gap-6 lg:p-6">
        <div className="flex justify-between">
          <div className="flex gap-4">
            <strong className="text-3xl lg:text-4xl">{summary.averageRating.toFixed(1)}</strong>
            <div className="flex flex-col justify-between">
              <div className="flex gap-0.5 lg:gap-1" aria-label={`평점 ${summary.averageRating}점`}>
                {Array.from({ length: 5 }).map((_, index) => {
                  const isFilled = index < Math.floor(summary.averageRating);

                  return (
                    <Star
                      key={index}
                      className={twMerge(
                        "size-4 lg:size-5",
                        isFilled ? "fill-yellow-400 text-yellow-400" : "fill-gray-300 text-gray-300"
                      )}
                    />
                  );
                })}
              </div>
              <p className="text-text-sub text-xs leading-tight lg:text-sm">
                리뷰 {summary.totalCount.toLocaleString()} 개
              </p>
            </div>
          </div>
          {isLoggedIn && (
            <Link href={`/concerts/${concertId}/review/write`}>
              <Button
                variant="outline"
                size="sm"
                className="border-border-point hover:bg-border px-4 py-2"
              >
                리뷰 작성
              </Button>
            </Link>
          )}
        </div>
        <ReviewRatingBar
          ratingDistribution={summary.ratingDistribution}
          totalCount={summary.totalCount}
        />
      </div>
      {reviews.length > 0 ? (
        <>
          {(showAllReviews ? reviews : reviews.slice(0, 3)).map((review) => (
            <ConcertReviewCard key={review.postId} review={review} concertId={concertId} />
          ))}
          {/*TODO: 리뷰 수 증가 시 페이지네이션 또는 무한 스크롤 고려*/}
          {!showAllReviews && reviews.length > 3 && (
            <div className="flex justify-center">
              <Button variant="ghost" size="sm" onClick={() => setShowAllReviews(true)}>
                리뷰 더보기
              </Button>
            </div>
          )}
        </>
      ) : (
        <div className="border-border flex flex-col items-center gap-3 rounded-xl border border-dashed p-8">
          <p className="text-text-sub text-sm">아직 작성된 리뷰가 없습니다.</p>
          {isLoggedIn && (
            <Link href={`/concerts/${concertId}/review/write`}>
              <Button variant="ghost" size="sm">
                첫 리뷰 작성하기
              </Button>
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
