import FeaturedSlider from "@/components/home/featured-slider";
import HeroSlider from "@/components/home/hero-slider";
import PlannerBanner from "@/components/home/PlannerBanner";
import TicketingSlider from "@/components/home/ticketing-slider";
import UpcomingSlider from "@/components/home/upcoming-slider";
import { getAuthStatus } from "@/lib/api/auth/auth.server";
import { concertQueries } from "@/queries/concerts";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

export default async function Page() {
  const isAuthenticated = await getAuthStatus();

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(concertQueries.upcoming("UPCOMING", 0, 21));

  return (
    <>
      <HeroSlider />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <UpcomingSlider />
      </HydrationBoundary>
      <FeaturedSlider isAuthenticated={isAuthenticated} />
      <TicketingSlider />
      <PlannerBanner />
    </>
  );
}
