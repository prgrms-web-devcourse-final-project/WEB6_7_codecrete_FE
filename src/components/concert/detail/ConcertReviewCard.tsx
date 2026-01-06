import { twMerge } from "tailwind-merge";
import { Badge } from "@/components/ui/badge";
import { Heart, Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { ReviewListItem } from "@/types/community/concert-review";
import { useEffect, useState } from "react";
import { UserInfo } from "@/types/user";
import { getUserInfo } from "@/lib/api/user/user.client";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";

export default function ConcertReviewCard({
  review,
  concertId,
}: {
  review: ReviewListItem;
  concertId: string;
}) {
  const [author, setAuthor] = useState<UserInfo | null>(null);
  const [isAuthorLoading, setIsAuthorLoading] = useState(true);

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

  const timeAgo = formatDistanceToNow(new Date(review.createdDate), {
    addSuffix: true,
    locale: ko,
  });

  return (
    <Link href={`/concerts/${concertId}/review/${review.postId}`} className="block">
      <div className="border-border hover:border-primary/50 flex cursor-pointer flex-col gap-4 rounded-xl border-2 p-6 transition-colors">
        <div className="flex items-start justify-between">
          <div className="flex gap-4">
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
            <div className="flex flex-col gap-0.5">
              <strong className="text-text-main text-base font-semibold">
                {isAuthorLoading ? (
                  <div className="h-4 w-16 animate-pulse rounded bg-gray-200" />
                ) : (
                  (author?.nickname ?? "탈퇴한 사용자")
                )}
              </strong>
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5 text-yellow-400">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      size={14}
                      fill={index < review.rating ? "currentColor" : "none"}
                      className={index < review.rating ? "text-yellow-400" : "text-gray-300"}
                    />
                  ))}
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
          <h3 className="text-text-main mb-1 line-clamp-1 text-lg font-bold">{review.title}</h3>
          <p className="text-text-sub line-clamp-1 text-sm leading-relaxed">{review.content}</p>
        </div>

        <div className="mt-auto flex flex-wrap gap-2">
          {review.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="px-2 py-0 text-xs font-normal">
              #{tag}
            </Badge>
          ))}
        </div>
      </div>
    </Link>
  );
}
