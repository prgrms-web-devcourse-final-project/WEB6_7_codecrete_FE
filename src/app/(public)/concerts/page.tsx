import ConcertListContent from "@/components/concert/list/ConcertListContent";
import ConcertListIntro from "@/components/concert/list/ConcertListIntro";
import BreadcrumbNavbar from "@/components/review/BreadcrumbNavbar";

export default async function Page({ searchParams }: { searchParams: Promise<{ sort?: string }> }) {
  const resolvedParams = await searchParams;

  return (
    <>
      <BreadcrumbNavbar items={[{ label: "홈", href: "/" }, { label: "공연 목록" }]} />
      <ConcertListIntro />
      <ConcertListContent searchParams={resolvedParams} />
    </>
  );
}
