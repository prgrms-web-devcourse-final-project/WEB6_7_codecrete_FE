import ConcertDetail from "@/components/concert/detail/ConcertDetail";
import ConcertHeader from "@/components/concert/detail/ConcertHeader";
import ConcertSimilar from "@/components/concert/detail/ConcertSimilar";
import BreadcrumbNavbar from "@/components/review/BreadcrumbNavbar";
import {
  getConcertDetail,
  getConcertVenueInfo,
  getTicketOfficesByConcertId,
} from "@/lib/api/concerts";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const concertDetailData = await getConcertDetail({ concertId: id });
  const concertVenueData = await getConcertVenueInfo({ concertId: id });
  const concertTicketingData = await getTicketOfficesByConcertId({ concertId: id });

  return (
    <>
      <BreadcrumbNavbar
        items={[
          { label: "홈", href: "/" },
          { label: "공연 목록", href: "/concerts" },
          { label: concertDetailData?.name },
        ]}
      />

      <ConcertHeader concertDetail={concertDetailData} />
      <ConcertDetail
        concertDetail={concertDetailData}
        concertVenueData={concertVenueData.data}
        concertTicketingData={concertTicketingData}
      />
      <ConcertSimilar />
    </>
  );
}
