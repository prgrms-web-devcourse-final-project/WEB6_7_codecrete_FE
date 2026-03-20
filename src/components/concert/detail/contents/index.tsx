import ConcertDetailVenue from "@/components/concert/detail/contents/ConcertDetailVenue";
import ConcertDetailReview from "@/components/concert/detail/contents/ConcertDetailReview";
import ConcertDetailInfo from "@/components/concert/detail/contents/ConcertDetailInfo";
import { getIsLikedConcert, getTicketOfficesByConcertId } from "@/lib/api/concerts/concerts.server";
import { ConcertDetail } from "@/types/concerts";
import QuickActionsSection from "../QuickActionsSection";
import MobileQuickActions from "../MobileQuickActions";

interface ConcertContentsProps {
  concertDetail: ConcertDetail;
  isAuthenticated: boolean;
  isChatAvailable: boolean;
}

export default async function ConcertContents({
  concertDetail,
  isAuthenticated,
  isChatAvailable,
}: ConcertContentsProps) {
  const concertTicketing = await getTicketOfficesByConcertId({
    concertId: concertDetail.concertId,
  });

  const isLikedConcert = isAuthenticated ? await getIsLikedConcert(concertDetail.concertId) : null;

  return (
    <section className="bg-bg-main lg:px-15 lg:py-10">
      <div className="mx-auto flex w-full max-w-400 flex-col gap-5 lg:flex-row xl:gap-8">
        <div className="flex-3 space-y-15 lg:space-y-20">
          <ConcertDetailInfo
            concertImageUrls={concertDetail?.concertImageUrls}
            alt={concertDetail?.name}
          />
          <ConcertDetailVenue concertId={concertDetail.concertId} />
          <ConcertDetailReview
            concertId={concertDetail.concertId}
            isAuthenticated={isAuthenticated}
          />
        </div>

        {/* 데스크톱: 오른쪽 빠른 실행 사이드바 */}
        <div className="right relative hidden min-w-80 flex-1 lg:block">
          <div className="sticky top-30 mx-auto flex w-full max-w-400 flex-col gap-5">
            <h2 className="text-text-main hidden text-xl font-bold">빠른 실행</h2>
            <div className="flex flex-col gap-3">
              <QuickActionsSection
                concertDetail={concertDetail}
                concertTicketing={concertTicketing}
                isLiked={isLikedConcert?.isLike}
                isAuthenticated={isAuthenticated}
                isChatAvailable={isChatAvailable}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 모바일: 하단 시트 트리거 */}
      <MobileQuickActions
        concertDetail={concertDetail}
        concertTicketing={concertTicketing}
        isLiked={isLikedConcert?.isLike}
        isAuthenticated={isAuthenticated}
        isChatAvailable={isChatAvailable}
      />
    </section>
  );
}
