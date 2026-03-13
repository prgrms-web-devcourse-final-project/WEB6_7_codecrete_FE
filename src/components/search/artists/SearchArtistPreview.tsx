import SearchArtistCard from "./SearchArtistCard";
import { SearchArtistWithLiked } from "@/types/search";
import EmptyContents from "../EmptyContents";
import TitleWithMoreBtn from "@/components/common/TitleWithMoreBtn";

export default async function SearchArtistPreview({
  keyword,
  artists,
}: {
  keyword: string;
  artists: SearchArtistWithLiked[];
}) {
  return (
    <div className="mx-auto flex w-full max-w-400 flex-col gap-5 lg:gap-8">
      <TitleWithMoreBtn href={`/search/artists?keyword=${keyword}`} title="아티스트" />
      {artists.length > 0 ? (
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-3 xl:grid-cols-5 xl:gap-x-8 xl:gap-y-10">
          {artists.map((artist) => (
            <SearchArtistCard key={artist.id} artist={artist} />
          ))}
        </div>
      ) : (
        <EmptyContents type="artists" />
      )}
    </div>
  );
}
