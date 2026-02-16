import Link from "next/link";
import SearchArtistCard from "./SearchArtistCard";
import { SearchArtistWithLiked } from "@/types/search";
import EmptyContents from "./EmptyContents";

export default async function SearchArtistPreview({
  keyword,
  artists,
}: {
  keyword: string;
  artists: SearchArtistWithLiked[];
}) {
  if (artists.length === 0) {
    return (
      <div className="mx-auto flex w-full max-w-400 flex-col gap-8">
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold">아티스트</h2>
          <Link href={`/search/artists?keyword=${keyword}`}>더보기</Link>
        </div>
        <EmptyContents type="artists" />
      </div>
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-400 flex-col gap-8">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold">아티스트</h2>
        <Link href={`/search/artists?keyword=${keyword}`}>더보기</Link>
      </div>
      <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {artists.map((artist) => (
          <SearchArtistCard key={artist.id} artist={artist} />
        ))}
      </div>
    </div>
  );
}
