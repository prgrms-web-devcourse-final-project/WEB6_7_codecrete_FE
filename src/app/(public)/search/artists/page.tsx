import SearchIntroSkeleton from "@/components/loading/search/SearchIntroSkeleton";
import SearchNavigationSkeleton from "@/components/loading/search/SearchNavigationSkeleton";
import BreadcrumbNavbar from "@/components/review/BreadcrumbNavbar";
import BreadcrumbLabel from "@/components/search/BreadcrumbLabel";
import SearchArtists from "@/components/search/SearchArtists";
import SearchIntro from "@/components/search/SearchIntro";
import SearchNavigation from "@/components/search/SearchNavigation";
import { getSearchArtistsWithLiked, getSearchConcertsCount } from "@/lib/api/search/search.server";
import { Suspense } from "react";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ keyword: string }>;
}) {
  const { keyword } = await searchParams;

  const artists = await getSearchArtistsWithLiked({
    artistName: keyword,
  });
  const concertsCount = await getSearchConcertsCount({ keyword });

  return (
    <>
      <BreadcrumbNavbar
        items={[
          { label: "홈", href: "/" },
          { label: "검색 결과", href: "/search/overview" },
          { label: <BreadcrumbLabel /> },
        ]}
      />
      <Suspense fallback={<SearchIntroSkeleton />}>
        <SearchIntro keyword={keyword} counts={artists.length + concertsCount} />
      </Suspense>
      <Suspense fallback={<SearchNavigationSkeleton />}>
        <SearchNavigation
          keyword={keyword}
          artistCounts={artists.length}
          concertCounts={concertsCount}
        />
      </Suspense>
      <SearchArtists artists={artists} />
    </>
  );
}
