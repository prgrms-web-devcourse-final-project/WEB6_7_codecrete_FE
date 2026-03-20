import FeaturedSlider from "@/components/home/featured-slider";
import HeroSlider from "@/components/home/hero-slider";
import PlannerBanner from "@/components/home/PlannerBanner";
import TicketingSlider from "@/components/home/ticketing-slider";
import UpcomingSlider from "@/components/home/upcoming-slider";
import { getAuthStatus } from "@/lib/api/auth/auth.server";
import { getUpcomingConcerts } from "@/lib/api/concerts/concerts.server";
import { concertsQueryKeys } from "@/queries/concerts";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

export default async function Page() {
  const isAuthenticated = await getAuthStatus();

  const queryClient = new QueryClient();
  const queryKey = concertsQueryKeys.upcoming("UPCOMING", 0, 21);

  await queryClient.prefetchQuery({
    queryKey,
    queryFn: () => getUpcomingConcerts({ sort: "UPCOMING", page: 0, size: 21 }),
    staleTime: 1000 * 60 * 3,
  });

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
