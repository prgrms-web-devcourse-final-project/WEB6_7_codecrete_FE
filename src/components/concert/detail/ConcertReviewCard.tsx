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

  useEffect(() => {
    if (!review.userId) return;

    const fetchAuthor = async () => {
      try {
        const data = await getUserInfo(review.userId);
        setAuthor(data);
      } catch (e) {
        console.error(e);
      }
    };

    fetchAuthor();
  }, [review.userId]);

  const createdAt = new Date(review.createdDate);

  const timeAgo = formatDistanceToNow(createdAt, {
    addSuffix: true,
    locale: ko,
  });

  return (
    <Link href={`/concerts/${concertId}/review/${review.postId}`}>
      <div
        className={twMerge(
          `border-border flex cursor-pointer flex-col gap-4 rounded-xl border-2 p-6`
        )}
      >
        <div className="flex justify-between">
          <div className="flex gap-4">
            <Avatar className="ring-border size-10 ring-4">
              <AvatarImage src={author?.profileImageUrl} alt={author?.nickname} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <strong className="text-text-main text-lg">{author?.nickname}</strong>
              <div className="flex items-center gap-2">
                <div className="flex gap-1" aria-label={`평점 ${review.rating}점`}>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      className="text-text-main h-4 w-4"
                      fill={index < Math.floor(review.rating) ? "currentColor" : "none"}
                    />
                  ))}
                </div>
                <p className="text-text-sub text-sm">{timeAgo}</p>
              </div>
            </div>
          </div>
          <div className="text-text-sub flex items-center gap-0.5 text-sm">
            <Heart className="h-4 w-4" />
            <p>{review.likeCount}</p>
          </div>
        </div>

        <h3 className={"text-text-main line-clamp-1 text-base font-medium"}>{review.title}</h3>

        <p className="text-text-sub line-clamp-1">{review.content}</p>

        <div>
          {review.tags.map((tag) => {
            return (
              <Badge key={tag} className="bg-border text-text-main mr-2 text-sm">
                {tag}
              </Badge>
            );
          })}
        </div>
      </div>
    </Link>
  );
}
