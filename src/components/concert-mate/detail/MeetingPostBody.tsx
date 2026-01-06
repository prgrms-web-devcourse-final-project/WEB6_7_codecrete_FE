"use client";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { MeetingPostBodyProps } from "@/types/community/concert-mate";
import { useEffect, useState } from "react";
import { getPostLikeCount, togglePostLike } from "@/lib/api/community/community.client";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

export default function MeetingPostBody({
  postDetail,
  initialIsLiked,
  isOpen,
}: MeetingPostBodyProps) {
  const [likeCount, setLikeCount] = useState<number | null>(null);
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [isLikePending, setIsLikePending] = useState(false);

  useEffect(() => {
    setIsLiked(initialIsLiked);
  }, [initialIsLiked]);

  useEffect(() => {
    let cancelled = false;

    const fetchLikeCount = async () => {
      try {
        const count = await getPostLikeCount(postDetail.postId);

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
  }, [postDetail.postId]);

  const handleToggleLike = async () => {
    const prevIsLiked = isLiked;
    const prevLikeCount = likeCount;

    if (isLikePending) return;
    setIsLikePending(true);
    try {
      await togglePostLike(postDetail.postId);

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
        <p className="whitespace-pre-line">{postDetail.content}</p>
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

        {!isOpen && (
          <Badge className={twMerge(`bg-point-main text-text-point-main mr-2 text-sm`)}>
            closed
          </Badge>
        )}
      </div>
      <Separator />
    </>
  );
}
