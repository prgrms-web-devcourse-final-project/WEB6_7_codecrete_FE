import TicketShapeSlider from "@/components/common/ticket-slider";
import FeaturedSlider from "@/components/home/featured-slider";
import HeroSlider from "@/components/home/hero-slider";
import PlannerBanner from "@/components/home/PlannerBanner";
import FeaturedArtistsSkeleton from "@/components/loading/home/FeaturedArtistsSkeleton";
import { getFeaturedArtists } from "@/lib/api/artists/artists.server";
import { getAuthStatus } from "@/lib/api/auth/auth.server";
import { getUpcomingConcerts } from "@/lib/api/concerts/concerts.server";
import { Suspense } from "react";
import TicketShapeSliderSkeleton from "@/components/common/ticket-slider/TicketShapeSliderSkeleton";

export default async function Page() {
  const isAuthenticated = await getAuthStatus();
  const upcomingConcertData = await getUpcomingConcerts({ sort: "UPCOMING" });
  const ticketingConcertData = await getUpcomingConcerts({ sort: "TICKETING" });
  const artistData = await getFeaturedArtists({ page: 0, size: 20 });

  return (
    <>
      <HeroSlider />
      <Suspense fallback={<TicketShapeSliderSkeleton />}>
        <TicketShapeSlider
          concerts={upcomingConcertData.data}
          title="🔥 공연일까지 카운트다운 시작!"
          description="티켓은 샀고, 이제 즐길 일만 남았죠? 외출 플래너로 동선부터 챙겨봐요!"
        />
      </Suspense>
      <Suspense fallback={<FeaturedArtistsSkeleton />}>
        <FeaturedSlider artists={artistData.data} isAuthenticated={isAuthenticated} />
      </Suspense>
      <Suspense fallback={<TicketShapeSliderSkeleton />}>
        <TicketShapeSlider
          concerts={ticketingConcertData.data}
          title="🎫 예매일 임박! 콘서트 모음"
          description="티켓팅 광탈하고 울지 말고 미리미리 예매하자구요"
        />
      </Suspense>
      <PlannerBanner />
    </>
  );
}
