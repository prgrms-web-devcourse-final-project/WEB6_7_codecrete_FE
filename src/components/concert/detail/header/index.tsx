import { AspectRatio } from "@/components/ui/aspect-ratio";
import { getIsLikedConcert, getTicketOfficesByConcertId } from "@/lib/api/concerts/concerts.server";
import { ConcertDetail } from "@/types/concerts";
import Image from "next/image";
import ConcertArtistBadges from "./ConcertArtistBadges";
import ConcertArtistBadgesSkeleton from "../../../loading/concert/detail/ConcertArtistBadgesSkeleton";
import { Suspense } from "react";
import ConcertChatButton from "./ConcertChatButton";
import ConcertLikeButton from "./ConcertLikeButton";
import ConcertLikeButtonSkeleton from "../../../loading/concert/detail/ConcertLikeButtonSkeleton";
import ConcertHeaderInfo from "./ConcertHeaderInfo";
import {
  formatConcertPrice,
  formatDateRange,
  formatDateTimeRange,
} from "@/utils/helpers/formatters";
import ConcertHeaderArtist from "./ConcertHeaderArtist";
import ConcertHeaderArtistSkeleton from "../../../loading/concert/detail/ConcertHeaderArtistSkeleton";
import { getMe } from "@/lib/api/auth/auth.server";
import ConcertHeaderBtn from "./ConcertHeaderBtn";
import { PLACEHOLDER_CONCERT } from "@/constants/placeholder";

interface ConcertHeaderProps {
  concertDetail: ConcertDetail;
  isAuthenticated: boolean;
  isChatAvailable: boolean;
}

export default async function ConcertHeader({
  concertDetail,
  isAuthenticated,
  isChatAvailable,
}: ConcertHeaderProps) {
  const concertTicketing = await getTicketOfficesByConcertId({
    concertId: concertDetail.concertId,
  });
  const isLikedConcert = isAuthenticated ? await getIsLikedConcert(concertDetail.concertId) : null;
  const isAdmin = isAuthenticated ? (await getMe()).data?.role === "ADMIN" : false;

  return (
    <section className="header bg-bg-sub pb-5 lg:px-15 lg:py-10">
      {/* 모바일: flex-col (세로), md 이상: flex-row (가로) */}
      <div className="mx-auto flex w-full max-w-400 flex-col gap-5 lg:flex-row lg:items-start xl:gap-8">
        {/* 포스터 영역: 모바일 w-full, md 이상 w-2/5 */}
        <div className="border-border w-full flex-1 overflow-hidden lg:sticky lg:top-30 lg:rounded-2xl lg:border xl:w-2/5">
          <AspectRatio ratio={320 / 426.5}>
            <Image
              src={concertDetail.posterUrl ?? PLACEHOLDER_CONCERT}
              alt={concertDetail.name}
              className="object-cover"
              fill
              priority
              fetchPriority="high"
              placeholder="blur"
              blurDataURL={PLACEHOLDER_CONCERT}
            />
          </AspectRatio>
        </div>

        {/* 정보 영역 */}
        <div className="bg-bg-main border-border sticky top-4 mx-5 flex flex-1 flex-col gap-4 rounded-2xl border p-5 lg:top-30 lg:mx-0 xl:gap-8 xl:p-10">
          <div className="title flex flex-col items-start justify-between gap-4 md:flex-row">
            <div className="flex flex-col gap-3 md:gap-4">
              {/* 공연 타입 배지 : 아티스트의 유형 */}
              {concertDetail.concertArtists.length > 0 && (
                <Suspense fallback={<ConcertArtistBadgesSkeleton />}>
                  <ConcertArtistBadges concertArtists={concertDetail.concertArtists} />
                </Suspense>
              )}
              <h2 className="text-text-main text-2xl font-bold xl:text-4xl">
                {concertDetail.name}
              </h2>
            </div>

            {/* 버튼 그룹 */}
            <div className="flex gap-2">
              {/* 채팅 버튼 */}
              <ConcertChatButton
                concertId={concertDetail.concertId}
                isAuthenticated={isAuthenticated}
                isChatAvailable={isChatAvailable}
              />
              {/* 좋아요 버튼 */}
              <Suspense fallback={<ConcertLikeButtonSkeleton />}>
                <ConcertLikeButton
                  concertId={concertDetail.concertId}
                  isAuthenticated={isAuthenticated}
                  isLiked={isLikedConcert?.isLike}
                />
              </Suspense>
            </div>
          </div>

          {/* 정보 그리드: 모바일 1열, md 이상 2열 */}
          <div className="border-border grid grid-cols-1 gap-x-4 gap-y-4 border-y py-6 xl:grid-cols-2 xl:gap-y-6 xl:py-8">
            <ConcertHeaderInfo
              type="date"
              label="날짜 및 시간"
              title={formatDateRange(concertDetail.startDate, concertDetail.endDate)}
            />
            <ConcertHeaderInfo type="location" label="장소" title={concertDetail.placeName} />
            <ConcertHeaderInfo
              type="price"
              label="티켓 가격"
              title={formatConcertPrice(concertDetail.minPrice, concertDetail.maxPrice)}
            />
            <ConcertHeaderInfo
              type="ticketing"
              label="예매 일정"
              title={
                concertDetail?.ticketTime && concertDetail.ticketEndTime
                  ? formatDateTimeRange(concertDetail?.ticketTime, concertDetail?.ticketEndTime)
                  : "정보없음"
              }
            />
          </div>

          {/* 아티스트 정보 */}
          <Suspense fallback={<ConcertHeaderArtistSkeleton />}>
            <ConcertHeaderArtist concertArtists={concertDetail.concertArtists} />
          </Suspense>
          <ConcertHeaderBtn
            concertDetail={concertDetail}
            concertTicketing={concertTicketing}
            isAuthenticated={isAuthenticated}
            isAdmin={isAdmin}
          />
        </div>
      </div>
    </section>
  );
}
