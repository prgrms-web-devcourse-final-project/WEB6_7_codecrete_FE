import Image from "next/image";
import ConcertHeaderArtist from "@/components/concert/detail/ConcertHeaderArtist";
import ConcertHeaderBtn from "@/components/concert/detail/ConcertHeaderBtn";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import ConcertHeaderInfo from "./ConcertHeaderInfo";
import {
  formatConcertPrice,
  formatDateRange,
  formatDateTimeRange,
} from "@/utils/helpers/formatters";
import ConcertLikeButton from "./ConcertLikeButton";
import {
  getConcertDetail,
  getIsLikedConcert,
  getTicketOfficesByConcertId,
} from "@/lib/api/concerts/concerts.server";
import { getAuthStatus, getMe } from "@/lib/api/auth/auth.server";
import ConcertChatButton from "./ConcertChatButton";
import { PLACEHOLDER_IMAGE } from "@/components/home/upcoming-slider/constants";

export default async function ConcertHeader({
  concertId,
  isLoggedIn,
  isChatAvailable,
}: {
  concertId: string;
  isLoggedIn: boolean;
  isChatAvailable: boolean;
}) {
  const [concertDetail, concertTicketing, isAuthenticated] = await Promise.all([
    getConcertDetail({ concertId }),
    getTicketOfficesByConcertId({ concertId }),
    getAuthStatus(),
  ]);

  let userData = null;
  let isLikedConcert = null;

  if (isAuthenticated) {
    [userData, isLikedConcert] = await Promise.all([
      getMe().then((res) => res.data),
      getIsLikedConcert(concertId),
    ]);
  }

  if (!concertDetail) {
    return null;
  }

  return (
    <section className="header bg-bg-sub lg:px-15 lg:py-10">
      {/* 모바일: flex-col (세로), md 이상: flex-row (가로) */}
      <div className="mx-auto flex w-full max-w-400 flex-col gap-5 lg:flex-row lg:items-start xl:gap-8">
        {/* 포스터 영역: 모바일 w-full, md 이상 w-2/5 */}
        <div className="border-border w-full flex-1 overflow-hidden lg:sticky lg:top-30 lg:rounded-2xl lg:border xl:w-2/5">
          <AspectRatio ratio={320 / 426.5}>
            <Image
              src={concertDetail.posterUrl ?? PLACEHOLDER_IMAGE}
              alt={concertDetail.name}
              className="object-cover"
              fill
              placeholder="blur"
              blurDataURL={PLACEHOLDER_IMAGE}
            />
          </AspectRatio>
        </div>

        {/* 정보 영역 */}
        <div className="bg-bg-main border-border sticky top-4 mx-5 flex flex-1 flex-col gap-4 rounded-2xl border p-5 lg:top-30 lg:mx-0 xl:gap-8 xl:p-10">
          <div className="title flex items-start justify-between gap-4">
            <div className="flex flex-col gap-3 md:gap-4">
              {concertDetail.concertArtists.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {concertDetail.concertArtists.map((artist) => (
                    <Badge
                      key={artist.artist.id}
                      className="bg-point-main text-text-point-main text-xs md:text-sm"
                    >
                      {artist.artist.artistType}
                    </Badge>
                  ))}
                </div>
              )}
              <h2 className="text-text-main text-2xl font-bold xl:text-4xl">
                {concertDetail.name}
              </h2>
            </div>

            {/* 버튼 그룹: 모바일에서는 상단 우측 혹은 하단 배치 등 고려 가능 */}
            <div className="flex gap-2">
              <ConcertChatButton
                concertId={concertDetail.concertId}
                isLoggedIn={isLoggedIn}
                isChatAvailable={isChatAvailable}
              />
              <ConcertLikeButton
                concertId={concertDetail.concertId}
                isAuthenticated={isAuthenticated}
                isLiked={isLikedConcert?.isLike}
              />
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
            {/* TODO : 관리자일 경우 예매일정 직접 입력하는 버튼 추가 */}
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

          <ConcertHeaderArtist concertArtists={concertDetail.concertArtists} />
          <ConcertHeaderBtn
            concertDetail={concertDetail}
            concertTicketingData={concertTicketing}
            userData={userData}
          />
        </div>
      </div>
    </section>
  );
}
