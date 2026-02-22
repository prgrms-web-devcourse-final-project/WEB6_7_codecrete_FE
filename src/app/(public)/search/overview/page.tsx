import SearchArtistPreview from "@/components/search/artists/SearchArtistPreview";
import SearchConcertPreview from "@/components/search/concerts/SearchConcertPreview";
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
    <section className="flex flex-col gap-20 px-5 pt-7 pb-20 lg:gap-30 lg:px-15 lg:py-16">
      <SearchArtistPreview keyword={keyword} artists={artists.slice(0, 12)} />
      <SearchConcertPreview
        keyword={keyword}
        concerts={concerts}
        isAuthenticated={isAuthenticated}
      />
    </section>
  );
}
