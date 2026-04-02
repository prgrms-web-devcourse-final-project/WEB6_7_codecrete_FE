"use client";
import { useQuery } from "@tanstack/react-query";
import TicketShapeSlider from "../../common/ticket-slider";
import TicketShapeSliderSkeleton from "../../common/ticket-slider/TicketShapeSliderSkeleton";
import { concertQueries } from "@/queries/concerts";
import EmptySection from "@/components/common/EmptySection";

export default function TicketingSlider() {
  const { data, isLoading, isError } = useQuery(concertQueries.ticketing("TICKETING", 0, 21));

  if (isLoading) return <TicketShapeSliderSkeleton />;

  if (isError) {
    const isServerClosed = data?.status === 503; // 서버 점검 여부 확인

    return (
      <section className="my-10 w-full px-5 md:my-15 lg:my-20 lg:gap-10 lg:px-15">
        <div className="mx-auto flex max-w-400 flex-col gap-6">
          <div className="space-y-1 md:space-y-2">
            <h2 className="text-text-main text-2xl font-extrabold md:text-3xl">
              🎫 예매일 임박! 콘서트 모음
            </h2>
            <p className="text-text-sub text-sm font-medium md:text-base">
              티켓팅 광탈하고 울지 말고 미리미리 예매하자구요
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

  if (concerts.length === 0) return null;

  return (
    <TicketShapeSlider
      concerts={concerts}
      title="🎫 예매일 임박! 콘서트 모음"
      description="티켓팅 광탈하고 울지 말고 미리미리 예매하자구요"
    />
  );
}
