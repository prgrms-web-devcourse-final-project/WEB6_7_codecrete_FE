import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import MateListBtn from "@/components/concert-mate/list/MateListBtn";
import ProfileNoImage from "@/components/common/ProfileNoImage";
import { MateListCardProps } from "@/types/community/concert-mate";

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
        <div className="flex justify-between">
          <div className="flex gap-4">
            <Avatar className="ring-border size-10 ring-4">
              <AvatarImage src={user?.profileImageUrl} alt="아티스트" />
              <AvatarFallback>
                <ProfileNoImage size="xs" />
              </AvatarFallback>
            </Avatar>
            <div>
              <strong className="text-text-main text-lg">
                {user?.nickname || "알 수 없는 사용자"}
              </strong>
              <div className="flex items-center gap-2">
                <p className="text-text-sub text-sm">{formattedDate}</p>
              </div>
            </div>
          </div>
        </div>
        <div className={twMerge(`flex flex-col gap-2 px-16`)}>
          <h2 className="text-text-main text-lg font-bold">{post.title}</h2>
          <div
            className={twMerge(
              `bg-bg-sub flex justify-between rounded-lg p-3`,
              `group-hover:bg-bg-main`
            )}
          >
            {concert ? (
              <div>
                <strong className="text-text-main text-sm">{concert.name}</strong>
                <p className="text-text-sub text-sm">
                  {concert.placeName} · {concert.startDate}
                </p>
              </div>
            ) : (
              <div className="text-md flex justify-center rounded-md py-5">
                <span>공연 정보를 불러올 수 없습니다.</span>
              </div>
            )}
          </div>
          <p className="text-text-sub line-clamp-4 text-sm">{post.content}</p>
        </div>
      </Link>
      <MateListBtn postId={post.postId} likeCount={likeCount} commentCount={commentCount} />
    </div>
  );
}
