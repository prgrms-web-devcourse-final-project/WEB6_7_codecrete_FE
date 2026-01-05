import ConcertListIntro from "@/components/concert/list/ConcertListIntro";
import ConcertListWrapper from "@/components/concert/list/ConcertListWrapper";
import ConcertListsSkeleton from "@/components/loading/concert/list/ConcertListsSkeleton";
import BreadcrumbNavbar from "@/components/review/BreadcrumbNavbar";
import { Suspense } from "react";

export default async function Page({ searchParams }: { searchParams: Promise<{ sort?: string }> }) {
  const resolvedParams = await searchParams;

  return (
    <>
      <BreadcrumbNavbar items={[{ label: "홈", href: "/" }, { label: "공연 목록" }]} />
      <ConcertListIntro />
      <Suspense fallback={<ConcertListsSkeleton />}>
        <ConcertListWrapper searchParams={resolvedParams} />
      </Suspense>
    </>
  );
}
