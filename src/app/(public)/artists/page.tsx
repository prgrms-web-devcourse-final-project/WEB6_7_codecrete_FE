import ArtistListMain from "@/components/artist/list/ArtistListMain";
import PageHeader from "@/components/common/PageHeader";
import BreadcrumbNavbar from "@/components/review/BreadcrumbNavbar";

export const metadata = {
  title: "아티스트 목록 | 내 콘서트를 부탁해",
  description: "다양한 아티스트의 공연과 소식을 한눈에 확인해보세요",
};

export default async function page({ searchParams }: { searchParams: Promise<{ sort?: string }> }) {
  const { sort = "NAME" } = await searchParams;

  return (
    <>
      <BreadcrumbNavbar items={[{ label: "홈", href: "/" }, { label: "아티스트 목록" }]} />
      <PageHeader
        title={"아티스트 둘러보기"}
        description={"다양한 아티스트의 공연과 소식을 한눈에 확인해보세요"}
      />
      <ArtistListMain currentSort={sort} />
    </>
  );
}
