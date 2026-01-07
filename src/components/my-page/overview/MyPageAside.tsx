"use client";

import { PLACEHOLDER_IMAGE } from "@/components/home/upcoming-slider/constants";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ConcertWithTicket } from "@/types/my-page";
import { LikedArtist } from "@/types/my-page";
import { PlannerListWithDetails } from "@/types/planner";
import { formatDateRange } from "@/utils/helpers/formatters";
import { CalendarCheck, MicVocalIcon, SpotlightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function MyPageAside({
  likedConcerts,
  likedConcertsCount,
  likedArtists,
  joinedPlanners,
}: {
  likedConcerts: ConcertWithTicket[];
  likedConcertsCount: number;
  likedArtists: LikedArtist[];
  joinedPlanners: PlannerListWithDetails[];
}) {
  // 찜한 콘서트 배열에서 예정된 콘서트 일정 필터링 및 정렬
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
    });

  return (
    <div className="max-w-125 flex-1">
      <div className="*:border-border *: sticky top-30 flex flex-col space-y-8 *:rounded-2xl *:border *:p-6">
        <div className="space-y-4">
          <h4 className="text-base font-bold">빠른 탐색</h4>
          <ul className="space-y-3">
            <li className="hover:opacity-80">
              <Link href="/my-page/likes" className="flex items-center gap-4">
                <div className="bg-bg-sub flex size-12 items-center justify-center rounded-xl">
                  <SpotlightIcon size={20} className="text-text-main" />
                </div>
                <div className="flex-1">
                  <h5 className="text-text-sub text-sm font-medium">찜한 콘서트</h5>
                  <p className="text-text-main line-clamp-1 text-base font-medium">
                    {likedConcertsCount}개
                  </p>
                </div>
              </Link>
            </li>
            <li className="hover:opacity-80">
              <Link href="/my-page/likes" className="flex items-center gap-4">
                <div className="bg-bg-sub flex size-12 items-center justify-center rounded-xl">
                  <MicVocalIcon size={20} className="text-text-main" />
                </div>
                <div className="flex-1">
                  <h5 className="text-text-sub text-sm font-medium">찜한 아티스트</h5>
                  <p className="text-text-main line-clamp-1 text-base font-medium">
                    {likedArtists.length}명
                  </p>
                </div>
              </Link>
            </li>
            <li className="hover:opacity-80">
              <Link href="/planner" className="flex items-center gap-4">
                <div className="bg-bg-sub flex size-12 items-center justify-center rounded-xl">
                  <CalendarCheck size={20} className="text-text-main" />
                </div>
                <div className="flex-1">
                  <h5 className="text-text-sub text-sm font-medium">참여한 플래너</h5>
                  <p className="text-text-main line-clamp-1 text-base font-medium">
                    {joinedPlanners.length}개
                  </p>
                </div>
              </Link>
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
      </div>
    </div>
  );
}
