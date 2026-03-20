"use client";

import { useQuery } from "@tanstack/react-query";
import TicketShapeSlider from "../../common/ticket-slider";
import { getUpcomingConcerts } from "@/lib/api/concerts/concerts.client";
import TicketShapeSliderSkeleton from "../../common/ticket-slider/TicketShapeSliderSkeleton";
import { concertsQueryKeys } from "@/queries/concerts";
import EmptySection from "@/components/common/EmptySection";

export default function UpcomingSlider() {
  const queryKey = concertsQueryKeys.upcoming("UPCOMING", 0, 21);

  const { data, isLoading, isError } = useQuery({
    queryKey,
    queryFn: () => getUpcomingConcerts({ sort: "UPCOMING", page: 0, size: 21 }),
    staleTime: 1000 * 60 * 3,
    gcTime: 1000 * 60 * 30,
  });

  if (isLoading) return <TicketShapeSliderSkeleton />;

  if (isError) {
    const isServerClosed = data?.status === 503; // 서버 점검 여부 확인

    return (
      <section className="py-10 md:py-15 lg:py-20">
        <div className="flex flex-col gap-6 px-5 lg:gap-10 lg:px-15">
          <div className="space-y-1 md:space-y-2">
            <h2 className="text-text-main text-2xl font-extrabold md:text-3xl">
              🔥 공연일까지 카운트다운 시작!
            </h2>
            <p className="text-text-sub text-sm font-medium md:text-base">
              티켓은 샀고, 이제 즐길 일만 남았죠? 외출 플래너로 동선부터 챙겨봐요!
            </p>
          </div>
          {isServerClosed ? (
            <EmptySection
              title="지금은 서버 운영 시간이 아니에요."
              message="서버 점검 또는 운영 시간 외에는 공연 정보를 불러올 수 없어요. 운영 시간에 다시 방문해주세요!"
              type="shutdown"
            />
          ) : (
            <EmptySection
              title="에러가 발생했어요. :-("
              message="공연 정보를 불러오는 중에 문제가 발생했습니다. 잠시 후 다시 시도해주세요."
              type="error"
            />
          )}
        </div>
      </section>
    );
  }

  const concerts = data?.data ?? [];

  if (concerts.length === 0) {
    return (
      <section className="py-10 md:py-15 lg:py-20">
        <div className="flex flex-col gap-6 px-5 lg:gap-10 lg:px-15">
          <div className="space-y-1 md:space-y-2">
            <h2 className="text-text-main text-2xl font-extrabold md:text-3xl">
              🔥 공연일까지 카운트다운 시작!
            </h2>
            <p className="text-text-sub text-sm font-medium md:text-base">
              티켓은 샀고, 이제 즐길 일만 남았죠? 외출 플래너로 동선부터 챙겨봐요!
            </p>
          </div>
          <EmptySection
            title="예정된 공연이 없어요."
            message="새로운 공연이 등록되면 가장 먼저 알려드릴게요! 조금만 기다려주세요."
            type="empty"
          />
        </div>
      </section>
    );
  }

  return (
    <TicketShapeSlider
      concerts={concerts}
      title="🔥 공연일까지 카운트다운 시작!"
      description="티켓은 샀고, 이제 즐길 일만 남았죠? 외출 플래너로 동선부터 챙겨봐요!"
    />
  );
}
