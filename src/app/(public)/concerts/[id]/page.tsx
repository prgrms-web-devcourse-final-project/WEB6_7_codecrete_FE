import ConcertDetail from "@/components/concert/detail/ConcertDetail";
import ConcertHeader from "@/components/concert/detail/ConcertHeader";
import ConcertSimilar from "@/components/concert/detail/ConcertSimilar";
import BreadcrumbNavbar from "@/components/review/BreadcrumbNavbar";
import {
  getConcertDetail,
  getConcertVenueInfo,
  getTicketOfficesByConcertId,
} from "@/lib/api/concerts";
import { getAuthStatus, getMe } from "@/lib/auth/auth.server";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const concertDetailData = await getConcertDetail({ concertId: id });
  const concertVenueData = await getConcertVenueInfo({ concertId: id });
  const concertTicketingData = await getTicketOfficesByConcertId({ concertId: id });

  // 로그인 여부 확인
  const isAuthenticated = await getAuthStatus();

  // 로그인 했을 때만 사용자 데이터 가져오기
  let userData = null;
  if (isAuthenticated) userData = (await getMe()).data;

  return (
    <>
      <BreadcrumbNavbar
        items={[
          { label: "홈", href: "/" },
          { label: "공연 목록", href: "/concerts" },
          { label: concertDetailData?.name },
        ]}
      />

      <ConcertHeader
        concertDetail={concertDetailData}
        concertTicketingData={concertTicketingData}
        userData={userData}
      />
      <ConcertDetail
        concertDetail={concertDetailData}
        concertVenueData={concertVenueData}
        concertTicketingData={concertTicketingData}
        userData={userData}
      />
      <ConcertSimilar />
    </>
  );
}
