import ConcertDetailVenue from "@/components/concert/detail/ConcertDetailVenue";
import ConcertDetailReview from "@/components/concert/detail/ConcertDetailReview";
import ConcertDetailInfo from "@/components/concert/detail/ConcertDetailInfo";
import { type ConcertVenueInfo, type ConcertDetail, TicketOffice } from "@/types/concerts";
import QuickActionsSection from "./QuickActionsSection";
import { User } from "@/types/user";

export default function ConcertDetail({
  concertDetail,
  concertVenueData,
  concertTicketingData,
  userData,
}: {
  concertDetail: ConcertDetail | null;
  concertVenueData: ConcertVenueInfo | null;
  concertTicketingData: TicketOffice[] | null;
  userData: User | null;
}) {
  if (!concertDetail && !concertVenueData && !concertTicketingData) {
    return null;
  }

  return (
    <section className="bg-bg-main px-15 py-10">
      <div className="mx-auto flex w-full max-w-400 gap-12">
        <div className="flex-2 space-y-20">
          <ConcertDetailInfo
            concertImageUrls={concertDetail?.concertImageUrls}
            alt={concertDetail?.name}
          />
          <ConcertDetailVenue concertVenue={concertVenueData} />
          <ConcertDetailReview />
        </div>

        <div className="right relative flex-1">
          <div className="border-border sticky top-34 flex flex-col gap-4 rounded-xl border p-6">
            <h2 className="text-text-main text-xl font-bold">빠른 실행</h2>
            <div className="flex flex-col gap-3">
              <QuickActionsSection
                concertId={concertDetail?.concertId}
                concertTicketingData={concertTicketingData}
                concertStartDate={concertDetail?.startDate}
                concertEndDate={concertDetail?.endDate}
                userData={userData}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
