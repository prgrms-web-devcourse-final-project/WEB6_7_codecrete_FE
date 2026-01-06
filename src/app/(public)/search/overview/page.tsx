import SearchArtistPreview from "@/components/search/SearchArtistPreview";
import SearchConcertPreview from "@/components/search/SearchConcertPreview";
import { getAuthStatus } from "@/lib/api/auth/auth.server";
import { getSearchArtistsWithLiked, getSearchConcerts } from "@/lib/api/search/search.server";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ keyword: string }>;
}) {
  const { keyword } = await searchParams;
  const isAuthenticated = await getAuthStatus();
  const artists = await getSearchArtistsWithLiked({ artistName: keyword });
  const concerts = await getSearchConcerts({ keyword, isAuthenticated, size: 12 });

  return (
    <section className="flex flex-col gap-30 px-15 py-16">
      <SearchArtistPreview keyword={keyword} artists={artists.slice(0, 12)} />
      <SearchConcertPreview
        keyword={keyword}
        concerts={concerts}
        isAuthenticated={isAuthenticated}
      />
    </section>
  );
}
