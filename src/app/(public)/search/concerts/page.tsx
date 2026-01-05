import SearchIntroSkeleton from "@/components/loading/search/SearchIntroSkeleton";
import SearchNavigationSkeleton from "@/components/loading/search/SearchNavigationSkeleton";
import BreadcrumbNavbar from "@/components/review/BreadcrumbNavbar";
import BreadcrumbLabel from "@/components/search/BreadcrumbLabel";
import SearchConcerts from "@/components/search/SearchConcerts";
import SearchIntro from "@/components/search/SearchIntro";
import SearchNavigation from "@/components/search/SearchNavigation";
import { getAuthStatus } from "@/lib/api/auth/auth.server";
import { getSearchConcerts } from "@/lib/api/search/search.server";
import { getSearchArtistsWithLiked, getSearchConcertsCount } from "@/lib/api/search/search.server";
import { Suspense } from "react";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ keyword: string }>;
}) {
  const { keyword } = await searchParams;

  const isAuthenticated = await getAuthStatus();
  const artists = await getSearchArtistsWithLiked({
    artistName: keyword,
  });
  const concertsCount = await getSearchConcertsCount({ keyword });

  const concerts = await getSearchConcerts({ keyword: keyword, isAuthenticated });

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
      <SearchConcerts
        initialConcerts={concerts}
        keyword={keyword}
        isAuthenticated={isAuthenticated}
      />
    </>
  );
}
