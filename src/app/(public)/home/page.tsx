import FeaturedSlider from "@/components/home/FeaturedSlider";
import HeroSlider from "@/components/home/HeroSlider";
import PlannerBanner from "@/components/home/PlannerBanner";
import UpcomingSlider from "@/components/home/UpcomingSlider";
import { getUpcomingConcerts } from "@/lib/api/concerts";

export default async function Page() {
  const concertData = await getUpcomingConcerts();

  return (
    <>
      <HeroSlider />
      <UpcomingSlider concerts={concertData.data} />
      <FeaturedSlider />
      <PlannerBanner />
    </>
  );
}
