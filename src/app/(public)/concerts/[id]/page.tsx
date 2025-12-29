import ConcertDetail from "@/components/concert/detail/ConcertDetail";
import ConcertHeader from "@/components/concert/detail/ConcertHeader";
import ConcertSimilar from "@/components/concert/detail/ConcertSimilar";
import ConcertDetailSkeleton from "@/components/loading/concert-detail/ConcertDetailSkeleton";
import ConcertHeaderSkeleton from "@/components/loading/concert-detail/ConcertHeaderSkeleton";
import ConcertSimilarSkeleton from "@/components/loading/concert-detail/ConcertSimilarSkeleton";
import BreadcrumbNavbar from "@/components/review/BreadcrumbNavbar";
import { getConcertDetail } from "@/lib/api/concerts";
import { Suspense } from "react";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const concertDetail = await getConcertDetail({ concertId: id });

  // TODO: 존재하지 않는 공연 id 접근 시 404 페이지로 리다이렉트 처리 필요
  if (!concertDetail) {
    return null;
  }

  return (
    <>
      <BreadcrumbNavbar
        items={[
          { label: "홈", href: "/" },
          { label: "공연 목록", href: "/concerts" },
          { label: concertDetail?.name },
        ]}
      />
      <Suspense fallback={<ConcertHeaderSkeleton />}>
        <ConcertHeader concertId={id} />
      </Suspense>
      <Suspense fallback={<ConcertDetailSkeleton />}>
        <ConcertDetail concertId={id} />
      </Suspense>
      <Suspense fallback={<ConcertSimilarSkeleton />}>
        <ConcertSimilar />
      </Suspense>
    </>
  );
}
