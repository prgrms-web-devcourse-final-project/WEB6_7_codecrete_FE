import SearchArtistPreview from "@/components/search/SearchArtistPreview";
import SearchConcertPreview from "@/components/search/SearchConcertPreview";
import { getAuthStatus } from "@/lib/api/auth/auth.server";
import { getSearchConcerts } from "@/lib/api/search/search.client";
import { getSearchArtistsWithLiked } from "@/lib/api/search/search.server";
import { cn } from "@/lib/utils";

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
    size: 8,
  });

  return (
    <section className={cn("flex flex-col gap-16 px-15 py-16")}>
      {/* TODO : 한줄 이상은 사라지도록 해야함 */}
      <SearchArtistPreview keyword={keyword} artists={artists} />
      <SearchConcertPreview
        keyword={keyword}
        concerts={concerts}
        isAuthenticated={isAuthenticated}
      />
    </section>
  );
}
