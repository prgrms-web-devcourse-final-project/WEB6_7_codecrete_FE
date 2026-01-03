import Link from "next/link";
import ArtistCard from "@/components/artist/ArtistCard";
import { getSearchArtists } from "@/lib/api/artists/artists.server";
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription } from "../ui/empty";
import { SpotlightIcon } from "lucide-react";

export default async function SearchArtistPreview({ keyword }: { keyword: string }) {
  const mockup = [
    { key: "1", href: "/artists/1" },
    { key: "2", href: "/artists/1" },
    { key: "3", href: "/artists/1" },
    { key: "4", href: "/artists/1" },
    { key: "5", href: "/artists/1" },
  ];
  const artists = await getSearchArtists({ keyword });
  if (artists.length === 0) {
    <div className="mx-auto flex w-full max-w-400 flex-col gap-8">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold">아티스트</h2>
        <Link href={`/search/artists?keyword=${keyword}`}>더보기</Link>
      </div>
      <div className="py-40">
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <SpotlightIcon />
            </EmptyMedia>
            <EmptyTitle>검색 결과 없음</EmptyTitle>
            <EmptyDescription>검색어에 해당하는 아티스트가 없습니다.</EmptyDescription>
          </EmptyHeader>
        </Empty>
      </div>
    </div>;
  }

  return (
    <div className="mx-auto flex w-full max-w-400 flex-col gap-8">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold">아티스트</h2>
        <Link href={`/search/artists?keyword=${keyword}`}>더보기</Link>
      </div>
      <div className="grid grid-cols-5 gap-6">
        {mockup.map((item) => (
          <ArtistCard key={item.key} href={item.href} />
        ))}
      </div>
    </div>
  );
}
