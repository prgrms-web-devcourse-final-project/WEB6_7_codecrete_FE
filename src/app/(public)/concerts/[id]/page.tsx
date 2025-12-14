import BreadcrumbNav from "@/components/common/BreadcrumbNav";
import ConcertDetail from "@/components/concert/detail/ConcertDetail";
import ConcertHeader from "@/components/concert/detail/ConcertHeader";
import ConcertSimilar from "@/components/concert/detail/ConcertSimilar";

export default function Page() {
  return (
    <>
      <BreadcrumbNav itemType="공연" itemDetail="2025 Christmas Concert" />
      <ConcertHeader />
      <ConcertDetail />
      <ConcertSimilar />
    </>
  );
}
