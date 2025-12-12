import FeaturedSlider from "@/components/home/FeaturedSlider";
import HeroSlider from "@/components/home/HeroSlider";
import PlannerBanner from "@/components/home/PlannerBanner";
import UpcomingSlider from "@/components/home/UpcomingSlider";

export default function Page() {
  return (
    <>
      <HeroSlider />
      <UpcomingSlider />
      <FeaturedSlider />
      <PlannerBanner />
    </>
  );
}
