import FeaturedSlider from "@/components/home/FeaturedSlider";
import HeroSlider from "@/components/home/hero-slider";
import PlannerBanner from "@/components/home/PlannerBanner";
import UpcomingSlider from "@/components/home/upcoming-slider";
import UpcomingSkeleton from "@/components/loading/UpcomingSkeleton";
import { getUpcomingConcerts } from "@/lib/api/concerts";
import { Suspense } from "react";

export default async function Page() {
  const concertData = await getUpcomingConcerts();

  return (
    <>
      <HeroSlider />
      <Suspense fallback={<UpcomingSkeleton />}>
        <UpcomingSlider concerts={concertData.data} />
      </Suspense>
      <FeaturedSlider />
      <PlannerBanner />
    </>
  );
}
