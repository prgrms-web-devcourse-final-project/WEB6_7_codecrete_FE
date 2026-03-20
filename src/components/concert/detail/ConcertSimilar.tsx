"use client";

import { useQuery } from "@tanstack/react-query";
import { getSimilarConcerts } from "@/lib/api/concerts/concerts.client";
import TicketShapeSlider from "@/components/common/ticket-slider";
import TicketShapeSliderSkeleton from "@/components/common/ticket-slider/TicketShapeSliderSkeleton";

export default function ConcertSimilar({ concertId }: { concertId: string }) {
  const { data, isLoading } = useQuery({
    queryKey: ["similar-concerts", concertId],
    queryFn: () => getSimilarConcerts({ concertId }),
  });

  if (isLoading) return <TicketShapeSliderSkeleton />;

  if (!data?.data || data.data.length === 0) {
    return null;
  }

  return (
    <TicketShapeSlider
      concerts={data.data}
      title="🎈 이 공연도 여기서 해요"
      description="같은 공연장에서 진행하는 다른 공연도 확인해보세요!"
      className="bg-bg-sub"
    />
  );
}
