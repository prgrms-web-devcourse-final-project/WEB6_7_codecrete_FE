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
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const concertDetail = await getConcertDetail({ concertId: id });

  if (!concertDetail) {
    return {
      title: "공연을 찾을 수 없습니다",
      description: "요청한 공연 정보가 없습니다.",
    };
  }

  return {
    title: `${concertDetail.name} | 내 콘서트를 부탁해`,
    description: `공연 "${concertDetail.name}"에 대한 상세 페이지입니다. 공연 티켓의 최소 · 최대가격, 공연 장소, 공연 일정, 출연 아티스트의 정보를 확인하고 외출 플래너를 생성해보세요!`,
    openGraph: {
      title: concertDetail.name,
      description: `${concertDetail.name} 공연 정보`,
      images: concertDetail.concertImageUrls?.[0]
        ? [
            {
              url: concertDetail.concertImageUrls[0],
              width: 1200,
              height: 630,
              alt: concertDetail.name,
            },
          ]
        : [],
    },
  };
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const concertDetail = await getConcertDetail({ concertId: id });

  const similarConcertsData = await getSimilarConcerts({ concertId: id });
  const similarConcerts = similarConcertsData.data ?? [];

  const isLoggedIn = await getAuthStatus();

  if (!concertDetail) {
    notFound();
  }

  const now = new Date();

  let isChatAvailable = false;

  if (concertDetail.ticketTime) {
    // ticketTime은 KST 기준 시간으로 내려온다고 가정
    const ticketTime = new Date(concertDetail.ticketTime);
    // 채팅은 티켓 오픈 시점 기준 ±3일 동안만 가능
    const THREE_DAYS = 3 * 24 * 60 * 60 * 1000;

    isChatAvailable =
      now.getTime() >= ticketTime.getTime() - THREE_DAYS &&
      now.getTime() <= ticketTime.getTime() + THREE_DAYS;
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
        <ConcertHeader concertId={id} isLoggedIn={isLoggedIn} isChatAvailable={isChatAvailable} />
      </Suspense>
      <Suspense fallback={<ConcertDetailSkeleton />}>
        <ConcertDetail concertId={id} isLoggedIn={isLoggedIn} isChatAvailable={isChatAvailable} />
      </Suspense>
      {similarConcerts.length > 0 && (
        <Suspense fallback={<ConcertSimilarSkeleton />}>
          <ConcertSimilar similarConcerts={similarConcerts} />
        </Suspense>
      )}
    </>
  );
}
