import ConcertDetailVenue from "@/components/concert/detail/ConcertDetailVenue";
import ConcertDetailReview from "@/components/concert/detail/ConcertDetailReview";
import ConcertDetailInfo from "@/components/concert/detail/ConcertDetailInfo";
import { type ConcertDetail } from "@/types/concerts";
import QuickActionsSection from "./QuickActionsSection";
import {
  getConcertDetail,
  getConcertVenueInfo,
  getTicketOfficesByConcertId,
  getIsLikedConcert,
} from "@/lib/api/concerts";
import { getAuthStatus, getMe } from "@/lib/auth/auth.server";
import { cookies } from "next/headers";

export default async function ConcertDetail({ concertId }: { concertId: string }) {
  const cookieStore = await cookies();

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
      getIsLikedConcert(concertId, cookieStore.toString()),
    ]);
  }

  return (
    <section className="bg-bg-main px-15 py-10">
      <div className="mx-auto flex w-full max-w-400 gap-12">
        <div className="flex-2 space-y-20">
          <ConcertDetailInfo
            concertImageUrls={concertDetail?.concertImageUrls}
            alt={concertDetail?.name}
          />
          <ConcertDetailVenue concertVenue={concertVenue.data} />
          <ConcertDetailReview />
        </div>

        <div className="right relative flex-1">
          <div className="border-border sticky top-34 flex flex-col gap-4 rounded-xl border p-6">
            <h2 className="text-text-main text-xl font-bold">빠른 실행</h2>
            <div className="flex flex-col gap-3">
              <QuickActionsSection
                concertId={concertDetail?.concertId}
                concertTicketingData={concertTicketing}
                concertStartDate={concertDetail?.startDate}
                concertEndDate={concertDetail?.endDate}
                userData={userData}
                isLiked={isLikedConcert?.isLike}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
