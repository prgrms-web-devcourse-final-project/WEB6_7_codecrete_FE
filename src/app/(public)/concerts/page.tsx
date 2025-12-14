import BreadcrumbNav from "@/components/common/BreadcrumbNav";
import ConcertListContent from "@/components/concert/list/ConcertListContent";
import ConcertListIntro from "@/components/concert/list/ConcertListIntro";

export default function Page() {
  return (
    <>
      <BreadcrumbNav itemType="공연" />
      <main className="flex flex-col gap-9">
        <ConcertListIntro />
        <ConcertListContent />
      </main>
    </>
  );
}
