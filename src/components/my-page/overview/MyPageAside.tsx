import { PLACEHOLDER_IMAGE } from "@/components/home/upcoming-slider/constants";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { getLikedConcertCount } from "@/lib/api/myPage/myPage.server";
import { ConcertWithTicket } from "@/types/home";
import { formatDateRange } from "@/utils/helpers/formatters";
import { CalendarCheck, HeartIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function MyPageAside({
  likedConcerts,
}: {
  likedConcerts: ConcertWithTicket[];
}) {
  const likedConcertsCount = await getLikedConcertCount();

  if (likedConcertsCount.data == null) {
    likedConcertsCount.data = 0;
  }

  // 찜한 콘서트 배열에서 예정된 콘서트 일정 3개까지 가져오기
  const upcomingLikedConcerts = likedConcerts
    .sort((a, b) => {
      return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
    })
    .filter((concert) => {
      // 오늘 날짜에서 이후의 콘서트만 필터링
      const today = new Date();
      const concertDate = new Date(concert.startDate);
      if (concertDate >= today) {
        return true;
      }
      return false;
    })
    .slice(0, 3);

  return (
    <div className="max-w-125 flex-1">
      <div className="*:border-border *: sticky top-30 flex flex-col space-y-8 *:rounded-2xl *:border *:p-6">
        <div className="space-y-4">
          <h4 className="text-base font-bold">빠른 탐색</h4>
          <ul className="space-y-3">
            <li className="flex items-center gap-4">
              <div className="bg-bg-sub flex size-12 items-center justify-center rounded-xl">
                <CalendarCheck size={20} className="text-text-main" />
              </div>
              <div className="flex-1">
                <h5 className="text-text-sub text-sm font-medium">찜한 콘서트</h5>
                <p className="text-text-main line-clamp-1 text-base font-medium">
                  {likedConcertsCount.data ?? 0}개
                </p>
              </div>
            </li>
            <li className="flex items-center gap-4">
              <div className="bg-bg-sub flex size-12 items-center justify-center rounded-xl">
                <HeartIcon size={20} className="text-text-main" />
              </div>
              <div className="flex-1">
                <h5 className="text-text-sub text-sm font-medium">찜한 아티스트</h5>
                <p className="text-text-main line-clamp-1 text-base font-medium">28명</p>
              </div>
            </li>
            <li className="flex items-center gap-4">
              <div className="bg-bg-sub flex size-12 items-center justify-center rounded-xl">
                <CalendarCheck size={20} className="text-text-main" />
              </div>
              <div className="flex-1">
                <h5 className="text-text-sub text-sm font-medium">알림 신청</h5>
                <p className="text-text-main line-clamp-1 text-base font-medium">12개</p>
              </div>
            </li>
          </ul>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-base font-bold">예정된 콘서트</h4>
          </div>
          <ul className="space-y-3">
            {upcomingLikedConcerts.map((concert) => (
              <li key={concert.id} className="flex items-center gap-4">
                <div className="relative w-18 shrink-0">
                  <AspectRatio ratio={1}>
                    <Image
                      src={concert.posterUrl ?? PLACEHOLDER_IMAGE}
                      alt={concert.name}
                      className="rounded-sm object-cover"
                      fill
                      placeholder="blur"
                      blurDataURL={PLACEHOLDER_IMAGE}
                      sizes="(max-width: 768px) 256px, (max-width: 1024px) 288px, 320px"
                    />
                  </AspectRatio>
                </div>
                <div className="flex-1 space-y-1.5">
                  <h5 className="text-text-main line-clamp-1 text-sm font-medium">
                    {concert.name}
                  </h5>
                  <div className="*:text-text-sub text-xs *:leading-normal *:font-medium">
                    <p>{formatDateRange(concert.startDate, concert.endDate)}</p>
                    <p>{concert.placeName}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-base font-bold">최근 찜</h4>
            <Link href="/my-page/likes" className="text-text-sub text-sm font-medium">
              모두 보기
            </Link>
          </div>
          <ul className="space-y-3">
            <li className="flex items-center gap-4">
              <div className="bg-bg-sub flex size-12 items-center justify-center rounded-xl">
                <AspectRatio ratio={1}>
                  <div className="bg-bg-sub"></div>
                </AspectRatio>
              </div>
              <div className="flex-1 space-y-1">
                <h5 className="text-text-main line-clamp-1 text-base font-medium">아티스트명</h5>
                <p className="text-text-sub text-xs font-medium">3일 전</p>
              </div>
              <Link href="#" className="text-text-main underline">
                View
              </Link>
            </li>
          </ul>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-base font-bold">최근 글</h4>
            <Link href="/my-page/board" className="text-text-sub text-sm font-medium">
              모두 보기
            </Link>
          </div>
          <ul className="space-y-3">
            <li className="flex items-center gap-4">
              <Link href={"#"} className="space-y-1">
                <h5 className="text-text-main line-clamp-1 text-base font-medium">아티스트명</h5>
                <p className="text-text-sub text-xs font-medium">글 제목 · 3일전</p>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
