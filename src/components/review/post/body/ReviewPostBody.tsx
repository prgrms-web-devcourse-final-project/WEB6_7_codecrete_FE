"use client";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { ReviewDetailData } from "@/types/community/concert-review";
import { useEffect, useState } from "react";
import { getPostLikeCount, togglePostLike } from "@/lib/api/community/community.client";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

export default function ReviewPostBody({
  reviewDetail,
  initialIsLiked,
}: {
  reviewDetail: ReviewDetailData;
  initialIsLiked: boolean;
}) {
  const [likeCount, setLikeCount] = useState<number | null>(null);
  // TODO: 해당 글에 대한 좋아요 상태 API로 불러오기
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [isLikePending, setIsLikePending] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const fetchLikeCount = async () => {
      try {
        const count = await getPostLikeCount(reviewDetail.post.postId);

        if (!cancelled) {
          setLikeCount(count);
        }
      } catch (e) {
        console.error(e);
        if (!cancelled) {
          setLikeCount(0);
        }
      }
    };

    fetchLikeCount();

    return () => {
      cancelled = true;
    };
  }, [reviewDetail.post.postId]);

  const handleToggleLike = async () => {
    const prevIsLiked = isLiked;
    const prevLikeCount = likeCount;

    if (isLikePending) return;
    setIsLikePending(true);
    try {
      await togglePostLike(reviewDetail.post.postId);

      const nextIsLiked = !prevIsLiked;
      setIsLiked(nextIsLiked);
      setLikeCount((prev) => (prev === null ? prev : prev + (nextIsLiked ? 1 : -1)));

      toast.success(nextIsLiked ? "좋아요를 눌렀습니다." : "좋아요가 취소되었습니다.");
    } catch (e) {
      setIsLiked(prevIsLiked);
      setLikeCount(prevLikeCount);
      toast.error(e instanceof Error ? e.message : "좋아요 처리 중 오류가 발생했습니다.");
    } finally {
      setIsLikePending(false);
    }
  };

  return (
    <>
      <section className="flex flex-col gap-10 py-8">
        <p className="whitespace-pre-line">{reviewDetail.post.content}</p>

        {/* 이미지 캐러셀 */}
        {reviewDetail.imageUrls?.length > 0 && (
          <div className="mx-auto w-full max-w-[800px]">
            <Carousel className="w-full">
              <CarouselContent>
                {reviewDetail.imageUrls.map((src, idx) => (
                  <CarouselItem key={idx}>
                    <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-gray-100">
                      <Image
                        src={src}
                        alt={`리뷰 이미지 ${idx + 1}`}
                        className="h-full w-full object-cover"
                        sizes="(max-width: 768px) 100vw, 800px"
                        fill
                        onError={(e) => {
                          e.currentTarget.src = "/ConcertPoster.png";
                        }}
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>

              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        )}
      </section>

      <Separator />

      <div className="flex justify-between">
        <div>
          <Button
            variant="outline"
            onClick={handleToggleLike}
            disabled={likeCount === null || isLikePending}
            className="flex items-center gap-2"
          >
            <Heart
              className={twMerge(
                "h-4 w-4 transition-all duration-200 active:scale-125",
                isLiked ? "scale-110 fill-red-500 text-red-500" : "text-gray-500"
              )}
            />
            {likeCount === null ? (
              <span className="ml-2 inline-block h-4 w-6 animate-pulse rounded bg-gray-200" />
            ) : (
              <span className="ml-2">{likeCount}</span>
            )}
          </Button>
        </div>
      </div>
      <Separator />
    </>
  );
}
