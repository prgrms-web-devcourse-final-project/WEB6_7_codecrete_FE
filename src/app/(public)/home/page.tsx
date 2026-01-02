import FeaturedSlider from "@/components/home/featured-slider";
import HeroSlider from "@/components/home/hero-slider";
import PlannerBanner from "@/components/home/PlannerBanner";
import UpcomingSlider from "@/components/home/upcoming-slider";
import FeaturedArtistsSkeleton from "@/components/loading/home/FeaturedArtistsSkeleton";
import UpcomingSkeleton from "@/components/loading/home/UpcomingSkeleton";
import { getUpcomingConcerts } from "@/lib/api/concerts/concerts.server";
import { getFeaturedArtists } from "@/lib/artists/artists.server";
import { getAuthStatus } from "@/lib/auth/auth.server";
import { Suspense } from "react";

export default async function Page() {
  const isAuthenticated = await getAuthStatus();
  const concertData = await getUpcomingConcerts();
  const artistData = await getFeaturedArtists({ page: 0, size: 20 });

  return (
    <>
      <HeroSlider />
      <Suspense fallback={<UpcomingSkeleton />}>
        <UpcomingSlider concerts={concertData.data} />
      </Suspense>
      <Suspense fallback={<FeaturedArtistsSkeleton />}>
        <FeaturedSlider artists={artistData.data} isAuthenticated={isAuthenticated} />
      </Suspense>
      <PlannerBanner />
    </>
  );
}
