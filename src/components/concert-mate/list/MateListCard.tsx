import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import MateListBtn from "@/components/concert-mate/list/MateListBtn";
import ProfileNoImage from "@/components/common/ProfileNoImage";
import { MateListCardProps } from "@/types/community/concert-mate";
import { format } from "date-fns";

export default async function MateListCard({
  post,
  user,
  concert,
  likeCount,
  commentCount,
}: MateListCardProps) {
  // TODO : closed, 활동 태그 추가 시도

  const formattedDate = format(new Date(post.createdDate), "yyyy-MM-dd");

  return (
    <div
      className={twMerge(
        `border-border hover:bg-accent/50 group flex flex-col gap-4 rounded-2xl border p-6`
      )}
    >
      <Link href={`concert-mate/${post.postId}`} className="flex flex-col gap-2">
        <div className="flex justify-between gap-4">
          <Avatar className="ring-border size-10 ring-4">
            <AvatarImage src={user?.profileImageUrl} alt="아티스트" />
            <AvatarFallback>
              <ProfileNoImage size="xs" />
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-1 flex-col gap-4">
            <div>
              <strong className="text-text-main text-sm font-semibold">
                {user?.nickname || "알 수 없는 사용자"}
              </strong>
              <p className="text-text-sub text-xs leading-normal lg:text-sm">{formattedDate}</p>
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="text-text-main text-base font-semibold lg:text-lg">{post.title}</h2>
              <div className="bg-bg-sub group-hover:bg-bg-main flex flex-col justify-between gap-1 rounded-lg p-3">
                {concert ? (
                  <>
                    <strong className="text-text-main text-sm font-semibold">{concert.name}</strong>
                    <p className="text-text-sub text-xs">
                      {concert.placeName} · {concert.startDate}
                    </p>
                  </>
                ) : (
                  <div className="text-md flex justify-center rounded-md py-5">
                    <span>공연 정보를 불러올 수 없습니다.</span>
                  </div>
                )}
              </div>
              <p className="text-text-sub line-clamp-4 text-sm">{post.content}</p>
            </div>
            <MateListBtn postId={post.postId} likeCount={likeCount} commentCount={commentCount} />
          </div>
        </div>
      </Link>
    </div>
  );
}
