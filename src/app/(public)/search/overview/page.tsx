import SearchIntroSkeleton from "@/components/loading/search/SearchIntroSkeleton";
import SearchNavigationSkeleton from "@/components/loading/search/SearchNavigationSkeleton";
import BreadcrumbNavbar from "@/components/review/BreadcrumbNavbar";
import BreadcrumbLabel from "@/components/search/BreadcrumbLabel";
import SearchArtistPreview from "@/components/search/SearchArtistPreview";
import SearchConcertPreview from "@/components/search/SearchConcertPreview";
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
  const concerts = await getSearchConcerts({
    keyword,
    isAuthenticated,
    size: 12,
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
      <section className="flex flex-col gap-30 px-15 py-16">
        <SearchArtistPreview keyword={keyword} artists={artists.slice(0, 12)} />
        <SearchConcertPreview
          keyword={keyword}
          concerts={concerts}
          isAuthenticated={isAuthenticated}
        />
      </section>
    </>
  );
}
