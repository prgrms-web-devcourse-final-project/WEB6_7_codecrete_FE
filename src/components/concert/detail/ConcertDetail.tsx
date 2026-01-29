import ConcertDetailVenue from "@/components/concert/detail/ConcertDetailVenue";
import ConcertDetailReview from "@/components/concert/detail/ConcertDetailReview";
import ConcertDetailInfo from "@/components/concert/detail/ConcertDetailInfo";
import QuickActionsSection from "./QuickActionsSection";
import {
  getConcertDetail,
  getConcertVenueInfo,
  getIsLikedConcert,
  getTicketOfficesByConcertId,
} from "@/lib/api/concerts/concerts.server";
import { getAuthStatus, getMe } from "@/lib/api/auth/auth.server";
import MobileQuickActions from "./MobileQuickActions";

export default async function ConcertDetail({
  concertId,
  isLoggedIn,
  isChatAvailable,
}: {
  concertId: string;
  isLoggedIn: boolean;
  isChatAvailable: boolean;
}) {
  const [concertDetail, concertVenue, concertTicketing, isAuthenticated] = await Promise.all([
    getConcertDetail({ concertId }),
    getConcertVenueInfo({ concertId }),
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

  return (
    <section className="bg-bg-main lg:px-15 lg:py-10">
      <div className="mx-auto flex w-full max-w-400 flex-col gap-5 lg:flex-row xl:gap-8">
        <div className="flex-3 space-y-15 lg:space-y-20">
          <ConcertDetailInfo
            concertImageUrls={concertDetail?.concertImageUrls}
            alt={concertDetail?.name}
          />
          <ConcertDetailVenue concertVenue={concertVenue.data} />
          <ConcertDetailReview concertId={concertId} isLoggedIn={isLoggedIn} />
        </div>

        {/* 데스크톱: 오른쪽 빠른 실행 사이드바 */}
        <div className="right relative hidden min-w-80 flex-1 lg:block">
          <div className="sticky top-30 mx-auto flex w-full max-w-400 flex-col gap-5">
            <h2 className="text-text-main hidden text-xl font-bold">빠른 실행</h2>
            <div className="flex flex-col gap-3">
              <QuickActionsSection
                concertId={concertDetail?.concertId}
                concertTicketingData={concertTicketing}
                concertStartDate={concertDetail?.startDate}
                concertEndDate={concertDetail?.endDate}
                userData={userData}
                isLiked={isLikedConcert?.isLike}
                isLoggedIn={isLoggedIn}
                isChatAvailable={isChatAvailable}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 모바일: 하단 시트 트리거 */}
      <MobileQuickActions
        concertId={concertDetail?.concertId}
        concertTicketingData={concertTicketing}
        concertStartDate={concertDetail?.startDate}
        concertEndDate={concertDetail?.endDate}
        userData={userData}
        isLiked={isLikedConcert?.isLike}
        isLoggedIn={isLoggedIn}
        isChatAvailable={isChatAvailable}
      />
    </section>
  );
}
