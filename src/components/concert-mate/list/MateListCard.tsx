import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getConcertDetail } from "@/lib/api/concerts/concerts.server";
import { Post } from "@/types/community";
import { format } from "date-fns";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import MateListBtn from "@/components/concert-mate/list/MateListBtn";
import ProfileNoImage from "@/components/common/ProfileNoImage";

export default async function MateListCard({ post }: { post: Post }) {
  // TODO : 유저프로필사진 추가 : userId 기반으로 조회 가능한 API 생성 예정 / nickname 부분도 교체 예정
  // const userInfoRes = await getUsersMe();
  // TODO : closed, 활동 태그 추가 시도
  const concertInfoRes = await getConcertDetail({ concertId: String(post.concertId) });

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
              <AvatarImage
                src="https://nconb-assets.s3.ap-northeast-2.amazonaws.com/users/profile/48161b51-0938-49da-9f76-d213ffeeb810_747f96f7277fd87afd27b9d9b666f19f.jpg"
                alt="아티스트"
              />
              <AvatarFallback>
                <ProfileNoImage size="xs" />
              </AvatarFallback>
            </Avatar>
            <div>
              <strong className="text-text-main text-lg">닉네임추가</strong>
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
            <div>
              <strong className="text-text-main text-sm">{concertInfoRes?.name}</strong>
              <p className="text-text-sub text-sm">
                {concertInfoRes?.placeName} · {concertInfoRes?.startDate}
              </p>
            </div>
          </div>
          <p className="text-text-sub line-clamp-4 text-sm">{post.content}</p>
        </div>
      </Link>
      <MateListBtn postId={post.postId} />
    </div>
  );
}
