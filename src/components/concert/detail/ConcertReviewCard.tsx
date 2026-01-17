import { twMerge } from "tailwind-merge";
import { Badge } from "@/components/ui/badge";
import { Heart, Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { ReviewListItem } from "@/types/community/concert-review";
import { useEffect, useMemo, useState } from "react";
import { UserInfo } from "@/types/user";
import { getUserInfo } from "@/lib/api/user/user.client";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import { Skeleton } from "@/components/ui/skeleton";

export default function ConcertReviewCard({
  review,
  concertId,
}: {
  review: ReviewListItem;
  concertId: string;
}) {
  const [author, setAuthor] = useState<UserInfo | null>(null);
  const [isAuthorLoading, setIsAuthorLoading] = useState(true);

  // TODO: 추후 author 내용까지 한 번에 불러올 API로 교체 필요
  useEffect(() => {
    if (!review.userId) return;
    const fetchAuthor = async () => {
      try {
        setIsAuthorLoading(true);
        const data = await getUserInfo(review.userId);
        setAuthor(data);
      } catch (e) {
        // 에러 시 사용자에게 알리기보다 '알 수 없는 사용자'로 조용히 처리
        console.error("작성자 로드 실패:", e);
      } finally {
        setIsAuthorLoading(false);
      }
    };
    fetchAuthor();
  }, [review.userId]);

  const timeAgo = useMemo(() => {
    return formatDistanceToNow(new Date(review.createdDate), {
      addSuffix: true,
      locale: ko,
    }).replace(/^약\s/, "");
  }, [review.createdDate]);

  return (
    <Link href={`/concerts/${concertId}/review/${review.postId}`} className="block">
      <div className="border-border flex cursor-pointer flex-col gap-3 rounded-xl border p-4 transition-colors lg:gap-4 lg:p-6">
        <div className="flex items-start justify-between">
          <div className="flex gap-3 lg:gap-4">
            <Avatar className="size-10 ring-2 ring-gray-100">
              {isAuthorLoading ? (
                <AvatarFallback className="animate-pulse bg-gray-200" />
              ) : (
                <>
                  <AvatarImage src={author?.profileImageUrl} alt={author?.nickname} />
                  <AvatarFallback>{author?.nickname?.[0] ?? "익"}</AvatarFallback>
                </>
              )}
            </Avatar>
            <div className="flex flex-col justify-between">
              <strong className="text-text-main text-base text-sm font-semibold">
                {isAuthorLoading ? (
                  <Skeleton className="h-5 w-16 lg:h-6" />
                ) : (
                  (author?.nickname ?? "탈퇴한 사용자")
                )}
              </strong>
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, index) => {
                    const isFilled = index < review.rating;

                    return (
                      <Star
                        key={index}
                        size={14}
                        fill="currentColor"
                        className={isFilled ? "text-yellow-400" : "text-gray-300"}
                      />
                    );
                  })}
                </div>
                <p className="text-text-sub text-xs">{timeAgo}</p>
              </div>
            </div>
          </div>
          <div className="text-text-sub flex items-center gap-1 rounded-full bg-gray-50 px-2 py-1 text-sm">
            <Heart
              className={twMerge(
                "h-3.5 w-3.5",
                review.likeCount > 0 && "fill-red-500 text-red-500"
              )}
            />
            <span className="font-medium">{review.likeCount}</span>
          </div>
        </div>

        <div>
          <h3 className="text-text-main mb-1 line-clamp-1 text-base font-bold lg:text-lg">
            {review.title}
          </h3>
          <p className="text-text-sub line-clamp-1 text-xs leading-normal lg:text-sm">
            {review.content}
          </p>
        </div>

        <div className="mt-auto flex flex-wrap gap-2">
          {review.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="px-2 text-xs font-normal">
              #{tag}
            </Badge>
          ))}
        </div>
      </div>
    </Link>
  );
}
