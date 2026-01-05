import Link from "next/link";
import SearchArtistCard from "./SearchArtistCard";
import { SearchArtistWithLiked } from "@/types/search";
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription } from "../ui/empty";
import { MicVocalIcon } from "lucide-react";

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
        <div className="py-40">
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <MicVocalIcon />
              </EmptyMedia>
              <EmptyTitle>검색 결과 없음</EmptyTitle>
              <EmptyDescription>검색어에 해당하는 아티스트가 없습니다.</EmptyDescription>
            </EmptyHeader>
          </Empty>
        </div>
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
