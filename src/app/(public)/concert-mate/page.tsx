import MateListContent from "@/components/concert-mate/list/MateListContent";
import MateListIntro from "@/components/concert-mate/list/MateListIntro";
import BreadcrumbNavbar from "@/components/review/BreadcrumbNavbar";

export default async function Page({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const params = await searchParams;
  const pageParam = Number(params.page) || 1; // 없을 때는 1페이지 부여

  return (
    <>
      <BreadcrumbNavbar items={[{ label: "홈", href: "/" }, { label: "구인 게시판" }]} />
      <MateListIntro />
      <MateListContent pageParam={pageParam} />
    </>
  );
}
