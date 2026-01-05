import SearchArtists from "@/components/search/SearchArtists";
import { getSearchArtistsWithLiked } from "@/lib/api/search/search.server";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ keyword: string }>;
}) {
  const { keyword } = await searchParams;
  const artists = await getSearchArtistsWithLiked({ artistName: keyword });

  return <SearchArtists artists={artists} />;
}
