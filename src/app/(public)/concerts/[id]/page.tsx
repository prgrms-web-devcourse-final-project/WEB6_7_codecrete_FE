/**
 * TODO: 채팅방 입장 인가 로직 고도화
 *
 * 현재:
 * - 입장 API는 로그인 여부 + 채팅 가능 시간만 검증
 * - 채팅 참여자 정보를 DB에 저장하지 않음
 *
 * 추후 개선 방향:
 * - 서버에서 채팅방 입장 이력을 DB(chat_participant 등)에 저장
 * - WebSocket SUBSCRIBE 시 해당 유저의 채팅방 참여 권한을 재검증
 *
 * 참고:
 * - 프론트 전역 상태(joined 등)는 UX 최적화 용도로만 사용하며
 *   인가 판단의 근거로 사용하지 않음
 */

import ConcertDetail from "@/components/concert/detail/ConcertDetail";
import ConcertHeader from "@/components/concert/detail/ConcertHeader";
import ConcertSimilar from "@/components/concert/detail/ConcertSimilar";
import ConcertDetailSkeleton from "@/components/loading/concert/detail/ConcertDetailSkeleton";
import ConcertHeaderSkeleton from "@/components/loading/concert/detail/ConcertHeaderSkeleton";
import ConcertSimilarSkeleton from "@/components/loading/concert/detail/ConcertSimilarSkeleton";
import BreadcrumbNavbar from "@/components/review/BreadcrumbNavbar";
import { getConcertDetail, getSimilarConcerts } from "@/lib/api/concerts/concerts.server";
import { Suspense } from "react";
import { getAuthStatus } from "@/lib/api/auth/auth.server";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const concertDetail = await getConcertDetail({ concertId: id });

  const similarConcertsData = await getSimilarConcerts({ concertId: id });
  const similarConcerts = similarConcertsData.data ?? [];

  const isLoggedIn = await getAuthStatus();

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
        <ConcertDetail concertId={id} isLoggedIn={isLoggedIn} />
      </Suspense>
      {similarConcerts.length > 0 && (
        <Suspense fallback={<ConcertSimilarSkeleton />}>
          <ConcertSimilar similarConcerts={similarConcerts} />
        </Suspense>
      )}
    </>
  );
}
