import ConcertDetail from "@/components/concert/detail/ConcertDetail";
import ConcertHeader from "@/components/concert/detail/ConcertHeader";
import ConcertSimilar from "@/components/concert/detail/ConcertSimilar";
import ConcertDetailSkeleton from "@/components/loading/concert-detail/ConcertDetailSkeleton";
import ConcertHeaderSkeleton from "@/components/loading/concert-detail/ConcertHeaderSkeleton";
import ConcertSimilarSkeleton from "@/components/loading/concert-detail/ConcertSimilarSkeleton";
import BreadcrumbNavbar from "@/components/review/BreadcrumbNavbar";
import { Suspense } from "react";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <>
      <BreadcrumbNavbar
        items={[
          { label: "홈", href: "/" },
          { label: "공연 목록", href: "/concerts" },
          { label: "공연 상세" },
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
